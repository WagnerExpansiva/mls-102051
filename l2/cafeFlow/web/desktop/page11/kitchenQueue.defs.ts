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
      "sectionName": "kitchenBoard",
      "titleKey": "section.kitchenBoard.title",
      "mode": "kanban",
      "order": 1,
      "organisms": [
        {
          "id": "org-kitchen-board",
          "type": "organism",
          "organismName": "kanbanBoard",
          "titleKey": "org.kitchen.board.title",
          "purpose": "Exibir pedidos da cozinha agrupados por status em colunas kanban (recebido, em preparo, pronto) com transições contextuais por cartão",
          "userActions": [
            "viewKitchenBoard",
            "updateOrderStatus"
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
            "Pedidos agrupados por status em lanes: received, inPreparation, ready",
            "Pedidos ordenados por receivedAt, priorizados primeiro",
            "Apenas pedidos com status received ou inPreparation sao exibidos ativamente",
            "Transicoes permitidas: received->inPreparation, inPreparation->ready",
            "orderId derivado do selectedEntity, nunca digitado manualmente"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-board-query",
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
      "id": "sec-transition-panel",
      "type": "section",
      "sectionName": "transitionPanel",
      "titleKey": "section.transitionPanel.title",
      "mode": "detail",
      "order": 2,
      "organisms": [
        {
          "id": "org-transition-panel",
          "type": "organism",
          "organismName": "transitionPanel",
          "titleKey": "org.transition.panel.title",
          "purpose": "Exibir pedido selecionado com contexto e executar transicao de status com feedback textual",
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
            "orderId derivado do selectedEntity, nunca digitado manualmente",
            "status definido pela transicao escolhida: received->inPreparation ou inPreparation->ready",
            "Feedback textual dismissible apos execucao",
            "Apos sucesso: refresh viewKitchenBoard e limpar form e selecao"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-transition-form",
              "intent": "commandForm",
              "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
              "action": "updateOrderStatus",
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
    "id": "kanban_pipeline_page11",
    "type": "page",
    "sections": [
      {
        "id": "sec-kitchen-board",
        "type": "section",
        "sectionName": "kitchenBoard",
        "titleKey": "section.kitchenBoard.title",
        "mode": "kanban",
        "order": 1,
        "organisms": [
          {
            "id": "org-kitchen-board",
            "type": "organism",
            "organismName": "kanbanBoard",
            "titleKey": "org.kitchen.board.title",
            "purpose": "Exibir pedidos da cozinha agrupados por status em colunas kanban (recebido, em preparo, pronto) com transições contextuais por cartão",
            "userActions": [
              "viewKitchenBoard",
              "updateOrderStatus"
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
              "Pedidos agrupados por status em lanes: received, inPreparation, ready",
              "Pedidos ordenados por receivedAt, priorizados primeiro",
              "Apenas pedidos com status received ou inPreparation sao exibidos ativamente",
              "Transicoes permitidas: received->inPreparation, inPreparation->ready",
              "orderId derivado do selectedEntity, nunca digitado manualmente"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-board-query",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.kitchenBoard.title",
                "source": "viewKitchenBoard",
                "binding": "ui.kitchenQueue.data.viewKitchenBoard",
                "action": "viewKitchenBoard",
                "emptyKey": "section.kitchenBoard.empty",
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
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "column.tableNumber.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "column.priority.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "column.priorityReason.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-receivedAt",
                    "field": "receivedAt",
                    "labelKey": "column.receivedAt.label",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "column.inPreparationAt.label",
                    "order": 8,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt.label",
                    "order": 9,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-refresh",
                    "action": "viewKitchenBoard",
                    "labelKey": "action.viewKitchenBoard.label",
                    "order": 1,
                    "displayHint": "refresh",
                    "actionKey": "viewKitchenBoard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "ra-start-prep",
                    "action": "updateOrderStatus",
                    "labelKey": "transition.startPreparation.label",
                    "order": 2,
                    "displayHint": "visibleWhenStatus=received",
                    "actionKey": "updateOrderStatus"
                  },
                  {
                    "id": "ra-mark-ready",
                    "action": "updateOrderStatus",
                    "labelKey": "transition.markReady.label",
                    "order": 3,
                    "displayHint": "visibleWhenStatus=inPreparation",
                    "actionKey": "updateOrderStatus"
                  }
                ],
                "actions": []
              }
            ]
          }
        ]
      },
      {
        "id": "sec-transition-panel",
        "type": "section",
        "sectionName": "transitionPanel",
        "titleKey": "section.transitionPanel.title",
        "mode": "detail",
        "order": 2,
        "organisms": [
          {
            "id": "org-transition-panel",
            "type": "organism",
            "organismName": "transitionPanel",
            "titleKey": "org.transition.panel.title",
            "purpose": "Exibir pedido selecionado com contexto e executar transicao de status com feedback textual",
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
              "orderId derivado do selectedEntity, nunca digitado manualmente",
              "status definido pela transicao escolhida: received->inPreparation ou inPreparation->ready",
              "Feedback textual dismissible apos execucao",
              "Apos sucesso: refresh viewKitchenBoard e limpar form e selecao"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-transition-form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.transitionPanel.title",
                "source": "updateOrderStatus",
                "binding": "ui.kitchenQueue.output.updateOrderStatus",
                "action": "updateOrderStatus",
                "submitAction": "updateOrderStatus",
                "emptyKey": "section.transitionPanel.empty",
                "displayHint": "transition-form",
                "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
                "fields": [
                  {
                    "id": "fld-orderId",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "text",
                    "source": "selectedEntity",
                    "stateKey": "ui.kitchenQueue.input.updateOrderStatus.orderId"
                  },
                  {
                    "id": "fld-status",
                    "field": "status",
                    "labelKey": "field.status.label",
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
                    "id": "act-submit",
                    "action": "updateOrderStatus",
                    "labelKey": "action.updateOrderStatus.label",
                    "order": 3,
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
      "id": "bind-viewKitchenBoard",
      "source": "viewKitchenBoard",
      "entity": "Order",
      "command": "viewKitchenBoard",
      "description": "Carrega pedidos da cozinha do turno atual com status received ou inPreparation",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "inputStateKeys": []
    },
    {
      "id": "bind-updateOrderStatus",
      "source": "updateOrderStatus",
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
