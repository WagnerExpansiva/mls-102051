/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.ts" enhancement="_blank"/>
import type { Shift, ShiftStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

export type ShiftId = string;
export type EmployeeId = string;

export interface ShiftFilter {
  status?: ShiftStatus;
  openedBy?: EmployeeId;
}

export interface IShiftRepository {
  getById(shiftId: ShiftId): Promise<Shift>;
  list(filter?: ShiftFilter): Promise<Shift[]>;
  save(shift: Shift): Promise<void>;
  findByEmployeeId(employeeId: EmployeeId): Promise<Shift[]>;
  findOpenShiftByEmployeeId(employeeId: EmployeeId): Promise<Shift | null>;
  findByPeriod(start: Date, end: Date): Promise<Shift[]>;
}
