# E3 — Ontology: CafeFlow

- module: `cafeFlow`
- domain: Food Service Operations
- entities: 11 / relationships: 11
- generatedAt: 2026-07-08T04:10:01.323Z

## Entities

### Order (core, moduleOwned) — status: registered → received → inPreparation → ready → delivered

Pedido registrado no POS pelo atendente, podendo ser de mesa ou takeout, com status acompanhado do lançamento à entrega.

- `orderId` (uuid; required) — Identificador único do pedido
- `shiftId` (uuid; required) — Turno aberto no momento do lançamento do pedido
- `status` (string; required, enum: registered|received|inPreparation|ready|delivered) — Status atual do pedido no fluxo de acompanhamento
- `orderType` (string; required, enum: table|takeout) — Tipo do pedido: consumo na mesa ou para viagem
- `tableNumber` (string; optional) — Número da mesa quando o pedido é do tipo mesa
- `priority` (boolean; optional) — Indica se o pedido recebeu priorização no preparo fora da ordem de chegada
- `priorityReason` (text; optional) — Justificativa para a priorização do pedido fora da ordem de chegada
- `receivedAt` (datetime; optional) — Momento em que o pedido foi recebido pela cozinha
- `inPreparationAt` (datetime; optional) — Momento em que o cozinheiro iniciou o preparo do pedido
- `readyAt` (datetime; optional) — Momento em que o pedido foi marcado como pronto pela cozinha
- `deliveredAt` (datetime; optional) — Momento em que o pedido foi entregue ao cliente
- `createdAt` (datetime; required) — Momento de criação do registro do pedido
- `updatedAt` (datetime; required) — Momento da última atualização do registro do pedido

### OrderItem (supporting, moduleOwned)

Linha de pedido que referencia um item do cardápio com quantidade, formando o detalhamento do pedido lançado no POS.

- `orderItemId` (uuid; required) — Identificador único da linha do pedido.
- `orderId` (uuid; required) — Referência ao pedido ao qual esta linha pertence.
- `menuItemId` (uuid; required) — Referência ao item do cardápio cadastrado que foi solicitado.
- `quantity` (number; required) — Quantidade solicitada do item do cardápio nesta linha do pedido.
- `unitPrice` (money; required) — Preço unitário do item no momento do lançamento do pedido, snapshot para fins de fechamento.
- `createdAt` (datetime; required) — Data e hora em que a linha do pedido foi criada.
- `updatedAt` (datetime; required) — Data e hora da última atualização da linha do pedido.

### MenuItem (mdm, moduleOwned) — status: draft → active → inactive

Item do cardápio cadastrado pelo gerente com nome, categoria, preço e vínculo a ingredientes de estoque, disponível para lançamento no POS quando ativado.

- `menuItemId` (uuid; required) — Identificador único do item do cardápio
- `name` (string; required) — Nome do item do cardápio exibido no POS
- `description` (text; optional) — Descrição detalhada do item do cardápio
- `menuCategoryId` (uuid; required) — Referência à categoria de classificação à qual o item pertence
- `price` (money; required) — Preço de venda do item do cardápio
- `itemType` (string; required, enum: simple|variant) — Tipo do item: simples ou variante cadastrada como item separado
- `status` (string; required, enum: draft|active|inactive) — Status do item no ciclo de vida: rascunho, ativo ou inativo
- `activatedAt` (datetime; optional) — Data e hora em que o item foi ativado e disponibilizado no POS
- `inactivatedAt` (datetime; optional) — Data e hora em que o item foi inativado e indisponibilizado no POS
- `createdAt` (datetime; required) — Data e hora de criação do registro do item
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro do item

### MenuCategory (mdm, moduleOwned)

Categoria de classificação dos itens do cardápio, utilizada para organização no POS e no cadastro.

- `menuCategoryId` (uuid; required) — Identificador único da categoria do cardápio.
- `name` (string; required) — Nome da categoria exibido no POS e no cadastro.
- `description` (text; optional) — Descrição complementar da categoria para uso interno.
- `displayOrder` (number; required) — Ordem de exibição da categoria no POS e em listagens.
- `active` (boolean; required) — Indica se a categoria está ativa e visível para seleção no POS.
- `createdAt` (datetime; required) — Data e hora de criação do registro da categoria.
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro da categoria.

### MenuItemIngredient (supporting, moduleOwned)

Vínculo entre um item do cardápio e um item de estoque, definindo a quantidade consumida do ingrediente a cada pedido do item.

- `menuItemIngredientId` (uuid; required) — Identificador único do vínculo entre item de cardápio e ingrediente de estoque.
- `menuItemId` (uuid; required) — Referência ao item de cardápio ao qual este ingrediente está vinculado.
- `stockItemId` (uuid; required) — Referência ao item de estoque master consumido quando o item de cardápio é pedido.
- `quantity` (number; required) — Quantidade do ingrediente consumida a cada pedido do item de cardápio.
- `unit` (string; required, enum: kg|gram|liter|milliliter|portion|unit) — Unidade de medida da quantidade consumida do ingrediente.
- `createdAt` (datetime; required) — Data e hora de criação do vínculo de ingrediente.
- `updatedAt` (datetime; required) — Data e hora da última atualização do vínculo de ingrediente.

### StockItem (mdm, moduleOwned)

Ingrediente cadastrado pelo gerente com unidade de medida e limite mínimo de alerta, representando a definição master do insumo.

- `stockItemId` (uuid; required) — Identificador único do item de estoque master.
- `name` (string; required) — Nome do ingrediente cadastrado pelo gerente.
- `unit` (string; required, enum: kg|liter|portion|unit) — Unidade de medida do ingrediente utilizada no controle de estoque.
- `minimumLevel` (number; required) — Quantidade mínima configurada para disparar o alerta de estoque baixo.
- `createdAt` (datetime; required) — Data e hora de cadastro do item de estoque.
- `updatedAt` (datetime; required) — Data e hora da última atualização do item de estoque.

### StockLevel (core, moduleOwned)

Estado operacional do estoque de um ingrediente, mantendo a quantidade atual que é decrementada por consumos e ajustada por reposições.

- `stockLevelId` (uuid; required) — Identificador único do nível de estoque
- `stockItemId` (uuid; required) — Referência ao item de estoque master ao qual este nível pertence
- `currentQuantity` (number; required) — Quantidade atual disponível em estoque, decrementada por consumos e ajustada por reposições
- `minimumLevel` (number; required) — Quantidade mínima configurada para disparar o alerta de estoque baixo
- `unit` (string; required, enum: kg|liter|portion|unit) — Unidade de medida do estoque do ingrediente
- `lastDecrementAt` (datetime; optional) — Data e hora do último decremento de estoque por lançamento de pedido
- `lastAdjustmentAt` (datetime; optional) — Data e hora do último ajuste manual de reposição de estoque
- `createdAt` (datetime; required) — Data e hora de criação do registro de nível de estoque
- `updatedAt` (datetime; required) — Data e hora da última atualização do nível de estoque

### StockConsumption (event, moduleOwned) — status: posted → voided

Fato imutável registrado no lançamento de um pedido que decrementa o estoque de um ingrediente conforme os vínculos do item do cardápio.

- `stockConsumptionId` (uuid; required) — Identificador único do consumo de estoque.
- `stockItemId` (uuid; required) — Item de estoque cuja quantidade foi decrementada por este consumo.
- `orderId` (uuid; required) — Pedido que disparou este consumo de estoque no momento do lançamento.
- `quantity` (number; required) — Quantidade do item de estoque consumida e decrementada neste lançamento.
- `status` (string; required, enum: posted|voided) — Situação do consumo: lançado ou estornado.
- `createdAt` (datetime; required) — Data e hora do registro do consumo de estoque.
- `voidedAt` (datetime; optional) — Data e hora em que o consumo foi estornado, quando aplicável.
- `voidReason` (text; optional) — Motivo do estorno do consumo de estoque.

### StockAdjustment (event, moduleOwned) — status: posted → voided

Fato imutável registrado pelo gerente para repor ou corrigir a quantidade de um item de estoque manualmente.

- `stockAdjustmentId` (uuid; required) — Identificador único do ajuste de estoque.
- `stockItemId` (uuid; required) — Item de estoque ao qual o ajuste se aplica.
- `status` (string; required, enum: posted|voided) — Situação do ajuste: lançado ou anulado.
- `quantity` (number; required) — Quantidade ajustada, positiva para reposição e negativa para correção ou baixa.
- `reason` (text; required) — Motivo do ajuste informado pelo gerente ao registrar a reposição ou correção.
- `voidedAt` (datetime; optional) — Data e hora em que o ajuste foi anulado.
- `voidedReason` (text; optional) — Motivo da anulação do ajuste de estoque.
- `createdAt` (datetime; required) — Data e hora de criação do registro do ajuste.

### Shift (core, moduleOwned) — status: open → closed

Turno diário aberto pelo gerente no início do expediente e fechado ao final, delimitando o período operacional dos pedidos.

- `shiftId` (uuid; required) — Identificador único do turno
- `status` (string; required, enum: open|closed) — Situação atual do turno
- `openedAt` (datetime; required) — Data e hora de abertura do turno pelo gerente
- `closedAt` (datetime; optional) — Data e hora de fechamento do turno
- `openedBy` (string; required) — Identificador do gerente que abriu o turno
- `closedBy` (string; optional) — Identificador do gerente que fechou o turno
- `totalApurado` (money; optional) — Valor total apurado no fechamento do turno para conferência, sem conciliação bancária
- `notes` (text; optional) — Observações gerais sobre o turno
- `createdAt` (datetime; required) — Data e hora de criação do registro
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro

### ShiftClosingReport (metric, moduleOwned)

Agregado persistido no fechamento do turno com o total apurado e os pedidos consolidados do período para conferência do gerente.

- `shiftClosingReportId` (uuid; required) — Identificador único do relatório de fechamento de turno.
- `shiftId` (uuid; required) — Referência ao turno fechado ao qual este relatório corresponde.
- `totalApurado` (money; required) — Valor total apurado no fechamento do turno para conferência do gerente.
- `paidOrderCount` (number; required) — Quantidade de pedidos pagos consolidados no período do turno.
- `createdAt` (datetime; required) — Data e hora em que o relatório de fechamento foi gerado.
- `updatedAt` (datetime; required) — Data e hora da última atualização do relatório de fechamento.

## Relationships

- `orderHasOrderItems`: Order oneToMany OrderItem — Um pedido contém múltiplos itens de pedido que detalham o que foi solicitado.
- `orderItemRefersToMenuItem`: OrderItem manyToOne MenuItem — Cada item do pedido referencia um item do cardápio cadastrado.
- `menuItemBelongsToCategory`: MenuItem manyToOne MenuCategory — Cada item do cardápio pertence a uma categoria de classificação.
- `menuItemHasIngredients`: MenuItem oneToMany MenuItemIngredient — Um item do cardápio possui múltiplos ingredientes de estoque vinculados.
- `ingredientRefersToStockItem`: MenuItemIngredient manyToOne StockItem — Cada ingrediente vinculado referencia um item de estoque master.
- `stockItemHasStockLevel`: StockItem oneToOne StockLevel — Cada item de estoque master possui um nível de estoque operacional com a quantidade atual.
- `consumptionAffectsStockItem`: StockConsumption manyToOne StockItem — Cada consumo de estoque afeta um item de estoque específico.
- `consumptionTriggeredByOrder`: StockConsumption manyToOne Order — Cada consumo de estoque é disparado pelo lançamento de um pedido.
- `adjustmentAffectsStockItem`: StockAdjustment manyToOne StockItem — Cada ajuste de estoque afeta um item de estoque específico.
- `orderBelongsToShift`: Order manyToOne Shift — Cada pedido pertence ao turno aberto no momento do seu lançamento.
- `closingReportForShift`: ShiftClosingReport oneToOne Shift — Cada relatório de fechamento corresponde a um turno fechado.
