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

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  'registered',
  'received',
  'inPreparation',
  'ready',
  'delivered',
];

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

export function orderStatusIndex(status: OrderStatus): number {
  return ORDER_STATUS_SEQUENCE.indexOf(status);
}

export function canAdvanceTo(current: OrderStatus, target: OrderStatus): boolean {
  return orderStatusIndex(target) > orderStatusIndex(current);
}

export function orderRequiresItem(order: Pick<Order, 'items'>): boolean {
  return order.items.length > 0;
}

export function validateTableNumber(orderType: OrderType, tableNumber: string | null): boolean {
  if (orderType === 'table') {
    return tableNumber !== null && tableNumber.trim().length > 0;
  }
  return tableNumber === null;
}

export function validatePriority(priority: boolean | null, priorityReason: string | null): boolean {
  if (priority === true) {
    return priorityReason !== null && priorityReason.trim().length > 0;
  }
  return true;
}

export function validateStatusTimestamps(order: Pick<Order, 'status' | 'receivedAt' | 'inPreparationAt' | 'readyAt' | 'deliveredAt'>): boolean {
  const statusOrder = orderStatusIndex(order.status);
  if (statusOrder >= orderStatusIndex('received') && !order.receivedAt) {
    return false;
  }
  if (statusOrder >= orderStatusIndex('inPreparation') && !order.inPreparationAt) {
    return false;
  }
  if (statusOrder >= orderStatusIndex('ready') && !order.readyAt) {
    return false;
  }
  if (statusOrder >= orderStatusIndex('delivered') && !order.deliveredAt) {
    return false;
  }
  return true;
}

export function validateOrderInvariants(order: Order): string[] {
  const violations: string[] = [];

  if (!validateTableNumber(order.orderType, order.tableNumber)) {
    if (order.orderType === 'table') {
      violations.push('tableNumber é obrigatório quando orderType for "table"');
    } else {
      violations.push('tableNumber deve ser nulo quando orderType for "takeout"');
    }
  }

  if (!validatePriority(order.priority ?? null, order.priorityReason)) {
    violations.push('priority true exige priorityReason preenchido');
  }

  if (!validateStatusTimestamps(order)) {
    violations.push('timestamps de status não correspondem ao status atual');
  }

  if (!orderRequiresItem(order)) {
    violations.push('Pelo menos um OrderItem deve existir no pedido');
  }

  return violations;
}
