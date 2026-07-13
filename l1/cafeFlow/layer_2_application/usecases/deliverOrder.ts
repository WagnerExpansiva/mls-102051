/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/deliverOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { canTransitionOrder } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

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
  const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  // Step 1: Load the Order aggregate by orderId.
  let order: Order;
  try {
    order = await orders.getById(input.orderId);
  } catch {
    throw new AppError('NOT_FOUND', `Pedido não encontrado: ${input.orderId}`, 404, {
      orderId: input.orderId,
    });
  }

  // Step 2: Apply rule 'readyBeforeDelivered' — order must be in 'ready' status.
  if (order.status !== 'ready') {
    throw new AppError(
      'VALIDATION_ERROR',
      'readyBeforeDelivered: o pedido deve estar no status "ready" antes da entrega.',
      400,
      { ruleId: 'readyBeforeDelivered', currentStatus: order.status },
    );
  }

  // Step 3: Apply rule 'orderStatusFlow' — confirm transition 'ready' -> 'delivered' is valid.
  const targetStatus: OrderStatus = 'delivered';
  if (!canTransitionOrder(order.status, targetStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderStatusFlow: a transição de status não é válida.',
      400,
      { ruleId: 'orderStatusFlow', from: order.status, to: targetStatus },
    );
  }

  const now = ctx.clock.nowIso();

  // Steps 4–6: Mutate the order aggregate.
  const updatedOrder: Order = {
    ...order,
    status: targetStatus,
    deliveredAt: now,
    updatedAt: now,
  };

  // Steps 7–8: Save order and append StockConsumption audit events inside one transaction.
  await ctx.data.runInTransaction(async () => {
    await orders.save(updatedOrder);

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

  // Step 9: Return the output.
  return {
    orderId: updatedOrder.orderId,
    status: updatedOrder.status,
    deliveredAt: updatedOrder.deliveredAt as string,
    updatedAt: updatedOrder.updatedAt,
  };
}
