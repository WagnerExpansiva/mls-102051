/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiPromoSuggestions.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export interface PromoSuggestion {
  menuItemId: string;
  totalQuantitySold: number;
  averageUnitPrice: number;
  currentStockQuantity: number;
  suggestionScore: number;
  rationale: string;
}

export interface RequestAiPromoSuggestionsInput {}

export interface RequestAiPromoSuggestionsOutput {
  suggestions: PromoSuggestion[];
  windowStart: string;
  windowEnd: string;
}

const ANALYSIS_WINDOW_DAYS = 7;
const MIN_SALES_VOLUME = 1;

interface AggregatedSales {
  menuItemId: string;
  totalQuantitySold: number;
  totalRevenue: number;
  occurrenceCount: number;
}

function computeWindowStart(nowIso: string, days: number): string {
  const now = new Date(nowIso);
  const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return start.toISOString();
}

function aggregateOrderItems(orders: { items: OrderItem[] }[]): Map<string, AggregatedSales> {
  const map = new Map<string, AggregatedSales>();
  for (const order of orders) {
    for (const item of order.items) {
      const existing = map.get(item.menuItemId);
      if (existing) {
        existing.totalQuantitySold += item.quantity;
        existing.totalRevenue += item.quantity * item.unitPrice;
        existing.occurrenceCount += 1;
      } else {
        map.set(item.menuItemId, {
          menuItemId: item.menuItemId,
          totalQuantitySold: item.quantity,
          totalRevenue: item.quantity * item.unitPrice,
          occurrenceCount: 1,
        });
      }
    }
  }
  return map;
}

function buildStockMap(stockLevels: StockLevel[]): Map<string, StockLevel> {
  const map = new Map<string, StockLevel>();
  for (const sl of stockLevels) {
    map.set(sl.stockItemId, sl);
  }
  return map;
}

function computeSuggestionScore(
  totalQuantitySold: number,
  currentStockQuantity: number,
  minimumLevel: number,
): number {
  const safeMinimum = Math.max(minimumLevel, 1);
  const surplusRatio = currentStockQuantity / safeMinimum;
  return totalQuantitySold * surplusRatio;
}

function buildRationale(
  totalQuantitySold: number,
  averageUnitPrice: number,
  currentStockQuantity: number,
  minimumLevel: number,
): string {
  const surplus = currentStockQuantity - minimumLevel;
  const stockStatus =
    surplus > 0
      ? `excesso de estoque (${surplus.toFixed(2)} acima do mínimo)`
      : currentStockQuantity <= minimumLevel
        ? 'estoque baixo próximo ao mínimo'
        : 'estoque equilibrado';
  return (
    `Item vendeu ${totalQuantitySold} unidades nos últimos ${ANALYSIS_WINDOW_DAYS} dias ` +
    `(preço médio ${averageUnitPrice.toFixed(2)}), com ${stockStatus}. ` +
    `Sugestão de promoção para movimentar excedente e alavancar vendas.`
  );
}

export async function requestAiPromoSuggestions(
  ctx: RequestContext,
  _input: RequestAiPromoSuggestionsInput,
): Promise<RequestAiPromoSuggestionsOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');
  const stockConsumption = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  const nowIso = ctx.clock.nowIso();
  const windowEnd = nowIso;
  const windowStart = computeWindowStart(nowIso, ANALYSIS_WINDOW_DAYS);

  // Rule: aiPromoBasedOnLast7Days — load orders within the 7-day window
  const recentOrders = await orders.listByPeriod(new Date(windowStart), new Date(windowEnd));

  // Aggregate OrderItem data from embedded children (no separate OrderItem repository)
  const salesMap = aggregateOrderItems(recentOrders);

  // Load all StockLevel records to identify surplus stock
  const allStockLevels = await stockLevels.list();
  const stockMap = buildStockMap(allStockLevels);

  // Rule: aiConsumesDomainData — build suggestions exclusively from domain data
  const suggestions: PromoSuggestion[] = [];

  for (const [menuItemId, sales] of salesMap) {
    if (sales.totalQuantitySold < MIN_SALES_VOLUME) {
      continue;
    }

    const stock = stockMap.get(menuItemId);
    const currentStockQuantity = stock?.currentQuantity ?? 0;
    const minimumLevel = stock?.minimumLevel ?? 0;
    const averageUnitPrice = sales.totalRevenue / sales.totalQuantitySold;

    const suggestionScore = computeSuggestionScore(
      sales.totalQuantitySold,
      currentStockQuantity,
      minimumLevel,
    );

    suggestions.push({
      menuItemId,
      totalQuantitySold: sales.totalQuantitySold,
      averageUnitPrice: Math.round(averageUnitPrice * 100) / 100,
      currentStockQuantity,
      suggestionScore: Math.round(suggestionScore * 100) / 100,
      rationale: buildRationale(sales.totalQuantitySold, averageUnitPrice, currentStockQuantity, minimumLevel),
    });
  }

  // Sort by score descending
  suggestions.sort((a, b) => b.suggestionScore - a.suggestionScore);

  // Append a StockConsumption audit event recording that promo suggestions were requested.
  // This is a read-only audit trail — no mutation to Order or StockLevel aggregates.
  const auditRecord: StockConsumption = {
    stockConsumptionId: ctx.idGenerator.newId(),
    stockItemId: 'ai-promo-suggestions',
    orderId: 'ai-promo-suggestions',
    quantity: suggestions.length,
    status: 'posted',
    createdAt: nowIso,
    voidedAt: null,
    voidReason: null,
  };
  await stockConsumption.append(auditRecord);

  return {
    suggestions,
    windowStart,
    windowEnd,
  };
}
