/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.defs.ts" enhancement="_blank"/>

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
      "id": "sec-discover",
      "type": "section",
      "sectionName": "sec-discover",
      "titleKey": "sec.discover.title",
      "mode": "list",
      "order": 1,
      "organisms": [
        {
          "id": "org-stock-item-list",
          "type": "organism",
          "organismName": "StockItemList",
          "titleKey": "org.stock.item.list.title",
          "purpose": "Listar itens de estoque com nome, unidade e limite mínimo, destacando alertas de estoque baixo. Permite buscar por nome e selecionar um item para edição.",
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
          "writesFields": [
            "searchTerm",
            "stockItemId"
          ],
          "rulesApplied": [
            "Itens cuja quantidade atual (StockLevel.currentQuantity) está abaixo ou igual ao mínimo (StockItem.minimumLevel) são destacados como alerta"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-browse-stock-items",
              "intent": "queryList",
              "stateKey": "ui.stockManagement.data.browseStockItems",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-execute",
      "type": "section",
      "sectionName": "sec-execute",
      "titleKey": "sec.execute.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-stock-item-form",
          "type": "organism",
          "organismName": "StockItemForm",
          "titleKey": "org.stock.item.form.title",
          "purpose": "Formulário de edição do item de estoque selecionado. O stockItemId é preenchido automaticamente pela seleção na lista. O gerente edita nome, unidade e limite mínimo e confirma a atualização.",
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
            "stockItemId é derivado de routeParam/selection, nunca digitado manualmente",
            "Após submit com sucesso, o formulário é limpo e a lista é atualizada"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-manage-stock-item",
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
      "id": "sec-review",
      "type": "section",
      "sectionName": "sec-review",
      "titleKey": "sec.review.title",
      "mode": "summary",
      "order": 3,
      "organisms": [
        {
          "id": "org-stock-item-summary",
          "type": "organism",
          "organismName": "StockItemSummary",
          "titleKey": "org.stock.item.summary.title",
          "purpose": "Exibe o resultado da última atualização de item de estoque, confirmando os valores persistidos e o timestamp updatedAt.",
          "userActions": [],
          "requiredEntities": [
            "StockItem"
          ],
          "readsFields": [
            "stockItemId",
            "name",
            "unit",
            "minimumLevel",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-summary-manage-result",
              "intent": "summary",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "pos_workspace",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "msgKeys": [
    "action.browseStockItems.label",
    "action.manageStockItem.error",
    "action.manageStockItem.label",
    "action.manageStockItem.success",
    "action.refresh.label",
    "action.select.label",
    "empty.browseStockItems",
    "empty.manageStockItem",
    "empty.summary",
    "field.createdAt.label",
    "field.minimumLevel.label",
    "field.name.label",
    "field.searchTerm.label",
    "field.stockItemId.label",
    "field.unit.label",
    "field.updatedAt.label",
    "org.stock.item.form.title",
    "org.stock.item.list.title",
    "org.stock.item.summary.title",
    "organism.stockItemForm.title",
    "organism.stockItemList.title",
    "organism.stockItemSummary.title",
    "page.stockManagement.title",
    "sec.discover.title",
    "sec.execute.title",
    "sec.review.title",
    "section.discover.title",
    "section.execute.title",
    "section.review.title"
  ],
  "layout": {
    "id": "pos_workspace",
    "type": "page",
    "sections": [
      {
        "id": "sec-discover",
        "type": "section",
        "sectionName": "sec-discover",
        "titleKey": "sec.discover.title",
        "mode": "list",
        "order": 1,
        "organisms": [
          {
            "id": "org-stock-item-list",
            "type": "organism",
            "organismName": "StockItemList",
            "titleKey": "org.stock.item.list.title",
            "purpose": "Listar itens de estoque com nome, unidade e limite mínimo, destacando alertas de estoque baixo. Permite buscar por nome e selecionar um item para edição.",
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
            "writesFields": [
              "searchTerm",
              "stockItemId"
            ],
            "rulesApplied": [
              "Itens cuja quantidade atual (StockLevel.currentQuantity) está abaixo ou igual ao mínimo (StockItem.minimumLevel) são destacados como alerta"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-browse-stock-items",
                "intent": "queryList",
                "order": 1,
                "titleKey": "organism.stockItemList.title",
                "source": "ui.stockManagement.data.browseStockItems",
                "binding": "binding-browseStockItems",
                "emptyKey": "empty.browseStockItems",
                "displayHint": "table",
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
                    "id": "filter-search",
                    "field": "searchTerm",
                    "labelKey": "field.searchTerm.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.stockManagement.input.browseStockItems.searchTerm",
                    "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb-refresh",
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
        "id": "sec-execute",
        "type": "section",
        "sectionName": "sec-execute",
        "titleKey": "sec.execute.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-stock-item-form",
            "type": "organism",
            "organismName": "StockItemForm",
            "titleKey": "org.stock.item.form.title",
            "purpose": "Formulário de edição do item de estoque selecionado. O stockItemId é preenchido automaticamente pela seleção na lista. O gerente edita nome, unidade e limite mínimo e confirma a atualização.",
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
              "stockItemId é derivado de routeParam/selection, nunca digitado manualmente",
              "Após submit com sucesso, o formulário é limpo e a lista é atualizada"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-manage-stock-item",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "organism.stockItemForm.title",
                "binding": "binding-manageStockItem",
                "action": "manageStockItem",
                "submitAction": "manageStockItem",
                "emptyKey": "empty.manageStockItem",
                "displayHint": "form",
                "stateKey": "ui.stockManagement.action.manageStockItem.status",
                "fields": [
                  {
                    "id": "form-field-stockItemId",
                    "field": "stockItemId",
                    "labelKey": "field.stockItemId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "source": "ui.stockManagement.input.manageStockItem.stockItemId",
                    "stateKey": "ui.stockManagement.input.manageStockItem.stockItemId"
                  },
                  {
                    "id": "form-field-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "source": "ui.stockManagement.input.manageStockItem.name",
                    "stateKey": "ui.stockManagement.input.manageStockItem.name"
                  },
                  {
                    "id": "form-field-unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": true,
                    "inputType": "text",
                    "source": "ui.stockManagement.input.manageStockItem.unit",
                    "stateKey": "ui.stockManagement.input.manageStockItem.unit"
                  },
                  {
                    "id": "form-field-minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "field.minimumLevel.label",
                    "order": 4,
                    "required": true,
                    "inputType": "number",
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
                    "id": "act-submit-manage",
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
        "id": "sec-review",
        "type": "section",
        "sectionName": "sec-review",
        "titleKey": "sec.review.title",
        "mode": "summary",
        "order": 3,
        "organisms": [
          {
            "id": "org-stock-item-summary",
            "type": "organism",
            "organismName": "StockItemSummary",
            "titleKey": "org.stock.item.summary.title",
            "purpose": "Exibe o resultado da última atualização de item de estoque, confirmando os valores persistidos e o timestamp updatedAt.",
            "userActions": [],
            "requiredEntities": [
              "StockItem"
            ],
            "readsFields": [
              "stockItemId",
              "name",
              "unit",
              "minimumLevel",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent-summary-manage-result",
                "intent": "summary",
                "order": 1,
                "titleKey": "organism.stockItemSummary.title",
                "source": "ui.stockManagement.output.manageStockItem",
                "binding": "binding-manageStockItem",
                "emptyKey": "empty.summary",
                "displayHint": "card",
                "fields": [],
                "columns": [
                  {
                    "id": "sum-col-stockItemId",
                    "field": "stockItemId",
                    "labelKey": "field.stockItemId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.stockManagement.output.manageStockItem"
                  },
                  {
                    "id": "sum-col-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.stockManagement.output.manageStockItem"
                  },
                  {
                    "id": "sum-col-unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.stockManagement.output.manageStockItem"
                  },
                  {
                    "id": "sum-col-minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "field.minimumLevel.label",
                    "order": 4,
                    "required": false,
                    "inputType": "number",
                    "source": "ui.stockManagement.output.manageStockItem"
                  },
                  {
                    "id": "sum-col-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "ui.stockManagement.output.manageStockItem"
                  }
                ],
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
      "source": "ui.stockManagement.data.browseStockItems",
      "entity": "StockItem",
      "command": "browseStockItems",
      "description": "Lista paginada de itens de estoque com dados de StockItem e alertas de StockLevel",
      "stateKey": "ui.stockManagement.data.browseStockItems",
      "inputStateKeys": [
        "ui.stockManagement.input.browseStockItems.searchTerm"
      ]
    },
    {
      "id": "binding-manageStockItem",
      "source": "ui.stockManagement.output.manageStockItem",
      "entity": "StockItem",
      "command": "manageStockItem",
      "description": "Resultado da gestão (atualização) de item de estoque",
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
    "id": "stockManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/stockManagement.ts",
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
