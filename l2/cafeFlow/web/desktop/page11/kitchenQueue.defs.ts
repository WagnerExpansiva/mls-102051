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
          "id": "org-kanban-board",
          "type": "organism",
          "organismName": "KanbanBoard",
          "titleKey": "org.kanban.board.title",
          "purpose": "Exibir pedidos da cozinha agrupados por status em colunas kanban (recebido, em preparo, pronto)",
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
            "Pedidos agrupados por status em lanes kanban",
            "Pedidos priorizados destacados primeiro",
            "Apenas pedidos recebidos, em preparo e prontos sao exibidos",
            "Selecao de card define orderId para transicao"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-query-board",
              "intent": "queryList",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "action": "viewKitchenBoard",
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
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-transition-panel",
          "type": "organism",
          "organismName": "TransitionPanel",
          "titleKey": "org.transition.panel.title",
          "purpose": "Permitir que o cozinheiro avance o status do pedido selecionado atraves de transicoes permitidas",
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
            "orderId derivado da entidade selecionada no kanban",
            "status definido pelo botao de transicao clicado",
            "Apenas transicoes permitidas sao exibidas: received->inPreparation, inPreparation->ready",
            "Feedback textual apos executar comando"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-command-transition",
              "intent": "commandForm",
              "stateKey": "ui.kitchenQueue.output.updateOrderStatus",
              "action": "updateOrderStatus",
              "submitAction": "updateOrderStatus",
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
      "order": 3,
      "organisms": [
        {
          "id": "org-review-panel",
          "type": "organism",
          "organismName": "ReviewPanel",
          "titleKey": "org.review.panel.title",
          "purpose": "Exibir feedback textual da ultima acao de transicao executada",
          "userActions": [],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "Feedback dismissible apos sucesso ou erro"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-summary-feedback",
              "intent": "summary",
              "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "kanban_pipeline",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "msgKeys": [
    "action.markReady.label",
    "action.select.label",
    "action.startPreparation.label",
    "action.updateOrderStatus.error",
    "action.updateOrderStatus.label",
    "action.updateOrderStatus.success",
    "action.viewKitchenBoard.label",
    "column.createdAt.label",
    "column.inPreparationAt.label",
    "column.orderId.label",
    "column.orderType.label",
    "column.priority.label",
    "column.priorityReason.label",
    "column.receivedAt.label",
    "column.status.label",
    "column.tableNumber.label",
    "empty.kitchenBoard",
    "empty.orderTransition",
    "empty.review",
    "field.orderId.label",
    "field.status.label",
    "lane.inPreparation.title",
    "lane.ready.title",
    "lane.received.title",
    "org.kanban.board.title",
    "org.review.panel.title",
    "org.transition.panel.title",
    "page.kitchenQueue.subtitle",
    "page.kitchenQueue.title",
    "sec.kitchen.board.title",
    "sec.order.transition.title",
    "sec.review.title",
    "section.kitchenBoard.title",
    "section.orderTransition.title",
    "section.review.title",
    "status.inPreparation",
    "status.ready",
    "status.received"
  ],
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
            "id": "org-kanban-board",
            "type": "organism",
            "organismName": "KanbanBoard",
            "titleKey": "org.kanban.board.title",
            "purpose": "Exibir pedidos da cozinha agrupados por status em colunas kanban (recebido, em preparo, pronto)",
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
              "Pedidos agrupados por status em lanes kanban",
              "Pedidos priorizados destacados primeiro",
              "Apenas pedidos recebidos, em preparo e prontos sao exibidos",
              "Selecao de card define orderId para transicao"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-query-board",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.kitchenBoard.title",
                "source": "viewKitchenBoard",
                "action": "viewKitchenBoard",
                "emptyKey": "empty.kitchenBoard",
                "displayHint": "kanban-lanes:received,inPreparation,ready",
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId.label",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 2,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType.label",
                    "order": 3,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "column.tableNumber.label",
                    "order": 4,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "column.priority.label",
                    "order": 5,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "column.priorityReason.label",
                    "order": 6,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-receivedAt",
                    "field": "receivedAt",
                    "labelKey": "column.receivedAt.label",
                    "order": 7,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "column.inPreparationAt.label",
                    "order": 8,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt.label",
                    "order": 9,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-refresh-board",
                    "action": "viewKitchenBoard",
                    "labelKey": "action.viewKitchenBoard.label",
                    "order": 1,
                    "displayHint": "refresh",
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
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-transition-panel",
            "type": "organism",
            "organismName": "TransitionPanel",
            "titleKey": "org.transition.panel.title",
            "purpose": "Permitir que o cozinheiro avance o status do pedido selecionado atraves de transicoes permitidas",
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
              "orderId derivado da entidade selecionada no kanban",
              "status definido pelo botao de transicao clicado",
              "Apenas transicoes permitidas sao exibidas: received->inPreparation, inPreparation->ready",
              "Feedback textual apos executar comando"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-command-transition",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.orderTransition.title",
                "source": "updateOrderStatus",
                "binding": "updateOrderStatus",
                "action": "updateOrderStatus",
                "submitAction": "updateOrderStatus",
                "emptyKey": "empty.orderTransition",
                "displayHint": "transition-buttons",
                "stateKey": "ui.kitchenQueue.output.updateOrderStatus",
                "fields": [
                  {
                    "id": "fld-transition-orderId",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.kitchenQueue.input.updateOrderStatus.orderId"
                  },
                  {
                    "id": "fld-transition-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 2,
                    "required": true,
                    "inputType": "hidden",
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
                    "id": "act-start-preparation",
                    "action": "updateOrderStatus",
                    "labelKey": "action.startPreparation.label",
                    "order": 1,
                    "displayHint": "transition:received->inPreparation",
                    "actionKey": "updateOrderStatus"
                  },
                  {
                    "id": "act-mark-ready",
                    "action": "updateOrderStatus",
                    "labelKey": "action.markReady.label",
                    "order": 2,
                    "displayHint": "transition:inPreparation->ready",
                    "actionKey": "updateOrderStatus"
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
        "order": 3,
        "organisms": [
          {
            "id": "org-review-panel",
            "type": "organism",
            "organismName": "ReviewPanel",
            "titleKey": "org.review.panel.title",
            "purpose": "Exibir feedback textual da ultima acao de transicao executada",
            "userActions": [],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "Feedback dismissible apos sucesso ou erro"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-summary-feedback",
                "intent": "summary",
                "order": 1,
                "titleKey": "section.review.title",
                "emptyKey": "empty.review",
                "displayHint": "mutation-feedback",
                "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
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
      "id": "binding-viewKitchenBoard",
      "source": "query",
      "entity": "Order",
      "command": "viewKitchenBoard",
      "description": "Carrega lista de pedidos da cozinha agrupados por status",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "inputStateKeys": []
    },
    {
      "id": "binding-updateOrderStatus",
      "source": "command",
      "entity": "Order",
      "command": "updateOrderStatus",
      "description": "Atualiza status do pedido selecionado na cozinha",
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
      "_102051_/l2/cafeFlow/web/shared/kitchenQueue.ts",
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
