/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumptionRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { StockConsumption, StockConsumptionStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

interface StockConsumptionRow {
  stock_consumption_id: string;
  stock_item_id: string;
  order_id: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface StockConsumptionDetails {
  quantity: number;
  voidedAt: string | null;
  voidReason: string | null;
}

function toRow(record: StockConsumption): StockConsumptionRow {
  const details: StockConsumptionDetails = {
    quantity: record.quantity,
    voidedAt: record.voidedAt,
    voidReason: record.voidReason,
  };
  return {
    stock_consumption_id: record.stockConsumptionId,
    stock_item_id: record.stockItemId,
    order_id: record.orderId,
    status: record.status,
    created_at: record.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: StockConsumptionRow): StockConsumptionDetails {
  try {
    return JSON.parse(row.details ?? '{}') as StockConsumptionDetails;
  } catch {
    return { quantity: 0, voidedAt: null, voidReason: null };
  }
}

function toDomain(row: StockConsumptionRow): StockConsumption {
  const d = parseDetails(row);
  return {
    stockConsumptionId: row.stock_consumption_id,
    stockItemId: row.stock_item_id,
    orderId: row.order_id,
    quantity: d.quantity,
    status: row.status as StockConsumptionStatus,
    createdAt: row.created_at,
    voidedAt: d.voidedAt,
    voidReason: d.voidReason,
  };
}

export function createStockConsumptionRepositoryAdapter(ctx: RequestContext): IStockConsumptionRepository {
  const getTable = () => ctx.data.moduleData.getTable<StockConsumptionRow>('stock_consumption');

  return {
    async append(record) {
      const repo = await getTable();
      await repo.insert({ record: toRow(record) });
      return record;
    },

    async listByOwnerId(orderId) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { order_id: orderId },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },

    async listByPeriod(start, end) {
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

    async listByProductId(productId) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { stock_item_id: productId },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },
  };
}
