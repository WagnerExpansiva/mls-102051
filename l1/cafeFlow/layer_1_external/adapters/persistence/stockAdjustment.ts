/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const stockAdjustmentTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowStockAdjustment',
  tableName: 'stock_adjustment',
  purpose: 'controle',
  description: 'Append-only stock adjustments. Non-indexed fields (quantity, reason, voidedAt, voidedReason) in details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'stock_adjustment_id', postgresType: 'TEXT' },
    { name: 'stock_item_id', postgresType: 'TEXT' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB' },
  ],
  primaryKey: ['stock_adjustment_id'],
  indexes: [
    { name: 'idx_stock_adjustment_stock_item_id', columns: ['stock_item_id'] },
    { name: 'idx_stock_adjustment_status', columns: ['status'] },
    { name: 'idx_stock_adjustment_created_at', columns: ['created_at'] },
  ],
  retentionDays: 365,
  version: 1,
};
