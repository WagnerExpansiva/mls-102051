/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewOrderBoard.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewOrderBoard, type ViewOrderBoardInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.js';

export const cafeFlowViewOrderBoardHandler: BffHandler = async ({ ctx }) => {
  // The shiftId is resolved by the usecase from the open Shift (activeLifecycleInstance),
  // not sent by the client. ViewOrderBoardInput is empty — no client boundary fields.
  const input: ViewOrderBoardInput = {};
  const result = await viewOrderBoard(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.orderLifecycle.viewOrderBoard', handler: cafeFlowViewOrderBoardHandler },
];
