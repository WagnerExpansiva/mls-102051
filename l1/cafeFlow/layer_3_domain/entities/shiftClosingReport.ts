/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.ts" enhancement="_blank"/>

export interface ShiftClosingReport {
  shiftClosingReportId: string;
  shiftId: string;
  totalApurado: number;
  paidOrderCount: number;
  createdAt: string;
  updatedAt: string;
}

export function shiftClosingReportRequiresNonNegativeTotal(
  report: Pick<ShiftClosingReport, 'totalApurado'>,
): boolean {
  return report.totalApurado >= 0;
}

export function shiftClosingReportRequiresNonNegativePaidOrderCount(
  report: Pick<ShiftClosingReport, 'paidOrderCount'>,
): boolean {
  return report.paidOrderCount >= 0;
}

export function isUniqueShiftClosingReportPerShift(
  reports: ShiftClosingReport[],
  shiftId: string,
): boolean {
  return reports.filter((r) => r.shiftId === shiftId).length <= 1;
}

export function validateShiftClosingReport(
  report: Pick<ShiftClosingReport, 'totalApurado' | 'paidOrderCount'>,
): string[] {
  const errors: string[] = [];
  if (report.totalApurado < 0) {
    errors.push('totalApurado must be greater than or equal to zero');
  }
  if (report.paidOrderCount < 0) {
    errors.push('paidOrderCount must be greater than or equal to zero');
  }
  return errors;
}
