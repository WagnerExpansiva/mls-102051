/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageStockItem.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { manageStockItem, type ManageStockItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.js';

export const cafeFlowManageStockItemHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  const input = {
    stockItemId: params.stockItemId as string,
    name: params.name as string,
    unit: params.unit as string,
    minimumLevel: params.minimumLevel as number,
  } as ManageStockItemInput;

  if (!input.stockItemId) {
    throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400, { field: 'stockItemId' });
  }
  if (!input.name) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }
  if (!input.unit) {
    throw new AppError('VALIDATION_ERROR', 'unit is required', 400, { field: 'unit' });
  }
  if (input.minimumLevel === undefined || input.minimumLevel === null) {
    throw new AppError('VALIDATION_ERROR', 'minimumLevel is required', 400, { field: 'minimumLevel' });
  }

  const result = await manageStockItem(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.manageStockItem.manageStockItem', handler: cafeFlowManageStockItemHandler },
];
