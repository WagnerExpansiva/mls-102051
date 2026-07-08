/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.ts" enhancement="_blank"/>
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

export type ShiftClosingReportId = string;
export type ShiftId = string;

export interface ShiftClosingReportListFilter {
  shiftClosingReportId?: ShiftClosingReportId;
  shiftId?: ShiftId;
  fromCreatedAt?: string;
  toCreatedAt?: string;
}

export interface IShiftClosingReportRepository {
  getById(id: ShiftClosingReportId): Promise<ShiftClosingReport>;
  list(filter?: ShiftClosingReportListFilter): Promise<ShiftClosingReport[]>;
  save(report: ShiftClosingReport): Promise<void>;
  listByShiftId(shiftId: ShiftId): Promise<ShiftClosingReport[]>;
}
