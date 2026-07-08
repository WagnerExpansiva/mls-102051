/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredientRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const menuItemIngredientRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "MenuItemIngredientRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "MenuItemIngredientRepositoryAdapter",
    "entityId": "MenuItemIngredient",
    "portRef": "IMenuItemIngredientRepository",
    "tableRef": "menu_item_ingredients",
    "mdmReads": [
      "ctx.mdm.collection.getMany/hydrateMany({ type: 'MenuItem', ids: [...menuItemIds] })",
      "ctx.mdm.collection.getMany/hydrateMany({ type: 'StockItem', ids: [...stockItemIds] })"
    ],
    "notes": [
      "columns: menu_item_ingredient_id, menu_item_id, stock_item_id, unit, created_at",
      "details JSONB: quantity, updatedAt",
      "menu_item_id -> MenuItem and stock_item_id -> StockItem resolved via bulk ctx.mdm.collection.getMany/hydrateMany"
    ]
  }
} as const;

export default menuItemIngredientRepositoryAdapter;

export const pipeline = [
  {
    "id": "menuItemIngredientRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredientRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredientRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/menuItemIngredientRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredient.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/menuItemIngredient.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryAdapter.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
