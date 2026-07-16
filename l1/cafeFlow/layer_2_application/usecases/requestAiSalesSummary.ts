/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { Order, OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import type { StockLevel, StockLevelUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export interface RequestAiSalesSummaryInput {}

export interface AiSalesSummaryOrderProjection {
  orderId: string;
  status: string;
  orderType: string;
  createdAt: string;
  deliveredAt: string | null;
}

export interface AiSalesSummaryTopSeller {
  menuItemId: string;
  totalQuantity: number;
}

export interface AiSalesSummaryStockAlert {
  stockItemId: string;
  currentQuantity: number;
  minimumLevel: number;
  unit: StockLevelUnit;
}

export interface AiSalesSummary {
  shiftId: string | null;
  totalOrders: number;
  orders: AiSalesSummaryOrderProjection[];
  topSellers: AiSalesSummaryTopSeller[];
  stockAlerts: AiSalesSummaryStockAlert[];
}

export async function requestAiSalesSummary(
  ctx: RequestContext,
  _input: RequestAiSalesSummaryInput,
): Promise<AiSalesSummary> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');

  // Step 1: Resolve the active open Shift (rule: dashboardCurrentShiftOnly)
  const openShifts: Shift[] = await shifts.findOpenShifts();
  if (openShifts.length === 0) {
    return {
      shiftId: null,
      totalOrders: 0,
      orders: [],
      topSellers: [],
      stockAlerts: [],
    };
  }

  const openShift: Shift = openShifts[0];

  // Step 2: Load all Orders for the resolved open shift
  const shiftOrders: Order[] = await orders.list({ shiftId: openShift.shiftId });

  // Step 3: Aggregate OrderItems by menuItemId to compute topSellers (rule: topSellersFromDayOrders)
  const allItems: OrderItem[] = shiftOrders.flatMap((order) => order.items ?? []);
  const quantityByMenuItem = new Map<string, number>();
  for (const item of allItems) {
    const current = quantityByMenuItem.get(item.menuItemId) ?? 0;
    quantityByMenuItem.set(item.menuItemId, current + item.quantity);
  }
  const topSellers: AiSalesSummaryTopSeller[] = [...quantityByMenuItem.entries()]
    .map(([menuItemId, totalQuantity]) => ({ menuItemId, totalQuantity }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity);

  // Step 4: Query StockLevel port for items at or below minimumLevel
  const lowStockLevels: StockLevel[] = await stockLevels.findBelowMinimum();
  const stockAlerts: AiSalesSummaryStockAlert[] = lowStockLevels.map((sl) => ({
    stockItemId: sl.stockItemId,
    currentQuantity: sl.currentQuantity,
    minimumLevel: sl.minimumLevel,
    unit: sl.unit,
  }));

  // Step 5: Assemble the AiSalesSummary result (rule: aiConsumesDomainData)
  const orderProjections: AiSalesSummaryOrderProjection[] = shiftOrders.map((order) => ({
    orderId: order.orderId,
    status: order.status,
    orderType: order.orderType,
    createdAt: order.createdAt,
    deliveredAt: order.deliveredAt,
  }));

  return {
    shiftId: openShift.shiftId,
    totalOrders: shiftOrders.length,
    orders: orderProjections,
    topSellers,
    stockAlerts,
  };
}
