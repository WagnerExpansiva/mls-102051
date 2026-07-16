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
            "name": "stockItems",
            "type": "array",
            "required": true,
            "description": "Lista de itens de estoque ordenados por nome. Cada item contém: stockItemId (string, ofEntity StockItem), name (string, ofEntity StockItem), unit (string, ofEntity StockItem), minimumLevel (number, ofEntity StockItem), createdAt (string, ofEntity StockItem), updatedAt (string, ofEntity StockItem), currentQuantity (number, ofEntity StockLevel), isLowStock (boolean, computed)."
          },
          {
            "name": "total",
            "type": "number",
            "required": true,
            "description": "Total de itens de estoque encontrados antes da paginação."
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
          "Extrair actorId de ctx.sessionContext para autorização do gerente autenticado (contexto de sessão, não input público).",
          "Listar itens de estoque (StockItem) do MDM via ctx.mdm.collection.listByType({ type: 'StockItem' }); se searchTerm fornecido, filtrar resultados em memória por name contendo o termo (case-insensitive).",
          "Coletar stockItemIds dos resultados do MDM.",
          "Consultar níveis de estoque (StockLevel) via porta StockLevel para os stockItemIds obtidos — listar StockLevels e filtrar por stockItemId em memória (ou usar método de listagem com filtro se disponível na porta).",
          "Criar mapa stockItemId -> StockLevel para junção eficiente.",
          "Para cada StockItem, juntar com StockLevel correspondente (se existir) e aplicar regra lowStockAlertCalculation: isLowStock = (stockLevel.currentQuantity <= stockItem.minimumLevel). Se não houver StockLevel, isLowStock = false e currentQuantity = null.",
          "Ordenar lista resultante por name (ascendente, case-insensitive).",
          "Aplicar paginação opcional: se page e pageSize fornecidos, fatiar a lista ordenada; caso contrário retornar todos os itens.",
          "Retornar { stockItems, total } onde total é o count antes da paginação."
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
