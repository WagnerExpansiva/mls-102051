/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { StockLevel, StockLevelUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import { isLowStockAlert } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export interface BrowseStockItemsInput {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export interface StockItemBrowseResult {
  stockItemId: string;
  name: string;
  unit: StockLevelUnit;
  minimumLevel: number;
  currentQuantity: number;
  lowStockAlert: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrowseStockItemsOutput {
  items: StockItemBrowseResult[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function browseStockItems(
  ctx: RequestContext,
  input: BrowseStockItemsInput,
): Promise<BrowseStockItemsOutput> {
  // Step 1: Resolve actorId from session context for authorization context
  const _actorId = ctx.sessionContext.actorSession.actorId;

  // Step 2: List StockItems from MDM, applying optional searchTerm filter on name
  const listResult = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.StockItem',
    name: input.searchTerm,
  });

  const stockItemIndexes = listResult.items;

  if (stockItemIndexes.length === 0) {
    return {
      items: [],
      totalCount: 0,
      page: input.page ?? 1,
      pageSize: input.pageSize ?? 0,
    };
  }

  // Step 3: Collect all stockItemIds from the MDM listing
  const stockItemIds = stockItemIndexes.map((item) => item.mdmId);

  // Fetch full entity details to access module-specific fields (unit, minimumLevel)
  const entities = await ctx.mdm.collection.getMany({ mdmIds: stockItemIds });

  // Step 4: Query StockLevels in batch via port — list all and join in memory
  // (avoids individual calls in loop; the port has no batch-by-ids method)
  const stockLevelPort = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');
  const allStockLevels = await stockLevelPort.list();

  // Build lookup map: stockItemId -> StockLevel
  const stockLevelMap = new Map<string, StockLevel>();
  for (const sl of allStockLevels) {
    stockLevelMap.set(sl.stockItemId, sl);
  }

  // Step 5 & 6: Join in memory and apply lowStockAlertCalculation rule
  const results: StockItemBrowseResult[] = entities.map((entity) => {
    const details = entity.details as unknown as Record<string, unknown>;
    const cafeFlow = (details['cafeFlow'] ?? {}) as unknown as Record<string, unknown>;

    const stockLevel = stockLevelMap.get(entity.mdmId);
    const currentQuantity = stockLevel?.currentQuantity ?? 0;

    // minimumLevel and unit: prefer StockItem MDM details, fall back to StockLevel
    const minimumLevel =
      (cafeFlow['minimumLevel'] as number | undefined) ??
      stockLevel?.minimumLevel ??
      0;
    const unit =
      (cafeFlow['unit'] as StockLevelUnit | undefined) ??
      stockLevel?.unit ??
      'unit';

    // lowStockAlertCalculation: StockLevel.currentQuantity <= StockItem.minimumLevel
    // Items without StockLevel: lowStockAlert = false, currentQuantity = 0
    const lowStockAlert = stockLevel
      ? isLowStockAlert({ currentQuantity: stockLevel.currentQuantity, minimumLevel })
      : false;

    return {
      stockItemId: entity.mdmId,
      name: entity.index.name,
      unit,
      minimumLevel,
      currentQuantity,
      lowStockAlert,
      createdAt: entity.index.createdAt,
      updatedAt: entity.index.updatedAt,
    };
  });

  // Step 7: Sort by name ascending
  results.sort((a, b) => a.name.localeCompare(b.name));

  // Step 8: Apply optional pagination
  const totalCount = results.length;
  const requestedPage = input.page ?? 1;
  const requestedPageSize = input.pageSize ?? totalCount;

  let pagedItems: StockItemBrowseResult[];
  if (input.page !== undefined && input.pageSize !== undefined) {
    const offset = (requestedPage - 1) * requestedPageSize;
    pagedItems = results.slice(offset, offset + requestedPageSize);
  } else {
    pagedItems = results;
  }

  // Step 9: Return paginated result
  return {
    items: pagedItems,
    totalCount,
    page: requestedPage,
    pageSize: requestedPageSize,
  };
}
