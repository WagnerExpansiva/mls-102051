{
  "savedAt": "2026-07-16T00:29:41.979Z",
  "agentName": "agentCbUsecase",
  "stepId": 19,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitUsecase",
      "arguments": {
        "status": "ok",
        "result": {
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
        },
        "questions": [
          "O evento StockConsumption deve ser emitido em toda mudança de status ou apenas na transição para 'ready' (quando o consumo de estoque é efetivamente registrado)?",
          "O port StockConsumption não está listado nos ports do owner (apenas Order e Shift). Confirmar se StockConsumption deve ser adicionado como port adicional para persistência do evento de auditoria."
        ],
        "trace": [
          "Parsed owner: updateOrderStatus, entity=Order, parentAggregate=Order, opKind=update",
          "Identified public inputs: orderId (selectedEntity), status (userInput)",
          "Identified context resolutions: shiftId (activeLifecycleInstance via Shift port), inPreparationAt/readyAt/updatedAt (systemDefault via ctx.clock)",
          "Resolved activeLifecycleInstance: query Shift port for status='open' to get shiftId — not exposed as public input",
          "Applied rule orderStatusFlow: enforce received→inPreparation→ready sequence, no skipping",
          "Applied rule inProgressBeforeReady: ready only allowed from inPreparation",
          "Mapped eventWrites: StockConsumption audit event persisted via StockConsumption port inside transaction",
          "Declared ports: Order, Shift, StockConsumption (StockConsumption added from eventWrites)"
        ]
      }
    },
    "status": "completed",
    "stepId": 23,
    "interaction": null,
    "nextSteps": null
  }
}
