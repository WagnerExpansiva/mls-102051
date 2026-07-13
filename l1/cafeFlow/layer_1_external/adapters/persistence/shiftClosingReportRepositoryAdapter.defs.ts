/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReportRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const shiftClosingReportRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "ShiftClosingReportRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "ShiftClosingReportRepository",
    "entityId": "ShiftClosingReport",
    "portRef": "IShiftClosingReportRepository",
    "tableRef": "shift_closing_reports",
    "mdmReads": [],
    "notes": [
      "Real columns (snake_case): shift_closing_report_id, shift_id, created_at.",
      "Details JSONB fields: totalApurado, paidOrderCount, updatedAt.",
      "Uses ctx.data.moduleData.shift_closing_reports for CRUD."
    ]
  }
} as const;

export default shiftClosingReportRepositoryAdapter;

export const pipeline = [
  {
    "id": "shiftClosingReportRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReportRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReportRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReport.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryAdapter.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
