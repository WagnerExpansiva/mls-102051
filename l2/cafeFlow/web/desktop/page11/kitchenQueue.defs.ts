/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "kitchenQueue",
  "pageName": "Fila da cozinha — Preparo de pedidos",
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
      "sectionName": "Fila da cozinha — Preparo de pedidos",
      "titleKey": "kitchenQueue.section.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-view-kitchen-board",
          "type": "organism",
          "organismName": "ViewKitchenBoard",
          "titleKey": "kitchenQueue.viewKitchenBoard.title",
          "purpose": "Visualizar fila da cozinha",
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
            "fifoKitchenQueue",
            "dashboardCurrentShiftOnly"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent-view-kitchen-board-list",
              "intent": "queryList",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "action": "viewKitchenBoard",
              "order": 10
            }
          ]
        },
        {
          "id": "org-update-order-status",
          "type": "organism",
          "organismName": "UpdateOrderStatus",
          "titleKey": "kitchenQueue.updateOrderStatus.title",
          "purpose": "Atualizar status do pedido na cozinha",
          "userActions": [
            "updateOrderStatus"
          ],
          "requiredEntities": [
            "Order",
            "Shift"
          ],
          "readsFields": [
            "status"
          ],
          "writesFields": [
            "status"
          ],
          "rulesApplied": [
            "orderStatusFlow",
            "inProgressBeforeReady"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent-update-order-status",
              "intent": "commandForm",
              "submitAction": "updateOrderStatus",
              "order": 20
            },
            {
              "id": "intent-order-summary",
              "intent": "summary",
              "order": 30
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "kitchenQueueLayout",
    "type": "page",
    "sections": [
      {
        "id": "sec-kitchen-queue",
        "type": "section",
        "sectionName": "Fila da cozinha — Preparo de pedidos",
        "titleKey": "kitchenQueue.section.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-view-kitchen-board",
            "type": "organism",
            "organismName": "ViewKitchenBoard",
            "titleKey": "kitchenQueue.viewKitchenBoard.title",
            "purpose": "Visualizar fila da cozinha",
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
              "fifoKitchenQueue",
              "dashboardCurrentShiftOnly"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent-view-kitchen-board-list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "kitchenQueue.viewKitchenBoard.list.title",
                "action": "viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-order-id",
                    "field": "orderId",
                    "labelKey": "kitchenQueue.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "kitchenQueue.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-order-type",
                    "field": "orderType",
                    "labelKey": "kitchenQueue.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-table-number",
                    "field": "tableNumber",
                    "labelKey": "kitchenQueue.field.tableNumber",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "kitchenQueue.field.priority",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "kitchenQueue.field.priorityReason",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-received-at",
                    "field": "receivedAt",
                    "labelKey": "kitchenQueue.field.receivedAt",
                    "order": 70,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-in-preparation-at",
                    "field": "inPreparationAt",
                    "labelKey": "kitchenQueue.field.inPreparationAt",
                    "order": 80,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-created-at",
                    "field": "createdAt",
                    "labelKey": "kitchenQueue.field.createdAt",
                    "order": 90,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-refresh-board",
                    "action": "viewKitchenBoard",
                    "labelKey": "kitchenQueue.action.refreshBoard",
                    "order": 10,
                    "actionKey": "viewKitchenBoard"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
              }
            ]
          },
          {
            "id": "org-update-order-status",
            "type": "organism",
            "organismName": "UpdateOrderStatus",
            "titleKey": "kitchenQueue.updateOrderStatus.title",
            "purpose": "Atualizar status do pedido na cozinha",
            "userActions": [
              "updateOrderStatus"
            ],
            "requiredEntities": [
              "Order",
              "Shift"
            ],
            "readsFields": [
              "status"
            ],
            "writesFields": [
              "status"
            ],
            "rulesApplied": [
              "orderStatusFlow",
              "inProgressBeforeReady"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent-update-order-status",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "kitchenQueue.updateOrderStatus.form.title",
                "submitAction": "updateOrderStatus",
                "fields": [
                  {
                    "id": "field-status",
                    "field": "status",
                    "labelKey": "kitchenQueue.field.status",
                    "order": 10,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.kitchenQueue.input.updateOrderStatus.status"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-update-status",
                    "action": "updateOrderStatus",
                    "labelKey": "kitchenQueue.action.updateStatus",
                    "order": 10,
                    "actionKey": "updateOrderStatus"
                  }
                ]
              },
              {
                "id": "intent-order-summary",
                "intent": "summary",
                "order": 30,
                "titleKey": "kitchenQueue.summary.title",
                "fields": [
                  {
                    "id": "sum-order-id",
                    "field": "orderId",
                    "labelKey": "kitchenQueue.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.layout.sum-order-id"
                  },
                  {
                    "id": "sum-status",
                    "field": "status",
                    "labelKey": "kitchenQueue.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.input.updateOrderStatus.status"
                  },
                  {
                    "id": "sum-order-type",
                    "field": "orderType",
                    "labelKey": "kitchenQueue.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.layout.sum-order-type"
                  },
                  {
                    "id": "sum-table-number",
                    "field": "tableNumber",
                    "labelKey": "kitchenQueue.field.tableNumber",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.layout.sum-table-number"
                  },
                  {
                    "id": "sum-priority",
                    "field": "priority",
                    "labelKey": "kitchenQueue.field.priority",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.layout.sum-priority"
                  },
                  {
                    "id": "sum-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "kitchenQueue.field.priorityReason",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.layout.sum-priority-reason"
                  },
                  {
                    "id": "sum-received-at",
                    "field": "receivedAt",
                    "labelKey": "kitchenQueue.field.receivedAt",
                    "order": 70,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.layout.sum-received-at"
                  },
                  {
                    "id": "sum-in-preparation-at",
                    "field": "inPreparationAt",
                    "labelKey": "kitchenQueue.field.inPreparationAt",
                    "order": 80,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.layout.sum-in-preparation-at"
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
    "id": "kitchenQueue__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/kitchenQueue.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/kitchenQueue.ts",
      "_102051_/l2/cafeFlow/web/contracts/kitchenQueue.defs.ts",
      "_102051_/l2/cafeFlow/web/contracts/kitchenQueue.ts"
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
