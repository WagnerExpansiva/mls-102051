/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "menuManagement",
  "pageName": "Gestão de cardápio",
  "actor": "gerente",
  "purpose": "Executar Gestão de cardápio.",
  "capabilities": [
    "menuItemLifecycle"
  ],
  "flowRefs": {
    "experienceFlows": [
      "menuItemLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "menuItemLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "menuManagement",
    "workspaceKind": "workflow",
    "workflowId": "menuItemLifecycle",
    "actor": "gerente",
    "entity": "MenuItem",
    "owners": [
      {
        "kind": "workflow",
        "id": "menuItemLifecycle",
        "defPath": "_102051_/l4/workflows/menuItemLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "browseMenuItems",
        "defPath": "_102051_/l4/operations/browseMenuItems.defs.ts"
      },
      {
        "kind": "operation",
        "id": "manageMenuItem",
        "defPath": "_102051_/l4/operations/manageMenuItem.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "O gerente cria um novo item de cardápio definindo nome, categoria e preço de venda.",
        "O gerente vincula os ingredientes de estoque que o item consome para garantir a rastreabilidade de consumo.",
        "O gerente ativa o item para que ele fique disponível para lançamento no POS.",
        "O gerente pode inativar o item quando ele não deve mais aparecer no POS."
      ],
      "operations": [
        {
          "operationId": "browseMenuItems",
          "commandName": "browseMenuItems",
          "steps": [
            "O gerente abre a tela de gestão de cardápio.",
            "O sistema lista todos os itens do cardápio da empresa ativa com nome, categoria, preço, tipo e status.",
            "O gerente pode filtrar por status (rascunho, ativo, inativo) ou por categoria para localizar itens específicos."
          ]
        },
        {
          "operationId": "manageMenuItem",
          "commandName": "manageMenuItem",
          "steps": [
            "O gerente seleciona um item do cardápio na tela de gestão.",
            "O sistema carrega os dados atuais do item (nome, descrição, categoria, preço, tipo e status).",
            "O gerente edita os campos desejados e define o status (rascunho, ativo ou inativo).",
            "O sistema valida que o tipo do item é 'simple' e que, se for ativado, existe pelo menos um ingrediente de estoque vinculado.",
            "O sistema persiste as alterações atualizando updatedAt e, conforme o status, activatedAt ou inactivatedAt."
          ]
        }
      ]
    }
  },
  "pageInputs": [
    {
      "operationId": "browseMenuItems",
      "contextKey": "activeCompanyId",
      "originRef": "businessContext.activeCompanyId",
      "targetRef": "MenuItem.menuCategoryId",
      "required": true,
      "description": "O backend resolve o escopo da consulta limitando os itens do cardápio à empresa ativa da sessão do gerente"
    }
  ],
  "navigationRefs": [],
  "sections": [
    {
      "id": "section.menuManagement.main",
      "type": "section",
      "sectionName": "Gestão de cardápio",
      "titleKey": "menuManagement.section.main.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "organism.browseMenuItems",
          "type": "organism",
          "organismName": "BrowseMenuItems",
          "titleKey": "menuManagement.organism.browseMenuItems.title",
          "purpose": "Consultar itens do cardápio",
          "userActions": [
            "browseMenuItems"
          ],
          "requiredEntities": [
            "MenuItem",
            "MenuCategory"
          ],
          "readsFields": [
            "menuItemId",
            "name",
            "description",
            "menuCategoryId",
            "price",
            "itemType",
            "status",
            "activatedAt",
            "createdAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "simpleItemsOnly"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intention.browseMenuItems.context",
              "intent": "summary",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "order": 10
            },
            {
              "id": "intention.browseMenuItems.list",
              "intent": "queryList",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "action": "browseMenuItems",
              "order": 20
            }
          ]
        },
        {
          "id": "organism.manageMenuItem",
          "type": "organism",
          "organismName": "ManageMenuItem",
          "titleKey": "menuManagement.organism.manageMenuItem.title",
          "purpose": "Gerenciar item do cardápio",
          "userActions": [
            "manageMenuItem"
          ],
          "requiredEntities": [
            "MenuItem",
            "MenuCategory",
            "MenuItemIngredient"
          ],
          "readsFields": [
            "name",
            "description",
            "menuCategoryId",
            "price",
            "itemType",
            "status",
            "activatedAt",
            "inactivatedAt",
            "updatedAt"
          ],
          "writesFields": [
            "name",
            "description",
            "menuCategoryId",
            "price",
            "itemType",
            "status"
          ],
          "rulesApplied": [
            "simpleItemsOnly",
            "menuItemRequiresIngredient"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intention.manageMenuItem.form",
              "intent": "commandForm",
              "submitAction": "manageMenuItem",
              "order": 10
            },
            {
              "id": "intention.manageMenuItem.status",
              "intent": "workflowStatus",
              "order": 20
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "menuManagement.layout",
    "type": "page",
    "sections": [
      {
        "id": "section.menuManagement.main",
        "type": "section",
        "sectionName": "Gestão de cardápio",
        "titleKey": "menuManagement.section.main.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "organism.browseMenuItems",
            "type": "organism",
            "organismName": "BrowseMenuItems",
            "titleKey": "menuManagement.organism.browseMenuItems.title",
            "purpose": "Consultar itens do cardápio",
            "userActions": [
              "browseMenuItems"
            ],
            "requiredEntities": [
              "MenuItem",
              "MenuCategory"
            ],
            "readsFields": [
              "menuItemId",
              "name",
              "description",
              "menuCategoryId",
              "price",
              "itemType",
              "status",
              "activatedAt",
              "createdAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "simpleItemsOnly"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intention.browseMenuItems.context",
                "intent": "summary",
                "order": 10,
                "titleKey": "menuManagement.intention.context.title",
                "displayHint": "contextBadge",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.menuManagement.data.browseMenuItems"
              },
              {
                "id": "intention.browseMenuItems.list",
                "intent": "queryList",
                "order": 20,
                "titleKey": "menuManagement.intention.browseMenuItems.list.title",
                "action": "browseMenuItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col.menuItem.name",
                    "field": "name",
                    "labelKey": "menuManagement.field.name.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col.menuItem.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "menuManagement.field.menuCategoryId.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col.menuItem.price",
                    "field": "price",
                    "labelKey": "menuManagement.field.price.label",
                    "order": 30,
                    "required": false,
                    "format": "currency",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col.menuItem.itemType",
                    "field": "itemType",
                    "labelKey": "menuManagement.field.itemType.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col.menuItem.status",
                    "field": "status",
                    "labelKey": "menuManagement.field.status.label",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col.menuItem.updatedAt",
                    "field": "updatedAt",
                    "labelKey": "menuManagement.field.updatedAt.label",
                    "order": 60,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "filter.browseMenuItems.statusFilter",
                    "field": "statusFilter",
                    "labelKey": "menuManagement.filter.statusFilter.label",
                    "order": 10,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "filter.browseMenuItems.menuCategoryIdFilter",
                    "field": "menuCategoryIdFilter",
                    "labelKey": "menuManagement.filter.menuCategoryIdFilter.label",
                    "order": 20,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action.browseMenuItems.run",
                    "action": "browseMenuItems",
                    "labelKey": "menuManagement.action.browseMenuItems.label",
                    "order": 10,
                    "actionKey": "browseMenuItems"
                  }
                ],
                "stateKey": "ui.menuManagement.data.browseMenuItems"
              }
            ]
          },
          {
            "id": "organism.manageMenuItem",
            "type": "organism",
            "organismName": "ManageMenuItem",
            "titleKey": "menuManagement.organism.manageMenuItem.title",
            "purpose": "Gerenciar item do cardápio",
            "userActions": [
              "manageMenuItem"
            ],
            "requiredEntities": [
              "MenuItem",
              "MenuCategory",
              "MenuItemIngredient"
            ],
            "readsFields": [
              "name",
              "description",
              "menuCategoryId",
              "price",
              "itemType",
              "status",
              "activatedAt",
              "inactivatedAt",
              "updatedAt"
            ],
            "writesFields": [
              "name",
              "description",
              "menuCategoryId",
              "price",
              "itemType",
              "status"
            ],
            "rulesApplied": [
              "simpleItemsOnly",
              "menuItemRequiresIngredient"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intention.manageMenuItem.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "menuManagement.intention.manageMenuItem.form.title",
                "submitAction": "manageMenuItem",
                "fields": [
                  {
                    "id": "field.manageMenuItem.name",
                    "field": "name",
                    "labelKey": "menuManagement.field.name.label",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "field.manageMenuItem.description",
                    "field": "description",
                    "labelKey": "menuManagement.field.description.label",
                    "order": 20,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "field.manageMenuItem.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "menuManagement.field.menuCategoryId.label",
                    "order": 30,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId"
                  },
                  {
                    "id": "field.manageMenuItem.price",
                    "field": "price",
                    "labelKey": "menuManagement.field.price.label",
                    "order": 40,
                    "required": true,
                    "inputType": "currency",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "field.manageMenuItem.itemType",
                    "field": "itemType",
                    "labelKey": "menuManagement.field.itemType.label",
                    "order": 50,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  },
                  {
                    "id": "field.manageMenuItem.status",
                    "field": "status",
                    "labelKey": "menuManagement.field.status.label",
                    "order": 60,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.status"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action.manageMenuItem.submit",
                    "action": "manageMenuItem",
                    "labelKey": "menuManagement.action.manageMenuItem.label",
                    "order": 10,
                    "actionKey": "manageMenuItem"
                  }
                ]
              },
              {
                "id": "intention.manageMenuItem.status",
                "intent": "workflowStatus",
                "order": 20,
                "titleKey": "menuManagement.intention.manageMenuItem.status.title",
                "fields": [
                  {
                    "id": "field.manageMenuItem.status.read",
                    "field": "status",
                    "labelKey": "menuManagement.field.status.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.menuManagement.input.manageMenuItem.status"
                  },
                  {
                    "id": "field.manageMenuItem.activatedAt",
                    "field": "activatedAt",
                    "labelKey": "menuManagement.field.activatedAt.label",
                    "order": 20,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.field-manageMenuItem-activatedAt"
                  },
                  {
                    "id": "field.manageMenuItem.inactivatedAt",
                    "field": "inactivatedAt",
                    "labelKey": "menuManagement.field.inactivatedAt.label",
                    "order": 30,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.field-manageMenuItem-inactivatedAt"
                  },
                  {
                    "id": "field.manageMenuItem.updatedAt",
                    "field": "updatedAt",
                    "labelKey": "menuManagement.field.updatedAt.label",
                    "order": 40,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.field-manageMenuItem-updatedAt"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": []
};

export const pipeline = [
  {
    "id": "menuManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/menuManagement.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/menuManagement.ts",
      "_102051_/l2/cafeFlow/web/contracts/menuManagement.defs.ts",
      "_102051_/l2/cafeFlow/web/contracts/menuManagement.ts"
    ],
    "dependsOn": [
      "menuManagement__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
