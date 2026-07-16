/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "stockManagement",
  "pageName": "Gestão de estoque e alertas",
  "baseClassName": "CafeFlowStockManagementBase",
  "actor": "gerente",
  "purpose": "Executar Gestão de estoque e alertas.",
  "capabilities": [
    "browseStockItems",
    "manageStockItem"
  ],
  "flowRefs": {
    "experienceFlows": [],
    "entityLifecycles": [],
    "taskWorkflows": [],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
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
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "stockItemsSection",
      "type": "section",
      "sectionName": "Itens de estoque",
      "titleKey": "section.stockItems.title",
      "mode": "main",
      "order": 1,
      "organisms": [
        {
          "id": "stockItemsList",
          "type": "organism",
          "organismName": "StockItemsList",
          "titleKey": "stockItemsList.title",
          "purpose": "Display all stock items with name, unit, minimum level and timestamps; highlight low-stock alerts; allow search by name and row selection for editing",
          "userActions": [
            "browseStockItems"
          ],
          "requiredEntities": [
            "StockItem",
            "StockLevel"
          ],
          "readsFields": [
            "stockItemId",
            "name",
            "unit",
            "minimumLevel",
            "createdAt",
            "updatedAt",
            "searchTerm"
          ],
          "writesFields": [],
          "rulesApplied": [
            "Low-stock alert: items whose StockLevel.currentQuantity <= StockItem.minimumLevel are visually highlighted",
            "Search filter applies to item name"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "browseStockItems",
              "intent": "query",
              "stateKey": "ui.stockManagement.data.browseStockItems",
              "action": "browseStockItems",
              "submitAction": "browseStockItems",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "stockItemEditSection",
      "type": "section",
      "sectionName": "Editar item de estoque",
      "titleKey": "section.editItem.title",
      "mode": "detail",
      "order": 2,
      "organisms": [
        {
          "id": "stockItemEditor",
          "type": "organism",
          "organismName": "StockItemEditor",
          "titleKey": "stockItemEditor.title",
          "purpose": "Contextual edit panel for the selected stock item — manager updates name, unit and minimum level, then saves",
          "userActions": [
            "manageStockItem"
          ],
          "requiredEntities": [
            "StockItem"
          ],
          "readsFields": [
            "stockItemId",
            "name",
            "unit",
            "minimumLevel"
          ],
          "writesFields": [
            "stockItemId",
            "name",
            "unit",
            "minimumLevel"
          ],
          "rulesApplied": [
            "stockItemId is context-derived from row selection, never manually typed",
            "On success, browseStockItems is refreshed and form fields are cleared",
            "createdAt and updatedAt are system-owned, never editable"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "manageStockItem",
              "intent": "command",
              "stateKey": "ui.stockManagement.action.manageStockItem.status",
              "action": "manageStockItem",
              "submitAction": "manageStockItem",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "goal_first",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "pageObjective": {
    "actor": "Cafe manager (back-office)",
    "jobToBeDone": "Monitor stock levels, identify low-stock items, and update stock item configurations (name, unit, minimum level) without leaving the page",
    "primaryDecision": "Identify which stock items need attention and update their minimum level or attributes inline",
    "decisiveInfo": [
      "name",
      "unit",
      "minimumLevel"
    ],
    "usageFrequency": "occasional/back-office — daily, a few times per day",
    "criticalActions": [
      {
        "action": "browseStockItems",
        "presentation": "master-list-with-search-and-low-stock-highlighting"
      },
      {
        "action": "manageStockItem",
        "presentation": "contextual-detail-form-for-selected-row"
      }
    ],
    "informationHierarchy": [
      "Stock items list with low-stock alerts highlighted (master)",
      "Search/filter by name to locate a specific ingredient",
      "Contextual edit panel for the selected item with name, unit, minimumLevel (detail)"
    ],
    "successCriteria": "Manager can see all stock items at a glance, identify low-stock alerts visually, search for a specific item by name, and update its configuration inline without page navigation",
    "antiPatterns": [
      "Separate edit form page requiring navigation",
      "Manually typing stockItemId",
      "Showing createdAt or updatedAt as editable inputs",
      "Free status select for stock levels instead of derived alerts"
    ]
  },
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "stockItemsSection",
        "type": "section",
        "sectionName": "Itens de estoque",
        "titleKey": "section.stockItems.title",
        "mode": "main",
        "order": 1,
        "organisms": [
          {
            "id": "stockItemsList",
            "type": "organism",
            "organismName": "StockItemsList",
            "titleKey": "stockItemsList.title",
            "purpose": "Display all stock items with name, unit, minimum level and timestamps; highlight low-stock alerts; allow search by name and row selection for editing",
            "userActions": [
              "browseStockItems"
            ],
            "requiredEntities": [
              "StockItem",
              "StockLevel"
            ],
            "readsFields": [
              "stockItemId",
              "name",
              "unit",
              "minimumLevel",
              "createdAt",
              "updatedAt",
              "searchTerm"
            ],
            "writesFields": [],
            "rulesApplied": [
              "Low-stock alert: items whose StockLevel.currentQuantity <= StockItem.minimumLevel are visually highlighted",
              "Search filter applies to item name"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "browseStockItems",
                "intent": "query",
                "order": 1,
                "titleKey": "section.stockItems.title",
                "source": "ui.stockManagement.data.browseStockItems",
                "binding": "browseStockItems",
                "action": "browseStockItems",
                "submitAction": "browseStockItems",
                "emptyKey": "section.stockItems.empty",
                "displayHint": "master-detail",
                "stateKey": "ui.stockManagement.data.browseStockItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col-stockItemId",
                    "field": "stockItemId",
                    "labelKey": "column.stockItemId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "format": "id",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-name",
                    "field": "name",
                    "labelKey": "column.name.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-unit",
                    "field": "unit",
                    "labelKey": "column.unit.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "column.minimumLevel.label",
                    "order": 4,
                    "required": false,
                    "inputType": "number",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "column.updatedAt.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  }
                ],
                "filters": [
                  {
                    "id": "filter-searchTerm",
                    "field": "searchTerm",
                    "labelKey": "filter.searchTerm.label",
                    "order": 1,
                    "required": false,
                    "inputType": "search",
                    "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm"
                  }
                ],
                "toolbar": [
                  {
                    "id": "toolbar-refresh",
                    "action": "browseStockItems",
                    "labelKey": "action.browseStockItems.label",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "browseStockItems"
                  }
                ],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      },
      {
        "id": "stockItemEditSection",
        "type": "section",
        "sectionName": "Editar item de estoque",
        "titleKey": "section.editItem.title",
        "mode": "detail",
        "order": 2,
        "organisms": [
          {
            "id": "stockItemEditor",
            "type": "organism",
            "organismName": "StockItemEditor",
            "titleKey": "stockItemEditor.title",
            "purpose": "Contextual edit panel for the selected stock item — manager updates name, unit and minimum level, then saves",
            "userActions": [
              "manageStockItem"
            ],
            "requiredEntities": [
              "StockItem"
            ],
            "readsFields": [
              "stockItemId",
              "name",
              "unit",
              "minimumLevel"
            ],
            "writesFields": [
              "stockItemId",
              "name",
              "unit",
              "minimumLevel"
            ],
            "rulesApplied": [
              "stockItemId is context-derived from row selection, never manually typed",
              "On success, browseStockItems is refreshed and form fields are cleared",
              "createdAt and updatedAt are system-owned, never editable"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "manageStockItem",
                "intent": "command",
                "order": 1,
                "titleKey": "section.editItem.title",
                "source": "ui.stockManagement.output.manageStockItem",
                "binding": "manageStockItem",
                "action": "manageStockItem",
                "submitAction": "manageStockItem",
                "emptyKey": "section.editItem.empty",
                "displayHint": "master-detail",
                "stateKey": "ui.stockManagement.action.manageStockItem.status",
                "fields": [
                  {
                    "id": "field-stockItemId",
                    "field": "stockItemId",
                    "labelKey": "field.stockItemId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "source": "routeParam",
                    "stateKey": "ui.stockManagement.input.manageStockItem.stockItemId"
                  },
                  {
                    "id": "field-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.stockManagement.input.manageStockItem.name"
                  },
                  {
                    "id": "field-unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": true,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.stockManagement.input.manageStockItem.unit"
                  },
                  {
                    "id": "field-minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "field.minimumLevel.label",
                    "order": 4,
                    "required": true,
                    "inputType": "number",
                    "source": "userInput",
                    "stateKey": "ui.stockManagement.input.manageStockItem.minimumLevel"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action-submit-manage",
                    "action": "manageStockItem",
                    "labelKey": "action.manageStockItem.label",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "manageStockItem"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "browseStockItems",
      "source": "query",
      "entity": "StockItem",
      "command": "browseStockItems",
      "description": "Lists all stock items with name, unit, minimumLevel and timestamps; supports search by name",
      "stateKey": "ui.stockManagement.data.browseStockItems",
      "inputStateKeys": [
        "ui.stockManagement.input.browseStockItems.searchTerm"
      ]
    },
    {
      "id": "manageStockItem",
      "source": "command",
      "entity": "StockItem",
      "command": "manageStockItem",
      "description": "Updates a stock item's name, unit and minimum level; refreshes the list on success",
      "stateKey": "ui.stockManagement.output.manageStockItem",
      "inputStateKeys": [
        "ui.stockManagement.input.manageStockItem.stockItemId",
        "ui.stockManagement.input.manageStockItem.name",
        "ui.stockManagement.input.manageStockItem.unit",
        "ui.stockManagement.input.manageStockItem.minimumLevel"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "stockManagement__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/stockManagement.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/stockManagement.ts",
      "_102051_/l2/cafeFlow/web/contracts/stockManagement.defs.ts",
      "_102051_/l2/cafeFlow/web/contracts/stockManagement.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "stockManagement__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
