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
            "ofEntity": "Order"
          },
          {
            "name": "status",
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
          "Shift"
        ],
        "rulesApplied": [
          "orderStatusFlow",
          "inProgressBeforeReady"
        ],
        "transactional": true,
        "steps": [
          "1. Resolve the active (open) Shift by querying the Shift port for a single record with status='open'. If none is open, return a validation error indicating no active shift.",
          "2. Load the Order by orderId through the Order port (getById). If not found, return a not-found error.",
          "3. Validate that the loaded Order belongs to the active shift: order.shiftId must equal the resolved shift.shiftId. If not, return a validation error 'ORDER_NOT_IN_ACTIVE_SHIFT'.",
          "4. Apply rule orderStatusFlow: the only allowed transitions are received→inPreparation and inPreparation→ready. If the requested status is 'inPreparation' and the current status is not 'received', reject with 'INVALID_STATUS_TRANSITION: orderStatusFlow'. If the requested status is 'ready' and the current status is not 'inPreparation', reject with 'INVALID_STATUS_TRANSITION: inProgressBeforeReady'. Any other target status is rejected with 'INVALID_STATUS_TRANSITION: orderStatusFlow'.",
          "5. Set system-default timestamps using ctx.clock.now(): if new status is 'inPreparation', set inPreparationAt=now; if new status is 'ready', set readyAt=now. Always set updatedAt=now.",
          "6. Mutate the Order in memory: update status, the relevant timestamp, and updatedAt.",
          "7. Save the updated Order through the Order port inside the same transaction (ctx.data transaction wrapper).",
          "8. NOTE: eventWrites declares a StockConsumption audit event on port 'StockConsumption', but that port is NOT in the provided ports list ['Order','Shift']. This is a modeling gap — the event cannot be appended without the port. Record the gap and skip the event write until the StockConsumption port is added.",
          "9. Return { orderId, status, updatedAt }."
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
