/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/salesDashboard.ts" enhancement="_blank"/>

export interface CafeFlowViewDashboardInput {}

export interface CafeFlowViewDashboardOutputItem {
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
}

export type CafeFlowViewDashboardOutput = CafeFlowViewDashboardOutputItem[];

export interface CafeFlowRequestAiSalesSummaryInput {
  summaryRequest: string;
}

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
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  createdAt: string;
  quantity: number;
  menuItemId: string;
  name: string;
}

export type CafeFlowRequestAiPromoSuggestionsOutput = CafeFlowRequestAiPromoSuggestionsOutputItem[];
