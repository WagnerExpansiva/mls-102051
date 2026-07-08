/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/posOrder.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posOrder",
  "pageName": "POS — Lançamento e entrega de pedidos",
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
    "workspaceId": "posOrder",
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
        "O atendente revisa o resumo do pedido, verifica alertas de estoque insuficiente e confirma o envio à cozinha, recebendo o número do pedido.",
        "O cozinheiro visualiza o pedido na fila da cozinha e inicia o preparo, marcando o pedido como 'em preparo'.",
        "O cozinheiro finaliza o preparo e marca o pedido como 'pronto', avisando o atendente.",
        "O atendente consulta o painel de pedidos, confirma que o pedido está pronto e entrega ao cliente, marcando como entregue."
      ],
      "operations": [
        {
          "operationId": "createOrder",
          "commandName": "createOrder",
          "steps": [
            "O atendente seleciona o tipo de pedido (mesa ou takeout) e informa o número da mesa quando aplicável.",
            "O atendente busca itens do cardápio e adiciona os itens solicitados pelo cliente ao pedido.",
            "O sistema verifica alertas de estoque insuficiente nos ingredientes vinculados aos itens selecionados.",
            "O atendente confirma o pedido; o sistema cria o pedido com status 'registered', decrementa o estoque conforme os ingredientes e gera o número do pedido para acompanhamento."
          ]
        },
        {
          "operationId": "viewOrderBoard",
          "commandName": "viewOrderBoard",
          "steps": [
            "O atendente abre o painel de pedidos no POS.",
            "O sistema lista todos os pedidos do turno atual com seus respectivos status.",
            "O atendente visualiza quais pedidos estão em preparo e quais já estão prontos.",
            "O atendente identifica os pedidos prontos para entregar ao cliente."
          ]
        },
        {
          "operationId": "deliverOrder",
          "commandName": "deliverOrder",
          "steps": [
            "O atendente seleciona no painel de pedidos um pedido cujo status atual é 'pronto'.",
            "O atendente confirma a entrega ao cliente (na mesa ou no balcão).",
            "O sistema valida que o status atual é 'pronto' e atualiza o pedido para status 'entregue', registrando o timestamp em deliveredAt."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102051_/l2/cafeFlow/web/contracts/posOrder.defs.ts",
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/posOrder.ts"
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/posOrder.defs.ts",
    "layoutId": "posOrder.layout"
  },
  "states": [
    {
      "stateKey": "ui.posOrder.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.action.createOrder.status",
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
      "stateKey": "ui.posOrder.input.createOrder.orderType",
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
      "stateKey": "ui.posOrder.input.createOrder.tableNumber",
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
      "stateKey": "ui.posOrder.input.createOrder.priority",
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
      "stateKey": "ui.posOrder.input.createOrder.priorityReason",
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
      "stateKey": "ui.posOrder.action.viewOrderBoard.status",
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
      "stateKey": "ui.posOrder.input.viewOrderBoard.statusFilter",
      "name": "viewOrderBoardStatusFilter",
      "kind": "input",
      "contractRef": {
        "commandName": "viewOrderBoard",
        "direction": "input",
        "field": "statusFilter"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.data.viewOrderBoard",
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
      "stateKey": "ui.posOrder.action.deliverOrder.status",
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
      "stateKey": "ui.posOrder.businessContext.activeCompanyId",
      "name": "activeCompanyId",
      "kind": "businessContext",
      "source": "businessContext.activeCompanyId",
      "targetRef": "Order.shiftId",
      "required": true,
      "selector": "company",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.layout.field-create-order-orderId",
      "name": "LayoutFieldCreateOrderOrderId",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.layout.field-create-order-status",
      "name": "LayoutFieldCreateOrderStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.layout.field-create-order-createdAt",
      "name": "LayoutFieldCreateOrderCreatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.layout.field-deliver-order-orderId",
      "name": "LayoutFieldDeliverOrderOrderId",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.layout.field-deliver-order-status",
      "name": "LayoutFieldDeliverOrderStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.layout.field-deliver-order-deliveredAt",
      "name": "LayoutFieldDeliverOrderDeliveredAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.layout.field-deliver-order-orderType",
      "name": "LayoutFieldDeliverOrderOrderType",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posOrder.layout.field-deliver-order-tableNumber",
      "name": "LayoutFieldDeliverOrderTableNumber",
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
        "ui.posOrder.input.createOrder.orderType",
        "ui.posOrder.input.createOrder.tableNumber",
        "ui.posOrder.input.createOrder.priority",
        "ui.posOrder.input.createOrder.priorityReason"
      ],
      "outputStateKeys": [],
      "statusStateKey": "ui.posOrder.action.createOrder.status",
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
      "inputStateKeys": [
        "ui.posOrder.input.viewOrderBoard.statusFilter"
      ],
      "outputStateKeys": [
        "ui.posOrder.data.viewOrderBoard"
      ],
      "statusStateKey": "ui.posOrder.action.viewOrderBoard.status"
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
      "outputStateKeys": [],
      "statusStateKey": "ui.posOrder.action.deliverOrder.status",
      "refreshActionIds": [
        "viewOrderBoard"
      ]
    },
    {
      "actionId": "set.createOrderOrderType",
      "kind": "stateSetter",
      "stateKey": "ui.posOrder.input.createOrder.orderType",
      "methodName": "setCreateOrderOrderType",
      "handlerName": "handleCreateOrderOrderTypeChange"
    },
    {
      "actionId": "set.createOrderTableNumber",
      "kind": "stateSetter",
      "stateKey": "ui.posOrder.input.createOrder.tableNumber",
      "methodName": "setCreateOrderTableNumber",
      "handlerName": "handleCreateOrderTableNumberChange"
    },
    {
      "actionId": "set.createOrderPriority",
      "kind": "stateSetter",
      "stateKey": "ui.posOrder.input.createOrder.priority",
      "methodName": "setCreateOrderPriority",
      "handlerName": "handleCreateOrderPriorityChange"
    },
    {
      "actionId": "set.createOrderPriorityReason",
      "kind": "stateSetter",
      "stateKey": "ui.posOrder.input.createOrder.priorityReason",
      "methodName": "setCreateOrderPriorityReason",
      "handlerName": "handleCreateOrderPriorityReasonChange"
    },
    {
      "actionId": "set.viewOrderBoardStatusFilter",
      "kind": "stateSetter",
      "stateKey": "ui.posOrder.input.viewOrderBoard.statusFilter",
      "methodName": "setViewOrderBoardStatusFilter",
      "handlerName": "handleViewOrderBoardStatusFilterChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "viewOrderBoard",
      "stateKey": "ui.posOrder.data.viewOrderBoard"
    }
  ],
  "businessContextRefs": [
    {
      "operationId": "createOrder",
      "inputId": "shiftId",
      "contextKey": "activeCompanyId",
      "originRef": "businessContext.activeCompanyId",
      "targetRef": "Order.shiftId",
      "required": true,
      "description": "Turno aberto no momento do lançamento do pedido"
    }
  ],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt",
      "en"
    ]
  },
  "i18n": {
    "posOrder.section.main.title": "POS — Lançamento e entrega de pedidos",
    "posOrder.organism.createOrder.title": "Lançar pedido",
    "posOrder.intent.createOrder.form.title": "Novo pedido",
    "posOrder.intent.createOrder.summary.title": "Resumo do pedido criado",
    "posOrder.organism.viewOrderBoard.title": "Painel de pedidos",
    "posOrder.intent.viewOrderBoard.list.title": "Pedidos do turno atual",
    "posOrder.organism.deliverOrder.title": "Entregar pedido",
    "posOrder.intent.deliverOrder.confirm.title": "Confirmar entrega",
    "posOrder.intent.deliverOrder.summary.title": "Resumo da entrega",
    "posOrder.field.orderType.label": "Tipo do pedido",
    "posOrder.field.tableNumber.label": "Número da mesa",
    "posOrder.field.priority.label": "Prioridade",
    "posOrder.field.priorityReason.label": "Motivo da prioridade",
    "posOrder.field.orderId.label": "Número do pedido",
    "posOrder.field.status.label": "Status",
    "posOrder.field.createdAt.label": "Criado em",
    "posOrder.field.receivedAt.label": "Recebido em",
    "posOrder.field.inPreparationAt.label": "Em preparo desde",
    "posOrder.field.readyAt.label": "Pronto em",
    "posOrder.field.deliveredAt.label": "Entregue em",
    "posOrder.filter.statusFilter.label": "Filtrar por status",
    "posOrder.action.viewOrderBoard.label": "Atualizar painel"
  },
  "automation": {
    "statePrefix": "ui.posOrder",
    "stateKeys": [
      "ui.posOrder.status",
      "ui.posOrder.action.createOrder.status",
      "ui.posOrder.input.createOrder.orderType",
      "ui.posOrder.input.createOrder.tableNumber",
      "ui.posOrder.input.createOrder.priority",
      "ui.posOrder.input.createOrder.priorityReason",
      "ui.posOrder.action.viewOrderBoard.status",
      "ui.posOrder.input.viewOrderBoard.statusFilter",
      "ui.posOrder.data.viewOrderBoard",
      "ui.posOrder.action.deliverOrder.status",
      "ui.posOrder.businessContext.activeCompanyId",
      "ui.posOrder.layout.field-create-order-orderId",
      "ui.posOrder.layout.field-create-order-status",
      "ui.posOrder.layout.field-create-order-createdAt",
      "ui.posOrder.layout.field-deliver-order-orderId",
      "ui.posOrder.layout.field-deliver-order-status",
      "ui.posOrder.layout.field-deliver-order-deliveredAt",
      "ui.posOrder.layout.field-deliver-order-orderType",
      "ui.posOrder.layout.field-deliver-order-tableNumber"
    ],
    "actionIds": [
      "createOrder",
      "viewOrderBoard",
      "deliverOrder",
      "set.createOrderOrderType",
      "set.createOrderTableNumber",
      "set.createOrderPriority",
      "set.createOrderPriorityReason",
      "set.viewOrderBoardStatusFilter"
    ]
  }
};

export const pipeline = [
  {
    "id": "posOrder__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/posOrder.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/posOrder.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/posOrder.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "posOrder__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
