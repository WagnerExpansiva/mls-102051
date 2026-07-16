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
      "mode": "card",
      "order": 0,
      "organisms": [
        {
          "id": "org-shift-report",
          "type": "organism",
          "organismName": "ShiftReportCard",
          "titleKey": "org.shift.report.title",
          "purpose": "Exibir o relatório de fechamento de turno como um cartão legível com total apurado e pedidos pagos.",
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
            "routeParam:shiftId"
          ],
          "order": 0,
          "intentionRefs": [
            {
              "id": "int-view-report",
              "intent": "queryList",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "action": "viewShiftClosingReport",
              "order": 0
            }
          ]
        }
      ]
    },
    {
      "id": "sec-execute-openShift",
      "type": "section",
      "sectionName": "sec-execute-openShift",
      "titleKey": "sec.execute.openShift.title",
      "mode": "form",
      "order": 1,
      "organisms": [
        {
          "id": "org-open-shift",
          "type": "organism",
          "organismName": "OpenShiftForm",
          "titleKey": "org.open.shift.title",
          "purpose": "Permitir ao gerente abrir um novo turno diário com observações opcionais.",
          "userActions": [
            "openShift"
          ],
          "requiredEntities": [
            "Shift"
          ],
          "readsFields": [
            "notes"
          ],
          "writesFields": [
            "shiftId",
            "status",
            "openedAt",
            "openedBy"
          ],
          "rulesApplied": [
            "singleOpenShift"
          ],
          "order": 0,
          "intentionRefs": [
            {
              "id": "int-open-shift",
              "intent": "commandForm",
              "stateKey": "ui.shiftManagement.action.openShift.status",
              "action": "openShift",
              "submitAction": "openShift",
              "order": 0
            }
          ]
        }
      ]
    },
    {
      "id": "sec-execute-closeShift",
      "type": "section",
      "sectionName": "sec-execute-closeShift",
      "titleKey": "sec.execute.closeShift.title",
      "mode": "form",
      "order": 2,
      "organisms": [
        {
          "id": "org-close-shift",
          "type": "organism",
          "organismName": "CloseShiftForm",
          "titleKey": "org.close.shift.title",
          "purpose": "Permitir ao gerente fechar o turno atual confirmando o total apurado e adicionando observações.",
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
            "status",
            "closedAt",
            "closedBy",
            "totalApurado",
            "notes"
          ],
          "rulesApplied": [
            "shiftMustBeOpen",
            "consolidatePaidOrders"
          ],
          "order": 0,
          "intentionRefs": [
            {
              "id": "int-close-shift",
              "intent": "commandForm",
              "stateKey": "ui.shiftManagement.action.closeShift.status",
              "action": "closeShift",
              "submitAction": "closeShift",
              "order": 0
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
          "id": "org-shift-summary",
          "type": "organism",
          "organismName": "ShiftSummaryCard",
          "titleKey": "org.shift.summary.title",
          "purpose": "Resumir o estado atual do turno e o resultado dos comandos executados para conferência do gerente.",
          "userActions": [],
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
            "notes"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 0,
          "intentionRefs": [
            {
              "id": "int-summary",
              "intent": "summary",
              "stateKey": "ui.shiftManagement.status",
              "order": 0
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
        "mode": "card",
        "order": 0,
        "organisms": [
          {
            "id": "org-shift-report",
            "type": "organism",
            "organismName": "ShiftReportCard",
            "titleKey": "org.shift.report.title",
            "purpose": "Exibir o relatório de fechamento de turno como um cartão legível com total apurado e pedidos pagos.",
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
              "routeParam:shiftId"
            ],
            "order": 0,
            "intentions": [
              {
                "id": "int-view-report",
                "intent": "queryList",
                "order": 0,
                "titleKey": "intention.viewReport.title",
                "source": "ui.shiftManagement.data.viewShiftClosingReport",
                "binding": "viewShiftClosingReport",
                "action": "viewShiftClosingReport",
                "emptyKey": "empty.shiftReport",
                "displayHint": "card",
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
                "fields": [],
                "columns": [
                  {
                    "id": "col-report-shiftId",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 0,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-report-totalApurado",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "format": "currency",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-report-paidOrderCount",
                    "field": "paidOrderCount",
                    "labelKey": "field.paidOrderCount.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "format": "number",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-report-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "col-report-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  }
                ],
                "filters": [
                  {
                    "id": "flt-report-shiftId",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 0,
                    "required": false,
                    "inputType": "hidden",
                    "source": "routeParam",
                    "stateKey": "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-view-report",
                    "action": "viewShiftClosingReport",
                    "labelKey": "action.viewShiftClosingReport.label",
                    "order": 0,
                    "displayHint": "primary",
                    "actionKey": "viewShiftClosingReport"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec-execute-openShift",
        "type": "section",
        "sectionName": "sec-execute-openShift",
        "titleKey": "sec.execute.openShift.title",
        "mode": "form",
        "order": 1,
        "organisms": [
          {
            "id": "org-open-shift",
            "type": "organism",
            "organismName": "OpenShiftForm",
            "titleKey": "org.open.shift.title",
            "purpose": "Permitir ao gerente abrir um novo turno diário com observações opcionais.",
            "userActions": [
              "openShift"
            ],
            "requiredEntities": [
              "Shift"
            ],
            "readsFields": [
              "notes"
            ],
            "writesFields": [
              "shiftId",
              "status",
              "openedAt",
              "openedBy"
            ],
            "rulesApplied": [
              "singleOpenShift"
            ],
            "order": 0,
            "intentions": [
              {
                "id": "int-open-shift",
                "intent": "commandForm",
                "order": 0,
                "titleKey": "intention.openShift.title",
                "source": "ui.shiftManagement.input.openShift.notes",
                "binding": "openShift",
                "action": "openShift",
                "submitAction": "openShift",
                "emptyKey": "empty.openShift",
                "displayHint": "bottomSheet",
                "stateKey": "ui.shiftManagement.action.openShift.status",
                "fields": [
                  {
                    "id": "fld-open-notes",
                    "field": "notes",
                    "labelKey": "field.notes.label",
                    "order": 0,
                    "required": false,
                    "inputType": "textarea",
                    "source": "userInput",
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
                    "order": 0,
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
        "id": "sec-execute-closeShift",
        "type": "section",
        "sectionName": "sec-execute-closeShift",
        "titleKey": "sec.execute.closeShift.title",
        "mode": "form",
        "order": 2,
        "organisms": [
          {
            "id": "org-close-shift",
            "type": "organism",
            "organismName": "CloseShiftForm",
            "titleKey": "org.close.shift.title",
            "purpose": "Permitir ao gerente fechar o turno atual confirmando o total apurado e adicionando observações.",
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
              "status",
              "closedAt",
              "closedBy",
              "totalApurado",
              "notes"
            ],
            "rulesApplied": [
              "shiftMustBeOpen",
              "consolidatePaidOrders"
            ],
            "order": 0,
            "intentions": [
              {
                "id": "int-close-shift",
                "intent": "commandForm",
                "order": 0,
                "titleKey": "intention.closeShift.title",
                "source": "ui.shiftManagement.input.closeShift.totalApurado",
                "binding": "closeShift",
                "action": "closeShift",
                "submitAction": "closeShift",
                "emptyKey": "empty.closeShift",
                "displayHint": "bottomSheet",
                "stateKey": "ui.shiftManagement.action.closeShift.status",
                "fields": [
                  {
                    "id": "fld-close-totalApurado",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 0,
                    "required": true,
                    "inputType": "number",
                    "format": "currency",
                    "source": "userInput",
                    "stateKey": "ui.shiftManagement.input.closeShift.totalApurado"
                  },
                  {
                    "id": "fld-close-notes",
                    "field": "notes",
                    "labelKey": "field.notes.label",
                    "order": 1,
                    "required": false,
                    "inputType": "textarea",
                    "source": "userInput",
                    "stateKey": "ui.shiftManagement.input.closeShift.notes"
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
                    "order": 0,
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
        "sectionName": "sec-review",
        "titleKey": "sec.review.title",
        "mode": "summary",
        "order": 3,
        "organisms": [
          {
            "id": "org-shift-summary",
            "type": "organism",
            "organismName": "ShiftSummaryCard",
            "titleKey": "org.shift.summary.title",
            "purpose": "Resumir o estado atual do turno e o resultado dos comandos executados para conferência do gerente.",
            "userActions": [],
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
              "notes"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 0,
            "intentions": [
              {
                "id": "int-summary",
                "intent": "summary",
                "order": 0,
                "titleKey": "intention.summary.title",
                "source": "ui.shiftManagement.output.openShift",
                "binding": "openShiftOutput",
                "emptyKey": "empty.summary",
                "displayHint": "card",
                "stateKey": "ui.shiftManagement.status",
                "fields": [],
                "columns": [
                  {
                    "id": "col-sum-shiftId",
                    "field": "shiftId",
                    "labelKey": "field.shiftId.label",
                    "order": 0,
                    "required": false,
                    "inputType": "text",
                    "format": "text"
                  },
                  {
                    "id": "col-sum-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 1,
                    "required": false,
                    "inputType": "text",
                    "format": "text"
                  },
                  {
                    "id": "col-sum-openedAt",
                    "field": "openedAt",
                    "labelKey": "field.openedAt.label",
                    "order": 2,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime"
                  },
                  {
                    "id": "col-sum-openedBy",
                    "field": "openedBy",
                    "labelKey": "field.openedBy.label",
                    "order": 3,
                    "required": false,
                    "inputType": "text",
                    "format": "text"
                  },
                  {
                    "id": "col-sum-closedAt",
                    "field": "closedAt",
                    "labelKey": "field.closedAt.label",
                    "order": 4,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime"
                  },
                  {
                    "id": "col-sum-closedBy",
                    "field": "closedBy",
                    "labelKey": "field.closedBy.label",
                    "order": 5,
                    "required": false,
                    "inputType": "text",
                    "format": "text"
                  },
                  {
                    "id": "col-sum-totalApurado",
                    "field": "totalApurado",
                    "labelKey": "field.totalApurado.label",
                    "order": 6,
                    "required": false,
                    "inputType": "text",
                    "format": "currency"
                  },
                  {
                    "id": "col-sum-notes",
                    "field": "notes",
                    "labelKey": "field.notes.label",
                    "order": 7,
                    "required": false,
                    "inputType": "text",
                    "format": "text"
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
      "id": "bind-viewShiftClosingReport",
      "source": "cafeFlow.shiftLifecycle.viewShiftClosingReport",
      "entity": "ShiftClosingReport",
      "command": "viewShiftClosingReport",
      "description": "Carrega o relatório de fechamento de turno pelo shiftId da rota.",
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
      "inputStateKeys": [
        "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
      ]
    },
    {
      "id": "bind-openShift",
      "source": "cafeFlow.shiftLifecycle.openShift",
      "entity": "Shift",
      "command": "openShift",
      "description": "Abre um novo turno diário com observações opcionais.",
      "stateKey": "ui.shiftManagement.output.openShift",
      "inputStateKeys": [
        "ui.shiftManagement.input.openShift.notes"
      ]
    },
    {
      "id": "bind-closeShift",
      "source": "cafeFlow.shiftLifecycle.closeShift",
      "entity": "Shift",
      "command": "closeShift",
      "description": "Fecha o turno atual registrando total apurado e observações.",
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
