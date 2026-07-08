/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageMenuItem.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateMenuItem, type UpdateMenuItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.js';

export const cafeFlowManageMenuItemHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as UpdateMenuItemInput;

  if (!input || !input.menuItemId) {
    throw new AppError('VALIDATION_ERROR', 'menuItemId is required', 400, { field: 'menuItemId' });
  }
  if (!input.name) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }
  if (!input.menuCategoryId) {
    throw new AppError('VALIDATION_ERROR', 'menuCategoryId is required', 400, { field: 'menuCategoryId' });
  }
  if (input.price === undefined || input.price === null) {
    throw new AppError('VALIDATION_ERROR', 'price is required', 400, { field: 'price' });
  }
  if (!input.itemType) {
    throw new AppError('VALIDATION_ERROR', 'itemType is required', 400, { field: 'itemType' });
  }
  if (!input.status) {
    throw new AppError('VALIDATION_ERROR', 'status is required', 400, { field: 'status' });
  }

  const result = await updateMenuItem(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.menuItemLifecycle.manageMenuItem', handler: cafeFlowManageMenuItemHandler },
];
