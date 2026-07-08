/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.ts" enhancement="_blank"/>
import type { Shift, ShiftStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

export type ShiftId = string;

export interface ShiftListFilter {
  status?: ShiftStatus;
  openedBy?: string;
}

export interface IShiftRepository {
  getById(id: ShiftId): Promise<Shift>;
  list(filter?: ShiftListFilter): Promise<Shift[]>;
  save(shift: Shift): Promise<void>;
  listOpenShifts(): Promise<Shift[]>;
  listByPeriod(start: Date, end: Date): Promise<Shift[]>;
}
