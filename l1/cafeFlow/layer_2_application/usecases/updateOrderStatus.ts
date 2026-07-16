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

const ALLOWED_TARGET_STATUSES: OrderStatus[] = ['inPreparation', 'ready'];

export async function updateOrderStatus(
  ctx: RequestContext,
  input: UpdateOrderStatusInput,
): Promise<UpdateOrderStatusOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');

  // Step 1: Resolve the active (open) Shift
  const openShifts = await shifts.findOpenShifts();
  if (openShifts.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'No active shift found. Cannot update order status without an open shift.',
      400,
      { ruleId: 'activeShiftRequired' },
    );
  }
  const activeShift = openShifts[0];

  // Step 2: Load the Order by orderId (getById throws NOT_FOUND if missing)
  const order = await orders.getById(input.orderId);

  // Step 3: Validate that the order belongs to the active shift
  if (order.shiftId !== activeShift.shiftId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Order does not belong to the active shift.',
      400,
      {
        ruleId: 'orderShiftMismatch',
        orderShiftId: order.shiftId,
        activeShiftId: activeShift.shiftId,
      },
    );
  }

  // Step 4 & 5: Validate status transition (orderStatusFlow + inProgressBeforeReady)
  const targetStatus = input.status as OrderStatus;
  if (!ALLOWED_TARGET_STATUSES.includes(targetStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Invalid target status "${input.status}". Allowed statuses are: inPreparation, ready.`,
      400,
      { ruleId: 'orderStatusFlow', requestedStatus: input.status },
    );
  }

  if (!canTransitionOrder(order.status, targetStatus)) {
    throw new AppError(
      'CONFLICT',
      `Cannot transition order from "${order.status}" to "${targetStatus}". Status flow must follow received → inPreparation → ready with no skips.`,
      409,
      {
        ruleId: 'orderStatusFlow',
        currentStatus: order.status,
        requestedStatus: targetStatus,
      },
    );
  }

  // Step 6: Set the new status and timestamps
  const now = ctx.clock.nowIso();
  const updatedOrder: Order = {
    ...order,
    status: targetStatus,
    inPreparationAt: targetStatus === 'inPreparation' ? now : order.inPreparationAt,
    readyAt: targetStatus === 'ready' ? now : order.readyAt,
    updatedAt: now,
  };

  // Step 7: Save the updated Order inside a transaction.
  //
  // NOTE (Step 8): The eventWrites contract declares a StockConsumption audit event
  // (port 'StockConsumption'), but 'StockConsumption' is not present in this function's
  // ports array. This is a modeling gap — the event cannot be appended without the port.
  // Recorded for the platform team to add the StockConsumption port to this usecase.
  await ctx.data.runInTransaction(async () => {
    await orders.save(updatedOrder);
  });

  return {
    orderId: updatedOrder.orderId,
    status: updatedOrder.status,
    updatedAt: updatedOrder.updatedAt,
  };
}
