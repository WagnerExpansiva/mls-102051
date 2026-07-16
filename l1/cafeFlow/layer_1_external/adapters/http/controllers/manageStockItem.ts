/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageStockItem.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { manageStockItem, type ManageStockItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.js';

export const cafeFlowManageStockItemHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<ManageStockItemInput> & Record<string, unknown>;

  // stockItemId — routeParam (client boundary)
  const stockItemId = params.stockItemId;
  if (!stockItemId || typeof stockItemId !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400, { field: 'stockItemId' });
  }

  // name — userInput (client boundary)
  const name = params.name;
  if (!name || typeof name !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }

  // unit — userInput (client boundary)
  const unit = params.unit;
  if (!unit || typeof unit !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'unit is required', 400, { field: 'unit' });
  }

  // minimumLevel — userInput (client boundary)
  const minimumLevel = params.minimumLevel;
  if (minimumLevel === undefined || minimumLevel === null || typeof minimumLevel !== 'number') {
    throw new AppError('VALIDATION_ERROR', 'minimumLevel is required and must be a number', 400, { field: 'minimumLevel' });
  }

  // updatedAt is systemDefault — resolved inside the usecase, NOT forwarded by the controller.
  const input: ManageStockItemInput = {
    stockItemId,
    name,
    unit,
    minimumLevel,
  };

  const result = await manageStockItem(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.manageStockItem.manageStockItem', handler: cafeFlowManageStockItemHandler },
];
