/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/kitchenQueue.defs.ts" enhancement="_blank"/>

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
      "id": "sec-kitchen-queue",
      "type": "section",
      "sectionName": "sec-kitchen-queue",
      "titleKey": "sec.kitchen.queue.title",
      "mode": "discover",
      "order": 1,
      "organisms": [
        {
          "id": "org-kitchen-board",
          "type": "organism",
          "organismName": "kitchenBoard",
          "titleKey": "org.kitchen.board.title",
          "purpose": "Exibir fila de pedidos da cozinha ordenados por prioridade e ordem de chegada, permitindo seleção para transição de status",
          "userActions": [
            "viewKitchenBoard"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem"
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
          "writesFields": [],
          "rulesApplied": [
            "Pedidos ordenados por receivedAt com priorizados destacados primeiro",
            "Exibir apenas pedidos com status received ou inPreparation"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-queue-list",
              "intent": "queryList",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-order-transition",
      "type": "section",
      "sectionName": "sec-order-transition",
      "titleKey": "sec.order.transition.title",
      "mode": "execute",
      "order": 2,
      "organisms": [
        {
          "id": "org-status-transition",
          "type": "organism",
          "organismName": "statusTransition",
          "titleKey": "org.status.transition.title",
          "purpose": "Atualizar status do pedido selecionado na fila, apresentando a próxima transição válida do ciclo de vida",
          "userActions": [
            "updateOrderStatus"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId",
            "status"
          ],
          "writesFields": [
            "orderId",
            "status"
          ],
          "rulesApplied": [
            "Transição deve seguir o ciclo de vida: received->inPreparation->ready",
            "orderId é derivado do pedido selecionado na fila, nunca digitado manualmente"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-status-form",
              "intent": "commandForm",
              "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "workflow_queue",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "page31-workflow_queue",
    "type": "page",
    "sections": [
      {
        "id": "sec-kitchen-queue",
        "type": "section",
        "sectionName": "sec-kitchen-queue",
        "titleKey": "sec.kitchen.queue.title",
        "mode": "discover",
        "order": 1,
        "organisms": [
          {
            "id": "org-kitchen-board",
            "type": "organism",
            "organismName": "kitchenBoard",
            "titleKey": "org.kitchen.board.title",
            "purpose": "Exibir fila de pedidos da cozinha ordenados por prioridade e ordem de chegada, permitindo seleção para transição de status",
            "userActions": [
              "viewKitchenBoard"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem"
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
            "writesFields": [],
            "rulesApplied": [
              "Pedidos ordenados por receivedAt com priorizados destacados primeiro",
              "Exibir apenas pedidos com status received ou inPreparation"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-queue-list",
                "intent": "queryList",
                "order": 1,
                "source": "viewKitchenBoard",
                "binding": "ui.kitchenQueue.data.viewKitchenBoard",
                "emptyKey": "section.queue.empty",
                "displayHint": "groupedByStatus",
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-order-id",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 2,
                    "required": false,
                    "inputType": "badge",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-order-type",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-table-number",
                    "field": "tableNumber",
                    "labelKey": "column.tableNumber",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "column.priority",
                    "order": 5,
                    "required": false,
                    "inputType": "badge",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "column.priorityReason",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-received-at",
                    "field": "receivedAt",
                    "labelKey": "column.receivedAt",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "format": "time",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-in-preparation-at",
                    "field": "inPreparationAt",
                    "labelKey": "column.inPreparationAt",
                    "order": 8,
                    "required": false,
                    "inputType": "datetime",
                    "format": "time",
                    "source": "viewKitchenBoard",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-created-at",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
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
                    "id": "tb-refresh",
                    "action": "viewKitchenBoard",
                    "labelKey": "action.refresh",
                    "order": 1,
                    "displayHint": "icon",
                    "actionKey": "viewKitchenBoard"
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
        "id": "sec-order-transition",
        "type": "section",
        "sectionName": "sec-order-transition",
        "titleKey": "sec.order.transition.title",
        "mode": "execute",
        "order": 2,
        "organisms": [
          {
            "id": "org-status-transition",
            "type": "organism",
            "organismName": "statusTransition",
            "titleKey": "org.status.transition.title",
            "purpose": "Atualizar status do pedido selecionado na fila, apresentando a próxima transição válida do ciclo de vida",
            "userActions": [
              "updateOrderStatus"
            ],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "orderId",
              "status"
            ],
            "writesFields": [
              "orderId",
              "status"
            ],
            "rulesApplied": [
              "Transição deve seguir o ciclo de vida: received->inPreparation->ready",
              "orderId é derivado do pedido selecionado na fila, nunca digitado manualmente"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-status-form",
                "intent": "commandForm",
                "order": 1,
                "source": "updateOrderStatus",
                "binding": "ui.kitchenQueue.output.updateOrderStatus",
                "emptyKey": "section.transition.empty",
                "displayHint": "contextualPanel",
                "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
                "fields": [
                  {
                    "id": "fld-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": true,
                    "inputType": "readonly",
                    "source": "selectedEntity",
                    "stateKey": "ui.kitchenQueue.input.updateOrderStatus.orderId"
                  },
                  {
                    "id": "fld-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": true,
                    "inputType": "select",
                    "source": "userInput",
                    "stateKey": "ui.kitchenQueue.input.updateOrderStatus.status"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submit-status",
                    "action": "updateOrderStatus",
                    "labelKey": "action.updateOrderStatus",
                    "order": 1,
                    "displayHint": "primary",
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
      "id": "db-view-kitchen-board",
      "source": "query",
      "entity": "Order",
      "command": "viewKitchenBoard",
      "description": "Consulta a fila de pedidos da cozinha do turno atual",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "inputStateKeys": []
    },
    {
      "id": "db-update-order-status",
      "source": "command",
      "entity": "Order",
      "command": "updateOrderStatus",
      "description": "Atualiza o status de um pedido na cozinha",
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
    "id": "kitchenQueue__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page31/kitchenQueue.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page31/kitchenQueue.defs.ts",
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
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
