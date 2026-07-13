/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface UpdateStockItemInput {
  stockItemId: string;
  name: string;
  unit: string;
  minimumLevel: number;
}

export interface UpdateStockItemOutput {
  stockItemId: string;
  name: string;
  unit: string;
  minimumLevel: number;
  updatedAt: string;
}

const VALID_UNITS = ['kg', 'liter', 'portion', 'unit'];

/**
 * Updates a StockItem (MDM master-data record) with new cadastral fields.
 * The StockItem lives in the shared MDM store — there is no local port or table.
 */
export async function updateStockItem(
  ctx: RequestContext,
  input: UpdateStockItemInput,
): Promise<UpdateStockItemOutput> {
  // ── Step 1: Validate input fields ──────────────────────────────────────────
  if (!input.name || input.name.trim().length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'name não pode ser vazio.',
      400,
      { field: 'name' },
    );
  }

  if (!VALID_UNITS.includes(input.unit)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `unit deve ser um dos valores: ${VALID_UNITS.join(', ')}.`,
      400,
      { field: 'unit', value: input.unit },
    );
  }

  // ── Step 4: Rule lowStockAlertCalculation — minimumLevel must be >= 0 ───────
  if (typeof input.minimumLevel !== 'number' || input.minimumLevel < 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'minimumLevel deve ser um número não-negativo (regra lowStockAlertCalculation).',
      400,
      { ruleId: 'lowStockAlertCalculation', field: 'minimumLevel', value: input.minimumLevel },
    );
  }

  // ── Step 2-3: Load existing StockItem via MDM (throws NOT_FOUND if missing) ─
  const existing = await ctx.mdm.entity.get({ mdmId: input.stockItemId });

  // ── Step 5: System timestamp (systemDefault — not public input) ────────────
  const updatedAt = ctx.clock.nowIso();

  // Preserve existing module-specific fields and merge updates
  const existingDetails = existing.details as unknown as Record<string, unknown>;
  const existingCafeFlow = (existingDetails.cafeFlow ?? {}) as Record<string, unknown>;

  // ── Step 6: Update StockItem via MDM facade ─────────────────────────────────
  const updated = await ctx.mdm.entity.update({
    mdmId: input.stockItemId,
    expectedVersion: existing.version,
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

  // ── Step 7: Return updated fields ───────────────────────────────────────────
  const updatedDetails = updated.details as unknown as Record<string, unknown>;
  const updatedCafeFlow = (updatedDetails.cafeFlow ?? {}) as Record<string, unknown>;

  return {
    stockItemId: input.stockItemId,
    name: String(updatedDetails.name ?? input.name),
    unit: String(updatedCafeFlow.unit ?? input.unit),
    minimumLevel: Number(updatedCafeFlow.minimumLevel ?? input.minimumLevel),
    updatedAt,
  };
}
