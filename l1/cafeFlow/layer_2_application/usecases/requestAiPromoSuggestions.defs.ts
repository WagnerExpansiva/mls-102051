/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiPromoSuggestions.defs.ts" enhancement="_blank"/>

export const requestAiPromoSuggestionsUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "requestAiPromoSuggestions",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "requestAiPromoSuggestions",
    "ports": [
      "Order",
      "StockLevel",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "requestAiPromoSuggestions",
        "inputTypeName": "RequestAiPromoSuggestionsInput",
        "outputTypeName": "RequestAiPromoSuggestionsOutput",
        "input": [],
        "output": [
          {
            "name": "suggestions",
            "type": "string",
            "required": true,
            "description": "JSON-encoded array of promo suggestion objects, each containing menuItemId, suggestedPromoType, reason, currentStockLevel, and recentSalesQuantity derived from the last 7 days of domain data"
          },
          {
            "name": "windowStart",
            "type": "string",
            "required": true,
            "description": "ISO datetime marking the start of the 7-day analysis window (now - 7 days)"
          },
          {
            "name": "windowEnd",
            "type": "string",
            "required": true,
            "description": "ISO datetime marking the end of the analysis window (current timestamp)"
          },
          {
            "name": "analyzedOrderCount",
            "type": "number",
            "required": true,
            "description": "Number of orders found within the 7-day analysis window"
          }
        ],
        "ports": [
          "Order",
          "StockLevel"
        ],
        "rulesApplied": [
          "aiPromoBasedOnLast7Days",
          "aiConsumesDomainData"
        ],
        "transactional": false,
        "steps": [
          "Resolve actorId from ctx.sessionContext for audit context (no public input required)",
          "Compute windowEnd = ctx.clock.now() and windowStart = windowEnd minus 7 days (systemDefault resolution)",
          "Load Orders via Order port filtered by createdAt >= windowStart (rule aiPromoBasedOnLast7Days: only orders within the 7-day window are considered)",
          "Extract embedded OrderItem collections from each loaded Order; aggregate total quantity sold per menuItemId across the window",
          "Load all StockLevel records via StockLevel port to obtain currentQuantity and minimumLevel per stock item",
          "Apply rule aiPromoBasedOnLast7Days: identify promo candidates — items with high recent sales volume (top sellers that could benefit from promotional bundling) and items with currentQuantity well above minimumLevel (overstock that needs movement)",
          "Apply rule aiConsumesDomainData: ensure every suggestion is derived exclusively from Order, OrderItem, and StockLevel domain data — no external data sources are consulted",
          "Build suggestion objects: { menuItemId, suggestedPromoType (e.g. 'bundle', 'discount', 'featured'), reason (human-readable rationale from sales/stock data), currentStockLevel, recentSalesQuantity }",
          "Serialize suggestions array as JSON string and return alongside windowStart, windowEnd, and analyzedOrderCount",
          "Note: eventWrites declares a StockConsumption audit event (port StockConsumption) but that port is not in the available ports set and the operation is strictly read-only (writes: []) — this is a modeling gap; no aggregate mutation occurs so no event is emitted"
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default requestAiPromoSuggestionsUsecase;

export const pipeline = [
  {
    "id": "requestAiPromoSuggestions__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiPromoSuggestions.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiPromoSuggestions.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
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
