/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

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

const ALLOWED_UNITS = ['kg', 'liter', 'portion', 'unit'];

export async function manageStockItem(
  ctx: RequestContext,
  input: ManageStockItemInput,
): Promise<ManageStockItemOutput> {
  // 1. Validate name is a non-empty string
  if (!input.name || input.name.trim().length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'name must be a non-empty string.',
      400,
      { field: 'name' },
    );
  }

  // 2. Validate unit is one of the allowed enum values
  if (!ALLOWED_UNITS.includes(input.unit)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `unit must be one of: ${ALLOWED_UNITS.join(', ')}.`,
      400,
      { field: 'unit', allowed: ALLOWED_UNITS },
    );
  }

  // 3. Apply rule lowStockAlertCalculation: minimumLevel must be >= 0
  if (typeof input.minimumLevel !== 'number' || input.minimumLevel < 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'minimumLevel must be a non-negative number (>= 0).',
      400,
      { ruleId: 'lowStockAlertCalculation', field: 'minimumLevel' },
    );
  }

  // 4. Load the existing StockItem by stockItemId via MDM
  const entity = await ctx.mdm.entity.get({ mdmId: input.stockItemId });
  if (!entity) {
    throw new AppError(
      'NOT_FOUND',
      `StockItem not found: ${input.stockItemId}`,
      404,
      { stockItemId: input.stockItemId },
    );
  }

  // 5. Resolve updatedAt from system clock
  const updatedAt = ctx.clock.nowIso();

  // 6. Update the StockItem via MDM inside a single transaction
  const existingDetails = entity.details as unknown as Record<string, unknown>;
  const existingCafeFlow = (existingDetails.cafeFlow ?? {}) as Record<string, unknown>;

  const updated = await ctx.data.runInTransaction(async () => {
    const result = await ctx.mdm.entity.update({
      mdmId: input.stockItemId,
      expectedVersion: entity.version,
      patch: {
        name: input.name,
        cafeFlow: {
          ...existingCafeFlow,
          unit: input.unit,
          minimumLevel: input.minimumLevel,
          updatedAt,
        },
      } as unknown as Record<string, unknown>,
    });
    return result;
  });

  const details = updated.details as unknown as Record<string, unknown>;
  const cafeFlow = (details.cafeFlow ?? {}) as Record<string, unknown>;

  // 7. Return the updated StockItem projection
  return {
    stockItemId: updated.mdmId,
    name: String(details.name ?? input.name),
    unit: String(cafeFlow.unit ?? input.unit),
    minimumLevel: Number(cafeFlow.minimumLevel ?? input.minimumLevel),
    updatedAt: String(cafeFlow.updatedAt ?? updatedAt),
  };
}
