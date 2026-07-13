/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.defs.ts" enhancement="_blank"/>

export const stockLevelRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "StockLevelRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StockLevel",
    "interfaceName": "IStockLevelRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "StockLevel",
        "params": [
          "productId: ProductId"
        ]
      },
      {
        "name": "list",
        "returns": "StockLevel[]",
        "params": [
          "filter: StockLevelFilter"
        ]
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "stockLevel: StockLevel"
        ]
      },
      {
        "name": "findBelowMinimum",
        "returns": "StockLevel[]",
        "params": []
      },
      {
        "name": "findByLocation",
        "returns": "StockLevel[]",
        "params": [
          "location: Location"
        ]
      }
    ]
  }
} as const;

export default stockLevelRepositoryPort;

export const pipeline = [
  {
    "id": "stockLevelRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.d.ts"
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
