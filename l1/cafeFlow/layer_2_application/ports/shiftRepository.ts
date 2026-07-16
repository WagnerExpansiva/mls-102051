/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.ts" enhancement="_blank"/>
import type { Shift, ShiftStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

export type ShiftId = string;

export type LocalDate = string;

export interface ShiftFilter {
  status?: ShiftStatus;
  openedBy?: string;
}

export interface IShiftRepository {
  getById(id: ShiftId): Promise<Shift>;
  list(filter?: ShiftFilter): Promise<Shift[]>;
  save(shift: Shift): Promise<void>;
  findOpenShift(): Promise<Shift | null>;
  listByDate(date: LocalDate): Promise<Shift[]>;
}
