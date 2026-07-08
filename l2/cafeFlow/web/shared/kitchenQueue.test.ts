/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenQueue.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { CafeFlowKitchenQueueBase } from './kitchenQueue.js';
import type { CafeFlowUpdateOrderStatusInput, CafeFlowViewKitchenBoardOutput } from '../contracts/kitchenQueue.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowKitchenQueueBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_viewKitchenBoardState = Assert<Assignable<typeof page.viewKitchenBoardState, "idle" | "loading" | "success" | "error">>;
type _State_viewKitchenBoardData = Assert<Assignable<typeof page.viewKitchenBoardData, CafeFlowViewKitchenBoardOutput>>;
type _State_updateOrderStatusState = Assert<Assignable<typeof page.updateOrderStatusState, "idle" | "loading" | "success" | "error">>;
type _State_updateOrderStatusStatus = Assert<Assignable<typeof page.updateOrderStatusStatus, string | CafeFlowUpdateOrderStatusInput["status"]>>;
type _State_LayoutSumOrderId = Assert<Assignable<typeof page.LayoutSumOrderId, string>>;
type _State_LayoutSumOrderType = Assert<Assignable<typeof page.LayoutSumOrderType, string>>;
type _State_LayoutSumTableNumber = Assert<Assignable<typeof page.LayoutSumTableNumber, string>>;
type _State_LayoutSumPriority = Assert<Assignable<typeof page.LayoutSumPriority, string>>;
type _State_LayoutSumPriorityReason = Assert<Assignable<typeof page.LayoutSumPriorityReason, string>>;
type _State_LayoutSumReceivedAt = Assert<Assignable<typeof page.LayoutSumReceivedAt, string>>;
type _State_LayoutSumInPreparationAt = Assert<Assignable<typeof page.LayoutSumInPreparationAt, string>>;
type _Action_loadViewKitchenBoard = Assert<Assignable<typeof page.loadViewKitchenBoard, (...args: any[]) => Promise<void>>>;
type _Handler_handleViewKitchenBoardClick = Assert<Assignable<typeof page.handleViewKitchenBoardClick, (...args: any[]) => void>>;
type _Action_updateOrderStatus = Assert<Assignable<typeof page.updateOrderStatus, (...args: any[]) => Promise<void>>>;
type _Handler_handleUpdateOrderStatusClick = Assert<Assignable<typeof page.handleUpdateOrderStatusClick, (...args: any[]) => void>>;
type _Action_setUpdateOrderStatusStatus = Assert<Assignable<typeof page.setUpdateOrderStatusStatus, (...args: any[]) => void>>;
type _Handler_handleUpdateOrderStatusStatusChange = Assert<Assignable<typeof page.handleUpdateOrderStatusStatusChange, (...args: any[]) => void>>;

export {};