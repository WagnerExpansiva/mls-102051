/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewShiftClosingReport.defs.ts" enhancement="_blank"/>

export const viewShiftClosingReportController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "viewShiftClosingReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "shiftLifecycle",
    "controllerName": "ViewShiftClosingReportController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowViewShiftClosingReportHandler",
        "command": "viewShiftClosingReport",
        "usecaseRef": "viewShiftClosingReport",
        "inputTypeName": "ViewShiftClosingReportInput",
        "kind": "view",
        "inputContract": [
          {
            "inputId": "shiftId",
            "fieldRef": "ShiftClosingReport.shiftId",
            "required": true,
            "source": "routeParam",
            "description": "Identificador do turno fechado cujo relatório de fechamento será exibido."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "ShiftClosingReport.shiftId",
            "source": "routeParam",
            "originRef": "routeParam.shiftId",
            "description": "O shiftId é extraído do parâmetro de rota para localizar o único relatório de fechamento correspondente ao turno fechado."
          }
        ],
        "accessPattern": {
          "kind": "getById",
          "description": "",
          "entity": "ShiftClosingReport",
          "keyField": "ShiftClosingReport.shiftId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "ShiftClosingReport.shiftClosingReportId",
            "ShiftClosingReport.shiftId",
            "ShiftClosingReport.totalApurado",
            "ShiftClosingReport.paidOrderCount",
            "ShiftClosingReport.createdAt",
            "ShiftClosingReport.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.shiftLifecycle.viewShiftClosingReport",
        "handlerName": "cafeFlowViewShiftClosingReportHandler"
      }
    ]
  }
} as const;

export default viewShiftClosingReportController;

export const pipeline = [
  {
    "id": "viewShiftClosingReport__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewShiftClosingReport.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewShiftClosingReport.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
