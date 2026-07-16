/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevelRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IStockLevelRepository, StockLevelFilter, Location } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
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
    async getById(stockLevelId) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { stock_level_id: stockLevelId } });
      if (!row) {
        throw new AppError('NOT_FOUND', `StockLevel ${stockLevelId} not found`, 404, { stockLevelId });
      }
      return toDomain(row);
    },

    async list(filter?: StockLevelFilter) {
      const repo = await getTable();
      const where: Partial<StockLevelRow> = {};
      if (filter?.stockItemId) where.stock_item_id = filter.stockItemId;
      if (filter?.unit) where.unit = filter.unit;
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async save(stockLevel) {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { stock_level_id: stockLevel.stockLevelId } });
      if (existing) {
        await repo.update({
          where: { stock_level_id: stockLevel.stockLevelId },
          patch: toRow(stockLevel),
        });
      } else {
        await repo.insert({ record: toRow(stockLevel) });
      }
    },

    async findBelowMinimum() {
      const repo = await getTable();
      const rows = await repo.findMany({
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      const all = rows.map(toDomain);
      return all.filter(
        (sl) => sl.currentQuantity < sl.minimumLevel,
      );
    },

    async findByLocation(_location: Location) {
      // StockLevel entity has no location field in the current schema;
      // location-based filtering would require a location column or MDM relationship.
      // Returns empty array until location is modelled on the aggregate.
      return [];
    },
  };
}
