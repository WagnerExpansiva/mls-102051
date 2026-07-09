/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.defs.ts" enhancement="_blank"/>

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
      "id": "s10_board",
      "type": "section",
      "sectionName": "board",
      "titleKey": "menuManagement.board.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "o10_board",
          "type": "boardPanel",
          "organismName": "BrowseMenuItems",
          "titleKey": "menuManagement.board.lanes.title",
          "purpose": "Visualizar itens por status em colunas",
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
            "menuCategoryId",
            "price",
            "status",
            "itemType"
          ],
          "writesFields": [],
          "rulesApplied": [
            "simpleItemsOnly"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "i10_context",
              "intent": "workflowStatus",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "order": 10
            },
            {
              "id": "i20_query",
              "intent": "queryList",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "action": "browseMenuItems",
              "order": 20
            },
            {
              "id": "i30_summary",
              "intent": "summary",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "order": 30
            }
          ]
        }
      ]
    },
    {
      "id": "s20_detail",
      "type": "section",
      "sectionName": "detail",
      "titleKey": "menuManagement.detail.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "o20_manage",
          "type": "formPanel",
          "organismName": "ManageMenuItem",
          "titleKey": "menuManagement.detail.form.title",
          "purpose": "Atualizar dados e status do item do cardápio",
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
            "status"
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
          "order": 10,
          "intentionRefs": [
            {
              "id": "i40_status",
              "intent": "workflowStatus",
              "order": 10
            },
            {
              "id": "i50_edit",
              "intent": "commandForm",
              "submitAction": "manageMenuItem",
              "order": 20
            },
            {
              "id": "i60_review",
              "intent": "summary",
              "order": 30
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "menuManagement.page21",
    "type": "page",
    "sections": [
      {
        "id": "s10_board",
        "type": "section",
        "sectionName": "board",
        "titleKey": "menuManagement.board.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "o10_board",
            "type": "boardPanel",
            "organismName": "BrowseMenuItems",
            "titleKey": "menuManagement.board.lanes.title",
            "purpose": "Visualizar itens por status em colunas",
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
              "menuCategoryId",
              "price",
              "status",
              "itemType"
            ],
            "writesFields": [],
            "rulesApplied": [
              "simpleItemsOnly"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "i10_context",
                "intent": "workflowStatus",
                "order": 10,
                "titleKey": "menuManagement.context.title",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.menuManagement.data.browseMenuItems"
              },
              {
                "id": "i20_query",
                "intent": "queryList",
                "order": 20,
                "titleKey": "menuManagement.board.query.title",
                "action": "browseMenuItems",
                "fields": [],
                "columns": [
                  {
                    "id": "c10_name",
                    "field": "name",
                    "labelKey": "menuManagement.menuItem.name",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "c20_category",
                    "field": "menuCategoryId",
                    "labelKey": "menuManagement.menuItem.menuCategoryId",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "c30_price",
                    "field": "price",
                    "labelKey": "menuManagement.menuItem.price",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "c40_status",
                    "field": "status",
                    "labelKey": "menuManagement.menuItem.status",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "f10_status",
                    "field": "statusFilter",
                    "labelKey": "menuManagement.filter.status",
                    "order": 10,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "f20_category",
                    "field": "menuCategoryIdFilter",
                    "labelKey": "menuManagement.filter.menuCategory",
                    "order": 20,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
                  }
                ],
                "toolbar": [
                  {
                    "id": "t10_refresh",
                    "action": "browseMenuItems",
                    "labelKey": "menuManagement.action.refresh",
                    "order": 10,
                    "actionKey": "browseMenuItems"
                  }
                ],
                "rowActions": [
                  {
                    "id": "ra10_manage",
                    "action": "manageMenuItem",
                    "labelKey": "menuManagement.action.manage",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "manageMenuItem"
                  }
                ],
                "actions": [],
                "stateKey": "ui.menuManagement.data.browseMenuItems"
              },
              {
                "id": "i30_summary",
                "intent": "summary",
                "order": 30,
                "titleKey": "menuManagement.board.summary.title",
                "fields": [
                  {
                    "id": "s10_status",
                    "field": "status",
                    "labelKey": "menuManagement.menuItem.status",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "s20_itemType",
                    "field": "itemType",
                    "labelKey": "menuManagement.menuItem.itemType",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "s30_updatedAt",
                    "field": "updatedAt",
                    "labelKey": "menuManagement.menuItem.updatedAt",
                    "order": 30,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.menuManagement.data.browseMenuItems"
              }
            ]
          }
        ]
      },
      {
        "id": "s20_detail",
        "type": "section",
        "sectionName": "detail",
        "titleKey": "menuManagement.detail.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "o20_manage",
            "type": "formPanel",
            "organismName": "ManageMenuItem",
            "titleKey": "menuManagement.detail.form.title",
            "purpose": "Atualizar dados e status do item do cardápio",
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
              "status"
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
            "order": 10,
            "intentions": [
              {
                "id": "i40_status",
                "intent": "workflowStatus",
                "order": 10,
                "titleKey": "menuManagement.detail.status.title",
                "fields": [
                  {
                    "id": "ws10_status",
                    "field": "status",
                    "labelKey": "menuManagement.menuItem.status",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.menuManagement.input.manageMenuItem.status"
                  },
                  {
                    "id": "ws20_activatedAt",
                    "field": "activatedAt",
                    "labelKey": "menuManagement.menuItem.activatedAt",
                    "order": 20,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.ws20_activatedAt"
                  },
                  {
                    "id": "ws30_inactivatedAt",
                    "field": "inactivatedAt",
                    "labelKey": "menuManagement.menuItem.inactivatedAt",
                    "order": 30,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.ws30_inactivatedAt"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "i50_edit",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "menuManagement.detail.edit.title",
                "submitAction": "manageMenuItem",
                "fields": [
                  {
                    "id": "f10_name",
                    "field": "name",
                    "labelKey": "menuManagement.menuItem.name",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "f20_description",
                    "field": "description",
                    "labelKey": "menuManagement.menuItem.description",
                    "order": 20,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "f30_category",
                    "field": "menuCategoryId",
                    "labelKey": "menuManagement.menuItem.menuCategoryId",
                    "order": 30,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId"
                  },
                  {
                    "id": "f40_price",
                    "field": "price",
                    "labelKey": "menuManagement.menuItem.price",
                    "order": 40,
                    "required": true,
                    "inputType": "money",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "f50_itemType",
                    "field": "itemType",
                    "labelKey": "menuManagement.menuItem.itemType",
                    "order": 50,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  },
                  {
                    "id": "f60_status",
                    "field": "status",
                    "labelKey": "menuManagement.menuItem.status",
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
                    "id": "a10_submit",
                    "action": "manageMenuItem",
                    "labelKey": "menuManagement.action.save",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "manageMenuItem"
                  }
                ]
              },
              {
                "id": "i60_review",
                "intent": "summary",
                "order": 30,
                "titleKey": "menuManagement.detail.review.title",
                "fields": [
                  {
                    "id": "r10_name",
                    "field": "name",
                    "labelKey": "menuManagement.menuItem.name",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "r20_category",
                    "field": "menuCategoryId",
                    "labelKey": "menuManagement.menuItem.menuCategoryId",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId"
                  },
                  {
                    "id": "r30_price",
                    "field": "price",
                    "labelKey": "menuManagement.menuItem.price",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "r40_status",
                    "field": "status",
                    "labelKey": "menuManagement.menuItem.status",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.menuManagement.input.manageMenuItem.status"
                  },
                  {
                    "id": "r50_updatedAt",
                    "field": "updatedAt",
                    "labelKey": "menuManagement.menuItem.updatedAt",
                    "order": 50,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.layout.r50_updatedAt"
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
      "id": "db10_browse",
      "source": "bffCommand",
      "entity": "MenuItem",
      "command": "browseMenuItems",
      "description": "Consultar itens do cardápio",
      "stateKey": "ui.menuManagement.data.browseMenuItems",
      "inputStateKeys": [
        "ui.menuManagement.input.browseMenuItems.statusFilter",
        "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
      ]
    },
    {
      "id": "db20_manage",
      "source": "bffCommand",
      "entity": "MenuItem",
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
    "id": "menuManagement__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/menuManagement.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/menuManagement.ts",
      "_102051_/l2/cafeFlow/web/contracts/menuManagement.defs.ts",
      "_102051_/l2/cafeFlow/web/contracts/menuManagement.ts",
      "_102051_/l2/designSystem.ts"
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
