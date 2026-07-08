/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/managerDashboard.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "viewDashboard",
    "bffName": "cafeFlow.viewDashboard.viewDashboard",
    "routeKey": "cafeFlow.viewDashboard.viewDashboard",
    "purpose": "Consultar dashboard do dia",
    "kind": "query",
    "outputShape": "array",
    "input": [],
    "output": [
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
        "name": "createdAt",
        "type": "date",
        "description": "Momento de criação do registro do pedido"
      },
      {
        "name": "shiftId",
        "type": "string",
        "description": "Turno aberto no momento do lançamento do pedido"
      },
      {
        "name": "deliveredAt",
        "type": "date",
        "description": "Momento em que o pedido foi entregue ao cliente"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:viewDashboard",
      "operationId": "viewDashboard",
      "defPath": "_102051_/l4/operations/viewDashboard.defs.ts",
      "bffName": "cafeFlow.viewDashboard.viewDashboard"
    }
  },
  {
    "commandName": "requestAiSalesSummary",
    "bffName": "cafeFlow.requestAiSalesSummary.requestAiSalesSummary",
    "routeKey": "cafeFlow.requestAiSalesSummary.requestAiSalesSummary",
    "purpose": "Solicitar resumo de vendas por IA",
    "kind": "query",
    "outputShape": "array",
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
        "name": "createdAt",
        "type": "date",
        "description": "Momento de criação do registro do pedido"
      },
      {
        "name": "deliveredAt",
        "type": "date",
        "description": "Momento em que o pedido foi entregue ao cliente"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:requestAiSalesSummary",
      "operationId": "requestAiSalesSummary",
      "defPath": "_102051_/l4/operations/requestAiSalesSummary.defs.ts",
      "bffName": "cafeFlow.requestAiSalesSummary.requestAiSalesSummary"
    }
  },
  {
    "commandName": "requestAiPromoSuggestions",
    "bffName": "cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions",
    "routeKey": "cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions",
    "purpose": "Solicitar sugestões de promoção por IA",
    "kind": "query",
    "outputShape": "array",
    "input": [],
    "output": [
      {
        "name": "orderId",
        "type": "string",
        "description": "Identificador único do pedido"
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
        "name": "createdAt",
        "type": "date",
        "description": "Momento de criação do registro do pedido"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:requestAiPromoSuggestions",
      "operationId": "requestAiPromoSuggestions",
      "defPath": "_102051_/l4/operations/requestAiPromoSuggestions.defs.ts",
      "bffName": "cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions"
    }
  }
];

export const pipeline = [
  {
    "id": "managerDashboard__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102051_/l2/cafeFlow/web/contracts/managerDashboard.ts",
    "defPath": "_102051_/l2/cafeFlow/web/contracts/managerDashboard.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
