/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageMenuItem.defs.ts" enhancement="_blank"/>

export const manageMenuItemController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "manageMenuItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "menuItemLifecycle",
    "controllerName": "ManageMenuItemController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowManageMenuItemHandler",
        "command": "manageMenuItem",
        "usecaseRef": "updateMenuItem",
        "inputTypeName": "UpdateMenuItemInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "menuItemId",
            "fieldRef": "MenuItem.menuItemId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador do item do cardápio selecionado para edição"
          },
          {
            "inputId": "name",
            "fieldRef": "MenuItem.name",
            "required": true,
            "source": "userInput",
            "description": "Nome do item do cardápio exibido no POS"
          },
          {
            "inputId": "description",
            "fieldRef": "MenuItem.description",
            "required": false,
            "source": "userInput",
            "description": "Descrição detalhada do item do cardápio"
          },
          {
            "inputId": "menuCategoryId",
            "fieldRef": "MenuItem.menuCategoryId",
            "required": true,
            "source": "userInput",
            "description": "Categoria de classificação à qual o item pertence"
          },
          {
            "inputId": "price",
            "fieldRef": "MenuItem.price",
            "required": true,
            "source": "userInput",
            "description": "Preço de venda do item do cardápio"
          },
          {
            "inputId": "itemType",
            "fieldRef": "MenuItem.itemType",
            "required": true,
            "source": "userInput",
            "description": "Tipo do item: deve ser 'simple' nesta fase"
          },
          {
            "inputId": "status",
            "fieldRef": "MenuItem.status",
            "required": true,
            "source": "userInput",
            "description": "Status do item: rascunho, ativo ou inativo"
          },
          {
            "inputId": "actorId",
            "fieldRef": "MenuItem.menuItemId",
            "required": true,
            "source": "actorSession",
            "description": "Identificador do gerente autenticado que realiza a alteração"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "MenuItem.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora da última atualização do registro"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "MenuItem.menuItemId",
            "source": "selectedEntity",
            "originRef": "MenuItem.menuItemId",
            "description": "O backend resolve o menuItemId a partir do item atualmente selecionado na tela de gestão de cardápio"
          },
          {
            "targetRef": "actorSession.actorId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "O backend obtém o identificador do gerente a partir da sessão autenticada do usuário"
          },
          {
            "targetRef": "MenuItem.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend atribui o timestamp atual do sistema ao campo updatedAt no momento da persistência"
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "MenuItem",
          "keyField": "MenuItem.menuItemId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "MenuItem.menuItemId",
            "MenuItem.name",
            "MenuItem.description",
            "MenuItem.menuCategoryId",
            "MenuItem.price",
            "MenuItem.itemType",
            "MenuItem.status",
            "MenuItem.activatedAt",
            "MenuItem.inactivatedAt",
            "MenuItem.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.menuItemLifecycle.manageMenuItem",
        "handlerName": "cafeFlowManageMenuItemHandler"
      }
    ]
  }
} as const;

export default manageMenuItemController;

export const pipeline = [
  {
    "id": "manageMenuItem__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageMenuItem.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/manageMenuItem.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.d.ts"
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
