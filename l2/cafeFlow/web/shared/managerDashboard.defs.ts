/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/managerDashboard.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "managerDashboard",
  "pageName": "Dashboard e assistente IA",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowManagerDashboardBase",
  "routePattern": "/cafeFlow/managerDashboard",
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
    "layoutId": "status_overview"
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
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
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
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
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
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
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
    "section.dashboardOverview.title": "Dashboard do Dia",
    "section.dashboardOverview.empty": "Nenhum pedido encontrado para o turno atual.",
    "section.aiSalesSummary.title": "Resumo de Vendas por IA",
    "section.aiSalesSummary.empty": "Solicite o resumo de vendas ao assistente IA.",
    "section.aiPromoSuggestions.title": "Sugestões de Promoção por IA",
    "section.aiPromoSuggestions.empty": "Solicite sugestões de promoção ao assistente IA.",
    "column.status.label": "Status",
    "column.orderType.label": "Tipo de Pedido",
    "column.createdAt.label": "Criado em",
    "column.shiftId.label": "Turno",
    "column.deliveredAt.label": "Entregue em",
    "column.orderId.label": "Pedido",
    "action.viewDashboard.label": "Atualizar Dashboard",
    "action.requestAiSalesSummary.label": "Solicitar Resumo de Vendas",
    "action.requestAiPromoSuggestions.label": "Solicitar Sugestões de Promoção",
    "organism.dashboardMetrics.title": "Métricas do Dashboard",
    "organism.aiSalesSummary.title": "Resumo de Vendas por IA",
    "organism.aiPromoSuggestions.title": "Sugestões de Promoção por IA",
    "sec.dashboard.overview.title": "Sec dashboard overview",
    "org.dashboard.metrics.title": "Exibir métricas e status dos pedidos do turno atual no dashboard do dia",
    "sec.ai.sales.summary.title": "Sec ai sales summary",
    "org.ai.sales.summary.title": "Permitir ao gerente solicitar e visualizar o resumo de vendas gerado pelo assistente IA para o turno atual",
    "sec.ai.promo.suggestions.title": "Sec ai promo suggestions",
    "org.ai.promo.suggestions.title": "Permitir ao gerente acionar o assistente IA para obter sugestões de promoção baseadas em pedidos recentes e níveis de estoque, e visualizar os resultados para decidir ações de marketing",
    "page.title": "Dashboard e assistente IA",
    "section.dashboard.title": "Dashboard do Dia",
    "section.aiAssistant.title": "Assistente IA",
    "organism.dashboardSummary.title": "Resumo de Pedidos do Turno",
    "organism.dashboardSummary.empty": "Nenhum pedido encontrado para o turno atual.",
    "organism.aiSalesSummary.empty": "Toque em 'Solicitar resumo' para gerar o resumo de vendas do dia.",
    "organism.aiPromoSuggestions.empty": "Toque em 'Solicitar sugestões' para gerar recomendações de promoção.",
    "column.status": "Status",
    "column.orderType": "Tipo de Pedido",
    "column.createdAt": "Criado em",
    "column.shiftId": "Turno",
    "column.deliveredAt": "Entregue em",
    "column.orderId": "Pedido",
    "action.viewDashboard.success": "Dashboard atualizado com sucesso.",
    "action.viewDashboard.error": "Erro ao carregar o dashboard.",
    "action.requestAiSalesSummary.success": "Resumo de vendas gerado com sucesso.",
    "action.requestAiSalesSummary.error": "Erro ao gerar resumo de vendas.",
    "action.requestAiPromoSuggestions.success": "Sugestões de promoção geradas com sucesso.",
    "action.requestAiPromoSuggestions.error": "Erro ao gerar sugestões de promoção.",
    "sec.dashboard.title": "Sec dashboard",
    "org.dashboard.summary.title": "Exibir resumo do dashboard do dia com pedidos agregados por status e tipo, permitindo ao gerente avaliar a operação atual em uma olhada",
    "sec.ai.assistant.title": "Sec ai assistant"
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
