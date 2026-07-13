/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevelRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const stockLevelRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "StockLevelRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "StockLevelRepository",
    "entityId": "StockLevel",
    "portRef": "IStockLevelRepository",
    "tableRef": "stock_levels",
    "mdmReads": [
      "StockItem"
    ],
    "notes": [
      "Real columns (snake_case): stock_level_id, stock_item_id, unit, created_at.",
      "Details JSONB fields: currentQuantity, minimumLevel, lastDecrementAt, lastAdjustmentAt, updatedAt.",
      "MDM ref StockItem resolved via ctx.mdm.collection.getMany/hydrateMany using stock_item_id; never call ctx.mdm.entity.get inside a loop.",
      "Uses ctx.data.moduleData.stock_levels for CRUD."
    ]
  }
} as const;

export default stockLevelRepositoryAdapter;

export const pipeline = [
  {
    "id": "stockLevelRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevelRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevelRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevel.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.d.ts"
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
