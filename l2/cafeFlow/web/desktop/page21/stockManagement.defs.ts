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
      "id": "sec-queue",
      "type": "section",
      "sectionName": "queue",
      "titleKey": "stockManagement.section.queue.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-queue-list",
          "type": "queueList",
          "organismName": "StockQueue",
          "titleKey": "stockManagement.organism.stockQueue.title",
          "purpose": "Fila de itens de estoque para seleção e alerta.",
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
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "lowStockAlertCalculation"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent-queue-list",
              "intent": "queryList",
              "stateKey": "ui.stockManagement.data.browseStockItems",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec-action-panel",
      "type": "section",
      "sectionName": "actionPanel",
      "titleKey": "stockManagement.section.actionPanel.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org-queue-summary",
          "type": "statusPanel",
          "organismName": "SelectedStockStatus",
          "titleKey": "stockManagement.organism.selectedStatus.title",
          "purpose": "Exibir detalhes do item selecionado antes da atualização.",
          "userActions": [
            "browseStockItems"
          ],
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
          "rulesApplied": [
            "lowStockAlertCalculation"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent-queue-summary",
              "intent": "summary",
              "stateKey": "ui.stockManagement.data.browseStockItems",
              "order": 10
            }
          ]
        },
        {
          "id": "org-queue-edit",
          "type": "formPanel",
          "organismName": "StockQueueEditor",
          "titleKey": "stockManagement.organism.stockQueueEditor.title",
          "purpose": "Atualizar item de estoque selecionado na fila.",
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
              "id": "intent-queue-edit",
              "intent": "commandForm",
              "submitAction": "manageStockItem",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "stockManagement.page21",
    "type": "page",
    "sections": [
      {
        "id": "sec-queue",
        "type": "section",
        "sectionName": "queue",
        "titleKey": "stockManagement.section.queue.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-queue-list",
            "type": "queueList",
            "organismName": "StockQueue",
            "titleKey": "stockManagement.organism.stockQueue.title",
            "purpose": "Fila de itens de estoque para seleção e alerta.",
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
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "lowStockAlertCalculation"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent-queue-list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "stockManagement.intent.queueList.title",
                "fields": [],
                "columns": [
                  {
                    "id": "col-q-name",
                    "field": "name",
                    "labelKey": "stockManagement.field.name.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-q-unit",
                    "field": "unit",
                    "labelKey": "stockManagement.field.unit.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-q-minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "stockManagement.field.minimumLevel.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-q-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "stockManagement.field.updatedAt.label",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  }
                ],
                "filters": [
                  {
                    "id": "filter-q-searchTerm",
                    "field": "searchTerm",
                    "labelKey": "stockManagement.filter.searchTerm.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb-q-refresh",
                    "action": "browseStockItems",
                    "labelKey": "stockManagement.action.refreshList",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "browseStockItems"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.stockManagement.data.browseStockItems"
              }
            ]
          }
        ]
      },
      {
        "id": "sec-action-panel",
        "type": "section",
        "sectionName": "actionPanel",
        "titleKey": "stockManagement.section.actionPanel.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org-queue-summary",
            "type": "statusPanel",
            "organismName": "SelectedStockStatus",
            "titleKey": "stockManagement.organism.selectedStatus.title",
            "purpose": "Exibir detalhes do item selecionado antes da atualização.",
            "userActions": [
              "browseStockItems"
            ],
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
            "rulesApplied": [
              "lowStockAlertCalculation"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent-queue-summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "stockManagement.intent.queueSummary.title",
                "fields": [
                  {
                    "id": "sum-q-name",
                    "field": "name",
                    "labelKey": "stockManagement.field.name.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "sum-q-unit",
                    "field": "unit",
                    "labelKey": "stockManagement.field.unit.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "sum-q-minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "stockManagement.field.minimumLevel.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "sum-q-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "stockManagement.field.updatedAt.label",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.stockManagement.data.browseStockItems"
              }
            ]
          },
          {
            "id": "org-queue-edit",
            "type": "formPanel",
            "organismName": "StockQueueEditor",
            "titleKey": "stockManagement.organism.stockQueueEditor.title",
            "purpose": "Atualizar item de estoque selecionado na fila.",
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
                "id": "intent-queue-edit",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "stockManagement.intent.queueEdit.title",
                "submitAction": "manageStockItem",
                "fields": [
                  {
                    "id": "field-q-name",
                    "field": "name",
                    "labelKey": "stockManagement.field.name.label",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.input.manageStockItem.name"
                  },
                  {
                    "id": "field-q-unit",
                    "field": "unit",
                    "labelKey": "stockManagement.field.unit.label",
                    "order": 20,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.stockManagement.input.manageStockItem.unit"
                  },
                  {
                    "id": "field-q-minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "stockManagement.field.minimumLevel.label",
                    "order": 30,
                    "required": true,
                    "inputType": "number",
                    "stateKey": "ui.stockManagement.input.manageStockItem.minimumLevel"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-q-save",
                    "action": "manageStockItem",
                    "labelKey": "stockManagement.action.save",
                    "order": 10,
                    "displayHint": "primary",
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
      "id": "bind-browseStockItems",
      "source": "command",
      "entity": "StockItem",
      "command": "browseStockItems",
      "description": "Consultar itens de estoque",
      "stateKey": "ui.stockManagement.data.browseStockItems",
      "inputStateKeys": [
        "ui.stockManagement.input.browseStockItems.searchTerm"
      ]
    },
    {
      "id": "bind-manageStockItem",
      "source": "command",
      "entity": "StockItem",
      "command": "manageStockItem",
      "description": "Atualizar item de estoque",
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
