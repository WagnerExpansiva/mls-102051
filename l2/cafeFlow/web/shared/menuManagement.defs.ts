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
    "layoutId": "page11"
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
      "stateKey": "ui.menuManagement.layout.fld-activatedAt",
      "name": "LayoutFldActivatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.layout.fld-inactivatedAt",
      "name": "LayoutFldInactivatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.layout.fld-updatedAt",
      "name": "LayoutFldUpdatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.layout.fld-createdAt",
      "name": "LayoutFldCreatedAt",
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
    "page.title": "Gestão de cardápio",
    "section.queue": "Fila de itens do cardápio",
    "section.details": "Detalhes do item",
    "section.context": "Empresa ativa",
    "org.browse.title": "Consultar itens do cardápio",
    "org.manage.title": "Gerenciar item do cardápio",
    "intent.queue.list.title": "Itens do cardápio",
    "intent.queue.filters.title": "Filtros",
    "intent.context.badge.title": "Contexto da empresa",
    "intent.manage.form.title": "Dados do item",
    "intent.manage.status.title": "Status e disponibilidade",
    "intent.manage.summary.title": "Resumo do item",
    "field.statusFilter": "Status",
    "field.menuCategoryIdFilter": "Categoria",
    "column.name": "Nome",
    "column.menuCategoryId": "Categoria",
    "column.price": "Preço",
    "column.itemType": "Tipo",
    "column.status": "Status",
    "column.updatedAt": "Atualizado em",
    "action.browseMenuItems": "Atualizar lista",
    "field.name": "Nome",
    "field.description": "Descrição",
    "field.menuCategoryId": "Categoria",
    "field.price": "Preço de venda",
    "field.itemType": "Tipo do item",
    "field.status": "Status",
    "field.activatedAt": "Ativado em",
    "field.inactivatedAt": "Inativado em",
    "field.updatedAt": "Atualizado em",
    "field.createdAt": "Criado em",
    "action.manageMenuItem": "Salvar alterações",
    "empty.queue": "Nenhum item de cardápio encontrado",
    "section.board": "Pipeline de itens do cardápio",
    "intent.board.title": "Itens por status",
    "intent.board.filters.title": "Filtros",
    "empty.board": "Nenhum item nesta coluna",
    "section.cards": "Itens do cardápio",
    "intent.cards.list.title": "Lista de itens",
    "intent.cards.filters.title": "Filtros",
    "empty.cards": "Nenhum item encontrado"
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
      "ui.menuManagement.layout.fld-activatedAt",
      "ui.menuManagement.layout.fld-inactivatedAt",
      "ui.menuManagement.layout.fld-updatedAt",
      "ui.menuManagement.layout.fld-createdAt"
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
