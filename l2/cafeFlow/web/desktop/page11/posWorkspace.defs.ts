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
      "id": "sec_orderBoard",
      "type": "section",
      "sectionName": "orderBoard",
      "titleKey": "section.orderBoard.title",
      "mode": "discover",
      "order": 1,
      "organisms": [
        {
          "id": "org_orderBoardCards",
          "type": "organism",
          "organismName": "orderBoardCards",
          "titleKey": "organism.orderBoardCards.title",
          "purpose": "Exibir pedidos do turno atual como cartões com status, tipo, mesa e prioridade, permitindo seleção para entrega.",
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
            "Filtrar pedidos do turno atualmente aberto",
            "Ordenar por data de criação (ordem de chegada)"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int_orderBoard_list",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.viewOrderBoard",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_createOrder",
      "type": "section",
      "sectionName": "createOrder",
      "titleKey": "section.createOrder.title",
      "mode": "execute",
      "order": 2,
      "organisms": [
        {
          "id": "org_createOrderForm",
          "type": "organism",
          "organismName": "createOrderForm",
          "titleKey": "organism.createOrderForm.title",
          "purpose": "Formulário para lançar novo pedido no POS com tipo, mesa, itens e prioridade.",
          "userActions": [
            "createOrder"
          ],
          "requiredEntities": [
            "Order",
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
          "rulesApplied": [
            "Decrementar estoque conforme ingredientes vinculados",
            "Gerar número do pedido",
            "Definir status inicial 'registered'"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int_createOrder_form",
              "intent": "commandForm",
              "stateKey": "ui.posWorkspace.action.createOrder.status",
              "submitAction": "createOrder",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_deliverOrder",
      "type": "section",
      "sectionName": "deliverOrder",
      "titleKey": "section.deliverOrder.title",
      "mode": "execute",
      "order": 3,
      "organisms": [
        {
          "id": "org_deliverOrderSheet",
          "type": "organism",
          "organismName": "deliverOrderSheet",
          "titleKey": "organism.deliverOrderSheet.title",
          "purpose": "Confirmar entrega do pedido selecionado ao cliente, validando status 'ready'.",
          "userActions": [
            "deliverOrder"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId"
          ],
          "writesFields": [
            "orderId",
            "status",
            "deliveredAt",
            "updatedAt"
          ],
          "rulesApplied": [
            "Validar status atual 'ready'",
            "Atualizar para 'delivered' registrando momento da entrega"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int_deliverOrder_form",
              "intent": "commandForm",
              "stateKey": "ui.posWorkspace.action.deliverOrder.status",
              "submitAction": "deliverOrder",
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
    "id": "page11_mobile_cards",
    "type": "page",
    "sections": [
      {
        "id": "sec_orderBoard",
        "type": "section",
        "sectionName": "orderBoard",
        "titleKey": "section.orderBoard.title",
        "mode": "discover",
        "order": 1,
        "organisms": [
          {
            "id": "org_orderBoardCards",
            "type": "organism",
            "organismName": "orderBoardCards",
            "titleKey": "organism.orderBoardCards.title",
            "purpose": "Exibir pedidos do turno atual como cartões com status, tipo, mesa e prioridade, permitindo seleção para entrega.",
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
              "Filtrar pedidos do turno atualmente aberto",
              "Ordenar por data de criação (ordem de chegada)"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int_orderBoard_list",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.orderBoard.list.title",
                "source": "ui.posWorkspace.data.viewOrderBoard",
                "binding": "db_viewOrderBoard",
                "emptyKey": "empty.orderBoard",
                "displayHint": "card",
                "stateKey": "ui.posWorkspace.data.viewOrderBoard",
                "fields": [],
                "columns": [
                  {
                    "id": "col_orderId",
                    "field": "orderId",
                    "labelKey": "column.orderId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col_status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 2,
                    "required": false,
                    "inputType": "badge",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col_orderType",
                    "field": "orderType",
                    "labelKey": "column.orderType",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col_tableNumber",
                    "field": "tableNumber",
                    "labelKey": "column.tableNumber",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col_priority",
                    "field": "priority",
                    "labelKey": "column.priority",
                    "order": 5,
                    "required": false,
                    "inputType": "badge",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "col_createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 6,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "filters": [
                  {
                    "id": "flt_status",
                    "field": "status",
                    "labelKey": "filter.status",
                    "order": 1,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  },
                  {
                    "id": "flt_orderType",
                    "field": "orderType",
                    "labelKey": "filter.orderType",
                    "order": 2,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.posWorkspace.data.viewOrderBoard"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb_refresh",
                    "action": "viewOrderBoard",
                    "labelKey": "action.viewOrderBoard.label",
                    "order": 1,
                    "displayHint": "icon",
                    "actionKey": "viewOrderBoard"
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
        "id": "sec_createOrder",
        "type": "section",
        "sectionName": "createOrder",
        "titleKey": "section.createOrder.title",
        "mode": "execute",
        "order": 2,
        "organisms": [
          {
            "id": "org_createOrderForm",
            "type": "organism",
            "organismName": "createOrderForm",
            "titleKey": "organism.createOrderForm.title",
            "purpose": "Formulário para lançar novo pedido no POS com tipo, mesa, itens e prioridade.",
            "userActions": [
              "createOrder"
            ],
            "requiredEntities": [
              "Order",
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
            "rulesApplied": [
              "Decrementar estoque conforme ingredientes vinculados",
              "Gerar número do pedido",
              "Definir status inicial 'registered'"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int_createOrder_form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.createOrder.form.title",
                "source": "ui.posWorkspace.output.createOrder",
                "binding": "db_createOrder",
                "submitAction": "createOrder",
                "displayHint": "form",
                "stateKey": "ui.posWorkspace.action.createOrder.status",
                "fields": [
                  {
                    "id": "fld_orderType",
                    "field": "orderType",
                    "labelKey": "field.orderType",
                    "order": 1,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderType"
                  },
                  {
                    "id": "fld_tableNumber",
                    "field": "tableNumber",
                    "labelKey": "field.tableNumber",
                    "order": 2,
                    "required": false,
                    "inputType": "number",
                    "stateKey": "ui.posWorkspace.input.createOrder.tableNumber"
                  },
                  {
                    "id": "fld_orderItems",
                    "field": "orderItems",
                    "labelKey": "field.orderItems",
                    "order": 3,
                    "required": true,
                    "inputType": "composite",
                    "stateKey": "ui.posWorkspace.input.createOrder.orderItems"
                  },
                  {
                    "id": "fld_priority",
                    "field": "priority",
                    "labelKey": "field.priority",
                    "order": 4,
                    "required": false,
                    "inputType": "toggle",
                    "stateKey": "ui.posWorkspace.input.createOrder.priority"
                  },
                  {
                    "id": "fld_priorityReason",
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
                    "id": "act_createOrder",
                    "action": "createOrder",
                    "labelKey": "action.createOrder.submit",
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
        "id": "sec_deliverOrder",
        "type": "section",
        "sectionName": "deliverOrder",
        "titleKey": "section.deliverOrder.title",
        "mode": "execute",
        "order": 3,
        "organisms": [
          {
            "id": "org_deliverOrderSheet",
            "type": "organism",
            "organismName": "deliverOrderSheet",
            "titleKey": "organism.deliverOrderSheet.title",
            "purpose": "Confirmar entrega do pedido selecionado ao cliente, validando status 'ready'.",
            "userActions": [
              "deliverOrder"
            ],
            "requiredEntities": [
              "Order"
            ],
            "readsFields": [
              "orderId"
            ],
            "writesFields": [
              "orderId",
              "status",
              "deliveredAt",
              "updatedAt"
            ],
            "rulesApplied": [
              "Validar status atual 'ready'",
              "Atualizar para 'delivered' registrando momento da entrega"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int_deliverOrder_form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.deliverOrder.form.title",
                "source": "ui.posWorkspace.output.deliverOrder",
                "binding": "db_deliverOrder",
                "submitAction": "deliverOrder",
                "emptyKey": "empty.deliverOrder",
                "displayHint": "bottomSheet",
                "stateKey": "ui.posWorkspace.action.deliverOrder.status",
                "fields": [
                  {
                    "id": "fld_deliverOrderId",
                    "field": "orderId",
                    "labelKey": "field.orderId",
                    "order": 1,
                    "required": true,
                    "inputType": "text",
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
                    "id": "act_deliverOrder",
                    "action": "deliverOrder",
                    "labelKey": "action.deliverOrder.submit",
                    "order": 1,
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
      "id": "db_viewOrderBoard",
      "source": "query",
      "entity": "Order",
      "command": "viewOrderBoard",
      "description": "Lista paginada de pedidos do turno atual",
      "stateKey": "ui.posWorkspace.data.viewOrderBoard",
      "inputStateKeys": []
    },
    {
      "id": "db_createOrder",
      "source": "command",
      "entity": "Order",
      "command": "createOrder",
      "description": "Cria novo pedido com itens e decremento de estoque",
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
      "id": "db_deliverOrder",
      "source": "command",
      "entity": "Order",
      "command": "deliverOrder",
      "description": "Marca pedido selecionado como entregue",
      "stateKey": "ui.posWorkspace.output.deliverOrder",
      "inputStateKeys": [
        "ui.posWorkspace.input.deliverOrder.orderId"
      ]
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
