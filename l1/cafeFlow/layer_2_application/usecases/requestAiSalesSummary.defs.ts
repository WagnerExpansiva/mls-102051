/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.defs.ts" enhancement="_blank"/>

export const requestAiSalesSummaryUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "requestAiSalesSummary",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "requestAiSalesSummary",
    "ports": [
      "Order",
      "Shift",
      "StockLevel",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "requestAiSalesSummary",
        "inputTypeName": "RequestAiSalesSummaryInput",
        "outputTypeName": "AiSalesSummary",
        "input": [],
        "output": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "ofEntity": "Shift",
            "description": "ID of the currently open shift used to scope the summary"
          },
          {
            "name": "totalOrders",
            "type": "number",
            "required": true,
            "description": "Total count of orders in the current open shift"
          },
          {
            "name": "orders",
            "type": "array",
            "required": true,
            "description": "List of order projections from the current shift, each containing orderId, status, orderType, createdAt, deliveredAt"
          },
          {
            "name": "topSellers",
            "type": "array",
            "required": true,
            "description": "Computed top-selling items aggregated by menuItemId with totalQuantity, derived from OrderItems of the current shift orders"
          },
          {
            "name": "stockAlerts",
            "type": "array",
            "required": true,
            "description": "Stock items where currentQuantity is at or below minimumLevel, each containing stockItemId, currentQuantity, minimumLevel, unit"
          }
        ],
        "ports": [
          "Order",
          "Shift",
          "StockLevel"
        ],
        "rulesApplied": [
          "dashboardCurrentShiftOnly",
          "aiConsumesDomainData",
          "topSellersFromDayOrders"
        ],
        "transactional": false,
        "steps": [
          "1. Resolve the active open Shift by querying the Shift port for status='open' (rule: dashboardCurrentShiftOnly). If no open shift exists, return an empty summary with shiftId=null, totalOrders=0, empty orders/topSellers/stockAlerts.",
          "2. Load all Orders for the resolved open shift via the Order port, filtered by shiftId equal to the open shift's shiftId.",
          "3. From the loaded Orders, collect all embedded OrderItems and aggregate quantity by menuItemId to compute topSellers (rule: topSellersFromDayOrders). Sort descending by totalQuantity.",
          "4. Query the StockLevel port for all stock levels where currentQuantity <= minimumLevel to build stockAlerts.",
          "5. Assemble the AiSalesSummary result containing shiftId, totalOrders (count of loaded orders), orders (projected to orderId/status/orderType/createdAt/deliveredAt), topSellers, and stockAlerts. All data originates exclusively from domain ports — no external sources are consulted (rule: aiConsumesDomainData).",
          "6. Return the summary. No aggregate mutation occurs; the StockConsumption audit event declared in eventWrites is not emitted because this is a read-only query with no state transition on the owning Order aggregate. The StockConsumption port is also not present in the available ports list, confirming no event append is expected here."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default requestAiSalesSummaryUsecase;

export const pipeline = [
  {
    "id": "requestAiSalesSummary__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.d.ts",
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
