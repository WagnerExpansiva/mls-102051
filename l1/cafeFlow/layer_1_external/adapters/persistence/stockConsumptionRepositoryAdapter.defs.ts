/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumptionRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const stockConsumptionRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "StockConsumptionRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "StockConsumptionRepositoryAdapter",
    "entityId": "StockConsumption",
    "portRef": "IStockConsumptionRepository",
    "tableRef": "stock_consumptions",
    "mdmReads": [],
    "notes": [
      "Domain StockConsumption <-> stock_consumptions row via ctx.data.moduleData (append-only event adapter)",
      "Real columns snake_case: stock_consumption_id, stock_item_id, order_id, status, created_at",
      "details JSONB: quantity, voidedAt, voidReason",
      "Append-only: insert row only, no update/delete; exposes finder/read methods",
      "No MDM refs"
    ]
  }
} as const;

export default stockConsumptionRepositoryAdapter;

export const pipeline = [
  {
    "id": "stockConsumptionRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumptionRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumptionRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumption.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
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
