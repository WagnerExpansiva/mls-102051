/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.ts" enhancement="_blank"/>
import type { Shift, ShiftStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

export type ShiftId = string;
export type EmployeeId = string;

export interface ShiftFilter {
  status?: ShiftStatus;
  openedBy?: string;
}

export interface IShiftRepository {
  getById(shiftId: ShiftId): Promise<Shift>; // throws NOT_FOUND
  list(filter: ShiftFilter): Promise<Shift[]>;
  save(shift: Shift): Promise<void>; // upsert the whole aggregate
  findByEmployeeId(employeeId: EmployeeId): Promise<Shift[]>;
  findByPeriod(start: Date, end: Date): Promise<Shift[]>;
  findOpenShifts(): Promise<Shift[]>;
}
