/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface BrowseMenuItemsInput {
  statusFilter?: string;
  menuCategoryIdFilter?: string;
}

export interface BrowseMenuItemsOutputItem {
  menuItemId: string;
  name: string;
  description?: string;
  menuCategoryId: string;
  price: number;
  itemType: string;
  status: string;
  activatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrowseMenuItemsOutput {
  items: BrowseMenuItemsOutputItem[];
}

/**
 * BrowseMenuItems — lists simple menu items scoped to the active company.
 *
 * Menu items and menu categories are MDM master-data records (no local table).
 * The usecase reads them through the MDM facade, filters by company relationship,
 * applies the `simpleItemsOnly` rule, optional status/category filters, and
 * projects each item to the output shape.
 */
export async function browseMenuItems(
  ctx: RequestContext,
  input: BrowseMenuItemsInput,
): Promise<BrowseMenuItemsOutput> {
  const activeCompanyId = ctx.sessionContext.activeCompanyId;

  // Step 2: Retrieve MenuCategory MDM records and filter by company relationship
  const categoryResult = await ctx.mdm.collection.listByType({ type: 'cafeFlow.MenuCategory' });
  const categoryIds = categoryResult.items.map((item) => item.mdmId);

  let allowedCategoryIds: Set<string>;
  if (activeCompanyId && categoryIds.length > 0) {
    const relatedMap = await ctx.mdm.collection.relatedOfMany({ mdmIds: categoryIds });
    allowedCategoryIds = new Set(
      categoryIds.filter((id) =>
        (relatedMap[id] ?? []).some((rel) => rel.mdmId === activeCompanyId),
      ),
    );
  } else {
    // No company context — allow all categories
    allowedCategoryIds = new Set(categoryIds);
  }

  // Step 3: Retrieve MenuItem MDM records
  const itemResult = await ctx.mdm.collection.listByType({ type: 'cafeFlow.MenuItem' });
  const itemIds = itemResult.items.map((item) => item.mdmId);

  if (itemIds.length === 0) {
    return { items: [] };
  }

  // Hydrate all menu items in a single bulk read (plural-first rule)
  const itemEntities = await ctx.mdm.collection.getMany({ mdmIds: itemIds });

  const items: BrowseMenuItemsOutputItem[] = [];

  for (const entity of itemEntities) {
    const details = entity.details as unknown as Record<string, unknown>;
    const menuCategoryId = details.menuCategoryId as string | undefined;

    // Filter by allowed categories (company scope from step 2)
    if (!menuCategoryId || !allowedCategoryIds.has(menuCategoryId)) {
      continue;
    }

    const itemType = details.itemType as string | undefined;

    // Step 4: Apply rule simpleItemsOnly — only simple items are supported
    if (itemType !== 'simple') {
      continue;
    }

    const status = String(entity.details.status);

    // Step 5: Apply optional statusFilter (case-insensitive match)
    if (input.statusFilter && status.toLowerCase() !== input.statusFilter.toLowerCase()) {
      continue;
    }

    // Step 6: Apply optional menuCategoryIdFilter
    if (input.menuCategoryIdFilter && menuCategoryId !== input.menuCategoryIdFilter) {
      continue;
    }

    // Step 7: Project to output shape
    items.push({
      menuItemId: entity.mdmId,
      name: entity.details.name,
      description: (details.description as string | null | undefined) ?? undefined,
      menuCategoryId,
      price: details.price as number,
      itemType,
      status,
      activatedAt: (details.activatedAt as string | null | undefined) ?? undefined,
      createdAt: entity.index.createdAt,
      updatedAt: entity.index.updatedAt,
    });
  }

  return { items };
}
