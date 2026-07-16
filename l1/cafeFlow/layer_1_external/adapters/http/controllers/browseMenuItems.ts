/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/browseMenuItems.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { browseMenuItems, type BrowseMenuItemsInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.js';

export const cafeFlowBrowseMenuItemsHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<BrowseMenuItemsInput>;

  // Only genuine client inputs (userInput) are read from params.
  // Both statusFilter and menuCategoryIdFilter are optional.
  const input: BrowseMenuItemsInput = {
    statusFilter: params.statusFilter,
    menuCategoryIdFilter: params.menuCategoryIdFilter,
  };

  const result = await browseMenuItems(ctx, input);
  return ok(result.items);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.menuItemLifecycle.browseMenuItems', handler: cafeFlowBrowseMenuItemsHandler },
];
