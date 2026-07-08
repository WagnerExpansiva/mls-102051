/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/menuManagement.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { CafeFlowMenuManagementBase } from './menuManagement.js';
import type { CafeFlowBrowseMenuItemsInput, CafeFlowBrowseMenuItemsOutput, CafeFlowManageMenuItemInput } from '../contracts/menuManagement.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowMenuManagementBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_browseMenuItemsState = Assert<Assignable<typeof page.browseMenuItemsState, "idle" | "loading" | "success" | "error">>;
type _State_browseMenuItemsStatusFilter = Assert<Assignable<typeof page.browseMenuItemsStatusFilter, string | CafeFlowBrowseMenuItemsInput["statusFilter"]>>;
type _State_browseMenuItemsMenuCategoryIdFilter = Assert<Assignable<typeof page.browseMenuItemsMenuCategoryIdFilter, string | CafeFlowBrowseMenuItemsInput["menuCategoryIdFilter"]>>;
type _State_browseMenuItemsData = Assert<Assignable<typeof page.browseMenuItemsData, CafeFlowBrowseMenuItemsOutput>>;
type _State_manageMenuItemState = Assert<Assignable<typeof page.manageMenuItemState, "idle" | "loading" | "success" | "error">>;
type _State_manageMenuItemName = Assert<Assignable<typeof page.manageMenuItemName, string | CafeFlowManageMenuItemInput["name"]>>;
type _State_manageMenuItemDescription = Assert<Assignable<typeof page.manageMenuItemDescription, string | CafeFlowManageMenuItemInput["description"]>>;
type _State_manageMenuItemMenuCategoryId = Assert<Assignable<typeof page.manageMenuItemMenuCategoryId, string | CafeFlowManageMenuItemInput["menuCategoryId"]>>;
type _State_manageMenuItemPrice = Assert<Assignable<typeof page.manageMenuItemPrice, string | CafeFlowManageMenuItemInput["price"]>>;
type _State_manageMenuItemItemType = Assert<Assignable<typeof page.manageMenuItemItemType, string | CafeFlowManageMenuItemInput["itemType"]>>;
type _State_manageMenuItemStatus = Assert<Assignable<typeof page.manageMenuItemStatus, string | CafeFlowManageMenuItemInput["status"]>>;
type _State_activeCompanyId = Assert<Assignable<typeof page.activeCompanyId, string>>;
type _State_LayoutFieldManageMenuItemActivatedAt = Assert<Assignable<typeof page.LayoutFieldManageMenuItemActivatedAt, string>>;
type _State_LayoutFieldManageMenuItemInactivatedAt = Assert<Assignable<typeof page.LayoutFieldManageMenuItemInactivatedAt, string>>;
type _State_LayoutFieldManageMenuItemUpdatedAt = Assert<Assignable<typeof page.LayoutFieldManageMenuItemUpdatedAt, string>>;
type _Action_loadBrowseMenuItems = Assert<Assignable<typeof page.loadBrowseMenuItems, (...args: any[]) => Promise<void>>>;
type _Handler_handleBrowseMenuItemsClick = Assert<Assignable<typeof page.handleBrowseMenuItemsClick, (...args: any[]) => void>>;
type _Action_manageMenuItem = Assert<Assignable<typeof page.manageMenuItem, (...args: any[]) => Promise<void>>>;
type _Handler_handleManageMenuItemClick = Assert<Assignable<typeof page.handleManageMenuItemClick, (...args: any[]) => void>>;
type _Action_setBrowseMenuItemsStatusFilter = Assert<Assignable<typeof page.setBrowseMenuItemsStatusFilter, (...args: any[]) => void>>;
type _Handler_handleBrowseMenuItemsStatusFilterChange = Assert<Assignable<typeof page.handleBrowseMenuItemsStatusFilterChange, (...args: any[]) => void>>;
type _Action_setBrowseMenuItemsMenuCategoryIdFilter = Assert<Assignable<typeof page.setBrowseMenuItemsMenuCategoryIdFilter, (...args: any[]) => void>>;
type _Handler_handleBrowseMenuItemsMenuCategoryIdFilterChange = Assert<Assignable<typeof page.handleBrowseMenuItemsMenuCategoryIdFilterChange, (...args: any[]) => void>>;
type _Action_setManageMenuItemName = Assert<Assignable<typeof page.setManageMenuItemName, (...args: any[]) => void>>;
type _Handler_handleManageMenuItemNameChange = Assert<Assignable<typeof page.handleManageMenuItemNameChange, (...args: any[]) => void>>;
type _Action_setManageMenuItemDescription = Assert<Assignable<typeof page.setManageMenuItemDescription, (...args: any[]) => void>>;
type _Handler_handleManageMenuItemDescriptionChange = Assert<Assignable<typeof page.handleManageMenuItemDescriptionChange, (...args: any[]) => void>>;
type _Action_setManageMenuItemMenuCategoryId = Assert<Assignable<typeof page.setManageMenuItemMenuCategoryId, (...args: any[]) => void>>;
type _Handler_handleManageMenuItemMenuCategoryIdChange = Assert<Assignable<typeof page.handleManageMenuItemMenuCategoryIdChange, (...args: any[]) => void>>;
type _Action_setManageMenuItemPrice = Assert<Assignable<typeof page.setManageMenuItemPrice, (...args: any[]) => void>>;
type _Handler_handleManageMenuItemPriceChange = Assert<Assignable<typeof page.handleManageMenuItemPriceChange, (...args: any[]) => void>>;
type _Action_setManageMenuItemItemType = Assert<Assignable<typeof page.setManageMenuItemItemType, (...args: any[]) => void>>;
type _Handler_handleManageMenuItemItemTypeChange = Assert<Assignable<typeof page.handleManageMenuItemItemTypeChange, (...args: any[]) => void>>;
type _Action_setManageMenuItemStatus = Assert<Assignable<typeof page.setManageMenuItemStatus, (...args: any[]) => void>>;
type _Handler_handleManageMenuItemStatusChange = Assert<Assignable<typeof page.handleManageMenuItemStatusChange, (...args: any[]) => void>>;

export {};