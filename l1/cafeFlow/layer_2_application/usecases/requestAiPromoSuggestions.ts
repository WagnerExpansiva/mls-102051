/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiPromoSuggestions.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { Order, OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export interface RequestAiPromoSuggestionsInput {}

export interface PromoSuggestion {
  menuItemId: string;
  suggestedPromoType: 'bundle' | 'discount' | 'featured';
  reason: string;
  currentStockLevel: number;
  recentSalesQuantity: number;
}

export interface RequestAiPromoSuggestionsOutput {
  suggestions: string;
  windowStart: string;
  windowEnd: string;
  analyzedOrderCount: number;
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Rule aiPromoBasedOnLast7Days: only orders within the 7-day window are considered.
 * Rule aiConsumesDomainData: every suggestion is derived exclusively from Order, OrderItem,
 * and StockLevel domain data — no external data sources are consulted.
 */
export async function requestAiPromoSuggestions(
  ctx: RequestContext,
  _input: RequestAiPromoSuggestionsInput,
): Promise<RequestAiPromoSuggestionsOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');

  // Compute the 7-day analysis window (systemDefault resolution)
  const windowEndIso = ctx.clock.nowIso();
  const windowEndDate = new Date(windowEndIso);
  const windowStartDate = new Date(windowEndDate.getTime() - SEVEN_DAYS_MS);
  const windowStartIso = windowStartDate.toISOString();

  // Load orders within the 7-day window (rule aiPromoBasedOnLast7Days)
  const recentOrders: Order[] = await orders.findByPeriod(windowStartDate, windowEndDate);
  const analyzedOrderCount = recentOrders.length;

  // Aggregate total quantity sold per menuItemId across the window
  const salesByMenuItem = new Map<string, number>();
  for (const order of recentOrders) {
    const items: OrderItem[] = order.items ?? [];
    for (const item of items) {
      const current = salesByMenuItem.get(item.menuItemId) ?? 0;
      salesByMenuItem.set(item.menuItemId, current + item.quantity);
    }
  }

  // Load all StockLevel records to obtain currentQuantity and minimumLevel per stock item
  const allStockLevels: StockLevel[] = await stockLevels.list();

  // Build a lookup from stockItemId to StockLevel
  const stockByItemId = new Map<string, StockLevel>();
  for (const sl of allStockLevels) {
    stockByItemId.set(sl.stockItemId, sl);
  }

  // Apply rule aiPromoBasedOnLast7Days: identify promo candidates
  // - Top sellers (high recent sales volume) → could benefit from promotional bundling
  // - Overstock items (currentQuantity well above minimumLevel) → need movement
  const suggestions: PromoSuggestion[] = [];

  // Sort menu items by recent sales quantity descending to identify top sellers
  const sortedBySales = [...salesByMenuItem.entries()].sort((a, b) => b[1] - a[1]);

  // Determine top seller threshold: top 30% of items with sales, or at least 3 items
  const topSellerCount = Math.max(3, Math.ceil(sortedBySales.length * 0.3));
  const topSellerIds = new Set<string>(sortedBySales.slice(0, topSellerCount).map(([id]) => id));

  for (const [menuItemId, recentSalesQuantity] of salesByMenuItem) {
    const stockLevel = stockByItemId.get(menuItemId);
    const currentStockLevel = stockLevel?.currentQuantity ?? 0;
    const minimumLevel = stockLevel?.minimumLevel ?? 0;

    const isTopSeller = topSellerIds.has(menuItemId);
    const isOverstock = currentStockLevel > minimumLevel * 2 && currentStockLevel > 0;

    if (isTopSeller && isOverstock) {
      // Top seller with overstock → bundle promo to move excess while capitalizing on demand
      suggestions.push({
        menuItemId,
        suggestedPromoType: 'bundle',
        reason: `High demand (${recentSalesQuantity} units sold in last 7 days) with overstock (${currentStockLevel} units vs minimum ${minimumLevel}). Bundle to move excess inventory while leveraging popularity.`,
        currentStockLevel,
        recentSalesQuantity,
      });
    } else if (isTopSeller) {
      // Top seller with normal/low stock → featured promo to boost visibility
      suggestions.push({
        menuItemId,
        suggestedPromoType: 'featured',
        reason: `Top seller (${recentSalesQuantity} units sold in last 7 days). Feature to maximize visibility and drive additional sales.`,
        currentStockLevel,
        recentSalesQuantity,
      });
    } else if (isOverstock) {
      // Overstock with lower sales → discount to move inventory
      suggestions.push({
        menuItemId,
        suggestedPromoType: 'discount',
        reason: `Overstock detected (${currentStockLevel} units vs minimum ${minimumLevel}) with moderate sales (${recentSalesQuantity} units in last 7 days). Discount to accelerate inventory movement.`,
        currentStockLevel,
        recentSalesQuantity,
      });
    }
  }

  // Also check stock items with no recent sales but significant overstock
  for (const sl of allStockLevels) {
    if (!salesByMenuItem.has(sl.stockItemId) && sl.currentQuantity > sl.minimumLevel * 2 && sl.currentQuantity > 0) {
      suggestions.push({
        menuItemId: sl.stockItemId,
        suggestedPromoType: 'discount',
        reason: `No sales in last 7 days with overstock (${sl.currentQuantity} units vs minimum ${sl.minimumLevel}). Discount to clear stagnant inventory.`,
        currentStockLevel: sl.currentQuantity,
        recentSalesQuantity: 0,
      });
    }
  }

  // Rule aiConsumesDomainData: serialize suggestions derived exclusively from domain data
  const suggestionsJson = JSON.stringify(suggestions);

  return {
    suggestions: suggestionsJson,
    windowStart: windowStartIso,
    windowEnd: windowEndIso,
    analyzedOrderCount,
  };
}
