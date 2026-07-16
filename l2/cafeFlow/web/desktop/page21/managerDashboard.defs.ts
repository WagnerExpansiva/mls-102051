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
      "id": "sec_dashboard",
      "type": "section",
      "sectionName": "sec_dashboard",
      "titleKey": "sec.dashboard.title",
      "mode": "summary-first",
      "order": 1,
      "organisms": [
        {
          "id": "org_dashboard_summary",
          "type": "organism",
          "organismName": "DashboardSummaryList",
          "titleKey": "org.dashboard.summary.title",
          "purpose": "Exibir resumo do dashboard do dia com pedidos agregados por status e tipo, permitindo ao gerente avaliar a operação atual em uma olhada.",
          "userActions": [
            "viewDashboard"
          ],
          "requiredEntities": [
            "Order",
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
            "Auto-loaded on page init via initialLoads",
            "All fields are read-only query outputs — no manual input",
            "shiftId is context-derived from the currently open shift"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_view_dashboard",
              "intent": "query",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_ai_assistant",
      "type": "section",
      "sectionName": "sec_ai_assistant",
      "titleKey": "sec.ai.assistant.title",
      "mode": "on-demand-panels",
      "order": 2,
      "organisms": [
        {
          "id": "org_ai_sales_summary",
          "type": "organism",
          "organismName": "AiSalesSummaryPanel",
          "titleKey": "org.ai.sales.summary.title",
          "purpose": "Permitir ao gerente solicitar e visualizar o resumo de vendas gerado pelo assistente IA para o turno atual.",
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
            "Auto-loaded on page init via initialLoads",
            "All fields are read-only AI-generated query outputs",
            "No manual input required — the AI aggregates domain data automatically"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_ai_sales_summary",
              "intent": "query",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "order": 1
            }
          ]
        },
        {
          "id": "org_ai_promo_suggestions",
          "type": "organism",
          "organismName": "AiPromoSuggestionsPanel",
          "titleKey": "org.ai.promo.suggestions.title",
          "purpose": "Permitir ao gerente acionar o assistente IA para obter sugestões de promoção baseadas em pedidos recentes e níveis de estoque, e visualizar os resultados para decidir ações de marketing.",
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
            "Auto-loaded on page init via initialLoads",
            "All fields are read-only AI-generated query outputs",
            "No manual input required — the AI aggregates 7-day order data and stock levels automatically"
          ],
          "order": 2,
          "intentionRefs": [
            {
              "id": "intent_ai_promo_suggestions",
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
    "actor": "Cafe manager (gerente)",
    "jobToBeDone": "Get an at-a-glance overview of today's cafe operations (orders, sales, stock alerts) and optionally request AI-generated insights for sales summary and promotion suggestions.",
    "primaryDecision": "Assess today's operational performance from the dashboard and decide whether to act on AI-generated sales summaries and promo suggestions.",
    "decisiveInfo": [
      "status",
      "orderType",
      "createdAt",
      "deliveredAt",
      "orderId",
      "shiftId"
    ],
    "usageFrequency": "Occasional / back-office — checked a few times per shift, not continuous hands-busy operation.",
    "criticalActions": [
      {
        "action": "viewDashboard",
        "presentation": "summary-first — auto-loaded on page open, displayed as a compact summary list of today's orders by status and type; a refresh button is available in the toolbar."
      },
      {
        "action": "requestAiSalesSummary",
        "presentation": "primary-button — on-demand AI query triggered by a prominent button; results appear in a summary panel below."
      },
      {
        "action": "requestAiPromoSuggestions",
        "presentation": "primary-button — on-demand AI query triggered by a prominent button; results appear in a summary panel for marketing decisions."
      }
    ],
    "informationHierarchy": [
      "1. Today's dashboard: orders grouped by status and type, with timestamps (summary-first)",
      "2. AI sales summary: on-demand aggregated sales insights for the current shift",
      "3. AI promo suggestions: on-demand promotion recommendations based on recent sales and stock levels"
    ],
    "successCriteria": "The manager sees today's key operational metrics immediately on page load without any manual input, and can request AI insights with a single click per insight type.",
    "antiPatterns": [
      "No manual input fields — all three operations are parameterless queries",
      "No CRUD forms — this is a read-only dashboard, not an entity management screen",
      "No free status selects or typed IDs — everything is auto-loaded from the open shift context",
      "No persuasion mechanics — this is an operational dashboard, not a growth funnel",
      "Do not stack three identical-looking tables — differentiate the dashboard summary from the AI panels visually"
    ]
  },
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "sec_dashboard",
        "type": "section",
        "sectionName": "sec_dashboard",
        "titleKey": "sec.dashboard.title",
        "mode": "summary-first",
        "order": 1,
        "organisms": [
          {
            "id": "org_dashboard_summary",
            "type": "organism",
            "organismName": "DashboardSummaryList",
            "titleKey": "org.dashboard.summary.title",
            "purpose": "Exibir resumo do dashboard do dia com pedidos agregados por status e tipo, permitindo ao gerente avaliar a operação atual em uma olhada.",
            "userActions": [
              "viewDashboard"
            ],
            "requiredEntities": [
              "Order",
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
              "Auto-loaded on page init via initialLoads",
              "All fields are read-only query outputs — no manual input",
              "shiftId is context-derived from the currently open shift"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_view_dashboard",
                "intent": "query",
                "order": 1,
                "titleKey": "organism.dashboardSummary.title",
                "source": "viewDashboard",
                "binding": "ui.managerDashboard.data.viewDashboard",
                "emptyKey": "organism.dashboardSummary.empty",
                "displayHint": "summary-first",
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
                    "source": "viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_dash_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_dash_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_dash_shiftId",
                    "field": "shiftId",
                    "labelKey": "column.shiftId",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_dash_deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb_refresh_dashboard",
                    "action": "viewDashboard",
                    "labelKey": "action.viewDashboard.label",
                    "order": 1,
                    "displayHint": "primary-button",
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
        "id": "sec_ai_assistant",
        "type": "section",
        "sectionName": "sec_ai_assistant",
        "titleKey": "sec.ai.assistant.title",
        "mode": "on-demand-panels",
        "order": 2,
        "organisms": [
          {
            "id": "org_ai_sales_summary",
            "type": "organism",
            "organismName": "AiSalesSummaryPanel",
            "titleKey": "org.ai.sales.summary.title",
            "purpose": "Permitir ao gerente solicitar e visualizar o resumo de vendas gerado pelo assistente IA para o turno atual.",
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
              "Auto-loaded on page init via initialLoads",
              "All fields are read-only AI-generated query outputs",
              "No manual input required — the AI aggregates domain data automatically"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_ai_sales_summary",
                "intent": "query",
                "order": 1,
                "titleKey": "organism.aiSalesSummary.title",
                "source": "requestAiSalesSummary",
                "binding": "ui.managerDashboard.data.requestAiSalesSummary",
                "emptyKey": "organism.aiSalesSummary.empty",
                "displayHint": "summary-first",
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
                "fields": [],
                "columns": [
                  {
                    "id": "col_ai_sales_orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_ai_sales_status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_ai_sales_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_ai_sales_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_ai_sales_deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb_request_ai_sales",
                    "action": "requestAiSalesSummary",
                    "labelKey": "action.requestAiSalesSummary.label",
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
            "id": "org_ai_promo_suggestions",
            "type": "organism",
            "organismName": "AiPromoSuggestionsPanel",
            "titleKey": "org.ai.promo.suggestions.title",
            "purpose": "Permitir ao gerente acionar o assistente IA para obter sugestões de promoção baseadas em pedidos recentes e níveis de estoque, e visualizar os resultados para decidir ações de marketing.",
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
              "Auto-loaded on page init via initialLoads",
              "All fields are read-only AI-generated query outputs",
              "No manual input required — the AI aggregates 7-day order data and stock levels automatically"
            ],
            "order": 2,
            "intentions": [
              {
                "id": "intent_ai_promo_suggestions",
                "intent": "query",
                "order": 1,
                "titleKey": "organism.aiPromoSuggestions.title",
                "source": "requestAiPromoSuggestions",
                "binding": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "emptyKey": "organism.aiPromoSuggestions.empty",
                "displayHint": "summary-first",
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "fields": [],
                "columns": [
                  {
                    "id": "col_ai_promo_orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col_ai_promo_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col_ai_promo_status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col_ai_promo_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb_request_ai_promo",
                    "action": "requestAiPromoSuggestions",
                    "labelKey": "action.requestAiPromoSuggestions.label",
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
      "id": "binding_viewDashboard",
      "source": "query",
      "entity": "Order",
      "command": "viewDashboard",
      "description": "Carrega os dados do dashboard do dia (pedidos do turno atual)",
      "stateKey": "ui.managerDashboard.data.viewDashboard",
      "inputStateKeys": []
    },
    {
      "id": "binding_requestAiSalesSummary",
      "source": "query",
      "entity": "Order",
      "command": "requestAiSalesSummary",
      "description": "Solicita resumo de vendas gerado pelo assistente IA",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
      "inputStateKeys": []
    },
    {
      "id": "binding_requestAiPromoSuggestions",
      "source": "query",
      "entity": "Order",
      "command": "requestAiPromoSuggestions",
      "description": "Solicita sugestões de promoção geradas pelo assistente IA",
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
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
