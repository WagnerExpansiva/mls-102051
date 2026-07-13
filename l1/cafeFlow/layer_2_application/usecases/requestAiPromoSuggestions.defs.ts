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
            "type": "array",
            "required": true,
            "description": "Promo suggestion items derived from 7-day sales patterns and stock levels. Each element: { menuItemId: string, totalQuantity: number, orderCount: number, suggestedPromoType: string, reason: string }"
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
          "Resolve windowEnd = ctx.clock.now() and windowStart = windowEnd minus 7 days (rule aiPromoBasedOnLast7Days)",
          "Resolve actorId from ctx.sessionContext for audit/permission context — not a public input",
          "Load orders with createdAt >= windowStart via Order port (list query filtered by date range); each Order carries its embedded OrderItem collection",
          "Aggregate OrderItem data across all loaded orders: for each menuItemId compute totalQuantity (sum of quantity) and orderCount (distinct orders containing the item)",
          "Load all current StockLevel records via StockLevel port to identify items with currentQuantity above minimumLevel (overstock candidates)",
          "Generate promo suggestions by joining sales-frequency data (from OrderItem aggregation) with stock data (from StockLevel): items with high stock relative to minimum and moderate sales volume in the window are flagged for promotion (rule aiConsumesDomainData — only domain data from Order/OrderItem/StockLevel is used, no external sources)",
          "Build suggestion records: menuItemId, totalQuantity, orderCount, suggestedPromoType ('discount' | 'bundle' | 'featured'), and a human-readable reason string",
          "Return { suggestions, windowStart, windowEnd } — no aggregate is mutated, no events are emitted (strictly read-only)"
        ]
      }
    ],
    "rulesApplied": [
      "aiPromoBasedOnLast7Days",
      "aiConsumesDomainData"
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
    "rulesApplied": [
      "aiPromoBasedOnLast7Days",
      "aiConsumesDomainData"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
