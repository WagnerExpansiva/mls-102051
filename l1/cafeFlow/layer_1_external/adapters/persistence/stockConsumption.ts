/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumption.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const stockConsumptionTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowStockConsumption',
  tableName: 'stock_consumption',
  purpose: 'controle',
  description:
    'Append-only stock consumption records. Non-indexed fields (quantity, voidedAt, voidReason) stored in details JSONB.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  retentionDays: 365,
  columns: [
    { name: 'stock_consumption_id', postgresType: 'TEXT' },
    { name: 'stock_item_id', postgresType: 'TEXT' },
    { name: 'order_id', postgresType: 'TEXT' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['stock_consumption_id'],
  indexes: [
    { name: 'idx_stock_consumption_stock_item_id', columns: ['stock_item_id'] },
    { name: 'idx_stock_consumption_order_id', columns: ['order_id'] },
    { name: 'idx_stock_consumption_status', columns: ['status'] },
    { name: 'idx_stock_consumption_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
