/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.ts" enhancement="_blank"/>
import type { StockLevel, StockLevelUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export type StockLevelId = string;
export type ProductId = string;

export interface StockLevelListFilter {
  stockItemId?: string;
  unit?: StockLevelUnit;
}

export interface IStockLevelRepository {
  getById(id: StockLevelId): Promise<StockLevel>;
  list(filter?: StockLevelListFilter): Promise<StockLevel[]>;
  save(stockLevel: StockLevel): Promise<void>;
  listLowStock(): Promise<StockLevel[]>;
  listByProductId(productId: ProductId): Promise<StockLevel[]>;
}
