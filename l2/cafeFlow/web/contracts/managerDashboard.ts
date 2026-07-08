/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/managerDashboard.ts" enhancement="_blank"/>

export interface CafeFlowViewDashboardInput {}

export interface CafeFlowViewDashboardOutputItem {
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  orderType: "table" | "takeout";
  createdAt: string;
  shiftId: string;
  deliveredAt: string;
}

export type CafeFlowViewDashboardOutput = CafeFlowViewDashboardOutputItem[];

export interface CafeFlowRequestAiSalesSummaryInput {}

export interface CafeFlowRequestAiSalesSummaryOutputItem {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  orderType: "table" | "takeout";
  createdAt: string;
  deliveredAt: string;
}

export type CafeFlowRequestAiSalesSummaryOutput = CafeFlowRequestAiSalesSummaryOutputItem[];

export interface CafeFlowRequestAiPromoSuggestionsInput {}

export interface CafeFlowRequestAiPromoSuggestionsOutputItem {
  orderId: string;
  orderType: "table" | "takeout";
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  createdAt: string;
}

export type CafeFlowRequestAiPromoSuggestionsOutput = CafeFlowRequestAiPromoSuggestionsOutputItem[];
