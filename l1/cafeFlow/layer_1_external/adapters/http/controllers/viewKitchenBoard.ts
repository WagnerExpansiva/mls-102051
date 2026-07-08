/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewKitchenBoard.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewKitchenBoard, type ViewKitchenBoardInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.js';

export const cafeFlowViewKitchenBoardHandler: BffHandler = async ({ request, ctx }) => {
  const input = (request.params ?? {}) as ViewKitchenBoardInput;

  // shiftId is resolved from the active lifecycle instance (current open Shift),
  // not from public boundary input — no manual validation required.
  // statusFilter is optional with a systemDefault applied by the usecase.

  const result = await viewKitchenBoard(ctx, input);
  return ok(result.orders);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.orderLifecycle.viewKitchenBoard', handler: cafeFlowViewKitchenBoardHandler },
];
