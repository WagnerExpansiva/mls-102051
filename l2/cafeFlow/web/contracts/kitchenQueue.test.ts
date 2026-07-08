/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/kitchenQueue.test.ts" enhancement="_blank"/>

import type { CafeFlowUpdateOrderStatusInput, CafeFlowUpdateOrderStatusOutput, CafeFlowViewKitchenBoardInput, CafeFlowViewKitchenBoardOutput, CafeFlowViewKitchenBoardOutputItem } from './kitchenQueue.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedCafeFlowViewKitchenBoardInput = {};
type ExpectedCafeFlowViewKitchenBoardOutputItem = {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  orderType: "table" | "takeout";
  tableNumber: string;
  priority: boolean;
  priorityReason: string;
  receivedAt: string;
  inPreparationAt: string;
  createdAt: string;
};
type ExpectedCafeFlowViewKitchenBoardOutput = { items: ExpectedCafeFlowViewKitchenBoardOutputItem[]; total: number; page?: number; pageSize?: number; };
type ExpectedCafeFlowUpdateOrderStatusInput = {
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
};
type ExpectedCafeFlowUpdateOrderStatusOutput = {};

type _CafeFlowViewKitchenBoardInput = Assert<Equal<CafeFlowViewKitchenBoardInput, ExpectedCafeFlowViewKitchenBoardInput>>;
type _CafeFlowViewKitchenBoardOutputItem = Assert<Equal<CafeFlowViewKitchenBoardOutputItem, ExpectedCafeFlowViewKitchenBoardOutputItem>>;
type _CafeFlowViewKitchenBoardOutput = Assert<Equal<CafeFlowViewKitchenBoardOutput, ExpectedCafeFlowViewKitchenBoardOutput>>;
type _CafeFlowUpdateOrderStatusInput = Assert<Equal<CafeFlowUpdateOrderStatusInput, ExpectedCafeFlowUpdateOrderStatusInput>>;
type _CafeFlowUpdateOrderStatusOutput = Assert<Equal<CafeFlowUpdateOrderStatusOutput, ExpectedCafeFlowUpdateOrderStatusOutput>>;

export {};