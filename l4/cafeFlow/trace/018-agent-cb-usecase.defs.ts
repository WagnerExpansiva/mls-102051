{
  "savedAt": "2026-07-16T17:24:06.825Z",
  "agentName": "agentCbUsecase",
  "stepId": 18,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitUsecase",
      "arguments": {
        "status": "ok",
        "result": {
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
        },
        "questions": [],
        "trace": [
          "Parsed owner spec: viewOrderBoard is a view/list operation on Order entity with parentAggregate=Order (root aggregate, no child embedding).",
          "Identified ports: Order and Shift (both aggregate roots).",
          "Identified input shiftId has source 'activeLifecycleInstance' — this is CONTEXT resolved server-side, NOT public input. Excluded from function input[].",
          "Context resolution: Order.shiftId is resolved by querying Shift port for status='open' and using that shift's shiftId. No public input required.",
          "No MDM refs to handle.",
          "Event writes: StockConsumption audit event listed in spec, but this is a read-only view operation (writes: []) with no mutations — no events are emitted.",
          "Applied rule dashboardCurrentShiftOnly: filter orders to only those belonging to the currently open shift; return empty if no open shift.",
          "Applied rule fifoKitchenQueue: sort orders by createdAt ascending (oldest first).",
          "Applied rule orderStatusFlow: validate each order status is within the allowed enum before including in the result.",
          "Output is a single collection field 'orders' (type array) containing projected Order fields per the accessPattern output list.",
          "No transactional wrapper needed — read-only operation."
        ]
      }
    },
    "status": "completed",
    "stepId": 24,
    "interaction": null,
    "nextSteps": null
  }
}
