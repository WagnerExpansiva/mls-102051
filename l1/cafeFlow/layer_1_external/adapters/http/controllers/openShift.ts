/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/openShift.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { openShift, type OpenShiftInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/openShift.js';

export const cafeFlowOpenShiftHandler: BffHandler = async ({ request, ctx }) => {
  const input = (request.params ?? {}) as OpenShiftInput;

  if (input.notes !== undefined && typeof input.notes !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'notes must be a string', 400, { field: 'notes' });
  }

  const result = await openShift(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.shiftLifecycle.openShift', handler: cafeFlowOpenShiftHandler },
];
