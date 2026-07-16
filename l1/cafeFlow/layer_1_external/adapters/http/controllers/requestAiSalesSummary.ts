/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiSalesSummary.ts" enhancement="_blank"/>
import { ok, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { requestAiSalesSummary, type RequestAiSalesSummaryInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.js';

export const cafeFlowRequestAiSalesSummaryHandler: BffHandler = async ({ ctx }) => {
  // No client boundary inputs — shiftId (activeLifecycleInstance) and actorId (actorSession)
  // are resolved inside the usecase from ctx/ports, not sent by the client.
  const input: RequestAiSalesSummaryInput = {};
  const result = await requestAiSalesSummary(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.requestAiSalesSummary.requestAiSalesSummary', handler: cafeFlowRequestAiSalesSummaryHandler },
];
