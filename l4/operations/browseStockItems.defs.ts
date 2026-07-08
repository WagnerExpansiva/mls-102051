/// <mls fileReference="_102051_/l4/operations/browseStockItems.defs.ts" enhancement="_blank"/>

export const operationBrowseStockItems = {
  "operationId": "browseStockItems",
  "title": "Consultar itens de estoque e alertas",
  "actor": "gerente",
  "entity": "StockItem",
  "kind": "query",
  "reads": [
    "StockItem",
    "StockLevel"
  ],
  "writes": [],
  "rulesApplied": [
    "lowStockAlertCalculation"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Visualizar todos os itens de estoque cadastrados e identificar quais estão com quantidade abaixo do mínimo configurado para planejar a reposição.",
    "steps": [
      "O gerente abre a tela de consulta de estoque",
      "O sistema lista todos os itens de estoque com nome, unidade de medida e limite mínimo",
      "O sistema compara a quantidade atual de cada item (StockLevel) com o mínimo configurado (StockItem.minimumLevel)",
      "Itens cuja quantidade atual está abaixo ou igual ao mínimo são destacados como alerta de estoque baixo",
      "O gerente pode filtrar a lista por nome para localizar um ingrediente específico"
    ],
    "outcome": "O gerente obtém uma visão completa do estoque com indicação clara de quais itens precisam de reposição imediata."
  },
  "accessPattern": {
    "kind": "list",
    "entity": "StockItem",
    "keyField": "StockItem.stockItemId",
    "pagination": "optional",
    "selection": "none",
    "output": [
      "StockItem.stockItemId",
      "StockItem.name",
      "StockItem.unit",
      "StockItem.minimumLevel",
      "StockItem.createdAt",
      "StockItem.updatedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "searchTerm",
      "fieldRef": "StockItem.name",
      "required": false,
      "source": "userInput",
      "description": "Termo de busca opcional para filtrar itens de estoque pelo nome."
    },
    {
      "inputId": "actorId",
      "fieldRef": "StockItem.stockItemId",
      "required": true,
      "source": "actorSession",
      "description": "Identificador do gerente autenticado que está consultando o estoque."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "StockItem.stockItemId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "O backend extrai o actorId da sessão autenticada do gerente para autorizar o acesso à lista de itens de estoque."
    }
  ],
  "acceptanceAssertions": [
    "A lista exibe todos os itens de estoque cadastrados com nome, unidade de medida e limite mínimo configurado",
    "Itens cuja quantidade atual (StockLevel) está abaixo ou igual ao mínimo configurado (StockItem.minimumLevel) são destacados como alerta de estoque baixo",
    "O gerente pode filtrar a lista por nome do ingrediente para localizar um item específico",
    "A lista está ordenada por nome do item de estoque para facilitar a consulta",
    "A paginação é opcional e permite navegar por grandes volumes de itens de estoque"
  ],
  "pageId": "browseStockItems",
  "commandName": "browseStockItems",
  "bffName": "cafeFlow.browseStockItems.browseStockItems",
  "capability": {
    "capabilityId": "browseStockItems",
    "title": "Consultar itens de estoque e alertas",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationBrowseStockItems;
