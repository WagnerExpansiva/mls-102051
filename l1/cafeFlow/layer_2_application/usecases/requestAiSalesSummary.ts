/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { Order, OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export interface AiSalesSummaryInput {}

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
  totalRevenue: number;
}

export interface AiSalesSummaryStockLevelProjection {
  stockItemId: string;
  currentQuantity: number;
  minimumLevel: number;
  unit: string;
}

export interface AiSalesSummaryOutput {
  shiftId: string | null;
  shiftOpenedAt: string | null;
  totalOrders: number;
  totalRevenue: number;
  orders: AiSalesSummaryOrderProjection[];
  topSellers: AiSalesSummaryTopSeller[];
  stockLevels: AiSalesSummaryStockLevelProjection[];
}

export async function requestAiSalesSummary(
  ctx: RequestContext,
  _input: AiSalesSummaryInput,
): Promise<AiSalesSummaryOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');

  // Step 1: Resolve the active lifecycle instance — the single open Shift.
  // Rule: dashboardCurrentShiftOnly
  const openShift = await shifts.findOpenShift();

  if (!openShift) {
    return {
      shiftId: null,
      shiftOpenedAt: null,
      totalOrders: 0,
      totalRevenue: 0,
      orders: [],
      topSellers: [],
      stockLevels: [],
    };
  }

  // Step 2: Extract shiftId and shiftOpenedAt from the open Shift.
  const shiftId = openShift.shiftId;
  const shiftOpenedAt = openShift.openedAt;

  // Step 3: Load all Orders for the resolved shiftId.
  const shiftOrders: Order[] = await orders.listByShiftId(shiftId);

  // Step 4: Project each Order to the output shape.
  const orderProjections: AiSalesSummaryOrderProjection[] = shiftOrders.map((order) => ({
    orderId: order.orderId,
    status: order.status,
    orderType: order.orderType,
    createdAt: order.createdAt,
    deliveredAt: order.deliveredAt,
  }));

  // Step 5: Aggregate OrderItems across all loaded Orders.
  // Rule: topSellersFromDayOrders
  const sellerMap = new Map<string, AiSalesSummaryTopSeller>();
  let totalRevenue = 0;

  for (const order of shiftOrders) {
    for (const item of order.items) {
      const itemRevenue = item.unitPrice * item.quantity;
      totalRevenue += itemRevenue;

      const existing = sellerMap.get(item.menuItemId);
      if (existing) {
        existing.totalQuantity += item.quantity;
        existing.totalRevenue += itemRevenue;
      } else {
        sellerMap.set(item.menuItemId, {
          menuItemId: item.menuItemId,
          totalQuantity: item.quantity,
          totalRevenue: itemRevenue,
        });
      }
    }
  }

  const topSellers: AiSalesSummaryTopSeller[] = [...sellerMap.values()].sort(
    (a, b) => b.totalQuantity - a.totalQuantity,
  );

  // Step 6: Compute totalOrders and totalRevenue.
  const totalOrders = shiftOrders.length;

  // Step 7: Load all StockLevel records and project each.
  const allStockLevels: StockLevel[] = await stockLevels.list();
  const stockLevelProjections: AiSalesSummaryStockLevelProjection[] = allStockLevels.map((sl) => ({
    stockItemId: sl.stockItemId,
    currentQuantity: sl.currentQuantity,
    minimumLevel: sl.minimumLevel,
    unit: sl.unit,
  }));

  // Step 8: Assemble and return the output — only domain-sourced data.
  // Rule: aiConsumesDomainData
  return {
    shiftId,
    shiftOpenedAt,
    totalOrders,
    totalRevenue,
    orders: orderProjections,
    topSellers,
    stockLevels: stockLevelProjections,
  };
}
