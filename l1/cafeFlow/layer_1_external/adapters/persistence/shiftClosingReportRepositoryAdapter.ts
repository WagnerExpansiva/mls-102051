/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReportRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IShiftClosingReportRepository, ShiftClosingReportListFilter } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

interface ShiftClosingReportRow {
  shift_closing_report_id: string;
  shift_id: string;
  created_at: string;
  details: string | null;
}

interface ShiftClosingReportDetails {
  totalApurado: number;
  paidOrderCount: number;
  updatedAt: string;
}

function toRow(report: ShiftClosingReport): ShiftClosingReportRow {
  const details: ShiftClosingReportDetails = {
    totalApurado: report.totalApurado,
    paidOrderCount: report.paidOrderCount,
    updatedAt: report.updatedAt,
  };
  return {
    shift_closing_report_id: report.shiftClosingReportId,
    shift_id: report.shiftId,
    created_at: report.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: ShiftClosingReportRow): ShiftClosingReportDetails {
  try {
    return JSON.parse(row.details ?? '{}') as ShiftClosingReportDetails;
  } catch {
    return {
      totalApurado: 0,
      paidOrderCount: 0,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: ShiftClosingReportRow): ShiftClosingReport {
  const d = parseDetails(row);
  return {
    shiftClosingReportId: row.shift_closing_report_id,
    shiftId: row.shift_id,
    totalApurado: d.totalApurado,
    paidOrderCount: d.paidOrderCount,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createShiftClosingReportRepositoryAdapter(ctx: RequestContext): IShiftClosingReportRepository {
  const getTable = () => ctx.data.moduleData.getTable<ShiftClosingReportRow>('shift_closing_report');

  return {
    async getById(id) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { shift_closing_report_id: id } });
      if (!row) {
        throw new AppError('NOT_FOUND', `ShiftClosingReport ${id} not found`, 404, { shiftClosingReportId: id });
      }
      return toDomain(row);
    },

    async list(filter?: ShiftClosingReportListFilter) {
      const repo = await getTable();
      const where: Partial<ShiftClosingReportRow> = {};
      if (filter?.shiftClosingReportId) where.shift_closing_report_id = filter.shiftClosingReportId;
      if (filter?.shiftId) where.shift_id = filter.shiftId;
      const rows = await repo.findMany({ where, orderBy: { field: 'created_at', direction: 'desc' } });
      let filtered = rows;
      if (filter?.fromCreatedAt) {
        filtered = filtered.filter((r) => r.created_at >= filter.fromCreatedAt!);
      }
      if (filter?.toCreatedAt) {
        filtered = filtered.filter((r) => r.created_at <= filter.toCreatedAt!);
      }
      return filtered.map(toDomain);
    },

    async save(report) {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { shift_closing_report_id: report.shiftClosingReportId } });
      if (existing) {
        await repo.update({ where: { shift_closing_report_id: report.shiftClosingReportId }, patch: toRow(report) });
      } else {
        await repo.insert({ record: toRow(report) });
      }
    },

    async listByShiftId(shiftId) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { shift_id: shiftId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },
  };
}
