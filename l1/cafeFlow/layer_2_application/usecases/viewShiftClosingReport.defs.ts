/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.defs.ts" enhancement="_blank"/>

export const viewShiftClosingReportUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewShiftClosingReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewShiftClosingReport",
    "ports": [
      "ShiftClosingReport",
      "Shift"
    ],
    "functions": [
      {
        "functionName": "viewShiftClosingReport",
        "inputTypeName": "ViewShiftClosingReportInput",
        "outputTypeName": "ViewShiftClosingReportOutput",
        "input": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Identificador do turno fechado cujo relatório de fechamento será exibido."
          }
        ],
        "output": [
          {
            "name": "shiftClosingReportId",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Identificador único do relatório de fechamento."
          },
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Identificador do turno ao qual o relatório pertence."
          },
          {
            "name": "totalApurado",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Total apurado do turno — soma da receita registrada no fechamento (regra shiftClosingRecordsRevenue)."
          },
          {
            "name": "paidOrderCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Quantidade de pedidos pagos consolidados no período do turno (regra shiftClosingConsolidatesPaidOrders)."
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Data e hora de criação do relatório."
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Data e hora da última atualização do relatório."
          }
        ],
        "ports": [
          "ShiftClosingReport",
          "Shift"
        ],
        "rulesApplied": [
          "shiftClosingRecordsRevenue",
          "shiftClosingConsolidatesPaidOrders"
        ],
        "transactional": false,
        "steps": [
          "1. Receber shiftId do parâmetro de rota (entrada pública obrigatória).",
          "2. Carregar o Shift pelo shiftId através da porta Shift (getById) para validar que o turno existe e está com status 'closed'. Se o turno não existir, retornar erro de validação informando que o turno não foi encontrado. Se o turno não estiver fechado, retornar erro de validação informando que o relatório de fechamento só está disponível para turnos fechados.",
          "3. Carregar o ShiftClosingReport pelo shiftId através da porta ShiftClosingReport (getById usando o campo chave shiftId). Se nenhum relatório for encontrado para o shiftId, retornar resultado vazio (não há relatório de fechamento para este turno).",
          "4. Aplicar a regra shiftClosingRecordsRevenue: verificar que o campo totalApurado do relatório está presente e é um valor monetário válido (>= 0). Se o totalApurado for nulo ou negativo, registrar inconsistência e retornar erro de validação.",
          "5. Aplicar a regra shiftClosingConsolidatesPaidOrders: verificar que o campo paidOrderCount do relatório está presente e é um inteiro válido (>= 0). Se o paidOrderCount for nulo ou negativo, registrar inconsistência e retornar erro de validação.",
          "6. Retornar a projeção do relatório contendo: shiftClosingReportId, shiftId, totalApurado, paidOrderCount, createdAt, updatedAt — exclusivamente para o turno identificado pelo shiftId informado, sem incluir pedidos não pagos ou de outros turnos."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default viewShiftClosingReportUsecase;

export const pipeline = [
  {
    "id": "viewShiftClosingReport__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
