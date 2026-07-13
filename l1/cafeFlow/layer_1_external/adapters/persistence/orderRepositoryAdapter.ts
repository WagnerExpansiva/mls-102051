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
    return JSON.parse(row.details ?? '{}') as OrderDetails;
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
    tableNumber: d.tableNumber ?? null,
    priority: d.priority ?? null,
    priorityReason: d.priorityReason ?? null,
    receivedAt: d.receivedAt ?? null,
    inPreparationAt: d.inPreparationAt ?? null,
    readyAt: d.readyAt ?? null,
    deliveredAt: d.deliveredAt ?? null,
    createdAt: row.created_at,
    updatedAt: d.updatedAt ?? row.created_at,
    items: d.items ?? [],
  };
}

export function createOrderRepositoryAdapter(ctx: RequestContext): IOrderRepository {
  const getTable = () => ctx.data.moduleData.getTable<OrderRow>('order');

  return {
    async getById(orderId) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { order_id: orderId } });
      if (!row) {
        throw new AppError('NOT_FOUND', `Order ${orderId} not found`, 404, { orderId });
      }
      return toDomain(row);
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
      const domainOrders = rows.map(toDomain);
      if (filter?.tableNumber) {
        return domainOrders.filter((o) => o.tableNumber === filter.tableNumber);
      }
      return domainOrders;
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

    async findByCustomerId(_customerId) {
      // Order entity has no customerId field; no column or details field maps to it.
      return [];
    },

    async findByStatus(status) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { status },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async findByPeriod(start, end) {
      const repo = await getTable();
      const rows = await repo.findMany({
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      const startMs = start.getTime();
      const endMs = end.getTime();
      return rows
        .filter((row) => {
          const ts = new Date(row.created_at).getTime();
          return ts >= startMs && ts <= endMs;
        })
        .map(toDomain);
    },
  };
}
