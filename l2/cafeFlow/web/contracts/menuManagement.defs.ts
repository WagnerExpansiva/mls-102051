/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/menuManagement.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "browseMenuItems",
    "bffName": "cafeFlow.menuItemLifecycle.browseMenuItems",
    "routeKey": "cafeFlow.menuItemLifecycle.browseMenuItems",
    "purpose": "Consultar itens do cardápio",
    "kind": "query",
    "outputShape": "paginated",
    "input": [
      {
        "name": "statusFilter",
        "type": "string",
        "required": false,
        "enum": [
          "draft",
          "active",
          "inactive"
        ],
        "description": "Filtro opcional por status do item (draft, active, inactive) informado pelo gerente"
      },
      {
        "name": "menuCategoryIdFilter",
        "type": "string",
        "required": false,
        "description": "Filtro opcional por categoria do item informado pelo gerente"
      }
    ],
    "output": [
      {
        "name": "menuItemId",
        "type": "string",
        "description": "Identificador único do item do cardápio"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Nome do item do cardápio exibido no POS"
      },
      {
        "name": "description",
        "type": "string",
        "description": "Descrição detalhada do item do cardápio"
      },
      {
        "name": "menuCategoryId",
        "type": "string",
        "description": "Referência à categoria de classificação à qual o item pertence"
      },
      {
        "name": "price",
        "type": "number",
        "description": "Preço de venda do item do cardápio"
      },
      {
        "name": "itemType",
        "type": "string",
        "enum": [
          "simple",
          "variant"
        ],
        "description": "Tipo do item: simples ou variante cadastrada como item separado"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "active",
          "inactive"
        ],
        "description": "Status do item no ciclo de vida: rascunho, ativo ou inativo"
      },
      {
        "name": "activatedAt",
        "type": "date",
        "description": "Data e hora em que o item foi ativado e disponibilizado no POS"
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Data e hora de criação do registro do item"
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Data e hora da última atualização do registro do item"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:browseMenuItems",
      "operationId": "browseMenuItems",
      "defPath": "_102051_/l4/operations/browseMenuItems.defs.ts",
      "bffName": "cafeFlow.menuItemLifecycle.browseMenuItems"
    }
  },
  {
    "commandName": "manageMenuItem",
    "bffName": "cafeFlow.menuItemLifecycle.manageMenuItem",
    "routeKey": "cafeFlow.menuItemLifecycle.manageMenuItem",
    "purpose": "Gerenciar item do cardápio",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Nome do item do cardápio exibido no POS"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Descrição detalhada do item do cardápio"
      },
      {
        "name": "menuCategoryId",
        "type": "string",
        "required": true,
        "description": "Categoria de classificação à qual o item pertence"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Preço de venda do item do cardápio"
      },
      {
        "name": "itemType",
        "type": "string",
        "required": true,
        "enum": [
          "simple",
          "variant"
        ],
        "description": "Tipo do item: deve ser 'simple' nesta fase"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "enum": [
          "draft",
          "active",
          "inactive"
        ],
        "description": "Status do item: rascunho, ativo ou inativo"
      }
    ],
    "output": [
      {
        "name": "menuItemId",
        "type": "string",
        "description": "Identificador único do item do cardápio"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Nome do item do cardápio exibido no POS"
      },
      {
        "name": "description",
        "type": "string",
        "description": "Descrição detalhada do item do cardápio"
      },
      {
        "name": "menuCategoryId",
        "type": "string",
        "description": "Referência à categoria de classificação à qual o item pertence"
      },
      {
        "name": "price",
        "type": "number",
        "description": "Preço de venda do item do cardápio"
      },
      {
        "name": "itemType",
        "type": "string",
        "enum": [
          "simple",
          "variant"
        ],
        "description": "Tipo do item: simples ou variante cadastrada como item separado"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "active",
          "inactive"
        ],
        "description": "Status do item no ciclo de vida: rascunho, ativo ou inativo"
      },
      {
        "name": "activatedAt",
        "type": "date",
        "description": "Data e hora em que o item foi ativado e disponibilizado no POS"
      },
      {
        "name": "inactivatedAt",
        "type": "date",
        "description": "Data e hora em que o item foi inativado e indisponibilizado no POS"
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Data e hora da última atualização do registro do item"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:manageMenuItem",
      "operationId": "manageMenuItem",
      "defPath": "_102051_/l4/operations/manageMenuItem.defs.ts",
      "bffName": "cafeFlow.menuItemLifecycle.manageMenuItem"
    }
  }
];

export const pipeline = [
  {
    "id": "menuManagement__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102051_/l2/cafeFlow/web/contracts/menuManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/contracts/menuManagement.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
