/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const orderRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "OrderRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "OrderRepositoryAdapter",
    "entityId": "Order",
    "portRef": "IOrderRepository",
    "tableRef": "orders",
    "mdmReads": [],
    "notes": [
      "Domain Order <-> orders row via ctx.data.moduleData",
      "Real columns snake_case: order_id, shift_id, status, order_type, created_at",
      "details JSONB: tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, deliveredAt, updatedAt",
      "Embedded OrderItem[] mapped to/from details.orderItems",
      "No MDM refs"
    ]
  }
} as const;

export default orderRepositoryAdapter;

export const pipeline = [
  {
    "id": "orderRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryAdapter.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
