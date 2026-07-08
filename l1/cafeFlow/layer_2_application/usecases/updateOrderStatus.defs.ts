/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.defs.ts" enhancement="_blank"/>

export const updateOrderStatusUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateOrderStatus",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateOrderStatus",
    "ports": [
      "Order",
      "Shift",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "updateOrderStatus",
        "inputTypeName": "UpdateOrderStatusInput",
        "outputTypeName": "UpdateOrderStatusOutput",
        "input": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Pedido selecionado pelo cozinheiro na fila da cozinha"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Novo status que o cozinheiro deseja atribuir ao pedido (inPreparation ou ready)"
          },
          {
            "name": "inPreparationAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Timestamp definido quando o status passa a inPreparation (resolvido via ctx.clock.now quando aplicável)"
          },
          {
            "name": "readyAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "description": "Timestamp definido quando o status passa a ready (resolvido via ctx.clock.now quando aplicável)"
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "ID do pedido atualizado"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Status final do pedido após a atualização"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Timestamp da última atualização do registro"
          }
        ],
        "ports": [
          "Order",
          "Shift",
          "StockConsumption"
        ],
        "rulesApplied": [
          "orderStatusFlow",
          "inProgressBeforeReady"
        ],
        "transactional": true,
        "steps": [
          "1. Resolver o turno ativo consultando o port Shift por status='open' para obter shiftId (activeLifecycleInstance)",
          "2. Carregar o Order pelo orderId informado via port Order",
          "3. Validar que order.shiftId === activeShift.shiftId — o pedido deve pertencer ao turno atualmente aberto",
          "4. Aplicar regra orderStatusFlow: o fluxo deve seguir received → inPreparation → ready sem pulos. Se o novo status for 'inPreparation', o status atual deve ser 'received'; se for 'ready', o status atual deve ser 'inPreparation'",
          "5. Aplicar regra inProgressBeforeReady: o pedido só pode ser marcado como 'ready' se o status atual for 'inPreparation'",
          "6. Definir timestamps: inPreparationAt = ctx.clock.now() quando status transita para 'inPreparation'; readyAt = ctx.clock.now() quando status transita para 'ready'; updatedAt = ctx.clock.now() em toda alteração",
          "7. Atualizar o Order com novo status e timestamps via port Order dentro da mesma transação",
          "8. Emitir evento de auditoria StockConsumption via port StockConsumption dentro da mesma transação (append-only)",
          "9. Retornar orderId, status e updatedAt do pedido atualizado"
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default updateOrderStatusUsecase;

export const pipeline = [
  {
    "id": "updateOrderStatus__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
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
