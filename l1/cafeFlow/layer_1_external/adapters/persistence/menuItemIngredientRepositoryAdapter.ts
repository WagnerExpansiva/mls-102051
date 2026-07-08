/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredientRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IMenuItemIngredientRepository, MenuItemIngredientFilter } from '/_102051_/l1/cafeFlow/layer_2_application/ports/menuItemIngredientRepository.js';
import type { MenuItemIngredient, MenuItemIngredientUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/menuItemIngredient.js';

interface MenuItemIngredientRow {
  menu_item_ingredient_id: string;
  menu_item_id: string;
  stock_item_id: string;
  unit: string;
  created_at: string;
  details: string | null;
}

interface MenuItemIngredientDetails {
  quantity: number;
  updatedAt: string;
}

function toRow(entity: MenuItemIngredient): MenuItemIngredientRow {
  const details: MenuItemIngredientDetails = {
    quantity: entity.quantity,
    updatedAt: entity.updatedAt,
  };
  return {
    menu_item_ingredient_id: entity.menuItemIngredientId,
    menu_item_id: entity.menuItemId,
    stock_item_id: entity.stockItemId,
    unit: entity.unit,
    created_at: entity.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: MenuItemIngredientRow): MenuItemIngredientDetails {
  try {
    return JSON.parse(row.details ?? '{}') as MenuItemIngredientDetails;
  } catch {
    return { quantity: 0, updatedAt: row.created_at };
  }
}

function toDomain(row: MenuItemIngredientRow): MenuItemIngredient {
  const d = parseDetails(row);
  return {
    menuItemIngredientId: row.menu_item_ingredient_id,
    menuItemId: row.menu_item_id,
    stockItemId: row.stock_item_id,
    quantity: d.quantity,
    unit: row.unit as MenuItemIngredientUnit,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createMenuItemIngredientRepositoryAdapter(ctx: RequestContext): IMenuItemIngredientRepository {
  const getTable = () => ctx.data.moduleData.getTable<MenuItemIngredientRow>('menu_item_ingredient');

  return {
    async getById(id: string): Promise<MenuItemIngredient> {
      const repo = await getTable();
      const row = await repo.findOne({ where: { menu_item_ingredient_id: id } });
      if (!row) {
        throw new AppError('NOT_FOUND', `MenuItemIngredient ${id} not found`, 404, { id });
      }
      return toDomain(row);
    },

    async list(filter?: MenuItemIngredientFilter): Promise<MenuItemIngredient[]> {
      const where: Partial<MenuItemIngredientRow> = {};
      if (filter?.menuItemId) where.menu_item_id = filter.menuItemId;
      if (filter?.stockItemId) where.stock_item_id = filter.stockItemId;
      if (filter?.unit) where.unit = filter.unit;
      const repo = await getTable();
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },

    async save(menuItemIngredient: MenuItemIngredient): Promise<void> {
      const repo = await getTable();
      const existing = await repo.findOne({
        where: { menu_item_ingredient_id: menuItemIngredient.menuItemIngredientId },
      });
      if (existing) {
        await repo.update({
          where: { menu_item_ingredient_id: menuItemIngredient.menuItemIngredientId },
          patch: toRow(menuItemIngredient),
        });
      } else {
        await repo.insert({ record: toRow(menuItemIngredient) });
      }
    },

    async findByMenuItemId(menuItemId: string): Promise<MenuItemIngredient[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { menu_item_id: menuItemId },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },

    async findByIngredientId(ingredientId: string): Promise<MenuItemIngredient[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { stock_item_id: ingredientId },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },
  };
}
