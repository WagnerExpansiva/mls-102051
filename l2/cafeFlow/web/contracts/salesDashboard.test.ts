/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/salesDashboard.test.ts" enhancement="_blank"/>

import type { CafeFlowRequestAiPromoSuggestionsInput, CafeFlowRequestAiPromoSuggestionsOutput, CafeFlowRequestAiPromoSuggestionsOutputItem, CafeFlowRequestAiSalesSummaryInput, CafeFlowRequestAiSalesSummaryOutput, CafeFlowRequestAiSalesSummaryOutputItem, CafeFlowViewDashboardInput, CafeFlowViewDashboardOutput, CafeFlowViewDashboardOutputItem } from './salesDashboard.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedCafeFlowViewDashboardInput = {};
type ExpectedCafeFlowViewDashboardOutputItem = {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  orderType: "table" | "takeout";
  createdAt: string;
  shiftId: string;
  menuItemId: string;
  quantity: number;
  stockItemId: string;
  currentQuantity: number;
  minimumQuantity?: string;
};
type ExpectedCafeFlowViewDashboardOutput = ExpectedCafeFlowViewDashboardOutputItem[];
type ExpectedCafeFlowRequestAiSalesSummaryInput = {
  summaryRequest: string;
};
type ExpectedCafeFlowRequestAiSalesSummaryOutputItem = {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  orderType: "table" | "takeout";
  createdAt: string;
  deliveredAt: string;
};
type ExpectedCafeFlowRequestAiSalesSummaryOutput = ExpectedCafeFlowRequestAiSalesSummaryOutputItem[];
type ExpectedCafeFlowRequestAiPromoSuggestionsInput = {};
type ExpectedCafeFlowRequestAiPromoSuggestionsOutputItem = {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  createdAt: string;
  quantity: number;
  menuItemId: string;
  name: string;
};
type ExpectedCafeFlowRequestAiPromoSuggestionsOutput = ExpectedCafeFlowRequestAiPromoSuggestionsOutputItem[];

type _CafeFlowViewDashboardInput = Assert<Equal<CafeFlowViewDashboardInput, ExpectedCafeFlowViewDashboardInput>>;
type _CafeFlowViewDashboardOutputItem = Assert<Equal<CafeFlowViewDashboardOutputItem, ExpectedCafeFlowViewDashboardOutputItem>>;
type _CafeFlowViewDashboardOutput = Assert<Equal<CafeFlowViewDashboardOutput, ExpectedCafeFlowViewDashboardOutput>>;
type _CafeFlowRequestAiSalesSummaryInput = Assert<Equal<CafeFlowRequestAiSalesSummaryInput, ExpectedCafeFlowRequestAiSalesSummaryInput>>;
type _CafeFlowRequestAiSalesSummaryOutputItem = Assert<Equal<CafeFlowRequestAiSalesSummaryOutputItem, ExpectedCafeFlowRequestAiSalesSummaryOutputItem>>;
type _CafeFlowRequestAiSalesSummaryOutput = Assert<Equal<CafeFlowRequestAiSalesSummaryOutput, ExpectedCafeFlowRequestAiSalesSummaryOutput>>;
type _CafeFlowRequestAiPromoSuggestionsInput = Assert<Equal<CafeFlowRequestAiPromoSuggestionsInput, ExpectedCafeFlowRequestAiPromoSuggestionsInput>>;
type _CafeFlowRequestAiPromoSuggestionsOutputItem = Assert<Equal<CafeFlowRequestAiPromoSuggestionsOutputItem, ExpectedCafeFlowRequestAiPromoSuggestionsOutputItem>>;
type _CafeFlowRequestAiPromoSuggestionsOutput = Assert<Equal<CafeFlowRequestAiPromoSuggestionsOutput, ExpectedCafeFlowRequestAiPromoSuggestionsOutput>>;

export {};