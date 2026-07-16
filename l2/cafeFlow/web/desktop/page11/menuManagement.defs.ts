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
      "id": "section_queue",
      "type": "section",
      "sectionName": "section_queue",
      "titleKey": "section.queue.title",
      "mode": "queue",
      "order": 1,
      "organisms": [
        {
          "id": "organism_menuItemsQueue",
          "type": "organism",
          "organismName": "menuItemsQueue",
          "titleKey": "organism.menuItemsQueue.title",
          "purpose": "Listar itens do cardápio da empresa ativa com filtros por status e categoria, permitindo seleção para gestão",
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
            "activeCompanyId scope limits query to active company",
            "paginated result set"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_browse_menu_items",
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
      "id": "section_execute",
      "type": "section",
      "sectionName": "section_execute",
      "titleKey": "section.execute.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "organism_manageItemForm",
          "type": "organism",
          "organismName": "manageItemForm",
          "titleKey": "organism.manageItemForm.title",
          "purpose": "Formulário de gestão do item do cardápio selecionado, permitindo editar campos e definir status do ciclo de vida",
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
            "itemType must be simple",
            "active status requires at least one linked ingredient",
            "menuItemId is selected entity not manually entered"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_manage_menu_item",
              "intent": "commandForm",
              "stateKey": "ui.menuManagement.output.manageMenuItem",
              "action": "manageMenuItem",
              "submitAction": "manageMenuItem",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "section_review",
      "type": "section",
      "sectionName": "section_review",
      "titleKey": "section.review.title",
      "mode": "summary",
      "order": 3,
      "organisms": [
        {
          "id": "organism_operationFeedback",
          "type": "organism",
          "organismName": "operationFeedback",
          "titleKey": "organism.operationFeedback.title",
          "purpose": "Exibir feedback textual da operação de gestão de item do cardápio",
          "userActions": [],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_mutation_summary",
              "intent": "summary",
              "stateKey": "ui.menuManagement.output.manageMenuItem",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "workflow_queue",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "msgKeys": [
    "action.manageMenuItem.error",
    "action.manageMenuItem.success",
    "action.refresh.label",
    "action.select.label",
    "action.submit.label",
    "empty.form.noSelection",
    "empty.queue",
    "empty.summary",
    "field.activatedAt.label",
    "field.createdAt.label",
    "field.description.label",
    "field.itemType.label",
    "field.menuCategoryId.label",
    "field.menuItemId.label",
    "field.name.label",
    "field.price.label",
    "field.status.label",
    "field.updatedAt.label",
    "filter.menuCategoryIdFilter.label",
    "filter.statusFilter.label",
    "intention.commandForm.title",
    "intention.queryList.title",
    "intention.summary.title",
    "organism.feedback.title",
    "organism.form.title",
    "organism.manageItemForm.title",
    "organism.menuItemsQueue.title",
    "organism.operationFeedback.title",
    "organism.queue.title",
    "page.title",
    "section.execute.title",
    "section.queue.title",
    "section.review.title"
  ],
  "layout": {
    "id": "menuManagement_page11_workflow_queue",
    "type": "page",
    "sections": [
      {
        "id": "section_queue",
        "type": "section",
        "sectionName": "section_queue",
        "titleKey": "section.queue.title",
        "mode": "queue",
        "order": 1,
        "organisms": [
          {
            "id": "organism_menuItemsQueue",
            "type": "organism",
            "organismName": "menuItemsQueue",
            "titleKey": "organism.menuItemsQueue.title",
            "purpose": "Listar itens do cardápio da empresa ativa com filtros por status e categoria, permitindo seleção para gestão",
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
              "activeCompanyId scope limits query to active company",
              "paginated result set"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_browse_menu_items",
                "intent": "queryList",
                "order": 1,
                "titleKey": "intention.queryList.title",
                "source": "ui.menuManagement.data.browseMenuItems",
                "binding": "queryResult",
                "action": "browseMenuItems",
                "emptyKey": "empty.queue",
                "displayHint": "table",
                "stateKey": "ui.menuManagement.data.browseMenuItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col_name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_price",
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
                    "id": "col_itemType",
                    "field": "itemType",
                    "labelKey": "field.itemType.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_description",
                    "field": "description",
                    "labelKey": "field.description.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_activatedAt",
                    "field": "activatedAt",
                    "labelKey": "field.activatedAt.label",
                    "order": 7,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 8,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 9,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_menuItemId",
                    "field": "menuItemId",
                    "labelKey": "field.menuItemId.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.menuManagement.data.browseMenuItems",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "filter_statusFilter",
                    "field": "statusFilter",
                    "labelKey": "filter.statusFilter.label",
                    "order": 1,
                    "required": false,
                    "inputType": "select",
                    "source": "ui.menuManagement.input.browseMenuItems.statusFilter",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "filter_menuCategoryIdFilter",
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
                    "id": "toolbar_refresh",
                    "action": "browseMenuItems",
                    "labelKey": "action.refresh.label",
                    "order": 1,
                    "displayHint": "button",
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
        "id": "section_execute",
        "type": "section",
        "sectionName": "section_execute",
        "titleKey": "section.execute.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "organism_manageItemForm",
            "type": "organism",
            "organismName": "manageItemForm",
            "titleKey": "organism.manageItemForm.title",
            "purpose": "Formulário de gestão do item do cardápio selecionado, permitindo editar campos e definir status do ciclo de vida",
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
              "itemType must be simple",
              "active status requires at least one linked ingredient",
              "menuItemId is selected entity not manually entered"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_manage_menu_item",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intention.commandForm.title",
                "binding": "commandOutput",
                "action": "manageMenuItem",
                "submitAction": "manageMenuItem",
                "emptyKey": "empty.form.noSelection",
                "displayHint": "form",
                "stateKey": "ui.menuManagement.output.manageMenuItem",
                "fields": [
                  {
                    "id": "field_menuItemId",
                    "field": "menuItemId",
                    "labelKey": "field.menuItemId.label",
                    "order": 1,
                    "required": true,
                    "inputType": "hidden",
                    "source": "ui.menuManagement.input.manageMenuItem.menuItemId",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuItemId"
                  },
                  {
                    "id": "field_name",
                    "field": "name",
                    "labelKey": "field.name.label",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "source": "ui.menuManagement.input.manageMenuItem.name",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "field_description",
                    "field": "description",
                    "labelKey": "field.description.label",
                    "order": 3,
                    "required": false,
                    "inputType": "textarea",
                    "source": "ui.menuManagement.input.manageMenuItem.description",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "field_menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId.label",
                    "order": 4,
                    "required": true,
                    "inputType": "select",
                    "source": "ui.menuManagement.input.manageMenuItem.menuCategoryId",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId"
                  },
                  {
                    "id": "field_price",
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
                    "id": "field_itemType",
                    "field": "itemType",
                    "labelKey": "field.itemType.label",
                    "order": 6,
                    "required": true,
                    "inputType": "select",
                    "source": "ui.menuManagement.input.manageMenuItem.itemType",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  },
                  {
                    "id": "field_status",
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
                    "id": "action_submit_manage",
                    "action": "manageMenuItem",
                    "labelKey": "action.submit.label",
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
        "id": "section_review",
        "type": "section",
        "sectionName": "section_review",
        "titleKey": "section.review.title",
        "mode": "summary",
        "order": 3,
        "organisms": [
          {
            "id": "organism_operationFeedback",
            "type": "organism",
            "organismName": "operationFeedback",
            "titleKey": "organism.operationFeedback.title",
            "purpose": "Exibir feedback textual da operação de gestão de item do cardápio",
            "userActions": [],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent_mutation_summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "intention.summary.title",
                "binding": "commandOutput",
                "emptyKey": "empty.summary",
                "displayHint": "feedback",
                "stateKey": "ui.menuManagement.output.manageMenuItem",
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
      "id": "browseMenuItems",
      "source": "cafeFlow.menuItemLifecycle.browseMenuItems",
      "entity": "MenuItem",
      "command": "browseMenuItems",
      "description": "Consultar itens do cardápio da empresa ativa com filtros opcionais por status e categoria",
      "stateKey": "ui.menuManagement.data.browseMenuItems",
      "inputStateKeys": [
        "ui.menuManagement.input.browseMenuItems.statusFilter",
        "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
      ]
    },
    {
      "id": "manageMenuItem",
      "source": "cafeFlow.menuItemLifecycle.manageMenuItem",
      "entity": "MenuItem",
      "command": "manageMenuItem",
      "description": "Gerenciar item do cardápio — criar, editar ou alterar status do ciclo de vida",
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
      "_102051_/l2/cafeFlow/web/shared/menuManagement.ts",
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
