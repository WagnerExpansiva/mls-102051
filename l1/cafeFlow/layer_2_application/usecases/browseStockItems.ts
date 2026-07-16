/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export interface BrowseStockItemsInput {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export interface StockItemSummary {
  stockItemId: string;
  name: string;
  unit: string;
  minimumLevel: number;
  createdAt: string;
  updatedAt: string;
  currentQuantity: number | null;
  isLowStock: boolean;
}

export interface BrowseStockItemsOutput {
  stockItems: StockItemSummary[];
  total: number;
}

/**
 * Rule lowStockAlertCalculation:
 * isLowStock = currentQuantity <= minimumLevel (using StockItem.minimumLevel from MDM).
 * If no StockLevel exists for the item, isLowStock = false and currentQuantity = null.
 */
function computeIsLowStock(
  currentQuantity: number | null,
  minimumLevel: number,
): boolean {
  if (currentQuantity === null) {
    return false;
  }
  return currentQuantity <= minimumLevel;
}

export async function browseStockItems(
  ctx: RequestContext,
  input: BrowseStockItemsInput,
): Promise<BrowseStockItemsOutput> {
  // 1. List StockItem master data from MDM
  const listResult = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.StockItem',
    pageSize: 10000,
  });

  // 2. Filter by searchTerm (case-insensitive) on the index name field
  let filteredIndexItems = listResult.items;
  if (input.searchTerm) {
    const term = input.searchTerm.trim().toLowerCase();
    if (term.length > 0) {
      filteredIndexItems = filteredIndexItems.filter((item) =>
        (item.name ?? '').toLowerCase().includes(term),
      );
    }
  }

  // 3. Collect stockItemIds from filtered MDM results
  const stockItemIds = filteredIndexItems.map((item) => item.mdmId);

  // 4. Fetch full MDM entity details for the filtered items (plural-first, no loop)
  const entities =
    stockItemIds.length > 0
      ? await ctx.mdm.collection.getMany({ mdmIds: stockItemIds })
      : [];

  // Build a lookup from index records for createdAt / updatedAt
  const indexMap = new Map(filteredIndexItems.map((item) => [item.mdmId, item]));

  // 5. Fetch all StockLevels via the StockLevel port and build a map stockItemId -> StockLevel
  const stockLevelRepo = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');
  const allStockLevels = await stockLevelRepo.list();
  const stockLevelMap = new Map<string, StockLevel>();
  for (const sl of allStockLevels) {
    stockLevelMap.set(sl.stockItemId, sl);
  }

  // 6. Build summary items, joining StockItem (MDM) with StockLevel (local)
  const summaries: StockItemSummary[] = entities.map((entity) => {
    const idx = indexMap.get(entity.mdmId);
    const details = entity.details as unknown as Record<string, unknown>;
    const moduleDetails = (details['cafeFlow'] ?? {}) as unknown as Record<string, unknown>;

    const stockItemId = entity.mdmId;
    const name = (details['name'] as string) ?? '';
    const unit =
      (moduleDetails['unit'] as string) ??
      (details['unit'] as string) ??
      '';
    const minimumLevel =
      (moduleDetails['minimumLevel'] as number) ??
      (details['minimumLevel'] as number) ??
      0;
    const createdAt = idx?.createdAt ?? entity.index.createdAt ?? '';
    const updatedAt = idx?.updatedAt ?? entity.index.updatedAt ?? '';

    const stockLevel = stockLevelMap.get(stockItemId);
    const currentQuantity = stockLevel ? stockLevel.currentQuantity : null;
    const isLowStock = computeIsLowStock(currentQuantity, minimumLevel);

    return {
      stockItemId,
      name,
      unit,
      minimumLevel,
      createdAt,
      updatedAt,
      currentQuantity,
      isLowStock,
    };
  });

  // 7. Sort by name (ascending, case-insensitive)
  summaries.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  );

  // 8. Apply optional pagination
  const total = summaries.length;
  let paginated = summaries;
  if (input.page != null && input.pageSize != null) {
    const page = Math.max(1, input.page);
    const pageSize = Math.max(1, input.pageSize);
    const offset = (page - 1) * pageSize;
    paginated = summaries.slice(offset, offset + pageSize);
  }

  // 9. Return result
  return {
    stockItems: paginated,
    total,
  };
}
