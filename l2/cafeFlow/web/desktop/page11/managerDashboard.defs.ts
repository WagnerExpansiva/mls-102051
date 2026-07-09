/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/managerDashboard.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "managerDashboard",
  "pageName": "Dashboard e assistente IA",
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
      "id": "sec-overview",
      "type": "section",
      "sectionName": "dashboardOverview",
      "titleKey": "managerDashboard.section.overview.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-dashboard-status",
          "type": "data",
          "organismName": "ViewDashboard",
          "titleKey": "managerDashboard.organism.viewDashboard.title",
          "purpose": "Monitorar vendas do dia e status de pedidos do turno atual",
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
            "deliveredAt",
            "shiftId"
          ],
          "writesFields": [],
          "rulesApplied": [
            "dashboardCurrentShiftOnly",
            "topSellersFromDayOrders"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-dashboard-status-group",
              "intent": "workflowStatus",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "action": "viewDashboard",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec-ai-assistant",
      "type": "section",
      "sectionName": "aiAssistant",
      "titleKey": "managerDashboard.section.aiAssistant.title",
      "mode": "view",
      "order": 20,
      "organisms": [
        {
          "id": "org-ai-sales-summary",
          "type": "data",
          "organismName": "RequestAiSalesSummary",
          "titleKey": "managerDashboard.organism.aiSalesSummary.title",
          "purpose": "Solicitar e visualizar resumo de vendas do dia por IA",
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
            "dashboardCurrentShiftOnly",
            "aiConsumesDomainData",
            "topSellersFromDayOrders"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-ai-sales-action",
              "intent": "actionList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "submitAction": "requestAiSalesSummary",
              "order": 10
            },
            {
              "id": "int-ai-sales-result",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "action": "requestAiSalesSummary",
              "order": 20
            }
          ]
        },
        {
          "id": "org-ai-promo-suggestions",
          "type": "data",
          "organismName": "RequestAiPromoSuggestions",
          "titleKey": "managerDashboard.organism.aiPromoSuggestions.title",
          "purpose": "Solicitar e visualizar sugestões de promoção por IA",
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
            "aiPromoBasedOnLast7Days",
            "aiConsumesDomainData"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "int-ai-promo-action",
              "intent": "actionList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "submitAction": "requestAiPromoSuggestions",
              "order": 10
            },
            {
              "id": "int-ai-promo-result",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "action": "requestAiPromoSuggestions",
              "order": 20
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "managerDashboard.page11",
    "type": "page",
    "sections": [
      {
        "id": "sec-overview",
        "type": "section",
        "sectionName": "dashboardOverview",
        "titleKey": "managerDashboard.section.overview.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-dashboard-status",
            "type": "data",
            "organismName": "ViewDashboard",
            "titleKey": "managerDashboard.organism.viewDashboard.title",
            "purpose": "Monitorar vendas do dia e status de pedidos do turno atual",
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
              "deliveredAt",
              "shiftId"
            ],
            "writesFields": [],
            "rulesApplied": [
              "dashboardCurrentShiftOnly",
              "topSellersFromDayOrders"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-dashboard-status-group",
                "intent": "workflowStatus",
                "order": 10,
                "titleKey": "managerDashboard.intent.dashboardStatus.title",
                "source": "ui.managerDashboard.data.viewDashboard",
                "binding": "viewDashboard",
                "action": "viewDashboard",
                "emptyKey": "managerDashboard.intent.dashboardStatus.empty",
                "displayHint": "statusGroup",
                "stateKey": "ui.managerDashboard.data.viewDashboard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-order-status",
                    "field": "status",
                    "labelKey": "managerDashboard.field.status",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-order-type",
                    "field": "orderType",
                    "labelKey": "managerDashboard.field.orderType",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-order-created",
                    "field": "createdAt",
                    "labelKey": "managerDashboard.field.createdAt",
                    "order": 30,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-order-delivered",
                    "field": "deliveredAt",
                    "labelKey": "managerDashboard.field.deliveredAt",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-order-shift",
                    "field": "shiftId",
                    "labelKey": "managerDashboard.field.shiftId",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-refresh-dashboard",
                    "action": "viewDashboard",
                    "labelKey": "managerDashboard.action.refreshDashboard",
                    "order": 10,
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
        "id": "sec-ai-assistant",
        "type": "section",
        "sectionName": "aiAssistant",
        "titleKey": "managerDashboard.section.aiAssistant.title",
        "mode": "view",
        "order": 20,
        "organisms": [
          {
            "id": "org-ai-sales-summary",
            "type": "data",
            "organismName": "RequestAiSalesSummary",
            "titleKey": "managerDashboard.organism.aiSalesSummary.title",
            "purpose": "Solicitar e visualizar resumo de vendas do dia por IA",
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
              "dashboardCurrentShiftOnly",
              "aiConsumesDomainData",
              "topSellersFromDayOrders"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-ai-sales-action",
                "intent": "actionList",
                "order": 10,
                "titleKey": "managerDashboard.intent.aiSalesAction.title",
                "submitAction": "requestAiSalesSummary",
                "emptyKey": "managerDashboard.intent.aiSalesAction.empty",
                "displayHint": "actionPanel",
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-request-sales-summary",
                    "action": "requestAiSalesSummary",
                    "labelKey": "managerDashboard.action.requestAiSalesSummary",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "requestAiSalesSummary"
                  }
                ]
              },
              {
                "id": "int-ai-sales-result",
                "intent": "queryList",
                "order": 20,
                "titleKey": "managerDashboard.intent.aiSalesResult.title",
                "source": "ui.managerDashboard.data.requestAiSalesSummary",
                "binding": "requestAiSalesSummary",
                "action": "requestAiSalesSummary",
                "emptyKey": "managerDashboard.intent.aiSalesResult.empty",
                "displayHint": "list",
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
                "fields": [],
                "columns": [
                  {
                    "id": "col-ai-sales-orderId",
                    "field": "orderId",
                    "labelKey": "managerDashboard.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-status",
                    "field": "status",
                    "labelKey": "managerDashboard.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-type",
                    "field": "orderType",
                    "labelKey": "managerDashboard.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-created",
                    "field": "createdAt",
                    "labelKey": "managerDashboard.field.createdAt",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-delivered",
                    "field": "deliveredAt",
                    "labelKey": "managerDashboard.field.deliveredAt",
                    "order": 50,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          },
          {
            "id": "org-ai-promo-suggestions",
            "type": "data",
            "organismName": "RequestAiPromoSuggestions",
            "titleKey": "managerDashboard.organism.aiPromoSuggestions.title",
            "purpose": "Solicitar e visualizar sugestões de promoção por IA",
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
              "aiPromoBasedOnLast7Days",
              "aiConsumesDomainData"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "int-ai-promo-action",
                "intent": "actionList",
                "order": 10,
                "titleKey": "managerDashboard.intent.aiPromoAction.title",
                "submitAction": "requestAiPromoSuggestions",
                "emptyKey": "managerDashboard.intent.aiPromoAction.empty",
                "displayHint": "actionPanel",
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-request-promo",
                    "action": "requestAiPromoSuggestions",
                    "labelKey": "managerDashboard.action.requestAiPromoSuggestions",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "requestAiPromoSuggestions"
                  }
                ]
              },
              {
                "id": "int-ai-promo-result",
                "intent": "queryList",
                "order": 20,
                "titleKey": "managerDashboard.intent.aiPromoResult.title",
                "source": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "binding": "requestAiPromoSuggestions",
                "action": "requestAiPromoSuggestions",
                "emptyKey": "managerDashboard.intent.aiPromoResult.empty",
                "displayHint": "list",
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
                "fields": [],
                "columns": [
                  {
                    "id": "col-ai-promo-orderId",
                    "field": "orderId",
                    "labelKey": "managerDashboard.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ai-promo-type",
                    "field": "orderType",
                    "labelKey": "managerDashboard.field.orderType",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ai-promo-status",
                    "field": "status",
                    "labelKey": "managerDashboard.field.status",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ai-promo-created",
                    "field": "createdAt",
                    "labelKey": "managerDashboard.field.createdAt",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  }
                ],
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
      "id": "db-viewDashboard",
      "source": "command",
      "entity": "Order",
      "command": "viewDashboard",
      "description": "Dados do dashboard do turno",
      "stateKey": "ui.managerDashboard.data.viewDashboard",
      "inputStateKeys": []
    },
    {
      "id": "db-requestAiSalesSummary",
      "source": "command",
      "entity": "Order",
      "command": "requestAiSalesSummary",
      "description": "Resumo de vendas por IA",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
      "inputStateKeys": []
    },
    {
      "id": "db-requestAiPromoSuggestions",
      "source": "command",
      "entity": "Order",
      "command": "requestAiPromoSuggestions",
      "description": "Sugestões de promoção por IA",
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
