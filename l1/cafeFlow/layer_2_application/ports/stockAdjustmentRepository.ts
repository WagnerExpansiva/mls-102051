/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.ts" enhancement="_blank"/>
import type { StockAdjustment } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.js';

export type ProductId = string;
export type AdjustmentReason = string;

export interface IStockAdjustmentRepository {
  append(record: StockAdjustment): Promise<void>;
  listByProductId(productId: ProductId): Promise<StockAdjustment[]>;
  listByPeriod(start: Date, end: Date): Promise<StockAdjustment[]>;
  listByReason(reason: AdjustmentReason): Promise<StockAdjustment[]>;
}
