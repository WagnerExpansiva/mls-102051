/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiPromoSuggestions.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { Order, OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export interface PromoSuggestionItem {
  menuItemId: string;
  totalQuantity: number;
  orderCount: number;
  suggestedPromoType: string;
  reason: string;
}

export interface RequestAiPromoSuggestionsInput {}

export interface RequestAiPromoSuggestionsOutput {
  suggestions: PromoSuggestionItem[];
  windowStart: string;
  windowEnd: string;
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Rule aiPromoBasedOnLast7Days: the analysis window is always the last 7 days
 * ending at the current timestamp. Rule aiConsumesDomainData: only domain data
 * from Order/OrderItem/StockLevel is used — no external sources.
 */
export async function requestAiPromoSuggestions(
  ctx: RequestContext,
  _input: RequestAiPromoSuggestionsInput,
): Promise<RequestAiPromoSuggestionsOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');

  const nowMs = Date.now();
  const windowEndIso = ctx.clock.nowIso();
  const windowStartIso = new Date(nowMs - SEVEN_DAYS_MS).toISOString();

  // Step 3: Load orders within the 7-day window
  const periodOrders: Order[] = await orders.findByPeriod(
    new Date(windowStartIso),
    new Date(windowEndIso),
  );

  // Step 4: Aggregate OrderItem data across all loaded orders
  const aggregationMap = new Map<
    string,
    { totalQuantity: number; orderIds: Set<string> }
  >();

  for (const order of periodOrders) {
    const items: OrderItem[] = order.items ?? [];
    for (const item of items) {
      const entry = aggregationMap.get(item.menuItemId);
      if (entry) {
        entry.totalQuantity += item.quantity;
        entry.orderIds.add(order.orderId);
      } else {
        aggregationMap.set(item.menuItemId, {
          totalQuantity: item.quantity,
          orderIds: new Set<string>([order.orderId]),
        });
      }
    }
  }

  // Step 5: Load all current StockLevel records
  const allStockLevels: StockLevel[] = await stockLevels.list();

  // Build a lookup by stockItemId for quick join
  const stockByItemId = new Map<string, StockLevel>();
  for (const sl of allStockLevels) {
    stockByItemId.set(sl.stockItemId, sl);
  }

  // Step 6 & 7: Generate promo suggestions by joining sales-frequency with stock data
  const suggestions: PromoSuggestionItem[] = [];

  for (const [menuItemId, agg] of aggregationMap) {
    const stock = stockByItemId.get(menuItemId);
    if (!stock) {
      // No stock record for this menu item — skip (cannot assess overstock)
      continue;
    }

    const orderCount = agg.orderIds.size;
    const totalQuantity = agg.totalQuantity;

    // Only consider items whose current stock is above minimum (overstock candidates)
    if (stock.currentQuantity <= stock.minimumLevel) {
      continue;
    }

    // Determine the surplus ratio: how much above minimum the current stock is
    const surplusRatio =
      stock.minimumLevel > 0
        ? stock.currentQuantity / stock.minimumLevel
        : stock.currentQuantity > 0
          ? Infinity
          : 0;

    // Heuristic for promo type based on sales volume and surplus:
    // - Low sales volume + high surplus → 'discount' (clear overstock aggressively)
    // - Moderate sales volume + moderate surplus → 'bundle' (encourage multi-item purchase)
    // - Moderate-to-high sales volume + surplus → 'featured' (highlight to boost turnover)
    let suggestedPromoType: string;
    let reason: string;

    if (totalQuantity <= 5 && surplusRatio >= 2) {
      suggestedPromoType = 'discount';
      reason =
        `Item "${menuItemId}" has low sales (${totalQuantity} units in ${orderCount} orders ` +
        `over the last 7 days) with current stock (${stock.currentQuantity} ${stock.unit}) ` +
        `well above minimum (${stock.minimumLevel} ${stock.unit}). A discount promo is suggested ` +
        `to accelerate stock turnover.`;
    } else if (totalQuantity <= 15 && surplusRatio >= 1.5) {
      suggestedPromoType = 'bundle';
      reason =
        `Item "${menuItemId}" has moderate sales (${totalQuantity} units in ${orderCount} orders ` +
        `over the last 7 days) with stock (${stock.currentQuantity} ${stock.unit}) above minimum ` +
        `(${stock.minimumLevel} ${stock.unit}). A bundle promo is suggested to increase average order size.`;
    } else if (surplusRatio >= 1.2) {
      suggestedPromoType = 'featured';
      reason =
        `Item "${menuItemId}" has steady sales (${totalQuantity} units in ${orderCount} orders ` +
        `over the last 7 days) with stock (${stock.currentQuantity} ${stock.unit}) above minimum ` +
        `(${stock.minimumLevel} ${stock.unit}). A featured placement is suggested to maintain momentum.`;
    } else {
      // Surplus is not significant enough to warrant a promo
      continue;
    }

    suggestions.push({
      menuItemId,
      totalQuantity,
      orderCount,
      suggestedPromoType,
      reason,
    });
  }

  // Sort suggestions: highest surplus / lowest sales first (most urgent overstock)
  suggestions.sort((a, b) => {
    if (a.totalQuantity !== b.totalQuantity) {
      return a.totalQuantity - b.totalQuantity;
    }
    return b.orderCount - a.orderCount;
  });

  return {
    suggestions,
    windowStart: windowStartIso,
    windowEnd: windowEndIso,
  };
}
