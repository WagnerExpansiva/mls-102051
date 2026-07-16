/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageMenuItem.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateMenuItem, type UpdateMenuItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.js';

export const cafeFlowManageMenuItemHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<UpdateMenuItemInput>;

  // --- Client boundary inputs (selectedEntity + userInput) ---
  if (!params.menuItemId) {
    throw new AppError('VALIDATION_ERROR', 'menuItemId is required', 400, { field: 'menuItemId' });
  }
  if (!params.name) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }
  if (!params.menuCategoryId) {
    throw new AppError('VALIDATION_ERROR', 'menuCategoryId is required', 400, { field: 'menuCategoryId' });
  }
  if (params.price === undefined || params.price === null) {
    throw new AppError('VALIDATION_ERROR', 'price is required', 400, { field: 'price' });
  }
  if (!params.itemType) {
    throw new AppError('VALIDATION_ERROR', 'itemType is required', 400, { field: 'itemType' });
  }
  if (!params.status) {
    throw new AppError('VALIDATION_ERROR', 'status is required', 400, { field: 'status' });
  }

  // Build explicit input with ONLY client fields — actorId and updatedAt are
  // resolved inside the usecase from ctx (actorSession / systemDefault).
  const input: UpdateMenuItemInput = {
    menuItemId: params.menuItemId,
    name: params.name,
    description: params.description,
    menuCategoryId: params.menuCategoryId,
    price: params.price,
    itemType: params.itemType,
    status: params.status,
  };

  const result = await updateMenuItem(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.menuItemLifecycle.manageMenuItem', handler: cafeFlowManageMenuItemHandler },
];
