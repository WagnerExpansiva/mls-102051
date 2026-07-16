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

export function isLowStock(stockLevel: Pick<StockLevel, 'currentQuantity' | 'minimumLevel'>): boolean {
  return stockLevel.currentQuantity <= stockLevel.minimumLevel;
}

export function validateStockLevelQuantities(
  currentQuantity: number,
  minimumLevel: number,
): void {
  if (currentQuantity < 0) {
    throw new Error('currentQuantity must be >= 0');
  }
  if (minimumLevel < 0) {
    throw new Error('minimumLevel must be >= 0');
  }
}

export function canChangeUnit(
  existing: Pick<StockLevel, 'unit'>,
  newUnit: StockLevelUnit,
): boolean {
  return existing.unit === newUnit;
}

export function applyDecrement(
  stockLevel: StockLevel,
  amount: number,
  nowIso: string,
): StockLevel {
  if (amount <= 0) {
    throw new Error('Decrement amount must be positive');
  }
  const newQuantity = stockLevel.currentQuantity - amount;
  if (newQuantity < 0) {
    throw new Error('currentQuantity must be >= 0');
  }
  return {
    ...stockLevel,
    currentQuantity: newQuantity,
    lastDecrementAt: nowIso,
    updatedAt: nowIso,
  };
}

export function applyAdjustment(
  stockLevel: StockLevel,
  newQuantity: number,
  nowIso: string,
): StockLevel {
  if (newQuantity < 0) {
    throw new Error('currentQuantity must be >= 0');
  }
  return {
    ...stockLevel,
    currentQuantity: newQuantity,
    lastAdjustmentAt: nowIso,
    updatedAt: nowIso,
  };
}
