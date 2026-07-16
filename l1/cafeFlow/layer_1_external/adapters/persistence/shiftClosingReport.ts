/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReport.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const shiftClosingReportTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowShiftClosingReport',
  tableName: 'shift_closing_report',
  purpose: 'transacao',
  description: 'Fechamento de turno. Campos não indexados (totalApurado, paidOrderCount, updatedAt) em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'shift_closing_report_id', postgresType: 'TEXT' },
    { name: 'shift_id', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB' },
  ],
  primaryKey: ['shift_closing_report_id'],
  indexes: [
    { name: 'idx_shift_closing_report_shift_id', columns: ['shift_id'] },
    { name: 'idx_shift_closing_report_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
