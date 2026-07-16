/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.defs.ts" enhancement="_blank"/>

export const createOrderUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createOrder",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createOrder",
    "ports": [
      "Order",
      "StockLevel",
      "Shift",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "createOrder",
        "inputTypeName": "CreateOrderInput",
        "outputTypeName": "CreateOrderOutput",
        "input": [
          {
            "name": "orderType",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Tipo do pedido: 'table' (consumo na mesa) ou 'takeout' (para viagem)"
          },
          {
            "name": "tableNumber",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Número da mesa; obrigatório quando orderType = 'table', nulo quando orderType = 'takeout'"
          },
          {
            "name": "orderItems",
            "type": "array",
            "required": true,
            "description": "Lista de itens do cardápio selecionados: [{ menuItemId: string, quantity: number }]"
          },
          {
            "name": "priority",
            "type": "boolean",
            "required": false,
            "ofEntity": "Order",
            "description": "Indica se o pedido foi marcado como prioritário no preparo"
          },
          {
            "name": "priorityReason",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Justificativa da priorização; obrigatória quando priority = true"
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Identificador único gerado para o novo pedido"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Status inicial do pedido: 'registered'"
          },
          {
            "name": "orderType",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Tipo do pedido criado"
          },
          {
            "name": "tableNumber",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Número da mesa (nulo quando takeout)"
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Momento de criação do pedido"
          }
        ],
        "ports": [
          "Order",
          "StockLevel",
          "Shift"
        ],
        "rulesApplied": [
          "stockDecrementOnOrderLaunch",
          "orderStatusFlow",
          "fifoKitchenQueue"
        ],
        "transactional": true,
        "steps": [
          "Resolve active shift: query Shift port for status='open'; if none open, throw validation error 'No active shift found for order creation'",
          "Generate orderId via ctx.idGenerator; set createdAt and updatedAt to ctx.clock.now()",
          "Validate orderType: if 'table', tableNumber is required (rule orderStatusFlow context); if 'takeout', tableNumber must be null",
          "Validate priority: if priority=true, priorityReason is required; throw validation error if missing",
          "Apply orderStatusFlow: set initial status to 'registered' (first state in mandatory flow: registered → received → inPreparation → ready → delivered)",
          "Collect all menuItemIds from orderItems; fetch MenuItem records from MDM via ctx.mdm.collection.getMany({ mdmIds: menuItemIds })",
          "Validate all menu items exist and have status='active'; throw validation error for any missing or inactive item",
          "Fetch ingredient/stock-item relationships for all menu items via ctx.mdm.collection.relatedOfMany({ mdmIds: menuItemIds, relationType: 'ingredient' }) to determine which stock items each menu item consumes",
          "Aggregate total required quantity per stockItemId across all order items (menu item quantity × ingredient ratio)",
          "Load StockLevel records from StockLevel port for each stockItemId involved; collect and batch-load",
          "Apply stockDecrementOnOrderLaunch: for each stock item, verify currentQuantity >= required quantity; if insufficient, throw validation error with stockItemId and shortfall; decrement currentQuantity by consumed amount; set lastDecrementAt to ctx.clock.now()",
          "Generate orderItemId for each OrderItem via ctx.idGenerator; set unitPrice from MenuItem.price fetched from MDM; set createdAt/updatedAt",
          "Build StockConsumption records: generate stockConsumptionId via ctx.idGenerator, set orderId, stockItemId, quantity consumed, status='posted', createdAt=ctx.clock.now()",
          "Apply fifoKitchenQueue: order enters kitchen queue positioned by createdAt (FIFO ordering — earlier createdAt means earlier preparation priority)",
          "Create Order aggregate with embedded OrderItems and StockConsumption children; set shiftId from resolved active shift, status='registered', orderId, orderType, tableNumber, priority, priorityReason, createdAt, updatedAt",
          "Save Order aggregate through Order port (includes OrderItem and StockConsumption children) inside transaction",
          "Save updated StockLevel records through StockLevel port inside same transaction",
          "Append StockConsumption audit events (status='posted') as part of Order aggregate save through Order port (StockConsumption is child of Order aggregate; port 'StockConsumption' not in provided ports — persisted via Order port)",
          "Return orderId, status, orderType, tableNumber, createdAt"
        ]
      }
    ],
    "mdmRefs": [
      "MenuItem"
    ]
  }
} as const;

export default createOrderUsecase;

export const pipeline = [
  {
    "id": "createOrder__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
