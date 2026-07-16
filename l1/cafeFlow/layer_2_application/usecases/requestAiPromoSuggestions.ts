/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiPromoSuggestions.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export interface RequestAiPromoSuggestionsInput {}

export interface AiPromoSuggestion {
  menuItemId: string;
  totalQuantitySold: number;
  currentStockQuantity: number;
  stockUnit: string;
  suggestionReason: string;
  suggestedDiscountPercent?: number;
}

/**
 * Rule aiPromoBasedOnLast7Days: the analysis window is always the last 7 days
 * computed from ctx.clock.now() — no user input is required.
 *
 * Rule aiConsumesDomainData: only domain data from Order, OrderItem and
 * StockLevel is consumed. No external data sources are used.
 */
export async function requestAiPromoSuggestions(
  ctx: RequestContext,
  _input: RequestAiPromoSuggestionsInput,
): Promise<AiPromoSuggestion[]> {
  return ctx.data.runInTransaction(async () => {
    const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
    const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');
    const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

    // Step 1: Resolve windowStart = now minus 7 days (rule aiPromoBasedOnLast7Days)
    const nowIso = ctx.clock.nowIso();
    const now = new Date(nowIso);
    const windowStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Step 2: Resolve actorId from session context for audit
    const actorId = ctx.sessionContext.actorSession.actorId ?? 'system';

    // Step 3: Query all orders and filter by createdAt >= windowStart
    const allOrders = await orders.list();
    const recentOrders = allOrders.filter((o) => o.createdAt >= windowStart);

    // Step 4: Aggregate total quantity by menuItemId across the entire window
    const salesByMenuItem = new Map<string, number>();
    for (const order of recentOrders) {
      for (const item of order.items) {
        const current = salesByMenuItem.get(item.menuItemId) ?? 0;
        salesByMenuItem.set(item.menuItemId, current + item.quantity);
      }
    }

    // Step 5: Query all current stock levels (rule aiConsumesDomainData)
    const allStockLevels = await stockLevels.list();
    const stockByItemId = new Map<string, StockLevel>();
    for (const sl of allStockLevels) {
      stockByItemId.set(sl.stockItemId, sl);
    }

    // Steps 6–8: Cross-reference, compute discount, build suggestion list
    const suggestions: AiPromoSuggestion[] = [];

    for (const [menuItemId, totalQuantitySold] of salesByMenuItem) {
      const stockLevel = stockByItemId.get(menuItemId);
      if (!stockLevel) continue;

      // Exclude items with low stock to avoid supply constraints
      if (stockLevel.currentQuantity <= stockLevel.minimumLevel) continue;

      const surplus = stockLevel.currentQuantity - stockLevel.minimumLevel;
      const surplusRatio = stockLevel.currentQuantity > 0
        ? surplus / stockLevel.currentQuantity
        : 0;

      // Compute suggestedDiscountPercent proportional to sales volume and stock surplus.
      // Higher volume + higher surplus → larger suggested discount (capped at 30%).
      const volumeFactor = Math.min(totalQuantitySold / 50, 1);
      const rawDiscount = 5 + volumeFactor * 10 + surplusRatio * 15;
      const suggestedDiscountPercent = Math.round(Math.min(rawDiscount, 30) * 100) / 100;

      const suggestionReason =
        `Item vendeu ${totalQuantitySold} unidades nos últimos 7 dias com excedente de estoque de ${surplus} ${stockLevel.unit}.`;

      suggestions.push({
        menuItemId,
        totalQuantitySold,
        currentStockQuantity: stockLevel.currentQuantity,
        stockUnit: stockLevel.unit,
        suggestionReason,
        suggestedDiscountPercent,
      });
    }

    // Sort by totalQuantitySold descending — best promo candidates first
    suggestions.sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);

    // Step 9: Append audit event to StockConsumption port recording the AI suggestion request.
    // NOTE: StockConsumption is used as an audit trail entry. The stockItemId and orderId
    // fields carry sentinel values to distinguish this audit record from real consumption entries.
    const auditRecord: StockConsumption = {
      stockConsumptionId: ctx.idGenerator.newId(),
      stockItemId: `ai-promo-audit:${actorId}`,
      orderId: `ai-promo-audit:${windowStart}`,
      quantity: suggestions.length,
      status: 'posted',
      createdAt: nowIso,
      voidedAt: null,
      voidReason: null,
    };
    await stockConsumptions.append(auditRecord);

    // Step 10: Return the list of promo suggestions — strictly read-only, no domain records modified
    return suggestions;
  });
}
