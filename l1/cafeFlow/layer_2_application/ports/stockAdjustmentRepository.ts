/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.ts" enhancement="_blank"/>
import type { StockAdjustment } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.js';

/**
 * Branded primitive used to identify a product in stock adjustment queries.
 * Falls back to plain string when no dedicated ProductId value-object exists.
 */
export type ProductId = string;

/**
 * Reason category for stock adjustments, used as a filter in listByReason.
 */
export type AdjustmentReason = string;

export interface IStockAdjustmentRepository {
  /** Append an immutable stock adjustment event. */
  append(record: StockAdjustment): Promise<void>;
  /** List all adjustments for a given product. */
  listByProductId(productId: ProductId): Promise<StockAdjustment[]>;
  /** List all adjustments within a date range (inclusive). */
  listByPeriod(start: Date, end: Date): Promise<StockAdjustment[]>;
  /** List all adjustments matching a reason. */
  listByReason(reason: AdjustmentReason): Promise<StockAdjustment[]>;
}
