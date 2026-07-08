/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/updateOrderStatus.defs.ts" enhancement="_blank"/>

export const updateOrderStatusController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "updateOrderStatus",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "orderLifecycle",
    "controllerName": "UpdateOrderStatusController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowUpdateOrderStatusHandler",
        "command": "updateOrderStatus",
        "usecaseRef": "updateOrderStatus",
        "inputTypeName": "UpdateOrderStatusInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "orderId",
            "fieldRef": "Order.orderId",
            "required": true,
            "source": "selectedEntity",
            "description": "Pedido selecionado pelo cozinheiro na fila da cozinha"
          },
          {
            "inputId": "status",
            "fieldRef": "Order.status",
            "required": true,
            "source": "userInput",
            "description": "Novo status que o cozinheiro deseja atribuir ao pedido (inPreparation ou ready)"
          },
          {
            "inputId": "shiftId",
            "fieldRef": "Order.shiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Turno aberto no momento da atualização, para validar que o pedido pertence ao turno atual"
          },
          {
            "inputId": "inPreparationAt",
            "fieldRef": "Order.inPreparationAt",
            "required": false,
            "source": "systemDefault",
            "description": "Timestamp definido quando o status passa a inPreparation"
          },
          {
            "inputId": "readyAt",
            "fieldRef": "Order.readyAt",
            "required": false,
            "source": "systemDefault",
            "description": "Timestamp definido quando o status passa a ready"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Order.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp da última atualização do registro"
          }
        ],
        "contextResolution": [
          {
            "inputId": "shiftId",
            "targetRef": "Order.shiftId",
            "source": "activeLifecycleInstance",
            "originRef": "Shift.shiftId",
            "description": "Resolve o turno atualmente aberto (single Shift with status open) para validar que o pedido pertence ao turno ativo"
          },
          {
            "inputId": "inPreparationAt",
            "targetRef": "Order.inPreparationAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Define o timestamp atual quando o status transita para inPreparation"
          },
          {
            "inputId": "readyAt",
            "targetRef": "Order.readyAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Define o timestamp atual quando o status transita para ready"
          },
          {
            "inputId": "updatedAt",
            "targetRef": "Order.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Define o timestamp atual em toda atualização do registro"
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "Order",
          "keyField": "Order.orderId",
          "pagination": "none",
          "selection": "single"
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.orderLifecycle.updateOrderStatus",
        "handlerName": "cafeFlowUpdateOrderStatusHandler"
      }
    ]
  }
} as const;

export default updateOrderStatusController;

export const pipeline = [
  {
    "id": "updateOrderStatus__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/updateOrderStatus.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/updateOrderStatus.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.d.ts"
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
