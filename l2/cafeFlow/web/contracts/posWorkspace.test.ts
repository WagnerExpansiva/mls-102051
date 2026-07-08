/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/posWorkspace.test.ts" enhancement="_blank"/>

import type { CafeFlowCreateOrderInput, CafeFlowCreateOrderOutput, CafeFlowDeliverOrderInput, CafeFlowDeliverOrderOutput, CafeFlowViewOrderBoardInput, CafeFlowViewOrderBoardOutput, CafeFlowViewOrderBoardOutputItem } from './posWorkspace.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedCafeFlowCreateOrderInput = {
  orderType: "table" | "takeout";
  tableNumber?: string;
  orderItems: string;
  priority?: boolean;
  priorityReason?: string;
};
type ExpectedCafeFlowCreateOrderOutput = {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  orderType: "table" | "takeout";
  tableNumber: string;
  createdAt: string;
};
type ExpectedCafeFlowViewOrderBoardInput = {};
type ExpectedCafeFlowViewOrderBoardOutputItem = {
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
};
type ExpectedCafeFlowViewOrderBoardOutput = { items: ExpectedCafeFlowViewOrderBoardOutputItem[]; total: number; page?: number; pageSize?: number; };
type ExpectedCafeFlowDeliverOrderInput = {};
type ExpectedCafeFlowDeliverOrderOutput = {
  orderId: string;
  status: "registered" | "received" | "inPreparation" | "ready" | "delivered";
  deliveredAt: string;
  updatedAt: string;
};

type _CafeFlowCreateOrderInput = Assert<Equal<CafeFlowCreateOrderInput, ExpectedCafeFlowCreateOrderInput>>;
type _CafeFlowCreateOrderOutput = Assert<Equal<CafeFlowCreateOrderOutput, ExpectedCafeFlowCreateOrderOutput>>;
type _CafeFlowViewOrderBoardInput = Assert<Equal<CafeFlowViewOrderBoardInput, ExpectedCafeFlowViewOrderBoardInput>>;
type _CafeFlowViewOrderBoardOutputItem = Assert<Equal<CafeFlowViewOrderBoardOutputItem, ExpectedCafeFlowViewOrderBoardOutputItem>>;
type _CafeFlowViewOrderBoardOutput = Assert<Equal<CafeFlowViewOrderBoardOutput, ExpectedCafeFlowViewOrderBoardOutput>>;
type _CafeFlowDeliverOrderInput = Assert<Equal<CafeFlowDeliverOrderInput, ExpectedCafeFlowDeliverOrderInput>>;
type _CafeFlowDeliverOrderOutput = Assert<Equal<CafeFlowDeliverOrderOutput, ExpectedCafeFlowDeliverOrderOutput>>;

export {};