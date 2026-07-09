/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/shiftManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "shiftManagement",
  "pageName": "Gestão de turno diário",
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
      "id": "sec-open-shift",
      "type": "section",
      "sectionName": "Abertura do turno",
      "titleKey": "shiftManagement.section.openShift.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-open-shift-form",
          "type": "form",
          "organismName": "OpenShiftForm",
          "titleKey": "shiftManagement.organism.openShift.title",
          "purpose": "Abrir turno diário",
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
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-open-shift-form",
              "intent": "commandForm",
              "submitAction": "openShift",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec-close-shift",
      "type": "section",
      "sectionName": "Fechamento do turno",
      "titleKey": "shiftManagement.section.closeShift.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org-close-shift-form",
          "type": "form",
          "organismName": "CloseShiftForm",
          "titleKey": "shiftManagement.organism.closeShift.title",
          "purpose": "Fechar turno diário",
          "userActions": [
            "closeShift"
          ],
          "requiredEntities": [
            "Shift",
            "Order",
            "ShiftClosingReport"
          ],
          "readsFields": [],
          "writesFields": [
            "totalApurado",
            "notes"
          ],
          "rulesApplied": [
            "shiftClosingRecordsRevenue",
            "singleOpenShift",
            "dashboardCurrentShiftOnly"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-close-shift-form",
              "intent": "commandForm",
              "submitAction": "closeShift",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec-report-cards",
      "type": "section",
      "sectionName": "Relatórios de fechamento",
      "titleKey": "shiftManagement.section.reports.title",
      "mode": "view",
      "order": 30,
      "organisms": [
        {
          "id": "org-report-cards",
          "type": "list",
          "organismName": "ShiftClosingReportCards",
          "titleKey": "shiftManagement.organism.reports.title",
          "purpose": "Revisar relatório de fechamento de turno",
          "userActions": [
            "viewShiftClosingReport"
          ],
          "requiredEntities": [
            "ShiftClosingReport",
            "Shift"
          ],
          "readsFields": [
            "shiftId",
            "totalApurado",
            "paidOrderCount",
            "createdAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "shiftClosingRecordsRevenue",
            "shiftClosingConsolidatesPaidOrders"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-report-cards",
              "intent": "queryList",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec-report-summary",
      "type": "section",
      "sectionName": "Resumo do fechamento",
      "titleKey": "shiftManagement.section.summary.title",
      "mode": "view",
      "order": 40,
      "organisms": [
        {
          "id": "org-report-summary",
          "type": "summary",
          "organismName": "ShiftClosingReportSummary",
          "titleKey": "shiftManagement.organism.summary.title",
          "purpose": "Resumo do relatório de fechamento",
          "userActions": [
            "viewShiftClosingReport"
          ],
          "requiredEntities": [
            "ShiftClosingReport",
            "Shift"
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
          "rulesApplied": [
            "shiftClosingRecordsRevenue",
            "shiftClosingConsolidatesPaidOrders"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-report-summary",
              "intent": "summary",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "shiftManagement.page11",
    "type": "page",
    "sections": [
      {
        "id": "sec-open-shift",
        "type": "section",
        "sectionName": "Abertura do turno",
        "titleKey": "shiftManagement.section.openShift.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-open-shift-form",
            "type": "form",
            "organismName": "OpenShiftForm",
            "titleKey": "shiftManagement.organism.openShift.title",
            "purpose": "Abrir turno diário",
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
            "order": 10,
            "intentions": [
              {
                "id": "int-open-shift-form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "shiftManagement.intention.openShift.title",
                "submitAction": "openShift",
                "fields": [
                  {
                    "id": "field-open-notes",
                    "field": "notes",
                    "labelKey": "shiftManagement.field.notes.label",
                    "order": 10,
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
                    "id": "act-open-submit",
                    "action": "openShift",
                    "labelKey": "shiftManagement.action.openShift.label",
                    "order": 10,
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
        "sectionName": "Fechamento do turno",
        "titleKey": "shiftManagement.section.closeShift.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org-close-shift-form",
            "type": "form",
            "organismName": "CloseShiftForm",
            "titleKey": "shiftManagement.organism.closeShift.title",
            "purpose": "Fechar turno diário",
            "userActions": [
              "closeShift"
            ],
            "requiredEntities": [
              "Shift",
              "Order",
              "ShiftClosingReport"
            ],
            "readsFields": [],
            "writesFields": [
              "totalApurado",
              "notes"
            ],
            "rulesApplied": [
              "shiftClosingRecordsRevenue",
              "singleOpenShift",
              "dashboardCurrentShiftOnly"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-close-shift-form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "shiftManagement.intention.closeShift.title",
                "submitAction": "closeShift",
                "fields": [
                  {
                    "id": "field-close-total",
                    "field": "totalApurado",
                    "labelKey": "shiftManagement.field.totalApurado.label",
                    "order": 10,
                    "required": true,
                    "inputType": "currency",
                    "stateKey": "ui.shiftManagement.input.closeShift.totalApurado"
                  },
                  {
                    "id": "field-close-notes",
                    "field": "notes",
                    "labelKey": "shiftManagement.field.notes.label",
                    "order": 20,
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
                    "id": "act-close-submit",
                    "action": "closeShift",
                    "labelKey": "shiftManagement.action.closeShift.label",
                    "order": 10,
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
        "id": "sec-report-cards",
        "type": "section",
        "sectionName": "Relatórios de fechamento",
        "titleKey": "shiftManagement.section.reports.title",
        "mode": "view",
        "order": 30,
        "organisms": [
          {
            "id": "org-report-cards",
            "type": "list",
            "organismName": "ShiftClosingReportCards",
            "titleKey": "shiftManagement.organism.reports.title",
            "purpose": "Revisar relatório de fechamento de turno",
            "userActions": [
              "viewShiftClosingReport"
            ],
            "requiredEntities": [
              "ShiftClosingReport",
              "Shift"
            ],
            "readsFields": [
              "shiftId",
              "totalApurado",
              "paidOrderCount",
              "createdAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "shiftClosingRecordsRevenue",
              "shiftClosingConsolidatesPaidOrders"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-report-cards",
                "intent": "queryList",
                "order": 10,
                "titleKey": "shiftManagement.intention.reports.title",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [],
                "columns": [
                  {
                    "id": "col-report-shift",
                    "field": "shiftId",
                    "labelKey": "shiftManagement.field.shiftId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-report-total",
                    "field": "totalApurado",
                    "labelKey": "shiftManagement.field.totalApurado.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-report-count",
                    "field": "paidOrderCount",
                    "labelKey": "shiftManagement.field.paidOrderCount.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-report-created",
                    "field": "createdAt",
                    "labelKey": "shiftManagement.field.createdAt.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-report-refresh",
                    "action": "viewShiftClosingReport",
                    "labelKey": "shiftManagement.action.viewShiftClosingReport.label",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "viewShiftClosingReport"
                  }
                ],
                "rowActions": [
                  {
                    "id": "ra-report-view",
                    "action": "viewShiftClosingReport",
                    "labelKey": "shiftManagement.action.viewShiftClosingReport.label",
                    "order": 10,
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
        "id": "sec-report-summary",
        "type": "section",
        "sectionName": "Resumo do fechamento",
        "titleKey": "shiftManagement.section.summary.title",
        "mode": "view",
        "order": 40,
        "organisms": [
          {
            "id": "org-report-summary",
            "type": "summary",
            "organismName": "ShiftClosingReportSummary",
            "titleKey": "shiftManagement.organism.summary.title",
            "purpose": "Resumo do relatório de fechamento",
            "userActions": [
              "viewShiftClosingReport"
            ],
            "requiredEntities": [
              "ShiftClosingReport",
              "Shift"
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
            "rulesApplied": [
              "shiftClosingRecordsRevenue",
              "shiftClosingConsolidatesPaidOrders"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-report-summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "shiftManagement.intention.summary.title",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [
                  {
                    "id": "field-summary-report-id",
                    "field": "shiftClosingReportId",
                    "labelKey": "shiftManagement.field.shiftClosingReportId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field-summary-shift-id",
                    "field": "shiftId",
                    "labelKey": "shiftManagement.field.shiftId.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field-summary-total",
                    "field": "totalApurado",
                    "labelKey": "shiftManagement.field.totalApurado.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field-summary-count",
                    "field": "paidOrderCount",
                    "labelKey": "shiftManagement.field.paidOrderCount.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field-summary-created",
                    "field": "createdAt",
                    "labelKey": "shiftManagement.field.createdAt.label",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field-summary-updated",
                    "field": "updatedAt",
                    "labelKey": "shiftManagement.field.updatedAt.label",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
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
      "id": "bind-openShift",
      "source": "bffCommand",
      "command": "openShift",
      "description": "Abrir turno diário",
      "stateKey": "ui.shiftManagement.output.openShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.openShift.notes"
      ]
    },
    {
      "id": "bind-closeShift",
      "source": "bffCommand",
      "command": "closeShift",
      "description": "Fechar turno diário",
      "stateKey": "ui.shiftManagement.output.closeShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.closeShift.totalApurado",
        "ui.shiftManagement.input.closeShift.notes"
      ]
    },
    {
      "id": "bind-viewShiftClosingReport",
      "source": "bffCommand",
      "command": "viewShiftClosingReport",
      "description": "Revisar relatório de fechamento",
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
      "inputStateKeys": []
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
