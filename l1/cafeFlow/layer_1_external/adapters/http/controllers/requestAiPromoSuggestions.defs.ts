/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiPromoSuggestions.defs.ts" enhancement="_blank"/>

export const requestAiPromoSuggestionsController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "requestAiPromoSuggestions",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "requestAiPromoSuggestions",
    "controllerName": "RequestAiPromoSuggestionsController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "cafeFlowRequestAiPromoSuggestionsHandler",
        "command": "requestAiPromoSuggestions",
        "usecaseRef": "requestAiPromoSuggestions",
        "inputTypeName": "RequestAiPromoSuggestionsInput",
        "kind": "query",
        "inputContract": [
          {
            "inputId": "actorId",
            "fieldRef": "Order.shiftId",
            "required": true,
            "source": "actorSession",
            "description": "Identidade do gerente que solicita as sugestões, para auditoria e contexto de permissão"
          },
          {
            "inputId": "windowStart",
            "fieldRef": "Order.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data de início da janela de análise (7 dias antes do momento atual)"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Order.shiftId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "O backend resolve o identificador do gerente a partir da sessão ativa para validar permissão e registrar auditoria da solicitação"
          },
          {
            "targetRef": "Order.createdAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "O backend calcula o início da janela de 7 dias subtraindo 7 dias do timestamp atual (systemDefault.now) para filtrar apenas pedidos dentro do período relevante"
          }
        ],
        "accessPattern": {
          "kind": "lookup",
          "description": "",
          "entity": "Order",
          "keyField": "Order.orderId",
          "pagination": "none",
          "selection": "none",
          "output": [
            "Order.orderId",
            "Order.orderType",
            "Order.status",
            "Order.createdAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions",
        "handlerName": "cafeFlowRequestAiPromoSuggestionsHandler"
      }
    ]
  }
} as const;

export default requestAiPromoSuggestionsController;

export const pipeline = [
  {
    "id": "requestAiPromoSuggestions__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiPromoSuggestions.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/requestAiPromoSuggestions.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/requestAiPromoSuggestions.d.ts"
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
