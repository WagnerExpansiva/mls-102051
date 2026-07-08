/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.ts" enhancement="_blank"/>
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface OrderListFilter {
  shiftId?: string;
  status?: OrderStatus;
  orderType?: 'table' | 'takeout';
  tableNumber?: string | null;
}

export interface IOrderRepository {
  getById(id: string): Promise<Order>;
  list(filter?: OrderListFilter): Promise<Order[]>;
  save(order: Order): Promise<void>;
  listByStatus(status: OrderStatus): Promise<Order[]>;
  listByPeriod(start: Date, end: Date): Promise<Order[]>;
}
