# E5 — Workflows & Operations: cafeFlow

- module: `cafeFlow`
- workflows: 3 / operations: 15
- generatedAt: 2026-07-08T05:06:59.149Z

## Workflows

### orderLifecycle — Ciclo de vida do pedido

- actor: atendente, cozinheiro — trigger: Atendente lança um novo pedido no POS selecionando tipo e itens do cardápio
- states: 5 (registered → received → inPreparation → ready → delivered)
- transitions: 4
- operations: createOrder, updateOrderStatus, deliverOrder, viewOrderBoard, viewKitchenBoard

### menuItemLifecycle — Ciclo de vida do item de cardápio

- actor: gerente — trigger: Gerente inicia o cadastro de um novo item de cardápio no sistema
- states: 3 (draft → active → inactive)
- transitions: 3
- operations: manageMenuItem, browseMenuItems

### shiftLifecycle — Ciclo de vida do turno

- actor: gerente — trigger: Gerente abre o turno diário no início do expediente para iniciar o registro de pedidos
- states: 2 (open → closed)
- transitions: 2
- operations: openShift, closeShift, viewShiftClosingReport

## Operations

| operationId | kind | entity | actor | bffName |
| --- | --- | --- | --- | --- |
| createOrder | create | Order | atendente | `cafeFlow.orderLifecycle.createOrder` |
| updateOrderStatus | update | Order | cozinheiro | `cafeFlow.orderLifecycle.updateOrderStatus` |
| deliverOrder | update | Order | atendente | `cafeFlow.orderLifecycle.deliverOrder` |
| viewOrderBoard | view | Order | atendente | `cafeFlow.orderLifecycle.viewOrderBoard` |
| viewKitchenBoard | view | Order | cozinheiro | `cafeFlow.orderLifecycle.viewKitchenBoard` |
| manageMenuItem | update | MenuItem | gerente | `cafeFlow.menuItemLifecycle.manageMenuItem` |
| browseMenuItems | query | MenuItem | gerente | `cafeFlow.menuItemLifecycle.browseMenuItems` |
| manageStockItem | update | StockItem | gerente | `cafeFlow.manageStockItem.manageStockItem` |
| browseStockItems | query | StockItem | gerente | `cafeFlow.browseStockItems.browseStockItems` |
| viewDashboard | view | Order | gerente | `cafeFlow.viewDashboard.viewDashboard` |
| openShift | create | Shift | gerente | `cafeFlow.shiftLifecycle.openShift` |
| closeShift | update | Shift | gerente | `cafeFlow.shiftLifecycle.closeShift` |
| viewShiftClosingReport | view | ShiftClosingReport | gerente | `cafeFlow.shiftLifecycle.viewShiftClosingReport` |
| requestAiSalesSummary | query | Order | gerente | `cafeFlow.requestAiSalesSummary.requestAiSalesSummary` |
| requestAiPromoSuggestions | query | Order | gerente | `cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions` |
