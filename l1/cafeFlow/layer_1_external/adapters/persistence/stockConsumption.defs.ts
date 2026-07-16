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
        "type": "text",
        "nullable": false,
        "description": "PK – unique consumption identifier"
      },
      {
        "name": "stock_item_id",
        "type": "text",
        "nullable": false,
        "description": "FK to stock item (owner)"
      },
      {
        "name": "order_id",
        "type": "text",
        "nullable": false,
        "description": "FK to order"
      },
      {
        "name": "status",
        "type": "text",
        "nullable": false,
        "description": "consumption status"
      },
      {
        "name": "created_at",
        "type": "timestamp",
        "nullable": false,
        "description": "ordering timestamp"
      },
      {
        "name": "details",
        "type": "jsonb",
        "nullable": false,
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
        ]
      },
      {
        "indexName": "idx_stock_consumption_order_id",
        "columns": [
          "order_id"
        ]
      },
      {
        "indexName": "idx_stock_consumption_status",
        "columns": [
          "status"
        ]
      },
      {
        "indexName": "idx_stock_consumption_created_at",
        "columns": [
          "created_at"
        ]
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "childCollections": []
    },
    "purpose": "controle",
    "appendOnly": true,
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
