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
            "description": "Total apurado do turno para conferência do gerente."
          },
          {
            "name": "paidOrderCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Quantidade de pedidos pagos consolidados no período do turno."
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
          "1. Load the ShiftClosingReport from the ShiftClosingReport port using shiftId as the lookup key (getById on ShiftClosingReport.shiftId).",
          "2. If no ShiftClosingReport is found for the given shiftId, throw a NOT_FOUND error indicating that no closing report exists for the specified shift.",
          "3. Load the Shift from the Shift port using the same shiftId to verify the shift exists and is in 'closed' status.",
          "4. If the Shift is not found or its status is not 'closed', throw a VALIDATION error indicating the shift must be closed before its closing report can be viewed.",
          "5. Apply rule 'shiftClosingRecordsRevenue': verify that the report.totalApurado is consistent with the shift's recorded revenue (shift.totalApurado). If they diverge, include a warning detail in the response metadata but still return the report data — the rule is an assertion of data integrity, not a blocking condition for a view operation.",
          "6. Apply rule 'shiftClosingConsolidatesPaidOrders': verify that report.paidOrderCount is a non-negative integer representing only paid orders consolidated within the shift period. If the value is negative or non-integer, throw a DATA_INTEGRITY error referencing the rule id.",
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
