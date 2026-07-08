/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/posWorkspace.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "createOrder",
    "bffName": "cafeFlow.orderLifecycle.createOrder",
    "routeKey": "cafeFlow.orderLifecycle.createOrder",
    "purpose": "Lançar pedido no POS",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "orderType",
        "type": "string",
        "required": true,
        "enum": [
          "table",
          "takeout"
        ],
        "description": "Tipo do pedido selecionado pelo atendente: 'table' (consumo na mesa) ou 'takeout' (para viagem)"
      },
      {
        "name": "tableNumber",
        "type": "string",
        "required": false,
        "description": "Número da mesa informado pelo atendente, obrigatório quando orderType = 'table'"
      },
      {
        "name": "orderItems",
        "type": "string",
        "required": true,
        "description": "Lista de itens do cardápio selecionados pelo cliente, cada um com menuItemId e quantidade"
      },
      {
        "name": "priority",
        "type": "boolean",
        "required": false,
        "description": "Indica se o atendente marcou o pedido como prioritário no preparo"
      },
      {
        "name": "priorityReason",
        "type": "string",
        "required": false,
        "description": "Justificativa da priorização, obrigatória quando priority = true"
      }
    ],
    "output": [
      {
        "name": "orderId",
        "type": "string",
        "description": "Identificador único do pedido"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "registered",
          "received",
          "inPreparation",
          "ready",
          "delivered"
        ],
        "description": "Status atual do pedido no fluxo de acompanhamento"
      },
      {
        "name": "orderType",
        "type": "string",
        "enum": [
          "table",
          "takeout"
        ],
        "description": "Tipo do pedido: consumo na mesa ou para viagem"
      },
      {
        "name": "tableNumber",
        "type": "string",
        "description": "Número da mesa quando o pedido é do tipo mesa"
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Momento de criação do registro do pedido"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:createOrder",
      "operationId": "createOrder",
      "defPath": "_102051_/l4/operations/createOrder.defs.ts",
      "bffName": "cafeFlow.orderLifecycle.createOrder"
    }
  },
  {
    "commandName": "viewOrderBoard",
    "bffName": "cafeFlow.orderLifecycle.viewOrderBoard",
    "routeKey": "cafeFlow.orderLifecycle.viewOrderBoard",
    "purpose": "Visualizar painel de pedidos",
    "kind": "query",
    "outputShape": "paginated",
    "input": [],
    "output": [
      {
        "name": "orderId",
        "type": "string",
        "description": "Identificador único do pedido"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "registered",
          "received",
          "inPreparation",
          "ready",
          "delivered"
        ],
        "description": "Status atual do pedido no fluxo de acompanhamento"
      },
      {
        "name": "orderType",
        "type": "string",
        "enum": [
          "table",
          "takeout"
        ],
        "description": "Tipo do pedido: consumo na mesa ou para viagem"
      },
      {
        "name": "tableNumber",
        "type": "string",
        "description": "Número da mesa quando o pedido é do tipo mesa"
      },
      {
        "name": "priority",
        "type": "boolean",
        "description": "Indica se o pedido recebeu priorização no preparo fora da ordem de chegada"
      },
      {
        "name": "priorityReason",
        "type": "string",
        "description": "Justificativa para a priorização do pedido fora da ordem de chegada"
      },
      {
        "name": "receivedAt",
        "type": "date",
        "description": "Momento em que o pedido foi recebido pela cozinha"
      },
      {
        "name": "inPreparationAt",
        "type": "date",
        "description": "Momento em que o cozinheiro iniciou o preparo do pedido"
      },
      {
        "name": "readyAt",
        "type": "date",
        "description": "Momento em que o pedido foi marcado como pronto pela cozinha"
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Momento de criação do registro do pedido"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:viewOrderBoard",
      "operationId": "viewOrderBoard",
      "defPath": "_102051_/l4/operations/viewOrderBoard.defs.ts",
      "bffName": "cafeFlow.orderLifecycle.viewOrderBoard"
    }
  },
  {
    "commandName": "deliverOrder",
    "bffName": "cafeFlow.orderLifecycle.deliverOrder",
    "routeKey": "cafeFlow.orderLifecycle.deliverOrder",
    "purpose": "Entregar pedido ao cliente",
    "kind": "command",
    "outputShape": "object",
    "input": [],
    "output": [
      {
        "name": "orderId",
        "type": "string",
        "description": "Identificador único do pedido"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "registered",
          "received",
          "inPreparation",
          "ready",
          "delivered"
        ],
        "description": "Status atual do pedido no fluxo de acompanhamento"
      },
      {
        "name": "deliveredAt",
        "type": "date",
        "description": "Momento em que o pedido foi entregue ao cliente"
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Momento da última atualização do registro do pedido"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:deliverOrder",
      "operationId": "deliverOrder",
      "defPath": "_102051_/l4/operations/deliverOrder.defs.ts",
      "bffName": "cafeFlow.orderLifecycle.deliverOrder"
    }
  }
];

export const pipeline = [
  {
    "id": "posWorkspace__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/contracts/posWorkspace.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
