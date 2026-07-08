/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.defs.ts" enhancement="_blank"/>

export const stockAdjustmentRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "StockAdjustmentRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StockAdjustment",
    "interfaceName": "IStockAdjustmentRepository",
    "methods": [
      {
        "name": "append",
        "returns": "void",
        "params": [
          "record: StockAdjustment"
        ]
      },
      {
        "name": "list",
        "returns": "StockAdjustment[]",
        "params": [
          "filter: StockAdjustmentListFilter"
        ]
      },
      {
        "name": "listByPeriod",
        "returns": "StockAdjustment[]",
        "params": [
          "start: Date",
          "end: Date"
        ]
      }
    ]
  }
} as const;

export default stockAdjustmentRepositoryPort;

export const pipeline = [
  {
    "id": "stockAdjustmentRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
