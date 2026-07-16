/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import { isLowStock } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

export interface ViewDashboardInput {}

export interface DashboardOrder {
  orderId: string;
  status: string;
  orderType: string;
  createdAt: string;
  shiftId: string;
  deliveredAt: string | null;
}

export interface DashboardTopSeller {
  menuItemId: string;
  totalQuantity: number;
  totalRevenue: number;
}

export interface DashboardLowStockAlert {
  stockLevelId: string;
  stockItemId: string;
  currentQuantity: number;
  minimumLevel: number;
  unit: string;
}

export interface ViewDashboardOutput {
  shiftId: string | null;
  totalSales: number;
  orders: DashboardOrder[];
  topSellers: DashboardTopSeller[];
  lowStockAlerts: DashboardLowStockAlert[];
}

function pickMostRecentOpenShift(shifts: Shift[]): Shift | null {
  const openShifts = shifts.filter((s) => s.status === 'open');
  if (openShifts.length === 0) {
    return null;
  }
  openShifts.sort((a, b) => {
    if (a.openedAt > b.openedAt) return -1;
    if (a.openedAt < b.openedAt) return 1;
    return 0;
  });
  return openShifts[0];
}

function buildOrdersProjection(orders: Order[]): DashboardOrder[] {
  return orders.map((o) => ({
    orderId: o.orderId,
    status: o.status,
    orderType: o.orderType,
    createdAt: o.createdAt,
    shiftId: o.shiftId,
    deliveredAt: o.deliveredAt,
  }));
}

function aggregateTopSellers(items: OrderItem[]): DashboardTopSeller[] {
  const map = new Map<string, DashboardTopSeller>();
  for (const item of items) {
    const revenue = item.quantity * item.unitPrice;
    const existing = map.get(item.menuItemId);
    if (existing) {
      existing.totalQuantity += item.quantity;
      existing.totalRevenue += revenue;
    } else {
      map.set(item.menuItemId, {
        menuItemId: item.menuItemId,
        totalQuantity: item.quantity,
        totalRevenue: revenue,
      });
    }
  }
  return [...map.values()].sort((a, b) => b.totalQuantity - a.totalQuantity);
}

function buildLowStockAlerts(stockLevels: StockLevel[]): DashboardLowStockAlert[] {
  return stockLevels
    .filter((sl) => isLowStock(sl))
    .map((sl) => ({
      stockLevelId: sl.stockLevelId,
      stockItemId: sl.stockItemId,
      currentQuantity: sl.currentQuantity,
      minimumLevel: sl.minimumLevel,
      unit: sl.unit,
    }));
}

export async function viewDashboard(
  ctx: RequestContext,
  _input: ViewDashboardInput,
): Promise<ViewDashboardOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');

  // Step 2: resolve the active (open) shift — rule dashboardCurrentShiftOnly
  const openShifts = await shifts.findOpenShifts();
  const activeShift = pickMostRecentOpenShift(openShifts);

  if (!activeShift) {
    return {
      shiftId: null,
      totalSales: 0,
      orders: [],
      topSellers: [],
      lowStockAlerts: [],
    };
  }

  // Step 3: load all orders for the resolved shift
  const shiftOrders = await orders.list({ shiftId: activeShift.shiftId });

  // Step 4: extract all OrderItems from loaded orders
  const allItems: OrderItem[] = shiftOrders.flatMap((o) => o.items ?? []);

  // Step 5: calculate totalSales — rule topSellersFromDayOrders
  const totalSales = allItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  // Step 6: aggregate top sellers — rule topSellersFromDayOrders
  const topSellers = aggregateTopSellers(allItems);

  // Step 7 & 8: load all stock levels and filter for low stock
  const allStockLevels = await stockLevels.list();
  const lowStockAlerts = buildLowStockAlerts(allStockLevels);

  // Step 9: build and return the dashboard projection
  return {
    shiftId: activeShift.shiftId,
    totalSales,
    orders: buildOrdersProjection(shiftOrders),
    topSellers,
    lowStockAlerts,
  };
}
