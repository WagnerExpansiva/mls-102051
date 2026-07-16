/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.defs.ts" enhancement="_blank"/>

export const stockConsumptionRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "StockConsumptionRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StockConsumption",
    "interfaceName": "IStockConsumptionRepository",
    "methods": [
      {
        "name": "append",
        "returns": "void",
        "params": [
          "consumption: StockConsumption"
        ]
      },
      {
        "name": "listByOwnerId",
        "returns": "StockConsumption[]",
        "params": [
          "orderId: OrderId"
        ]
      },
      {
        "name": "listByPeriod",
        "returns": "StockConsumption[]",
        "params": [
          "period: DateRange"
        ]
      },
      {
        "name": "listByProductId",
        "returns": "StockConsumption[]",
        "params": [
          "productId: ProductId"
        ]
      }
    ]
  }
} as const;

export default stockConsumptionRepositoryPort;

export const pipeline = [
  {
    "id": "stockConsumptionRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
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
