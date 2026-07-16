/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface ViewKitchenBoardInput {}

export interface KitchenBoardOrderItem {
  orderItemId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
}

export interface KitchenBoardOrder {
  orderId: string;
  status: string;
  orderType: string;
  tableNumber: string | null;
  priority: boolean | null;
  priorityReason: string | null;
  receivedAt: string | null;
  inPreparationAt: string | null;
  createdAt: string;
  items: KitchenBoardOrderItem[];
}

export interface ViewKitchenBoardOutput {
  orders: KitchenBoardOrder[];
}

/**
 * View the kitchen board: returns all orders in 'received' or 'inPreparation' status,
 * sorted by priority (DESC) then receivedAt (ASC) per the fifoKitchenQueue rule.
 *
 * Rules applied:
 * - dashboardCurrentShiftOnly: orders should be filtered to the active (open) shift.
 *   Modeling gap: the Shift port is not available in this module's ports, so the active
 *   shift cannot be resolved. We proceed without the shift filter rather than inventing
 *   a shiftId. If/when the Shift port is added, filter `kitchenOrders` by `shiftId`.
 * - fifoKitchenQueue: sort by priority DESC (true first), then receivedAt ASC (oldest first).
 */
export async function viewKitchenBoard(
  ctx: RequestContext,
  _input: ViewKitchenBoardInput,
): Promise<ViewKitchenBoardOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');

  // Query orders with kitchen-board statuses: 'received' and 'inPreparation'.
  // The port's findByStatus accepts a single status, so we issue two calls and merge.
  const receivedOrders = await orders.findByStatus('received');
  const inPrepOrders = await orders.findByStatus('inPreparation');
  const kitchenOrders = [...receivedOrders, ...inPrepOrders];

  // dashboardCurrentShiftOnly rule:
  // Ideally we would resolve the single open Shift and filter kitchenOrders by shiftId.
  // Modeling gap: Shift port is not registered — we cannot resolve the active shift.
  // Proceed without the shift filter (do not invent a shiftId).

  // fifoKitchenQueue rule: sort by priority DESC (true first), then receivedAt ASC (oldest first).
  const sorted = kitchenOrders.sort((a, b) => {
    const aPriority = a.priority === true ? 1 : 0;
    const bPriority = b.priority === true ? 1 : 0;
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    const aReceived = a.receivedAt ?? a.createdAt;
    const bReceived = b.receivedAt ?? b.createdAt;
    return aReceived.localeCompare(bReceived);
  });

  // Project each order to the kitchen-board view fields.
  const projected: KitchenBoardOrder[] = sorted.map((order) => ({
    orderId: order.orderId,
    status: order.status,
    orderType: order.orderType,
    tableNumber: order.tableNumber,
    priority: order.priority,
    priorityReason: order.priorityReason,
    receivedAt: order.receivedAt,
    inPreparationAt: order.inPreparationAt,
    createdAt: order.createdAt,
    items: order.items.map((item: OrderItem) => ({
      orderItemId: item.orderItemId,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
  }));

  return { orders: projected };
}
