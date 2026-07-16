/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/menuManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "menuManagement",
  "pageName": "Gestão de cardápio",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowMenuManagementBase",
  "routePattern": "/cafeFlow/menuManagement",
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
    "layoutId": "menuManagement_page11_workflow_queue"
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
      "source": "userInput",
      "presentation": "form",
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
      "source": "userInput",
      "presentation": "form",
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
      "stateKey": "ui.menuManagement.input.manageMenuItem.menuItemId",
      "name": "manageMenuItemMenuItemId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "manageMenuItem",
        "direction": "input",
        "field": "menuItemId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.manageMenuItem.name",
      "name": "manageMenuItemName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
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
      "source": "userInput",
      "presentation": "form",
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
      "source": "userInput",
      "presentation": "form",
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
      "source": "userInput",
      "presentation": "form",
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
      "source": "userInput",
      "presentation": "form",
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
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "manageMenuItem",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.output.manageMenuItem",
      "name": "manageMenuItemOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "manageMenuItem",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.menuManagement.action.manageMenuItem.error",
      "name": "manageMenuItemError",
      "kind": "actionError",
      "actionRef": "manageMenuItem",
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
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
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
        "ui.menuManagement.input.manageMenuItem.menuItemId",
        "ui.menuManagement.input.manageMenuItem.name",
        "ui.menuManagement.input.manageMenuItem.description",
        "ui.menuManagement.input.manageMenuItem.menuCategoryId",
        "ui.menuManagement.input.manageMenuItem.price",
        "ui.menuManagement.input.manageMenuItem.itemType",
        "ui.menuManagement.input.manageMenuItem.status"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.menuManagement.input.manageMenuItem.menuItemId"
      ],
      "outputStateKeys": [
        "ui.menuManagement.output.manageMenuItem"
      ],
      "statusStateKey": "ui.menuManagement.action.manageMenuItem.status",
      "errorStateKey": "ui.menuManagement.action.manageMenuItem.error",
      "feedback": {
        "successMessageKey": "action.manageMenuItem.success",
        "errorMessageKey": "action.manageMenuItem.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.menuManagement.input.manageMenuItem.menuItemId",
        "ui.menuManagement.input.manageMenuItem.name",
        "ui.menuManagement.input.manageMenuItem.description",
        "ui.menuManagement.input.manageMenuItem.menuCategoryId",
        "ui.menuManagement.input.manageMenuItem.price",
        "ui.menuManagement.input.manageMenuItem.itemType",
        "ui.menuManagement.input.manageMenuItem.status"
      ],
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
      "actionId": "set.manageMenuItemMenuItemId",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.manageMenuItem.menuItemId",
      "methodName": "setManageMenuItemMenuItemId",
      "handlerName": "handleManageMenuItemMenuItemIdChange"
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
    "section.queue.title": "Fila de itens do cardápio",
    "section.execute.title": "Gerenciar item",
    "section.review.title": "Resultado da operação",
    "organism.queue.title": "Itens do cardápio",
    "organism.form.title": "Editar item do cardápio",
    "organism.feedback.title": "Feedback da operação",
    "intention.queryList.title": "Consultar itens do cardápio",
    "intention.commandForm.title": "Gerenciar item do cardápio",
    "intention.summary.title": "Resumo da operação",
    "field.menuItemId.label": "ID do Item",
    "field.name.label": "Nome",
    "field.description.label": "Descrição",
    "field.menuCategoryId.label": "Categoria",
    "field.price.label": "Preço",
    "field.itemType.label": "Tipo",
    "field.status.label": "Status",
    "field.activatedAt.label": "Ativado em",
    "field.createdAt.label": "Criado em",
    "field.updatedAt.label": "Atualizado em",
    "filter.statusFilter.label": "Filtrar por Status",
    "filter.menuCategoryIdFilter.label": "Filtrar por Categoria",
    "action.refresh.label": "Atualizar",
    "action.select.label": "Selecionar para gestão",
    "action.submit.label": "Salvar alterações",
    "empty.queue": "Nenhum item do cardápio encontrado. Ajuste os filtros ou crie um novo item.",
    "empty.form.noSelection": "Selecione um item do cardápio na fila acima para gerenciar seus dados.",
    "empty.summary": "Nenhuma operação realizada ainda. Selecione um item e salve as alterações para ver o resultado aqui.",
    "action.manageMenuItem.success": "Item do cardápio salvo com sucesso.",
    "action.manageMenuItem.error": "Erro ao salvar item do cardápio.",
    "organism.menuItemsQueue.title": "Listar itens do cardápio da empresa ativa com filtros por status e categoria, permitindo seleção para gestão",
    "organism.manageItemForm.title": "Formulário de gestão do item do cardápio selecionado, permitindo editar campos e definir status do ciclo de vida",
    "organism.operationFeedback.title": "Exibir feedback textual da operação de gestão de item do cardápio",
    "section.menuItems.title": "Itens do Cardápio",
    "section.menuItems.empty": "Nenhum item encontrado. Ajuste os filtros ou crie um novo item.",
    "section.manageMenuItem.title": "Gerenciar Item",
    "section.manageMenuItem.empty": "Selecione um item da lista para editar ou crie um novo item.",
    "column.name.label": "Nome",
    "column.menuCategoryId.label": "Categoria",
    "column.price.label": "Preço",
    "column.itemType.label": "Tipo",
    "column.status.label": "Status",
    "action.selectItem.label": "Selecionar",
    "action.save.label": "Salvar Alterações",
    "action.activate.label": "Ativar Item",
    "action.inactivate.label": "Inativar Item",
    "action.newItem.label": "Novo Item",
    "sec.menu.items.title": "Sec menu items",
    "org.menu.items.list.title": "Listar itens do cardápio da empresa ativa com filtros por status e categoria, permitindo seleção para edição",
    "sec.manage.item.title": "Sec manage item",
    "org.menu.item.form.title": "Editar dados do item selecionado e realizar transições de status (ativar/inativar) com ações contextuais"
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
      "ui.menuManagement.input.manageMenuItem.menuItemId",
      "ui.menuManagement.input.manageMenuItem.name",
      "ui.menuManagement.input.manageMenuItem.description",
      "ui.menuManagement.input.manageMenuItem.menuCategoryId",
      "ui.menuManagement.input.manageMenuItem.price",
      "ui.menuManagement.input.manageMenuItem.itemType",
      "ui.menuManagement.input.manageMenuItem.status",
      "ui.menuManagement.output.manageMenuItem",
      "ui.menuManagement.action.manageMenuItem.error",
      "ui.menuManagement.businessContext.activeCompanyId"
    ],
    "actionIds": [
      "browseMenuItems",
      "manageMenuItem",
      "set.browseMenuItemsStatusFilter",
      "set.browseMenuItemsMenuCategoryIdFilter",
      "set.manageMenuItemMenuItemId",
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
