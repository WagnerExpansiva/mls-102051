/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/managerDashboard.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { CafeFlowManagerDashboardBase } from './managerDashboard.js';
import type { CafeFlowRequestAiPromoSuggestionsOutput, CafeFlowRequestAiSalesSummaryOutput, CafeFlowViewDashboardOutput } from '../contracts/managerDashboard.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowManagerDashboardBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_viewDashboardState = Assert<Assignable<typeof page.viewDashboardState, "idle" | "loading" | "success" | "error">>;
type _State_viewDashboardData = Assert<Assignable<typeof page.viewDashboardData, unknown[] | CafeFlowViewDashboardOutput>>;
type _State_requestAiSalesSummaryState = Assert<Assignable<typeof page.requestAiSalesSummaryState, "idle" | "loading" | "success" | "error">>;
type _State_requestAiSalesSummaryData = Assert<Assignable<typeof page.requestAiSalesSummaryData, unknown[] | CafeFlowRequestAiSalesSummaryOutput>>;
type _State_requestAiPromoSuggestionsState = Assert<Assignable<typeof page.requestAiPromoSuggestionsState, "idle" | "loading" | "success" | "error">>;
type _State_requestAiPromoSuggestionsData = Assert<Assignable<typeof page.requestAiPromoSuggestionsData, unknown[] | CafeFlowRequestAiPromoSuggestionsOutput>>;
type _Action_loadViewDashboard = Assert<Assignable<typeof page.loadViewDashboard, (...args: any[]) => Promise<void>>>;
type _Handler_handleViewDashboardClick = Assert<Assignable<typeof page.handleViewDashboardClick, (...args: any[]) => void>>;
type _Action_loadRequestAiSalesSummary = Assert<Assignable<typeof page.loadRequestAiSalesSummary, (...args: any[]) => Promise<void>>>;
type _Handler_handleRequestAiSalesSummaryClick = Assert<Assignable<typeof page.handleRequestAiSalesSummaryClick, (...args: any[]) => void>>;
type _Action_loadRequestAiPromoSuggestions = Assert<Assignable<typeof page.loadRequestAiPromoSuggestions, (...args: any[]) => Promise<void>>>;
type _Handler_handleRequestAiPromoSuggestionsClick = Assert<Assignable<typeof page.handleRequestAiPromoSuggestionsClick, (...args: any[]) => void>>;

export {};