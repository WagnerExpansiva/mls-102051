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
      "mode": "overview",
      "order": 0,
      "organisms": [
        {
          "id": "org_dashboard_metrics",
          "type": "organism",
          "organismName": "DashboardMetrics",
          "titleKey": "org.dashboard.metrics.title",
          "purpose": "Exibir vendas do dia, itens mais vendidos e alertas de estoque baixo agrupados por status do pedido",
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
            "O sistema identifica o turno atualmente aberto para filtrar os dados",
            "O sistema agrega os pedidos do turno atual calculando o total de vendas",
            "O sistema calcula os itens mais vendidos com base nos pedidos do dia",
            "O sistema verifica os níveis de estoque abaixo do mínimo configurado"
          ],
          "order": 0,
          "intentionRefs": [
            {
              "id": "int_view_dashboard",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "order": 0
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
      "mode": "overview",
      "order": 1,
      "organisms": [
        {
          "id": "org_ai_sales_summary",
          "type": "organism",
          "organismName": "AiSalesSummary",
          "titleKey": "org.ai.sales.summary.title",
          "purpose": "Solicitar e exibir o resumo de vendas do dia gerado pelo assistente IA",
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
            "O sistema identifica o turno atualmente aberto e agrega os pedidos do dia corrente",
            "O assistente IA processa os dados agregados de pedidos e estoque e gera o resumo de vendas"
          ],
          "order": 0,
          "intentionRefs": [
            {
              "id": "int_ai_sales_summary",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "order": 0
            }
          ]
        },
        {
          "id": "org_ai_promo_suggestions",
          "type": "organism",
          "organismName": "AiPromoSuggestions",
          "titleKey": "org.ai.promo.suggestions.title",
          "purpose": "Solicitar e exibir sugestões de promoção por item geradas pelo assistente IA",
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
            "O sistema agrega os dados de pedidos e itens vendidos dos últimos 7 dias e os níveis atuais de estoque",
            "O assistente IA analisa os dados agregados do domínio e gera sugestões de promoção por item"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int_ai_promo_suggestions",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "order": 0
            }
          ]
        }
      ]
    }
  ],
  "templateId": "status_overview",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "status_overview_page11",
    "type": "page",
    "sections": [
      {
        "id": "sec_dashboard",
        "type": "section",
        "sectionName": "sec_dashboard",
        "titleKey": "sec.dashboard.title",
        "mode": "overview",
        "order": 0,
        "organisms": [
          {
            "id": "org_dashboard_metrics",
            "type": "organism",
            "organismName": "DashboardMetrics",
            "titleKey": "org.dashboard.metrics.title",
            "purpose": "Exibir vendas do dia, itens mais vendidos e alertas de estoque baixo agrupados por status do pedido",
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
              "O sistema identifica o turno atualmente aberto para filtrar os dados",
              "O sistema agrega os pedidos do turno atual calculando o total de vendas",
              "O sistema calcula os itens mais vendidos com base nos pedidos do dia",
              "O sistema verifica os níveis de estoque abaixo do mínimo configurado"
            ],
            "order": 0,
            "intentions": [
              {
                "id": "int_view_dashboard",
                "intent": "queryList",
                "order": 0,
                "titleKey": "organism.dashboardMetrics.title",
                "source": "ui.managerDashboard.data.viewDashboard",
                "emptyKey": "empty.viewDashboard",
                "displayHint": "statusGroups",
                "stateKey": "ui.managerDashboard.data.viewDashboard",
                "fields": [],
                "columns": [
                  {
                    "id": "col_vd_status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 0,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_vd_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_vd_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 2,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_vd_shiftId",
                    "field": "shiftId",
                    "labelKey": "column.shiftId",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col_vd_deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt",
                    "order": 4,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb_vd_refresh",
                    "action": "viewDashboard",
                    "labelKey": "action.viewDashboard.label",
                    "order": 0,
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
        "id": "sec_ai_assistant",
        "type": "section",
        "sectionName": "sec_ai_assistant",
        "titleKey": "sec.ai.assistant.title",
        "mode": "overview",
        "order": 1,
        "organisms": [
          {
            "id": "org_ai_sales_summary",
            "type": "organism",
            "organismName": "AiSalesSummary",
            "titleKey": "org.ai.sales.summary.title",
            "purpose": "Solicitar e exibir o resumo de vendas do dia gerado pelo assistente IA",
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
              "O sistema identifica o turno atualmente aberto e agrega os pedidos do dia corrente",
              "O assistente IA processa os dados agregados de pedidos e estoque e gera o resumo de vendas"
            ],
            "order": 0,
            "intentions": [
              {
                "id": "int_ai_sales_summary",
                "intent": "queryList",
                "order": 0,
                "titleKey": "organism.aiSalesSummary.title",
                "source": "ui.managerDashboard.data.requestAiSalesSummary",
                "emptyKey": "empty.requestAiSalesSummary",
                "displayHint": "summaryList",
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
                "fields": [],
                "columns": [
                  {
                    "id": "col_as_orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 0,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_as_status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_as_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_as_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 3,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col_as_deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt",
                    "order": 4,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb_as_request",
                    "action": "requestAiSalesSummary",
                    "labelKey": "action.requestAiSalesSummary.label",
                    "order": 0,
                    "displayHint": "primary",
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
            "organismName": "AiPromoSuggestions",
            "titleKey": "org.ai.promo.suggestions.title",
            "purpose": "Solicitar e exibir sugestões de promoção por item geradas pelo assistente IA",
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
              "O sistema agrega os dados de pedidos e itens vendidos dos últimos 7 dias e os níveis atuais de estoque",
              "O assistente IA analisa os dados agregados do domínio e gera sugestões de promoção por item"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int_ai_promo_suggestions",
                "intent": "queryList",
                "order": 0,
                "titleKey": "organism.aiPromoSuggestions.title",
                "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "emptyKey": "empty.requestAiPromoSuggestions",
                "displayHint": "suggestionList",
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "fields": [],
                "columns": [
                  {
                    "id": "col_ps_orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 0,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col_ps_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col_ps_status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col_ps_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 3,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb_ps_request",
                    "action": "requestAiPromoSuggestions",
                    "labelKey": "action.requestAiPromoSuggestions.label",
                    "order": 0,
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
      }
    ]
  },
  "dataBindings": [
    {
      "id": "bind_viewDashboard",
      "source": "ui.managerDashboard.data.viewDashboard",
      "entity": "Order",
      "command": "viewDashboard",
      "description": "Dados agregados do dashboard do dia (pedidos por status, itens mais vendidos, alertas de estoque)",
      "stateKey": "ui.managerDashboard.data.viewDashboard",
      "inputStateKeys": []
    },
    {
      "id": "bind_requestAiSalesSummary",
      "source": "ui.managerDashboard.data.requestAiSalesSummary",
      "entity": "Order",
      "command": "requestAiSalesSummary",
      "description": "Resumo de vendas gerado pelo assistente IA",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
      "inputStateKeys": []
    },
    {
      "id": "bind_requestAiPromoSuggestions",
      "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
      "entity": "Order",
      "command": "requestAiPromoSuggestions",
      "description": "Sugestões de promoção geradas pelo assistente IA",
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
