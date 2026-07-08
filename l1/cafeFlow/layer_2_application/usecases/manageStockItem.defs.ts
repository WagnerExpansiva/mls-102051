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
            "ofEntity": "StockItem"
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem"
          },
          {
            "name": "unit",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem"
          },
          {
            "name": "minimumLevel",
            "type": "number",
            "required": true,
            "ofEntity": "StockItem"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "lowStockAlertCalculation"
        ],
        "transactional": true,
        "steps": [
          "1. Validate that name is a non-empty string.",
          "2. Validate that unit is one of the allowed enum values: kg, liter, portion, unit.",
          "3. Apply rule lowStockAlertCalculation: validate that minimumLevel is a non-negative number (>= 0); if negative, reject with rule id in error details.",
          "4. Load the existing StockItem by stockItemId via ctx.mdm.entity.get({ mdmId: stockItemId }) to confirm it exists; throw NotFound if missing.",
          "5. Resolve updatedAt from ctx.clock.now() (systemDefault) — do not accept it as user input.",
          "6. Update the StockItem via ctx.mdm.entity.update({ mdmId: stockItemId, details: { name, unit, minimumLevel, updatedAt } }) inside a single transaction (ctx.data transaction wrapper).",
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
