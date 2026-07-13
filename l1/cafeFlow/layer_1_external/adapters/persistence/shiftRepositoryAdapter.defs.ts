/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const shiftRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "ShiftRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "ShiftRepository",
    "entityId": "Shift",
    "portRef": "IShiftRepository",
    "tableRef": "shifts",
    "mdmReads": [],
    "notes": [
      "Real columns (snake_case): shift_id, status, created_at.",
      "Details JSONB fields: openedAt, closedAt, openedBy, closedBy, totalApurado, notes, updatedAt.",
      "Uses ctx.data.moduleData.shifts for CRUD."
    ]
  }
} as const;

export default shiftRepositoryAdapter;

export const pipeline = [
  {
    "id": "shiftRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.d.ts"
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
