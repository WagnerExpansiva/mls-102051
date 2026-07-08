/// <mls fileReference="_102051_/l4/workflows/shiftLifecycle.defs.ts" enhancement="_blank"/>

export const workflowShiftLifecycle = {
  "workflowId": "shiftLifecycle",
  "title": "Ciclo de vida do turno",
  "executionMode": "sequential",
  "trigger": "Gerente abre o turno diário no início do expediente para iniciar o registro de pedidos",
  "actors": [
    "gerente"
  ],
  "states": [
    "open",
    "closed"
  ],
  "transitions": [
    {
      "from": "open",
      "to": "closed",
      "on": "closeShift",
      "by": "gerente",
      "guard": "O turno deve estar aberto e apenas um turno pode estar aberto por vez"
    },
    {
      "from": "closed",
      "to": "closed",
      "on": "viewShiftClosingReport",
      "by": "gerente"
    }
  ],
  "operationIds": [
    "openShift",
    "closeShift",
    "viewShiftClosingReport"
  ],
  "entities": [
    "Shift",
    "ShiftClosingReport",
    "Order"
  ],
  "rulesApplied": [
    "singleOpenShift",
    "shiftClosingRecordsRevenue",
    "shiftClosingConsolidatesPaidOrders"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Abrir e fechar o turno diário, gerando o relatório de fechamento para conferência",
    "steps": [
      "O gerente abre o turno diário no início do expediente para iniciar o registro de pedidos do dia.",
      "Ao final do expediente, o gerente fecha o turno para consolidar os pedidos do período e registrar o valor apurado.",
      "O gerente revisa o relatório de fechamento com o total apurado e os pedidos pagos consolidados para conferência do dia."
    ],
    "outcome": "Turno fechado com relatório consolidado disponível para conferência do gerente"
  },
  "pageId": "shiftLifecycle",
  "capabilities": [
    {
      "capabilityId": "shiftLifecycle",
      "title": "Ciclo de vida do turno",
      "actor": "gerente",
      "priority": "now"
    }
  ],
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default workflowShiftLifecycle;
