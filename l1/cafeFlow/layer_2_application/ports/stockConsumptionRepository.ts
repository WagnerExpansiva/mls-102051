/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.ts" enhancement="_blank"/>
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

/**
 * Append-only event port for StockConsumption records.
 * Once a consumption is recorded it is immutable — no save/update/delete.
 */
export interface IStockConsumptionRepository {
  /** Record a new stock consumption event. Returns the persisted record. */
  append(record: StockConsumption): Promise<StockConsumption>;

  /** List all consumption events for a given order (the "owner"). */
  listByOwnerId(orderId: string): Promise<StockConsumption[]>;

  /** List all consumption events within a date range (inclusive). */
  listByPeriod(start: Date, end: Date): Promise<StockConsumption[]>;

  /** List all consumption events for a given product / stock item. */
  listByProductId(productId: string): Promise<StockConsumption[]>;
}
