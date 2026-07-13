/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageStockItem.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateStockItem, type UpdateStockItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.js';

export const cafeFlowManageStockItemHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<UpdateStockItemInput> & {
    stockItemId?: string;
    name?: string;
    unit?: string;
    minimumLevel?: number;
  };

  // stockItemId — routeParam (client boundary input)
  if (!params.stockItemId) {
    throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400, { field: 'stockItemId' });
  }

  // name — userInput
  if (!params.name || params.name.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }

  // unit — userInput
  if (!params.unit) {
    throw new AppError('VALIDATION_ERROR', 'unit is required', 400, { field: 'unit' });
  }

  // minimumLevel — userInput
  if (typeof params.minimumLevel !== 'number' || params.minimumLevel < 0) {
    throw new AppError('VALIDATION_ERROR', 'minimumLevel must be a non-negative number', 400, { field: 'minimumLevel' });
  }

  // updatedAt is systemDefault — resolved inside the usecase, NOT forwarded by the controller.
  const input: UpdateStockItemInput = {
    stockItemId: params.stockItemId,
    name: params.name,
    unit: params.unit,
    minimumLevel: params.minimumLevel,
  };

  const result = await updateStockItem(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.manageStockItem.manageStockItem', handler: cafeFlowManageStockItemHandler },
];
