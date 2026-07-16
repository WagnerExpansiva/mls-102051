/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.ts" enhancement="_blank"/>
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export type OrderId = string;
export type ProductId = string;

export interface DateRange {
  from: string;
  to: string;
}

export interface IStockConsumptionRepository {
  append(consumption: StockConsumption): Promise<void>;
  listByOwnerId(orderId: OrderId): Promise<StockConsumption[]>;
  listByPeriod(period: DateRange): Promise<StockConsumption[]>;
  listByProductId(productId: ProductId): Promise<StockConsumption[]>;
}
