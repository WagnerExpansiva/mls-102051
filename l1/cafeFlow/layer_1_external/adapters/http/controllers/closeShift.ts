/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/closeShift.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { closeShift, type CloseShiftInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/closeShift.js';
export const cafeFlowCloseShiftHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<CloseShiftInput>;
  if (params.totalApurado == null || typeof params.totalApurado !== 'number') {
    throw new AppError('VALIDATION_ERROR', 'totalApurado is required and must be a number.', 400, { field: 'totalApurado' });
  }
  const input: CloseShiftInput = {
    totalApurado: params.totalApurado,
    notes: params.notes,
  };
  const result = await closeShift(ctx, input);
  return ok(result);
};
export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.shiftLifecycle.closeShift', handler: cafeFlowCloseShiftHandler },
];
