/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderItem, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { validateTableNumber, validatePriorityReason, orderRequiresItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import { canDecrement, decrementStockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
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
  tableNumber?: string;
  createdAt: string;
}

export async function createOrder(ctx: RequestContext, input: CreateOrderInput): Promise<CreateOrderOutput> {
  // 1. Resolve active shift (activeLifecycleInstance)
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const openShifts = await shifts.findOpenShifts();
  if (openShifts.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'No active shift found for order creation', 400, {
      ruleId: 'activeShift',
    });
  }
  const activeShift = openShifts[0];

  // 2. Validate orderType
  if (input.orderType !== 'table' && input.orderType !== 'takeout') {
    throw new AppError('VALIDATION_ERROR', 'orderType must be "table" or "takeout"', 400, {
      field: 'orderType',
      ruleId: 'orderStatusFlow',
    });
  }
  const orderType: OrderType = input.orderType;
  const tableNumber: string | null = orderType === 'table' ? (input.tableNumber ?? null) : null;

  // 3. Validate tableNumber via domain invariant (rule orderStatusFlow)
  if (!validateTableNumber({ orderType, tableNumber })) {
    if (orderType === 'table') {
      throw new AppError('VALIDATION_ERROR', 'tableNumber is required when orderType is "table"', 400, {
        ruleId: 'orderStatusFlow',
      });
    }
    throw new AppError('VALIDATION_ERROR', 'tableNumber must be null when orderType is "takeout"', 400, {
      ruleId: 'orderStatusFlow',
    });
  }

  // 4. Validate priority / priorityReason via domain invariant
  const priority: boolean | null = input.priority ?? null;
  const priorityReason: string | null = input.priorityReason ?? null;
  if (!validatePriorityReason({ priority, priorityReason })) {
    throw new AppError('VALIDATION_ERROR', 'priorityReason is required when priority is true', 400, {
      ruleId: 'orderStatusFlow',
    });
  }

  // 5. Validate orderItems presence and structure
  if (!input.orderItems || input.orderItems.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'Order must contain at least one item', 400, {
      ruleId: 'orderRequiresItem',
    });
  }
  for (const item of input.orderItems) {
    if (!item.menuItemId || item.quantity <= 0) {
      throw new AppError('VALIDATION_ERROR', 'Each order item must have a menuItemId and quantity > 0', 400, {
        ruleId: 'orderRequiresItem',
        item,
      });
    }
  }

  // 6. Fetch MenuItem records from MDM (plural-first)
  const menuItemIds = input.orderItems.map((it) => it.menuItemId);
  const menuEntities = await ctx.mdm.collection.getMany({ mdmIds: menuItemIds });
  const menuById = new Map(menuEntities.map((e) => [e.mdmId, e]));

  for (const id of menuItemIds) {
    const entity = menuById.get(id);
    if (!entity) {
      throw new AppError('VALIDATION_ERROR', `Menu item not found: ${id}`, 400, { menuItemId: id });
    }
    if (String(entity.details.status).toLowerCase() !== 'active') {
      throw new AppError('VALIDATION_ERROR', `Menu item is not active: ${id}`, 400, { menuItemId: id });
    }
  }

  // 7. Fetch ingredient/stock-item relationships from MDM
  //    Modeling gap: no canonical RelationshipType for "ingredient" — fetching all
  //    relationships and treating related entities as stock items.
  const relatedMap = await ctx.mdm.collection.relatedOfMany({ mdmIds: menuItemIds });

  // 8. Aggregate total required quantity per stockItemId across all order items
  const stockRequirements = new Map<string, number>();
  for (const item of input.orderItems) {
    const refs = relatedMap[item.menuItemId] ?? [];
    for (const ref of refs) {
      const ratio = typeof ref.metadata?.quantity === 'number' ? ref.metadata.quantity : 1;
      const required = item.quantity * ratio;
      stockRequirements.set(ref.mdmId, (stockRequirements.get(ref.mdmId) ?? 0) + required);
    }
  }

  const now = ctx.clock.nowIso();
  const orderId = ctx.idGenerator.newId();

  // 9. Build order items with unitPrice from MenuItem MDM record
  const orderItems: OrderItem[] = input.orderItems.map((it) => {
    const menuEntity = menuById.get(it.menuItemId);
    const details = menuEntity!.details as unknown as Record<string, unknown>;
    const price = typeof details.price === 'number' ? details.price : 0;
    return {
      orderItemId: ctx.idGenerator.newId(),
      orderId,
      menuItemId: it.menuItemId,
      quantity: it.quantity,
      unitPrice: price,
      createdAt: now,
      updatedAt: now,
    };
  });

  // 10. Build Order aggregate — status='registered' (orderStatusFlow), FIFO by createdAt (fifoKitchenQueue)
  const order: Order = {
    orderId,
    shiftId: activeShift.shiftId,
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
    items: orderItems,
  };

  // Safety: validate full order invariants
  if (!orderRequiresItem(order)) {
    throw new AppError('VALIDATION_ERROR', 'Order must contain at least one item', 400, {
      ruleId: 'orderRequiresItem',
    });
  }

  // 11. Build StockConsumption records (status='posted')
  const stockConsumptions: StockConsumption[] = [];
  for (const [stockItemId, quantity] of stockRequirements) {
    stockConsumptions.push({
      stockConsumptionId: ctx.idGenerator.newId(),
      stockItemId,
      orderId,
      quantity,
      status: 'posted',
      createdAt: now,
      voidedAt: null,
      voidReason: null,
    });
  }

  // 12. Transactional write: save order, decrement stock, append stock consumption
  await ctx.data.runInTransaction(async (tx) => {
    const txCtx: RequestContext = { ...ctx, data: tx };

    // Load stock levels inside transaction for consistency
    const stockLevels = resolveRepository<IStockLevelRepository>(txCtx, 'StockLevel');
    const stockItemIds = [...stockRequirements.keys()];
    const levelResults = await Promise.all(
      stockItemIds.map((id) => stockLevels.list({ stockItemId: id })),
    );
    const stockLevelMap = new Map<string, StockLevel>();
    stockItemIds.forEach((id, i) => {
      if (levelResults[i].length > 0) {
        stockLevelMap.set(id, levelResults[i][0]);
      }
    });

    // Apply stockDecrementOnOrderLaunch: verify sufficient stock, then decrement
    const updatedStockLevels: StockLevel[] = [];
    for (const [stockItemId, required] of stockRequirements) {
      const level = stockLevelMap.get(stockItemId);
      if (!level) {
        throw new AppError('VALIDATION_ERROR', `No stock level found for stock item: ${stockItemId}`, 400, {
          stockItemId,
          ruleId: 'stockDecrementOnOrderLaunch',
        });
      }
      if (!canDecrement(level, required)) {
        throw new AppError(
          'VALIDATION_ERROR',
          `Insufficient stock for item ${stockItemId}: have ${level.currentQuantity}, need ${required}`,
          400,
          {
            stockItemId,
            currentQuantity: level.currentQuantity,
            required,
            shortfall: required - level.currentQuantity,
            ruleId: 'stockDecrementOnOrderLaunch',
          },
        );
      }
      updatedStockLevels.push(decrementStockLevel(level, required, now));
    }

    // Save Order aggregate (includes embedded OrderItems)
    const orderRepo = resolveRepository<IOrderRepository>(txCtx, 'Order');
    await orderRepo.save(order);

    // Save updated StockLevel records
    for (const updated of updatedStockLevels) {
      await stockLevels.save(updated);
    }

    // Append StockConsumption audit records
    if (stockConsumptions.length > 0) {
      const stockConsumptionRepo = resolveRepository<IStockConsumptionRepository>(txCtx, 'StockConsumption');
      for (const sc of stockConsumptions) {
        await stockConsumptionRepo.append(sc);
      }
    }
  });

  // 13. Return output
  return {
    orderId,
    status: 'registered',
    orderType,
    tableNumber: tableNumber ?? undefined,
    createdAt: now,
  };
}
