/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderItem, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface ViewKitchenBoardInput {}

export interface ViewKitchenBoardOrderItem {
  orderItemId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
}

export interface ViewKitchenBoardOutput {
  orderId: string;
  status: string;
  orderType: string;
  tableNumber?: string;
  priority?: boolean;
  priorityReason?: string;
  receivedAt?: string;
  inPreparationAt?: string;
  createdAt: string;
  orderItems: ViewKitchenBoardOrderItem[];
}

/**
 * Usecase: viewKitchenBoard
 *
 * Lists orders for the kitchen board, scoped to the current open shift,
 * filtered to 'received' and 'inPreparation' statuses, sorted by FIFO
 * (priority orders first, then by receivedAt ascending).
 *
 * Rules applied:
 * - dashboardCurrentShiftOnly: only orders from the active (open) shift
 * - fifoKitchenQueue: priority=true first, then receivedAt ascending
 */
export async function viewKitchenBoard(
  ctx: RequestContext,
  _input: ViewKitchenBoardInput,
): Promise<ViewKitchenBoardOutput[]> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');

  // Step 1: Resolve the active (open) shift — the activeLifecycleInstance.
  const openShifts = await shifts.list({ status: 'open' });
  if (openShifts.length === 0) {
    // No open shift — return empty board.
    return [];
  }
  const activeShift = openShifts[0];

  // Step 2: dashboardCurrentShiftOnly — filter orders by the active shift.
  const shiftOrders = await orders.list({ shiftId: activeShift.shiftId });

  // Step 3: Filter by status — only 'received' or 'inPreparation'.
  const kitchenStatuses: OrderStatus[] = ['received', 'inPreparation'];
  const kitchenOrders = shiftOrders.filter((order) =>
    kitchenStatuses.includes(order.status),
  );

  // Step 4: fifoKitchenQueue — priority=true first, then receivedAt ascending.
  const sortedOrders = kitchenOrders.sort((a, b) => {
    const aPriority = a.priority === true ? 1 : 0;
    const bPriority = b.priority === true ? 1 : 0;
    if (aPriority !== bPriority) {
      return bPriority - aPriority; // priority=true comes first
    }
    // Within the same priority group, sort by receivedAt ascending (FIFO).
    const aReceivedAt = a.receivedAt ?? a.createdAt;
    const bReceivedAt = b.receivedAt ?? b.createdAt;
    return aReceivedAt.localeCompare(bReceivedAt);
  });

  // Step 5 & 6: Project output fields.
  return sortedOrders.map((order: Order): ViewKitchenBoardOutput => {
    const orderItems: ViewKitchenBoardOrderItem[] = (order.items ?? []).map(
      (item: OrderItem) => ({
        orderItemId: item.orderItemId,
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }),
    );

    return {
      orderId: order.orderId,
      status: order.status,
      orderType: order.orderType,
      tableNumber: order.tableNumber ?? undefined,
      priority: order.priority ?? undefined,
      priorityReason: order.priorityReason ?? undefined,
      receivedAt: order.receivedAt ?? undefined,
      inPreparationAt: order.inPreparationAt ?? undefined,
      createdAt: order.createdAt,
      orderItems,
    };
  });
}
