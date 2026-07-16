/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';
import {
  shiftClosingReportRequiresClosedShift,
  shiftClosingReportTotalApuradoIsValid,
  shiftClosingReportPaidOrderCountIsValid,
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

  // Step 1–2: Load the Shift aggregate and verify it exists.
  const shift = await shifts.getById(input.shiftId);
  if (!shift) {
    throw new AppError(
      'NOT_FOUND',
      `Shift not found: ${input.shiftId}`,
      404,
      { shiftId: input.shiftId },
    );
  }

  // Step 3: Verify the shift status is 'closed' (rule: shiftClosingRecordsRevenue requires a finalized shift).
  if (!shiftClosingReportRequiresClosedShift(shift.status)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Closing report is only available for closed shifts (rule: shiftClosingRecordsRevenue).',
      400,
      { ruleId: 'shiftClosingRecordsRevenue', shiftId: input.shiftId, currentStatus: shift.status },
    );
  }

  // Step 4–5: Load the ShiftClosingReport by shiftId.
  const report: ShiftClosingReport | null = await reports.findByShiftId(input.shiftId);
  if (!report) {
    throw new AppError(
      'NOT_FOUND',
      `No shift closing report found for shift: ${input.shiftId}`,
      404,
      { shiftId: input.shiftId },
    );
  }

  // Step 6: Validate data integrity — totalApurado >= 0 and paidOrderCount >= 0.
  if (!shiftClosingReportTotalApuradoIsValid(report.totalApurado)) {
    throw new AppError(
      'CONFLICT',
      'Data integrity error: totalApurado must be >= 0 (rule: shiftClosingRecordsRevenue).',
      409,
      { ruleId: 'shiftClosingRecordsRevenue', totalApurado: report.totalApurado },
    );
  }
  if (!shiftClosingReportPaidOrderCountIsValid(report.paidOrderCount)) {
    throw new AppError(
      'CONFLICT',
      'Data integrity error: paidOrderCount must be >= 0 (rule: shiftClosingConsolidatesPaidOrders).',
      409,
      { ruleId: 'shiftClosingConsolidatesPaidOrders', paidOrderCount: report.paidOrderCount },
    );
  }

  // Step 7: Return the report fields.
  return {
    shiftClosingReportId: report.shiftClosingReportId,
    shiftId: report.shiftId,
    totalApurado: report.totalApurado,
    paidOrderCount: report.paidOrderCount,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
  };
}
