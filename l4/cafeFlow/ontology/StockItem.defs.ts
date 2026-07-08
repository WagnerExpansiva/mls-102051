/// <mls fileReference="_102051_/l4/cafeFlow/ontology/StockItem.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityStockItem = {
  "entityId": "StockItem",
  "title": "Item de Estoque",
  "description": "Ingrediente cadastrado pelo gerente com unidade de medida e limite mínimo de alerta, representando a definição master do insumo.",
  "kind": "mdm",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "stockItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do item de estoque master."
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Nome do ingrediente cadastrado pelo gerente."
    },
    {
      "fieldId": "unit",
      "type": "string",
      "required": true,
      "description": "Unidade de medida do ingrediente utilizada no controle de estoque.",
      "enum": [
        "kg",
        "liter",
        "portion",
        "unit"
      ]
    },
    {
      "fieldId": "minimumLevel",
      "type": "number",
      "required": true,
      "description": "Quantidade mínima configurada para disparar o alerta de estoque baixo."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de cadastro do item de estoque."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do item de estoque."
    }
  ]
} as const;

export default cafeFlowEntityStockItem;
