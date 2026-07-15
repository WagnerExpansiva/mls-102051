/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.defs.ts" enhancement="_blank"/>

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
      "id": "sec_discover",
      "type": "section",
      "sectionName": "sec_discover",
      "titleKey": "sec.discover.title",
      "mode": "list",
      "order": 1,
      "organisms": [
        {
          "id": "org_menuItemsCardList",
          "type": "organism",
          "organismName": "MenuItemsCardList",
          "titleKey": "org.menuItemsCardList.title",
          "purpose": "Listar itens do cardápio em cards com filtros compactos e ação de seleção para edição",
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
            "O backend resolve o escopo da consulta limitando os itens do cardápio à empresa ativa da sessão do gerente"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_browseMenuItems",
              "intent": "queryList",
              "stateKey": "ui.menuManagement.data.browseMenuItems",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_execute",
      "type": "section",
      "sectionName": "sec_execute",
      "titleKey": "sec.execute.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org_manageItemForm",
          "type": "organism",
          "organismName": "ManageItemForm",
          "titleKey": "org.manageItemForm.title",
          "purpose": "Formulário em bottom sheet para criar ou editar um item do cardápio com nome, categoria, preço, tipo e status",
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
            "menuItemId",
            "name",
            "description",
            "menuCategoryId",
            "price",
            "itemType",
            "status"
          ],
          "rulesApplied": [
            "O sistema valida que o tipo do item é 'simple' e que, se for ativado, existe pelo menos um ingrediente de estoque vinculado",
            "O sistema persiste as alterações atualizando updatedAt e, conforme o status, activatedAt ou inactivatedAt"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_manageMenuItem",
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
      "id": "sec_review",
      "type": "section",
      "sectionName": "sec_review",
      "titleKey": "sec.review.title",
      "mode": "summary",
      "order": 3,
      "organisms": [
        {
          "id": "org_actionFeedback",
          "type": "organism",
          "organismName": "ActionFeedback",
          "titleKey": "org.actionFeedback.title",
          "purpose": "Exibir feedback textual da última ação de gerenciamento e resumo do resultado",
          "userActions": [],
          "requiredEntities": [
            "MenuItem"
          ],
          "readsFields": [
            "menuItemId",
            "name",
            "status",
            "price",
            "activatedAt",
            "inactivatedAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_summary",
              "intent": "summary",
              "stateKey": "ui.menuManagement.action.manageMenuItem.status",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "mobile_cards",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "layout": {
    "id": "page31_mobile_cards",
    "type": "page",
    "sections": [
      {
        "id": "sec_discover",
        "type": "section",
        "sectionName": "sec_discover",
        "titleKey": "sec.discover.title",
        "mode": "list",
        "order": 1,
        "organisms": [
          {
            "id": "org_menuItemsCardList",
            "type": "organism",
            "organismName": "MenuItemsCardList",
            "titleKey": "org.menuItemsCardList.title",
            "purpose": "Listar itens do cardápio em cards com filtros compactos e ação de seleção para edição",
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
              "O backend resolve o escopo da consulta limitando os itens do cardápio à empresa ativa da sessão do gerente"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_browseMenuItems",
                "intent": "queryList",
                "order": 1,
                "titleKey": "organism.menuItemsList.title",
                "source": "ui.menuManagement.data.browseMenuItems",
                "binding": "browseMenuItemsBinding",
                "emptyKey": "empty.menuItems",
                "displayHint": "card",
                "stateKey": "ui.menuManagement.data.browseMenuItems",
                "fields": [],
                "columns": [
                  {
                    "id": "col_name",
                    "field": "name",
                    "labelKey": "field.name",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": false,
                    "inputType": "badge",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_price",
                    "field": "price",
                    "labelKey": "field.price",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "currency",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_itemType",
                    "field": "itemType",
                    "labelKey": "field.itemType",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  },
                  {
                    "id": "col_menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.data.browseMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "flt_statusFilter",
                    "field": "statusFilter",
                    "labelKey": "filter.statusFilter",
                    "order": 1,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.statusFilter"
                  },
                  {
                    "id": "flt_menuCategoryIdFilter",
                    "field": "menuCategoryIdFilter",
                    "labelKey": "filter.menuCategoryIdFilter",
                    "order": 2,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb_refresh",
                    "action": "browseMenuItems",
                    "labelKey": "action.refresh",
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
        "id": "sec_execute",
        "type": "section",
        "sectionName": "sec_execute",
        "titleKey": "sec.execute.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org_manageItemForm",
            "type": "organism",
            "organismName": "ManageItemForm",
            "titleKey": "org.manageItemForm.title",
            "purpose": "Formulário em bottom sheet para criar ou editar um item do cardápio com nome, categoria, preço, tipo e status",
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
              "menuItemId",
              "name",
              "description",
              "menuCategoryId",
              "price",
              "itemType",
              "status"
            ],
            "rulesApplied": [
              "O sistema valida que o tipo do item é 'simple' e que, se for ativado, existe pelo menos um ingrediente de estoque vinculado",
              "O sistema persiste as alterações atualizando updatedAt e, conforme o status, activatedAt ou inactivatedAt"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_manageMenuItem",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "organism.manageItemForm.title",
                "source": "ui.menuManagement.output.manageMenuItem",
                "binding": "manageMenuItemBinding",
                "action": "manageMenuItem",
                "submitAction": "manageMenuItem",
                "displayHint": "bottomSheet",
                "stateKey": "ui.menuManagement.action.manageMenuItem.status",
                "fields": [
                  {
                    "id": "fld_menuItemId",
                    "field": "menuItemId",
                    "labelKey": "field.menuItemId",
                    "order": 1,
                    "required": false,
                    "inputType": "hidden",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuItemId"
                  },
                  {
                    "id": "fld_name",
                    "field": "name",
                    "labelKey": "field.name",
                    "order": 2,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.name"
                  },
                  {
                    "id": "fld_description",
                    "field": "description",
                    "labelKey": "field.description",
                    "order": 3,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.description"
                  },
                  {
                    "id": "fld_menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "field.menuCategoryId",
                    "order": 4,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.menuCategoryId"
                  },
                  {
                    "id": "fld_price",
                    "field": "price",
                    "labelKey": "field.price",
                    "order": 5,
                    "required": true,
                    "inputType": "number",
                    "format": "currency",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.price"
                  },
                  {
                    "id": "fld_itemType",
                    "field": "itemType",
                    "labelKey": "field.itemType",
                    "order": 6,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.menuManagement.input.manageMenuItem.itemType"
                  },
                  {
                    "id": "fld_status",
                    "field": "status",
                    "labelKey": "field.status",
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
                    "id": "act_submit",
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
        "id": "sec_review",
        "type": "section",
        "sectionName": "sec_review",
        "titleKey": "sec.review.title",
        "mode": "summary",
        "order": 3,
        "organisms": [
          {
            "id": "org_actionFeedback",
            "type": "organism",
            "organismName": "ActionFeedback",
            "titleKey": "org.actionFeedback.title",
            "purpose": "Exibir feedback textual da última ação de gerenciamento e resumo do resultado",
            "userActions": [],
            "requiredEntities": [
              "MenuItem"
            ],
            "readsFields": [
              "menuItemId",
              "name",
              "status",
              "price",
              "activatedAt",
              "inactivatedAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent_summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "organism.actionFeedback.title",
                "source": "ui.menuManagement.output.manageMenuItem",
                "displayHint": "inline",
                "stateKey": "ui.menuManagement.action.manageMenuItem.status",
                "fields": [],
                "columns": [
                  {
                    "id": "col_sum_name",
                    "field": "name",
                    "labelKey": "field.name",
                    "order": 1,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "col_sum_status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 2,
                    "required": false,
                    "inputType": "badge"
                  },
                  {
                    "id": "col_sum_price",
                    "field": "price",
                    "labelKey": "field.price",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "currency"
                  },
                  {
                    "id": "col_sum_updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt",
                    "order": 4,
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
      "description": "Consulta itens do cardápio da empresa ativa com filtros opcionais de status e categoria",
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
    "id": "menuManagement__page31__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.defs.ts",
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
