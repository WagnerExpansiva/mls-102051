/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IShiftRepository, ShiftFilter, ShiftId, LocalDate } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Shift, ShiftStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

interface ShiftRow {
  shift_id: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface ShiftDetails {
  openedAt: string;
  closedAt: string | null;
  openedBy: string;
  closedBy: string | null;
  totalApurado: number | null;
  notes: string | null;
  updatedAt: string;
}

function toRow(shift: Shift): ShiftRow {
  const details: ShiftDetails = {
    openedAt: shift.openedAt,
    closedAt: shift.closedAt,
    openedBy: shift.openedBy,
    closedBy: shift.closedBy,
    totalApurado: shift.totalApurado,
    notes: shift.notes,
    updatedAt: shift.updatedAt,
  };
  return {
    shift_id: shift.shiftId,
    status: shift.status,
    created_at: shift.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: ShiftRow): ShiftDetails {
  try {
    return JSON.parse(row.details ?? '{}') as ShiftDetails;
  } catch {
    return {
      openedAt: row.created_at,
      closedAt: null,
      openedBy: '',
      closedBy: null,
      totalApurado: null,
      notes: null,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: ShiftRow): Shift {
  const d = parseDetails(row);
  return {
    shiftId: row.shift_id,
    status: row.status as ShiftStatus,
    openedAt: d.openedAt,
    closedAt: d.closedAt,
    openedBy: d.openedBy,
    closedBy: d.closedBy,
    totalApurado: d.totalApurado,
    notes: d.notes,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createShiftRepositoryAdapter(ctx: RequestContext): IShiftRepository {
  const getTable = () => ctx.data.moduleData.getTable<ShiftRow>('shift');

  return {
    async getById(id: ShiftId): Promise<Shift> {
      const repo = await getTable();
      const row = await repo.findOne({ where: { shift_id: id } });
      if (!row) {
        throw new AppError('NOT_FOUND', `Shift ${id} not found`, 404, { shiftId: id });
      }
      return toDomain(row);
    },

    async list(filter?: ShiftFilter): Promise<Shift[]> {
      const repo = await getTable();
      const where: Partial<ShiftRow> = {};
      if (filter?.status) {
        where.status = filter.status;
      }
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      let result = rows.map(toDomain);
      if (filter?.openedBy) {
        result = result.filter((s) => s.openedBy === filter.openedBy);
      }
      return result;
    },

    async save(shift: Shift): Promise<void> {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { shift_id: shift.shiftId } });
      if (existing) {
        await repo.update({ where: { shift_id: shift.shiftId }, patch: toRow(shift) });
      } else {
        await repo.insert({ record: toRow(shift) });
      }
    },

    async findOpenShift(): Promise<Shift | null> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { status: 'open' },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      if (rows.length === 0) {
        return null;
      }
      return toDomain(rows[0]);
    },

    async listByDate(date: LocalDate): Promise<Shift[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      const all = rows.map(toDomain);
      return all.filter((s) => s.openedAt.slice(0, 10) === date);
    },
  };
}
