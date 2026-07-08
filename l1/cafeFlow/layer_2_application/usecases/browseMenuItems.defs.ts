/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.defs.ts" enhancement="_blank"/>

export const browseMenuItemsUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "browseMenuItems",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "browseMenuItems",
    "ports": [],
    "functions": [
      {
        "functionName": "browseMenuItems",
        "inputTypeName": "BrowseMenuItemsInput",
        "outputTypeName": "BrowseMenuItemsOutput",
        "input": [
          {
            "name": "statusFilter",
            "type": "string",
            "required": false,
            "description": "Filtro opcional por status do item (draft, active, inactive)"
          },
          {
            "name": "menuCategoryIdFilter",
            "type": "string",
            "required": false,
            "description": "Filtro opcional por categoria do item (menuCategoryId)"
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
            "name": "createdAt",
            "type": "string",
            "required": true,
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
          "simpleItemsOnly"
        ],
        "transactional": false,
        "steps": [
          "1. Resolve activeCompanyId from ctx.sessionContext.activeCompanyId (businessContext scope).",
          "2. Retrieve MenuCategory MDM records scoped to the active company via ctx.mdm.collection.listByType({ type: 'MenuCategory' }) and filter by company relationship to build the set of allowed menuCategoryIds.",
          "3. Retrieve MenuItem MDM records via ctx.mdm.collection.listByType({ type: 'MenuItem' }) and filter to only those whose menuCategoryId is in the allowed set from step 2.",
          "4. Apply rule simpleItemsOnly: keep only items where itemType === 'simple'; variant items are excluded from the listing because only simple items are supported.",
          "5. If statusFilter is provided, filter the result set to items whose status matches the given value (draft, active, or inactive).",
          "6. If menuCategoryIdFilter is provided, further filter the result set to items whose menuCategoryId matches the given value.",
          "7. Project each remaining MenuItem to the output shape (menuItemId, name, description, menuCategoryId, price, itemType, status, activatedAt, createdAt, updatedAt) and return the collection."
        ]
      }
    ],
    "mdmRefs": [
      "MenuItem",
      "MenuCategory"
    ]
  }
} as const;

export default browseMenuItemsUsecase;

export const pipeline = [
  {
    "id": "browseMenuItems__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.defs.ts",
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
