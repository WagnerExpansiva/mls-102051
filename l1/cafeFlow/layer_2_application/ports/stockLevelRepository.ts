/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.ts" enhancement="_blank"/>
import type { StockLevel, StockLevelUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export type StockLevelId = string;
export type ProductId = string;

export interface StockLevelFilter {
  stockLevelId?: StockLevelId;
  stockItemId?: string;
  unit?: StockLevelUnit;
}

export interface IStockLevelRepository {
  getById(id: StockLevelId): Promise<StockLevel>;
  findById(id: StockLevelId): Promise<StockLevel | null>;
  findByProductId(productId: ProductId): Promise<StockLevel | null>;
  list(filter?: StockLevelFilter): Promise<StockLevel[]>;
  listLowStock(): Promise<StockLevel[]>;
  save(stockLevel: StockLevel): Promise<void>;
}
