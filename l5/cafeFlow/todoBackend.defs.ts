/// <mls fileReference="_102051_/l5/cafeFlow/todoBackend.defs.ts" enhancement="_blank"/>

export const cafeFlowTodoBackend = {
  "schemaVersion": "2026-07-02-layer-todo",
  "moduleName": "cafeFlow",
  "layer": "backend",
  "updatedAt": "2026-07-08T05:31:19.859Z",
  "owners": [
    {
      "ownerType": "workflow",
      "ownerId": "orderLifecycle",
      "title": "Ciclo de vida do pedido",
      "status": "done",
      "defPath": "l4/workflows/orderLifecycle.defs.ts",
      "pageId": "orderLifecycle",
      "capabilityId": "orderLifecycle"
    },
    {
      "ownerType": "workflow",
      "ownerId": "menuItemLifecycle",
      "title": "Ciclo de vida do item de cardápio",
      "status": "done",
      "defPath": "l4/workflows/menuItemLifecycle.defs.ts",
      "pageId": "menuItemLifecycle",
      "capabilityId": "menuItemLifecycle"
    },
    {
      "ownerType": "workflow",
      "ownerId": "shiftLifecycle",
      "title": "Ciclo de vida do turno",
      "status": "done",
      "defPath": "l4/workflows/shiftLifecycle.defs.ts",
      "pageId": "shiftLifecycle",
      "capabilityId": "shiftLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "createOrder",
      "title": "Lançar pedido no POS",
      "status": "done",
      "defPath": "l4/operations/createOrder.defs.ts",
      "pageId": "orderLifecycle",
      "commandName": "createOrder",
      "bffName": "cafeFlow.orderLifecycle.createOrder",
      "capabilityId": "orderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "updateOrderStatus",
      "title": "Atualizar status do pedido na cozinha",
      "status": "done",
      "defPath": "l4/operations/updateOrderStatus.defs.ts",
      "pageId": "orderLifecycle",
      "commandName": "updateOrderStatus",
      "bffName": "cafeFlow.orderLifecycle.updateOrderStatus",
      "capabilityId": "orderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "deliverOrder",
      "title": "Entregar pedido ao cliente",
      "status": "done",
      "defPath": "l4/operations/deliverOrder.defs.ts",
      "pageId": "orderLifecycle",
      "commandName": "deliverOrder",
      "bffName": "cafeFlow.orderLifecycle.deliverOrder",
      "capabilityId": "orderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewOrderBoard",
      "title": "Visualizar painel de pedidos",
      "status": "done",
      "defPath": "l4/operations/viewOrderBoard.defs.ts",
      "pageId": "orderLifecycle",
      "commandName": "viewOrderBoard",
      "bffName": "cafeFlow.orderLifecycle.viewOrderBoard",
      "capabilityId": "orderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewKitchenBoard",
      "title": "Visualizar fila da cozinha",
      "status": "done",
      "defPath": "l4/operations/viewKitchenBoard.defs.ts",
      "pageId": "orderLifecycle",
      "commandName": "viewKitchenBoard",
      "bffName": "cafeFlow.orderLifecycle.viewKitchenBoard",
      "capabilityId": "orderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "manageMenuItem",
      "title": "Gerenciar item do cardápio",
      "status": "done",
      "defPath": "l4/operations/manageMenuItem.defs.ts",
      "pageId": "menuItemLifecycle",
      "commandName": "manageMenuItem",
      "bffName": "cafeFlow.menuItemLifecycle.manageMenuItem",
      "capabilityId": "menuItemLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "browseMenuItems",
      "title": "Consultar itens do cardápio",
      "status": "done",
      "defPath": "l4/operations/browseMenuItems.defs.ts",
      "pageId": "menuItemLifecycle",
      "commandName": "browseMenuItems",
      "bffName": "cafeFlow.menuItemLifecycle.browseMenuItems",
      "capabilityId": "menuItemLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "manageStockItem",
      "title": "Gerenciar itens de estoque",
      "status": "done",
      "defPath": "l4/operations/manageStockItem.defs.ts",
      "pageId": "manageStockItem",
      "commandName": "manageStockItem",
      "bffName": "cafeFlow.manageStockItem.manageStockItem",
      "capabilityId": "manageStockItem"
    },
    {
      "ownerType": "operation",
      "ownerId": "browseStockItems",
      "title": "Consultar itens de estoque e alertas",
      "status": "done",
      "defPath": "l4/operations/browseStockItems.defs.ts",
      "pageId": "browseStockItems",
      "commandName": "browseStockItems",
      "bffName": "cafeFlow.browseStockItems.browseStockItems",
      "capabilityId": "browseStockItems"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewDashboard",
      "title": "Consultar dashboard do dia",
      "status": "done",
      "defPath": "l4/operations/viewDashboard.defs.ts",
      "pageId": "viewDashboard",
      "commandName": "viewDashboard",
      "bffName": "cafeFlow.viewDashboard.viewDashboard",
      "capabilityId": "viewDashboard"
    },
    {
      "ownerType": "operation",
      "ownerId": "openShift",
      "title": "Abrir turno diário",
      "status": "done",
      "defPath": "l4/operations/openShift.defs.ts",
      "pageId": "shiftLifecycle",
      "commandName": "openShift",
      "bffName": "cafeFlow.shiftLifecycle.openShift",
      "capabilityId": "shiftLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "closeShift",
      "title": "Fechar turno diário",
      "status": "done",
      "defPath": "l4/operations/closeShift.defs.ts",
      "pageId": "shiftLifecycle",
      "commandName": "closeShift",
      "bffName": "cafeFlow.shiftLifecycle.closeShift",
      "capabilityId": "shiftLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewShiftClosingReport",
      "title": "Revisar relatório de fechamento de turno",
      "status": "done",
      "defPath": "l4/operations/viewShiftClosingReport.defs.ts",
      "pageId": "shiftLifecycle",
      "commandName": "viewShiftClosingReport",
      "bffName": "cafeFlow.shiftLifecycle.viewShiftClosingReport",
      "capabilityId": "shiftLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "requestAiSalesSummary",
      "title": "Solicitar resumo de vendas por IA",
      "status": "done",
      "defPath": "l4/operations/requestAiSalesSummary.defs.ts",
      "pageId": "requestAiSalesSummary",
      "commandName": "requestAiSalesSummary",
      "bffName": "cafeFlow.requestAiSalesSummary.requestAiSalesSummary",
      "capabilityId": "requestAiSalesSummary"
    },
    {
      "ownerType": "operation",
      "ownerId": "requestAiPromoSuggestions",
      "title": "Solicitar sugestões de promoção por IA",
      "status": "done",
      "defPath": "l4/operations/requestAiPromoSuggestions.defs.ts",
      "pageId": "requestAiPromoSuggestions",
      "commandName": "requestAiPromoSuggestions",
      "bffName": "cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions",
      "capabilityId": "requestAiPromoSuggestions"
    }
  ]
} as const;

export default cafeFlowTodoBackend;
