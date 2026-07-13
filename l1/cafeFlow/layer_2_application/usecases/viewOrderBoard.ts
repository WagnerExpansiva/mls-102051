/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { ORDER_STATUS_SEQUENCE } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface ViewOrderBoardInput {}

export interface ViewOrderBoardOutput {
  orders: Order[];
  currentShiftId?: string;
}

const VALID_BOARD_STATUSES: ReadonlySet<OrderStatus> = new Set(ORDER_STATUS_SEQUENCE);

export async function viewOrderBoard(
  ctx: RequestContext,
  _input: ViewOrderBoardInput,
): Promise<ViewOrderBoardOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');

  // Step 1: Resolve the currently open shift (rule: dashboardCurrentShiftOnly)
  const openShifts = await shifts.list({ status: 'open' });
  const openShift = openShifts.length > 0 ? openShifts[0] : null;

  // Step 2: If no open shift is found, return an empty list without error
  if (!openShift) {
    return { orders: [] };
  }

  // Step 3: Query orders for the open shift
  const shiftOrders = await orders.list({ shiftId: openShift.shiftId });

  // Step 5: Filter out orders whose status is not in the allowed enum (rule: orderStatusFlow)
  const validOrders = shiftOrders.filter(
    (order) => VALID_BOARD_STATUSES.has(order.status),
  );

  // Step 4: Sort by createdAt ascending — FIFO kitchen queue (rule: fifoKitchenQueue)
  const sortedOrders = [...validOrders].sort(
    (a, b) => a.createdAt.localeCompare(b.createdAt),
  );

  // Step 7: Return the projected list along with the resolved currentShiftId
  return {
    orders: sortedOrders,
    currentShiftId: openShift.shiftId,
  };
}
