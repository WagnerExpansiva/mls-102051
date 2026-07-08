/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.defs.ts" enhancement="_blank"/>

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
      "id": "sec-cards",
      "type": "section",
      "sectionName": "Gestão de cardápio",
      "titleKey": "section.cards",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-browse",
          "type": "organism",
          "organismName": "BrowseMenuItems",
          "titleKey": "org.browse.title",
          "purpose": "Navegar por cartões e selecionar item",
          "userActions": [
            "browseMenuItems"
          ],
          "requiredEntities": [
            "MenuItem",
            "MenuCategory"
          ],
          "readsFields": [
            "MenuItem.name",
            "MenuItem.menuCategoryId",
            "MenuItem.price",
            "MenuItem.status"
          ],
          "writesFields": [],
          "rulesApplied": [
            "simpleItemsOnly"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-context-badge",
              "intent": "summary",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "order": 10
            },
            {
              "id": "int-cards-list",
              "intent": "queryList",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "action": "browseMenuItems",
              "order": 20
            }
          ]
        }
      ]
    },
    {
      "id": "sec-details",
      "type": "section",
      "sectionName": "Gestão de cardápio",
      "titleKey": "section.details",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org-manage",
          "type": "organism",
          "organismName": "ManageMenuItem",
          "titleKey": "org.manage.title",
          "purpose": "Editar item selecionado com foco mobile",
          "userActions": [
            "manageMenuItem"
          ],
          "requiredEntities": [
            "MenuItem",
            "MenuCategory",
            "MenuItemIngredient"
          ],
          "readsFields": [
            "MenuItem.name",
            "MenuItem.description",
            "MenuItem.menuCategoryId",
            "MenuItem.price",
            "MenuItem.itemType",
            "MenuItem.status",
            "MenuItem.activatedAt",
            "MenuItem.inactivatedAt",
            "MenuItem.updatedAt",
            "MenuItem.createdAt"
          ],
          "writesFields": [
            "MenuItem.name",
            "MenuItem.description",
            "MenuItem.menuCategoryId",
            "MenuItem.price",
            "MenuItem.itemType",
            "MenuItem.status"
          ],
          "rulesApplied": [
            "simpleItemsOnly",
            "menuItemRequiresIngredient"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-manage-form",
              "intent": "commandForm",
              "submitAction": "manageMenuItem",
              "order": 10
            },
            {
              "id": "int-manage-status",
              "intent": "workflowStatus",
              "order": 20
            },
            {
              "id": "int-manage-summary",
              "intent": "summary",
              "order": 30
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "page31",
    "type": "page",
    "sections": [
      {
        "id": "sec-cards",
        "type": "section",
        "sectionName": "Gestão de cardápio",
        "titleKey": "section.cards",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-browse",
            "type": "organism",
            "organismName": "BrowseMenuItems",
            "titleKey": "org.browse.title",
            "purpose": "Navegar por cartões e selecionar item",
            "userActions": [
              "browseMenuItems"
            ],
            "requiredEntities": [
              "MenuItem",
              "MenuCategory"
            ],
            "readsFields": [
              "MenuItem.name",
              "MenuItem.menuCategoryId",
              "MenuItem.price",
              "MenuItem.status"
            ],
            "writesFields": [],
            "rulesApplied": [
              "simpleItemsOnly"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-context-badge",
                "intent": "summary",
                "order": 10,
                "titleKey": "intent.context.badge.title",
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
                "id": "int-cards-list",
                "intent": "queryList",
                "order": 20,
                "titleKey": "intent.cards.list.title",
                "source": "ui.menuManagement.data.browseMenuItems",
                "binding": "bind-browseMenuItems",
                "action": "browseMenuItems",
                "emptyKey": "empty.cards",
                "displayHint": "cardList",
                "stateKey": "ui.menuManagement.data.browseMenuItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col-name",
                    "field": "name",
                    "labelKey": "column.name",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-category",
                    "field": "menuCategoryId",
                    "labelKey": "column.menuCategoryId",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-price",
                    "field": "price",
                    "labelKey": "column.price",
                    "order": 30,
                    "required": false,
                    "format": "money",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "filter-status",
                    "field": "statusFilter",
                    "labelKey": "field.statusFilter",
                    "order": 10,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "filter-category",
                    "field": "menuCategoryIdFilter",
                    "labelKey": "field.menuCategoryIdFilter",
                    "order": 20,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb-refresh",
                    "action": "browseMenuItems",
                    "labelKey": "action.browseMenuItems",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "browseMenuItems"
                  }
                ],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      },
      {
        "id": "sec-details",
        "type": "section",
        "sectionName": "Gestão de cardápio",
        "titleKey": "section.details",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org-manage",
            "type": "organism",
            "organismName": "ManageMenuItem",
            "titleKey": "org.manage.title",
            "purpose": "Editar item selecionado com foco mobile",
            "userActions": [
              "manageMenuItem"
            ],
            "requiredEntities": [
              "MenuItem",
              "MenuCategory",
              "MenuItemIngredient"
            ],
            "readsFields": [
              "MenuItem.name",
              "MenuItem.description",
              "MenuItem.menuCategoryId",
              "MenuItem.price",
              "MenuItem.itemType",
              "MenuItem.status",
              "MenuItem.activatedAt",
              "MenuItem.inactivatedAt",
              "MenuItem.updatedAt",
              "MenuItem.createdAt"
            ],
            "writesFields": [
              "MenuItem.name",
              "MenuItem.description",
              "MenuItem.menuCategoryId",
              "MenuItem.price",
              "MenuItem.itemType",
              "MenuItem.status"
            ],
            "rulesApplied": [
              "simpleItemsOnly",
              "menuItemRequiresIngredient"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-manage-form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.manage.form.title",
                "binding": "bind-manageMenuItem",
                "submitAction": "manageMenuItem",
                "displayHint": "bottomSheetForm",
                "fields": [
                  {
                    "id": "fld-name",
                    "field": "name",
                    "labelKey": "field.name",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "fld-description",
                    "field": "description",
                    "labelKey": "field.description",
                    "order": 20,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "fld-menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId",
                    "order": 30,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId"
                  },
                  {
                    "id": "fld-price",
                    "field": "price",
                    "labelKey": "field.price",
                    "order": 40,
                    "required": true,
                    "inputType": "money",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "fld-itemType",
                    "field": "itemType",
                    "labelKey": "field.itemType",
                    "order": 50,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  },
                  {
                    "id": "fld-status",
                    "field": "status",
                    "labelKey": "field.status",
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
                    "id": "act-manage-submit",
                    "action": "manageMenuItem",
                    "labelKey": "action.manageMenuItem",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "manageMenuItem"
                  }
                ]
              },
              {
                "id": "int-manage-status",
                "intent": "workflowStatus",
                "order": 20,
                "titleKey": "intent.manage.status.title",
                "displayHint": "statusPanel",
                "fields": [
                  {
                    "id": "fld-status-display",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.menuManagement.input.manageMenuItem.status"
                  },
                  {
                    "id": "fld-activatedAt",
                    "field": "activatedAt",
                    "labelKey": "field.activatedAt",
                    "order": 20,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.fld-activatedAt"
                  },
                  {
                    "id": "fld-inactivatedAt",
                    "field": "inactivatedAt",
                    "labelKey": "field.inactivatedAt",
                    "order": 30,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.fld-inactivatedAt"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "int-manage-summary",
                "intent": "summary",
                "order": 30,
                "titleKey": "intent.manage.summary.title",
                "displayHint": "summaryPanel",
                "fields": [
                  {
                    "id": "fld-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt",
                    "order": 10,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.fld-updatedAt"
                  },
                  {
                    "id": "fld-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt",
                    "order": 20,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.fld-createdAt"
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
  "dataBindings": [
    {
      "id": "bind-browseMenuItems",
      "source": "bffCommand",
      "command": "browseMenuItems",
      "description": "Consultar itens do cardápio",
      "stateKey": "ui.menuManagement.data.browseMenuItems",
      "inputStateKeys": [
        "ui.menuManagement.input.browseMenuItems.statusFilter",
        "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
      ]
    },
    {
      "id": "bind-manageMenuItem",
      "source": "bffCommand",
      "command": "manageMenuItem",
      "description": "Gerenciar item do cardápio",
      "stateKey": "ui.menuManagement.output.manageMenuItem",
      "inputStateKeys": [
        "ui.menuManagement.input.manageMenuItem.name",
        "ui.menuManagement.input.manageMenuItem.description",
        "ui.menuManagement.input.manageMenuItem.menuCategoryId",
        "ui.menuManagement.input.manageMenuItem.price",
        "ui.menuManagement.input.manageMenuItem.itemType",
        "ui.menuManagement.input.manageMenuItem.status"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "menuManagement__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.defs.ts",
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
