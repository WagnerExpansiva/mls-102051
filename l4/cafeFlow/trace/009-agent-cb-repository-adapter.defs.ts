{
  "savedAt": "2026-07-16T00:27:43.196Z",
  "agentName": "agentCbRepositoryAdapter",
  "stepId": 9,
  "planning": {
    "planId": "cb-gen-adapter",
    "dependsOn": [
      "cb-gen-table"
    ],
    "executionMode": "sequential",
    "executionHost": "client"
  },
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitRepositoryAdapters",
      "arguments": {
        "status": "ok",
        "questions": [],
        "trace": [
          "Analyzed 4 aggregates and 2 append-only events",
          "Mapped columns to snake_case real columns; detailsFields + embeddedMembers go into JSONB details",
          "Identified StockLevel MDM ref to StockItem to be resolved via ctx.mdm.collection.getMany/hydrateMany (bulk, no loop)",
          "Configured append-only insert-only + finders for StockAdjustment and StockConsumption",
          "Assigned ctx.data.moduleData for all local module table access per constraints"
        ],
        "result": {
          "items": [
            {
              "className": "OrderRepositoryAdapter",
              "entityId": "Order",
              "portRef": "IOrderRepository",
              "tableRef": "orders",
              "mdmReads": [],
              "notes": [
                "Domain aggregate Order <-> orders table row",
                "Real columns: order_id, shift_id, status, order_type, created_at",
                "details JSONB contains: tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, deliveredAt, updatedAt, items (embedded OrderItem[])",
                "Uses ctx.data.moduleData.orders"
              ]
            },
            {
              "className": "ShiftRepositoryAdapter",
              "entityId": "Shift",
              "portRef": "IShiftRepository",
              "tableRef": "shifts",
              "mdmReads": [],
              "notes": [
                "Domain aggregate Shift <-> shifts table row",
                "Real columns: shift_id, status, created_at",
                "details JSONB contains: openedAt, closedAt, openedBy, closedBy, totalApurado, notes, updatedAt",
                "Uses ctx.data.moduleData.shifts"
              ]
            },
            {
              "className": "StockLevelRepositoryAdapter",
              "entityId": "StockLevel",
              "portRef": "IStockLevelRepository",
              "tableRef": "stock_levels",
              "mdmReads": [
                "StockItem"
              ],
              "notes": [
                "Domain aggregate StockLevel <-> stock_levels table row",
                "Real columns: stock_level_id, stock_item_id, unit, created_at",
                "details JSONB contains: currentQuantity, minimumLevel, lastDecrementAt, lastAdjustmentAt, updatedAt",
                "MDM ref StockItem resolved via ctx.mdm.collection.getMany/hydrateMany using stock_item_id (bulk load, never in loop)",
                "Uses ctx.data.moduleData.stock_levels"
              ]
            },
            {
              "className": "ShiftClosingReportRepositoryAdapter",
              "entityId": "ShiftClosingReport",
              "portRef": "IShiftClosingReportRepository",
              "tableRef": "shift_closing_reports",
              "mdmReads": [],
              "notes": [
                "Domain aggregate ShiftClosingReport <-> shift_closing_reports table row",
                "Real columns: shift_closing_report_id, shift_id, created_at",
                "details JSONB contains: totalApurado, paidOrderCount, updatedAt",
                "Uses ctx.data.moduleData.shift_closing_reports"
              ]
            },
            {
              "className": "StockAdjustmentRepositoryAdapter",
              "entityId": "StockAdjustment",
              "portRef": "IStockAdjustmentRepository",
              "tableRef": "stock_adjustments",
              "mdmReads": [],
              "notes": [
                "Event StockAdjustment <-> stock_adjustments table row",
                "Real columns: stock_adjustment_id, stock_item_id, status, created_at",
                "details JSONB contains: quantity, reason, voidedAt, voidedReason",
                "Append-only: insert row only, no update/delete; provides read finders",
                "Uses ctx.data.moduleData.stock_adjustments"
              ]
            },
            {
              "className": "StockConsumptionRepositoryAdapter",
              "entityId": "StockConsumption",
              "portRef": "IStockConsumptionRepository",
              "tableRef": "stock_consumptions",
              "mdmReads": [],
              "notes": [
                "Event StockConsumption <-> stock_consumptions table row",
                "Real columns: stock_consumption_id, stock_item_id, order_id, status, created_at",
                "details JSONB contains: quantity, voidedAt, voidReason",
                "Append-only: insert row only, no update/delete; provides read finders",
                "Uses ctx.data.moduleData.stock_consumptions"
              ]
            }
          ]
        }
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
