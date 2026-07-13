/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiSalesSummary.defs.ts" enhancement="_blank"/>

export const requestAiSalesSummaryController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "requestAiSalesSummary",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "requestAiSalesSummary",
    "controllerName": "RequestAiSalesSummaryController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowRequestAiSalesSummaryHandler",
        "command": "requestAiSalesSummary",
        "usecaseRef": "requestAiSalesSummary",
        "inputTypeName": "AiSalesSummaryInput",
        "kind": "query",
        "inputContract": [
          {
            "inputId": "shiftId",
            "fieldRef": "Order.shiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Turno atualmente aberto para filtrar apenas os pedidos do dia corrente"
          },
          {
            "inputId": "actorId",
            "fieldRef": "Order.shiftId",
            "required": true,
            "source": "actorSession",
            "description": "Identificador do gerente autenticado que solicita o resumo"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Order.shiftId",
            "source": "activeLifecycleInstance",
            "originRef": "Shift.shiftId",
            "description": "Resolvido a partir do único Shift com status open, filtrando apenas pedidos do turno/dia corrente"
          },
          {
            "targetRef": "Order.shiftId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "Resolvido a partir da sessão autenticada do gerente para autorizar o acesso ao resumo de vendas"
          }
        ],
        "accessPattern": {
          "kind": "list",
          "description": "",
          "entity": "Order",
          "keyField": "Order.orderId",
          "pagination": "none",
          "selection": "none",
          "output": [
            "Order.orderId",
            "Order.status",
            "Order.orderType",
            "Order.createdAt",
            "Order.deliveredAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.requestAiSalesSummary.requestAiSalesSummary",
        "handlerName": "cafeFlowRequestAiSalesSummaryHandler"
      }
    ]
  }
} as const;

export default requestAiSalesSummaryController;

export const pipeline = [
  {
    "id": "requestAiSalesSummary__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiSalesSummary.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiSalesSummary.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiSalesSummary.d.ts"
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
