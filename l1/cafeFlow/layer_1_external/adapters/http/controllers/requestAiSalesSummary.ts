/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiSalesSummary.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { requestAiSalesSummary, type AiSalesSummaryInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.js';

export const cafeFlowRequestAiSalesSummaryHandler: BffHandler = async ({ ctx }) => {
  // All inputs (shiftId, actorId) are resolved from ctx (activeLifecycleInstance / actorSession)
  // inside the usecase — they are NOT public client boundary fields.
  const input: AiSalesSummaryInput = {};
  const result = await requestAiSalesSummary(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.requestAiSalesSummary.requestAiSalesSummary', handler: cafeFlowRequestAiSalesSummaryHandler },
];
