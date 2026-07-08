/// <mls fileReference="_102051_/l4/cafeFlow/ontology/Shift.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityShift = {
  "entityId": "Shift",
  "title": "Turno",
  "description": "Turno diário aberto pelo gerente no início do expediente e fechado ao final, delimitando o período operacional dos pedidos.",
  "kind": "core",
  "ownership": "moduleOwned",
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
  "lifecycleStates": [
    "open",
    "closed"
  ]
} as const;

export default cafeFlowEntityShift;
