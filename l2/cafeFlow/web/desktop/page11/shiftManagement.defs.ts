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
      "id": "sec-discover",
      "type": "section",
      "sectionName": "sec-discover",
      "titleKey": "sec.discover.title",
      "mode": "query",
      "order": 1,
      "organisms": [
        {
          "id": "org-report-cards",
          "type": "organism",
          "organismName": "ReportCards",
          "titleKey": "org.report.cards.title",
          "purpose": "Exibir relatório de fechamento de turno como cartão detalhado com total apurado e pedidos pagos",
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
              "id": "int-view-report",
              "intent": "queryList",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "id": "sec-open-shift",
      "type": "section",
      "sectionName": "sec-open-shift",
      "titleKey": "sec.open.shift.title",
      "mode": "command",
      "order": 2,
      "organisms": [
        {
          "id": "org-open-shift",
          "type": "organism",
          "organismName": "OpenShiftForm",
          "titleKey": "org.open.shift.title",
          "purpose": "Formulário para abrir turno diário com observações opcionais",
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
              "id": "int-open-shift",
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
      "id": "sec-close-shift",
      "type": "section",
      "sectionName": "sec-close-shift",
      "titleKey": "sec.close.shift.title",
      "mode": "command",
      "order": 3,
      "organisms": [
        {
          "id": "org-close-shift",
          "type": "organism",
          "organismName": "CloseShiftForm",
          "titleKey": "org.close.shift.title",
          "purpose": "Formulário para fechar turno diário confirmando total apurado e observações",
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
              "id": "int-close-shift",
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
      "id": "sec-review",
      "type": "section",
      "sectionName": "sec-review",
      "titleKey": "sec.review.title",
      "mode": "review",
      "order": 4,
      "organisms": [
        {
          "id": "org-shift-summary",
          "type": "organism",
          "organismName": "ShiftSummary",
          "titleKey": "org.shift.summary.title",
          "purpose": "Resumo do turno exibindo dados de abertura e fechamento para conferência",
          "userActions": [],
          "requiredEntities": [
            "Shift"
          ],
          "readsFields": [
            "shiftId",
            "status",
            "openedAt",
            "openedBy",
            "closedAt",
            "closedBy",
            "totalApurado"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-summary",
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
  "layout": {
    "id": "page11-mobile-cards",
    "type": "page",
    "sections": [
      {
        "id": "sec-discover",
        "type": "section",
        "sectionName": "sec-discover",
        "titleKey": "sec.discover.title",
        "mode": "query",
        "order": 1,
        "organisms": [
          {
            "id": "org-report-cards",
            "type": "organism",
            "organismName": "ReportCards",
            "titleKey": "org.report.cards.title",
            "purpose": "Exibir relatório de fechamento de turno como cartão detalhado com total apurado e pedidos pagos",
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
                "id": "int-view-report",
                "intent": "queryList",
                "order": 1,
                "titleKey": "section.discover.title",
                "source": "ui.shiftManagement.data.viewShiftClosingReport",
                "binding": "viewShiftClosingReport",
                "emptyKey": "empty.reports",
                "displayHint": "card",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [],
                "columns": [
                  {
                    "id": "col-rpt-id",
                    "field": "shiftClosingReportId",
                    "labelKey": "field.shiftClosingReportId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-rpt-shift",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-rpt-total",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "currency",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-rpt-paid",
                    "field": "paidOrderCount",
                    "labelKey": "field.paidOrderCount.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "format": "integer",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-rpt-created",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-rpt-updated",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  }
                ],
                "filters": [
                  {
                    "id": "flt-shift-id",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "hidden",
                    "source": "ui.shiftManagement.input.viewShiftClosingReport.shiftId",
                    "stateKey": "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      },
      {
        "id": "sec-open-shift",
        "type": "section",
        "sectionName": "sec-open-shift",
        "titleKey": "sec.open.shift.title",
        "mode": "command",
        "order": 2,
        "organisms": [
          {
            "id": "org-open-shift",
            "type": "organism",
            "organismName": "OpenShiftForm",
            "titleKey": "org.open.shift.title",
            "purpose": "Formulário para abrir turno diário com observações opcionais",
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
                "id": "int-open-shift",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.openShift.title",
                "action": "openShift",
                "submitAction": "openShift",
                "displayHint": "card",
                "stateKey": "ui.shiftManagement.action.openShift.status",
                "fields": [
                  {
                    "id": "fld-open-notes",
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
        "sectionName": "sec-close-shift",
        "titleKey": "sec.close.shift.title",
        "mode": "command",
        "order": 3,
        "organisms": [
          {
            "id": "org-close-shift",
            "type": "organism",
            "organismName": "CloseShiftForm",
            "titleKey": "org.close.shift.title",
            "purpose": "Formulário para fechar turno diário confirmando total apurado e observações",
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
                "id": "int-close-shift",
                "intent": "commandForm",
                "order": 1,
                "titleKey": "section.closeShift.title",
                "action": "closeShift",
                "submitAction": "closeShift",
                "displayHint": "card",
                "stateKey": "ui.shiftManagement.action.closeShift.status",
                "fields": [
                  {
                    "id": "fld-close-total",
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
                    "id": "fld-close-notes",
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
                    "id": "act-submit-close",
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
        "id": "sec-review",
        "type": "section",
        "sectionName": "sec-review",
        "titleKey": "sec.review.title",
        "mode": "review",
        "order": 4,
        "organisms": [
          {
            "id": "org-shift-summary",
            "type": "organism",
            "organismName": "ShiftSummary",
            "titleKey": "org.shift.summary.title",
            "purpose": "Resumo do turno exibindo dados de abertura e fechamento para conferência",
            "userActions": [],
            "requiredEntities": [
              "Shift"
            ],
            "readsFields": [
              "shiftId",
              "status",
              "openedAt",
              "openedBy",
              "closedAt",
              "closedBy",
              "totalApurado"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 1,
            "intentions": [
              {
                "id": "int-summary",
                "intent": "summary",
                "order": 1,
                "titleKey": "section.review.title",
                "displayHint": "card",
                "fields": [],
                "columns": [
                  {
                    "id": "col-sum-shift-id",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.shiftManagement.output.openShift"
                  },
                  {
                    "id": "col-sum-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.shiftManagement.output.openShift"
                  },
                  {
                    "id": "col-sum-opened-at",
                    "field": "openedAt",
                    "labelKey": "field.openedAt.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "ui.shiftManagement.output.openShift"
                  },
                  {
                    "id": "col-sum-opened-by",
                    "field": "openedBy",
                    "labelKey": "field.openedBy.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.shiftManagement.output.openShift"
                  },
                  {
                    "id": "col-sum-closed-at",
                    "field": "closedAt",
                    "labelKey": "field.closedAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "ui.shiftManagement.output.closeShift"
                  },
                  {
                    "id": "col-sum-closed-by",
                    "field": "closedBy",
                    "labelKey": "field.closedBy.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "source": "ui.shiftManagement.output.closeShift"
                  },
                  {
                    "id": "col-sum-total",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 7,
                    "required": false,
                    "inputType": "text",
                    "format": "currency",
                    "source": "ui.shiftManagement.output.closeShift"
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
      "id": "bind-view-report",
      "source": "query",
      "entity": "ShiftClosingReport",
      "command": "viewShiftClosingReport",
      "description": "Carrega relatório de fechamento por shiftId",
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
      "inputStateKeys": [
        "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
      ]
    },
    {
      "id": "bind-open-shift",
      "source": "command",
      "entity": "Shift",
      "command": "openShift",
      "description": "Abre turno diário",
      "stateKey": "ui.shiftManagement.output.openShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.openShift.notes"
      ]
    },
    {
      "id": "bind-close-shift",
      "source": "command",
      "entity": "Shift",
      "command": "closeShift",
      "description": "Fecha turno diário",
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
