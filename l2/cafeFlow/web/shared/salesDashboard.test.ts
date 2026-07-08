/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/salesDashboard.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { CafeFlowSalesDashboardBase } from './salesDashboard.js';
import type { CafeFlowRequestAiPromoSuggestionsOutput, CafeFlowRequestAiSalesSummaryInput, CafeFlowRequestAiSalesSummaryOutput, CafeFlowViewDashboardOutput } from '../contracts/salesDashboard.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowSalesDashboardBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_viewDashboardState = Assert<Assignable<typeof page.viewDashboardState, "idle" | "loading" | "success" | "error">>;
type _State_viewDashboardData = Assert<Assignable<typeof page.viewDashboardData, unknown[] | CafeFlowViewDashboardOutput>>;
type _State_requestAiSalesSummaryState = Assert<Assignable<typeof page.requestAiSalesSummaryState, "idle" | "loading" | "success" | "error">>;
type _State_requestAiSalesSummarySummaryRequest = Assert<Assignable<typeof page.requestAiSalesSummarySummaryRequest, string | CafeFlowRequestAiSalesSummaryInput["summaryRequest"]>>;
type _State_requestAiSalesSummaryData = Assert<Assignable<typeof page.requestAiSalesSummaryData, unknown[] | CafeFlowRequestAiSalesSummaryOutput>>;
type _State_requestAiPromoSuggestionsState = Assert<Assignable<typeof page.requestAiPromoSuggestionsState, "idle" | "loading" | "success" | "error">>;
type _State_requestAiPromoSuggestionsData = Assert<Assignable<typeof page.requestAiPromoSuggestionsData, unknown[] | CafeFlowRequestAiPromoSuggestionsOutput>>;
type _State_activeCompanyId = Assert<Assignable<typeof page.activeCompanyId, string>>;
type _Action_loadViewDashboard = Assert<Assignable<typeof page.loadViewDashboard, (...args: any[]) => Promise<void>>>;
type _Handler_handleViewDashboardClick = Assert<Assignable<typeof page.handleViewDashboardClick, (...args: any[]) => void>>;
type _Action_loadRequestAiSalesSummary = Assert<Assignable<typeof page.loadRequestAiSalesSummary, (...args: any[]) => Promise<void>>>;
type _Handler_handleRequestAiSalesSummaryClick = Assert<Assignable<typeof page.handleRequestAiSalesSummaryClick, (...args: any[]) => void>>;
type _Action_loadRequestAiPromoSuggestions = Assert<Assignable<typeof page.loadRequestAiPromoSuggestions, (...args: any[]) => Promise<void>>>;
type _Handler_handleRequestAiPromoSuggestionsClick = Assert<Assignable<typeof page.handleRequestAiPromoSuggestionsClick, (...args: any[]) => void>>;
type _Action_setRequestAiSalesSummarySummaryRequest = Assert<Assignable<typeof page.setRequestAiSalesSummarySummaryRequest, (...args: any[]) => void>>;
type _Handler_handleRequestAiSalesSummarySummaryRequestChange = Assert<Assignable<typeof page.handleRequestAiSalesSummarySummaryRequestChange, (...args: any[]) => void>>;

export {};