/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredient.defs.ts" enhancement="_blank"/>

export const menuItemIngredientTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "MenuItemIngredient",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "MenuItemIngredient",
    "tableName": "menu_item_ingredient",
    "columns": [
      {
        "name": "menu_item_ingredient_id",
        "type": "uuid",
        "nullable": false,
        "description": "pk/fk"
      },
      {
        "name": "menu_item_id",
        "type": "uuid",
        "nullable": false,
        "description": "pk/fk"
      },
      {
        "name": "stock_item_id",
        "type": "uuid",
        "nullable": false,
        "description": "pk/fk"
      },
      {
        "name": "unit",
        "type": "varchar",
        "nullable": false,
        "description": "status"
      },
      {
        "name": "created_at",
        "type": "timestamp",
        "nullable": false,
        "description": "ordering"
      },
      {
        "name": "details",
        "type": "jsonb",
        "nullable": true,
        "description": "quantity, updatedAt"
      }
    ],
    "primaryKey": [
      "menu_item_ingredient_id"
    ],
    "indexes": [
      {
        "indexName": "idx_menu_item_ingredient_menu_item_id",
        "columns": [
          "menu_item_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_menu_item_ingredient_stock_item_id",
        "columns": [
          "stock_item_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_menu_item_ingredient_unit",
        "columns": [
          "unit"
        ],
        "unique": false
      },
      {
        "indexName": "idx_menu_item_ingredient_created_at",
        "columns": [
          "created_at"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "columnName": "details",
      "childCollections": []
    }
  }
} as const;

export default menuItemIngredientTableDefinition;

export const pipeline = [
  {
    "id": "menuItemIngredient__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredient.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/menuItemIngredient.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/menuItemIngredient.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/persistenceTable.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
