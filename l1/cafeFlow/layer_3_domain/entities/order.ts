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

export function validateStatusTimestamps(order: Pick<Order, 'status' | 'receivedAt' | 'inPreparationAt' | 'readyAt' | 'deliveredAt'>): boolean {
  const statusOrder: OrderStatus[] = ['registered', 'received', 'inPreparation', 'ready', 'delivered'];
  const currentIndex = statusOrder.indexOf(order.status);

  if (currentIndex >= statusOrder.indexOf('received') && order.receivedAt === null) {
    return false;
  }
  if (currentIndex >= statusOrder.indexOf('inPreparation') && order.inPreparationAt === null) {
    return false;
  }
  if (currentIndex >= statusOrder.indexOf('ready') && order.readyAt === null) {
    return false;
  }
  if (currentIndex >= statusOrder.indexOf('delivered') && order.deliveredAt === null) {
    return false;
  }
  return true;
}

export function validateOrderInvariants(order: Order): string[] {
  const errors: string[] = [];

  if (!validateTableNumber(order)) {
    if (order.orderType === 'table') {
      errors.push('tableNumber is required when orderType is "table"');
    } else {
      errors.push('tableNumber must be null when orderType is "takeout"');
    }
  }

  if (!validatePriorityReason(order)) {
    errors.push('priorityReason is required when priority is true');
  }

  if (!validateStatusTimestamps(order)) {
    errors.push('Status timestamps do not match the current status');
  }

  if (!orderRequiresItem(order)) {
    errors.push('Order must contain at least one OrderItem');
  }

  return errors;
}
