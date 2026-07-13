/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.ts" enhancement="_blank"/>
import type { Order, OrderStatus, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export type OrderId = string;
export type CustomerId = string;

export interface OrderFilter {
  shiftId?: string;
  status?: OrderStatus;
  orderType?: OrderType;
  tableNumber?: string;
}

export interface IOrderRepository {
  getById(orderId: OrderId): Promise<Order>;
  list(filter?: OrderFilter): Promise<Order[]>;
  save(order: Order): Promise<void>;
  findByCustomerId(customerId: CustomerId): Promise<Order[]>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
  findByPeriod(start: Date, end: Date): Promise<Order[]>;
}
