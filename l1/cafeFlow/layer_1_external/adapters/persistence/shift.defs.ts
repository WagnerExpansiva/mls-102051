/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shift.defs.ts" enhancement="_blank"/>

export const shiftTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "Shift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "Shift",
    "tableName": "shift",
    "columns": [
      {
        "name": "shift_id",
        "type": "text",
        "nullable": false,
        "description": "PK – unique shift identifier"
      },
      {
        "name": "status",
        "type": "text",
        "nullable": false,
        "description": "Shift lifecycle status"
      },
      {
        "name": "created_at",
        "type": "timestamp",
        "nullable": false,
        "description": "Creation timestamp for ordering"
      },
      {
        "name": "details",
        "type": "jsonb",
        "nullable": true,
        "description": "Details JSONB: openedAt, closedAt, openedBy, closedBy, totalApurado, notes, updatedAt"
      }
    ],
    "primaryKey": [
      "shift_id"
    ],
    "indexes": [
      {
        "indexName": "idx_shift_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_shift_created_at",
        "columns": [
          "created_at"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "columnName": "details",
      "childCollections": []
    },
    "appendOnly": false,
    "purpose": "operational",
    "retentionDays": 0
  }
} as const;

export default shiftTableDefinition;

export const pipeline = [
  {
    "id": "shift__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shift.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shift.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/persistenceTable.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
