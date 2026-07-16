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
            "type": "array",
            "required": true,
            "description": "Collection of orders for the current open shift, sorted by createdAt ascending (FIFO). Each item contains orderId, status, orderType, tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, createdAt."
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
          "Resolve the currently open Shift by querying the Shift port for the single record with status='open' (dashboardCurrentShiftOnly rule). If multiple open shifts exist, use the most recently opened one.",
          "If no open Shift is found, return an empty orders list — the dashboard shows nothing for closed/previous shifts (dashboardCurrentShiftOnly rule).",
          "Query the Order port filtering by shiftId equal to the resolved open Shift's shiftId to retrieve only orders belonging to the current shift.",
          "Sort the returned orders by createdAt in ascending order so the oldest order appears first (fifoKitchenQueue rule).",
          "Validate each order's status is one of the allowed values: registered, received, inPreparation, ready, delivered (orderStatusFlow rule). Orders with an unexpected status are excluded from the result.",
          "Project each order to include only: orderId, status, orderType, tableNumber, priority, priorityReason, receivedAt, inPreparationAt, readyAt, createdAt.",
          "Return the projected and sorted order list as the orders output field."
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
