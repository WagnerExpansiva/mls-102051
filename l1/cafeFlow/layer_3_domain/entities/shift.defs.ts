/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/shift.defs.ts" enhancement="_blank"/>

export const shiftDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "Shift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Shift",
    "fields": [
      {
        "fieldId": "shiftId",
        "type": "uuid",
        "required": true,
        "description": "Identificador único do turno"
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Situação atual do turno",
        "enum": [
          "open",
          "closed"
        ]
      },
      {
        "fieldId": "openedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de abertura do turno pelo gerente"
      },
      {
        "fieldId": "closedAt",
        "type": "datetime",
        "required": false,
        "description": "Data e hora de fechamento do turno"
      },
      {
        "fieldId": "openedBy",
        "type": "string",
        "required": true,
        "description": "Identificador do gerente que abriu o turno"
      },
      {
        "fieldId": "closedBy",
        "type": "string",
        "required": false,
        "description": "Identificador do gerente que fechou o turno"
      },
      {
        "fieldId": "totalApurado",
        "type": "money",
        "required": false,
        "description": "Valor total apurado no fechamento do turno para conferência, sem conciliação bancária"
      },
      {
        "fieldId": "notes",
        "type": "text",
        "required": false,
        "description": "Observações gerais sobre o turno"
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de criação do registro"
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora da última atualização do registro"
      }
    ],
    "statusEnum": [
      "open",
      "closed"
    ],
    "invariants": [
      "closedAt e closedBy são obrigatórios quando status for 'closed'",
      "closedAt deve ser posterior a openedAt",
      "totalApurado deve ser preenchido quando status for 'closed'",
      "Não pode haver dois turnos abertos simultaneamente",
      "status não pode voltar de 'closed' para 'open'"
    ],
    "valueObjects": []
  }
} as const;

export default shiftDomainEntity;

export const pipeline = [
  {
    "id": "shift__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.defs.ts",
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
