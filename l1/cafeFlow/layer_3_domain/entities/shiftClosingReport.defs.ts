/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.defs.ts" enhancement="_blank"/>

export const shiftClosingReportDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "ShiftClosingReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "ShiftClosingReport",
    "fields": [
      {
        "fieldId": "shiftClosingReportId",
        "type": "uuid",
        "required": true,
        "description": "Identificador único do relatório de fechamento de turno."
      },
      {
        "fieldId": "shiftId",
        "type": "uuid",
        "required": true,
        "description": "Referência ao turno fechado ao qual este relatório corresponde."
      },
      {
        "fieldId": "totalApurado",
        "type": "money",
        "required": true,
        "description": "Valor total apurado no fechamento do turno para conferência do gerente."
      },
      {
        "fieldId": "paidOrderCount",
        "type": "number",
        "required": true,
        "description": "Quantidade de pedidos pagos consolidados no período do turno."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora em que o relatório de fechamento foi gerado."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora da última atualização do relatório de fechamento."
      }
    ],
    "invariants": [
      "Referenced shift must have status 'closed' before generating the report",
      "totalApurado must be >= 0",
      "paidOrderCount must be >= 0",
      "Only one ShiftClosingReport per shift"
    ],
    "valueObjects": []
  }
} as const;

export default shiftClosingReportDomainEntity;

export const pipeline = [
  {
    "id": "shiftClosingReport__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.defs.ts",
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
