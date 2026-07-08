/// <mls fileReference="_102051_/l4/cafeFlow/journeys/cafeFlowJourneys.defs.ts" enhancement="_blank"/>

export const cafeFlowJourneys = {
  "moduleName": "cafeFlow",
  "note": "Consolidated navigation map derived from workflows/operations stories (view, not source).",
  "workspaces": [
    {
      "workspaceId": "posWorkspace",
      "title": "POS — Lançamento e acompanhamento de pedidos",
      "actor": "atendente",
      "kind": "workflow",
      "entity": "Order",
      "operationIds": [
        "createOrder",
        "viewOrderBoard",
        "deliverOrder"
      ],
      "purpose": "O atendente lança pedidos no POS, acompanha o painel de status e entrega os pedidos prontos ao cliente.",
      "workflowId": "orderLifecycle"
    },
    {
      "workspaceId": "kitchenQueue",
      "title": "Fila da cozinha — Preparo de pedidos",
      "actor": "cozinheiro",
      "kind": "workflow",
      "entity": "Order",
      "operationIds": [
        "viewKitchenBoard",
        "updateOrderStatus"
      ],
      "purpose": "O cozinheiro visualiza a fila de pedidos recebidos, inicia o preparo e sinaliza quando o pedido está pronto.",
      "workflowId": "orderLifecycle"
    },
    {
      "workspaceId": "menuManagement",
      "title": "Gestão de cardápio",
      "actor": "gerente",
      "kind": "workflow",
      "entity": "MenuItem",
      "operationIds": [
        "browseMenuItems",
        "manageMenuItem"
      ],
      "purpose": "O gerente consulta, cria e edita itens do cardápio vinculando ingredientes de estoque e controlando a ativação.",
      "workflowId": "menuItemLifecycle"
    },
    {
      "workspaceId": "stockManagement",
      "title": "Gestão de estoque e alertas",
      "actor": "gerente",
      "kind": "operation",
      "entity": "StockItem",
      "operationIds": [
        "browseStockItems",
        "manageStockItem"
      ],
      "purpose": "O gerente consulta itens de estoque, visualiza alertas de baixo estoque e atualiza cadastros de insumos."
    },
    {
      "workspaceId": "shiftManagement",
      "title": "Gestão de turno diário",
      "actor": "gerente",
      "kind": "workflow",
      "entity": "Shift",
      "operationIds": [
        "openShift",
        "closeShift",
        "viewShiftClosingReport"
      ],
      "purpose": "O gerente abre e fecha o turno diário e revisa o relatório de fechamento para conferência do expediente.",
      "workflowId": "shiftLifecycle"
    },
    {
      "workspaceId": "managerDashboard",
      "title": "Dashboard e assistente IA",
      "actor": "gerente",
      "kind": "operation",
      "entity": "Order",
      "operationIds": [
        "viewDashboard",
        "requestAiSalesSummary",
        "requestAiPromoSuggestions"
      ],
      "purpose": "O gerente consulta o dashboard de vendas do dia e utiliza o assistente IA para obter resumos e sugestões de promoção."
    }
  ],
  "landings": [
    {
      "actorId": "atendente",
      "workspaceId": "posWorkspace",
      "reason": "O atendente inicia o expediente lançando pedidos no POS e acompanhando o painel de status."
    },
    {
      "actorId": "cozinheiro",
      "workspaceId": "kitchenQueue",
      "reason": "O cozinheiro começa o turno visualizando a fila de pedidos recebidos para iniciar o preparo."
    },
    {
      "actorId": "gerente",
      "workspaceId": "shiftManagement",
      "reason": "O gerente abre o dia abrindo o turno antes de qualquer outra operação no módulo."
    }
  ],
  "navigationEdges": [
    {
      "from": "shiftManagement",
      "to": "posWorkspace",
      "operationId": "openShift",
      "description": "Turno aberto habilita o lançamento de pedidos no POS pelo atendente."
    },
    {
      "from": "posWorkspace",
      "to": "kitchenQueue",
      "operationId": "createOrder",
      "description": "Pedido confirmado é enviado à cozinha e aparece na fila do cozinheiro."
    },
    {
      "from": "kitchenQueue",
      "to": "posWorkspace",
      "operationId": "updateOrderStatus",
      "description": "Cozinheiro marca pedido como pronto, sinalizando o atendente para entregar ao cliente."
    },
    {
      "from": "menuManagement",
      "to": "stockManagement",
      "description": "Gerente vincula ingredientes de estoque ao cadastrar item de cardápio, navegando para a gestão de estoque."
    },
    {
      "from": "managerDashboard",
      "to": "shiftManagement",
      "operationId": "closeShift",
      "description": "Gerente consulta o dashboard de vendas antes de fechar o turno e gerar o relatório de fechamento."
    },
    {
      "from": "shiftManagement",
      "to": "managerDashboard",
      "operationId": "viewShiftClosingReport",
      "description": "Após fechar o turno, o gerente pode consultar o dashboard e o assistente IA para análise do dia."
    }
  ]
} as const;

export default cafeFlowJourneys;
