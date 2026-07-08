/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenQueue.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "kitchenQueue",
  "pageName": "Fila da cozinha — Preparo de pedidos",
  "moduleName": "cafeFlow",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:orderLifecycle",
    "operation:viewKitchenBoard",
    "operation:updateOrderStatus"
  ],
  "operationIds": [
    "viewKitchenBoard",
    "updateOrderStatus"
  ],
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
  "contractRef": {
    "defPath": "_102051_/l2/cafeFlow/web/contracts/kitchenQueue.defs.ts",
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/kitchenQueue.ts"
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.defs.ts",
    "layoutId": "page11"
  },
  "states": [
    {
      "stateKey": "ui.kitchenQueue.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenQueue.action.viewKitchenBoard.status",
      "name": "viewKitchenBoardState",
      "kind": "actionStatus",
      "actionRef": "viewKitchenBoard",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard",
      "name": "viewKitchenBoardData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "viewKitchenBoard",
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
      "stateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
      "name": "updateOrderStatusState",
      "kind": "actionStatus",
      "actionRef": "updateOrderStatus",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.kitchenQueue.input.updateOrderStatus.status",
      "name": "updateOrderStatusStatus",
      "kind": "input",
      "contractRef": {
        "commandName": "updateOrderStatus",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenQueue.output.updateOrderStatus",
      "name": "OutputUpdateOrderStatus",
      "kind": "commandOutput",
      "defaultValue": null
    }
  ],
  "actions": [
    {
      "actionId": "viewKitchenBoard",
      "kind": "query",
      "commandRef": "viewKitchenBoard",
      "routeKey": "cafeFlow.orderLifecycle.viewKitchenBoard",
      "purpose": "Visualizar fila da cozinha",
      "methodName": "loadViewKitchenBoard",
      "handlerName": "handleViewKitchenBoardClick",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.kitchenQueue.data.viewKitchenBoard"
      ],
      "statusStateKey": "ui.kitchenQueue.action.viewKitchenBoard.status"
    },
    {
      "actionId": "updateOrderStatus",
      "kind": "command",
      "commandRef": "updateOrderStatus",
      "routeKey": "cafeFlow.orderLifecycle.updateOrderStatus",
      "purpose": "Atualizar status do pedido na cozinha",
      "methodName": "updateOrderStatus",
      "handlerName": "handleUpdateOrderStatusClick",
      "inputStateKeys": [
        "ui.kitchenQueue.input.updateOrderStatus.status"
      ],
      "outputStateKeys": [
        "ui.kitchenQueue.output.updateOrderStatus"
      ],
      "statusStateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
      "refreshActionIds": [
        "viewKitchenBoard"
      ]
    },
    {
      "actionId": "set.updateOrderStatusStatus",
      "kind": "stateSetter",
      "stateKey": "ui.kitchenQueue.input.updateOrderStatus.status",
      "methodName": "setUpdateOrderStatusStatus",
      "handlerName": "handleUpdateOrderStatusStatusChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "viewKitchenBoard",
      "stateKey": "ui.kitchenQueue.data.viewKitchenBoard"
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
    "kitchenQueue.section.queue.title": "Fila da cozinha",
    "kitchenQueue.queueCards.title": "Fila de pedidos da cozinha",
    "kitchenQueue.queueCards.list.title": "Pedidos em fila",
    "kitchenQueue.queueCards.transition.title": "Atualizar status do pedido",
    "kitchenQueue.queueCards.summary.title": "Resumo do pedido selecionado",
    "kitchenQueue.field.orderId": "Pedido",
    "kitchenQueue.field.status": "Status",
    "kitchenQueue.field.orderType": "Tipo",
    "kitchenQueue.field.tableNumber": "Mesa",
    "kitchenQueue.field.priority": "Prioridade",
    "kitchenQueue.field.priorityReason": "Motivo da prioridade",
    "kitchenQueue.field.receivedAt": "Recebido em",
    "kitchenQueue.field.inPreparationAt": "Em preparo desde",
    "kitchenQueue.field.createdAt": "Criado em",
    "kitchenQueue.action.startOrFinish": "Atualizar status",
    "kitchenQueue.action.updateStatus": "Confirmar status",
    "kitchenQueue.workflowQueue.title": "Fila operacional por status",
    "kitchenQueue.workflowQueue.list.title": "Fila ativa",
    "kitchenQueue.workflowQueue.transition.title": "Transição de status",
    "kitchenQueue.workflowQueue.summary.title": "Detalhes do pedido",
    "kitchenQueue.kanbanBoard.title": "Pipeline de preparo",
    "kitchenQueue.kanbanBoard.lanes.title": "Pedidos por status",
    "kitchenQueue.kanbanBoard.transition.title": "Mover pedido de status",
    "kitchenQueue.kanbanBoard.summary.title": "Resumo do pedido"
  },
  "automation": {
    "statePrefix": "ui.kitchenQueue",
    "stateKeys": [
      "ui.kitchenQueue.status",
      "ui.kitchenQueue.action.viewKitchenBoard.status",
      "ui.kitchenQueue.data.viewKitchenBoard",
      "ui.kitchenQueue.action.updateOrderStatus.status",
      "ui.kitchenQueue.input.updateOrderStatus.status",
      "ui.kitchenQueue.output.updateOrderStatus"
    ],
    "actionIds": [
      "viewKitchenBoard",
      "updateOrderStatus",
      "set.updateOrderStatusStatus"
    ]
  }
};

export const pipeline = [
  {
    "id": "kitchenQueue__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/kitchenQueue.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/kitchenQueue.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/kitchenQueue.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "kitchenQueue__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
