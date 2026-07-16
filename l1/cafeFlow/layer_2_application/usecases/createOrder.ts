/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderItem, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { orderRequiresItem, validateTableNumber, validatePriorityReason } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import { applyDecrement } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export interface CreateOrderItemInput {
  menuItemId: string;
  quantity: number;
}

export interface CreateOrderInput {
  orderType: string;
  tableNumber?: string;
  orderItems: CreateOrderItemInput[];
  priority?: boolean;
  priorityReason?: string;
}

export interface CreateOrderOutput {
  orderId: string;
  status: string;
  orderType: string;
  tableNumber: string | null;
  createdAt: string;
}

export async function createOrder(ctx: RequestContext, input: CreateOrderInput): Promise<CreateOrderOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockLevels = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');
  const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  // 1. Resolve the active (open) Shift
  const openShift = await shifts.findOpenShift();
  if (!openShift) {
    throw new AppError(
      'VALIDATION_ERROR',
      'No open shift found — cannot launch order',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }

  // 2. Validate orderType
  if (input.orderType !== 'table' && input.orderType !== 'takeout') {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderType must be "table" or "takeout"',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  const orderType = input.orderType as OrderType;

  // 3. Validate tableNumber
  let tableNumber: string | null = null;
  if (orderType === 'table') {
    if (!input.tableNumber || input.tableNumber.trim().length === 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        'tableNumber is required when orderType is "table"',
        400,
        { ruleId: 'orderStatusFlow' },
      );
    }
    tableNumber = input.tableNumber;
  }

  // 4. Validate priority / priorityReason
  const priority = input.priority ?? false;
  let priorityReason: string | null = null;
  if (priority) {
    if (!input.priorityReason || input.priorityReason.trim().length === 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        'priorityReason is required when priority is true',
        400,
        { ruleId: 'orderStatusFlow' },
      );
    }
    priorityReason = input.priorityReason;
  }

  // 5. Validate orderItems
  if (!input.orderItems || input.orderItems.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderItems must not be empty',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  for (const item of input.orderItems) {
    if (!item.menuItemId || item.quantity <= 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        'Each order item must have a menuItemId and quantity > 0',
        400,
        { ruleId: 'orderStatusFlow' },
      );
    }
  }

  // 6. Fetch MenuItems from MDM and validate
  const menuItemIds = input.orderItems.map((it) => it.menuItemId);
  const menuEntities = await ctx.mdm.collection.getMany({ mdmIds: menuItemIds });
  const menuById = new Map<string, { price: number }>();
  for (const entity of menuEntities) {
    const details = entity.details as unknown as Record<string, unknown>;
    const status = String(details.status);
    if (status !== 'active' && status !== 'Active') {
      throw new AppError(
        'VALIDATION_ERROR',
        `MenuItem ${entity.mdmId} is not active`,
        400,
        { menuItemId: entity.mdmId, ruleId: 'orderStatusFlow' },
      );
    }
    const price = details.price;
    if (typeof price !== 'number') {
      throw new AppError(
        'VALIDATION_ERROR',
        `MenuItem ${entity.mdmId} has no valid price`,
        400,
        { menuItemId: entity.mdmId },
      );
    }
    menuById.set(entity.mdmId, { price });
  }
  for (const id of menuItemIds) {
    if (!menuById.has(id)) {
      throw new AppError(
        'NOT_FOUND',
        `MenuItem not found: ${id}`,
        404,
        { menuItemId: id },
      );
    }
  }

  const now = ctx.clock.nowIso();

  // 7-9. Build Order aggregate with OrderItems
  const orderId = ctx.idGenerator.newId();
  const items: OrderItem[] = input.orderItems.map((it) => {
    const menuItem = menuById.get(it.menuItemId)!;
    return {
      orderItemId: ctx.idGenerator.newId(),
      orderId,
      menuItemId: it.menuItemId,
      quantity: it.quantity,
      unitPrice: menuItem.price,
      createdAt: now,
      updatedAt: now,
    };
  });

  const order: Order = {
    orderId,
    shiftId: openShift.shiftId,
    status: 'registered',
    orderType,
    tableNumber,
    priority,
    priorityReason,
    receivedAt: null,
    inPreparationAt: null,
    readyAt: null,
    deliveredAt: null,
    createdAt: now,
    updatedAt: now,
    items,
  };

  // Apply domain invariants
  if (!orderRequiresItem(order)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Order requires at least one item',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  if (!validateTableNumber(order)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Invalid tableNumber for the given orderType',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  if (!validatePriorityReason(order)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Priority requires a justification',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }

  // 10-11. Resolve ingredient stock-item links via MDM and aggregate consumption
  const relatedRefs = await ctx.mdm.collection.relatedOfMany({ mdmIds: menuItemIds });
  const consumptionByStockItem = new Map<string, number>();

  for (const orderItem of input.orderItems) {
    const refs = relatedRefs[orderItem.menuItemId] ?? [];
    for (const ref of refs) {
      const metadata = ref.metadata ?? {};
      const quantityPerUnit = metadata.quantityPerUnit;
      if (typeof quantityPerUnit !== 'number') {
        continue;
      }
      const stockItemId = ref.mdmId;
      const totalConsumption = quantityPerUnit * orderItem.quantity;
      consumptionByStockItem.set(
        stockItemId,
        (consumptionByStockItem.get(stockItemId) ?? 0) + totalConsumption,
      );
    }
  }

  // 12-13. Load StockLevels, validate availability, decrement, and build StockConsumption records
  const updatedStockLevels: StockLevel[] = [];
  const consumptionRecords: StockConsumption[] = [];

  for (const [stockItemId, totalConsumption] of consumptionByStockItem) {
    if (totalConsumption <= 0) {
      continue;
    }

    const existingLevels = await stockLevels.list({ stockItemId });
    const stockLevel = existingLevels[0];
    if (!stockLevel) {
      throw new AppError(
        'NOT_FOUND',
        `StockLevel not found for stockItemId: ${stockItemId}`,
        404,
        { stockItemId, ruleId: 'stockDecrementOnOrderLaunch' },
      );
    }

    if (stockLevel.currentQuantity < totalConsumption) {
      throw new AppError(
        'CONFLICT',
        `Insufficient stock for stockItemId ${stockItemId}: available ${stockLevel.currentQuantity}, required ${totalConsumption}`,
        409,
        {
          stockItemId,
          available: stockLevel.currentQuantity,
          required: totalConsumption,
          ruleId: 'stockDecrementOnOrderLaunch',
        },
      );
    }

    const updated = applyDecrement(stockLevel, totalConsumption, now);
    updatedStockLevels.push(updated);

    const consumption: StockConsumption = {
      stockConsumptionId: ctx.idGenerator.newId(),
      stockItemId,
      orderId,
      quantity: totalConsumption,
      status: 'posted',
      createdAt: now,
      voidedAt: null,
      voidReason: null,
    };
    consumptionRecords.push(consumption);
  }

  // 14-16. Persist everything inside a single transaction
  // The order's createdAt establishes its FIFO position in the kitchen queue (rule: fifoKitchenQueue).
  await ctx.data.runInTransaction(async () => {
    await orders.save(order);
    for (const sl of updatedStockLevels) {
      await stockLevels.save(sl);
    }
    for (const consumption of consumptionRecords) {
      await stockConsumptions.append(consumption);
    }
  });

  // 17. Return output
  return {
    orderId,
    status: 'registered',
    orderType,
    tableNumber,
    createdAt: now,
  };
}
