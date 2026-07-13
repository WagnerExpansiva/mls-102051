/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';
import {
  validateShiftClosingReportTotalApurado,
  validateShiftClosingReportPaidOrderCount,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

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

  // Step 2: Load the Shift to validate it exists and is closed.
  const shift = await shifts.getById(input.shiftId);
  if (!shift) {
    throw new AppError(
      'NOT_FOUND',
      'Turno não encontrado.',
      404,
      { shiftId: input.shiftId },
    );
  }

  if (String(shift.status) !== 'closed') {
    throw new AppError(
      'VALIDATION_ERROR',
      'O relatório de fechamento só está disponível para turnos fechados.',
      400,
      { shiftId: input.shiftId, currentStatus: shift.status },
    );
  }

  // Step 3: Load the ShiftClosingReport by shiftId.
  const report: ShiftClosingReport | null = await reports.findByShiftId(input.shiftId);
  if (!report) {
    // No report found for this shift — return empty result.
    throw new AppError(
      'NOT_FOUND',
      'Não há relatório de fechamento para este turno.',
      404,
      { shiftId: input.shiftId },
    );
  }

  // Step 4: Apply rule shiftClosingRecordsRevenue — totalApurado must be >= 0.
  if (!validateShiftClosingReportTotalApurado(report)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Inconsistência no relatório: totalApurado inválido (deve ser >= 0).',
      400,
      { ruleId: 'shiftClosingRecordsRevenue', totalApurado: report.totalApurado },
    );
  }

  // Step 5: Apply rule shiftClosingConsolidatesPaidOrders — paidOrderCount must be >= 0.
  if (!validateShiftClosingReportPaidOrderCount(report)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Inconsistência no relatório: paidOrderCount inválido (deve ser >= 0).',
      400,
      { ruleId: 'shiftClosingConsolidatesPaidOrders', paidOrderCount: report.paidOrderCount },
    );
  }

  // Step 6: Return the report projection.
  return {
    shiftClosingReportId: report.shiftClosingReportId,
    shiftId: report.shiftId,
    totalApurado: report.totalApurado,
    paidOrderCount: report.paidOrderCount,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
  };
}
