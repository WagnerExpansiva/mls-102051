/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.defs.ts" enhancement="_blank"/>

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
      "id": "section.stockManagement.main",
      "type": "section",
      "sectionName": "Gestão de estoque e alertas",
      "titleKey": "stockManagement.section.main.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "organism.browseStockItems",
          "type": "organism",
          "organismName": "BrowseStockItems",
          "titleKey": "stockManagement.organism.browseStockItems.title",
          "purpose": "Consultar itens de estoque e alertas",
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
            "lowStockAlertCalculation"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intention.browseStockItems.queryList",
              "intent": "queryList",
              "stateKey": "ui.stockManagement.data.browseStockItems",
              "action": "browseStockItems",
              "order": 10
            }
          ]
        },
        {
          "id": "organism.manageStockItem",
          "type": "organism",
          "organismName": "ManageStockItem",
          "titleKey": "stockManagement.organism.manageStockItem.title",
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
            "minimumLevel",
            "updatedAt"
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
              "id": "intention.manageStockItem.form",
              "intent": "commandForm",
              "submitAction": "manageStockItem",
              "order": 10
            },
            {
              "id": "intention.manageStockItem.summary",
              "intent": "summary",
              "order": 20
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "stockManagement.layout.v1",
    "type": "page",
    "sections": [
      {
        "id": "section.stockManagement.main",
        "type": "section",
        "sectionName": "Gestão de estoque e alertas",
        "titleKey": "stockManagement.section.main.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "organism.browseStockItems",
            "type": "organism",
            "organismName": "BrowseStockItems",
            "titleKey": "stockManagement.organism.browseStockItems.title",
            "purpose": "Consultar itens de estoque e alertas",
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
              "lowStockAlertCalculation"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intention.browseStockItems.queryList",
                "intent": "queryList",
                "order": 10,
                "titleKey": "stockManagement.intentions.browseStockItems.queryList.title",
                "action": "browseStockItems",
                "emptyKey": "stockManagement.intentions.browseStockItems.queryList.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "col.stockItem.name",
                    "field": "name",
                    "labelKey": "stockManagement.fields.name",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col.stockItem.unit",
                    "field": "unit",
                    "labelKey": "stockManagement.fields.unit",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col.stockItem.minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "stockManagement.fields.minimumLevel",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col.stockItem.updatedAt",
                    "field": "updatedAt",
                    "labelKey": "stockManagement.fields.updatedAt",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col.stockItem.createdAt",
                    "field": "createdAt",
                    "labelKey": "stockManagement.fields.createdAt",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  }
                ],
                "filters": [
                  {
                    "id": "filter.stockItem.searchTerm",
                    "field": "searchTerm",
                    "labelKey": "stockManagement.filters.searchTerm",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm"
                  }
                ],
                "toolbar": [
                  {
                    "id": "toolbar.browseStockItems.submit",
                    "action": "browseStockItems",
                    "labelKey": "stockManagement.actions.browseStockItems",
                    "order": 10,
                    "actionKey": "browseStockItems"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.stockManagement.data.browseStockItems"
              }
            ]
          },
          {
            "id": "organism.manageStockItem",
            "type": "organism",
            "organismName": "ManageStockItem",
            "titleKey": "stockManagement.organism.manageStockItem.title",
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
              "minimumLevel",
              "updatedAt"
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
                "id": "intention.manageStockItem.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "stockManagement.intentions.manageStockItem.form.title",
                "submitAction": "manageStockItem",
                "fields": [
                  {
                    "id": "field.manageStockItem.name",
                    "field": "name",
                    "labelKey": "stockManagement.fields.name",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.input.manageStockItem.name"
                  },
                  {
                    "id": "field.manageStockItem.unit",
                    "field": "unit",
                    "labelKey": "stockManagement.fields.unit",
                    "order": 20,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.stockManagement.input.manageStockItem.unit"
                  },
                  {
                    "id": "field.manageStockItem.minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "stockManagement.fields.minimumLevel",
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
                    "id": "action.manageStockItem.submit",
                    "action": "manageStockItem",
                    "labelKey": "stockManagement.actions.manageStockItem",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "manageStockItem"
                  }
                ]
              },
              {
                "id": "intention.manageStockItem.summary",
                "intent": "summary",
                "order": 20,
                "titleKey": "stockManagement.intentions.manageStockItem.summary.title",
                "fields": [
                  {
                    "id": "summary.manageStockItem.name",
                    "field": "name",
                    "labelKey": "stockManagement.fields.name",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.stockManagement.input.manageStockItem.name"
                  },
                  {
                    "id": "summary.manageStockItem.unit",
                    "field": "unit",
                    "labelKey": "stockManagement.fields.unit",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.stockManagement.input.manageStockItem.unit"
                  },
                  {
                    "id": "summary.manageStockItem.minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "stockManagement.fields.minimumLevel",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.stockManagement.input.manageStockItem.minimumLevel"
                  },
                  {
                    "id": "summary.manageStockItem.updatedAt",
                    "field": "updatedAt",
                    "labelKey": "stockManagement.fields.updatedAt",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.stockManagement.layout.summary-manageStockItem-updatedAt"
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
  "dataBindings": []
};

export const pipeline = [
  {
    "id": "stockManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.defs.ts",
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
