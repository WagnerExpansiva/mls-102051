/// <mls fileReference="_102051_/l4/operations/closeShift.defs.ts" enhancement="_blank"/>

export const operationCloseShift = {
  "operationId": "closeShift",
  "title": "Fechar turno diário",
  "actor": "gerente",
  "entity": "Shift",
  "kind": "update",
  "reads": [
    "Shift",
    "Order",
    "ShiftClosingReport"
  ],
  "writes": [
    "Shift",
    "ShiftClosingReport"
  ],
  "rulesApplied": [
    "shiftClosingRecordsRevenue",
    "singleOpenShift",
    "dashboardCurrentShiftOnly"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Fechar o turno diário ao final do expediente, consolidando os pedidos do período e registrando o valor apurado para conferência.",
    "steps": [
      "O gerente acessa a tela de fechamento de turno, onde o sistema identifica o turno atualmente aberto.",
      "O sistema consolida os pedidos do período e sugere o total apurado.",
      "O gerente confirma ou ajusta o valor apurado e adiciona observações se necessário.",
      "O sistema atualiza o status do turno para 'closed', registra a data/hora de fechamento e o gerente responsável, e gera o relatório de fechamento."
    ],
    "outcome": "O turno é fechado com status 'closed', o valor apurado é registrado para conferência e o relatório de fechamento é gerado."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "Shift",
    "keyField": "Shift.shiftId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Shift.status",
      "Shift.closedAt",
      "Shift.closedBy",
      "Shift.totalApurado",
      "Shift.notes"
    ]
  },
  "inputs": [
    {
      "inputId": "totalApurado",
      "fieldRef": "Shift.totalApurado",
      "required": true,
      "source": "userInput",
      "description": "Valor total apurado no fechamento do turno, informado pelo gerente para conferência."
    },
    {
      "inputId": "notes",
      "fieldRef": "Shift.notes",
      "required": false,
      "source": "userInput",
      "description": "Observações gerais sobre o turno, opcionais."
    },
    {
      "inputId": "shiftId",
      "fieldRef": "Shift.shiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Identificador do turno atualmente aberto que será fechado."
    },
    {
      "inputId": "closedBy",
      "fieldRef": "Shift.closedBy",
      "required": true,
      "source": "actorSession",
      "description": "Identificador do gerente que está fechando o turno."
    },
    {
      "inputId": "closedAt",
      "fieldRef": "Shift.closedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora do fechamento do turno, definida automaticamente pelo sistema."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "Shift.shiftId",
      "source": "activeLifecycleInstance",
      "originRef": "Shift.shiftId",
      "description": "O backend localiza o único Shift com status 'open' (turno ativo) e utiliza seu shiftId como alvo do fechamento."
    },
    {
      "targetRef": "Shift.closedBy",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "O backend obtém o identificador do gerente autenticado a partir da sessão ativa."
    },
    {
      "targetRef": "Shift.closedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "O backend define a data e hora de fechamento como o timestamp atual no momento da confirmação."
    }
  ],
  "acceptanceAssertions": [
    "Após o fechamento, o Shift possui status igual a 'closed'.",
    "Após o fechamento, o campo Shift.closedAt é preenchido com a data e hora do fechamento.",
    "Após o fechamento, o campo Shift.closedBy contém o identificador do gerente que executou o fechamento.",
    "Após o fechamento, o campo Shift.totalApurado reflete o valor informado pelo gerente para conferência.",
    "Após o fechamento, um ShiftClosingReport é gerado para o turno fechado.",
    "O fechamento só é permitido quando existe exatamente um turno com status 'open'.",
    "Após o fechamento, nenhum turno permanece com status 'open'."
  ],
  "pageId": "shiftLifecycle",
  "commandName": "closeShift",
  "bffName": "cafeFlow.shiftLifecycle.closeShift",
  "capability": {
    "capabilityId": "shiftLifecycle",
    "title": "Ciclo de vida do turno",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCloseShift;
