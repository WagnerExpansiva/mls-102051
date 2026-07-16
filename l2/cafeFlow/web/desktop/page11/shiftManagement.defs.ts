/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/shiftManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "shiftManagement",
  "pageName": "Gestão de turno diário",
  "baseClassName": "CafeFlowShiftManagementBase",
  "actor": "gerente",
  "purpose": "Executar Gestão de turno diário.",
  "capabilities": [
    "shiftLifecycle"
  ],
  "flowRefs": {
    "experienceFlows": [
      "shiftLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "shiftLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "shiftManagement",
    "workspaceKind": "workflow",
    "workflowId": "shiftLifecycle",
    "actor": "gerente",
    "entity": "Shift",
    "owners": [
      {
        "kind": "workflow",
        "id": "shiftLifecycle",
        "defPath": "_102051_/l4/workflows/shiftLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "openShift",
        "defPath": "_102051_/l4/operations/openShift.defs.ts"
      },
      {
        "kind": "operation",
        "id": "closeShift",
        "defPath": "_102051_/l4/operations/closeShift.defs.ts"
      },
      {
        "kind": "operation",
        "id": "viewShiftClosingReport",
        "defPath": "_102051_/l4/operations/viewShiftClosingReport.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "O gerente abre o turno diário no início do expediente para iniciar o registro de pedidos do dia.",
        "Ao final do expediente, o gerente fecha o turno para consolidar os pedidos do período e registrar o valor apurado.",
        "O gerente revisa o relatório de fechamento com o total apurado e os pedidos pagos consolidados para conferência do dia."
      ],
      "operations": [
        {
          "operationId": "openShift",
          "commandName": "openShift",
          "steps": [
            "O gerente solicita a abertura de um novo turno no início do expediente.",
            "O sistema verifica que não existe nenhum turno com status 'open' (regra singleOpenShift).",
            "O sistema cria um novo registro de Shift com status 'open', registrando o gerente e a data/hora de abertura.",
            "O turno fica ativo e pronto para receber pedidos."
          ]
        },
        {
          "operationId": "closeShift",
          "commandName": "closeShift",
          "steps": [
            "O gerente acessa a tela de fechamento de turno, onde o sistema identifica o turno atualmente aberto.",
            "O sistema consolida os pedidos do período e sugere o total apurado.",
            "O gerente confirma ou ajusta o valor apurado e adiciona observações se necessário.",
            "O sistema atualiza o status do turno para 'closed', registra a data/hora de fechamento e o gerente responsável, e gera o relatório de fechamento."
          ]
        },
        {
          "operationId": "viewShiftClosingReport",
          "commandName": "viewShiftClosingReport",
          "steps": [
            "O gerente seleciona um turno fechado na lista de turnos.",
            "O sistema localiza o relatório de fechamento correspondente ao shiftId informado.",
            "O sistema exibe o total apurado, a quantidade de pedidos pagos consolidados e as datas de criação e atualização do relatório."
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec_discover",
      "type": "section",
      "sectionName": "sec_discover",
      "titleKey": "sec.discover.title",
      "mode": "cards",
      "order": 1,
      "organisms": [
        {
          "id": "org_shiftClosingReport",
          "type": "organism",
          "organismName": "shiftClosingReportCard",
          "titleKey": "org.shiftClosingReport.title",
          "purpose": "Exibir relatório de fechamento de turno como cartão legível",
          "userActions": [
            "viewShiftClosingReport"
          ],
          "requiredEntities": [
            "ShiftClosingReport"
          ],
          "readsFields": [
            "shiftClosingReportId",
            "shiftId",
            "totalApurado",
            "paidOrderCount",
            "createdAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_discover_query",
              "intent": "queryList",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "action": "viewShiftClosingReport",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_execute_openShift",
      "type": "section",
      "sectionName": "sec_execute_openShift",
      "titleKey": "sec.execute.openShift.title",
      "mode": "formCard",
      "order": 2,
      "organisms": [
        {
          "id": "org_openShift",
          "type": "organism",
          "organismName": "openShiftForm",
          "titleKey": "org.openShift.title",
          "purpose": "Formulário para abrir turno diário no início do expediente",
          "userActions": [
            "openShift"
          ],
          "requiredEntities": [
            "Shift"
          ],
          "readsFields": [],
          "writesFields": [
            "notes"
          ],
          "rulesApplied": [
            "singleOpenShift"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_openShift_form",
              "intent": "commandForm",
              "stateKey": "ui.shiftManagement.action.openShift.status",
              "action": "openShift",
              "submitAction": "openShift",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec_execute_closeShift",
      "type": "section",
      "sectionName": "sec_execute_closeShift",
      "titleKey": "sec.execute.closeShift.title",
      "mode": "formCard",
      "order": 3,
      "organisms": [
        {
          "id": "org_closeShift",
          "type": "organism",
          "organismName": "closeShiftForm",
          "titleKey": "org.closeShift.title",
          "purpose": "Formulário para fechar turno diário e registrar valor apurado",
          "userActions": [
            "closeShift"
          ],
          "requiredEntities": [
            "Shift",
            "ShiftClosingReport"
          ],
          "readsFields": [],
          "writesFields": [
            "totalApurado",
            "notes"
          ],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_closeShift_form",
              "intent": "commandForm",
              "stateKey": "ui.shiftManagement.action.closeShift.status",
              "action": "closeShift",
              "submitAction": "closeShift",
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
      "mode": "summaryCard",
      "order": 4,
      "organisms": [
        {
          "id": "org_review",
          "type": "organism",
          "organismName": "shiftSummary",
          "titleKey": "org.review.title",
          "purpose": "Resumo do turno com status e valores principais para conferência",
          "userActions": [],
          "requiredEntities": [
            "Shift"
          ],
          "readsFields": [
            "status",
            "openedAt",
            "closedAt",
            "totalApurado"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_review_summary",
              "intent": "summary",
              "order": 1
            }
          ]
        }
      ]
    }
  ],
  "templateId": "mobile_cards",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board",
  "msgKeys": [
    "action.closeShift.error",
    "action.closeShift.label",
    "action.closeShift.success",
    "action.openShift.error",
    "action.openShift.label",
    "action.openShift.success",
    "empty.review",
    "empty.shiftClosingReport",
    "field.closedAt.label",
    "field.closedBy.label",
    "field.createdAt.label",
    "field.notes.label",
    "field.openedAt.label",
    "field.openedBy.label",
    "field.paidOrderCount.label",
    "field.shiftClosingReportId.label",
    "field.shiftId.label",
    "field.status.label",
    "field.totalApurado.label",
    "field.updatedAt.label",
    "org.closeShift.title",
    "org.openShift.title",
    "org.review.title",
    "org.shiftClosingReport.title",
    "page.shiftManagement.title",
    "sec.discover.title",
    "sec.execute.closeShift.title",
    "sec.execute.openShift.title",
    "sec.review.title",
    "section.discover.title",
    "section.execute.closeShift.title",
    "section.execute.openShift.title",
    "section.review.title"
  ],
  "layout": {
    "id": "shiftManagement_mobile_cards",
    "type": "page",
    "sections": [
      {
        "id": "sec_discover",
        "type": "section",
        "sectionName": "sec_discover",
        "titleKey": "sec.discover.title",
        "mode": "cards",
        "order": 1,
        "organisms": [
          {
            "id": "org_shiftClosingReport",
            "type": "organism",
            "organismName": "shiftClosingReportCard",
            "titleKey": "org.shiftClosingReport.title",
            "purpose": "Exibir relatório de fechamento de turno como cartão legível",
            "userActions": [
              "viewShiftClosingReport"
            ],
            "requiredEntities": [
              "ShiftClosingReport"
            ],
            "readsFields": [
              "shiftClosingReportId",
              "shiftId",
              "totalApurado",
              "paidOrderCount",
              "createdAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent_discover_query",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.discover.title",
                "source": "ui.shiftManagement.data.viewShiftClosingReport",
                "binding": "binding_viewShiftClosingReport",
                "action": "viewShiftClosingReport",
                "emptyKey": "empty.shiftClosingReport",
                "displayHint": "card",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [],
                "columns": [
                  {
                    "id": "col_reportId",
                    "field": "shiftClosingReportId",
                    "labelKey": "field.shiftClosingReportId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_reportShiftId",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_reportTotal",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 3,
                    "required": false,
                    "inputType": "number",
                    "format": "currency",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_reportPaidOrders",
                    "field": "paidOrderCount",
                    "labelKey": "field.paidOrderCount.label",
                    "order": 4,
                    "required": false,
                    "inputType": "number",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_reportCreatedAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_reportUpdatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
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
      },
      {
        "id": "sec_execute_openShift",
        "type": "section",
        "sectionName": "sec_execute_openShift",
        "titleKey": "sec.execute.openShift.title",
        "mode": "formCard",
        "order": 2,
        "organisms": [
          {
            "id": "org_openShift",
            "type": "organism",
            "organismName": "openShiftForm",
            "titleKey": "org.openShift.title",
            "purpose": "Formulário para abrir turno diário no início do expediente",
            "userActions": [
              "openShift"
            ],
            "requiredEntities": [
              "Shift"
            ],
            "readsFields": [],
            "writesFields": [
              "notes"
            ],
            "rulesApplied": [
              "singleOpenShift"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_openShift_form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.execute.openShift.title",
                "source": "ui.shiftManagement.output.openShift",
                "binding": "binding_openShift",
                "action": "openShift",
                "submitAction": "openShift",
                "displayHint": "formCard",
                "stateKey": "ui.shiftManagement.action.openShift.status",
                "fields": [
                  {
                    "id": "field_openShift_notes",
                    "field": "notes",
                    "labelKey": "field.notes.label",
                    "order": 1,
                    "required": false,
                    "inputType": "textarea",
                    "source": "ui.shiftManagement.input.openShift.notes",
                    "stateKey": "ui.shiftManagement.input.openShift.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_openShift_submit",
                    "action": "openShift",
                    "labelKey": "action.openShift.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "openShift"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec_execute_closeShift",
        "type": "section",
        "sectionName": "sec_execute_closeShift",
        "titleKey": "sec.execute.closeShift.title",
        "mode": "formCard",
        "order": 3,
        "organisms": [
          {
            "id": "org_closeShift",
            "type": "organism",
            "organismName": "closeShiftForm",
            "titleKey": "org.closeShift.title",
            "purpose": "Formulário para fechar turno diário e registrar valor apurado",
            "userActions": [
              "closeShift"
            ],
            "requiredEntities": [
              "Shift",
              "ShiftClosingReport"
            ],
            "readsFields": [],
            "writesFields": [
              "totalApurado",
              "notes"
            ],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent_closeShift_form",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.execute.closeShift.title",
                "source": "ui.shiftManagement.output.closeShift",
                "binding": "binding_closeShift",
                "action": "closeShift",
                "submitAction": "closeShift",
                "displayHint": "formCard",
                "stateKey": "ui.shiftManagement.action.closeShift.status",
                "fields": [
                  {
                    "id": "field_closeShift_totalApurado",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 1,
                    "required": true,
                    "inputType": "number",
                    "format": "currency",
                    "source": "ui.shiftManagement.input.closeShift.totalApurado",
                    "stateKey": "ui.shiftManagement.input.closeShift.totalApurado"
                  },
                  {
                    "id": "field_closeShift_notes",
                    "field": "notes",
                    "labelKey": "field.notes.label",
                    "order": 2,
                    "required": false,
                    "inputType": "textarea",
                    "source": "ui.shiftManagement.input.closeShift.notes",
                    "stateKey": "ui.shiftManagement.input.closeShift.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_closeShift_submit",
                    "action": "closeShift",
                    "labelKey": "action.closeShift.label",
                    "order": 1,
                    "displayHint": "confirm",
                    "actionKey": "closeShift"
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
        "mode": "summaryCard",
        "order": 4,
        "organisms": [
          {
            "id": "org_review",
            "type": "organism",
            "organismName": "shiftSummary",
            "titleKey": "org.review.title",
            "purpose": "Resumo do turno com status e valores principais para conferência",
            "userActions": [],
            "requiredEntities": [
              "Shift"
            ],
            "readsFields": [
              "status",
              "openedAt",
              "closedAt",
              "totalApurado"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "intent_review_summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "section.review.title",
                "emptyKey": "empty.review",
                "displayHint": "summaryCard",
                "fields": [],
                "columns": [
                  {
                    "id": "col_summary_status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "col_summary_openedAt",
                    "field": "openedAt",
                    "labelKey": "field.openedAt.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime"
                  },
                  {
                    "id": "col_summary_closedAt",
                    "field": "closedAt",
                    "labelKey": "field.closedAt.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime"
                  },
                  {
                    "id": "col_summary_totalApurado",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 4,
                    "required": false,
                    "inputType": "number",
                    "format": "currency"
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
      "id": "binding_viewShiftClosingReport",
      "source": "ui.shiftManagement.data.viewShiftClosingReport",
      "entity": "ShiftClosingReport",
      "command": "viewShiftClosingReport",
      "description": "Carrega relatório de fechamento de turno por shiftId",
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
      "inputStateKeys": [
        "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
      ]
    },
    {
      "id": "binding_openShift",
      "source": "ui.shiftManagement.output.openShift",
      "entity": "Shift",
      "command": "openShift",
      "description": "Abre turno diário criando novo Shift com status open",
      "stateKey": "ui.shiftManagement.output.openShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.openShift.notes"
      ]
    },
    {
      "id": "binding_closeShift",
      "source": "ui.shiftManagement.output.closeShift",
      "entity": "Shift",
      "command": "closeShift",
      "description": "Fecha turno diário atualizando status para closed e gerando relatório",
      "stateKey": "ui.shiftManagement.output.closeShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.closeShift.totalApurado",
        "ui.shiftManagement.input.closeShift.notes"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "shiftManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/shiftManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/shiftManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/shiftManagement.ts",
      "_102051_/l2/cafeFlow/web/contracts/shiftManagement.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "shiftManagement__l2_shared"
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
