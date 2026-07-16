{
  "savedAt": "2026-07-16T00:26:35.552Z",
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
                  "description": "shift lifecycle status"
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
                  ]
                },
                {
                  "indexName": "idx_shift_created_at",
                  "columns": [
                    "created_at"
                  ]
                }
              ],
              "detailsColumn": {
                "enabled": true,
                "childCollections": []
              },
              "purpose": "operational",
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
                  "description": "unit of measure discriminator"
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
                  ]
                },
                {
                  "indexName": "idx_stock_level_unit",
                  "columns": [
                    "unit"
                  ]
                },
                {
                  "indexName": "idx_stock_level_created_at",
                  "columns": [
                    "created_at"
                  ]
                }
              ],
              "detailsColumn": {
                "enabled": true,
                "childCollections": []
              },
              "purpose": "operational",
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
                  "description": "PK – unique report identifier"
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
                  "description": "ordering timestamp"
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
                  ]
                },
                {
                  "indexName": "idx_shift_closing_report_created_at",
                  "columns": [
                    "created_at"
                  ]
                }
              ],
              "detailsColumn": {
                "enabled": true,
                "childCollections": []
              },
              "purpose": "operational",
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
                  "description": "adjustment status"
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
                  ]
                },
                {
                  "indexName": "idx_stock_adjustment_status",
                  "columns": [
                    "status"
                  ]
                },
                {
                  "indexName": "idx_stock_adjustment_created_at",
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
          ]
        },
        "questions": [],
        "trace": [
          "Parsed 6 table definitions: 4 operational (Order, Shift, StockLevel, ShiftClosingReport) + 2 append-only event tables (StockAdjustment, StockConsumption)",
          "Mapped indexed fields to real columns; all detailsFields + childCollections routed to details JSONB column",
          "Primary keys: order_id, shift_id, stock_level_id, shift_closing_report_id, stock_adjustment_id, stock_consumption_id",
          "Indexes created for FK fields, status discriminators, and ordering timestamps",
          "Event tables flagged appendOnly=true, purpose=controle, retentionDays=365"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
