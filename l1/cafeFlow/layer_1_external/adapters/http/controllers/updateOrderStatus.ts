/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/updateOrderStatus.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateOrderStatus, type UpdateOrderStatusInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.js';

export const cafeFlowUpdateOrderStatusHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<UpdateOrderStatusInput>;

  if (!params.orderId) {
    throw new AppError('VALIDATION_ERROR', 'orderId is required', 400, { field: 'orderId' });
  }

  if (!params.status) {
    throw new AppError('VALIDATION_ERROR', 'status is required', 400, { field: 'status' });
  }

  const input: UpdateOrderStatusInput = {
    orderId: params.orderId,
    status: params.status,
    inPreparationAt: params.inPreparationAt,
    readyAt: params.readyAt,
  };

  const result = await updateOrderStatus(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.orderLifecycle.updateOrderStatus', handler: cafeFlowUpdateOrderStatusHandler },
];
