/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/closeShift.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import {
  canTransitionShift,
  atMostOneOpenShift,
  validateShiftInvariants,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';
import {
  validateShiftClosingReportInvariants,
  isUniqueShiftClosingReportForShift,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

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
  shiftClosingReportId: string;
  paidOrderCount: number;
}

export async function closeShift(ctx: RequestContext, input: CloseShiftInput): Promise<CloseShiftOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const reports = resolveRepository<IShiftClosingReportRepository>(ctx, 'ShiftClosingReport');

  // Step 1: Resolve the active lifecycle instance — query all open shifts.
  const openShifts = await shifts.list({ status: 'open' });

  // Step 2: Apply rule 'singleOpenShift' — exactly one open shift must exist.
  if (!atMostOneOpenShift(openShifts) || openShifts.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'singleOpenShift: deve existir exatamente um turno aberto para fechá-lo.',
      400,
      { ruleId: 'singleOpenShift', openShiftCount: openShifts.length },
    );
  }

  const openShift = openShifts[0]!;

  // Step 4: Resolve closedBy from the authenticated manager.
  const closedBy = ctx.sessionContext.actorId ?? 'unknown';

  // Step 5: Resolve closedAt from the current clock.
  const now = ctx.clock.nowIso();

  // Step 6: Apply rule 'shiftClosingRecordsRevenue' — transition to closed with revenue.
  if (!canTransitionShift(openShift.status, 'closed')) {
    throw new AppError(
      'CONFLICT',
      `Cannot transition shift from "${openShift.status}" to "closed".`,
      409,
      { ruleId: 'shiftClosingRecordsRevenue', from: openShift.status, to: 'closed' },
    );
  }

  const closedShift: Shift = {
    ...openShift,
    status: 'closed',
    closedAt: now,
    closedBy,
    totalApurado: input.totalApurado,
    notes: input.notes ?? openShift.notes,
    updatedAt: now,
  };

  // Validate domain invariants on the closed shift.
  const invariantErrors = validateShiftInvariants(closedShift);
  if (invariantErrors.length > 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Shift invariant violations: ${invariantErrors.join('; ')}`,
      400,
      { ruleId: 'shiftClosingRecordsRevenue', errors: invariantErrors },
    );
  }

  // Step 8: Query orders for this shift and count delivered (paid) orders.
  const shiftOrders = await orders.list({ shiftId: openShift.shiftId });
  const paidOrderCount = shiftOrders.filter((o) => o.status === 'delivered').length;

  // Step 9: Generate a new shiftClosingReportId.
  const shiftClosingReportId = ctx.idGenerator.newId();

  // Step 10: Build the ShiftClosingReport record.
  const report: ShiftClosingReport = {
    shiftClosingReportId,
    shiftId: openShift.shiftId,
    totalApurado: input.totalApurado,
    paidOrderCount,
    createdAt: now,
    updatedAt: now,
  };

  // Validate report invariants.
  const reportErrors = validateShiftClosingReportInvariants(report);
  if (reportErrors.length > 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      `ShiftClosingReport invariant violations: ${reportErrors.join('; ')}`,
      400,
      { errors: reportErrors },
    );
  }

  // Check uniqueness — no existing report for this shift.
  const existingReport = await reports.findByShiftId(openShift.shiftId);
  if (existingReport) {
    throw new AppError(
      'CONFLICT',
      'A closing report already exists for this shift.',
      409,
      { ruleId: 'isUniqueShiftClosingReportForShift', shiftId: openShift.shiftId },
    );
  }

  // Steps 7 & 10: Persist shift update and report creation inside one transaction.
  await ctx.data.runInTransaction(async () => {
    await shifts.save(closedShift);
    await reports.save(report);
  });

  // Step 11: rule 'dashboardCurrentShiftOnly' — no shift remains open (guaranteed by transition).
  // Step 12: Return the closed shift fields and report fields.
  return {
    shiftId: closedShift.shiftId,
    status: closedShift.status,
    closedAt: closedShift.closedAt!,
    closedBy: closedShift.closedBy!,
    totalApurado: closedShift.totalApurado!,
    notes: closedShift.notes ?? undefined,
    shiftClosingReportId: report.shiftClosingReportId,
    paidOrderCount: report.paidOrderCount,
  };
}
