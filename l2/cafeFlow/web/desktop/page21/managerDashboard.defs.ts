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
      "id": "sec-dashboard-list",
      "type": "section",
      "sectionName": "sec-dashboard-list",
      "titleKey": "sec.dashboard.list.title",
      "mode": "list",
      "order": 1,
      "organisms": [
        {
          "id": "org-dashboard-orders",
          "type": "organism",
          "organismName": "DashboardOrdersList",
          "titleKey": "org.dashboard.orders.title",
          "purpose": "Exibir pedidos do turno atual com status, tipo e timestamps para revisão do gerente",
          "userActions": [
            "viewDashboard"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "status",
            "orderType",
            "createdAt",
            "shiftId",
            "deliveredAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-viewDashboard",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-ai-assistant",
      "type": "section",
      "sectionName": "sec-ai-assistant",
      "titleKey": "sec.ai.assistant.title",
      "mode": "detail",
      "order": 2,
      "organisms": [
        {
          "id": "org-ai-sales-summary",
          "type": "organism",
          "organismName": "AiSalesSummary",
          "titleKey": "org.ai.sales.summary.title",
          "purpose": "Exibir resumo de vendas do dia gerado pelo assistente IA para apoio à decisão do gerente",
          "userActions": [
            "requestAiSalesSummary"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId",
            "status",
            "orderType",
            "createdAt",
            "deliveredAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-requestAiSalesSummary",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "order": 1
            }
          ]
        },
        {
          "id": "org-ai-promo-suggestions",
          "type": "organism",
          "organismName": "AiPromoSuggestions",
          "titleKey": "org.ai.promo.suggestions.title",
          "purpose": "Exibir sugestões de promoção por item geradas pelo assistente IA para ações de marketing",
          "userActions": [
            "requestAiPromoSuggestions"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId",
            "orderType",
            "status",
            "createdAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 2,
          "intentionRefs": [
            {
              "id": "intent-requestAiPromoSuggestions",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "split_detail",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "split_detail_page21",
    "type": "page",
    "sections": [
      {
        "id": "sec-dashboard-list",
        "type": "section",
        "sectionName": "sec-dashboard-list",
        "titleKey": "sec.dashboard.list.title",
        "mode": "list",
        "order": 1,
        "organisms": [
          {
            "id": "org-dashboard-orders",
            "type": "organism",
            "organismName": "DashboardOrdersList",
            "titleKey": "org.dashboard.orders.title",
            "purpose": "Exibir pedidos do turno atual com status, tipo e timestamps para revisão do gerente",
            "userActions": [
              "viewDashboard"
            ],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "status",
              "orderType",
              "createdAt",
              "shiftId",
              "deliveredAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent-viewDashboard",
                "intent": "queryList",
                "order": 1,
                "titleKey": "organism.dashboardOrdersList.title",
                "source": "ui.managerDashboard.data.viewDashboard",
                "binding": "binding-viewDashboard",
                "emptyKey": "organism.dashboardOrdersList.empty",
                "displayHint": "table",
                "stateKey": "ui.managerDashboard.data.viewDashboard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-dash-status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dash-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 2,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dash-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 3,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dash-shiftId",
                    "field": "shiftId",
                    "labelKey": "column.shiftId",
                    "order": 4,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dash-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt",
                    "order": 5,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-refresh-dashboard",
                    "action": "viewDashboard",
                    "labelKey": "action.viewDashboard.label",
                    "order": 1,
                    "displayHint": "icon",
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
        "id": "sec-ai-assistant",
        "type": "section",
        "sectionName": "sec-ai-assistant",
        "titleKey": "sec.ai.assistant.title",
        "mode": "detail",
        "order": 2,
        "organisms": [
          {
            "id": "org-ai-sales-summary",
            "type": "organism",
            "organismName": "AiSalesSummary",
            "titleKey": "org.ai.sales.summary.title",
            "purpose": "Exibir resumo de vendas do dia gerado pelo assistente IA para apoio à decisão do gerente",
            "userActions": [
              "requestAiSalesSummary"
            ],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "orderId",
              "status",
              "orderType",
              "createdAt",
              "deliveredAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent-requestAiSalesSummary",
                "intent": "queryList",
                "order": 1,
                "titleKey": "organism.aiSalesSummary.title",
                "source": "ui.managerDashboard.data.requestAiSalesSummary",
                "binding": "binding-requestAiSalesSummary",
                "emptyKey": "organism.aiSalesSummary.empty",
                "displayHint": "table",
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
                "fields": [],
                "columns": [
                  {
                    "id": "col-ai-sales-orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 2,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 3,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 4,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt",
                    "order": 5,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-request-sales-summary",
                    "action": "requestAiSalesSummary",
                    "labelKey": "action.requestAiSalesSummary.label",
                    "order": 1,
                    "displayHint": "button",
                    "actionKey": "requestAiSalesSummary"
                  }
                ],
                "rowActions": [],
                "actions": []
              }
            ]
          },
          {
            "id": "org-ai-promo-suggestions",
            "type": "organism",
            "organismName": "AiPromoSuggestions",
            "titleKey": "org.ai.promo.suggestions.title",
            "purpose": "Exibir sugestões de promoção por item geradas pelo assistente IA para ações de marketing",
            "userActions": [
              "requestAiPromoSuggestions"
            ],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "orderId",
              "orderType",
              "status",
              "createdAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 2,
            "intentions": [
              {
                "id": "intent-requestAiPromoSuggestions",
                "intent": "queryList",
                "order": 1,
                "titleKey": "organism.aiPromoSuggestions.title",
                "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "binding": "binding-requestAiPromoSuggestions",
                "emptyKey": "organism.aiPromoSuggestions.empty",
                "displayHint": "table",
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "fields": [],
                "columns": [
                  {
                    "id": "col-promo-orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-promo-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 2,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-promo-status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 3,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-promo-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 4,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-request-promo-suggestions",
                    "action": "requestAiPromoSuggestions",
                    "labelKey": "action.requestAiPromoSuggestions.label",
                    "order": 1,
                    "displayHint": "button",
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
      "source": "query",
      "entity": "Order",
      "command": "viewDashboard",
      "description": "Consulta o dashboard do dia com pedidos do turno atual",
      "stateKey": "ui.managerDashboard.data.viewDashboard",
      "inputStateKeys": []
    },
    {
      "id": "binding-requestAiSalesSummary",
      "source": "query",
      "entity": "Order",
      "command": "requestAiSalesSummary",
      "description": "Solicita resumo de vendas processado pelo assistente IA",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
      "inputStateKeys": []
    },
    {
      "id": "binding-requestAiPromoSuggestions",
      "source": "query",
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
      "_102051_/l2/cafeFlow/web/shared/managerDashboard.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/managerDashboard.ts",
      "_102051_/l2/cafeFlow/web/contracts/managerDashboard.defs.ts",
      "_102051_/l2/cafeFlow/web/contracts/managerDashboard.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "managerDashboard__l2_shared"
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
