/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/shiftManagement.defs.ts" enhancement="_blank"/>

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
      "id": "section-shift-kanban",
      "type": "section",
      "sectionName": "Gestão de turno diário",
      "titleKey": "shiftManagement.section.main.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-shift-board",
          "type": "data",
          "organismName": "ShiftBoard",
          "titleKey": "shiftManagement.board.title",
          "purpose": "Acompanhar turno e relatórios por status",
          "userActions": [
            "viewShiftClosingReport"
          ],
          "requiredEntities": [
            "Shift",
            "ShiftClosingReport"
          ],
          "readsFields": [
            "shiftId",
            "status",
            "openedAt",
            "closedAt",
            "totalApurado",
            "shiftClosingReportId",
            "paidOrderCount",
            "createdAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "singleOpenShift",
            "shiftClosingRecordsRevenue"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int-shift-board",
              "intent": "workflowStatus",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "order": 10
            }
          ]
        },
        {
          "id": "org-open-shift-21",
          "type": "form",
          "organismName": "OpenShift",
          "titleKey": "shiftManagement.openShift.title",
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
          "order": 20,
          "intentionRefs": [
            {
              "id": "int-open-shift-form-21",
              "intent": "commandForm",
              "action": "openShift",
              "submitAction": "openShift",
              "order": 10
            }
          ]
        },
        {
          "id": "org-close-shift-21",
          "type": "form",
          "organismName": "CloseShift",
          "titleKey": "shiftManagement.closeShift.title",
          "purpose": "Fechar turno diário",
          "userActions": [
            "closeShift"
          ],
          "requiredEntities": [
            "Shift",
            "Order",
            "ShiftClosingReport"
          ],
          "readsFields": [
            "totalApurado",
            "notes"
          ],
          "writesFields": [
            "totalApurado",
            "notes"
          ],
          "rulesApplied": [
            "shiftClosingRecordsRevenue",
            "singleOpenShift",
            "dashboardCurrentShiftOnly"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "int-close-shift-form-21",
              "intent": "commandForm",
              "action": "closeShift",
              "submitAction": "closeShift",
              "order": 10
            }
          ]
        },
        {
          "id": "org-shift-summary-21",
          "type": "summary",
          "organismName": "ShiftSummary",
          "titleKey": "shiftManagement.summary.title",
          "purpose": "Resumo do turno atual e fechamento",
          "userActions": [],
          "requiredEntities": [
            "Shift",
            "ShiftClosingReport"
          ],
          "readsFields": [
            "status",
            "openedAt",
            "closedAt",
            "openedBy",
            "closedBy",
            "totalApurado"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 40,
          "intentionRefs": [
            {
              "id": "int-shift-summary-21",
              "intent": "summary",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "section-shift-kanban",
        "type": "section",
        "sectionName": "Gestão de turno diário",
        "titleKey": "shiftManagement.section.main.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-shift-board",
            "type": "data",
            "organismName": "ShiftBoard",
            "titleKey": "shiftManagement.board.title",
            "purpose": "Acompanhar turno e relatórios por status",
            "userActions": [
              "viewShiftClosingReport"
            ],
            "requiredEntities": [
              "Shift",
              "ShiftClosingReport"
            ],
            "readsFields": [
              "shiftId",
              "status",
              "openedAt",
              "closedAt",
              "totalApurado",
              "shiftClosingReportId",
              "paidOrderCount",
              "createdAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "singleOpenShift",
              "shiftClosingRecordsRevenue"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int-shift-board",
                "intent": "workflowStatus",
                "order": 10,
                "titleKey": "shiftManagement.board.intent.title",
                "fields": [
                  {
                    "id": "field-board-status",
                    "field": "status",
                    "labelKey": "shiftManagement.board.field.status",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.shiftManagement.layout.field-board-status"
                  }
                ],
                "columns": [
                  {
                    "id": "col-board-shiftId",
                    "field": "shiftId",
                    "labelKey": "shiftManagement.board.field.shiftId",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-board-openedAt",
                    "field": "openedAt",
                    "labelKey": "shiftManagement.board.field.openedAt",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.shiftManagement.layout.col-board-openedAt"
                  },
                  {
                    "id": "col-board-closedAt",
                    "field": "closedAt",
                    "labelKey": "shiftManagement.board.field.closedAt",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.shiftManagement.layout.col-board-closedAt"
                  },
                  {
                    "id": "col-board-totalApurado",
                    "field": "totalApurado",
                    "labelKey": "shiftManagement.board.field.totalApurado",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-board-paidOrderCount",
                    "field": "paidOrderCount",
                    "labelKey": "shiftManagement.board.field.paidOrderCount",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-board-refresh",
                    "action": "viewShiftClosingReport",
                    "labelKey": "shiftManagement.report.action.refresh",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "viewShiftClosingReport"
                  }
                ],
                "rowActions": [
                  {
                    "id": "ra-board-view",
                    "action": "viewShiftClosingReport",
                    "labelKey": "shiftManagement.report.action.view",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "viewShiftClosingReport"
                  }
                ],
                "actions": [],
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
              }
            ]
          },
          {
            "id": "org-open-shift-21",
            "type": "form",
            "organismName": "OpenShift",
            "titleKey": "shiftManagement.openShift.title",
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
            "order": 20,
            "intentions": [
              {
                "id": "int-open-shift-form-21",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "shiftManagement.openShift.form.title",
                "action": "openShift",
                "submitAction": "openShift",
                "fields": [
                  {
                    "id": "field-open-notes-21",
                    "field": "notes",
                    "labelKey": "shiftManagement.openShift.field.notes",
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
                    "id": "act-open-submit-21",
                    "action": "openShift",
                    "labelKey": "shiftManagement.openShift.action.submit",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "openShift"
                  }
                ]
              }
            ]
          },
          {
            "id": "org-close-shift-21",
            "type": "form",
            "organismName": "CloseShift",
            "titleKey": "shiftManagement.closeShift.title",
            "purpose": "Fechar turno diário",
            "userActions": [
              "closeShift"
            ],
            "requiredEntities": [
              "Shift",
              "Order",
              "ShiftClosingReport"
            ],
            "readsFields": [
              "totalApurado",
              "notes"
            ],
            "writesFields": [
              "totalApurado",
              "notes"
            ],
            "rulesApplied": [
              "shiftClosingRecordsRevenue",
              "singleOpenShift",
              "dashboardCurrentShiftOnly"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "int-close-shift-form-21",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "shiftManagement.closeShift.form.title",
                "action": "closeShift",
                "submitAction": "closeShift",
                "fields": [
                  {
                    "id": "field-close-totalApurado-21",
                    "field": "totalApurado",
                    "labelKey": "shiftManagement.closeShift.field.totalApurado",
                    "order": 10,
                    "required": true,
                    "inputType": "money",
                    "stateKey": "ui.shiftManagement.input.closeShift.totalApurado"
                  },
                  {
                    "id": "field-close-notes-21",
                    "field": "notes",
                    "labelKey": "shiftManagement.closeShift.field.notes",
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
                    "id": "act-close-submit-21",
                    "action": "closeShift",
                    "labelKey": "shiftManagement.closeShift.action.submit",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "closeShift"
                  }
                ]
              }
            ]
          },
          {
            "id": "org-shift-summary-21",
            "type": "summary",
            "organismName": "ShiftSummary",
            "titleKey": "shiftManagement.summary.title",
            "purpose": "Resumo do turno atual e fechamento",
            "userActions": [],
            "requiredEntities": [
              "Shift",
              "ShiftClosingReport"
            ],
            "readsFields": [
              "status",
              "openedAt",
              "closedAt",
              "openedBy",
              "closedBy",
              "totalApurado"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 40,
            "intentions": [
              {
                "id": "int-shift-summary-21",
                "intent": "summary",
                "order": 10,
                "titleKey": "shiftManagement.summary.section.title",
                "fields": [
                  {
                    "id": "field-summary-status-21",
                    "field": "status",
                    "labelKey": "shiftManagement.summary.field.status",
                    "order": 10,
                    "required": false
                  },
                  {
                    "id": "field-summary-openedAt-21",
                    "field": "openedAt",
                    "labelKey": "shiftManagement.summary.field.openedAt",
                    "order": 20,
                    "required": false
                  },
                  {
                    "id": "field-summary-closedAt-21",
                    "field": "closedAt",
                    "labelKey": "shiftManagement.summary.field.closedAt",
                    "order": 30,
                    "required": false
                  },
                  {
                    "id": "field-summary-totalApurado-21",
                    "field": "totalApurado",
                    "labelKey": "shiftManagement.summary.field.totalApurado",
                    "order": 40,
                    "required": false
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
      "id": "bind-openShift-21",
      "source": "bff",
      "entity": "Shift",
      "command": "openShift",
      "description": "Abrir turno",
      "stateKey": "ui.shiftManagement.output.openShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.openShift.notes"
      ]
    },
    {
      "id": "bind-closeShift-21",
      "source": "bff",
      "entity": "Shift",
      "command": "closeShift",
      "description": "Fechar turno",
      "stateKey": "ui.shiftManagement.output.closeShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.closeShift.totalApurado",
        "ui.shiftManagement.input.closeShift.notes"
      ]
    },
    {
      "id": "bind-viewShiftClosingReport-21",
      "source": "bff",
      "entity": "ShiftClosingReport",
      "command": "viewShiftClosingReport",
      "description": "Carregar relatório de fechamento",
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
      "inputStateKeys": []
    },
    {
      "id": "bind-report-data-21",
      "source": "state",
      "description": "Dados do relatório de fechamento",
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
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
      "_102051_/l2/cafeFlow/web/contracts/shiftManagement.ts"
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
