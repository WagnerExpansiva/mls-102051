/// <mls fileReference="_102051_/l4/cafeFlow/ontology/StockAdjustment.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityStockAdjustment = {
  "entityId": "StockAdjustment",
  "title": "Ajuste de Estoque",
  "description": "Fato imutável registrado pelo gerente para repor ou corrigir a quantidade de um item de estoque manualmente.",
  "kind": "event",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "stockAdjustmentId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do ajuste de estoque."
    },
    {
      "fieldId": "stockItemId",
      "type": "uuid",
      "required": true,
      "description": "Item de estoque ao qual o ajuste se aplica."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Situação do ajuste: lançado ou anulado.",
      "enum": [
        "posted",
        "voided"
      ]
    },
    {
      "fieldId": "quantity",
      "type": "number",
      "required": true,
      "description": "Quantidade ajustada, positiva para reposição e negativa para correção ou baixa."
    },
    {
      "fieldId": "reason",
      "type": "text",
      "required": true,
      "description": "Motivo do ajuste informado pelo gerente ao registrar a reposição ou correção."
    },
    {
      "fieldId": "voidedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o ajuste foi anulado."
    },
    {
      "fieldId": "voidedReason",
      "type": "text",
      "required": false,
      "description": "Motivo da anulação do ajuste de estoque."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro do ajuste."
    }
  ],
  "statusEnum": [
    "posted",
    "voided"
  ],
  "eventPolicy": {
    "purpose": "audit",
    "retentionDays": 365
  }
} as const;

export default cafeFlowEntityStockAdjustment;
