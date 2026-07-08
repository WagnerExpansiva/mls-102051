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
      "id": "section.dashboard",
      "type": "section",
      "sectionName": "Dashboard e assistente IA",
      "titleKey": "managerDashboard.section.dashboard.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "organism.viewDashboard",
          "type": "organism",
          "organismName": "ViewDashboard",
          "titleKey": "managerDashboard.organism.viewDashboard.title",
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
              "id": "intention.viewDashboard.list",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.viewDashboard",
              "order": 10
            }
          ]
        },
        {
          "id": "organism.requestAiSalesSummary",
          "type": "organism",
          "organismName": "RequestAiSalesSummary",
          "titleKey": "managerDashboard.organism.requestAiSalesSummary.title",
          "purpose": "Solicitar resumo de vendas por IA",
          "userActions": [
            "requestAiSalesSummary"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "Shift",
            "StockLevel"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "dashboardCurrentShiftOnly",
            "aiConsumesDomainData",
            "topSellersFromDayOrders"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intention.requestAiSalesSummary.list",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
              "order": 10
            }
          ]
        },
        {
          "id": "organism.requestAiPromoSuggestions",
          "type": "organism",
          "organismName": "RequestAiPromoSuggestions",
          "titleKey": "managerDashboard.organism.requestAiPromoSuggestions.title",
          "purpose": "Solicitar sugestões de promoção por IA",
          "userActions": [
            "requestAiPromoSuggestions"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "StockLevel"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "aiPromoBasedOnLast7Days",
            "aiConsumesDomainData"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "intention.requestAiPromoSuggestions.list",
              "intent": "queryList",
              "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "managerDashboard.layout",
    "type": "page",
    "sections": [
      {
        "id": "section.dashboard",
        "type": "section",
        "sectionName": "Dashboard e assistente IA",
        "titleKey": "managerDashboard.section.dashboard.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "organism.viewDashboard",
            "type": "organism",
            "organismName": "ViewDashboard",
            "titleKey": "managerDashboard.organism.viewDashboard.title",
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
                "id": "intention.viewDashboard.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "managerDashboard.intention.viewDashboard.list.title",
                "fields": [],
                "columns": [
                  {
                    "id": "col.viewDashboard.status",
                    "field": "status",
                    "labelKey": "managerDashboard.field.status",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col.viewDashboard.orderType",
                    "field": "orderType",
                    "labelKey": "managerDashboard.field.orderType",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col.viewDashboard.createdAt",
                    "field": "createdAt",
                    "labelKey": "managerDashboard.field.createdAt",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col.viewDashboard.shiftId",
                    "field": "shiftId",
                    "labelKey": "managerDashboard.field.shiftId",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  },
                  {
                    "id": "col.viewDashboard.deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "managerDashboard.field.deliveredAt",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb.viewDashboard.refresh",
                    "action": "viewDashboard",
                    "labelKey": "managerDashboard.action.viewDashboard",
                    "order": 10,
                    "actionKey": "viewDashboard"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.managerDashboard.data.viewDashboard"
              }
            ]
          },
          {
            "id": "organism.requestAiSalesSummary",
            "type": "organism",
            "organismName": "RequestAiSalesSummary",
            "titleKey": "managerDashboard.organism.requestAiSalesSummary.title",
            "purpose": "Solicitar resumo de vendas por IA",
            "userActions": [
              "requestAiSalesSummary"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "Shift",
              "StockLevel"
            ],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "dashboardCurrentShiftOnly",
              "aiConsumesDomainData",
              "topSellersFromDayOrders"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intention.requestAiSalesSummary.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "managerDashboard.intention.requestAiSalesSummary.list.title",
                "fields": [],
                "columns": [
                  {
                    "id": "col.requestAiSalesSummary.orderId",
                    "field": "orderId",
                    "labelKey": "managerDashboard.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col.requestAiSalesSummary.status",
                    "field": "status",
                    "labelKey": "managerDashboard.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col.requestAiSalesSummary.orderType",
                    "field": "orderType",
                    "labelKey": "managerDashboard.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col.requestAiSalesSummary.createdAt",
                    "field": "createdAt",
                    "labelKey": "managerDashboard.field.createdAt",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  },
                  {
                    "id": "col.requestAiSalesSummary.deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "managerDashboard.field.deliveredAt",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb.requestAiSalesSummary.run",
                    "action": "requestAiSalesSummary",
                    "labelKey": "managerDashboard.action.requestAiSalesSummary",
                    "order": 10,
                    "actionKey": "requestAiSalesSummary"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
              }
            ]
          },
          {
            "id": "organism.requestAiPromoSuggestions",
            "type": "organism",
            "organismName": "RequestAiPromoSuggestions",
            "titleKey": "managerDashboard.organism.requestAiPromoSuggestions.title",
            "purpose": "Solicitar sugestões de promoção por IA",
            "userActions": [
              "requestAiPromoSuggestions"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "StockLevel"
            ],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "aiPromoBasedOnLast7Days",
              "aiConsumesDomainData"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "intention.requestAiPromoSuggestions.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "managerDashboard.intention.requestAiPromoSuggestions.list.title",
                "fields": [],
                "columns": [
                  {
                    "id": "col.requestAiPromoSuggestions.orderId",
                    "field": "orderId",
                    "labelKey": "managerDashboard.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col.requestAiPromoSuggestions.orderType",
                    "field": "orderType",
                    "labelKey": "managerDashboard.field.orderType",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col.requestAiPromoSuggestions.status",
                    "field": "status",
                    "labelKey": "managerDashboard.field.status",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  },
                  {
                    "id": "col.requestAiPromoSuggestions.createdAt",
                    "field": "createdAt",
                    "labelKey": "managerDashboard.field.createdAt",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb.requestAiPromoSuggestions.run",
                    "action": "requestAiPromoSuggestions",
                    "labelKey": "managerDashboard.action.requestAiPromoSuggestions",
                    "order": 10,
                    "actionKey": "requestAiPromoSuggestions"
                  }
                ],
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
  "dataBindings": []
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
