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
        "outputTypeName": "RequestAiSalesSummaryOutput",
        "input": [],
        "output": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true,
            "description": "ID do turno atualmente aberto usado como filtro",
            "ofEntity": "Shift"
          },
          {
            "name": "orders",
            "type": "array",
            "required": true,
            "description": "Lista de pedidos do turno corrente com orderId, status, orderType, createdAt, deliveredAt",
            "ofEntity": "Order"
          },
          {
            "name": "topSellers",
            "type": "array",
            "required": true,
            "description": "Itens mais vendidos calculados a partir dos pedidos do dia corrente (menuItemId, totalQuantity, totalRevenue)",
            "ofEntity": "OrderItem"
          },
          {
            "name": "stockLevels",
            "type": "array",
            "required": true,
            "description": "Níveis de estoque atuais para o resumo de IA (stockItemId, currentQuantity, minimumLevel, unit)",
            "ofEntity": "StockLevel"
          },
          {
            "name": "summaryText",
            "type": "string",
            "required": true,
            "description": "Resumo textual consolidado para consumo do assistente IA"
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
          "1. Resolver actorId a partir de ctx.sessionContext.actorId (source=actorSession). Se ausente, lançar erro de autorização.",
          "2. Consultar a porta Shift para obter o único Shift com status='open' (rule dashboardCurrentShiftOnly). Se não houver turno aberto, lançar erro 'Nenhum turno aberto encontrado'. Extrair shiftId do turno aberto — este valor NÃO é entrada do usuário, é resolvido internamente (source=activeLifecycleInstance).",
          "3. Consultar a porta Order filtrando por shiftId=shiftId obtido no passo 2, retornando orderId, status, orderType, createdAt, deliveredAt para todos os pedidos do turno corrente.",
          "4. Para cada pedido retornado, coletar os OrderItem associados (via orderId) e agregar por menuItemId somando quantity e calculando receita total (quantity * unitPrice) para produzir topSellers (rule topSellersFromDayOrders).",
          "5. Consultar a porta StockLevel para obter todos os níveis de estoque atuais (stockItemId, currentQuantity, minimumLevel, unit).",
          "6. Consolidar orders, topSellers e stockLevels em um resumo estruturado (summaryText) que o assistente IA consome — apenas dados agregados de pedidos e estoque do domínio, sem fontes externas (rule aiConsumesDomainData).",
          "7. Retornar shiftId, orders, topSellers, stockLevels e summaryText. Não permitir consulta de períodos históricos ou múltiplos turnos (rule dashboardCurrentShiftOnly)."
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
