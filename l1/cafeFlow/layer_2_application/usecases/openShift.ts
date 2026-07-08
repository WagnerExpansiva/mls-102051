/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/openShift.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';
import { hasOpenShift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

export interface OpenShiftInput {
  notes?: string;
}

export interface OpenShiftOutput {
  shiftId: string;
  status: string;
  openedAt: string;
  openedBy: string;
}

export async function openShift(ctx: RequestContext, input: OpenShiftInput): Promise<OpenShiftOutput> {
  const shifts = resolveRepository<IShiftRepository>(ctx, 'Shift');

  const openedBy = ctx.sessionContext.actorId;
  if (!openedBy) {
    throw new AppError('VALIDATION_ERROR', 'openedBy is required: no active actor in session.', 400, {
      ruleId: 'actorRequired',
    });
  }

  const now = ctx.clock.nowIso();

  return ctx.data.runInTransaction(async () => {
    // Rule singleOpenShift: reject if there is already an open shift.
    const openShifts = await shifts.listOpenShifts();
    if (hasOpenShift(openShifts)) {
      throw new AppError(
        'CONFLICT',
        'singleOpenShift: já existe um turno aberto. Feche o turno atual antes de abrir um novo.',
        409,
        { ruleId: 'singleOpenShift' },
      );
    }

    const shift: Shift = {
      shiftId: ctx.idGenerator.newId(),
      status: 'open',
      openedAt: now,
      closedAt: null,
      openedBy,
      closedBy: null,
      totalApurado: null,
      notes: input.notes ?? null,
      createdAt: now,
      updatedAt: now,
    };

    await shifts.save(shift);

    return {
      shiftId: shift.shiftId,
      status: shift.status,
      openedAt: shift.openedAt,
      openedBy: shift.openedBy,
    };
  });
}
