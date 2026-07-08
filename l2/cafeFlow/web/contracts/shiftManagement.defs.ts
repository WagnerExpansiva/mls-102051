/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/shiftManagement.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "openShift",
    "bffName": "cafeFlow.shiftLifecycle.openShift",
    "routeKey": "cafeFlow.shiftLifecycle.openShift",
    "purpose": "Abrir turno diário",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "description": "Observações gerais opcionais sobre o turno, informadas pelo gerente ao abrir."
      }
    ],
    "output": [
      {
        "name": "shiftId",
        "type": "string",
        "description": "Identificador único do turno"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "open",
          "closed"
        ],
        "description": "Situação atual do turno"
      },
      {
        "name": "openedAt",
        "type": "date",
        "description": "Data e hora de abertura do turno pelo gerente"
      },
      {
        "name": "openedBy",
        "type": "string",
        "description": "Identificador do gerente que abriu o turno"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:openShift",
      "operationId": "openShift",
      "defPath": "_102051_/l4/operations/openShift.defs.ts",
      "bffName": "cafeFlow.shiftLifecycle.openShift"
    }
  },
  {
    "commandName": "closeShift",
    "bffName": "cafeFlow.shiftLifecycle.closeShift",
    "routeKey": "cafeFlow.shiftLifecycle.closeShift",
    "purpose": "Fechar turno diário",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "totalApurado",
        "type": "number",
        "required": true,
        "description": "Valor total apurado no fechamento do turno, informado pelo gerente para conferência."
      },
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "description": "Observações gerais sobre o turno, opcionais."
      }
    ],
    "output": [
      {
        "name": "status",
        "type": "string",
        "enum": [
          "open",
          "closed"
        ],
        "description": "Situação atual do turno"
      },
      {
        "name": "closedAt",
        "type": "date",
        "description": "Data e hora de fechamento do turno"
      },
      {
        "name": "closedBy",
        "type": "string",
        "description": "Identificador do gerente que fechou o turno"
      },
      {
        "name": "totalApurado",
        "type": "number",
        "description": "Valor total apurado no fechamento do turno para conferência, sem conciliação bancária"
      },
      {
        "name": "notes",
        "type": "string",
        "description": "Observações gerais sobre o turno"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:closeShift",
      "operationId": "closeShift",
      "defPath": "_102051_/l4/operations/closeShift.defs.ts",
      "bffName": "cafeFlow.shiftLifecycle.closeShift"
    }
  },
  {
    "commandName": "viewShiftClosingReport",
    "bffName": "cafeFlow.shiftLifecycle.viewShiftClosingReport",
    "routeKey": "cafeFlow.shiftLifecycle.viewShiftClosingReport",
    "purpose": "Revisar relatório de fechamento de turno",
    "kind": "query",
    "outputShape": "object",
    "input": [],
    "output": [
      {
        "name": "shiftClosingReportId",
        "type": "string",
        "description": "Identificador único do relatório de fechamento de turno."
      },
      {
        "name": "shiftId",
        "type": "string",
        "description": "Referência ao turno fechado ao qual este relatório corresponde."
      },
      {
        "name": "totalApurado",
        "type": "number",
        "description": "Valor total apurado no fechamento do turno para conferência do gerente."
      },
      {
        "name": "paidOrderCount",
        "type": "number",
        "description": "Quantidade de pedidos pagos consolidados no período do turno."
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Data e hora em que o relatório de fechamento foi gerado."
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Data e hora da última atualização do relatório de fechamento."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:viewShiftClosingReport",
      "operationId": "viewShiftClosingReport",
      "defPath": "_102051_/l4/operations/viewShiftClosingReport.defs.ts",
      "bffName": "cafeFlow.shiftLifecycle.viewShiftClosingReport"
    }
  }
];

export const pipeline = [
  {
    "id": "shiftManagement__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102051_/l2/cafeFlow/web/contracts/shiftManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/contracts/shiftManagement.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
