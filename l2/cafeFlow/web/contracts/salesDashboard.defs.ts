/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/salesDashboard.defs.ts" enhancement="_blank"/>

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
        "name": "shiftId",
        "type": "string",
        "description": "Turno aberto no momento do lançamento do pedido"
      },
      {
        "name": "menuItemId",
        "type": "string",
        "description": "Referência ao item do cardápio cadastrado que foi solicitado."
      },
      {
        "name": "quantity",
        "type": "number",
        "description": "Quantidade solicitada do item do cardápio nesta linha do pedido."
      },
      {
        "name": "stockItemId",
        "type": "string",
        "description": "Referência ao item de estoque master ao qual este nível pertence"
      },
      {
        "name": "currentQuantity",
        "type": "number",
        "description": "Quantidade atual disponível em estoque, decrementada por consumos e ajustada por reposições"
      },
      {
        "name": "minimumQuantity",
        "type": "string",
        "required": false
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
    "input": [
      {
        "name": "summaryRequest",
        "type": "string",
        "required": true,
        "description": "Solicitação do gerente para gerar o resumo de vendas do dia"
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
      },
      {
        "name": "quantity",
        "type": "number",
        "description": "Quantidade solicitada do item do cardápio nesta linha do pedido."
      },
      {
        "name": "menuItemId",
        "type": "string",
        "description": "Referência ao item do cardápio cadastrado que foi solicitado."
      },
      {
        "name": "name",
        "type": "string",
        "description": "Nome do item do cardápio exibido no POS"
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
    "id": "salesDashboard__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102051_/l2/cafeFlow/web/contracts/salesDashboard.ts",
    "defPath": "_102051_/l2/cafeFlow/web/contracts/salesDashboard.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
