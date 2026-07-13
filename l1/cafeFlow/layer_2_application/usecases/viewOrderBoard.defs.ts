/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.defs.ts" enhancement="_blank"/>

export const viewOrderBoardUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewOrderBoard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewOrderBoard",
    "ports": [
      "Order",
      "Shift",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "viewOrderBoard",
        "inputTypeName": "ViewOrderBoardInput",
        "outputTypeName": "ViewOrderBoardOutput",
        "input": [],
        "output": [
          {
            "name": "orders",
            "type": "Order[]",
            "ofEntity": "Order",
            "required": true,
            "description": "Pedidos do turno atual aberto, ordenados por createdAt crescente (FIFO)"
          },
          {
            "name": "currentShiftId",
            "type": "string",
            "ofEntity": "Shift",
            "required": false,
            "description": "ID do turno aberto resolvido em runtime; ausente quando nenhum turno está aberto"
          }
        ],
        "ports": [
          "Order",
          "Shift"
        ],
        "rulesApplied": [
          "dashboardCurrentShiftOnly",
          "fifoKitchenQueue",
          "orderStatusFlow"
        ],
        "transactional": false,
        "steps": [
          "1. Resolver o turno atualmente aberto consultando o port Shift por status='open' (regra dashboardCurrentShiftOnly)",
          "2. Se nenhum turno aberto for encontrado, retornar lista vazia sem erro (regra dashboardCurrentShiftOnly)",
          "3. Consultar o port Order filtrando por shiftId igual ao shiftId do turno aberto resolvido no passo 1",
          "4. Ordenar os resultados por Order.createdAt em ordem crescente (regra fifoKitchenQueue)",
          "5. Validar que cada Order.status pertence ao enum permitido [registered, received, inPreparation, ready, delivered] (regra orderStatusFlow); pedidos com status inválido são filtrados e não exibidos",
          "6. Projetar os campos orderId, status, orderType, tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, createdAt para cada pedido",
          "7. Retornar a lista projetada junto com o currentShiftId resolvido"
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default viewOrderBoardUsecase;

export const pipeline = [
  {
    "id": "viewOrderBoard__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
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
