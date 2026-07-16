/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/order.ts" enhancement="_blank"/>
export type OrderStatus = 'registered' | 'received' | 'inPreparation' | 'ready' | 'delivered';
export type OrderType = 'table' | 'takeout';

export interface OrderItem {
  orderItemId: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  orderId: string;
  shiftId: string;
  status: OrderStatus;
  orderType: OrderType;
  tableNumber: string | null;
  priority: boolean | null;
  priorityReason: string | null;
  receivedAt: string | null;
  inPreparationAt: string | null;
  readyAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  registered: ['received'],
  received: ['inPreparation'],
  inPreparation: ['ready'],
  ready: ['delivered'],
  delivered: [],
};

export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  return ORDER_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function orderRequiresItem(order: Pick<Order, 'items'>): boolean {
  return order.items.length > 0;
}

export function validateTableNumber(order: Pick<Order, 'orderType' | 'tableNumber'>): boolean {
  if (order.orderType === 'table') {
    return order.tableNumber !== null && order.tableNumber.trim().length > 0;
  }
  return order.tableNumber === null;
}

export function validatePriorityReason(order: Pick<Order, 'priority' | 'priorityReason'>): boolean {
  if (order.priority === true) {
    return order.priorityReason !== null && order.priorityReason.trim().length > 0;
  }
  return true;
}

export function validateStatusTimestamp(
  status: OrderStatus,
  timestamps: Pick<Order, 'receivedAt' | 'inPreparationAt' | 'readyAt' | 'deliveredAt'>,
): boolean {
  if (status === 'received' && timestamps.receivedAt === null) return false;
  if (status === 'inPreparation' && timestamps.inPreparationAt === null) return false;
  if (status === 'ready' && timestamps.readyAt === null) return false;
  if (status === 'delivered' && timestamps.deliveredAt === null) return false;
  return true;
}

export function validateChronologicalTimestamps(
  timestamps: Pick<Order, 'receivedAt' | 'inPreparationAt' | 'readyAt' | 'deliveredAt'>,
): boolean {
  const { receivedAt, inPreparationAt, readyAt, deliveredAt } = timestamps;
  if (receivedAt && inPreparationAt && inPreparationAt < receivedAt) return false;
  if (inPreparationAt && readyAt && readyAt < inPreparationAt) return false;
  if (readyAt && deliveredAt && deliveredAt < readyAt) return false;
  return true;
}

export function recomputeOrderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
