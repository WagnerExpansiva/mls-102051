/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumptionRepositoryAdapter.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IStockConsumptionRepository, DateRange } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
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

function toRow(consumption: StockConsumption): StockConsumptionRow {
  const details: StockConsumptionDetails = {
    quantity: consumption.quantity,
    voidedAt: consumption.voidedAt,
    voidReason: consumption.voidReason,
  };
  return {
    stock_consumption_id: consumption.stockConsumptionId,
    stock_item_id: consumption.stockItemId,
    order_id: consumption.orderId,
    status: consumption.status,
    created_at: consumption.createdAt,
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
    async append(consumption) {
      const repo = await getTable();
      await repo.insert({ record: toRow(consumption) });
    },

    async listByOwnerId(orderId) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { order_id: orderId },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },

    async listByPeriod(period: DateRange) {
      const repo = await getTable();
      const rows = await repo.findMany({
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows
        .filter((row) => row.created_at >= period.from && row.created_at <= period.to)
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
