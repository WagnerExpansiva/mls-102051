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
  CafeFlowViewShiftClosingReportInput,
  CafeFlowViewShiftClosingReportOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/shiftManagement.js';

/// **collab_i18n_start**
const message_pt = {
  "page.title": "Gestão de turno diário",
  "section.discover.title": "Relatório de fechamento",
  "section.openShift.title": "Abrir turno",
  "section.closeShift.title": "Fechar turno",
  "section.review.title": "Resumo",
  "field.notes.label": "Observações",
  "field.totalApurado.label": "Total apurado",
  "field.shiftId.label": "ID do turno",
  "field.shiftClosingReportId.label": "ID do relatório",
  "field.paidOrderCount.label": "Pedidos pagos",
  "field.createdAt.label": "Criado em",
  "field.updatedAt.label": "Atualizado em",
  "field.status.label": "Status",
  "field.openedAt.label": "Aberto em",
  "field.openedBy.label": "Aberto por",
  "field.closedAt.label": "Fechado em",
  "field.closedBy.label": "Fechado por",
  "action.openShift.label": "Abrir turno",
  "action.closeShift.label": "Fechar turno",
  "action.openShift.success": "Turno aberto com sucesso",
  "action.openShift.error": "Erro ao abrir turno",
  "action.closeShift.success": "Turno fechado com sucesso",
  "action.closeShift.error": "Erro ao fechar turno",
  "empty.reports": "Nenhum relatório de fechamento encontrado",
  "sec.discover.title": "Sec discover",
  "org.report.cards.title": "Exibir relatório de fechamento de turno como cartão detalhado com total apurado e pedidos pagos",
  "sec.open.shift.title": "Sec open shift",
  "org.open.shift.title": "Formulário para abrir turno diário com observações opcionais",
  "sec.close.shift.title": "Sec close shift",
  "org.close.shift.title": "Formulário para fechar turno diário confirmando total apurado e observações",
  "sec.review.title": "Sec review",
  "org.shift.summary.title": "Resumo do turno exibindo dados de abertura e fechamento para conferência",
  "section.board.title": "Quadro de turnos",
  "lane.open.title": "Turno aberto",
  "lane.open.empty": "Nenhum turno aberto. Abra um turno para iniciar o expediente.",
  "lane.closed.title": "Turno fechado",
  "lane.closed.empty": "Nenhum relatório de fechamento disponível.",
  "intent.query.report.title": "Relatórios de fechamento",
  "intent.openShift.title": "Abrir novo turno",
  "intent.closeShift.title": "Fechar turno atual",
  "intent.report.summary.title": "Detalhes do relatório de fechamento",
  "empty.report": "Nenhum relatório de fechamento disponível",
  "action.viewShiftClosingReport.label": "Atualizar relatório",
  "org.shift.board.title": "Exibe turnos agrupados por status (aberto/fechado) em colunas kanban com ações de transição contextuais ao card selecionado",
  "org.open.shift.form.title": "Formulário para abrir um novo turno diário com observações opcionais",
  "org.close.shift.form.title": "Formulário para fechar o turno atual registrando o total apurado e observações",
  "org.report.summary.title": "Exibe os detalhes do relatório de fechamento de turno para conferência do dia",
  "page.shiftManagement.title": "Gestão de turno diário",
  "section.execute.title": "Ações do turno",
  "organism.report.title": "Relatório de fechamento de turno",
  "organism.shiftLifecycle.title": "Ações do turno",
  "organism.openShift.title": "Abrir turno",
  "organism.closeShift.title": "Fechar turno",
  "organism.summary.title": "Resumo do turno",
  "empty.openShift": "Nenhum turno aberto",
  "empty.closeShift": "Nenhum turno aberto para fechar",
  "empty.summary": "Nenhuma ação realizada ainda",
  "org.shift.report.title": "Exibir o relatório de fechamento de turno com total apurado e pedidos pagos consolidados, servindo como superfície dominante do fluxo de turno",
  "sec.execute.title": "Sec execute",
  "org.shift.lifecycle.title": "Apresentar as transições do ciclo de vida do turno (abrir e fechar) como ações contextuais, com formulários mínimos contendo apenas as decisões do gerente",
  "org.summary.title": "Revisar o contexto e o resultado das ações principais da página, exibindo os dados de abertura e fechamento do turno para conferência"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowShiftManagementBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) openShiftState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: String }) openShiftNotes: string = '';
  @property({ type: Object }) openShiftOutput: CafeFlowOpenShiftOutput | null = null;
  @property({ type: String }) openShiftError: string = '';

  @property({ type: String }) closeShiftState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: String }) closeShiftTotalApurado: string = '';
  @property({ type: String }) closeShiftNotes: string = '';
  @property({ type: Object }) closeShiftOutput: CafeFlowCloseShiftOutput | null = null;
  @property({ type: String }) closeShiftError: string = '';

  @property({ type: String }) viewShiftClosingReportState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: String }) viewShiftClosingReportShiftId: string = '';
  @property({ type: Object }) viewShiftClosingReportData: CafeFlowViewShiftClosingReportOutput | null = null;

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.status = (getState('ui.shiftManagement.status') as string) ?? '';
    this.openShiftNotes = (getState('ui.shiftManagement.input.openShift.notes') as string) ?? '';
    this.closeShiftTotalApurado = (getState('ui.shiftManagement.input.closeShift.totalApurado') as string) ?? '';
    this.closeShiftNotes = (getState('ui.shiftManagement.input.closeShift.notes') as string) ?? '';
    this.viewShiftClosingReportShiftId = (getState('ui.shiftManagement.input.viewShiftClosingReport.shiftId') as string) ?? '';

    subscribe(
      [
        'ui.shiftManagement.status',
        'ui.shiftManagement.input.openShift.notes',
        'ui.shiftManagement.input.closeShift.totalApurado',
        'ui.shiftManagement.input.closeShift.notes',
        'ui.shiftManagement.input.viewShiftClosingReport.shiftId',
      ],
      this
    );

    this.loadViewShiftClosingReport();
  }

  disconnectedCallback(): void {
    unsubscribe(
      [
        'ui.shiftManagement.status',
        'ui.shiftManagement.input.openShift.notes',
        'ui.shiftManagement.input.closeShift.totalApurado',
        'ui.shiftManagement.input.closeShift.notes',
        'ui.shiftManagement.input.viewShiftClosingReport.shiftId',
      ],
      this
    );
    super.disconnectedCallback();
  }

  // ---- Route param parsing ----

  private parseRouteParams(): { shiftId?: string } {
    const pattern = '/cafeFlow/shiftManagement/:shiftId?';
    const patternParts = pattern.split('/').filter((p) => p.length > 0);
    const pathParts = window.location.pathname.split('/').filter((p) => p.length > 0);
    const result: { shiftId?: string } = {};
    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(':')) {
        const isOptional = part.endsWith('?');
        const name = isOptional ? part.slice(1, -1) : part.slice(1);
        const value = pathParts[i] ? decodeURIComponent(pathParts[i]) : undefined;
        if (value) {
          (result as Record<string, string | undefined>)[name] = value;
        }
      }
    }
    return result;
  }

  // ---- State setters ----

  setOpenShiftNotes(value: string): void {
    this.openShiftNotes = value;
    setState('ui.shiftManagement.input.openShift.notes', value);
    this.requestUpdate();
  }

  handleOpenShiftNotesChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | null;
    if (!target) return;
    this.setOpenShiftNotes(target.value);
  }

  setCloseShiftTotalApurado(value: string): void {
    this.closeShiftTotalApurado = value;
    setState('ui.shiftManagement.input.closeShift.totalApurado', value);
    this.requestUpdate();
  }

  handleCloseShiftTotalApuradoChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | null;
    if (!target) return;
    this.setCloseShiftTotalApurado(target.value);
  }

  setCloseShiftNotes(value: string): void {
    this.closeShiftNotes = value;
    setState('ui.shiftManagement.input.closeShift.notes', value);
    this.requestUpdate();
  }

  handleCloseShiftNotesChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | null;
    if (!target) return;
    this.setCloseShiftNotes(target.value);
  }

  setViewShiftClosingReportShiftId(value: string): void {
    this.viewShiftClosingReportShiftId = value;
    setState('ui.shiftManagement.input.viewShiftClosingReport.shiftId', value);
    this.requestUpdate();
  }

  handleViewShiftClosingReportShiftIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | null;
    if (!target) return;
    this.setViewShiftClosingReportShiftId(target.value);
  }

  // ---- Query action: viewShiftClosingReport ----

  async loadViewShiftClosingReport(): Promise<void> {
    const routeParams = this.parseRouteParams();
    if (routeParams.shiftId) {
      this.viewShiftClosingReportShiftId = routeParams.shiftId;
      setState('ui.shiftManagement.input.viewShiftClosingReport.shiftId', routeParams.shiftId);
    }

    const shiftId = this.viewShiftClosingReportShiftId;
    if (!shiftId) {
      this.viewShiftClosingReportState = 'idle';
      setState('ui.shiftManagement.action.viewShiftClosingReport.status', 'idle');
      this.viewShiftClosingReportData = null;
      setState('ui.shiftManagement.data.viewShiftClosingReport', null);
      this.requestUpdate();
      return;
    }

    this.viewShiftClosingReportState = 'loading';
    setState('ui.shiftManagement.action.viewShiftClosingReport.status', 'loading');
    this.requestUpdate();

    const params: CafeFlowViewShiftClosingReportInput = { shiftId };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowViewShiftClosingReportOutput>(
      'cafeFlow.shiftLifecycle.viewShiftClosingReport',
      params,
      options
    );

    if (response.ok) {
      this.viewShiftClosingReportData = response.data ?? null;
      setState('ui.shiftManagement.data.viewShiftClosingReport', this.viewShiftClosingReportData);
      this.viewShiftClosingReportState = 'success';
      setState('ui.shiftManagement.action.viewShiftClosingReport.status', 'success');
    } else {
      this.viewShiftClosingReportData = null;
      setState('ui.shiftManagement.data.viewShiftClosingReport', null);
      this.viewShiftClosingReportState = 'error';
      setState('ui.shiftManagement.action.viewShiftClosingReport.status', 'error');
      if (response.error?.message) {
        console.error('viewShiftClosingReport error:', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleViewShiftClosingReportClick(e: Event): void {
    e.preventDefault();
    void this.loadViewShiftClosingReport();
  }

  // ---- Command action: openShift ----

  async openShift(): Promise<void> {
    this.openShiftState = 'loading';
    setState('ui.shiftManagement.action.openShift.status', 'loading');
    this.requestUpdate();

    const input: CafeFlowOpenShiftInput = {
      notes: this.openShiftNotes || undefined,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CafeFlowOpenShiftOutput>(
      'cafeFlow.shiftLifecycle.openShift',
      input,
      options
    );

    if (response.ok) {
      this.openShiftOutput = response.data ?? null;
      setState('ui.shiftManagement.output.openShift', this.openShiftOutput);

      // Refresh query actions
      await this.loadViewShiftClosingReport();

      // Clear input state keys
      this.openShiftNotes = '';
      setState('ui.shiftManagement.input.openShift.notes', '');

      this.openShiftError = '';
      setState('ui.shiftManagement.action.openShift.error', '');
      this.openShiftState = 'success';
      setState('ui.shiftManagement.action.openShift.status', 'success');
    } else {
      const errorMsg = response.error?.message ?? this.msg['action.openShift.error'];
      this.openShiftError = errorMsg;
      setState('ui.shiftManagement.action.openShift.error', errorMsg);
      this.openShiftState = 'error';
      setState('ui.shiftManagement.action.openShift.status', 'error');
    }
    this.requestUpdate();
  }

  handleOpenShiftClick(e: Event): void {
    e.preventDefault();
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.openShift();
    }, { mode: 'blocking' });
  }

  // ---- Command action: closeShift ----

  async closeShift(): Promise<void> {
    this.closeShiftState = 'loading';
    setState('ui.shiftManagement.action.closeShift.status', 'loading');
    this.requestUpdate();

    const totalApuradoNum = parseFloat(this.closeShiftTotalApurado);
    const input: CafeFlowCloseShiftInput = {
      totalApurado: isNaN(totalApuradoNum) ? 0 : totalApuradoNum,
      notes: this.closeShiftNotes || undefined,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CafeFlowCloseShiftOutput>(
      'cafeFlow.shiftLifecycle.closeShift',
      input,
      options
    );

    if (response.ok) {
      this.closeShiftOutput = response.data ?? null;
      setState('ui.shiftManagement.output.closeShift', this.closeShiftOutput);

      // Refresh query actions
      await this.loadViewShiftClosingReport();

      // Clear input state keys
      this.closeShiftTotalApurado = '';
      setState('ui.shiftManagement.input.closeShift.totalApurado', '');
      this.closeShiftNotes = '';
      setState('ui.shiftManagement.input.closeShift.notes', '');

      this.closeShiftError = '';
      setState('ui.shiftManagement.action.closeShift.error', '');
      this.closeShiftState = 'success';
      setState('ui.shiftManagement.action.closeShift.status', 'success');
    } else {
      const errorMsg = response.error?.message ?? this.msg['action.closeShift.error'];
      this.closeShiftError = errorMsg;
      setState('ui.shiftManagement.action.closeShift.error', errorMsg);
      this.closeShiftState = 'error';
      setState('ui.shiftManagement.action.closeShift.status', 'error');
    }
    this.requestUpdate();
  }

  handleCloseShiftClick(e: Event): void {
    e.preventDefault();
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.closeShift();
    }, { mode: 'blocking' });
  }
}
