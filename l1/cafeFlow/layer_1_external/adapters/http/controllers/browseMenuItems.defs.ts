/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/browseMenuItems.defs.ts" enhancement="_blank"/>

export const browseMenuItemsController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "browseMenuItems",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "menuItemLifecycle",
    "controllerName": "BrowseMenuItemsController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowBrowseMenuItemsHandler",
        "command": "browseMenuItems",
        "usecaseRef": "browseMenuItems",
        "inputTypeName": "BrowseMenuItemsInput",
        "kind": "query",
        "inputContract": [
          {
            "inputId": "statusFilter",
            "fieldRef": "MenuItem.status",
            "required": false,
            "source": "userInput",
            "description": "Filtro opcional por status do item (draft, active, inactive) informado pelo gerente"
          },
          {
            "inputId": "menuCategoryIdFilter",
            "fieldRef": "MenuItem.menuCategoryId",
            "required": false,
            "source": "userInput",
            "description": "Filtro opcional por categoria do item informado pelo gerente"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "MenuItem.menuCategoryId",
            "source": "businessContext",
            "originRef": "businessContext.activeCompanyId",
            "description": "O backend resolve o escopo da consulta limitando os itens do cardápio à empresa ativa da sessão do gerente"
          }
        ],
        "accessPattern": {
          "kind": "list",
          "description": "",
          "entity": "MenuItem",
          "keyField": "MenuItem.menuItemId",
          "pagination": "optional",
          "selection": "none",
          "output": [
            "MenuItem.menuItemId",
            "MenuItem.name",
            "MenuItem.description",
            "MenuItem.menuCategoryId",
            "MenuItem.price",
            "MenuItem.itemType",
            "MenuItem.status",
            "MenuItem.activatedAt",
            "MenuItem.createdAt",
            "MenuItem.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.menuItemLifecycle.browseMenuItems",
        "handlerName": "cafeFlowBrowseMenuItemsHandler"
      }
    ]
  }
} as const;

export default browseMenuItemsController;

export const pipeline = [
  {
    "id": "browseMenuItems__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/browseMenuItems.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/browseMenuItems.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.d.ts"
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
