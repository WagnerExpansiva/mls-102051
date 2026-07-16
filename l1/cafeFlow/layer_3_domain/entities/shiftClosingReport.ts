/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.ts" enhancement="_blank"/>

export interface ShiftClosingReport {
  shiftClosingReportId: string;
  shiftId: string;
  totalApurado: number;
  paidOrderCount: number;
  createdAt: string;
  updatedAt: string;
}

export function shiftClosingReportTotalApuradoIsValid(report: Pick<ShiftClosingReport, 'totalApurado'>): boolean {
  return report.totalApurado >= 0;
}

export function shiftClosingReportPaidOrderCountIsValid(report: Pick<ShiftClosingReport, 'paidOrderCount'>): boolean {
  return report.paidOrderCount >= 0;
}

export function shiftClosingReportIsUniquePerShift(
  report: Pick<ShiftClosingReport, 'shiftId'>,
  existing: Array<Pick<ShiftClosingReport, 'shiftClosingReportId' | 'shiftId'>>,
): boolean {
  return !existing.some(
    (item) => item.shiftId === report.shiftId,
  );
}

export function validateShiftClosingReport(
  report: Pick<ShiftClosingReport, 'totalApurado' | 'paidOrderCount'>,
): string[] {
  const errors: string[] = [];
  if (!shiftClosingReportTotalApuradoIsValid(report)) {
    errors.push('totalApurado must be greater than or equal to zero');
  }
  if (!shiftClosingReportPaidOrderCountIsValid(report)) {
    errors.push('paidOrderCount must be greater than or equal to zero');
  }
  return errors;
}
