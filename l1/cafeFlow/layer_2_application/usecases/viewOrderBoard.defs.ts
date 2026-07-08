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
        "outputTypeName": "OrderBoardItem",
        "input": [
          {
            "name": "shiftId",
            "type": "string",
            "required": false,
            "ofEntity": "Shift",
            "description": "ID do turno atualmente aberto. Resolvido pelo backend consultando a Shift com status 'open' quando não informado pelo chamador (activeLifecycleInstance)."
          },
          {
            "name": "limit",
            "type": "number",
            "required": false,
            "description": "Limite opcional de pedidos retornados (paginação)."
          },
          {
            "name": "offset",
            "type": "number",
            "required": false,
            "description": "Deslocamento opcional para paginação."
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Identificador único do pedido."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Status atual do pedido: registered, received, inPreparation, ready ou delivered."
          },
          {
            "name": "orderType",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Tipo do pedido: table ou takeout."
          },
          {
            "name": "tableNumber",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Número da mesa quando orderType = table."
          },
          {
            "name": "priority",
            "type": "boolean",
            "required": false,
            "ofEntity": "Order",
            "description": "Indicador de priorização do pedido no painel."
          },
          {
            "name": "priorityReason",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Motivo da priorização quando priority = true."
          },
          {
            "name": "receivedAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Timestamp de recebimento do pedido."
          },
          {
            "name": "inPreparationAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Timestamp de início da preparação."
          },
          {
            "name": "readyAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Timestamp de pronto para entrega."
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Timestamp de criação do pedido — usado para ordenação FIFO."
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
          "Resolver shiftId: se informado pelo chamador, usar diretamente; caso contrário, consultar a porta Shift pelo único registro com status 'open' (regra dashboardCurrentShiftOnly).",
          "Validar regra dashboardCurrentShiftOnly: se nenhuma Shift com status 'open' for encontrada, lançar erro indicando que não há turno ativo e o painel não pode ser exibido.",
          "Consultar a porta Order filtrando todos os pedidos cujo shiftId corresponda ao turno resolvido no passo anterior.",
          "Aplicar regra fifoKitchenQueue: ordenar a lista de pedidos por createdAt em ordem crescente (FIFO — primeiro a entrar, primeiro a ser exibido).",
          "Aplicar regra orderStatusFlow: validar que cada pedido possui status dentro do conjunto permitido {registered, received, inPreparation, ready, delivered}; pedidos em status inválido são filtrados e registrados como anomalia.",
          "Projetar cada pedido para os campos do painel: orderId, status, orderType, tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, createdAt.",
          "Aplicar paginação opcional (limit/offset) se fornecida, após a ordenação FIFO.",
          "Retornar a lista ordenada de OrderBoardItem representando o painel da cozinha."
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
