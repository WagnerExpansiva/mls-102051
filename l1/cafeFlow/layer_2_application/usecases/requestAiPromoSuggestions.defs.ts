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
            "description": "Lista de sugestões de itens para promoção derivadas dos padrões de venda dos últimos 7 dias"
          },
          {
            "name": "windowStart",
            "type": "string",
            "required": true,
            "description": "Data de início da janela de análise (7 dias antes do momento atual)"
          },
          {
            "name": "windowEnd",
            "type": "string",
            "required": true,
            "description": "Data de fim da janela de análise (momento atual)"
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
          "Resolve actorId from ctx.sessionContext.actorId for audit and permission context",
          "Resolve windowStart by computing ctx.clock.now() minus 7 days (rule: aiPromoBasedOnLast7Days)",
          "Load orders from the Order port filtered by createdAt >= windowStart and createdAt <= now",
          "Collect all orderIds from the fetched orders",
          "Load OrderItem children embedded in each Order aggregate through the Order port (no separate OrderItem repository)",
          "Aggregate OrderItem data: group by menuItemId, sum quantities, compute average unitPrice, count occurrences",
          "Load all StockLevel records from the StockLevel port to identify items with high stock or near minimum level",
          "Join aggregated sales data with stock levels by matching stockItemId to menuItemId where possible",
          "Apply rule aiConsumesDomainData: build promo suggestions exclusively from domain data (Order, OrderItem, StockLevel) — no external sources",
          "For each menuItemId with sufficient sales volume, compute a suggestion score: higher when sales volume is high AND current stock quantity is high relative to minimum level (surplus stock to move via promo)",
          "Sort suggestions by score descending and return top suggestions with menuItemId, totalQuantitySold, averageUnitPrice, currentStockQuantity, suggestionScore, and a human-readable rationale",
          "Append a StockConsumption audit event through the StockConsumption port recording that promo suggestions were requested (actorId, windowStart, windowEnd, suggestionCount) — this is a read-only audit trail, no mutation to Order or StockLevel aggregates"
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
