/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/menuItemIngredientRepository.ts" enhancement="_blank"/>
import type { MenuItemIngredient } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/menuItemIngredient.js';

export interface MenuItemIngredientFilter {
  menuItemId?: string;
  stockItemId?: string;
  unit?: MenuItemIngredient['unit'];
}

export interface IMenuItemIngredientRepository {
  /** Retrieve a menu item ingredient by its unique identifier. Throws NOT_FOUND when absent. */
  getById(id: string): Promise<MenuItemIngredient>;
  /** List menu item ingredients matching the given filter. */
  list(filter?: MenuItemIngredientFilter): Promise<MenuItemIngredient[]>;
  /** Persist the menu item ingredient aggregate (upsert). */
  save(menuItemIngredient: MenuItemIngredient): Promise<void>;
  /** Find ingredient mappings for a specific menu item. */
  findByMenuItemId(menuItemId: string): Promise<MenuItemIngredient[]>;
  /** Find menu item mappings for a specific ingredient (stock item). */
  findByIngredientId(ingredientId: string): Promise<MenuItemIngredient[]>;
}
