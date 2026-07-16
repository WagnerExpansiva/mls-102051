/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/kitchenQueue.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "kitchenQueue",
  "pageName": "Fila da cozinha — Preparo de pedidos",
  "baseClassName": "CafeFlowKitchenQueueBase",
  "actor": "cozinheiro",
  "purpose": "Executar Fila da cozinha — Preparo de pedidos.",
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
    "workspaceId": "kitchenQueue",
    "workspaceKind": "workflow",
    "workflowId": "orderLifecycle",
    "actor": "cozinheiro",
    "entity": "Order",
    "owners": [
      {
        "kind": "workflow",
        "id": "orderLifecycle",
        "defPath": "_102051_/l4/workflows/orderLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "viewKitchenBoard",
        "defPath": "_102051_/l4/operations/viewKitchenBoard.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateOrderStatus",
        "defPath": "_102051_/l4/operations/updateOrderStatus.defs.ts"
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
          "operationId": "viewKitchenBoard",
          "commandName": "viewKitchenBoard",
          "steps": [
            "O cozinheiro abre a tela da fila da cozinha",
            "O sistema lista os pedidos do turno atual com status 'recebido' ou 'em preparo'",
            "Os pedidos são ordenados por ordem de chegada (receivedAt), com pedidos priorizados destacados primeiro",
            "Cada pedido exibe seus itens, tipo (mesa ou viagem), número da mesa quando aplicável e status atual"
          ]
        },
        {
          "operationId": "updateOrderStatus",
          "commandName": "updateOrderStatus",
          "steps": [
            "O cozinheiro visualiza a fila de pedidos recebidos na cozinha",
            "Seleciona um pedido e marca como 'em preparo' ao iniciar o preparo",
            "Ao concluir o preparo, marca o pedido como 'pronto', avisando o atendente que pode entregar ao cliente"
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "kitchen-queue-section",
      "type": "section",
      "sectionName": "kitchen-queue-section",
      "titleKey": "kitchen.queue.section.title",
      "mode": "main",
      "order": 1,
      "organisms": [
        {
          "id": "kitchen-board",
          "type": "organism",
          "organismName": "KitchenBoard",
          "titleKey": "kitchen.board.title",
          "purpose": "Live kitchen queue showing orders sorted by priority and arrival time, with inline contextual status transitions for each order card.",
          "userActions": [
            "viewKitchenBoard",
            "updateOrderStatus"
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
            "createdAt"
          ],
          "writesFields": [
            "orderId",
            "status"
          ],
          "rulesApplied": [
            "Orders sorted by priority first then receivedAt (FIFO within same priority)",
            "Only orders with status 'received' or 'inPreparation' are shown",
            "Transition received→inPreparation allowed when status is 'received'",
            "Transition inPreparation→ready allowed when status is 'inPreparation'",
            "orderId is derived from selectedEntity, never manually typed",
            "status is set by the contextual transition button, never a free select"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "board-query",
              "intent": "View the live kitchen board with all active orders displayed as cards sorted by priority and arrival time",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 1
            },
            {
              "id": "status-transition",
              "intent": "Execute the order status transition using orderId from selectedEntity and status from the contextual button clicked",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 2
            }
          ]
        }
      ]
    },
    {
      "id": "kitchen-queue-section2",
      "type": "section",
      "sectionName": "kitchen-queue-section",
      "titleKey": "kitchen.queue.section.title",
      "mode": "main",
      "order": 1,
      "organisms": [
        {
          "id": "kitchen-board2",
          "type": "organism",
          "organismName": "KitchenBoard",
          "titleKey": "kitchen.board.title",
          "purpose": "Live kitchen queue showing orders sorted by priority and arrival time, with inline contextual status transitions for each order card.",
          "userActions": [
            "viewKitchenBoard",
            "updateOrderStatus"
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
            "createdAt"
          ],
          "writesFields": [
            "orderId",
            "status"
          ],
          "rulesApplied": [
            "Orders sorted by priority first then receivedAt (FIFO within same priority)",
            "Only orders with status 'received' or 'inPreparation' are shown",
            "Transition received→inPreparation allowed when status is 'received'",
            "Transition inPreparation→ready allowed when status is 'inPreparation'",
            "orderId is derived from selectedEntity, never manually typed",
            "status is set by the contextual transition button, never a free select"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "board-query2",
              "intent": "View the live kitchen board with all active orders displayed as cards sorted by priority and arrival time",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 1
            },
            {
              "id": "status-transition2",
              "intent": "Execute the order status transition using orderId from selectedEntity and status from the contextual button clicked",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 2
            }
          ]
        }
      ]
    }
  ],
  "templateId": "goal_first",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "pageObjective": {
    "actor": "Cozinheiro (kitchen cook)",
    "jobToBeDone": "Visualizar a fila de pedidos recebidos na cozinha e avançar o status de cada pedido conforme o preparo progride, do recebimento até ficar pronto.",
    "primaryDecision": "Decidir qual pedido avançar de status agora — iniciar preparo (recebido→em preparo) ou marcar como pronto (em preparo→pronto).",
    "decisiveInfo": [
      "orderId",
      "status",
      "orderType",
      "tableNumber",
      "priority",
      "priorityReason",
      "receivedAt"
    ],
    "usageFrequency": "Continuous, hands-busy operational screen during active service — the cook glances at the board and taps transitions repeatedly throughout a shift.",
    "criticalActions": [
      {
        "action": "updateOrderStatus (received→inPreparation)",
        "presentation": "inline-row-command"
      },
      {
        "action": "updateOrderStatus (inPreparation→ready)",
        "presentation": "inline-row-command"
      }
    ],
    "informationHierarchy": [
      "Priority flag and reason — draws attention to urgent orders first",
      "Order identity: type (mesa/viagem) and table number — tells the cook what and where",
      "Time received — enables FIFO ordering within same priority",
      "Current status — confirms what stage the order is in",
      "Contextual transition buttons — the one-tap action to advance the order"
    ],
    "successCriteria": "The cook can see the entire active queue at a glance, immediately identify priority orders, and advance any order's status with a single tap without navigating away from the board or typing any identifier.",
    "antiPatterns": [
      "Separate transition form below the list — forces context switching",
      "Free status <select> over all enum values — cook should only see valid next states",
      "Manually typed orderId — error-prone and slow in a busy kitchen",
      "Dense spreadsheet table — unreadable on kitchen displays and slow to scan",
      "Multi-step wizard for a single-decision transition — adds friction to a high-frequency action"
    ]
  },
  "msgKeys": [
    "action.markReady",
    "action.refreshBoard",
    "action.startPreparation",
    "action.updateOrderStatus",
    "action.updateOrderStatus.error",
    "action.updateOrderStatus.success",
    "empty.kitchenBoard",
    "field.createdAt",
    "field.inPreparationAt",
    "field.orderId",
    "field.orderType",
    "field.priority",
    "field.priorityReason",
    "field.receivedAt",
    "field.status",
    "field.tableNumber",
    "kitchen.board.title",
    "kitchen.queue.section.title",
    "page.kitchenQueue.title",
    "section.kitchenQueue.title",
    "section.transition.title"
  ],
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "kitchen-queue-section",
        "type": "section",
        "sectionName": "kitchen-queue-section",
        "titleKey": "kitchen.queue.section.title",
        "mode": "main",
        "order": 1,
        "organisms": [
          {
            "id": "kitchen-board",
            "type": "organism",
            "organismName": "KitchenBoard",
            "titleKey": "kitchen.board.title",
            "purpose": "Live kitchen queue showing orders sorted by priority and arrival time, with inline contextual status transitions for each order card.",
            "userActions": [
              "viewKitchenBoard",
              "updateOrderStatus"
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
              "createdAt"
            ],
            "writesFields": [
              "orderId",
              "status"
            ],
            "rulesApplied": [
              "Orders sorted by priority first then receivedAt (FIFO within same priority)",
              "Only orders with status 'received' or 'inPreparation' are shown",
              "Transition received→inPreparation allowed when status is 'received'",
              "Transition inPreparation→ready allowed when status is 'inPreparation'",
              "orderId is derived from selectedEntity, never manually typed",
              "status is set by the contextual transition button, never a free select"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "board-query",
                "intent": "View the live kitchen board with all active orders displayed as cards sorted by priority and arrival time",
                "order": 1,
                "titleKey": "section.kitchenQueue.title",
                "emptyKey": "empty.kitchenBoard",
                "displayHint": "card-board",
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "format": "id",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "format": "enum",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-order-type",
                    "field": "orderType",
                    "labelKey": "field.orderType",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "enum",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-table-number",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "field.priority",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "enum",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-received-at",
                    "field": "receivedAt",
                    "labelKey": "field.receivedAt",
                    "order": 7,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-in-preparation-at",
                    "field": "inPreparationAt",
                    "labelKey": "field.inPreparationAt",
                    "order": 8,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-created-at",
                    "field": "createdAt",
                    "labelKey": "field.createdAt",
                    "order": 9,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "refresh-board",
                    "action": "viewKitchenBoard",
                    "labelKey": "action.refreshBoard",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "viewKitchenBoard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "start-preparation",
                    "action": "updateOrderStatus",
                    "labelKey": "action.startPreparation",
                    "order": 1,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "updateOrderStatus"
                  },
                  {
                    "id": "mark-ready",
                    "action": "updateOrderStatus",
                    "labelKey": "action.markReady",
                    "order": 2,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "updateOrderStatus"
                  }
                ],
                "actions": []
              },
              {
                "id": "status-transition",
                "intent": "Execute the order status transition using orderId from selectedEntity and status from the contextual button clicked",
                "order": 2,
                "titleKey": "section.transition.title",
                "displayHint": "contextual-transition-actions",
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [
                  {
                    "id": "trans-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "trans-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": true,
                    "inputType": "hidden",
                    "source": "userInput",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "submit-transition",
                    "action": "updateOrderStatus",
                    "labelKey": "action.updateOrderStatus",
                    "order": 1,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "updateOrderStatus"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "kitchen-queue-section2",
        "type": "section",
        "sectionName": "kitchen-queue-section",
        "titleKey": "kitchen.queue.section.title",
        "mode": "main",
        "order": 1,
        "organisms": [
          {
            "id": "kitchen-board2",
            "type": "organism",
            "organismName": "KitchenBoard",
            "titleKey": "kitchen.board.title",
            "purpose": "Live kitchen queue showing orders sorted by priority and arrival time, with inline contextual status transitions for each order card.",
            "userActions": [
              "viewKitchenBoard",
              "updateOrderStatus"
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
              "createdAt"
            ],
            "writesFields": [
              "orderId",
              "status"
            ],
            "rulesApplied": [
              "Orders sorted by priority first then receivedAt (FIFO within same priority)",
              "Only orders with status 'received' or 'inPreparation' are shown",
              "Transition received→inPreparation allowed when status is 'received'",
              "Transition inPreparation→ready allowed when status is 'inPreparation'",
              "orderId is derived from selectedEntity, never manually typed",
              "status is set by the contextual transition button, never a free select"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "board-query2",
                "intent": "View the live kitchen board with all active orders displayed as cards sorted by priority and arrival time",
                "order": 1,
                "titleKey": "section.kitchenQueue.title",
                "emptyKey": "empty.kitchenBoard",
                "displayHint": "card-board",
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "format": "id",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "format": "enum",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-order-type",
                    "field": "orderType",
                    "labelKey": "field.orderType",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "enum",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-table-number",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "field.priority",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "enum",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-received-at",
                    "field": "receivedAt",
                    "labelKey": "field.receivedAt",
                    "order": 7,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-in-preparation-at",
                    "field": "inPreparationAt",
                    "labelKey": "field.inPreparationAt",
                    "order": 8,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-created-at",
                    "field": "createdAt",
                    "labelKey": "field.createdAt",
                    "order": 9,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "refresh-board",
                    "action": "viewKitchenBoard",
                    "labelKey": "action.refreshBoard",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "viewKitchenBoard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "start-preparation",
                    "action": "updateOrderStatus",
                    "labelKey": "action.startPreparation",
                    "order": 1,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "updateOrderStatus"
                  },
                  {
                    "id": "mark-ready",
                    "action": "updateOrderStatus",
                    "labelKey": "action.markReady",
                    "order": 2,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "updateOrderStatus"
                  }
                ],
                "actions": []
              },
              {
                "id": "status-transition2",
                "intent": "Execute the order status transition using orderId from selectedEntity and status from the contextual button clicked",
                "order": 2,
                "titleKey": "section.transition.title",
                "displayHint": "contextual-transition-actions",
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [
                  {
                    "id": "trans-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "trans-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": true,
                    "inputType": "hidden",
                    "source": "userInput",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "submit-transition",
                    "action": "updateOrderStatus",
                    "labelKey": "action.updateOrderStatus",
                    "order": 1,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "updateOrderStatus"
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
      "id": "binding-viewKitchenBoard",
      "source": "query",
      "entity": "Order",
      "command": "viewKitchenBoard",
      "description": "Loads the kitchen board with active orders for the current shift",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "inputStateKeys": []
    },
    {
      "id": "binding-updateOrderStatus",
      "source": "command",
      "entity": "Order",
      "command": "updateOrderStatus",
      "description": "Transitions an order's status (received→inPreparation or inPreparation→ready)",
      "stateKey": "ui.kitchenQueue.output.updateOrderStatus",
      "inputStateKeys": [
        "ui.kitchenQueue.input.updateOrderStatus.orderId",
        "ui.kitchenQueue.input.updateOrderStatus.status"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "kitchenQueue__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/kitchenQueue.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/kitchenQueue.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/kitchenQueue.ts",
      "_102051_/l2/cafeFlow/web/contracts/kitchenQueue.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "kitchenQueue__l2_shared"
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
