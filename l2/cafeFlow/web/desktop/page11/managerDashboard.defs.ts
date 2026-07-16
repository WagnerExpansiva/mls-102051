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
      "id": "sec-dashboard-overview",
      "type": "section",
      "sectionName": "sec-dashboard-overview",
      "titleKey": "sec.dashboard.overview.title",
      "mode": "default",
      "order": 1,
      "organisms": [
        {
          "id": "org-dashboard-metrics",
          "type": "organism",
          "organismName": "statusGroup",
          "titleKey": "org.dashboard.metrics.title",
          "purpose": "Exibir métricas e status dos pedidos do turno atual no dashboard do dia",
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
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-view-dashboard",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "action": "viewDashboard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-ai-sales-summary",
      "type": "section",
      "sectionName": "sec-ai-sales-summary",
      "titleKey": "sec.ai.sales.summary.title",
      "mode": "default",
      "order": 2,
      "organisms": [
        {
          "id": "org-ai-sales-summary",
          "type": "organism",
          "organismName": "summaryPanel",
          "titleKey": "org.ai.sales.summary.title",
          "purpose": "Exibir o resumo de vendas do dia gerado pelo assistente IA",
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
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-ai-sales-summary",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "action": "requestAiSalesSummary",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-ai-promo-suggestions",
      "type": "section",
      "sectionName": "sec-ai-promo-suggestions",
      "titleKey": "sec.ai.promo.suggestions.title",
      "mode": "default",
      "order": 3,
      "organisms": [
        {
          "id": "org-ai-promo-suggestions",
          "type": "organism",
          "organismName": "summaryPanel",
          "titleKey": "org.ai.promo.suggestions.title",
          "purpose": "Exibir sugestões de promoção geradas pelo assistente IA para decisão de marketing",
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
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-ai-promo-suggestions",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "action": "requestAiPromoSuggestions",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "status_overview",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "status_overview",
    "type": "page",
    "sections": [
      {
        "id": "sec-dashboard-overview",
        "type": "section",
        "sectionName": "sec-dashboard-overview",
        "titleKey": "sec.dashboard.overview.title",
        "mode": "default",
        "order": 1,
        "organisms": [
          {
            "id": "org-dashboard-metrics",
            "type": "organism",
            "organismName": "statusGroup",
            "titleKey": "org.dashboard.metrics.title",
            "purpose": "Exibir métricas e status dos pedidos do turno atual no dashboard do dia",
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
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int-view-dashboard",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.dashboardOverview.title",
                "source": "ui.managerDashboard.data.viewDashboard",
                "binding": "viewDashboard",
                "action": "viewDashboard",
                "emptyKey": "section.dashboardOverview.empty",
                "displayHint": "summaryCards",
                "stateKey": "ui.managerDashboard.data.viewDashboard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-vd-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-vd-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-vd-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt.label",
                    "order": 3,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-vd-shiftId",
                    "field": "shiftId",
                    "labelKey": "column.shiftId.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.viewDashboard",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-vd-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt.label",
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
                    "id": "tb-refresh-dashboard",
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
        "id": "sec-ai-sales-summary",
        "type": "section",
        "sectionName": "sec-ai-sales-summary",
        "titleKey": "sec.ai.sales.summary.title",
        "mode": "default",
        "order": 2,
        "organisms": [
          {
            "id": "org-ai-sales-summary",
            "type": "organism",
            "organismName": "summaryPanel",
            "titleKey": "org.ai.sales.summary.title",
            "purpose": "Exibir o resumo de vendas do dia gerado pelo assistente IA",
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
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int-ai-sales-summary",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.aiSalesSummary.title",
                "source": "ui.managerDashboard.data.requestAiSalesSummary",
                "binding": "requestAiSalesSummary",
                "action": "requestAiSalesSummary",
                "emptyKey": "section.aiSalesSummary.empty",
                "displayHint": "summaryCards",
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
                "fields": [],
                "columns": [
                  {
                    "id": "col-ss-orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ss-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ss-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ss-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt.label",
                    "order": 4,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.managerDashboard.data.requestAiSalesSummary",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ss-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt.label",
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
                    "id": "tb-refresh-sales-summary",
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
        "id": "sec-ai-promo-suggestions",
        "type": "section",
        "sectionName": "sec-ai-promo-suggestions",
        "titleKey": "sec.ai.promo.suggestions.title",
        "mode": "default",
        "order": 3,
        "organisms": [
          {
            "id": "org-ai-promo-suggestions",
            "type": "organism",
            "organismName": "summaryPanel",
            "titleKey": "org.ai.promo.suggestions.title",
            "purpose": "Exibir sugestões de promoção geradas pelo assistente IA para decisão de marketing",
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
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int-ai-promo-suggestions",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.aiPromoSuggestions.title",
                "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "binding": "requestAiPromoSuggestions",
                "action": "requestAiPromoSuggestions",
                "emptyKey": "section.aiPromoSuggestions.empty",
                "displayHint": "summaryCards",
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "fields": [],
                "columns": [
                  {
                    "id": "col-ps-orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ps-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ps-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ps-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt.label",
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
                    "id": "tb-refresh-promo",
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
      }
    ]
  },
  "dataBindings": [
    {
      "id": "binding-viewDashboard",
      "source": "query",
      "entity": "Order",
      "command": "viewDashboard",
      "description": "Consulta os pedidos do turno atual para o dashboard do dia",
      "stateKey": "ui.managerDashboard.data.viewDashboard",
      "inputStateKeys": []
    },
    {
      "id": "binding-requestAiSalesSummary",
      "source": "query",
      "entity": "Order",
      "command": "requestAiSalesSummary",
      "description": "Solicita ao assistente IA o resumo de vendas do dia",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
      "inputStateKeys": []
    },
    {
      "id": "binding-requestAiPromoSuggestions",
      "source": "query",
      "entity": "Order",
      "command": "requestAiPromoSuggestions",
      "description": "Solicita ao assistente IA sugestões de promoção baseadas em pedidos e estoque",
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
