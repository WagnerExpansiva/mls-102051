/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.defs.ts" enhancement="_blank"/>

export const shiftClosingReportRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "ShiftClosingReportRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "ShiftClosingReport",
    "interfaceName": "IShiftClosingReportRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "ShiftClosingReport",
        "params": [
          "reportId: ShiftClosingReportId"
        ]
      },
      {
        "name": "list",
        "returns": "ShiftClosingReport[]",
        "params": [
          "filter: ShiftClosingReportFilter"
        ]
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "report: ShiftClosingReport"
        ]
      },
      {
        "name": "findByShiftId",
        "returns": "ShiftClosingReport[]",
        "params": [
          "shiftId: ShiftId"
        ]
      },
      {
        "name": "findByPeriod",
        "returns": "ShiftClosingReport[]",
        "params": [
          "start: Date",
          "end: Date"
        ]
      }
    ]
  }
} as const;

export default shiftClosingReportRepositoryPort;

export const pipeline = [
  {
    "id": "shiftClosingReportRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
