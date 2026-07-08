/// <mls fileReference="_102051_/l4/operations/createOrder.defs.ts" enhancement="_blank"/>

export const operationCreateOrder = {
  "operationId": "createOrder",
  "title": "Lançar pedido no POS",
  "actor": "atendente",
  "entity": "Order",
  "kind": "create",
  "reads": [
    "MenuItem",
    "StockLevel",
    "Shift"
  ],
  "writes": [
    "Order",
    "OrderItem",
    "StockConsumption",
    "StockLevel"
  ],
  "rulesApplied": [
    "stockDecrementOnOrderLaunch",
    "orderStatusFlow",
    "fifoKitchenQueue"
  ],
  "story": {
    "actor": "atendente",
    "goal": "Registrar um novo pedido no POS para que a cozinha possa prepará-lo e o cliente possa acompanhá-lo",
    "steps": [
      "O atendente seleciona o tipo de pedido (mesa ou takeout) e informa o número da mesa quando aplicável",
      "O atendente busca e adiciona os itens do cardápio solicitados pelo cliente, visualizando preço e categoria",
      "O atendente opcionalmente marca o pedido como prioritário com justificativa",
      "O sistema verifica alertas de estoque insuficiente nos ingredientes dos itens pedidos",
      "O atendente confirma o pedido e o sistema cria o registro com status 'registered', decrementa o estoque e gera o número do pedido"
    ],
    "outcome": "O pedido é criado com status 'registered', vinculado ao turno aberto, com seus itens e consumo de estoque registrados, e o atendente recebe o número do pedido para repassar ao cliente"
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "Order",
    "keyField": "Order.orderId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "Order.orderId",
      "Order.status",
      "Order.orderType",
      "Order.tableNumber",
      "Order.createdAt"
    ]
  },
  "inputs": [
    {
      "inputId": "orderType",
      "fieldRef": "Order.orderType",
      "required": true,
      "source": "userInput",
      "description": "Tipo do pedido selecionado pelo atendente: 'table' (consumo na mesa) ou 'takeout' (para viagem)"
    },
    {
      "inputId": "tableNumber",
      "fieldRef": "Order.tableNumber",
      "required": false,
      "source": "userInput",
      "description": "Número da mesa informado pelo atendente, obrigatório quando orderType = 'table'"
    },
    {
      "inputId": "orderItems",
      "fieldRef": "OrderItem.menuItemId",
      "required": true,
      "source": "userInput",
      "description": "Lista de itens do cardápio selecionados pelo cliente, cada um com menuItemId e quantidade"
    },
    {
      "inputId": "priority",
      "fieldRef": "Order.priority",
      "required": false,
      "source": "userInput",
      "description": "Indica se o atendente marcou o pedido como prioritário no preparo"
    },
    {
      "inputId": "priorityReason",
      "fieldRef": "Order.priorityReason",
      "required": false,
      "source": "userInput",
      "description": "Justificativa da priorização, obrigatória quando priority = true"
    },
    {
      "inputId": "shiftId",
      "fieldRef": "Order.shiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Turno aberto no momento do lançamento do pedido"
    },
    {
      "inputId": "orderId",
      "fieldRef": "Order.orderId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado para o novo pedido"
    },
    {
      "inputId": "createdAt",
      "fieldRef": "Order.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Momento de criação do registro do pedido"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "Order.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Momento da última atualização do registro do pedido"
    }
  ],
  "contextResolution": [
    {
      "inputId": "shiftId",
      "targetRef": "Order.shiftId",
      "source": "activeLifecycleInstance",
      "originRef": "Shift.shiftId",
      "description": "Resolves the single Shift with status open — the active shift at the moment of order creation"
    },
    {
      "inputId": "orderId",
      "targetRef": "Order.orderId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Generates a new UUID to identify the order being created"
    },
    {
      "inputId": "createdAt",
      "targetRef": "Order.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Sets the creation timestamp to the current server time at the moment of order launch"
    },
    {
      "inputId": "updatedAt",
      "targetRef": "Order.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Sets the last-update timestamp to the current server time at the moment of order launch"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, o pedido existe com status 'registered'",
    "O pedido criado está vinculado ao turno atualmente aberto (shiftId não é nulo)",
    "Quando orderType é 'table', o campo tableNumber está preenchido",
    "Quando orderType é 'takeout', o campo tableNumber é nulo",
    "Para cada item do cardápio adicionado, existe um OrderItem correspondente vinculado ao pedido",
    "O estoque é decrementado no momento do lançamento do pedido conforme os ingredientes vinculados a cada item pedido",
    "Quando priority é true, o campo priorityReason está preenchido",
    "O pedido inicia no status 'registered', seguindo o fluxo de status obrigatório: registered → received → inPreparation → ready → delivered",
    "O sistema retorna o orderId gerado para que o atendente repasse ao cliente"
  ],
  "pageId": "orderLifecycle",
  "commandName": "createOrder",
  "bffName": "cafeFlow.orderLifecycle.createOrder",
  "capability": {
    "capabilityId": "orderLifecycle",
    "title": "Ciclo de vida do pedido",
    "actor": "atendente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCreateOrder;
