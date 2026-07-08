/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/stockManagement.test.ts" enhancement="_blank"/>

import type { CafeFlowBrowseStockItemsInput, CafeFlowBrowseStockItemsOutput, CafeFlowBrowseStockItemsOutputItem, CafeFlowManageStockItemInput, CafeFlowManageStockItemOutput } from './stockManagement.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedCafeFlowBrowseStockItemsInput = {
  searchTerm?: string;
};
type ExpectedCafeFlowBrowseStockItemsOutputItem = {
  stockItemId: string;
  name: string;
  unit: "kg" | "liter" | "portion" | "unit";
  minimumLevel: number;
  createdAt: string;
  updatedAt: string;
};
type ExpectedCafeFlowBrowseStockItemsOutput = { items: ExpectedCafeFlowBrowseStockItemsOutputItem[]; total: number; page?: number; pageSize?: number; };
type ExpectedCafeFlowManageStockItemInput = {
  name: string;
  unit: "kg" | "liter" | "portion" | "unit";
  minimumLevel: number;
};
type ExpectedCafeFlowManageStockItemOutput = {
  stockItemId: string;
  name: string;
  unit: "kg" | "liter" | "portion" | "unit";
  minimumLevel: number;
  updatedAt: string;
};

type _CafeFlowBrowseStockItemsInput = Assert<Equal<CafeFlowBrowseStockItemsInput, ExpectedCafeFlowBrowseStockItemsInput>>;
type _CafeFlowBrowseStockItemsOutputItem = Assert<Equal<CafeFlowBrowseStockItemsOutputItem, ExpectedCafeFlowBrowseStockItemsOutputItem>>;
type _CafeFlowBrowseStockItemsOutput = Assert<Equal<CafeFlowBrowseStockItemsOutput, ExpectedCafeFlowBrowseStockItemsOutput>>;
type _CafeFlowManageStockItemInput = Assert<Equal<CafeFlowManageStockItemInput, ExpectedCafeFlowManageStockItemInput>>;
type _CafeFlowManageStockItemOutput = Assert<Equal<CafeFlowManageStockItemOutput, ExpectedCafeFlowManageStockItemOutput>>;

export {};