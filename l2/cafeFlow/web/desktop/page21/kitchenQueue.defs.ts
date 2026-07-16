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
          "purpose": "Live kitchen queue showing prioritized orders with inline contextual transition actions for advancing order status",
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
            "orderId derived from selectedEntity on row action, never manual input",
            "status set by specific transition button (received→inPreparation or inPreparation→ready), never free select",
            "only allowed kitchen transitions shown as contextual buttons per row",
            "queue auto-loads on page entry and refreshes after each transition"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "view-kitchen-board",
              "intent": "query",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
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
    "actor": "cozinheiro (kitchen cook)",
    "jobToBeDone": "Visualizar a fila de pedidos da cozinha em ordem de prioridade e avançar cada pedido de 'recebido' para 'em preparo' e de 'em preparo' para 'pronto' com o mínimo de interações.",
    "primaryDecision": "Qual pedido avançar para a próxima etapa do preparo (iniciar preparo ou marcar como pronto)",
    "decisiveInfo": [
      "priority",
      "status",
      "orderType",
      "tableNumber",
      "receivedAt",
      "inPreparationAt",
      "orderId",
      "priorityReason"
    ],
    "usageFrequency": "continuous/hands-busy — operational kitchen screen during active service",
    "criticalActions": [
      {
        "action": "viewKitchenBoard",
        "presentation": "auto-loaded query displayed as prioritized queue (summary-first)"
      },
      {
        "action": "updateOrderStatus",
        "presentation": "contextual-transition-actions / inline-row-command — one button per allowed next state on each row"
      }
    ],
    "informationHierarchy": [
      "1. Queue of orders sorted by priority then receivedAt (most urgent/oldest first)",
      "2. Per-order identity: priority indicator, status, orderType, tableNumber",
      "3. Timing context: receivedAt and inPreparationAt for aging awareness",
      "4. Priority reason when present",
      "5. Contextual transition buttons per row (Iniciar Preparo / Marcar Pronto)"
    ],
    "successCriteria": "Cook sees the full queue at a glance, identifies the next order by priority and arrival time, and advances its status with a single tap — no forms, no typed ids, no free status selects.",
    "antiPatterns": [
      "separate transition form below the list",
      "manually typed orderId",
      "free status <select> over all enum values",
      "dense spreadsheet-style table",
      "persuasion mechanics on operational screen",
      "multi-step wizard for a single-decision transition"
    ]
  },
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
            "purpose": "Live kitchen queue showing prioritized orders with inline contextual transition actions for advancing order status",
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
              "orderId derived from selectedEntity on row action, never manual input",
              "status set by specific transition button (received→inPreparation or inPreparation→ready), never free select",
              "only allowed kitchen transitions shown as contextual buttons per row",
              "queue auto-loads on page entry and refreshes after each transition"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "view-kitchen-board",
                "intent": "query",
                "order": 1,
                "titleKey": "intention.viewKitchenBoard.title",
                "source": "viewKitchenBoard",
                "binding": "ui.kitchenQueue.data.viewKitchenBoard",
                "emptyKey": "empty.kitchenQueue",
                "displayHint": "summary-first",
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "column.priority.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "column.tableNumber.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-receivedAt",
                    "field": "receivedAt",
                    "labelKey": "column.receivedAt.label",
                    "order": 6,
                    "required": false,
                    "inputType": "datetime",
                    "format": "time",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "column.inPreparationAt.label",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "format": "time",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "column.priorityReason.label",
                    "order": 8,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt.label",
                    "order": 9,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "toolbar-refresh",
                    "action": "viewKitchenBoard",
                    "labelKey": "toolbar.refresh.label",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "viewKitchenBoard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "row-start-preparation",
                    "action": "updateOrderStatus",
                    "labelKey": "rowAction.startPreparation.label",
                    "order": 1,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "updateOrderStatus"
                  },
                  {
                    "id": "row-mark-ready",
                    "action": "updateOrderStatus",
                    "labelKey": "rowAction.markReady.label",
                    "order": 2,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "updateOrderStatus"
                  }
                ],
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
      "id": "binding-viewKitchenBoard",
      "source": "cafeFlow.orderLifecycle.viewKitchenBoard",
      "entity": "Order",
      "command": "viewKitchenBoard",
      "description": "Load kitchen board orders for current shift",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "inputStateKeys": []
    },
    {
      "id": "binding-updateOrderStatus",
      "source": "cafeFlow.orderLifecycle.updateOrderStatus",
      "entity": "Order",
      "command": "updateOrderStatus",
      "description": "Transition order status (received→inPreparation or inPreparation→ready)",
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
      "_102051_/l2/cafeFlow/web/shared/kitchenQueue.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/kitchenQueue.ts",
      "_102051_/l2/cafeFlow/web/contracts/kitchenQueue.defs.ts",
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
