/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/posWorkspace.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { CafeFlowPosWorkspaceBase } from './posWorkspace.js';
import type { CafeFlowCreateOrderInput, CafeFlowViewOrderBoardOutput } from '../contracts/posWorkspace.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowPosWorkspaceBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_createOrderState = Assert<Assignable<typeof page.createOrderState, "idle" | "loading" | "success" | "error">>;
type _State_createOrderOrderType = Assert<Assignable<typeof page.createOrderOrderType, string | CafeFlowCreateOrderInput["orderType"]>>;
type _State_createOrderTableNumber = Assert<Assignable<typeof page.createOrderTableNumber, string | CafeFlowCreateOrderInput["tableNumber"]>>;
type _State_createOrderOrderItems = Assert<Assignable<typeof page.createOrderOrderItems, string | CafeFlowCreateOrderInput["orderItems"]>>;
type _State_createOrderPriority = Assert<Assignable<typeof page.createOrderPriority, string | CafeFlowCreateOrderInput["priority"]>>;
type _State_createOrderPriorityReason = Assert<Assignable<typeof page.createOrderPriorityReason, string | CafeFlowCreateOrderInput["priorityReason"]>>;
type _State_viewOrderBoardState = Assert<Assignable<typeof page.viewOrderBoardState, "idle" | "loading" | "success" | "error">>;
type _State_viewOrderBoardData = Assert<Assignable<typeof page.viewOrderBoardData, CafeFlowViewOrderBoardOutput>>;
type _State_deliverOrderState = Assert<Assignable<typeof page.deliverOrderState, "idle" | "loading" | "success" | "error">>;
type _Action_createOrder = Assert<Assignable<typeof page.createOrder, (...args: any[]) => Promise<void>>>;
type _Handler_handleCreateOrderClick = Assert<Assignable<typeof page.handleCreateOrderClick, (...args: any[]) => void>>;
type _Action_loadViewOrderBoard = Assert<Assignable<typeof page.loadViewOrderBoard, (...args: any[]) => Promise<void>>>;
type _Handler_handleViewOrderBoardClick = Assert<Assignable<typeof page.handleViewOrderBoardClick, (...args: any[]) => void>>;
type _Action_deliverOrder = Assert<Assignable<typeof page.deliverOrder, (...args: any[]) => Promise<void>>>;
type _Handler_handleDeliverOrderClick = Assert<Assignable<typeof page.handleDeliverOrderClick, (...args: any[]) => void>>;
type _Action_setCreateOrderOrderType = Assert<Assignable<typeof page.setCreateOrderOrderType, (...args: any[]) => void>>;
type _Handler_handleCreateOrderOrderTypeChange = Assert<Assignable<typeof page.handleCreateOrderOrderTypeChange, (...args: any[]) => void>>;
type _Action_setCreateOrderTableNumber = Assert<Assignable<typeof page.setCreateOrderTableNumber, (...args: any[]) => void>>;
type _Handler_handleCreateOrderTableNumberChange = Assert<Assignable<typeof page.handleCreateOrderTableNumberChange, (...args: any[]) => void>>;
type _Action_setCreateOrderOrderItems = Assert<Assignable<typeof page.setCreateOrderOrderItems, (...args: any[]) => void>>;
type _Handler_handleCreateOrderOrderItemsChange = Assert<Assignable<typeof page.handleCreateOrderOrderItemsChange, (...args: any[]) => void>>;
type _Action_setCreateOrderPriority = Assert<Assignable<typeof page.setCreateOrderPriority, (...args: any[]) => void>>;
type _Handler_handleCreateOrderPriorityChange = Assert<Assignable<typeof page.handleCreateOrderPriorityChange, (...args: any[]) => void>>;
type _Action_setCreateOrderPriorityReason = Assert<Assignable<typeof page.setCreateOrderPriorityReason, (...args: any[]) => void>>;
type _Handler_handleCreateOrderPriorityReasonChange = Assert<Assignable<typeof page.handleCreateOrderPriorityReasonChange, (...args: any[]) => void>>;

export {};