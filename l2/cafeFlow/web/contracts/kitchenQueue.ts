/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/kitchenQueue.ts" enhancement="_blank"/>

export interface CafeFlowViewKitchenBoardInput {
}

export interface CafeFlowViewKitchenBoardOutputItem {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  orderType: "table" | "takeout";
  tableNumber: string;
  priority: boolean;
  priorityReason: string;
  receivedAt: string;
  inPreparationAt: string;
  createdAt: string;
}

export interface CafeFlowViewKitchenBoardOutput {
  items: CafeFlowViewKitchenBoardOutputItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface CafeFlowUpdateOrderStatusInput {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
}

export interface CafeFlowUpdateOrderStatusOutput {
}
