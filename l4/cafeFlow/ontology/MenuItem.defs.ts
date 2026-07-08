/// <mls fileReference="_102051_/l4/cafeFlow/ontology/MenuItem.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityMenuItem = {
  "entityId": "MenuItem",
  "title": "Item do Cardápio",
  "description": "Item do cardápio cadastrado pelo gerente com nome, categoria, preço e vínculo a ingredientes de estoque, disponível para lançamento no POS quando ativado.",
  "kind": "mdm",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "menuItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do item do cardápio"
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Nome do item do cardápio exibido no POS"
    },
    {
      "fieldId": "description",
      "type": "text",
      "required": false,
      "description": "Descrição detalhada do item do cardápio"
    },
    {
      "fieldId": "menuCategoryId",
      "type": "uuid",
      "required": true,
      "description": "Referência à categoria de classificação à qual o item pertence"
    },
    {
      "fieldId": "price",
      "type": "money",
      "required": true,
      "description": "Preço de venda do item do cardápio"
    },
    {
      "fieldId": "itemType",
      "type": "string",
      "required": true,
      "description": "Tipo do item: simples ou variante cadastrada como item separado",
      "enum": [
        "simple",
        "variant"
      ]
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Status do item no ciclo de vida: rascunho, ativo ou inativo",
      "enum": [
        "draft",
        "active",
        "inactive"
      ]
    },
    {
      "fieldId": "activatedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o item foi ativado e disponibilizado no POS"
    },
    {
      "fieldId": "inactivatedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o item foi inativado e indisponibilizado no POS"
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro do item"
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro do item"
    }
  ],
  "statusEnum": [
    "draft",
    "active",
    "inactive"
  ],
  "lifecycleStates": [
    "draft",
    "active",
    "inactive"
  ]
} as const;

export default cafeFlowEntityMenuItem;
