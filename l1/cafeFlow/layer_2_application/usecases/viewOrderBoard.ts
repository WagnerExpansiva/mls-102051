/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

/** Allowed statuses for the kitchen board (orderStatusFlow rule). */
const ALLOWED_BOARD_STATUSES: ReadonlySet<OrderStatus> = new Set<OrderStatus>([
  'registered',
  'received',
  'inPreparation',
  'ready',
  'delivered',
]);

/** Projected order item for the kitchen board view. */
export interface OrderBoardItem {
  orderId: string;
  status: OrderStatus;
  orderType: 'table' | 'takeout';
  tableNumber: string | null;
  priority: boolean | null;
  priorityReason: string | null;
  receivedAt: string | null;
  inPreparationAt: string | null;
  readyAt: string | null;
  createdAt: string;
}

export interface ViewOrderBoardInput {}

export interface ViewOrderBoardOutput {
  orders: OrderBoardItem[];
}

/**
 * View the kitchen order board for the currently open shift.
 *
 * Rules applied:
 * - dashboardCurrentShiftOnly: only orders belonging to the single open shift are shown.
 * - fifoKitchenQueue: orders are sorted by createdAt ascending (oldest first).
 * - orderStatusFlow: only orders with a valid status are included.
 */
export async function viewOrderBoard(
  ctx: RequestContext,
  _input: ViewOrderBoardInput,
): Promise<ViewOrderBoardOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');

  // Step 1: Resolve the currently open Shift (dashboardCurrentShiftOnly rule).
  const openShifts = await shifts.findOpenShifts();

  // Step 2: If no open Shift is found, return an empty orders list.
  if (openShifts.length === 0) {
    return { orders: [] };
  }

  // If multiple open shifts exist, use the most recently opened one.
  const currentShift = openShifts.reduce((latest, shift) =>
    shift.openedAt > latest.openedAt ? shift : latest,
  );

  // Step 3: Query orders for the current open shift.
  const shiftOrders = await orders.list({ shiftId: currentShift.shiftId });

  // Step 5: Filter orders with a valid status (orderStatusFlow rule).
  const validOrders = shiftOrders.filter((order) =>
    ALLOWED_BOARD_STATUSES.has(order.status),
  );

  // Step 4: Sort by createdAt ascending (fifoKitchenQueue rule).
  const sortedOrders = validOrders.slice().sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );

  // Step 6: Project each order to the board item shape.
  const projected: OrderBoardItem[] = sortedOrders.map((order: Order) => ({
    orderId: order.orderId,
    status: order.status,
    orderType: order.orderType,
    tableNumber: order.tableNumber,
    priority: order.priority,
    priorityReason: order.priorityReason,
    receivedAt: order.receivedAt,
    inPreparationAt: order.inPreparationAt,
    readyAt: order.readyAt,
    createdAt: order.createdAt,
  }));

  // Step 7: Return the projected and sorted order list.
  return { orders: projected };
}
