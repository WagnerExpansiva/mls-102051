/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/shiftManagement.ts" enhancement="_blank"/>

export interface CafeFlowOpenShiftInput {
  notes?: string;
}

export interface CafeFlowOpenShiftOutput {
  shiftId: string;
  status: "open" | "closed";
  openedAt: string;
  openedBy: string;
}

export interface CafeFlowCloseShiftInput {
  totalApurado: number;
  notes?: string;
}

export interface CafeFlowCloseShiftOutput {
  status: "open" | "closed";
  closedAt: string;
  closedBy: string;
  totalApurado: number;
  notes: string;
}

export interface CafeFlowViewShiftClosingReportInput {}

export interface CafeFlowViewShiftClosingReportOutputItem {
  shiftClosingReportId: string;
  shiftId: string;
  totalApurado: number;
  paidOrderCount: number;
  createdAt: string;
  updatedAt: string;
}

export type CafeFlowViewShiftClosingReportOutput = CafeFlowViewShiftClosingReportOutputItem;
