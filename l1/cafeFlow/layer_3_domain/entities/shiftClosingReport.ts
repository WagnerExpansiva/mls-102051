/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.ts" enhancement="_blank"/>
export interface ShiftClosingReport {
  shiftClosingReportId: string;
  shiftId: string;
  totalApurado: number;
  paidOrderCount: number;
  createdAt: string;
  updatedAt: string;
}

export function validateShiftClosingReportTotalApurado(report: Pick<ShiftClosingReport, 'totalApurado'>): boolean {
  return report.totalApurado >= 0;
}

export function validateShiftClosingReportPaidOrderCount(report: Pick<ShiftClosingReport, 'paidOrderCount'>): boolean {
  return report.paidOrderCount >= 0;
}

export function validateShiftClosingReportInvariants(report: ShiftClosingReport): string[] {
  const violations: string[] = [];
  if (!validateShiftClosingReportTotalApurado(report)) {
    violations.push('totalApurado must be greater than or equal to zero');
  }
  if (!validateShiftClosingReportPaidOrderCount(report)) {
    violations.push('paidOrderCount must be greater than or equal to zero');
  }
  return violations;
}

export function isUniqueShiftClosingReportForShift(
  existingReports: ShiftClosingReport[],
  shiftId: string,
  excludeReportId?: string,
): boolean {
  return !existingReports.some(
    (report) =>
      report.shiftId === shiftId &&
      report.shiftClosingReportId !== excludeReportId,
  );
}
