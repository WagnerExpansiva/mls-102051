/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/deliverOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
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
  const now = ctx.clock.nowIso();

  return ctx.data.runInTransaction(async () => {
    // 1. Load the Order aggregate by orderId
    const order = await orders.getById(input.orderId);

    // 2. Apply rule 'readyBeforeDelivered': only orders in 'ready' status can be delivered
    if (order.status !== 'ready') {
      throw new AppError(
        'VALIDATION_ERROR',
        'readyBeforeDelivered: only orders in "ready" status can be delivered.',
        400,
        { ruleId: 'readyBeforeDelivered', currentStatus: order.status },
      );
    }

    // 3. Apply rule 'orderStatusFlow': confirm transition 'ready' -> 'delivered' is valid
    if (!canTransitionOrder(order.status, 'delivered')) {
      throw new AppError(
        'CONFLICT',
        'orderStatusFlow: invalid status transition from "ready" to "delivered".',
        409,
        { ruleId: 'orderStatusFlow', from: order.status, to: 'delivered' },
      );
    }

    // 4–5. Mutate the Order: set status, deliveredAt, updatedAt
    const updatedOrder: Order = {
      ...order,
      status: 'delivered',
      deliveredAt: now,
      updatedAt: now,
    };

    // 6. Save the Order aggregate inside the same transaction
    await orders.save(updatedOrder);

    // 7. Append StockConsumption audit events for each order item, recording the delivery transition
    for (const item of order.items) {
      const consumption: StockConsumption = {
        stockConsumptionId: ctx.idGenerator.newId(),
        stockItemId: item.menuItemId,
        orderId: order.orderId,
        quantity: item.quantity,
        status: 'posted',
        createdAt: now,
        voidedAt: null,
        voidReason: null,
      };
      await stockConsumptions.append(consumption);
    }

    // 8. Return the result
    return {
      orderId: updatedOrder.orderId,
      status: updatedOrder.status,
      deliveredAt: now,
      updatedAt: now,
    };
  });
}
