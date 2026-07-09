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
      "id": "sec.queueCards",
      "type": "section",
      "sectionName": "queueCards",
      "titleKey": "kitchenQueue.section.cards.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org.cardList",
          "type": "list",
          "organismName": "KitchenQueueCards",
          "titleKey": "kitchenQueue.organism.cards.title",
          "purpose": "Exibir fila de pedidos em cartões legíveis",
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
            "receivedAt",
            "inPreparationAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "fifoKitchenQueue",
            "dashboardCurrentShiftOnly"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int.cards.list",
              "intent": "queryList",
              "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec.cardActions",
      "type": "section",
      "sectionName": "cardActions",
      "titleKey": "kitchenQueue.section.actions.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org.cardActions",
          "type": "form",
          "organismName": "KitchenCardActions",
          "titleKey": "kitchenQueue.organism.actions.title",
          "purpose": "Atualizar status do pedido selecionado",
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
          "order": 10,
          "intentionRefs": [
            {
              "id": "int.card.update",
              "intent": "commandForm",
              "action": "updateOrderStatus",
              "submitAction": "updateOrderStatus",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec.cardSummary",
      "type": "section",
      "sectionName": "cardSummary",
      "titleKey": "kitchenQueue.section.summary.title",
      "mode": "view",
      "order": 30,
      "organisms": [
        {
          "id": "org.cardSummary",
          "type": "summary",
          "organismName": "KitchenCardSummary",
          "titleKey": "kitchenQueue.organism.summary.title",
          "purpose": "Revisar detalhes do pedido selecionado",
          "userActions": [],
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
            "inPreparationAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int.card.summary",
              "intent": "summary",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "kitchenQueue.page21",
    "type": "page",
    "sections": [
      {
        "id": "sec.queueCards",
        "type": "section",
        "sectionName": "queueCards",
        "titleKey": "kitchenQueue.section.cards.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org.cardList",
            "type": "list",
            "organismName": "KitchenQueueCards",
            "titleKey": "kitchenQueue.organism.cards.title",
            "purpose": "Exibir fila de pedidos em cartões legíveis",
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
              "receivedAt",
              "inPreparationAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "fifoKitchenQueue",
              "dashboardCurrentShiftOnly"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int.cards.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "kitchenQueue.intent.cards.list.title",
                "source": "cafeFlow.orderLifecycle.viewKitchenBoard",
                "binding": "viewKitchenBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col.card.orderId",
                    "field": "orderId",
                    "labelKey": "kitchenQueue.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.card.status",
                    "field": "status",
                    "labelKey": "kitchenQueue.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.card.orderType",
                    "field": "orderType",
                    "labelKey": "kitchenQueue.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.card.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "kitchenQueue.field.tableNumber",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.card.priority",
                    "field": "priority",
                    "labelKey": "kitchenQueue.field.priority",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  },
                  {
                    "id": "col.card.receivedAt",
                    "field": "receivedAt",
                    "labelKey": "kitchenQueue.field.receivedAt",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
              }
            ]
          }
        ]
      },
      {
        "id": "sec.cardActions",
        "type": "section",
        "sectionName": "cardActions",
        "titleKey": "kitchenQueue.section.actions.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org.cardActions",
            "type": "form",
            "organismName": "KitchenCardActions",
            "titleKey": "kitchenQueue.organism.actions.title",
            "purpose": "Atualizar status do pedido selecionado",
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
            "order": 10,
            "intentions": [
              {
                "id": "int.card.update",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "kitchenQueue.intent.card.update.title",
                "source": "cafeFlow.orderLifecycle.updateOrderStatus",
                "binding": "updateOrderStatus",
                "action": "updateOrderStatus",
                "submitAction": "updateOrderStatus",
                "fields": [
                  {
                    "id": "fld.card.status",
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
                    "id": "act.card.inPreparation",
                    "action": "updateOrderStatus",
                    "labelKey": "kitchenQueue.action.markInPreparation",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "updateOrderStatus"
                  },
                  {
                    "id": "act.card.ready",
                    "action": "updateOrderStatus",
                    "labelKey": "kitchenQueue.action.markReady",
                    "order": 20,
                    "displayHint": "primary",
                    "actionKey": "updateOrderStatus"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec.cardSummary",
        "type": "section",
        "sectionName": "cardSummary",
        "titleKey": "kitchenQueue.section.summary.title",
        "mode": "view",
        "order": 30,
        "organisms": [
          {
            "id": "org.cardSummary",
            "type": "summary",
            "organismName": "KitchenCardSummary",
            "titleKey": "kitchenQueue.organism.summary.title",
            "purpose": "Revisar detalhes do pedido selecionado",
            "userActions": [],
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
              "inPreparationAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 10,
            "intentions": [
              {
                "id": "int.card.summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "kitchenQueue.intent.summary.title",
                "fields": [
                  {
                    "id": "sum.card.orderId",
                    "field": "orderId",
                    "labelKey": "kitchenQueue.field.orderId",
                    "order": 10,
                    "required": false
                  },
                  {
                    "id": "sum.card.status",
                    "field": "status",
                    "labelKey": "kitchenQueue.field.status",
                    "order": 20,
                    "required": false
                  },
                  {
                    "id": "sum.card.orderType",
                    "field": "orderType",
                    "labelKey": "kitchenQueue.field.orderType",
                    "order": 30,
                    "required": false
                  },
                  {
                    "id": "sum.card.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "kitchenQueue.field.tableNumber",
                    "order": 40,
                    "required": false
                  },
                  {
                    "id": "sum.card.priority",
                    "field": "priority",
                    "labelKey": "kitchenQueue.field.priority",
                    "order": 50,
                    "required": false
                  },
                  {
                    "id": "sum.card.priorityReason",
                    "field": "priorityReason",
                    "labelKey": "kitchenQueue.field.priorityReason",
                    "order": 60,
                    "required": false
                  },
                  {
                    "id": "sum.card.receivedAt",
                    "field": "receivedAt",
                    "labelKey": "kitchenQueue.field.receivedAt",
                    "order": 70,
                    "required": false
                  },
                  {
                    "id": "sum.card.inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "kitchenQueue.field.inPreparationAt",
                    "order": 80,
                    "required": false
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
  "dataBindings": [
    {
      "id": "bind.viewKitchenBoard",
      "source": "command",
      "entity": "Order",
      "command": "viewKitchenBoard",
      "description": "Listar pedidos da cozinha",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "inputStateKeys": []
    },
    {
      "id": "bind.updateOrderStatus",
      "source": "command",
      "entity": "Order",
      "command": "updateOrderStatus",
      "description": "Atualizar status do pedido",
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
