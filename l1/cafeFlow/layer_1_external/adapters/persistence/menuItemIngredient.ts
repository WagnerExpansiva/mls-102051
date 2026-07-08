/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredient.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const menuItemIngredientTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowMenuItemIngredient',
  tableName: 'menu_item_ingredient',
  purpose: 'transacao',
  description: 'Vínculo entre item de menu e item de estoque (ingrediente). Campos não indexados (quantity, updatedAt) em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'menu_item_ingredient_id', postgresType: 'UUID' },
    { name: 'menu_item_id', postgresType: 'UUID' },
    { name: 'stock_item_id', postgresType: 'UUID' },
    { name: 'unit', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['menu_item_ingredient_id'],
  indexes: [
    { name: 'idx_menu_item_ingredient_menu_item_id', columns: ['menu_item_id'] },
    { name: 'idx_menu_item_ingredient_stock_item_id', columns: ['stock_item_id'] },
    { name: 'idx_menu_item_ingredient_unit', columns: ['unit'] },
    { name: 'idx_menu_item_ingredient_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
