/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiSalesSummary.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { requestAiSalesSummary, type RequestAiSalesSummaryInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.js';

export const cafeFlowRequestAiSalesSummaryHandler: BffHandler = async ({ request, ctx }) => {
  const input = (request.params ?? {}) as RequestAiSalesSummaryInput;

  // shiftId and actorId are resolved from context (activeLifecycleInstance / actorSession),
  // not from public request params — no boundary validation needed here.

  const result = await requestAiSalesSummary(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.requestAiSalesSummary.requestAiSalesSummary', handler: cafeFlowRequestAiSalesSummaryHandler },
];
