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
      "id": "sec-discover",
      "type": "section",
      "sectionName": "sec-discover",
      "titleKey": "sec.discover.title",
      "mode": "queue",
      "order": 1,
      "organisms": [
        {
          "id": "org-menuItemsQueue",
          "type": "organism",
          "organismName": "menuItemsQueue",
          "titleKey": "org.menuItemsQueue.title",
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
          "writesFields": [
            "statusFilter",
            "menuCategoryIdFilter",
            "menuItemId"
          ],
          "rulesApplied": [
            "activeCompanyId scope limits query to active company"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-queryList",
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
      "id": "sec-execute",
      "type": "section",
      "sectionName": "sec-execute",
      "titleKey": "sec.execute.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-manageMenuItemForm",
          "type": "organism",
          "organismName": "manageMenuItemForm",
          "titleKey": "org.manageMenuItemForm.title",
          "purpose": "Editar campos do item do cardápio selecionado e definir status do ciclo de vida (rascunho, ativo, inativo)",
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
            "status"
          ],
          "rulesApplied": [
            "itemType must be simple",
            "active status requires at least one linked ingredient"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-commandForm",
              "intent": "commandForm",
              "stateKey": "ui.menuManagement.action.manageMenuItem.status",
              "action": "manageMenuItem",
              "submitAction": "manageMenuItem",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-review",
      "type": "section",
      "sectionName": "sec-review",
      "titleKey": "sec.review.title",
      "mode": "summary",
      "order": 3,
      "organisms": [
        {
          "id": "org-mutationFeedback",
          "type": "organism",
          "organismName": "mutationFeedback",
          "titleKey": "org.mutationFeedback.title",
          "purpose": "Exibir feedback textual da operação de gerenciamento de item do cardápio",
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
              "id": "int-summary",
              "intent": "summary",
              "stateKey": "ui.menuManagement.action.manageMenuItem.status",
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
        "id": "sec-discover",
        "type": "section",
        "sectionName": "sec-discover",
        "titleKey": "sec.discover.title",
        "mode": "queue",
        "order": 1,
        "organisms": [
          {
            "id": "org-menuItemsQueue",
            "type": "organism",
            "organismName": "menuItemsQueue",
            "titleKey": "org.menuItemsQueue.title",
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
            "writesFields": [
              "statusFilter",
              "menuCategoryIdFilter",
              "menuItemId"
            ],
            "rulesApplied": [
              "activeCompanyId scope limits query to active company"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-queryList",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.queryList.title",
                "source": "ui.menuManagement.data.browseMenuItems",
                "binding": "browseMenuItems",
                "action": "browseMenuItems",
                "emptyKey": "empty.queue",
                "stateKey": "ui.menuManagement.data.browseMenuItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col-name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-description",
                    "field": "description",
                    "labelKey": "field.description.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-price",
                    "field": "price",
                    "labelKey": "field.price.label",
                    "order": 4,
                    "required": false,
                    "inputType": "number",
                    "format": "currency",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-itemType",
                    "field": "itemType",
                    "labelKey": "field.itemType.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-activatedAt",
                    "field": "activatedAt",
                    "labelKey": "field.activatedAt.label",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "format": "date",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 8,
                    "required": false,
                    "inputType": "datetime",
                    "format": "date",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "flt-statusFilter",
                    "field": "statusFilter",
                    "labelKey": "field.statusFilter.label",
                    "order": 1,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "flt-menuCategoryIdFilter",
                    "field": "menuCategoryIdFilter",
                    "labelKey": "field.menuCategoryIdFilter.label",
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
                    "displayHint": "icon",
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
        "id": "sec-execute",
        "type": "section",
        "sectionName": "sec-execute",
        "titleKey": "sec.execute.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-manageMenuItemForm",
            "type": "organism",
            "organismName": "manageMenuItemForm",
            "titleKey": "org.manageMenuItemForm.title",
            "purpose": "Editar campos do item do cardápio selecionado e definir status do ciclo de vida (rascunho, ativo, inativo)",
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
              "status"
            ],
            "rulesApplied": [
              "itemType must be simple",
              "active status requires at least one linked ingredient"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-commandForm",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.commandForm.title",
                "source": "ui.menuManagement.output.manageMenuItem",
                "binding": "manageMenuItem",
                "action": "manageMenuItem",
                "submitAction": "manageMenuItem",
                "emptyKey": "empty.form",
                "stateKey": "ui.menuManagement.action.manageMenuItem.status",
                "fields": [
                  {
                    "id": "fld-menuItemId",
                    "field": "menuItemId",
                    "labelKey": "field.menuItemId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "hidden",
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
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "fld-description",
                    "field": "description",
                    "labelKey": "field.description.label",
                    "order": 3,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "fld-menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId.label",
                    "order": 4,
                    "required": true,
                    "inputType": "select",
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
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "fld-itemType",
                    "field": "itemType",
                    "labelKey": "field.itemType.label",
                    "order": 6,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  },
                  {
                    "id": "fld-status",
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
                    "id": "act-submit",
                    "action": "manageMenuItem",
                    "labelKey": "action.manageMenuItem.label",
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
        "id": "sec-review",
        "type": "section",
        "sectionName": "sec-review",
        "titleKey": "sec.review.title",
        "mode": "summary",
        "order": 3,
        "organisms": [
          {
            "id": "org-mutationFeedback",
            "type": "organism",
            "organismName": "mutationFeedback",
            "titleKey": "org.mutationFeedback.title",
            "purpose": "Exibir feedback textual da operação de gerenciamento de item do cardápio",
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
                "id": "int-summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "intention.summary.title",
                "source": "ui.menuManagement.output.manageMenuItem",
                "emptyKey": "empty.summary",
                "stateKey": "ui.menuManagement.action.manageMenuItem.status",
                "fields": [],
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
      "source": "cafeFlow.menuItemLifecycle.browseMenuItems",
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
      "id": "bind-manageMenuItem",
      "source": "cafeFlow.menuItemLifecycle.manageMenuItem",
      "entity": "MenuItem",
      "command": "manageMenuItem",
      "description": "Gerencia item do cardápio: cria ou atualiza nome, descrição, categoria, preço, tipo e status",
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
