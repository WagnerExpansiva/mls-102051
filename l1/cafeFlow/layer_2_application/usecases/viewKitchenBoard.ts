/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface ViewKitchenBoardInput {}

export interface KitchenBoardOrderItem {
  orderItemId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
}

export interface KitchenBoardEntry {
  orderId: string;
  status: string;
  orderType: string;
  tableNumber?: string;
  priority?: boolean;
  priorityReason?: string;
  receivedAt?: string;
  inPreparationAt?: string;
  createdAt: string;
  orderItems: KitchenBoardOrderItem[];
}

export interface ViewKitchenBoardOutput {
  orders: KitchenBoardEntry[];
}

/**
 * Use-case: viewKitchenBoard
 *
 * Lists all orders of the current open shift whose status is 'received' or
 * 'inPreparation', sorted by priority (priority=true first) and then by
 * receivedAt ascending (FIFO).
 *
 * Rules applied:
 *  - dashboardCurrentShiftOnly: only orders belonging to the active open shift
 *  - fifoKitchenQueue: priority orders first, then FIFO by receivedAt
 */
export async function viewKitchenBoard(
  ctx: RequestContext,
  _input: ViewKitchenBoardInput,
): Promise<ViewKitchenBoardOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');

  // Step 1 — resolve the active (open) shift (activeLifecycleInstance).
  const openShift = await shifts.findOpenShift();
  if (!openShift) {
    // No open shift → empty board.
    return { orders: [] };
  }

  // Step 2 — dashboardCurrentShiftOnly: list orders for the current shift only.
  const shiftOrders = await orders.listByShiftId(openShift.shiftId);

  // Step 3 — filter by status: only 'received' or 'inPreparation'.
  const kitchenOrders = shiftOrders.filter(
    (order) => order.status === 'received' || order.status === 'inPreparation',
  );

  // Step 4 — fifoKitchenQueue: priority=true first, then receivedAt ascending (FIFO).
  const sortedOrders = kitchenOrders.sort((a, b) => {
    const aPriority = a.priority === true ? 1 : 0;
    const bPriority = b.priority === true ? 1 : 0;
    if (aPriority !== bPriority) {
      return bPriority - aPriority; // priority orders first
    }
    const aReceived = a.receivedAt ?? a.createdAt;
    const bReceived = b.receivedAt ?? b.createdAt;
    return aReceived.localeCompare(bReceived); // FIFO ascending
  });

  // Step 5 — project output fields.
  const projected: KitchenBoardEntry[] = sortedOrders.map((order: Order) => {
    const orderItems: KitchenBoardOrderItem[] = (order.items ?? []).map(
      (item: OrderItem) => ({
        orderItemId: item.orderItemId,
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }),
    );

    const entry: KitchenBoardEntry = {
      orderId: order.orderId,
      status: order.status,
      orderType: order.orderType,
      createdAt: order.createdAt,
      orderItems,
    };

    if (order.tableNumber !== null) {
      entry.tableNumber = order.tableNumber;
    }
    if (order.priority !== null) {
      entry.priority = order.priority;
    }
    if (order.priorityReason !== null) {
      entry.priorityReason = order.priorityReason;
    }
    if (order.receivedAt !== null) {
      entry.receivedAt = order.receivedAt;
    }
    if (order.inPreparationAt !== null) {
      entry.inPreparationAt = order.inPreparationAt;
    }

    return entry;
  });

  // Step 6 — return the projected collection.
  return { orders: projected };
}
