/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.defs.ts" enhancement="_blank"/>

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
      "id": "sec-queue",
      "type": "section",
      "sectionName": "filaPedidos",
      "titleKey": "posWorkspace.section.queue.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-queue-order-board",
          "type": "organism",
          "organismName": "ViewOrderBoard",
          "titleKey": "posWorkspace.organism.queueBoard.title",
          "purpose": "Fila de pedidos do turno",
          "userActions": [
            "viewOrderBoard"
          ],
          "requiredEntities": [
            "Order",
            "Shift"
          ],
          "readsFields": [
            "orderId",
            "status",
            "orderType",
            "tableNumber",
            "priority",
            "readyAt",
            "createdAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "dashboardCurrentShiftOnly",
            "fifoKitchenQueue",
            "orderStatusFlow"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-queue-query",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.viewOrderBoard",
              "action": "viewOrderBoard",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec-create-order-q",
      "type": "section",
      "sectionName": "lancarPedido",
      "titleKey": "posWorkspace.section.createOrder.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org-create-order-q",
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
          "readsFields": [
            "orderType",
            "tableNumber",
            "orderItems",
            "priority",
            "priorityReason"
          ],
          "writesFields": [
            "orderId",
            "status",
            "orderType",
            "tableNumber",
            "createdAt"
          ],
          "rulesApplied": [
            "stockDecrementOnOrderLaunch",
            "orderStatusFlow",
            "fifoKitchenQueue"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-q-create-order-type",
              "intent": "commandForm",
              "order": 10
            },
            {
              "id": "int-q-create-order-items",
              "intent": "commandForm",
              "order": 20
            },
            {
              "id": "int-q-create-order-priority",
              "intent": "commandForm",
              "order": 30
            },
            {
              "id": "int-q-create-order-summary",
              "intent": "summary",
              "order": 40
            },
            {
              "id": "int-q-create-order-submit",
              "intent": "actionList",
              "submitAction": "createOrder",
              "order": 50
            }
          ]
        }
      ]
    },
    {
      "id": "sec-deliver-order-q",
      "type": "section",
      "sectionName": "entregarPedido",
      "titleKey": "posWorkspace.section.deliverOrder.title",
      "mode": "edit",
      "order": 30,
      "organisms": [
        {
          "id": "org-deliver-order-q",
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
          "readsFields": [
            "orderId",
            "status",
            "orderType",
            "tableNumber",
            "readyAt"
          ],
          "writesFields": [
            "status",
            "deliveredAt"
          ],
          "rulesApplied": [
            "orderStatusFlow",
            "readyBeforeDelivered"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-q-deliver-summary",
              "intent": "summary",
              "order": 10
            },
            {
              "id": "int-q-deliver-submit",
              "intent": "actionList",
              "submitAction": "deliverOrder",
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
        "id": "sec-queue",
        "type": "section",
        "sectionName": "filaPedidos",
        "titleKey": "posWorkspace.section.queue.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-queue-order-board",
            "type": "organism",
            "organismName": "ViewOrderBoard",
            "titleKey": "posWorkspace.organism.queueBoard.title",
            "purpose": "Fila de pedidos do turno",
            "userActions": [
              "viewOrderBoard"
            ],
            "requiredEntities": [
              "Order",
              "Shift"
            ],
            "readsFields": [
              "orderId",
              "status",
              "orderType",
              "tableNumber",
              "priority",
              "readyAt",
              "createdAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "dashboardCurrentShiftOnly",
              "fifoKitchenQueue",
              "orderStatusFlow"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-queue-query",
                "intent": "queryList",
                "order": 10,
                "titleKey": "posWorkspace.intent.queue.query.title",
                "binding": "viewOrderBoard",
                "action": "viewOrderBoard",
                "displayHint": "queue",
                "fields": [],
                "columns": [
                  {
                    "id": "col-q-order-id",
                    "field": "orderId",
                    "labelKey": "posWorkspace.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-q-status",
                    "field": "status",
                    "labelKey": "posWorkspace.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-q-order-type",
                    "field": "orderType",
                    "labelKey": "posWorkspace.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-q-table-number",
                    "field": "tableNumber",
                    "labelKey": "posWorkspace.field.tableNumber",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-q-priority",
                    "field": "priority",
                    "labelKey": "posWorkspace.field.priority",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-q-ready-at",
                    "field": "readyAt",
                    "labelKey": "posWorkspace.field.readyAt",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-q-created-at",
                    "field": "createdAt",
                    "labelKey": "posWorkspace.field.createdAt",
                    "order": 70,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-q-refresh",
                    "action": "viewOrderBoard",
                    "labelKey": "posWorkspace.action.refreshBoard",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "viewOrderBoard"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.posWorkspace.data.viewOrderBoard"
              }
            ]
          }
        ]
      },
      {
        "id": "sec-create-order-q",
        "type": "section",
        "sectionName": "lancarPedido",
        "titleKey": "posWorkspace.section.createOrder.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org-create-order-q",
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
            "readsFields": [
              "orderType",
              "tableNumber",
              "orderItems",
              "priority",
              "priorityReason"
            ],
            "writesFields": [
              "orderId",
              "status",
              "orderType",
              "tableNumber",
              "createdAt"
            ],
            "rulesApplied": [
              "stockDecrementOnOrderLaunch",
              "orderStatusFlow",
              "fifoKitchenQueue"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-q-create-order-type",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "posWorkspace.intent.createOrder.type.title",
                "binding": "createOrder",
                "displayHint": "step",
                "fields": [
                  {
                    "id": "fld-q-order-type",
                    "field": "orderType",
                    "labelKey": "posWorkspace.field.orderType",
                    "order": 10,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "fld-q-table-number",
                    "field": "tableNumber",
                    "labelKey": "posWorkspace.field.tableNumber",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "int-q-create-order-items",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "posWorkspace.intent.createOrder.items.title",
                "binding": "createOrder",
                "displayHint": "repeatable",
                "fields": [
                  {
                    "id": "fld-q-order-items",
                    "field": "orderItems",
                    "labelKey": "posWorkspace.field.orderItems",
                    "order": 10,
                    "required": true,
                    "inputType": "repeatable",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "int-q-create-order-priority",
                "intent": "commandForm",
                "order": 30,
                "titleKey": "posWorkspace.intent.createOrder.priority.title",
                "binding": "createOrder",
                "displayHint": "step",
                "fields": [
                  {
                    "id": "fld-q-priority",
                    "field": "priority",
                    "labelKey": "posWorkspace.field.priority",
                    "order": 10,
                    "required": false,
                    "inputType": "checkbox",
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "fld-q-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "posWorkspace.field.priorityReason",
                    "order": 20,
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
                "id": "int-q-create-order-summary",
                "intent": "summary",
                "order": 40,
                "titleKey": "posWorkspace.intent.createOrder.summary.title",
                "binding": "createOrder",
                "displayHint": "review",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "int-q-create-order-submit",
                "intent": "actionList",
                "order": 50,
                "titleKey": "posWorkspace.intent.createOrder.submit.title",
                "binding": "createOrder",
                "submitAction": "createOrder",
                "displayHint": "primary",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-q-create-order",
                    "action": "createOrder",
                    "labelKey": "posWorkspace.action.createOrder",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "createOrder"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec-deliver-order-q",
        "type": "section",
        "sectionName": "entregarPedido",
        "titleKey": "posWorkspace.section.deliverOrder.title",
        "mode": "edit",
        "order": 30,
        "organisms": [
          {
            "id": "org-deliver-order-q",
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
            "readsFields": [
              "orderId",
              "status",
              "orderType",
              "tableNumber",
              "readyAt"
            ],
            "writesFields": [
              "status",
              "deliveredAt"
            ],
            "rulesApplied": [
              "orderStatusFlow",
              "readyBeforeDelivered"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-q-deliver-summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "posWorkspace.intent.deliverOrder.summary.title",
                "binding": "deliverOrder",
                "displayHint": "selectedItem",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "int-q-deliver-submit",
                "intent": "actionList",
                "order": 20,
                "titleKey": "posWorkspace.intent.deliverOrder.submit.title",
                "binding": "deliverOrder",
                "submitAction": "deliverOrder",
                "displayHint": "primary",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-q-deliver-order",
                    "action": "deliverOrder",
                    "labelKey": "posWorkspace.action.deliverOrder",
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
  "dataBindings": [
    {
      "id": "db-view-order-board",
      "source": "bff",
      "command": "viewOrderBoard",
      "description": "Carregar painel de pedidos do turno atual",
      "stateKey": "ui.posWorkspace.data.viewOrderBoard",
      "inputStateKeys": []
    },
    {
      "id": "db-create-order",
      "source": "bff",
      "command": "createOrder",
      "description": "Lançar pedido no POS",
      "stateKey": "ui.posWorkspace.output.createOrder",
      "inputStateKeys": [
        "ui.posWorkspace.input.createOrder.orderType",
        "ui.posWorkspace.input.createOrder.tableNumber",
        "ui.posWorkspace.input.createOrder.orderItems",
        "ui.posWorkspace.input.createOrder.priority",
        "ui.posWorkspace.input.createOrder.priorityReason"
      ]
    },
    {
      "id": "db-deliver-order",
      "source": "bff",
      "command": "deliverOrder",
      "description": "Registrar entrega do pedido",
      "stateKey": "ui.posWorkspace.output.deliverOrder",
      "inputStateKeys": []
    }
  ]
};

export const pipeline = [
  {
    "id": "posWorkspace__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.defs.ts",
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
