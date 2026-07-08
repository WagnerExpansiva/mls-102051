/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "stockManagement",
  "pageName": "Gestão de estoque e alertas",
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
      "id": "sec_stock_queue_main",
      "type": "section",
      "sectionName": "Gestão de estoque e alertas",
      "titleKey": "stockManagement.section.main.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org_stock_queue_list",
          "type": "queueList",
          "organismName": "BrowseStockItems",
          "titleKey": "stockManagement.browseStockItems.title",
          "purpose": "Consultar itens de estoque e alertas",
          "userActions": [
            "browseStockItems"
          ],
          "requiredEntities": [
            "StockItem",
            "StockLevel"
          ],
          "readsFields": [
            "name",
            "unit",
            "minimumLevel",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "lowStockAlertCalculation"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int_stock_queue_list",
              "intent": "queryList",
              "stateKey": "ui.stockManagement.data.browseStockItems",
              "order": 10
            }
          ]
        },
        {
          "id": "org_stock_queue_action",
          "type": "actionPanel",
          "organismName": "ManageStockItem",
          "titleKey": "stockManagement.manageStockItem.title",
          "purpose": "Gerenciar itens de estoque",
          "userActions": [
            "manageStockItem"
          ],
          "requiredEntities": [
            "StockItem"
          ],
          "readsFields": [
            "name",
            "unit",
            "minimumLevel"
          ],
          "writesFields": [
            "name",
            "unit",
            "minimumLevel"
          ],
          "rulesApplied": [
            "lowStockAlertCalculation"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "int_queue_manage_form",
              "intent": "commandForm",
              "submitAction": "manageStockItem",
              "order": 10
            }
          ]
        },
        {
          "id": "org_stock_queue_summary",
          "type": "summaryPanel",
          "organismName": "StockSummary",
          "titleKey": "stockManagement.summary.title",
          "purpose": "Revisar o contexto e resultado das ações",
          "userActions": [],
          "requiredEntities": [
            "StockItem"
          ],
          "readsFields": [
            "name",
            "unit",
            "minimumLevel",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 30,
          "intentionRefs": [
            {
              "id": "int_queue_summary",
              "intent": "summary",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "sec_stock_queue_main",
        "type": "section",
        "sectionName": "Gestão de estoque e alertas",
        "titleKey": "stockManagement.section.main.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org_stock_queue_list",
            "type": "queueList",
            "organismName": "BrowseStockItems",
            "titleKey": "stockManagement.browseStockItems.title",
            "purpose": "Consultar itens de estoque e alertas",
            "userActions": [
              "browseStockItems"
            ],
            "requiredEntities": [
              "StockItem",
              "StockLevel"
            ],
            "readsFields": [
              "name",
              "unit",
              "minimumLevel",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "lowStockAlertCalculation"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int_stock_queue_list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "stockManagement.browseStockItems.list.title",
                "binding": "db_browseStockItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col_queue_name",
                    "field": "name",
                    "labelKey": "stockManagement.stockItem.name.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col_queue_unit",
                    "field": "unit",
                    "labelKey": "stockManagement.stockItem.unit.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col_queue_minimum",
                    "field": "minimumLevel",
                    "labelKey": "stockManagement.stockItem.minimumLevel.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col_queue_updated",
                    "field": "updatedAt",
                    "labelKey": "stockManagement.stockItem.updatedAt.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  }
                ],
                "filters": [
                  {
                    "id": "filter_queue_search",
                    "field": "searchTerm",
                    "labelKey": "stockManagement.browseStockItems.searchTerm.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "source": "input",
                    "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.stockManagement.data.browseStockItems"
              }
            ]
          },
          {
            "id": "org_stock_queue_action",
            "type": "actionPanel",
            "organismName": "ManageStockItem",
            "titleKey": "stockManagement.manageStockItem.title",
            "purpose": "Gerenciar itens de estoque",
            "userActions": [
              "manageStockItem"
            ],
            "requiredEntities": [
              "StockItem"
            ],
            "readsFields": [
              "name",
              "unit",
              "minimumLevel"
            ],
            "writesFields": [
              "name",
              "unit",
              "minimumLevel"
            ],
            "rulesApplied": [
              "lowStockAlertCalculation"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "int_queue_manage_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "stockManagement.manageStockItem.form.title",
                "submitAction": "manageStockItem",
                "fields": [
                  {
                    "id": "field_queue_name",
                    "field": "name",
                    "labelKey": "stockManagement.stockItem.name.label",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "source": "input",
                    "stateKey": "ui.stockManagement.input.manageStockItem.name"
                  },
                  {
                    "id": "field_queue_unit",
                    "field": "unit",
                    "labelKey": "stockManagement.stockItem.unit.label",
                    "order": 20,
                    "required": true,
                    "inputType": "select",
                    "source": "input",
                    "stateKey": "ui.stockManagement.input.manageStockItem.unit"
                  },
                  {
                    "id": "field_queue_minimum",
                    "field": "minimumLevel",
                    "labelKey": "stockManagement.stockItem.minimumLevel.label",
                    "order": 30,
                    "required": true,
                    "inputType": "number",
                    "source": "input",
                    "stateKey": "ui.stockManagement.input.manageStockItem.minimumLevel"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action_queue_submit",
                    "action": "manageStockItem",
                    "labelKey": "stockManagement.manageStockItem.submit.label",
                    "order": 10,
                    "actionKey": "manageStockItem"
                  }
                ]
              }
            ]
          },
          {
            "id": "org_stock_queue_summary",
            "type": "summaryPanel",
            "organismName": "StockSummary",
            "titleKey": "stockManagement.summary.title",
            "purpose": "Revisar o contexto e resultado das ações",
            "userActions": [],
            "requiredEntities": [
              "StockItem"
            ],
            "readsFields": [
              "name",
              "unit",
              "minimumLevel",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 30,
            "intentions": [
              {
                "id": "int_queue_summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "stockManagement.summary.detail.title",
                "fields": [
                  {
                    "id": "summary_queue_name",
                    "field": "name",
                    "labelKey": "stockManagement.stockItem.name.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "summary_queue_unit",
                    "field": "unit",
                    "labelKey": "stockManagement.stockItem.unit.label",
                    "order": 20,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "summary_queue_minimum",
                    "field": "minimumLevel",
                    "labelKey": "stockManagement.stockItem.minimumLevel.label",
                    "order": 30,
                    "required": false,
                    "inputType": "number"
                  },
                  {
                    "id": "summary_queue_updated",
                    "field": "updatedAt",
                    "labelKey": "stockManagement.stockItem.updatedAt.label",
                    "order": 40,
                    "required": false,
                    "inputType": "date"
                  }
                ],
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
      "source": "cafeFlow.browseStockItems.browseStockItems",
      "command": "browseStockItems",
      "description": "Consultar itens de estoque com filtro por nome.",
      "stateKey": "ui.stockManagement.data.browseStockItems",
      "inputStateKeys": [
        "ui.stockManagement.input.browseStockItems.searchTerm"
      ]
    },
    {
      "id": "db_manageStockItem",
      "source": "cafeFlow.manageStockItem.manageStockItem",
      "command": "manageStockItem",
      "description": "Atualizar dados do item de estoque selecionado.",
      "stateKey": "ui.stockManagement.output.manageStockItem",
      "inputStateKeys": [
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
      "_102051_/l2/cafeFlow/web/contracts/stockManagement.ts"
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
