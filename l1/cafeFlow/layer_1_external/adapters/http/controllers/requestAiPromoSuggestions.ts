/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiPromoSuggestions.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  requestAiPromoSuggestions,
  type RequestAiPromoSuggestionsInput,
} from '/_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiPromoSuggestions.js';

export const cafeFlowRequestAiPromoSuggestionsHandler: BffHandler = async ({ ctx }) => {
  // Both inputContract fields (actorId from actorSession, windowStart from systemDefault)
  // are resolved inside the usecase from ctx — they are NOT client boundary inputs.
  // The usecase Input type is empty, so we pass an empty object.
  const input: RequestAiPromoSuggestionsInput = {};
  const result = await requestAiPromoSuggestions(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions', handler: cafeFlowRequestAiPromoSuggestionsHandler },
];
