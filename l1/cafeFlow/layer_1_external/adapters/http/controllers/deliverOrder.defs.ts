/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/deliverOrder.defs.ts" enhancement="_blank"/>

export const deliverOrderController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "deliverOrder",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "orderLifecycle",
    "controllerName": "DeliverOrderController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowDeliverOrderHandler",
        "command": "deliverOrder",
        "usecaseRef": "deliverOrder",
        "inputTypeName": "DeliverOrderInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "orderId",
            "fieldRef": "Order.orderId",
            "required": true,
            "source": "selectedEntity",
            "description": "Pedido selecionado pelo atendente no painel para entrega"
          },
          {
            "inputId": "deliveredAt",
            "fieldRef": "Order.deliveredAt",
            "required": true,
            "source": "systemDefault",
            "description": "Momento em que o pedido foi entregue ao cliente, gerado automaticamente"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Order.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Momento da última atualização do registro do pedido, gerado automaticamente"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Order.orderId",
            "source": "selectedEntity",
            "originRef": "Order.orderId",
            "description": "O backend resolve o orderId a partir do pedido atualmente selecionado pelo atendente no painel de pedidos."
          },
          {
            "targetRef": "Order.deliveredAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend define deliveredAt com o timestamp atual no momento da confirmação da entrega."
          },
          {
            "targetRef": "Order.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend define updatedAt com o timestamp atual no momento da atualização do registro."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "Order",
          "keyField": "Order.orderId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "Order.orderId",
            "Order.status",
            "Order.deliveredAt",
            "Order.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.orderLifecycle.deliverOrder",
        "handlerName": "cafeFlowDeliverOrderHandler"
      }
    ]
  }
} as const;

export default deliverOrderController;

export const pipeline = [
  {
    "id": "deliverOrder__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/deliverOrder.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/deliverOrder.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/deliverOrder.d.ts"
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
