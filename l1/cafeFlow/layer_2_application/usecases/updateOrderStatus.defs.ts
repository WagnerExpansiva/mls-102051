/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.defs.ts" enhancement="_blank"/>

export const updateOrderStatusUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateOrderStatus",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateOrderStatus",
    "ports": [
      "Order",
      "Shift",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "updateOrderStatus",
        "inputTypeName": "UpdateOrderStatusInput",
        "outputTypeName": "UpdateOrderStatusOutput",
        "input": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Pedido selecionado pelo cozinheiro na fila da cozinha"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Novo status que o cozinheiro deseja atribuir ao pedido (inPreparation ou ready)"
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "ID do pedido atualizado"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Status final do pedido após a atualização"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Timestamp da última atualização"
          }
        ],
        "ports": [
          "Order",
          "Shift"
        ],
        "rulesApplied": [
          "orderStatusFlow",
          "inProgressBeforeReady"
        ],
        "transactional": true,
        "steps": [
          "1. Resolve the active (open) Shift by querying the Shift port for a single record with status='open'. If none is open, return a validation error indicating no active shift.",
          "2. Load the Order by orderId from the Order port. If not found, return a not-found error.",
          "3. Validate that order.shiftId === activeShift.shiftId. If the order does not belong to the active shift, return a validation error.",
          "4. Apply rule orderStatusFlow: the status sequence must follow received → inPreparation → ready with no skips. If the requested status is 'inPreparation', the current order.status must be 'received'. If the requested status is 'ready', the current order.status must be 'inPreparation'. Any other transition is rejected with the rule id in the error detail.",
          "5. Apply rule inProgressBeforeReady: the order can only be marked 'ready' if it is currently 'inPreparation' (already covered by step 4 but enforced explicitly).",
          "6. Set the new status on the order. If status becomes 'inPreparation', set order.inPreparationAt = ctx.clock.now(). If status becomes 'ready', set order.readyAt = ctx.clock.now(). Always set order.updatedAt = ctx.clock.now().",
          "7. Save the updated Order through the Order port inside the same transaction.",
          "8. NOTE: The eventWrites contract declares a StockConsumption audit event (port 'StockConsumption'), but 'StockConsumption' is not present in the provided ports array. This is a modeling gap — the event cannot be appended without the port. Record this gap for the platform team to add the StockConsumption port."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default updateOrderStatusUsecase;

export const pipeline = [
  {
    "id": "updateOrderStatus__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.defs.ts",
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
