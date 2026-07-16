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
            "description": "Filtro opcional por status do item (draft, active, inactive) informado pelo gerente"
          },
          {
            "name": "menuCategoryIdFilter",
            "type": "string",
            "required": false,
            "description": "Filtro opcional por categoria do item informado pelo gerente"
          }
        ],
        "output": [
          {
            "name": "items",
            "type": "array",
            "required": true,
            "description": "Lista de itens do cardápio projetados com: menuItemId, name, description, menuCategoryId, price, itemType, status, activatedAt, createdAt, updatedAt"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "simpleItemsOnly"
        ],
        "transactional": false,
        "steps": [
          "1. Resolver activeCompanyId a partir de ctx.sessionContext.businessContext.activeCompanyId. MODELING GAP: MenuItem não possui campo companyId no modelo MDM — o filtro de escopo por empresa ativa não pode ser aplicado diretamente; registrar a lacuna e seguir sem o filtro de empresa.",
          "2. Listar todas as entidades MenuItem do MDM via ctx.mdm.collection.listByType({ type: 'MenuItem' }).",
          "3. Se statusFilter foi informado, filtrar in-memory os itens cujo campo status === statusFilter.",
          "4. Se menuCategoryIdFilter foi informado, filtrar in-memory os itens cujo campo menuCategoryId === menuCategoryIdFilter.",
          "5. Aplicar regra simpleItemsOnly: todos os itens (incluindo itemType 'variant') aparecem na lista como entradas separadas — o browse não filtra por itemType; a regra indica que apenas itens simples são plenamente suportados pelo sistema, mas variantes ainda são listadas individualmente.",
          "6. Projetar cada item para os campos: menuItemId, name, description, menuCategoryId, price, itemType, status, activatedAt, createdAt, updatedAt.",
          "7. Retornar a coleção projetada no campo items."
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
