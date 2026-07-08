/// <mls fileReference="_102051_/l4/operations/manageStockItem.defs.ts" enhancement="_blank"/>

export const operationManageStockItem = {
  "operationId": "manageStockItem",
  "title": "Gerenciar itens de estoque",
  "actor": "gerente",
  "entity": "StockItem",
  "kind": "update",
  "reads": [
    "StockItem"
  ],
  "writes": [
    "StockItem"
  ],
  "rulesApplied": [
    "lowStockAlertCalculation"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Atualizar os dados de um item de estoque existente — nome, unidade de medida e limite mínimo de alerta — para manter o cadastro de insumos confiável.",
    "steps": [
      "O gerente seleciona um item de estoque existente na lista de insumos cadastrados.",
      "O sistema carrega os dados atuais do item (nome, unidade, limite mínimo).",
      "O gerente edita os campos desejados e confirma a atualização.",
      "O sistema persiste os novos valores e atualiza o timestamp updatedAt."
    ],
    "outcome": "O item de estoque fica atualizado com os novos dados e o cálculo de alerta de estoque baixo passa a usar o novo limite mínimo configurado."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "StockItem",
    "keyField": "StockItem.stockItemId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "StockItem.stockItemId",
      "StockItem.name",
      "StockItem.unit",
      "StockItem.minimumLevel",
      "StockItem.updatedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "stockItemId",
      "fieldRef": "StockItem.stockItemId",
      "required": true,
      "source": "routeParam",
      "description": "Identificador do item de estoque a ser atualizado, obtido da rota de edição."
    },
    {
      "inputId": "name",
      "fieldRef": "StockItem.name",
      "required": true,
      "source": "userInput",
      "description": "Nome do ingrediente editado pelo gerente."
    },
    {
      "inputId": "unit",
      "fieldRef": "StockItem.unit",
      "required": true,
      "source": "userInput",
      "description": "Unidade de medida do ingrediente (kg, liter, portion ou unit)."
    },
    {
      "inputId": "minimumLevel",
      "fieldRef": "StockItem.minimumLevel",
      "required": true,
      "source": "userInput",
      "description": "Quantidade mínima configurada para disparar o alerta de estoque baixo."
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "StockItem.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora da última atualização do item de estoque."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "StockItem.stockItemId",
      "source": "routeParam",
      "originRef": "routeParam.stockItemId",
      "description": "O backend extrai o identificador do item de estoque do parâmetro de rota da tela de edição."
    },
    {
      "targetRef": "StockItem.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "O backend atribui automaticamente o timestamp atual no momento da persistência da atualização."
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, o StockItem existe com o nome, a unidade e o limite mínimo atualizados conforme os valores informados pelo gerente.",
    "Após a atualização, o campo StockItem.updatedAt reflete o timestamp atual do sistema.",
    "O cálculo do alerta de estoque baixo utiliza o novo valor de StockItem.minimumLevel atualizado para comparar com a quantidade atual em StockLevel."
  ],
  "pageId": "manageStockItem",
  "commandName": "manageStockItem",
  "bffName": "cafeFlow.manageStockItem.manageStockItem",
  "capability": {
    "capabilityId": "manageStockItem",
    "title": "Gerenciar itens de estoque",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationManageStockItem;
