/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/deliverOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { canTransitionOrder } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface DeliverOrderInput {
  orderId: string;
}

export interface DeliverOrderOutput {
  orderId: string;
  status: string;
  deliveredAt: string;
  updatedAt: string;
}

export async function deliverOrder(
  ctx: RequestContext,
  input: DeliverOrderInput,
): Promise<DeliverOrderOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const now = ctx.clock.nowIso();

  // 1. Load the Order aggregate by orderId
  const order = await orders.getById(input.orderId);

  // 2. Rule readyBeforeDelivered — status MUST be 'ready'
  if (order.status !== 'ready') {
    throw new AppError(
      'VALIDATION_ERROR',
      'readyBeforeDelivered: o pedido deve estar com status "ready" antes de ser entregue.',
      400,
      { ruleId: 'readyBeforeDelivered', currentStatus: order.status },
    );
  }

  // 3. Rule orderStatusFlow — transition 'ready' -> 'delivered' must be permitted
  if (!canTransitionOrder(order.status, 'delivered' as OrderStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderStatusFlow: a transição do status atual para "delivered" não é permitida.',
      400,
      { ruleId: 'orderStatusFlow', from: order.status, to: 'delivered' },
    );
  }

  // 4. Mutate the Order in memory
  const updatedOrder: Order = {
    ...order,
    status: 'delivered',
    deliveredAt: now,
    updatedAt: now,
  };

  // 5. Persist inside a single transaction
  await ctx.data.runInTransaction(async () => {
    await orders.save(updatedOrder);
    // 6. Modeling gap: a StockConsumption audit event for the delivery transition is
    //    documented in the usecase steps, but the StockConsumption port is not present
    //    in the function's ports list. The event write cannot be executed without it.
  });

  // 7. Return the operation result
  return {
    orderId: updatedOrder.orderId,
    status: updatedOrder.status,
    deliveredAt: now,
    updatedAt: now,
  };
}
