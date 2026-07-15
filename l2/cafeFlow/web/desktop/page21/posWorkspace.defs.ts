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
      "id": "sec-board",
      "type": "section",
      "sectionName": "sec-board",
      "titleKey": "sec.board.title",
      "mode": "kanban",
      "order": 1,
      "organisms": [
        {
          "id": "org-orderKanbanBoard",
          "type": "organism",
          "organismName": "orderKanbanBoard",
          "titleKey": "org.orderKanbanBoard.title",
          "purpose": "Visualizar pedidos agrupados por status em colunas kanban, identificar gargalos e selecionar pedidos para entrega",
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
          "writesFields": [
            "orderId"
          ],
          "rulesApplied": [
            "Orders grouped by lifecycle status into kanban lanes: registered, received, inPreparation, ready, delivered",
            "Orders filtered by current open shift",
            "Cards ordered by creation date within each lane",
            "Selecting a card sets deliverOrderOrderId from selected entity"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-board-query",
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
      "id": "sec-createOrder",
      "type": "section",
      "sectionName": "sec-createOrder",
      "titleKey": "sec.createOrder.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-createOrderForm",
          "type": "organism",
          "organismName": "createOrderForm",
          "titleKey": "org.createOrderForm.title",
          "purpose": "Formulário para lançar novo pedido no POS com tipo, mesa, itens e prioridade opcional",
          "userActions": [
            "createOrder"
          ],
          "requiredEntities": [
            "Order"
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
            "tableNumber required when orderType is mesa",
            "priorityReason required when priority is set",
            "orderItems must contain at least one item",
            "Stock is decremented when order is confirmed",
            "Order created with status registered"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-createOrder-form",
              "intent": "commandForm",
              "stateKey": "ui.posWorkspace.action.createOrder.status",
              "submitAction": "createOrder",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-deliverOrder",
      "type": "section",
      "sectionName": "sec-deliverOrder",
      "titleKey": "sec.deliverOrder.title",
      "mode": "form",
      "order": 3,
      "organisms": [
        {
          "id": "org-deliverOrderPanel",
          "type": "organism",
          "organismName": "deliverOrderPanel",
          "titleKey": "org.deliverOrderPanel.title",
          "purpose": "Entregar pedido selecionado ao cliente, confirmando a entrega de um pedido com status pronto",
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
            "Order must have status ready to be delivered",
            "orderId is provided by selected entity from board, not manual input",
            "Delivery registers deliveredAt timestamp"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-deliverOrder-form",
              "intent": "commandForm",
              "stateKey": "ui.posWorkspace.action.deliverOrder.status",
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
      "mode": "summary",
      "order": 4,
      "organisms": [
        {
          "id": "org-reviewSummary",
          "type": "organism",
          "organismName": "reviewSummary",
          "titleKey": "org.reviewSummary.title",
          "purpose": "Revisar o contexto e o resultado das ações principais da página: pedidos criados e entregas realizadas",
          "userActions": [],
          "requiredEntities": [],
          "readsFields": [
            "orderId",
            "status",
            "orderType",
            "tableNumber",
            "createdAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-review-summary",
              "intent": "summary",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "kanban_pipeline",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "page21-kanban_pipeline",
    "type": "page",
    "sections": [
      {
        "id": "sec-board",
        "type": "section",
        "sectionName": "sec-board",
        "titleKey": "sec.board.title",
        "mode": "kanban",
        "order": 1,
        "organisms": [
          {
            "id": "org-orderKanbanBoard",
            "type": "organism",
            "organismName": "orderKanbanBoard",
            "titleKey": "org.orderKanbanBoard.title",
            "purpose": "Visualizar pedidos agrupados por status em colunas kanban, identificar gargalos e selecionar pedidos para entrega",
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
            "writesFields": [
              "orderId"
            ],
            "rulesApplied": [
              "Orders grouped by lifecycle status into kanban lanes: registered, received, inPreparation, ready, delivered",
              "Orders filtered by current open shift",
              "Cards ordered by creation date within each lane",
              "Selecting a card sets deliverOrderOrderId from selected entity"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-board-query",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.board.title",
                "source": "viewOrderBoard",
                "binding": "ui.posWorkspace.data.viewOrderBoard",
                "action": "viewOrderBoard",
                "emptyKey": "empty.board",
                "displayHint": "Kanban lanes by status: registered, received, inPreparation, ready, delivered. Cards show order identity, type, table, priority and timestamps.",
                "stateKey": "ui.posWorkspace.data.viewOrderBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-orderId",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "field.priority.label",
                    "order": 4,
                    "required": false,
                    "inputType": "badge",
                    "source": "viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-receivedAt",
                    "field": "receivedAt",
                    "labelKey": "field.receivedAt.label",
                    "order": 6,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "field.inPreparationAt.label",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-readyAt",
                    "field": "readyAt",
                    "labelKey": "field.readyAt.label",
                    "order": 8,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 9,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "viewOrderBoard",
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
                    "displayHint": "secondary",
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
        "id": "sec-createOrder",
        "type": "section",
        "sectionName": "sec-createOrder",
        "titleKey": "sec.createOrder.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-createOrderForm",
            "type": "organism",
            "organismName": "createOrderForm",
            "titleKey": "org.createOrderForm.title",
            "purpose": "Formulário para lançar novo pedido no POS com tipo, mesa, itens e prioridade opcional",
            "userActions": [
              "createOrder"
            ],
            "requiredEntities": [
              "Order"
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
              "tableNumber required when orderType is mesa",
              "priorityReason required when priority is set",
              "orderItems must contain at least one item",
              "Stock is decremented when order is confirmed",
              "Order created with status registered"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-createOrder-form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.createOrder.title",
                "source": "createOrder",
                "binding": "ui.posWorkspace.action.createOrder.status",
                "submitAction": "createOrder",
                "emptyKey": "empty.createOrder",
                "displayHint": "Form with orderType select (mesa/takeout), tableNumber when mesa, composite orderItems sub-form, optional priority toggle with reason text",
                "stateKey": "ui.posWorkspace.action.createOrder.status",
                "fields": [
                  {
                    "id": "fld-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 1,
                    "required": true,
                    "inputType": "select",
                    "source": "set.createOrderOrderType",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "fld-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber.label",
                    "order": 2,
                    "required": false,
                    "inputType": "number",
                    "source": "set.createOrderTableNumber",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "fld-orderItems",
                    "field": "orderItems",
                    "labelKey": "field.orderItems.label",
                    "order": 3,
                    "required": true,
                    "inputType": "composite",
                    "source": "set.createOrderOrderItems",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  },
                  {
                    "id": "fld-priority",
                    "field": "priority",
                    "labelKey": "field.priority.label",
                    "order": 4,
                    "required": false,
                    "inputType": "select",
                    "source": "set.createOrderPriority",
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "fld-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "set.createOrderPriorityReason",
                    "stateKey": "ui.posWorkspace.input.createOrder.priorityReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submit-createOrder",
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
        "id": "sec-deliverOrder",
        "type": "section",
        "sectionName": "sec-deliverOrder",
        "titleKey": "sec.deliverOrder.title",
        "mode": "form",
        "order": 3,
        "organisms": [
          {
            "id": "org-deliverOrderPanel",
            "type": "organism",
            "organismName": "deliverOrderPanel",
            "titleKey": "org.deliverOrderPanel.title",
            "purpose": "Entregar pedido selecionado ao cliente, confirmando a entrega de um pedido com status pronto",
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
              "Order must have status ready to be delivered",
              "orderId is provided by selected entity from board, not manual input",
              "Delivery registers deliveredAt timestamp"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-deliverOrder-form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.deliverOrder.title",
                "source": "deliverOrder",
                "binding": "ui.posWorkspace.action.deliverOrder.status",
                "submitAction": "deliverOrder",
                "emptyKey": "empty.deliverOrder",
                "displayHint": "Contextual action on selected ready order. orderId from selection, no manual input. Show current status before confirming delivery.",
                "stateKey": "ui.posWorkspace.action.deliverOrder.status",
                "fields": [
                  {
                    "id": "fld-deliverOrderId",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "display",
                    "source": "set.deliverOrderOrderId",
                    "stateKey": "ui.posWorkspace.input.deliverOrder.orderId"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submit-deliverOrder",
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
        "mode": "summary",
        "order": 4,
        "organisms": [
          {
            "id": "org-reviewSummary",
            "type": "organism",
            "organismName": "reviewSummary",
            "titleKey": "org.reviewSummary.title",
            "purpose": "Revisar o contexto e o resultado das ações principais da página: pedidos criados e entregas realizadas",
            "userActions": [],
            "requiredEntities": [],
            "readsFields": [
              "orderId",
              "status",
              "orderType",
              "tableNumber",
              "createdAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int-review-summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "intention.review.title",
                "emptyKey": "empty.review",
                "displayHint": "Summary of recent actions: created orders and delivered orders with their outcomes.",
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
      "description": "Loads all orders for the current shift grouped by lifecycle status",
      "stateKey": "ui.posWorkspace.data.viewOrderBoard",
      "inputStateKeys": []
    },
    {
      "id": "bind-createOrder",
      "source": "command",
      "entity": "Order",
      "command": "createOrder",
      "description": "Creates a new order with items, decrements stock and sends to kitchen",
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
      "description": "Delivers selected ready order to customer, registering delivery timestamp",
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
      "_102051_/l2/cafeFlow/web/shared/posWorkspace.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/posWorkspace.ts",
      "_102051_/l2/cafeFlow/web/contracts/posWorkspace.defs.ts",
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
