/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/salesDashboard.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "salesDashboard",
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
    "workspaceId": "salesDashboard",
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
            "O gerente abre o dashboard do sistema.",
            "O sistema identifica o turno atual ativo a partir do contexto de negócio.",
            "O sistema agrega os pedidos do turno atual para calcular o total de vendas do dia.",
            "O sistema calcula os itens mais vendidos com base nos pedidos do dia corrente.",
            "O sistema verifica os níveis de estoque e identifica itens abaixo do mínimo configurado.",
            "O dashboard exibe vendas do dia, itens mais vendidos e alertas de estoque baixo."
          ]
        },
        {
          "operationId": "requestAiSalesSummary",
          "commandName": "requestAiSalesSummary",
          "steps": [
            "O gerente solicita ao assistente IA um resumo das vendas do dia.",
            "O sistema identifica o turno/dia atual a partir do contexto de negócio.",
            "O assistente IA consome dados agregados de pedidos e estoque do domínio referentes ao período atual.",
            "O IA calcula indicadores como total de pedidos, itens mais vendidos e status de pedidos do dia.",
            "O sistema apresenta o resumo de vendas ao gerente."
          ]
        },
        {
          "operationId": "requestAiPromoSuggestions",
          "commandName": "requestAiPromoSuggestions",
          "steps": [
            "O gerente solicita sugestões de promoção ao assistente IA",
            "O sistema coleta dados agregados de pedidos e estoque dos últimos 7 dias disponibilizados pelo domínio",
            "O assistente IA analisa os dados de vendas e estoque e gera sugestões de itens a promover"
          ]
        }
      ]
    }
  },
  "pageInputs": [
    {
      "operationId": "viewDashboard",
      "inputId": "shiftId",
      "contextKey": "activeCompanyId",
      "originRef": "businessContext.activeCompanyId",
      "targetRef": "Order.shiftId",
      "required": true,
      "description": "Turno atualmente aberto, usado para filtrar todos os dados do dashboard pelo turno/dia corrente"
    }
  ],
  "navigationRefs": [],
  "sections": [
    {
      "id": "section-dashboard-ai",
      "type": "section",
      "sectionName": "Dashboard e assistente IA",
      "titleKey": "salesDashboard.section.dashboardAi.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-view-dashboard",
          "type": "dashboard",
          "organismName": "ViewDashboard",
          "titleKey": "salesDashboard.organism.viewDashboard.title",
          "purpose": "Consultar dashboard do dia",
          "userActions": [
            "viewDashboard"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "StockLevel",
            "Shift"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "dashboardCurrentShiftOnly",
            "topSellersFromDayOrders"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent-dashboard-context",
              "intent": "summary",
              "stateKey": "ui.salesDashboard.data.viewDashboard",
              "order": 10
            },
            {
              "id": "intent-dashboard-data",
              "intent": "queryList",
              "stateKey": "ui.salesDashboard.data.viewDashboard",
              "order": 20
            },
            {
              "id": "intent-dashboard-lowstock",
              "intent": "summary",
              "stateKey": "ui.salesDashboard.data.viewDashboard",
              "order": 30
            }
          ]
        },
        {
          "id": "org-ai-sales-summary",
          "type": "assistant",
          "organismName": "RequestAiSalesSummary",
          "titleKey": "salesDashboard.organism.requestAiSalesSummary.title",
          "purpose": "Solicitar resumo de vendas por IA",
          "userActions": [
            "requestAiSalesSummary"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "StockLevel",
            "Shift"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "dashboardCurrentShiftOnly",
            "aiConsumesDomainData",
            "topSellersFromDayOrders",
            "aiPromoBasedOnLast7Days"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent-ai-sales-request",
              "intent": "commandForm",
              "stateKey": "ui.salesDashboard.data.requestAiSalesSummary",
              "submitAction": "requestAiSalesSummary",
              "order": 10
            },
            {
              "id": "intent-ai-sales-output",
              "intent": "queryList",
              "stateKey": "ui.salesDashboard.data.requestAiSalesSummary",
              "order": 20
            }
          ]
        },
        {
          "id": "org-ai-promo-suggestions",
          "type": "assistant",
          "organismName": "RequestAiPromoSuggestions",
          "titleKey": "salesDashboard.organism.requestAiPromoSuggestions.title",
          "purpose": "Solicitar sugestões de promoção por IA",
          "userActions": [
            "requestAiPromoSuggestions"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "MenuItem",
            "StockLevel"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "aiConsumesDomainData",
            "aiPromoBasedOnLast7Days"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "intent-ai-promo-request",
              "intent": "commandForm",
              "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions",
              "submitAction": "requestAiPromoSuggestions",
              "order": 10
            },
            {
              "id": "intent-ai-promo-output",
              "intent": "queryList",
              "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions",
              "order": 20
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "salesDashboard.layout",
    "type": "page",
    "sections": [
      {
        "id": "section-dashboard-ai",
        "type": "section",
        "sectionName": "Dashboard e assistente IA",
        "titleKey": "salesDashboard.section.dashboardAi.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-view-dashboard",
            "type": "dashboard",
            "organismName": "ViewDashboard",
            "titleKey": "salesDashboard.organism.viewDashboard.title",
            "purpose": "Consultar dashboard do dia",
            "userActions": [
              "viewDashboard"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "StockLevel",
              "Shift"
            ],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "dashboardCurrentShiftOnly",
              "topSellersFromDayOrders"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent-dashboard-context",
                "intent": "summary",
                "order": 10,
                "titleKey": "salesDashboard.intent.dashboard.context.title",
                "fields": [
                  {
                    "id": "field-dashboard-shiftId",
                    "field": "shiftId",
                    "labelKey": "salesDashboard.field.shiftId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.salesDashboard.data.viewDashboard"
              },
              {
                "id": "intent-dashboard-data",
                "intent": "queryList",
                "order": 20,
                "titleKey": "salesDashboard.intent.dashboard.data.title",
                "fields": [],
                "columns": [
                  {
                    "id": "col-dashboard-orderId",
                    "field": "orderId",
                    "labelKey": "salesDashboard.field.orderId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dashboard-status",
                    "field": "status",
                    "labelKey": "salesDashboard.field.status.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dashboard-orderType",
                    "field": "orderType",
                    "labelKey": "salesDashboard.field.orderType.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dashboard-createdAt",
                    "field": "createdAt",
                    "labelKey": "salesDashboard.field.createdAt.label",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dashboard-menuItemId",
                    "field": "menuItemId",
                    "labelKey": "salesDashboard.field.menuItemId.label",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dashboard-quantity",
                    "field": "quantity",
                    "labelKey": "salesDashboard.field.quantity.label",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dashboard-stockItemId",
                    "field": "stockItemId",
                    "labelKey": "salesDashboard.field.stockItemId.label",
                    "order": 70,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dashboard-currentQuantity",
                    "field": "currentQuantity",
                    "labelKey": "salesDashboard.field.currentQuantity.label",
                    "order": 80,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-dashboard-minimumQuantity",
                    "field": "minimumQuantity",
                    "labelKey": "salesDashboard.field.minimumQuantity.label",
                    "order": 90,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-dashboard-refresh",
                    "action": "viewDashboard",
                    "labelKey": "salesDashboard.action.viewDashboard.label",
                    "order": 10,
                    "actionKey": "viewDashboard"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.salesDashboard.data.viewDashboard"
              },
              {
                "id": "intent-dashboard-lowstock",
                "intent": "summary",
                "order": 30,
                "titleKey": "salesDashboard.intent.dashboard.lowStock.title",
                "fields": [
                  {
                    "id": "field-lowstock-stockItemId",
                    "field": "stockItemId",
                    "labelKey": "salesDashboard.field.stockItemId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "field-lowstock-currentQuantity",
                    "field": "currentQuantity",
                    "labelKey": "salesDashboard.field.currentQuantity.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  },
                  {
                    "id": "field-lowstock-minimumQuantity",
                    "field": "minimumQuantity",
                    "labelKey": "salesDashboard.field.minimumQuantity.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.viewDashboard"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.salesDashboard.data.viewDashboard"
              }
            ]
          },
          {
            "id": "org-ai-sales-summary",
            "type": "assistant",
            "organismName": "RequestAiSalesSummary",
            "titleKey": "salesDashboard.organism.requestAiSalesSummary.title",
            "purpose": "Solicitar resumo de vendas por IA",
            "userActions": [
              "requestAiSalesSummary"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "StockLevel",
              "Shift"
            ],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "dashboardCurrentShiftOnly",
              "aiConsumesDomainData",
              "topSellersFromDayOrders",
              "aiPromoBasedOnLast7Days"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent-ai-sales-request",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "salesDashboard.intent.aiSales.request.title",
                "submitAction": "requestAiSalesSummary",
                "fields": [
                  {
                    "id": "field-ai-sales-summaryRequest",
                    "field": "summaryRequest",
                    "labelKey": "salesDashboard.field.summaryRequest.label",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.salesDashboard.input.requestAiSalesSummary.summaryRequest"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-ai-sales-submit",
                    "action": "requestAiSalesSummary",
                    "labelKey": "salesDashboard.action.requestAiSalesSummary.label",
                    "order": 10,
                    "actionKey": "requestAiSalesSummary"
                  }
                ],
                "stateKey": "ui.salesDashboard.data.requestAiSalesSummary"
              },
              {
                "id": "intent-ai-sales-output",
                "intent": "queryList",
                "order": 20,
                "titleKey": "salesDashboard.intent.aiSales.output.title",
                "fields": [],
                "columns": [
                  {
                    "id": "col-ai-sales-orderId",
                    "field": "orderId",
                    "labelKey": "salesDashboard.field.orderId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-status",
                    "field": "status",
                    "labelKey": "salesDashboard.field.status.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-orderType",
                    "field": "orderType",
                    "labelKey": "salesDashboard.field.orderType.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-createdAt",
                    "field": "createdAt",
                    "labelKey": "salesDashboard.field.createdAt.label",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.salesDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-ai-sales-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "salesDashboard.field.deliveredAt.label",
                    "order": 50,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.salesDashboard.data.requestAiSalesSummary"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.salesDashboard.data.requestAiSalesSummary"
              }
            ]
          },
          {
            "id": "org-ai-promo-suggestions",
            "type": "assistant",
            "organismName": "RequestAiPromoSuggestions",
            "titleKey": "salesDashboard.organism.requestAiPromoSuggestions.title",
            "purpose": "Solicitar sugestões de promoção por IA",
            "userActions": [
              "requestAiPromoSuggestions"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "MenuItem",
              "StockLevel"
            ],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "aiConsumesDomainData",
              "aiPromoBasedOnLast7Days"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "intent-ai-promo-request",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "salesDashboard.intent.aiPromo.request.title",
                "submitAction": "requestAiPromoSuggestions",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-ai-promo-submit",
                    "action": "requestAiPromoSuggestions",
                    "labelKey": "salesDashboard.action.requestAiPromoSuggestions.label",
                    "order": 10,
                    "actionKey": "requestAiPromoSuggestions"
                  }
                ],
                "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions"
              },
              {
                "id": "intent-ai-promo-output",
                "intent": "queryList",
                "order": 20,
                "titleKey": "salesDashboard.intent.aiPromo.output.title",
                "fields": [],
                "columns": [
                  {
                    "id": "col-ai-promo-orderId",
                    "field": "orderId",
                    "labelKey": "salesDashboard.field.orderId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ai-promo-status",
                    "field": "status",
                    "labelKey": "salesDashboard.field.status.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ai-promo-createdAt",
                    "field": "createdAt",
                    "labelKey": "salesDashboard.field.createdAt.label",
                    "order": 30,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ai-promo-quantity",
                    "field": "quantity",
                    "labelKey": "salesDashboard.field.quantity.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ai-promo-menuItemId",
                    "field": "menuItemId",
                    "labelKey": "salesDashboard.field.menuItemId.label",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-ai-promo-name",
                    "field": "name",
                    "labelKey": "salesDashboard.field.menuItemName.label",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions"
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": []
};

export const pipeline = [
  {
    "id": "salesDashboard__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/salesDashboard.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/salesDashboard.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/salesDashboard.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/salesDashboard.ts",
      "_102051_/l2/cafeFlow/web/contracts/salesDashboard.defs.ts",
      "_102051_/l2/cafeFlow/web/contracts/salesDashboard.ts"
    ],
    "dependsOn": [
      "salesDashboard__l2_shared"
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
