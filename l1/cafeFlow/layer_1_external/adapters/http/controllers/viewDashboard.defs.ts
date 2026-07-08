/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewDashboard.defs.ts" enhancement="_blank"/>

export const viewDashboardController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "viewDashboard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "viewDashboard",
    "controllerName": "ViewDashboardController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowViewDashboardHandler",
        "command": "viewDashboard",
        "usecaseRef": "viewDashboard",
        "inputTypeName": "ViewDashboardInput",
        "kind": "view",
        "inputContract": [
          {
            "inputId": "shiftId",
            "fieldRef": "Order.shiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Turno atualmente aberto, usado para filtrar todos os dados do dashboard"
          },
          {
            "inputId": "actorId",
            "fieldRef": "Order.shiftId",
            "required": true,
            "source": "actorSession",
            "description": "Identificador do gerente autenticado que solicita o dashboard"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Order.shiftId",
            "source": "activeLifecycleInstance",
            "originRef": "Shift.shiftId",
            "description": "O backend localiza o único Shift com status aberto no momento e usa seu shiftId para filtrar todos os pedidos e dados agregados do dashboard"
          },
          {
            "targetRef": "Order.shiftId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "O backend extrai o actorId da sessão autenticada do gerente para autorizar o acesso ao dashboard"
          }
        ],
        "accessPattern": {
          "kind": "list",
          "description": "Lista agregada de pedidos do turno atual para composição do dashboard com total de vendas, itens mais vendidos e alertas de estoque baixo",
          "entity": "Order",
          "keyField": "Order.orderId",
          "pagination": "none",
          "selection": "none",
          "output": [
            "Order.status",
            "Order.orderType",
            "Order.createdAt",
            "Order.shiftId",
            "Order.deliveredAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.viewDashboard.viewDashboard",
        "handlerName": "cafeFlowViewDashboardHandler"
      }
    ]
  }
} as const;

export default viewDashboardController;

export const pipeline = [
  {
    "id": "viewDashboard__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewDashboard.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewDashboard.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/viewDashboard.d.ts"
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
