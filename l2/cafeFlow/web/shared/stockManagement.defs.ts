/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/stockManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "stockManagement",
  "pageName": "Gestão de estoque e alertas",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowStockManagementBase",
  "routePattern": "/cafeFlow/stockManagement/:stockItemId?",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:browseStockItems",
    "operation:manageStockItem"
  ],
  "operationIds": [
    "browseStockItems",
    "manageStockItem"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "stockManagement",
    "workspaceKind": "operation",
    "actor": "gerente",
    "entity": "StockItem",
    "owners": [
      {
        "kind": "operation",
        "id": "browseStockItems",
        "defPath": "_102051_/l4/operations/browseStockItems.defs.ts"
      },
      {
        "kind": "operation",
        "id": "manageStockItem",
        "defPath": "_102051_/l4/operations/manageStockItem.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "browseStockItems",
          "commandName": "browseStockItems",
          "steps": [
            "O gerente abre a tela de consulta de estoque",
            "O sistema lista todos os itens de estoque com nome, unidade de medida e limite mínimo",
            "O sistema compara a quantidade atual de cada item (StockLevel) com o mínimo configurado (StockItem.minimumLevel)",
            "Itens cuja quantidade atual está abaixo ou igual ao mínimo são destacados como alerta de estoque baixo",
            "O gerente pode filtrar a lista por nome para localizar um ingrediente específico"
          ]
        },
        {
          "operationId": "manageStockItem",
          "commandName": "manageStockItem",
          "steps": [
            "O gerente seleciona um item de estoque existente na lista de insumos cadastrados.",
            "O sistema carrega os dados atuais do item (nome, unidade, limite mínimo).",
            "O gerente edita os campos desejados e confirma a atualização.",
            "O sistema persiste os novos valores e atualiza o timestamp updatedAt."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102051_/l2/cafeFlow/web/contracts/stockManagement.defs.ts",
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/stockManagement.ts"
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.defs.ts",
    "layoutId": "page11-pos-workspace"
  },
  "states": [
    {
      "stateKey": "ui.stockManagement.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.action.browseStockItems.status",
      "name": "browseStockItemsState",
      "kind": "actionStatus",
      "actionRef": "browseStockItems",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm",
      "name": "browseStockItemsSearchTerm",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "browseStockItems",
        "direction": "input",
        "field": "searchTerm"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.data.browseStockItems",
      "name": "browseStockItemsData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "browseStockItems",
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
      "stateKey": "ui.stockManagement.action.manageStockItem.status",
      "name": "manageStockItemState",
      "kind": "actionStatus",
      "actionRef": "manageStockItem",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.stockManagement.input.manageStockItem.stockItemId",
      "name": "manageStockItemStockItemId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "manageStockItem",
        "direction": "input",
        "field": "stockItemId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.manageStockItem.name",
      "name": "manageStockItemName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "manageStockItem",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.manageStockItem.unit",
      "name": "manageStockItemUnit",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "manageStockItem",
        "direction": "input",
        "field": "unit"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.manageStockItem.minimumLevel",
      "name": "manageStockItemMinimumLevel",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "manageStockItem",
        "direction": "input",
        "field": "minimumLevel"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.output.manageStockItem",
      "name": "manageStockItemOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "manageStockItem",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.stockManagement.action.manageStockItem.error",
      "name": "manageStockItemError",
      "kind": "actionError",
      "actionRef": "manageStockItem",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "browseStockItems",
      "kind": "query",
      "commandRef": "browseStockItems",
      "routeKey": "cafeFlow.browseStockItems.browseStockItems",
      "purpose": "Consultar itens de estoque e alertas",
      "methodName": "loadBrowseStockItems",
      "handlerName": "handleBrowseStockItemsClick",
      "inputStateKeys": [
        "ui.stockManagement.input.browseStockItems.searchTerm"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.stockManagement.data.browseStockItems"
      ],
      "statusStateKey": "ui.stockManagement.action.browseStockItems.status"
    },
    {
      "actionId": "manageStockItem",
      "kind": "command",
      "commandRef": "manageStockItem",
      "routeKey": "cafeFlow.manageStockItem.manageStockItem",
      "purpose": "Gerenciar itens de estoque",
      "methodName": "manageStockItem",
      "handlerName": "handleManageStockItemClick",
      "inputStateKeys": [
        "ui.stockManagement.input.manageStockItem.stockItemId",
        "ui.stockManagement.input.manageStockItem.name",
        "ui.stockManagement.input.manageStockItem.unit",
        "ui.stockManagement.input.manageStockItem.minimumLevel"
      ],
      "routeParamInputStateKeys": [
        "ui.stockManagement.input.manageStockItem.stockItemId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.stockManagement.output.manageStockItem"
      ],
      "statusStateKey": "ui.stockManagement.action.manageStockItem.status",
      "errorStateKey": "ui.stockManagement.action.manageStockItem.error",
      "feedback": {
        "successMessageKey": "action.manageStockItem.success",
        "errorMessageKey": "action.manageStockItem.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.stockManagement.input.manageStockItem.name",
        "ui.stockManagement.input.manageStockItem.unit",
        "ui.stockManagement.input.manageStockItem.minimumLevel"
      ],
      "refreshActionIds": [
        "browseStockItems"
      ]
    },
    {
      "actionId": "set.browseStockItemsSearchTerm",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm",
      "methodName": "setBrowseStockItemsSearchTerm",
      "handlerName": "handleBrowseStockItemsSearchTermChange"
    },
    {
      "actionId": "set.manageStockItemStockItemId",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.manageStockItem.stockItemId",
      "methodName": "setManageStockItemStockItemId",
      "handlerName": "handleManageStockItemStockItemIdChange"
    },
    {
      "actionId": "set.manageStockItemName",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.manageStockItem.name",
      "methodName": "setManageStockItemName",
      "handlerName": "handleManageStockItemNameChange"
    },
    {
      "actionId": "set.manageStockItemUnit",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.manageStockItem.unit",
      "methodName": "setManageStockItemUnit",
      "handlerName": "handleManageStockItemUnitChange"
    },
    {
      "actionId": "set.manageStockItemMinimumLevel",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.manageStockItem.minimumLevel",
      "methodName": "setManageStockItemMinimumLevel",
      "handlerName": "handleManageStockItemMinimumLevelChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "browseStockItems",
      "stateKey": "ui.stockManagement.data.browseStockItems"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt",
      "en"
    ]
  },
  "i18n": {
    "page.stockManagement.title": "Gestão de estoque e alertas",
    "section.stockItems.title": "Itens de estoque",
    "section.stockItems.description": "Consultar itens de estoque e alertas de estoque baixo",
    "section.manageStockItem.title": "Gerenciar item",
    "section.manageStockItem.description": "Gerenciar dados do item selecionado",
    "column.stockItemId.label": "ID",
    "column.name.label": "Nome",
    "column.unit.label": "Unidade",
    "column.minimumLevel.label": "Limite mínimo",
    "column.createdAt.label": "Criado em",
    "column.updatedAt.label": "Atualizado em",
    "field.stockItemId.label": "ID do item",
    "field.name.label": "Nome",
    "field.unit.label": "Unidade",
    "field.minimumLevel.label": "Limite mínimo",
    "filter.searchTerm.label": "Buscar por nome",
    "action.browseStockItems.label": "Consultar",
    "action.select.label": "Editar",
    "action.manageStockItem.label": "Salvar alterações",
    "action.manageStockItem.success": "Item de estoque atualizado com sucesso",
    "action.manageStockItem.error": "Erro ao atualizar item de estoque",
    "empty.browseStockItems": "Nenhum item de estoque encontrado",
    "empty.manageStockItem": "Selecione um item de estoque na lista para editar",
    "sec.stock.items.title": "Sec stock items",
    "org.stock.items.table.title": "Listar itens de estoque com nome, unidade e limite mínimo, destacando alertas de estoque baixo",
    "sec.manage.stock.item.title": "Sec manage stock item",
    "org.stock.item.form.title": "Editar os dados de um item de estoque selecionado: nome, unidade de medida e limite mínimo",
    "section.stockQueue.title": "Itens de estoque",
    "section.review.title": "Resumo",
    "field.createdAt.label": "Criado em",
    "field.updatedAt.label": "Atualizado em",
    "field.searchTerm.label": "Buscar por nome",
    "action.selectItem.label": "Selecionar",
    "action.refresh.label": "Atualizar",
    "empty.stockQueue": "Nenhum item de estoque encontrado",
    "org.stockQueueTable.title": "Exibir fila de itens de estoque com alertas de estoque baixo, permitir busca por nome e seleção para edição",
    "org.manageStockItemForm.title": "Editar dados do item de estoque selecionado (nome, unidade, limite mínimo) e confirmar atualização",
    "org.reviewSummary.title": "Revisar o contexto e o resultado das ações principais da página",
    "page.title": "Gestão de estoque e alertas",
    "section.stockItemsList.title": "Itens de estoque",
    "section.stockItemDetailPanel.title": "Detalhes do item",
    "section.reviewSummary.title": "Resumo",
    "organism.stockItemsBrowser.title": "Consulta de estoque",
    "organism.stockItemManager.title": "Gerenciar item de estoque",
    "organism.actionSummary.title": "Resumo das ações",
    "intention.queryStockItems.title": "Lista de itens de estoque",
    "intention.manageStockItem.title": "Editar item de estoque",
    "intention.summary.title": "Resultado da operação",
    "toolbar.refresh.label": "Atualizar",
    "rowAction.selectItem.label": "Selecionar item",
    "empty.stockItems": "Nenhum item de estoque encontrado",
    "empty.noItemSelected": "Selecione um item de estoque na lista para editar",
    "empty.noActionsYet": "Nenhuma ação executada ainda",
    "org.stockItemsBrowser.title": "Listar e buscar itens de estoque com alertas de estoque baixo, usando lista como fallback acessível (sem dados espaciais disponíveis)",
    "org.stockItemManager.title": "Editar detalhes do item de estoque selecionado no painel lateral",
    "org.actionSummary.title": "Revisar o contexto e o resultado das ações principais da página"
  },
  "automation": {
    "statePrefix": "ui.stockManagement",
    "stateKeys": [
      "ui.stockManagement.status",
      "ui.stockManagement.action.browseStockItems.status",
      "ui.stockManagement.input.browseStockItems.searchTerm",
      "ui.stockManagement.data.browseStockItems",
      "ui.stockManagement.action.manageStockItem.status",
      "ui.stockManagement.input.manageStockItem.stockItemId",
      "ui.stockManagement.input.manageStockItem.name",
      "ui.stockManagement.input.manageStockItem.unit",
      "ui.stockManagement.input.manageStockItem.minimumLevel",
      "ui.stockManagement.output.manageStockItem",
      "ui.stockManagement.action.manageStockItem.error"
    ],
    "actionIds": [
      "browseStockItems",
      "manageStockItem",
      "set.browseStockItemsSearchTerm",
      "set.manageStockItemStockItemId",
      "set.manageStockItemName",
      "set.manageStockItemUnit",
      "set.manageStockItemMinimumLevel"
    ]
  }
};

export const pipeline = [
  {
    "id": "stockManagement__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/stockManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/stockManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/stockManagement.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "stockManagement__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
