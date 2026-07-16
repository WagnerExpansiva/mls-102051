/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/closeShift.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import { canTransitionShift, validateShiftInvariants } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
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
  shiftClosingReportId: string;
  paidOrderCount: number;
}

export async function closeShift(ctx: RequestContext, input: CloseShiftInput): Promise<CloseShiftOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const reports = resolveRepository<IShiftClosingReportRepository>(ctx, 'ShiftClosingReport');

  const now = ctx.clock.nowIso();
  const closedBy = ctx.sessionContext.actorId ?? 'system';

  return ctx.data.runInTransaction(async () => {
    // Step 1: Resolve the active open Shift (activeLifecycleInstance).
    // dashboardCurrentShiftOnly: the dashboard and closing operations target only the
    // single current (open) shift — no historical or future shifts are eligible.
    const openShifts = await shifts.findOpenShifts();

    if (openShifts.length === 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        'singleOpenShift: não há turno aberto para fechar.',
        400,
        { ruleId: 'singleOpenShift', dashboardCurrentShiftOnly: true },
      );
    }
    if (openShifts.length > 1) {
      throw new AppError(
        'CONFLICT',
        'singleOpenShift: há mais de um turno aberto simultaneamente.',
        409,
        { ruleId: 'singleOpenShift', openShiftCount: openShifts.length, dashboardCurrentShiftOnly: true },
      );
    }

    const openShift = openShifts[0];

    // dashboardCurrentShiftOnly: confirm the resolved shift is the single active lifecycle instance.
    if (openShift.status !== 'open') {
      throw new AppError(
        'VALIDATION_ERROR',
        'dashboardCurrentShiftOnly: o turno selecionado não é o turno ativo atual.',
        400,
        { ruleId: 'dashboardCurrentShiftOnly', shiftId: openShift.shiftId, status: openShift.status },
      );
    }

    // Check domain transition: open -> closed
    if (!canTransitionShift(openShift.status, 'closed')) {
      throw new AppError(
        'CONFLICT',
        `Transição inválida de status: ${openShift.status} → closed`,
        409,
        { currentStatus: openShift.status, targetStatus: 'closed' },
      );
    }

    // Step 3: Load all Orders for the resolved shiftId and compute paidOrderCount.
    const shiftOrders = await orders.list({ shiftId: openShift.shiftId });
    const paidOrderCount = shiftOrders.filter((o) => o.status === 'delivered').length;

    // Step 4: Mutate the Shift aggregate.
    const closedShift: Shift = {
      ...openShift,
      status: 'closed',
      closedAt: now,
      closedBy,
      totalApurado: input.totalApurado,
      notes: input.notes ?? openShift.notes,
      updatedAt: now,
    };

    const invariantErrors = validateShiftInvariants(closedShift);
    if (invariantErrors.length > 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        `shiftClosingRecordsRevenue: invariantes do turno violadas: ${invariantErrors.join('; ')}`,
        400,
        { ruleId: 'shiftClosingRecordsRevenue', errors: invariantErrors },
      );
    }

    await shifts.save(closedShift);

    // Step 5: Create a ShiftClosingReport.
    const reportId = ctx.idGenerator.newId();
    const report: ShiftClosingReport = {
      shiftClosingReportId: reportId,
      shiftId: openShift.shiftId,
      totalApurado: input.totalApurado,
      paidOrderCount,
      createdAt: now,
      updatedAt: now,
    };

    const reportErrors = validateShiftClosingReport(report);
    if (reportErrors.length > 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        `shiftClosingRecordsRevenue: invariantes do relatório violadas: ${reportErrors.join('; ')}`,
        400,
        { ruleId: 'shiftClosingRecordsRevenue', errors: reportErrors },
      );
    }

    await reports.save(report);

    // Step 6: Return the closed Shift fields and the generated ShiftClosingReport id and paidOrderCount.
    return {
      shiftId: closedShift.shiftId,
      status: closedShift.status,
      closedAt: closedShift.closedAt as string,
      closedBy: closedShift.closedBy as string,
      totalApurado: closedShift.totalApurado as number,
      notes: closedShift.notes ?? undefined,
      shiftClosingReportId: report.shiftClosingReportId,
      paidOrderCount: report.paidOrderCount,
    };
  });
}
