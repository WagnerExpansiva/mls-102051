/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/deliverOrder.defs.ts" enhancement="_blank"/>

export const deliverOrderUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "deliverOrder",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "deliverOrder",
    "ports": [
      "Order",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "deliverOrder",
        "inputTypeName": "DeliverOrderInput",
        "outputTypeName": "DeliverOrderOutput",
        "input": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Pedido selecionado pelo atendente no painel para entrega"
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Identificador do pedido entregue"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Status final do pedido após a entrega"
          },
          {
            "name": "deliveredAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Momento em que o pedido foi entregue ao cliente"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Momento da última atualização do registro do pedido"
          }
        ],
        "ports": [
          "Order"
        ],
        "rulesApplied": [
          "orderStatusFlow",
          "readyBeforeDelivered"
        ],
        "transactional": true,
        "steps": [
          "1. Load the Order aggregate by orderId through the Order port (getById).",
          "2. Validate rule readyBeforeDelivered: the loaded Order.status MUST equal 'ready'. If any other status, throw a validation error with rule id 'readyBeforeDelivered' and reject the operation.",
          "3. Validate rule orderStatusFlow: the transition 'ready' -> 'delivered' is permitted by the status enum flow. If the current status does not allow transitioning to 'delivered', throw a validation error with rule id 'orderStatusFlow'.",
          "4. Mutate the Order in memory: set status = 'delivered', set deliveredAt = ctx.clock.now() (systemDefault), set updatedAt = ctx.clock.now() (systemDefault).",
          "5. Persist the mutated Order through the Order port (save) inside a single transaction (ctx.data transaction wrapper).",
          "6. Append a StockConsumption audit event (purpose: audit, persisted: true) through its port inside the same transaction, recording the delivery transition for the Order. NOTE: the StockConsumption port is not present in the provided ports list — this is a modeling gap; the event write is described here for completeness but cannot be executed without the port.",
          "7. Return { orderId, status, deliveredAt, updatedAt } as the operation result."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default deliverOrderUsecase;

export const pipeline = [
  {
    "id": "deliverOrder__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/deliverOrder.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/deliverOrder.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
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
