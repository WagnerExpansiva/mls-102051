/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posWorkspace",
  "pageName": "POS — Lançamento e acompanhamento de pedidos",
  "baseClassName": "CafeFlowPosWorkspaceBase",
  "actor": "atendente",
  "purpose": "Executar POS — Lançamento e acompanhamento de pedidos.",
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
    "workspaceId": "posWorkspace",
    "workspaceKind": "workflow",
    "workflowId": "orderLifecycle",
    "actor": "atendente",
    "entity": "Order",
    "owners": [
      {
        "kind": "workflow",
        "id": "orderLifecycle",
        "defPath": "_102051_/l4/workflows/orderLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createOrder",
        "defPath": "_102051_/l4/operations/createOrder.defs.ts"
      },
      {
        "kind": "operation",
        "id": "viewOrderBoard",
        "defPath": "_102051_/l4/operations/viewOrderBoard.defs.ts"
      },
      {
        "kind": "operation",
        "id": "deliverOrder",
        "defPath": "_102051_/l4/operations/deliverOrder.defs.ts"
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
          "operationId": "createOrder",
          "commandName": "createOrder",
          "steps": [
            "O atendente seleciona o tipo de pedido (mesa ou takeout) e informa o número da mesa quando aplicável",
            "O atendente busca e adiciona os itens do cardápio solicitados pelo cliente, visualizando preço e categoria",
            "O atendente opcionalmente marca o pedido como prioritário com justificativa",
            "O sistema verifica alertas de estoque insuficiente nos ingredientes dos itens pedidos",
            "O atendente confirma o pedido e o sistema cria o registro com status 'registered', decrementa o estoque e gera o número do pedido"
          ]
        },
        {
          "operationId": "viewOrderBoard",
          "commandName": "viewOrderBoard",
          "steps": [
            "O atendente abre o painel de pedidos no POS",
            "O sistema identifica o turno atualmente aberto e filtra apenas os pedidos daquele turno",
            "O sistema lista os pedidos ordenados por data de criação (ordem de chegada)",
            "O painel exibe cada pedido com seu status atual, tipo, mesa e indicador de prioridade"
          ]
        },
        {
          "operationId": "deliverOrder",
          "commandName": "deliverOrder",
          "steps": [
            "O atendente consulta o painel de pedidos e identifica um pedido com status 'pronto'.",
            "O atendente seleciona o pedido e confirma a entrega ao cliente.",
            "O sistema valida que o status atual é 'ready' e atualiza o pedido para status 'delivered' registrando o momento da entrega."
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec-order-board",
      "type": "section",
      "sectionName": "orderBoard",
      "titleKey": "section.orderBoard.title",
      "mode": "view",
      "order": 1,
      "organisms": [
        {
          "id": "org-order-board-cards",
          "type": "cardsList",
          "organismName": "orderBoardCards",
          "titleKey": "organism.orderBoardCards.title",
          "purpose": "Exibir painel de pedidos em cartões com status e ações rápidas.",
          "userActions": [
            "viewOrderBoard",
            "deliverOrder"
          ],
          "requiredEntities": [
            "Order",
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
            "readyAt",
            "createdAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-order-board-list",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.viewOrderBoard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-create-order",
      "type": "section",
      "sectionName": "createOrder",
      "titleKey": "section.createOrder.title",
      "mode": "create",
      "order": 2,
      "organisms": [
        {
          "id": "org-create-order-form",
          "type": "form",
          "organismName": "createOrderForm",
          "titleKey": "organism.createOrderForm.title",
          "purpose": "Lançar novo pedido com tipo, mesa e itens.",
          "userActions": [
            "createOrder"
          ],
          "requiredEntities": [
            "Order",
            "OrderItem",
            "MenuItem",
            "StockLevel",
            "Shift"
          ],
          "readsFields": [
            "orderType",
            "tableNumber",
            "orderItems",
            "priority",
            "priorityReason"
          ],
          "writesFields": [
            "orderId",
            "status",
            "orderType",
            "tableNumber",
            "createdAt"
          ],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-create-order-form",
              "intent": "commandForm",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-deliver-order",
      "type": "section",
      "sectionName": "deliverOrder",
      "titleKey": "section.deliverOrder.title",
      "mode": "update",
      "order": 3,
      "organisms": [
        {
          "id": "org-deliver-order-form",
          "type": "form",
          "organismName": "deliverOrderForm",
          "titleKey": "organism.deliverOrderForm.title",
          "purpose": "Confirmar entrega do pedido selecionado.",
          "userActions": [
            "deliverOrder"
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
            "status",
            "deliveredAt",
            "updatedAt"
          ],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-deliver-order-form",
              "intent": "commandForm",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-review",
      "type": "section",
      "sectionName": "review",
      "titleKey": "section.review.title",
      "mode": "summary",
      "order": 4,
      "organisms": [
        {
          "id": "org-review-create",
          "type": "summary",
          "organismName": "reviewCreateOrder",
          "titleKey": "organism.reviewCreate.title",
          "purpose": "Exibir o resultado do último pedido lançado.",
          "userActions": [],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId",
            "status",
            "orderType",
            "tableNumber",
            "createdAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-review-create",
              "intent": "summary",
              "order": 1
            }
          ]
        },
        {
          "id": "org-review-deliver",
          "type": "summary",
          "organismName": "reviewDeliverOrder",
          "titleKey": "organism.reviewDeliver.title",
          "purpose": "Exibir o resultado da última entrega confirmada.",
          "userActions": [],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId",
            "status",
            "deliveredAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 2,
          "intentionRefs": [
            {
              "id": "int-review-deliver",
              "intent": "summary",
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
    "id": "posWorkspace.page11.mobile_cards",
    "type": "page",
    "sections": [
      {
        "id": "sec-order-board",
        "type": "section",
        "sectionName": "orderBoard",
        "titleKey": "section.orderBoard.title",
        "mode": "view",
        "order": 1,
        "organisms": [
          {
            "id": "org-order-board-cards",
            "type": "cardsList",
            "organismName": "orderBoardCards",
            "titleKey": "organism.orderBoardCards.title",
            "purpose": "Exibir painel de pedidos em cartões com status e ações rápidas.",
            "userActions": [
              "viewOrderBoard",
              "deliverOrder"
            ],
            "requiredEntities": [
              "Order",
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
              "readyAt",
              "createdAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int-order-board-list",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.orderBoardList.title",
                "emptyKey": "empty.orderBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-order-type",
                    "field": "orderType",
                    "labelKey": "field.orderType",
                    "order": 3,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-table-number",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber",
                    "order": 4,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "field.priority",
                    "order": 5,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason",
                    "order": 6,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-ready-at",
                    "field": "readyAt",
                    "labelKey": "field.readyAt",
                    "order": 7,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-created-at",
                    "field": "createdAt",
                    "labelKey": "field.createdAt",
                    "order": 8,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-refresh",
                    "action": "viewOrderBoard",
                    "labelKey": "action.viewOrderBoard.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "viewOrderBoard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "ra-deliver-order",
                    "action": "deliverOrder",
                    "labelKey": "action.deliverOrder.label",
                    "order": 2,
                    "displayHint": "primary",
                    "actionKey": "deliverOrder"
                  }
                ],
                "actions": [],
                "stateKey": "ui.posWorkspace.data.viewOrderBoard"
              }
            ]
          }
        ]
      },
      {
        "id": "sec-create-order",
        "type": "section",
        "sectionName": "createOrder",
        "titleKey": "section.createOrder.title",
        "mode": "create",
        "order": 2,
        "organisms": [
          {
            "id": "org-create-order-form",
            "type": "form",
            "organismName": "createOrderForm",
            "titleKey": "organism.createOrderForm.title",
            "purpose": "Lançar novo pedido com tipo, mesa e itens.",
            "userActions": [
              "createOrder"
            ],
            "requiredEntities": [
              "Order",
              "OrderItem",
              "MenuItem",
              "StockLevel",
              "Shift"
            ],
            "readsFields": [
              "orderType",
              "tableNumber",
              "orderItems",
              "priority",
              "priorityReason"
            ],
            "writesFields": [
              "orderId",
              "status",
              "orderType",
              "tableNumber",
              "createdAt"
            ],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int-create-order-form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.createOrderForm.title",
                "fields": [
                  {
                    "id": "fld-order-type",
                    "field": "orderType",
                    "labelKey": "field.orderType",
                    "order": 1,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "fld-table-number",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "fld-order-items",
                    "field": "orderItems",
                    "labelKey": "field.orderItems",
                    "order": 3,
                    "required": true,
                    "inputType": "list",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  },
                  {
                    "id": "fld-priority",
                    "field": "priority",
                    "labelKey": "field.priority",
                    "order": 4,
                    "required": false,
                    "inputType": "toggle",
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "fld-priority-reason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.input.createOrder.priorityReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-create-order",
                    "action": "createOrder",
                    "labelKey": "action.createOrder.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "createOrder"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec-deliver-order",
        "type": "section",
        "sectionName": "deliverOrder",
        "titleKey": "section.deliverOrder.title",
        "mode": "update",
        "order": 3,
        "organisms": [
          {
            "id": "org-deliver-order-form",
            "type": "form",
            "organismName": "deliverOrderForm",
            "titleKey": "organism.deliverOrderForm.title",
            "purpose": "Confirmar entrega do pedido selecionado.",
            "userActions": [
              "deliverOrder"
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
              "status",
              "deliveredAt",
              "updatedAt"
            ],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int-deliver-order-form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.deliverOrderForm.title",
                "fields": [
                  {
                    "id": "fld-deliver-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.input.deliverOrder.orderId"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-deliver-order",
                    "action": "deliverOrder",
                    "labelKey": "action.deliverOrder.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "deliverOrder"
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
        "sectionName": "review",
        "titleKey": "section.review.title",
        "mode": "summary",
        "order": 4,
        "organisms": [
          {
            "id": "org-review-create",
            "type": "summary",
            "organismName": "reviewCreateOrder",
            "titleKey": "organism.reviewCreate.title",
            "purpose": "Exibir o resultado do último pedido lançado.",
            "userActions": [],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "orderId",
              "status",
              "orderType",
              "tableNumber",
              "createdAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int-review-create",
                "intent": "summary",
                "order": 1,
                "titleKey": "intention.reviewCreate.title",
                "fields": [
                  {
                    "id": "sum-create-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": false
                  },
                  {
                    "id": "sum-create-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": false
                  },
                  {
                    "id": "sum-create-order-type",
                    "field": "orderType",
                    "labelKey": "field.orderType",
                    "order": 3,
                    "required": false
                  },
                  {
                    "id": "sum-create-table-number",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber",
                    "order": 4,
                    "required": false
                  },
                  {
                    "id": "sum-create-created-at",
                    "field": "createdAt",
                    "labelKey": "field.createdAt",
                    "order": 5,
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
          },
          {
            "id": "org-review-deliver",
            "type": "summary",
            "organismName": "reviewDeliverOrder",
            "titleKey": "organism.reviewDeliver.title",
            "purpose": "Exibir o resultado da última entrega confirmada.",
            "userActions": [],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "orderId",
              "status",
              "deliveredAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 2,
            "intentions": [
              {
                "id": "int-review-deliver",
                "intent": "summary",
                "order": 1,
                "titleKey": "intention.reviewDeliver.title",
                "fields": [
                  {
                    "id": "sum-deliver-order-id",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": false
                  },
                  {
                    "id": "sum-deliver-status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": false
                  },
                  {
                    "id": "sum-deliver-delivered-at",
                    "field": "deliveredAt",
                    "labelKey": "field.deliveredAt",
                    "order": 3,
                    "required": false
                  },
                  {
                    "id": "sum-deliver-updated-at",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt",
                    "order": 4,
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
  "dataBindings": []
};

export const pipeline = [
  {
    "id": "posWorkspace__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/posWorkspace.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/posWorkspace.ts",
      "_102051_/l2/cafeFlow/web/contracts/posWorkspace.defs.ts",
      "_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "posWorkspace__l2_shared"
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
