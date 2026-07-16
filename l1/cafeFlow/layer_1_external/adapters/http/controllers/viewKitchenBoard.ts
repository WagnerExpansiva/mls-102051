/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewKitchenBoard.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewKitchenBoard, type ViewKitchenBoardInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.js';

export const cafeFlowViewKitchenBoardHandler: BffHandler = async ({ ctx }) => {
  // Both inputContract fields (shiftId, statusFilter) are resolved inside the usecase:
  //   - shiftId  → activeLifecycleInstance (the open Shift is resolved from the Shift port)
  //   - statusFilter → systemDefault (the backend applies 'received' | 'inPreparation' automatically)
  // The ViewKitchenBoardInput type is empty, so no client fields are forwarded.
  const input: ViewKitchenBoardInput = {};
  const result = await viewKitchenBoard(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.orderLifecycle.viewKitchenBoard', handler: cafeFlowViewKitchenBoardHandler },
];
