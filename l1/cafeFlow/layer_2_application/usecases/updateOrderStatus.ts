/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { canTransitionOrder, ORDER_STATUS_TRANSITIONS } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export interface UpdateOrderStatusInput {
  orderId: string;
  status: string;
}

export interface UpdateOrderStatusOutput {
  orderId: string;
  status: string;
  updatedAt: string;
}

const VALID_TARGET_STATUSES: OrderStatus[] = ['inPreparation', 'ready'];

export async function updateOrderStatus(
  ctx: RequestContext,
  input: UpdateOrderStatusInput,
): Promise<UpdateOrderStatusOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  // Validate that the requested status is a valid target for this usecase
  if (!VALID_TARGET_STATUSES.includes(input.status as OrderStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Status inválido para atualização: ${input.status}. Status permitidos: inPreparation, ready.`,
      400,
      { ruleId: 'orderStatusFlow', providedStatus: input.status },
    );
  }
  const newStatus = input.status as OrderStatus;

  // Step 1: Resolve the active (open) shift
  const openShift = await shifts.findOpenShift();
  if (!openShift) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Nenhum turno aberto encontrado',
      400,
      { ruleId: 'activeShiftRequired' },
    );
  }

  // Step 2: Load the order by orderId
  const order = await orders.findById(input.orderId);
  if (!order) {
    throw new AppError(
      'NOT_FOUND',
      `Pedido não encontrado: ${input.orderId}`,
      404,
      { orderId: input.orderId },
    );
  }

  // Step 3: Validate that the order belongs to the active shift
  if (order.shiftId !== openShift.shiftId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Pedido não pertence ao turno ativo',
      400,
      {
        ruleId: 'orderBelongsToActiveShift',
        orderShiftId: order.shiftId,
        activeShiftId: openShift.shiftId,
      },
    );
  }

  const currentStatus = order.status;

  // Step 4: Apply rule orderStatusFlow — transition must follow received → inPreparation → ready
  if (!canTransitionOrder(currentStatus, newStatus)) {
    throw new AppError(
      'CONFLICT',
      `Transição de status inválida: ${currentStatus} → ${newStatus}. Fluxo obrigatório: received → inPreparation → ready.`,
      409,
      { ruleId: 'orderStatusFlow', from: currentStatus, to: newStatus },
    );
  }

  // Step 5: Apply rule inProgressBeforeReady — order can only be marked 'ready' if currently 'inPreparation'
  if (newStatus === 'ready' && currentStatus !== 'inPreparation') {
    throw new AppError(
      'CONFLICT',
      'Pedido só pode ser marcado como pronto se estiver em preparação',
      409,
      { ruleId: 'inProgressBeforeReady', currentStatus },
    );
  }

  // Step 6: Set timestamps
  const now = ctx.clock.nowIso();
  const updatedOrder: Order = {
    ...order,
    status: newStatus,
    inPreparationAt: newStatus === 'inPreparation' ? now : order.inPreparationAt,
    readyAt: newStatus === 'ready' ? now : order.readyAt,
    updatedAt: now,
  };

  // Step 7 & 8: Persist order and emit StockConsumption audit event in the same transaction
  await ctx.data.runInTransaction(async () => {
    await orders.save(updatedOrder);

    // Step 8: Emit StockConsumption audit event recording the status change
    const consumption: StockConsumption = {
      stockConsumptionId: ctx.idGenerator.newId(),
      stockItemId: `order-status-change:${input.orderId}`,
      orderId: input.orderId,
      quantity: 0,
      status: 'posted',
      createdAt: now,
      voidedAt: null,
      voidReason: null,
    };
    await stockConsumptions.append(consumption);
  });

  // Step 9: Return result
  return {
    orderId: updatedOrder.orderId,
    status: updatedOrder.status,
    updatedAt: updatedOrder.updatedAt,
  };
}
