/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowViewDashboardOutput,
  CafeFlowRequestAiSalesSummaryOutput,
  CafeFlowRequestAiPromoSuggestionsOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/managerDashboard.js';

/// **collab_i18n_start**
const message_pt = {
  "page.title": "Dashboard e assistente IA",
  "section.dashboard.title": "Dashboard do Dia",
  "section.aiAssistant.title": "Assistente IA",
  "organism.dashboardMetrics.title": "Métricas do Dashboard",
  "organism.aiSalesSummary.title": "Resumo de vendas por IA",
  "organism.aiPromoSuggestions.title": "Sugestões de promoção por IA",
  "column.status": "Status",
  "column.orderType": "Tipo de pedido",
  "column.createdAt": "Criado em",
  "column.shiftId": "Turno",
  "column.deliveredAt": "Entregue em",
  "column.orderId": "Pedido",
  "action.viewDashboard.label": "Atualizar dashboard",
  "action.requestAiSalesSummary.label": "Gerar resumo de vendas",
  "action.requestAiPromoSuggestions.label": "Gerar sugestões de promoção",
  "empty.viewDashboard": "Nenhum dado disponível para o dashboard do dia.",
  "empty.requestAiSalesSummary": "Toque em \"Solicitar Resumo de Vendas\" para gerar o resumo do dia.",
  "empty.requestAiPromoSuggestions": "Toque em \"Solicitar Sugestões de Promoção\" para gerar sugestões.",
  "sec.dashboard.title": "Sec dashboard",
  "org.dashboard.metrics.title": "Exibir vendas do dia, itens mais vendidos e alertas de estoque baixo agrupados por status do pedido",
  "sec.ai.assistant.title": "Sec ai assistant",
  "org.ai.sales.summary.title": "Exibir resumo de vendas do dia gerado pelo assistente IA para apoio à decisão do gerente",
  "org.ai.promo.suggestions.title": "Exibir sugestões de promoção por item geradas pelo assistente IA para ações de marketing",
  "section.dashboardList.title": "Pedidos do dia",
  "section.aiAssistant.empty": "Solicite insights à IA para visualizar resumos e sugestões.",
  "organism.dashboardOrdersList.title": "Dashboard do dia",
  "organism.dashboardOrdersList.empty": "Nenhum pedido encontrado para o turno atual.",
  "organism.aiSalesSummary.empty": "Solicite o resumo de vendas para ver os insights do dia.",
  "organism.aiPromoSuggestions.empty": "Solicite sugestões de promoção para ver recomendações de marketing.",
  "sec.dashboard.list.title": "Sec dashboard list",
  "org.dashboard.orders.title": "Exibir pedidos do turno atual com status, tipo e timestamps para revisão do gerente",
  "section.discover.title": "Dashboard do dia",
  "section.review.title": "Revisão",
  "organism.dashboard.title": "Pedidos do dia",
  "organism.dashboard.empty": "Nenhum pedido encontrado para o turno atual",
  "organism.aiSales.title": "Resumo de vendas por IA",
  "organism.aiSales.empty": "Solicite o resumo de vendas ao assistente IA",
  "organism.aiPromo.title": "Sugestões de promoção por IA",
  "organism.aiPromo.empty": "Solicite sugestões de promoção ao assistente IA",
  "organism.review.title": "Resumo geral",
  "organism.review.empty": "Revise os dados do dashboard acima",
  "field.status.label": "Status",
  "field.orderType.label": "Tipo de pedido",
  "field.createdAt.label": "Criado em",
  "field.shiftId.label": "Turno",
  "field.deliveredAt.label": "Entregue em",
  "field.orderId.label": "Pedido",
  "action.viewDashboard.success": "Dashboard atualizado com sucesso",
  "action.viewDashboard.error": "Erro ao carregar dashboard",
  "action.requestAiSalesSummary.success": "Resumo de vendas gerado com sucesso",
  "action.requestAiSalesSummary.error": "Erro ao gerar resumo de vendas",
  "action.requestAiPromoSuggestions.success": "Sugestões de promoção geradas com sucesso",
  "action.requestAiPromoSuggestions.error": "Erro ao gerar sugestões de promoção"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowManagerDashboardBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) viewDashboardState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: Array }) viewDashboardData: CafeFlowViewDashboardOutput = [];

  @property({ type: String }) requestAiSalesSummaryState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: Array }) requestAiSalesSummaryData: CafeFlowRequestAiSalesSummaryOutput = [];

  @property({ type: String }) requestAiPromoSuggestionsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: Array }) requestAiPromoSuggestionsData: CafeFlowRequestAiPromoSuggestionsOutput = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();

    const savedStatus = getState('ui.managerDashboard.status');
    if (typeof savedStatus === 'string') {
      this.status = savedStatus;
    }

    const savedViewDashboardState = getState('ui.managerDashboard.action.viewDashboard.status');
    if (typeof savedViewDashboardState === 'string') {
      this.viewDashboardState = savedViewDashboardState as 'idle' | 'loading' | 'success' | 'error';
    }

    const savedViewDashboardData = getState('ui.managerDashboard.data.viewDashboard') as CafeFlowViewDashboardOutput | undefined;
    if (Array.isArray(savedViewDashboardData)) {
      this.viewDashboardData = savedViewDashboardData;
    }

    const savedRequestAiSalesSummaryState = getState('ui.managerDashboard.action.requestAiSalesSummary.status');
    if (typeof savedRequestAiSalesSummaryState === 'string') {
      this.requestAiSalesSummaryState = savedRequestAiSalesSummaryState as 'idle' | 'loading' | 'success' | 'error';
    }

    const savedRequestAiSalesSummaryData = getState('ui.managerDashboard.data.requestAiSalesSummary') as CafeFlowRequestAiSalesSummaryOutput | undefined;
    if (Array.isArray(savedRequestAiSalesSummaryData)) {
      this.requestAiSalesSummaryData = savedRequestAiSalesSummaryData;
    }

    const savedRequestAiPromoSuggestionsState = getState('ui.managerDashboard.action.requestAiPromoSuggestions.status');
    if (typeof savedRequestAiPromoSuggestionsState === 'string') {
      this.requestAiPromoSuggestionsState = savedRequestAiPromoSuggestionsState as 'idle' | 'loading' | 'success' | 'error';
    }

    const savedRequestAiPromoSuggestionsData = getState('ui.managerDashboard.data.requestAiPromoSuggestions') as CafeFlowRequestAiPromoSuggestionsOutput | undefined;
    if (Array.isArray(savedRequestAiPromoSuggestionsData)) {
      this.requestAiPromoSuggestionsData = savedRequestAiPromoSuggestionsData;
    }

    this.loadViewDashboard();
    this.loadRequestAiSalesSummary();
    this.loadRequestAiPromoSuggestions();
  }

  disconnectedCallback(): void {
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
      this.viewDashboardData = [];
      setState('ui.managerDashboard.data.viewDashboard', []);
      this.viewDashboardState = 'error';
      setState('ui.managerDashboard.action.viewDashboard.status', 'error');
      if (response.error) {
        console.error('[managerDashboard] viewDashboard error:', response.error.message);
      }
    }
  }

  handleViewDashboardClick(_event: Event): void {
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
      this.requestAiSalesSummaryData = [];
      setState('ui.managerDashboard.data.requestAiSalesSummary', []);
      this.requestAiSalesSummaryState = 'error';
      setState('ui.managerDashboard.action.requestAiSalesSummary.status', 'error');
      if (response.error) {
        console.error('[managerDashboard] requestAiSalesSummary error:', response.error.message);
      }
    }
  }

  handleRequestAiSalesSummaryClick(_event: Event): void {
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
      this.requestAiPromoSuggestionsData = [];
      setState('ui.managerDashboard.data.requestAiPromoSuggestions', []);
      this.requestAiPromoSuggestionsState = 'error';
      setState('ui.managerDashboard.action.requestAiPromoSuggestions.status', 'error');
      if (response.error) {
        console.error('[managerDashboard] requestAiPromoSuggestions error:', response.error.message);
      }
    }
  }

  handleRequestAiPromoSuggestionsClick(_event: Event): void {
    this.loadRequestAiPromoSuggestions();
  }
}
