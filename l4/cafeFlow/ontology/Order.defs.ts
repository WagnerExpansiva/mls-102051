/// <mls fileReference="_102051_/l4/cafeFlow/ontology/Order.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityOrder = {
  "entityId": "Order",
  "title": "Pedido",
  "description": "Pedido registrado no POS pelo atendente, podendo ser de mesa ou takeout, com status acompanhado do lançamento à entrega.",
  "kind": "core",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "orderId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do pedido"
    },
    {
      "fieldId": "shiftId",
      "type": "uuid",
      "required": true,
      "description": "Turno aberto no momento do lançamento do pedido"
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Status atual do pedido no fluxo de acompanhamento",
      "enum": [
        "registered",
        "received",
        "inPreparation",
        "ready",
        "delivered"
      ]
    },
    {
      "fieldId": "orderType",
      "type": "string",
      "required": true,
      "description": "Tipo do pedido: consumo na mesa ou para viagem",
      "enum": [
        "table",
        "takeout"
      ]
    },
    {
      "fieldId": "tableNumber",
      "type": "string",
      "required": false,
      "description": "Número da mesa quando o pedido é do tipo mesa"
    },
    {
      "fieldId": "priority",
      "type": "boolean",
      "required": false,
      "description": "Indica se o pedido recebeu priorização no preparo fora da ordem de chegada"
    },
    {
      "fieldId": "priorityReason",
      "type": "text",
      "required": false,
      "description": "Justificativa para a priorização do pedido fora da ordem de chegada"
    },
    {
      "fieldId": "receivedAt",
      "type": "datetime",
      "required": false,
      "description": "Momento em que o pedido foi recebido pela cozinha"
    },
    {
      "fieldId": "inPreparationAt",
      "type": "datetime",
      "required": false,
      "description": "Momento em que o cozinheiro iniciou o preparo do pedido"
    },
    {
      "fieldId": "readyAt",
      "type": "datetime",
      "required": false,
      "description": "Momento em que o pedido foi marcado como pronto pela cozinha"
    },
    {
      "fieldId": "deliveredAt",
      "type": "datetime",
      "required": false,
      "description": "Momento em que o pedido foi entregue ao cliente"
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Momento de criação do registro do pedido"
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Momento da última atualização do registro do pedido"
    }
  ],
  "statusEnum": [
    "registered",
    "received",
    "inPreparation",
    "ready",
    "delivered"
  ],
  "lifecycleStates": [
    "registered",
    "received",
    "inPreparation",
    "ready",
    "delivered"
  ]
} as const;

export default cafeFlowEntityOrder;
