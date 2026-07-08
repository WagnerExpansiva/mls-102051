/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.defs.ts" enhancement="_blank"/>

export const manageMenuItemUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "manageMenuItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "manageMenuItem",
    "ports": [],
    "functions": [
      {
        "functionName": "updateMenuItem",
        "inputTypeName": "UpdateMenuItemInput",
        "outputTypeName": "UpdateMenuItemOutput",
        "input": [
          {
            "name": "menuItemId",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Identificador do item do cardápio selecionado para edição"
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Nome do item do cardápio exibido no POS"
          },
          {
            "name": "description",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "description": "Descrição detalhada do item do cardápio"
          },
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Categoria de classificação à qual o item pertence"
          },
          {
            "name": "price",
            "type": "number",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Preço de venda do item do cardápio"
          },
          {
            "name": "itemType",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Tipo do item: deve ser 'simple' nesta fase"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Status do item: rascunho, ativo ou inativo"
          }
        ],
        "output": [
          {
            "name": "menuItemId",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Identificador do item do cardápio atualizado"
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Nome do item do cardápio"
          },
          {
            "name": "description",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "description": "Descrição detalhada do item do cardápio"
          },
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Categoria de classificação à qual o item pertence"
          },
          {
            "name": "price",
            "type": "number",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Preço de venda do item do cardápio"
          },
          {
            "name": "itemType",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Tipo do item"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Status do item"
          },
          {
            "name": "activatedAt",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "description": "Data e hora de ativação do item"
          },
          {
            "name": "inactivatedAt",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "description": "Data e hora de inativação do item"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Data e hora da última atualização"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "simpleItemsOnly",
          "menuItemRequiresIngredient"
        ],
        "transactional": true,
        "steps": [
          "1. Resolve actorId from ctx.sessionContext.actorId and updatedAt from ctx.clock.now()",
          "2. Load existing MenuItem via ctx.mdm.entity.get({ mdmId: menuItemId })",
          "3. Validate itemType === 'simple' (rule simpleItemsOnly); reject with error if itemType is 'variant'",
          "4. If status is changing to 'active' (from 'draft' or 'inactive'), query MenuItemIngredient via ctx.mdm.collection.listByType for ingredients related to this menuItemId; reject if none found (rule menuItemRequiresIngredient)",
          "5. If status transitions to 'active', set activatedAt = ctx.clock.now(); if transitions to 'inactive', set inactivatedAt = ctx.clock.now()",
          "6. Build update payload with name, description, menuCategoryId, price, itemType, status, activatedAt/inactivatedAt as applicable, and updatedAt = ctx.clock.now()",
          "7. Persist via ctx.mdm.entity.update({ mdmId: menuItemId, details: payload })",
          "8. Return updated MenuItem fields: menuItemId, name, description, menuCategoryId, price, itemType, status, activatedAt, inactivatedAt, updatedAt"
        ]
      }
    ],
    "mdmRefs": [
      "MenuItem",
      "MenuCategory"
    ]
  }
} as const;

export default manageMenuItemUsecase;

export const pipeline = [
  {
    "id": "manageMenuItem__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/manageMenuItem.defs.ts",
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
