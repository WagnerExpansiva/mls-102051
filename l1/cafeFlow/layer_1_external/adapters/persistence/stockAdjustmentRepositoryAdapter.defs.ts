/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const stockAdjustmentRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "StockAdjustmentRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "StockAdjustmentRepository",
    "entityId": "StockAdjustment",
    "portRef": "IStockAdjustmentRepository",
    "tableRef": "stock_adjustments",
    "mdmReads": [],
    "notes": [
      "Real columns (snake_case): stock_adjustment_id, stock_item_id, status, created_at.",
      "Details JSONB fields: quantity, reason, voidedAt, voidedReason.",
      "Append-only event adapter: insert row only; no update or delete operations.",
      "Uses ctx.data.moduleData.stock_adjustments for append."
    ]
  }
} as const;

export default stockAdjustmentRepositoryAdapter;

export const pipeline = [
  {
    "id": "stockAdjustmentRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryAdapter.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
