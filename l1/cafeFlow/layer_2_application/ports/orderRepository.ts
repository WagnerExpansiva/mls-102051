/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.ts" enhancement="_blank"/>
import type { Order, OrderStatus, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export type OrderId = string;
export type OrderNumber = string;
export type ShiftId = string;

export interface OrderFilter {
  shiftId?: ShiftId;
  status?: OrderStatus;
  orderType?: OrderType;
  tableNumber?: string;
}

export interface IOrderRepository {
  getById(id: OrderId): Promise<Order>;
  findById(id: OrderId): Promise<Order | null>;
  findByOrderNumber(orderNumber: OrderNumber): Promise<Order | null>;
  list(filter?: OrderFilter): Promise<Order[]>;
  listByShiftId(shiftId: ShiftId): Promise<Order[]>;
  save(order: Order): Promise<void>;
}
