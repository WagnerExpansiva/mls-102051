/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.ts" enhancement="_blank"/>
import type {
  StockConsumption,
  StockConsumptionStatus,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export interface StockConsumptionListFilter {
  stockItemId?: string;
  orderId?: string;
  status?: StockConsumptionStatus;
}

export interface IStockConsumptionRepository {
  append(record: StockConsumption): Promise<void>;
  list(filter: StockConsumptionListFilter): Promise<StockConsumption[]>;
  listByOwnerId(orderId: string): Promise<StockConsumption[]>;
  listByPeriod(start: Date, end: Date): Promise<StockConsumption[]>;
}
