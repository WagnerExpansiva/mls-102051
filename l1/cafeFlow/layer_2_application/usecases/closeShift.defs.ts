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
          },
          {
            "name": "shiftId",
            "type": "string",
            "required": false,
            "description": "Identificador do turno aberto, resolvido automaticamente localizando o único Shift com status 'open'.",
            "ofEntity": "Shift"
          },
          {
            "name": "closedBy",
            "type": "string",
            "required": false,
            "description": "Identificador do gerente autenticado, resolvido a partir da sessão ativa (ctx.sessionContext.actorId).",
            "ofEntity": "Shift"
          },
          {
            "name": "closedAt",
            "type": "string",
            "required": false,
            "description": "Data e hora do fechamento, resolvida automaticamente como ctx.clock.now().",
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
          "1. Resolve closedBy from ctx.sessionContext.actorId and closedAt from ctx.clock.now().",
          "2. If shiftId is not provided, query the Shift port for all shifts with status='open' (rule: singleOpenShift).",
          "3. Validate that exactly one open shift exists — if zero or more than one, throw a validation error referencing rule 'singleOpenShift'.",
          "4. Load the target Shift aggregate via Shift port getById (using the resolved or provided shiftId).",
          "5. Validate the loaded Shift has status='open'; if not, throw a conflict error.",
          "6. Mutate the Shift: set status='closed', closedAt=resolved timestamp, closedBy=resolved actorId, totalApurado=input value, notes=input value (or null), updatedAt=ctx.clock.now().",
          "7. Query the Order port for all Orders where shiftId=target shiftId and status='delivered' to compute paidOrderCount (rule: shiftClosingRecordsRevenue — the closing report must record the revenue and paid order count).",
          "8. Create a ShiftClosingReport via ShiftClosingReport port: shiftClosingReportId=ctx.idGenerator.generate(), shiftId=target shiftId, totalApurado=input value, paidOrderCount=count from step 7, createdAt=ctx.clock.now(), updatedAt=ctx.clock.now().",
          "9. Save the mutated Shift and the new ShiftClosingReport inside a single transaction (ctx.data transaction wrapper).",
          "10. After save, verify no Shift with status='open' remains (rule: dashboardCurrentShiftOnly — the dashboard must show no current open shift after closing).",
          "11. Return the closed Shift fields (shiftId, status, closedAt, closedBy, totalApurado, notes) and the ShiftClosingReport fields (shiftClosingReportId, paidOrderCount)."
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
