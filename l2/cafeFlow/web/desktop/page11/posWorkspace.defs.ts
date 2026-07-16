/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.defs.ts" enhancement="_blank"/>

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
      "id": "sec-discover",
      "type": "section",
      "sectionName": "sec-discover",
      "titleKey": "sec.discover.title",
      "mode": "section",
      "order": 1,
      "organisms": [
        {
          "id": "org-order-board",
          "type": "organism",
          "organismName": "OrderBoardCards",
          "titleKey": "org.order.board.title",
          "purpose": "Visualizar painel de pedidos como cards com status e ações de entrega",
          "userActions": [
            "viewOrderBoard"
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
            "receivedAt",
            "inPreparationAt",
            "readyAt",
            "createdAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "Orders filtered by current open shift",
            "Orders ordered by creation date (FIFO)"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-view-order-board",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.viewOrderBoard",
              "action": "viewOrderBoard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-create-order",
      "type": "section",
      "sectionName": "sec-create-order",
      "titleKey": "sec.create.order.title",
      "mode": "section",
      "order": 2,
      "organisms": [
        {
          "id": "org-create-order",
          "type": "organism",
          "organismName": "CreateOrderForm",
          "titleKey": "org.create.order.title",
          "purpose": "Lançar pedido no POS com tipo, itens e prioridade",
          "userActions": [
            "createOrder"
          ],
          "requiredEntities": [
            "Order",
            "MenuItem"
          ],
          "readsFields": [],
          "writesFields": [
            "orderType",
            "tableNumber",
            "orderItems",
            "priority",
            "priorityReason"
          ],
          "rulesApplied": [
            "Stock validation on submit",
            "Order status set to registered on creation",
            "Stock decremented per ingredient linkage"
          ],
          "order": 2,
          "intentionRefs": [
            {
              "id": "int-create-order",
              "intent": "commandForm",
              "stateKey": "ui.posWorkspace.action.createOrder.status",
              "action": "createOrder",
              "submitAction": "createOrder",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-deliver-order",
      "type": "section",
      "sectionName": "sec-deliver-order",
      "titleKey": "sec.deliver.order.title",
      "mode": "section",
      "order": 3,
      "organisms": [
        {
          "id": "org-deliver-order",
          "type": "organism",
          "organismName": "DeliverOrderForm",
          "titleKey": "org.deliver.order.title",
          "purpose": "Entregar pedido selecionado ao cliente",
          "userActions": [
            "deliverOrder"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId"
          ],
          "writesFields": [
            "orderId"
          ],
          "rulesApplied": [
            "Order status must be ready to deliver",
            "Updates status to delivered with timestamp"
          ],
          "order": 3,
          "intentionRefs": [
            {
              "id": "int-deliver-order",
              "intent": "commandForm",
              "stateKey": "ui.posWorkspace.action.deliverOrder.status",
              "action": "deliverOrder",
              "submitAction": "deliverOrder",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-review",
      "type": "section",
      "sectionName": "sec-review",
      "titleKey": "sec.review.title",
      "mode": "section",
      "order": 4,
      "organisms": [
        {
          "id": "org-review",
          "type": "organism",
          "organismName": "ReviewSummary",
          "titleKey": "org.review.title",
          "purpose": "Revisar o contexto e o resultado das ações principais da página",
          "userActions": [],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [],
          "order": 4,
          "intentionRefs": [
            {
              "id": "int-review",
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
  "msgKeys": [
    "action.createOrder.error",
    "action.createOrder.label",
    "action.createOrder.success",
    "action.deliverOrder.error",
    "action.deliverOrder.label",
    "action.deliverOrder.success",
    "column.createdAt.label",
    "column.inPreparationAt.label",
    "column.orderId.label",
    "column.orderType.label",
    "column.priority.label",
    "column.priorityReason.label",
    "column.readyAt.label",
    "column.receivedAt.label",
    "column.status.label",
    "column.tableNumber.label",
    "empty.orderBoard",
    "field.orderId.label",
    "field.orderItems.label",
    "field.orderType.label",
    "field.priority.label",
    "field.priorityReason.label",
    "field.tableNumber.label",
    "filter.orderType.label",
    "filter.priority.label",
    "filter.status.label",
    "intent.createOrder.title",
    "intent.deliverOrder.title",
    "intent.review.title",
    "intent.viewOrderBoard.title",
    "org.create.order.title",
    "org.deliver.order.title",
    "org.order.board.title",
    "org.review.title",
    "page.title",
    "rowAction.selectForDelivery.label",
    "sec.create.order.title",
    "sec.deliver.order.title",
    "sec.discover.title",
    "sec.review.title",
    "section.createOrder.title",
    "section.deliverOrder.title",
    "section.discover.title",
    "section.review.title",
    "toolbar.refresh.label"
  ],
  "layout": {
    "id": "page11-mobile-cards",
    "type": "page",
    "sections": [
      {
        "id": "sec-discover",
        "type": "section",
        "sectionName": "sec-discover",
        "titleKey": "sec.discover.title",
        "mode": "section",
        "order": 1,
        "organisms": [
          {
            "id": "org-order-board",
            "type": "organism",
            "organismName": "OrderBoardCards",
            "titleKey": "org.order.board.title",
            "purpose": "Visualizar painel de pedidos como cards com status e ações de entrega",
            "userActions": [
              "viewOrderBoard"
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
              "receivedAt",
              "inPreparationAt",
              "readyAt",
              "createdAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "Orders filtered by current open shift",
              "Orders ordered by creation date (FIFO)"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-view-order-board",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intent.viewOrderBoard.title",
                "source": "query",
                "binding": "viewOrderBoard",
                "action": "viewOrderBoard",
                "emptyKey": "empty.orderBoard",
                "displayHint": "cards",
                "stateKey": "ui.posWorkspace.data.viewOrderBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-orderId",
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
                    "id": "col-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-tableNumber",
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
                    "id": "col-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "column.priorityReason.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-receivedAt",
                    "field": "receivedAt",
                    "labelKey": "column.receivedAt.label",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-readyAt",
                    "field": "readyAt",
                    "labelKey": "column.readyAt.label",
                    "order": 8,
                    "required": false,
                    "inputType": "datetime",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt.label",
                    "order": 9,
                    "required": false,
                    "inputType": "datetime",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "filters": [
                  {
                    "id": "flt-status",
                    "field": "status",
                    "labelKey": "filter.status.label",
                    "order": 1,
                    "required": false,
                    "inputType": "select",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "flt-orderType",
                    "field": "orderType",
                    "labelKey": "filter.orderType.label",
                    "order": 2,
                    "required": false,
                    "inputType": "select",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "flt-priority",
                    "field": "priority",
                    "labelKey": "filter.priority.label",
                    "order": 3,
                    "required": false,
                    "inputType": "select",
                    "source": "query",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb-refresh",
                    "action": "viewOrderBoard",
                    "labelKey": "toolbar.refresh.label",
                    "order": 1,
                    "displayHint": "icon",
                    "actionKey": "viewOrderBoard"
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
        "id": "sec-create-order",
        "type": "section",
        "sectionName": "sec-create-order",
        "titleKey": "sec.create.order.title",
        "mode": "section",
        "order": 2,
        "organisms": [
          {
            "id": "org-create-order",
            "type": "organism",
            "organismName": "CreateOrderForm",
            "titleKey": "org.create.order.title",
            "purpose": "Lançar pedido no POS com tipo, itens e prioridade",
            "userActions": [
              "createOrder"
            ],
            "requiredEntities": [
              "Order",
              "MenuItem"
            ],
            "readsFields": [],
            "writesFields": [
              "orderType",
              "tableNumber",
              "orderItems",
              "priority",
              "priorityReason"
            ],
            "rulesApplied": [
              "Stock validation on submit",
              "Order status set to registered on creation",
              "Stock decremented per ingredient linkage"
            ],
            "order": 2,
            "intentions": [
              {
                "id": "int-create-order",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intent.createOrder.title",
                "source": "command",
                "binding": "createOrder",
                "action": "createOrder",
                "submitAction": "createOrder",
                "displayHint": "form",
                "stateKey": "ui.posWorkspace.action.createOrder.status",
                "fields": [
                  {
                    "id": "fld-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 1,
                    "required": true,
                    "inputType": "select",
                    "source": "userInput",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "fld-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "fld-orderItems",
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
                    "id": "fld-priorityReason",
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
                    "id": "act-submit-create",
                    "action": "createOrder",
                    "labelKey": "action.createOrder.label",
                    "order": 1,
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
        "id": "sec-deliver-order",
        "type": "section",
        "sectionName": "sec-deliver-order",
        "titleKey": "sec.deliver.order.title",
        "mode": "section",
        "order": 3,
        "organisms": [
          {
            "id": "org-deliver-order",
            "type": "organism",
            "organismName": "DeliverOrderForm",
            "titleKey": "org.deliver.order.title",
            "purpose": "Entregar pedido selecionado ao cliente",
            "userActions": [
              "deliverOrder"
            ],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "orderId"
            ],
            "writesFields": [
              "orderId"
            ],
            "rulesApplied": [
              "Order status must be ready to deliver",
              "Updates status to delivered with timestamp"
            ],
            "order": 3,
            "intentions": [
              {
                "id": "int-deliver-order",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intent.deliverOrder.title",
                "source": "command",
                "binding": "deliverOrder",
                "action": "deliverOrder",
                "submitAction": "deliverOrder",
                "displayHint": "form",
                "stateKey": "ui.posWorkspace.action.deliverOrder.status",
                "fields": [
                  {
                    "id": "fld-deliverOrderId",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "text",
                    "source": "selectedEntity",
                    "stateKey": "ui.posWorkspace.input.deliverOrder.orderId"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submit-deliver",
                    "action": "deliverOrder",
                    "labelKey": "action.deliverOrder.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "deliverOrder"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec-review",
        "type": "section",
        "sectionName": "sec-review",
        "titleKey": "sec.review.title",
        "mode": "section",
        "order": 4,
        "organisms": [
          {
            "id": "org-review",
            "type": "organism",
            "organismName": "ReviewSummary",
            "titleKey": "org.review.title",
            "purpose": "Revisar o contexto e o resultado das ações principais da página",
            "userActions": [],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [],
            "order": 4,
            "intentions": [
              {
                "id": "int-review",
                "intent": "summary",
                "order": 1,
                "titleKey": "intent.review.title",
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
      "id": "bind-viewOrderBoard",
      "source": "query",
      "entity": "Order",
      "command": "viewOrderBoard",
      "description": "Carrega o painel de pedidos do turno atual",
      "stateKey": "ui.posWorkspace.data.viewOrderBoard",
      "inputStateKeys": []
    },
    {
      "id": "bind-createOrder",
      "source": "command",
      "entity": "Order",
      "command": "createOrder",
      "description": "Cria um novo pedido no POS",
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
      "id": "bind-deliverOrder",
      "source": "command",
      "entity": "Order",
      "command": "deliverOrder",
      "description": "Entrega o pedido selecionado ao cliente",
      "stateKey": "ui.posWorkspace.output.deliverOrder",
      "inputStateKeys": [
        "ui.posWorkspace.input.deliverOrder.orderId"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "posWorkspace__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/posWorkspace.ts",
      "_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts",
      "_102051_/l2/designSystem.ts"
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
