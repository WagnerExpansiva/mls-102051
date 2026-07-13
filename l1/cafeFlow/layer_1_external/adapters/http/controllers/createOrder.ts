/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/createOrder.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createOrder, type CreateOrderInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.js';

export const cafeFlowCreateOrderHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<CreateOrderInput>;

  // Validate only genuine client inputs (source: userInput)
  if (!params.orderType) {
    throw new AppError('VALIDATION_ERROR', 'orderType is required', 400, { field: 'orderType' });
  }

  if (!params.orderItems || params.orderItems.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'orderItems is required and must not be empty', 400, { field: 'orderItems' });
  }

  // Build an EXPLICIT input with only the client fields — shiftId, orderId, createdAt, updatedAt
  // are resolved inside the usecase from ctx/ports and are NOT on the usecase Input type.
  const input: CreateOrderInput = {
    orderType: params.orderType,
    tableNumber: params.tableNumber,
    orderItems: params.orderItems,
    priority: params.priority,
    priorityReason: params.priorityReason,
  };

  const result = await createOrder(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.orderLifecycle.createOrder', handler: cafeFlowCreateOrderHandler },
];
