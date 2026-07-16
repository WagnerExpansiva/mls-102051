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

export function shiftRequiresClosedFieldsWhenClosed(shift: Pick<Shift, 'status' | 'closedAt' | 'closedBy' | 'totalApurado'>): boolean {
  if (shift.status !== 'closed') {
    return true;
  }
  return (
    shift.closedAt !== null &&
    shift.closedBy !== null &&
    shift.totalApurado !== null
  );
}

export function shiftClosedAtMustBeAfterOpenedAt(
  shift: Pick<Shift, 'openedAt' | 'closedAt'>,
): boolean {
  if (shift.closedAt === null) {
    return true;
  }
  return shift.closedAt > shift.openedAt;
}

export function shiftCannotBeReopened(from: ShiftStatus, to: ShiftStatus): boolean {
  if (from === 'closed' && to === 'open') {
    return false;
  }
  return true;
}

export function onlyOneShiftOpen(shifts: Pick<Shift, 'status'>[]): boolean {
  return shifts.filter((s) => s.status === 'open').length <= 1;
}
