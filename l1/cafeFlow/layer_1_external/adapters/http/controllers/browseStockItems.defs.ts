/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/browseStockItems.defs.ts" enhancement="_blank"/>

export const browseStockItemsController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "browseStockItems",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "browseStockItems",
    "controllerName": "BrowseStockItemsController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowBrowseStockItemsHandler",
        "command": "browseStockItems",
        "usecaseRef": "browseStockItems",
        "inputTypeName": "BrowseStockItemsInput",
        "kind": "query",
        "inputContract": [
          {
            "inputId": "searchTerm",
            "fieldRef": "StockItem.name",
            "required": false,
            "source": "userInput",
            "description": "Termo de busca opcional para filtrar itens de estoque pelo nome."
          },
          {
            "inputId": "actorId",
            "fieldRef": "StockItem.stockItemId",
            "required": true,
            "source": "actorSession",
            "description": "Identificador do gerente autenticado que está consultando o estoque."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "StockItem.stockItemId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "O backend extrai o actorId da sessão autenticada do gerente para autorizar o acesso à lista de itens de estoque."
          }
        ],
        "accessPattern": {
          "kind": "list",
          "description": "",
          "entity": "StockItem",
          "keyField": "StockItem.stockItemId",
          "pagination": "optional",
          "selection": "none",
          "output": [
            "StockItem.stockItemId",
            "StockItem.name",
            "StockItem.unit",
            "StockItem.minimumLevel",
            "StockItem.createdAt",
            "StockItem.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.browseStockItems.browseStockItems",
        "handlerName": "cafeFlowBrowseStockItemsHandler"
      }
    ]
  }
} as const;

export default browseStockItemsController;

export const pipeline = [
  {
    "id": "browseStockItems__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/browseStockItems.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/browseStockItems.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
