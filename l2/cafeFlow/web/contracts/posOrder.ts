/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/posOrder.ts" enhancement="_blank"/>

export interface CafeFlowCreateOrderInput {
  orderType: "table" | "takeout";
  tableNumber?: string;
  priority?: boolean;
  priorityReason?: string;
}

export interface CafeFlowCreateOrderOutput {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  orderType: "table" | "takeout";
  tableNumber: string;
  createdAt: string;
}

export interface CafeFlowViewOrderBoardInput {
  statusFilter?: "registered" | "received" | "inPreparation" | "ready" | "delivered";
}

export interface CafeFlowViewOrderBoardOutputItem {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  orderType: "table" | "takeout";
  tableNumber: string;
  priority: boolean;
  priorityReason: string;
  receivedAt: string;
  inPreparationAt: string;
  readyAt: string;
  createdAt: string;
}

export interface CafeFlowViewOrderBoardOutput {
  items: CafeFlowViewOrderBoardOutputItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface CafeFlowDeliverOrderInput {}

export interface CafeFlowDeliverOrderOutput {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  deliveredAt: string;
  orderType: "table" | "takeout";
  tableNumber: string;
}
