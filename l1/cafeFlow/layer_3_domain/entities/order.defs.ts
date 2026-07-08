/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/order.defs.ts" enhancement="_blank"/>

export const orderDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "Order",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Order",
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
    "valueObjects": [
      {
        "name": "OrderItem",
        "fields": [
          {
            "fieldId": "orderItemId",
            "type": "uuid",
            "required": true,
            "description": "Identificador único da linha do pedido."
          },
          {
            "fieldId": "orderId",
            "type": "uuid",
            "required": true,
            "description": "Referência ao pedido ao qual esta linha pertence."
          },
          {
            "fieldId": "menuItemId",
            "type": "uuid",
            "required": true,
            "description": "Referência ao item do cardápio cadastrado que foi solicitado."
          },
          {
            "fieldId": "quantity",
            "type": "number",
            "required": true,
            "description": "Quantidade solicitada do item do cardápio nesta linha do pedido."
          },
          {
            "fieldId": "unitPrice",
            "type": "money",
            "required": true,
            "description": "Preço unitário do item no momento do lançamento do pedido, snapshot para fins de fechamento."
          },
          {
            "fieldId": "createdAt",
            "type": "datetime",
            "required": true,
            "description": "Data e hora em que a linha do pedido foi criada."
          },
          {
            "fieldId": "updatedAt",
            "type": "datetime",
            "required": true,
            "description": "Data e hora da última atualização da linha do pedido."
          }
        ],
        "collection": true
      }
    ],
    "invariants": [
      "tableNumber is required when orderType is 'table'",
      "tableNumber must be null when orderType is 'takeout'",
      "priorityReason is required when priority is true",
      "Status transitions must follow the sequence: registered → received → inPreparation → ready → delivered",
      "receivedAt must be set when status is 'received' or beyond",
      "inPreparationAt must be set when status is 'inPreparation' or beyond",
      "readyAt must be set when status is 'ready' or beyond",
      "deliveredAt must be set when status is 'delivered'",
      "Order must belong to an open shift at creation time",
      "Each OrderItem quantity must be greater than zero",
      "Each OrderItem unitPrice must be greater than or equal to zero",
      "Order must have at least one OrderItem"
    ]
  }
} as const;

export default orderDomainEntity;

export const pipeline = [
  {
    "id": "order__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/order.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/order.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
