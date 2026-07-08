# E6 — Journey map: cafeFlow

- module: `cafeFlow`
- workspaces: 6 / landings: 3 / edges: 6
- generatedAt: 2026-07-08T05:07:26.742Z
- Consolidated navigation map derived from workflows/operations stories (view, not source).

## Workspaces by actor

### atendente

- `posWorkspace` (workflow, Order) — workflow `orderLifecycle`: POS — Lançamento e acompanhamento de pedidos — O atendente lança pedidos no POS, acompanha o painel de status e entrega os pedidos prontos ao cliente.
  - operations: `createOrder`, `viewOrderBoard`, `deliverOrder`

### cozinheiro

- `kitchenQueue` (workflow, Order) — workflow `orderLifecycle`: Fila da cozinha — Preparo de pedidos — O cozinheiro visualiza a fila de pedidos recebidos, inicia o preparo e sinaliza quando o pedido está pronto.
  - operations: `viewKitchenBoard`, `updateOrderStatus`

### gerente

- `menuManagement` (workflow, MenuItem) — workflow `menuItemLifecycle`: Gestão de cardápio — O gerente consulta, cria e edita itens do cardápio vinculando ingredientes de estoque e controlando a ativação.
  - operations: `browseMenuItems`, `manageMenuItem`
- `stockManagement` (operation, StockItem): Gestão de estoque e alertas — O gerente consulta itens de estoque, visualiza alertas de baixo estoque e atualiza cadastros de insumos.
  - operations: `browseStockItems`, `manageStockItem`
- `shiftManagement` (workflow, Shift) — workflow `shiftLifecycle`: Gestão de turno diário — O gerente abre e fecha o turno diário e revisa o relatório de fechamento para conferência do expediente.
  - operations: `openShift`, `closeShift`, `viewShiftClosingReport`
- `managerDashboard` (operation, Order): Dashboard e assistente IA — O gerente consulta o dashboard de vendas do dia e utiliza o assistente IA para obter resumos e sugestões de promoção.
  - operations: `viewDashboard`, `requestAiSalesSummary`, `requestAiPromoSuggestions`

## Landings

- atendente → `posWorkspace` — O atendente inicia o expediente lançando pedidos no POS e acompanhando o painel de status.
- cozinheiro → `kitchenQueue` — O cozinheiro começa o turno visualizando a fila de pedidos recebidos para iniciar o preparo.
- gerente → `shiftManagement` — O gerente abre o dia abrindo o turno antes de qualquer outra operação no módulo.

## Navigation edges (advisory)

- `shiftManagement` → `posWorkspace` via `openShift` — Turno aberto habilita o lançamento de pedidos no POS pelo atendente.
- `posWorkspace` → `kitchenQueue` via `createOrder` — Pedido confirmado é enviado à cozinha e aparece na fila do cozinheiro.
- `kitchenQueue` → `posWorkspace` via `updateOrderStatus` — Cozinheiro marca pedido como pronto, sinalizando o atendente para entregar ao cliente.
- `menuManagement` → `stockManagement` — Gerente vincula ingredientes de estoque ao cadastrar item de cardápio, navegando para a gestão de estoque.
- `managerDashboard` → `shiftManagement` via `closeShift` — Gerente consulta o dashboard de vendas antes de fechar o turno e gerar o relatório de fechamento.
- `shiftManagement` → `managerDashboard` via `viewShiftClosingReport` — Após fechar o turno, o gerente pode consultar o dashboard e o assistente IA para análise do dia.
