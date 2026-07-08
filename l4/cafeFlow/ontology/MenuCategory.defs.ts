/// <mls fileReference="_102051_/l4/cafeFlow/ontology/MenuCategory.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityMenuCategory = {
  "entityId": "MenuCategory",
  "title": "Categoria do Cardápio",
  "description": "Categoria de classificação dos itens do cardápio, utilizada para organização no POS e no cadastro.",
  "kind": "mdm",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "menuCategoryId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da categoria do cardápio."
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Nome da categoria exibido no POS e no cadastro."
    },
    {
      "fieldId": "description",
      "type": "text",
      "required": false,
      "description": "Descrição complementar da categoria para uso interno."
    },
    {
      "fieldId": "displayOrder",
      "type": "number",
      "required": true,
      "description": "Ordem de exibição da categoria no POS e em listagens."
    },
    {
      "fieldId": "active",
      "type": "boolean",
      "required": true,
      "description": "Indica se a categoria está ativa e visível para seleção no POS."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro da categoria."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro da categoria."
    }
  ]
} as const;

export default cafeFlowEntityMenuCategory;
