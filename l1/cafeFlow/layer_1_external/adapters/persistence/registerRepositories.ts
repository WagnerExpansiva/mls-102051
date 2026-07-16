/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/registerRepositories.ts" enhancement="_blank"/>

// Composition root — generated deterministically by agentCbRegister; do not edit by hand.
// The 102034 moduleRegistry imports this file through the persistenceModules[].tableDefsDir
// config link before loading the module controllers, so usecases can resolveRepository().
import { registerRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { createMenuItemIngredientRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredientRepositoryAdapter.js';
import { createOrderRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.js';
import { createShiftRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftRepositoryAdapter.js';
import { createShiftClosingReportRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReportRepositoryAdapter.js';
import { createStockAdjustmentRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.js';
import { createStockConsumptionRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumptionRepositoryAdapter.js';
import { createStockLevelRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevelRepositoryAdapter.js';

registerRepository('MenuItemIngredient', createMenuItemIngredientRepositoryAdapter);
registerRepository('Order', createOrderRepositoryAdapter);
registerRepository('Shift', createShiftRepositoryAdapter);
registerRepository('ShiftClosingReport', createShiftClosingReportRepositoryAdapter);
registerRepository('StockAdjustment', createStockAdjustmentRepositoryAdapter);
registerRepository('StockConsumption', createStockConsumptionRepositoryAdapter);
registerRepository('StockLevel', createStockLevelRepositoryAdapter);
