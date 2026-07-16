/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/deliverOrder.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { deliverOrder, type DeliverOrderInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/deliverOrder.js';

export const cafeFlowDeliverOrderHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<DeliverOrderInput>;

  // Only orderId is a genuine client boundary input (source: selectedEntity).
  // deliveredAt and updatedAt are systemDefault — resolved inside the usecase from ctx.clock.
  if (!params.orderId) {
    throw new AppError('VALIDATION_ERROR', 'orderId is required', 400, { field: 'orderId' });
  }

  const input: DeliverOrderInput = {
    orderId: params.orderId,
  };

  const result = await deliverOrder(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.orderLifecycle.deliverOrder', handler: cafeFlowDeliverOrderHandler },
];
