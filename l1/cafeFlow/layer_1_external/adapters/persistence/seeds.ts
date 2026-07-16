/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>

// Deterministic initial data for cafeFlow. Scenario planned by agentCbSeeds; rows and ids compiled locally.
// TableSeedRows exports are discovered by shape and merged by the persistence registry.

/* <agentCbSeedsPlan>
{
  "version": 1,
  "moduleName": "cafeFlow",
  "language": "en",
  "plan": {
    "summary": "Cafe flow seed scenario: 3 menu categories, 4 menu items (3 active with ingredients, 1 draft without — per menuItemRequiresIngredient rule), 4 stock items, 2 shifts (1 closed with closing report, 1 open — per singleOpenShift rule), 3 orders covering delivered/inPreparation/received states (per orderStatusFlow, inProgressBeforeReady, readyBeforeDelivered, fifoKitchenQueue rules), 4 menu item ingredients, 4 order items (all simple per simpleItemsOnly rule), 4 stock levels (3 below minimum triggering low-stock alerts per lowStockAlertCalculation rule), 5 stock consumption events (decremented at order launch per stockDecrementOnOrderLaunch rule), and 1 stock adjustment for spoiled milk. ShiftClosingReport consolidates paid orders and records revenue per shiftClosingConsolidatesPaidOrders and shiftClosingRecordsRevenue rules.",
    "localTables": [
      {
        "tableId": "MenuItemIngredient",
        "rows": [
          {
            "key": "ing-espresso-coffee",
            "columns": [
              {
                "name": "menu_item_ingredient_id",
                "value": "ing-espresso-coffee"
              },
              {
                "name": "menu_item_id",
                "value": {
                  "ref": "mdm:MenuItem.mi-espresso"
                }
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-coffee-beans"
                }
              },
              {
                "name": "unit",
                "value": "kg"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T08:50:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": 0.02
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:50:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "ing-cappuccino-coffee",
            "columns": [
              {
                "name": "menu_item_ingredient_id",
                "value": "ing-cappuccino-coffee"
              },
              {
                "name": "menu_item_id",
                "value": {
                  "ref": "mdm:MenuItem.mi-cappuccino"
                }
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-coffee-beans"
                }
              },
              {
                "name": "unit",
                "value": "kg"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T08:55:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": 0.02
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:55:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "ing-cappuccino-milk",
            "columns": [
              {
                "name": "menu_item_ingredient_id",
                "value": "ing-cappuccino-milk"
              },
              {
                "name": "menu_item_id",
                "value": {
                  "ref": "mdm:MenuItem.mi-cappuccino"
                }
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-milk"
                }
              },
              {
                "name": "unit",
                "value": "liter"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T08:55:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": 0.15
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:55:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "ing-sandwich-bread",
            "columns": [
              {
                "name": "menu_item_ingredient_id",
                "value": "ing-sandwich-bread"
              },
              {
                "name": "menu_item_id",
                "value": {
                  "ref": "mdm:MenuItem.mi-club-sandwich"
                }
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-bread"
                }
              },
              {
                "name": "unit",
                "value": "unit"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T09:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": 2
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T09:00:00.000Z"
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "Shift",
        "rows": [
          {
            "key": "shift-01",
            "columns": [
              {
                "name": "shift_id",
                "value": "shift-01"
              },
              {
                "name": "status",
                "value": "closed"
              },
              {
                "name": "created_at",
                "value": "2026-07-02T08:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "openedAt",
                "value": "2026-07-02T08:00:00.000Z"
              },
              {
                "name": "closedAt",
                "value": "2026-07-02T18:00:00.000Z"
              },
              {
                "name": "openedBy",
                "value": "Wagner"
              },
              {
                "name": "closedBy",
                "value": "Wagner"
              },
              {
                "name": "totalApurado",
                "value": 19
              },
              {
                "name": "notes",
                "value": "Normal shift"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T18:05:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "shift-02",
            "columns": [
              {
                "name": "shift_id",
                "value": "shift-02"
              },
              {
                "name": "status",
                "value": "open"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T08:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "openedAt",
                "value": "2026-07-03T08:00:00.000Z"
              },
              {
                "name": "closedAt",
                "value": null
              },
              {
                "name": "openedBy",
                "value": "Wagner"
              },
              {
                "name": "closedBy",
                "value": null
              },
              {
                "name": "totalApurado",
                "value": null
              },
              {
                "name": "notes",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T08:00:00.000Z"
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "Order",
        "rows": [
          {
            "key": "order-01",
            "columns": [
              {
                "name": "order_id",
                "value": "order-01"
              },
              {
                "name": "shift_id",
                "value": {
                  "ref": "local:Shift.shift-01"
                }
              },
              {
                "name": "status",
                "value": "delivered"
              },
              {
                "name": "order_type",
                "value": "table"
              },
              {
                "name": "created_at",
                "value": "2026-07-02T10:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "tableNumber",
                "value": "5"
              },
              {
                "name": "priority",
                "value": false
              },
              {
                "name": "priorityReason",
                "value": null
              },
              {
                "name": "receivedAt",
                "value": "2026-07-02T10:01:00.000Z"
              },
              {
                "name": "inPreparationAt",
                "value": "2026-07-02T10:05:00.000Z"
              },
              {
                "name": "readyAt",
                "value": "2026-07-02T10:20:00.000Z"
              },
              {
                "name": "deliveredAt",
                "value": "2026-07-02T10:30:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T10:30:00.000Z"
              }
            ],
            "children": [
              {
                "name": "OrderItem",
                "rows": [
                  {
                    "key": "oi-01",
                    "fields": [
                      {
                        "name": "orderItemId",
                        "value": "oi-01"
                      },
                      {
                        "name": "orderId",
                        "value": {
                          "ref": "local:Order.order-01"
                        }
                      },
                      {
                        "name": "menuItemId",
                        "value": {
                          "ref": "mdm:MenuItem.mi-espresso"
                        }
                      },
                      {
                        "name": "quantity",
                        "value": 2
                      },
                      {
                        "name": "unitPrice",
                        "value": 3.5
                      },
                      {
                        "name": "createdAt",
                        "value": "2026-07-02T10:00:00.000Z"
                      },
                      {
                        "name": "updatedAt",
                        "value": "2026-07-02T10:00:00.000Z"
                      }
                    ]
                  },
                  {
                    "key": "oi-02",
                    "fields": [
                      {
                        "name": "orderItemId",
                        "value": "oi-02"
                      },
                      {
                        "name": "orderId",
                        "value": {
                          "ref": "local:Order.order-01"
                        }
                      },
                      {
                        "name": "menuItemId",
                        "value": {
                          "ref": "mdm:MenuItem.mi-club-sandwich"
                        }
                      },
                      {
                        "name": "quantity",
                        "value": 1
                      },
                      {
                        "name": "unitPrice",
                        "value": 12
                      },
                      {
                        "name": "createdAt",
                        "value": "2026-07-02T10:00:00.000Z"
                      },
                      {
                        "name": "updatedAt",
                        "value": "2026-07-02T10:00:00.000Z"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "order-02",
            "columns": [
              {
                "name": "order_id",
                "value": "order-02"
              },
              {
                "name": "shift_id",
                "value": {
                  "ref": "local:Shift.shift-02"
                }
              },
              {
                "name": "status",
                "value": "inPreparation"
              },
              {
                "name": "order_type",
                "value": "takeout"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T09:30:00.000Z"
              }
            ],
            "details": [
              {
                "name": "tableNumber",
                "value": null
              },
              {
                "name": "priority",
                "value": false
              },
              {
                "name": "priorityReason",
                "value": null
              },
              {
                "name": "receivedAt",
                "value": "2026-07-03T09:31:00.000Z"
              },
              {
                "name": "inPreparationAt",
                "value": "2026-07-03T09:35:00.000Z"
              },
              {
                "name": "readyAt",
                "value": null
              },
              {
                "name": "deliveredAt",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T09:35:00.000Z"
              }
            ],
            "children": [
              {
                "name": "OrderItem",
                "rows": [
                  {
                    "key": "oi-03",
                    "fields": [
                      {
                        "name": "orderItemId",
                        "value": "oi-03"
                      },
                      {
                        "name": "orderId",
                        "value": {
                          "ref": "local:Order.order-02"
                        }
                      },
                      {
                        "name": "menuItemId",
                        "value": {
                          "ref": "mdm:MenuItem.mi-cappuccino"
                        }
                      },
                      {
                        "name": "quantity",
                        "value": 1
                      },
                      {
                        "name": "unitPrice",
                        "value": 5
                      },
                      {
                        "name": "createdAt",
                        "value": "2026-07-03T09:30:00.000Z"
                      },
                      {
                        "name": "updatedAt",
                        "value": "2026-07-03T09:30:00.000Z"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "order-03",
            "columns": [
              {
                "name": "order_id",
                "value": "order-03"
              },
              {
                "name": "shift_id",
                "value": {
                  "ref": "local:Shift.shift-02"
                }
              },
              {
                "name": "status",
                "value": "received"
              },
              {
                "name": "order_type",
                "value": "table"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T10:15:00.000Z"
              }
            ],
            "details": [
              {
                "name": "tableNumber",
                "value": "3"
              },
              {
                "name": "priority",
                "value": true
              },
              {
                "name": "priorityReason",
                "value": "Customer with flight in 30 minutes"
              },
              {
                "name": "receivedAt",
                "value": "2026-07-03T10:16:00.000Z"
              },
              {
                "name": "inPreparationAt",
                "value": null
              },
              {
                "name": "readyAt",
                "value": null
              },
              {
                "name": "deliveredAt",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T10:16:00.000Z"
              }
            ],
            "children": [
              {
                "name": "OrderItem",
                "rows": [
                  {
                    "key": "oi-04",
                    "fields": [
                      {
                        "name": "orderItemId",
                        "value": "oi-04"
                      },
                      {
                        "name": "orderId",
                        "value": {
                          "ref": "local:Order.order-03"
                        }
                      },
                      {
                        "name": "menuItemId",
                        "value": {
                          "ref": "mdm:MenuItem.mi-espresso"
                        }
                      },
                      {
                        "name": "quantity",
                        "value": 1
                      },
                      {
                        "name": "unitPrice",
                        "value": 3.5
                      },
                      {
                        "name": "createdAt",
                        "value": "2026-07-03T10:15:00.000Z"
                      },
                      {
                        "name": "updatedAt",
                        "value": "2026-07-03T10:15:00.000Z"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "tableId": "ShiftClosingReport",
        "rows": [
          {
            "key": "scr-01",
            "columns": [
              {
                "name": "shift_closing_report_id",
                "value": "scr-01"
              },
              {
                "name": "shift_id",
                "value": {
                  "ref": "local:Shift.shift-01"
                }
              },
              {
                "name": "created_at",
                "value": "2026-07-02T18:10:00.000Z"
              }
            ],
            "details": [
              {
                "name": "totalApurado",
                "value": 19
              },
              {
                "name": "paidOrderCount",
                "value": 1
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T18:10:00.000Z"
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "StockAdjustment",
        "rows": [
          {
            "key": "sa-01",
            "columns": [
              {
                "name": "stock_adjustment_id",
                "value": "sa-01"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-milk"
                }
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T07:30:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": -3
              },
              {
                "name": "reason",
                "value": "Spoiled milk discarded"
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidedReason",
                "value": null
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "StockConsumption",
        "rows": [
          {
            "key": "sc-01",
            "columns": [
              {
                "name": "stock_consumption_id",
                "value": "sc-01"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-coffee-beans"
                }
              },
              {
                "name": "order_id",
                "value": {
                  "ref": "local:Order.order-01"
                }
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-02T10:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": 0.04
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              }
            ],
            "children": []
          },
          {
            "key": "sc-02",
            "columns": [
              {
                "name": "stock_consumption_id",
                "value": "sc-02"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-bread"
                }
              },
              {
                "name": "order_id",
                "value": {
                  "ref": "local:Order.order-01"
                }
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-02T10:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": 2
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              }
            ],
            "children": []
          },
          {
            "key": "sc-03",
            "columns": [
              {
                "name": "stock_consumption_id",
                "value": "sc-03"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-coffee-beans"
                }
              },
              {
                "name": "order_id",
                "value": {
                  "ref": "local:Order.order-02"
                }
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T09:30:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": 0.02
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              }
            ],
            "children": []
          },
          {
            "key": "sc-04",
            "columns": [
              {
                "name": "stock_consumption_id",
                "value": "sc-04"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-milk"
                }
              },
              {
                "name": "order_id",
                "value": {
                  "ref": "local:Order.order-02"
                }
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T09:30:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": 0.15
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              }
            ],
            "children": []
          },
          {
            "key": "sc-05",
            "columns": [
              {
                "name": "stock_consumption_id",
                "value": "sc-05"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-coffee-beans"
                }
              },
              {
                "name": "order_id",
                "value": {
                  "ref": "local:Order.order-03"
                }
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T10:15:00.000Z"
              }
            ],
            "details": [
              {
                "name": "quantity",
                "value": 0.02
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "StockLevel",
        "rows": [
          {
            "key": "sl-coffee-beans",
            "columns": [
              {
                "name": "stock_level_id",
                "value": "sl-coffee-beans"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-coffee-beans"
                }
              },
              {
                "name": "unit",
                "value": "kg"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "currentQuantity",
                "value": 1.92
              },
              {
                "name": "minimumLevel",
                "value": 2
              },
              {
                "name": "lastDecrementAt",
                "value": "2026-07-03T10:15:00.000Z"
              },
              {
                "name": "lastAdjustmentAt",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T10:15:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "sl-milk",
            "columns": [
              {
                "name": "stock_level_id",
                "value": "sl-milk"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-milk"
                }
              },
              {
                "name": "unit",
                "value": "liter"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "currentQuantity",
                "value": 1.85
              },
              {
                "name": "minimumLevel",
                "value": 5
              },
              {
                "name": "lastDecrementAt",
                "value": "2026-07-03T09:30:00.000Z"
              },
              {
                "name": "lastAdjustmentAt",
                "value": "2026-07-03T07:30:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T09:30:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "sl-bread",
            "columns": [
              {
                "name": "stock_level_id",
                "value": "sl-bread"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-bread"
                }
              },
              {
                "name": "unit",
                "value": "unit"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "currentQuantity",
                "value": 8
              },
              {
                "name": "minimumLevel",
                "value": 10
              },
              {
                "name": "lastDecrementAt",
                "value": "2026-07-02T10:00:00.000Z"
              },
              {
                "name": "lastAdjustmentAt",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T10:00:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "sl-chocolate",
            "columns": [
              {
                "name": "stock_level_id",
                "value": "sl-chocolate"
              },
              {
                "name": "stock_item_id",
                "value": {
                  "ref": "mdm:StockItem.si-chocolate"
                }
              },
              {
                "name": "unit",
                "value": "kg"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "currentQuantity",
                "value": 3
              },
              {
                "name": "minimumLevel",
                "value": 1
              },
              {
                "name": "lastDecrementAt",
                "value": null
              },
              {
                "name": "lastAdjustmentAt",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "children": []
          }
        ]
      }
    ],
    "mdmEntities": [
      {
        "entityId": "MenuCategory",
        "rows": [
          {
            "key": "cat-beverages",
            "fields": [
              {
                "name": "menuCategoryId",
                "value": "cat-beverages"
              },
              {
                "name": "name",
                "value": "Beverages"
              },
              {
                "name": "description",
                "value": "Hot and cold drinks"
              },
              {
                "name": "displayOrder",
                "value": 1
              },
              {
                "name": "active",
                "value": true
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "cat-sandwiches",
            "fields": [
              {
                "name": "menuCategoryId",
                "value": "cat-sandwiches"
              },
              {
                "name": "name",
                "value": "Sandwiches"
              },
              {
                "name": "description",
                "value": "Fresh made sandwiches"
              },
              {
                "name": "displayOrder",
                "value": 2
              },
              {
                "name": "active",
                "value": true
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:05:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:05:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "cat-desserts",
            "fields": [
              {
                "name": "menuCategoryId",
                "value": "cat-desserts"
              },
              {
                "name": "name",
                "value": "Desserts"
              },
              {
                "name": "description",
                "value": "Sweet treats"
              },
              {
                "name": "displayOrder",
                "value": 3
              },
              {
                "name": "active",
                "value": true
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:10:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:10:00.000Z"
              }
            ],
            "relationships": []
          }
        ]
      },
      {
        "entityId": "MenuItem",
        "rows": [
          {
            "key": "mi-espresso",
            "fields": [
              {
                "name": "menuItemId",
                "value": "mi-espresso"
              },
              {
                "name": "name",
                "value": "Espresso"
              },
              {
                "name": "description",
                "value": "Single shot espresso"
              },
              {
                "name": "menuCategoryId",
                "value": {
                  "ref": "mdm:MenuCategory.cat-beverages"
                }
              },
              {
                "name": "price",
                "value": 3.5
              },
              {
                "name": "itemType",
                "value": "simple"
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "activatedAt",
                "value": "2026-07-01T09:00:00.000Z"
              },
              {
                "name": "inactivatedAt",
                "value": null
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:30:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T09:00:00.000Z"
              }
            ],
            "relationships": [
              {
                "targetRef": "mdm:MenuCategory.cat-beverages",
                "type": "manyToOne",
                "metadata": [],
                "isBidirectional": false
              }
            ]
          },
          {
            "key": "mi-cappuccino",
            "fields": [
              {
                "name": "menuItemId",
                "value": "mi-cappuccino"
              },
              {
                "name": "name",
                "value": "Cappuccino"
              },
              {
                "name": "description",
                "value": "Espresso with steamed milk"
              },
              {
                "name": "menuCategoryId",
                "value": {
                  "ref": "mdm:MenuCategory.cat-beverages"
                }
              },
              {
                "name": "price",
                "value": 5
              },
              {
                "name": "itemType",
                "value": "simple"
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "activatedAt",
                "value": "2026-07-01T09:05:00.000Z"
              },
              {
                "name": "inactivatedAt",
                "value": null
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:35:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T09:05:00.000Z"
              }
            ],
            "relationships": [
              {
                "targetRef": "mdm:MenuCategory.cat-beverages",
                "type": "manyToOne",
                "metadata": [],
                "isBidirectional": false
              }
            ]
          },
          {
            "key": "mi-club-sandwich",
            "fields": [
              {
                "name": "menuItemId",
                "value": "mi-club-sandwich"
              },
              {
                "name": "name",
                "value": "Club Sandwich"
              },
              {
                "name": "description",
                "value": "Triple decker sandwich"
              },
              {
                "name": "menuCategoryId",
                "value": {
                  "ref": "mdm:MenuCategory.cat-sandwiches"
                }
              },
              {
                "name": "price",
                "value": 12
              },
              {
                "name": "itemType",
                "value": "simple"
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "activatedAt",
                "value": "2026-07-01T09:10:00.000Z"
              },
              {
                "name": "inactivatedAt",
                "value": null
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:40:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T09:10:00.000Z"
              }
            ],
            "relationships": [
              {
                "targetRef": "mdm:MenuCategory.cat-sandwiches",
                "type": "manyToOne",
                "metadata": [],
                "isBidirectional": false
              }
            ]
          },
          {
            "key": "mi-chocolate-cake",
            "fields": [
              {
                "name": "menuItemId",
                "value": "mi-chocolate-cake"
              },
              {
                "name": "name",
                "value": "Chocolate Cake"
              },
              {
                "name": "description",
                "value": "Rich chocolate layer cake"
              },
              {
                "name": "menuCategoryId",
                "value": {
                  "ref": "mdm:MenuCategory.cat-desserts"
                }
              },
              {
                "name": "price",
                "value": 6.5
              },
              {
                "name": "itemType",
                "value": "simple"
              },
              {
                "name": "status",
                "value": "draft"
              },
              {
                "name": "activatedAt",
                "value": null
              },
              {
                "name": "inactivatedAt",
                "value": null
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:45:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:45:00.000Z"
              }
            ],
            "relationships": [
              {
                "targetRef": "mdm:MenuCategory.cat-desserts",
                "type": "manyToOne",
                "metadata": [],
                "isBidirectional": false
              }
            ]
          }
        ]
      },
      {
        "entityId": "StockItem",
        "rows": [
          {
            "key": "si-coffee-beans",
            "fields": [
              {
                "name": "stockItemId",
                "value": "si-coffee-beans"
              },
              {
                "name": "name",
                "value": "Coffee Beans"
              },
              {
                "name": "unit",
                "value": "kg"
              },
              {
                "name": "minimumLevel",
                "value": 2
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "si-milk",
            "fields": [
              {
                "name": "stockItemId",
                "value": "si-milk"
              },
              {
                "name": "name",
                "value": "Milk"
              },
              {
                "name": "unit",
                "value": "liter"
              },
              {
                "name": "minimumLevel",
                "value": 5
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "si-bread",
            "fields": [
              {
                "name": "stockItemId",
                "value": "si-bread"
              },
              {
                "name": "name",
                "value": "Bread"
              },
              {
                "name": "unit",
                "value": "unit"
              },
              {
                "name": "minimumLevel",
                "value": 10
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "si-chocolate",
            "fields": [
              {
                "name": "stockItemId",
                "value": "si-chocolate"
              },
              {
                "name": "name",
                "value": "Chocolate"
              },
              {
                "name": "unit",
                "value": "kg"
              },
              {
                "name": "minimumLevel",
                "value": 1
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "relationships": []
          }
        ]
      }
    ]
  }
}
</agentCbSeedsPlan> */

// <agentCbSeedAssetUrls>
const seedAssetUrls: Record<string, string> = {};
const seedAssetWarnings: string[] = [];
// </agentCbSeedAssetUrls>

function seedAssetUrl(assetId: string): string | null { return seedAssetUrls[assetId] ?? null; }

import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const menuItemIngredientSeeds: TableSeedRows = {
  "seedFor": "cafeFlowMenuItemIngredient",
  "rows": [
    {
      "menu_item_ingredient_id": "ccfbd3cc-cdfb-455f-8efb-d6f2cffbd885",
      "menu_item_id": "79ab9ae5-78ab-4952-87ab-97bf76ab962c",
      "stock_item_id": "557fba30-567f-4bc3-877f-bd56587fbee9",
      "unit": "kg",
      "created_at": "2026-07-01T08:50:00.000Z",
      "details": {
        "quantity": 0.02,
        "updatedAt": "2026-07-01T08:50:00.000Z"
      }
    },
    {
      "menu_item_ingredient_id": "bbc51b5d-bac5-49ca-89c5-1837b8c516a4",
      "menu_item_id": "303cdcea-313c-4e7d-8e3c-d9c42f3cdb57",
      "stock_item_id": "557fba30-567f-4bc3-877f-bd56587fbee9",
      "unit": "kg",
      "created_at": "2026-07-01T08:55:00.000Z",
      "details": {
        "quantity": 0.02,
        "updatedAt": "2026-07-01T08:55:00.000Z"
      }
    },
    {
      "menu_item_ingredient_id": "72add9d6-73ad-4b69-80ad-d6b071add843",
      "menu_item_id": "303cdcea-313c-4e7d-8e3c-d9c42f3cdb57",
      "stock_item_id": "67616d01-6661-4b6e-8561-69db64616848",
      "unit": "liter",
      "created_at": "2026-07-01T08:55:00.000Z",
      "details": {
        "quantity": 0.15,
        "updatedAt": "2026-07-01T08:55:00.000Z"
      }
    },
    {
      "menu_item_ingredient_id": "80b4ef7b-7fb4-4de8-82b4-f2a181b4f10e",
      "menu_item_id": "6c1ff6f1-6b1f-455e-8a1f-f3cb691ff238",
      "stock_item_id": "4bfdd37c-4cfd-450f-8dfd-d6a24efdd835",
      "unit": "unit",
      "created_at": "2026-07-01T09:00:00.000Z",
      "details": {
        "quantity": 2,
        "updatedAt": "2026-07-01T09:00:00.000Z"
      }
    }
  ]
};

export const orderSeeds: TableSeedRows = {
  "seedFor": "cafeFlowOrder",
  "rows": [
    {
      "order_id": "71abbf15-70ab-4d82-8fab-bbef6eabba5c",
      "shift_id": "6b334b59-6a33-49c6-8933-4833683346a0",
      "status": "delivered",
      "order_type": "table",
      "created_at": "2026-07-02T10:00:00.000Z",
      "details": {
        "tableNumber": "5",
        "priority": false,
        "priorityReason": null,
        "receivedAt": "2026-07-02T10:01:00.000Z",
        "inPreparationAt": "2026-07-02T10:05:00.000Z",
        "readyAt": "2026-07-02T10:20:00.000Z",
        "deliveredAt": "2026-07-02T10:30:00.000Z",
        "updatedAt": "2026-07-02T10:30:00.000Z",
        "OrderItem": [
          {
            "orderItemId": "oi-01",
            "orderId": "71abbf15-70ab-4d82-8fab-bbef6eabba5c",
            "menuItemId": "79ab9ae5-78ab-4952-87ab-97bf76ab962c",
            "quantity": 2,
            "unitPrice": 3.5,
            "createdAt": "2026-07-02T10:00:00.000Z",
            "updatedAt": "2026-07-02T10:00:00.000Z"
          },
          {
            "orderItemId": "oi-02",
            "orderId": "71abbf15-70ab-4d82-8fab-bbef6eabba5c",
            "menuItemId": "6c1ff6f1-6b1f-455e-8a1f-f3cb691ff238",
            "quantity": 1,
            "unitPrice": 12,
            "createdAt": "2026-07-02T10:00:00.000Z",
            "updatedAt": "2026-07-02T10:00:00.000Z"
          }
        ]
      }
    },
    {
      "order_id": "501b19f0-511b-4b83-821b-1d16531b1ea9",
      "shift_id": "eb07e604-ec07-4797-8d07-e92aee07eabd",
      "status": "inPreparation",
      "order_type": "takeout",
      "created_at": "2026-07-03T09:30:00.000Z",
      "details": {
        "tableNumber": null,
        "priority": false,
        "priorityReason": null,
        "receivedAt": "2026-07-03T09:31:00.000Z",
        "inPreparationAt": "2026-07-03T09:35:00.000Z",
        "readyAt": null,
        "deliveredAt": null,
        "updatedAt": "2026-07-03T09:35:00.000Z",
        "OrderItem": [
          {
            "orderItemId": "oi-03",
            "orderId": "501b19f0-511b-4b83-821b-1d16531b1ea9",
            "menuItemId": "303cdcea-313c-4e7d-8e3c-d9c42f3cdb57",
            "quantity": 1,
            "unitPrice": 5,
            "createdAt": "2026-07-03T09:30:00.000Z",
            "updatedAt": "2026-07-03T09:30:00.000Z"
          }
        ]
      }
    },
    {
      "order_id": "46bc375f-45bc-45cc-88bc-3a8547bc38f2",
      "shift_id": "eb07e604-ec07-4797-8d07-e92aee07eabd",
      "status": "received",
      "order_type": "table",
      "created_at": "2026-07-03T10:15:00.000Z",
      "details": {
        "tableNumber": "3",
        "priority": true,
        "priorityReason": "Customer with flight in 30 minutes",
        "receivedAt": "2026-07-03T10:16:00.000Z",
        "inPreparationAt": null,
        "readyAt": null,
        "deliveredAt": null,
        "updatedAt": "2026-07-03T10:16:00.000Z",
        "OrderItem": [
          {
            "orderItemId": "oi-04",
            "orderId": "46bc375f-45bc-45cc-88bc-3a8547bc38f2",
            "menuItemId": "79ab9ae5-78ab-4952-87ab-97bf76ab962c",
            "quantity": 1,
            "unitPrice": 3.5,
            "createdAt": "2026-07-03T10:15:00.000Z",
            "updatedAt": "2026-07-03T10:15:00.000Z"
          }
        ]
      }
    }
  ]
};

export const shiftSeeds: TableSeedRows = {
  "seedFor": "cafeFlowShift",
  "rows": [
    {
      "shift_id": "6b334b59-6a33-49c6-8933-4833683346a0",
      "status": "closed",
      "created_at": "2026-07-02T08:00:00.000Z",
      "details": {
        "openedAt": "2026-07-02T08:00:00.000Z",
        "closedAt": "2026-07-02T18:00:00.000Z",
        "openedBy": "Wagner",
        "closedBy": "Wagner",
        "totalApurado": 19,
        "notes": "Normal shift",
        "updatedAt": "2026-07-02T18:05:00.000Z"
      }
    },
    {
      "shift_id": "eb07e604-ec07-4797-8d07-e92aee07eabd",
      "status": "open",
      "created_at": "2026-07-03T08:00:00.000Z",
      "details": {
        "openedAt": "2026-07-03T08:00:00.000Z",
        "closedAt": null,
        "openedBy": "Wagner",
        "closedBy": null,
        "totalApurado": null,
        "notes": null,
        "updatedAt": "2026-07-03T08:00:00.000Z"
      }
    }
  ]
};

export const shiftClosingReportSeeds: TableSeedRows = {
  "seedFor": "cafeFlowShiftClosingReport",
  "rows": [
    {
      "shift_closing_report_id": "1f50af3c-2050-40cf-8150-b2622250b3f5",
      "shift_id": "6b334b59-6a33-49c6-8933-4833683346a0",
      "created_at": "2026-07-02T18:10:00.000Z",
      "details": {
        "totalApurado": 19,
        "paidOrderCount": 1,
        "updatedAt": "2026-07-02T18:10:00.000Z"
      }
    }
  ]
};

export const stockAdjustmentSeeds: TableSeedRows = {
  "seedFor": "cafeFlowStockAdjustment",
  "rows": [
    {
      "stock_adjustment_id": "e4bf45d2-e5bf-4765-82bf-42ace3bf443f",
      "stock_item_id": "67616d01-6661-4b6e-8561-69db64616848",
      "status": "posted",
      "created_at": "2026-07-03T07:30:00.000Z",
      "details": {
        "quantity": -3,
        "reason": "Spoiled milk discarded",
        "voidedAt": null,
        "voidedReason": null
      }
    }
  ]
};

export const stockConsumptionSeeds: TableSeedRows = {
  "seedFor": "cafeFlowStockConsumption",
  "rows": [
    {
      "stock_consumption_id": "7366ef86-7466-4119-8166-ec607266edf3",
      "stock_item_id": "557fba30-567f-4bc3-877f-bd56587fbee9",
      "order_id": "71abbf15-70ab-4d82-8fab-bbef6eabba5c",
      "status": "posted",
      "created_at": "2026-07-02T10:00:00.000Z",
      "details": {
        "quantity": 0.04,
        "voidedAt": null,
        "voidReason": null
      }
    },
    {
      "stock_consumption_id": "50424b37-4f42-49a4-8242-4e5d51424cca",
      "stock_item_id": "4bfdd37c-4cfd-450f-8dfd-d6a24efdd835",
      "order_id": "71abbf15-70ab-4d82-8fab-bbef6eabba5c",
      "status": "posted",
      "created_at": "2026-07-02T10:00:00.000Z",
      "details": {
        "quantity": 2,
        "voidedAt": null,
        "voidReason": null
      }
    },
    {
      "stock_consumption_id": "59a12dc8-5aa1-4f5b-8ba1-30ee5ca13281",
      "stock_item_id": "557fba30-567f-4bc3-877f-bd56587fbee9",
      "order_id": "501b19f0-511b-4b83-821b-1d16531b1ea9",
      "status": "posted",
      "created_at": "2026-07-03T09:30:00.000Z",
      "details": {
        "quantity": 0.02,
        "voidedAt": null,
        "voidReason": null
      }
    },
    {
      "stock_consumption_id": "be814571-bd81-43de-8c81-424bbb8140b8",
      "stock_item_id": "67616d01-6661-4b6e-8561-69db64616848",
      "order_id": "501b19f0-511b-4b83-821b-1d16531b1ea9",
      "status": "posted",
      "created_at": "2026-07-03T09:30:00.000Z",
      "details": {
        "quantity": 0.15,
        "voidedAt": null,
        "voidReason": null
      }
    },
    {
      "stock_consumption_id": "d7f3c8ea-d8f3-4a7d-85f3-c5c4d6f3c757",
      "stock_item_id": "557fba30-567f-4bc3-877f-bd56587fbee9",
      "order_id": "46bc375f-45bc-45cc-88bc-3a8547bc38f2",
      "status": "posted",
      "created_at": "2026-07-03T10:15:00.000Z",
      "details": {
        "quantity": 0.02,
        "voidedAt": null,
        "voidReason": null
      }
    }
  ]
};

export const stockLevelSeeds: TableSeedRows = {
  "seedFor": "cafeFlowStockLevel",
  "rows": [
    {
      "stock_level_id": "3e77e865-3d77-46d2-8c77-e53f3b77e3ac",
      "stock_item_id": "557fba30-567f-4bc3-877f-bd56587fbee9",
      "unit": "kg",
      "created_at": "2026-07-01T08:00:00.000Z",
      "details": {
        "currentQuantity": 1.92,
        "minimumLevel": 2,
        "lastDecrementAt": "2026-07-03T10:15:00.000Z",
        "lastAdjustmentAt": null,
        "updatedAt": "2026-07-03T10:15:00.000Z"
      }
    },
    {
      "stock_level_id": "6f739e80-7073-4013-8173-a1a67273a339",
      "stock_item_id": "67616d01-6661-4b6e-8561-69db64616848",
      "unit": "liter",
      "created_at": "2026-07-01T08:00:00.000Z",
      "details": {
        "currentQuantity": 1.85,
        "minimumLevel": 5,
        "lastDecrementAt": "2026-07-03T09:30:00.000Z",
        "lastAdjustmentAt": "2026-07-03T07:30:00.000Z",
        "updatedAt": "2026-07-03T09:30:00.000Z"
      }
    },
    {
      "stock_level_id": "8418044f-8318-42bc-8618-0775851805e2",
      "stock_item_id": "4bfdd37c-4cfd-450f-8dfd-d6a24efdd835",
      "unit": "unit",
      "created_at": "2026-07-01T08:00:00.000Z",
      "details": {
        "currentQuantity": 8,
        "minimumLevel": 10,
        "lastDecrementAt": "2026-07-02T10:00:00.000Z",
        "lastAdjustmentAt": null,
        "updatedAt": "2026-07-02T10:00:00.000Z"
      }
    },
    {
      "stock_level_id": "00c59053-ffc5-4ec0-82c5-937901c591e6",
      "stock_item_id": "f738c0d0-f838-4263-8938-c3f6fa38c589",
      "unit": "kg",
      "created_at": "2026-07-01T08:00:00.000Z",
      "details": {
        "currentQuantity": 3,
        "minimumLevel": 1,
        "lastDecrementAt": null,
        "lastAdjustmentAt": null,
        "updatedAt": "2026-07-01T08:00:00.000Z"
      }
    }
  ]
};

export const mdmEntityIndexSeeds: TableSeedRows = {
  "seedFor": "mdmEntityIndex",
  "rows": [
    {
      "mdmId": "46b7aa48-47b7-4bdb-88b7-ad6e49b7af01",
      "subtype": "Product",
      "name": "Beverages",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "beverages menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "46b7aa48-47b7-4bdb-88b7-ad6e49b7af01",
      "createdAt": "2026-07-01T08:00:00.000Z",
      "updatedAt": "2026-07-01T08:00:00.000Z"
    },
    {
      "mdmId": "9d65f47b-9c65-42e8-8f65-f7a19e65f60e",
      "subtype": "Product",
      "name": "Sandwiches",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "sandwiches menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "9d65f47b-9c65-42e8-8f65-f7a19e65f60e",
      "createdAt": "2026-07-01T08:05:00.000Z",
      "updatedAt": "2026-07-01T08:05:00.000Z"
    },
    {
      "mdmId": "3f1deef5-3e1d-4d62-8d1d-ebcf3c1dea3c",
      "subtype": "Product",
      "name": "Desserts",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "desserts menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "3f1deef5-3e1d-4d62-8d1d-ebcf3c1dea3c",
      "createdAt": "2026-07-01T08:10:00.000Z",
      "updatedAt": "2026-07-01T08:10:00.000Z"
    },
    {
      "mdmId": "79ab9ae5-78ab-4952-87ab-97bf76ab962c",
      "subtype": "Product",
      "name": "Espresso",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuItem",
        "cafeFlow",
        "MenuItem"
      ],
      "searchVector": "espresso menuitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "79ab9ae5-78ab-4952-87ab-97bf76ab962c",
      "createdAt": "2026-07-01T08:30:00.000Z",
      "updatedAt": "2026-07-01T09:00:00.000Z"
    },
    {
      "mdmId": "303cdcea-313c-4e7d-8e3c-d9c42f3cdb57",
      "subtype": "Product",
      "name": "Cappuccino",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuItem",
        "cafeFlow",
        "MenuItem"
      ],
      "searchVector": "cappuccino menuitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "303cdcea-313c-4e7d-8e3c-d9c42f3cdb57",
      "createdAt": "2026-07-01T08:35:00.000Z",
      "updatedAt": "2026-07-01T09:05:00.000Z"
    },
    {
      "mdmId": "6c1ff6f1-6b1f-455e-8a1f-f3cb691ff238",
      "subtype": "Product",
      "name": "Club Sandwich",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuItem",
        "cafeFlow",
        "MenuItem"
      ],
      "searchVector": "club sandwich menuitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "6c1ff6f1-6b1f-455e-8a1f-f3cb691ff238",
      "createdAt": "2026-07-01T08:40:00.000Z",
      "updatedAt": "2026-07-01T09:10:00.000Z"
    },
    {
      "mdmId": "159fc764-169f-48f7-879f-ca8a189fcc1d",
      "subtype": "Product",
      "name": "Chocolate Cake",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuItem",
        "cafeFlow",
        "MenuItem"
      ],
      "searchVector": "chocolate cake menuitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "159fc764-169f-48f7-879f-ca8a189fcc1d",
      "createdAt": "2026-07-01T08:45:00.000Z",
      "updatedAt": "2026-07-01T08:45:00.000Z"
    },
    {
      "mdmId": "557fba30-567f-4bc3-877f-bd56587fbee9",
      "subtype": "Product",
      "name": "Coffee Beans",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "coffee beans stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "557fba30-567f-4bc3-877f-bd56587fbee9",
      "createdAt": "2026-07-01T08:00:00.000Z",
      "updatedAt": "2026-07-01T08:00:00.000Z"
    },
    {
      "mdmId": "67616d01-6661-4b6e-8561-69db64616848",
      "subtype": "Product",
      "name": "Milk",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "milk stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "67616d01-6661-4b6e-8561-69db64616848",
      "createdAt": "2026-07-01T08:00:00.000Z",
      "updatedAt": "2026-07-01T08:00:00.000Z"
    },
    {
      "mdmId": "4bfdd37c-4cfd-450f-8dfd-d6a24efdd835",
      "subtype": "Product",
      "name": "Bread",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "bread stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "4bfdd37c-4cfd-450f-8dfd-d6a24efdd835",
      "createdAt": "2026-07-01T08:00:00.000Z",
      "updatedAt": "2026-07-01T08:00:00.000Z"
    },
    {
      "mdmId": "f738c0d0-f838-4263-8938-c3f6fa38c589",
      "subtype": "Product",
      "name": "Chocolate",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "chocolate stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "f738c0d0-f838-4263-8938-c3f6fa38c589",
      "createdAt": "2026-07-01T08:00:00.000Z",
      "updatedAt": "2026-07-01T08:00:00.000Z"
    },
    {
      "mdmId": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
      "subtype": "Person",
      "name": "Atendente / Caixa 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente / caixa 1 atendente cafeflow",
      "mergedInto": null,
      "dynamoPk": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "4faf837a-50af-450d-8daf-80544eaf81e7",
      "subtype": "Person",
      "name": "Atendente / Caixa 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente / caixa 2 atendente cafeflow",
      "mergedInto": null,
      "dynamoPk": "4faf837a-50af-450d-8daf-80544eaf81e7",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "363d0001-353c-4e6e-843c-fcdb333cfb48",
      "subtype": "Person",
      "name": "Atendente / Caixa 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente / caixa 3 atendente cafeflow",
      "mergedInto": null,
      "dynamoPk": "363d0001-353c-4e6e-843c-fcdb333cfb48",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "f3e1912b-f2e1-4f98-85e1-9451f4e192be",
      "subtype": "Person",
      "name": "Cozinheiro 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "cozinheiro"
      ],
      "searchVector": "cozinheiro 1 cozinheiro cafeflow",
      "mergedInto": null,
      "dynamoPk": "f3e1912b-f2e1-4f98-85e1-9451f4e192be",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "38439c5a-3943-4ded-8643-993437439ac7",
      "subtype": "Person",
      "name": "Cozinheiro 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "cozinheiro"
      ],
      "searchVector": "cozinheiro 2 cozinheiro cafeflow",
      "mergedInto": null,
      "dynamoPk": "38439c5a-3943-4ded-8643-993437439ac7",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "1ed118e1-1dd1-474e-8cd1-15bb1bd11428",
      "subtype": "Person",
      "name": "Cozinheiro 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "cozinheiro"
      ],
      "searchVector": "cozinheiro 3 cozinheiro cafeflow",
      "mergedInto": null,
      "dynamoPk": "1ed118e1-1dd1-474e-8cd1-15bb1bd11428",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "92796e03-9179-4c70-8479-712993796f96",
      "subtype": "Person",
      "name": "Gerente / Proprietário 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "gerente"
      ],
      "searchVector": "gerente / proprietário 1 gerente cafeflow",
      "mergedInto": null,
      "dynamoPk": "92796e03-9179-4c70-8479-712993796f96",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "559d7b32-569d-4cc5-839d-780c549d799f",
      "subtype": "Person",
      "name": "Gerente / Proprietário 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "gerente"
      ],
      "searchVector": "gerente / proprietário 2 gerente cafeflow",
      "mergedInto": null,
      "dynamoPk": "559d7b32-569d-4cc5-839d-780c549d799f",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "3c2af7b9-3b2a-4626-8a2a-f493392af300",
      "subtype": "Person",
      "name": "Gerente / Proprietário 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "gerente"
      ],
      "searchVector": "gerente / proprietário 3 gerente cafeflow",
      "mergedInto": null,
      "dynamoPk": "3c2af7b9-3b2a-4626-8a2a-f493392af300",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    }
  ]
};

export const mdmDocumentSeeds: TableSeedRows = {
  "seedFor": "mdmDocumentCache",
  "rows": [
    {
      "mdmId": "46b7aa48-47b7-4bdb-88b7-ad6e49b7af01",
      "version": 1,
      "details": {
        "mdmId": "46b7aa48-47b7-4bdb-88b7-ad6e49b7af01",
        "subtype": "Product",
        "name": "Beverages",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuCategory",
          "cafeFlow",
          "MenuCategory"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:00:00.000Z",
        "updatedAt": "2026-07-01T08:00:00.000Z",
        "cafeFlow": {
          "menuCategoryId": "46b7aa48-47b7-4bdb-88b7-ad6e49b7af01",
          "name": "Beverages",
          "description": "Hot and cold drinks",
          "displayOrder": 1,
          "active": true,
          "createdAt": "2026-07-01T08:00:00.000Z",
          "updatedAt": "2026-07-01T08:00:00.000Z"
        }
      }
    },
    {
      "mdmId": "9d65f47b-9c65-42e8-8f65-f7a19e65f60e",
      "version": 1,
      "details": {
        "mdmId": "9d65f47b-9c65-42e8-8f65-f7a19e65f60e",
        "subtype": "Product",
        "name": "Sandwiches",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuCategory",
          "cafeFlow",
          "MenuCategory"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:05:00.000Z",
        "updatedAt": "2026-07-01T08:05:00.000Z",
        "cafeFlow": {
          "menuCategoryId": "9d65f47b-9c65-42e8-8f65-f7a19e65f60e",
          "name": "Sandwiches",
          "description": "Fresh made sandwiches",
          "displayOrder": 2,
          "active": true,
          "createdAt": "2026-07-01T08:05:00.000Z",
          "updatedAt": "2026-07-01T08:05:00.000Z"
        }
      }
    },
    {
      "mdmId": "3f1deef5-3e1d-4d62-8d1d-ebcf3c1dea3c",
      "version": 1,
      "details": {
        "mdmId": "3f1deef5-3e1d-4d62-8d1d-ebcf3c1dea3c",
        "subtype": "Product",
        "name": "Desserts",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuCategory",
          "cafeFlow",
          "MenuCategory"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:10:00.000Z",
        "updatedAt": "2026-07-01T08:10:00.000Z",
        "cafeFlow": {
          "menuCategoryId": "3f1deef5-3e1d-4d62-8d1d-ebcf3c1dea3c",
          "name": "Desserts",
          "description": "Sweet treats",
          "displayOrder": 3,
          "active": true,
          "createdAt": "2026-07-01T08:10:00.000Z",
          "updatedAt": "2026-07-01T08:10:00.000Z"
        }
      }
    },
    {
      "mdmId": "79ab9ae5-78ab-4952-87ab-97bf76ab962c",
      "version": 1,
      "details": {
        "mdmId": "79ab9ae5-78ab-4952-87ab-97bf76ab962c",
        "subtype": "Product",
        "name": "Espresso",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuItem",
          "cafeFlow",
          "MenuItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:30:00.000Z",
        "updatedAt": "2026-07-01T09:00:00.000Z",
        "cafeFlow": {
          "menuItemId": "79ab9ae5-78ab-4952-87ab-97bf76ab962c",
          "name": "Espresso",
          "description": "Single shot espresso",
          "menuCategoryId": "46b7aa48-47b7-4bdb-88b7-ad6e49b7af01",
          "price": 3.5,
          "itemType": "simple",
          "status": "active",
          "activatedAt": "2026-07-01T09:00:00.000Z",
          "inactivatedAt": null,
          "createdAt": "2026-07-01T08:30:00.000Z",
          "updatedAt": "2026-07-01T09:00:00.000Z"
        }
      }
    },
    {
      "mdmId": "303cdcea-313c-4e7d-8e3c-d9c42f3cdb57",
      "version": 1,
      "details": {
        "mdmId": "303cdcea-313c-4e7d-8e3c-d9c42f3cdb57",
        "subtype": "Product",
        "name": "Cappuccino",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuItem",
          "cafeFlow",
          "MenuItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:35:00.000Z",
        "updatedAt": "2026-07-01T09:05:00.000Z",
        "cafeFlow": {
          "menuItemId": "303cdcea-313c-4e7d-8e3c-d9c42f3cdb57",
          "name": "Cappuccino",
          "description": "Espresso with steamed milk",
          "menuCategoryId": "46b7aa48-47b7-4bdb-88b7-ad6e49b7af01",
          "price": 5,
          "itemType": "simple",
          "status": "active",
          "activatedAt": "2026-07-01T09:05:00.000Z",
          "inactivatedAt": null,
          "createdAt": "2026-07-01T08:35:00.000Z",
          "updatedAt": "2026-07-01T09:05:00.000Z"
        }
      }
    },
    {
      "mdmId": "6c1ff6f1-6b1f-455e-8a1f-f3cb691ff238",
      "version": 1,
      "details": {
        "mdmId": "6c1ff6f1-6b1f-455e-8a1f-f3cb691ff238",
        "subtype": "Product",
        "name": "Club Sandwich",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuItem",
          "cafeFlow",
          "MenuItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:40:00.000Z",
        "updatedAt": "2026-07-01T09:10:00.000Z",
        "cafeFlow": {
          "menuItemId": "6c1ff6f1-6b1f-455e-8a1f-f3cb691ff238",
          "name": "Club Sandwich",
          "description": "Triple decker sandwich",
          "menuCategoryId": "9d65f47b-9c65-42e8-8f65-f7a19e65f60e",
          "price": 12,
          "itemType": "simple",
          "status": "active",
          "activatedAt": "2026-07-01T09:10:00.000Z",
          "inactivatedAt": null,
          "createdAt": "2026-07-01T08:40:00.000Z",
          "updatedAt": "2026-07-01T09:10:00.000Z"
        }
      }
    },
    {
      "mdmId": "159fc764-169f-48f7-879f-ca8a189fcc1d",
      "version": 1,
      "details": {
        "mdmId": "159fc764-169f-48f7-879f-ca8a189fcc1d",
        "subtype": "Product",
        "name": "Chocolate Cake",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuItem",
          "cafeFlow",
          "MenuItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:45:00.000Z",
        "updatedAt": "2026-07-01T08:45:00.000Z",
        "cafeFlow": {
          "menuItemId": "159fc764-169f-48f7-879f-ca8a189fcc1d",
          "name": "Chocolate Cake",
          "description": "Rich chocolate layer cake",
          "menuCategoryId": "3f1deef5-3e1d-4d62-8d1d-ebcf3c1dea3c",
          "price": 6.5,
          "itemType": "simple",
          "status": "draft",
          "activatedAt": null,
          "inactivatedAt": null,
          "createdAt": "2026-07-01T08:45:00.000Z",
          "updatedAt": "2026-07-01T08:45:00.000Z"
        }
      }
    },
    {
      "mdmId": "557fba30-567f-4bc3-877f-bd56587fbee9",
      "version": 1,
      "details": {
        "mdmId": "557fba30-567f-4bc3-877f-bd56587fbee9",
        "subtype": "Product",
        "name": "Coffee Beans",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.StockItem",
          "cafeFlow",
          "StockItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:00:00.000Z",
        "updatedAt": "2026-07-01T08:00:00.000Z",
        "cafeFlow": {
          "stockItemId": "557fba30-567f-4bc3-877f-bd56587fbee9",
          "name": "Coffee Beans",
          "unit": "kg",
          "minimumLevel": 2,
          "createdAt": "2026-07-01T08:00:00.000Z",
          "updatedAt": "2026-07-01T08:00:00.000Z"
        }
      }
    },
    {
      "mdmId": "67616d01-6661-4b6e-8561-69db64616848",
      "version": 1,
      "details": {
        "mdmId": "67616d01-6661-4b6e-8561-69db64616848",
        "subtype": "Product",
        "name": "Milk",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.StockItem",
          "cafeFlow",
          "StockItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:00:00.000Z",
        "updatedAt": "2026-07-01T08:00:00.000Z",
        "cafeFlow": {
          "stockItemId": "67616d01-6661-4b6e-8561-69db64616848",
          "name": "Milk",
          "unit": "liter",
          "minimumLevel": 5,
          "createdAt": "2026-07-01T08:00:00.000Z",
          "updatedAt": "2026-07-01T08:00:00.000Z"
        }
      }
    },
    {
      "mdmId": "4bfdd37c-4cfd-450f-8dfd-d6a24efdd835",
      "version": 1,
      "details": {
        "mdmId": "4bfdd37c-4cfd-450f-8dfd-d6a24efdd835",
        "subtype": "Product",
        "name": "Bread",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.StockItem",
          "cafeFlow",
          "StockItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:00:00.000Z",
        "updatedAt": "2026-07-01T08:00:00.000Z",
        "cafeFlow": {
          "stockItemId": "4bfdd37c-4cfd-450f-8dfd-d6a24efdd835",
          "name": "Bread",
          "unit": "unit",
          "minimumLevel": 10,
          "createdAt": "2026-07-01T08:00:00.000Z",
          "updatedAt": "2026-07-01T08:00:00.000Z"
        }
      }
    },
    {
      "mdmId": "f738c0d0-f838-4263-8938-c3f6fa38c589",
      "version": 1,
      "details": {
        "mdmId": "f738c0d0-f838-4263-8938-c3f6fa38c589",
        "subtype": "Product",
        "name": "Chocolate",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.StockItem",
          "cafeFlow",
          "StockItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:00:00.000Z",
        "updatedAt": "2026-07-01T08:00:00.000Z",
        "cafeFlow": {
          "stockItemId": "f738c0d0-f838-4263-8938-c3f6fa38c589",
          "name": "Chocolate",
          "unit": "kg",
          "minimumLevel": 1,
          "createdAt": "2026-07-01T08:00:00.000Z",
          "updatedAt": "2026-07-01T08:00:00.000Z"
        }
      }
    },
    {
      "mdmId": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
      "version": 1,
      "details": {
        "mdmId": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
        "subtype": "Person",
        "name": "Atendente / Caixa 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "4faf837a-50af-450d-8daf-80544eaf81e7",
      "version": 1,
      "details": {
        "mdmId": "4faf837a-50af-450d-8daf-80544eaf81e7",
        "subtype": "Person",
        "name": "Atendente / Caixa 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "363d0001-353c-4e6e-843c-fcdb333cfb48",
      "version": 1,
      "details": {
        "mdmId": "363d0001-353c-4e6e-843c-fcdb333cfb48",
        "subtype": "Person",
        "name": "Atendente / Caixa 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "f3e1912b-f2e1-4f98-85e1-9451f4e192be",
      "version": 1,
      "details": {
        "mdmId": "f3e1912b-f2e1-4f98-85e1-9451f4e192be",
        "subtype": "Person",
        "name": "Cozinheiro 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "cozinheiro"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "cozinheiro"
      }
    },
    {
      "mdmId": "38439c5a-3943-4ded-8643-993437439ac7",
      "version": 1,
      "details": {
        "mdmId": "38439c5a-3943-4ded-8643-993437439ac7",
        "subtype": "Person",
        "name": "Cozinheiro 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "cozinheiro"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "cozinheiro"
      }
    },
    {
      "mdmId": "1ed118e1-1dd1-474e-8cd1-15bb1bd11428",
      "version": 1,
      "details": {
        "mdmId": "1ed118e1-1dd1-474e-8cd1-15bb1bd11428",
        "subtype": "Person",
        "name": "Cozinheiro 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "cozinheiro"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "cozinheiro"
      }
    },
    {
      "mdmId": "92796e03-9179-4c70-8479-712993796f96",
      "version": 1,
      "details": {
        "mdmId": "92796e03-9179-4c70-8479-712993796f96",
        "subtype": "Person",
        "name": "Gerente / Proprietário 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "gerente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "gerente"
      }
    },
    {
      "mdmId": "559d7b32-569d-4cc5-839d-780c549d799f",
      "version": 1,
      "details": {
        "mdmId": "559d7b32-569d-4cc5-839d-780c549d799f",
        "subtype": "Person",
        "name": "Gerente / Proprietário 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "gerente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "gerente"
      }
    },
    {
      "mdmId": "3c2af7b9-3b2a-4626-8a2a-f493392af300",
      "version": 1,
      "details": {
        "mdmId": "3c2af7b9-3b2a-4626-8a2a-f493392af300",
        "subtype": "Person",
        "name": "Gerente / Proprietário 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "gerente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "gerente"
      }
    }
  ]
};

export const mdmRelationshipSeeds: TableSeedRows = {
  "seedFor": "mdmRelationship",
  "rows": [
    {
      "id": "5ef3d62b-5df3-4498-80f3-d9515ff3d7be",
      "fromId": "79ab9ae5-78ab-4952-87ab-97bf76ab962c",
      "toId": "46b7aa48-47b7-4bdb-88b7-ad6e49b7af01",
      "type": "manyToOne",
      "role": null,
      "metadata": {},
      "isBidirectional": false,
      "validFrom": "2026-07-01T00:00:00.000Z",
      "validTo": null,
      "status": "Active",
      "createdAt": "2026-07-01T08:30:00.000Z",
      "updatedAt": "2026-07-01T09:00:00.000Z"
    },
    {
      "id": "1e236f56-1f23-40e9-8c23-6c301d236dc3",
      "fromId": "303cdcea-313c-4e7d-8e3c-d9c42f3cdb57",
      "toId": "46b7aa48-47b7-4bdb-88b7-ad6e49b7af01",
      "type": "manyToOne",
      "role": null,
      "metadata": {},
      "isBidirectional": false,
      "validFrom": "2026-07-01T00:00:00.000Z",
      "validTo": null,
      "status": "Active",
      "createdAt": "2026-07-01T08:35:00.000Z",
      "updatedAt": "2026-07-01T09:05:00.000Z"
    },
    {
      "id": "d31334ba-d413-464d-8113-3194d2133327",
      "fromId": "6c1ff6f1-6b1f-455e-8a1f-f3cb691ff238",
      "toId": "9d65f47b-9c65-42e8-8f65-f7a19e65f60e",
      "type": "manyToOne",
      "role": null,
      "metadata": {},
      "isBidirectional": false,
      "validFrom": "2026-07-01T00:00:00.000Z",
      "validTo": null,
      "status": "Active",
      "createdAt": "2026-07-01T08:40:00.000Z",
      "updatedAt": "2026-07-01T09:10:00.000Z"
    },
    {
      "id": "f1e7c551-f0e7-43be-8fe7-c22beee7c098",
      "fromId": "159fc764-169f-48f7-879f-ca8a189fcc1d",
      "toId": "3f1deef5-3e1d-4d62-8d1d-ebcf3c1dea3c",
      "type": "manyToOne",
      "role": null,
      "metadata": {},
      "isBidirectional": false,
      "validFrom": "2026-07-01T00:00:00.000Z",
      "validTo": null,
      "status": "Active",
      "createdAt": "2026-07-01T08:45:00.000Z",
      "updatedAt": "2026-07-01T08:45:00.000Z"
    }
  ]
};
