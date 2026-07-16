/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MdmDetailRecord } from '/_102034_/l1/mdm/module.js';

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

const ALLOWED_UNITS: readonly string[] = ['kg', 'liter', 'portion', 'unit'];

/**
 * Inline helper for rule `lowStockAlertCalculation`.
 *
 * After updating a StockItem's `minimumLevel`, the low-stock alert threshold
 * is the new `minimumLevel`. An item is flagged as low-stock when its current
 * quantity is less than or equal to the threshold. This helper performs the
 * comparison so callers (e.g. stock monitoring routines) can use the result
 * without re-implementing the logic.
 */
function isLowStock(currentQuantity: number | null, minimumLevel: number): boolean {
  if (currentQuantity === null) {
    return false;
  }
  return currentQuantity <= minimumLevel;
}

export async function manageStockItem(
  ctx: RequestContext,
  input: ManageStockItemInput,
): Promise<ManageStockItemOutput> {
  // Step 1: Validate that unit is one of the allowed enum values.
  if (!ALLOWED_UNITS.includes(input.unit)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Invalid unit "${input.unit}". Allowed values: ${ALLOWED_UNITS.join(', ')}.`,
      400,
      {
        ruleId: 'lowStockAlertCalculation',
        field: 'unit',
        allowedValues: [...ALLOWED_UNITS],
      },
    );
  }

  // Step 2: Validate that minimumLevel is a non-negative number.
  if (typeof input.minimumLevel !== 'number' || isNaN(input.minimumLevel) || input.minimumLevel < 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'minimumLevel must be a non-negative number.',
      400,
      {
        ruleId: 'lowStockAlertCalculation',
        field: 'minimumLevel',
        value: input.minimumLevel,
      },
    );
  }

  // Step 3: Load the existing StockItem from MDM.
  // ctx.mdm.entity.get throws AppError('NOT_FOUND', …, 404) if the record does not exist.
  const existing = await ctx.mdm.entity.get({ mdmId: input.stockItemId });

  const existingDetails = existing.details as unknown as Record<string, unknown>;
  const existingCafeFlow =
    (existingDetails['cafeFlow'] as Record<string, unknown> | undefined) ?? {};
  const createdAt =
    (existingCafeFlow['createdAt'] as string | undefined) ??
    (existingDetails['createdAt'] as string | undefined) ??
    existing.document.createdAt;

  const now = ctx.clock.nowIso();

  // Step 4 & 5: Build the updated payload and persist via MDM facade.
  // Module-specific fields are stored under the `cafeFlow` namespace key;
  // `name` is a top-level MDM detail field.
  await ctx.mdm.entity.update({
    mdmId: input.stockItemId,
    expectedVersion: existing.version,
    patch: {
      name: input.name,
      cafeFlow: {
        ...existingCafeFlow,
        unit: input.unit,
        minimumLevel: input.minimumLevel,
        createdAt,
        updatedAt: now,
      },
    } as unknown as Partial<MdmDetailRecord>,
  });

  // Step 6: Apply rule lowStockAlertCalculation (inline).
  // The low-stock alert threshold is now the updated `minimumLevel`.
  // If a current quantity is present in the module namespace, compute the
  // flag; otherwise the threshold is set and the comparison is deferred to
  // the stock monitoring routine.
  const currentQuantity =
    (existingCafeFlow['currentQuantity'] as number | undefined) ?? null;
  const _lowStockFlag = isLowStock(currentQuantity, input.minimumLevel);

  // Step 7: Return the updated StockItem projection.
  return {
    stockItemId: input.stockItemId,
    name: input.name,
    unit: input.unit,
    minimumLevel: input.minimumLevel,
    updatedAt: now,
  };
}
