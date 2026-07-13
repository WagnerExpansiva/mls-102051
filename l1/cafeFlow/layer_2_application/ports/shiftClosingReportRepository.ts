/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.ts" enhancement="_blank"/>
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

export type ShiftClosingReportId = string;
export type ShiftId = string;

export interface ShiftClosingReportFilter {
  shiftClosingReportId?: ShiftClosingReportId;
  shiftId?: ShiftId;
  fromCreatedAt?: string;
  toCreatedAt?: string;
}

export interface IShiftClosingReportRepository {
  getById(reportId: ShiftClosingReportId): Promise<ShiftClosingReport>;
  findById(reportId: ShiftClosingReportId): Promise<ShiftClosingReport | null>;
  list(filter?: ShiftClosingReportFilter): Promise<ShiftClosingReport[]>;
  save(report: ShiftClosingReport): Promise<void>;
  findByShiftId(shiftId: ShiftId): Promise<ShiftClosingReport | null>;
  findByPeriod(start: Date, end: Date): Promise<ShiftClosingReport[]>;
}
