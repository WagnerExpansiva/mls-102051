/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/managerDashboard.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "managerDashboard",
  "pageName": "Dashboard e assistente IA",
  "moduleName": "cafeFlow",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:viewDashboard",
    "operation:requestAiSalesSummary",
    "operation:requestAiPromoSuggestions"
  ],
  "operationIds": [
    "viewDashboard",
    "requestAiSalesSummary",
    "requestAiPromoSuggestions"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "managerDashboard",
    "workspaceKind": "operation",
    "actor": "gerente",
    "entity": "Order",
    "owners": [
      {
        "kind": "operation",
        "id": "viewDashboard",
        "defPath": "_102051_/l4/operations/viewDashboard.defs.ts"
      },
      {
        "kind": "operation",
        "id": "requestAiSalesSummary",
        "defPath": "_102051_/l4/operations/requestAiSalesSummary.defs.ts"
      },
      {
        "kind": "operation",
        "id": "requestAiPromoSuggestions",
        "defPath": "_102051_/l4/operations/requestAiPromoSuggestions.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "viewDashboard",
          "commandName": "viewDashboard",
          "steps": [
            "O gerente abre o dashboard do dia",
            "O sistema identifica o turno atualmente aberto para filtrar os dados",
            "O sistema agrega os pedidos do turno atual calculando o total de vendas",
            "O sistema calcula os itens mais vendidos com base nos pedidos do dia",
            "O sistema verifica os níveis de estoque abaixo do mínimo configurado",
            "O dashboard exibe vendas do dia, itens mais vendidos e alertas de estoque baixo"
          ]
        },
        {
          "operationId": "requestAiSalesSummary",
          "commandName": "requestAiSalesSummary",
          "steps": [
            "O gerente solicita o resumo de vendas do dia ao assistente IA",
            "O sistema identifica o turno atualmente aberto e agrega os pedidos do dia corrente",
            "O assistente IA processa os dados agregados de pedidos e estoque disponibilizados pelo domínio e gera o resumo de vendas"
          ]
        },
        {
          "operationId": "requestAiPromoSuggestions",
          "commandName": "requestAiPromoSuggestions",
          "steps": [
            "O gerente aciona o assistente IA solicitando sugestões de promoção",
            "O sistema agrega os dados de pedidos e itens vendidos dos últimos 7 dias, bem como os níveis atuais de estoque",
            "O assistente IA analisa os dados agregados do domínio e gera sugestões de promoção por item",
            "O gerente visualiza as sugestões geradas para decidir ações de marketing"
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102051_/l2/cafeFlow/web/contracts/managerDashboard.defs.ts",
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/managerDashboard.ts"
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/managerDashboard.defs.ts",
    "layoutId": "managerDashboard.page11"
  },
  "states": [
    {
      "stateKey": "ui.managerDashboard.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.managerDashboard.action.viewDashboard.status",
      "name": "viewDashboardState",
      "kind": "actionStatus",
      "actionRef": "viewDashboard",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.managerDashboard.data.viewDashboard",
      "name": "viewDashboardData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "viewDashboard",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.managerDashboard.action.requestAiSalesSummary.status",
      "name": "requestAiSalesSummaryState",
      "kind": "actionStatus",
      "actionRef": "requestAiSalesSummary",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary",
      "name": "requestAiSalesSummaryData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "requestAiSalesSummary",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.managerDashboard.action.requestAiPromoSuggestions.status",
      "name": "requestAiPromoSuggestionsState",
      "kind": "actionStatus",
      "actionRef": "requestAiPromoSuggestions",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions",
      "name": "requestAiPromoSuggestionsData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "requestAiPromoSuggestions",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    }
  ],
  "actions": [
    {
      "actionId": "viewDashboard",
      "kind": "query",
      "commandRef": "viewDashboard",
      "routeKey": "cafeFlow.viewDashboard.viewDashboard",
      "purpose": "Consultar dashboard do dia",
      "methodName": "loadViewDashboard",
      "handlerName": "handleViewDashboardClick",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managerDashboard.data.viewDashboard"
      ],
      "statusStateKey": "ui.managerDashboard.action.viewDashboard.status"
    },
    {
      "actionId": "requestAiSalesSummary",
      "kind": "query",
      "commandRef": "requestAiSalesSummary",
      "routeKey": "cafeFlow.requestAiSalesSummary.requestAiSalesSummary",
      "purpose": "Solicitar resumo de vendas por IA",
      "methodName": "loadRequestAiSalesSummary",
      "handlerName": "handleRequestAiSalesSummaryClick",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managerDashboard.data.requestAiSalesSummary"
      ],
      "statusStateKey": "ui.managerDashboard.action.requestAiSalesSummary.status"
    },
    {
      "actionId": "requestAiPromoSuggestions",
      "kind": "query",
      "commandRef": "requestAiPromoSuggestions",
      "routeKey": "cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions",
      "purpose": "Solicitar sugestões de promoção por IA",
      "methodName": "loadRequestAiPromoSuggestions",
      "handlerName": "handleRequestAiPromoSuggestionsClick",
      "inputStateKeys": [],
      "outputStateKeys": [
        "ui.managerDashboard.data.requestAiPromoSuggestions"
      ],
      "statusStateKey": "ui.managerDashboard.action.requestAiPromoSuggestions.status"
    }
  ],
  "initialLoads": [
    {
      "actionId": "viewDashboard",
      "stateKey": "ui.managerDashboard.data.viewDashboard"
    },
    {
      "actionId": "requestAiSalesSummary",
      "stateKey": "ui.managerDashboard.data.requestAiSalesSummary"
    },
    {
      "actionId": "requestAiPromoSuggestions",
      "stateKey": "ui.managerDashboard.data.requestAiPromoSuggestions"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt",
      "en"
    ]
  },
  "i18n": {
    "managerDashboard.section.overview.title": "Visão do dia",
    "managerDashboard.organism.viewDashboard.title": "Dashboard do turno",
    "managerDashboard.intent.dashboardStatus.title": "Status dos pedidos do turno",
    "managerDashboard.intent.dashboardStatus.empty": "Nenhum pedido no turno atual",
    "managerDashboard.field.status": "Status do pedido",
    "managerDashboard.field.orderType": "Tipo de pedido",
    "managerDashboard.field.createdAt": "Criado em",
    "managerDashboard.field.deliveredAt": "Entregue em",
    "managerDashboard.field.shiftId": "Turno",
    "managerDashboard.action.refreshDashboard": "Atualizar dashboard",
    "managerDashboard.section.aiAssistant.title": "Assistente IA",
    "managerDashboard.organism.aiSalesSummary.title": "Resumo de vendas por IA",
    "managerDashboard.intent.aiSalesAction.title": "Solicitar resumo de vendas",
    "managerDashboard.intent.aiSalesAction.empty": "Resumo ainda não solicitado",
    "managerDashboard.action.requestAiSalesSummary": "Gerar resumo de vendas",
    "managerDashboard.intent.aiSalesResult.title": "Resumo de vendas gerado",
    "managerDashboard.intent.aiSalesResult.empty": "Nenhum resumo disponível",
    "managerDashboard.field.orderId": "Pedido",
    "managerDashboard.organism.aiPromoSuggestions.title": "Sugestões de promoção por IA",
    "managerDashboard.intent.aiPromoAction.title": "Solicitar sugestões de promoção",
    "managerDashboard.intent.aiPromoAction.empty": "Sugestões ainda não solicitadas",
    "managerDashboard.action.requestAiPromoSuggestions": "Gerar sugestões de promoção",
    "managerDashboard.intent.aiPromoResult.title": "Sugestões de promoção geradas",
    "managerDashboard.intent.aiPromoResult.empty": "Nenhuma sugestão disponível"
  },
  "automation": {
    "statePrefix": "ui.managerDashboard",
    "stateKeys": [
      "ui.managerDashboard.status",
      "ui.managerDashboard.action.viewDashboard.status",
      "ui.managerDashboard.data.viewDashboard",
      "ui.managerDashboard.action.requestAiSalesSummary.status",
      "ui.managerDashboard.data.requestAiSalesSummary",
      "ui.managerDashboard.action.requestAiPromoSuggestions.status",
      "ui.managerDashboard.data.requestAiPromoSuggestions"
    ],
    "actionIds": [
      "viewDashboard",
      "requestAiSalesSummary",
      "requestAiPromoSuggestions"
    ]
  }
};

export const pipeline = [
  {
    "id": "managerDashboard__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/managerDashboard.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/managerDashboard.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/managerDashboard.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "managerDashboard__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
