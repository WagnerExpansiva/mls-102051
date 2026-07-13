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
        "functionName": "updateStockItem",
        "inputTypeName": "UpdateStockItemInput",
        "outputTypeName": "UpdateStockItemOutput",
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
            "description": "Limite mínimo atualizado usado no cálculo de alerta de estoque baixo."
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
          "1. Validar campos de entrada: name não vazio, unit pertence ao enum [kg, liter, portion, unit], minimumLevel é um número não-negativo (regra lowStockAlertCalculation — o alerta de estoque baixo compara minimumLevel com a quantidade atual em StockLevel, portanto minimumLevel deve ser >= 0).",
          "2. Carregar o StockItem existente via ctx.mdm.entity.get({ mdmId: stockItemId }) para confirmar que o registro existe.",
          "3. Se o StockItem não for encontrado, retornar erro de validação informando que o item não existe.",
          "4. Aplicar a regra lowStockAlertCalculation: validar que o novo minimumLevel é coerente — se minimumLevel for negativo, bloquear a operação com detalhe da regra 'lowStockAlertCalculation'.",
          "5. Obter o timestamp atual do sistema via ctx.clock.now() e atribuir a updatedAt (systemDefault — não é input público).",
          "6. Atualizar o StockItem via ctx.mdm.entity.update({ mdmId: stockItemId, details: { name, unit, minimumLevel, updatedAt } }) dentro da transação.",
          "7. Retornar os campos atualizados: stockItemId, name, unit, minimumLevel, updatedAt."
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
