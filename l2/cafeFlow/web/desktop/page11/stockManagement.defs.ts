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
      "id": "sec-browse",
      "type": "section",
      "sectionName": "sec-browse",
      "titleKey": "sec.browse.title",
      "mode": "list",
      "order": 1,
      "organisms": [
        {
          "id": "org-stockItemsList",
          "type": "organism",
          "organismName": "StockItemsList",
          "titleKey": "org.stockItemsList.title",
          "purpose": "Listar e buscar itens de estoque, destacando alertas de nível baixo",
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
            "Itens cuja quantidade atual (StockLevel.currentQuantity) está abaixo ou igual ao mínimo configurado (StockItem.minimumLevel) são destacados como alerta de estoque baixo"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-browseStockItems",
              "intent": "queryList",
              "stateKey": "ui.stockManagement.data.browseStockItems",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-manage",
      "type": "section",
      "sectionName": "sec-manage",
      "titleKey": "sec.manage.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-manageStockItemForm",
          "type": "organism",
          "organismName": "ManageStockItemForm",
          "titleKey": "org.manageStockItemForm.title",
          "purpose": "Editar os dados de um item de estoque selecionado na lista",
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
            "O campo stockItemId é preenchido automaticamente pela seleção na lista, nunca digitado manualmente",
            "Após salvar, a lista de itens é atualizada e o formulário é limpo"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-manageStockItem",
              "intent": "commandForm",
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
  "templateId": "pos_workspace",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "page11-pos_workspace",
    "type": "page",
    "sections": [
      {
        "id": "sec-browse",
        "type": "section",
        "sectionName": "sec-browse",
        "titleKey": "sec.browse.title",
        "mode": "list",
        "order": 1,
        "organisms": [
          {
            "id": "org-stockItemsList",
            "type": "organism",
            "organismName": "StockItemsList",
            "titleKey": "org.stockItemsList.title",
            "purpose": "Listar e buscar itens de estoque, destacando alertas de nível baixo",
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
              "Itens cuja quantidade atual (StockLevel.currentQuantity) está abaixo ou igual ao mínimo configurado (StockItem.minimumLevel) são destacados como alerta de estoque baixo"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-browseStockItems",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.browse.title",
                "source": "browseStockItems",
                "binding": "ui.stockManagement.data.browseStockItems",
                "emptyKey": "section.browse.empty",
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
                    "format": "text",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
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
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  }
                ],
                "filters": [
                  {
                    "id": "flt-searchTerm",
                    "field": "searchTerm",
                    "labelKey": "field.searchTerm.label",
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
                    "id": "tb-refresh",
                    "action": "browseStockItems",
                    "labelKey": "action.refresh.label",
                    "order": 1,
                    "displayHint": "button",
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
        "id": "sec-manage",
        "type": "section",
        "sectionName": "sec-manage",
        "titleKey": "sec.manage.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-manageStockItemForm",
            "type": "organism",
            "organismName": "ManageStockItemForm",
            "titleKey": "org.manageStockItemForm.title",
            "purpose": "Editar os dados de um item de estoque selecionado na lista",
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
              "O campo stockItemId é preenchido automaticamente pela seleção na lista, nunca digitado manualmente",
              "Após salvar, a lista de itens é atualizada e o formulário é limpo"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-manageStockItem",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.manage.title",
                "source": "manageStockItem",
                "binding": "ui.stockManagement.output.manageStockItem",
                "action": "manageStockItem",
                "submitAction": "manageStockItem",
                "emptyKey": "section.manage.empty",
                "displayHint": "form",
                "stateKey": "ui.stockManagement.action.manageStockItem.status",
                "fields": [
                  {
                    "id": "fld-stockItemId",
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
                    "id": "fld-name",
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
                    "id": "fld-unit",
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
                    "id": "fld-minimumLevel",
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
                    "id": "act-submit",
                    "action": "manageStockItem",
                    "labelKey": "action.submit.label",
                    "order": 1,
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
      "source": "browseStockItems",
      "entity": "StockItem",
      "command": "browseStockItems",
      "description": "Consulta itens de estoque com filtro por nome",
      "stateKey": "ui.stockManagement.data.browseStockItems",
      "inputStateKeys": [
        "ui.stockManagement.input.browseStockItems.searchTerm"
      ]
    },
    {
      "id": "bind-manageStockItem",
      "source": "manageStockItem",
      "entity": "StockItem",
      "command": "manageStockItem",
      "description": "Atualiza dados de um item de estoque existente",
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
