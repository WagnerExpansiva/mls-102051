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
            "description": "Número da mesa, obrigatório quando orderType = 'table'"
          },
          {
            "name": "orderItems",
            "type": "array",
            "required": true,
            "ofEntity": "OrderItem",
            "description": "Lista de itens do cardápio com menuItemId e quantidade"
          },
          {
            "name": "priority",
            "type": "boolean",
            "required": false,
            "ofEntity": "Order",
            "description": "Indica se o pedido é prioritário no preparo"
          },
          {
            "name": "priorityReason",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Justificativa da priorização, obrigatória quando priority = true"
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
            "description": "Número da mesa quando orderType = 'table', nulo quando 'takeout'"
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
          "1. Resolve active shift: query Shift port for a Shift with status='open'; if none found, throw validation error 'No open shift available for order creation'",
          "2. Validate orderType against enum ['table','takeout']; if orderType='table', require tableNumber (non-null, non-empty) — throw error with rule orderStatusFlow if missing; if orderType='takeout', set tableNumber=null",
          "3. Validate priority: if priority=true, require priorityReason (non-null, non-empty) — throw error if missing",
          "4. Validate orderItems: must be non-empty array; each item must have menuItemId (string) and quantity (number > 0)",
          "5. Generate orderId via ctx.idGenerator; set createdAt and updatedAt via ctx.clock",
          "6. Collect all menuItemIds from orderItems; fetch MenuItem MDM records in bulk via ctx.mdm.collection.getMany({ mdmIds: menuItemIds })",
          "7. Validate every MenuItem exists and has status='active'; throw error listing any inactive or missing menuItemIds",
          "8. Build Order aggregate root: set orderId, shiftId (from active shift), status='registered' (rule orderStatusFlow: initial status must be 'registered'), orderType, tableNumber, priority (default false), priorityReason (default null), createdAt, updatedAt; leave receivedAt/inPreparationAt/readyAt/deliveredAt as null",
          "9. Build OrderItem children: for each input item, generate orderItemId via ctx.idGenerator, set orderId=orderId, menuItemId, quantity, unitPrice=MenuItem.price (from MDM record), createdAt, updatedAt",
          "10. Resolve ingredient stock items for all MenuItems: use ctx.mdm.collection.relatedOfMany({ mdmIds: menuItemIds, relationType: 'requires-ingredient' }) to get stock item ids and quantities per serving",
          "11. Aggregate total consumption per stockItemId: for each OrderItem, multiply quantity by ingredient quantity-per-serving; sum across all OrderItems that share the same stockItemId",
          "12. Fetch all affected StockLevel records via StockLevel port (by stockItemId); for each, validate currentQuantity >= consumption amount — throw error with rule stockDecrementOnOrderLaunch if insufficient stock",
          "13. Decrement each StockLevel.currentQuantity by the aggregated consumption amount; update lastDecrementAt=createdAt and updatedAt=createdAt (rule stockDecrementOnOrderLaunch)",
          "14. Build StockConsumption audit records: for each stock item consumed, generate stockConsumptionId via ctx.idGenerator, set stockItemId, orderId, quantity=consumed amount, status='posted', createdAt=createdAt; append these as event records through the Order port inside the same transaction (eventWrites: StockConsumption, purpose=audit, persisted=true)",
          "15. Save Order aggregate (including OrderItem children and StockConsumption event records) through Order port inside the transaction",
          "16. Save all updated StockLevel records through StockLevel port inside the same transaction",
          "17. The order is now in status 'registered' and enters the kitchen queue in FIFO order based on createdAt (rule fifoKitchenQueue: orders are processed in creation-timestamp order)",
          "18. Return { orderId, status='registered', orderType, tableNumber, createdAt }"
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
