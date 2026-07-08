/// <mls fileReference="_102051_/l4/cafeFlow/ontology/StockLevel.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityStockLevel = {
  "entityId": "StockLevel",
  "title": "Nível de Estoque",
  "description": "Estado operacional do estoque de um ingrediente, mantendo a quantidade atual que é decrementada por consumos e ajustada por reposições.",
  "kind": "core",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "stockLevelId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do nível de estoque"
    },
    {
      "fieldId": "stockItemId",
      "type": "uuid",
      "required": true,
      "description": "Referência ao item de estoque master ao qual este nível pertence"
    },
    {
      "fieldId": "currentQuantity",
      "type": "number",
      "required": true,
      "description": "Quantidade atual disponível em estoque, decrementada por consumos e ajustada por reposições"
    },
    {
      "fieldId": "minimumLevel",
      "type": "number",
      "required": true,
      "description": "Quantidade mínima configurada para disparar o alerta de estoque baixo"
    },
    {
      "fieldId": "unit",
      "type": "string",
      "required": true,
      "description": "Unidade de medida do estoque do ingrediente",
      "enum": [
        "kg",
        "liter",
        "portion",
        "unit"
      ]
    },
    {
      "fieldId": "lastDecrementAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora do último decremento de estoque por lançamento de pedido"
    },
    {
      "fieldId": "lastAdjustmentAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora do último ajuste manual de reposição de estoque"
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro de nível de estoque"
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do nível de estoque"
    }
  ]
} as const;

export default cafeFlowEntityStockLevel;
