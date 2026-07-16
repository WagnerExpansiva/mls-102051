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
            "type": "datetime",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "updatedAt",
            "type": "datetime",
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
          "Load the Order aggregate by orderId via OrderPort.getById(orderId); throw NotFoundError if absent.",
          "Apply rule readyBeforeDelivered: verify order.status === 'ready'; if not, throw ValidationError with detail { rule: 'readyBeforeDelivered', currentStatus: order.status, expectedStatus: 'ready' }.",
          "Apply rule orderStatusFlow: verify the transition 'ready' -> 'delivered' is permitted in the status flow enum [registered, received, inPreparation, ready, delivered]; if not allowed, throw ValidationError with detail { rule: 'orderStatusFlow', from: order.status, to: 'delivered' }.",
          "Mutate the Order in memory: set status = 'delivered', deliveredAt = ctx.clock.now(), updatedAt = ctx.clock.now().",
          "Persist the updated Order via OrderPort.save(order) inside the transaction.",
          "Append a StockConsumption audit event record (entityId: StockConsumption, owner: Order, purpose: audit) through the StockConsumption port inside the same transaction, capturing the orderId, previous status 'ready', new status 'delivered', and deliveredAt timestamp.",
          "Return { orderId, status: 'delivered', deliveredAt, updatedAt }."
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
