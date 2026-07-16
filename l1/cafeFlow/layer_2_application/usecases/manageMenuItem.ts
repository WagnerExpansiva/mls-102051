/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface ManageMenuItemInput {
  menuItemId: string;
  name: string;
  description?: string;
  menuCategoryId: string;
  price: number;
  itemType: string;
  status: string;
}

export interface ManageMenuItemOutput {
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

export async function manageMenuItem(
  ctx: RequestContext,
  input: ManageMenuItemInput,
): Promise<ManageMenuItemOutput> {
  const now = ctx.clock.nowIso();

  // Step 2: Load existing MenuItem via MDM
  const existingResult = await ctx.mdm.entity
    .get({ mdmId: input.menuItemId })
    .catch((err: unknown) => {
      if (err instanceof AppError && err.code === 'NOT_FOUND') {
        throw new AppError('VALIDATION_ERROR', 'MenuItem not found', 400, {
          menuItemId: input.menuItemId,
        });
      }
      throw err;
    });

  const existingDetails = existingResult.details as unknown as Record<string, unknown>;
  const existingStatus = String(existingDetails.status ?? 'draft');
  const existingActivatedAt = (existingDetails.activatedAt as string | null) ?? null;
  const existingInactivatedAt = (existingDetails.inactivatedAt as string | null) ?? null;

  // Step 3: Validate menuCategoryId exists (MenuCategory is an MDM ref)
  await ctx.mdm.entity
    .get({ mdmId: input.menuCategoryId })
    .catch((err: unknown) => {
      if (err instanceof AppError && err.code === 'NOT_FOUND') {
        throw new AppError('VALIDATION_ERROR', 'MenuCategory not found', 400, {
          menuCategoryId: input.menuCategoryId,
        });
      }
      throw err;
    });

  // Step 4: Apply rule simpleItemsOnly
  if (input.itemType !== 'simple') {
    throw new AppError(
      'VALIDATION_ERROR',
      'Only simple items are allowed in this phase',
      400,
      { ruleId: 'simpleItemsOnly' },
    );
  }

  // Step 5: Determine status transition timestamps
  let activatedAt: string | null = existingActivatedAt;
  let inactivatedAt: string | null = existingInactivatedAt;

  if (
    (existingStatus === 'draft' || existingStatus === 'inactive') &&
    input.status === 'active'
  ) {
    activatedAt = now;
  }
  if (existingStatus === 'active' && input.status === 'inactive') {
    inactivatedAt = now;
  }

  // Step 6: Apply rule menuItemRequiresIngredient — only when activating
  if (input.status === 'active') {
    const ingredientList = await ctx.mdm.collection.listByType({
      type: 'cafeFlow.MenuItemIngredient',
    });

    let hasIngredient = false;
    if (ingredientList.items.length > 0) {
      const ingredientIds = ingredientList.items.map((item) => item.mdmId);
      const hydrated = await ctx.mdm.collection.hydrateMany({
        mdmIds: ingredientIds,
        sections: ['cafeFlow'],
      });
      hasIngredient = hydrated.some((entity) => {
        const details = entity.details as unknown as Record<string, unknown>;
        const cafeFlowSection =
          (details.cafeFlow as Record<string, unknown> | undefined) ?? {};
        const menuItemIdFromDetails = cafeFlowSection.menuItemId ?? details.menuItemId;
        return String(menuItemIdFromDetails ?? '') === input.menuItemId;
      });
    }

    if (!hasIngredient) {
      throw new AppError(
        'VALIDATION_ERROR',
        'Cannot activate a MenuItem without at least one ingredient',
        400,
        { ruleId: 'menuItemRequiresIngredient' },
      );
    }
  }

  // Step 7: Build update payload
  const patch: Record<string, unknown> = {
    name: input.name,
    description: input.description ?? null,
    menuCategoryId: input.menuCategoryId,
    price: input.price,
    itemType: input.itemType,
    status: input.status,
    updatedAt: now,
  };
  if (activatedAt !== null) {
    patch.activatedAt = activatedAt;
  }
  if (inactivatedAt !== null) {
    patch.inactivatedAt = inactivatedAt;
  }

  // Step 8: Persist via MDM inside a single transaction wrapper
  const updated = await ctx.data.runInTransaction(async () => {
    return ctx.mdm.entity.update({
      mdmId: input.menuItemId,
      expectedVersion: existingResult.version,
      patch: patch as unknown as Parameters<typeof ctx.mdm.entity.update>[0]['patch'],
    });
  });

  // Step 9: Return the updated MenuItem projection
  const updatedDetails = updated.details as unknown as Record<string, unknown>;
  return {
    menuItemId: input.menuItemId,
    name: String(updatedDetails.name ?? input.name),
    description: (updatedDetails.description as string | null | undefined) ?? undefined,
    menuCategoryId: String(updatedDetails.menuCategoryId ?? input.menuCategoryId),
    price: Number(updatedDetails.price ?? input.price),
    itemType: String(updatedDetails.itemType ?? input.itemType),
    status: String(updatedDetails.status ?? input.status),
    activatedAt: (updatedDetails.activatedAt as string | null | undefined) ?? undefined,
    inactivatedAt: (updatedDetails.inactivatedAt as string | null | undefined) ?? undefined,
    updatedAt: now,
  };
}
