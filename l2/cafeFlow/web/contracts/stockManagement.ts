/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/stockManagement.ts" enhancement="_blank"/>

export interface CafeFlowBrowseStockItemsInput {
  searchTerm?: string;
}

export interface CafeFlowBrowseStockItemsOutputItem {
  stockItemId: string;
  name: string;
  unit: "kg" | "liter" | "portion" | "unit";
  minimumLevel: number;
  createdAt: string;
  updatedAt: string;
}

export interface CafeFlowBrowseStockItemsOutput {
  items: CafeFlowBrowseStockItemsOutputItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface CafeFlowManageStockItemInput {
  name: string;
  unit: "kg" | "liter" | "portion" | "unit";
  minimumLevel: number;
}

export interface CafeFlowManageStockItemOutput {
  stockItemId: string;
  name: string;
  unit: "kg" | "liter" | "portion" | "unit";
  minimumLevel: number;
  updatedAt: string;
}
