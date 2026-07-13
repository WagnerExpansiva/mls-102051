/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { OrderStatus, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import { isLowStock } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

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
  unit: StockUnit;
}

export interface ViewDashboardOutput {
  shiftId: string | null;
  totalSales: number;
  orderCount: number;
  orders: OrderSummary[];
  topSellers: TopSeller[];
  lowStockAlerts: LowStockAlert[];
}

export async function viewDashboard(
  ctx: RequestContext,
  _input: ViewDashboardInput,
): Promise<ViewDashboardOutput> {
  // Step 2: Authorization — actor must be an authenticated manager
  const actorId = ctx.sessionContext?.actorSession?.actorId;
  if (!actorId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Authenticated manager session is required to view the dashboard.',
      401,
      { ruleId: 'authorization' },
    );
  }

  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');

  // Step 1: Resolve the currently open shift (activeLifecycleInstance resolution)
  const openShifts = await shifts.list({ status: 'open' });
  const openShift: Shift | null = openShifts.length > 0 ? openShifts[0] : null;

  // If no open shift exists, return an empty dashboard (rule dashboardCurrentShiftOnly)
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

  // Step 3: Load all orders for the resolved shift
  const shiftOrders = await orders.list({ shiftId });

  // Step 4: Build order summaries
  const orderSummaries: OrderSummary[] = shiftOrders.map((order) => ({
    orderId: order.orderId,
    status: order.status,
    orderType: order.orderType,
    createdAt: order.createdAt,
    shiftId: order.shiftId,
    deliveredAt: order.deliveredAt,
  }));

  // Step 5 & 6: Compute totalSales and topSellers from OrderItems of current shift only
  let totalSales = 0;
  const sellerMap = new Map<string, { totalQuantity: number; totalRevenue: number }>();

  for (const order of shiftOrders) {
    for (const item of order.items) {
      const itemTotal = item.unitPrice * item.quantity;
      totalSales += itemTotal;

      const existing = sellerMap.get(item.menuItemId);
      if (existing) {
        existing.totalQuantity += item.quantity;
        existing.totalRevenue += itemTotal;
      } else {
        sellerMap.set(item.menuItemId, {
          totalQuantity: item.quantity,
          totalRevenue: itemTotal,
        });
      }
    }
  }

  // Sort descending by totalQuantity (rule topSellersFromDayOrders)
  const topSellers: TopSeller[] = Array.from(sellerMap.entries())
    .map(([menuItemId, data]) => ({
      menuItemId,
      totalQuantity: data.totalQuantity,
      totalRevenue: data.totalRevenue,
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity);

  // Step 7: Query stock levels and filter for low-stock alerts
  const allStockLevels = await stockLevels.list();
  const lowStockAlerts: LowStockAlert[] = allStockLevels
    .filter((sl) => isLowStock(sl))
    .map((sl) => ({
      stockItemId: sl.stockItemId,
      currentQuantity: sl.currentQuantity,
      minimumLevel: sl.minimumLevel,
      unit: sl.unit,
    }));

  // Step 8: Assemble and return the dashboard (rule dashboardCurrentShiftOnly)
  return {
    shiftId,
    totalSales,
    orderCount: shiftOrders.length,
    orders: orderSummaries,
    topSellers,
    lowStockAlerts,
  };
}
