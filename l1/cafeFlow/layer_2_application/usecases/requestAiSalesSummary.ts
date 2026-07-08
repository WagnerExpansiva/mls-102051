/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { Order, OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export interface RequestAiSalesSummaryInput {}

export interface RequestAiSalesSummaryOrder {
  orderId: string;
  status: string;
  orderType: string;
  createdAt: string;
  deliveredAt: string | null;
}

export interface RequestAiSalesSummaryTopSeller {
  menuItemId: string;
  totalQuantity: number;
  totalRevenue: number;
}

export interface RequestAiSalesSummaryStockLevel {
  stockItemId: string;
  currentQuantity: number;
  minimumLevel: number;
  unit: string;
}

export interface RequestAiSalesSummaryOutput {
  shiftId: string;
  orders: RequestAiSalesSummaryOrder[];
  topSellers: RequestAiSalesSummaryTopSeller[];
  stockLevels: RequestAiSalesSummaryStockLevel[];
  summaryText: string;
}

export async function requestAiSalesSummary(
  ctx: RequestContext,
  _input: RequestAiSalesSummaryInput,
): Promise<RequestAiSalesSummaryOutput> {
  // Step 1 — resolve actorId from session (rule: actorSession)
  const actorId = ctx.sessionContext.actorId;
  if (!actorId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Autorização necessária: actorId não encontrado na sessão.',
      401,
      { ruleId: 'actorSession' },
    );
  }

  // Step 2 — find the single open shift (rule: dashboardCurrentShiftOnly)
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const openShifts = await shifts.listOpenShifts();
  if (openShifts.length === 0) {
    throw new AppError(
      'NOT_FOUND',
      'Nenhum turno aberto encontrado.',
      404,
      { ruleId: 'dashboardCurrentShiftOnly' },
    );
  }
  const openShift: Shift = openShifts[0];
  const shiftId = openShift.shiftId;

  // Step 3 — query orders for the current shift
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const shiftOrders: Order[] = await orders.list({ shiftId });

  // Map orders to the output shape
  const orderSummaries: RequestAiSalesSummaryOrder[] = shiftOrders.map((o) => ({
    orderId: o.orderId,
    status: o.status,
    orderType: o.orderType,
    createdAt: o.createdAt,
    deliveredAt: o.deliveredAt,
  }));

  // Step 4 — aggregate OrderItems by menuItemId to produce topSellers (rule: topSellersFromDayOrders)
  const allItems: OrderItem[] = shiftOrders.flatMap((o) => o.items);
  const aggregationMap = new Map<string, { totalQuantity: number; totalRevenue: number }>();
  for (const item of allItems) {
    const existing = aggregationMap.get(item.menuItemId);
    const quantity = item.quantity;
    const revenue = quantity * item.unitPrice;
    if (existing) {
      existing.totalQuantity += quantity;
      existing.totalRevenue += revenue;
    } else {
      aggregationMap.set(item.menuItemId, { totalQuantity: quantity, totalRevenue: revenue });
    }
  }
  const topSellers: RequestAiSalesSummaryTopSeller[] = Array.from(aggregationMap.entries())
    .map(([menuItemId, agg]) => ({
      menuItemId,
      totalQuantity: agg.totalQuantity,
      totalRevenue: agg.totalRevenue,
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity);

  // Step 5 — query all current stock levels
  const stockLevelsRepo = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');
  const allStockLevels: StockLevel[] = await stockLevelsRepo.list();
  const stockLevelSummaries: RequestAiSalesSummaryStockLevel[] = allStockLevels.map((sl) => ({
    stockItemId: sl.stockItemId,
    currentQuantity: sl.currentQuantity,
    minimumLevel: sl.minimumLevel,
    unit: sl.unit,
  }));

  // Step 6 — consolidate into a structured summary text (rule: aiConsumesDomainData)
  const lowStockItems = stockLevelSummaries.filter((s) => s.currentQuantity <= s.minimumLevel);
  const totalRevenue = topSellers.reduce((sum, ts) => sum + ts.totalRevenue, 0);
  const totalOrders = orderSummaries.length;
  const deliveredCount = orderSummaries.filter((o) => o.deliveredAt !== null).length;

  const summaryText = [
    `Resumo do turno ${shiftId} (aberto em ${openShift.openedAt}):`,
    `Total de pedidos: ${totalOrders} (${deliveredCount} entregues).`,
    `Receita total estimada: ${totalRevenue.toFixed(2)}.`,
    `Itens mais vendidos: ${topSellers
      .slice(0, 5)
      .map((ts) => `${ts.menuItemId} (${ts.totalQuantity} un, R$ ${ts.totalRevenue.toFixed(2)})`)
      .join(', ') || 'nenhum'}.`,
    `Níveis de estoque: ${stockLevelSummaries.length} itens monitorados.`,
    `Itens com estoque baixo: ${lowStockItems
      .map((s) => s.stockItemId)
      .join(', ') || 'nenhum'}.`,
  ].join(' ');

  // Step 7 — return consolidated result
  return {
    shiftId,
    orders: orderSummaries,
    topSellers,
    stockLevels: stockLevelSummaries,
    summaryText,
  };
}
