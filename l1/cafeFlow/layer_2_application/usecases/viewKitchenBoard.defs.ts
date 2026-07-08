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
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "viewKitchenBoard",
        "inputTypeName": "ViewKitchenBoardInput",
        "outputTypeName": "ViewKitchenBoardOutput",
        "input": [
          {
            "name": "statusFilter",
            "type": "string",
            "required": false,
            "description": "Optional override for status filter; defaults to ['received','inPreparation'] resolved by systemDefault"
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
            "name": "orderType",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "tableNumber",
            "type": "string",
            "required": false,
            "ofEntity": "Order"
          },
          {
            "name": "priority",
            "type": "boolean",
            "required": false,
            "ofEntity": "Order"
          },
          {
            "name": "priorityReason",
            "type": "string",
            "required": false,
            "ofEntity": "Order"
          },
          {
            "name": "receivedAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order"
          },
          {
            "name": "inPreparationAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order"
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "items",
            "type": "array",
            "required": true,
            "ofEntity": "OrderItem",
            "description": "Order items belonging to each order in the kitchen board"
          }
        ],
        "ports": [
          "Order"
        ],
        "rulesApplied": [
          "fifoKitchenQueue",
          "dashboardCurrentShiftOnly"
        ],
        "transactional": false,
        "steps": [
          "1. Resolve shiftId from the active lifecycle instance (the single Shift with status='open') via ctx.sessionContext.activeLifecycleInstanceId; do NOT require it as user input",
          "2. Determine statusFilter: use the provided optional input if supplied, otherwise default to ['received','inPreparation'] per systemDefault",
          "3. Apply rule dashboardCurrentShiftOnly: query Order port for all orders where shiftId equals the resolved open shift id AND status is in the statusFilter set",
          "4. Apply rule fifoKitchenQueue: sort results with priority=true orders first, then by receivedAt ascending (oldest first) to maintain FIFO kitchen queue order",
          "5. For each order, load its embedded OrderItem collection from the parent Order aggregate",
          "6. Project each order with orderId, status, orderType, tableNumber (when applicable), priority, priorityReason, receivedAt, inPreparationAt, createdAt, and its items array",
          "7. Return the ordered list; orders with status 'ready' or 'delivered' are excluded by the status filter"
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
