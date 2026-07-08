/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewOrderBoard.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewOrderBoard, type ViewOrderBoardInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.js';

export const cafeFlowViewOrderBoardHandler: BffHandler = async ({ request, ctx }) => {
  const input = (request.params ?? {}) as ViewOrderBoardInput;

  // shiftId is resolved by the usecase from the active lifecycle instance (open Shift);
  // it is not a required public boundary field.
  if (input.limit !== undefined && (typeof input.limit !== 'number' || input.limit < 0)) {
    throw new AppError('VALIDATION_ERROR', 'limit must be a non-negative number', 400, { field: 'limit' });
  }
  if (input.offset !== undefined && (typeof input.offset !== 'number' || input.offset < 0)) {
    throw new AppError('VALIDATION_ERROR', 'offset must be a non-negative number', 400, { field: 'offset' });
  }

  const result = await viewOrderBoard(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.orderLifecycle.viewOrderBoard', handler: cafeFlowViewOrderBoardHandler },
];
