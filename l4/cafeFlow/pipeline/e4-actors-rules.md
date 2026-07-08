# E4 — Actors, rules and external refs: cafeFlow

- module: `cafeFlow`
- actors: 3 / rules: 16
- generatedAt: 2026-07-08T04:11:29.155Z

## Actors

| actorId | roleScope | title | description |
| --- | --- | --- | --- |
| `atendente` | `cafeFlow:atendente` | Atendente / Caixa | Lança pedidos rapidamente no POS, seleciona mesa ou takeout e acompanha status para entrega ao cliente. |
| `cozinheiro` | `cafeFlow:cozinheiro` | Cozinheiro | Visualiza pedidos em preparo, atualiza status da cozinha e sinaliza quando o item está pronto. |
| `gerente` | `cafeFlow:gerente` | Gerente / Proprietário | Cadastra itens do cardápio e estoque, abre e fecha turnos, consulta dashboard e utiliza o assistente IA para análise de vendas. |

## Rules

### `stockDecrementOnOrderLaunch` (domain) — Decréscimo de estoque no lançamento do pedido

O estoque deve ser decrementado no momento do lançamento do pedido, não na entrega, conforme os ingredientes vinculados a cada item do cardápio pedido.

- appliesTo: `StockConsumption`, `StockLevel`, `Order`
- absorbs journey rules:
  - "O estoque é decrementado no momento do lançamento do pedido, não na entrega."
  - "O estoque é decrementado automaticamente no lançamento de pedidos conforme os ingredientes vinculados."

### `simpleItemsOnly` (domain) — Apenas itens simples suportados

Apenas itens simples podem ser lançados e cadastrados no cardápio nesta fase; variantes devem ser cadastradas como itens separados, não como sub-opções de um mesmo item.

- appliesTo: `MenuItem`, `OrderItem`
- absorbs journey rules:
  - "Apenas itens simples podem ser lançados; variantes são cadastradas como itens separados."
  - "Apenas itens simples são suportados nesta fase; variantes devem ser cadastradas como itens separados."

### `insufficientStockAlertBeforeConfirm` (application) — Alerta de estoque insuficiente antes de confirmar

Se um item não tiver estoque suficiente, o atendente deve ser alertado antes de confirmar o pedido, impedindo o lançamento de itens sem cobertura de estoque.

- appliesTo: `StockLevel`, `OrderItem`
- absorbs journey rules:
  - "Se um item não tiver estoque suficiente, o atendente é alertado antes de confirmar o pedido."

### `orderStatusFlow` (domain) — Fluxo de status do pedido

O fluxo de status do pedido deve seguir obrigatoriamente a sequência: recebido → em preparo → pronto → entregue, sem permitir pulos de etapa.

- appliesTo: `Order`
- absorbs journey rules:
  - "O fluxo de status do pedido é: recebido → em preparo → pronto → entregue."
  - "O fluxo de status do pedido é: recebido → em preparo → pronto → entregue."

### `readyBeforeDelivered` (domain) — Pedido pronto antes de entregue

Apenas pedidos cujo status atual seja 'pronto' podem ser marcados como 'entregue', proibindo a entrega de pedidos ainda em preparo ou recém-recebidos.

- appliesTo: `Order`
- absorbs journey rules:
  - "Apenas pedidos com status 'pronto' podem ser marcados como entregues."

### `inProgressBeforeReady` (application) — Marcar em preparo antes de pronto

O cozinheiro deve marcar o pedido como 'em preparo' antes de poder marcá-lo como 'pronto', garantindo que o preparo seja explicitamente iniciado.

- appliesTo: `Order`
- absorbs journey rules:
  - "O cozinheiro deve marcar o pedido como 'em preparo' antes de marcá-lo como 'pronto'."

### `fifoKitchenQueue` (application) — Ordem de chegada na cozinha

Pedidos devem ser preparados na ordem de chegada, salvo quando houver priorização justificada, garantindo atendimento sequencial padrão na fila da cozinha.

- appliesTo: `Order`
- absorbs journey rules:
  - "Pedidos devem ser preparados na ordem de chegada, salvo priorização justificada."

### `menuItemRequiresIngredient` (domain) — Item do cardápio exige ingrediente vinculado

Um item do cardápio só pode ser ativado se tiver pelo menos um ingrediente de estoque vinculado, impedindo a ativação de itens sem rastreabilidade de consumo.

- appliesTo: `MenuItem`, `MenuItemIngredient`
- absorbs journey rules:
  - "Um item do cardápio só pode ser ativado se tiver pelo menos um ingrediente de estoque vinculado."

### `lowStockAlertCalculation` (domain) — Cálculo do alerta de estoque baixo

O alerta de estoque baixo deve ser calculado comparando a quantidade atual ao mínimo configurado por item de estoque, disparando aviso quando o atual atingir ou ficar abaixo do mínimo.

- appliesTo: `StockLevel`, `StockItem`
- absorbs journey rules:
  - "O alerta de estoque baixo é calculado comparando a quantidade atual ao mínimo configurado por item."

### `dashboardCurrentShiftOnly` (application) — Dashboard limitado ao turno/dia atual

O dashboard deve exibir apenas dados do turno ou dia atual, não permitindo consulta de períodos históricos ou consolidados de múltiplos turnos.

- appliesTo: `Shift`, `Order`
- absorbs journey rules:
  - "O dashboard exibe apenas dados do turno/dia atual."

### `topSellersFromDayOrders` (application) — Itens mais vendidos calculados do dia

Os itens mais vendidos devem ser calculados com base nos pedidos do dia corrente, refletindo apenas o período atual e não dados históricos acumulados.

- appliesTo: `Order`, `OrderItem`
- absorbs journey rules:
  - "Os itens mais vendidos são calculados com base nos pedidos do dia."

### `shiftClosingRecordsRevenue` (application) — Fechamento de turno registra valor apurado

O fechamento de turno deve registrar o valor apurado para conferência, sem realizar conciliação bancária, limitando-se ao registro do total apurado no período.

- appliesTo: `Shift`, `ShiftClosingReport`
- absorbs journey rules:
  - "O fechamento de turno registra o valor apurado para conferência, sem conciliação bancária."

### `shiftClosingConsolidatesPaidOrders` (application) — Relatório consolida pedidos pagos do turno

O relatório de fechamento deve consolidar apenas os pedidos pagos dentro do período do turno, excluindo pedidos não pagos ou de outros turnos.

- appliesTo: `ShiftClosingReport`, `Order`
- absorbs journey rules:
  - "O relatório de fechamento consolida os pedidos pagos no período do turno."

### `singleOpenShift` (domain) — Apenas um turno aberto por vez

Apenas um turno pode estar aberto por vez em toda a operação, impedindo a abertura simultânea de múltiplos turnos concorrentes.

- appliesTo: `Shift`
- absorbs journey rules:
  - "Apenas um turno pode estar aberto por vez."

### `aiConsumesDomainData` (application) — Assistente IA consome dados do domínio

O assistente IA deve consumir apenas dados agregados de pedidos e estoque disponibilizados pelo domínio, sem acessar diretamente fontes externas ou dados não expostos pelo módulo.

- appliesTo: `Order`, `StockLevel`
- absorbs journey rules:
  - "O assistente IA consome dados agregados de pedidos e estoque disponibilizados pelo domínio."

### `aiPromoBasedOnLast7Days` (application) — Sugestões de promoção baseadas em 7 dias

As sugestões de promoção geradas pelo assistente IA devem ser baseadas exclusivamente nos dados dos últimos 7 dias de operação, não considerando períodos mais longos.

- appliesTo: `Order`
- absorbs journey rules:
  - "As sugestões de promoção são baseadas nos dados dos últimos 7 dias."

## External refs

### mdm

- **Catálogo de produtos (cardápio e estoque)** — Itens do cardápio e itens de estoque são dados de registro com identidade estável e raras alterações que poderiam ser sincronizados com o MDM da plataforma 102034 para padronização multi-unidade no futuro.

### horizontals

- **Pagamentos** — O fechamento de turno registra valor apurado e consolida pedidos pagos, indicando que uma capacidade de pagamento cross-module é necessária para processar as transações que alimentam o relatório.

### plugins

- **Documento fiscal (cupom fiscal / NF-e)** — Embora as regras de jornada não mencionem explicitamente emissão fiscal, um POS de cafeteria no Brasil tipicamente precisa emitir cupom fiscal ou NF-e, podendo ser integrado como plugin opcional no futuro.

### agents

- **Assistente IA de vendas** — As jornadas useAiAssistant exigem um assistente IA que consome dados agregados de pedidos e estoque do domínio para gerar resumo de vendas do dia e sugestões de promoção baseadas nos últimos 7 dias, utilizando o proxy LLM da plataforma.
