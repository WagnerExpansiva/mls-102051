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
      "sectionName": "stockItemsSection",
      "titleKey": "stockItemsSection.title",
      "mode": "list",
      "order": 1,
      "organisms": [
        {
          "id": "stockItemsTable",
          "type": "organism",
          "organismName": "StockItemsTable",
          "titleKey": "stockItemsTable.title",
          "purpose": "Listar todos os itens de estoque com destaque para alertas de estoque baixo, permitindo busca e seleção para edição",
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
            "Itens cuja quantidade atual (StockLevel.currentQuantity) está abaixo ou igual ao mínimo (StockItem.minimumLevel) são destacados como alerta",
            "stockItemId é derivado da seleção de linha, nunca digitado manualmente",
            "createdAt e updatedAt são contextuais somente leitura"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "browseStockItemsQuery",
              "intent": "query",
              "stateKey": "ui.stockManagement.data.browseStockItems",
              "order": 1
            },
            {
              "id": "searchStockItemsFilter",
              "intent": "filter",
              "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm",
              "order": 2
            }
          ]
        }
      ]
    },
    {
      "id": "stockItemEditSection",
      "type": "section",
      "sectionName": "stockItemEditSection",
      "titleKey": "stockItemEditSection.title",
      "mode": "detail",
      "order": 2,
      "organisms": [
        {
          "id": "stockItemEditor",
          "type": "organism",
          "organismName": "StockItemEditor",
          "titleKey": "stockItemEditor.title",
          "purpose": "Painel de edição contextual do item de estoque selecionado, permitindo ajustar nome, unidade e limite mínimo",
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
            "minimumLevel",
            "updatedAt"
          ],
          "writesFields": [
            "name",
            "unit",
            "minimumLevel"
          ],
          "rulesApplied": [
            "stockItemId é derivado da seleção na lista (routeParam), exibido como contexto somente leitura",
            "Apenas name, unit e minimumLevel são editáveis — decisões reais do gerente",
            "Após salvar, a lista de estoque é atualizada para refletir mudanças",
            "Feedback textual de sucesso/erro é exibido e dismissible"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "manageStockItemForm",
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
    "actor": "Gerente do café",
    "jobToBeDone": "Monitorar níveis de estoque, identificar alertas de itens baixos e ajustar configurações de insumos (nome, unidade, limite mínimo) para manter thresholds corretos",
    "primaryDecision": "Qual item de estoque precisa ajuste e quais valores (nome, unidade, limite mínimo) atualizar",
    "decisiveInfo": [
      "name",
      "unit",
      "minimumLevel"
    ],
    "usageFrequency": "Occasional / back-office — o gerente consulta periodicamente e ajusta thresholds conforme necessário",
    "criticalActions": [
      {
        "action": "browseStockItems",
        "presentation": "master-detail list with search filter and low-stock highlighting"
      },
      {
        "action": "manageStockItem",
        "presentation": "contextual edit panel bound to selected row, primary-button submit"
      }
    ],
    "informationHierarchy": [
      "Lista de itens de estoque com destaque para alertas de estoque baixo",
      "Busca por nome para localizar ingrediente específico",
      "Painel de edição contextual do item selecionado (nome, unidade, limite mínimo)",
      "Feedback de sucesso/erro da atualização"
    ],
    "successCriteria": "O gerente consegue ver rapidamente quais itens estão com estoque baixo, encontrar um item específico por nome e ajustar suas configurações sem sair da página",
    "antiPatterns": [
      "Página de edição separada da lista",
      "Digitação manual de stockItemId",
      "Expor createdAt/updatedAt como inputs editáveis",
      "Formulário CRUD genérico que mostra campos do sistema como inputs"
    ]
  },
  "msgKeys": [
    "action.browseStockItems.label",
    "action.manageStockItem.error",
    "action.manageStockItem.label",
    "action.manageStockItem.success",
    "action.selectStockItem.label",
    "empty.stockItemEditor",
    "empty.stockItems",
    "field.createdAt.label",
    "field.minimumLevel.label",
    "field.name.label",
    "field.searchTerm.label",
    "field.searchTerm.placeholder",
    "field.stockItemId.label",
    "field.unit.label",
    "field.updatedAt.label",
    "organism.stockItemEditor.title",
    "organism.stockItemsTable.searchTitle",
    "organism.stockItemsTable.title",
    "page.title",
    "section.stockItemEdit.title",
    "section.stockItems.title",
    "stockItemEditSection.title",
    "stockItemEditor.title",
    "stockItemsSection.title",
    "stockItemsTable.title"
  ],
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "stockItemsSection",
        "type": "section",
        "sectionName": "stockItemsSection",
        "titleKey": "stockItemsSection.title",
        "mode": "list",
        "order": 1,
        "organisms": [
          {
            "id": "stockItemsTable",
            "type": "organism",
            "organismName": "StockItemsTable",
            "titleKey": "stockItemsTable.title",
            "purpose": "Listar todos os itens de estoque com destaque para alertas de estoque baixo, permitindo busca e seleção para edição",
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
              "Itens cuja quantidade atual (StockLevel.currentQuantity) está abaixo ou igual ao mínimo (StockItem.minimumLevel) são destacados como alerta",
              "stockItemId é derivado da seleção de linha, nunca digitado manualmente",
              "createdAt e updatedAt são contextuais somente leitura"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "browseStockItemsQuery",
                "intent": "query",
                "order": 1,
                "titleKey": "organism.stockItemsTable.title",
                "source": "ui.stockManagement.data.browseStockItems",
                "binding": "browseStockItems",
                "emptyKey": "empty.stockItems",
                "displayHint": "master-detail",
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
                    "format": "id",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.stockManagement.data.browseStockItems"
                  },
                  {
                    "id": "col-minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "field.minimumLevel.label",
                    "order": 4,
                    "required": false,
                    "inputType": "number",
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
                    "id": "filter-searchTerm",
                    "field": "searchTerm",
                    "labelKey": "field.searchTerm.label",
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
              },
              {
                "id": "searchStockItemsFilter",
                "intent": "filter",
                "order": 2,
                "titleKey": "organism.stockItemsTable.searchTitle",
                "source": "ui.stockManagement.input.browseStockItems.searchTerm",
                "binding": "set.browseStockItemsSearchTerm",
                "displayHint": "summary-first",
                "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm",
                "fields": [
                  {
                    "id": "field-searchTerm",
                    "field": "searchTerm",
                    "labelKey": "field.searchTerm.label",
                    "order": 1,
                    "required": false,
                    "inputType": "search",
                    "stateKey": "ui.stockManagement.input.browseStockItems.searchTerm"
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
      },
      {
        "id": "stockItemEditSection",
        "type": "section",
        "sectionName": "stockItemEditSection",
        "titleKey": "stockItemEditSection.title",
        "mode": "detail",
        "order": 2,
        "organisms": [
          {
            "id": "stockItemEditor",
            "type": "organism",
            "organismName": "StockItemEditor",
            "titleKey": "stockItemEditor.title",
            "purpose": "Painel de edição contextual do item de estoque selecionado, permitindo ajustar nome, unidade e limite mínimo",
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
              "minimumLevel",
              "updatedAt"
            ],
            "writesFields": [
              "name",
              "unit",
              "minimumLevel"
            ],
            "rulesApplied": [
              "stockItemId é derivado da seleção na lista (routeParam), exibido como contexto somente leitura",
              "Apenas name, unit e minimumLevel são editáveis — decisões reais do gerente",
              "Após salvar, a lista de estoque é atualizada para refletir mudanças",
              "Feedback textual de sucesso/erro é exibido e dismissible"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "manageStockItemForm",
                "intent": "command",
                "order": 1,
                "titleKey": "organism.stockItemEditor.title",
                "source": "ui.stockManagement.output.manageStockItem",
                "binding": "manageStockItem",
                "action": "manageStockItem",
                "submitAction": "manageStockItem",
                "emptyKey": "empty.stockItemEditor",
                "displayHint": "master-detail",
                "stateKey": "ui.stockManagement.action.manageStockItem.status",
                "fields": [
                  {
                    "id": "field-edit-stockItemId",
                    "field": "stockItemId",
                    "labelKey": "field.stockItemId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "format": "id",
                    "source": "ui.stockManagement.input.manageStockItem.stockItemId",
                    "stateKey": "ui.stockManagement.input.manageStockItem.stockItemId"
                  },
                  {
                    "id": "field-edit-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "source": "ui.stockManagement.input.manageStockItem.name",
                    "stateKey": "ui.stockManagement.input.manageStockItem.name"
                  },
                  {
                    "id": "field-edit-unit",
                    "field": "unit",
                    "labelKey": "field.unit.label",
                    "order": 3,
                    "required": true,
                    "inputType": "text",
                    "source": "ui.stockManagement.input.manageStockItem.unit",
                    "stateKey": "ui.stockManagement.input.manageStockItem.unit"
                  },
                  {
                    "id": "field-edit-minimumLevel",
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
                    "id": "action-submitManageStockItem",
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
      "id": "binding-browseStockItems",
      "source": "ui.stockManagement.data.browseStockItems",
      "entity": "StockItem",
      "command": "browseStockItems",
      "description": "Lista paginada de itens de estoque retornada pela consulta",
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
      "description": "Resultado do comando de atualização do item de estoque",
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
      "_102051_/l2/cafeFlow/web/shared/stockManagement.ts",
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
