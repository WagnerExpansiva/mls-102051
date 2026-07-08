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
      "id": "section_shift_management",
      "type": "section",
      "sectionName": "Gestão de turno diário",
      "titleKey": "shiftManagement.section.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "organism_open_shift",
          "type": "organism",
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
          "order": 10,
          "intentionRefs": [
            {
              "id": "intention_open_shift_form",
              "intent": "commandForm",
              "submitAction": "openShift",
              "order": 10
            }
          ]
        },
        {
          "id": "organism_close_shift",
          "type": "organism",
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
          "order": 20,
          "intentionRefs": [
            {
              "id": "intention_close_shift_form",
              "intent": "commandForm",
              "submitAction": "closeShift",
              "order": 10
            }
          ]
        },
        {
          "id": "organism_view_shift_closing_report",
          "type": "organism",
          "organismName": "ViewShiftClosingReport",
          "titleKey": "shiftManagement.viewReport.title",
          "purpose": "Revisar relatório de fechamento de turno",
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
          "order": 30,
          "intentionRefs": [
            {
              "id": "intention_view_report_action",
              "intent": "actionList",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "order": 10
            },
            {
              "id": "intention_view_report_summary",
              "intent": "summary",
              "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
              "order": 20
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "shiftManagementLayout",
    "type": "page",
    "sections": [
      {
        "id": "section_shift_management",
        "type": "section",
        "sectionName": "Gestão de turno diário",
        "titleKey": "shiftManagement.section.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "organism_open_shift",
            "type": "organism",
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
            "order": 10,
            "intentions": [
              {
                "id": "intention_open_shift_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "shiftManagement.openShift.form.title",
                "submitAction": "openShift",
                "fields": [
                  {
                    "id": "field_open_shift_notes",
                    "field": "notes",
                    "labelKey": "shiftManagement.openShift.notes.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.shiftManagement.input.openShift.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action_open_shift_submit",
                    "action": "openShift",
                    "labelKey": "shiftManagement.openShift.submit.label",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "openShift"
                  }
                ]
              }
            ]
          },
          {
            "id": "organism_close_shift",
            "type": "organism",
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
            "order": 20,
            "intentions": [
              {
                "id": "intention_close_shift_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "shiftManagement.closeShift.form.title",
                "submitAction": "closeShift",
                "fields": [
                  {
                    "id": "field_close_shift_total_apurado",
                    "field": "totalApurado",
                    "labelKey": "shiftManagement.closeShift.totalApurado.label",
                    "order": 10,
                    "required": true,
                    "inputType": "number",
                    "format": "money",
                    "stateKey": "ui.shiftManagement.input.closeShift.totalApurado"
                  },
                  {
                    "id": "field_close_shift_notes",
                    "field": "notes",
                    "labelKey": "shiftManagement.closeShift.notes.label",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.shiftManagement.input.closeShift.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action_close_shift_submit",
                    "action": "closeShift",
                    "labelKey": "shiftManagement.closeShift.submit.label",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "closeShift"
                  }
                ]
              }
            ]
          },
          {
            "id": "organism_view_shift_closing_report",
            "type": "organism",
            "organismName": "ViewShiftClosingReport",
            "titleKey": "shiftManagement.viewReport.title",
            "purpose": "Revisar relatório de fechamento de turno",
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
            "order": 30,
            "intentions": [
              {
                "id": "intention_view_report_action",
                "intent": "actionList",
                "order": 10,
                "titleKey": "shiftManagement.viewReport.action.title",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "action_view_report_trigger",
                    "action": "viewShiftClosingReport",
                    "labelKey": "shiftManagement.viewReport.action.label",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "viewShiftClosingReport"
                  }
                ],
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
              },
              {
                "id": "intention_view_report_summary",
                "intent": "summary",
                "order": 20,
                "titleKey": "shiftManagement.viewReport.summary.title",
                "fields": [
                  {
                    "id": "field_report_shift_closing_report_id",
                    "field": "shiftClosingReportId",
                    "labelKey": "shiftManagement.viewReport.shiftClosingReportId.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field_report_shift_id",
                    "field": "shiftId",
                    "labelKey": "shiftManagement.viewReport.shiftId.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field_report_total_apurado",
                    "field": "totalApurado",
                    "labelKey": "shiftManagement.viewReport.totalApurado.label",
                    "order": 30,
                    "required": false,
                    "format": "money",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field_report_paid_order_count",
                    "field": "paidOrderCount",
                    "labelKey": "shiftManagement.viewReport.paidOrderCount.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field_report_created_at",
                    "field": "createdAt",
                    "labelKey": "shiftManagement.viewReport.createdAt.label",
                    "order": 50,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  },
                  {
                    "id": "field_report_updated_at",
                    "field": "updatedAt",
                    "labelKey": "shiftManagement.viewReport.updatedAt.label",
                    "order": 60,
                    "required": false,
                    "format": "datetime",
                    "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": []
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
