/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageStockItem.defs.ts" enhancement="_blank"/>

export const manageStockItemController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "manageStockItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "manageStockItem",
    "controllerName": "ManageStockItemController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowManageStockItemHandler",
        "command": "manageStockItem",
        "usecaseRef": "manageStockItem",
        "inputTypeName": "ManageStockItemInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "stockItemId",
            "fieldRef": "StockItem.stockItemId",
            "required": true,
            "source": "routeParam",
            "description": "Identificador do item de estoque a ser atualizado, obtido da rota de edição."
          },
          {
            "inputId": "name",
            "fieldRef": "StockItem.name",
            "required": true,
            "source": "userInput",
            "description": "Nome do ingrediente editado pelo gerente."
          },
          {
            "inputId": "unit",
            "fieldRef": "StockItem.unit",
            "required": true,
            "source": "userInput",
            "description": "Unidade de medida do ingrediente (kg, liter, portion ou unit)."
          },
          {
            "inputId": "minimumLevel",
            "fieldRef": "StockItem.minimumLevel",
            "required": true,
            "source": "userInput",
            "description": "Quantidade mínima configurada para disparar o alerta de estoque baixo."
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "StockItem.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora da última atualização do item de estoque."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "StockItem.stockItemId",
            "source": "routeParam",
            "originRef": "routeParam.stockItemId",
            "description": "O backend extrai o identificador do item de estoque do parâmetro de rota da tela de edição."
          },
          {
            "targetRef": "StockItem.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend atribui automaticamente o timestamp atual no momento da persistência da atualização."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "StockItem",
          "keyField": "StockItem.stockItemId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "StockItem.stockItemId",
            "StockItem.name",
            "StockItem.unit",
            "StockItem.minimumLevel",
            "StockItem.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.manageStockItem.manageStockItem",
        "handlerName": "cafeFlowManageStockItemHandler"
      }
    ]
  }
} as const;

export default manageStockItemController;

export const pipeline = [
  {
    "id": "manageStockItem__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageStockItem.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageStockItem.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.d.ts"
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
