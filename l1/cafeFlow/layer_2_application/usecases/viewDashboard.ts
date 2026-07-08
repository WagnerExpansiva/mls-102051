/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import { isLowStockAlert } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

export interface ViewDashboardInput {}

export interface DashboardOrderSummary {
  orderId: string;
  status: Order['status'];
  orderType: Order['orderType'];
  createdAt: string;
  deliveredAt: string | null;
  totalAmount: number;
}

export interface DashboardTopSeller {
  menuItemId: string;
  totalQuantity: number;
}

export interface DashboardLowStockAlert {
  stockLevelId: string;
  stockItemId: string;
  currentQuantity: number;
  minimumLevel: number;
  unit: StockLevel['unit'];
}

export interface ViewDashboardOutput {
  shiftId: string;
  totalSales: number;
  orders: DashboardOrderSummary[];
  topSellers: DashboardTopSeller[];
  lowStockAlerts: DashboardLowStockAlert[];
}

function computeOrderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export async function viewDashboard(ctx: RequestContext, _input: ViewDashboardInput): Promise<ViewDashboardOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');

  // Step 1: authorization — actorId from session
  const _actorId = ctx.sessionContext.actorId;
  if (!_actorId) {
    throw new AppError('VALIDATION_ERROR', 'dashboardCurrentShiftOnly: actorId is required to view the dashboard.', 400, {
      ruleId: 'dashboardCurrentShiftOnly',
    });
  }

  // Step 2: find the single open shift (rule: dashboardCurrentShiftOnly)
  const openShifts = await shifts.listOpenShifts();
  if (openShifts.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'dashboardCurrentShiftOnly: no open shift found.', 400, {
      ruleId: 'dashboardCurrentShiftOnly',
    });
  }
  const currentShift: Shift = openShifts[0];
  const shiftId = currentShift.shiftId;

  // Step 3: list all orders for the current shift
  const shiftOrders = await orders.list({ shiftId });

  // Step 4: calculate totalSales and build order summaries
  let totalSales = 0;
  const orderSummaries: DashboardOrderSummary[] = [];
  const menuItemQuantities = new Map<string, number>();

  for (const order of shiftOrders) {
    const orderTotal = computeOrderTotal(order.items);
    totalSales += orderTotal;

    orderSummaries.push({
      orderId: order.orderId,
      status: order.status,
      orderType: order.orderType,
      createdAt: order.createdAt,
      deliveredAt: order.deliveredAt,
      totalAmount: orderTotal,
    });

    // Step 5: aggregate OrderItem quantities by menuItemId (rule: topSellersFromDayOrders)
    for (const item of order.items) {
      const current = menuItemQuantities.get(item.menuItemId) ?? 0;
      menuItemQuantities.set(item.menuItemId, current + item.quantity);
    }
  }

  const topSellers: DashboardTopSeller[] = Array.from(menuItemQuantities.entries())
    .map(([menuItemId, totalQuantity]) => ({ menuItemId, totalQuantity }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity);

  // Step 6: query StockLevel and filter low stock alerts
  const allStockLevels = await stockLevels.list();
  const lowStockAlerts: DashboardLowStockAlert[] = allStockLevels
    .filter((sl) => isLowStockAlert(sl))
    .map((sl) => ({
      stockLevelId: sl.stockLevelId,
      stockItemId: sl.stockItemId,
      currentQuantity: sl.currentQuantity,
      minimumLevel: sl.minimumLevel,
      unit: sl.unit,
    }));

  // Step 7: assemble and return dashboard
  return {
    shiftId,
    totalSales,
    orders: orderSummaries,
    topSellers,
    lowStockAlerts,
  };
}
