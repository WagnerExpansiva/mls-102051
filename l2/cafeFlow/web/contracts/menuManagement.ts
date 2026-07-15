/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/menuManagement.ts" enhancement="_blank"/>

export interface CafeFlowBrowseMenuItemsInput {
  statusFilter?: "draft" | "active" | "inactive";
  menuCategoryIdFilter?: string;
}

export interface CafeFlowBrowseMenuItemsOutputItem {
  menuItemId: string;
  name: string;
  description: string;
  menuCategoryId: string;
  price: number;
  itemType: "simple" | "variant";
  status: "draft" | "active" | "inactive";
  activatedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CafeFlowBrowseMenuItemsOutput {
  items: CafeFlowBrowseMenuItemsOutputItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface CafeFlowManageMenuItemInput {
  menuItemId: string;
  name: string;
  description?: string;
  menuCategoryId: string;
  price: number;
  itemType: "simple" | "variant";
  status: "draft" | "active" | "inactive";
}

export interface CafeFlowManageMenuItemOutput {
  menuItemId: string;
  name: string;
  description: string;
  menuCategoryId: string;
  price: number;
  itemType: "simple" | "variant";
  status: "draft" | "active" | "inactive";
  activatedAt: string;
  inactivatedAt: string;
  updatedAt: string;
}
