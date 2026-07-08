/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/menuItemIngredient.ts" enhancement="_blank"/>
export type MenuItemIngredientUnit =
  | 'kg'
  | 'gram'
  | 'liter'
  | 'milliliter'
  | 'portion'
  | 'unit';

export interface MenuItemIngredient {
  menuItemIngredientId: string;
  menuItemId: string;
  stockItemId: string;
  quantity: number;
  unit: MenuItemIngredientUnit;
  createdAt: string;
  updatedAt: string;
}

/**
 * Unit compatibility groups — ingredients whose stock item uses a unit from the
 * same group are considered compatible.
 */
export const UNIT_COMPATIBILITY_GROUPS: Record<MenuItemIngredientUnit, MenuItemIngredientUnit[]> = {
  kg: ['kg', 'gram'],
  gram: ['kg', 'gram'],
  liter: ['liter', 'milliliter'],
  milliliter: ['liter', 'milliliter'],
  portion: ['portion'],
  unit: ['unit'],
};

/**
 * Invariant: quantity must be greater than zero.
 */
export function menuItemIngredientQuantityIsValid(
  ingredient: Pick<MenuItemIngredient, 'quantity'>,
): boolean {
  return ingredient.quantity > 0;
}

/**
 * Invariant: the unit of the link must be compatible with the unit of the
 * referenced stock item.
 */
export function menuItemIngredientUnitIsCompatible(
  ingredientUnit: MenuItemIngredientUnit,
  stockItemUnit: MenuItemIngredientUnit,
): boolean {
  const compatible = UNIT_COMPATIBILITY_GROUPS[stockItemUnit] ?? [];
  return compatible.includes(ingredientUnit);
}

/**
 * Invariant: cannot have more than one link between the same menuItemId and stockItemId.
 * Returns true when the given list has no duplicate (menuItemId, stockItemId) pairs.
 */
export function menuItemIngredientNoDuplicateLinks(
  ingredients: Array<Pick<MenuItemIngredient, 'menuItemId' | 'stockItemId'>>,
): boolean {
  const seen = new Set<string>();
  for (const ingredient of ingredients) {
    const key = `${ingredient.menuItemId}::${ingredient.stockItemId}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
  }
  return true;
}

/**
 * Returns the duplicate key if one exists, or null otherwise.
 */
export function findDuplicateMenuItemIngredientLink(
  ingredients: Array<Pick<MenuItemIngredient, 'menuItemId' | 'stockItemId'>>,
): { menuItemId: string; stockItemId: string } | null {
  const seen = new Map<string, { menuItemId: string; stockItemId: string }>();
  for (const ingredient of ingredients) {
    const key = `${ingredient.menuItemId}::${ingredient.stockItemId}`;
    const existing = seen.get(key);
    if (existing) {
      return existing;
    }
    seen.set(key, { menuItemId: ingredient.menuItemId, stockItemId: ingredient.stockItemId });
  }
  return null;
}
