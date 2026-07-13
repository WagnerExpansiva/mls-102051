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
            "description": "Lista de itens do cardápio selecionados, cada um com menuItemId (string) e quantity (number > 0)"
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
          "1. Resolve the active (open) Shift by querying the Shift port for status='open'; if none found, throw validation error 'No open shift found — cannot launch order'",
          "2. Validate orderType is 'table' or 'takeout' (rule: orderStatusFlow — order must start at 'registered')",
          "3. If orderType='table', validate tableNumber is provided and non-empty; if orderType='takeout', set tableNumber to null",
          "4. If priority=true, validate priorityReason is provided and non-empty (rule: orderStatusFlow — priority requires justification)",
          "5. Validate orderItems array is not empty and each item has a non-null menuItemId and quantity > 0",
          "6. Collect all menuItemIds from orderItems; fetch MenuItems from MDM via ctx.mdm.collection.getMany({ mdmIds }); validate all exist and have status='active'",
          "7. Generate orderId via ctx.idGenerator; set createdAt and updatedAt to ctx.clock.now()",
          "8. Build Order aggregate root with status='registered', shiftId from resolved open Shift, orderType, tableNumber, priority (default false), priorityReason, createdAt, updatedAt",
          "9. For each orderItem entry, generate orderItemId via ctx.idGenerator, set unitPrice from the corresponding MenuItem.price, and create an OrderItem child linked to orderId with createdAt and updatedAt",
          "10. For all ordered MenuItems, resolve ingredient stock-item links via ctx.mdm.collection.relatedOfMany to get each ingredient's stockItemId and quantity-per-unit",
          "11. Aggregate total consumption per stockItemId across all order items: sum(ingredient.quantityPerUnit × orderItem.quantity) for each stock item",
          "12. For each stockItemId with consumption > 0, load StockLevel via StockLevel port (find by stockItemId); validate currentQuantity >= total consumption (rule: stockDecrementOnOrderLaunch — stock must be available at launch); decrement currentQuantity by total consumption; set lastDecrementAt to ctx.clock.now()",
          "13. For each consumption, create a StockConsumption child record with generated stockConsumptionId (ctx.idGenerator), stockItemId, orderId, quantity, status='posted', createdAt=ctx.clock.now()",
          "14. Append StockConsumption audit event records through the Order port (StockConsumption is owned by Order) inside the same transaction — event purpose 'audit', persisted=true",
          "15. The order's createdAt timestamp establishes its position in the kitchen queue, ensuring FIFO processing (rule: fifoKitchenQueue — orders are queued by creation time)",
          "16. Inside a single ctx.data transaction: save the Order aggregate (with embedded OrderItems and StockConsumption children) through the Order port; save each updated StockLevel through the StockLevel port",
          "17. Return { orderId, status: 'registered', orderType, tableNumber, createdAt }"
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
