/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MdmDetailRecord } from '/_102034_/l1/mdm/module.js';

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

/**
 * Manage (update) an existing MenuItem MDM record.
 *
 * Rules applied inline:
 * - simpleItemsOnly: only itemType === 'simple' is allowed in this phase.
 * - menuItemRequiresIngredient: when transitioning to 'active', the item must have
 *   at least one related entity (ingredient) linked via MDM relationships.
 *
 * MODELING GAP: MenuItemIngredient is neither a declared MDM entity type nor a
 * runtime port. The relatedOfMany call is the closest available proxy to check
 * for linked ingredients.
 */
export async function manageMenuItem(
  ctx: RequestContext,
  input: ManageMenuItemInput,
): Promise<ManageMenuItemOutput> {
  return ctx.data.runInTransaction(async () => {
    const now = ctx.clock.nowIso();

    // Step 2: Load the current MenuItem via MDM facade
    const existing = await ctx.mdm.entity.get({ mdmId: input.menuItemId });
    const existingDetails = existing.details as unknown as Record<string, unknown>;
    const currentStatusRaw = String(existingDetails.status ?? '');
    const currentStatus = currentStatusRaw.toLowerCase();
    const currentActivatedAt =
      (existingDetails.activatedAt as string | null | undefined) ?? null;
    const currentInactivatedAt =
      (existingDetails.inactivatedAt as string | null | undefined) ?? null;

    // Step 3: simpleItemsOnly rule
    if (input.itemType !== 'simple') {
      throw new AppError(
        'VALIDATION_ERROR',
        'simpleItemsOnly: apenas itens do tipo "simple" são permitidos nesta fase.',
        400,
        { ruleId: 'simpleItemsOnly', itemType: input.itemType },
      );
    }

    // Step 4: Validate menuCategoryId references an existing, non-inactive MenuCategory
    const category = await ctx.mdm.entity.get({ mdmId: input.menuCategoryId });
    const categoryDetails = category.details as unknown as Record<string, unknown>;
    if (String(categoryDetails.status).toLowerCase() === 'inactive') {
      throw new AppError(
        'VALIDATION_ERROR',
        `MenuCategory inativa: ${input.menuCategoryId}`,
        400,
        { menuCategoryId: input.menuCategoryId },
      );
    }

    // Step 5: menuItemRequiresIngredient — only when transitioning to 'active'
    const transitioningToActive =
      (currentStatus === 'draft' || currentStatus === 'inactive') &&
      input.status === 'active';

    if (transitioningToActive) {
      const relatedMap = await ctx.mdm.collection.relatedOfMany({
        mdmIds: [input.menuItemId],
      });
      const relatedEntries = relatedMap[input.menuItemId] ?? [];
      if (relatedEntries.length === 0) {
        throw new AppError(
          'VALIDATION_ERROR',
          'menuItemRequiresIngredient: o item do cardápio precisa ter ao menos um ingrediente vinculado antes de ser ativado.',
          400,
          { ruleId: 'menuItemRequiresIngredient', menuItemId: input.menuItemId },
        );
      }
    }

    // Steps 6-8: Compute timestamps based on status transitions
    let activatedAt: string | null = currentActivatedAt;
    let inactivatedAt: string | null = currentInactivatedAt;

    if (transitioningToActive) {
      activatedAt = now;
    }

    if (currentStatus === 'active' && input.status === 'inactive') {
      inactivatedAt = now;
    }

    const updatedAt = now;

    // Step 9: Persist the updated MenuItem via MDM facade
    const patch: Record<string, unknown> = {
      name: input.name,
      description: input.description ?? null,
      menuCategoryId: input.menuCategoryId,
      price: input.price,
      itemType: input.itemType,
      status: input.status,
      activatedAt,
      inactivatedAt,
      updatedAt,
    };

    await ctx.mdm.entity.update({
      mdmId: input.menuItemId,
      expectedVersion: existing.version,
      patch: patch as unknown as Partial<MdmDetailRecord>,
    });

    // Step 10: Return the updated MenuItem fields
    const output: ManageMenuItemOutput = {
      menuItemId: input.menuItemId,
      name: input.name,
      menuCategoryId: input.menuCategoryId,
      price: input.price,
      itemType: input.itemType,
      status: input.status,
      updatedAt,
    };

    if (input.description !== undefined) {
      output.description = input.description;
    }
    if (activatedAt !== null) {
      output.activatedAt = activatedAt;
    }
    if (inactivatedAt !== null) {
      output.inactivatedAt = inactivatedAt;
    }

    return output;
  });
}
