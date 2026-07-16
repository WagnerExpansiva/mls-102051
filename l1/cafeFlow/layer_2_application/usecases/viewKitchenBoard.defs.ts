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
        "input": [],
        "output": [
          {
            "name": "orders",
            "type": "Order[]",
            "required": true,
            "description": "Collection of kitchen-board orders filtered to received/inPreparation status for the active shift, sorted by priority then receivedAt"
          },
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Unique identifier of the order"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Current status of the order (received or inPreparation on the kitchen board)"
          },
          {
            "name": "orderType",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Type of order: table or takeout"
          },
          {
            "name": "tableNumber",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Table number when orderType is table; null for takeout"
          },
          {
            "name": "priority",
            "type": "boolean",
            "required": false,
            "ofEntity": "Order",
            "description": "Whether the order has priority flag set"
          },
          {
            "name": "priorityReason",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Reason for priority if flagged"
          },
          {
            "name": "receivedAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Timestamp when the order was received by the kitchen"
          },
          {
            "name": "inPreparationAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Timestamp when preparation started"
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Order creation timestamp"
          },
          {
            "name": "items",
            "type": "OrderItem[]",
            "required": true,
            "description": "Order items embedded in each order of the collection"
          },
          {
            "name": "orderItemId",
            "type": "string",
            "required": true,
            "ofEntity": "OrderItem",
            "description": "Unique identifier of the order item"
          },
          {
            "name": "menuItemId",
            "type": "string",
            "required": true,
            "ofEntity": "OrderItem",
            "description": "Reference to the menu item"
          },
          {
            "name": "quantity",
            "type": "number",
            "required": true,
            "ofEntity": "OrderItem",
            "description": "Quantity ordered"
          },
          {
            "name": "unitPrice",
            "type": "number",
            "required": true,
            "ofEntity": "OrderItem",
            "description": "Unit price of the menu item at time of order"
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
          "Resolve the active shift: query for the single Shift with status 'open' to obtain shiftId (activeLifecycleInstance). NOTE: Shift port is not in the provided ports list — modeling gap; shift resolution cannot be performed without it. If no open shift exists, return an empty orders list per dashboardCurrentShiftOnly rule.",
          "Query the Order port for orders where status IN ('received', 'inPreparation') — the statusFilter is a systemDefault, not user input, hardcoded to these two statuses.",
          "Apply dashboardCurrentShiftOnly rule: filter the queried orders to only those whose shiftId matches the resolved active shift id. If the Shift port gap prevents resolution, record the gap and proceed without the shift filter (do not invent a shiftId).",
          "Apply fifoKitchenQueue rule: sort the filtered orders by priority DESC (priority=true first) then receivedAt ASC (oldest first) to produce the FIFO kitchen queue ordering.",
          "For each order in the sorted list, extract its embedded OrderItem collection (OrderItem is a child of the Order aggregate, loaded via the Order port).",
          "Project each order to the kitchen-board view fields: orderId, status, orderType, tableNumber, priority, priorityReason, receivedAt, inPreparationAt, createdAt, and items (orderItemId, menuItemId, quantity, unitPrice).",
          "Return the projected, sorted collection as the kitchen board view. No mutations are performed; no events are emitted (view-only operation)."
        ]
      }
    ],
    "rulesApplied": [
      "fifoKitchenQueue",
      "dashboardCurrentShiftOnly"
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
    "rulesApplied": [
      "fifoKitchenQueue",
      "dashboardCurrentShiftOnly"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
