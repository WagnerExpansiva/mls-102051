{
  "savedAt": "2026-07-16T17:21:44.447Z",
  "agentName": "agentCbPersistenceTable",
  "stepId": 8,
  "planning": {
    "planId": "cb-gen-table",
    "dependsOn": [
      "cb-gen-port"
    ],
    "executionMode": "sequential",
    "executionHost": "client"
  },
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitPersistenceTables",
      "arguments": {
        "status": "ok",
        "result": {
          "items": [
            {
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
                  "description": "Order lifecycle status"
                },
                {
                  "name": "order_type",
                  "type": "text",
                  "nullable": false,
                  "description": "Order type (e.g. dine-in, takeaway)"
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
                  "description": "tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, deliveredAt, updatedAt + OrderItem child collection"
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
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_order_status",
                  "columns": [
                    "status"
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_order_order_type",
                  "columns": [
                    "order_type"
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_order_created_at",
                  "columns": [
                    "created_at"
                  ],
                  "unique": false
                }
              ],
              "detailsColumn": {
                "enabled": true,
                "childCollections": [
                  "OrderItem"
                ]
              },
              "appendOnly": false
            },
            {
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
                  "nullable": false,
                  "description": "openedAt, closedAt, openedBy, closedBy, totalApurado, notes, updatedAt"
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
                "childCollections": []
              },
              "appendOnly": false
            },
            {
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
                  "description": "Unit of measure (filterable)"
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
                  "description": "currentQuantity, minimumLevel, lastDecrementAt, lastAdjustmentAt, updatedAt"
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
                "childCollections": []
              },
              "appendOnly": false
            },
            {
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
                  "nullable": false,
                  "description": "totalApurado, paidOrderCount, updatedAt"
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
                "childCollections": []
              },
              "appendOnly": false
            },
            {
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
            },
            {
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
                  "description": "FK to order that triggered consumption"
                },
                {
                  "name": "status",
                  "type": "text",
                  "nullable": false,
                  "description": "Consumption status (active/voided)"
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
                "childCollections": []
              },
              "appendOnly": true,
              "purpose": "controle",
              "retentionDays": 365
            }
          ]
        },
        "questions": [],
        "trace": [
          "Derived 6 table definitions from indexed-column analysis",
          "Permanent tables: order, shift, stock_level, shift_closing_report – details JSONB holds non-indexed fields + child collections",
          "Append-only event tables: stock_adjustment, stock_consumption – appendOnly=true, purpose=controle, retentionDays=365",
          "Each table: PK from entity's own ID, FK columns indexed separately, status/ordering columns indexed, remaining fields in details JSONB"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
