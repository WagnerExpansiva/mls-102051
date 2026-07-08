/// <mls fileReference="_102051_/l4/operations/viewKitchenBoard.defs.ts" enhancement="_blank"/>

export const operationViewKitchenBoard = {
  "operationId": "viewKitchenBoard",
  "title": "Visualizar fila da cozinha",
  "actor": "cozinheiro",
  "entity": "Order",
  "kind": "view",
  "reads": [
    "Order",
    "OrderItem"
  ],
  "writes": [],
  "rulesApplied": [
    "fifoKitchenQueue",
    "dashboardCurrentShiftOnly"
  ],
  "story": {
    "actor": "cozinheiro",
    "goal": "Ver a fila de pedidos recebidos na cozinha para saber o que precisa ser preparado e em que ordem.",
    "steps": [
      "O cozinheiro abre a tela da fila da cozinha",
      "O sistema lista os pedidos do turno atual com status 'recebido' ou 'em preparo'",
      "Os pedidos são ordenados por ordem de chegada (receivedAt), com pedidos priorizados destacados primeiro",
      "Cada pedido exibe seus itens, tipo (mesa ou viagem), número da mesa quando aplicável e status atual"
    ],
    "outcome": "O cozinheiro visualiza a fila completa de pedidos a preparar, em ordem de chegada, podendo selecionar um pedido para iniciar o preparo."
  },
  "accessPattern": {
    "kind": "list",
    "entity": "Order",
    "keyField": "Order.orderId",
    "filters": [
      "Order.status",
      "Order.shiftId"
    ],
    "sort": [
      "Order.priority",
      "Order.receivedAt"
    ],
    "pagination": "optional",
    "selection": "single",
    "output": [
      "Order.orderId",
      "Order.status",
      "Order.orderType",
      "Order.tableNumber",
      "Order.priority",
      "Order.priorityReason",
      "Order.receivedAt",
      "Order.inPreparationAt",
      "Order.createdAt"
    ]
  },
  "inputs": [
    {
      "inputId": "shiftId",
      "fieldRef": "Order.shiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Turno aberto no momento, usado para filtrar apenas pedidos do turno atual"
    },
    {
      "inputId": "statusFilter",
      "fieldRef": "Order.status",
      "required": false,
      "source": "systemDefault",
      "description": "Filtro padrão de status: exibe pedidos com status 'received' ou 'inPreparation'"
    }
  ],
  "contextResolution": [
    {
      "targetRef": "Order.shiftId",
      "source": "activeLifecycleInstance",
      "originRef": "Shift.shiftId",
      "description": "Resolvido buscando o único Shift com status 'open' no momento da consulta, garantindo que apenas pedidos do turno atual sejam exibidos"
    },
    {
      "targetRef": "Order.status",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "O filtro de status é aplicado automaticamente pelo backend, restringindo a lista aos status 'received' e 'inPreparation' sem exigir entrada do usuário"
    }
  ],
  "acceptanceAssertions": [
    "A fila da cozinha exibe apenas pedidos cujo status seja 'received' ou 'inPreparation'",
    "Todos os pedidos listados pertencem ao turno atualmente aberto (mesmo shiftId)",
    "Os pedidos são ordenados por receivedAt em ordem crescente, com pedidos prioritários (priority=true) destacados primeiro",
    "Cada pedido na lista exibe orderId, status, orderType, tableNumber (quando aplicável), priority e os itens do pedido",
    "Pedidos com status 'ready' ou 'delivered' não aparecem na fila da cozinha"
  ],
  "pageId": "orderLifecycle",
  "commandName": "viewKitchenBoard",
  "bffName": "cafeFlow.orderLifecycle.viewKitchenBoard",
  "capability": {
    "capabilityId": "orderLifecycle",
    "title": "Ciclo de vida do pedido",
    "actor": "cozinheiro",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationViewKitchenBoard;
