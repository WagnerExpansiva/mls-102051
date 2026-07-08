/// <mls fileReference="_102051_/l4/cafeFlow/ontology/MenuItemIngredient.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityMenuItemIngredient = {
  "entityId": "MenuItemIngredient",
  "title": "Ingrediente do Item de Cardápio",
  "description": "Vínculo entre um item do cardápio e um item de estoque, definindo a quantidade consumida do ingrediente a cada pedido do item.",
  "kind": "supporting",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "menuItemIngredientId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do vínculo entre item de cardápio e ingrediente de estoque."
    },
    {
      "fieldId": "menuItemId",
      "type": "uuid",
      "required": true,
      "description": "Referência ao item de cardápio ao qual este ingrediente está vinculado."
    },
    {
      "fieldId": "stockItemId",
      "type": "uuid",
      "required": true,
      "description": "Referência ao item de estoque master consumido quando o item de cardápio é pedido."
    },
    {
      "fieldId": "quantity",
      "type": "number",
      "required": true,
      "description": "Quantidade do ingrediente consumida a cada pedido do item de cardápio."
    },
    {
      "fieldId": "unit",
      "type": "string",
      "required": true,
      "description": "Unidade de medida da quantidade consumida do ingrediente.",
      "enum": [
        "kg",
        "gram",
        "liter",
        "milliliter",
        "portion",
        "unit"
      ]
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do vínculo de ingrediente."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do vínculo de ingrediente."
    }
  ]
} as const;

export default cafeFlowEntityMenuItemIngredient;
