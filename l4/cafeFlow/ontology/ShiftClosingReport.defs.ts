/// <mls fileReference="_102051_/l4/cafeFlow/ontology/ShiftClosingReport.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityShiftClosingReport = {
  "entityId": "ShiftClosingReport",
  "title": "Relatório de Fechamento de Turno",
  "description": "Agregado persistido no fechamento do turno com o total apurado e os pedidos consolidados do período para conferência do gerente.",
  "kind": "metric",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "shiftClosingReportId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do relatório de fechamento de turno."
    },
    {
      "fieldId": "shiftId",
      "type": "uuid",
      "required": true,
      "description": "Referência ao turno fechado ao qual este relatório corresponde."
    },
    {
      "fieldId": "totalApurado",
      "type": "money",
      "required": true,
      "description": "Valor total apurado no fechamento do turno para conferência do gerente."
    },
    {
      "fieldId": "paidOrderCount",
      "type": "number",
      "required": true,
      "description": "Quantidade de pedidos pagos consolidados no período do turno."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que o relatório de fechamento foi gerado."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do relatório de fechamento."
    }
  ]
} as const;

export default cafeFlowEntityShiftClosingReport;
