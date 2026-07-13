/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/browseStockItems.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { browseStockItems, type BrowseStockItemsInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.js';

export const cafeFlowBrowseStockItemsHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<BrowseStockItemsInput>;

  // Only searchTerm is a genuine client input (source: userInput).
  // actorId is resolved from ctx.sessionContext inside the usecase — not sent by the client.
  const input: BrowseStockItemsInput = {
    searchTerm: params.searchTerm,
  };

  const result = await browseStockItems(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.browseStockItems.browseStockItems', handler: cafeFlowBrowseStockItemsHandler },
];
