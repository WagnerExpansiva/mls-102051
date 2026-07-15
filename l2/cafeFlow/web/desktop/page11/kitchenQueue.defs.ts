/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.defs.ts" enhancement="_blank"/>

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
      "id": "sec-kitchen-board",
      "type": "section",
      "sectionName": "sec-kitchen-board",
      "titleKey": "sec.kitchen.board.title",
      "mode": "kanban",
      "order": 1,
      "organisms": [
        {
          "id": "org-kitchen-board",
          "type": "organism",
          "organismName": "KanbanBoard",
          "titleKey": "org.kitchen.board.title",
          "purpose": "Visualizar fila de pedidos da cozinha agrupados por status (recebido, em preparo, pronto)",
          "userActions": [
            "viewKitchenBoard"
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
          "writesFields": [],
          "rulesApplied": [
            "lanes grouped by status: received, inPreparation, ready",
            "prioritized orders shown first within each lane",
            "orders ordered by receivedAt within lane"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-board-list",
              "intent": "queryList",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-transition",
      "type": "section",
      "sectionName": "sec-transition",
      "titleKey": "sec.transition.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-transition-panel",
          "type": "organism",
          "organismName": "TransitionPanel",
          "titleKey": "org.transition.panel.title",
          "purpose": "Atualizar status do pedido selecionado para o proximo estado do ciclo de vida",
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
            "allowed transitions: received to inPreparation, inPreparation to ready",
            "orderId derived from selected entity, never typed manually",
            "status chosen from allowed next states only"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-transition-form",
              "intent": "commandForm",
              "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
              "submitAction": "updateOrderStatus",
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
    "id": "kanban_pipeline",
    "type": "page",
    "sections": [
      {
        "id": "sec-kitchen-board",
        "type": "section",
        "sectionName": "sec-kitchen-board",
        "titleKey": "sec.kitchen.board.title",
        "mode": "kanban",
        "order": 1,
        "organisms": [
          {
            "id": "org-kitchen-board",
            "type": "organism",
            "organismName": "KanbanBoard",
            "titleKey": "org.kitchen.board.title",
            "purpose": "Visualizar fila de pedidos da cozinha agrupados por status (recebido, em preparo, pronto)",
            "userActions": [
              "viewKitchenBoard"
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
            "writesFields": [],
            "rulesApplied": [
              "lanes grouped by status: received, inPreparation, ready",
              "prioritized orders shown first within each lane",
              "orders ordered by receivedAt within lane"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-board-list",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.boardList.title",
                "source": "ui.kitchenQueue.data.viewKitchenBoard",
                "emptyKey": "empty.kitchenBoard",
                "displayHint": "kanban-lanes-by-status",
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-order-type",
                    "field": "orderType",
                    "labelKey": "field.orderType",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-table-number",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "field.priority",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
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
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      },
      {
        "id": "sec-transition",
        "type": "section",
        "sectionName": "sec-transition",
        "titleKey": "sec.transition.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-transition-panel",
            "type": "organism",
            "organismName": "TransitionPanel",
            "titleKey": "org.transition.panel.title",
            "purpose": "Atualizar status do pedido selecionado para o proximo estado do ciclo de vida",
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
              "allowed transitions: received to inPreparation, inPreparation to ready",
              "orderId derived from selected entity, never typed manually",
              "status chosen from allowed next states only"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-transition-form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.transitionForm.title",
                "binding": "updateOrderStatus",
                "submitAction": "updateOrderStatus",
                "emptyKey": "empty.transitionPanel",
                "displayHint": "contextual-to-selected",
                "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
                "fields": [
                  {
                    "id": "f-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": true,
                    "inputType": "readonly",
                    "source": "ui.kitchenQueue.input.updateOrderStatus.orderId",
                    "stateKey": "ui.kitchenQueue.input.updateOrderStatus.orderId"
                  },
                  {
                    "id": "f-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": true,
                    "inputType": "select",
                    "source": "ui.kitchenQueue.input.updateOrderStatus.status",
                    "stateKey": "ui.kitchenQueue.input.updateOrderStatus.status"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submit-transition",
                    "action": "updateOrderStatus",
                    "labelKey": "action.updateOrderStatus.submit",
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
      "id": "db-viewKitchenBoard",
      "source": "ui.kitchenQueue.data.viewKitchenBoard",
      "entity": "Order",
      "command": "viewKitchenBoard",
      "description": "Lista de pedidos da cozinha agrupados por status",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "inputStateKeys": []
    },
    {
      "id": "db-updateOrderStatus",
      "source": "ui.kitchenQueue.output.updateOrderStatus",
      "entity": "Order",
      "command": "updateOrderStatus",
      "description": "Atualizacao de status do pedido selecionado",
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
    "id": "kitchenQueue__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.defs.ts",
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
