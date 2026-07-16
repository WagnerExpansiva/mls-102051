/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/posWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posWorkspace",
  "pageName": "POS — Lançamento e acompanhamento de pedidos",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowPosWorkspaceBase",
  "routePattern": "/cafeFlow/posWorkspace",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:orderLifecycle",
    "operation:createOrder",
    "operation:viewOrderBoard",
    "operation:deliverOrder"
  ],
  "operationIds": [
    "createOrder",
    "viewOrderBoard",
    "deliverOrder"
  ],
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
  "contractRef": {
    "defPath": "_102051_/l2/cafeFlow/web/contracts/posWorkspace.defs.ts",
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts"
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.defs.ts",
    "layoutId": "page11-mobile-cards"
  },
  "states": [
    {
      "stateKey": "ui.posWorkspace.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.action.createOrder.status",
      "name": "createOrderState",
      "kind": "actionStatus",
      "actionRef": "createOrder",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.posWorkspace.input.createOrder.orderType",
      "name": "createOrderOrderType",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createOrder",
        "direction": "input",
        "field": "orderType"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.createOrder.tableNumber",
      "name": "createOrderTableNumber",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createOrder",
        "direction": "input",
        "field": "tableNumber"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.createOrder.orderItems",
      "name": "createOrderOrderItems",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createOrder",
        "direction": "input",
        "field": "orderItems"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.createOrder.priority",
      "name": "createOrderPriority",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createOrder",
        "direction": "input",
        "field": "priority"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.createOrder.priorityReason",
      "name": "createOrderPriorityReason",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createOrder",
        "direction": "input",
        "field": "priorityReason"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.output.createOrder",
      "name": "createOrderOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "createOrder",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.posWorkspace.action.createOrder.error",
      "name": "createOrderError",
      "kind": "actionError",
      "actionRef": "createOrder",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.action.viewOrderBoard.status",
      "name": "viewOrderBoardState",
      "kind": "actionStatus",
      "actionRef": "viewOrderBoard",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.posWorkspace.data.viewOrderBoard",
      "name": "viewOrderBoardData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "viewOrderBoard",
        "direction": "output"
      },
      "outputShape": "paginated",
      "collection": false,
      "defaultValue": {
        "items": [],
        "total": 0
      }
    },
    {
      "stateKey": "ui.posWorkspace.action.deliverOrder.status",
      "name": "deliverOrderState",
      "kind": "actionStatus",
      "actionRef": "deliverOrder",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.posWorkspace.input.deliverOrder.orderId",
      "name": "deliverOrderOrderId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "deliverOrder",
        "direction": "input",
        "field": "orderId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.output.deliverOrder",
      "name": "deliverOrderOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "deliverOrder",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.posWorkspace.action.deliverOrder.error",
      "name": "deliverOrderError",
      "kind": "actionError",
      "actionRef": "deliverOrder",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "createOrder",
      "kind": "command",
      "commandRef": "createOrder",
      "routeKey": "cafeFlow.orderLifecycle.createOrder",
      "purpose": "Lançar pedido no POS",
      "methodName": "createOrder",
      "handlerName": "handleCreateOrderClick",
      "inputStateKeys": [
        "ui.posWorkspace.input.createOrder.orderType",
        "ui.posWorkspace.input.createOrder.tableNumber",
        "ui.posWorkspace.input.createOrder.orderItems",
        "ui.posWorkspace.input.createOrder.priority",
        "ui.posWorkspace.input.createOrder.priorityReason"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.posWorkspace.output.createOrder"
      ],
      "statusStateKey": "ui.posWorkspace.action.createOrder.status",
      "errorStateKey": "ui.posWorkspace.action.createOrder.error",
      "feedback": {
        "successMessageKey": "action.createOrder.success",
        "errorMessageKey": "action.createOrder.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.posWorkspace.input.createOrder.orderType",
        "ui.posWorkspace.input.createOrder.tableNumber",
        "ui.posWorkspace.input.createOrder.orderItems",
        "ui.posWorkspace.input.createOrder.priority",
        "ui.posWorkspace.input.createOrder.priorityReason"
      ],
      "refreshActionIds": [
        "viewOrderBoard"
      ]
    },
    {
      "actionId": "viewOrderBoard",
      "kind": "query",
      "commandRef": "viewOrderBoard",
      "routeKey": "cafeFlow.orderLifecycle.viewOrderBoard",
      "purpose": "Visualizar painel de pedidos",
      "methodName": "loadViewOrderBoard",
      "handlerName": "handleViewOrderBoardClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.posWorkspace.data.viewOrderBoard"
      ],
      "statusStateKey": "ui.posWorkspace.action.viewOrderBoard.status"
    },
    {
      "actionId": "deliverOrder",
      "kind": "command",
      "commandRef": "deliverOrder",
      "routeKey": "cafeFlow.orderLifecycle.deliverOrder",
      "purpose": "Entregar pedido ao cliente",
      "methodName": "deliverOrder",
      "handlerName": "handleDeliverOrderClick",
      "inputStateKeys": [
        "ui.posWorkspace.input.deliverOrder.orderId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.posWorkspace.input.deliverOrder.orderId"
      ],
      "outputStateKeys": [
        "ui.posWorkspace.output.deliverOrder"
      ],
      "statusStateKey": "ui.posWorkspace.action.deliverOrder.status",
      "errorStateKey": "ui.posWorkspace.action.deliverOrder.error",
      "feedback": {
        "successMessageKey": "action.deliverOrder.success",
        "errorMessageKey": "action.deliverOrder.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.posWorkspace.input.deliverOrder.orderId"
      ],
      "refreshActionIds": [
        "viewOrderBoard"
      ]
    },
    {
      "actionId": "set.createOrderOrderType",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.createOrder.orderType",
      "methodName": "setCreateOrderOrderType",
      "handlerName": "handleCreateOrderOrderTypeChange"
    },
    {
      "actionId": "set.createOrderTableNumber",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.createOrder.tableNumber",
      "methodName": "setCreateOrderTableNumber",
      "handlerName": "handleCreateOrderTableNumberChange"
    },
    {
      "actionId": "set.createOrderOrderItems",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.createOrder.orderItems",
      "methodName": "setCreateOrderOrderItems",
      "handlerName": "handleCreateOrderOrderItemsChange"
    },
    {
      "actionId": "set.createOrderPriority",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.createOrder.priority",
      "methodName": "setCreateOrderPriority",
      "handlerName": "handleCreateOrderPriorityChange"
    },
    {
      "actionId": "set.createOrderPriorityReason",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.createOrder.priorityReason",
      "methodName": "setCreateOrderPriorityReason",
      "handlerName": "handleCreateOrderPriorityReasonChange"
    },
    {
      "actionId": "set.deliverOrderOrderId",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.deliverOrder.orderId",
      "methodName": "setDeliverOrderOrderId",
      "handlerName": "handleDeliverOrderOrderIdChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "viewOrderBoard",
      "stateKey": "ui.posWorkspace.data.viewOrderBoard"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt",
      "en"
    ]
  },
  "i18n": {
    "page.title": "POS — Lançamento e acompanhamento de pedidos",
    "section.discover.title": "Painel de Pedidos",
    "section.createOrder.title": "Novo Pedido",
    "section.deliverOrder.title": "Entregar Pedido",
    "section.review.title": "Resumo",
    "intent.viewOrderBoard.title": "Painel de Pedidos",
    "intent.createOrder.title": "Lançar Pedido",
    "intent.deliverOrder.title": "Confirmar Entrega",
    "intent.review.title": "Resumo das Ações",
    "field.orderType.label": "Tipo de Pedido",
    "field.tableNumber.label": "Número da Mesa",
    "field.orderItems.label": "Itens do Pedido",
    "field.priority.label": "Pedido Prioritário",
    "field.priorityReason.label": "Motivo da Prioridade",
    "field.orderId.label": "Pedido",
    "column.orderId.label": "Pedido",
    "column.status.label": "Status",
    "column.orderType.label": "Tipo",
    "column.tableNumber.label": "Mesa",
    "column.priority.label": "Prioridade",
    "column.priorityReason.label": "Motivo Prioridade",
    "column.receivedAt.label": "Recebido em",
    "column.inPreparationAt.label": "Em Preparo desde",
    "column.readyAt.label": "Pronto às",
    "column.createdAt.label": "Criado às",
    "filter.status.label": "Status",
    "filter.orderType.label": "Tipo",
    "filter.priority.label": "Prioridade",
    "toolbar.refresh.label": "Atualizar",
    "rowAction.selectForDelivery.label": "Selecionar para Entrega",
    "action.createOrder.label": "Confirmar Pedido",
    "action.deliverOrder.label": "Entregar",
    "action.createOrder.success": "Pedido criado e enviado à cozinha com sucesso",
    "action.createOrder.error": "Erro ao criar pedido",
    "action.deliverOrder.success": "Pedido entregue ao cliente com sucesso",
    "action.deliverOrder.error": "Erro ao entregar pedido",
    "empty.orderBoard": "Nenhum pedido encontrado no turno atual. Lance um novo pedido para começar.",
    "sec.discover.title": "Sec discover",
    "org.order.board.title": "Visualizar painel de pedidos como cards com status e ações de entrega",
    "sec.create.order.title": "Sec create order",
    "org.create.order.title": "Lançar pedido no POS com tipo, itens e prioridade",
    "sec.deliver.order.title": "Sec deliver order",
    "org.deliver.order.title": "Entregar pedido selecionado ao cliente",
    "sec.review.title": "Sec review",
    "org.review.title": "Revisar o contexto e o resultado das ações principais da página",
    "page.posWorkspace.title": "POS — Lançamento e acompanhamento de pedidos",
    "section.orderBoard.title": "Painel de Pedidos",
    "section.orderBoard.empty": "Nenhum pedido no turno atual",
    "organism.orderBoard.title": "Pedidos do Turno",
    "organism.orderBoard.empty": "Nenhum pedido encontrado",
    "organism.createOrderForm.title": "Lançar Pedido",
    "intent.viewOrderBoard.empty": "Nenhum pedido no turno atual",
    "action.viewOrderBoard.label": "Atualizar Painel"
  },
  "automation": {
    "statePrefix": "ui.posWorkspace",
    "stateKeys": [
      "ui.posWorkspace.status",
      "ui.posWorkspace.action.createOrder.status",
      "ui.posWorkspace.input.createOrder.orderType",
      "ui.posWorkspace.input.createOrder.tableNumber",
      "ui.posWorkspace.input.createOrder.orderItems",
      "ui.posWorkspace.input.createOrder.priority",
      "ui.posWorkspace.input.createOrder.priorityReason",
      "ui.posWorkspace.output.createOrder",
      "ui.posWorkspace.action.createOrder.error",
      "ui.posWorkspace.action.viewOrderBoard.status",
      "ui.posWorkspace.data.viewOrderBoard",
      "ui.posWorkspace.action.deliverOrder.status",
      "ui.posWorkspace.input.deliverOrder.orderId",
      "ui.posWorkspace.output.deliverOrder",
      "ui.posWorkspace.action.deliverOrder.error"
    ],
    "actionIds": [
      "createOrder",
      "viewOrderBoard",
      "deliverOrder",
      "set.createOrderOrderType",
      "set.createOrderTableNumber",
      "set.createOrderOrderItems",
      "set.createOrderPriority",
      "set.createOrderPriorityReason",
      "set.deliverOrderOrderId"
    ]
  }
};

export const pipeline = [
  {
    "id": "posWorkspace__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/posWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "posWorkspace__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
