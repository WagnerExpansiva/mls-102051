/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewDashboard.ts" enhancement="_blank"/>
import { ok, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewDashboard, type ViewDashboardInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.js';

export const cafeFlowViewDashboardHandler: BffHandler = async ({ ctx }) => {
  // All dashboard inputs (shiftId, actorId) are resolved inside the usecase from
  // activeLifecycleInstance and actorSession — they are NOT client boundary fields.
  const input: ViewDashboardInput = {};
  const result = await viewDashboard(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.viewDashboard.viewDashboard', handler: cafeFlowViewDashboardHandler },
];
