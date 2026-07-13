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
        "functionName": "manageMenuItem",
        "inputTypeName": "ManageMenuItemInput",
        "outputTypeName": "ManageMenuItemOutput",
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
            "ofEntity": "MenuItem"
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "description",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem"
          },
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "price",
            "type": "number",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "itemType",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "activatedAt",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem"
          },
          {
            "name": "inactivatedAt",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "simpleItemsOnly",
          "menuItemRequiresIngredient"
        ],
        "transactional": true,
        "steps": [
          "1. Resolve actorId from ctx.sessionContext (actorSession) and now from ctx.clock (systemDefault) — these are context values, not public input.",
          "2. Load the current MenuItem via ctx.mdm.entity.get({ mdmId: menuItemId }) to obtain the existing record including its current status, activatedAt, and inactivatedAt.",
          "3. Apply rule simpleItemsOnly: validate that itemType === 'simple'; if not, reject with error detail referencing rule 'simpleItemsOnly'.",
          "4. Validate that menuCategoryId references an existing MenuCategory via ctx.mdm.entity.get({ mdmId: menuCategoryId }); reject if not found or inactive.",
          "5. If status is transitioning to 'active' (current status is 'draft' or 'inactive' and new status is 'active'), apply rule menuItemRequiresIngredient: query related entities of the MenuItem via ctx.mdm.collection.relatedOfMany({ mdmIds: [menuItemId] }) to check for linked ingredients (StockItems related as ingredients). MODELING GAP: MenuItemIngredient is neither a declared MDM entity type nor a runtime port — it is not in mdmRefs [MenuItem, MenuCategory] nor in the valid MDM entities [MenuCategory, MenuItem, StockItem] nor in the valid ports [Order, Shift, StockLevel, ShiftClosingReport, StockAdjustment, StockConsumption]. The relatedOfMany call is the closest available proxy: if it returns zero related entities, reject with error detail referencing rule 'menuItemRequiresIngredient'. If relatedOfMany returns results, proceed.",
          "6. If status transitions from 'draft' or 'inactive' to 'active', set activatedAt = ctx.clock.now().",
          "7. If status transitions from 'active' to 'inactive', set inactivatedAt = ctx.clock.now().",
          "8. Set updatedAt = ctx.clock.now().",
          "9. Persist the updated MenuItem via ctx.mdm.entity.update({ mdmId: menuItemId, details: { name, description, menuCategoryId, price, itemType, status, activatedAt, inactivatedAt, updatedAt } }).",
          "10. Return the updated MenuItem fields: menuItemId, name, description, menuCategoryId, price, itemType, status, activatedAt, inactivatedAt, updatedAt."
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
