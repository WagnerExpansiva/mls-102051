/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';
import {
  shiftClosingReportTotalApuradoIsValid,
  shiftClosingReportPaidOrderCountIsValid,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

export interface ViewShiftClosingReportInput {
  shiftId: string;
}

export interface ViewShiftClosingReportOutput {
  shiftClosingReportId: string;
  shiftId: string;
  totalApurado: number;
  paidOrderCount: number;
  createdAt: string;
  updatedAt: string;
}

export async function viewShiftClosingReport(
  ctx: RequestContext,
  input: ViewShiftClosingReportInput,
): Promise<ViewShiftClosingReportOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');
  const reports = resolveRepository<IShiftClosingReportRepository>(ctx, 'ShiftClosingReport');

  // Step 1-2: Load the Shift aggregate to verify it exists.
  let shift: Shift;
  try {
    shift = await shifts.getById(input.shiftId);
  } catch {
    throw new AppError('NOT_FOUND', `Shift not found: ${input.shiftId}`, 404, { shiftId: input.shiftId });
  }

  // Step 3: Verify the shift status is 'closed' (rule: shiftClosingRecordsRevenue).
  if (String(shift.status) !== 'closed') {
    throw new AppError(
      'VALIDATION_ERROR',
      'shiftClosingRecordsRevenue: o relatório de fechamento está disponível apenas para turnos fechados.',
      400,
      { ruleId: 'shiftClosingRecordsRevenue', shiftId: input.shiftId, currentStatus: shift.status },
    );
  }

  // Step 4-5: Load the ShiftClosingReport by shiftId.
  const found = await reports.findByShiftId(input.shiftId);
  if (!found || found.length === 0) {
    throw new AppError(
      'NOT_FOUND',
      `Nenhum relatório de fechamento encontrado para o turno: ${input.shiftId}`,
      404,
      { shiftId: input.shiftId },
    );
  }

  const report: ShiftClosingReport = found[0];

  // Step 6: Apply rule shiftClosingRecordsRevenue — totalApurado must be present and valid.
  if (!shiftClosingReportTotalApuradoIsValid(report)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'shiftClosingRecordsRevenue: o total apurado do relatório é inválido.',
      400,
      { ruleId: 'shiftClosingRecordsRevenue', totalApurado: report.totalApurado },
    );
  }

  // Step 7: Apply rule shiftClosingConsolidatesPaidOrders — paidOrderCount must be present and valid.
  if (!shiftClosingReportPaidOrderCountIsValid(report)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'shiftClosingConsolidatesPaidOrders: a quantidade de pedidos pagos do relatório é inválida.',
      400,
      { ruleId: 'shiftClosingConsolidatesPaidOrders', paidOrderCount: report.paidOrderCount },
    );
  }

  // Step 8: Return the ShiftClosingReport fields.
  return {
    shiftClosingReportId: report.shiftClosingReportId,
    shiftId: report.shiftId,
    totalApurado: report.totalApurado,
    paidOrderCount: report.paidOrderCount,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
  };
}
