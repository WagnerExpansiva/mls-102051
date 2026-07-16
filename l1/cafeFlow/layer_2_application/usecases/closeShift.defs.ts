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
          "1. Query Shift port for all shifts with status='open' (resolve activeLifecycleInstance).",
          "2. Apply rule singleOpenShift: if zero or more than one open shift is found, throw validation error 'closeShift.singleOpenShift: exactly one open shift required'.",
          "3. Resolve closedBy from ctx.sessionContext.actorId (actorSession).",
          "4. Resolve closedAt from ctx.clock.now() (systemDefault).",
          "5. Load the open Shift aggregate via Shift port getById.",
          "6. Validate the Shift is in 'open' status (guard against race condition).",
          "7. Mutate the Shift: set status='closed', closedAt=resolved timestamp, closedBy=resolved actor id, totalApurado=input value, notes=input value (or null), updatedAt=ctx.clock.now().",
          "8. Save the Shift aggregate via Shift port save.",
          "9. Query Order port for all orders with shiftId=open shift id and status='delivered' to count paid orders (shiftClosingRecordsRevenue context).",
          "10. Generate shiftClosingReportId via ctx.idGenerator.",
          "11. Create ShiftClosingReport via ShiftClosingReport port: shiftId, totalApurado (from input), paidOrderCount (count of delivered orders), createdAt=ctx.clock.now(), updatedAt=ctx.clock.now().",
          "12. Apply rule dashboardCurrentShiftOnly: after closing, no shift remains 'open', so dashboard will show no active shift — this is the expected terminal state.",
          "13. Return shiftId, status='closed', closedAt, closedBy, totalApurado, notes."
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
