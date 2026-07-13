/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageMenuItem.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { manageMenuItem, type ManageMenuItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.js';

export const cafeFlowManageMenuItemHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<Record<string, unknown>>;

  // --- Boundary validation: only genuine client inputs ---
  // menuItemId (selectedEntity), name, description, menuCategoryId, price, itemType, status (userInput)
  // actorId (actorSession) and updatedAt (systemDefault) are resolved inside the usecase — NOT client fields.

  const menuItemId = params.menuItemId;
  if (!menuItemId || typeof menuItemId !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'menuItemId is required', 400, { field: 'menuItemId' });
  }

  const name = params.name;
  if (!name || typeof name !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }

  const menuCategoryId = params.menuCategoryId;
  if (!menuCategoryId || typeof menuCategoryId !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'menuCategoryId is required', 400, { field: 'menuCategoryId' });
  }

  const price = params.price;
  if (price === undefined || price === null || typeof price !== 'number') {
    throw new AppError('VALIDATION_ERROR', 'price is required and must be a number', 400, { field: 'price' });
  }

  const itemType = params.itemType;
  if (!itemType || typeof itemType !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'itemType is required', 400, { field: 'itemType' });
  }

  const status = params.status;
  if (!status || typeof status !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'status is required', 400, { field: 'status' });
  }

  const description =
    params.description !== undefined && params.description !== null
      ? String(params.description)
      : undefined;

  const input: ManageMenuItemInput = {
    menuItemId,
    name,
    menuCategoryId,
    price,
    itemType,
    status,
    ...(description !== undefined ? { description } : {}),
  };

  const result = await manageMenuItem(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.menuItemLifecycle.manageMenuItem', handler: cafeFlowManageMenuItemHandler },
];
