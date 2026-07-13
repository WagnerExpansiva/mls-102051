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

/**
 * Invariant: closedAt and closedBy are required when status is 'closed'.
 */
export function shiftClosedFieldsRequired(shift: Pick<Shift, 'status' | 'closedAt' | 'closedBy'>): boolean {
  if (shift.status !== 'closed') {
    return true;
  }
  return shift.closedAt !== null && shift.closedBy !== null;
}

/**
 * Invariant: closedAt must be after openedAt.
 */
export function shiftClosedAfterOpened(shift: Pick<Shift, 'openedAt' | 'closedAt'>): boolean {
  if (shift.closedAt === null) {
    return true;
  }
  return shift.closedAt > shift.openedAt;
}

/**
 * Invariant: totalApurado must be filled when status is 'closed'.
 */
export function shiftTotalApuradoRequiredOnClose(shift: Pick<Shift, 'status' | 'totalApurado'>): boolean {
  if (shift.status !== 'closed') {
    return true;
  }
  return shift.totalApurado !== null;
}

/**
 * Invariant: cannot have two shifts open simultaneously.
 * Returns true if at most one shift among the given list is open.
 */
export function atMostOneOpenShift(shifts: Array<Pick<Shift, 'status'>>): boolean {
  return shifts.filter((s) => s.status === 'open').length <= 1;
}

/**
 * Validates all single-entity invariants for a shift.
 * Returns an array of error messages (empty when all invariants hold).
 */
export function validateShiftInvariants(shift: Shift): string[] {
  const errors: string[] = [];

  if (!shiftClosedFieldsRequired(shift)) {
    errors.push('closedAt and closedBy are required when status is "closed"');
  }

  if (!shiftClosedAfterOpened(shift)) {
    errors.push('closedAt must be after openedAt');
  }

  if (!shiftTotalApuradoRequiredOnClose(shift)) {
    errors.push('totalApurado must be filled when status is "closed"');
  }

  return errors;
}
