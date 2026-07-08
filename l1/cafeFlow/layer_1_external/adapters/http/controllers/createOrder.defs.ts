/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/createOrder.defs.ts" enhancement="_blank"/>

export const createOrderController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "createOrder",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "orderLifecycle",
    "controllerName": "CreateOrderController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowCreateOrderHandler",
        "command": "createOrder",
        "usecaseRef": "createOrder",
        "inputTypeName": "CreateOrderInput",
        "kind": "create",
        "inputContract": [
          {
            "inputId": "orderType",
            "fieldRef": "Order.orderType",
            "required": true,
            "source": "userInput",
            "description": "Tipo do pedido selecionado pelo atendente: 'table' (consumo na mesa) ou 'takeout' (para viagem)"
          },
          {
            "inputId": "tableNumber",
            "fieldRef": "Order.tableNumber",
            "required": false,
            "source": "userInput",
            "description": "Número da mesa informado pelo atendente, obrigatório quando orderType = 'table'"
          },
          {
            "inputId": "orderItems",
            "fieldRef": "OrderItem.menuItemId",
            "required": true,
            "source": "userInput",
            "description": "Lista de itens do cardápio selecionados pelo cliente, cada um com menuItemId e quantidade"
          },
          {
            "inputId": "priority",
            "fieldRef": "Order.priority",
            "required": false,
            "source": "userInput",
            "description": "Indica se o atendente marcou o pedido como prioritário no preparo"
          },
          {
            "inputId": "priorityReason",
            "fieldRef": "Order.priorityReason",
            "required": false,
            "source": "userInput",
            "description": "Justificativa da priorização, obrigatória quando priority = true"
          },
          {
            "inputId": "shiftId",
            "fieldRef": "Order.shiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Turno aberto no momento do lançamento do pedido"
          },
          {
            "inputId": "orderId",
            "fieldRef": "Order.orderId",
            "required": true,
            "source": "systemDefault",
            "description": "Identificador único gerado para o novo pedido"
          },
          {
            "inputId": "createdAt",
            "fieldRef": "Order.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Momento de criação do registro do pedido"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Order.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Momento da última atualização do registro do pedido"
          }
        ],
        "contextResolution": [
          {
            "inputId": "shiftId",
            "targetRef": "Order.shiftId",
            "source": "activeLifecycleInstance",
            "originRef": "Shift.shiftId",
            "description": "Resolves the single Shift with status open — the active shift at the moment of order creation"
          },
          {
            "inputId": "orderId",
            "targetRef": "Order.orderId",
            "source": "systemDefault",
            "originRef": "systemDefault.uuid",
            "description": "Generates a new UUID to identify the order being created"
          },
          {
            "inputId": "createdAt",
            "targetRef": "Order.createdAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Sets the creation timestamp to the current server time at the moment of order launch"
          },
          {
            "inputId": "updatedAt",
            "targetRef": "Order.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Sets the last-update timestamp to the current server time at the moment of order launch"
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "Order",
          "keyField": "Order.orderId",
          "pagination": "none",
          "selection": "none",
          "output": [
            "Order.orderId",
            "Order.status",
            "Order.orderType",
            "Order.tableNumber",
            "Order.createdAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.orderLifecycle.createOrder",
        "handlerName": "cafeFlowCreateOrderHandler"
      }
    ]
  }
} as const;

export default createOrderController;

export const pipeline = [
  {
    "id": "createOrder__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/createOrder.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/createOrder.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.d.ts"
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
