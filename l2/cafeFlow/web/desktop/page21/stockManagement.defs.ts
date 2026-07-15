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
      "id": "section-stockQueue",
      "type": "section",
      "sectionName": "stockQueue",
      "titleKey": "section.stockQueue.title",
      "mode": "queue",
      "order": 1,
      "organisms": [
        {
          "id": "org-stockQueueTable",
          "type": "organism",
          "organismName": "StockQueueTable",
          "titleKey": "org.stockQueueTable.title",
          "purpose": "Exibir fila de itens de estoque com alertas de estoque baixo, permitir busca por nome e seleção para edição",
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
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "Alerta de estoque baixo quando quantidade atual (StockLevel.currentQuantity) <= limite mínimo (StockItem.minimumLevel)"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-browseStockItems",
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
      "id": "section-manageStockItem",
      "type": "section",
      "sectionName": "manageStockItem",
      "titleKey": "section.manageStockItem.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-manageStockItemForm",
          "type": "organism",
          "organismName": "ManageStockItemForm",
          "titleKey": "org.manageStockItemForm.title",
          "purpose": "Editar dados do item de estoque selecionado (nome, unidade, limite mínimo) e confirmar atualização",
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
            "name",
            "unit",
            "minimumLevel"
          ],
          "rulesApplied": [
            "stockItemId é derivado da seleção na fila e não é editado manualmente",
            "Após salvar, a lista de estoque é atualizada e o formulário é limpo"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-manageStockItem",
              "intent": "commandForm",
              "stateKey": "ui.stockManagement.output.manageStockItem",
              "submitAction": "manageStockItem",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "section-review",
      "type": "section",
      "sectionName": "review",
      "titleKey": "section.review.title",
      "mode": "summary",
      "order": 3,
      "organisms": [
        {
          "id": "org-reviewSummary",
          "type": "organism",
          "organismName": "ReviewSummary",
          "titleKey": "org.reviewSummary.title",
          "purpose": "Revisar o contexto e o resultado das ações principais da página",
          "userActions": [],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-review",
              "intent": "summary",
              "stateKey": "ui.stockManagement.output.manageStockItem",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "workflow_queue",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "workflow_queue-stockManagement-page21",
    "type": "page",
    "sections": [
      {
        "id": "section-stockQueue",
        "type": "section",
        "sectionName": "stockQueue",
        "titleKey": "section.stockQueue.title",
        "mode": "queue",
        "order": 1,
        "organisms": [
          {
            "id": "org-stockQueueTable",
            "type": "organism",
            "organismName": "StockQueueTable",
            "titleKey": "org.stockQueueTable.title",
            "purpose": "Exibir fila de itens de estoque com alertas de estoque baixo, permitir busca por nome e seleção para edição",
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
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "Alerta de estoque baixo quando quantidade atual (StockLevel.currentQuantity) <= limite mínimo (StockItem.minimumLevel)"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-browseStockItems",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.stockQueue.title",
                "source": "ui.stockManagement.data.browseStockItems",
                "binding": "browseStockItems",
                "action": "browseStockItems",
                "emptyKey": "empty.stockQueue",
                "displayHint": "queue",
                "stateKey": "ui.stockManagement.data.browseStockItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col-stockItemId",
                    "field": "stockItemId",
                    "labelKey": "field.stockItemId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.stockManagement.data.browseStockItems",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.stockManagement.data.browseStockItems",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.stockManagement.data.browseStockItems",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-minimumLevel",
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
                    "id": "col-createdAt",
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
                    "id": "col-updatedAt",
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
                    "id": "filter-searchTerm",
                    "field": "searchTerm",
                    "labelKey": "field.searchTerm.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm"
                  }
                ],
                "toolbar": [
                  {
                    "id": "toolbar-refresh",
                    "action": "browseStockItems",
                    "labelKey": "action.refresh.label",
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
        "id": "section-manageStockItem",
        "type": "section",
        "sectionName": "manageStockItem",
        "titleKey": "section.manageStockItem.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-manageStockItemForm",
            "type": "organism",
            "organismName": "ManageStockItemForm",
            "titleKey": "org.manageStockItemForm.title",
            "purpose": "Editar dados do item de estoque selecionado (nome, unidade, limite mínimo) e confirmar atualização",
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
              "name",
              "unit",
              "minimumLevel"
            ],
            "rulesApplied": [
              "stockItemId é derivado da seleção na fila e não é editado manualmente",
              "Após salvar, a lista de estoque é atualizada e o formulário é limpo"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-manageStockItem",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.manageStockItem.title",
                "source": "ui.stockManagement.output.manageStockItem",
                "binding": "manageStockItem",
                "submitAction": "manageStockItem",
                "displayHint": "contextual",
                "stateKey": "ui.stockManagement.output.manageStockItem",
                "fields": [
                  {
                    "id": "field-stockItemId",
                    "field": "stockItemId",
                    "labelKey": "field.stockItemId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "stateKey": "ui.stockManagement.input.manageStockItem.stockItemId"
                  },
                  {
                    "id": "field-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.input.manageStockItem.name"
                  },
                  {
                    "id": "field-unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.input.manageStockItem.unit"
                  },
                  {
                    "id": "field-minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "field.minimumLevel.label",
                    "order": 4,
                    "required": true,
                    "inputType": "number",
                    "format": "number",
                    "stateKey": "ui.stockManagement.input.manageStockItem.minimumLevel"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action-submit-manageStockItem",
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
        "id": "section-review",
        "type": "section",
        "sectionName": "review",
        "titleKey": "section.review.title",
        "mode": "summary",
        "order": 3,
        "organisms": [
          {
            "id": "org-reviewSummary",
            "type": "organism",
            "organismName": "ReviewSummary",
            "titleKey": "org.reviewSummary.title",
            "purpose": "Revisar o contexto e o resultado das ações principais da página",
            "userActions": [],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent-review",
                "intent": "summary",
                "order": 1,
                "titleKey": "section.review.title",
                "displayHint": "readonly",
                "stateKey": "ui.stockManagement.output.manageStockItem",
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
      "id": "binding-browseStockItems",
      "source": "cafeFlow.browseStockItems.browseStockItems",
      "entity": "StockItem",
      "command": "browseStockItems",
      "description": "Consultar itens de estoque e alertas",
      "stateKey": "ui.stockManagement.data.browseStockItems",
      "inputStateKeys": [
        "ui.stockManagement.input.browseStockItems.searchTerm"
      ]
    },
    {
      "id": "binding-manageStockItem",
      "source": "cafeFlow.manageStockItem.manageStockItem",
      "entity": "StockItem",
      "command": "manageStockItem",
      "description": "Gerenciar itens de estoque",
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
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
