/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.defs.ts" enhancement="_blank"/>

export const manageStockItemUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "manageStockItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "manageStockItem",
    "ports": [],
    "functions": [
      {
        "functionName": "manageStockItem",
        "inputTypeName": "ManageStockItemInput",
        "outputTypeName": "ManageStockItemOutput",
        "input": [
          {
            "name": "stockItemId",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Identificador do item de estoque a ser atualizado, obtido do parâmetro de rota."
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Nome do ingrediente editado pelo gerente."
          },
          {
            "name": "unit",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Unidade de medida do ingrediente (kg, liter, portion ou unit)."
          },
          {
            "name": "minimumLevel",
            "type": "number",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Quantidade mínima configurada para disparar o alerta de estoque baixo."
          }
        ],
        "output": [
          {
            "name": "stockItemId",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Identificador do item de estoque atualizado."
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Nome do ingrediente após atualização."
          },
          {
            "name": "unit",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Unidade de medida após atualização."
          },
          {
            "name": "minimumLevel",
            "type": "number",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Limite mínimo configurado após atualização."
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Timestamp da última atualização atribuído pelo sistema."
          }
        ],
        "ports": [],
        "rulesApplied": [
          "lowStockAlertCalculation"
        ],
        "transactional": true,
        "steps": [
          "1. Retrieve the existing StockItem from MDM via ctx.mdm.entity.get({ mdmId: stockItemId }) to confirm it exists and capture current state.",
          "2. Validate that 'unit' is one of the allowed enum values: kg, liter, portion, unit. If invalid, throw a validation error referencing rule lowStockAlertCalculation.",
          "3. Validate that 'minimumLevel' is a non-negative number (>= 0). If invalid, throw a validation error referencing rule lowStockAlertCalculation.",
          "4. Apply rule lowStockAlertCalculation inline: the new minimumLevel value will be the threshold used for all future low-stock alert comparisons against current StockLevel quantities. Ensure minimumLevel is a sensible positive value (> 0) so the alert can trigger; if minimumLevel is 0, log a warning that low-stock alerts will never fire for this item.",
          "5. Build the update payload: { name, unit, minimumLevel, updatedAt: ctx.clock.now() } and persist via ctx.mdm.entity.update({ mdmId: stockItemId, details: { name, unit, minimumLevel, updatedAt } }).",
          "6. Read back the updated StockItem via ctx.mdm.entity.get({ mdmId: stockItemId }) to confirm persistence and return the projected output fields: stockItemId, name, unit, minimumLevel, updatedAt."
        ]
      }
    ],
    "mdmRefs": [
      "StockItem"
    ]
  }
} as const;

export default manageStockItemUsecase;

export const pipeline = [
  {
    "id": "manageStockItem__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/manageStockItem.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
