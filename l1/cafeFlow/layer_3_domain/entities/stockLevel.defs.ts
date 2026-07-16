/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.defs.ts" enhancement="_blank"/>

export const stockLevelDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "StockLevel",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StockLevel",
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
    ],
    "invariants": [
      "currentQuantity must be >= 0",
      "minimumLevel must be >= 0",
      "Low-stock alert is triggered when currentQuantity <= minimumLevel",
      "unit cannot be changed after creation"
    ],
    "valueObjects": []
  }
} as const;

export default stockLevelDomainEntity;

export const pipeline = [
  {
    "id": "stockLevel__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.defs.ts",
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
