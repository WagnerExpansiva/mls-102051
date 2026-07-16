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
        "transactional": false,
        "steps": [
          "1. Load the current MenuItem from MDM via ctx.mdm.entity.get({ mdmId: menuItemId }). If not found, throw a validation error 'MenuItem not found'.",
          "2. Apply rule simpleItemsOnly: validate that itemType === 'simple'. If itemType is 'variant' or any other value, throw validation error with rule id 'simpleItemsOnly' — only simple items are allowed in this phase.",
          "3. Validate the referenced MenuCategory exists by calling ctx.mdm.entity.get({ mdmId: menuCategoryId }). If not found, throw validation error 'MenuCategory not found'.",
          "4. Determine status transition by comparing the current MenuItem.status with the input status:",
          "  4a. If status changes from 'draft' or 'inactive' to 'active', apply rule menuItemRequiresIngredient: query MenuItemIngredient records linked to this MenuItem via ctx.mdm.collection.listByType({ type: 'MenuItemIngredient' }) and filter in memory by menuItemId. If no MenuItemIngredient records are found, throw validation error with rule id 'menuItemRequiresIngredient' — an active MenuItem must have at least one ingredient.",
          "  4b. If status changes from 'draft' or 'inactive' to 'active', set activatedAt = ctx.clock.now().",
          "  4c. If status changes from 'active' to 'inactive', set inactivatedAt = ctx.clock.now().",
          "  4d. If status remains unchanged, preserve existing activatedAt / inactivatedAt values from the loaded entity.",
          "5. Set updatedAt = ctx.clock.now() (systemDefault, resolved from ctx.clock — never accepted as user input).",
          "6. Build the update payload with fields: name, description, menuCategoryId, price, itemType, status, activatedAt (if computed), inactivatedAt (if computed), updatedAt.",
          "7. Persist the update via ctx.mdm.entity.update({ mdmId: menuItemId, details: { name, description, menuCategoryId, price, itemType, status, activatedAt, inactivatedAt, updatedAt } }).",
          "8. Return the updated MenuItem fields: menuItemId, name, description, menuCategoryId, price, itemType, status, activatedAt, inactivatedAt, updatedAt."
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
