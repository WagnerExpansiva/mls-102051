/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.ts" enhancement="_blank"/>
export type StockLevelUnit = 'kg' | 'liter' | 'portion' | 'unit';

export interface StockLevel {
  stockLevelId: string;
  stockItemId: string;
  currentQuantity: number;
  minimumLevel: number;
  unit: StockLevelUnit;
  lastDecrementAt: string | null;
  lastAdjustmentAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function isCurrentQuantityValid(quantity: number): boolean {
  return quantity >= 0;
}

export function isMinimumLevelValid(level: number): boolean {
  return level >= 0;
}

export function isLowStockAlert(stockLevel: Pick<StockLevel, 'currentQuantity' | 'minimumLevel'>): boolean {
  return stockLevel.currentQuantity <= stockLevel.minimumLevel;
}

export function validateStockLevelInvariants(stockLevel: Pick<StockLevel, 'currentQuantity' | 'minimumLevel'>): boolean {
  return isCurrentQuantityValid(stockLevel.currentQuantity) && isMinimumLevelValid(stockLevel.minimumLevel);
}
