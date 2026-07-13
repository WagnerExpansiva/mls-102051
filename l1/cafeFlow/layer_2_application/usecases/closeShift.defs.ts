/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/closeShift.defs.ts" enhancement="_blank"/>

export const closeShiftUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "closeShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "closeShift",
    "ports": [
      "Shift",
      "Order",
      "ShiftClosingReport",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "closeShift",
        "inputTypeName": "CloseShiftInput",
        "outputTypeName": "CloseShiftOutput",
        "input": [
          {
            "name": "totalApurado",
            "type": "number",
            "required": true,
            "description": "Valor total apurado no fechamento do turno, informado pelo gerente para conferência.",
            "ofEntity": "Shift"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "description": "Observações gerais sobre o turno, opcionais.",
            "ofEntity": "Shift"
          }
        ],
        "output": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "ofEntity": "Shift"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Shift"
          },
          {
            "name": "closedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Shift"
          },
          {
            "name": "closedBy",
            "type": "string",
            "required": true,
            "ofEntity": "Shift"
          },
          {
            "name": "totalApurado",
            "type": "number",
            "required": true,
            "ofEntity": "Shift"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "Shift"
          },
          {
            "name": "shiftClosingReportId",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "paidOrderCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          }
        ],
        "ports": [
          "Shift",
          "Order",
          "ShiftClosingReport"
        ],
        "rulesApplied": [
          "singleOpenShift",
          "shiftClosingRecordsRevenue",
          "dashboardCurrentShiftOnly"
        ],
        "transactional": true,
        "steps": [
          "1. Resolve the active lifecycle instance: query the Shift port for all Shifts with status='open' (list by status filter).",
          "2. Apply rule 'singleOpenShift': validate that exactly one Shift with status='open' exists. If zero or more than one, throw a validation error referencing rule 'singleOpenShift'.",
          "3. Use the found open Shift's shiftId as the target for closing.",
          "4. Resolve closedBy from ctx.sessionContext.actorId (the authenticated manager).",
          "5. Resolve closedAt from ctx.clock.now() formatted as ISO datetime.",
          "6. Apply rule 'shiftClosingRecordsRevenue': set Shift.totalApurado to the user-provided totalApurado value, Shift.status to 'closed', Shift.closedBy, Shift.closedAt, and Shift.notes from input.",
          "7. Update the Shift aggregate through its port (save) inside the transaction.",
          "8. Query the Order port for all Orders where shiftId equals the closed shift's id; count those with status='delivered' to determine paidOrderCount.",
          "9. Generate a new shiftClosingReportId via ctx.idGenerator.",
          "10. Create a ShiftClosingReport record through its port with: shiftClosingReportId, shiftId, totalApurado (from input), paidOrderCount, createdAt = ctx.clock.now(), updatedAt = ctx.clock.now().",
          "11. Apply rule 'dashboardCurrentShiftOnly': after the transaction commits, no Shift remains with status='open' — this is guaranteed by the status transition in step 6.",
          "12. Return the closed Shift fields (shiftId, status, closedAt, closedBy, totalApurado, notes) and the generated ShiftClosingReport fields (shiftClosingReportId, paidOrderCount)."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default closeShiftUsecase;

export const pipeline = [
  {
    "id": "closeShift__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/closeShift.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/closeShift.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
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
