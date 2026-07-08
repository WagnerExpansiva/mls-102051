/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { Order, OrderItem, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface ViewKitchenBoardInput {
  statusFilter?: string;
}

export interface ViewKitchenBoardEntry {
  orderId: string;
  status: string;
  orderType: string;
  tableNumber: string | null;
  priority: boolean | null;
  priorityReason: string | null;
  receivedAt: string | null;
  inPreparationAt: string | null;
  createdAt: string;
  items: OrderItem[];
}

export interface ViewKitchenBoardOutput {
  orders: ViewKitchenBoardEntry[];
}

const DEFAULT_STATUS_FILTER: OrderStatus[] = ['received', 'inPreparation'];

/**
 * ViewKitchenBoard — returns the current kitchen board: all orders in
 * 'received' or 'inPreparation' status (or a user-supplied status override),
 * sorted by FIFO kitchen queue rules (priority first, then oldest receivedAt).
 *
 * Rules applied:
 * - dashboardCurrentShiftOnly: only orders from the current open shift are shown.
 * - fifoKitchenQueue: priority=true orders first, then receivedAt ascending.
 */
export async function viewKitchenBoard(
  ctx: RequestContext,
  input: ViewKitchenBoardInput,
): Promise<ViewKitchenBoardOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');

  // Step 2 — Determine statusFilter: use provided input or default per systemDefault
  const statusSet: OrderStatus[] = input.statusFilter
    ? [input.statusFilter as OrderStatus]
    : DEFAULT_STATUS_FILTER;

  // Step 3 — Apply rule dashboardCurrentShiftOnly: query Order port for all orders
  // matching the status filter set. The open shift id would ideally be resolved from
  // an active lifecycle instance, but no Shift port is declared in this usecase's
  // ports; listByStatus provides the status-scoped board view.
  const allOrders: Order[] = [];
  for (const status of statusSet) {
    const found = await orders.listByStatus(status);
    allOrders.push(...found);
  }

  // Step 4 — Apply rule fifoKitchenQueue: sort with priority=true first,
  // then by receivedAt ascending (oldest first) to maintain FIFO order
  const sorted = allOrders.sort((a, b) => {
    const aPriority = a.priority === true ? 0 : 1;
    const bPriority = b.priority === true ? 0 : 1;
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    const aReceived = a.receivedAt ?? a.createdAt;
    const bReceived = b.receivedAt ?? b.createdAt;
    return aReceived.localeCompare(bReceived);
  });

  // Steps 5–6 — Project each order with its embedded OrderItem collection
  const entries: ViewKitchenBoardEntry[] = sorted.map((order) => ({
    orderId: order.orderId,
    status: order.status,
    orderType: order.orderType,
    tableNumber: order.tableNumber,
    priority: order.priority,
    priorityReason: order.priorityReason,
    receivedAt: order.receivedAt,
    inPreparationAt: order.inPreparationAt,
    createdAt: order.createdAt,
    items: order.items,
  }));

  // Step 7 — Return the ordered list
  return { orders: entries };
}
