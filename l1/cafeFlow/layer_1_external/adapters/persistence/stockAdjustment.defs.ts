/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.defs.ts" enhancement="_blank"/>

export const stockAdjustmentTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "StockAdjustment",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "StockAdjustment",
    "tableName": "stock_adjustment",
    "columns": [
      {
        "name": "stock_adjustment_id",
        "type": "text",
        "nullable": false,
        "description": "PK – unique adjustment identifier"
      },
      {
        "name": "stock_item_id",
        "type": "text",
        "nullable": false,
        "description": "FK to stock item (owner)"
      },
      {
        "name": "status",
        "type": "text",
        "nullable": false,
        "description": "Adjustment status (active/voided)"
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
        "nullable": false,
        "description": "quantity, reason, voidedAt, voidedReason"
      }
    ],
    "primaryKey": [
      "stock_adjustment_id"
    ],
    "indexes": [
      {
        "indexName": "idx_stock_adjustment_stock_item_id",
        "columns": [
          "stock_item_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_created_at",
        "columns": [
          "created_at"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "childCollections": []
    },
    "appendOnly": true,
    "purpose": "controle",
    "retentionDays": 365
  }
} as const;

export default stockAdjustmentTableDefinition;

export const pipeline = [
  {
    "id": "stockAdjustment__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.d.ts"
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
