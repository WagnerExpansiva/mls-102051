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
            "description": "Nome atualizado do item de estoque."
          },
          {
            "name": "unit",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Unidade de medida atualizada."
          },
          {
            "name": "minimumLevel",
            "type": "number",
            "required": true,
            "ofEntity": "StockItem",
            "description": "Limite mínimo atualizado para alerta de estoque baixo."
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
          "1. Validate that unit is one of the allowed enum values: kg, liter, portion, unit. If invalid, throw validation error referencing rule lowStockAlertCalculation context.",
          "2. Validate that minimumLevel is a non-negative number. If invalid, throw validation error.",
          "3. Load the existing StockItem from MDM via ctx.mdm.entity.get({ mdmId: stockItemId }). If not found, throw a not-found error.",
          "4. Build the updated StockItem payload: name, unit, minimumLevel from user input; updatedAt from ctx.clock.now(); preserve createdAt from the existing record.",
          "5. Persist the update via ctx.mdm.entity.update({ mdmId: stockItemId, details: { name, unit, minimumLevel, createdAt, updatedAt } }).",
          "6. Apply rule lowStockAlertCalculation: after the update, the low-stock alert threshold is the new minimumLevel. The alert is recalculated by comparing the current StockLevel quantity against the updated minimumLevel — if current quantity <= minimumLevel, the item is flagged as low-stock. This is an inline calculation using the updated minimumLevel value.",
          "7. Return the updated StockItem projection: stockItemId, name, unit, minimumLevel, updatedAt."
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
