/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewShiftClosingReport.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewShiftClosingReport, type ViewShiftClosingReportInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.js';

export const cafeFlowViewShiftClosingReportHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as ViewShiftClosingReportInput;

  if (!input || !input.shiftId) {
    throw new AppError('VALIDATION_ERROR', 'shiftId is required', 400, { field: 'shiftId' });
  }

  const result = await viewShiftClosingReport(ctx, input);

  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.shiftLifecycle.viewShiftClosingReport', handler: cafeFlowViewShiftClosingReportHandler },
];
