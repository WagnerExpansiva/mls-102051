/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/stockManagement.test.ts" enhancement="_102020_/l2/enhancementAura"/> 

import type { CafeFlowStockManagementBase } from './stockManagement.js';
import type { CafeFlowBrowseStockItemsInput, CafeFlowBrowseStockItemsOutput, CafeFlowManageStockItemInput } from '../contracts/stockManagement.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowStockManagementBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_browseStockItemsState = Assert<Assignable<typeof page.browseStockItemsState, "idle" | "loading" | "success" | "error">>;
type _State_browseStockItemsSearchTerm = Assert<Assignable<typeof page.browseStockItemsSearchTerm, string | CafeFlowBrowseStockItemsInput["searchTerm"]>>;
type _State_browseStockItemsData = Assert<Assignable<typeof page.browseStockItemsData, CafeFlowBrowseStockItemsOutput>>;
type _State_manageStockItemState = Assert<Assignable<typeof page.manageStockItemState, "idle" | "loading" | "success" | "error">>;
type _State_manageStockItemName = Assert<Assignable<typeof page.manageStockItemName, string | CafeFlowManageStockItemInput["name"]>>;
type _State_manageStockItemUnit = Assert<Assignable<typeof page.manageStockItemUnit, string | CafeFlowManageStockItemInput["unit"]>>;
type _State_manageStockItemMinimumLevel = Assert<Assignable<typeof page.manageStockItemMinimumLevel, string | CafeFlowManageStockItemInput["minimumLevel"]>>;
type _State_LayoutSummaryManageStockItemUpdatedAt = Assert<Assignable<typeof page.LayoutSummaryManageStockItemUpdatedAt, string>>;
type _Handler_handleBrowseStockItemsClick = Assert<Assignable<typeof page.handleBrowseStockItemsClick, (...args: any[]) => void>>;
type _Action_manageStockItem = Assert<Assignable<typeof page.manageStockItem, (...args: any[]) => Promise<void>>>;
type _Handler_handleManageStockItemClick = Assert<Assignable<typeof page.handleManageStockItemClick, (...args: any[]) => void>>;
type _Action_setBrowseStockItemsSearchTerm = Assert<Assignable<typeof page.setBrowseStockItemsSearchTerm, (...args: any[]) => void>>;
type _Handler_handleBrowseStockItemsSearchTermChange = Assert<Assignable<typeof page.handleBrowseStockItemsSearchTermChange, (...args: any[]) => void>>;
type _Action_setManageStockItemName = Assert<Assignable<typeof page.setManageStockItemName, (...args: any[]) => void>>;
type _Handler_handleManageStockItemNameChange = Assert<Assignable<typeof page.handleManageStockItemNameChange, (...args: any[]) => void>>;
type _Action_setManageStockItemUnit = Assert<Assignable<typeof page.setManageStockItemUnit, (...args: any[]) => void>>;
type _Handler_handleManageStockItemUnitChange = Assert<Assignable<typeof page.handleManageStockItemUnitChange, (...args: any[]) => void>>;
type _Action_setManageStockItemMinimumLevel = Assert<Assignable<typeof page.setManageStockItemMinimumLevel, (...args: any[]) => void>>;
type _Handler_handleManageStockItemMinimumLevelChange = Assert<Assignable<typeof page.handleManageStockItemMinimumLevelChange, (...args: any[]) => void>>;

export {};