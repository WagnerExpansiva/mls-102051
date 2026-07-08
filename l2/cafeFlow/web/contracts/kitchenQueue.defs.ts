/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/kitchenQueue.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "viewKitchenBoard",
    "bffName": "cafeFlow.orderLifecycle.viewKitchenBoard",
    "routeKey": "cafeFlow.orderLifecycle.viewKitchenBoard",
    "purpose": "Visualizar fila da cozinha",
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
        "name": "createdAt",
        "type": "date",
        "description": "Momento de criação do registro do pedido"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:viewKitchenBoard",
      "operationId": "viewKitchenBoard",
      "defPath": "_102051_/l4/operations/viewKitchenBoard.defs.ts",
      "bffName": "cafeFlow.orderLifecycle.viewKitchenBoard"
    }
  },
  {
    "commandName": "updateOrderStatus",
    "bffName": "cafeFlow.orderLifecycle.updateOrderStatus",
    "routeKey": "cafeFlow.orderLifecycle.updateOrderStatus",
    "purpose": "Atualizar status do pedido na cozinha",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "status",
        "type": "string",
        "required": true,
        "enum": [
          "registered",
          "received",
          "inPreparation",
          "ready",
          "delivered"
        ],
        "description": "Novo status que o cozinheiro deseja atribuir ao pedido (inPreparation ou ready)"
      }
    ],
    "output": [],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:updateOrderStatus",
      "operationId": "updateOrderStatus",
      "defPath": "_102051_/l4/operations/updateOrderStatus.defs.ts",
      "bffName": "cafeFlow.orderLifecycle.updateOrderStatus"
    }
  }
];

export const pipeline = [
  {
    "id": "kitchenQueue__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102051_/l2/cafeFlow/web/contracts/kitchenQueue.ts",
    "defPath": "_102051_/l2/cafeFlow/web/contracts/kitchenQueue.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
