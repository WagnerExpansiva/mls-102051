/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/managerDashboard.defs.ts" enhancement="_blank"/>

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
      "id": "sec-dashboard",
      "type": "section",
      "sectionName": "Dashboard e assistente IA",
      "titleKey": "managerDashboard.section.dashboard.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-dashboard-cards",
          "type": "panel",
          "organismName": "ViewDashboard",
          "titleKey": "managerDashboard.cards.dashboard.title",
          "purpose": "Cartões do turno atual com visão rápida",
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
              "id": "int-dashboard-actions",
              "intent": "actionList",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "order": 10
            },
            {
              "id": "int-dashboard-cards",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "order": 20
            }
          ]
        },
        {
          "id": "org-aiSales-cards",
          "type": "panel",
          "organismName": "RequestAiSalesSummary",
          "titleKey": "managerDashboard.cards.aiSales.title",
          "purpose": "Cartões com resumo de vendas gerado por IA",
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
          "order": 20,
          "intentionRefs": [
            {
              "id": "int-aiSales-actions",
              "intent": "actionList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "order": 10
            },
            {
              "id": "int-aiSales-cards",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "order": 20
            }
          ]
        },
        {
          "id": "org-aiPromo-cards",
          "type": "panel",
          "organismName": "RequestAiPromoSuggestions",
          "titleKey": "managerDashboard.cards.aiPromo.title",
          "purpose": "Cartões com sugestões de promoção geradas por IA",
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
          "order": 30,
          "intentionRefs": [
            {
              "id": "int-aiPromo-actions",
              "intent": "actionList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "order": 10
            },
            {
              "id": "int-aiPromo-cards",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "order": 20
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "page31",
    "type": "page",
    "sections": [
      {
        "id": "sec-dashboard",
        "type": "section",
        "sectionName": "Dashboard e assistente IA",
        "titleKey": "managerDashboard.section.dashboard.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-dashboard-cards",
            "type": "panel",
            "organismName": "ViewDashboard",
            "titleKey": "managerDashboard.cards.dashboard.title",
            "purpose": "Cartões do turno atual com visão rápida",
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
                "id": "int-dashboard-actions",
                "intent": "actionList",
                "order": 10,
                "titleKey": "managerDashboard.cards.dashboard.title",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-viewDashboard",
                    "action": "viewDashboard",
                    "labelKey": "managerDashboard.action.viewDashboard",
                    "order": 10,
                    "actionKey": "viewDashboard"
                  }
                ],
                "stateKey": "ui.managerDashboard.data.viewDashboard"
              },
              {
                "id": "int-dashboard-cards",
                "intent": "queryList",
                "order": 20,
                "titleKey": "managerDashboard.cards.dashboard.title",
                "emptyKey": "managerDashboard.empty.dashboard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "managerDashboard.field.status",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-orderType",
                    "field": "orderType",
                    "labelKey": "managerDashboard.field.orderType",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "managerDashboard.field.createdAt",
                    "order": 30,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "managerDashboard.field.deliveredAt",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.managerDashboard.data.viewDashboard"
              }
            ]
          },
          {
            "id": "org-aiSales-cards",
            "type": "panel",
            "organismName": "RequestAiSalesSummary",
            "titleKey": "managerDashboard.cards.aiSales.title",
            "purpose": "Cartões com resumo de vendas gerado por IA",
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
            "order": 20,
            "intentions": [
              {
                "id": "int-aiSales-actions",
                "intent": "actionList",
                "order": 10,
                "titleKey": "managerDashboard.cards.aiSales.title",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-requestAiSalesSummary",
                    "action": "requestAiSalesSummary",
                    "labelKey": "managerDashboard.action.requestAiSalesSummary",
                    "order": 10,
                    "actionKey": "requestAiSalesSummary"
                  }
                ],
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
              },
              {
                "id": "int-aiSales-cards",
                "intent": "queryList",
                "order": 20,
                "titleKey": "managerDashboard.cards.aiSales.title",
                "emptyKey": "managerDashboard.empty.aiSales",
                "fields": [],
                "columns": [
                  {
                    "id": "col-aiSales-orderId",
                    "field": "orderId",
                    "labelKey": "managerDashboard.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aiSales-status",
                    "field": "status",
                    "labelKey": "managerDashboard.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aiSales-orderType",
                    "field": "orderType",
                    "labelKey": "managerDashboard.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aiSales-createdAt",
                    "field": "createdAt",
                    "labelKey": "managerDashboard.field.createdAt",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col-aiSales-deliveredAt",
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
                "actions": [],
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
              }
            ]
          },
          {
            "id": "org-aiPromo-cards",
            "type": "panel",
            "organismName": "RequestAiPromoSuggestions",
            "titleKey": "managerDashboard.cards.aiPromo.title",
            "purpose": "Cartões com sugestões de promoção geradas por IA",
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
            "order": 30,
            "intentions": [
              {
                "id": "int-aiPromo-actions",
                "intent": "actionList",
                "order": 10,
                "titleKey": "managerDashboard.cards.aiPromo.title",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-requestAiPromoSuggestions",
                    "action": "requestAiPromoSuggestions",
                    "labelKey": "managerDashboard.action.requestAiPromoSuggestions",
                    "order": 10,
                    "actionKey": "requestAiPromoSuggestions"
                  }
                ],
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
              },
              {
                "id": "int-aiPromo-cards",
                "intent": "queryList",
                "order": 20,
                "titleKey": "managerDashboard.cards.aiPromo.title",
                "emptyKey": "managerDashboard.empty.aiPromo",
                "fields": [],
                "columns": [
                  {
                    "id": "col-aiPromo-orderId",
                    "field": "orderId",
                    "labelKey": "managerDashboard.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-aiPromo-orderType",
                    "field": "orderType",
                    "labelKey": "managerDashboard.field.orderType",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-aiPromo-status",
                    "field": "status",
                    "labelKey": "managerDashboard.field.status",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col-aiPromo-createdAt",
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
                "actions": [],
                "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "db-viewDashboard-data",
      "source": "state",
      "description": "Dados do dashboard do turno atual",
      "stateKey": "ui.managerDashboard.data.viewDashboard"
    },
    {
      "id": "db-viewDashboard-status",
      "source": "state",
      "description": "Status da ação de atualizar dashboard",
      "stateKey": "ui.managerDashboard.action.viewDashboard.status"
    },
    {
      "id": "db-aiSales-data",
      "source": "state",
      "description": "Dados do resumo de vendas gerado pela IA",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
    },
    {
      "id": "db-aiSales-status",
      "source": "state",
      "description": "Status da ação de gerar resumo de vendas",
      "stateKey": "ui.managerDashboard.action.requestAiSalesSummary.status"
    },
    {
      "id": "db-aiPromo-data",
      "source": "state",
      "description": "Dados das sugestões de promoção geradas pela IA",
      "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
    },
    {
      "id": "db-aiPromo-status",
      "source": "state",
      "description": "Status da ação de gerar sugestões de promoção",
      "stateKey": "ui.managerDashboard.action.requestAiPromoSuggestions.status"
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
      "_102051_/l2/cafeFlow/web/contracts/managerDashboard.ts"
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
