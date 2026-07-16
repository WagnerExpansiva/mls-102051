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
            "ofEntity": "Shift",
            "description": "Valor total apurado no fechamento do turno, informado pelo gerente para conferência."
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "Shift",
            "description": "Observações gerais sobre o turno, opcionais."
          }
        ],
        "output": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "ofEntity": "Shift",
            "description": "Identificador do turno fechado."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Shift",
            "description": "Status do turno após fechamento ('closed')."
          },
          {
            "name": "closedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Shift",
            "description": "Data e hora do fechamento."
          },
          {
            "name": "closedBy",
            "type": "string",
            "required": true,
            "ofEntity": "Shift",
            "description": "Identificador do gerente que fechou o turno."
          },
          {
            "name": "totalApurado",
            "type": "number",
            "required": true,
            "ofEntity": "Shift",
            "description": "Valor total apurado informado."
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "Shift",
            "description": "Observações registradas no fechamento."
          },
          {
            "name": "shiftClosingReportId",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Identificador do relatório de fechamento gerado."
          },
          {
            "name": "paidOrderCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "description": "Quantidade de pedidos entregues (pagos) no turno."
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
          "1. Resolve the active open Shift by querying the Shift port for status='open' (activeLifecycleInstance). If zero or more than one open shift is found, raise validation error per singleOpenShift rule.",
          "2. Resolve closedBy from ctx.sessionContext.actorId (actorSession) and closedAt from ctx.clock.now() (systemDefault).",
          "3. Load all Orders for the resolved shiftId via the Order port (list by shiftId) to compute paidOrderCount = count of orders with status='delivered'.",
          "4. Mutate the Shift aggregate: set status='closed', closedAt=resolved timestamp, closedBy=resolved actorId, totalApurado=input value, notes=input value (if provided), updatedAt=resolved timestamp. Save via Shift port.",
          "5. Create a ShiftClosingReport with a generated id (ctx.idGenerator), shiftId, totalApurado, paidOrderCount, createdAt and updatedAt = resolved timestamp. Save via ShiftClosingReport port.",
          "6. Return the closed Shift fields and the generated ShiftClosingReport id and paidOrderCount."
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
