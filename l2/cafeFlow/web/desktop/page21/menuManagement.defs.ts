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
      "id": "sec-menu-items",
      "type": "section",
      "sectionName": "sec-menu-items",
      "titleKey": "sec.menu.items.title",
      "mode": "query",
      "order": 1,
      "organisms": [
        {
          "id": "org-menu-items-list",
          "type": "organism",
          "organismName": "MenuItemsList",
          "titleKey": "org.menu.items.list.title",
          "purpose": "Listar itens do cardápio da empresa ativa com filtros por status e categoria, permitindo seleção para edição",
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
            "Backend resolve o escopo da consulta limitando os itens à empresa ativa da sessão do gerente"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-browse-menu-items",
              "intent": "query",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-manage-item",
      "type": "section",
      "sectionName": "sec-manage-item",
      "titleKey": "sec.manage.item.title",
      "mode": "command",
      "order": 2,
      "organisms": [
        {
          "id": "org-menu-item-form",
          "type": "organism",
          "organismName": "MenuItemForm",
          "titleKey": "org.menu.item.form.title",
          "purpose": "Editar dados do item selecionado e realizar transições de status (ativar/inativar) com ações contextuais",
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
            "Tipo do item deve ser 'simple'",
            "Para ativar, deve existir pelo menos um ingrediente de estoque vinculado",
            "Persistência atualiza updatedAt e, conforme status, activatedAt ou inactivatedAt"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-manage-menu-item",
              "intent": "command",
              "stateKey": "ui.menuManagement.action.manageMenuItem.status",
              "submitAction": "manageMenuItem",
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
    "actor": "Gerente do café (cafe manager)",
    "jobToBeDone": "Gerenciar itens do cardápio criando, editando e ativando/inativando itens para disponibilizá-los ou removê-los do POS",
    "primaryDecision": "Decidir o status do item (rascunho → ativo → inativo) e editar seus dados comerciais (nome, categoria, preço, tipo)",
    "decisiveInfo": [
      "name",
      "menuCategoryId",
      "price",
      "itemType",
      "status"
    ],
    "usageFrequency": "occasional/back-office — gerente acessa para criar novos itens ou ajustar o cardápio existente",
    "criticalActions": [
      {
        "action": "manageMenuItem (save edits)",
        "presentation": "primary-button"
      },
      {
        "action": "activate transition (draft/inactive → active)",
        "presentation": "contextual-transition-actions"
      },
      {
        "action": "inactivate transition (active → inactive)",
        "presentation": "contextual-transition-actions"
      },
      {
        "action": "new item (clear selection)",
        "presentation": "primary-button"
      }
    ],
    "informationHierarchy": [
      "Lista de itens com filtros por status e categoria (master)",
      "Item selecionado com dados editáveis (detail)",
      "Status atual exibido como contexto read-only",
      "Botões de transição de status contextuais (ativar/inativar)",
      "Feedback de sucesso/erro da operação"
    ],
    "successCriteria": "Gerente localiza rapidamente itens por status/categoria, edita dados em painel contextual e ativa/inativa com um clique, recebendo feedback claro",
    "antiPatterns": [
      "Status renderizado como select livre sobre todo o enum",
      "menuItemId digitado manualmente pelo usuário",
      "Formulário de edição separado da lista em outra tela",
      "Timestamps (activatedAt, inactivatedAt, updatedAt) expostos como inputs editáveis",
      "Mostrar todos os campos do item no card da lista sobrecarregando a leitura"
    ]
  },
  "msgKeys": [
    "action.activate.label",
    "action.inactivate.label",
    "action.manageMenuItem.error",
    "action.manageMenuItem.success",
    "action.newItem.label",
    "action.refresh.label",
    "action.save.label",
    "action.selectItem.label",
    "column.itemType.label",
    "column.menuCategoryId.label",
    "column.name.label",
    "column.price.label",
    "column.status.label",
    "field.description.label",
    "field.itemType.label",
    "field.menuCategoryId.label",
    "field.menuItemId.label",
    "field.name.label",
    "field.price.label",
    "field.status.label",
    "filter.menuCategoryIdFilter.label",
    "filter.statusFilter.label",
    "org.menu.item.form.title",
    "org.menu.items.list.title",
    "sec.manage.item.title",
    "sec.menu.items.title",
    "section.manageMenuItem.empty",
    "section.manageMenuItem.title",
    "section.menuItems.empty",
    "section.menuItems.title"
  ],
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "sec-menu-items",
        "type": "section",
        "sectionName": "sec-menu-items",
        "titleKey": "sec.menu.items.title",
        "mode": "query",
        "order": 1,
        "organisms": [
          {
            "id": "org-menu-items-list",
            "type": "organism",
            "organismName": "MenuItemsList",
            "titleKey": "org.menu.items.list.title",
            "purpose": "Listar itens do cardápio da empresa ativa com filtros por status e categoria, permitindo seleção para edição",
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
              "Backend resolve o escopo da consulta limitando os itens à empresa ativa da sessão do gerente"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-browse-menu-items",
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
                    "id": "col-name",
                    "field": "name",
                    "labelKey": "column.name.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-menu-category",
                    "field": "menuCategoryId",
                    "labelKey": "column.menuCategoryId.label",
                    "order": 2,
                    "required": false,
                    "inputType": "select",
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
                    "id": "col-item-type",
                    "field": "itemType",
                    "labelKey": "column.itemType.label",
                    "order": 4,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "column.status.label",
                    "order": 5,
                    "required": false,
                    "inputType": "select",
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
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "flt-category",
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
                    "id": "tb-refresh",
                    "action": "browseMenuItems",
                    "labelKey": "action.refresh.label",
                    "order": 1,
                    "displayHint": "inline-row-command",
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
        "id": "sec-manage-item",
        "type": "section",
        "sectionName": "sec-manage-item",
        "titleKey": "sec.manage.item.title",
        "mode": "command",
        "order": 2,
        "organisms": [
          {
            "id": "org-menu-item-form",
            "type": "organism",
            "organismName": "MenuItemForm",
            "titleKey": "org.menu.item.form.title",
            "purpose": "Editar dados do item selecionado e realizar transições de status (ativar/inativar) com ações contextuais",
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
              "Tipo do item deve ser 'simple'",
              "Para ativar, deve existir pelo menos um ingrediente de estoque vinculado",
              "Persistência atualiza updatedAt e, conforme status, activatedAt ou inactivatedAt"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-manage-menu-item",
                "intent": "command",
                "order": 1,
                "titleKey": "section.manageMenuItem.title",
                "source": "manageMenuItem",
                "binding": "ui.menuManagement.output.manageMenuItem",
                "submitAction": "manageMenuItem",
                "emptyKey": "section.manageMenuItem.empty",
                "displayHint": "contextual-transition-actions",
                "stateKey": "ui.menuManagement.action.manageMenuItem.status",
                "fields": [
                  {
                    "id": "fld-menu-item-id",
                    "field": "menuItemId",
                    "labelKey": "field.menuItemId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "readonly",
                    "source": "selectedEntity",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuItemId"
                  },
                  {
                    "id": "fld-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "fld-description",
                    "field": "description",
                    "labelKey": "field.description.label",
                    "order": 3,
                    "required": false,
                    "inputType": "textarea",
                    "source": "userInput",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "fld-menu-category-id",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId.label",
                    "order": 4,
                    "required": true,
                    "inputType": "select",
                    "source": "userInput",
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
                    "source": "userInput",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "fld-item-type",
                    "field": "itemType",
                    "labelKey": "field.itemType.label",
                    "order": 6,
                    "required": true,
                    "inputType": "select",
                    "source": "userInput",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  },
                  {
                    "id": "fld-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 7,
                    "required": false,
                    "inputType": "readonly",
                    "source": "systemOwned",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.status"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-save",
                    "action": "manageMenuItem",
                    "labelKey": "action.save.label",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "manageMenuItem"
                  },
                  {
                    "id": "act-activate",
                    "action": "manageMenuItem",
                    "labelKey": "action.activate.label",
                    "order": 2,
                    "displayHint": "contextual-transition-actions",
                    "actionKey": "manageMenuItem"
                  },
                  {
                    "id": "act-inactivate",
                    "action": "manageMenuItem",
                    "labelKey": "action.inactivate.label",
                    "order": 3,
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
      "id": "db-browse-menu-items",
      "source": "browseMenuItems",
      "entity": "MenuItem",
      "command": "browseMenuItems",
      "description": "Lista itens do cardápio da empresa ativa com filtros por status e categoria",
      "stateKey": "ui.menuManagement.data.browseMenuItems",
      "inputStateKeys": [
        "ui.menuManagement.input.browseMenuItems.statusFilter",
        "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
      ]
    },
    {
      "id": "db-manage-menu-item",
      "source": "manageMenuItem",
      "entity": "MenuItem",
      "command": "manageMenuItem",
      "description": "Cria ou atualiza item do cardápio com validação de tipo e ingrediente vinculado",
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
      "_102051_/l2/cafeFlow/web/shared/menuManagement.ts",
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
