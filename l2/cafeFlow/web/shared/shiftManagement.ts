/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowOpenShiftInput,
  CafeFlowOpenShiftOutput,
  CafeFlowCloseShiftInput,
  CafeFlowCloseShiftOutput,
  CafeFlowViewShiftClosingReportOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/shiftManagement.js';

/// **collab_i18n_start**
const message_pt = {
  "shiftManagement.section.title": "Gestão de turno diário",
  "shiftManagement.openShift.title": "Abrir turno diário",
  "shiftManagement.openShift.form.title": "Command Form",
  "shiftManagement.openShift.notes.label": "Notes",
  "shiftManagement.openShift.submit.label": "Open Shift",
  "shiftManagement.closeShift.title": "Fechar turno diário",
  "shiftManagement.closeShift.form.title": "Command Form",
  "shiftManagement.closeShift.totalApurado.label": "Total Apurado",
  "shiftManagement.closeShift.notes.label": "Notes",
  "shiftManagement.closeShift.submit.label": "Close Shift",
  "shiftManagement.viewReport.title": "Revisar relatório de fechamento de turno",
  "shiftManagement.viewReport.action.title": "Action List",
  "shiftManagement.viewReport.action.label": "View Shift Closing Report",
  "shiftManagement.viewReport.summary.title": "Summary",
  "shiftManagement.viewReport.shiftClosingReportId.label": "Shift Closing Report Id",
  "shiftManagement.viewReport.shiftId.label": "Shift Id",
  "shiftManagement.viewReport.totalApurado.label": "Total Apurado",
  "shiftManagement.viewReport.paidOrderCount.label": "Paid Order Count",
  "shiftManagement.viewReport.createdAt.label": "Created At",
  "shiftManagement.viewReport.updatedAt.label": "Updated At"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowShiftManagementBase extends CollabLitElement {

  @property({ type: String })
  status: string = '';

  @property({ type: String })
  openShiftState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String })
  openShiftNotes: string = '';

  @property({ type: String })
  closeShiftState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String })
  closeShiftTotalApurado: string = '';

  @property({ type: String })
  closeShiftNotes: string = '';

  @property({ type: String })
  viewShiftClosingReportState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: Object })
  viewShiftClosingReportData: CafeFlowViewShiftClosingReportOutput | null = null;

  private subscribedKeys: string[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.status = getState('ui.shiftManagement.status') ?? '';
    this.openShiftState = getState('ui.shiftManagement.action.openShift.status') ?? 'idle';
    this.openShiftNotes = getState('ui.shiftManagement.input.openShift.notes') ?? '';
    this.closeShiftState = getState('ui.shiftManagement.action.closeShift.status') ?? 'idle';
    this.closeShiftTotalApurado = getState('ui.shiftManagement.input.closeShift.totalApurado') ?? '';
    this.closeShiftNotes = getState('ui.shiftManagement.input.closeShift.notes') ?? '';
    this.viewShiftClosingReportState = getState('ui.shiftManagement.action.viewShiftClosingReport.status') ?? 'idle';
    this.viewShiftClosingReportData = getState('ui.shiftManagement.data.viewShiftClosingReport') ?? null;

    const keys = [
      'ui.shiftManagement.status',
      'ui.shiftManagement.action.openShift.status',
      'ui.shiftManagement.input.openShift.notes',
      'ui.shiftManagement.action.closeShift.status',
      'ui.shiftManagement.input.closeShift.totalApurado',
      'ui.shiftManagement.input.closeShift.notes',
      'ui.shiftManagement.action.viewShiftClosingReport.status',
      'ui.shiftManagement.data.viewShiftClosingReport',
    ];
    this.subscribedKeys = keys;
    subscribe(keys, this);

    this.loadViewShiftClosingReport();
  }

  disconnectedCallback(): void {
    if (this.subscribedKeys.length > 0) {
      unsubscribe(this.subscribedKeys, this);
      this.subscribedKeys = [];
    }
    super.disconnectedCallback();
  }

  // --- StateSetter actions ---

  setOpenShiftNotes(value: string): void {
    this.openShiftNotes = value;
    setState('ui.shiftManagement.input.openShift.notes', value);
    this.requestUpdate();
  }

  handleOpenShiftNotesChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setOpenShiftNotes(target.value);
  }

  setCloseShiftTotalApurado(value: string): void {
    this.closeShiftTotalApurado = value;
    setState('ui.shiftManagement.input.closeShift.totalApurado', value);
    this.requestUpdate();
  }

  handleCloseShiftTotalApuradoChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setCloseShiftTotalApurado(target.value);
  }

  setCloseShiftNotes(value: string): void {
    this.closeShiftNotes = value;
    setState('ui.shiftManagement.input.closeShift.notes', value);
    this.requestUpdate();
  }

  handleCloseShiftNotesChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setCloseShiftNotes(target.value);
  }

  // --- Query actions ---

  async loadViewShiftClosingReport(): Promise<void> {
    this.viewShiftClosingReportState = 'loading';
    setState('ui.shiftManagement.action.viewShiftClosingReport.status', 'loading');

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowViewShiftClosingReportOutput>(
      'cafeFlow.shiftLifecycle.viewShiftClosingReport',
      {},
      options,
    );

    if (response.ok) {
      const data = response.data ?? null;
      this.viewShiftClosingReportData = data;
      setState('ui.shiftManagement.data.viewShiftClosingReport', data);
      this.viewShiftClosingReportState = 'success';
      setState('ui.shiftManagement.action.viewShiftClosingReport.status', 'success');
    } else {
      this.viewShiftClosingReportState = 'error';
      setState('ui.shiftManagement.action.viewShiftClosingReport.status', 'error');
      if (response.error) {
        console.error('[loadViewShiftClosingReport]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleViewShiftClosingReportClick(_e: Event): void {
    this.loadViewShiftClosingReport();
  }

  // --- Command actions ---

  async openShift(): Promise<void> {
    this.openShiftState = 'loading';
    setState('ui.shiftManagement.action.openShift.status', 'loading');

    const params: CafeFlowOpenShiftInput = {
      notes: this.openShiftNotes || undefined,
    };

    const response = await execBff<CafeFlowOpenShiftOutput>(
      'cafeFlow.shiftLifecycle.openShift',
      params,
      { mode: 'silent' },
    );

    if (response.ok) {
      // Refresh query actions
      await this.loadViewShiftClosingReport();
      if (this.viewShiftClosingReportState === 'error') {
        this.openShiftState = 'error';
        setState('ui.shiftManagement.action.openShift.status', 'error');
      } else {
        this.openShiftState = 'success';
        setState('ui.shiftManagement.action.openShift.status', 'success');
      }
    } else {
      this.openShiftState = 'error';
      setState('ui.shiftManagement.action.openShift.status', 'error');
      if (response.error) {
        console.error('[openShift]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleOpenShiftClick(_e: Event): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.openShift();
    }, { mode: 'blocking' });
  }

  async closeShift(): Promise<void> {
    this.closeShiftState = 'loading';
    setState('ui.shiftManagement.action.closeShift.status', 'loading');

    const parsedTotal = parseFloat(this.closeShiftTotalApurado);
    const params: CafeFlowCloseShiftInput = {
      totalApurado: isNaN(parsedTotal) ? 0 : parsedTotal,
      notes: this.closeShiftNotes || undefined,
    };

    const response = await execBff<CafeFlowCloseShiftOutput>(
      'cafeFlow.shiftLifecycle.closeShift',
      params,
      { mode: 'silent' },
    );

    if (response.ok) {
      // Refresh query actions
      await this.loadViewShiftClosingReport();
      if (this.viewShiftClosingReportState === 'error') {
        this.closeShiftState = 'error';
        setState('ui.shiftManagement.action.closeShift.status', 'error');
      } else {
        this.closeShiftState = 'success';
        setState('ui.shiftManagement.action.closeShift.status', 'success');
      }
    } else {
      this.closeShiftState = 'error';
      setState('ui.shiftManagement.action.closeShift.status', 'error');
      if (response.error) {
        console.error('[closeShift]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleCloseShiftClick(_e: Event): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.closeShift();
    }, { mode: 'blocking' });
  }
}
