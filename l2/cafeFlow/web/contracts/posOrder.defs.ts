/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/posOrder.defs.ts" enhancement="_blank"/>

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
        "description": "Tipo do pedido: 'table' para consumo na mesa ou 'takeout' para viagem"
      },
      {
        "name": "tableNumber",
        "type": "string",
        "required": false,
        "description": "Número da mesa, obrigatório quando orderType for 'table'"
      },
      {
        "name": "priority",
        "type": "boolean",
        "required": false,
        "description": "Indica se o pedido recebe priorização no preparo fora da ordem de chegada"
      },
      {
        "name": "priorityReason",
        "type": "string",
        "required": false,
        "description": "Justificativa para a priorização, obrigatória quando priority for true"
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
    "input": [
      {
        "name": "statusFilter",
        "type": "string",
        "required": false,
        "enum": [
          "registered",
          "received",
          "inPreparation",
          "ready",
          "delivered"
        ],
        "description": "Filtro opcional de status selecionado pelo atendente para visualizar pedidos em um estágio específico"
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
    "id": "posOrder__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102051_/l2/cafeFlow/web/contracts/posOrder.ts",
    "defPath": "_102051_/l2/cafeFlow/web/contracts/posOrder.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
