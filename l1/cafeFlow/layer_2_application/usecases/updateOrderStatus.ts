/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { canTransitionOrder } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export interface UpdateOrderStatusInput {
  orderId: string;
  status: string;
  inPreparationAt?: string;
  readyAt?: string;
}

export interface UpdateOrderStatusOutput {
  orderId: string;
  status: string;
  updatedAt: string;
}

export async function updateOrderStatus(
  ctx: RequestContext,
  input: UpdateOrderStatusInput,
): Promise<UpdateOrderStatusOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  // Step 1: Resolve the active shift (status='open')
  const openShifts = await shifts.listOpenShifts();
  if (openShifts.length === 0) {
    throw new AppError(
      'CONFLICT',
      'No open shift found. Cannot update order status without an active shift.',
      409,
      { ruleId: 'orderStatusFlow' },
    );
  }
  const activeShift = openShifts[0];

  // Step 2: Load the order by orderId
  const order = await orders.getById(input.orderId);

  // Step 3: Validate that the order belongs to the active shift
  if (order.shiftId !== activeShift.shiftId) {
    throw new AppError(
      'CONFLICT',
      'Order does not belong to the currently open shift.',
      409,
      { orderId: input.orderId, orderShiftId: order.shiftId, activeShiftId: activeShift.shiftId },
    );
  }

  // Step 4 & 5: Apply orderStatusFlow and inProgressBeforeReady rules
  const newStatus = input.status as OrderStatus;
  const currentStatus = order.status;

  // orderStatusFlow: transitions must follow received → inPreparation → ready without skips
  if (!canTransitionOrder(currentStatus, newStatus)) {
    throw new AppError(
      'CONFLICT',
      `orderStatusFlow: invalid status transition from "${currentStatus}" to "${newStatus}".`,
      409,
      { ruleId: 'orderStatusFlow', from: currentStatus, to: newStatus },
    );
  }

  // inProgressBeforeReady: order can only be marked 'ready' if current status is 'inPreparation'
  if (newStatus === 'ready' && currentStatus !== 'inPreparation') {
    throw new AppError(
      'CONFLICT',
      'inProgressBeforeReady: order must be inPreparation before it can be marked ready.',
      409,
      { ruleId: 'inProgressBeforeReady', currentStatus },
    );
  }

  // Step 6: Set timestamps
  const now = ctx.clock.nowIso();
  const updatedOrder: Order = {
    ...order,
    status: newStatus,
    inPreparationAt:
      newStatus === 'inPreparation'
        ? (input.inPreparationAt ?? now)
        : order.inPreparationAt,
    readyAt:
      newStatus === 'ready'
        ? (input.readyAt ?? now)
        : order.readyAt,
    updatedAt: now,
  };

  // Step 7 & 8: Save order and emit StockConsumption audit event within the same transaction
  await ctx.data.runInTransaction(async () => {
    await orders.save(updatedOrder);

    // Emit append-only StockConsumption audit records for each order item
    for (const item of updatedOrder.items) {
      const consumption: StockConsumption = {
        stockConsumptionId: ctx.idGenerator.newId(),
        stockItemId: item.menuItemId,
        orderId: updatedOrder.orderId,
        quantity: item.quantity,
        status: 'posted',
        createdAt: now,
        voidedAt: null,
        voidReason: null,
      };
      await stockConsumptions.append(consumption);
    }
  });

  // Step 9: Return the updated order status info
  return {
    orderId: updatedOrder.orderId,
    status: updatedOrder.status,
    updatedAt: updatedOrder.updatedAt,
  };
}
