/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/menuItemIngredient.defs.ts" enhancement="_blank"/>

export const menuItemIngredientDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "MenuItemIngredient",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "MenuItemIngredient",
    "fields": [
      {
        "fieldId": "menuItemIngredientId",
        "type": "uuid",
        "required": true,
        "description": "Identificador único do vínculo entre item de cardápio e ingrediente de estoque."
      },
      {
        "fieldId": "menuItemId",
        "type": "uuid",
        "required": true,
        "description": "Referência ao item de cardápio ao qual este ingrediente está vinculado."
      },
      {
        "fieldId": "stockItemId",
        "type": "uuid",
        "required": true,
        "description": "Referência ao item de estoque master consumido quando o item de cardápio é pedido."
      },
      {
        "fieldId": "quantity",
        "type": "number",
        "required": true,
        "description": "Quantidade do ingrediente consumida a cada pedido do item de cardápio."
      },
      {
        "fieldId": "unit",
        "type": "string",
        "required": true,
        "description": "Unidade de medida da quantidade consumida do ingrediente.",
        "enum": [
          "kg",
          "gram",
          "liter",
          "milliliter",
          "portion",
          "unit"
        ]
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de criação do vínculo de ingrediente."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora da última atualização do vínculo de ingrediente."
      }
    ],
    "statusEnum": [],
    "valueObjects": [],
    "invariants": [
      "quantity deve ser maior que zero",
      "A unidade do vínculo deve ser compatível com a unidade do item de estoque referenciado",
      "Não pode haver mais de um vínculo entre o mesmo menuItemId e stockItemId"
    ]
  }
} as const;

export default menuItemIngredientDomainEntity;

export const pipeline = [
  {
    "id": "menuItemIngredient__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/menuItemIngredient.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/menuItemIngredient.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
