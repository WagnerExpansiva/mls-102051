/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import { isLowStock, type StockLevel, type StockLevelUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export interface BrowseStockItemsInput {
  searchTerm?: string;
}

export interface StockItemSummary {
  stockItemId: string;
  name: string;
  unit: StockLevelUnit;
  minimumLevel: number;
  createdAt: string;
  updatedAt: string;
  currentQuantity: number;
  lowStockAlert: boolean;
}

export interface BrowseStockItemsOutput {
  items: StockItemSummary[];
  total: number;
}

export async function browseStockItems(
  ctx: RequestContext,
  input: BrowseStockItemsInput,
): Promise<BrowseStockItemsOutput> {
  // Step 1: actorId is resolved from ctx.sessionContext for manager authorization
  // (enforced at the controller layer; no additional action needed here)

  // Step 2: List all StockItems from MDM
  const listResult = await ctx.mdm.collection.listByType({ type: 'cafeFlow.StockItem' });

  // Step 3: Filter by searchTerm if provided (case-insensitive name match)
  const searchTerm = input.searchTerm?.trim().toLowerCase() ?? '';
  const filteredIndexes = searchTerm
    ? listResult.items.filter((idx) => idx.name.toLowerCase().includes(searchTerm))
    : listResult.items;

  // Step 4: Sort by name ascending
  filteredIndexes.sort((a, b) => a.name.localeCompare(b.name));

  if (filteredIndexes.length === 0) {
    return { items: [], total: 0 };
  }

  // Step 5: Batch fetch StockLevels — load all once and match by stockItemId in memory
  const stockLevelRepo = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');
  const allLevels = await stockLevelRepo.list();
  const levelMap = new Map<string, StockLevel>();
  for (const level of allLevels) {
    levelMap.set(level.stockItemId, level);
  }

  // Steps 6-7: Build output items, applying lowStockAlertCalculation rule
  const items: StockItemSummary[] = filteredIndexes.map((idx) => {
    const level = levelMap.get(idx.mdmId);
    const currentQuantity = level?.currentQuantity ?? 0;
    const minimumLevel = level?.minimumLevel ?? 0;
    const unit: StockLevelUnit = level?.unit ?? 'unit';
    const lowStockAlert = isLowStock({ currentQuantity, minimumLevel });

    return {
      stockItemId: idx.mdmId,
      name: idx.name,
      unit,
      minimumLevel,
      createdAt: idx.createdAt,
      updatedAt: idx.updatedAt,
      currentQuantity,
      lowStockAlert,
    };
  });

  // Step 8: Return result
  return { items, total: items.length };
}
