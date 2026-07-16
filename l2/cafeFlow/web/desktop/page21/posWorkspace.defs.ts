/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posWorkspace",
  "pageName": "POS — Lançamento e acompanhamento de pedidos",
  "baseClassName": "CafeFlowPosWorkspaceBase",
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
      "id": "sec-order-board",
      "type": "section",
      "sectionName": "Order Board",
      "titleKey": "section.orderBoard.title",
      "mode": "board",
      "order": 1,
      "organisms": [
        {
          "id": "org-order-board",
          "type": "board",
          "organismName": "OrderBoard",
          "titleKey": "organism.orderBoard.title",
          "purpose": "Live order status board showing all orders for the current shift, grouped by lifecycle status, with inline delivery action on ready orders",
          "userActions": [
            "viewOrderBoard",
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
            "priority",
            "priorityReason",
            "readyAt",
            "createdAt"
          ],
          "writesFields": [
            "orderId",
            "status",
            "deliveredAt",
            "updatedAt"
          ],
          "rulesApplied": [
            "Order lifecycle: only 'ready' orders can be delivered",
            "orderId is derived from row selection, never manually typed",
            "Board auto-loads on page open and refreshes after createOrder and deliverOrder"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-view-board",
              "intent": "query",
              "stateKey": "ui.posWorkspace.data.viewOrderBoard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-create-order",
      "type": "section",
      "sectionName": "Create Order",
      "titleKey": "section.createOrder.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-create-order",
          "type": "form",
          "organismName": "CreateOrderForm",
          "titleKey": "organism.createOrderForm.title",
          "purpose": "Compact form for the attendant to select order type, add items, optionally flag priority, and submit a new order to the kitchen",
          "userActions": [
            "createOrder"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem"
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
            "tableNumber is only relevant when orderType is 'mesa'",
            "priorityReason is only relevant when priority is true",
            "After successful creation, form inputs are cleared and the board refreshes"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-create-order",
              "intent": "command",
              "stateKey": "ui.posWorkspace.output.createOrder",
              "action": "createOrder",
              "submitAction": "createOrder",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "goal_first",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "pageObjective": {
    "actor": "POS attendant (atendente de caixa)",
    "jobToBeDone": "Quickly create new orders and deliver ready orders from a live status board without losing operational context",
    "primaryDecision": "Decide whether to create a new order or deliver a ready order shown on the board",
    "decisiveInfo": [
      "orderType",
      "tableNumber",
      "orderItems",
      "priority",
      "priorityReason",
      "status",
      "orderId"
    ],
    "usageFrequency": "Continuous, hands-busy operational screen during open shift",
    "criticalActions": [
      {
        "action": "createOrder",
        "presentation": "primary-button in a compact form below the board"
      },
      {
        "action": "deliverOrder",
        "presentation": "inline-row-command on ready orders in the board"
      },
      {
        "action": "viewOrderBoard",
        "presentation": "auto-loaded live board, dominant surface at top"
      }
    ],
    "informationHierarchy": [
      "Live order board with status and priority (dominant surface)",
      "Ready orders highlighted for immediate one-tap delivery",
      "Create order form with type, table, items, priority",
      "Order detail context (timestamps, priority reason)"
    ],
    "successCriteria": "Attendant sees ready orders at a glance and delivers in one tap; can create a new order in under 30 seconds without losing sight of the board",
    "antiPatterns": [
      "Separate deliver form with manually typed orderId",
      "Status as free select over all enum values",
      "Board buried below the create form",
      "Every timestamp shown as a column cluttering the board"
    ]
  },
  "msgKeys": [
    "action.createOrder.error",
    "action.createOrder.label",
    "action.createOrder.success",
    "action.deliverOrder.error",
    "action.deliverOrder.label",
    "action.deliverOrder.success",
    "action.viewOrderBoard.label",
    "column.createdAt.label",
    "column.orderId.label",
    "column.orderType.label",
    "column.priority.label",
    "column.priorityReason.label",
    "column.readyAt.label",
    "column.status.label",
    "column.tableNumber.label",
    "field.orderItems.label",
    "field.orderType.label",
    "field.priority.label",
    "field.priorityReason.label",
    "field.tableNumber.label",
    "intent.createOrder.title",
    "intent.viewOrderBoard.empty",
    "intent.viewOrderBoard.title",
    "organism.createOrderForm.title",
    "organism.orderBoard.empty",
    "organism.orderBoard.title",
    "page.posWorkspace.title",
    "section.createOrder.title",
    "section.orderBoard.empty",
    "section.orderBoard.title"
  ],
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "sec-order-board",
        "type": "section",
        "sectionName": "Order Board",
        "titleKey": "section.orderBoard.title",
        "mode": "board",
        "order": 1,
        "organisms": [
          {
            "id": "org-order-board",
            "type": "board",
            "organismName": "OrderBoard",
            "titleKey": "organism.orderBoard.title",
            "purpose": "Live order status board showing all orders for the current shift, grouped by lifecycle status, with inline delivery action on ready orders",
            "userActions": [
              "viewOrderBoard",
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
              "priority",
              "priorityReason",
              "readyAt",
              "createdAt"
            ],
            "writesFields": [
              "orderId",
              "status",
              "deliveredAt",
              "updatedAt"
            ],
            "rulesApplied": [
              "Order lifecycle: only 'ready' orders can be delivered",
              "orderId is derived from row selection, never manually typed",
              "Board auto-loads on page open and refreshes after createOrder and deliverOrder"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-view-board",
                "intent": "query",
                "order": 1,
                "titleKey": "intent.viewOrderBoard.title",
                "source": "viewOrderBoard",
                "binding": "viewOrderBoard",
                "emptyKey": "intent.viewOrderBoard.empty",
                "displayHint": "card-board",
                "stateKey": "ui.posWorkspace.data.viewOrderBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-order-id",
                    "field": "orderId",
                    "labelKey": "column.orderId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-order-type",
                    "field": "orderType",
                    "labelKey": "column.orderType.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-table-number",
                    "field": "tableNumber",
                    "labelKey": "column.tableNumber.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "column.priority.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "column.priorityReason.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-ready-at",
                    "field": "readyAt",
                    "labelKey": "column.readyAt.label",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-created-at",
                    "field": "createdAt",
                    "labelKey": "column.createdAt.label",
                    "order": 8,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-refresh-board",
                    "action": "viewOrderBoard",
                    "labelKey": "action.viewOrderBoard.label",
                    "order": 1,
                    "displayHint": "refresh-button",
                    "actionKey": "viewOrderBoard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "ra-deliver",
                    "action": "deliverOrder",
                    "labelKey": "action.deliverOrder.label",
                    "order": 1,
                    "displayHint": "inline-row-command",
                    "actionKey": "deliverOrder"
                  }
                ],
                "actions": []
              }
            ]
          }
        ]
      },
      {
        "id": "sec-create-order",
        "type": "section",
        "sectionName": "Create Order",
        "titleKey": "section.createOrder.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-create-order",
            "type": "form",
            "organismName": "CreateOrderForm",
            "titleKey": "organism.createOrderForm.title",
            "purpose": "Compact form for the attendant to select order type, add items, optionally flag priority, and submit a new order to the kitchen",
            "userActions": [
              "createOrder"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem"
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
              "tableNumber is only relevant when orderType is 'mesa'",
              "priorityReason is only relevant when priority is true",
              "After successful creation, form inputs are cleared and the board refreshes"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-create-order",
                "intent": "command",
                "order": 1,
                "titleKey": "intent.createOrder.title",
                "source": "createOrder",
                "binding": "createOrder",
                "action": "createOrder",
                "submitAction": "createOrder",
                "displayHint": "summary-first",
                "stateKey": "ui.posWorkspace.output.createOrder",
                "fields": [
                  {
                    "id": "fld-order-type",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 1,
                    "required": true,
                    "inputType": "select",
                    "source": "userInput",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "fld-table-number",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber.label",
                    "order": 2,
                    "required": false,
                    "inputType": "number",
                    "source": "userInput",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "fld-order-items",
                    "field": "orderItems",
                    "labelKey": "field.orderItems.label",
                    "order": 3,
                    "required": true,
                    "inputType": "list",
                    "source": "userInput",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  },
                  {
                    "id": "fld-priority",
                    "field": "priority",
                    "labelKey": "field.priority.label",
                    "order": 4,
                    "required": false,
                    "inputType": "checkbox",
                    "source": "userInput",
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "fld-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.posWorkspace.input.createOrder.priorityReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-create-order",
                    "action": "createOrder",
                    "labelKey": "action.createOrder.label",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "createOrder"
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
      "id": "bind-view-order-board",
      "source": "query",
      "entity": "Order",
      "command": "viewOrderBoard",
      "description": "Loads all orders for the current shift ordered by creation date",
      "stateKey": "ui.posWorkspace.data.viewOrderBoard",
      "inputStateKeys": []
    },
    {
      "id": "bind-create-order",
      "source": "command",
      "entity": "Order",
      "command": "createOrder",
      "description": "Creates a new order with items, decrements stock, and sends to kitchen",
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
      "id": "bind-deliver-order",
      "source": "command",
      "entity": "Order",
      "command": "deliverOrder",
      "description": "Marks a ready order as delivered to the customer",
      "stateKey": "ui.posWorkspace.output.deliverOrder",
      "inputStateKeys": [
        "ui.posWorkspace.input.deliverOrder.orderId"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "posWorkspace__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/posWorkspace.ts",
      "_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "posWorkspace__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
