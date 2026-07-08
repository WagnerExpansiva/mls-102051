/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.ts" enhancement="_blank"/>
export type StockAdjustmentStatus = 'posted' | 'voided';

export interface StockAdjustment {
  stockAdjustmentId: string;
  stockItemId: string;
  status: StockAdjustmentStatus;
  quantity: number;
  reason: string;
  voidedAt: string | null;
  voidedReason: string | null;
  createdAt: string;
}

export const STOCK_ADJUSTMENT_STATUS_TRANSITIONS: Record<StockAdjustmentStatus, StockAdjustmentStatus[]> = {
  posted: ['voided'],
  voided: [],
};

export function canTransitionStockAdjustment(
  from: StockAdjustmentStatus,
  to: StockAdjustmentStatus,
): boolean {
  return STOCK_ADJUSTMENT_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function isStockAdjustmentActive(
  adjustment: Pick<StockAdjustment, 'status'>,
): boolean {
  return adjustment.status === 'posted';
}
