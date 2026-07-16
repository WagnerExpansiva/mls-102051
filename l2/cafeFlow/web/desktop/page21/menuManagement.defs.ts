/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "menuManagement",
  "pageName": "Gestão de cardápio",
  "baseClassName": "CafeFlowMenuManagementBase",
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
      "id": "sec_menuItemsList",
      "type": "section",
      "sectionName": "Menu Items List",
      "titleKey": "section.menuItems.title",
      "mode": "list",
      "order": 1,
      "organisms": [
        {
          "id": "org_menuItemsBrowser",
          "type": "organism",
          "organismName": "Menu Items Browser",
          "titleKey": "org.menuItemsBrowser.title",
          "purpose": "Listar e filtrar itens do cardápio por status e categoria, permitindo seleção para edição no painel de detalhe",
          "userActions": [
            "browseMenuItems"
          ],
          "requiredEntities": [
            "MenuItem",
            "MenuCategory"
          ],
          "readsFields": [
            "statusFilter",
            "menuCategoryIdFilter",
            "menuItemId",
            "name",
            "menuCategoryId",
            "price",
            "itemType",
            "status"
          ],
          "writesFields": [
            "statusFilter",
            "menuCategoryIdFilter",
            "menuItemId"
          ],
          "rulesApplied": [
            "activeCompanyId scope limits items to active company",
            "status filter narrows by lifecycle state",
            "category filter narrows by menu category"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_browseMenuItems",
              "intent": "query",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_menuItemDetail",
      "type": "section",
      "sectionName": "Menu Item Detail",
      "titleKey": "section.menuItemEditor.title",
      "mode": "detail",
      "order": 2,
      "organisms": [
        {
          "id": "org_menuItemEditor",
          "type": "organism",
          "organismName": "Menu Item Editor",
          "titleKey": "org.menuItemEditor.title",
          "purpose": "Criar ou editar um item do cardápio com transições de status contextuais (ativar, inativar, rascunho)",
          "userActions": [
            "manageMenuItem"
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
            "itemType must be simple for activation",
            "active status requires at least one ingredient linked",
            "status transitions: draft->active, active->inactive, inactive->active",
            "activatedAt and inactivatedAt are system-set on transition"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_manageMenuItem",
              "intent": "command",
              "stateKey": "ui.menuManagement.action.manageMenuItem.status",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "goal_first",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "pageObjective": {
    "actor": "Gerente do café",
    "jobToBeDone": "Gerenciar itens do cardápio criando, editando e ativando/inativando itens para manter o menu do POS atualizado",
    "primaryDecision": "Decidir o status de cada item do cardápio (rascunho, ativo, inativo) e editar suas informações comerciais (nome, categoria, preço, tipo)",
    "decisiveInfo": [
      "name",
      "price",
      "menuCategoryId",
      "itemType",
      "status"
    ],
    "usageFrequency": "occasional/back-office — o gerente acessa algumas vezes por semana para ajustar o menu",
    "criticalActions": [
      {
        "action": "browseMenuItems",
        "presentation": "filterable list with status and category filters, master-detail selection"
      },
      {
        "action": "manageMenuItem",
        "presentation": "contextual-transition-actions for status changes (activate/inactivate/draft) + inline form for editing commercial fields"
      }
    ],
    "informationHierarchy": [
      "Filtered list of menu items with status badges and key commercial fields",
      "Selected item detail panel with editable form fields",
      "Contextual status transition buttons (Ativar / Inativar / Rascunho) positioned next to the form"
    ],
    "successCriteria": "Manager can find items by status/category at a glance, see the current lifecycle state of each item, edit commercial details inline, and transition status with one click — without typing IDs or selecting from a free status dropdown",
    "antiPatterns": [
      "separate transition form for status changes",
      "free status <select> over all enum values",
      "manually typed menuItemId",
      "showing system timestamps (activatedAt, inactivatedAt, updatedAt) as editable fields",
      "stacking a full form below the list instead of master-detail contextual panel"
    ]
  },
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "sec_menuItemsList",
        "type": "section",
        "sectionName": "Menu Items List",
        "titleKey": "section.menuItems.title",
        "mode": "list",
        "order": 1,
        "organisms": [
          {
            "id": "org_menuItemsBrowser",
            "type": "organism",
            "organismName": "Menu Items Browser",
            "titleKey": "org.menuItemsBrowser.title",
            "purpose": "Listar e filtrar itens do cardápio por status e categoria, permitindo seleção para edição no painel de detalhe",
            "userActions": [
              "browseMenuItems"
            ],
            "requiredEntities": [
              "MenuItem",
              "MenuCategory"
            ],
            "readsFields": [
              "statusFilter",
              "menuCategoryIdFilter",
              "menuItemId",
              "name",
              "menuCategoryId",
              "price",
              "itemType",
              "status"
            ],
            "writesFields": [
              "statusFilter",
              "menuCategoryIdFilter",
              "menuItemId"
            ],
            "rulesApplied": [
              "activeCompanyId scope limits items to active company",
              "status filter narrows by lifecycle state",
              "category filter narrows by menu category"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_browseMenuItems",
                "intent": "query",
                "order": 1,
                "titleKey": "section.menuItems.title",
                "source": "browseMenuItems",
                "binding": "ui.menuManagement.data.browseMenuItems",
                "emptyKey": "section.menuItems.empty",
                "displayHint": "master-detail",
                "stateKey": "ui.menuManagement.data.browseMenuItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col_name",
                    "field": "name",
                    "labelKey": "column.name.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "column.menuCategoryId.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_price",
                    "field": "price",
                    "labelKey": "column.price.label",
                    "order": 3,
                    "required": false,
                    "inputType": "number",
                    "format": "currency",
                    "source": "browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_itemType",
                    "field": "itemType",
                    "labelKey": "column.itemType.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "flt_statusFilter",
                    "field": "statusFilter",
                    "labelKey": "filter.statusFilter.label",
                    "order": 1,
                    "required": false,
                    "inputType": "select",
                    "source": "set.browseMenuItemsStatusFilter",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "flt_menuCategoryIdFilter",
                    "field": "menuCategoryIdFilter",
                    "labelKey": "filter.menuCategoryIdFilter.label",
                    "order": 2,
                    "required": false,
                    "inputType": "select",
                    "source": "set.browseMenuItemsMenuCategoryIdFilter",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb_refresh",
                    "action": "browseMenuItems",
                    "labelKey": "action.refresh.label",
                    "order": 1,
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
        "id": "sec_menuItemDetail",
        "type": "section",
        "sectionName": "Menu Item Detail",
        "titleKey": "section.menuItemEditor.title",
        "mode": "detail",
        "order": 2,
        "organisms": [
          {
            "id": "org_menuItemEditor",
            "type": "organism",
            "organismName": "Menu Item Editor",
            "titleKey": "org.menuItemEditor.title",
            "purpose": "Criar ou editar um item do cardápio com transições de status contextuais (ativar, inativar, rascunho)",
            "userActions": [
              "manageMenuItem"
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
              "itemType must be simple for activation",
              "active status requires at least one ingredient linked",
              "status transitions: draft->active, active->inactive, inactive->active",
              "activatedAt and inactivatedAt are system-set on transition"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_manageMenuItem",
                "intent": "command",
                "order": 1,
                "titleKey": "section.menuItemEditor.title",
                "source": "manageMenuItem",
                "binding": "ui.menuManagement.output.manageMenuItem",
                "emptyKey": "section.menuItemEditor.empty",
                "displayHint": "contextual-transition-actions",
                "stateKey": "ui.menuManagement.action.manageMenuItem.status",
                "fields": [
                  {
                    "id": "fld_menuItemId",
                    "field": "menuItemId",
                    "labelKey": "field.menuItemId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "hidden",
                    "source": "set.manageMenuItemMenuItemId",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuItemId"
                  },
                  {
                    "id": "fld_name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "source": "set.manageMenuItemName",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "fld_description",
                    "field": "description",
                    "labelKey": "field.description.label",
                    "order": 3,
                    "required": false,
                    "inputType": "textarea",
                    "source": "set.manageMenuItemDescription",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "fld_menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId.label",
                    "order": 4,
                    "required": true,
                    "inputType": "select",
                    "source": "set.manageMenuItemMenuCategoryId",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId"
                  },
                  {
                    "id": "fld_price",
                    "field": "price",
                    "labelKey": "field.price.label",
                    "order": 5,
                    "required": true,
                    "inputType": "number",
                    "format": "currency",
                    "source": "set.manageMenuItemPrice",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "fld_itemType",
                    "field": "itemType",
                    "labelKey": "field.itemType.label",
                    "order": 6,
                    "required": true,
                    "inputType": "select",
                    "source": "set.manageMenuItemItemType",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_save",
                    "action": "manageMenuItem",
                    "labelKey": "action.save.label",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "manageMenuItem"
                  },
                  {
                    "id": "act_activate",
                    "action": "manageMenuItem",
                    "labelKey": "action.activate.label",
                    "order": 2,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "manageMenuItem"
                  },
                  {
                    "id": "act_inactivate",
                    "action": "manageMenuItem",
                    "labelKey": "action.inactivate.label",
                    "order": 3,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "manageMenuItem"
                  },
                  {
                    "id": "act_draft",
                    "action": "manageMenuItem",
                    "labelKey": "action.draft.label",
                    "order": 4,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "manageMenuItem"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "bind_browseMenuItems",
      "source": "cafeFlow.menuItemLifecycle.browseMenuItems",
      "entity": "MenuItem",
      "command": "browseMenuItems",
      "description": "Consulta itens do cardápio da empresa ativa com filtros opcionais de status e categoria",
      "stateKey": "ui.menuManagement.data.browseMenuItems",
      "inputStateKeys": [
        "ui.menuManagement.input.browseMenuItems.statusFilter",
        "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
      ]
    },
    {
      "id": "bind_manageMenuItem",
      "source": "cafeFlow.menuItemLifecycle.manageMenuItem",
      "entity": "MenuItem",
      "command": "manageMenuItem",
      "description": "Cria ou atualiza um item do cardápio com nome, descrição, categoria, preço, tipo e status",
      "stateKey": "ui.menuManagement.output.manageMenuItem",
      "inputStateKeys": [
        "ui.menuManagement.input.manageMenuItem.menuItemId",
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
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
