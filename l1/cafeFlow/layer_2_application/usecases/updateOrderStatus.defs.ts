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
            "type": "uuid",
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
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true,
            "ofEntity": "Order",
            "description": "ID do pedido atualizado"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "description": "Status confirmado após a atualização"
          },
          {
            "name": "updatedAt",
            "type": "datetime",
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
          "1. Resolve o turno ativo consultando o port Shift por status='open'; se nenhum turno aberto existir, retorna erro de validação 'Nenhum turno aberto encontrado'",
          "2. Carrega o pedido pelo orderId através do port Order (getById)",
          "3. Valida que o pedido pertence ao turno ativo comparando order.shiftId com o shiftId resolvido no passo 1; se não pertencer, retorna erro 'Pedido não pertence ao turno ativo'",
          "4. Aplica a regra orderStatusFlow: o novo status deve seguir a sequência obrigatória received → inPreparation → ready. Se o status atual for 'received', só permite transição para 'inPreparation'. Se o status atual for 'inPreparation', só permite transição para 'ready'. Qualquer outro salto retorna erro com a regra orderStatusFlow",
          "5. Aplica a regra inProgressBeforeReady: o pedido só pode ser marcado como 'ready' se o status atual for 'inPreparation'; caso contrário retorna erro com a regra inProgressBeforeReady",
          "6. Define timestamps via ctx.clock.now(): se o novo status for 'inPreparation', preenche inPreparationAt; se for 'ready', preenche readyAt; sempre atualiza updatedAt",
          "7. Persiste o pedido atualizado através do port Order (update) dentro da mesma transação",
          "8. Emite evento StockConsumption (purpose=audit) através do port StockConsumption dentro da mesma transação, registrando a mudança de status do pedido",
          "9. Retorna orderId, status confirmado e updatedAt"
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
