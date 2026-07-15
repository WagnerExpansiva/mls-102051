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
    "layoutId": "page11_mobile_cards"
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
    "section.orderBoard.title": "Painel de Pedidos",
    "section.createOrder.title": "Novo Pedido",
    "section.deliverOrder.title": "Entregar Pedido",
    "organism.orderBoardCards.title": "Pedidos do Turno",
    "organism.createOrderForm.title": "Lançar Pedido",
    "organism.deliverOrderSheet.title": "Confirmar Entrega",
    "intention.orderBoard.list.title": "Fila de Pedidos",
    "intention.createOrder.form.title": "Dados do Pedido",
    "intention.deliverOrder.form.title": "Entrega ao Cliente",
    "column.orderId": "Pedido",
    "column.status": "Status",
    "column.orderType": "Tipo",
    "column.tableNumber": "Mesa",
    "column.priority": "Prioridade",
    "column.createdAt": "Criado em",
    "filter.status": "Filtrar por status",
    "filter.orderType": "Filtrar por tipo",
    "field.orderType": "Tipo de Pedido",
    "field.tableNumber": "Número da Mesa",
    "field.orderItems": "Itens do Pedido",
    "field.priority": "Pedido Prioritário",
    "field.priorityReason": "Motivo da Prioridade",
    "field.orderId": "Pedido Selecionado",
    "action.viewOrderBoard.label": "Atualizar Painel",
    "action.selectForDelivery": "Selecionar para Entrega",
    "action.createOrder.submit": "Confirmar Pedido",
    "action.deliverOrder.submit": "Confirmar Entrega",
    "action.createOrder.success": "Pedido lançado com sucesso e enviado à cozinha.",
    "action.createOrder.error": "Erro ao lançar pedido. Verifique os dados e tente novamente.",
    "action.deliverOrder.success": "Pedido entregue ao cliente com sucesso.",
    "action.deliverOrder.error": "Não foi possível entregar o pedido. Verifique se o status atual é 'pronto'.",
    "empty.orderBoard": "Nenhum pedido no painel. Lance um novo pedido para começar.",
    "empty.deliverOrder": "Selecione um pedido pronto no painel para entregar.",
    "page.posWorkspace.title": "POS — Lançamento e acompanhamento de pedidos",
    "section.board.title": "Painel de Pedidos",
    "section.review.title": "Resumo das Ações",
    "intention.board.title": "Painel de Pedidos",
    "intention.createOrder.title": "Lançar Novo Pedido",
    "intention.deliverOrder.title": "Entregar Pedido Selecionado",
    "intention.review.title": "Resumo das Ações",
    "field.orderType.label": "Tipo de Pedido",
    "field.tableNumber.label": "Número da Mesa",
    "field.orderItems.label": "Itens do Pedido",
    "field.priority.label": "Prioridade",
    "field.priorityReason.label": "Justificativa de Prioridade",
    "field.orderId.label": "Pedido",
    "field.status.label": "Status",
    "field.receivedAt.label": "Recebido em",
    "field.inPreparationAt.label": "Em Preparo desde",
    "field.readyAt.label": "Pronto desde",
    "field.createdAt.label": "Criado em",
    "action.createOrder.label": "Lançar Pedido",
    "action.deliverOrder.label": "Entregar",
    "action.selectOrder.label": "Selecionar",
    "empty.board": "Nenhum pedido encontrado no turno atual.",
    "empty.createOrder": "Preencha os dados do pedido para lançá-lo.",
    "empty.review": "Nenhuma ação realizada ainda.",
    "lane.registered": "Registrado",
    "lane.received": "Recebido",
    "lane.inPreparation": "Em Preparo",
    "lane.ready": "Pronto",
    "lane.delivered": "Entregue",
    "sec.board.title": "Sec board",
    "org.orderKanbanBoard.title": "Visualizar pedidos agrupados por status em colunas kanban, identificar gargalos e selecionar pedidos para entrega",
    "sec.createOrder.title": "Sec create Order",
    "org.createOrderForm.title": "Formulário para lançar novo pedido no POS com tipo, mesa, itens e prioridade opcional",
    "sec.deliverOrder.title": "Sec deliver Order",
    "org.deliverOrderPanel.title": "Entregar pedido selecionado ao cliente, confirmando a entrega de um pedido com status pronto",
    "sec.review.title": "Sec review",
    "org.reviewSummary.title": "Revisar o contexto e o resultado das ações principais da página: pedidos criados e entregas realizadas",
    "section.queue.title": "Painel de Pedidos",
    "section.queue.deliverTitle": "Entregar Pedido",
    "column.priorityReason": "Motivo",
    "column.receivedAt": "Recebido",
    "column.inPreparationAt": "Em Preparo",
    "column.readyAt": "Pronto",
    "column.deliveredAt": "Entregue em",
    "column.updatedAt": "Atualizado em",
    "action.refresh.label": "Atualizar Painel",
    "action.confirmDeliver.label": "Confirmar Entrega",
    "empty.queue": "Nenhum pedido no painel. Lance um novo pedido para começar.",
    "queueSection.title": "Queue Section",
    "orderBoard.title": "Painel ao vivo dos pedidos do turno atual, ordenados por chegada, com status, prioridade e ação contextual de entrega para pedidos prontos",
    "createOrderSection.title": "Create Order Section",
    "createOrderForm.title": "Formulário de lançamento de pedido: tipo, mesa, itens, prioridade opcional e confirmação para envio à cozinha",
    "reviewSection.title": "Review Section",
    "actionSummary.title": "Resumo do último pedido criado e da última entrega realizada, com feedback textual dismissible de sucesso ou erro"
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
