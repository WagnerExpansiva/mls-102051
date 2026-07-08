/// <mls fileReference="_102051_/l4/cafeFlow/ontology/OrderItem.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityOrderItem = {
  "entityId": "OrderItem",
  "title": "Item do Pedido",
  "description": "Linha de pedido que referencia um item do cardápio com quantidade, formando o detalhamento do pedido lançado no POS.",
  "kind": "supporting",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "orderItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da linha do pedido."
    },
    {
      "fieldId": "orderId",
      "type": "uuid",
      "required": true,
      "description": "Referência ao pedido ao qual esta linha pertence."
    },
    {
      "fieldId": "menuItemId",
      "type": "uuid",
      "required": true,
      "description": "Referência ao item do cardápio cadastrado que foi solicitado."
    },
    {
      "fieldId": "quantity",
      "type": "number",
      "required": true,
      "description": "Quantidade solicitada do item do cardápio nesta linha do pedido."
    },
    {
      "fieldId": "unitPrice",
      "type": "money",
      "required": true,
      "description": "Preço unitário do item no momento do lançamento do pedido, snapshot para fins de fechamento."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que a linha do pedido foi criada."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização da linha do pedido."
    }
  ]
} as const;

export default cafeFlowEntityOrderItem;
