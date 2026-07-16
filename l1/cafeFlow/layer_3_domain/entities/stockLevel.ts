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

export function isStockLevelUnit(value: string): value is StockLevelUnit {
  return value === 'kg' || value === 'liter' || value === 'portion' || value === 'unit';
}

export function validateStockLevelInvariants(
  stockLevel: Pick<StockLevel, 'currentQuantity' | 'minimumLevel'>,
): string[] {
  const violations: string[] = [];
  if (stockLevel.currentQuantity < 0) {
    violations.push('currentQuantity must not be negative');
  }
  if (stockLevel.minimumLevel < 0) {
    violations.push('minimumLevel must be greater than or equal to zero');
  }
  return violations;
}

export function isLowStock(
  stockLevel: Pick<StockLevel, 'currentQuantity' | 'minimumLevel'>,
): boolean {
  return stockLevel.currentQuantity < stockLevel.minimumLevel;
}

export function canDecrement(
  stockLevel: Pick<StockLevel, 'currentQuantity'>,
  amount: number,
): boolean {
  return amount > 0 && stockLevel.currentQuantity - amount >= 0;
}

export function decrementStockLevel(
  stockLevel: StockLevel,
  amount: number,
  nowIso: string,
): StockLevel {
  if (amount <= 0) {
    throw new Error('Decrement amount must be positive');
  }
  if (stockLevel.currentQuantity - amount < 0) {
    throw new Error('currentQuantity must not be negative');
  }
  return {
    ...stockLevel,
    currentQuantity: stockLevel.currentQuantity - amount,
    lastDecrementAt: nowIso,
    updatedAt: nowIso,
  };
}

export function adjustStockLevel(
  stockLevel: StockLevel,
  newQuantity: number,
  nowIso: string,
): StockLevel {
  if (newQuantity < 0) {
    throw new Error('currentQuantity must not be negative');
  }
  return {
    ...stockLevel,
    currentQuantity: newQuantity,
    lastAdjustmentAt: nowIso,
    updatedAt: nowIso,
  };
}
