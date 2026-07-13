/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.defs.ts" enhancement="_blank"/>

export const stockConsumptionDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "StockConsumption",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StockConsumption",
    "fields": [
      {
        "fieldId": "stockConsumptionId",
        "type": "uuid",
        "required": true,
        "description": "Identificador único do consumo de estoque."
      },
      {
        "fieldId": "stockItemId",
        "type": "uuid",
        "required": true,
        "description": "Item de estoque cuja quantidade foi decrementada por este consumo."
      },
      {
        "fieldId": "orderId",
        "type": "uuid",
        "required": true,
        "description": "Pedido que disparou este consumo de estoque no momento do lançamento."
      },
      {
        "fieldId": "quantity",
        "type": "number",
        "required": true,
        "description": "Quantidade do item de estoque consumida e decrementada neste lançamento."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Situação do consumo: lançado ou estornado.",
        "enum": [
          "posted",
          "voided"
        ]
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora do registro do consumo de estoque."
      },
      {
        "fieldId": "voidedAt",
        "type": "datetime",
        "required": false,
        "description": "Data e hora em que o consumo foi estornado, quando aplicável."
      },
      {
        "fieldId": "voidReason",
        "type": "text",
        "required": false,
        "description": "Motivo do estorno do consumo de estoque."
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

export default stockConsumptionDomainEntity;

export const pipeline = [
  {
    "id": "stockConsumption__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.defs.ts",
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
