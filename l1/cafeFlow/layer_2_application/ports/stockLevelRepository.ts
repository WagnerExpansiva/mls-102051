/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.ts" enhancement="_blank"/>
import type { StockLevel, StockUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export type ProductId = string;

export type Location = string;

export interface StockLevelFilter {
  stockLevelId?: string;
  stockItemId?: string;
  unit?: StockUnit;
}

export interface IStockLevelRepository {
  getById(productId: ProductId): Promise<StockLevel>;
  list(filter?: StockLevelFilter): Promise<StockLevel[]>;
  save(stockLevel: StockLevel): Promise<void>;
  findBelowMinimum(): Promise<StockLevel[]>;
  findByLocation(location: Location): Promise<StockLevel[]>;
}
