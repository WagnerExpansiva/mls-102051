/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/posWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posWorkspace",
  "pageName": "POS — Lançamento e acompanhamento de pedidos",
  "moduleName": "cafeFlow",
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
    "layoutId": "posWorkspace.page11"
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
      "contractRef": {
        "commandName": "createOrder",
        "direction": "input",
        "field": "priorityReason"
      },
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
      "stateKey": "ui.posWorkspace.output.createOrder",
      "name": "OutputCreateOrder",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.posWorkspace.output.deliverOrder",
      "name": "OutputDeliverOrder",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.posWorkspace.layout.fld-130",
      "name": "LayoutFld130",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.layout.fld-140",
      "name": "LayoutFld140",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.layout.fld-150",
      "name": "LayoutFld150",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.layout.fld-60",
      "name": "LayoutFld60",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.layout.fld-70",
      "name": "LayoutFld70",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.layout.fld-80",
      "name": "LayoutFld80",
      "kind": "layoutState",
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
      "outputStateKeys": [
        "ui.posWorkspace.output.createOrder"
      ],
      "statusStateKey": "ui.posWorkspace.action.createOrder.status",
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
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.posWorkspace.output.deliverOrder"
      ],
      "statusStateKey": "ui.posWorkspace.action.deliverOrder.status",
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
    "posWorkspace.section.orderBoard.title": "Painel de pedidos",
    "posWorkspace.organism.orderBoard.title": "Pedidos do turno",
    "posWorkspace.intent.orderBoardCards.title": "Fila de pedidos",
    "posWorkspace.action.refreshBoard": "Atualizar painel",
    "posWorkspace.section.createOrder.title": "Lançar pedido",
    "posWorkspace.organism.createOrder.title": "Novo pedido",
    "posWorkspace.intent.createOrder.details": "Detalhes do pedido",
    "posWorkspace.action.createOrder": "Confirmar pedido",
    "posWorkspace.section.review.title": "Revisão do pedido",
    "posWorkspace.organism.review.title": "Resumo e alertas",
    "posWorkspace.intent.reviewSummary.title": "Resumo do lançamento",
    "posWorkspace.section.deliver.title": "Entrega do pedido",
    "posWorkspace.organism.deliver.title": "Confirmar entrega",
    "posWorkspace.intent.deliverOrder.title": "Entregar pedido",
    "posWorkspace.action.deliverOrder": "Marcar como entregue",
    "posWorkspace.field.orderId": "Pedido",
    "posWorkspace.field.status": "Status",
    "posWorkspace.field.orderType": "Tipo do pedido",
    "posWorkspace.field.tableNumber": "Mesa",
    "posWorkspace.field.priority": "Prioridade",
    "posWorkspace.field.priorityReason": "Justificativa da prioridade",
    "posWorkspace.field.readyAt": "Pronto em",
    "posWorkspace.field.createdAt": "Criado em",
    "posWorkspace.field.orderItems": "Itens do pedido",
    "posWorkspace.section.pipeline.title": "Pipeline de pedidos",
    "posWorkspace.organism.kanban.title": "Pedidos por status",
    "posWorkspace.intent.kanban.title": "Pedidos em fluxo",
    "posWorkspace.section.queue.title": "Fila de pedidos",
    "posWorkspace.organism.queue.title": "Pedidos em andamento",
    "posWorkspace.intent.queue.title": "Fila do turno"
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
      "ui.posWorkspace.action.viewOrderBoard.status",
      "ui.posWorkspace.data.viewOrderBoard",
      "ui.posWorkspace.action.deliverOrder.status",
      "ui.posWorkspace.output.createOrder",
      "ui.posWorkspace.output.deliverOrder",
      "ui.posWorkspace.layout.fld-130",
      "ui.posWorkspace.layout.fld-140",
      "ui.posWorkspace.layout.fld-150",
      "ui.posWorkspace.layout.fld-60",
      "ui.posWorkspace.layout.fld-70",
      "ui.posWorkspace.layout.fld-80"
    ],
    "actionIds": [
      "createOrder",
      "viewOrderBoard",
      "deliverOrder",
      "set.createOrderOrderType",
      "set.createOrderTableNumber",
      "set.createOrderOrderItems",
      "set.createOrderPriority",
      "set.createOrderPriorityReason"
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
