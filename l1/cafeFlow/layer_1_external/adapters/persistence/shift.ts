/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shift.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const shiftTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowShift',
  tableName: 'shift',
  purpose: 'transacao',
  description: 'Turnos (abertura/fechamento de caixa). Campos não indexados em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'shift_id', postgresType: 'TEXT' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB' },
  ],
  primaryKey: ['shift_id'],
  indexes: [
    { name: 'idx_shift_status', columns: ['status'] },
    { name: 'idx_shift_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
