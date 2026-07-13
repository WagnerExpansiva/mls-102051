/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IStockAdjustmentRepository, ProductId, AdjustmentReason } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.js';
import type { StockAdjustment, StockAdjustmentStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.js';

interface StockAdjustmentRow {
  stock_adjustment_id: string;
  stock_item_id: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface StockAdjustmentDetails {
  quantity: number;
  reason: string;
  voidedAt: string | null;
  voidedReason: string | null;
}

function toRow(record: StockAdjustment): StockAdjustmentRow {
  const details: StockAdjustmentDetails = {
    quantity: record.quantity,
    reason: record.reason,
    voidedAt: record.voidedAt,
    voidedReason: record.voidedReason,
  };
  return {
    stock_adjustment_id: record.stockAdjustmentId,
    stock_item_id: record.stockItemId,
    status: record.status,
    created_at: record.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: StockAdjustmentRow): StockAdjustmentDetails {
  try {
    return JSON.parse(row.details ?? '{}') as StockAdjustmentDetails;
  } catch {
    return { quantity: 0, reason: '', voidedAt: null, voidedReason: null };
  }
}

function toDomain(row: StockAdjustmentRow): StockAdjustment {
  const d = parseDetails(row);
  return {
    stockAdjustmentId: row.stock_adjustment_id,
    stockItemId: row.stock_item_id,
    status: row.status as StockAdjustmentStatus,
    quantity: d.quantity,
    reason: d.reason,
    voidedAt: d.voidedAt,
    voidedReason: d.voidedReason,
    createdAt: row.created_at,
  };
}

export function createStockAdjustmentRepositoryAdapter(ctx: RequestContext): IStockAdjustmentRepository {
  const getTable = () => ctx.data.moduleData.getTable<StockAdjustmentRow>('stock_adjustment');

  return {
    async append(record: StockAdjustment): Promise<void> {
      const repo = await getTable();
      await repo.insert({ record: toRow(record) });
    },

    async listByProductId(productId: ProductId): Promise<StockAdjustment[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { stock_item_id: productId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async listByPeriod(start: Date, end: Date): Promise<StockAdjustment[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      const startIso = start.toISOString();
      const endIso = end.toISOString();
      return rows
        .filter((row) => row.created_at >= startIso && row.created_at <= endIso)
        .map(toDomain);
    },

    async listByReason(reason: AdjustmentReason): Promise<StockAdjustment[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows
        .filter((row) => parseDetails(row).reason === reason)
        .map(toDomain);
    },
  };
}
