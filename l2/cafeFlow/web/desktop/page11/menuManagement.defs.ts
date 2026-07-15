/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.defs.ts" enhancement="_blank"/>

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
      "id": "section-queue",
      "type": "section",
      "sectionName": "section-queue",
      "titleKey": "section.queue.title",
      "mode": "queue",
      "order": 1,
      "organisms": [
        {
          "id": "org-menu-item-queue",
          "type": "organism",
          "organismName": "MenuItemQueue",
          "titleKey": "org.menu.item.queue.title",
          "purpose": "Listar itens do cardápio da empresa ativa com filtros por status e categoria, permitindo seleção para gerenciamento",
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
            "updatedAt",
            "statusFilter",
            "menuCategoryIdFilter"
          ],
          "writesFields": [],
          "rulesApplied": [
            "O backend resolve o escopo da consulta limitando os itens do cardápio à empresa ativa da sessão do gerente"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-queue-list",
              "intent": "queryList",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "section-manage",
      "type": "section",
      "sectionName": "section-manage",
      "titleKey": "section.manage.title",
      "mode": "command",
      "order": 2,
      "organisms": [
        {
          "id": "org-manage-item-form",
          "type": "organism",
          "organismName": "ManageItemForm",
          "titleKey": "org.manage.item.form.title",
          "purpose": "Formulário de gerenciamento do item do cardápio selecionado, permitindo editar dados e definir status do ciclo de vida",
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
            "status"
          ],
          "writesFields": [
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
          "rulesApplied": [
            "O tipo do item deve ser 'simple'",
            "Para ativar o item, deve existir pelo menos um ingrediente de estoque vinculado",
            "Transições de status: rascunho -> ativo -> inativo",
            "updatedAt é atualizado automaticamente; activatedAt ou inactivatedAt conforme o status"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-manage-form",
              "intent": "commandForm",
              "stateKey": "ui.menuManagement.action.manageMenuItem.status",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "section-review",
      "type": "section",
      "sectionName": "section-review",
      "titleKey": "section.review.title",
      "mode": "review",
      "order": 3,
      "organisms": [
        {
          "id": "org-review-summary",
          "type": "organism",
          "organismName": "ReviewSummary",
          "titleKey": "org.review.summary.title",
          "purpose": "Exibir o resultado da última operação de gerenciamento de item do cardápio",
          "userActions": [],
          "requiredEntities": [
            "MenuItem"
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
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-review-summary",
              "intent": "summary",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "workflow_queue",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "page11-workflow_queue",
    "type": "page",
    "sections": [
      {
        "id": "section-queue",
        "type": "section",
        "sectionName": "section-queue",
        "titleKey": "section.queue.title",
        "mode": "queue",
        "order": 1,
        "organisms": [
          {
            "id": "org-menu-item-queue",
            "type": "organism",
            "organismName": "MenuItemQueue",
            "titleKey": "org.menu.item.queue.title",
            "purpose": "Listar itens do cardápio da empresa ativa com filtros por status e categoria, permitindo seleção para gerenciamento",
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
              "updatedAt",
              "statusFilter",
              "menuCategoryIdFilter"
            ],
            "writesFields": [],
            "rulesApplied": [
              "O backend resolve o escopo da consulta limitando os itens do cardápio à empresa ativa da sessão do gerente"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-queue-list",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.queue.title",
                "source": "ui.menuManagement.data.browseMenuItems",
                "binding": "browseMenuItems",
                "emptyKey": "section.queue.empty",
                "displayHint": "Group items by status when lifecycle stages are clear; show status badge prominently",
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
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "column.menuCategoryId.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-price",
                    "field": "price",
                    "labelKey": "column.price.label",
                    "order": 3,
                    "required": false,
                    "inputType": "number",
                    "format": "currency",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-itemType",
                    "field": "itemType",
                    "labelKey": "column.itemType.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-activatedAt",
                    "field": "activatedAt",
                    "labelKey": "column.activatedAt.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "column.updatedAt.label",
                    "order": 7,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "filter-status",
                    "field": "statusFilter",
                    "labelKey": "filter.statusFilter.label",
                    "order": 1,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "filter-category",
                    "field": "menuCategoryIdFilter",
                    "labelKey": "filter.menuCategoryIdFilter.label",
                    "order": 2,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
                  }
                ],
                "toolbar": [
                  {
                    "id": "toolbar-refresh",
                    "action": "browseMenuItems",
                    "labelKey": "action.refresh.label",
                    "order": 1,
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
        "id": "section-manage",
        "type": "section",
        "sectionName": "section-manage",
        "titleKey": "section.manage.title",
        "mode": "command",
        "order": 2,
        "organisms": [
          {
            "id": "org-manage-item-form",
            "type": "organism",
            "organismName": "ManageItemForm",
            "titleKey": "org.manage.item.form.title",
            "purpose": "Formulário de gerenciamento do item do cardápio selecionado, permitindo editar dados e definir status do ciclo de vida",
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
              "status"
            ],
            "writesFields": [
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
            "rulesApplied": [
              "O tipo do item deve ser 'simple'",
              "Para ativar o item, deve existir pelo menos um ingrediente de estoque vinculado",
              "Transições de status: rascunho -> ativo -> inativo",
              "updatedAt é atualizado automaticamente; activatedAt ou inactivatedAt conforme o status"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-manage-form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.manage.title",
                "binding": "manageMenuItem",
                "displayHint": "Pre-populate from selected entity; show current status before transition; status is lifecycle transition not free edit",
                "stateKey": "ui.menuManagement.action.manageMenuItem.status",
                "fields": [
                  {
                    "id": "field-menuItemId",
                    "field": "menuItemId",
                    "labelKey": "field.menuItemId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuItemId"
                  },
                  {
                    "id": "field-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "field-description",
                    "field": "description",
                    "labelKey": "field.description.label",
                    "order": 3,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "field-menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId.label",
                    "order": 4,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId"
                  },
                  {
                    "id": "field-price",
                    "field": "price",
                    "labelKey": "field.price.label",
                    "order": 5,
                    "required": true,
                    "inputType": "number",
                    "format": "currency",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "field-itemType",
                    "field": "itemType",
                    "labelKey": "field.itemType.label",
                    "order": 6,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  },
                  {
                    "id": "field-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 7,
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
                    "id": "action-submit-manage",
                    "action": "manageMenuItem",
                    "labelKey": "action.manageMenuItem.submit",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "manageMenuItem"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "section-review",
        "type": "section",
        "sectionName": "section-review",
        "titleKey": "section.review.title",
        "mode": "review",
        "order": 3,
        "organisms": [
          {
            "id": "org-review-summary",
            "type": "organism",
            "organismName": "ReviewSummary",
            "titleKey": "org.review.summary.title",
            "purpose": "Exibir o resultado da última operação de gerenciamento de item do cardápio",
            "userActions": [],
            "requiredEntities": [
              "MenuItem"
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
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent-review-summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "section.review.title",
                "source": "ui.menuManagement.output.manageMenuItem",
                "emptyKey": "section.review.empty",
                "displayHint": "Read-only summary of last manageMenuItem output; show lifecycle timestamps contextually",
                "fields": [],
                "columns": [
                  {
                    "id": "rev-col-menuItemId",
                    "field": "menuItemId",
                    "labelKey": "column.menuItemId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "rev-col-name",
                    "field": "name",
                    "labelKey": "column.name.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "rev-col-description",
                    "field": "description",
                    "labelKey": "column.description.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "rev-col-menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "column.menuCategoryId.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "rev-col-price",
                    "field": "price",
                    "labelKey": "column.price.label",
                    "order": 5,
                    "required": false,
                    "inputType": "number",
                    "format": "currency"
                  },
                  {
                    "id": "rev-col-itemType",
                    "field": "itemType",
                    "labelKey": "column.itemType.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "rev-col-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 7,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "rev-col-activatedAt",
                    "field": "activatedAt",
                    "labelKey": "column.activatedAt.label",
                    "order": 8,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime"
                  },
                  {
                    "id": "rev-col-inactivatedAt",
                    "field": "inactivatedAt",
                    "labelKey": "column.inactivatedAt.label",
                    "order": 9,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime"
                  },
                  {
                    "id": "rev-col-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "column.updatedAt.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime"
                  }
                ],
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
      "id": "browseMenuItemsBinding",
      "source": "query",
      "entity": "MenuItem",
      "command": "browseMenuItems",
      "description": "Consulta itens do cardápio da empresa ativa com filtros opcionais por status e categoria",
      "stateKey": "ui.menuManagement.data.browseMenuItems",
      "inputStateKeys": [
        "ui.menuManagement.input.browseMenuItems.statusFilter",
        "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
      ]
    },
    {
      "id": "manageMenuItemBinding",
      "source": "command",
      "entity": "MenuItem",
      "command": "manageMenuItem",
      "description": "Comando de gerenciamento de item do cardápio: cria ou atualiza nome, descrição, categoria, preço, tipo e status",
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
    "id": "menuManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.defs.ts",
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
