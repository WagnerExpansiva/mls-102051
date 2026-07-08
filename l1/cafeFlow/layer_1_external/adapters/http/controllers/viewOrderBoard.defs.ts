/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewOrderBoard.defs.ts" enhancement="_blank"/>

export const viewOrderBoardController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "viewOrderBoard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "orderLifecycle",
    "controllerName": "ViewOrderBoardController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowViewOrderBoardHandler",
        "command": "viewOrderBoard",
        "usecaseRef": "viewOrderBoard",
        "inputTypeName": "ViewOrderBoardInput",
        "kind": "view",
        "inputContract": [
          {
            "inputId": "shiftId",
            "fieldRef": "Order.shiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Turno atualmente aberto para filtrar apenas pedidos do turno corrente"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Order.shiftId",
            "source": "activeLifecycleInstance",
            "originRef": "Shift.shiftId",
            "description": "O backend resolve o turno atualmente aberto consultando a única Shift com status open e utiliza seu shiftId para filtrar os pedidos exibidos no painel"
          }
        ],
        "accessPattern": {
          "kind": "list",
          "description": "",
          "entity": "Order",
          "keyField": "Order.orderId",
          "pagination": "optional",
          "selection": "none",
          "output": [
            "Order.orderId",
            "Order.status",
            "Order.orderType",
            "Order.tableNumber",
            "Order.priority",
            "Order.priorityReason",
            "Order.receivedAt",
            "Order.inPreparationAt",
            "Order.readyAt",
            "Order.createdAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.orderLifecycle.viewOrderBoard",
        "handlerName": "cafeFlowViewOrderBoardHandler"
      }
    ]
  }
} as const;

export default viewOrderBoardController;

export const pipeline = [
  {
    "id": "viewOrderBoard__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewOrderBoard.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewOrderBoard.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/viewOrderBoard.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
