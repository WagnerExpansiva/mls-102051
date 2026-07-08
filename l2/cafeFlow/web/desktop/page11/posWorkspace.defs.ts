/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posWorkspace",
  "pageName": "POS — Lançamento e acompanhamento de pedidos",
  "actor": "atendente",
  "purpose": "Executar POS — Lançamento e acompanhamento de pedidos.",
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
    "workspaceId": "posWorkspace",
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
        "O atendente revisa o resumo do pedido, verifica alertas de estoque insuficiente e confirma, enviando à cozinha com o estoque decrementado conforme ingredientes vinculados.",
        "O cozinheiro visualiza a fila de pedidos recebidos na cozinha e inicia o preparo, marcando o pedido como 'em preparo'.",
        "Ao concluir o preparo, o cozinheiro marca o pedido como 'pronto', sinalizando o atendente pelo painel de status.",
        "O atendente consulta o painel de pedidos, confirma o status 'pronto' e entrega o pedido ao cliente, marcando-o como entregue."
      ],
      "operations": [
        {
          "operationId": "createOrder",
          "commandName": "createOrder",
          "steps": [
            "O atendente seleciona o tipo de pedido (mesa ou takeout) e informa o número da mesa quando aplicável",
            "O atendente busca e adiciona os itens do cardápio solicitados pelo cliente, visualizando preço e categoria",
            "O atendente opcionalmente marca o pedido como prioritário com justificativa",
            "O sistema verifica alertas de estoque insuficiente nos ingredientes dos itens pedidos",
            "O atendente confirma o pedido e o sistema cria o registro com status 'registered', decrementa o estoque e gera o número do pedido"
          ]
        },
        {
          "operationId": "viewOrderBoard",
          "commandName": "viewOrderBoard",
          "steps": [
            "O atendente abre o painel de pedidos no POS",
            "O sistema identifica o turno atualmente aberto e filtra apenas os pedidos daquele turno",
            "O sistema lista os pedidos ordenados por data de criação (ordem de chegada)",
            "O painel exibe cada pedido com seu status atual, tipo, mesa e indicador de prioridade"
          ]
        },
        {
          "operationId": "deliverOrder",
          "commandName": "deliverOrder",
          "steps": [
            "O atendente consulta o painel de pedidos e identifica um pedido com status 'pronto'.",
            "O atendente seleciona o pedido e confirma a entrega ao cliente.",
            "O sistema valida que o status atual é 'ready' e atualiza o pedido para status 'delivered' registrando o momento da entrega."
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "section.posWorkspace.main",
      "type": "section",
      "sectionName": "POS — Lançamento e acompanhamento de pedidos",
      "titleKey": "posWorkspace.section.main.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "organism.posWorkspace.createOrder",
          "type": "organism",
          "organismName": "CreateOrder",
          "titleKey": "posWorkspace.organism.createOrder.title",
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
              "id": "intention.posWorkspace.createOrder.form",
              "intent": "commandForm",
              "action": "createOrder",
              "order": 10
            },
            {
              "id": "intention.posWorkspace.createOrder.review",
              "intent": "summary",
              "submitAction": "createOrder",
              "order": 20
            }
          ]
        },
        {
          "id": "organism.posWorkspace.viewOrderBoard",
          "type": "organism",
          "organismName": "ViewOrderBoard",
          "titleKey": "posWorkspace.organism.viewOrderBoard.title",
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
            "fifoKitchenQueue",
            "orderStatusFlow"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intention.posWorkspace.viewOrderBoard.list",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.viewOrderBoard",
              "action": "viewOrderBoard",
              "order": 10
            }
          ]
        },
        {
          "id": "organism.posWorkspace.deliverOrder",
          "type": "organism",
          "organismName": "DeliverOrder",
          "titleKey": "posWorkspace.organism.deliverOrder.title",
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
              "id": "intention.posWorkspace.deliverOrder.confirm",
              "intent": "commandForm",
              "action": "deliverOrder",
              "submitAction": "deliverOrder",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "posWorkspace.layout",
    "type": "page",
    "sections": [
      {
        "id": "section.posWorkspace.main",
        "type": "section",
        "sectionName": "POS — Lançamento e acompanhamento de pedidos",
        "titleKey": "posWorkspace.section.main.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "organism.posWorkspace.createOrder",
            "type": "organism",
            "organismName": "CreateOrder",
            "titleKey": "posWorkspace.organism.createOrder.title",
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
                "id": "intention.posWorkspace.createOrder.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "posWorkspace.createOrder.form.title",
                "action": "createOrder",
                "fields": [
                  {
                    "id": "field.createOrder.orderType",
                    "field": "orderType",
                    "labelKey": "posWorkspace.createOrder.orderType.label",
                    "order": 10,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "field.createOrder.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "posWorkspace.createOrder.tableNumber.label",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "field.createOrder.orderItems",
                    "field": "orderItems",
                    "labelKey": "posWorkspace.createOrder.orderItems.label",
                    "order": 30,
                    "required": true,
                    "inputType": "list",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  },
                  {
                    "id": "field.createOrder.priority",
                    "field": "priority",
                    "labelKey": "posWorkspace.createOrder.priority.label",
                    "order": 40,
                    "required": false,
                    "inputType": "checkbox",
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "field.createOrder.priorityReason",
                    "field": "priorityReason",
                    "labelKey": "posWorkspace.createOrder.priorityReason.label",
                    "order": 50,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.input.createOrder.priorityReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "intention.posWorkspace.createOrder.review",
                "intent": "summary",
                "order": 20,
                "titleKey": "posWorkspace.createOrder.review.title",
                "submitAction": "createOrder",
                "fields": [
                  {
                    "id": "field.review.orderType",
                    "field": "orderType",
                    "labelKey": "posWorkspace.createOrder.orderType.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "field.review.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "posWorkspace.createOrder.tableNumber.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "field.review.orderItems",
                    "field": "orderItems",
                    "labelKey": "posWorkspace.createOrder.orderItems.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  },
                  {
                    "id": "field.review.priority",
                    "field": "priority",
                    "labelKey": "posWorkspace.createOrder.priority.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "field.review.priorityReason",
                    "field": "priorityReason",
                    "labelKey": "posWorkspace.createOrder.priorityReason.label",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.posWorkspace.input.createOrder.priorityReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action.createOrder.submit",
                    "action": "createOrder",
                    "labelKey": "posWorkspace.createOrder.submit.label",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "createOrder"
                  }
                ]
              }
            ]
          },
          {
            "id": "organism.posWorkspace.viewOrderBoard",
            "type": "organism",
            "organismName": "ViewOrderBoard",
            "titleKey": "posWorkspace.organism.viewOrderBoard.title",
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
              "fifoKitchenQueue",
              "orderStatusFlow"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intention.posWorkspace.viewOrderBoard.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "posWorkspace.viewOrderBoard.list.title",
                "action": "viewOrderBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col.viewOrderBoard.orderId",
                    "field": "orderId",
                    "labelKey": "posWorkspace.viewOrderBoard.orderId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col.viewOrderBoard.status",
                    "field": "status",
                    "labelKey": "posWorkspace.viewOrderBoard.status.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col.viewOrderBoard.orderType",
                    "field": "orderType",
                    "labelKey": "posWorkspace.viewOrderBoard.orderType.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col.viewOrderBoard.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "posWorkspace.viewOrderBoard.tableNumber.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col.viewOrderBoard.priority",
                    "field": "priority",
                    "labelKey": "posWorkspace.viewOrderBoard.priority.label",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col.viewOrderBoard.priorityReason",
                    "field": "priorityReason",
                    "labelKey": "posWorkspace.viewOrderBoard.priorityReason.label",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col.viewOrderBoard.receivedAt",
                    "field": "receivedAt",
                    "labelKey": "posWorkspace.viewOrderBoard.receivedAt.label",
                    "order": 70,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col.viewOrderBoard.inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "posWorkspace.viewOrderBoard.inPreparationAt.label",
                    "order": 80,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col.viewOrderBoard.readyAt",
                    "field": "readyAt",
                    "labelKey": "posWorkspace.viewOrderBoard.readyAt.label",
                    "order": 90,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col.viewOrderBoard.createdAt",
                    "field": "createdAt",
                    "labelKey": "posWorkspace.viewOrderBoard.createdAt.label",
                    "order": 100,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "toolbar.viewOrderBoard.refresh",
                    "action": "viewOrderBoard",
                    "labelKey": "posWorkspace.viewOrderBoard.refresh.label",
                    "order": 10,
                    "actionKey": "viewOrderBoard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "rowAction.viewOrderBoard.deliver",
                    "action": "deliverOrder",
                    "labelKey": "posWorkspace.viewOrderBoard.deliver.label",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "deliverOrder"
                  }
                ],
                "actions": [],
                "stateKey": "ui.posWorkspace.data.viewOrderBoard"
              }
            ]
          },
          {
            "id": "organism.posWorkspace.deliverOrder",
            "type": "organism",
            "organismName": "DeliverOrder",
            "titleKey": "posWorkspace.organism.deliverOrder.title",
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
                "id": "intention.posWorkspace.deliverOrder.confirm",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "posWorkspace.deliverOrder.confirm.title",
                "action": "deliverOrder",
                "submitAction": "deliverOrder",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action.deliverOrder.submit",
                    "action": "deliverOrder",
                    "labelKey": "posWorkspace.deliverOrder.submit.label",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "deliverOrder"
                  }
                ]
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
    "id": "posWorkspace__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/posWorkspace.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/posWorkspace.ts",
      "_102051_/l2/cafeFlow/web/contracts/posWorkspace.defs.ts",
      "_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts"
    ],
    "dependsOn": [
      "posWorkspace__l2_shared"
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
