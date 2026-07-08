/// <mls fileReference="_102051_/l4/operations/updateOrderStatus.defs.ts" enhancement="_blank"/>

export const operationUpdateOrderStatus = {
  "operationId": "updateOrderStatus",
  "title": "Atualizar status do pedido na cozinha",
  "actor": "cozinheiro",
  "entity": "Order",
  "kind": "update",
  "reads": [
    "Order",
    "Shift"
  ],
  "writes": [
    "Order"
  ],
  "rulesApplied": [
    "orderStatusFlow",
    "inProgressBeforeReady"
  ],
  "story": {
    "actor": "cozinheiro",
    "goal": "Atualizar o status de um pedido na fila da cozinha conforme avança o preparo",
    "steps": [
      "O cozinheiro visualiza a fila de pedidos recebidos na cozinha",
      "Seleciona um pedido e marca como 'em preparo' ao iniciar o preparo",
      "Ao concluir o preparo, marca o pedido como 'pronto', avisando o atendente que pode entregar ao cliente"
    ],
    "outcome": "O status do pedido é atualizado respeitando a sequência obrigatória received → inPreparation → ready, com os respectivos timestamps registrados, permitindo que o atendente acompanhe o progresso no painel"
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "Order",
    "keyField": "Order.orderId",
    "pagination": "none",
    "selection": "single",
    "output": []
  },
  "inputs": [
    {
      "inputId": "orderId",
      "fieldRef": "Order.orderId",
      "required": true,
      "source": "selectedEntity",
      "description": "Pedido selecionado pelo cozinheiro na fila da cozinha"
    },
    {
      "inputId": "status",
      "fieldRef": "Order.status",
      "required": true,
      "source": "userInput",
      "description": "Novo status que o cozinheiro deseja atribuir ao pedido (inPreparation ou ready)"
    },
    {
      "inputId": "shiftId",
      "fieldRef": "Order.shiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Turno aberto no momento da atualização, para validar que o pedido pertence ao turno atual"
    },
    {
      "inputId": "inPreparationAt",
      "fieldRef": "Order.inPreparationAt",
      "required": false,
      "source": "systemDefault",
      "description": "Timestamp definido quando o status passa a inPreparation"
    },
    {
      "inputId": "readyAt",
      "fieldRef": "Order.readyAt",
      "required": false,
      "source": "systemDefault",
      "description": "Timestamp definido quando o status passa a ready"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "Order.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp da última atualização do registro"
    }
  ],
  "contextResolution": [
    {
      "inputId": "shiftId",
      "targetRef": "Order.shiftId",
      "source": "activeLifecycleInstance",
      "originRef": "Shift.shiftId",
      "description": "Resolve o turno atualmente aberto (single Shift with status open) para validar que o pedido pertence ao turno ativo"
    },
    {
      "inputId": "inPreparationAt",
      "targetRef": "Order.inPreparationAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define o timestamp atual quando o status transita para inPreparation"
    },
    {
      "inputId": "readyAt",
      "targetRef": "Order.readyAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define o timestamp atual quando o status transita para ready"
    },
    {
      "inputId": "updatedAt",
      "targetRef": "Order.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define o timestamp atual em toda atualização do registro"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, o pedido existe com o novo status informado (inPreparation ou ready)",
    "O pedido só pode ser marcado como inPreparation se o status atual for received",
    "O pedido só pode ser marcado como ready se o status atual for inPreparation",
    "O fluxo de status segue obrigatoriamente a sequência received → inPreparation → ready, sem permitir pulos de etapa",
    "O campo inPreparationAt é preenchido com o timestamp atual quando o status passa a inPreparation",
    "O campo readyAt é preenchido com o timestamp atual quando o status passa a ready",
    "O campo updatedAt é atualizado com o timestamp atual em toda alteração de status",
    "O pedido atualizado pertence ao turno atualmente aberto"
  ],
  "pageId": "orderLifecycle",
  "commandName": "updateOrderStatus",
  "bffName": "cafeFlow.orderLifecycle.updateOrderStatus",
  "capability": {
    "capabilityId": "orderLifecycle",
    "title": "Ciclo de vida do pedido",
    "actor": "cozinheiro",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationUpdateOrderStatus;
