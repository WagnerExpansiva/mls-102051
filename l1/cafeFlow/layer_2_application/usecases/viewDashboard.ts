/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderItem, OrderStatus, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel, StockLevelUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

export interface ViewDashboardInput {}

export interface OrderSummary {
  orderId: string;
  status: OrderStatus;
  orderType: OrderType;
  createdAt: string;
  shiftId: string;
  deliveredAt: string | null;
}

export interface TopSeller {
  menuItemId: string;
  totalQuantity: number;
  totalRevenue: number;
}

export interface LowStockAlert {
  stockItemId: string;
  currentQuantity: number;
  minimumLevel: number;
  unit: StockLevelUnit;
}

export interface ViewDashboardOutput {
  shiftId: string | null;
  totalSales: number;
  orderCount: number;
  orders: OrderSummary[];
  topSellers: TopSeller[];
  lowStockAlerts: LowStockAlert[];
}

export async function viewDashboard(ctx: RequestContext, _input: ViewDashboardInput): Promise<ViewDashboardOutput> {
  // Step 2 — authorization context: actor must be authenticated
  const actorId = ctx.sessionContext?.actorSession?.actorId;
  if (!actorId) {
    throw new AppError('VALIDATION_ERROR', 'Authenticated actor is required to view the dashboard.', 401, {
      ruleId: 'actorSessionRequired',
    });
  }

  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');

  // Step 1 — resolve the currently open shift (activeLifecycleInstance)
  const openShift: Shift | null = await shifts.findOpenShift();

  // Rule dashboardCurrentShiftOnly: if no open shift, return empty dashboard
  if (!openShift) {
    return {
      shiftId: null,
      totalSales: 0,
      orderCount: 0,
      orders: [],
      topSellers: [],
      lowStockAlerts: [],
    };
  }

  const shiftId = openShift.shiftId;

  // Step 3 — load all orders for the current shift
  const shiftOrders: Order[] = await orders.listByShiftId(shiftId);

  // Step 4 — build order summaries
  const orderSummaries: OrderSummary[] = shiftOrders.map((order) => ({
    orderId: order.orderId,
    status: order.status,
    orderType: order.orderType,
    createdAt: order.createdAt,
    shiftId: order.shiftId,
    deliveredAt: order.deliveredAt,
  }));

  // Step 5 — compute totalSales from all OrderItems across all orders
  const allItems: OrderItem[] = shiftOrders.flatMap((order) => order.items);
  const totalSales = allItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Step 6 — compute topSellers grouped by menuItemId (rule topSellersFromDayOrders)
  const sellerMap = new Map<string, { totalQuantity: number; totalRevenue: number }>();
  for (const item of allItems) {
    const existing = sellerMap.get(item.menuItemId);
    if (existing) {
      existing.totalQuantity += item.quantity;
      existing.totalRevenue += item.unitPrice * item.quantity;
    } else {
      sellerMap.set(item.menuItemId, {
        totalQuantity: item.quantity,
        totalRevenue: item.unitPrice * item.quantity,
      });
    }
  }
  const topSellers: TopSeller[] = Array.from(sellerMap.entries())
    .map(([menuItemId, data]) => ({
      menuItemId,
      totalQuantity: data.totalQuantity,
      totalRevenue: data.totalRevenue,
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity);

  // Step 7 — query stock levels and filter for low-stock alerts
  const allStockLevels: StockLevel[] = await stockLevels.list();
  const lowStockAlerts: LowStockAlert[] = allStockLevels
    .filter((sl) => sl.currentQuantity < sl.minimumLevel)
    .map((sl) => ({
      stockItemId: sl.stockItemId,
      currentQuantity: sl.currentQuantity,
      minimumLevel: sl.minimumLevel,
      unit: sl.unit,
    }));

  // Step 8 — assemble and return dashboard output
  return {
    shiftId,
    totalSales,
    orderCount: shiftOrders.length,
    orders: orderSummaries,
    topSellers,
    lowStockAlerts,
  };
}
