/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.defs.ts" enhancement="_blank"/>

export const orderTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "Order",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "Order",
    "tableName": "order",
    "columns": [
      {
        "name": "order_id",
        "type": "text",
        "nullable": false,
        "description": "PK – unique order identifier"
      },
      {
        "name": "shift_id",
        "type": "text",
        "nullable": false,
        "description": "FK to shift"
      },
      {
        "name": "status",
        "type": "text",
        "nullable": false,
        "description": "order lifecycle status"
      },
      {
        "name": "order_type",
        "type": "text",
        "nullable": false,
        "description": "order type discriminator"
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
        "description": "tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, deliveredAt, updatedAt + child collection OrderItem"
      }
    ],
    "primaryKey": [
      "order_id"
    ],
    "indexes": [
      {
        "indexName": "idx_order_shift_id",
        "columns": [
          "shift_id"
        ]
      },
      {
        "indexName": "idx_order_status",
        "columns": [
          "status"
        ]
      },
      {
        "indexName": "idx_order_order_type",
        "columns": [
          "order_type"
        ]
      },
      {
        "indexName": "idx_order_created_at",
        "columns": [
          "created_at"
        ]
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "childCollections": [
        "OrderItem"
      ]
    },
    "purpose": "operational",
    "appendOnly": false
  }
} as const;

export default orderTableDefinition;

export const pipeline = [
  {
    "id": "order__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts"
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
