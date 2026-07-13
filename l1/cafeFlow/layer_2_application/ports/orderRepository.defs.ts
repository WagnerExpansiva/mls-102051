/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.defs.ts" enhancement="_blank"/>

export const orderRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "OrderRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Order",
    "interfaceName": "IOrderRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "Order",
        "params": [
          "orderId: OrderId"
        ]
      },
      {
        "name": "list",
        "returns": "Order[]",
        "params": [
          "filter: OrderFilter"
        ]
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "order: Order"
        ]
      },
      {
        "name": "findByCustomerId",
        "returns": "Order[]",
        "params": [
          "customerId: CustomerId"
        ]
      },
      {
        "name": "findByStatus",
        "returns": "Order[]",
        "params": [
          "status: OrderStatus"
        ]
      },
      {
        "name": "findByPeriod",
        "returns": "Order[]",
        "params": [
          "start: Date",
          "end: Date"
        ]
      }
    ]
  }
} as const;

export default orderRepositoryPort;

export const pipeline = [
  {
    "id": "orderRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
