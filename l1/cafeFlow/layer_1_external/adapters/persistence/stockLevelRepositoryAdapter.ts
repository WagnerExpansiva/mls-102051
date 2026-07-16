/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevelRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IStockLevelRepository, StockLevelFilter } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { StockLevel, StockLevelUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

interface StockLevelRow {
  stock_level_id: string;
  stock_item_id: string;
  unit: string;
  created_at: string;
  details: string | null;
}

interface StockLevelDetails {
  currentQuantity: number;
  minimumLevel: number;
  lastDecrementAt: string | null;
  lastAdjustmentAt: string | null;
  updatedAt: string;
}

function toRow(stockLevel: StockLevel): StockLevelRow {
  const details: StockLevelDetails = {
    currentQuantity: stockLevel.currentQuantity,
    minimumLevel: stockLevel.minimumLevel,
    lastDecrementAt: stockLevel.lastDecrementAt,
    lastAdjustmentAt: stockLevel.lastAdjustmentAt,
    updatedAt: stockLevel.updatedAt,
  };
  return {
    stock_level_id: stockLevel.stockLevelId,
    stock_item_id: stockLevel.stockItemId,
    unit: stockLevel.unit,
    created_at: stockLevel.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: StockLevelRow): StockLevelDetails {
  try {
    return JSON.parse(row.details ?? '{}') as StockLevelDetails;
  } catch {
    return {
      currentQuantity: 0,
      minimumLevel: 0,
      lastDecrementAt: null,
      lastAdjustmentAt: null,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: StockLevelRow): StockLevel {
  const d = parseDetails(row);
  return {
    stockLevelId: row.stock_level_id,
    stockItemId: row.stock_item_id,
    currentQuantity: d.currentQuantity,
    minimumLevel: d.minimumLevel,
    unit: row.unit as StockLevelUnit,
    lastDecrementAt: d.lastDecrementAt,
    lastAdjustmentAt: d.lastAdjustmentAt,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createStockLevelRepositoryAdapter(ctx: RequestContext): IStockLevelRepository {
  const getTable = () => ctx.data.moduleData.getTable<StockLevelRow>('stock_level');

  return {
    async getById(id) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { stock_level_id: id } });
      if (!row) throw new AppError('NOT_FOUND', `StockLevel ${id} not found`, 404, { stockLevelId: id });
      return toDomain(row);
    },

    async findById(id) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { stock_level_id: id } });
      return row ? toDomain(row) : null;
    },

    async findByProductId(productId) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { stock_item_id: productId } });
      return row ? toDomain(row) : null;
    },

    async list(filter?: StockLevelFilter) {
      const repo = await getTable();
      const where: Partial<StockLevelRow> = {};
      if (filter?.stockLevelId) where.stock_level_id = filter.stockLevelId;
      if (filter?.stockItemId) where.stock_item_id = filter.stockItemId;
      if (filter?.unit) where.unit = filter.unit;
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },

    async listLowStock() {
      const repo = await getTable();
      const rows = await repo.findMany({
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      const all = rows.map(toDomain);
      return all.filter((sl) => sl.currentQuantity <= sl.minimumLevel);
    },

    async save(stockLevel) {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { stock_level_id: stockLevel.stockLevelId } });
      if (existing) {
        await repo.update({ where: { stock_level_id: stockLevel.stockLevelId }, patch: toRow(stockLevel) });
      } else {
        await repo.insert({ record: toRow(stockLevel) });
      }
    },
  };
}
