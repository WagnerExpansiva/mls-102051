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
            "type": "uuid",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Identificador do turno fechado cujo relatório de fechamento será exibido."
          }
        ],
        "output": [
          {
            "name": "shiftClosingReportId",
            "type": "uuid",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Identificador único do relatório de fechamento."
          },
          {
            "name": "shiftId",
            "type": "uuid",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Identificador do turno ao qual o relatório pertence."
          },
          {
            "name": "totalApurado",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Total apurado do turno — soma da receita registrada conforme a regra shiftClosingRecordsRevenue."
          },
          {
            "name": "paidOrderCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Quantidade de pedidos pagos consolidados no período do turno conforme a regra shiftClosingConsolidatesPaidOrders."
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
          "1. Load the Shift aggregate via Shift port using shiftId to verify the shift exists and its status is 'closed' — a closing report is only available for a closed shift.",
          "2. If the Shift is not found, return a validation error indicating the shift does not exist.",
          "3. If the Shift status is not 'closed', return a validation error indicating the closing report is only available for closed shifts (rule: shiftClosingRecordsRevenue requires a finalized shift).",
          "4. Load the ShiftClosingReport aggregate via ShiftClosingReport port using shiftId as the key field (getById pattern).",
          "5. If no ShiftClosingReport is found for the given shiftId, return an empty/not-found result.",
          "6. Verify the returned report's totalApurado reflects the revenue recorded for the shift (rule: shiftClosingRecordsRevenue) and paidOrderCount consolidates only paid orders (rule: shiftClosingConsolidatesPaidOrders) — these invariants were enforced at report creation; on read, validate that totalApurado >= 0 and paidOrderCount >= 0, returning a data-integrity error otherwise.",
          "7. Return the ShiftClosingReport fields: shiftClosingReportId, shiftId, totalApurado, paidOrderCount, createdAt, updatedAt."
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
