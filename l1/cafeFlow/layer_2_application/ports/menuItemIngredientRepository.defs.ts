/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/menuItemIngredientRepository.defs.ts" enhancement="_blank"/>

export const menuItemIngredientRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "MenuItemIngredientRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "MenuItemIngredient",
    "interfaceName": "IMenuItemIngredientRepository",
    "methods": [
      {
        "name": "getById",
        "params": [
          "id: MenuItemIngredientId"
        ],
        "returns": "MenuItemIngredient",
        "description": "Retrieve a menu item ingredient by its unique identifier"
      },
      {
        "name": "list",
        "params": [
          "filter: MenuItemIngredientFilter"
        ],
        "returns": "MenuItemIngredient[]",
        "description": "List menu item ingredients matching the given filter"
      },
      {
        "name": "save",
        "params": [
          "menuItemIngredient: MenuItemIngredient"
        ],
        "returns": "void",
        "description": "Persist the menu item ingredient aggregate"
      },
      {
        "name": "findByMenuItemId",
        "params": [
          "menuItemId: MenuItemId"
        ],
        "returns": "MenuItemIngredient[]",
        "description": "Find ingredient mappings for a specific menu item"
      },
      {
        "name": "findByIngredientId",
        "params": [
          "ingredientId: IngredientId"
        ],
        "returns": "MenuItemIngredient[]",
        "description": "Find menu item mappings for a specific ingredient"
      }
    ]
  }
} as const;

export default menuItemIngredientRepositoryPort;

export const pipeline = [
  {
    "id": "menuItemIngredientRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/menuItemIngredientRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/menuItemIngredientRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/menuItemIngredient.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
