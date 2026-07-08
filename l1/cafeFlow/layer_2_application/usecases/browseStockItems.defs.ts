/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.defs.ts" enhancement="_blank"/>

export const browseStockItemsUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "browseStockItems",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "browseStockItems",
    "ports": [
      "StockLevel"
    ],
    "functions": [
      {
        "functionName": "browseStockItems",
        "inputTypeName": "BrowseStockItemsInput",
        "outputTypeName": "BrowseStockItemsOutput",
        "input": [
          {
            "name": "searchTerm",
            "type": "string",
            "required": false,
            "ofEntity": "StockItem",
            "description": "Termo de busca opcional para filtrar itens de estoque pelo nome."
          },
          {
            "name": "page",
            "type": "number",
            "required": false,
            "description": "Número da página para paginação opcional (base 1)."
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": false,
            "description": "Quantidade de itens por página para paginação opcional."
          }
        ],
        "output": [
          {
            "name": "items",
            "type": "StockItemBrowseResult[]",
            "required": true,
            "description": "Lista de itens de estoque com nome, unidade, limite mínimo, quantidade atual e flag de alerta de estoque baixo."
          },
          {
            "name": "totalCount",
            "type": "number",
            "required": true,
            "description": "Total de itens encontrados antes da paginação."
          },
          {
            "name": "page",
            "type": "number",
            "required": true,
            "description": "Página atual retornada."
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": true,
            "description": "Tamanho da página aplicado."
          }
        ],
        "ports": [
          "StockLevel"
        ],
        "rulesApplied": [
          "lowStockAlertCalculation"
        ],
        "transactional": false,
        "steps": [
          "1. Resolver actorId a partir de ctx.sessionContext (sessão autenticada do gerente) para autorização de acesso ao estoque.",
          "2. Listar StockItems do MDM via ctx.mdm.collection.listByType({ type: 'StockItem' }), aplicando filtro opcional por searchTerm sobre o campo name quando fornecido.",
          "3. Coletar todos os stockItemIds do resultado da listagem de MDM.",
          "4. Consultar StockLevels em lote via porta StockLevel (stockLevelPort.listByStockItemIds) para todos os stockItemIds coletados, evitando chamadas individuais em loop.",
          "5. Join em memória: para cada StockItem, localizar o StockLevel correspondente pelo stockItemId e extrair currentQuantity.",
          "6. Aplicar regra lowStockAlertCalculation: para cada item, calcular lowStockAlert = (StockLevel.currentQuantity <= StockItem.minimumLevel). Itens sem StockLevel associado recebem lowStockAlert = false e currentQuantity = 0.",
          "7. Ordenar a lista resultante por name (ascendente) para facilitar a consulta.",
          "8. Aplicar paginação opcional: se page e pageSize forem fornecidos, fatiar a lista ordenada; caso contrário, retornar todos os itens com page=1 e pageSize=totalCount.",
          "9. Retornar items (cada item contendo stockItemId, name, unit, minimumLevel, currentQuantity, lowStockAlert, createdAt, updatedAt), totalCount, page e pageSize."
        ]
      }
    ],
    "mdmRefs": [
      "StockItem"
    ]
  }
} as const;

export default browseStockItemsUsecase;

export const pipeline = [
  {
    "id": "browseStockItems__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockLevelRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockLevel.d.ts"
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
