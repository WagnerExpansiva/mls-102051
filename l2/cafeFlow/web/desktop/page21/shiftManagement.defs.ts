/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/shiftManagement.defs.ts" enhancement="_blank"/>

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
      "id": "sec-board",
      "type": "section",
      "sectionName": "ShiftBoard",
      "titleKey": "section.board.title",
      "mode": "kanban",
      "order": 1,
      "organisms": [
        {
          "id": "org-shift-board",
          "type": "organism",
          "organismName": "ShiftBoard",
          "titleKey": "org.shift.board.title",
          "purpose": "Exibe turnos agrupados por status (aberto/fechado) em colunas kanban com ações de transição contextuais ao card selecionado",
          "userActions": [
            "viewShiftClosingReport",
            "openShift",
            "closeShift"
          ],
          "requiredEntities": [
            "Shift",
            "ShiftClosingReport"
          ],
          "readsFields": [
            "shiftId",
            "status",
            "openedAt",
            "openedBy",
            "closedAt",
            "closedBy",
            "totalApurado",
            "shiftClosingReportId",
            "paidOrderCount",
            "createdAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "singleOpenShift"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent-lane-open",
              "intent": "lane",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "order": 1
            },
            {
              "id": "intent-lane-closed",
              "intent": "lane",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "order": 2
            },
            {
              "id": "intent-query-report",
              "intent": "queryList",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "order": 3
            }
          ]
        }
      ]
    },
    {
      "id": "sec-open-shift",
      "type": "section",
      "sectionName": "OpenShiftForm",
      "titleKey": "section.openShift.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-open-shift-form",
          "type": "organism",
          "organismName": "OpenShiftForm",
          "titleKey": "org.open.shift.form.title",
          "purpose": "Formulário para abrir um novo turno diário com observações opcionais",
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
              "id": "intent-open-shift",
              "intent": "commandForm",
              "stateKey": "ui.shiftManagement.output.openShift",
              "submitAction": "openShift",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-close-shift",
      "type": "section",
      "sectionName": "CloseShiftForm",
      "titleKey": "section.closeShift.title",
      "mode": "form",
      "order": 3,
      "organisms": [
        {
          "id": "org-close-shift-form",
          "type": "organism",
          "organismName": "CloseShiftForm",
          "titleKey": "org.close.shift.form.title",
          "purpose": "Formulário para fechar o turno atual registrando o total apurado e observações",
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
              "id": "intent-close-shift",
              "intent": "commandForm",
              "stateKey": "ui.shiftManagement.output.closeShift",
              "submitAction": "closeShift",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-review",
      "type": "section",
      "sectionName": "ShiftClosingReportSummary",
      "titleKey": "section.review.title",
      "mode": "summary",
      "order": 4,
      "organisms": [
        {
          "id": "org-report-summary",
          "type": "organism",
          "organismName": "ShiftClosingReportSummary",
          "titleKey": "org.report.summary.title",
          "purpose": "Exibe os detalhes do relatório de fechamento de turno para conferência do dia",
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
              "id": "intent-report-summary",
              "intent": "summary",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
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
    "id": "page21-kanban-pipeline",
    "type": "page",
    "sections": [
      {
        "id": "sec-board",
        "type": "section",
        "sectionName": "ShiftBoard",
        "titleKey": "section.board.title",
        "mode": "kanban",
        "order": 1,
        "organisms": [
          {
            "id": "org-shift-board",
            "type": "organism",
            "organismName": "ShiftBoard",
            "titleKey": "org.shift.board.title",
            "purpose": "Exibe turnos agrupados por status (aberto/fechado) em colunas kanban com ações de transição contextuais ao card selecionado",
            "userActions": [
              "viewShiftClosingReport",
              "openShift",
              "closeShift"
            ],
            "requiredEntities": [
              "Shift",
              "ShiftClosingReport"
            ],
            "readsFields": [
              "shiftId",
              "status",
              "openedAt",
              "openedBy",
              "closedAt",
              "closedBy",
              "totalApurado",
              "shiftClosingReportId",
              "paidOrderCount",
              "createdAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "singleOpenShift"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent-lane-open",
                "intent": "lane",
                "order": 1,
                "titleKey": "lane.open.title",
                "source": "ui.shiftManagement.output.openShift",
                "binding": "ui.shiftManagement.output.openShift",
                "emptyKey": "lane.open.empty",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [],
                "columns": [
                  {
                    "id": "col-open-shift-id",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-open-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 2,
                    "required": false
                  },
                  {
                    "id": "col-open-openedAt",
                    "field": "openedAt",
                    "labelKey": "field.openedAt.label",
                    "order": 3,
                    "required": false,
                    "format": "datetime"
                  },
                  {
                    "id": "col-open-openedBy",
                    "field": "openedBy",
                    "labelKey": "field.openedBy.label",
                    "order": 4,
                    "required": false
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-open-shift",
                    "action": "openShift",
                    "labelKey": "action.openShift.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "openShift"
                  }
                ],
                "rowActions": [
                  {
                    "id": "row-close-shift",
                    "action": "closeShift",
                    "labelKey": "action.closeShift.label",
                    "order": 1,
                    "displayHint": "transition",
                    "actionKey": "closeShift"
                  }
                ],
                "actions": []
              },
              {
                "id": "intent-lane-closed",
                "intent": "lane",
                "order": 2,
                "titleKey": "lane.closed.title",
                "source": "ui.shiftManagement.data.viewShiftClosingReport",
                "binding": "ui.shiftManagement.data.viewShiftClosingReport",
                "emptyKey": "lane.closed.empty",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [],
                "columns": [
                  {
                    "id": "col-closed-shift-id",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-closed-total",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 2,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-closed-paid-count",
                    "field": "paidOrderCount",
                    "labelKey": "field.paidOrderCount.label",
                    "order": 3,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-closed-created",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 4,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [
                  {
                    "id": "row-view-report",
                    "action": "viewShiftClosingReport",
                    "labelKey": "action.viewShiftClosingReport.label",
                    "order": 1,
                    "displayHint": "view",
                    "actionKey": "viewShiftClosingReport"
                  }
                ],
                "actions": []
              },
              {
                "id": "intent-query-report",
                "intent": "queryList",
                "order": 3,
                "titleKey": "intent.query.report.title",
                "source": "viewShiftClosingReport",
                "binding": "ui.shiftManagement.data.viewShiftClosingReport",
                "emptyKey": "empty.report",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [],
                "columns": [
                  {
                    "id": "col-q-report-id",
                    "field": "shiftClosingReportId",
                    "labelKey": "field.shiftClosingReportId.label",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-q-shift-id",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 2,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-q-total",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 3,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-q-paid-count",
                    "field": "paidOrderCount",
                    "labelKey": "field.paidOrderCount.label",
                    "order": 4,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-q-created",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 5,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-q-updated",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 6,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  }
                ],
                "filters": [
                  {
                    "id": "filter-shift-id",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
                  }
                ],
                "toolbar": [],
                "rowActions": [
                  {
                    "id": "row-q-view",
                    "action": "viewShiftClosingReport",
                    "labelKey": "action.viewShiftClosingReport.label",
                    "order": 1,
                    "actionKey": "viewShiftClosingReport"
                  }
                ],
                "actions": []
              }
            ]
          }
        ]
      },
      {
        "id": "sec-open-shift",
        "type": "section",
        "sectionName": "OpenShiftForm",
        "titleKey": "section.openShift.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-open-shift-form",
            "type": "organism",
            "organismName": "OpenShiftForm",
            "titleKey": "org.open.shift.form.title",
            "purpose": "Formulário para abrir um novo turno diário com observações opcionais",
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
                "id": "intent-open-shift",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intent.openShift.title",
                "source": "openShift",
                "submitAction": "openShift",
                "emptyKey": "lane.open.empty",
                "stateKey": "ui.shiftManagement.output.openShift",
                "fields": [
                  {
                    "id": "field-open-notes",
                    "field": "notes",
                    "labelKey": "field.notes.label",
                    "order": 1,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.shiftManagement.input.openShift.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submit-open",
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
        "id": "sec-close-shift",
        "type": "section",
        "sectionName": "CloseShiftForm",
        "titleKey": "section.closeShift.title",
        "mode": "form",
        "order": 3,
        "organisms": [
          {
            "id": "org-close-shift-form",
            "type": "organism",
            "organismName": "CloseShiftForm",
            "titleKey": "org.close.shift.form.title",
            "purpose": "Formulário para fechar o turno atual registrando o total apurado e observações",
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
                "id": "intent-close-shift",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "intent.closeShift.title",
                "source": "closeShift",
                "submitAction": "closeShift",
                "emptyKey": "lane.closed.empty",
                "stateKey": "ui.shiftManagement.output.closeShift",
                "fields": [
                  {
                    "id": "field-close-total",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 1,
                    "required": true,
                    "inputType": "number",
                    "stateKey": "ui.shiftManagement.input.closeShift.totalApurado"
                  },
                  {
                    "id": "field-close-notes",
                    "field": "notes",
                    "labelKey": "field.notes.label",
                    "order": 2,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.shiftManagement.input.closeShift.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submit-close",
                    "action": "closeShift",
                    "labelKey": "action.closeShift.label",
                    "order": 1,
                    "displayHint": "primary",
                    "actionKey": "closeShift"
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
        "sectionName": "ShiftClosingReportSummary",
        "titleKey": "section.review.title",
        "mode": "summary",
        "order": 4,
        "organisms": [
          {
            "id": "org-report-summary",
            "type": "organism",
            "organismName": "ShiftClosingReportSummary",
            "titleKey": "org.report.summary.title",
            "purpose": "Exibe os detalhes do relatório de fechamento de turno para conferência do dia",
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
                "id": "intent-report-summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "intent.report.summary.title",
                "source": "viewShiftClosingReport",
                "binding": "ui.shiftManagement.data.viewShiftClosingReport",
                "emptyKey": "empty.report",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [],
                "columns": [
                  {
                    "id": "col-sum-report-id",
                    "field": "shiftClosingReportId",
                    "labelKey": "field.shiftClosingReportId.label",
                    "order": 1,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-sum-shift-id",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 2,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-sum-total",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 3,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-sum-paid-count",
                    "field": "paidOrderCount",
                    "labelKey": "field.paidOrderCount.label",
                    "order": 4,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-sum-created",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 5,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-sum-updated",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 6,
                    "required": false,
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
      }
    ]
  },
  "dataBindings": [
    {
      "id": "binding-viewShiftClosingReport",
      "source": "query",
      "entity": "ShiftClosingReport",
      "command": "viewShiftClosingReport",
      "description": "Carrega o relatório de fechamento para o shiftId informado",
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
      "inputStateKeys": [
        "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
      ]
    },
    {
      "id": "binding-openShift",
      "source": "command",
      "entity": "Shift",
      "command": "openShift",
      "description": "Abre um novo turno diário",
      "stateKey": "ui.shiftManagement.output.openShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.openShift.notes"
      ]
    },
    {
      "id": "binding-closeShift",
      "source": "command",
      "entity": "Shift",
      "command": "closeShift",
      "description": "Fecha o turno atual e gera relatório de fechamento",
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
    "id": "shiftManagement__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/shiftManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/shiftManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/shiftManagement.defs.ts",
      "_102051_/l2/cafeFlow/web/shared/shiftManagement.ts",
      "_102051_/l2/cafeFlow/web/contracts/shiftManagement.defs.ts",
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
