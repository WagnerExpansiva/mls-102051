/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.ts" enhancement="_blank"/>
export type StockUnit = 'kg' | 'liter' | 'portion' | 'unit';

export interface StockLevel {
  stockLevelId: string;
  stockItemId: string;
  currentQuantity: number;
  minimumLevel: number;
  unit: StockUnit;
  lastDecrementAt: string | null;
  lastAdjustmentAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function currentQuantityIsNonNegative(stockLevel: Pick<StockLevel, 'currentQuantity'>): boolean {
  return stockLevel.currentQuantity >= 0;
}

export function minimumLevelIsNonNegative(stockLevel: Pick<StockLevel, 'minimumLevel'>): boolean {
  return stockLevel.minimumLevel >= 0;
}

export function isLowStock(stockLevel: Pick<StockLevel, 'currentQuantity' | 'minimumLevel'>): boolean {
  return stockLevel.currentQuantity < stockLevel.minimumLevel;
}

export function validateStockLevelInvariants(stockLevel: StockLevel): string[] {
  const violations: string[] = [];
  if (!currentQuantityIsNonNegative(stockLevel)) {
    violations.push('currentQuantity não pode ser negativa');
  }
  if (!minimumLevelIsNonNegative(stockLevel)) {
    violations.push('minimumLevel deve ser maior ou igual a zero');
  }
  return violations;
}
