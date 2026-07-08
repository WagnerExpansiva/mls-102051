/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowViewDashboardOutput,
  CafeFlowRequestAiSalesSummaryOutput,
  CafeFlowRequestAiPromoSuggestionsOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/managerDashboard.js';

/// **collab_i18n_start**
const message_pt = {
  "managerDashboard.section.dashboard.title": "Dashboard e assistente IA",
  "managerDashboard.organism.viewDashboard.title": "Dashboard do dia",
  "managerDashboard.organism.requestAiSalesSummary.title": "Resumo de vendas por IA",
  "managerDashboard.organism.requestAiPromoSuggestions.title": "Sugestões de promoção por IA",
  "managerDashboard.intention.viewDashboard.list.title": "Pedidos do turno atual",
  "managerDashboard.intention.requestAiSalesSummary.list.title": "Resumo de vendas do dia",
  "managerDashboard.intention.requestAiPromoSuggestions.list.title": "Sugestões de promoção",
  "managerDashboard.field.status": "Status",
  "managerDashboard.field.orderType": "Tipo do pedido",
  "managerDashboard.field.createdAt": "Criado em",
  "managerDashboard.field.shiftId": "Turno",
  "managerDashboard.field.deliveredAt": "Entregue em",
  "managerDashboard.field.orderId": "Pedido",
  "managerDashboard.action.viewDashboard": "Atualizar dashboard",
  "managerDashboard.action.requestAiSalesSummary": "Gerar resumo de vendas",
  "managerDashboard.action.requestAiPromoSuggestions": "Gerar sugestões de promoção"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowManagerDashboardBase extends CollabLitElement {

  @property({ type: String })
  status: string = '';

  @property({ type: String })
  viewDashboardState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: Array })
  viewDashboardData: CafeFlowViewDashboardOutput = [];

  @property({ type: String })
  requestAiSalesSummaryState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: Array })
  requestAiSalesSummaryData: CafeFlowRequestAiSalesSummaryOutput = [];

  @property({ type: String })
  requestAiPromoSuggestionsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: Array })
  requestAiPromoSuggestionsData: CafeFlowRequestAiPromoSuggestionsOutput = [];

  private subscribedKeys: string[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();

    const statusFromState = getState('ui.managerDashboard.status') as string | undefined;
    if (statusFromState !== undefined && statusFromState !== null) {
      this.status = statusFromState;
    } else {
      this.status = '';
      setState('ui.managerDashboard.status', '');
    }

    const viewDashboardDataFromState = getState('ui.managerDashboard.data.viewDashboard') as CafeFlowViewDashboardOutput | undefined;
    if (viewDashboardDataFromState !== undefined && viewDashboardDataFromState !== null) {
      this.viewDashboardData = viewDashboardDataFromState;
    }

    const requestAiSalesSummaryDataFromState = getState('ui.managerDashboard.data.requestAiSalesSummary') as CafeFlowRequestAiSalesSummaryOutput | undefined;
    if (requestAiSalesSummaryDataFromState !== undefined && requestAiSalesSummaryDataFromState !== null) {
      this.requestAiSalesSummaryData = requestAiSalesSummaryDataFromState;
    }

    const requestAiPromoSuggestionsDataFromState = getState('ui.managerDashboard.data.requestAiPromoSuggestions') as CafeFlowRequestAiPromoSuggestionsOutput | undefined;
    if (requestAiPromoSuggestionsDataFromState !== undefined && requestAiPromoSuggestionsDataFromState !== null) {
      this.requestAiPromoSuggestionsData = requestAiPromoSuggestionsDataFromState;
    }

    const sharedKeys = [
      'ui.managerDashboard.status',
      'ui.managerDashboard.data.viewDashboard',
      'ui.managerDashboard.data.requestAiSalesSummary',
      'ui.managerDashboard.data.requestAiPromoSuggestions',
    ];
    subscribe(sharedKeys, this);
    this.subscribedKeys = sharedKeys;

    this.loadViewDashboard();
    this.loadRequestAiSalesSummary();
    this.loadRequestAiPromoSuggestions();
  }

  disconnectedCallback(): void {
    if (this.subscribedKeys.length > 0) {
      unsubscribe(this.subscribedKeys, this);
      this.subscribedKeys = [];
    }
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
      const data = response.data ?? [];
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

  handleViewDashboardClick(_e: Event): void {
    this.loadViewDashboard();
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
      const data = response.data ?? [];
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

  handleRequestAiSalesSummaryClick(_e: Event): void {
    this.loadRequestAiSalesSummary();
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
      const data = response.data ?? [];
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

  handleRequestAiPromoSuggestionsClick(_e: Event): void {
    this.loadRequestAiPromoSuggestions();
  }
}
