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
            "ofEntity": "MenuItem",
            "description": "Filtro opcional por status do item (draft, active, inactive)"
          },
          {
            "name": "menuCategoryIdFilter",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "description": "Filtro opcional por categoria do item (menuCategoryId)"
          }
        ],
        "output": [
          {
            "name": "items",
            "type": "array",
            "required": true,
            "ofEntity": "MenuItem",
            "description": "Lista de itens do cardápio com campos projetados: menuItemId, name, description, menuCategoryId, price, itemType, status, activatedAt, createdAt, updatedAt"
          },
          {
            "name": "total",
            "type": "number",
            "required": true,
            "description": "Total de itens retornados na lista"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "simpleItemsOnly"
        ],
        "transactional": false,
        "steps": [
          "1. Resolver activeCompanyId a partir de ctx.sessionContext.businessContext.activeCompanyId para escopo da consulta",
          "2. MODELING GAP: MenuItem nao possui campo companyId em seu modelo de entidade; registrar a lacuna e NAO aplicar filtro por empresa ativa (evitar matching contra campo inexistente)",
          "3. Listar entidades MDM do tipo MenuItem via ctx.mdm.collection.listByType({ type: 'MenuItem' })",
          "4. Aplicar filtro opcional statusFilter: se informado, manter apenas itens cujo status corresponde ao valor",
          "5. Aplicar filtro opcional menuCategoryIdFilter: se informado, manter apenas itens cujo menuCategoryId corresponde ao valor",
          "6. Aplicar regra simpleItemsOnly: listar todos os itens (simple e variant) como entradas separadas, sem expansao ou agrupamento de variantes — cada item aparece individualmente na lista",
          "7. Projetar campos de saida (menuItemId, name, description, menuCategoryId, price, itemType, status, activatedAt, createdAt, updatedAt) para cada item",
          "8. Retornar { items, total } com a lista filtrada e projetada"
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
