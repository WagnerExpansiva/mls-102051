/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/openShift.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.js';
import type { Shift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shift.js';

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

  const actorId = ctx.sessionContext.actorSession.actorId ?? 'unknown';
  const now = ctx.clock.nowIso();
  const shiftId = ctx.idGenerator.newId();

  return ctx.data.runInTransaction(async () => {
    // Step 4 & 5: Check for existing open shift (singleOpenShift rule)
    const openShifts = await shifts.list({ status: 'open' });
    if (openShifts.length > 0) {
      throw new AppError(
        'CONFLICT',
        'singleOpenShift: já existe um turno aberto. Feche o turno atual antes de abrir um novo.',
        409,
        { ruleId: 'singleOpenShift', existingShiftId: openShifts[0].shiftId },
      );
    }

    // Step 6: Build the new Shift
    const newShift: Shift = {
      shiftId,
      status: 'open',
      openedAt: now,
      closedAt: null,
      openedBy: actorId,
      closedBy: null,
      totalApurado: null,
      notes: input.notes ?? null,
      createdAt: now,
      updatedAt: now,
    };

    // Step 7: Persist
    await shifts.save(newShift);

    // Step 8: Return output
    return {
      shiftId: newShift.shiftId,
      status: newShift.status,
      openedAt: newShift.openedAt,
      openedBy: newShift.openedBy,
    };
  });
}
