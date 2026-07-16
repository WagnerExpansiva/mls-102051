/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/closeShift.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import { canTransitionShift, shiftRequiresClosedFieldsWhenClosed, shiftClosedAtMustBeAfterOpenedAt } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';
import { validateShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

export interface CloseShiftInput {
  totalApurado: number;
  notes?: string;
}

export interface CloseShiftOutput {
  shiftId: string;
  status: string;
  closedAt: string;
  closedBy: string;
  totalApurado: number;
  notes?: string;
}

export async function closeShift(ctx: RequestContext, input: CloseShiftInput): Promise<CloseShiftOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const reports = resolveRepository<IShiftClosingReportRepository>(ctx, 'ShiftClosingReport');

  // Step 1: Resolve the active (open) lifecycle instance.
  const openShift = await shifts.findOpenShift();

  // Step 2: Apply rule singleOpenShift — exactly one open shift required.
  if (!openShift) {
    throw new AppError(
      'VALIDATION_ERROR',
      'closeShift.singleOpenShift: exactly one open shift required',
      400,
      { ruleId: 'singleOpenShift' },
    );
  }

  // Step 3: Resolve closedBy from actorSession.
  const closedBy = ctx.sessionContext.actorSession.actorId ?? 'unknown';

  // Step 4: Resolve closedAt from system clock.
  const now = ctx.clock.nowIso();

  // Step 5: The open shift aggregate is already loaded.
  const shift = openShift;

  // Step 6: Validate the Shift is in 'open' status (guard against race condition).
  if (String(shift.status) !== 'open') {
    throw new AppError(
      'CONFLICT',
      'closeShift: shift is no longer open (possible race condition)',
      409,
      { ruleId: 'singleOpenShift', currentStatus: shift.status },
    );
  }

  // Validate domain transition: open -> closed.
  if (!canTransitionShift(shift.status, 'closed')) {
    throw new AppError(
      'CONFLICT',
      'closeShift: invalid state transition from "open" to "closed"',
      409,
      { ruleId: 'singleOpenShift', from: shift.status, to: 'closed' },
    );
  }

  // Step 7: Mutate the Shift.
  const updatedShift: Shift = {
    ...shift,
    status: 'closed',
    closedAt: now,
    closedBy,
    totalApurado: input.totalApurado,
    notes: input.notes ?? null,
    updatedAt: now,
  };

  // Validate domain invariants on the mutated shift.
  if (!shiftRequiresClosedFieldsWhenClosed(updatedShift)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'closeShift: closed shift requires closedAt, closedBy and totalApurado',
      400,
      { ruleId: 'shiftClosingRecordsRevenue' },
    );
  }
  if (!shiftClosedAtMustBeAfterOpenedAt(updatedShift)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'closeShift: closedAt must be after openedAt',
      400,
      { ruleId: 'shiftClosingRecordsRevenue' },
    );
  }

  // Step 9: Query delivered orders for this shift (shiftClosingRecordsRevenue context).
  const shiftOrders = await orders.listByShiftId(shift.shiftId);
  const paidOrderCount = shiftOrders.filter((o) => String(o.status) === 'delivered').length;

  // Step 10 & 11: Build the ShiftClosingReport.
  const shiftClosingReportId = ctx.idGenerator.newId();
  const report: ShiftClosingReport = {
    shiftClosingReportId,
    shiftId: shift.shiftId,
    totalApurado: input.totalApurado,
    paidOrderCount,
    createdAt: now,
    updatedAt: now,
  };

  // Validate the report against domain rules (shift must be closed, uniqueness, etc.).
  const existingReports = await reports.list({ shiftId: shift.shiftId });
  validateShiftClosingReport(report, 'closed', existingReports, shift.shiftId);

  // Step 8 & 11: Persist both the shift and the report inside one transaction.
  await ctx.data.runInTransaction(async () => {
    await shifts.save(updatedShift);
    await reports.save(report);
  });

  // Step 12: dashboardCurrentShiftOnly — after closing, no shift remains 'open';
  // the dashboard will show no active shift. This is the expected terminal state.

  // Step 13: Return the result.
  return {
    shiftId: updatedShift.shiftId,
    status: updatedShift.status,
    closedAt: updatedShift.closedAt as string,
    closedBy: updatedShift.closedBy as string,
    totalApurado: updatedShift.totalApurado as number,
    notes: updatedShift.notes ?? undefined,
  };
}
