/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/kitchenQueue.defs.ts" enhancement="_blank"/>

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
      "id": "sec.kitchenQueue.queue",
      "type": "section",
      "sectionName": "Fila da cozinha — Preparo de pedidos",
      "titleKey": "kitchenQueue.section.queue.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org.kitchenQueue.workflowQueue",
          "type": "list",
          "organismName": "WorkflowQueue",
          "titleKey": "kitchenQueue.workflowQueue.title",
          "purpose": "Mostrar a fila por status e permitir transições rápidas",
          "userActions": [
            "viewKitchenBoard",
            "updateOrderStatus"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "Shift"
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
            "status"
          ],
          "rulesApplied": [
            "fifoKitchenQueue",
            "dashboardCurrentShiftOnly",
            "orderStatusFlow",
            "inProgressBeforeReady"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int.kitchenQueue.workflowQueue.list",
              "intent": "queryList",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 10
            },
            {
              "id": "int.kitchenQueue.workflowQueue.transition",
              "intent": "commandForm",
              "submitAction": "updateOrderStatus",
              "order": 20
            },
            {
              "id": "int.kitchenQueue.workflowQueue.summary",
              "intent": "summary",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 30
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "sec.kitchenQueue.queue",
        "type": "section",
        "sectionName": "Fila da cozinha — Preparo de pedidos",
        "titleKey": "kitchenQueue.section.queue.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org.kitchenQueue.workflowQueue",
            "type": "list",
            "organismName": "WorkflowQueue",
            "titleKey": "kitchenQueue.workflowQueue.title",
            "purpose": "Mostrar a fila por status e permitir transições rápidas",
            "userActions": [
              "viewKitchenBoard",
              "updateOrderStatus"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "Shift"
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
              "status"
            ],
            "rulesApplied": [
              "fifoKitchenQueue",
              "dashboardCurrentShiftOnly",
              "orderStatusFlow",
              "inProgressBeforeReady"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int.kitchenQueue.workflowQueue.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "kitchenQueue.workflowQueue.list.title",
                "source": "viewKitchenBoard",
                "binding": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col.orderId",
                    "field": "orderId",
                    "labelKey": "kitchenQueue.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.status",
                    "field": "status",
                    "labelKey": "kitchenQueue.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.orderType",
                    "field": "orderType",
                    "labelKey": "kitchenQueue.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "kitchenQueue.field.tableNumber",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.priority",
                    "field": "priority",
                    "labelKey": "kitchenQueue.field.priority",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.receivedAt",
                    "field": "receivedAt",
                    "labelKey": "kitchenQueue.field.receivedAt",
                    "order": 60,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [
                  {
                    "id": "rowAction.updateOrderStatus",
                    "action": "updateOrderStatus",
                    "labelKey": "kitchenQueue.action.startOrFinish",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "updateOrderStatus"
                  }
                ],
                "actions": [],
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
              },
              {
                "id": "int.kitchenQueue.workflowQueue.transition",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "kitchenQueue.workflowQueue.transition.title",
                "submitAction": "updateOrderStatus",
                "fields": [
                  {
                    "id": "fld.status",
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
                    "id": "act.updateOrderStatus",
                    "action": "updateOrderStatus",
                    "labelKey": "kitchenQueue.action.updateStatus",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "updateOrderStatus"
                  }
                ]
              },
              {
                "id": "int.kitchenQueue.workflowQueue.summary",
                "intent": "summary",
                "order": 30,
                "titleKey": "kitchenQueue.workflowQueue.summary.title",
                "fields": [
                  {
                    "id": "sum.orderId",
                    "field": "orderId",
                    "labelKey": "kitchenQueue.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "sum.status",
                    "field": "status",
                    "labelKey": "kitchenQueue.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "sum.orderType",
                    "field": "orderType",
                    "labelKey": "kitchenQueue.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "sum.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "kitchenQueue.field.tableNumber",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "sum.priority",
                    "field": "priority",
                    "labelKey": "kitchenQueue.field.priority",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "sum.receivedAt",
                    "field": "receivedAt",
                    "labelKey": "kitchenQueue.field.receivedAt",
                    "order": 60,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "sum.inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "kitchenQueue.field.inPreparationAt",
                    "order": 70,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "bind.viewKitchenBoard",
      "source": "bffCommand",
      "entity": "Order",
      "command": "viewKitchenBoard",
      "description": "Carregar fila da cozinha do turno atual",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "inputStateKeys": []
    },
    {
      "id": "bind.updateOrderStatus",
      "source": "bffCommand",
      "entity": "Order",
      "command": "updateOrderStatus",
      "description": "Atualizar status do pedido selecionado",
      "stateKey": "ui.kitchenQueue.output.updateOrderStatus",
      "inputStateKeys": [
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
