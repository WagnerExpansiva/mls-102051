/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/browseStockItems.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { browseStockItems, type BrowseStockItemsInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.js';

export const cafeFlowBrowseStockItemsHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<BrowseStockItemsInput>;

  const input: BrowseStockItemsInput = {
    searchTerm: params.searchTerm,
    page: params.page,
    pageSize: params.pageSize,
  };

  // actorId is resolved from the authenticated session context inside the usecase;
  // it is not a public boundary field, so no manual validation is needed here.

  const result = await browseStockItems(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.browseStockItems.browseStockItems', handler: cafeFlowBrowseStockItemsHandler },
];
