/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';
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
  warning?: string | null;
}

export async function viewShiftClosingReport(
  ctx: RequestContext,
  input: ViewShiftClosingReportInput,
): Promise<ViewShiftClosingReportOutput> {
  const reportRepo = resolveRepository<IShiftClosingReportRepository>(ctx, 'ShiftClosingReport');
  const shiftRepo = resolveRepository<IShiftRepository>(ctx, 'Shift');

  // Step 1: Load the ShiftClosingReport using shiftId as the lookup key.
  const reports = await reportRepo.listByShiftId(input.shiftId);
  const report: ShiftClosingReport | undefined = reports.length > 0 ? reports[0] : undefined;

  // Step 2: If no ShiftClosingReport is found, throw NOT_FOUND.
  if (!report) {
    throw new AppError(
      'NOT_FOUND',
      `Nenhum relatório de fechamento encontrado para o turno ${input.shiftId}.`,
      404,
      { shiftId: input.shiftId },
    );
  }

  // Step 3: Load the Shift to verify it exists and is in 'closed' status.
  let shift: Shift;
  try {
    shift = await shiftRepo.getById(input.shiftId);
  } catch {
    throw new AppError(
      'VALIDATION_ERROR',
      `Turno ${input.shiftId} não encontrado. O turno deve existir e estar fechado para visualizar o relatório de fechamento.`,
      400,
      { shiftId: input.shiftId },
    );
  }

  // Step 4: If the Shift is not in 'closed' status, throw VALIDATION_ERROR.
  if (String(shift.status) !== 'closed') {
    throw new AppError(
      'VALIDATION_ERROR',
      'O turno deve estar fechado antes que seu relatório de fechamento possa ser visualizado.',
      400,
      { shiftId: input.shiftId, currentStatus: shift.status, ruleId: 'shiftMustBeClosed' },
    );
  }

  // Step 5: Apply rule 'shiftClosingRecordsRevenue' — verify data integrity between
  // report.totalApurado and shift.totalApurado. Non-blocking; include a warning if they diverge.
  let warning: string | null = null;
  if (shift.totalApurado !== null && report.totalApurado !== shift.totalApurado) {
    warning =
      `Divergência de receita detectada: o relatório apura ${report.totalApurado} ` +
      `enquanto o turno registra ${shift.totalApurado}.`;
  }

  // Step 6: Apply rule 'shiftClosingConsolidatesPaidOrders' — verify paidOrderCount is a
  // non-negative integer. If invalid, throw a DATA_INTEGRITY error.
  if (!Number.isInteger(report.paidOrderCount) || report.paidOrderCount < 0) {
    throw new AppError(
      'DATA_INTEGRITY',
      `paidOrderCount inválido no relatório de fechamento: ${report.paidOrderCount}. O valor deve ser um inteiro não-negativo.`,
      500,
      { shiftId: input.shiftId, paidOrderCount: report.paidOrderCount, ruleId: 'shiftClosingConsolidatesPaidOrders' },
    );
  }

  // Step 7: Return the ShiftClosingReport fields.
  return {
    shiftClosingReportId: report.shiftClosingReportId,
    shiftId: report.shiftId,
    totalApurado: report.totalApurado,
    paidOrderCount: report.paidOrderCount,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
    warning,
  };
}
