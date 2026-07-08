/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/shiftManagement.test.ts" enhancement="_blank"/>

import type { CafeFlowCloseShiftInput, CafeFlowCloseShiftOutput, CafeFlowOpenShiftInput, CafeFlowOpenShiftOutput, CafeFlowViewShiftClosingReportInput, CafeFlowViewShiftClosingReportOutput, CafeFlowViewShiftClosingReportOutputItem } from './shiftManagement.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedCafeFlowOpenShiftInput = {
  notes?: string;
};
type ExpectedCafeFlowOpenShiftOutput = {
  shiftId: string;
  status: "open" | "closed";
  openedAt: string;
  openedBy: string;
};
type ExpectedCafeFlowCloseShiftInput = {
  totalApurado: number;
  notes?: string;
};
type ExpectedCafeFlowCloseShiftOutput = {
  status: "open" | "closed";
  closedAt: string;
  closedBy: string;
  totalApurado: number;
  notes: string;
};
type ExpectedCafeFlowViewShiftClosingReportInput = {};
type ExpectedCafeFlowViewShiftClosingReportOutputItem = {
  shiftClosingReportId: string;
  shiftId: string;
  totalApurado: number;
  paidOrderCount: number;
  createdAt: string;
  updatedAt: string;
};
type ExpectedCafeFlowViewShiftClosingReportOutput = ExpectedCafeFlowViewShiftClosingReportOutputItem;

type _CafeFlowOpenShiftInput = Assert<Equal<CafeFlowOpenShiftInput, ExpectedCafeFlowOpenShiftInput>>;
type _CafeFlowOpenShiftOutput = Assert<Equal<CafeFlowOpenShiftOutput, ExpectedCafeFlowOpenShiftOutput>>;
type _CafeFlowCloseShiftInput = Assert<Equal<CafeFlowCloseShiftInput, ExpectedCafeFlowCloseShiftInput>>;
type _CafeFlowCloseShiftOutput = Assert<Equal<CafeFlowCloseShiftOutput, ExpectedCafeFlowCloseShiftOutput>>;
type _CafeFlowViewShiftClosingReportInput = Assert<Equal<CafeFlowViewShiftClosingReportInput, ExpectedCafeFlowViewShiftClosingReportInput>>;
type _CafeFlowViewShiftClosingReportOutputItem = Assert<Equal<CafeFlowViewShiftClosingReportOutputItem, ExpectedCafeFlowViewShiftClosingReportOutputItem>>;
type _CafeFlowViewShiftClosingReportOutput = Assert<Equal<CafeFlowViewShiftClosingReportOutput, ExpectedCafeFlowViewShiftClosingReportOutput>>;

export {};