/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderItem, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import {
  validateTableNumber,
  validatePriority,
  orderRequiresItem,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

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
  const openShifts: Shift[] = await shifts.list({ status: 'open' });
  if (openShifts.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'No open shift found — cannot launch order',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  const openShift = openShifts[0];

  // 2. Validate orderType is 'table' or 'takeout' (rule: orderStatusFlow — order must start at 'registered')
  if (input.orderType !== 'table' && input.orderType !== 'takeout') {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderType must be "table" or "takeout"',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  const orderType = input.orderType as OrderType;

  // 3. Validate tableNumber based on orderType
  const tableNumber: string | null = orderType === 'table' ? (input.tableNumber ?? null) : null;
  if (!validateTableNumber(orderType, tableNumber)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'tableNumber is required and non-empty when orderType is "table"',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }

  // 4. Validate priority / priorityReason (rule: orderStatusFlow — priority requires justification)
  const priority: boolean = input.priority ?? false;
  const priorityReason: string | null = input.priorityReason ?? null;
  if (!validatePriority(priority, priorityReason)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'priorityReason is required when priority is true',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }

  // 5. Validate orderItems array is not empty and each item has a non-null menuItemId and quantity > 0
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
        'Each orderItem must have a non-null menuItemId and quantity > 0',
        400,
        { ruleId: 'orderStatusFlow' },
      );
    }
  }

  // 6. Collect all menuItemIds; fetch MenuItems from MDM via ctx.mdm.collection.getMany; validate all exist and have status='active'
  const menuItemIds = input.orderItems.map((item) => item.menuItemId);
  const menuEntities = await ctx.mdm.collection.getMany({ mdmIds: menuItemIds });
  const menuById = new Map<string, { price: number }>();
  for (const entity of menuEntities) {
    const details = entity.details as unknown as Record<string, unknown>;
    const status = details.status;
    if (String(status) !== 'active' && String(status) !== 'Active') {
      throw new AppError(
        'VALIDATION_ERROR',
        `MenuItem ${entity.mdmId} is not active`,
        400,
        { menuItemId: entity.mdmId, status },
      );
    }
    const price = typeof details.price === 'number' ? details.price : 0;
    menuById.set(entity.mdmId, { price });
  }
  for (const id of menuItemIds) {
    if (!menuById.has(id)) {
      throw new AppError('NOT_FOUND', `MenuItem not found: ${id}`, 404, { menuItemId: id });
    }
  }

  // 7. Generate orderId via ctx.idGenerator; set createdAt and updatedAt to ctx.clock.nowIso()
  const now = ctx.clock.nowIso();
  const orderId = ctx.idGenerator.newId();

  // 8 & 9. Build Order aggregate root with status='registered' and OrderItem children
  const orderItems: OrderItem[] = input.orderItems.map((item) => {
    const menuItem = menuById.get(item.menuItemId)!;
    return {
      orderItemId: ctx.idGenerator.newId(),
      orderId,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
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
    items: orderItems,
  };

  if (!orderRequiresItem(order)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderRequiresItem: o pedido precisa de ao menos um item.',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }

  // 10. For all ordered MenuItems, resolve ingredient stock-item links via ctx.mdm.collection.relatedOfMany
  const relatedMap = await ctx.mdm.collection.relatedOfMany({
    mdmIds: menuItemIds,
  });

  // Build a map: menuItemId -> array of { stockItemId, quantityPerUnit }
  const menuItemIngredients = new Map<string, Array<{ stockItemId: string; quantityPerUnit: number }>>();
  for (const menuItemId of menuItemIds) {
    const refs = relatedMap[menuItemId] ?? [];
    const ingredients: Array<{ stockItemId: string; quantityPerUnit: number }> = [];
    for (const ref of refs) {
      const meta = (ref.metadata ?? {}) as Record<string, unknown>;
      const quantityPerUnit = typeof meta.quantityPerUnit === 'number' ? meta.quantityPerUnit : 0;
      if (quantityPerUnit > 0) {
        ingredients.push({ stockItemId: ref.mdmId, quantityPerUnit });
      }
    }
    menuItemIngredients.set(menuItemId, ingredients);
  }

  // 11. Aggregate total consumption per stockItemId across all order items
  const consumptionByStockItem = new Map<string, number>();
  for (const item of input.orderItems) {
    const ingredients = menuItemIngredients.get(item.menuItemId) ?? [];
    for (const ingredient of ingredients) {
      const total = (consumptionByStockItem.get(ingredient.stockItemId) ?? 0) + ingredient.quantityPerUnit * item.quantity;
      consumptionByStockItem.set(ingredient.stockItemId, total);
    }
  }

  // 12 & 13. For each stockItemId with consumption > 0, load StockLevel, validate, decrement, and create StockConsumption
  const stockConsumptionRecords: StockConsumption[] = [];
  const stockLevelUpdates: StockLevel[] = [];

  for (const [stockItemId, totalConsumption] of consumptionByStockItem) {
    if (totalConsumption <= 0) {
      continue;
    }

    // Load StockLevel via StockLevel port (find by stockItemId)
    const stockLevelList = await stockLevels.list({ stockItemId });
    const stockLevel = stockLevelList.length > 0 ? stockLevelList[0] : null;

    if (!stockLevel) {
      throw new AppError(
        'NOT_FOUND',
        `StockLevel not found for stockItemId: ${stockItemId}`,
        404,
        { stockItemId, ruleId: 'stockDecrementOnOrderLaunch' },
      );
    }

    // Validate currentQuantity >= total consumption (rule: stockDecrementOnOrderLaunch — stock must be available at launch)
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

    // Decrement currentQuantity and set lastDecrementAt
    const updatedStockLevel: StockLevel = {
      ...stockLevel,
      currentQuantity: stockLevel.currentQuantity - totalConsumption,
      lastDecrementAt: now,
      updatedAt: now,
    };
    stockLevelUpdates.push(updatedStockLevel);

    // Create StockConsumption child record
    const stockConsumption: StockConsumption = {
      stockConsumptionId: ctx.idGenerator.newId(),
      stockItemId,
      orderId,
      quantity: totalConsumption,
      status: 'posted',
      createdAt: now,
      voidedAt: null,
      voidReason: null,
    };
    stockConsumptionRecords.push(stockConsumption);
  }

  // 15. The order's createdAt timestamp establishes its position in the kitchen queue, ensuring FIFO processing
  // (rule: fifoKitchenQueue — orders are queued by creation time). No additional field is needed; createdAt is the
  // deterministic ordering key used by downstream kitchen queue consumers.
  // This rule is satisfied by setting order.createdAt = now and order.status = 'registered'.

  // 16. Inside a single ctx.data transaction: save the Order aggregate, save each updated StockLevel,
  //     and append StockConsumption audit event records through the StockConsumption port.
  await ctx.data.runInTransaction(async () => {
    // Save the Order aggregate (with embedded OrderItems) through the Order port
    await orders.save(order);

    // Save each updated StockLevel through the StockLevel port
    for (const sl of stockLevelUpdates) {
      await stockLevels.save(sl);
    }

    // Append StockConsumption audit event records through the StockConsumption port (append-only, persisted=true)
    for (const sc of stockConsumptionRecords) {
      await stockConsumptions.append(sc);
    }
  });

  // 17. Return { orderId, status: 'registered', orderType, tableNumber, createdAt }
  return {
    orderId,
    status: 'registered',
    orderType,
    tableNumber,
    createdAt: now,
  };
}
