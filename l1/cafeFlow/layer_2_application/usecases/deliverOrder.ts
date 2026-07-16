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

export async function deliverOrder(ctx: RequestContext, input: DeliverOrderInput): Promise<DeliverOrderOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  // Step 1 — Load the Order aggregate
  const order = await orders.findById(input.orderId);
  if (!order) {
    throw new AppError('NOT_FOUND', `Order not found: ${input.orderId}`, 404, { orderId: input.orderId });
  }

  // Step 2 — Rule readyBeforeDelivered: order must be 'ready' before it can be delivered
  if (order.status !== 'ready') {
    throw new AppError(
      'VALIDATION_ERROR',
      'readyBeforeDelivered: o pedido precisa estar no status "ready" antes da entrega.',
      400,
      { rule: 'readyBeforeDelivered', currentStatus: order.status, expectedStatus: 'ready' },
    );
  }

  // Step 3 — Rule orderStatusFlow: verify transition 'ready' -> 'delivered' is permitted
  const targetStatus: OrderStatus = 'delivered';
  if (!canTransitionOrder(order.status, targetStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderStatusFlow: transição de status não permitida.',
      400,
      { rule: 'orderStatusFlow', from: order.status, to: targetStatus },
    );
  }

  const now = ctx.clock.nowIso();

  // Step 4 — Mutate the Order in memory
  const updatedOrder: Order = {
    ...order,
    status: 'delivered',
    deliveredAt: now,
    updatedAt: now,
  };

  // Step 5 & 6 — Persist Order and append StockConsumption audit event in the same transaction
  const auditRecord: StockConsumption = {
    stockConsumptionId: ctx.idGenerator.newId(),
    stockItemId: input.orderId,
    orderId: input.orderId,
    quantity: 0,
    status: 'posted',
    createdAt: now,
    voidedAt: null,
    voidReason: null,
  };

  await ctx.data.runInTransaction(async () => {
    await orders.save(updatedOrder);
    await stockConsumptions.append(auditRecord);
  });

  // Step 7 — Return result
  return {
    orderId: updatedOrder.orderId,
    status: updatedOrder.status,
    deliveredAt: now,
    updatedAt: now,
  };
}
