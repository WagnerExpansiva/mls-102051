/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/createOrder.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createOrder, type CreateOrderInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.js';

export const cafeFlowCreateOrderHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as CreateOrderInput;

  if (!input || !input.orderType) {
    throw new AppError('VALIDATION_ERROR', 'orderType is required', 400, { field: 'orderType' });
  }

  if (!input.orderItems || !Array.isArray(input.orderItems) || input.orderItems.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'orderItems is required and must have at least one item', 400, { field: 'orderItems' });
  }

  const result = await createOrder(ctx, input);

  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.orderLifecycle.createOrder', handler: cafeFlowCreateOrderHandler },
];
