/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/menuManagement.test.ts" enhancement="_blank"/>

import type { CafeFlowBrowseMenuItemsInput, CafeFlowBrowseMenuItemsOutput, CafeFlowBrowseMenuItemsOutputItem, CafeFlowManageMenuItemInput, CafeFlowManageMenuItemOutput } from './menuManagement.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedCafeFlowBrowseMenuItemsInput = {
  statusFilter?: "draft" | "active" | "inactive";
  menuCategoryIdFilter?: string;
};
type ExpectedCafeFlowBrowseMenuItemsOutputItem = {
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
};
type ExpectedCafeFlowBrowseMenuItemsOutput = { items: ExpectedCafeFlowBrowseMenuItemsOutputItem[]; total: number; page?: number; pageSize?: number; };
type ExpectedCafeFlowManageMenuItemInput = {
  name: string;
  description?: string;
  menuCategoryId: string;
  price: number;
  itemType: "simple" | "variant";
  status: "draft" | "active" | "inactive";
};
type ExpectedCafeFlowManageMenuItemOutput = {
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
};

type _CafeFlowBrowseMenuItemsInput = Assert<Equal<CafeFlowBrowseMenuItemsInput, ExpectedCafeFlowBrowseMenuItemsInput>>;
type _CafeFlowBrowseMenuItemsOutputItem = Assert<Equal<CafeFlowBrowseMenuItemsOutputItem, ExpectedCafeFlowBrowseMenuItemsOutputItem>>;
type _CafeFlowBrowseMenuItemsOutput = Assert<Equal<CafeFlowBrowseMenuItemsOutput, ExpectedCafeFlowBrowseMenuItemsOutput>>;
type _CafeFlowManageMenuItemInput = Assert<Equal<CafeFlowManageMenuItemInput, ExpectedCafeFlowManageMenuItemInput>>;
type _CafeFlowManageMenuItemOutput = Assert<Equal<CafeFlowManageMenuItemOutput, ExpectedCafeFlowManageMenuItemOutput>>;

export {};