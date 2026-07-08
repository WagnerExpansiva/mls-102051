/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posOrder.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posOrder",
  "pageName": "POS — Lançamento e entrega de pedidos",
  "actor": "atendente",
  "purpose": "Executar POS — Lançamento e entrega de pedidos.",
  "capabilities": [
    "orderLifecycle"
  ],
  "flowRefs": {
    "experienceFlows": [
      "orderLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "orderLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "posOrder",
    "workspaceKind": "workflow",
    "workflowId": "orderLifecycle",
    "actor": "atendente",
    "entity": "Order",
    "owners": [
      {
        "kind": "workflow",
        "id": "orderLifecycle",
        "defPath": "_102051_/l4/workflows/orderLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createOrder",
        "defPath": "_102051_/l4/operations/createOrder.defs.ts"
      },
      {
        "kind": "operation",
        "id": "viewOrderBoard",
        "defPath": "_102051_/l4/operations/viewOrderBoard.defs.ts"
      },
      {
        "kind": "operation",
        "id": "deliverOrder",
        "defPath": "_102051_/l4/operations/deliverOrder.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "O atendente seleciona o tipo de pedido (mesa ou takeout) e adiciona os itens do cardápio solicitados pelo cliente.",
        "O atendente revisa o resumo do pedido, verifica alertas de estoque insuficiente e confirma o envio à cozinha, recebendo o número do pedido.",
        "O cozinheiro visualiza o pedido na fila da cozinha e inicia o preparo, marcando o pedido como 'em preparo'.",
        "O cozinheiro finaliza o preparo e marca o pedido como 'pronto', avisando o atendente.",
        "O atendente consulta o painel de pedidos, confirma que o pedido está pronto e entrega ao cliente, marcando como entregue."
      ],
      "operations": [
        {
          "operationId": "createOrder",
          "commandName": "createOrder",
          "steps": [
            "O atendente seleciona o tipo de pedido (mesa ou takeout) e informa o número da mesa quando aplicável.",
            "O atendente busca itens do cardápio e adiciona os itens solicitados pelo cliente ao pedido.",
            "O sistema verifica alertas de estoque insuficiente nos ingredientes vinculados aos itens selecionados.",
            "O atendente confirma o pedido; o sistema cria o pedido com status 'registered', decrementa o estoque conforme os ingredientes e gera o número do pedido para acompanhamento."
          ]
        },
        {
          "operationId": "viewOrderBoard",
          "commandName": "viewOrderBoard",
          "steps": [
            "O atendente abre o painel de pedidos no POS.",
            "O sistema lista todos os pedidos do turno atual com seus respectivos status.",
            "O atendente visualiza quais pedidos estão em preparo e quais já estão prontos.",
            "O atendente identifica os pedidos prontos para entregar ao cliente."
          ]
        },
        {
          "operationId": "deliverOrder",
          "commandName": "deliverOrder",
          "steps": [
            "O atendente seleciona no painel de pedidos um pedido cujo status atual é 'pronto'.",
            "O atendente confirma a entrega ao cliente (na mesa ou no balcão).",
            "O sistema valida que o status atual é 'pronto' e atualiza o pedido para status 'entregue', registrando o timestamp em deliveredAt."
          ]
        }
      ]
    }
  },
  "pageInputs": [
    {
      "operationId": "createOrder",
      "inputId": "shiftId",
      "contextKey": "activeCompanyId",
      "originRef": "businessContext.activeCompanyId",
      "targetRef": "Order.shiftId",
      "required": true,
      "description": "Turno aberto no momento do lançamento do pedido"
    }
  ],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec-pos-order",
      "type": "section",
      "sectionName": "POS — Lançamento e entrega de pedidos",
      "titleKey": "posOrder.section.main.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-create-order",
          "type": "organism",
          "organismName": "CreateOrder",
          "titleKey": "posOrder.organism.createOrder.title",
          "purpose": "Lançar pedido no POS",
          "userActions": [
            "createOrder"
          ],
          "requiredEntities": [
            "Order",
            "MenuItem",
            "StockLevel",
            "Shift",
            "OrderItem",
            "StockConsumption"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "stockDecrementOnOrderLaunch",
            "orderStatusFlow",
            "fifoKitchenQueue"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent-create-order-form",
              "intent": "commandForm",
              "submitAction": "createOrder",
              "order": 10
            },
            {
              "id": "intent-create-order-summary",
              "intent": "summary",
              "order": 20
            }
          ]
        },
        {
          "id": "org-view-order-board",
          "type": "organism",
          "organismName": "ViewOrderBoard",
          "titleKey": "posOrder.organism.viewOrderBoard.title",
          "purpose": "Visualizar painel de pedidos",
          "userActions": [
            "viewOrderBoard"
          ],
          "requiredEntities": [
            "Order",
            "Shift"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "dashboardCurrentShiftOnly",
            "orderStatusFlow",
            "fifoKitchenQueue"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent-view-order-board-list",
              "intent": "queryList",
              "stateKey": "ui.posOrder.data.viewOrderBoard",
              "order": 10
            }
          ]
        },
        {
          "id": "org-deliver-order",
          "type": "organism",
          "organismName": "DeliverOrder",
          "titleKey": "posOrder.organism.deliverOrder.title",
          "purpose": "Entregar pedido ao cliente",
          "userActions": [
            "deliverOrder"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "orderStatusFlow",
            "readyBeforeDelivered"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "intent-deliver-order-confirm",
              "intent": "commandForm",
              "submitAction": "deliverOrder",
              "order": 10
            },
            {
              "id": "intent-deliver-order-summary",
              "intent": "summary",
              "order": 20
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "posOrder.layout",
    "type": "page",
    "sections": [
      {
        "id": "sec-pos-order",
        "type": "section",
        "sectionName": "POS — Lançamento e entrega de pedidos",
        "titleKey": "posOrder.section.main.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-create-order",
            "type": "organism",
            "organismName": "CreateOrder",
            "titleKey": "posOrder.organism.createOrder.title",
            "purpose": "Lançar pedido no POS",
            "userActions": [
              "createOrder"
            ],
            "requiredEntities": [
              "Order",
              "MenuItem",
              "StockLevel",
              "Shift",
              "OrderItem",
              "StockConsumption"
            ],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "stockDecrementOnOrderLaunch",
              "orderStatusFlow",
              "fifoKitchenQueue"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent-create-order-form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "posOrder.intent.createOrder.form.title",
                "submitAction": "createOrder",
                "fields": [
                  {
                    "id": "field-create-order-orderType",
                    "field": "orderType",
                    "labelKey": "posOrder.field.orderType.label",
                    "order": 10,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.posOrder.input.createOrder.orderType"
                  },
                  {
                    "id": "field-create-order-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "posOrder.field.tableNumber.label",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posOrder.input.createOrder.tableNumber"
                  },
                  {
                    "id": "field-create-order-priority",
                    "field": "priority",
                    "labelKey": "posOrder.field.priority.label",
                    "order": 30,
                    "required": false,
                    "inputType": "checkbox",
                    "stateKey": "ui.posOrder.input.createOrder.priority"
                  },
                  {
                    "id": "field-create-order-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "posOrder.field.priorityReason.label",
                    "order": 40,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.posOrder.input.createOrder.priorityReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "intent-create-order-summary",
                "intent": "summary",
                "order": 20,
                "titleKey": "posOrder.intent.createOrder.summary.title",
                "fields": [
                  {
                    "id": "field-create-order-orderId",
                    "field": "orderId",
                    "labelKey": "posOrder.field.orderId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.posOrder.layout.field-create-order-orderId"
                  },
                  {
                    "id": "field-create-order-status",
                    "field": "status",
                    "labelKey": "posOrder.field.status.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.posOrder.layout.field-create-order-status"
                  },
                  {
                    "id": "field-create-order-orderType-summary",
                    "field": "orderType",
                    "labelKey": "posOrder.field.orderType.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.posOrder.input.createOrder.orderType"
                  },
                  {
                    "id": "field-create-order-tableNumber-summary",
                    "field": "tableNumber",
                    "labelKey": "posOrder.field.tableNumber.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.posOrder.input.createOrder.tableNumber"
                  },
                  {
                    "id": "field-create-order-createdAt",
                    "field": "createdAt",
                    "labelKey": "posOrder.field.createdAt.label",
                    "order": 50,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.posOrder.layout.field-create-order-createdAt"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          },
          {
            "id": "org-view-order-board",
            "type": "organism",
            "organismName": "ViewOrderBoard",
            "titleKey": "posOrder.organism.viewOrderBoard.title",
            "purpose": "Visualizar painel de pedidos",
            "userActions": [
              "viewOrderBoard"
            ],
            "requiredEntities": [
              "Order",
              "Shift"
            ],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "dashboardCurrentShiftOnly",
              "orderStatusFlow",
              "fifoKitchenQueue"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent-view-order-board-list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "posOrder.intent.viewOrderBoard.list.title",
                "fields": [],
                "columns": [
                  {
                    "id": "col-view-order-board-orderId",
                    "field": "orderId",
                    "labelKey": "posOrder.field.orderId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  },
                  {
                    "id": "col-view-order-board-status",
                    "field": "status",
                    "labelKey": "posOrder.field.status.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  },
                  {
                    "id": "col-view-order-board-orderType",
                    "field": "orderType",
                    "labelKey": "posOrder.field.orderType.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  },
                  {
                    "id": "col-view-order-board-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "posOrder.field.tableNumber.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  },
                  {
                    "id": "col-view-order-board-priority",
                    "field": "priority",
                    "labelKey": "posOrder.field.priority.label",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  },
                  {
                    "id": "col-view-order-board-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "posOrder.field.priorityReason.label",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  },
                  {
                    "id": "col-view-order-board-receivedAt",
                    "field": "receivedAt",
                    "labelKey": "posOrder.field.receivedAt.label",
                    "order": 70,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  },
                  {
                    "id": "col-view-order-board-inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "posOrder.field.inPreparationAt.label",
                    "order": 80,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  },
                  {
                    "id": "col-view-order-board-readyAt",
                    "field": "readyAt",
                    "labelKey": "posOrder.field.readyAt.label",
                    "order": 90,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  },
                  {
                    "id": "col-view-order-board-createdAt",
                    "field": "createdAt",
                    "labelKey": "posOrder.field.createdAt.label",
                    "order": 100,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.posOrder.data.viewOrderBoard"
                  }
                ],
                "filters": [
                  {
                    "id": "filter-view-order-board-statusFilter",
                    "field": "statusFilter",
                    "labelKey": "posOrder.filter.statusFilter.label",
                    "order": 10,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.posOrder.input.viewOrderBoard.statusFilter"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb-view-order-board-refresh",
                    "action": "viewOrderBoard",
                    "labelKey": "posOrder.action.viewOrderBoard.label",
                    "order": 10,
                    "actionKey": "viewOrderBoard"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.posOrder.data.viewOrderBoard"
              }
            ]
          },
          {
            "id": "org-deliver-order",
            "type": "organism",
            "organismName": "DeliverOrder",
            "titleKey": "posOrder.organism.deliverOrder.title",
            "purpose": "Entregar pedido ao cliente",
            "userActions": [
              "deliverOrder"
            ],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "orderStatusFlow",
              "readyBeforeDelivered"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "intent-deliver-order-confirm",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "posOrder.intent.deliverOrder.confirm.title",
                "submitAction": "deliverOrder",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "intent-deliver-order-summary",
                "intent": "summary",
                "order": 20,
                "titleKey": "posOrder.intent.deliverOrder.summary.title",
                "fields": [
                  {
                    "id": "field-deliver-order-orderId",
                    "field": "orderId",
                    "labelKey": "posOrder.field.orderId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.posOrder.layout.field-deliver-order-orderId"
                  },
                  {
                    "id": "field-deliver-order-status",
                    "field": "status",
                    "labelKey": "posOrder.field.status.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.posOrder.layout.field-deliver-order-status"
                  },
                  {
                    "id": "field-deliver-order-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "posOrder.field.deliveredAt.label",
                    "order": 30,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.posOrder.layout.field-deliver-order-deliveredAt"
                  },
                  {
                    "id": "field-deliver-order-orderType",
                    "field": "orderType",
                    "labelKey": "posOrder.field.orderType.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.posOrder.layout.field-deliver-order-orderType"
                  },
                  {
                    "id": "field-deliver-order-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "posOrder.field.tableNumber.label",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.posOrder.layout.field-deliver-order-tableNumber"
                  }
                ],
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
  "dataBindings": []
};

export const pipeline = [
  {
    "id": "posOrder__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/posOrder.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/posOrder.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/posOrder.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/posOrder.ts",
      "_102051_/l2/cafeFlow/web/contracts/posOrder.defs.ts",
      "_102051_/l2/cafeFlow/web/contracts/posOrder.ts"
    ],
    "dependsOn": [
      "posOrder__l2_shared"
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
