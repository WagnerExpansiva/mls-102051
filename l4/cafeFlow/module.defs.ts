/// <mls fileReference="_102051_/l4/cafeFlow/module.defs.ts" enhancement="_blank"/>

export const cafeFlowModule = {
  "module": {
    "moduleName": "cafeFlow",
    "title": "CafeFlow",
    "purpose": "O CafeFlow entrega um fluxo completo de atendimento para cafeterias e lanchonetes pequenas, desde o lançamento rápido de pedidos no POS até a coordenação da cozinha em tempo real. O módulo integra cardápio, controle simples de estoque e gestão de turnos com dashboard e assistente IA, permitindo ao gerente acompanhar o desempenho do dia e tomar decisões operacionais.",
    "businessDomain": "Food Service Operations",
    "languages": [
      "en",
      "pt-BR"
    ],
    "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
  },
  "designContext": {
    "initialPrompt": "Gere um app profissional chamado CafeFlow para cafeterias e lanchonetes pequenas. Entidades principais: Item do Cardápio (categoria, preço, ingredientes em estoque), Pedido (mesa ou takeout, itens, status), Turno Diário, Item de Estoque. Telas chave: Dashboard (vendas de hoje, itens mais vendidos, estoque baixo), Interface rápida de POS (lançamento de pedido + status cozinha), Gerenciamento de cardápio e estoque, Relatório de fechamento de turno. Funcionalidade LLM: Assistente IA que gera \"resumo de vendas do dia\" ou sugere \"quais itens promover com base nos últimos 7 dias\". Foco: Atendimento rápido de pedidos, coordenação de cozinha e controle simples de estoque para food service. linguagem: en, pt-br",
    "userLanguage": "pt-BR",
    "openDetails": [
      {
        "title": "O estoque é decrementado no lançamento do pedido ou na entrega?",
        "description": "Define o momento exato da baixa de estoque e o comportamento do alerta de insuficiente."
      },
      {
        "title": "O fechamento de turno zera o caixa ou apenas registra o valor apurado para conferência?",
        "description": "Influencia se o turno é um controle operacional simples ou se envolve conciliação financeira."
      },
      {
        "title": "Há necessidade de suportar variantes de item (ex: tamanho P, M, G) ou apenas itens simples?",
        "description": "Afeta a modelagem do cardápio e a interface de lançamento no POS."
      }
    ],
    "decisions": []
  },
  "ontology": {
    "entities": {
      "Order": {
        "title": "Pedido",
        "description": "Pedido registrado no POS pelo atendente, podendo ser de mesa ou takeout, com status acompanhado do lançamento à entrega.",
        "kind": "core",
        "ownership": "moduleOwned",
        "statusEnum": [
          "registered",
          "received",
          "inPreparation",
          "ready",
          "delivered"
        ],
        "lifecycleStates": [
          "registered",
          "received",
          "inPreparation",
          "ready",
          "delivered"
        ]
      },
      "OrderItem": {
        "title": "Item do Pedido",
        "description": "Linha de pedido que referencia um item do cardápio com quantidade, formando o detalhamento do pedido lançado no POS.",
        "kind": "supporting",
        "ownership": "moduleOwned"
      },
      "MenuItem": {
        "title": "Item do Cardápio",
        "description": "Item do cardápio cadastrado pelo gerente com nome, categoria, preço e vínculo a ingredientes de estoque, disponível para lançamento no POS quando ativado.",
        "kind": "mdm",
        "ownership": "moduleOwned",
        "statusEnum": [
          "draft",
          "active",
          "inactive"
        ],
        "lifecycleStates": [
          "draft",
          "active",
          "inactive"
        ]
      },
      "MenuCategory": {
        "title": "Categoria do Cardápio",
        "description": "Categoria de classificação dos itens do cardápio, utilizada para organização no POS e no cadastro.",
        "kind": "mdm",
        "ownership": "moduleOwned"
      },
      "MenuItemIngredient": {
        "title": "Ingrediente do Item de Cardápio",
        "description": "Vínculo entre um item do cardápio e um item de estoque, definindo a quantidade consumida do ingrediente a cada pedido do item.",
        "kind": "supporting",
        "ownership": "moduleOwned"
      },
      "StockItem": {
        "title": "Item de Estoque",
        "description": "Ingrediente cadastrado pelo gerente com unidade de medida e limite mínimo de alerta, representando a definição master do insumo.",
        "kind": "mdm",
        "ownership": "moduleOwned"
      },
      "StockLevel": {
        "title": "Nível de Estoque",
        "description": "Estado operacional do estoque de um ingrediente, mantendo a quantidade atual que é decrementada por consumos e ajustada por reposições.",
        "kind": "core",
        "ownership": "moduleOwned"
      },
      "StockConsumption": {
        "title": "Consumo de Estoque",
        "description": "Fato imutável registrado no lançamento de um pedido que decrementa o estoque de um ingrediente conforme os vínculos do item do cardápio.",
        "kind": "event",
        "ownership": "moduleOwned",
        "statusEnum": [
          "posted",
          "voided"
        ]
      },
      "StockAdjustment": {
        "title": "Ajuste de Estoque",
        "description": "Fato imutável registrado pelo gerente para repor ou corrigir a quantidade de um item de estoque manualmente.",
        "kind": "event",
        "ownership": "moduleOwned",
        "statusEnum": [
          "posted",
          "voided"
        ]
      },
      "Shift": {
        "title": "Turno",
        "description": "Turno diário aberto pelo gerente no início do expediente e fechado ao final, delimitando o período operacional dos pedidos.",
        "kind": "core",
        "ownership": "moduleOwned",
        "statusEnum": [
          "open",
          "closed"
        ],
        "lifecycleStates": [
          "open",
          "closed"
        ]
      },
      "ShiftClosingReport": {
        "title": "Relatório de Fechamento de Turno",
        "description": "Agregado persistido no fechamento do turno com o total apurado e os pedidos consolidados do período para conferência do gerente.",
        "kind": "metric",
        "ownership": "moduleOwned"
      }
    }
  },
  "journey": {
    "defPath": "l4/cafeFlow/journeys/cafeFlowJourneys.defs.ts"
  },
  "relationships": [
    {
      "relationshipId": "orderHasOrderItems",
      "fromEntity": "Order",
      "toEntity": "OrderItem",
      "type": "oneToMany",
      "description": "Um pedido contém múltiplos itens de pedido que detalham o que foi solicitado."
    },
    {
      "relationshipId": "orderItemRefersToMenuItem",
      "fromEntity": "OrderItem",
      "toEntity": "MenuItem",
      "type": "manyToOne",
      "description": "Cada item do pedido referencia um item do cardápio cadastrado."
    },
    {
      "relationshipId": "menuItemBelongsToCategory",
      "fromEntity": "MenuItem",
      "toEntity": "MenuCategory",
      "type": "manyToOne",
      "description": "Cada item do cardápio pertence a uma categoria de classificação."
    },
    {
      "relationshipId": "menuItemHasIngredients",
      "fromEntity": "MenuItem",
      "toEntity": "MenuItemIngredient",
      "type": "oneToMany",
      "description": "Um item do cardápio possui múltiplos ingredientes de estoque vinculados."
    },
    {
      "relationshipId": "ingredientRefersToStockItem",
      "fromEntity": "MenuItemIngredient",
      "toEntity": "StockItem",
      "type": "manyToOne",
      "description": "Cada ingrediente vinculado referencia um item de estoque master."
    },
    {
      "relationshipId": "stockItemHasStockLevel",
      "fromEntity": "StockItem",
      "toEntity": "StockLevel",
      "type": "oneToOne",
      "description": "Cada item de estoque master possui um nível de estoque operacional com a quantidade atual."
    },
    {
      "relationshipId": "consumptionAffectsStockItem",
      "fromEntity": "StockConsumption",
      "toEntity": "StockItem",
      "type": "manyToOne",
      "description": "Cada consumo de estoque afeta um item de estoque específico."
    },
    {
      "relationshipId": "consumptionTriggeredByOrder",
      "fromEntity": "StockConsumption",
      "toEntity": "Order",
      "type": "manyToOne",
      "description": "Cada consumo de estoque é disparado pelo lançamento de um pedido."
    },
    {
      "relationshipId": "adjustmentAffectsStockItem",
      "fromEntity": "StockAdjustment",
      "toEntity": "StockItem",
      "type": "manyToOne",
      "description": "Cada ajuste de estoque afeta um item de estoque específico."
    },
    {
      "relationshipId": "orderBelongsToShift",
      "fromEntity": "Order",
      "toEntity": "Shift",
      "type": "manyToOne",
      "description": "Cada pedido pertence ao turno aberto no momento do seu lançamento."
    },
    {
      "relationshipId": "closingReportForShift",
      "fromEntity": "ShiftClosingReport",
      "toEntity": "Shift",
      "type": "oneToOne",
      "description": "Cada relatório de fechamento corresponde a um turno fechado."
    }
  ],
  "approvedArtifacts": {
    "mdm": [
      {
        "title": "Catálogo de produtos (cardápio e estoque)",
        "reason": "Itens do cardápio e itens de estoque são dados de registro com identidade estável e raras alterações que poderiam ser sincronizados com o MDM da plataforma 102034 para padronização multi-unidade no futuro."
      }
    ],
    "horizontals": [
      {
        "title": "Pagamentos",
        "reason": "O fechamento de turno registra valor apurado e consolida pedidos pagos, indicando que uma capacidade de pagamento cross-module é necessária para processar as transações que alimentam o relatório."
      }
    ],
    "plugins": [
      {
        "title": "Documento fiscal (cupom fiscal / NF-e)",
        "reason": "Embora as regras de jornada não mencionem explicitamente emissão fiscal, um POS de cafeteria no Brasil tipicamente precisa emitir cupom fiscal ou NF-e, podendo ser integrado como plugin opcional no futuro."
      }
    ],
    "agents": [
      {
        "title": "Assistente IA de vendas",
        "reason": "As jornadas useAiAssistant exigem um assistente IA que consome dados agregados de pedidos e estoque do domínio para gerar resumo de vendas do dia e sugestões de promoção baseadas nos últimos 7 dias, utilizando o proxy LLM da plataforma."
      }
    ]
  }
} as const;

export default cafeFlowModule;
