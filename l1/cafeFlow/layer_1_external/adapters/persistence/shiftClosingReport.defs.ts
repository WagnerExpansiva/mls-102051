/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReport.defs.ts" enhancement="_blank"/>

export const shiftClosingReportTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "ShiftClosingReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "ShiftClosingReport",
    "tableName": "shift_closing_report",
    "columns": [
      {
        "name": "shift_closing_report_id",
        "type": "text",
        "nullable": false,
        "description": "PK – unique closing report identifier"
      },
      {
        "name": "shift_id",
        "type": "text",
        "nullable": false,
        "description": "FK to shift"
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
        "description": "Details JSONB: totalApurado, paidOrderCount, updatedAt"
      }
    ],
    "primaryKey": [
      "shift_closing_report_id"
    ],
    "indexes": [
      {
        "indexName": "idx_shift_closing_report_shift_id",
        "columns": [
          "shift_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_shift_closing_report_created_at",
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

export default shiftClosingReportTableDefinition;

export const pipeline = [
  {
    "id": "shiftClosingReport__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReport.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReport.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.d.ts"
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
