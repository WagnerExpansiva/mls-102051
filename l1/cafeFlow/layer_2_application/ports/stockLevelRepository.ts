/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.ts" enhancement="_blank"/>
import type { StockLevel, StockLevelUnit } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';

export type StockLevelId = string;

export interface Location {
  locationId: string;
  name?: string;
}

export interface StockLevelFilter {
  stockItemId?: string;
  unit?: StockLevelUnit;
}

export interface IStockLevelRepository {
  getById(stockLevelId: StockLevelId): Promise<StockLevel>;
  list(filter?: StockLevelFilter): Promise<StockLevel[]>;
  save(stockLevel: StockLevel): Promise<void>;
  findBelowMinimum(): Promise<StockLevel[]>;
  findByLocation(location: Location): Promise<StockLevel[]>;
}
