/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/closeShift.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import {
  canTransitionShift,
  shiftClosedAtAfterOpenedAt,
  shiftRequiresCloseFields,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';
import {
  validateShiftClosingReport,
  isUniqueShiftClosingReportPerShift,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

export interface CloseShiftInput {
  totalApurado: number;
  notes?: string;
  shiftId?: string;
  closedBy?: string;
  closedAt?: string;
}

export interface CloseShiftOutput {
  shiftId: string;
  status: string;
  closedAt: string;
  closedBy: string;
  totalApurado: number;
  notes?: string;
  shiftClosingReportId: string;
  paidOrderCount: number;
}

export async function closeShift(ctx: RequestContext, input: CloseShiftInput): Promise<CloseShiftOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const reports = resolveRepository<IShiftClosingReportRepository>(ctx, 'ShiftClosingReport');

  // Step 1: Resolve closedBy and closedAt from context
  const closedBy = input.closedBy ?? ctx.sessionContext.actorId ?? 'unknown';
  const closedAt = input.closedAt ?? ctx.clock.nowIso();
  const now = ctx.clock.nowIso();

  // Step 2-3: Resolve shiftId — if not provided, find the single open shift (rule: singleOpenShift)
  let targetShiftId: string;
  if (input.shiftId) {
    targetShiftId = input.shiftId;
  } else {
    const openShifts = await shifts.listOpenShifts();
    if (openShifts.length === 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        'singleOpenShift: no open shift found to close.',
        400,
        { ruleId: 'singleOpenShift' },
      );
    }
    if (openShifts.length > 1) {
      throw new AppError(
        'CONFLICT',
        'singleOpenShift: multiple open shifts found; expected exactly one.',
        409,
        { ruleId: 'singleOpenShift', openShiftCount: openShifts.length },
      );
    }
    targetShiftId = openShifts[0].shiftId;
  }

  // Step 4: Load the target Shift aggregate
  const shift = await shifts.getById(targetShiftId);

  // Step 5: Validate the loaded Shift has status='open'
  if (shift.status !== 'open') {
    throw new AppError(
      'CONFLICT',
      `Shift is not open (current status: ${shift.status}).`,
      409,
      { shiftId: targetShiftId, currentStatus: shift.status },
    );
  }

  // Validate domain transition
  if (!canTransitionShift(shift.status, 'closed')) {
    throw new AppError(
      'CONFLICT',
      `Cannot transition shift from '${shift.status}' to 'closed'.`,
      409,
      { from: shift.status, to: 'closed' },
    );
  }

  // Step 6: Mutate the Shift
  const mutatedShift: Shift = {
    ...shift,
    status: 'closed',
    closedAt,
    closedBy,
    totalApurado: input.totalApurado,
    notes: input.notes ?? null,
    updatedAt: now,
  };

  // Validate domain invariants on the mutated shift
  if (!shiftClosedAtAfterOpenedAt(mutatedShift)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'closedAt must be after openedAt.',
      400,
      { openedAt: shift.openedAt, closedAt },
    );
  }
  if (!shiftRequiresCloseFields(mutatedShift)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Shift close fields are incomplete (closedAt, closedBy, totalApurado required).',
      400,
      { ruleId: 'shiftClosingRecordsRevenue' },
    );
  }

  // Step 7: Query delivered orders for this shift (rule: shiftClosingRecordsRevenue)
  const deliveredOrders = await orders.list({ shiftId: targetShiftId, status: 'delivered' });
  const paidOrderCount = deliveredOrders.length;

  // Step 8: Create a ShiftClosingReport
  const shiftClosingReportId = ctx.idGenerator.newId();
  const report: ShiftClosingReport = {
    shiftClosingReportId,
    shiftId: targetShiftId,
    totalApurado: input.totalApurado,
    paidOrderCount,
    createdAt: now,
    updatedAt: now,
  };

  // Validate the report
  const reportErrors = validateShiftClosingReport(report);
  if (reportErrors.length > 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Invalid shift closing report: ${reportErrors.join('; ')}`,
      400,
      { ruleId: 'shiftClosingRecordsRevenue', errors: reportErrors },
    );
  }

  // Check uniqueness — one report per shift (rule: shiftClosingRecordsRevenue)
  const existingReports = await reports.listByShiftId(targetShiftId);
  if (!isUniqueShiftClosingReportPerShift(existingReports, targetShiftId)) {
    throw new AppError(
      'CONFLICT',
      'A shift closing report already exists for this shift.',
      409,
      { ruleId: 'shiftClosingRecordsRevenue', shiftId: targetShiftId },
    );
  }

  // Step 9: Save the mutated Shift and the new ShiftClosingReport inside a single transaction
  await ctx.data.runInTransaction(async () => {
    await shifts.save(mutatedShift);
    await reports.save(report);
  });

  // Step 10: Verify no open shift remains (rule: dashboardCurrentShiftOnly)
  const remainingOpenShifts = await shifts.listOpenShifts();
  if (remainingOpenShifts.length > 0) {
    throw new AppError(
      'CONFLICT',
      'dashboardCurrentShiftOnly: an open shift still exists after closing.',
      409,
      { ruleId: 'dashboardCurrentShiftOnly', remainingOpenCount: remainingOpenShifts.length },
    );
  }

  // Step 11: Return the closed Shift fields and ShiftClosingReport fields
  return {
    shiftId: mutatedShift.shiftId,
    status: mutatedShift.status,
    closedAt: mutatedShift.closedAt as string,
    closedBy: mutatedShift.closedBy as string,
    totalApurado: mutatedShift.totalApurado as number,
    notes: mutatedShift.notes ?? undefined,
    shiftClosingReportId: report.shiftClosingReportId,
    paidOrderCount: report.paidOrderCount,
  };
}
