/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posWorkspace",
  "pageName": "POS — Lançamento e acompanhamento de pedidos",
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
      "id": "sec-10",
      "type": "section",
      "sectionName": "orderBoard",
      "titleKey": "posWorkspace.section.orderBoard.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-10",
          "type": "list",
          "organismName": "OrderBoardCards",
          "titleKey": "posWorkspace.organism.orderBoard.title",
          "purpose": "Visualizar painel de pedidos do turno atual em cartões.",
          "userActions": [
            "viewOrderBoard"
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
          "rulesApplied": [
            "dashboardCurrentShiftOnly",
            "fifoKitchenQueue",
            "orderStatusFlow"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-10",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.viewOrderBoard",
              "action": "viewOrderBoard",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec-20",
      "type": "section",
      "sectionName": "createOrder",
      "titleKey": "posWorkspace.section.createOrder.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org-20",
          "type": "form",
          "organismName": "CreateOrder",
          "titleKey": "posWorkspace.organism.createOrder.title",
          "purpose": "Lançar pedido no POS com itens e prioridade.",
          "userActions": [
            "createOrder"
          ],
          "requiredEntities": [
            "Order",
            "MenuItem",
            "StockLevel",
            "Shift",
            "OrderItem",
            "StockConsumption"
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
          "rulesApplied": [
            "stockDecrementOnOrderLaunch",
            "orderStatusFlow",
            "fifoKitchenQueue"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-20",
              "intent": "commandForm",
              "submitAction": "createOrder",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec-30",
      "type": "section",
      "sectionName": "reviewSummary",
      "titleKey": "posWorkspace.section.review.title",
      "mode": "view",
      "order": 30,
      "organisms": [
        {
          "id": "org-30",
          "type": "summary",
          "organismName": "OrderReview",
          "titleKey": "posWorkspace.organism.review.title",
          "purpose": "Revisar resumo e alertas do pedido lançado.",
          "userActions": [],
          "requiredEntities": [
            "Order",
            "StockLevel"
          ],
          "readsFields": [
            "orderId",
            "status",
            "orderType",
            "tableNumber",
            "priority",
            "priorityReason",
            "createdAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "stockDecrementOnOrderLaunch"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-30",
              "intent": "summary",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec-40",
      "type": "section",
      "sectionName": "deliverOrder",
      "titleKey": "posWorkspace.section.deliver.title",
      "mode": "edit",
      "order": 40,
      "organisms": [
        {
          "id": "org-40",
          "type": "form",
          "organismName": "DeliverOrder",
          "titleKey": "posWorkspace.organism.deliver.title",
          "purpose": "Confirmar entrega do pedido pronto ao cliente.",
          "userActions": [
            "deliverOrder"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId",
            "status",
            "readyAt"
          ],
          "writesFields": [
            "status",
            "deliveredAt"
          ],
          "rulesApplied": [
            "orderStatusFlow",
            "readyBeforeDelivered"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-40",
              "intent": "commandForm",
              "submitAction": "deliverOrder",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "posWorkspace.page11",
    "type": "page",
    "sections": [
      {
        "id": "sec-10",
        "type": "section",
        "sectionName": "orderBoard",
        "titleKey": "posWorkspace.section.orderBoard.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-10",
            "type": "list",
            "organismName": "OrderBoardCards",
            "titleKey": "posWorkspace.organism.orderBoard.title",
            "purpose": "Visualizar painel de pedidos do turno atual em cartões.",
            "userActions": [
              "viewOrderBoard"
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
            "rulesApplied": [
              "dashboardCurrentShiftOnly",
              "fifoKitchenQueue",
              "orderStatusFlow"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-10",
                "intent": "queryList",
                "order": 10,
                "titleKey": "posWorkspace.intent.orderBoardCards.title",
                "binding": "viewOrderBoard",
                "action": "viewOrderBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-10",
                    "field": "orderId",
                    "labelKey": "posWorkspace.field.orderId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-20",
                    "field": "status",
                    "labelKey": "posWorkspace.field.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-30",
                    "field": "orderType",
                    "labelKey": "posWorkspace.field.orderType",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-40",
                    "field": "tableNumber",
                    "labelKey": "posWorkspace.field.tableNumber",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-50",
                    "field": "priority",
                    "labelKey": "posWorkspace.field.priority",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-60",
                    "field": "readyAt",
                    "labelKey": "posWorkspace.field.readyAt",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-70",
                    "field": "createdAt",
                    "labelKey": "posWorkspace.field.createdAt",
                    "order": 70,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-10",
                    "action": "viewOrderBoard",
                    "labelKey": "posWorkspace.action.refreshBoard",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "viewOrderBoard"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.posWorkspace.data.viewOrderBoard"
              }
            ]
          }
        ]
      },
      {
        "id": "sec-20",
        "type": "section",
        "sectionName": "createOrder",
        "titleKey": "posWorkspace.section.createOrder.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org-20",
            "type": "form",
            "organismName": "CreateOrder",
            "titleKey": "posWorkspace.organism.createOrder.title",
            "purpose": "Lançar pedido no POS com itens e prioridade.",
            "userActions": [
              "createOrder"
            ],
            "requiredEntities": [
              "Order",
              "MenuItem",
              "StockLevel",
              "Shift",
              "OrderItem",
              "StockConsumption"
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
            "rulesApplied": [
              "stockDecrementOnOrderLaunch",
              "orderStatusFlow",
              "fifoKitchenQueue"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-20",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "posWorkspace.intent.createOrder.details",
                "binding": "createOrder",
                "submitAction": "createOrder",
                "fields": [
                  {
                    "id": "fld-10",
                    "field": "orderType",
                    "labelKey": "posWorkspace.field.orderType",
                    "order": 10,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "fld-20",
                    "field": "tableNumber",
                    "labelKey": "posWorkspace.field.tableNumber",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "fld-30",
                    "field": "orderItems",
                    "labelKey": "posWorkspace.field.orderItems",
                    "order": 30,
                    "required": true,
                    "inputType": "repeatable",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  },
                  {
                    "id": "fld-40",
                    "field": "priority",
                    "labelKey": "posWorkspace.field.priority",
                    "order": 40,
                    "required": false,
                    "inputType": "checkbox",
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "fld-50",
                    "field": "priorityReason",
                    "labelKey": "posWorkspace.field.priorityReason",
                    "order": 50,
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
                    "id": "act-10",
                    "action": "createOrder",
                    "labelKey": "posWorkspace.action.createOrder",
                    "order": 10,
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
        "id": "sec-30",
        "type": "section",
        "sectionName": "reviewSummary",
        "titleKey": "posWorkspace.section.review.title",
        "mode": "view",
        "order": 30,
        "organisms": [
          {
            "id": "org-30",
            "type": "summary",
            "organismName": "OrderReview",
            "titleKey": "posWorkspace.organism.review.title",
            "purpose": "Revisar resumo e alertas do pedido lançado.",
            "userActions": [],
            "requiredEntities": [
              "Order",
              "StockLevel"
            ],
            "readsFields": [
              "orderId",
              "status",
              "orderType",
              "tableNumber",
              "priority",
              "priorityReason",
              "createdAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "stockDecrementOnOrderLaunch"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-30",
                "intent": "summary",
                "order": 10,
                "titleKey": "posWorkspace.intent.reviewSummary.title",
                "fields": [
                  {
                    "id": "fld-60",
                    "field": "orderId",
                    "labelKey": "posWorkspace.field.orderId",
                    "order": 10,
                    "required": false
                  },
                  {
                    "id": "fld-70",
                    "field": "status",
                    "labelKey": "posWorkspace.field.status",
                    "order": 20,
                    "required": false
                  },
                  {
                    "id": "fld-80",
                    "field": "orderType",
                    "labelKey": "posWorkspace.field.orderType",
                    "order": 30,
                    "required": false
                  },
                  {
                    "id": "fld-90",
                    "field": "tableNumber",
                    "labelKey": "posWorkspace.field.tableNumber",
                    "order": 40,
                    "required": false
                  },
                  {
                    "id": "fld-100",
                    "field": "priority",
                    "labelKey": "posWorkspace.field.priority",
                    "order": 50,
                    "required": false
                  },
                  {
                    "id": "fld-110",
                    "field": "priorityReason",
                    "labelKey": "posWorkspace.field.priorityReason",
                    "order": 60,
                    "required": false
                  },
                  {
                    "id": "fld-120",
                    "field": "createdAt",
                    "labelKey": "posWorkspace.field.createdAt",
                    "order": 70,
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
      },
      {
        "id": "sec-40",
        "type": "section",
        "sectionName": "deliverOrder",
        "titleKey": "posWorkspace.section.deliver.title",
        "mode": "edit",
        "order": 40,
        "organisms": [
          {
            "id": "org-40",
            "type": "form",
            "organismName": "DeliverOrder",
            "titleKey": "posWorkspace.organism.deliver.title",
            "purpose": "Confirmar entrega do pedido pronto ao cliente.",
            "userActions": [
              "deliverOrder"
            ],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "orderId",
              "status",
              "readyAt"
            ],
            "writesFields": [
              "status",
              "deliveredAt"
            ],
            "rulesApplied": [
              "orderStatusFlow",
              "readyBeforeDelivered"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-40",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "posWorkspace.intent.deliverOrder.title",
                "binding": "deliverOrder",
                "submitAction": "deliverOrder",
                "fields": [
                  {
                    "id": "fld-130",
                    "field": "orderId",
                    "labelKey": "posWorkspace.field.orderId",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.layout.fld-130"
                  },
                  {
                    "id": "fld-140",
                    "field": "status",
                    "labelKey": "posWorkspace.field.status",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.layout.fld-140"
                  },
                  {
                    "id": "fld-150",
                    "field": "readyAt",
                    "labelKey": "posWorkspace.field.readyAt",
                    "order": 30,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.posWorkspace.layout.fld-150"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-20",
                    "action": "deliverOrder",
                    "labelKey": "posWorkspace.action.deliverOrder",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "deliverOrder"
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
      "id": "bind-10",
      "source": "bff",
      "entity": "Order",
      "command": "viewOrderBoard",
      "description": "Carrega fila de pedidos do turno atual",
      "stateKey": "ui.posWorkspace.data.viewOrderBoard",
      "inputStateKeys": []
    },
    {
      "id": "bind-20",
      "source": "bff",
      "entity": "Order",
      "command": "createOrder",
      "description": "Cria novo pedido no POS",
      "stateKey": "ui.posWorkspace.output.createOrder",
      "inputStateKeys": [
        "ui.posWorkspace.input.createOrder.orderType",
        "ui.posWorkspace.input.createOrder.tableNumber",
        "ui.posWorkspace.input.createOrder.orderItems",
        "ui.posWorkspace.input.createOrder.priority",
        "ui.posWorkspace.input.createOrder.priorityReason"
      ]
    },
    {
      "id": "bind-30",
      "source": "bff",
      "entity": "Order",
      "command": "deliverOrder",
      "description": "Confirma entrega do pedido",
      "stateKey": "ui.posWorkspace.output.deliverOrder",
      "inputStateKeys": []
    }
  ]
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
