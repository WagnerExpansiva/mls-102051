/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewKitchenBoard.defs.ts" enhancement="_blank"/>

export const viewKitchenBoardController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "viewKitchenBoard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "orderLifecycle",
    "controllerName": "ViewKitchenBoardController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowViewKitchenBoardHandler",
        "command": "viewKitchenBoard",
        "usecaseRef": "viewKitchenBoard",
        "inputTypeName": "ViewKitchenBoardInput",
        "kind": "view",
        "inputContract": [
          {
            "inputId": "shiftId",
            "fieldRef": "Order.shiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Turno aberto no momento, usado para filtrar apenas pedidos do turno atual"
          },
          {
            "inputId": "statusFilter",
            "fieldRef": "Order.status",
            "required": false,
            "source": "systemDefault",
            "description": "Filtro padrão de status: exibe pedidos com status 'received' ou 'inPreparation'"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Order.shiftId",
            "source": "activeLifecycleInstance",
            "originRef": "Shift.shiftId",
            "description": "Resolvido buscando o único Shift com status 'open' no momento da consulta, garantindo que apenas pedidos do turno atual sejam exibidos"
          },
          {
            "targetRef": "Order.status",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O filtro de status é aplicado automaticamente pelo backend, restringindo a lista aos status 'received' e 'inPreparation' sem exigir entrada do usuário"
          }
        ],
        "accessPattern": {
          "kind": "list",
          "description": "",
          "entity": "Order",
          "keyField": "Order.orderId",
          "filters": [
            "Order.status",
            "Order.shiftId"
          ],
          "sort": [
            "Order.priority",
            "Order.receivedAt"
          ],
          "pagination": "optional",
          "selection": "single",
          "output": [
            "Order.orderId",
            "Order.status",
            "Order.orderType",
            "Order.tableNumber",
            "Order.priority",
            "Order.priorityReason",
            "Order.receivedAt",
            "Order.inPreparationAt",
            "Order.createdAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.orderLifecycle.viewKitchenBoard",
        "handlerName": "cafeFlowViewKitchenBoardHandler"
      }
    ]
  }
} as const;

export default viewKitchenBoardController;

export const pipeline = [
  {
    "id": "viewKitchenBoard__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewKitchenBoard.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewKitchenBoard.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenBoard.d.ts"
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
