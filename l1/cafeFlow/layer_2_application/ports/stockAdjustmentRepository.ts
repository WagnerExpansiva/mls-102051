/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.ts" enhancement="_blank"/>
import type { StockAdjustment, StockAdjustmentStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.js';

export interface StockAdjustmentListFilter {
  stockItemId?: string;
  status?: StockAdjustmentStatus;
}

export interface IStockAdjustmentRepository {
  append(record: StockAdjustment): Promise<void>;
  list(filter: StockAdjustmentListFilter): Promise<StockAdjustment[]>;
  listByPeriod(start: Date, end: Date): Promise<StockAdjustment[]>;
}
