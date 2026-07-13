/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewDashboard.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewDashboard, type ViewDashboardInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.js';

export const cafeFlowViewDashboardHandler: BffHandler = async ({ ctx }) => {
  // The dashboard input has no client-supplied fields.
  // shiftId (activeLifecycleInstance) and actorId (actorSession) are resolved
  // inside the usecase from ctx — they are NOT public boundary inputs.
  const input: ViewDashboardInput = {};
  const result = await viewDashboard(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.viewDashboard.viewDashboard', handler: cafeFlowViewDashboardHandler },
];
