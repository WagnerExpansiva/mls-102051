/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.ts" enhancement="_blank"/>
export type StockConsumptionStatus = 'posted' | 'voided';

export interface StockConsumption {
  stockConsumptionId: string;
  stockItemId: string;
  orderId: string;
  quantity: number;
  status: StockConsumptionStatus;
  createdAt: string;
  voidedAt: string | null;
  voidReason: string | null;
}

export const STOCK_CONSUMPTION_STATUS_TRANSITIONS: Record<StockConsumptionStatus, StockConsumptionStatus[]> = {
  posted: ['voided'],
  voided: [],
};

export function canTransitionStockConsumption(
  from: StockConsumptionStatus,
  to: StockConsumptionStatus,
): boolean {
  return STOCK_CONSUMPTION_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function isStockConsumptionActive(
  consumption: Pick<StockConsumption, 'status'>,
): boolean {
  return consumption.status === 'posted';
}
