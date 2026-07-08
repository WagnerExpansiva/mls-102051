/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/shiftManagement.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { CafeFlowShiftManagementBase } from './shiftManagement.js';
import type { CafeFlowCloseShiftInput, CafeFlowOpenShiftInput, CafeFlowViewShiftClosingReportOutput } from '../contracts/shiftManagement.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowShiftManagementBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_openShiftState = Assert<Assignable<typeof page.openShiftState, "idle" | "loading" | "success" | "error">>;
type _State_openShiftNotes = Assert<Assignable<typeof page.openShiftNotes, string | CafeFlowOpenShiftInput["notes"]>>;
type _State_closeShiftState = Assert<Assignable<typeof page.closeShiftState, "idle" | "loading" | "success" | "error">>;
type _State_closeShiftTotalApurado = Assert<Assignable<typeof page.closeShiftTotalApurado, string | CafeFlowCloseShiftInput["totalApurado"]>>;
type _State_closeShiftNotes = Assert<Assignable<typeof page.closeShiftNotes, string | CafeFlowCloseShiftInput["notes"]>>;
type _State_viewShiftClosingReportState = Assert<Assignable<typeof page.viewShiftClosingReportState, "idle" | "loading" | "success" | "error">>;
type _State_viewShiftClosingReportData = Assert<Assignable<typeof page.viewShiftClosingReportData, CafeFlowViewShiftClosingReportOutput | null>>;
type _Action_openShift = Assert<Assignable<typeof page.openShift, (...args: any[]) => Promise<void>>>;
type _Handler_handleOpenShiftClick = Assert<Assignable<typeof page.handleOpenShiftClick, (...args: any[]) => void>>;
type _Action_closeShift = Assert<Assignable<typeof page.closeShift, (...args: any[]) => Promise<void>>>;
type _Handler_handleCloseShiftClick = Assert<Assignable<typeof page.handleCloseShiftClick, (...args: any[]) => void>>;
type _Action_loadViewShiftClosingReport = Assert<Assignable<typeof page.loadViewShiftClosingReport, (...args: any[]) => Promise<void>>>;
type _Handler_handleViewShiftClosingReportClick = Assert<Assignable<typeof page.handleViewShiftClosingReportClick, (...args: any[]) => void>>;
type _Action_setOpenShiftNotes = Assert<Assignable<typeof page.setOpenShiftNotes, (...args: any[]) => void>>;
type _Handler_handleOpenShiftNotesChange = Assert<Assignable<typeof page.handleOpenShiftNotesChange, (...args: any[]) => void>>;
type _Action_setCloseShiftTotalApurado = Assert<Assignable<typeof page.setCloseShiftTotalApurado, (...args: any[]) => void>>;
type _Handler_handleCloseShiftTotalApuradoChange = Assert<Assignable<typeof page.handleCloseShiftTotalApuradoChange, (...args: any[]) => void>>;
type _Action_setCloseShiftNotes = Assert<Assignable<typeof page.setCloseShiftNotes, (...args: any[]) => void>>;
type _Handler_handleCloseShiftNotesChange = Assert<Assignable<typeof page.handleCloseShiftNotesChange, (...args: any[]) => void>>;

export {};