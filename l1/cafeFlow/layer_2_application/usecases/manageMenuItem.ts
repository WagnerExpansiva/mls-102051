/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MdmEntityUpdateInput } from '/_102034_/l1/mdm/layer_3_usecases/mdmFacade.js';

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

export async function updateMenuItem(
  ctx: RequestContext,
  input: UpdateMenuItemInput,
): Promise<UpdateMenuItemOutput> {
  // Rule: simpleItemsOnly — only 'simple' item type is allowed in this phase
  if (input.itemType !== 'simple') {
    throw new AppError(
      'VALIDATION_ERROR',
      'simpleItemsOnly: apenas itens do tipo "simple" são permitidos nesta fase.',
      400,
      { ruleId: 'simpleItemsOnly', itemType: input.itemType },
    );
  }

  // Load existing MenuItem via MDM
  const existing = await ctx.mdm.entity.get({ mdmId: input.menuItemId });
  const existingDetails = existing.details as unknown as Record<string, unknown>;
  const existingCafeFlow = (existingDetails['cafeFlow'] ?? {}) as Record<string, unknown>;
  const currentStatus = String(existingCafeFlow['status'] ?? '');

  const now = ctx.clock.nowIso();

  let activatedAt = (existingCafeFlow['activatedAt'] as string | undefined) ?? undefined;
  let inactivatedAt = (existingCafeFlow['inactivatedAt'] as string | undefined) ?? undefined;

  // Rule: menuItemRequiresIngredient — cannot activate a menu item without ingredients
  if (input.status === 'active' && currentStatus !== 'active') {
    const ingredientList = await ctx.mdm.collection.listByType({
      type: 'cafeFlow.MenuItemIngredient',
    });
    const ingredientIds = new Set(ingredientList.items.map((item) => item.mdmId));

    const related = await ctx.mdm.collection.relatedOfMany({
      mdmIds: [input.menuItemId],
    });
    const relatedRefs = related[input.menuItemId] ?? [];
    const hasIngredients = relatedRefs.some((ref) => ingredientIds.has(ref.mdmId));

    if (!hasIngredients) {
      throw new AppError(
        'VALIDATION_ERROR',
        'menuItemRequiresIngredient: não é possível ativar um item do cardápio sem ingredientes vinculados.',
        400,
        { ruleId: 'menuItemRequiresIngredient', menuItemId: input.menuItemId },
      );
    }
    activatedAt = now;
  }

  // Track inactivation timestamp on transition to 'inactive'
  if (input.status === 'inactive' && currentStatus !== 'inactive') {
    inactivatedAt = now;
  }

  // Resolve description: use input if provided, otherwise preserve existing
  const descriptionValue =
    input.description !== undefined
      ? input.description
      : (existingCafeFlow['description'] as string | null | undefined) ?? null;

  // Build cafeFlow namespace patch preserving existing fields
  const cafeFlowPatch: Record<string, unknown> = {
    ...existingCafeFlow,
    description: descriptionValue,
    menuCategoryId: input.menuCategoryId,
    price: input.price,
    itemType: input.itemType,
    status: input.status,
    activatedAt: activatedAt ?? null,
    inactivatedAt: inactivatedAt ?? null,
    updatedAt: now,
  };

  // Persist via MDM facade
  await ctx.mdm.entity.update({
    mdmId: input.menuItemId,
    expectedVersion: existing.version,
    patch: { name: input.name, cafeFlow: cafeFlowPatch } as unknown as MdmEntityUpdateInput['patch'],
  });

  return {
    menuItemId: input.menuItemId,
    name: input.name,
    description: descriptionValue ?? undefined,
    menuCategoryId: input.menuCategoryId,
    price: input.price,
    itemType: input.itemType,
    status: input.status,
    activatedAt: activatedAt ?? undefined,
    inactivatedAt: inactivatedAt ?? undefined,
    updatedAt: now,
  };
}
