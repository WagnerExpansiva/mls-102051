/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowViewDashboardOutput,
  CafeFlowViewDashboardOutputItem,
  CafeFlowRequestAiSalesSummaryOutput,
  CafeFlowRequestAiSalesSummaryOutputItem,
  CafeFlowRequestAiPromoSuggestionsOutput,
  CafeFlowRequestAiPromoSuggestionsOutputItem,
} from '/_102051_/l2/cafeFlow/web/contracts/managerDashboard.js';

/// **collab_i18n_start**
const message_pt = {
  "managerDashboard.section.overview.title": "Visão do dia",
  "managerDashboard.organism.viewDashboard.title": "Dashboard do turno",
  "managerDashboard.intent.dashboardStatus.title": "Status dos pedidos do turno",
  "managerDashboard.intent.dashboardStatus.empty": "Nenhum pedido no turno atual",
  "managerDashboard.field.status": "Status do pedido",
  "managerDashboard.field.orderType": "Tipo de pedido",
  "managerDashboard.field.createdAt": "Criado em",
  "managerDashboard.field.deliveredAt": "Entregue em",
  "managerDashboard.field.shiftId": "Turno",
  "managerDashboard.action.refreshDashboard": "Atualizar dashboard",
  "managerDashboard.section.aiAssistant.title": "Assistente IA",
  "managerDashboard.organism.aiSalesSummary.title": "Resumo de vendas por IA",
  "managerDashboard.intent.aiSalesAction.title": "Solicitar resumo de vendas",
  "managerDashboard.intent.aiSalesAction.empty": "Resumo ainda não solicitado",
  "managerDashboard.action.requestAiSalesSummary": "Gerar resumo de vendas",
  "managerDashboard.intent.aiSalesResult.title": "Resumo de vendas gerado",
  "managerDashboard.intent.aiSalesResult.empty": "Nenhum resumo disponível",
  "managerDashboard.field.orderId": "Pedido",
  "managerDashboard.organism.aiPromoSuggestions.title": "Sugestões de promoção por IA",
  "managerDashboard.intent.aiPromoAction.title": "Solicitar sugestões de promoção",
  "managerDashboard.intent.aiPromoAction.empty": "Sugestões ainda não solicitadas",
  "managerDashboard.action.requestAiPromoSuggestions": "Gerar sugestões de promoção",
  "managerDashboard.intent.aiPromoResult.title": "Sugestões de promoção geradas",
  "managerDashboard.intent.aiPromoResult.empty": "Nenhuma sugestão disponível"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

const STATE_KEYS = [
  'ui.managerDashboard.status',
  'ui.managerDashboard.action.viewDashboard.status',
  'ui.managerDashboard.data.viewDashboard',
  'ui.managerDashboard.action.requestAiSalesSummary.status',
  'ui.managerDashboard.data.requestAiSalesSummary',
  'ui.managerDashboard.action.requestAiPromoSuggestions.status',
  'ui.managerDashboard.data.requestAiPromoSuggestions',
];

export class CafeFlowManagerDashboardBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) viewDashboardState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: Array }) viewDashboardData: CafeFlowViewDashboardOutputItem[] = [];

  @property({ type: String }) requestAiSalesSummaryState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: Array }) requestAiSalesSummaryData: CafeFlowRequestAiSalesSummaryOutputItem[] = [];

  @property({ type: String }) requestAiPromoSuggestionsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: Array }) requestAiPromoSuggestionsData: CafeFlowRequestAiPromoSuggestionsOutputItem[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.status = (getState('ui.managerDashboard.status') as string) ?? '';
    this.viewDashboardState = (getState('ui.managerDashboard.action.viewDashboard.status') as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
    this.viewDashboardData = (getState('ui.managerDashboard.data.viewDashboard') as CafeFlowViewDashboardOutputItem[]) ?? [];
    this.requestAiSalesSummaryState = (getState('ui.managerDashboard.action.requestAiSalesSummary.status') as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
    this.requestAiSalesSummaryData = (getState('ui.managerDashboard.data.requestAiSalesSummary') as CafeFlowRequestAiSalesSummaryOutputItem[]) ?? [];
    this.requestAiPromoSuggestionsState = (getState('ui.managerDashboard.action.requestAiPromoSuggestions.status') as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
    this.requestAiPromoSuggestionsData = (getState('ui.managerDashboard.data.requestAiPromoSuggestions') as CafeFlowRequestAiPromoSuggestionsOutputItem[]) ?? [];

    subscribe(STATE_KEYS, this);

    void this.loadViewDashboard();
    void this.loadRequestAiSalesSummary();
    void this.loadRequestAiPromoSuggestions();
  }

  disconnectedCallback(): void {
    unsubscribe(STATE_KEYS, this);
    super.disconnectedCallback();
  }

  async loadViewDashboard(): Promise<void> {
    this.viewDashboardState = 'loading';
    setState('ui.managerDashboard.action.viewDashboard.status', 'loading');

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowViewDashboardOutput>(
      'cafeFlow.viewDashboard.viewDashboard',
      {},
      options,
    );

    if (response.ok) {
      const data: CafeFlowViewDashboardOutputItem[] = response.data ?? [];
      this.viewDashboardData = data;
      setState('ui.managerDashboard.data.viewDashboard', data);
      this.viewDashboardState = 'success';
      setState('ui.managerDashboard.action.viewDashboard.status', 'success');
    } else {
      this.viewDashboardState = 'error';
      setState('ui.managerDashboard.action.viewDashboard.status', 'error');
      if (response.error) {
        console.error('[managerDashboard] loadViewDashboard error:', response.error.message);
      }
    }
  }

  handleViewDashboardClick(): void {
    void this.loadViewDashboard();
  }

  async loadRequestAiSalesSummary(): Promise<void> {
    this.requestAiSalesSummaryState = 'loading';
    setState('ui.managerDashboard.action.requestAiSalesSummary.status', 'loading');

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowRequestAiSalesSummaryOutput>(
      'cafeFlow.requestAiSalesSummary.requestAiSalesSummary',
      {},
      options,
    );

    if (response.ok) {
      const data: CafeFlowRequestAiSalesSummaryOutputItem[] = response.data ?? [];
      this.requestAiSalesSummaryData = data;
      setState('ui.managerDashboard.data.requestAiSalesSummary', data);
      this.requestAiSalesSummaryState = 'success';
      setState('ui.managerDashboard.action.requestAiSalesSummary.status', 'success');
    } else {
      this.requestAiSalesSummaryState = 'error';
      setState('ui.managerDashboard.action.requestAiSalesSummary.status', 'error');
      if (response.error) {
        console.error('[managerDashboard] loadRequestAiSalesSummary error:', response.error.message);
      }
    }
  }

  handleRequestAiSalesSummaryClick(): void {
    void this.loadRequestAiSalesSummary();
  }

  async loadRequestAiPromoSuggestions(): Promise<void> {
    this.requestAiPromoSuggestionsState = 'loading';
    setState('ui.managerDashboard.action.requestAiPromoSuggestions.status', 'loading');

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowRequestAiPromoSuggestionsOutput>(
      'cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions',
      {},
      options,
    );

    if (response.ok) {
      const data: CafeFlowRequestAiPromoSuggestionsOutputItem[] = response.data ?? [];
      this.requestAiPromoSuggestionsData = data;
      setState('ui.managerDashboard.data.requestAiPromoSuggestions', data);
      this.requestAiPromoSuggestionsState = 'success';
      setState('ui.managerDashboard.action.requestAiPromoSuggestions.status', 'success');
    } else {
      this.requestAiPromoSuggestionsState = 'error';
      setState('ui.managerDashboard.action.requestAiPromoSuggestions.status', 'error');
      if (response.error) {
        console.error('[managerDashboard] loadRequestAiPromoSuggestions error:', response.error.message);
      }
    }
  }

  handleRequestAiPromoSuggestionsClick(): void {
    void this.loadRequestAiPromoSuggestions();
  }
}
