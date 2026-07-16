/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MdmDetailRecord } from '/_102034_/l1/mdm/module.js';

export interface UpdateMenuItemInput {
  menuItemId: string;
  name: string;
  description?: string;
  menuCategoryId: string;
  price: number;
  itemType: string;
  status: string;
}

export interface UpdateMenuItemOutput {
  menuItemId: string;
  name: string;
  description?: string;
  menuCategoryId: string;
  price: number;
  itemType: string;
  status: string;
  activatedAt?: string;
  inactivatedAt?: string;
  updatedAt: string;
}

function toMdmStatus(status: string): string {
  switch (status.toLowerCase()) {
    case 'active': return 'Active';
    case 'inactive': return 'Inactive';
    case 'draft': return 'Draft';
    default: return 'Active';
  }
}

export async function updateMenuItem(
  ctx: RequestContext,
  input: UpdateMenuItemInput,
): Promise<UpdateMenuItemOutput> {
  // Step 1: Load current MenuItem from MDM
  let menuItemResult;
  try {
    menuItemResult = await ctx.mdm.entity.get({ mdmId: input.menuItemId });
  } catch (err) {
    if (err instanceof AppError && err.code === 'NOT_FOUND') {
      throw new AppError('VALIDATION_ERROR', 'MenuItem not found', 400, {
        menuItemId: input.menuItemId,
      });
    }
    throw err;
  }

  const currentDetails = menuItemResult.details as unknown as Record<string, unknown>;
  const currentCafeFlow = (currentDetails.cafeFlow ?? {}) as Record<string, unknown>;

  // Step 2: Apply rule simpleItemsOnly — only 'simple' items are allowed in this phase
  if (input.itemType !== 'simple') {
    throw new AppError(
      'VALIDATION_ERROR',
      'Only simple items are allowed in this phase.',
      400,
      { ruleId: 'simpleItemsOnly' },
    );
  }

  // Step 3: Validate the referenced MenuCategory exists
  try {
    await ctx.mdm.entity.get({ mdmId: input.menuCategoryId });
  } catch (err) {
    if (err instanceof AppError && err.code === 'NOT_FOUND') {
      throw new AppError('VALIDATION_ERROR', 'MenuCategory not found', 400, {
        menuCategoryId: input.menuCategoryId,
      });
    }
    throw err;
  }

  // Step 4: Determine status transition
  const currentStatus = String(
    currentCafeFlow.status ?? currentDetails.status ?? '',
  ).toLowerCase();
  const newStatus = input.status.toLowerCase();
  const now = ctx.clock.nowIso();

  let activatedAt: string | null =
    (currentCafeFlow.activatedAt as string | null) ?? null;
  let inactivatedAt: string | null =
    (currentCafeFlow.inactivatedAt as string | null) ?? null;

  const transitioningToActive =
    newStatus === 'active' && currentStatus !== 'active';
  const transitioningToInactive =
    newStatus === 'inactive' && currentStatus !== 'inactive';

  if (transitioningToActive) {
    // Step 4a: Apply rule menuItemRequiresIngredient — an active MenuItem must have
    // at least one ingredient. Query MenuItemIngredient records via MDM and filter
    // in memory by menuItemId.
    const ingredientList = await ctx.mdm.collection.listByType({
      type: 'cafeFlow.MenuItemIngredient',
    });
    let hasIngredients = false;
    if (ingredientList.items.length > 0) {
      const ingredientDetails = await ctx.mdm.collection.getMany({
        mdmIds: ingredientList.items.map((item) => item.mdmId),
      });
      hasIngredients = ingredientDetails.some((detail) => {
        const d = detail.details as unknown as Record<string, unknown>;
        const cf = (d.cafeFlow ?? {}) as Record<string, unknown>;
        return String(cf.menuItemId ?? '') === input.menuItemId;
      });
    }
    if (!hasIngredients) {
      throw new AppError(
        'VALIDATION_ERROR',
        'An active MenuItem must have at least one ingredient.',
        400,
        { ruleId: 'menuItemRequiresIngredient' },
      );
    }
    // Step 4b: set activatedAt
    activatedAt = now;
  }

  if (transitioningToInactive) {
    // Step 4c: set inactivatedAt
    inactivatedAt = now;
  }

  // Step 5: updatedAt (systemDefault — resolved from ctx.clock, never user input)
  const updatedAt = now;

  // Step 6 & 7: Build the update payload and persist via MDM facade
  const description =
    input.description ?? (currentCafeFlow.description as string | null) ?? null;

  const patch: Record<string, unknown> = {
    name: input.name,
    status: toMdmStatus(input.status),
    cafeFlow: {
      ...currentCafeFlow,
      description,
      menuCategoryId: input.menuCategoryId,
      price: input.price,
      itemType: input.itemType,
      status: input.status,
      activatedAt,
      inactivatedAt,
      updatedAt,
    },
  };

  await ctx.mdm.entity.update({
    mdmId: input.menuItemId,
    expectedVersion: menuItemResult.version,
    patch: patch as unknown as Partial<MdmDetailRecord>,
  });

  // Step 8: Return the updated MenuItem fields
  const result: UpdateMenuItemOutput = {
    menuItemId: input.menuItemId,
    name: input.name,
    menuCategoryId: input.menuCategoryId,
    price: input.price,
    itemType: input.itemType,
    status: input.status,
    updatedAt,
  };
  if (description !== null) {
    result.description = description;
  }
  if (activatedAt !== null) {
    result.activatedAt = activatedAt;
  }
  if (inactivatedAt !== null) {
    result.inactivatedAt = inactivatedAt;
  }
  return result;
}
