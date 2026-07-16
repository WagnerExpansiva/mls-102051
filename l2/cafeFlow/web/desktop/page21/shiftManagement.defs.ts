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
      "id": "sec_shiftStatus",
      "type": "section",
      "sectionName": "sec_shiftStatus",
      "titleKey": "sec.shiftStatus.title",
      "mode": "summary-first",
      "order": 1,
      "organisms": [
        {
          "id": "org_shiftLifecycle",
          "type": "organism",
          "organismName": "ShiftLifecyclePanel",
          "titleKey": "org.shiftLifecycle.title",
          "purpose": "Exibir o status atual do turno e prover ações de ciclo de vida (abrir/fechar) como transições contextuais",
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
            "shiftId",
            "status",
            "openedAt",
            "openedBy",
            "closedAt",
            "closedBy",
            "totalApurado",
            "notes"
          ],
          "rulesApplied": [
            "singleOpenShift"
          ],
          "order": 1,
          "intentionRefs": [
            {
              "id": "intent_openShift",
              "intent": "command",
              "stateKey": "ui.shiftManagement.action.openShift.status",
              "action": "openShift",
              "submitAction": "openShift",
              "order": 1
            },
            {
              "id": "intent_closeShift",
              "intent": "command",
              "stateKey": "ui.shiftManagement.action.closeShift.status",
              "action": "closeShift",
              "submitAction": "closeShift",
              "order": 2
            }
          ]
        }
      ]
    },
    {
      "id": "sec_closingReport",
      "type": "section",
      "sectionName": "sec_closingReport",
      "titleKey": "sec.closingReport.title",
      "mode": "summary-first",
      "order": 2,
      "organisms": [
        {
          "id": "org_closingReport",
          "type": "organism",
          "organismName": "ClosingReportPanel",
          "titleKey": "org.closingReport.title",
          "purpose": "Exibir o relatório de fechamento de turno com total apurado e pedidos pagos consolidados",
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
              "id": "intent_viewShiftClosingReport",
              "intent": "query",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "action": "viewShiftClosingReport",
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
    "jobToBeDone": "Gerenciar o ciclo de vida do turno diário — abrir no início, fechar com reconciliação no fim, e revisar o relatório de fechamento",
    "primaryDecision": "Decidir se abre um novo turno ou fecha o turno atualmente aberto, confirmando o total apurado",
    "decisiveInfo": [
      "status",
      "totalApurado",
      "notes"
    ],
    "usageFrequency": "Duas vezes ao dia (abertura e fechamento) — operacional/back-office",
    "criticalActions": [
      {
        "action": "openShift",
        "presentation": "primary-button contextual-transition-actions"
      },
      {
        "action": "closeShift",
        "presentation": "primary-button contextual-transition-actions com formulário inline"
      },
      {
        "action": "viewShiftClosingReport",
        "presentation": "summary-first display"
      }
    ],
    "informationHierarchy": [
      "Status atual do turno (aberto/fechado) e dados de abertura",
      "Ação de ciclo de vida contextual (abrir ou fechar)",
      "Relatório de fechamento com total apurado e pedidos pagos"
    ],
    "successCriteria": "O gerente vê imediatamente o status do turno, executa abertura ou fechamento com mínima fricção, e consulta o relatório de fechamento sem digitar IDs manualmente",
    "antiPatterns": [
      "Formulário separado de transição de status",
      "Select livre sobre enum de status",
      "ID de turno digitado manualmente",
      "Campos system-owned (shiftId, openedAt, closedAt) como inputs manuais"
    ]
  },
  "msgKeys": [
    "action.closeShift",
    "action.closeShift.error",
    "action.closeShift.success",
    "action.openShift",
    "action.openShift.error",
    "action.openShift.success",
    "empty.closingReport",
    "field.createdAt",
    "field.notes",
    "field.paidOrderCount",
    "field.shiftClosingReportId",
    "field.shiftId",
    "field.totalApurado",
    "field.updatedAt",
    "org.closingReport.title",
    "org.shiftLifecycle.title",
    "page.title",
    "sec.closingReport.title",
    "sec.shiftStatus.title",
    "section.closingReport.title",
    "section.shiftStatus.closeShiftTitle",
    "section.shiftStatus.openShiftTitle",
    "section.shiftStatus.title"
  ],
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "sec_shiftStatus",
        "type": "section",
        "sectionName": "sec_shiftStatus",
        "titleKey": "sec.shiftStatus.title",
        "mode": "summary-first",
        "order": 1,
        "organisms": [
          {
            "id": "org_shiftLifecycle",
            "type": "organism",
            "organismName": "ShiftLifecyclePanel",
            "titleKey": "org.shiftLifecycle.title",
            "purpose": "Exibir o status atual do turno e prover ações de ciclo de vida (abrir/fechar) como transições contextuais",
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
              "shiftId",
              "status",
              "openedAt",
              "openedBy",
              "closedAt",
              "closedBy",
              "totalApurado",
              "notes"
            ],
            "rulesApplied": [
              "singleOpenShift"
            ],
            "order": 1,
            "intentions": [
              {
                "id": "intent_openShift",
                "intent": "command",
                "order": 1,
                "titleKey": "section.shiftStatus.openShiftTitle",
                "binding": "binding_openShift",
                "action": "openShift",
                "submitAction": "openShift",
                "displayHint": "contextual-transition-actions",
                "stateKey": "ui.shiftManagement.action.openShift.status",
                "fields": [
                  {
                    "id": "f_openShift_notes",
                    "field": "notes",
                    "labelKey": "field.notes",
                    "order": 1,
                    "required": false,
                    "inputType": "textarea",
                    "source": "set.openShiftNotes",
                    "stateKey": "ui.shiftManagement.input.openShift.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "a_openShift_submit",
                    "action": "openShift",
                    "labelKey": "action.openShift",
                    "order": 1,
                    "displayHint": "primary-button",
                    "actionKey": "openShift"
                  }
                ]
              },
              {
                "id": "intent_closeShift",
                "intent": "command",
                "order": 2,
                "titleKey": "section.shiftStatus.closeShiftTitle",
                "binding": "binding_closeShift",
                "action": "closeShift",
                "submitAction": "closeShift",
                "displayHint": "contextual-transition-actions",
                "stateKey": "ui.shiftManagement.action.closeShift.status",
                "fields": [
                  {
                    "id": "f_closeShift_totalApurado",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado",
                    "order": 1,
                    "required": true,
                    "inputType": "number",
                    "source": "set.closeShiftTotalApurado",
                    "stateKey": "ui.shiftManagement.input.closeShift.totalApurado"
                  },
                  {
                    "id": "f_closeShift_notes",
                    "field": "notes",
                    "labelKey": "field.notes",
                    "order": 2,
                    "required": false,
                    "inputType": "textarea",
                    "source": "set.closeShiftNotes",
                    "stateKey": "ui.shiftManagement.input.closeShift.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "a_closeShift_submit",
                    "action": "closeShift",
                    "labelKey": "action.closeShift",
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
        "id": "sec_closingReport",
        "type": "section",
        "sectionName": "sec_closingReport",
        "titleKey": "sec.closingReport.title",
        "mode": "summary-first",
        "order": 2,
        "organisms": [
          {
            "id": "org_closingReport",
            "type": "organism",
            "organismName": "ClosingReportPanel",
            "titleKey": "org.closingReport.title",
            "purpose": "Exibir o relatório de fechamento de turno com total apurado e pedidos pagos consolidados",
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
                "id": "intent_viewShiftClosingReport",
                "intent": "query",
                "order": 1,
                "titleKey": "section.closingReport.title",
                "source": "viewShiftClosingReport",
                "binding": "binding_viewShiftClosingReport",
                "action": "viewShiftClosingReport",
                "emptyKey": "empty.closingReport",
                "displayHint": "summary-first",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [],
                "columns": [
                  {
                    "id": "col_reportId",
                    "field": "shiftClosingReportId",
                    "labelKey": "field.shiftClosingReportId",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_shiftId",
                    "field": "shiftId",
                    "labelKey": "field.shiftId",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_totalApurado",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado",
                    "order": 3,
                    "required": false,
                    "inputType": "number",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_paidOrderCount",
                    "field": "paidOrderCount",
                    "labelKey": "field.paidOrderCount",
                    "order": 4,
                    "required": false,
                    "inputType": "number",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt",
                    "order": 5,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col_updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt",
                    "order": 6,
                    "required": false,
                    "inputType": "datetime",
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
      "id": "binding_openShift",
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
      "id": "binding_closeShift",
      "source": "command",
      "entity": "Shift",
      "command": "closeShift",
      "description": "Fecha o turno diário e gera relatório",
      "stateKey": "ui.shiftManagement.output.closeShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.closeShift.totalApurado",
        "ui.shiftManagement.input.closeShift.notes"
      ]
    },
    {
      "id": "binding_viewShiftClosingReport",
      "source": "query",
      "entity": "ShiftClosingReport",
      "command": "viewShiftClosingReport",
      "description": "Consulta relatório de fechamento por shiftId",
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
      "_102051_/l2/cafeFlow/web/shared/shiftManagement.ts",
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
