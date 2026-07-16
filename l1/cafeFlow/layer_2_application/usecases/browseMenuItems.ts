/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface BrowseMenuItemsInput {
  statusFilter?: string;
  menuCategoryIdFilter?: string;
}

export interface BrowseMenuItemProjection {
  menuItemId: string;
  name: string;
  description: string | null;
  menuCategoryId: string | null;
  price: number | null;
  itemType: string;
  status: string;
  activatedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BrowseMenuItemsOutput {
  items: BrowseMenuItemProjection[];
}

/**
 * MODELING GAP: MenuItem does not declare a `companyId` field in the MDM model.
 * The active-company scope filter (ctx.sessionContext.activeCompanyId) cannot be
 * applied directly. We record the gap and proceed without the company filter.
 */
export async function browseMenuItems(
  ctx: RequestContext,
  input: BrowseMenuItemsInput,
): Promise<BrowseMenuItemsOutput> {
  // 1. Resolve activeCompanyId — modeling gap: no companyId on MenuItem, skip filter.
  // const activeCompanyId = ctx.sessionContext.activeCompanyId;

  // 2. List all MenuItem entities from MDM.
  const listResult = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.MenuItem',
  });

  // 3-4. Load full details for each index record to access fields for filtering and projection.
  const mdmIds = listResult.items.map((item) => item.mdmId);
  const entities = mdmIds.length > 0
    ? await ctx.mdm.collection.getMany({ mdmIds })
    : [];

  // 5. Apply simpleItemsOnly rule: all items (including variants) appear as separate entries.
  //    No filtering by itemType — variants are listed individually.
  let projections: BrowseMenuItemProjection[] = entities.map((entity) => {
    const details = entity.details as unknown as Record<string, unknown>;
    const cafeFlow = (details['cafeFlow'] ?? {}) as unknown as Record<string, unknown>;
    return {
      menuItemId: entity.mdmId,
      name: String(details['name'] ?? ''),
      description: (details['description'] as string | null) ?? null,
      menuCategoryId: (cafeFlow['menuCategoryId'] as string | null) ?? null,
      price: (cafeFlow['price'] as number | null) ?? null,
      itemType: String(cafeFlow['itemType'] ?? 'simple'),
      status: String(details['status'] ?? 'active'),
      activatedAt: (cafeFlow['activatedAt'] as string | null) ?? null,
      createdAt: entity.index.createdAt ?? '',
      updatedAt: entity.index.updatedAt ?? '',
    };
  });

  // 3. Apply optional statusFilter in-memory.
  if (input.statusFilter) {
    projections = projections.filter(
      (item) => item.status === input.statusFilter,
    );
  }

  // 4. Apply optional menuCategoryIdFilter in-memory.
  if (input.menuCategoryIdFilter) {
    projections = projections.filter(
      (item) => item.menuCategoryId === input.menuCategoryIdFilter,
    );
  }

  // 7. Return the projected collection.
  return { items: projections };
}
