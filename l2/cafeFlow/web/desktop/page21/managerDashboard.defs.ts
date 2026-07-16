/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/managerDashboard.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "managerDashboard",
  "pageName": "Dashboard e assistente IA",
  "baseClassName": "CafeFlowManagerDashboardBase",
  "actor": "gerente",
  "purpose": "Executar Dashboard e assistente IA.",
  "capabilities": [
    "viewDashboard",
    "requestAiSalesSummary",
    "requestAiPromoSuggestions"
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
    "workspaceId": "managerDashboard",
    "workspaceKind": "operation",
    "actor": "gerente",
    "entity": "Order",
    "owners": [
      {
        "kind": "operation",
        "id": "viewDashboard",
        "defPath": "_102051_/l4/operations/viewDashboard.defs.ts"
      },
      {
        "kind": "operation",
        "id": "requestAiSalesSummary",
        "defPath": "_102051_/l4/operations/requestAiSalesSummary.defs.ts"
      },
      {
        "kind": "operation",
        "id": "requestAiPromoSuggestions",
        "defPath": "_102051_/l4/operations/requestAiPromoSuggestions.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "viewDashboard",
          "commandName": "viewDashboard",
          "steps": [
            "O gerente abre o dashboard do dia",
            "O sistema identifica o turno atualmente aberto para filtrar os dados",
            "O sistema agrega os pedidos do turno atual calculando o total de vendas",
            "O sistema calcula os itens mais vendidos com base nos pedidos do dia",
            "O sistema verifica os níveis de estoque abaixo do mínimo configurado",
            "O dashboard exibe vendas do dia, itens mais vendidos e alertas de estoque baixo"
          ]
        },
        {
          "operationId": "requestAiSalesSummary",
          "commandName": "requestAiSalesSummary",
          "steps": [
            "O gerente solicita o resumo de vendas do dia ao assistente IA",
            "O sistema identifica o turno atualmente aberto e agrega os pedidos do dia corrente",
            "O assistente IA processa os dados agregados de pedidos e estoque disponibilizados pelo domínio e gera o resumo de vendas"
          ]
        },
        {
          "operationId": "requestAiPromoSuggestions",
          "commandName": "requestAiPromoSuggestions",
          "steps": [
            "O gerente aciona o assistente IA solicitando sugestões de promoção",
            "O sistema agrega os dados de pedidos e itens vendidos dos últimos 7 dias, bem como os níveis atuais de estoque",
            "O assistente IA analisa os dados agregados do domínio e gera sugestões de promoção por item",
            "O gerente visualiza as sugestões geradas para decidir ações de marketing"
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "dashboardOverview",
      "type": "section",
      "sectionName": "dashboardOverview",
      "titleKey": "dashboardOverview.title",
      "mode": "summary-first",
      "order": 1,
      "organisms": [
        {
          "id": "dashboardSummary",
          "type": "organism",
          "organismName": "DashboardSummary",
          "titleKey": "dashboardSummary.title",
          "purpose": "Exibir resumo do dia com pedidos agregados do turno atual, distribuição de status e alertas de estoque baixo",
          "userActions": [
            "viewDashboard"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "StockLevel",
            "Shift"
          ],
          "readsFields": [
            "status",
            "orderType",
            "createdAt",
            "shiftId",
            "deliveredAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "Auto-load on page entry via initialLoads",
            "Summary-first: lead with decisive operational numbers"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "viewDashboardQuery",
              "intent": "query",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "aiAssistant",
      "type": "section",
      "sectionName": "aiAssistant",
      "titleKey": "aiAssistant.title",
      "mode": "summary-first",
      "order": 2,
      "organisms": [
        {
          "id": "aiSalesSummary",
          "type": "organism",
          "organismName": "AiSalesSummary",
          "titleKey": "aiSalesSummary.title",
          "purpose": "Permitir ao gerente solicitar e visualizar o resumo de vendas gerado pelo assistente IA para o turno atual",
          "userActions": [
            "requestAiSalesSummary"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "Shift",
            "StockLevel"
          ],
          "readsFields": [
            "orderId",
            "status",
            "orderType",
            "createdAt",
            "deliveredAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "On-demand AI insight: toolbar button triggers query",
            "Auto-load on page entry via initialLoads"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "requestAiSalesSummaryQuery",
              "intent": "query",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "order": 1
            }
          ]
        },
        {
          "id": "aiPromoSuggestions",
          "type": "organism",
          "organismName": "AiPromoSuggestions",
          "titleKey": "aiPromoSuggestions.title",
          "purpose": "Permitir ao gerente acionar o assistente IA para obter sugestões de promoção e visualizá-las para decidir ações de marketing",
          "userActions": [
            "requestAiPromoSuggestions"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "StockLevel"
          ],
          "readsFields": [
            "orderId",
            "orderType",
            "status",
            "createdAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "On-demand AI insight: toolbar button triggers query",
            "Auto-load on page entry via initialLoads"
          ],
          "order": 2,
          "intentionRefs": [
            {
              "id": "requestAiPromoSuggestionsQuery",
              "intent": "query",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
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
    "actor": "Gerente do café (cafe manager)",
    "jobToBeDone": "Visualizar o resumo operacional do turno atual à primeira vista e, sob demanda, solicitar insights de IA (resumo de vendas e sugestões de promoção) para apoiar decisões de marketing.",
    "primaryDecision": "Avaliar a saúde operacional do dia e decidir se deve agir com base nas recomendações geradas pelo assistente IA.",
    "decisiveInfo": [
      "status",
      "orderType",
      "createdAt",
      "shiftId",
      "deliveredAt",
      "orderId"
    ],
    "usageFrequency": "Ocasional / back-office — o gerente consulta algumas vezes por turno, não em uso contínuo hands-busy.",
    "criticalActions": [
      {
        "action": "viewDashboard",
        "presentation": "summary-first — auto-carregado na entrada da página, com botão de atualização na toolbar"
      },
      {
        "action": "requestAiSalesSummary",
        "presentation": "primary-button na toolbar — acionamento sob demanda do resumo de vendas por IA"
      },
      {
        "action": "requestAiPromoSuggestions",
        "presentation": "primary-button na toolbar — acionamento sob demanda das sugestões de promoção por IA"
      }
    ],
    "informationHierarchy": [
      "1. Resumo operacional do turno (pedidos, status, timestamps) — auto-carregado",
      "2. Resumo de vendas por IA — sob demanda",
      "3. Sugestões de promoção por IA — sob demanda"
    ],
    "successCriteria": "O gerente vê o status operacional do dia imediatamente ao abrir a página, pode solicitar insights de IA com um clique e revisar as sugestões para informar decisões de marketing.",
    "antiPatterns": [
      "Nenhum formulário CRUD — todas as ações são queries de leitura",
      "Nenhum campo de id digitado manualmente",
      "Nenhum select livre de status — status é exibido como contexto somente leitura",
      "Não degradar em uma pilha CRUD genérica",
      "Não adicionar mecânicas de persuasão em tela operacional"
    ]
  },
  "msgKeys": [
    "action.requestAiPromoSuggestions.request",
    "action.requestAiSalesSummary.request",
    "action.viewDashboard.refresh",
    "aiAssistant.title",
    "aiPromoSuggestions.title",
    "aiSalesSummary.title",
    "dashboardOverview.title",
    "dashboardSummary.title",
    "empty.requestAiPromoSuggestions",
    "empty.requestAiSalesSummary",
    "empty.viewDashboard",
    "field.createdAt.label",
    "field.deliveredAt.label",
    "field.orderId.label",
    "field.orderType.label",
    "field.shiftId.label",
    "field.status.label",
    "organism.aiPromoSuggestions.title",
    "organism.aiSalesSummary.title",
    "organism.dashboardSummary.title",
    "section.aiAssistant.title",
    "section.dashboardOverview.title"
  ],
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "dashboardOverview",
        "type": "section",
        "sectionName": "dashboardOverview",
        "titleKey": "dashboardOverview.title",
        "mode": "summary-first",
        "order": 1,
        "organisms": [
          {
            "id": "dashboardSummary",
            "type": "organism",
            "organismName": "DashboardSummary",
            "titleKey": "dashboardSummary.title",
            "purpose": "Exibir resumo do dia com pedidos agregados do turno atual, distribuição de status e alertas de estoque baixo",
            "userActions": [
              "viewDashboard"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "StockLevel",
              "Shift"
            ],
            "readsFields": [
              "status",
              "orderType",
              "createdAt",
              "shiftId",
              "deliveredAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "Auto-load on page entry via initialLoads",
              "Summary-first: lead with decisive operational numbers"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "viewDashboardQuery",
                "intent": "query",
                "order": 1,
                "titleKey": "organism.dashboardSummary.title",
                "source": "ui.managerDashboard.data.viewDashboard",
                "binding": "viewDashboard",
                "emptyKey": "empty.viewDashboard",
                "displayHint": "summary-first",
                "stateKey": "ui.managerDashboard.data.viewDashboard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 3,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-shiftId",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "field.deliveredAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-viewDashboard-refresh",
                    "action": "viewDashboard",
                    "labelKey": "action.viewDashboard.refresh",
                    "order": 1,
                    "displayHint": "inline-row-command",
                    "actionKey": "viewDashboard"
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
        "id": "aiAssistant",
        "type": "section",
        "sectionName": "aiAssistant",
        "titleKey": "aiAssistant.title",
        "mode": "summary-first",
        "order": 2,
        "organisms": [
          {
            "id": "aiSalesSummary",
            "type": "organism",
            "organismName": "AiSalesSummary",
            "titleKey": "aiSalesSummary.title",
            "purpose": "Permitir ao gerente solicitar e visualizar o resumo de vendas gerado pelo assistente IA para o turno atual",
            "userActions": [
              "requestAiSalesSummary"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "Shift",
              "StockLevel"
            ],
            "readsFields": [
              "orderId",
              "status",
              "orderType",
              "createdAt",
              "deliveredAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "On-demand AI insight: toolbar button triggers query",
              "Auto-load on page entry via initialLoads"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "requestAiSalesSummaryQuery",
                "intent": "query",
                "order": 1,
                "titleKey": "organism.aiSalesSummary.title",
                "source": "ui.managerDashboard.data.requestAiSalesSummary",
                "binding": "requestAiSalesSummary",
                "emptyKey": "empty.requestAiSalesSummary",
                "displayHint": "summary-first",
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
                "fields": [],
                "columns": [
                  {
                    "id": "col-aiSales-orderId",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aiSales-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aiSales-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aiSales-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 4,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aiSales-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "field.deliveredAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-aiSalesSummary-request",
                    "action": "requestAiSalesSummary",
                    "labelKey": "action.requestAiSalesSummary.request",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "requestAiSalesSummary"
                  }
                ],
                "rowActions": [],
                "actions": []
              }
            ]
          },
          {
            "id": "aiPromoSuggestions",
            "type": "organism",
            "organismName": "AiPromoSuggestions",
            "titleKey": "aiPromoSuggestions.title",
            "purpose": "Permitir ao gerente acionar o assistente IA para obter sugestões de promoção e visualizá-las para decidir ações de marketing",
            "userActions": [
              "requestAiPromoSuggestions"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "StockLevel"
            ],
            "readsFields": [
              "orderId",
              "orderType",
              "status",
              "createdAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "On-demand AI insight: toolbar button triggers query",
              "Auto-load on page entry via initialLoads"
            ],
            "order": 2,
            "intentions": [
              {
                "id": "requestAiPromoSuggestionsQuery",
                "intent": "query",
                "order": 1,
                "titleKey": "organism.aiPromoSuggestions.title",
                "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "binding": "requestAiPromoSuggestions",
                "emptyKey": "empty.requestAiPromoSuggestions",
                "displayHint": "summary-first",
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "fields": [],
                "columns": [
                  {
                    "id": "col-aiPromo-orderId",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-aiPromo-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-aiPromo-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-aiPromo-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 4,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-aiPromoSuggestions-request",
                    "action": "requestAiPromoSuggestions",
                    "labelKey": "action.requestAiPromoSuggestions.request",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "requestAiPromoSuggestions"
                  }
                ],
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
      "id": "binding-viewDashboard",
      "source": "cafeFlow.viewDashboard.viewDashboard",
      "entity": "Order",
      "command": "viewDashboard",
      "description": "Carrega dados agregados do dashboard do turno atual",
      "stateKey": "ui.managerDashboard.data.viewDashboard",
      "inputStateKeys": []
    },
    {
      "id": "binding-requestAiSalesSummary",
      "source": "cafeFlow.requestAiSalesSummary.requestAiSalesSummary",
      "entity": "Order",
      "command": "requestAiSalesSummary",
      "description": "Solicita resumo de vendas processado pelo assistente IA",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
      "inputStateKeys": []
    },
    {
      "id": "binding-requestAiPromoSuggestions",
      "source": "cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions",
      "entity": "Order",
      "command": "requestAiPromoSuggestions",
      "description": "Solicita sugestões de promoção processadas pelo assistente IA",
      "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
      "inputStateKeys": []
    }
  ]
};

export const pipeline = [
  {
    "id": "managerDashboard__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/managerDashboard.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/managerDashboard.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/managerDashboard.ts",
      "_102051_/l2/cafeFlow/web/contracts/managerDashboard.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "managerDashboard__l2_shared"
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
