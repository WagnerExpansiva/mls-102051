/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MdmDetailRecord } from '/_102034_/l1/mdm/module.js';

const ALLOWED_UNITS = ['kg', 'liter', 'portion', 'unit'] as const;
type StockUnit = (typeof ALLOWED_UNITS)[number];

export interface ManageStockItemInput {
  stockItemId: string;
  name: string;
  unit: string;
  minimumLevel: number;
}

export interface ManageStockItemOutput {
  stockItemId: string;
  name: string;
  unit: string;
  minimumLevel: number;
  updatedAt: string;
}

export async function manageStockItem(
  ctx: RequestContext,
  input: ManageStockItemInput,
): Promise<ManageStockItemOutput> {
  // 1. Retrieve the existing StockItem from MDM to confirm it exists and capture current state.
  const existing = await ctx.mdm.entity.get({ mdmId: input.stockItemId });

  // 2. Validate that 'unit' is one of the allowed enum values: kg, liter, portion, unit.
  if (!ALLOWED_UNITS.includes(input.unit as StockUnit)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Invalid unit "${input.unit}". Allowed values: ${ALLOWED_UNITS.join(', ')}.`,
      400,
      { ruleId: 'lowStockAlertCalculation', field: 'unit', allowed: [...ALLOWED_UNITS] },
    );
  }

  // 3. Validate that 'minimumLevel' is a non-negative number (>= 0).
  if (!Number.isFinite(input.minimumLevel) || input.minimumLevel < 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'minimumLevel must be a non-negative number.',
      400,
      { ruleId: 'lowStockAlertCalculation', field: 'minimumLevel', value: input.minimumLevel },
    );
  }

  // 4. Apply rule lowStockAlertCalculation inline: warn if minimumLevel is 0 (alerts will never fire).
  if (input.minimumLevel === 0) {
    ctx.log.info(
      `lowStockAlertCalculation: minimumLevel is 0 for stockItem ${input.stockItemId}; low-stock alerts will never fire for this item.`,
      { stockItemId: input.stockItemId, ruleId: 'lowStockAlertCalculation' },
    );
  }

  const now = ctx.clock.nowIso();

  // 5. Build the update payload and persist via MDM facade.
  const existingDetails = existing.details as unknown as Record<string, unknown>;
  const existingCafeFlow = (existingDetails['cafeFlow'] ?? {}) as Record<string, unknown>;

  const updated = await ctx.mdm.entity.update({
    mdmId: input.stockItemId,
    expectedVersion: existing.version,
    patch: {
      name: input.name,
      cafeFlow: {
        ...existingCafeFlow,
        unit: input.unit,
        minimumLevel: input.minimumLevel,
        updatedAt: now,
      },
    } as unknown as Partial<MdmDetailRecord>,
  });

  // 6. Read back the updated StockItem and project output fields.
  const updatedDetails = updated.details as unknown as Record<string, unknown>;
  const cafeFlow = (updatedDetails['cafeFlow'] ?? {}) as Record<string, unknown>;

  return {
    stockItemId: updated.mdmId,
    name: updated.details.name,
    unit: String(cafeFlow['unit'] ?? input.unit),
    minimumLevel: Number(cafeFlow['minimumLevel'] ?? input.minimumLevel),
    updatedAt: String(cafeFlow['updatedAt'] ?? now),
  };
}
