/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/shiftManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "shiftManagement",
  "pageName": "Gestão de turno diário",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowShiftManagementBase",
  "routePattern": "/cafeFlow/shiftManagement/:shiftId?",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:shiftLifecycle",
    "operation:openShift",
    "operation:closeShift",
    "operation:viewShiftClosingReport"
  ],
  "operationIds": [
    "openShift",
    "closeShift",
    "viewShiftClosingReport"
  ],
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
  "contractRef": {
    "defPath": "_102051_/l2/cafeFlow/web/contracts/shiftManagement.defs.ts",
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/shiftManagement.ts"
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/shiftManagement.defs.ts",
    "layoutId": "shiftManagement_mobile_cards"
  },
  "states": [
    {
      "stateKey": "ui.shiftManagement.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.action.openShift.status",
      "name": "openShiftState",
      "kind": "actionStatus",
      "actionRef": "openShift",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.shiftManagement.input.openShift.notes",
      "name": "openShiftNotes",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "openShift",
        "direction": "input",
        "field": "notes"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.output.openShift",
      "name": "openShiftOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "openShift",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.shiftManagement.action.openShift.error",
      "name": "openShiftError",
      "kind": "actionError",
      "actionRef": "openShift",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.action.closeShift.status",
      "name": "closeShiftState",
      "kind": "actionStatus",
      "actionRef": "closeShift",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.shiftManagement.input.closeShift.totalApurado",
      "name": "closeShiftTotalApurado",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "closeShift",
        "direction": "input",
        "field": "totalApurado"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.input.closeShift.notes",
      "name": "closeShiftNotes",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "closeShift",
        "direction": "input",
        "field": "notes"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.output.closeShift",
      "name": "closeShiftOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "closeShift",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.shiftManagement.action.closeShift.error",
      "name": "closeShiftError",
      "kind": "actionError",
      "actionRef": "closeShift",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.action.viewShiftClosingReport.status",
      "name": "viewShiftClosingReportState",
      "kind": "actionStatus",
      "actionRef": "viewShiftClosingReport",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.shiftManagement.input.viewShiftClosingReport.shiftId",
      "name": "viewShiftClosingReportShiftId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "viewShiftClosingReport",
        "direction": "input",
        "field": "shiftId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport",
      "name": "viewShiftClosingReportData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "viewShiftClosingReport",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    }
  ],
  "actions": [
    {
      "actionId": "openShift",
      "kind": "command",
      "commandRef": "openShift",
      "routeKey": "cafeFlow.shiftLifecycle.openShift",
      "purpose": "Abrir turno diário",
      "methodName": "openShift",
      "handlerName": "handleOpenShiftClick",
      "inputStateKeys": [
        "ui.shiftManagement.input.openShift.notes"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.shiftManagement.output.openShift"
      ],
      "statusStateKey": "ui.shiftManagement.action.openShift.status",
      "errorStateKey": "ui.shiftManagement.action.openShift.error",
      "feedback": {
        "successMessageKey": "action.openShift.success",
        "errorMessageKey": "action.openShift.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.shiftManagement.input.openShift.notes"
      ],
      "refreshActionIds": [
        "viewShiftClosingReport"
      ]
    },
    {
      "actionId": "closeShift",
      "kind": "command",
      "commandRef": "closeShift",
      "routeKey": "cafeFlow.shiftLifecycle.closeShift",
      "purpose": "Fechar turno diário",
      "methodName": "closeShift",
      "handlerName": "handleCloseShiftClick",
      "inputStateKeys": [
        "ui.shiftManagement.input.closeShift.totalApurado",
        "ui.shiftManagement.input.closeShift.notes"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.shiftManagement.output.closeShift"
      ],
      "statusStateKey": "ui.shiftManagement.action.closeShift.status",
      "errorStateKey": "ui.shiftManagement.action.closeShift.error",
      "feedback": {
        "successMessageKey": "action.closeShift.success",
        "errorMessageKey": "action.closeShift.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.shiftManagement.input.closeShift.totalApurado",
        "ui.shiftManagement.input.closeShift.notes"
      ],
      "refreshActionIds": [
        "viewShiftClosingReport"
      ]
    },
    {
      "actionId": "viewShiftClosingReport",
      "kind": "query",
      "commandRef": "viewShiftClosingReport",
      "routeKey": "cafeFlow.shiftLifecycle.viewShiftClosingReport",
      "purpose": "Revisar relatório de fechamento de turno",
      "methodName": "loadViewShiftClosingReport",
      "handlerName": "handleViewShiftClosingReportClick",
      "inputStateKeys": [
        "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
      ],
      "routeParamInputStateKeys": [
        "ui.shiftManagement.input.viewShiftClosingReport.shiftId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.shiftManagement.data.viewShiftClosingReport"
      ],
      "statusStateKey": "ui.shiftManagement.action.viewShiftClosingReport.status"
    },
    {
      "actionId": "set.openShiftNotes",
      "kind": "stateSetter",
      "stateKey": "ui.shiftManagement.input.openShift.notes",
      "methodName": "setOpenShiftNotes",
      "handlerName": "handleOpenShiftNotesChange"
    },
    {
      "actionId": "set.closeShiftTotalApurado",
      "kind": "stateSetter",
      "stateKey": "ui.shiftManagement.input.closeShift.totalApurado",
      "methodName": "setCloseShiftTotalApurado",
      "handlerName": "handleCloseShiftTotalApuradoChange"
    },
    {
      "actionId": "set.closeShiftNotes",
      "kind": "stateSetter",
      "stateKey": "ui.shiftManagement.input.closeShift.notes",
      "methodName": "setCloseShiftNotes",
      "handlerName": "handleCloseShiftNotesChange"
    },
    {
      "actionId": "set.viewShiftClosingReportShiftId",
      "kind": "stateSetter",
      "stateKey": "ui.shiftManagement.input.viewShiftClosingReport.shiftId",
      "methodName": "setViewShiftClosingReportShiftId",
      "handlerName": "handleViewShiftClosingReportShiftIdChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "viewShiftClosingReport",
      "stateKey": "ui.shiftManagement.data.viewShiftClosingReport"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt",
      "en"
    ]
  },
  "i18n": {
    "page.shiftManagement.title": "Gestão de turno diário",
    "section.discover.title": "Relatório de fechamento",
    "section.execute.openShift.title": "Abrir turno",
    "section.execute.closeShift.title": "Fechar turno",
    "section.review.title": "Resumo do turno",
    "field.notes.label": "Observações",
    "field.totalApurado.label": "Total apurado",
    "field.shiftClosingReportId.label": "ID do relatório",
    "field.shiftId.label": "ID do turno",
    "field.paidOrderCount.label": "Pedidos pagos",
    "field.createdAt.label": "Criado em",
    "field.updatedAt.label": "Atualizado em",
    "field.status.label": "Status",
    "field.openedAt.label": "Aberto em",
    "field.openedBy.label": "Aberto por",
    "field.closedAt.label": "Fechado em",
    "field.closedBy.label": "Fechado por",
    "action.openShift.label": "Abrir turno",
    "action.closeShift.label": "Fechar turno",
    "action.openShift.success": "Turno aberto com sucesso",
    "action.openShift.error": "Erro ao abrir turno",
    "action.closeShift.success": "Turno fechado com sucesso",
    "action.closeShift.error": "Erro ao fechar turno",
    "empty.shiftClosingReport": "Nenhum relatório de fechamento disponível.",
    "empty.review": "Nenhuma informação de turno disponível.",
    "sec.discover.title": "Sec discover",
    "org.shiftClosingReport.title": "Exibir relatório de fechamento de turno como cartão legível",
    "sec.execute.openShift.title": "Sec execute open Shift",
    "org.openShift.title": "Formulário para abrir turno diário no início do expediente",
    "sec.execute.closeShift.title": "Sec execute close Shift",
    "org.closeShift.title": "Formulário para fechar turno diário e registrar valor apurado",
    "sec.review.title": "Sec review",
    "org.review.title": "Resumo do turno com status e valores principais para conferência",
    "page.title": "Gestão de turno diário",
    "section.shiftStatus.title": "Status do turno",
    "section.shiftStatus.openShiftTitle": "Abrir turno",
    "section.shiftStatus.closeShiftTitle": "Fechar turno",
    "section.closingReport.title": "Relatório de fechamento",
    "field.notes": "Observações",
    "field.totalApurado": "Total apurado",
    "field.shiftClosingReportId": "ID do relatório",
    "field.shiftId": "ID do turno",
    "field.paidOrderCount": "Pedidos pagos",
    "field.createdAt": "Criado em",
    "field.updatedAt": "Atualizado em",
    "action.openShift": "Abrir turno",
    "action.closeShift": "Fechar turno",
    "empty.closingReport": "Nenhum relatório de fechamento disponível",
    "sec.shiftStatus.title": "Sec shift Status",
    "org.shiftLifecycle.title": "Exibir o status atual do turno e prover ações de ciclo de vida (abrir/fechar) como transições contextuais",
    "sec.closingReport.title": "Sec closing Report",
    "org.closingReport.title": "Exibir o relatório de fechamento de turno com total apurado e pedidos pagos consolidados"
  },
  "automation": {
    "statePrefix": "ui.shiftManagement",
    "stateKeys": [
      "ui.shiftManagement.status",
      "ui.shiftManagement.action.openShift.status",
      "ui.shiftManagement.input.openShift.notes",
      "ui.shiftManagement.output.openShift",
      "ui.shiftManagement.action.openShift.error",
      "ui.shiftManagement.action.closeShift.status",
      "ui.shiftManagement.input.closeShift.totalApurado",
      "ui.shiftManagement.input.closeShift.notes",
      "ui.shiftManagement.output.closeShift",
      "ui.shiftManagement.action.closeShift.error",
      "ui.shiftManagement.action.viewShiftClosingReport.status",
      "ui.shiftManagement.input.viewShiftClosingReport.shiftId",
      "ui.shiftManagement.data.viewShiftClosingReport"
    ],
    "actionIds": [
      "openShift",
      "closeShift",
      "viewShiftClosingReport",
      "set.openShiftNotes",
      "set.closeShiftTotalApurado",
      "set.closeShiftNotes",
      "set.viewShiftClosingReportShiftId"
    ]
  }
};

export const pipeline = [
  {
    "id": "shiftManagement__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/shiftManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/shiftManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/shiftManagement.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "shiftManagement__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
