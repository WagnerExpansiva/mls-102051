/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevel.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const stockLevelTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowStockLevel',
  tableName: 'stock_level',
  purpose: 'transacao',
  description: 'Níveis de estoque por item. Campos não indexados em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'stock_level_id', postgresType: 'TEXT' },
    { name: 'stock_item_id', postgresType: 'TEXT' },
    { name: 'unit', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['stock_level_id'],
  indexes: [
    { name: 'idx_stock_level_stock_item_id', columns: ['stock_item_id'] },
    { name: 'idx_stock_level_unit', columns: ['unit'] },
    { name: 'idx_stock_level_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
