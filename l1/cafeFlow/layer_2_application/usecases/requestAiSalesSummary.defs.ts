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
        "inputTypeName": "AiSalesSummaryInput",
        "outputTypeName": "AiSalesSummaryOutput",
        "input": [],
        "output": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "description": "ID of the currently open shift used to scope the summary"
          },
          {
            "name": "shiftOpenedAt",
            "type": "string",
            "required": true,
            "description": "Timestamp when the current shift was opened"
          },
          {
            "name": "totalOrders",
            "type": "number",
            "required": true,
            "description": "Total count of orders placed during the current open shift"
          },
          {
            "name": "totalRevenue",
            "type": "number",
            "required": true,
            "description": "Sum of revenue across all orders in the current shift"
          },
          {
            "name": "orders",
            "type": "array",
            "ofEntity": "Order",
            "required": true,
            "description": "Orders from the current shift projected as {orderId, status, orderType, createdAt, deliveredAt}"
          },
          {
            "name": "topSellers",
            "type": "array",
            "required": true,
            "description": "Top-selling items aggregated from day orders: {menuItemId, totalQuantity, totalRevenue} sorted by totalQuantity descending"
          },
          {
            "name": "stockLevels",
            "type": "array",
            "ofEntity": "StockLevel",
            "required": true,
            "description": "Current stock levels projected as {stockItemId, currentQuantity, minimumLevel, unit} for AI consumption"
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
          "1. Resolve the active lifecycle instance: query the Shift port for the single Shift with status='open' (rule: dashboardCurrentShiftOnly). If no open shift is found, return an empty summary with shiftId=null, zero counts, and empty arrays — never expose historical or multi-shift data.",
          "2. Extract the resolved shiftId and shiftOpenedAt from the open Shift record.",
          "3. Load all Orders for the resolved shiftId via the Order port (list filtered by shiftId). Each Order aggregate includes its embedded OrderItem collection.",
          "4. Project each Order to {orderId, status, orderType, createdAt, deliveredAt} for the orders output array.",
          "5. Aggregate OrderItems across all loaded Orders: group by menuItemId, sum quantity into totalQuantity and sum (quantity * unitPrice) into totalRevenue. Sort descending by totalQuantity to produce topSellers (rule: topSellersFromDayOrders).",
          "6. Compute totalOrders as the count of loaded Orders and totalRevenue as the sum of all OrderItem subtotals.",
          "7. Load all StockLevel records via the StockLevel port and project each to {stockItemId, currentQuantity, minimumLevel, unit} for the stockLevels output array.",
          "8. Assemble and return the AiSalesSummaryOutput containing only domain-sourced data — no external APIs, no historical periods, no multi-shift consolidation (rule: aiConsumesDomainData)."
        ]
      }
    ],
    "rulesApplied": [
      "dashboardCurrentShiftOnly",
      "aiConsumesDomainData",
      "topSellersFromDayOrders"
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
    "rulesApplied": [
      "dashboardCurrentShiftOnly",
      "aiConsumesDomainData",
      "topSellersFromDayOrders"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
