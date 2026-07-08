/// <mls fileReference="_102051_/l4/rules/cafeFlowRules.defs.ts" enhancement="_blank"/>

export const cafeFlowRules = {
  "ruleSetId": "cafeFlowRules",
  "rules": [
    {
      "ruleId": "stockDecrementOnOrderLaunch",
      "title": "Decréscimo de estoque no lançamento do pedido",
      "description": "O estoque deve ser decrementado no momento do lançamento do pedido, não na entrega, conforme os ingredientes vinculados a cada item do cardápio pedido.",
      "appliesTo": [
        "StockConsumption",
        "StockLevel",
        "Order"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "simpleItemsOnly",
      "title": "Apenas itens simples suportados",
      "description": "Apenas itens simples podem ser lançados e cadastrados no cardápio nesta fase; variantes devem ser cadastradas como itens separados, não como sub-opções de um mesmo item.",
      "appliesTo": [
        "MenuItem",
        "OrderItem"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "insufficientStockAlertBeforeConfirm",
      "title": "Alerta de estoque insuficiente antes de confirmar",
      "description": "Se um item não tiver estoque suficiente, o atendente deve ser alertado antes de confirmar o pedido, impedindo o lançamento de itens sem cobertura de estoque.",
      "appliesTo": [
        "StockLevel",
        "OrderItem"
      ],
      "layer": "application"
    },
    {
      "ruleId": "orderStatusFlow",
      "title": "Fluxo de status do pedido",
      "description": "O fluxo de status do pedido deve seguir obrigatoriamente a sequência: recebido → em preparo → pronto → entregue, sem permitir pulos de etapa.",
      "appliesTo": [
        "Order"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "readyBeforeDelivered",
      "title": "Pedido pronto antes de entregue",
      "description": "Apenas pedidos cujo status atual seja 'pronto' podem ser marcados como 'entregue', proibindo a entrega de pedidos ainda em preparo ou recém-recebidos.",
      "appliesTo": [
        "Order"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "inProgressBeforeReady",
      "title": "Marcar em preparo antes de pronto",
      "description": "O cozinheiro deve marcar o pedido como 'em preparo' antes de poder marcá-lo como 'pronto', garantindo que o preparo seja explicitamente iniciado.",
      "appliesTo": [
        "Order"
      ],
      "layer": "application"
    },
    {
      "ruleId": "fifoKitchenQueue",
      "title": "Ordem de chegada na cozinha",
      "description": "Pedidos devem ser preparados na ordem de chegada, salvo quando houver priorização justificada, garantindo atendimento sequencial padrão na fila da cozinha.",
      "appliesTo": [
        "Order"
      ],
      "layer": "application"
    },
    {
      "ruleId": "menuItemRequiresIngredient",
      "title": "Item do cardápio exige ingrediente vinculado",
      "description": "Um item do cardápio só pode ser ativado se tiver pelo menos um ingrediente de estoque vinculado, impedindo a ativação de itens sem rastreabilidade de consumo.",
      "appliesTo": [
        "MenuItem",
        "MenuItemIngredient"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "lowStockAlertCalculation",
      "title": "Cálculo do alerta de estoque baixo",
      "description": "O alerta de estoque baixo deve ser calculado comparando a quantidade atual ao mínimo configurado por item de estoque, disparando aviso quando o atual atingir ou ficar abaixo do mínimo.",
      "appliesTo": [
        "StockLevel",
        "StockItem"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "dashboardCurrentShiftOnly",
      "title": "Dashboard limitado ao turno/dia atual",
      "description": "O dashboard deve exibir apenas dados do turno ou dia atual, não permitindo consulta de períodos históricos ou consolidados de múltiplos turnos.",
      "appliesTo": [
        "Shift",
        "Order"
      ],
      "layer": "application"
    },
    {
      "ruleId": "topSellersFromDayOrders",
      "title": "Itens mais vendidos calculados do dia",
      "description": "Os itens mais vendidos devem ser calculados com base nos pedidos do dia corrente, refletindo apenas o período atual e não dados históricos acumulados.",
      "appliesTo": [
        "Order",
        "OrderItem"
      ],
      "layer": "application"
    },
    {
      "ruleId": "shiftClosingRecordsRevenue",
      "title": "Fechamento de turno registra valor apurado",
      "description": "O fechamento de turno deve registrar o valor apurado para conferência, sem realizar conciliação bancária, limitando-se ao registro do total apurado no período.",
      "appliesTo": [
        "Shift",
        "ShiftClosingReport"
      ],
      "layer": "application"
    },
    {
      "ruleId": "shiftClosingConsolidatesPaidOrders",
      "title": "Relatório consolida pedidos pagos do turno",
      "description": "O relatório de fechamento deve consolidar apenas os pedidos pagos dentro do período do turno, excluindo pedidos não pagos ou de outros turnos.",
      "appliesTo": [
        "ShiftClosingReport",
        "Order"
      ],
      "layer": "application"
    },
    {
      "ruleId": "singleOpenShift",
      "title": "Apenas um turno aberto por vez",
      "description": "Apenas um turno pode estar aberto por vez em toda a operação, impedindo a abertura simultânea de múltiplos turnos concorrentes.",
      "appliesTo": [
        "Shift"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "aiConsumesDomainData",
      "title": "Assistente IA consome dados do domínio",
      "description": "O assistente IA deve consumir apenas dados agregados de pedidos e estoque disponibilizados pelo domínio, sem acessar diretamente fontes externas ou dados não expostos pelo módulo.",
      "appliesTo": [
        "Order",
        "StockLevel"
      ],
      "layer": "application"
    },
    {
      "ruleId": "aiPromoBasedOnLast7Days",
      "title": "Sugestões de promoção baseadas em 7 dias",
      "description": "As sugestões de promoção geradas pelo assistente IA devem ser baseadas exclusivamente nos dados dos últimos 7 dias de operação, não considerando períodos mais longos.",
      "appliesTo": [
        "Order"
      ],
      "layer": "application"
    }
  ]
} as const;

export default cafeFlowRules;
