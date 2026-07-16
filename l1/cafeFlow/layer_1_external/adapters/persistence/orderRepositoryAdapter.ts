/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IOrderRepository, OrderFilter } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { Order, OrderItem, OrderStatus, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

interface OrderRow {
  order_id: string;
  shift_id: string;
  status: string;
  order_type: string;
  created_at: string;
  details: string | null;
}

interface OrderDetails {
  tableNumber: string | null;
  priority: boolean | null;
  priorityReason: string | null;
  receivedAt: string | null;
  inPreparationAt: string | null;
  readyAt: string | null;
  deliveredAt: string | null;
  updatedAt: string;
  items: OrderItem[];
}

function toRow(order: Order): OrderRow {
  const details: OrderDetails = {
    tableNumber: order.tableNumber,
    priority: order.priority,
    priorityReason: order.priorityReason,
    receivedAt: order.receivedAt,
    inPreparationAt: order.inPreparationAt,
    readyAt: order.readyAt,
    deliveredAt: order.deliveredAt,
    updatedAt: order.updatedAt,
    items: order.items,
  };
  return {
    order_id: order.orderId,
    shift_id: order.shiftId,
    status: order.status,
    order_type: order.orderType,
    created_at: order.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: OrderRow): OrderDetails {
  try {
    const parsed = JSON.parse(row.details ?? '{}') as Partial<OrderDetails>;
    return {
      tableNumber: parsed.tableNumber ?? null,
      priority: parsed.priority ?? null,
      priorityReason: parsed.priorityReason ?? null,
      receivedAt: parsed.receivedAt ?? null,
      inPreparationAt: parsed.inPreparationAt ?? null,
      readyAt: parsed.readyAt ?? null,
      deliveredAt: parsed.deliveredAt ?? null,
      updatedAt: parsed.updatedAt ?? row.created_at,
      items: parsed.items ?? [],
    };
  } catch {
    return {
      tableNumber: null,
      priority: null,
      priorityReason: null,
      receivedAt: null,
      inPreparationAt: null,
      readyAt: null,
      deliveredAt: null,
      updatedAt: row.created_at,
      items: [],
    };
  }
}

function toDomain(row: OrderRow): Order {
  const d = parseDetails(row);
  return {
    orderId: row.order_id,
    shiftId: row.shift_id,
    status: row.status as OrderStatus,
    orderType: row.order_type as OrderType,
    tableNumber: d.tableNumber,
    priority: d.priority,
    priorityReason: d.priorityReason,
    receivedAt: d.receivedAt,
    inPreparationAt: d.inPreparationAt,
    readyAt: d.readyAt,
    deliveredAt: d.deliveredAt,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
    items: d.items,
  };
}

export function createOrderRepositoryAdapter(ctx: RequestContext): IOrderRepository {
  const getTable = () => ctx.data.moduleData.getTable<OrderRow>('orders');

  return {
    async getById(id) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { order_id: id } });
      if (!row) throw new AppError('NOT_FOUND', `Order ${id} not found`, 404, { orderId: id });
      return toDomain(row);
    },

    async findById(id) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { order_id: id } });
      return row ? toDomain(row) : null;
    },

    async findByOrderNumber(orderNumber) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { order_id: orderNumber } });
      return row ? toDomain(row) : null;
    },

    async list(filter?: OrderFilter) {
      const repo = await getTable();
      const where: Partial<OrderRow> = {};
      if (filter?.shiftId) where.shift_id = filter.shiftId;
      if (filter?.status) where.status = filter.status;
      if (filter?.orderType) where.order_type = filter.orderType;
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      const orders = rows.map(toDomain);
      if (filter?.tableNumber) {
        return orders.filter((o) => o.tableNumber === filter.tableNumber);
      }
      return orders;
    },

    async listByShiftId(shiftId) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { shift_id: shiftId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async save(order) {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { order_id: order.orderId } });
      if (existing) {
        await repo.update({ where: { order_id: order.orderId }, patch: toRow(order) });
      } else {
        await repo.insert({ record: toRow(order) });
      }
    },
  };
}
