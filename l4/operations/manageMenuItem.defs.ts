/// <mls fileReference="_102051_/l4/operations/manageMenuItem.defs.ts" enhancement="_blank"/>

export const operationManageMenuItem = {
  "operationId": "manageMenuItem",
  "title": "Gerenciar item do cardápio",
  "actor": "gerente",
  "entity": "MenuItem",
  "kind": "update",
  "reads": [
    "MenuItem",
    "MenuCategory",
    "MenuItemIngredient"
  ],
  "writes": [
    "MenuItem"
  ],
  "rulesApplied": [
    "simpleItemsOnly",
    "menuItemRequiresIngredient"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Atualizar os dados de um item do cardápio existente — nome, descrição, categoria, preço e status — para mantê-lo correto e disponível no POS.",
    "steps": [
      "O gerente seleciona um item do cardápio na tela de gestão.",
      "O sistema carrega os dados atuais do item (nome, descrição, categoria, preço, tipo e status).",
      "O gerente edita os campos desejados e define o status (rascunho, ativo ou inativo).",
      "O sistema valida que o tipo do item é 'simple' e que, se for ativado, existe pelo menos um ingrediente de estoque vinculado.",
      "O sistema persiste as alterações atualizando updatedAt e, conforme o status, activatedAt ou inactivatedAt."
    ],
    "outcome": "O item do cardápio é atualizado com os novos dados e o status reflete a disponibilidade no POS."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "MenuItem",
    "keyField": "MenuItem.menuItemId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "MenuItem.menuItemId",
      "MenuItem.name",
      "MenuItem.description",
      "MenuItem.menuCategoryId",
      "MenuItem.price",
      "MenuItem.itemType",
      "MenuItem.status",
      "MenuItem.activatedAt",
      "MenuItem.inactivatedAt",
      "MenuItem.updatedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "menuItemId",
      "fieldRef": "MenuItem.menuItemId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador do item do cardápio selecionado para edição"
    },
    {
      "inputId": "name",
      "fieldRef": "MenuItem.name",
      "required": true,
      "source": "userInput",
      "description": "Nome do item do cardápio exibido no POS"
    },
    {
      "inputId": "description",
      "fieldRef": "MenuItem.description",
      "required": false,
      "source": "userInput",
      "description": "Descrição detalhada do item do cardápio"
    },
    {
      "inputId": "menuCategoryId",
      "fieldRef": "MenuItem.menuCategoryId",
      "required": true,
      "source": "userInput",
      "description": "Categoria de classificação à qual o item pertence"
    },
    {
      "inputId": "price",
      "fieldRef": "MenuItem.price",
      "required": true,
      "source": "userInput",
      "description": "Preço de venda do item do cardápio"
    },
    {
      "inputId": "itemType",
      "fieldRef": "MenuItem.itemType",
      "required": true,
      "source": "userInput",
      "description": "Tipo do item: deve ser 'simple' nesta fase"
    },
    {
      "inputId": "status",
      "fieldRef": "MenuItem.status",
      "required": true,
      "source": "userInput",
      "description": "Status do item: rascunho, ativo ou inativo"
    },
    {
      "inputId": "actorId",
      "fieldRef": "MenuItem.menuItemId",
      "required": true,
      "source": "actorSession",
      "description": "Identificador do gerente autenticado que realiza a alteração"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "MenuItem.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora da última atualização do registro"
    }
  ],
  "contextResolution": [
    {
      "targetRef": "MenuItem.menuItemId",
      "source": "selectedEntity",
      "originRef": "MenuItem.menuItemId",
      "description": "O backend resolve o menuItemId a partir do item atualmente selecionado na tela de gestão de cardápio"
    },
    {
      "targetRef": "actorSession.actorId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "O backend obtém o identificador do gerente a partir da sessão autenticada do usuário"
    },
    {
      "targetRef": "MenuItem.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "O backend atribui o timestamp atual do sistema ao campo updatedAt no momento da persistência"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, o MenuItem existe com o nome, menuCategoryId e price informados pelo gerente.",
    "O itemType do MenuItem atualizado é 'simple', conforme a regra simpleItemsOnly.",
    "Se o status for alterado para 'active', o sistema verifica que existe pelo menos um MenuItemIngredient vinculado ao MenuItem, conforme a regra menuItemRequiresIngredient.",
    "Quando o status muda de 'draft' ou 'inactive' para 'active', o campo activatedAt é preenchido com o timestamp atual.",
    "Quando o status muda de 'active' para 'inactive', o campo inactivatedAt é preenchido com o timestamp atual.",
    "O campo updatedAt é sempre atualizado com o timestamp atual após a persistência."
  ],
  "pageId": "menuItemLifecycle",
  "commandName": "manageMenuItem",
  "bffName": "cafeFlow.menuItemLifecycle.manageMenuItem",
  "capability": {
    "capabilityId": "menuItemLifecycle",
    "title": "Ciclo de vida do item de cardápio",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationManageMenuItem;
