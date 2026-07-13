/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { StockLevel, StockUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import { isLowStock } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export interface StockItem {
  stockItemId: string;
  name: string;
  unit: StockUnit;
  minimumLevel: number;
  createdAt: string;
  updatedAt: string;
  currentQuantity: number;
  lowStockAlert: boolean;
}

export interface BrowseStockItemsInput {
  searchTerm?: string;
}

export interface BrowseStockItemsOutput {
  items: StockItem[];
  total: number;
}

export async function browseStockItems(
  ctx: RequestContext,
  input: BrowseStockItemsInput,
): Promise<BrowseStockItemsOutput> {
  // Step 1: Resolve actorId from session for manager authorization
  const actorId = ctx.sessionContext.actorSession.actorId;
  if (!actorId) {
    return { items: [], total: 0 };
  }

  // Step 2: List all StockItems from MDM
  const listResult = await ctx.mdm.collection.listByType({ type: 'cafeFlow.StockItem' });

  // Step 3: Filter by searchTerm if provided (case-insensitive on name)
  let filteredIndex = listResult.items;
  if (input.searchTerm && input.searchTerm.trim().length > 0) {
    const term = input.searchTerm.trim().toLowerCase();
    filteredIndex = filteredIndex.filter((item) =>
      item.name.toLowerCase().includes(term),
    );
  }

  // Step 4: Sort by name ascending
  filteredIndex = [...filteredIndex].sort((a, b) => a.name.localeCompare(b.name));

  if (filteredIndex.length === 0) {
    return { items: [], total: 0 };
  }

  // Step 5: Fetch full MDM details for filtered items (batch) and all StockLevels (batch)
  const mdmIds = filteredIndex.map((item) => item.mdmId);
  const entities = await ctx.mdm.collection.getMany({ mdmIds });
  const entityMap = new Map(entities.map((e) => [e.mdmId, e]));

  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');
  const allStockLevels = await stockLevels.list();
  const stockLevelByItemId = new Map<string, StockLevel>();
  for (const sl of allStockLevels) {
    stockLevelByItemId.set(sl.stockItemId, sl);
  }

  // Steps 6-7: Build output items with lowStockAlertCalculation
  const items: StockItem[] = filteredIndex
    .filter((idx) => entityMap.has(idx.mdmId))
    .map((idx) => {
      const entity = entityMap.get(idx.mdmId)!;
      const details = entity.details as unknown as Record<string, unknown>;
      const cafeFlowDetails =
        (details['cafeFlow'] as Record<string, unknown> | undefined) ?? {};

      const unit =
        (cafeFlowDetails['unit'] as StockUnit | undefined) ??
        (details['unit'] as StockUnit | undefined) ??
        'unit';
      const minimumLevel =
        (cafeFlowDetails['minimumLevel'] as number | undefined) ??
        (details['minimumLevel'] as number | undefined) ??
        0;

      const stockLevel = stockLevelByItemId.get(idx.mdmId);
      const currentQuantity = stockLevel?.currentQuantity ?? 0;

      // Rule lowStockAlertCalculation: use domain invariant isLowStock
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
