/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumption.defs.ts" enhancement="_blank"/>

export const stockConsumptionTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "StockConsumption",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "StockConsumption",
    "tableName": "stock_consumption",
    "columns": [
      {
        "name": "stock_consumption_id",
        "type": "UUID",
        "nullable": false,
        "description": "Primary key"
      },
      {
        "name": "stock_item_id",
        "type": "UUID",
        "nullable": false,
        "description": "FK to stock item"
      },
      {
        "name": "order_id",
        "type": "UUID",
        "nullable": false,
        "description": "FK to order"
      },
      {
        "name": "status",
        "type": "VARCHAR",
        "nullable": false,
        "description": "Consumption status"
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP",
        "nullable": false,
        "description": "Creation timestamp for ordering"
      },
      {
        "name": "details",
        "type": "JSONB",
        "nullable": true,
        "description": "quantity, voidedAt, voidReason"
      }
    ],
    "primaryKey": [
      "stock_consumption_id"
    ],
    "indexes": [
      {
        "indexName": "idx_stock_consumption_stock_item_id",
        "columns": [
          "stock_item_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_consumption_order_id",
        "columns": [
          "order_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_consumption_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_consumption_created_at",
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
    "appendOnly": true,
    "purpose": "controle",
    "retentionDays": 365
  }
} as const;

export default stockConsumptionTableDefinition;

export const pipeline = [
  {
    "id": "stockConsumption__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumption.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumption.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
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
