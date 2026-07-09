/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/menuManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "menuManagement",
  "pageName": "Gestão de cardápio",
  "moduleName": "cafeFlow",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:menuItemLifecycle",
    "operation:browseMenuItems",
    "operation:manageMenuItem"
  ],
  "operationIds": [
    "browseMenuItems",
    "manageMenuItem"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "menuManagement",
    "workspaceKind": "workflow",
    "workflowId": "menuItemLifecycle",
    "actor": "gerente",
    "entity": "MenuItem",
    "owners": [
      {
        "kind": "workflow",
        "id": "menuItemLifecycle",
        "defPath": "_102051_/l4/workflows/menuItemLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "browseMenuItems",
        "defPath": "_102051_/l4/operations/browseMenuItems.defs.ts"
      },
      {
        "kind": "operation",
        "id": "manageMenuItem",
        "defPath": "_102051_/l4/operations/manageMenuItem.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "O gerente cria um novo item de cardápio definindo nome, categoria e preço de venda.",
        "O gerente vincula os ingredientes de estoque que o item consome para garantir a rastreabilidade de consumo.",
        "O gerente ativa o item para que ele fique disponível para lançamento no POS.",
        "O gerente pode inativar o item quando ele não deve mais aparecer no POS."
      ],
      "operations": [
        {
          "operationId": "browseMenuItems",
          "commandName": "browseMenuItems",
          "steps": [
            "O gerente abre a tela de gestão de cardápio.",
            "O sistema lista todos os itens do cardápio da empresa ativa com nome, categoria, preço, tipo e status.",
            "O gerente pode filtrar por status (rascunho, ativo, inativo) ou por categoria para localizar itens específicos."
          ]
        },
        {
          "operationId": "manageMenuItem",
          "commandName": "manageMenuItem",
          "steps": [
            "O gerente seleciona um item do cardápio na tela de gestão.",
            "O sistema carrega os dados atuais do item (nome, descrição, categoria, preço, tipo e status).",
            "O gerente edita os campos desejados e define o status (rascunho, ativo ou inativo).",
            "O sistema valida que o tipo do item é 'simple' e que, se for ativado, existe pelo menos um ingrediente de estoque vinculado.",
            "O sistema persiste as alterações atualizando updatedAt e, conforme o status, activatedAt ou inactivatedAt."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102051_/l2/cafeFlow/web/contracts/menuManagement.defs.ts",
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/menuManagement.ts"
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.defs.ts",
    "layoutId": "menuManagement.page11"
  },
  "states": [
    {
      "stateKey": "ui.menuManagement.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.action.browseMenuItems.status",
      "name": "browseMenuItemsState",
      "kind": "actionStatus",
      "actionRef": "browseMenuItems",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter",
      "name": "browseMenuItemsStatusFilter",
      "kind": "input",
      "contractRef": {
        "commandName": "browseMenuItems",
        "direction": "input",
        "field": "statusFilter"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter",
      "name": "browseMenuItemsMenuCategoryIdFilter",
      "kind": "input",
      "contractRef": {
        "commandName": "browseMenuItems",
        "direction": "input",
        "field": "menuCategoryIdFilter"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.data.browseMenuItems",
      "name": "browseMenuItemsData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "browseMenuItems",
        "direction": "output"
      },
      "outputShape": "paginated",
      "collection": false,
      "defaultValue": {
        "items": [],
        "total": 0
      }
    },
    {
      "stateKey": "ui.menuManagement.action.manageMenuItem.status",
      "name": "manageMenuItemState",
      "kind": "actionStatus",
      "actionRef": "manageMenuItem",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.menuManagement.input.manageMenuItem.name",
      "name": "manageMenuItemName",
      "kind": "input",
      "contractRef": {
        "commandName": "manageMenuItem",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.manageMenuItem.description",
      "name": "manageMenuItemDescription",
      "kind": "input",
      "contractRef": {
        "commandName": "manageMenuItem",
        "direction": "input",
        "field": "description"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId",
      "name": "manageMenuItemMenuCategoryId",
      "kind": "input",
      "contractRef": {
        "commandName": "manageMenuItem",
        "direction": "input",
        "field": "menuCategoryId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.manageMenuItem.price",
      "name": "manageMenuItemPrice",
      "kind": "input",
      "contractRef": {
        "commandName": "manageMenuItem",
        "direction": "input",
        "field": "price"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.manageMenuItem.itemType",
      "name": "manageMenuItemItemType",
      "kind": "input",
      "contractRef": {
        "commandName": "manageMenuItem",
        "direction": "input",
        "field": "itemType"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.manageMenuItem.status",
      "name": "manageMenuItemStatus",
      "kind": "input",
      "contractRef": {
        "commandName": "manageMenuItem",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.businessContext.activeCompanyId",
      "name": "activeCompanyId",
      "kind": "businessContext",
      "source": "businessContext.activeCompanyId",
      "targetRef": "MenuItem.menuCategoryId",
      "required": true,
      "selector": "company",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.output.manageMenuItem",
      "name": "OutputManageMenuItem",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.menuManagement.layout.ws20_activatedAt",
      "name": "LayoutWs20ActivatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.layout.ws30_inactivatedAt",
      "name": "LayoutWs30InactivatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.layout.r50_updatedAt",
      "name": "LayoutR50UpdatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "browseMenuItems",
      "kind": "query",
      "commandRef": "browseMenuItems",
      "routeKey": "cafeFlow.menuItemLifecycle.browseMenuItems",
      "purpose": "Consultar itens do cardápio",
      "methodName": "loadBrowseMenuItems",
      "handlerName": "handleBrowseMenuItemsClick",
      "inputStateKeys": [
        "ui.menuManagement.input.browseMenuItems.statusFilter",
        "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
      ],
      "outputStateKeys": [
        "ui.menuManagement.data.browseMenuItems"
      ],
      "statusStateKey": "ui.menuManagement.action.browseMenuItems.status"
    },
    {
      "actionId": "manageMenuItem",
      "kind": "command",
      "commandRef": "manageMenuItem",
      "routeKey": "cafeFlow.menuItemLifecycle.manageMenuItem",
      "purpose": "Gerenciar item do cardápio",
      "methodName": "manageMenuItem",
      "handlerName": "handleManageMenuItemClick",
      "inputStateKeys": [
        "ui.menuManagement.input.manageMenuItem.name",
        "ui.menuManagement.input.manageMenuItem.description",
        "ui.menuManagement.input.manageMenuItem.menuCategoryId",
        "ui.menuManagement.input.manageMenuItem.price",
        "ui.menuManagement.input.manageMenuItem.itemType",
        "ui.menuManagement.input.manageMenuItem.status"
      ],
      "outputStateKeys": [
        "ui.menuManagement.output.manageMenuItem"
      ],
      "statusStateKey": "ui.menuManagement.action.manageMenuItem.status",
      "refreshActionIds": [
        "browseMenuItems"
      ]
    },
    {
      "actionId": "set.browseMenuItemsStatusFilter",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter",
      "methodName": "setBrowseMenuItemsStatusFilter",
      "handlerName": "handleBrowseMenuItemsStatusFilterChange"
    },
    {
      "actionId": "set.browseMenuItemsMenuCategoryIdFilter",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter",
      "methodName": "setBrowseMenuItemsMenuCategoryIdFilter",
      "handlerName": "handleBrowseMenuItemsMenuCategoryIdFilterChange"
    },
    {
      "actionId": "set.manageMenuItemName",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.manageMenuItem.name",
      "methodName": "setManageMenuItemName",
      "handlerName": "handleManageMenuItemNameChange"
    },
    {
      "actionId": "set.manageMenuItemDescription",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.manageMenuItem.description",
      "methodName": "setManageMenuItemDescription",
      "handlerName": "handleManageMenuItemDescriptionChange"
    },
    {
      "actionId": "set.manageMenuItemMenuCategoryId",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId",
      "methodName": "setManageMenuItemMenuCategoryId",
      "handlerName": "handleManageMenuItemMenuCategoryIdChange"
    },
    {
      "actionId": "set.manageMenuItemPrice",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.manageMenuItem.price",
      "methodName": "setManageMenuItemPrice",
      "handlerName": "handleManageMenuItemPriceChange"
    },
    {
      "actionId": "set.manageMenuItemItemType",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.manageMenuItem.itemType",
      "methodName": "setManageMenuItemItemType",
      "handlerName": "handleManageMenuItemItemTypeChange"
    },
    {
      "actionId": "set.manageMenuItemStatus",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.manageMenuItem.status",
      "methodName": "setManageMenuItemStatus",
      "handlerName": "handleManageMenuItemStatusChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "browseMenuItems",
      "stateKey": "ui.menuManagement.data.browseMenuItems"
    }
  ],
  "businessContextRefs": [
    {
      "operationId": "browseMenuItems",
      "contextKey": "activeCompanyId",
      "originRef": "businessContext.activeCompanyId",
      "targetRef": "MenuItem.menuCategoryId",
      "required": true,
      "description": "O backend resolve o escopo da consulta limitando os itens do cardápio à empresa ativa da sessão do gerente"
    }
  ],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt",
      "en"
    ]
  },
  "i18n": {
    "menuManagement.queue.title": "Fila de itens do cardápio",
    "menuManagement.queue.list.title": "Itens do cardápio",
    "menuManagement.queue.query.title": "Lista de itens",
    "menuManagement.queue.summary.title": "Resumo do item selecionado",
    "menuManagement.detail.title": "Detalhes do item",
    "menuManagement.detail.form.title": "Atualizar item do cardápio",
    "menuManagement.detail.status.title": "Status atual",
    "menuManagement.detail.edit.title": "Editar item",
    "menuManagement.detail.review.title": "Revisão das alterações",
    "menuManagement.context.title": "Empresa ativa",
    "menuManagement.menuItem.name": "Nome",
    "menuManagement.menuItem.description": "Descrição",
    "menuManagement.menuItem.menuCategoryId": "Categoria",
    "menuManagement.menuItem.price": "Preço",
    "menuManagement.menuItem.itemType": "Tipo",
    "menuManagement.menuItem.status": "Status",
    "menuManagement.menuItem.activatedAt": "Ativado em",
    "menuManagement.menuItem.inactivatedAt": "Inativado em",
    "menuManagement.menuItem.updatedAt": "Atualizado em",
    "menuManagement.filter.status": "Status",
    "menuManagement.filter.menuCategory": "Categoria",
    "menuManagement.action.refresh": "Atualizar lista",
    "menuManagement.action.manage": "Gerenciar item",
    "menuManagement.action.save": "Salvar alterações",
    "menuManagement.board.title": "Pipeline de status",
    "menuManagement.board.lanes.title": "Itens por status",
    "menuManagement.board.query.title": "Cartões do cardápio",
    "menuManagement.board.summary.title": "Resumo do cartão",
    "menuManagement.cards.title": "Cartões de itens do cardápio",
    "menuManagement.cards.list.title": "Itens do cardápio",
    "menuManagement.cards.query.title": "Cartões do cardápio",
    "menuManagement.cards.summary.title": "Resumo do cartão"
  },
  "automation": {
    "statePrefix": "ui.menuManagement",
    "stateKeys": [
      "ui.menuManagement.status",
      "ui.menuManagement.action.browseMenuItems.status",
      "ui.menuManagement.input.browseMenuItems.statusFilter",
      "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter",
      "ui.menuManagement.data.browseMenuItems",
      "ui.menuManagement.action.manageMenuItem.status",
      "ui.menuManagement.input.manageMenuItem.name",
      "ui.menuManagement.input.manageMenuItem.description",
      "ui.menuManagement.input.manageMenuItem.menuCategoryId",
      "ui.menuManagement.input.manageMenuItem.price",
      "ui.menuManagement.input.manageMenuItem.itemType",
      "ui.menuManagement.input.manageMenuItem.status",
      "ui.menuManagement.businessContext.activeCompanyId",
      "ui.menuManagement.output.manageMenuItem",
      "ui.menuManagement.layout.ws20_activatedAt",
      "ui.menuManagement.layout.ws30_inactivatedAt",
      "ui.menuManagement.layout.r50_updatedAt"
    ],
    "actionIds": [
      "browseMenuItems",
      "manageMenuItem",
      "set.browseMenuItemsStatusFilter",
      "set.browseMenuItemsMenuCategoryIdFilter",
      "set.manageMenuItemName",
      "set.manageMenuItemDescription",
      "set.manageMenuItemMenuCategoryId",
      "set.manageMenuItemPrice",
      "set.manageMenuItemItemType",
      "set.manageMenuItemStatus"
    ]
  }
};

export const pipeline = [
  {
    "id": "menuManagement__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/menuManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/menuManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/menuManagement.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "menuManagement__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
