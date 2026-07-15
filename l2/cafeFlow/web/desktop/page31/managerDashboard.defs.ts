/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/managerDashboard.defs.ts" enhancement="_blank"/>

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
      "id": "sec-discover",
      "type": "section",
      "sectionName": "Dashboard do dia",
      "titleKey": "section.discover.title",
      "mode": "cardList",
      "order": 1,
      "organisms": [
        {
          "id": "org-dashboard-cards",
          "type": "cardList",
          "organismName": "Pedidos do dia",
          "titleKey": "organism.dashboard.title",
          "purpose": "Exibir pedidos do turno atual em cartões resumidos",
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
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-dashboard-query",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "action": "viewDashboard",
              "order": 1
            }
          ]
        },
        {
          "id": "org-ai-sales-cards",
          "type": "cardList",
          "organismName": "Resumo de vendas por IA",
          "titleKey": "organism.aiSales.title",
          "purpose": "Exibir resumo de vendas gerado pelo assistente IA em cartões",
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
          "order": 2,
          "intentionRefs": [
            {
              "id": "intent-aisales-query",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "action": "requestAiSalesSummary",
              "order": 1
            }
          ]
        },
        {
          "id": "org-ai-promo-cards",
          "type": "cardList",
          "organismName": "Sugestões de promoção por IA",
          "titleKey": "organism.aiPromo.title",
          "purpose": "Exibir sugestões de promoção geradas pelo assistente IA em cartões",
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
          "order": 3,
          "intentionRefs": [
            {
              "id": "intent-aipromo-query",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "action": "requestAiPromoSuggestions",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-review",
      "type": "section",
      "sectionName": "Revisão",
      "titleKey": "section.review.title",
      "mode": "summary",
      "order": 2,
      "organisms": [
        {
          "id": "org-review-summary",
          "type": "summary",
          "organismName": "Resumo geral",
          "titleKey": "organism.review.title",
          "purpose": "Revisar o contexto e o resultado das ações principais da página",
          "userActions": [],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-review-summary",
              "intent": "summary",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "mobile_cards",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "mobile_cards_page31",
    "type": "page",
    "sections": [
      {
        "id": "sec-discover",
        "type": "section",
        "sectionName": "Dashboard do dia",
        "titleKey": "section.discover.title",
        "mode": "cardList",
        "order": 1,
        "organisms": [
          {
            "id": "org-dashboard-cards",
            "type": "cardList",
            "organismName": "Pedidos do dia",
            "titleKey": "organism.dashboard.title",
            "purpose": "Exibir pedidos do turno atual em cartões resumidos",
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
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent-dashboard-query",
                "intent": "queryList",
                "order": 1,
                "titleKey": "organism.dashboard.title",
                "source": "ui.managerDashboard.data.viewDashboard",
                "binding": "handleViewDashboardClick",
                "action": "viewDashboard",
                "emptyKey": "organism.dashboard.empty",
                "displayHint": "card",
                "stateKey": "ui.managerDashboard.data.viewDashboard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-dash-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 1,
                    "required": false,
                    "inputType": "badge",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dash-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dash-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dash-shiftId",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dash-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "field.deliveredAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-dash-refresh",
                    "action": "viewDashboard",
                    "labelKey": "action.viewDashboard.label",
                    "order": 1,
                    "displayHint": "refresh",
                    "actionKey": "viewDashboard"
                  }
                ],
                "rowActions": [],
                "actions": []
              }
            ]
          },
          {
            "id": "org-ai-sales-cards",
            "type": "cardList",
            "organismName": "Resumo de vendas por IA",
            "titleKey": "organism.aiSales.title",
            "purpose": "Exibir resumo de vendas gerado pelo assistente IA em cartões",
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
            "order": 2,
            "intentions": [
              {
                "id": "intent-aisales-query",
                "intent": "queryList",
                "order": 1,
                "titleKey": "organism.aiSales.title",
                "source": "ui.managerDashboard.data.requestAiSalesSummary",
                "binding": "handleRequestAiSalesSummaryClick",
                "action": "requestAiSalesSummary",
                "emptyKey": "organism.aiSales.empty",
                "displayHint": "card",
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
                "fields": [],
                "columns": [
                  {
                    "id": "col-aisales-orderId",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aisales-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "badge",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aisales-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aisales-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aisales-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "field.deliveredAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-aisales-generate",
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
          },
          {
            "id": "org-ai-promo-cards",
            "type": "cardList",
            "organismName": "Sugestões de promoção por IA",
            "titleKey": "organism.aiPromo.title",
            "purpose": "Exibir sugestões de promoção geradas pelo assistente IA em cartões",
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
            "order": 3,
            "intentions": [
              {
                "id": "intent-aipromo-query",
                "intent": "queryList",
                "order": 1,
                "titleKey": "organism.aiPromo.title",
                "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "binding": "handleRequestAiPromoSuggestionsClick",
                "action": "requestAiPromoSuggestions",
                "emptyKey": "organism.aiPromo.empty",
                "displayHint": "card",
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "fields": [],
                "columns": [
                  {
                    "id": "col-aipromo-orderId",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-aipromo-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-aipromo-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 3,
                    "required": false,
                    "inputType": "badge",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-aipromo-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-aipromo-generate",
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
        "id": "sec-review",
        "type": "section",
        "sectionName": "Revisão",
        "titleKey": "section.review.title",
        "mode": "summary",
        "order": 2,
        "organisms": [
          {
            "id": "org-review-summary",
            "type": "summary",
            "organismName": "Resumo geral",
            "titleKey": "organism.review.title",
            "purpose": "Revisar o contexto e o resultado das ações principais da página",
            "userActions": [],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent-review-summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "organism.review.title",
                "emptyKey": "organism.review.empty",
                "displayHint": "summary",
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
      "id": "binding-viewDashboard",
      "source": "ui.managerDashboard.data.viewDashboard",
      "entity": "Order",
      "command": "viewDashboard",
      "description": "Dados do dashboard do dia",
      "stateKey": "ui.managerDashboard.data.viewDashboard",
      "inputStateKeys": []
    },
    {
      "id": "binding-requestAiSalesSummary",
      "source": "ui.managerDashboard.data.requestAiSalesSummary",
      "entity": "Order",
      "command": "requestAiSalesSummary",
      "description": "Resumo de vendas gerado por IA",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
      "inputStateKeys": []
    },
    {
      "id": "binding-requestAiPromoSuggestions",
      "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
      "entity": "Order",
      "command": "requestAiPromoSuggestions",
      "description": "Sugestões de promoção geradas por IA",
      "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
      "inputStateKeys": []
    }
  ]
};

export const pipeline = [
  {
    "id": "managerDashboard__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page31/managerDashboard.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page31/managerDashboard.defs.ts",
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
