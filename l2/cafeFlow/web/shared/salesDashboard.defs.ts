/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/salesDashboard.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "salesDashboard",
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
    "workspaceId": "salesDashboard",
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
            "O gerente abre o dashboard do sistema.",
            "O sistema identifica o turno atual ativo a partir do contexto de negócio.",
            "O sistema agrega os pedidos do turno atual para calcular o total de vendas do dia.",
            "O sistema calcula os itens mais vendidos com base nos pedidos do dia corrente.",
            "O sistema verifica os níveis de estoque e identifica itens abaixo do mínimo configurado.",
            "O dashboard exibe vendas do dia, itens mais vendidos e alertas de estoque baixo."
          ]
        },
        {
          "operationId": "requestAiSalesSummary",
          "commandName": "requestAiSalesSummary",
          "steps": [
            "O gerente solicita ao assistente IA um resumo das vendas do dia.",
            "O sistema identifica o turno/dia atual a partir do contexto de negócio.",
            "O assistente IA consome dados agregados de pedidos e estoque do domínio referentes ao período atual.",
            "O IA calcula indicadores como total de pedidos, itens mais vendidos e status de pedidos do dia.",
            "O sistema apresenta o resumo de vendas ao gerente."
          ]
        },
        {
          "operationId": "requestAiPromoSuggestions",
          "commandName": "requestAiPromoSuggestions",
          "steps": [
            "O gerente solicita sugestões de promoção ao assistente IA",
            "O sistema coleta dados agregados de pedidos e estoque dos últimos 7 dias disponibilizados pelo domínio",
            "O assistente IA analisa os dados de vendas e estoque e gera sugestões de itens a promover"
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102051_/l2/cafeFlow/web/contracts/salesDashboard.defs.ts",
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/salesDashboard.ts"
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/salesDashboard.defs.ts",
    "layoutId": "salesDashboard.layout"
  },
  "states": [
    {
      "stateKey": "ui.salesDashboard.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.salesDashboard.action.viewDashboard.status",
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
      "stateKey": "ui.salesDashboard.data.viewDashboard",
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
      "stateKey": "ui.salesDashboard.action.requestAiSalesSummary.status",
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
      "stateKey": "ui.salesDashboard.input.requestAiSalesSummary.summaryRequest",
      "name": "requestAiSalesSummarySummaryRequest",
      "kind": "input",
      "contractRef": {
        "commandName": "requestAiSalesSummary",
        "direction": "input",
        "field": "summaryRequest"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.salesDashboard.data.requestAiSalesSummary",
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
      "stateKey": "ui.salesDashboard.action.requestAiPromoSuggestions.status",
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
      "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions",
      "name": "requestAiPromoSuggestionsData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "requestAiPromoSuggestions",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.salesDashboard.businessContext.activeCompanyId",
      "name": "activeCompanyId",
      "kind": "businessContext",
      "source": "businessContext.activeCompanyId",
      "targetRef": "Order.shiftId",
      "required": true,
      "selector": "company",
      "defaultValue": ""
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
        "ui.salesDashboard.data.viewDashboard"
      ],
      "statusStateKey": "ui.salesDashboard.action.viewDashboard.status"
    },
    {
      "actionId": "requestAiSalesSummary",
      "kind": "query",
      "commandRef": "requestAiSalesSummary",
      "routeKey": "cafeFlow.requestAiSalesSummary.requestAiSalesSummary",
      "purpose": "Solicitar resumo de vendas por IA",
      "methodName": "loadRequestAiSalesSummary",
      "handlerName": "handleRequestAiSalesSummaryClick",
      "inputStateKeys": [
        "ui.salesDashboard.input.requestAiSalesSummary.summaryRequest"
      ],
      "outputStateKeys": [
        "ui.salesDashboard.data.requestAiSalesSummary"
      ],
      "statusStateKey": "ui.salesDashboard.action.requestAiSalesSummary.status"
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
        "ui.salesDashboard.data.requestAiPromoSuggestions"
      ],
      "statusStateKey": "ui.salesDashboard.action.requestAiPromoSuggestions.status"
    },
    {
      "actionId": "set.requestAiSalesSummarySummaryRequest",
      "kind": "stateSetter",
      "stateKey": "ui.salesDashboard.input.requestAiSalesSummary.summaryRequest",
      "methodName": "setRequestAiSalesSummarySummaryRequest",
      "handlerName": "handleRequestAiSalesSummarySummaryRequestChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "viewDashboard",
      "stateKey": "ui.salesDashboard.data.viewDashboard"
    },
    {
      "actionId": "requestAiSalesSummary",
      "stateKey": "ui.salesDashboard.data.requestAiSalesSummary"
    },
    {
      "actionId": "requestAiPromoSuggestions",
      "stateKey": "ui.salesDashboard.data.requestAiPromoSuggestions"
    }
  ],
  "businessContextRefs": [
    {
      "operationId": "viewDashboard",
      "inputId": "shiftId",
      "contextKey": "activeCompanyId",
      "originRef": "businessContext.activeCompanyId",
      "targetRef": "Order.shiftId",
      "required": true,
      "description": "Turno atualmente aberto, usado para filtrar todos os dados do dashboard pelo turno/dia corrente"
    }
  ],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt",
      "en"
    ]
  },
  "i18n": {
    "salesDashboard.section.dashboardAi.title": "Dashboard e assistente IA",
    "salesDashboard.organism.viewDashboard.title": "Dashboard do dia",
    "salesDashboard.organism.requestAiSalesSummary.title": "Resumo de vendas por IA",
    "salesDashboard.organism.requestAiPromoSuggestions.title": "Sugestões de promoção por IA",
    "salesDashboard.intent.dashboard.context.title": "Turno atual",
    "salesDashboard.intent.dashboard.data.title": "Dados do dashboard do dia",
    "salesDashboard.intent.dashboard.lowStock.title": "Alertas de estoque baixo",
    "salesDashboard.intent.aiSales.request.title": "Solicitar resumo de vendas",
    "salesDashboard.intent.aiSales.output.title": "Resumo de vendas (IA)",
    "salesDashboard.intent.aiPromo.request.title": "Solicitar sugestões de promoção",
    "salesDashboard.intent.aiPromo.output.title": "Sugestões de promoção (IA)",
    "salesDashboard.field.shiftId.label": "Turno",
    "salesDashboard.field.orderId.label": "Pedido",
    "salesDashboard.field.status.label": "Status",
    "salesDashboard.field.orderType.label": "Tipo de pedido",
    "salesDashboard.field.createdAt.label": "Criado em",
    "salesDashboard.field.menuItemId.label": "Item do cardápio",
    "salesDashboard.field.quantity.label": "Quantidade",
    "salesDashboard.field.stockItemId.label": "Item de estoque",
    "salesDashboard.field.currentQuantity.label": "Quantidade atual",
    "salesDashboard.field.minimumQuantity.label": "Quantidade mínima",
    "salesDashboard.field.summaryRequest.label": "Solicitação do resumo",
    "salesDashboard.field.deliveredAt.label": "Entregue em",
    "salesDashboard.field.menuItemName.label": "Nome do item",
    "salesDashboard.action.viewDashboard.label": "Atualizar dashboard",
    "salesDashboard.action.requestAiSalesSummary.label": "Gerar resumo IA",
    "salesDashboard.action.requestAiPromoSuggestions.label": "Gerar sugestões IA"
  },
  "automation": {
    "statePrefix": "ui.salesDashboard",
    "stateKeys": [
      "ui.salesDashboard.status",
      "ui.salesDashboard.action.viewDashboard.status",
      "ui.salesDashboard.data.viewDashboard",
      "ui.salesDashboard.action.requestAiSalesSummary.status",
      "ui.salesDashboard.input.requestAiSalesSummary.summaryRequest",
      "ui.salesDashboard.data.requestAiSalesSummary",
      "ui.salesDashboard.action.requestAiPromoSuggestions.status",
      "ui.salesDashboard.data.requestAiPromoSuggestions",
      "ui.salesDashboard.businessContext.activeCompanyId"
    ],
    "actionIds": [
      "viewDashboard",
      "requestAiSalesSummary",
      "requestAiPromoSuggestions",
      "set.requestAiSalesSummarySummaryRequest"
    ]
  }
};

export const pipeline = [
  {
    "id": "salesDashboard__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/salesDashboard.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/salesDashboard.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/salesDashboard.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "salesDashboard__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
