/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevel.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const stockLevelTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowStockLevel',
  tableName: 'stock_level',
  purpose: 'controle',
  description: 'Níveis de estoque por item. Campos não indexados (currentQuantity, minimumLevel, lastDecrementAt, lastAdjustmentAt, updatedAt) em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'stock_level_id', postgresType: 'UUID', description: 'Primary key' },
    { name: 'stock_item_id', postgresType: 'UUID', description: 'FK to stock item' },
    { name: 'unit', postgresType: 'VARCHAR', description: 'Unit of measure' },
    { name: 'created_at', postgresType: 'TIMESTAMP', description: 'Creation timestamp for ordering' },
    { name: 'details', postgresType: 'JSONB', nullable: true, description: 'currentQuantity, minimumLevel, lastDecrementAt, lastAdjustmentAt, updatedAt' },
  ],
  primaryKey: ['stock_level_id'],
  indexes: [
    { name: 'idx_stock_level_stock_item_id', columns: ['stock_item_id'] },
    { name: 'idx_stock_level_unit', columns: ['unit'] },
    { name: 'idx_stock_level_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
