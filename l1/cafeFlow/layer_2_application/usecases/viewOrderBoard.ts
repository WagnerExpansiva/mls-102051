/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface ViewOrderBoardInput {
  shiftId?: string;
  limit?: number;
  offset?: number;
}

export interface OrderBoardItem {
  orderId: string;
  status: string;
  orderType: string;
  tableNumber?: string;
  priority?: boolean;
  priorityReason?: string;
  receivedAt?: string;
  inPreparationAt?: string;
  readyAt?: string;
  createdAt: string;
}

export interface ViewOrderBoardOutput {
  items: OrderBoardItem[];
}

const VALID_BOARD_STATUSES: ReadonlySet<string> = new Set<OrderStatus>([
  'registered',
  'received',
  'inPreparation',
  'ready',
  'delivered',
]);

export async function viewOrderBoard(
  ctx: RequestContext,
  input: ViewOrderBoardInput,
): Promise<ViewOrderBoardOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');

  // Step 1: Resolve shiftId — use provided value or query the single open shift.
  let shiftId = input.shiftId;
  if (!shiftId) {
    const openShifts = await shifts.listOpenShifts();
    // Step 2: dashboardCurrentShiftOnly — there must be exactly one open shift.
    if (openShifts.length === 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        'dashboardCurrentShiftOnly: não há turno ativo (status "open") e o painel não pode ser exibido.',
        400,
        { ruleId: 'dashboardCurrentShiftOnly' },
      );
    }
    if (openShifts.length > 1) {
      throw new AppError(
        'CONFLICT',
        'dashboardCurrentShiftOnly: múltiplos turnos abertos encontrados; esperado apenas um.',
        409,
        { ruleId: 'dashboardCurrentShiftOnly', openShiftCount: openShifts.length },
      );
    }
    shiftId = openShifts[0].shiftId;
  }

  // Step 3: Query all orders for the resolved shift.
  const shiftOrders = await orders.list({ shiftId });

  // Step 5: orderStatusFlow — filter out orders with invalid status (anomaly).
  const validOrders = shiftOrders.filter((order) =>
    VALID_BOARD_STATUSES.has(order.status),
  );

  // Step 4: fifoKitchenQueue — sort by createdAt ascending (FIFO).
  const sortedOrders = validOrders.slice().sort((a, b) => {
    if (a.createdAt < b.createdAt) return -1;
    if (a.createdAt > b.createdAt) return 1;
    return 0;
  });

  // Step 6: Project each order to board fields.
  const boardItems: OrderBoardItem[] = sortedOrders.map((order) =>
    projectToBoardItem(order),
  );

  // Step 7: Apply optional pagination (limit/offset) after FIFO ordering.
  const offset = Math.max(0, input.offset ?? 0);
  const limit = input.limit !== undefined ? Math.max(0, input.limit) : undefined;
  const paginated =
    limit !== undefined
      ? boardItems.slice(offset, offset + limit)
      : boardItems.slice(offset);

  // Step 8: Return the ordered board.
  return { items: paginated };
}

function projectToBoardItem(order: Order): OrderBoardItem {
  return {
    orderId: order.orderId,
    status: order.status,
    orderType: order.orderType,
    tableNumber: order.tableNumber ?? undefined,
    priority: order.priority ?? undefined,
    priorityReason: order.priorityReason ?? undefined,
    receivedAt: order.receivedAt ?? undefined,
    inPreparationAt: order.inPreparationAt ?? undefined,
    readyAt: order.readyAt ?? undefined,
    createdAt: order.createdAt,
  };
}
