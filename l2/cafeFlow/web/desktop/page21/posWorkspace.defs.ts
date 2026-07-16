/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.defs.ts" enhancement="_blank"/>

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
      "id": "sec-orderBoard",
      "type": "section",
      "sectionName": "Order Board",
      "titleKey": "section.board.title",
      "mode": "board",
      "order": 1,
      "organisms": [
        {
          "id": "org-orderBoard",
          "type": "organism",
          "organismName": "OrderBoard",
          "titleKey": "org.orderBoard.title",
          "purpose": "Exibir painel de pedidos com status ao vivo e permitir entrega contextual de pedidos prontos",
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
            "deliverOrder requires status 'ready'",
            "viewOrderBoard filters by current open shift"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-viewOrderBoard",
              "intent": "query",
              "stateKey": "ui.posWorkspace.data.viewOrderBoard",
              "action": "viewOrderBoard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-createOrder",
      "type": "section",
      "sectionName": "Create Order",
      "titleKey": "section.createOrder.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-createOrderForm",
          "type": "organism",
          "organismName": "CreateOrderForm",
          "titleKey": "org.createOrderForm.title",
          "purpose": "Lançar novo pedido com tipo, itens e prioridade de forma rápida",
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
            "tableNumber required when orderType is 'mesa'",
            "priorityReason required when priority is true",
            "stock validation before order creation"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-createOrder",
              "intent": "command",
              "stateKey": "ui.posWorkspace.output.createOrder",
              "action": "createOrder",
              "submitAction": "createOrder",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "goal_first",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "pageObjective": {
    "actor": "Atendente do POS (café/restaurante)",
    "jobToBeDone": "Lançar novos pedidos rapidamente e acompanhar seu progresso pelo ciclo de vida da cozinha, entregando ao cliente quando prontos.",
    "primaryDecision": "Criar um novo pedido com tipo, itens e prioridade, e entregar pedidos prontos com um único toque",
    "decisiveInfo": [
      "orderType",
      "tableNumber",
      "orderItems",
      "priority",
      "priorityReason",
      "status",
      "orderId"
    ],
    "usageFrequency": "Contínuo, mãos ocupadas, durante todo o turno",
    "criticalActions": [
      {
        "action": "createOrder",
        "presentation": "primary-button"
      },
      {
        "action": "deliverOrder",
        "presentation": "inline-row-command"
      },
      {
        "action": "viewOrderBoard",
        "presentation": "auto-loaded-card-board"
      }
    ],
    "informationHierarchy": [
      "Painel de pedidos com status ao vivo (sempre visível)",
      "Ação de entrega contextual em pedidos prontos (inline no card)",
      "Formulário rápido de criação de pedido abaixo do painel"
    ],
    "successCriteria": "O atendente cria pedidos em poucos toques, vê o status de todos os pedidos em tempo real no painel e entrega pedidos prontos com um único toque no card, sem digitar IDs.",
    "antiPatterns": [
      "Formulário separado para entrega com ID digitado manualmente",
      "Select livre de status sobre todo o enum",
      "ID de pedido digitado manualmente",
      "Empilhar formulários sem conexão contextual com a lista de pedidos",
      "Exibir campos system-owned (createdAt, status) como inputs manuais no formulário de criação"
    ]
  },
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "sec-orderBoard",
        "type": "section",
        "sectionName": "Order Board",
        "titleKey": "section.board.title",
        "mode": "board",
        "order": 1,
        "organisms": [
          {
            "id": "org-orderBoard",
            "type": "organism",
            "organismName": "OrderBoard",
            "titleKey": "org.orderBoard.title",
            "purpose": "Exibir painel de pedidos com status ao vivo e permitir entrega contextual de pedidos prontos",
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
              "deliverOrder requires status 'ready'",
              "viewOrderBoard filters by current open shift"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-viewOrderBoard",
                "intent": "query",
                "order": 1,
                "source": "ui.posWorkspace.data.viewOrderBoard",
                "binding": "viewOrderBoard",
                "action": "viewOrderBoard",
                "emptyKey": "section.board.empty",
                "displayHint": "card-board",
                "stateKey": "ui.posWorkspace.data.viewOrderBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col-orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 2,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 3,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "column.tableNumber",
                    "order": 4,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priority",
                    "field": "priority",
                    "labelKey": "column.priority",
                    "order": 5,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "column.priorityReason",
                    "order": 6,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-receivedAt",
                    "field": "receivedAt",
                    "labelKey": "column.receivedAt",
                    "order": 7,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "column.inPreparationAt",
                    "order": 8,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-readyAt",
                    "field": "readyAt",
                    "labelKey": "column.readyAt",
                    "order": 9,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "toolbar-refresh",
                    "action": "viewOrderBoard",
                    "labelKey": "action.refresh.label",
                    "order": 1,
                    "actionKey": "viewOrderBoard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "rowAction-deliverOrder",
                    "action": "deliverOrder",
                    "labelKey": "action.deliverOrder.label",
                    "order": 1,
                    "displayHint": "inline-row-command",
                    "actionKey": "deliverOrder"
                  }
                ],
                "actions": []
              }
            ]
          }
        ]
      },
      {
        "id": "sec-createOrder",
        "type": "section",
        "sectionName": "Create Order",
        "titleKey": "section.createOrder.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-createOrderForm",
            "type": "organism",
            "organismName": "CreateOrderForm",
            "titleKey": "org.createOrderForm.title",
            "purpose": "Lançar novo pedido com tipo, itens e prioridade de forma rápida",
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
              "tableNumber required when orderType is 'mesa'",
              "priorityReason required when priority is true",
              "stock validation before order creation"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-createOrder",
                "intent": "command",
                "order": 1,
                "source": "ui.posWorkspace.output.createOrder",
                "binding": "createOrder",
                "action": "createOrder",
                "submitAction": "createOrder",
                "displayHint": "summary-first",
                "stateKey": "ui.posWorkspace.output.createOrder",
                "fields": [
                  {
                    "id": "field-orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType.label",
                    "order": 1,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "field-tableNumber",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "field-orderItems",
                    "field": "orderItems",
                    "labelKey": "field.orderItems.label",
                    "order": 3,
                    "required": true,
                    "inputType": "list",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  },
                  {
                    "id": "field-priority",
                    "field": "priority",
                    "labelKey": "field.priority.label",
                    "order": 4,
                    "required": false,
                    "inputType": "checkbox",
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "field-priorityReason",
                    "field": "priorityReason",
                    "labelKey": "field.priorityReason.label",
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
                    "id": "action-submit-createOrder",
                    "action": "createOrder",
                    "labelKey": "action.createOrder.label",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "createOrder"
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
      "id": "binding-viewOrderBoard",
      "source": "query",
      "entity": "Order",
      "command": "viewOrderBoard",
      "description": "Carrega o painel de pedidos do turno atual",
      "stateKey": "ui.posWorkspace.data.viewOrderBoard",
      "inputStateKeys": []
    },
    {
      "id": "binding-createOrder",
      "source": "command",
      "entity": "Order",
      "command": "createOrder",
      "description": "Cria um novo pedido no POS",
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
      "id": "binding-deliverOrder",
      "source": "command",
      "entity": "Order",
      "command": "deliverOrder",
      "description": "Entrega um pedido pronto ao cliente",
      "stateKey": "ui.posWorkspace.output.deliverOrder",
      "inputStateKeys": [
        "ui.posWorkspace.input.deliverOrder.orderId"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "posWorkspace__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.defs.ts",
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
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
