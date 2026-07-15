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
      "id": "sec-board",
      "type": "section",
      "sectionName": "sec-board",
      "titleKey": "sec.board.title",
      "mode": "kanban",
      "order": 1,
      "organisms": [
        {
          "id": "org-kanban-board",
          "type": "organism",
          "organismName": "kanbanBoard",
          "titleKey": "org.kanban.board.title",
          "purpose": "Exibir itens do cardápio agrupados por status (rascunho, ativo, inativo) em colunas kanban, permitindo filtragem e seleção para gerenciamento.",
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
          "writesFields": [
            "statusFilter",
            "menuCategoryIdFilter",
            "menuItemId"
          ],
          "rulesApplied": [
            "activeCompanyId scope: backend resolves query to active company",
            "lifecycle states: draft, active, inactive define lane grouping",
            "card selection sets selectedEntity for manage form"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-browse-menu-items",
              "intent": "queryList",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "action": "browseMenuItems",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-detail",
      "type": "section",
      "sectionName": "sec-detail",
      "titleKey": "sec.detail.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-manage-form",
          "type": "organism",
          "organismName": "manageItemForm",
          "titleKey": "org.manage.form.title",
          "purpose": "Editar e gerenciar o item do cardápio selecionado, permitindo alterar dados e transicionar status entre rascunho, ativo e inativo.",
          "userActions": [
            "manageMenuItem"
          ],
          "requiredEntities": [
            "MenuItem",
            "MenuCategory",
            "MenuItemIngredient"
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
            "inactivatedAt",
            "updatedAt"
          ],
          "writesFields": [
            "menuItemId",
            "name",
            "description",
            "menuCategoryId",
            "price",
            "itemType",
            "status"
          ],
          "rulesApplied": [
            "itemType must be 'simple' for activation",
            "activation requires at least one MenuItemIngredient linked",
            "status transitions: draft->active->inactive (and back to draft)",
            "menuItemId is context-derived from selectedEntity, never typed manually",
            "updatedAt, activatedAt, inactivatedAt are system-owned, computed by backend"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-manage-menu-item",
              "intent": "commandForm",
              "stateKey": "ui.menuManagement.action.manageMenuItem.status",
              "action": "manageMenuItem",
              "submitAction": "manageMenuItem",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "kanban_pipeline",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "kanban_pipeline",
    "type": "page",
    "sections": [
      {
        "id": "sec-board",
        "type": "section",
        "sectionName": "sec-board",
        "titleKey": "sec.board.title",
        "mode": "kanban",
        "order": 1,
        "organisms": [
          {
            "id": "org-kanban-board",
            "type": "organism",
            "organismName": "kanbanBoard",
            "titleKey": "org.kanban.board.title",
            "purpose": "Exibir itens do cardápio agrupados por status (rascunho, ativo, inativo) em colunas kanban, permitindo filtragem e seleção para gerenciamento.",
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
            "writesFields": [
              "statusFilter",
              "menuCategoryIdFilter",
              "menuItemId"
            ],
            "rulesApplied": [
              "activeCompanyId scope: backend resolves query to active company",
              "lifecycle states: draft, active, inactive define lane grouping",
              "card selection sets selectedEntity for manage form"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-browse-menu-items",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.browse.title",
                "source": "ui.menuManagement.data.browseMenuItems",
                "binding": "browseMenuItems",
                "action": "browseMenuItems",
                "emptyKey": "empty.board",
                "displayHint": "kanban-lanes-grouped-by-status: draft, active, inactive",
                "stateKey": "ui.menuManagement.data.browseMenuItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col-name",
                    "field": "name",
                    "labelKey": "column.name.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-price",
                    "field": "price",
                    "labelKey": "column.price.label",
                    "order": 2,
                    "required": false,
                    "inputType": "number",
                    "format": "currency",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-item-type",
                    "field": "itemType",
                    "labelKey": "column.itemType.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-menu-category-id",
                    "field": "menuCategoryId",
                    "labelKey": "column.menuCategoryId.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "flt-status",
                    "field": "statusFilter",
                    "labelKey": "filter.statusFilter.label",
                    "order": 1,
                    "required": false,
                    "inputType": "select",
                    "source": "ui.menuManagement.input.browseMenuItems.statusFilter",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "flt-menu-category",
                    "field": "menuCategoryIdFilter",
                    "labelKey": "filter.menuCategoryIdFilter.label",
                    "order": 2,
                    "required": false,
                    "inputType": "select",
                    "source": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb-refresh",
                    "action": "browseMenuItems",
                    "labelKey": "action.browseMenuItems.label",
                    "order": 1,
                    "displayHint": "icon-button",
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
        "id": "sec-detail",
        "type": "section",
        "sectionName": "sec-detail",
        "titleKey": "sec.detail.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-manage-form",
            "type": "organism",
            "organismName": "manageItemForm",
            "titleKey": "org.manage.form.title",
            "purpose": "Editar e gerenciar o item do cardápio selecionado, permitindo alterar dados e transicionar status entre rascunho, ativo e inativo.",
            "userActions": [
              "manageMenuItem"
            ],
            "requiredEntities": [
              "MenuItem",
              "MenuCategory",
              "MenuItemIngredient"
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
              "inactivatedAt",
              "updatedAt"
            ],
            "writesFields": [
              "menuItemId",
              "name",
              "description",
              "menuCategoryId",
              "price",
              "itemType",
              "status"
            ],
            "rulesApplied": [
              "itemType must be 'simple' for activation",
              "activation requires at least one MenuItemIngredient linked",
              "status transitions: draft->active->inactive (and back to draft)",
              "menuItemId is context-derived from selectedEntity, never typed manually",
              "updatedAt, activatedAt, inactivatedAt are system-owned, computed by backend"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-manage-menu-item",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.manage.title",
                "binding": "manageMenuItem",
                "action": "manageMenuItem",
                "submitAction": "manageMenuItem",
                "emptyKey": "empty.detail",
                "displayHint": "form-panel-with-status-transition-select",
                "stateKey": "ui.menuManagement.action.manageMenuItem.status",
                "fields": [
                  {
                    "id": "fld-menu-item-id",
                    "field": "menuItemId",
                    "labelKey": "field.menuItemId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "source": "ui.menuManagement.input.manageMenuItem.menuItemId",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuItemId"
                  },
                  {
                    "id": "fld-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "source": "ui.menuManagement.input.manageMenuItem.name",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "fld-description",
                    "field": "description",
                    "labelKey": "field.description.label",
                    "order": 3,
                    "required": false,
                    "inputType": "textarea",
                    "source": "ui.menuManagement.input.manageMenuItem.description",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "fld-menu-category-id",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId.label",
                    "order": 4,
                    "required": true,
                    "inputType": "select",
                    "source": "ui.menuManagement.input.manageMenuItem.menuCategoryId",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId"
                  },
                  {
                    "id": "fld-price",
                    "field": "price",
                    "labelKey": "field.price.label",
                    "order": 5,
                    "required": true,
                    "inputType": "number",
                    "format": "currency",
                    "source": "ui.menuManagement.input.manageMenuItem.price",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "fld-item-type",
                    "field": "itemType",
                    "labelKey": "field.itemType.label",
                    "order": 6,
                    "required": true,
                    "inputType": "select",
                    "source": "ui.menuManagement.input.manageMenuItem.itemType",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  },
                  {
                    "id": "fld-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 7,
                    "required": true,
                    "inputType": "select",
                    "source": "ui.menuManagement.input.manageMenuItem.status",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.status"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submit-manage",
                    "action": "manageMenuItem",
                    "labelKey": "action.manageMenuItem.label",
                    "order": 1,
                    "displayHint": "primary-submit",
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
      "id": "binding-browse-menu-items",
      "source": "query",
      "entity": "MenuItem",
      "command": "browseMenuItems",
      "description": "Consulta itens do cardápio da empresa ativa, com filtros opcionais por status e categoria",
      "stateKey": "ui.menuManagement.data.browseMenuItems",
      "inputStateKeys": [
        "ui.menuManagement.input.browseMenuItems.statusFilter",
        "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
      ]
    },
    {
      "id": "binding-manage-menu-item",
      "source": "command",
      "entity": "MenuItem",
      "command": "manageMenuItem",
      "description": "Persiste alterações no item do cardápio selecionado, incluindo dados e transição de status",
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
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
