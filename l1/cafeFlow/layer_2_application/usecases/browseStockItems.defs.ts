/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.defs.ts" enhancement="_blank"/>

export const browseStockItemsUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "browseStockItems",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "browseStockItems",
    "ports": [
      "StockLevel"
    ],
    "functions": [
      {
        "functionName": "browseStockItems",
        "inputTypeName": "BrowseStockItemsInput",
        "outputTypeName": "BrowseStockItemsOutput",
        "input": [
          {
            "name": "searchTerm",
            "type": "string",
            "required": false,
            "description": "Termo de busca opcional para filtrar itens de estoque pelo nome."
          }
        ],
        "output": [
          {
            "name": "items",
            "type": "array",
            "required": true,
            "description": "Lista de itens de estoque com nome, unidade, limite mínimo, quantidade atual e flag de alerta de estoque baixo.",
            "ofEntity": "StockItem"
          },
          {
            "name": "total",
            "type": "number",
            "required": true,
            "description": "Número total de itens retornados na lista."
          }
        ],
        "ports": [
          "StockLevel"
        ],
        "rulesApplied": [
          "lowStockAlertCalculation"
        ],
        "transactional": false,
        "steps": [
          "1. Resolver o actorId a partir de ctx.sessionContext para autorização do gerente autenticado.",
          "2. Listar todos os StockItems do MDM via ctx.mdm.collection.listByType({ type: 'StockItem' }).",
          "3. Se searchTerm foi informado, filtrar os itens cujo name contém o termo (case-insensitive).",
          "4. Ordenar os itens resultantes por name em ordem ascendente.",
          "5. Coletar todos os stockItemId dos itens filtrados e buscar os StockLevels correspondentes em lote através da porta StockLevel (list/find by stockItemId).",
          "6. Para cada StockItem, localizar seu StockLevel correspondente e aplicar a regra lowStockAlertCalculation: se currentQuantity <= minimumLevel, marcar lowStockAlert = true; caso contrário false.",
          "7. Montar a lista de saída com stockItemId, name, unit, minimumLevel, createdAt, updatedAt, currentQuantity e lowStockAlert para cada item.",
          "8. Retornar { items, total } onde total é o número de itens na lista."
        ]
      }
    ],
    "mdmRefs": [
      "StockItem"
    ]
  }
} as const;

export default browseStockItemsUsecase;

export const pipeline = [
  {
    "id": "browseStockItems__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
