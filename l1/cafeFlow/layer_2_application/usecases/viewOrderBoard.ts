/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface ViewOrderBoardInput {}

export interface ViewOrderBoardOutput {
  orders: Order[];
  currentShiftId?: string;
}

const VALID_BOARD_STATUSES: ReadonlySet<OrderStatus> = new Set<OrderStatus>([
  'registered',
  'received',
  'inPreparation',
  'ready',
  'delivered',
]);

export async function viewOrderBoard(
  ctx: RequestContext,
  _input: ViewOrderBoardInput,
): Promise<ViewOrderBoardOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');

  // Step 1: Resolve the currently open shift (rule: dashboardCurrentShiftOnly)
  const openShift = await shifts.findOpenShift();

  // Step 2: If no open shift is found, return an empty list without error
  if (!openShift) {
    return { orders: [] };
  }

  // Step 3: Query orders for the open shift
  const shiftOrders = await orders.listByShiftId(openShift.shiftId);

  // Step 5: Filter out orders with invalid status (rule: orderStatusFlow)
  const validOrders = shiftOrders.filter(
    (order) => VALID_BOARD_STATUSES.has(order.status),
  );

  // Step 4: Sort by createdAt ascending (rule: fifoKitchenQueue)
  const sortedOrders = validOrders.slice().sort((a, b) => {
    if (a.createdAt < b.createdAt) return -1;
    if (a.createdAt > b.createdAt) return 1;
    return 0;
  });

  // Step 6 & 7: Return the projected list with the resolved currentShiftId
  return {
    orders: sortedOrders,
    currentShiftId: openShift.shiftId,
  };
}
