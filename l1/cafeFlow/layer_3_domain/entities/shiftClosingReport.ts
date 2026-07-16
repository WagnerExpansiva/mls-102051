/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.ts" enhancement="_blank"/>
export interface ShiftClosingReport {
  shiftClosingReportId: string;
  shiftId: string;
  totalApurado: number;
  paidOrderCount: number;
  createdAt: string;
  updatedAt: string;
}

export function shiftClosingReportRequiresClosedShift(shiftStatus: string): boolean {
  return String(shiftStatus) === 'closed';
}

export function shiftClosingReportTotalApuradoIsValid(totalApurado: number): boolean {
  return totalApurado >= 0;
}

export function shiftClosingReportPaidOrderCountIsValid(paidOrderCount: number): boolean {
  return paidOrderCount >= 0;
}

export function isUniqueShiftClosingReportForShift(
  existingReports: ShiftClosingReport[],
  shiftId: string,
): boolean {
  return !existingReports.some((report) => report.shiftId === shiftId);
}

export function validateShiftClosingReport(
  report: Pick<ShiftClosingReport, 'totalApurado' | 'paidOrderCount'>,
  shiftStatus: string,
  existingReports: ShiftClosingReport[],
  shiftId: string,
): void {
  if (!shiftClosingReportRequiresClosedShift(shiftStatus)) {
    throw new Error('Referenced shift must have status "closed" before generating the report');
  }
  if (!shiftClosingReportTotalApuradoIsValid(report.totalApurado)) {
    throw new Error('totalApurado must be >= 0');
  }
  if (!shiftClosingReportPaidOrderCountIsValid(report.paidOrderCount)) {
    throw new Error('paidOrderCount must be >= 0');
  }
  if (!isUniqueShiftClosingReportForShift(existingReports, shiftId)) {
    throw new Error('Only one ShiftClosingReport per shift');
  }
}
