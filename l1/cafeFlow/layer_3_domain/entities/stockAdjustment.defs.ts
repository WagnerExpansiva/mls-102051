/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.defs.ts" enhancement="_blank"/>

export const stockAdjustmentDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "StockAdjustment",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StockAdjustment",
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
    "invariants": [],
    "valueObjects": []
  }
} as const;

export default stockAdjustmentDomainEntity;

export const pipeline = [
  {
    "id": "stockAdjustment__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
