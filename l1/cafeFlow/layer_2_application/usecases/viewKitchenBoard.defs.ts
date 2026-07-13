/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.defs.ts" enhancement="_blank"/>

export const viewKitchenBoardUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewKitchenBoard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewKitchenBoard",
    "ports": [
      "Order",
      "Shift",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "viewKitchenBoard",
        "inputTypeName": "ViewKitchenBoardInput",
        "outputTypeName": "ViewKitchenBoardOutput",
        "input": [],
        "output": [
          {
            "name": "orderId",
            "type": "string",
            "ofEntity": "Order",
            "required": true,
            "description": "Identificador único do pedido"
          },
          {
            "name": "status",
            "type": "string",
            "ofEntity": "Order",
            "required": true,
            "description": "Status atual do pedido (received ou inPreparation)"
          },
          {
            "name": "orderType",
            "type": "string",
            "ofEntity": "Order",
            "required": true,
            "description": "Tipo do pedido: table ou takeout"
          },
          {
            "name": "tableNumber",
            "type": "string",
            "ofEntity": "Order",
            "required": false,
            "description": "Número da mesa quando orderType=table"
          },
          {
            "name": "priority",
            "type": "boolean",
            "ofEntity": "Order",
            "required": false,
            "description": "Indica se o pedido é prioritário"
          },
          {
            "name": "priorityReason",
            "type": "string",
            "ofEntity": "Order",
            "required": false,
            "description": "Motivo da prioridade quando priority=true"
          },
          {
            "name": "receivedAt",
            "type": "string",
            "ofEntity": "Order",
            "required": false,
            "description": "Data/hora em que o pedido foi recebido pela cozinha"
          },
          {
            "name": "inPreparationAt",
            "type": "string",
            "ofEntity": "Order",
            "required": false,
            "description": "Data/hora em que o pedido entrou em preparação"
          },
          {
            "name": "createdAt",
            "type": "string",
            "ofEntity": "Order",
            "required": true,
            "description": "Data/hora de criação do pedido"
          },
          {
            "name": "orderItems",
            "type": "OrderItem[]",
            "ofEntity": "OrderItem",
            "required": true,
            "description": "Itens do pedido com orderItemId, menuItemId, quantity e unitPrice"
          }
        ],
        "ports": [
          "Order",
          "Shift"
        ],
        "rulesApplied": [
          "fifoKitchenQueue",
          "dashboardCurrentShiftOnly"
        ],
        "transactional": false,
        "steps": [
          "1. Resolver o turno ativo: consultar o port Shift listando por status='open' para obter o shiftId do único turno aberto (activeLifecycleInstance). Se nenhum turno estiver aberto, retornar lista vazia.",
          "2. Aplicar regra dashboardCurrentShiftOnly: filtrar pedidos do port Order pelo shiftId resolvido no passo 1, garantindo que apenas pedidos do turno atual sejam exibidos.",
          "3. Aplicar filtro de status (systemDefault): restringir a lista aos pedidos cujo status seja 'received' ou 'inPreparation', excluindo pedidos 'registered', 'ready' ou 'delivered'.",
          "4. Aplicar regra fifoKitchenQueue: ordenar os pedidos colocando primeiro os com priority=true (destaque) e dentro de cada grupo ordenar por receivedAt em ordem crescente (FIFO).",
          "5. Projetar os campos de saída de cada Order (orderId, status, orderType, tableNumber, priority, priorityReason, receivedAt, inPreparationAt, createdAt) e incluir os OrderItems embarcados no agregado Order (orderItemId, menuItemId, quantity, unitPrice).",
          "6. Retornar a lista de pedidos projetada como coleção de ViewKitchenBoardOutput."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default viewKitchenBoardUsecase;

export const pipeline = [
  {
    "id": "viewKitchenBoard__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.defs.ts",
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
