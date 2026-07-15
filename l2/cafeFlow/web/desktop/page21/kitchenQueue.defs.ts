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
      "id": "sec-discover",
      "type": "section",
      "sectionName": "sec-discover",
      "titleKey": "sec.discover.title",
      "mode": "list",
      "order": 1,
      "organisms": [
        {
          "id": "org-kitchen-board",
          "type": "organism",
          "organismName": "KitchenBoardCards",
          "titleKey": "org.kitchen.board.title",
          "purpose": "Listar pedidos da cozinha em cards grandes e legíveis, ordenados por chegada com priorizados em destaque",
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
            "Pedidos ordenados por receivedAt (ordem de chegada)",
            "Pedidos com prioridade destacados primeiro",
            "Exibir apenas pedidos com status received ou inPreparation"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-view-board",
              "intent": "queryList",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-execute",
      "type": "section",
      "sectionName": "sec-execute",
      "titleKey": "sec.execute.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-update-status",
          "type": "organism",
          "organismName": "UpdateStatusForm",
          "titleKey": "org.update.status.title",
          "purpose": "Permitir ao cozinheiro atualizar o status do pedido selecionado, marcando como em preparo ou pronto",
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
            "Transição permitida: received -> inPreparation",
            "Transição permitida: inPreparation -> ready",
            "orderId é derivado do contexto (card selecionado), nunca digitado manualmente",
            "Após sucesso, refresh da fila e limpeza do formulário"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-update-status",
              "intent": "commandForm",
              "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
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
          "id": "org-review",
          "type": "organism",
          "organismName": "ReviewSummary",
          "titleKey": "org.review.title",
          "purpose": "Exibir feedback da última ação e resumo do estado atual da fila",
          "userActions": [],
          "requiredEntities": [],
          "readsFields": [
            "status",
            "orderId"
          ],
          "writesFields": [],
          "rulesApplied": [
            "Exibir mensagem de sucesso ou erro da última atualização de status",
            "Feedback é dismissible"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-review",
              "intent": "summary",
              "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "mobile_cards",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "page21-mobile-cards",
    "type": "page",
    "sections": [
      {
        "id": "sec-discover",
        "type": "section",
        "sectionName": "sec-discover",
        "titleKey": "sec.discover.title",
        "mode": "list",
        "order": 1,
        "organisms": [
          {
            "id": "org-kitchen-board",
            "type": "organism",
            "organismName": "KitchenBoardCards",
            "titleKey": "org.kitchen.board.title",
            "purpose": "Listar pedidos da cozinha em cards grandes e legíveis, ordenados por chegada com priorizados em destaque",
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
              "Pedidos ordenados por receivedAt (ordem de chegada)",
              "Pedidos com prioridade destacados primeiro",
              "Exibir apenas pedidos com status received ou inPreparation"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-view-board",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.discover.title",
                "source": "ui.kitchenQueue.data.viewKitchenBoard",
                "emptyKey": "section.discover.empty",
                "displayHint": "card-list",
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "badge",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-order-type",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-table-number",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "field.priority.label",
                    "order": 5,
                    "required": false,
                    "inputType": "badge",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-received-at",
                    "field": "receivedAt",
                    "labelKey": "field.receivedAt.label",
                    "order": 7,
                    "required": false,
                    "inputType": "text",
                    "format": "time",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-in-preparation-at",
                    "field": "inPreparationAt",
                    "labelKey": "field.inPreparationAt.label",
                    "order": 8,
                    "required": false,
                    "inputType": "text",
                    "format": "time",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col-created-at",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 9,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
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
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb-refresh",
                    "action": "viewKitchenBoard",
                    "labelKey": "action.viewKitchenBoard.label",
                    "order": 1,
                    "displayHint": "icon-button",
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
        "id": "sec-execute",
        "type": "section",
        "sectionName": "sec-execute",
        "titleKey": "sec.execute.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-update-status",
            "type": "organism",
            "organismName": "UpdateStatusForm",
            "titleKey": "org.update.status.title",
            "purpose": "Permitir ao cozinheiro atualizar o status do pedido selecionado, marcando como em preparo ou pronto",
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
              "Transição permitida: received -> inPreparation",
              "Transição permitida: inPreparation -> ready",
              "orderId é derivado do contexto (card selecionado), nunca digitado manualmente",
              "Após sucesso, refresh da fila e limpeza do formulário"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-update-status",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.execute.title",
                "binding": "updateOrderStatus",
                "action": "updateOrderStatus",
                "submitAction": "updateOrderStatus",
                "displayHint": "bottom-sheet",
                "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
                "fields": [
                  {
                    "id": "fld-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
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
                    "id": "act-submit-update",
                    "action": "updateOrderStatus",
                    "labelKey": "action.updateOrderStatus.label",
                    "order": 1,
                    "displayHint": "primary-button",
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
            "id": "org-review",
            "type": "organism",
            "organismName": "ReviewSummary",
            "titleKey": "org.review.title",
            "purpose": "Exibir feedback da última ação e resumo do estado atual da fila",
            "userActions": [],
            "requiredEntities": [],
            "readsFields": [
              "status",
              "orderId"
            ],
            "writesFields": [],
            "rulesApplied": [
              "Exibir mensagem de sucesso ou erro da última atualização de status",
              "Feedback é dismissible"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-review",
                "intent": "summary",
                "order": 1,
                "titleKey": "section.review.title",
                "displayHint": "feedback-banner",
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
      "description": "Carrega a fila de pedidos da cozinha do turno atual",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "inputStateKeys": []
    },
    {
      "id": "binding-updateOrderStatus",
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
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
