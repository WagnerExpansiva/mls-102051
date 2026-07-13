/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { canTransitionOrder } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface UpdateOrderStatusInput {
  orderId: string;
  status: string;
}

export interface UpdateOrderStatusOutput {
  orderId: string;
  status: string;
  updatedAt: string;
}

/**
 * Allowed target statuses for this usecase (kitchen flow).
 */
const ALLOWED_TARGETS: OrderStatus[] = ['inPreparation', 'ready'];

export async function updateOrderStatus(
  ctx: RequestContext,
  input: UpdateOrderStatusInput,
): Promise<UpdateOrderStatusOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');

  // Step 1 — resolve the single open shift
  const openShifts = await shifts.list({ status: 'open' });
  if (openShifts.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'No active shift found. Cannot update order status without an open shift.',
      400,
      { ruleId: 'noActiveShift' },
    );
  }
  const activeShift = openShifts[0];

  // Step 2 — load the order
  const order = await orders.getById(input.orderId);
  if (!order) {
    throw new AppError('NOT_FOUND', `Order not found: ${input.orderId}`, 404, {
      orderId: input.orderId,
    });
  }

  // Step 3 — validate the order belongs to the active shift
  if (order.shiftId !== activeShift.shiftId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'ORDER_NOT_IN_ACTIVE_SHIFT: the order does not belong to the currently open shift.',
      400,
      { ruleId: 'ORDER_NOT_IN_ACTIVE_SHIFT', orderShiftId: order.shiftId, activeShiftId: activeShift.shiftId },
    );
  }

  // Step 4 — apply transition rules (orderStatusFlow + inProgressBeforeReady)
  const targetStatus = input.status as OrderStatus;
  const currentStatus = order.status;

  if (!ALLOWED_TARGETS.includes(targetStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `INVALID_STATUS_TRANSITION: orderStatusFlow — target status "${targetStatus}" is not allowed by this operation.`,
      400,
      { ruleId: 'orderStatusFlow', currentStatus, targetStatus },
    );
  }

  if (targetStatus === 'inPreparation' && currentStatus !== 'received') {
    throw new AppError(
      'VALIDATION_ERROR',
      `INVALID_STATUS_TRANSITION: orderStatusFlow — can only move to "inPreparation" from "received" (current: "${currentStatus}").`,
      400,
      { ruleId: 'orderStatusFlow', currentStatus, targetStatus },
    );
  }

  if (targetStatus === 'ready' && currentStatus !== 'inPreparation') {
    throw new AppError(
      'VALIDATION_ERROR',
      `INVALID_STATUS_TRANSITION: inProgressBeforeReady — can only move to "ready" from "inPreparation" (current: "${currentStatus}").`,
      400,
      { ruleId: 'inProgressBeforeReady', currentStatus, targetStatus },
    );
  }

  // Double-check via domain invariant
  if (!canTransitionOrder(currentStatus, targetStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `INVALID_STATUS_TRANSITION: orderStatusFlow — transition from "${currentStatus}" to "${targetStatus}" is not permitted.`,
      400,
      { ruleId: 'orderStatusFlow', currentStatus, targetStatus },
    );
  }

  // Step 5 — set timestamps
  const now = ctx.clock.nowIso();

  // Step 6 — mutate the order in memory
  const updatedOrder: Order = {
    ...order,
    status: targetStatus,
    inPreparationAt: targetStatus === 'inPreparation' ? now : order.inPreparationAt,
    readyAt: targetStatus === 'ready' ? now : order.readyAt,
    updatedAt: now,
  };

  // Step 7 — save inside a transaction
  await ctx.data.runInTransaction(async () => {
    await orders.save(updatedOrder);
    // Step 8 — StockConsumption event gap:
    // The StockConsumption port is declared at the usecase level but is NOT in the
    // function's ports list ['Order','Shift']. The event cannot be appended without
    // resolving the port. This is a modeling gap — skip the event write until the
    // StockConsumption port is added to the function's ports.
  });

  // Step 9 — return result
  return {
    orderId: updatedOrder.orderId,
    status: updatedOrder.status,
    updatedAt: updatedOrder.updatedAt,
  };
}
