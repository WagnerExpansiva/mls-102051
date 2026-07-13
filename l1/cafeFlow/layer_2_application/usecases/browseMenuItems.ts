/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface BrowseMenuItemsInput {
  statusFilter?: string;
  menuCategoryIdFilter?: string;
}

export interface MenuItemProjection {
  menuItemId: string;
  name: string;
  description: string | null;
  menuCategoryId: string | null;
  price: number;
  itemType: string;
  status: string;
  activatedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BrowseMenuItemsOutput {
  items: MenuItemProjection[];
  total: number;
}

/**
 * BrowseMenuItems — lists all menu items from the MDM store as individual entries.
 *
 * MODELING GAP: MenuItem does not declare a `companyId` field in its entity model,
 * so the activeCompanyId business-context filter is intentionally skipped to avoid
 * matching against a non-existent column.
 *
 * Rule `simpleItemsOnly`: every item (simple or variant) appears as a separate
 * entry — no grouping or expansion of variants is performed.
 */
export async function browseMenuItems(
  ctx: RequestContext,
  input: BrowseMenuItemsInput,
): Promise<BrowseMenuItemsOutput> {
  // Step 1 — resolve activeCompanyId for query scope
  // const activeCompanyId = ctx.sessionContext.activeCompanyId;

  // Step 2 — MODELING GAP: MenuItem has no companyId field; skip company filter.

  // Step 3 — list MDM entities of type MenuItem
  const listResult = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.MenuItem',
  });

  const mdmIds = listResult.items.map((item) => item.mdmId);

  if (mdmIds.length === 0) {
    return { items: [], total: 0 };
  }

  // Fetch full details for all listed items (plural-first, no per-id loop)
  const entities = await ctx.mdm.collection.getMany({ mdmIds });

  // Step 4 — apply optional statusFilter
  let filtered = entities;

  if (input.statusFilter) {
    filtered = filtered.filter((entity) => {
      const details = entity.details as unknown as Record<string, unknown>;
      return String(details.status) === input.statusFilter;
    });
  }

  // Step 5 — apply optional menuCategoryIdFilter
  if (input.menuCategoryIdFilter) {
    filtered = filtered.filter((entity) => {
      const details = entity.details as unknown as Record<string, unknown>;
      const cafeFlow = (details['cafeFlow'] as Record<string, unknown> | undefined) ?? {};
      const menuCategoryId = cafeFlow['menuCategoryId'] ?? details['menuCategoryId'];
      return menuCategoryId != null && String(menuCategoryId) === input.menuCategoryIdFilter;
    });
  }

  // Step 6 — simpleItemsOnly: each item appears individually, no grouping/expansion
  // Step 7 — project output fields
  const items: MenuItemProjection[] = filtered.map((entity) => {
    const details = entity.details as unknown as Record<string, unknown>;
    const cafeFlow = (details['cafeFlow'] as Record<string, unknown> | undefined) ?? {};
    const index = entity.index as unknown as Record<string, unknown>;
    return {
      menuItemId: entity.mdmId,
      name: String(details.name ?? index.name ?? ''),
      description: (cafeFlow['description'] as string | null) ?? null,
      menuCategoryId: (cafeFlow['menuCategoryId'] as string | null) ?? null,
      price: Number(cafeFlow['price'] ?? 0),
      itemType: String(cafeFlow['itemType'] ?? 'simple'),
      status: String(details.status ?? index.status ?? 'active'),
      activatedAt: (cafeFlow['activatedAt'] as string | null) ?? null,
      createdAt: String(index.createdAt ?? details.createdAt ?? ''),
      updatedAt: String(index.updatedAt ?? details.updatedAt ?? ''),
    };
  });

  // Step 8 — return { items, total }
  return { items, total: items.length };
}
