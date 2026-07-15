/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/stockManagement.defs.ts" enhancement="_blank"/>

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
      "id": "sec_stockItemsList",
      "type": "section",
      "sectionName": "stockItemsList",
      "titleKey": "section.stockItemsList.title",
      "mode": "main",
      "order": 1,
      "organisms": [
        {
          "id": "org_stockItemsBrowser",
          "type": "organism",
          "organismName": "stockItemsBrowser",
          "titleKey": "org.stockItemsBrowser.title",
          "purpose": "Listar e buscar itens de estoque com alertas de estoque baixo, usando lista como fallback acessível (sem dados espaciais disponíveis)",
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
            "Itens cuja quantidade atual (StockLevel.currentQuantity) está abaixo ou igual ao mínimo (StockItem.minimumLevel) são destacados como alerta de estoque baixo"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int_queryStockItems",
              "intent": "queryList",
              "stateKey": "ui.stockManagement.data.browseStockItems",
              "action": "browseStockItems",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_stockItemDetailPanel",
      "type": "section",
      "sectionName": "stockItemDetailPanel",
      "titleKey": "section.stockItemDetailPanel.title",
      "mode": "sidePanel",
      "order": 2,
      "organisms": [
        {
          "id": "org_stockItemManager",
          "type": "organism",
          "organismName": "stockItemManager",
          "titleKey": "org.stockItemManager.title",
          "purpose": "Editar detalhes do item de estoque selecionado no painel lateral",
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
            "minimumLevel",
            "updatedAt"
          ],
          "rulesApplied": [
            "Atualização persiste novos valores e atualiza o timestamp updatedAt",
            "stockItemId é derivado de routeParam e não é editado manualmente"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int_manageStockItem",
              "intent": "commandForm",
              "stateKey": "ui.stockManagement.action.manageStockItem.status",
              "action": "manageStockItem",
              "submitAction": "manageStockItem",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_reviewSummary",
      "type": "section",
      "sectionName": "reviewSummary",
      "titleKey": "section.reviewSummary.title",
      "mode": "review",
      "order": 3,
      "organisms": [
        {
          "id": "org_actionSummary",
          "type": "organism",
          "organismName": "actionSummary",
          "titleKey": "org.actionSummary.title",
          "purpose": "Revisar o contexto e o resultado das ações principais da página",
          "userActions": [],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int_summary",
              "intent": "summary",
              "stateKey": "ui.stockManagement.action.manageStockItem.status",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "visual_dashboard",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "page31_visual_dashboard",
    "type": "page",
    "sections": [
      {
        "id": "sec_stockItemsList",
        "type": "section",
        "sectionName": "stockItemsList",
        "titleKey": "section.stockItemsList.title",
        "mode": "main",
        "order": 1,
        "organisms": [
          {
            "id": "org_stockItemsBrowser",
            "type": "organism",
            "organismName": "stockItemsBrowser",
            "titleKey": "org.stockItemsBrowser.title",
            "purpose": "Listar e buscar itens de estoque com alertas de estoque baixo, usando lista como fallback acessível (sem dados espaciais disponíveis)",
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
              "Itens cuja quantidade atual (StockLevel.currentQuantity) está abaixo ou igual ao mínimo (StockItem.minimumLevel) são destacados como alerta de estoque baixo"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int_queryStockItems",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.queryStockItems.title",
                "source": "ui.stockManagement.data.browseStockItems",
                "binding": "browseStockItems",
                "action": "browseStockItems",
                "emptyKey": "empty.stockItems",
                "displayHint": "list",
                "stateKey": "ui.stockManagement.data.browseStockItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col_stockItemId",
                    "field": "stockItemId",
                    "labelKey": "field.stockItemId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "source": "ui.stockManagement.data.browseStockItems",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col_name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "source": "ui.stockManagement.data.browseStockItems",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col_unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "source": "ui.stockManagement.data.browseStockItems",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col_minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "field.minimumLevel.label",
                    "order": 4,
                    "required": false,
                    "inputType": "number",
                    "format": "number",
                    "source": "ui.stockManagement.data.browseStockItems",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col_createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "ui.stockManagement.data.browseStockItems",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col_updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "ui.stockManagement.data.browseStockItems",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  }
                ],
                "filters": [
                  {
                    "id": "flt_searchTerm",
                    "field": "searchTerm",
                    "labelKey": "filter.searchTerm.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "source": "ui.stockManagement.input.browseStockItems.searchTerm",
                    "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb_refresh",
                    "action": "browseStockItems",
                    "labelKey": "toolbar.refresh.label",
                    "order": 1,
                    "displayHint": "icon",
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
        "id": "sec_stockItemDetailPanel",
        "type": "section",
        "sectionName": "stockItemDetailPanel",
        "titleKey": "section.stockItemDetailPanel.title",
        "mode": "sidePanel",
        "order": 2,
        "organisms": [
          {
            "id": "org_stockItemManager",
            "type": "organism",
            "organismName": "stockItemManager",
            "titleKey": "org.stockItemManager.title",
            "purpose": "Editar detalhes do item de estoque selecionado no painel lateral",
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
              "minimumLevel",
              "updatedAt"
            ],
            "rulesApplied": [
              "Atualização persiste novos valores e atualiza o timestamp updatedAt",
              "stockItemId é derivado de routeParam e não é editado manualmente"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int_manageStockItem",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.manageStockItem.title",
                "binding": "manageStockItem",
                "action": "manageStockItem",
                "submitAction": "manageStockItem",
                "emptyKey": "empty.noItemSelected",
                "displayHint": "form",
                "stateKey": "ui.stockManagement.action.manageStockItem.status",
                "fields": [
                  {
                    "id": "fld_stockItemId",
                    "field": "stockItemId",
                    "labelKey": "field.stockItemId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "format": "text",
                    "source": "ui.stockManagement.input.manageStockItem.stockItemId",
                    "stateKey": "ui.stockManagement.input.manageStockItem.stockItemId"
                  },
                  {
                    "id": "fld_name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "format": "text",
                    "source": "ui.stockManagement.input.manageStockItem.name",
                    "stateKey": "ui.stockManagement.input.manageStockItem.name"
                  },
                  {
                    "id": "fld_unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": true,
                    "inputType": "text",
                    "format": "text",
                    "source": "ui.stockManagement.input.manageStockItem.unit",
                    "stateKey": "ui.stockManagement.input.manageStockItem.unit"
                  },
                  {
                    "id": "fld_minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "field.minimumLevel.label",
                    "order": 4,
                    "required": true,
                    "inputType": "number",
                    "format": "number",
                    "source": "ui.stockManagement.input.manageStockItem.minimumLevel",
                    "stateKey": "ui.stockManagement.input.manageStockItem.minimumLevel"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_submitManage",
                    "action": "manageStockItem",
                    "labelKey": "action.manageStockItem.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "manageStockItem"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec_reviewSummary",
        "type": "section",
        "sectionName": "reviewSummary",
        "titleKey": "section.reviewSummary.title",
        "mode": "review",
        "order": 3,
        "organisms": [
          {
            "id": "org_actionSummary",
            "type": "organism",
            "organismName": "actionSummary",
            "titleKey": "org.actionSummary.title",
            "purpose": "Revisar o contexto e o resultado das ações principais da página",
            "userActions": [],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int_summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "intention.summary.title",
                "emptyKey": "empty.noActionsYet",
                "displayHint": "feedback",
                "stateKey": "ui.stockManagement.action.manageStockItem.status",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "db_browseStockItems",
      "source": "query",
      "entity": "StockItem",
      "command": "browseStockItems",
      "description": "Consulta itens de estoque com filtro por nome",
      "stateKey": "ui.stockManagement.data.browseStockItems",
      "inputStateKeys": [
        "ui.stockManagement.input.browseStockItems.searchTerm"
      ]
    },
    {
      "id": "db_manageStockItem",
      "source": "command",
      "entity": "StockItem",
      "command": "manageStockItem",
      "description": "Atualiza dados de um item de estoque",
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
    "id": "stockManagement__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page31/stockManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page31/stockManagement.defs.ts",
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
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
