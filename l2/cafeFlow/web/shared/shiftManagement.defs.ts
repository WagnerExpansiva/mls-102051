/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/shiftManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "shiftManagement",
  "pageName": "Gestão de turno diário",
  "moduleName": "cafeFlow",
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
    "layoutId": "shiftManagement.page11"
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
      "contractRef": {
        "commandName": "openShift",
        "direction": "input",
        "field": "notes"
      },
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
      "contractRef": {
        "commandName": "closeShift",
        "direction": "input",
        "field": "notes"
      },
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
    },
    {
      "stateKey": "ui.shiftManagement.output.openShift",
      "name": "OutputOpenShift",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.shiftManagement.output.closeShift",
      "name": "OutputCloseShift",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.shiftManagement.layout.col-board-status",
      "name": "LayoutColBoardStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.layout.col-board-opened",
      "name": "LayoutColBoardOpened",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.layout.col-board-closed",
      "name": "LayoutColBoardClosed",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.layout.col-queue-status",
      "name": "LayoutColQueueStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.layout.col-queue-opened",
      "name": "LayoutColQueueOpened",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftManagement.layout.col-queue-closed",
      "name": "LayoutColQueueClosed",
      "kind": "layoutState",
      "defaultValue": ""
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
      "outputStateKeys": [
        "ui.shiftManagement.output.openShift"
      ],
      "statusStateKey": "ui.shiftManagement.action.openShift.status",
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
      "outputStateKeys": [
        "ui.shiftManagement.output.closeShift"
      ],
      "statusStateKey": "ui.shiftManagement.action.closeShift.status",
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
      "inputStateKeys": [],
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
    "shiftManagement.section.openShift.title": "Abertura do turno",
    "shiftManagement.section.closeShift.title": "Fechamento do turno",
    "shiftManagement.section.reports.title": "Relatórios de fechamento",
    "shiftManagement.section.summary.title": "Resumo do fechamento",
    "shiftManagement.organism.openShift.title": "Abrir turno diário",
    "shiftManagement.organism.closeShift.title": "Fechar turno diário",
    "shiftManagement.organism.reports.title": "Relatórios de fechamento",
    "shiftManagement.organism.summary.title": "Resumo do relatório",
    "shiftManagement.intention.openShift.title": "Abrir turno",
    "shiftManagement.intention.closeShift.title": "Fechar turno",
    "shiftManagement.intention.reports.title": "Relatórios de fechamento",
    "shiftManagement.intention.summary.title": "Resumo do fechamento",
    "shiftManagement.field.notes.label": "Observações",
    "shiftManagement.field.totalApurado.label": "Total apurado",
    "shiftManagement.field.shiftId.label": "Turno",
    "shiftManagement.field.paidOrderCount.label": "Pedidos pagos",
    "shiftManagement.field.createdAt.label": "Criado em",
    "shiftManagement.field.updatedAt.label": "Atualizado em",
    "shiftManagement.field.shiftClosingReportId.label": "Relatório",
    "shiftManagement.action.openShift.label": "Abrir turno",
    "shiftManagement.action.closeShift.label": "Fechar turno",
    "shiftManagement.action.viewShiftClosingReport.label": "Ver relatório",
    "shiftManagement.section.board.title": "Turnos por status",
    "shiftManagement.section.actions.title": "Ações rápidas",
    "shiftManagement.organism.board.title": "Quadro de turnos",
    "shiftManagement.intention.board.title": "Turnos por status",
    "shiftManagement.field.status.label": "Status",
    "shiftManagement.field.openedAt.label": "Abertura",
    "shiftManagement.field.closedAt.label": "Fechamento",
    "shiftManagement.section.queue.title": "Fila de turnos",
    "shiftManagement.organism.queue.title": "Fila de turnos",
    "shiftManagement.intention.queue.title": "Turnos na fila"
  },
  "automation": {
    "statePrefix": "ui.shiftManagement",
    "stateKeys": [
      "ui.shiftManagement.status",
      "ui.shiftManagement.action.openShift.status",
      "ui.shiftManagement.input.openShift.notes",
      "ui.shiftManagement.action.closeShift.status",
      "ui.shiftManagement.input.closeShift.totalApurado",
      "ui.shiftManagement.input.closeShift.notes",
      "ui.shiftManagement.action.viewShiftClosingReport.status",
      "ui.shiftManagement.data.viewShiftClosingReport",
      "ui.shiftManagement.output.openShift",
      "ui.shiftManagement.output.closeShift",
      "ui.shiftManagement.layout.col-board-status",
      "ui.shiftManagement.layout.col-board-opened",
      "ui.shiftManagement.layout.col-board-closed",
      "ui.shiftManagement.layout.col-queue-status",
      "ui.shiftManagement.layout.col-queue-opened",
      "ui.shiftManagement.layout.col-queue-closed"
    ],
    "actionIds": [
      "openShift",
      "closeShift",
      "viewShiftClosingReport",
      "set.openShiftNotes",
      "set.closeShiftTotalApurado",
      "set.closeShiftNotes"
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
