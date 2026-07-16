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
      "id": "sec-shift-lifecycle",
      "type": "section",
      "sectionName": "Gestão do turno",
      "titleKey": "section.shiftLifecycle.title",
      "mode": "primary",
      "order": 1,
      "organisms": [
        {
          "id": "org-shift-control",
          "type": "organism",
          "organismName": "ShiftControl",
          "titleKey": "org.shift.control.title",
          "purpose": "Exibir o status atual do turno e prover ações contextuais de abertura e fechamento do ciclo de vida.",
          "userActions": [
            "openShift",
            "closeShift"
          ],
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
            "totalApurado",
            "notes"
          ],
          "writesFields": [
            "notes",
            "totalApurado",
            "status",
            "openedAt",
            "openedBy",
            "closedAt",
            "closedBy"
          ],
          "rulesApplied": [
            "singleOpenShift"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "int-shift-summary",
              "intent": "display",
              "stateKey": "ui.shiftManagement.output.openShift",
              "order": 1
            },
            {
              "id": "int-open-shift",
              "intent": "create",
              "stateKey": "ui.shiftManagement.input.openShift.notes",
              "order": 2
            },
            {
              "id": "int-close-shift",
              "intent": "update",
              "stateKey": "ui.shiftManagement.input.closeShift.totalApurado",
              "order": 3
            }
          ]
        }
      ]
    },
    {
      "id": "sec-closing-report",
      "type": "section",
      "sectionName": "Relatório de fechamento",
      "titleKey": "section.closingReport.title",
      "mode": "secondary",
      "order": 2,
      "organisms": [
        {
          "id": "org-closing-report",
          "type": "organism",
          "organismName": "ClosingReportDetail",
          "titleKey": "org.closing.report.title",
          "purpose": "Exibir o relatório de fechamento de turno com total apurado e pedidos pagos consolidados para conferência.",
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
              "id": "int-report-display",
              "intent": "view",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
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
    "actor": "Gerente do café",
    "jobToBeDone": "Gerenciar o ciclo de vida do turno diário: abrir no início do expediente, fechar ao final registrando o total apurado, e revisar o relatório de fechamento para conferência.",
    "primaryDecision": "Decidir se deve abrir ou fechar o turno atual com base no status exibido, executando a transição de ciclo de vida apropriada.",
    "decisiveInfo": [
      "status",
      "totalApurado",
      "paidOrderCount",
      "notes"
    ],
    "usageFrequency": "Duas vezes ao dia (abertura e fechamento) — operacional/back-office, uso ocasional mas crítico.",
    "criticalActions": [
      {
        "action": "openShift",
        "presentation": "primary-button contextual-transition-actions — botão primário visível quando não há turno aberto"
      },
      {
        "action": "closeShift",
        "presentation": "primary-button contextual-transition-actions — botão primário visível quando há turno aberto, com formulário inline para totalApurado e notes"
      },
      {
        "action": "viewShiftClosingReport",
        "presentation": "summary-first — exibição automática do relatório após fechamento, carregado via routeParam"
      }
    ],
    "informationHierarchy": [
      "Status atual do turno (open/closed) com dados de abertura",
      "Ação contextual de transição (abrir ou fechar)",
      "Formulário inline da transição ativa (notes para abrir; totalApurado + notes para fechar)",
      "Relatório de fechamento com total apurado e pedidos pagos"
    ],
    "successCriteria": "O gerente vê imediatamente o status do turno, executa abertura ou fechamento com mínima fricção (um botão + campos mínimos), e revisa o relatório de fechamento sem digitar IDs manualmente.",
    "antiPatterns": [
      "Formulário separado para cada operação empilhado verticalmente",
      "Campo select livre para escolher status do turno",
      "Digitação manual de shiftId",
      "Exibir campos system-owned (openedAt, closedAt, openedBy, closedBy) como inputs editáveis",
      "Tela de relatório separada exigindo navegação adicional"
    ]
  },
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "sec-shift-lifecycle",
        "type": "section",
        "sectionName": "Gestão do turno",
        "titleKey": "section.shiftLifecycle.title",
        "mode": "primary",
        "order": 1,
        "organisms": [
          {
            "id": "org-shift-control",
            "type": "organism",
            "organismName": "ShiftControl",
            "titleKey": "org.shift.control.title",
            "purpose": "Exibir o status atual do turno e prover ações contextuais de abertura e fechamento do ciclo de vida.",
            "userActions": [
              "openShift",
              "closeShift"
            ],
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
              "totalApurado",
              "notes"
            ],
            "writesFields": [
              "notes",
              "totalApurado",
              "status",
              "openedAt",
              "openedBy",
              "closedAt",
              "closedBy"
            ],
            "rulesApplied": [
              "singleOpenShift"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "int-shift-summary",
                "intent": "display",
                "order": 1,
                "titleKey": "intention.shiftSummary.title",
                "emptyKey": "intention.shiftSummary.empty",
                "displayHint": "summary-first",
                "stateKey": "ui.shiftManagement.output.openShift",
                "fields": [
                  {
                    "id": "fld-sum-shiftId",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.shiftManagement.output.openShift",
                    "stateKey": "ui.shiftManagement.output.openShift"
                  },
                  {
                    "id": "fld-sum-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 2,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.shiftManagement.output.openShift",
                    "stateKey": "ui.shiftManagement.output.openShift"
                  },
                  {
                    "id": "fld-sum-openedAt",
                    "field": "openedAt",
                    "labelKey": "field.openedAt.label",
                    "order": 3,
                    "required": false,
                    "inputType": "readonly",
                    "format": "datetime",
                    "source": "ui.shiftManagement.output.openShift",
                    "stateKey": "ui.shiftManagement.output.openShift"
                  },
                  {
                    "id": "fld-sum-openedBy",
                    "field": "openedBy",
                    "labelKey": "field.openedBy.label",
                    "order": 4,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.shiftManagement.output.openShift",
                    "stateKey": "ui.shiftManagement.output.openShift"
                  },
                  {
                    "id": "fld-sum-closedAt",
                    "field": "closedAt",
                    "labelKey": "field.closedAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "readonly",
                    "format": "datetime",
                    "source": "ui.shiftManagement.output.closeShift",
                    "stateKey": "ui.shiftManagement.output.closeShift"
                  },
                  {
                    "id": "fld-sum-closedBy",
                    "field": "closedBy",
                    "labelKey": "field.closedBy.label",
                    "order": 6,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.shiftManagement.output.closeShift",
                    "stateKey": "ui.shiftManagement.output.closeShift"
                  },
                  {
                    "id": "fld-sum-totalApurado",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 7,
                    "required": false,
                    "inputType": "readonly",
                    "format": "currency",
                    "source": "ui.shiftManagement.output.closeShift",
                    "stateKey": "ui.shiftManagement.output.closeShift"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "int-open-shift",
                "intent": "create",
                "order": 2,
                "titleKey": "intention.openShiftForm.title",
                "displayHint": "contextual-transition-actions",
                "stateKey": "ui.shiftManagement.input.openShift.notes",
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
                    "id": "act-open-shift",
                    "action": "openShift",
                    "labelKey": "action.openShift.label",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "openShift"
                  }
                ]
              },
              {
                "id": "int-close-shift",
                "intent": "update",
                "order": 3,
                "titleKey": "intention.closeShiftForm.title",
                "displayHint": "contextual-transition-actions",
                "stateKey": "ui.shiftManagement.input.closeShift.totalApurado",
                "fields": [
                  {
                    "id": "fld-close-totalApurado",
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
                    "stateKey": "ui.shiftManagement.input.openShift.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-close-shift",
                    "action": "closeShift",
                    "labelKey": "action.closeShift.label",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "closeShift"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec-closing-report",
        "type": "section",
        "sectionName": "Relatório de fechamento",
        "titleKey": "section.closingReport.title",
        "mode": "secondary",
        "order": 2,
        "organisms": [
          {
            "id": "org-closing-report",
            "type": "organism",
            "organismName": "ClosingReportDetail",
            "titleKey": "org.closing.report.title",
            "purpose": "Exibir o relatório de fechamento de turno com total apurado e pedidos pagos consolidados para conferência.",
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
                "id": "int-report-display",
                "intent": "view",
                "order": 1,
                "titleKey": "intention.reportDisplay.title",
                "emptyKey": "intention.reportDisplay.empty",
                "displayHint": "summary-first",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [
                  {
                    "id": "fld-rpt-shiftClosingReportId",
                    "field": "shiftClosingReportId",
                    "labelKey": "field.shiftClosingReportId.label",
                    "order": 1,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "fld-rpt-shiftId",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 2,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
                  },
                  {
                    "id": "fld-rpt-totalApurado",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 3,
                    "required": false,
                    "inputType": "readonly",
                    "format": "currency",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "fld-rpt-paidOrderCount",
                    "field": "paidOrderCount",
                    "labelKey": "field.paidOrderCount.label",
                    "order": 4,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "fld-rpt-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 5,
                    "required": false,
                    "inputType": "readonly",
                    "format": "datetime",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "fld-rpt-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 6,
                    "required": false,
                    "inputType": "readonly",
                    "format": "datetime",
                    "source": "ui.shiftManagement.data.viewShiftClosingReport",
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
      "source": "ui.shiftManagement.output.openShift",
      "entity": "Shift",
      "command": "openShift",
      "description": "Output do comando openShift — shift criado com status open",
      "stateKey": "ui.shiftManagement.output.openShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.openShift.notes"
      ]
    },
    {
      "id": "bind-closeShift",
      "source": "ui.shiftManagement.output.closeShift",
      "entity": "Shift",
      "command": "closeShift",
      "description": "Output do comando closeShift — turno fechado com total apurado",
      "stateKey": "ui.shiftManagement.output.closeShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.closeShift.totalApurado",
        "ui.shiftManagement.input.closeShift.notes"
      ]
    },
    {
      "id": "bind-viewShiftClosingReport",
      "source": "ui.shiftManagement.data.viewShiftClosingReport",
      "entity": "ShiftClosingReport",
      "command": "viewShiftClosingReport",
      "description": "Resultado da query viewShiftClosingReport — relatório de fechamento",
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
      "inputStateKeys": [
        "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
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
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI with real-time kitchen board"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
