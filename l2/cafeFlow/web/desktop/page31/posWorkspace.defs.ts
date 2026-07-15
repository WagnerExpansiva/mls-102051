/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.defs.ts" enhancement="_blank"/>

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
      "id": "queueSection",
      "type": "section",
      "sectionName": "queueSection",
      "titleKey": "queueSection.title",
      "mode": "primary",
      "order": 1,
      "organisms": [
        {
          "id": "orderBoard",
          "type": "organism",
          "organismName": "OrderBoardList",
          "titleKey": "orderBoard.title",
          "purpose": "Painel ao vivo dos pedidos do turno atual, ordenados por chegada, com status, prioridade e ação contextual de entrega para pedidos prontos.",
          "userActions": [
            "viewOrderBoard",
            "deliverOrder"
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
            "readyAt",
            "createdAt"
          ],
          "writesFields": [
            "orderId",
            "status",
            "deliveredAt",
            "updatedAt"
          ],
          "rulesApplied": [
            "Apenas pedidos com status 'ready' podem ser entregues",
            "Pedidos são filtrados pelo turno atualmente aberto",
            "Pedidos são ordenados por data de criação (ordem de chegada)"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "queueList",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.viewOrderBoard",
              "order": 1
            },
            {
              "id": "deliverTransition",
              "intent": "commandTransition",
              "stateKey": "ui.posWorkspace.input.deliverOrder.orderId",
              "action": "deliverOrder",
              "submitAction": "deliverOrder",
              "order": 2
            }
          ]
        }
      ]
    },
    {
      "id": "createOrderSection",
      "type": "section",
      "sectionName": "createOrderSection",
      "titleKey": "createOrderSection.title",
      "mode": "secondary",
      "order": 2,
      "organisms": [
        {
          "id": "createOrderForm",
          "type": "organism",
          "organismName": "CreateOrderForm",
          "titleKey": "createOrderForm.title",
          "purpose": "Formulário de lançamento de pedido: tipo, mesa, itens, prioridade opcional e confirmação para envio à cozinha.",
          "userActions": [
            "createOrder"
          ],
          "requiredEntities": [
            "Order",
            "MenuItem"
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
            "tableNumber é obrigatório apenas quando orderType for 'table'",
            "priorityReason é obrigatório apenas quando priority for true",
            "orderItems é uma entrada composta repetível dentro do mesmo submit",
            "Após sucesso, o formulário é limpo e o painel é atualizado"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "createCommand",
              "intent": "commandForm",
              "stateKey": "ui.posWorkspace.output.createOrder",
              "action": "createOrder",
              "submitAction": "createOrder",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "reviewSection",
      "type": "section",
      "sectionName": "reviewSection",
      "titleKey": "reviewSection.title",
      "mode": "tertiary",
      "order": 3,
      "organisms": [
        {
          "id": "actionSummary",
          "type": "organism",
          "organismName": "ActionSummary",
          "titleKey": "actionSummary.title",
          "purpose": "Resumo do último pedido criado e da última entrega realizada, com feedback textual dismissible de sucesso ou erro.",
          "userActions": [],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId",
            "status",
            "orderType",
            "tableNumber",
            "createdAt",
            "deliveredAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "Exibe o resultado da última ação executada (createOrder ou deliverOrder)",
            "Feedback textual é dismissible"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "summaryView",
              "intent": "summary",
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
        "id": "queueSection",
        "type": "section",
        "sectionName": "queueSection",
        "titleKey": "queueSection.title",
        "mode": "primary",
        "order": 1,
        "organisms": [
          {
            "id": "orderBoard",
            "type": "organism",
            "organismName": "OrderBoardList",
            "titleKey": "orderBoard.title",
            "purpose": "Painel ao vivo dos pedidos do turno atual, ordenados por chegada, com status, prioridade e ação contextual de entrega para pedidos prontos.",
            "userActions": [
              "viewOrderBoard",
              "deliverOrder"
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
              "readyAt",
              "createdAt"
            ],
            "writesFields": [
              "orderId",
              "status",
              "deliveredAt",
              "updatedAt"
            ],
            "rulesApplied": [
              "Apenas pedidos com status 'ready' podem ser entregues",
              "Pedidos são filtrados pelo turno atualmente aberto",
              "Pedidos são ordenados por data de criação (ordem de chegada)"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "queueList",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.queue.title",
                "source": "ui.posWorkspace.data.viewOrderBoard",
                "emptyKey": "empty.queue",
                "displayHint": "Group items by status column; highlight priority rows; show loading state when viewOrderBoardState is 'loading'",
                "stateKey": "ui.posWorkspace.data.viewOrderBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 2,
                    "required": false,
                    "inputType": "badge",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "column.tableNumber",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "column.priority",
                    "order": 5,
                    "required": false,
                    "inputType": "badge",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "column.priorityReason",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-receivedAt",
                    "field": "receivedAt",
                    "labelKey": "column.receivedAt",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "column.inPreparationAt",
                    "order": 8,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-readyAt",
                    "field": "readyAt",
                    "labelKey": "column.readyAt",
                    "order": 9,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 10,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.posWorkspace.data.viewOrderBoard",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-refresh",
                    "action": "viewOrderBoard",
                    "labelKey": "action.refresh.label",
                    "order": 1,
                    "displayHint": "always-visible",
                    "actionKey": "viewOrderBoard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "row-deliver",
                    "action": "deliverOrder",
                    "labelKey": "action.deliverOrder.label",
                    "order": 1,
                    "displayHint": "visible only when row.status === 'ready'; triggers set.deliverOrderOrderId then deliverOrder",
                    "actionKey": "deliverOrder"
                  }
                ],
                "actions": []
              },
              {
                "id": "deliverTransition",
                "intent": "commandTransition",
                "order": 2,
                "titleKey": "section.queue.deliverTitle",
                "binding": "ui.posWorkspace.output.deliverOrder",
                "action": "deliverOrder",
                "submitAction": "deliverOrder",
                "displayHint": "Contextual panel shown when a row with status 'ready' is selected; orderId is pre-filled from selectedEntity, not manually entered",
                "stateKey": "ui.posWorkspace.input.deliverOrder.orderId",
                "fields": [
                  {
                    "id": "deliver-orderId",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.posWorkspace.input.deliverOrder.orderId"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-confirmDeliver",
                    "action": "deliverOrder",
                    "labelKey": "action.confirmDeliver.label",
                    "order": 1,
                    "displayHint": "primary; disabled when no row selected or selected row status !== 'ready'",
                    "actionKey": "deliverOrder"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "createOrderSection",
        "type": "section",
        "sectionName": "createOrderSection",
        "titleKey": "createOrderSection.title",
        "mode": "secondary",
        "order": 2,
        "organisms": [
          {
            "id": "createOrderForm",
            "type": "organism",
            "organismName": "CreateOrderForm",
            "titleKey": "createOrderForm.title",
            "purpose": "Formulário de lançamento de pedido: tipo, mesa, itens, prioridade opcional e confirmação para envio à cozinha.",
            "userActions": [
              "createOrder"
            ],
            "requiredEntities": [
              "Order",
              "MenuItem"
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
              "tableNumber é obrigatório apenas quando orderType for 'table'",
              "priorityReason é obrigatório apenas quando priority for true",
              "orderItems é uma entrada composta repetível dentro do mesmo submit",
              "Após sucesso, o formulário é limpo e o painel é atualizado"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "createCommand",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.createOrder.title",
                "binding": "ui.posWorkspace.output.createOrder",
                "action": "createOrder",
                "submitAction": "createOrder",
                "displayHint": "orderType defaults to 'table' (most common in café); tableNumber shown only when orderType is 'table'; priorityReason shown only when priority is true; orderItems is a repeatable sub-form (add/remove lines) within the same submit",
                "stateKey": "ui.posWorkspace.output.createOrder",
                "fields": [
                  {
                    "id": "f-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType",
                    "order": 1,
                    "required": true,
                    "inputType": "select",
                    "source": "ui.posWorkspace.input.createOrder.orderType",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "f-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber",
                    "order": 2,
                    "required": false,
                    "inputType": "number",
                    "source": "ui.posWorkspace.input.createOrder.tableNumber",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "f-orderItems",
                    "field": "orderItems",
                    "labelKey": "field.orderItems",
                    "order": 3,
                    "required": true,
                    "inputType": "composite",
                    "source": "ui.posWorkspace.input.createOrder.orderItems",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  },
                  {
                    "id": "f-priority",
                    "field": "priority",
                    "labelKey": "field.priority",
                    "order": 4,
                    "required": false,
                    "inputType": "toggle",
                    "source": "ui.posWorkspace.input.createOrder.priority",
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "f-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.posWorkspace.input.createOrder.priorityReason",
                    "stateKey": "ui.posWorkspace.input.createOrder.priorityReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submitCreate",
                    "action": "createOrder",
                    "labelKey": "action.createOrder.label",
                    "order": 1,
                    "displayHint": "primary; disabled when required fields are missing or createOrderState is 'loading'",
                    "actionKey": "createOrder"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "reviewSection",
        "type": "section",
        "sectionName": "reviewSection",
        "titleKey": "reviewSection.title",
        "mode": "tertiary",
        "order": 3,
        "organisms": [
          {
            "id": "actionSummary",
            "type": "organism",
            "organismName": "ActionSummary",
            "titleKey": "actionSummary.title",
            "purpose": "Resumo do último pedido criado e da última entrega realizada, com feedback textual dismissible de sucesso ou erro.",
            "userActions": [],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "orderId",
              "status",
              "orderType",
              "tableNumber",
              "createdAt",
              "deliveredAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "Exibe o resultado da última ação executada (createOrder ou deliverOrder)",
              "Feedback textual é dismissible"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "summaryView",
                "intent": "summary",
                "order": 1,
                "titleKey": "section.review.title",
                "emptyKey": "empty.review",
                "displayHint": "Shows last created order from ui.posWorkspace.output.createOrder and last delivered order from ui.posWorkspace.output.deliverOrder; displays success/error feedback keys from action status states",
                "fields": [],
                "columns": [
                  {
                    "id": "sum-orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.posWorkspace.output.createOrder"
                  },
                  {
                    "id": "sum-status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 2,
                    "required": false,
                    "inputType": "badge",
                    "source": "ui.posWorkspace.output.createOrder"
                  },
                  {
                    "id": "sum-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.posWorkspace.output.createOrder"
                  },
                  {
                    "id": "sum-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "column.tableNumber",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.posWorkspace.output.createOrder"
                  },
                  {
                    "id": "sum-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 5,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.posWorkspace.output.createOrder"
                  },
                  {
                    "id": "sum-deliveredAt",
                    "field": "deliveredAt",
                    "labelKey": "column.deliveredAt",
                    "order": 6,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.posWorkspace.output.deliverOrder"
                  },
                  {
                    "id": "sum-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "column.updatedAt",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.posWorkspace.output.deliverOrder"
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
      }
    ]
  },
  "dataBindings": [
    {
      "id": "bind-viewOrderBoard",
      "source": "query",
      "entity": "Order",
      "command": "viewOrderBoard",
      "description": "Carrega o painel de pedidos do turno atualmente aberto, ordenados por data de criação",
      "stateKey": "ui.posWorkspace.data.viewOrderBoard",
      "inputStateKeys": []
    },
    {
      "id": "bind-createOrder",
      "source": "command",
      "entity": "Order",
      "command": "createOrder",
      "description": "Cria novo pedido com status 'registered', decrementa estoque e gera número do pedido",
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
      "id": "bind-deliverOrder",
      "source": "command",
      "entity": "Order",
      "command": "deliverOrder",
      "description": "Entrega pedido ao cliente, validando status 'ready' e registrando momento da entrega",
      "stateKey": "ui.posWorkspace.output.deliverOrder",
      "inputStateKeys": [
        "ui.posWorkspace.input.deliverOrder.orderId"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "posWorkspace__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.defs.ts",
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
