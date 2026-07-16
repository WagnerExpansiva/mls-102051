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
    "className": "StockLevelRepositoryAdapter",
    "entityId": "StockLevel",
    "portRef": "IStockLevelRepository",
    "tableRef": "stock_levels",
    "mdmReads": [
      "StockItem"
    ],
    "notes": [
      "Domain aggregate StockLevel <-> stock_levels table row",
      "Real columns: stock_level_id, stock_item_id, unit, created_at",
      "details JSONB contains: currentQuantity, minimumLevel, lastDecrementAt, lastAdjustmentAt, updatedAt",
      "MDM ref StockItem resolved via ctx.mdm.collection.getMany/hydrateMany using stock_item_id (bulk load, never in loop)",
      "Uses ctx.data.moduleData.stock_levels"
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
