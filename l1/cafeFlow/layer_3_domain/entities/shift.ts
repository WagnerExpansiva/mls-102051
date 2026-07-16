/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/shift.ts" enhancement="_blank"/>
export type ShiftStatus = 'open' | 'closed';

export interface Shift {
  shiftId: string;
  status: ShiftStatus;
  openedAt: string;
  closedAt: string | null;
  openedBy: string;
  closedBy: string | null;
  totalApurado: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export const SHIFT_STATUS_TRANSITIONS: Record<ShiftStatus, ShiftStatus[]> = {
  open: ['closed'],
  closed: [],
};

export function canTransitionShift(from: ShiftStatus, to: ShiftStatus): boolean {
  return SHIFT_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function validateShiftInvariants(shift: Shift): string[] {
  const errors: string[] = [];

  if (shift.status === 'closed') {
    if (shift.closedAt === null) {
      errors.push('closedAt is required when status is "closed"');
    }
    if (shift.closedBy === null) {
      errors.push('closedBy is required when status is "closed"');
    }
    if (shift.totalApurado === null) {
      errors.push('totalApurado is required when status is "closed"');
    }
  }

  if (shift.status === 'open') {
    if (shift.closedAt !== null) {
      errors.push('closedAt must be null when status is "open"');
    }
    if (shift.closedBy !== null) {
      errors.push('closedBy must be null when status is "open"');
    }
  }

  if (shift.closedAt !== null && shift.openedAt !== null) {
    if (shift.closedAt < shift.openedAt) {
      errors.push('closedAt must be greater than or equal to openedAt');
    }
  }

  return errors;
}

export function hasSingleOpenShift(shifts: Shift[]): boolean {
  return shifts.filter((shift) => shift.status === 'open').length <= 1;
}
