/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/managerDashboard.defs.ts" enhancement="_blank"/>

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
      "id": "sec_dashboard",
      "type": "section",
      "sectionName": "sec_dashboard",
      "titleKey": "sec.dashboard.title",
      "mode": "section",
      "order": 1,
      "organisms": [
        {
          "id": "org_dashboard_metrics",
          "type": "organism",
          "organismName": "DashboardMetrics",
          "titleKey": "org.dashboard.metrics.title",
          "purpose": "Exibir métricas e grupos de status do dashboard do dia — vendas, pedidos por tipo, alertas de estoque baixo.",
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
            "Active shift context is hidden — system identifies open shift automatically",
            "Dashboard aggregates orders of current shift for sales totals and top items",
            "Stock levels below minimum are surfaced as alerts"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_dashboard_query",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_ai_sales",
      "type": "section",
      "sectionName": "sec_ai_sales",
      "titleKey": "sec.ai.sales.title",
      "mode": "section",
      "order": 2,
      "organisms": [
        {
          "id": "org_ai_sales_summary",
          "type": "organism",
          "organismName": "AiSalesSummaryPanel",
          "titleKey": "org.ai.sales.summary.title",
          "purpose": "Painel do assistente IA que exibe o resumo de vendas do dia corrente, agregando pedidos e estoque do turno ativo.",
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
            "AI assistant processes aggregated order and stock data from the domain",
            "System identifies open shift and aggregates current-day orders before AI processing"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_ai_sales_query",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_ai_promo",
      "type": "section",
      "sectionName": "sec_ai_promo",
      "titleKey": "sec.ai.promo.title",
      "mode": "section",
      "order": 3,
      "organisms": [
        {
          "id": "org_ai_promo_suggestions",
          "type": "organism",
          "organismName": "AiPromoSuggestionsPanel",
          "titleKey": "org.ai.promo.suggestions.title",
          "purpose": "Painel do assistente IA que exibe sugestões de promoção por item, baseadas em pedidos dos últimos 7 dias e níveis atuais de estoque.",
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
            "AI assistant analyzes 7-day aggregated order data and current stock levels",
            "Suggestions are per-item for marketing decision support"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_ai_promo_query",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_review",
      "type": "section",
      "sectionName": "sec_review",
      "titleKey": "sec.review.title",
      "mode": "section",
      "order": 4,
      "organisms": [
        {
          "id": "org_review_summary",
          "type": "organism",
          "organismName": "ReviewSummary",
          "titleKey": "org.review.summary.title",
          "purpose": "Revisar o contexto consolidado do dashboard, do resumo de vendas IA e das sugestões de promoção IA para decisão gerencial.",
          "userActions": [],
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
            "deliveredAt",
            "orderId"
          ],
          "writesFields": [],
          "rulesApplied": [
            "Review stage consolidates outputs from all three query operations for at-a-glance comprehension"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_review_summary",
              "intent": "summary",
              "stateKey": "ui.managerDashboard.status",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "status_overview",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "msgKeys": [
    "action.requestAiPromoSuggestions.error",
    "action.requestAiPromoSuggestions.label",
    "action.requestAiPromoSuggestions.success",
    "action.requestAiSalesSummary.error",
    "action.requestAiSalesSummary.label",
    "action.requestAiSalesSummary.success",
    "action.viewDashboard.error",
    "action.viewDashboard.label",
    "action.viewDashboard.success",
    "column.createdAt",
    "column.deliveredAt",
    "column.orderId",
    "column.orderType",
    "column.shiftId",
    "column.status",
    "empty.aiPromo",
    "empty.aiSales",
    "empty.dashboard",
    "empty.review",
    "intention.aiPromo.title",
    "intention.aiSales.title",
    "intention.dashboard.title",
    "intention.review.title",
    "org.ai.promo.suggestions.title",
    "org.ai.sales.summary.title",
    "org.dashboard.metrics.title",
    "org.review.summary.title",
    "page.title",
    "sec.ai.promo.title",
    "sec.ai.sales.title",
    "sec.dashboard.title",
    "sec.review.title",
    "section.aiPromo.title",
    "section.aiSales.title",
    "section.dashboard.title",
    "section.review.title"
  ],
  "layout": {
    "id": "page11_status_overview",
    "type": "page",
    "sections": [
      {
        "id": "sec_dashboard",
        "type": "section",
        "sectionName": "sec_dashboard",
        "titleKey": "sec.dashboard.title",
        "mode": "section",
        "order": 1,
        "organisms": [
          {
            "id": "org_dashboard_metrics",
            "type": "organism",
            "organismName": "DashboardMetrics",
            "titleKey": "org.dashboard.metrics.title",
            "purpose": "Exibir métricas e grupos de status do dashboard do dia — vendas, pedidos por tipo, alertas de estoque baixo.",
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
              "Active shift context is hidden — system identifies open shift automatically",
              "Dashboard aggregates orders of current shift for sales totals and top items",
              "Stock levels below minimum are surfaced as alerts"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_dashboard_query",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.dashboard.title",
                "source": "ui.managerDashboard.data.viewDashboard",
                "binding": "db_viewDashboard",
                "emptyKey": "empty.dashboard",
                "displayHint": "statusGroup",
                "stateKey": "ui.managerDashboard.data.viewDashboard",
                "fields": [],
                "columns": [
                  {
                    "id": "col_dash_status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_dash_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_dash_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 3,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_dash_shiftId",
                    "field": "shiftId",
                    "labelKey": "column.shiftId",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_dash_deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt",
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
                    "id": "tb_dash_refresh",
                    "action": "viewDashboard",
                    "labelKey": "action.viewDashboard.label",
                    "order": 1,
                    "displayHint": "primary",
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
        "id": "sec_ai_sales",
        "type": "section",
        "sectionName": "sec_ai_sales",
        "titleKey": "sec.ai.sales.title",
        "mode": "section",
        "order": 2,
        "organisms": [
          {
            "id": "org_ai_sales_summary",
            "type": "organism",
            "organismName": "AiSalesSummaryPanel",
            "titleKey": "org.ai.sales.summary.title",
            "purpose": "Painel do assistente IA que exibe o resumo de vendas do dia corrente, agregando pedidos e estoque do turno ativo.",
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
              "AI assistant processes aggregated order and stock data from the domain",
              "System identifies open shift and aggregates current-day orders before AI processing"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_ai_sales_query",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.aiSales.title",
                "source": "ui.managerDashboard.data.requestAiSalesSummary",
                "binding": "db_requestAiSalesSummary",
                "emptyKey": "empty.aiSales",
                "displayHint": "summaryCard",
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
                "fields": [],
                "columns": [
                  {
                    "id": "col_sales_orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_sales_status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_sales_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_sales_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 4,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_sales_deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt",
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
                    "id": "tb_sales_refresh",
                    "action": "requestAiSalesSummary",
                    "labelKey": "action.requestAiSalesSummary.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "requestAiSalesSummary"
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
        "id": "sec_ai_promo",
        "type": "section",
        "sectionName": "sec_ai_promo",
        "titleKey": "sec.ai.promo.title",
        "mode": "section",
        "order": 3,
        "organisms": [
          {
            "id": "org_ai_promo_suggestions",
            "type": "organism",
            "organismName": "AiPromoSuggestionsPanel",
            "titleKey": "org.ai.promo.suggestions.title",
            "purpose": "Painel do assistente IA que exibe sugestões de promoção por item, baseadas em pedidos dos últimos 7 dias e níveis atuais de estoque.",
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
              "AI assistant analyzes 7-day aggregated order data and current stock levels",
              "Suggestions are per-item for marketing decision support"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_ai_promo_query",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.aiPromo.title",
                "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "binding": "db_requestAiPromoSuggestions",
                "emptyKey": "empty.aiPromo",
                "displayHint": "summaryCard",
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "fields": [],
                "columns": [
                  {
                    "id": "col_promo_orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col_promo_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col_promo_status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col_promo_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
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
                    "id": "tb_promo_refresh",
                    "action": "requestAiPromoSuggestions",
                    "labelKey": "action.requestAiPromoSuggestions.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "requestAiPromoSuggestions"
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
        "id": "sec_review",
        "type": "section",
        "sectionName": "sec_review",
        "titleKey": "sec.review.title",
        "mode": "section",
        "order": 4,
        "organisms": [
          {
            "id": "org_review_summary",
            "type": "organism",
            "organismName": "ReviewSummary",
            "titleKey": "org.review.summary.title",
            "purpose": "Revisar o contexto consolidado do dashboard, do resumo de vendas IA e das sugestões de promoção IA para decisão gerencial.",
            "userActions": [],
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
              "deliveredAt",
              "orderId"
            ],
            "writesFields": [],
            "rulesApplied": [
              "Review stage consolidates outputs from all three query operations for at-a-glance comprehension"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_review_summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "intention.review.title",
                "source": "ui.managerDashboard.data.viewDashboard",
                "binding": "db_viewDashboard",
                "emptyKey": "empty.review",
                "displayHint": "summaryCard",
                "stateKey": "ui.managerDashboard.status",
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
      "id": "db_viewDashboard",
      "source": "cafeFlow.viewDashboard.viewDashboard",
      "entity": "Order",
      "command": "viewDashboard",
      "description": "Consulta o dashboard do dia agregando pedidos, itens mais vendidos e alertas de estoque do turno atual.",
      "stateKey": "ui.managerDashboard.data.viewDashboard",
      "inputStateKeys": []
    },
    {
      "id": "db_requestAiSalesSummary",
      "source": "cafeFlow.requestAiSalesSummary.requestAiSalesSummary",
      "entity": "Order",
      "command": "requestAiSalesSummary",
      "description": "Solicita ao assistente IA o resumo de vendas do dia corrente baseado nos pedidos e estoque do turno ativo.",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
      "inputStateKeys": []
    },
    {
      "id": "db_requestAiPromoSuggestions",
      "source": "cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions",
      "entity": "Order",
      "command": "requestAiPromoSuggestions",
      "description": "Solicita ao assistente IA sugestões de promoção por item baseadas em pedidos dos últimos 7 dias e níveis de estoque.",
      "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
      "inputStateKeys": []
    }
  ]
};

export const pipeline = [
  {
    "id": "managerDashboard__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/managerDashboard.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/managerDashboard.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/managerDashboard.ts",
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
