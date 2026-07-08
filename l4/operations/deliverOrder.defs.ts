/// <mls fileReference="_102051_/l4/operations/deliverOrder.defs.ts" enhancement="_blank"/>

export const operationDeliverOrder = {
  "operationId": "deliverOrder",
  "title": "Entregar pedido ao cliente",
  "actor": "atendente",
  "entity": "Order",
  "kind": "update",
  "reads": [
    "Order"
  ],
  "writes": [
    "Order"
  ],
  "rulesApplied": [
    "orderStatusFlow",
    "readyBeforeDelivered"
  ],
  "story": {
    "actor": "atendente",
    "goal": "Entregar o pedido pronto ao cliente (na mesa ou no balcão) e registrá-lo como entregue no sistema.",
    "steps": [
      "O atendente consulta o painel de pedidos e identifica um pedido com status 'pronto'.",
      "O atendente seleciona o pedido e confirma a entrega ao cliente.",
      "O sistema valida que o status atual é 'ready' e atualiza o pedido para status 'delivered' registrando o momento da entrega."
    ],
    "outcome": "O pedido é marcado como entregue com deliveredAt preenchido, concluindo o fluxo de acompanhamento do pedido."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "Order",
    "keyField": "Order.orderId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Order.orderId",
      "Order.status",
      "Order.deliveredAt",
      "Order.updatedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "orderId",
      "fieldRef": "Order.orderId",
      "required": true,
      "source": "selectedEntity",
      "description": "Pedido selecionado pelo atendente no painel para entrega"
    },
    {
      "inputId": "deliveredAt",
      "fieldRef": "Order.deliveredAt",
      "required": true,
      "source": "systemDefault",
      "description": "Momento em que o pedido foi entregue ao cliente, gerado automaticamente"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "Order.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Momento da última atualização do registro do pedido, gerado automaticamente"
    }
  ],
  "contextResolution": [
    {
      "targetRef": "Order.orderId",
      "source": "selectedEntity",
      "originRef": "Order.orderId",
      "description": "O backend resolve o orderId a partir do pedido atualmente selecionado pelo atendente no painel de pedidos."
    },
    {
      "targetRef": "Order.deliveredAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "O backend define deliveredAt com o timestamp atual no momento da confirmação da entrega."
    },
    {
      "targetRef": "Order.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "O backend define updatedAt com o timestamp atual no momento da atualização do registro."
    }
  ],
  "acceptanceAssertions": [
    "O pedido selecionado deve ter status 'ready' antes de poder ser marcado como entregue.",
    "Após a confirmação, o pedido existe com status 'delivered'.",
    "Após a confirmação, o campo deliveredAt do pedido é preenchido com o momento da entrega.",
    "Após a confirmação, o campo updatedAt do pedido é atualizado com o momento da operação.",
    "Não é permitido marcar como entregue um pedido cujo status seja diferente de 'ready'."
  ],
  "pageId": "orderLifecycle",
  "commandName": "deliverOrder",
  "bffName": "cafeFlow.orderLifecycle.deliverOrder",
  "capability": {
    "capabilityId": "orderLifecycle",
    "title": "Ciclo de vida do pedido",
    "actor": "atendente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationDeliverOrder;
