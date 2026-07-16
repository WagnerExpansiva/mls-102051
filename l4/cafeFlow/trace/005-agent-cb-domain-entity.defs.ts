{
  "savedAt": "2026-07-16T00:24:53.263Z",
  "agentName": "agentCbDomainEntity",
  "stepId": 5,
  "planning": {
    "planId": "cb-gen-domain",
    "dependsOn": [
      "cb-lock"
    ],
    "executionMode": "sequential",
    "executionHost": "client"
  },
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitDomainEntities",
      "arguments": {
        "status": "ok",
        "result": {
          "items": [
            {
              "entityId": "Order",
              "fields": [
                {
                  "fieldId": "orderId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do pedido"
                },
                {
                  "fieldId": "shiftId",
                  "type": "uuid",
                  "required": true,
                  "description": "Turno aberto no momento do lançamento do pedido"
                },
                {
                  "fieldId": "status",
                  "type": "string",
                  "required": true,
                  "description": "Status atual do pedido no fluxo de acompanhamento",
                  "enum": [
                    "registered",
                    "received",
                    "inPreparation",
                    "ready",
                    "delivered"
                  ]
                },
                {
                  "fieldId": "orderType",
                  "type": "string",
                  "required": true,
                  "description": "Tipo do pedido: consumo na mesa ou para viagem",
                  "enum": [
                    "table",
                    "takeout"
                  ]
                },
                {
                  "fieldId": "tableNumber",
                  "type": "string",
                  "required": false,
                  "description": "Número da mesa quando o pedido é do tipo mesa"
                },
                {
                  "fieldId": "priority",
                  "type": "boolean",
                  "required": false,
                  "description": "Indica se o pedido recebeu priorização no preparo fora da ordem de chegada"
                },
                {
                  "fieldId": "priorityReason",
                  "type": "text",
                  "required": false,
                  "description": "Justificativa para a priorização do pedido fora da ordem de chegada"
                },
                {
                  "fieldId": "receivedAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Momento em que o pedido foi recebido pela cozinha"
                },
                {
                  "fieldId": "inPreparationAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Momento em que o cozinheiro iniciou o preparo do pedido"
                },
                {
                  "fieldId": "readyAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Momento em que o pedido foi marcado como pronto pela cozinha"
                },
                {
                  "fieldId": "deliveredAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Momento em que o pedido foi entregue ao cliente"
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Momento de criação do registro do pedido"
                },
                {
                  "fieldId": "updatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Momento da última atualização do registro do pedido"
                }
              ],
              "statusEnum": [
                "registered",
                "received",
                "inPreparation",
                "ready",
                "delivered"
              ],
              "invariants": [
                "tableNumber is required when orderType is 'table'",
                "tableNumber must be null when orderType is 'takeout'",
                "priorityReason is required when priority is true",
                "Status transitions must follow the sequence: registered → received → inPreparation → ready → delivered",
                "receivedAt must be set when status transitions to 'received'",
                "inPreparationAt must be set when status transitions to 'inPreparation'",
                "readyAt must be set when status transitions to 'ready'",
                "deliveredAt must be set when status transitions to 'delivered'",
                "Order must belong to a shift whose status is 'open'",
                "Order must contain at least one OrderItem",
                "Timestamps must be chronologically ordered: receivedAt ≤ inPreparationAt ≤ readyAt ≤ deliveredAt"
              ],
              "valueObjects": [
                {
                  "name": "OrderItem",
                  "fields": [
                    {
                      "fieldId": "orderItemId",
                      "type": "uuid",
                      "required": true,
                      "description": "Identificador único da linha do pedido."
                    },
                    {
                      "fieldId": "orderId",
                      "type": "uuid",
                      "required": true,
                      "description": "Referência ao pedido ao qual esta linha pertence."
                    },
                    {
                      "fieldId": "menuItemId",
                      "type": "uuid",
                      "required": true,
                      "description": "Referência ao item do cardápio cadastrado que foi solicitado."
                    },
                    {
                      "fieldId": "quantity",
                      "type": "number",
                      "required": true,
                      "description": "Quantidade solicitada do item do cardápio nesta linha do pedido."
                    },
                    {
                      "fieldId": "unitPrice",
                      "type": "money",
                      "required": true,
                      "description": "Preço unitário do item no momento do lançamento do pedido, snapshot para fins de fechamento."
                    },
                    {
                      "fieldId": "createdAt",
                      "type": "datetime",
                      "required": true,
                      "description": "Data e hora em que a linha do pedido foi criada."
                    },
                    {
                      "fieldId": "updatedAt",
                      "type": "datetime",
                      "required": true,
                      "description": "Data e hora da última atualização da linha do pedido."
                    }
                  ],
                  "collection": true
                }
              ]
            },
            {
              "entityId": "Shift",
              "fields": [
                {
                  "fieldId": "shiftId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do turno"
                },
                {
                  "fieldId": "status",
                  "type": "string",
                  "required": true,
                  "description": "Situação atual do turno",
                  "enum": [
                    "open",
                    "closed"
                  ]
                },
                {
                  "fieldId": "openedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de abertura do turno pelo gerente"
                },
                {
                  "fieldId": "closedAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora de fechamento do turno"
                },
                {
                  "fieldId": "openedBy",
                  "type": "string",
                  "required": true,
                  "description": "Identificador do gerente que abriu o turno"
                },
                {
                  "fieldId": "closedBy",
                  "type": "string",
                  "required": false,
                  "description": "Identificador do gerente que fechou o turno"
                },
                {
                  "fieldId": "totalApurado",
                  "type": "money",
                  "required": false,
                  "description": "Valor total apurado no fechamento do turno para conferência, sem conciliação bancária"
                },
                {
                  "fieldId": "notes",
                  "type": "text",
                  "required": false,
                  "description": "Observações gerais sobre o turno"
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de criação do registro"
                },
                {
                  "fieldId": "updatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora da última atualização do registro"
                }
              ],
              "statusEnum": [
                "open",
                "closed"
              ],
              "invariants": [
                "closedAt is required when status is 'closed'",
                "closedBy is required when status is 'closed'",
                "closedAt must be after openedAt",
                "A closed shift cannot be reopened",
                "totalApurado is required when status is 'closed'",
                "Only one shift may be open at a time"
              ],
              "valueObjects": []
            },
            {
              "entityId": "StockLevel",
              "fields": [
                {
                  "fieldId": "stockLevelId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do nível de estoque"
                },
                {
                  "fieldId": "stockItemId",
                  "type": "uuid",
                  "required": true,
                  "description": "Referência ao item de estoque master ao qual este nível pertence"
                },
                {
                  "fieldId": "currentQuantity",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade atual disponível em estoque, decrementada por consumos e ajustada por reposições"
                },
                {
                  "fieldId": "minimumLevel",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade mínima configurada para disparar o alerta de estoque baixo"
                },
                {
                  "fieldId": "unit",
                  "type": "string",
                  "required": true,
                  "description": "Unidade de medida do estoque do ingrediente",
                  "enum": [
                    "kg",
                    "liter",
                    "portion",
                    "unit"
                  ]
                },
                {
                  "fieldId": "lastDecrementAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora do último decremento de estoque por lançamento de pedido"
                },
                {
                  "fieldId": "lastAdjustmentAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora do último ajuste manual de reposição de estoque"
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de criação do registro de nível de estoque"
                },
                {
                  "fieldId": "updatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora da última atualização do nível de estoque"
                }
              ],
              "invariants": [
                "currentQuantity must be >= 0",
                "minimumLevel must be >= 0",
                "Low-stock alert is triggered when currentQuantity <= minimumLevel",
                "unit cannot be changed after creation"
              ],
              "valueObjects": []
            },
            {
              "entityId": "ShiftClosingReport",
              "fields": [
                {
                  "fieldId": "shiftClosingReportId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do relatório de fechamento de turno."
                },
                {
                  "fieldId": "shiftId",
                  "type": "uuid",
                  "required": true,
                  "description": "Referência ao turno fechado ao qual este relatório corresponde."
                },
                {
                  "fieldId": "totalApurado",
                  "type": "money",
                  "required": true,
                  "description": "Valor total apurado no fechamento do turno para conferência do gerente."
                },
                {
                  "fieldId": "paidOrderCount",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade de pedidos pagos consolidados no período do turno."
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora em que o relatório de fechamento foi gerado."
                },
                {
                  "fieldId": "updatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora da última atualização do relatório de fechamento."
                }
              ],
              "invariants": [
                "Referenced shift must have status 'closed' before generating the report",
                "totalApurado must be >= 0",
                "paidOrderCount must be >= 0",
                "Only one ShiftClosingReport per shift"
              ],
              "valueObjects": []
            },
            {
              "entityId": "StockAdjustment",
              "fields": [
                {
                  "fieldId": "stockAdjustmentId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do ajuste de estoque."
                },
                {
                  "fieldId": "stockItemId",
                  "type": "uuid",
                  "required": true,
                  "description": "Item de estoque ao qual o ajuste se aplica."
                },
                {
                  "fieldId": "status",
                  "type": "string",
                  "required": true,
                  "description": "Situação do ajuste: lançado ou anulado.",
                  "enum": [
                    "posted",
                    "voided"
                  ]
                },
                {
                  "fieldId": "quantity",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade ajustada, positiva para reposição e negativa para correção ou baixa."
                },
                {
                  "fieldId": "reason",
                  "type": "text",
                  "required": true,
                  "description": "Motivo do ajuste informado pelo gerente ao registrar a reposição ou correção."
                },
                {
                  "fieldId": "voidedAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora em que o ajuste foi anulado."
                },
                {
                  "fieldId": "voidedReason",
                  "type": "text",
                  "required": false,
                  "description": "Motivo da anulação do ajuste de estoque."
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de criação do registro do ajuste."
                }
              ],
              "statusEnum": [
                "posted",
                "voided"
              ],
              "invariants": [],
              "valueObjects": []
            },
            {
              "entityId": "StockConsumption",
              "fields": [
                {
                  "fieldId": "stockConsumptionId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do consumo de estoque."
                },
                {
                  "fieldId": "stockItemId",
                  "type": "uuid",
                  "required": true,
                  "description": "Item de estoque cuja quantidade foi decrementada por este consumo."
                },
                {
                  "fieldId": "orderId",
                  "type": "uuid",
                  "required": true,
                  "description": "Pedido que disparou este consumo de estoque no momento do lançamento."
                },
                {
                  "fieldId": "quantity",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade do item de estoque consumida e decrementada neste lançamento."
                },
                {
                  "fieldId": "status",
                  "type": "string",
                  "required": true,
                  "description": "Situação do consumo: lançado ou estornado.",
                  "enum": [
                    "posted",
                    "voided"
                  ]
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora do registro do consumo de estoque."
                },
                {
                  "fieldId": "voidedAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora em que o consumo foi estornado, quando aplicável."
                },
                {
                  "fieldId": "voidReason",
                  "type": "text",
                  "required": false,
                  "description": "Motivo do estorno do consumo de estoque."
                }
              ],
              "statusEnum": [
                "posted",
                "voided"
              ],
              "invariants": [],
              "valueObjects": []
            }
          ]
        },
        "questions": [],
        "trace": [
          "Parsed 4 aggregate roots: Order, Shift, StockLevel, ShiftClosingReport",
          "Parsed 2 append-only event records: StockAdjustment, StockConsumption",
          "Order: embedded OrderItem mapped as valueObject with collection=true",
          "Shift: no embedded members, invariants derived from open/closed lifecycle",
          "StockLevel: invariants for non-negative quantities and low-stock alert threshold",
          "ShiftClosingReport: invariant requiring referenced shift to be closed",
          "StockAdjustment and StockConsumption: append-only events with no invariants beyond fields",
          "All field names preserved in camelCase from ontology, entityId in PascalCase"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
