/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewKitchenBoard.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewKitchenBoard, type ViewKitchenBoardInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.js';

export const cafeFlowViewKitchenBoardHandler: BffHandler = async ({ ctx }) => {
  // Both inputContract fields (shiftId, statusFilter) are resolved context:
  //   - shiftId  → activeLifecycleInstance (resolved by the usecase from the Shift port)
  //   - statusFilter → systemDefault (applied automatically by the backend)
  // Neither is a public client boundary input, and ViewKitchenBoardInput is empty.
  const input: ViewKitchenBoardInput = {};
  const result = await viewKitchenBoard(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.orderLifecycle.viewKitchenBoard', handler: cafeFlowViewKitchenBoardHandler },
];
