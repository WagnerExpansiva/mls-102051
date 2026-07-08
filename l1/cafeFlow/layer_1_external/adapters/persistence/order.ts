/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const orderTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowOrder',
  tableName: 'order',
  purpose: 'transacao',
  description: 'Pedidos. Campos não indexados (tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, deliveredAt, updatedAt) e coleção filha OrderItem em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'order_id', postgresType: 'UUID', description: 'Primary key' },
    { name: 'shift_id', postgresType: 'UUID', description: 'FK to shift' },
    { name: 'status', postgresType: 'VARCHAR', description: 'Order status' },
    { name: 'order_type', postgresType: 'VARCHAR', description: 'Order type' },
    { name: 'created_at', postgresType: 'TIMESTAMP', defaultSql: 'NOW()', description: 'Creation timestamp for ordering' },
    { name: 'details', postgresType: 'JSONB', nullable: true, description: 'tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, deliveredAt, updatedAt + child collection OrderItem' },
  ],
  primaryKey: ['order_id'],
  indexes: [
    { name: 'idx_order_shift_id', columns: ['shift_id'] },
    { name: 'idx_order_status', columns: ['status'] },
    { name: 'idx_order_type', columns: ['order_type'] },
    { name: 'idx_order_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
