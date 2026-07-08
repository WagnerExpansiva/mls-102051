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
            "type": "uuid",
            "required": true,
            "ofEntity": "Order",
            "description": "Pedido selecionado pelo atendente no painel para entrega"
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "deliveredAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          }
        ],
        "ports": [
          "Order",
          "StockConsumption"
        ],
        "rulesApplied": [
          "orderStatusFlow",
          "readyBeforeDelivered"
        ],
        "transactional": true,
        "steps": [
          "1. Load the Order aggregate by orderId via OrderPort.getById(orderId).",
          "2. Apply rule 'readyBeforeDelivered': verify order.status === 'ready'. If not, throw a validation error with rule id 'readyBeforeDelivered' — only orders in 'ready' status can be delivered.",
          "3. Apply rule 'orderStatusFlow': confirm the transition 'ready' -> 'delivered' is a valid forward transition in the order status enum sequence.",
          "4. Resolve deliveredAt = ctx.clock.now() and updatedAt = ctx.clock.now() (systemDefault — not user input).",
          "5. Mutate the Order: set status = 'delivered', deliveredAt = resolved timestamp, updatedAt = resolved timestamp.",
          "6. Save the Order aggregate via OrderPort.save(order) inside the same transaction.",
          "7. Append a StockConsumption audit event via StockConsumptionPort inside the same transaction, recording the delivery transition for the order.",
          "8. Return { orderId, status, deliveredAt, updatedAt }."
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
