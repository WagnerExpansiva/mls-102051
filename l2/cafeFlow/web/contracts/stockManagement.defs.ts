/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/stockManagement.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "browseStockItems",
    "bffName": "cafeFlow.browseStockItems.browseStockItems",
    "routeKey": "cafeFlow.browseStockItems.browseStockItems",
    "purpose": "Consultar itens de estoque e alertas",
    "kind": "query",
    "outputShape": "paginated",
    "input": [
      {
        "name": "searchTerm",
        "type": "string",
        "required": false,
        "description": "Termo de busca opcional para filtrar itens de estoque pelo nome.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "stockItemId",
        "type": "string",
        "description": "Identificador único do item de estoque master."
      },
      {
        "name": "name",
        "type": "string",
        "description": "Nome do ingrediente cadastrado pelo gerente."
      },
      {
        "name": "unit",
        "type": "string",
        "enum": [
          "kg",
          "liter",
          "portion",
          "unit"
        ],
        "description": "Unidade de medida do ingrediente utilizada no controle de estoque."
      },
      {
        "name": "minimumLevel",
        "type": "number",
        "description": "Quantidade mínima configurada para disparar o alerta de estoque baixo."
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Data e hora de cadastro do item de estoque."
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Data e hora da última atualização do item de estoque."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:browseStockItems",
      "operationId": "browseStockItems",
      "defPath": "_102051_/l4/operations/browseStockItems.defs.ts",
      "bffName": "cafeFlow.browseStockItems.browseStockItems"
    }
  },
  {
    "commandName": "manageStockItem",
    "bffName": "cafeFlow.manageStockItem.manageStockItem",
    "routeKey": "cafeFlow.manageStockItem.manageStockItem",
    "purpose": "Gerenciar itens de estoque",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "stockItemId",
        "type": "string",
        "required": true,
        "description": "Identificador do item de estoque a ser atualizado, obtido da rota de edição.",
        "source": "routeParam",
        "presentation": "route"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Nome do ingrediente editado pelo gerente.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "unit",
        "type": "string",
        "required": true,
        "enum": [
          "kg",
          "liter",
          "portion",
          "unit"
        ],
        "description": "Unidade de medida do ingrediente (kg, liter, portion ou unit).",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "minimumLevel",
        "type": "number",
        "required": true,
        "description": "Quantidade mínima configurada para disparar o alerta de estoque baixo.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "stockItemId",
        "type": "string",
        "description": "Identificador único do item de estoque master."
      },
      {
        "name": "name",
        "type": "string",
        "description": "Nome do ingrediente cadastrado pelo gerente."
      },
      {
        "name": "unit",
        "type": "string",
        "enum": [
          "kg",
          "liter",
          "portion",
          "unit"
        ],
        "description": "Unidade de medida do ingrediente utilizada no controle de estoque."
      },
      {
        "name": "minimumLevel",
        "type": "number",
        "description": "Quantidade mínima configurada para disparar o alerta de estoque baixo."
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Data e hora da última atualização do item de estoque."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:manageStockItem",
      "operationId": "manageStockItem",
      "defPath": "_102051_/l4/operations/manageStockItem.defs.ts",
      "bffName": "cafeFlow.manageStockItem.manageStockItem"
    }
  }
];

export const pipeline = [
  {
    "id": "stockManagement__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102051_/l2/cafeFlow/web/contracts/stockManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/contracts/stockManagement.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
