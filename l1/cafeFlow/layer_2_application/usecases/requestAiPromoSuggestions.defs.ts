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
        "outputTypeName": "AiPromoSuggestion",
        "input": [],
        "output": [
          {
            "name": "menuItemId",
            "type": "string",
            "required": true,
            "description": "ID do item de menu sugerido para promoção"
          },
          {
            "name": "totalQuantitySold",
            "type": "number",
            "required": true,
            "description": "Quantidade total vendida do item nos últimos 7 dias"
          },
          {
            "name": "currentStockQuantity",
            "type": "number",
            "required": true,
            "description": "Quantidade atual em estoque do item"
          },
          {
            "name": "stockUnit",
            "type": "string",
            "required": true,
            "description": "Unidade de medida do estoque (kg, liter, portion, unit)"
          },
          {
            "name": "suggestionReason",
            "type": "string",
            "required": true,
            "description": "Motivo da sugestão derivado do padrão de vendas e nível de estoque"
          },
          {
            "name": "suggestedDiscountPercent",
            "type": "number",
            "required": false,
            "description": "Percentual de desconto sugerido com base no volume de vendas e estoque"
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
        "transactional": true,
        "steps": [
          "Resolve windowStart = ctx.clock.now() minus 7 days (rule aiPromoBasedOnLast7Days) — this is the analysis window; no user input needed",
          "Resolve actorId from ctx.sessionContext for audit and permission context",
          "Query Order port for all orders with createdAt >= windowStart (last 7 days only)",
          "From each loaded Order aggregate, collect embedded OrderItems and aggregate total quantity by menuItemId across the entire window",
          "Query StockLevel port for all current stock levels to cross-reference with aggregated sales data (rule aiConsumesDomainData — only domain data from Order, OrderItem, StockLevel is consumed, no external sources)",
          "Cross-reference: items with high sales volume AND sufficient stock (currentQuantity > minimumLevel) are promo candidates; items with low stock (currentQuantity <= minimumLevel) are excluded to avoid supply constraints",
          "Compute suggestedDiscountPercent proportional to sales volume and stock surplus — higher volume + higher surplus yields larger suggested discount",
          "Build the promo suggestion list with menuItemId, totalQuantitySold, currentStockQuantity, stockUnit, suggestionReason, and suggestedDiscountPercent",
          "Append audit event to StockConsumption port recording the AI suggestion request (actorId, windowStart, suggestionCount) — note: StockConsumption port is referenced by eventWrites but not present in provided ports; this is a modeling gap that should be resolved by adding StockConsumption to ports",
          "Return the list of promo suggestions as the operation result — no Order, OrderItem, or StockLevel records are modified (strictly read-only)"
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
