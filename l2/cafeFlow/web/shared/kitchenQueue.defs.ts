/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenQueue.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "kitchenQueue",
  "pageName": "Fila da cozinha — Preparo de pedidos",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowKitchenQueueBase",
  "routePattern": "/cafeFlow/kitchenQueue",
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
    "layoutId": "kanban_pipeline_page11"
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
      "stateKey": "ui.kitchenQueue.input.updateOrderStatus.orderId",
      "name": "updateOrderStatusOrderId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "updateOrderStatus",
        "direction": "input",
        "field": "orderId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenQueue.input.updateOrderStatus.status",
      "name": "updateOrderStatusStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateOrderStatus",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenQueue.output.updateOrderStatus",
      "name": "updateOrderStatusOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "updateOrderStatus",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.kitchenQueue.action.updateOrderStatus.error",
      "name": "updateOrderStatusError",
      "kind": "actionError",
      "actionRef": "updateOrderStatus",
      "defaultValue": ""
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
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
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
        "ui.kitchenQueue.input.updateOrderStatus.orderId",
        "ui.kitchenQueue.input.updateOrderStatus.status"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.kitchenQueue.input.updateOrderStatus.orderId"
      ],
      "outputStateKeys": [
        "ui.kitchenQueue.output.updateOrderStatus"
      ],
      "statusStateKey": "ui.kitchenQueue.action.updateOrderStatus.status",
      "errorStateKey": "ui.kitchenQueue.action.updateOrderStatus.error",
      "feedback": {
        "successMessageKey": "action.updateOrderStatus.success",
        "errorMessageKey": "action.updateOrderStatus.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.kitchenQueue.input.updateOrderStatus.orderId",
        "ui.kitchenQueue.input.updateOrderStatus.status"
      ],
      "refreshActionIds": [
        "viewKitchenBoard"
      ]
    },
    {
      "actionId": "set.updateOrderStatusOrderId",
      "kind": "stateSetter",
      "stateKey": "ui.kitchenQueue.input.updateOrderStatus.orderId",
      "methodName": "setUpdateOrderStatusOrderId",
      "handlerName": "handleUpdateOrderStatusOrderIdChange"
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
    "page.kitchenQueue.title": "Fila da Cozinha",
    "section.kitchenBoard.title": "Fila de Pedidos",
    "section.kitchenBoard.empty": "Nenhum pedido na fila",
    "section.transitionPanel.title": "Atualizar Status do Pedido",
    "section.transitionPanel.empty": "Selecione um pedido na fila para atualizar o status",
    "column.orderId.label": "Pedido",
    "column.status.label": "Status",
    "column.orderType.label": "Tipo",
    "column.tableNumber.label": "Mesa",
    "column.priority.label": "Prioridade",
    "column.priorityReason.label": "Motivo Prioridade",
    "column.receivedAt.label": "Recebido",
    "column.inPreparationAt.label": "Iniciado",
    "column.createdAt.label": "Criado",
    "field.orderId.label": "Pedido",
    "field.status.label": "Novo Status",
    "action.viewKitchenBoard.label": "Atualizar fila",
    "action.updateOrderStatus.label": "Confirmar",
    "action.selectOrder.label": "Selecionar",
    "action.set.updateOrderStatusOrderId.label": "Selecionar pedido",
    "action.set.updateOrderStatusStatus.label": "Definir status",
    "action.updateOrderStatus.success": "Status do pedido atualizado com sucesso",
    "action.updateOrderStatus.error": "Erro ao atualizar status do pedido",
    "transition.startPreparation.label": "Iniciar preparo",
    "transition.markReady.label": "Marcar como pronto",
    "lane.received.title": "Recebido",
    "lane.inPreparation.title": "Em preparo",
    "lane.ready.title": "Pronto",
    "lane.received.empty": "Nenhum pedido recebido",
    "lane.inPreparation.empty": "Nenhum pedido em preparo",
    "lane.ready.empty": "Nenhum pedido pronto",
    "org.kitchen.board.title": "Exibir pedidos da cozinha agrupados por status em colunas kanban (recebido, em preparo, pronto) com transições contextuais por cartão",
    "org.transition.panel.title": "Exibir pedido selecionado com contexto e executar transicao de status com feedback textual",
    "section.kitchenQueue.title": "Fila de Preparo",
    "organism.kitchenBoard.title": "Pedidos na Cozinha",
    "intention.viewKitchenBoard.title": "Fila de Pedidos",
    "rowAction.startPreparation.label": "Iniciar Preparo",
    "rowAction.markReady.label": "Marcar Pronto",
    "toolbar.refresh.label": "Atualizar",
    "empty.kitchenQueue": "Nenhum pedido na fila",
    "kitchen.queue.section.title": "Kitchen queue section",
    "kitchen.board.title": "Live kitchen queue showing prioritized orders with inline contextual transition actions for advancing order status"
  },
  "automation": {
    "statePrefix": "ui.kitchenQueue",
    "stateKeys": [
      "ui.kitchenQueue.status",
      "ui.kitchenQueue.action.viewKitchenBoard.status",
      "ui.kitchenQueue.data.viewKitchenBoard",
      "ui.kitchenQueue.action.updateOrderStatus.status",
      "ui.kitchenQueue.input.updateOrderStatus.orderId",
      "ui.kitchenQueue.input.updateOrderStatus.status",
      "ui.kitchenQueue.output.updateOrderStatus",
      "ui.kitchenQueue.action.updateOrderStatus.error"
    ],
    "actionIds": [
      "viewKitchenBoard",
      "updateOrderStatus",
      "set.updateOrderStatusOrderId",
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
