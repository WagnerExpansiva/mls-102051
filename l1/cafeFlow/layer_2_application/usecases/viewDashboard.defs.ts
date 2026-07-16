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
            "ofEntity": "Shift",
            "description": "ID of the currently open shift used to filter all dashboard data"
          },
          {
            "name": "totalSales",
            "type": "number",
            "required": true,
            "description": "Sum of all order totals (quantity * unitPrice across OrderItems) for the current shift"
          },
          {
            "name": "orders",
            "type": "array",
            "required": true,
            "description": "List of orders in the current shift, each containing orderId, status, orderType, createdAt, shiftId, deliveredAt"
          },
          {
            "name": "topSellers",
            "type": "array",
            "required": true,
            "description": "Top selling menu items aggregated from OrderItems of current shift orders, each containing menuItemId, totalQuantity, totalRevenue"
          },
          {
            "name": "lowStockAlerts",
            "type": "array",
            "required": true,
            "description": "Stock items whose currentQuantity is below minimumLevel, each containing stockLevelId, stockItemId, currentQuantity, minimumLevel, unit"
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
          "1. Extract actorId from ctx.sessionContext for authorization (context: actorSession)",
          "2. Resolve the active shift by querying the Shift port for status='open' (context: activeLifecycleInstance). If multiple open shifts exist, use the most recent by openedAt; if none open, return empty dashboard with shiftId=null, totalSales=0, orders=[], topSellers=[], lowStockAlerts=[] (rule dashboardCurrentShiftOnly)",
          "3. Load all Orders for the resolved shiftId via Order port (list filtered by shiftId). Orders include their embedded OrderItem children",
          "4. Extract all OrderItems from the loaded Orders",
          "5. Calculate totalSales as the sum of (quantity * unitPrice) across all OrderItems of the current shift orders (rule topSellersFromDayOrders)",
          "6. Aggregate OrderItems by menuItemId to compute topSellers: for each menuItemId sum quantity into totalQuantity and sum (quantity * unitPrice) into totalRevenue; sort descending by totalQuantity (rule topSellersFromDayOrders)",
          "7. Load all StockLevels via StockLevel port (list all)",
          "8. Filter StockLevels where currentQuantity < minimumLevel to build lowStockAlerts, each containing stockLevelId, stockItemId, currentQuantity, minimumLevel, unit",
          "9. Build and return the dashboard projection: shiftId, totalSales, orders (each with orderId, status, orderType, createdAt, shiftId, deliveredAt), topSellers, lowStockAlerts",
          "10. No events are emitted — this is a read-only view operation (opKind=view, writes=[]); the StockConsumption audit event in eventWrites applies only to mutating usecases"
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
