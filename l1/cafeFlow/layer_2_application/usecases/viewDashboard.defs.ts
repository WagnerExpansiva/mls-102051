/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.defs.ts" enhancement="_blank"/>

export const viewDashboardUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewDashboard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewDashboard",
    "ports": [
      "Order",
      "StockLevel",
      "Shift",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "viewDashboard",
        "inputTypeName": "ViewDashboardInput",
        "outputTypeName": "ViewDashboardOutput",
        "input": [],
        "output": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "description": "ID of the currently open shift used to scope all dashboard data",
            "ofEntity": "Shift"
          },
          {
            "name": "totalSales",
            "type": "number",
            "required": true,
            "description": "Sum of all order totals (unitPrice * quantity per OrderItem) for orders in the current shift"
          },
          {
            "name": "orderCount",
            "type": "number",
            "required": true,
            "description": "Number of orders registered in the current shift"
          },
          {
            "name": "orders",
            "type": "OrderSummary[]",
            "required": true,
            "description": "List of order summaries for the current shift including status, orderType, createdAt, and deliveredAt"
          },
          {
            "name": "topSellers",
            "type": "TopSeller[]",
            "required": true,
            "description": "Items ranked by total quantity sold, computed only from OrderItems of the current shift orders (rule topSellersFromDayOrders)"
          },
          {
            "name": "lowStockAlerts",
            "type": "LowStockAlert[]",
            "required": true,
            "description": "Stock items whose currentQuantity is below minimumLevel, flagged as low-stock alerts"
          }
        ],
        "ports": [
          "Order",
          "StockLevel",
          "Shift"
        ],
        "rulesApplied": [
          "dashboardCurrentShiftOnly",
          "topSellersFromDayOrders"
        ],
        "transactional": false,
        "steps": [
          "1. Resolve the currently open Shift by querying the Shift port for status='open' (activeLifecycleInstance resolution). If no open shift exists, return an empty dashboard with shiftId=null, totalSales=0, orderCount=0, empty orders/topSellers/lowStockAlerts (rule dashboardCurrentShiftOnly).",
          "2. Extract actorId from ctx.sessionContext for authorization context (actorSession resolution). The actor must be an authenticated manager; if sessionContext is missing, throw an authorization error.",
          "3. Load all Orders for the resolved shiftId via the Order port (list by shiftId). Each Order aggregate includes its embedded OrderItem collection.",
          "4. Build the orders summary list projecting orderId, status, orderType, createdAt, shiftId, deliveredAt for each order.",
          "5. Compute totalSales by iterating all OrderItems across all loaded orders and summing (unitPrice * quantity).",
          "6. Compute topSellers by aggregating OrderItems grouped by menuItemId: sum quantity per menuItemId and sum (unitPrice * quantity) as totalRevenue. Sort descending by totalQuantity. This applies rule topSellersFromDayOrders — only OrderItems from the current shift orders are considered, never historical data.",
          "7. Query the StockLevel port for all stock level records. Filter those where currentQuantity < minimumLevel to build lowStockAlerts with stockItemId, currentQuantity, minimumLevel, and unit.",
          "8. Assemble and return the dashboard output: shiftId, totalSales, orderCount, orders, topSellers, lowStockAlerts. No historical periods or multi-shift consolidation is permitted (rule dashboardCurrentShiftOnly)."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default viewDashboardUsecase;

export const pipeline = [
  {
    "id": "viewDashboard__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
