/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevel.defs.ts" enhancement="_blank"/>

export const stockLevelTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "StockLevel",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "StockLevel",
    "tableName": "stock_level",
    "columns": [
      {
        "name": "stock_level_id",
        "type": "text",
        "nullable": false,
        "description": "PK – unique stock level identifier"
      },
      {
        "name": "stock_item_id",
        "type": "text",
        "nullable": false,
        "description": "FK to stock item"
      },
      {
        "name": "unit",
        "type": "text",
        "nullable": false,
        "description": "Unit of measure (status-like filter)"
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
        "description": "Details JSONB: currentQuantity, minimumLevel, lastDecrementAt, lastAdjustmentAt, updatedAt"
      }
    ],
    "primaryKey": [
      "stock_level_id"
    ],
    "indexes": [
      {
        "indexName": "idx_stock_level_stock_item_id",
        "columns": [
          "stock_item_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_level_unit",
        "columns": [
          "unit"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_level_created_at",
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

export default stockLevelTableDefinition;

export const pipeline = [
  {
    "id": "stockLevel__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevel.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockLevel.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.d.ts"
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
