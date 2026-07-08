/// <mls fileReference="_102051_/l4/operations/viewShiftClosingReport.defs.ts" enhancement="_blank"/>

export const operationViewShiftClosingReport = {
  "operationId": "viewShiftClosingReport",
  "title": "Revisar relatório de fechamento de turno",
  "actor": "gerente",
  "entity": "ShiftClosingReport",
  "kind": "view",
  "reads": [
    "ShiftClosingReport",
    "Shift"
  ],
  "writes": [],
  "rulesApplied": [
    "shiftClosingRecordsRevenue",
    "shiftClosingConsolidatesPaidOrders"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Revisar o relatório de fechamento de turno com o total apurado e os pedidos pagos consolidados para conferência do dia.",
    "steps": [
      "O gerente seleciona um turno fechado na lista de turnos.",
      "O sistema localiza o relatório de fechamento correspondente ao shiftId informado.",
      "O sistema exibe o total apurado, a quantidade de pedidos pagos consolidados e as datas de criação e atualização do relatório."
    ],
    "outcome": "O gerente visualiza o relatório de fechamento do turno com o total apurado e os pedidos pagos consolidados para conferência."
  },
  "accessPattern": {
    "kind": "getById",
    "entity": "ShiftClosingReport",
    "keyField": "ShiftClosingReport.shiftId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "ShiftClosingReport.shiftClosingReportId",
      "ShiftClosingReport.shiftId",
      "ShiftClosingReport.totalApurado",
      "ShiftClosingReport.paidOrderCount",
      "ShiftClosingReport.createdAt",
      "ShiftClosingReport.updatedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "shiftId",
      "fieldRef": "ShiftClosingReport.shiftId",
      "required": true,
      "source": "routeParam",
      "description": "Identificador do turno fechado cujo relatório de fechamento será exibido."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "ShiftClosingReport.shiftId",
      "source": "routeParam",
      "originRef": "routeParam.shiftId",
      "description": "O shiftId é extraído do parâmetro de rota para localizar o único relatório de fechamento correspondente ao turno fechado."
    }
  ],
  "acceptanceAssertions": [
    "O relatório de fechamento exibido contém o total apurado do turno para conferência do gerente.",
    "O relatório de fechamento exibido contém a quantidade de pedidos pagos consolidados no período do turno.",
    "O relatório exibido corresponde exclusivamente ao turno identificado pelo shiftId informado.",
    "O relatório exibido não inclui pedidos não pagos ou pedidos de outros turnos."
  ],
  "pageId": "shiftLifecycle",
  "commandName": "viewShiftClosingReport",
  "bffName": "cafeFlow.shiftLifecycle.viewShiftClosingReport",
  "capability": {
    "capabilityId": "shiftLifecycle",
    "title": "Ciclo de vida do turno",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationViewShiftClosingReport;
