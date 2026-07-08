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
            "description": "ID do turno atualmente aberto usado para filtrar os dados",
            "ofEntity": "Shift"
          },
          {
            "name": "totalSales",
            "type": "number",
            "required": true,
            "description": "Total de vendas do turno atual somando todos os pedidos"
          },
          {
            "name": "orders",
            "type": "array",
            "required": true,
            "description": "Lista de pedidos do turno atual com status, tipo, data de criação e data de entrega",
            "ofEntity": "Order"
          },
          {
            "name": "topSellers",
            "type": "array",
            "required": true,
            "description": "Itens mais vendidos calculados a partir dos OrderItem dos pedidos do turno atual"
          },
          {
            "name": "lowStockAlerts",
            "type": "array",
            "required": true,
            "description": "Alertas de estoque baixo para itens cujo StockLevel está abaixo do mínimo",
            "ofEntity": "StockLevel"
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
          "1. Extrair actorId de ctx.sessionContext.actorId para autorização do gerente",
          "2. Consultar a porta Shift para localizar o único Shift com status='open' (regra dashboardCurrentShiftOnly); se nenhum turno aberto existir, retornar erro de validação",
          "3. Usar o shiftId do turno aberto para filtrar todos os pedidos via porta Order (listar pedidos cujo shiftId corresponda ao turno atual)",
          "4. Calcular totalSales somando o valor de todos os pedidos do turno atual",
          "5. Para cada pedido do turno, coletar os OrderItem e agregar por menuItemId somando quantity (regra topSellersFromDayOrders); ordenar por quantidade descendente para obter topSellers",
          "6. Consultar a porta StockLevel para todos os itens de estoque e filtrar aqueles cujo currentQuantity < minimumLevel para compor lowStockAlerts",
          "7. Montar e retornar o objeto de dashboard com shiftId, totalSales, orders, topSellers e lowStockAlerts"
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
