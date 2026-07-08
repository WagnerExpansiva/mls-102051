/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockLevelRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderItem, OrderType, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import {
  validateTableNumber,
  validatePriorityReason,
  orderRequiresItem,
  validateOrderItems,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockLevel } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
import { validateStockLevelInvariants } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.js';
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
  // Step 1: Resolve active shift
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const openShifts = await shifts.listOpenShifts();
  if (openShifts.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'No open shift available for order creation',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  const activeShift = openShifts[0];

  // Step 2: Validate orderType and tableNumber
  const validOrderTypes: OrderType[] = ['table', 'takeout'];
  if (!validOrderTypes.includes(input.orderType as OrderType)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Invalid orderType: must be 'table' or 'takeout'`,
      400,
      { ruleId: 'orderStatusFlow', orderType: input.orderType },
    );
  }
  const orderType = input.orderType as OrderType;
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

  // Step 3: Validate priority
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

  // Step 4: Validate orderItems
  if (!input.orderItems || input.orderItems.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Order must have at least one item',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  for (const item of input.orderItems) {
    if (!item.menuItemId || typeof item.menuItemId !== 'string') {
      throw new AppError(
        'VALIDATION_ERROR',
        'Each order item must have a menuItemId',
        400,
        { ruleId: 'orderStatusFlow' },
      );
    }
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        'Each order item quantity must be greater than zero',
        400,
        { ruleId: 'orderStatusFlow' },
      );
    }
  }

  // Step 5: Generate ids and timestamps
  const orderId = ctx.idGenerator.newId();
  const now = ctx.clock.nowIso();

  // Step 6: Fetch MenuItem MDM records in bulk
  const menuItemIds = [...new Set(input.orderItems.map((it) => it.menuItemId))];
  const menuItemsResult = await ctx.mdm.collection.getMany({ mdmIds: menuItemIds });

  // Build a map from mdmId to result for quick lookup
  const menuItemResultMap = new Map<string, (typeof menuItemsResult)[number]>();
  for (const result of menuItemsResult) {
    menuItemResultMap.set(result.mdmId, result);
  }

  // Step 7: Validate every MenuItem exists and has status='active'
  const menuItemPriceMap = new Map<string, number>();
  const missingIds: string[] = [];
  const inactiveIds: string[] = [];
  for (const id of menuItemIds) {
    const result = menuItemResultMap.get(id);
    if (!result) {
      missingIds.push(id);
      continue;
    }
    const details = result.details as unknown as Record<string, unknown>;
    if (String(details.status) !== 'active') {
      inactiveIds.push(id);
      continue;
    }
    const price = typeof details.price === 'number' ? details.price : 0;
    menuItemPriceMap.set(id, price);
  }
  if (missingIds.length > 0 || inactiveIds.length > 0) {
    const problems: string[] = [];
    if (missingIds.length > 0) problems.push(`Missing menuItemIds: ${missingIds.join(', ')}`);
    if (inactiveIds.length > 0) problems.push(`Inactive menuItemIds: ${inactiveIds.join(', ')}`);
    throw new AppError('VALIDATION_ERROR', problems.join('; '), 400, { missingIds, inactiveIds });
  }

  // Step 8 & 9: Build Order aggregate and OrderItem children
  const orderItems: OrderItem[] = input.orderItems.map((it) => ({
    orderItemId: ctx.idGenerator.newId(),
    orderId,
    menuItemId: it.menuItemId,
    quantity: it.quantity,
    unitPrice: menuItemPriceMap.get(it.menuItemId) ?? 0,
    createdAt: now,
    updatedAt: now,
  }));

  const order: Order = {
    orderId,
    shiftId: activeShift.shiftId,
    status: 'registered' as OrderStatus,
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

  // Validate order invariants using domain functions
  if (!validateTableNumber(order)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Invalid tableNumber for orderType',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  if (!validatePriorityReason(order)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'priorityReason is required when priority is true',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  if (!orderRequiresItem(order)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Order must have at least one item',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }
  if (!validateOrderItems(order.items)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Each OrderItem quantity must be greater than zero and unitPrice must be non-negative',
      400,
      { ruleId: 'orderStatusFlow' },
    );
  }

  // Step 10: Resolve ingredient stock items via MDM relationships
  const relatedMap = await ctx.mdm.collection.relatedOfMany({ mdmIds: menuItemIds });

  // Step 11: Aggregate total consumption per stockItemId
  const consumptionMap = new Map<string, number>();
  for (const item of input.orderItems) {
    const refs = relatedMap[item.menuItemId] ?? [];
    for (const ref of refs) {
      if (String(ref.type) !== 'requires-ingredient') continue;
      const stockItemId = ref.mdmId;
      const metadata = ref.metadata ?? {};
      const quantityPerServing =
        typeof metadata.quantityPerServing === 'number' ? metadata.quantityPerServing : 1;
      const consumed = item.quantity * quantityPerServing;
      consumptionMap.set(stockItemId, (consumptionMap.get(stockItemId) ?? 0) + consumed);
    }
  }

  // Step 12-14: Fetch StockLevels, validate, decrement, build StockConsumption records
  const stockLevelsRepo = resolveRepository<IStockLevelRepository>(ctx, 'StockLevel');
  const stockConsumptionRecords: StockConsumption[] = [];
  const stockLevelUpdates: StockLevel[] = [];

  if (consumptionMap.size > 0) {
    for (const [stockItemId, consumptionAmount] of consumptionMap) {
      const levels = await stockLevelsRepo.list({ stockItemId });
      if (levels.length === 0) {
        throw new AppError(
          'NOT_FOUND',
          `No StockLevel found for stockItemId: ${stockItemId}`,
          404,
          { ruleId: 'stockDecrementOnOrderLaunch', stockItemId },
        );
      }
      const level = levels[0];
      if (level.currentQuantity < consumptionAmount) {
        throw new AppError(
          'CONFLICT',
          `Insufficient stock for ${stockItemId}: available ${level.currentQuantity}, needed ${consumptionAmount}`,
          409,
          {
            ruleId: 'stockDecrementOnOrderLaunch',
            stockItemId,
            available: level.currentQuantity,
            needed: consumptionAmount,
          },
        );
      }
      const updatedLevel: StockLevel = {
        ...level,
        currentQuantity: level.currentQuantity - consumptionAmount,
        lastDecrementAt: now,
        updatedAt: now,
      };
      if (!validateStockLevelInvariants(updatedLevel)) {
        throw new AppError(
          'CONFLICT',
          `StockLevel invariant violated for ${stockItemId}: currentQuantity cannot be negative`,
          409,
          { ruleId: 'stockDecrementOnOrderLaunch', stockItemId },
        );
      }
      stockLevelUpdates.push(updatedLevel);

      stockConsumptionRecords.push({
        stockConsumptionId: ctx.idGenerator.newId(),
        stockItemId,
        orderId,
        quantity: consumptionAmount,
        status: 'posted',
        createdAt: now,
        voidedAt: null,
        voidReason: null,
      });
    }
  }

  // Step 15-16: Save everything in a single transaction
  const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockConsumptionsRepo = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  await ctx.data.runInTransaction(async () => {
    // Save StockConsumption audit records (append-only)
    for (const record of stockConsumptionRecords) {
      await stockConsumptionsRepo.append(record);
    }
    // Save Order aggregate (including OrderItem children)
    await ordersRepo.save(order);
    // Save updated StockLevel records
    for (const level of stockLevelUpdates) {
      await stockLevelsRepo.save(level);
    }
  });

  // Step 17: Order is now 'registered' and enters the kitchen queue in FIFO order
  // based on createdAt (rule fifoKitchenQueue).

  // Step 18: Return output
  return {
    orderId,
    status: 'registered',
    orderType,
    tableNumber: tableNumber ?? undefined,
    createdAt: now,
  };
}
