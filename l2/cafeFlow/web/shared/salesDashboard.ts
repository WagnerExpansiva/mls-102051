/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/salesDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowViewDashboardOutput,
  CafeFlowViewDashboardOutputItem,
  CafeFlowRequestAiSalesSummaryInput,
  CafeFlowRequestAiSalesSummaryOutput,
  CafeFlowRequestAiSalesSummaryOutputItem,
  CafeFlowRequestAiPromoSuggestionsOutput,
  CafeFlowRequestAiPromoSuggestionsOutputItem,
} from '/_102051_/l2/cafeFlow/web/contracts/salesDashboard.js';

/// **collab_i18n_start**
const message_pt = {
  "salesDashboard.section.dashboardAi.title": "Dashboard e assistente IA",
  "salesDashboard.organism.viewDashboard.title": "Dashboard do dia",
  "salesDashboard.organism.requestAiSalesSummary.title": "Resumo de vendas por IA",
  "salesDashboard.organism.requestAiPromoSuggestions.title": "Sugestões de promoção por IA",
  "salesDashboard.intent.dashboard.context.title": "Turno atual",
  "salesDashboard.intent.dashboard.data.title": "Dados do dashboard do dia",
  "salesDashboard.intent.dashboard.lowStock.title": "Alertas de estoque baixo",
  "salesDashboard.intent.aiSales.request.title": "Solicitar resumo de vendas",
  "salesDashboard.intent.aiSales.output.title": "Resumo de vendas (IA)",
  "salesDashboard.intent.aiPromo.request.title": "Solicitar sugestões de promoção",
  "salesDashboard.intent.aiPromo.output.title": "Sugestões de promoção (IA)",
  "salesDashboard.field.shiftId.label": "Turno",
  "salesDashboard.field.orderId.label": "Pedido",
  "salesDashboard.field.status.label": "Status",
  "salesDashboard.field.orderType.label": "Tipo de pedido",
  "salesDashboard.field.createdAt.label": "Criado em",
  "salesDashboard.field.menuItemId.label": "Item do cardápio",
  "salesDashboard.field.quantity.label": "Quantidade",
  "salesDashboard.field.stockItemId.label": "Item de estoque",
  "salesDashboard.field.currentQuantity.label": "Quantidade atual",
  "salesDashboard.field.minimumQuantity.label": "Quantidade mínima",
  "salesDashboard.field.summaryRequest.label": "Solicitação do resumo",
  "salesDashboard.field.deliveredAt.label": "Entregue em",
  "salesDashboard.field.menuItemName.label": "Nome do item",
  "salesDashboard.action.viewDashboard.label": "Atualizar dashboard",
  "salesDashboard.action.requestAiSalesSummary.label": "Gerar resumo IA",
  "salesDashboard.action.requestAiPromoSuggestions.label": "Gerar sugestões IA"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowSalesDashboardBase extends CollabLitElement {
  @property({ type: String }) status: string = "";

  @property({ type: String }) viewDashboardState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: Array }) viewDashboardData: CafeFlowViewDashboardOutputItem[] = [];

  @property({ type: String }) requestAiSalesSummaryState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) requestAiSalesSummarySummaryRequest: string = "";

  @property({ type: Array }) requestAiSalesSummaryData: CafeFlowRequestAiSalesSummaryOutputItem[] = [];

  @property({ type: String }) requestAiPromoSuggestionsState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: Array }) requestAiPromoSuggestionsData: CafeFlowRequestAiPromoSuggestionsOutputItem[] = [];

  @property({ type: String }) activeCompanyId: string = "";

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();

    const savedActiveCompanyId = getState("ui.salesDashboard.businessContext.activeCompanyId") as string | undefined;
    if (savedActiveCompanyId !== undefined && savedActiveCompanyId !== null) {
      this.activeCompanyId = savedActiveCompanyId;
    }

    subscribe("ui.salesDashboard.businessContext.activeCompanyId", this);

    this.loadViewDashboard();
    this.loadRequestAiSalesSummary();
    this.loadRequestAiPromoSuggestions();
  }

  disconnectedCallback(): void {
    unsubscribe("ui.salesDashboard.businessContext.activeCompanyId", this);
    super.disconnectedCallback();
  }

  handleIcaStateChange(key: string, value: unknown): void {
    if (key === "ui.salesDashboard.businessContext.activeCompanyId") {
      this.activeCompanyId = (value as string) ?? "";
    }
  }

  // --- Action: viewDashboard (query) ---

  async loadViewDashboard(): Promise<void> {
    this.viewDashboardState = "loading";
    setState("ui.salesDashboard.action.viewDashboard.status", "loading");
    this.requestUpdate();

    const options: BffClientOptions = { mode: "silent" };

    const response = await execBff<CafeFlowViewDashboardOutput>(
      "cafeFlow.viewDashboard.viewDashboard",
      {},
      options
    );

    if (response.ok) {
      const data: CafeFlowViewDashboardOutputItem[] =
        response.data ?? [];
      this.viewDashboardData = data;
      setState("ui.salesDashboard.data.viewDashboard", data);
      this.viewDashboardState = "success";
      setState("ui.salesDashboard.action.viewDashboard.status", "success");
    } else {
      this.viewDashboardState = "error";
      setState("ui.salesDashboard.action.viewDashboard.status", "error");
      if (response.error) {
        console.error("[salesDashboard] viewDashboard error:", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleViewDashboardClick(_e: Event): void {
    this.loadViewDashboard();
  }

  // --- Action: requestAiSalesSummary (query) ---

  async loadRequestAiSalesSummary(): Promise<void> {
    this.requestAiSalesSummaryState = "loading";
    setState("ui.salesDashboard.action.requestAiSalesSummary.status", "loading");
    this.requestUpdate();

    const params: CafeFlowRequestAiSalesSummaryInput = {
      summaryRequest: this.requestAiSalesSummarySummaryRequest,
    };

    const options: BffClientOptions = { mode: "silent" };

    const response = await execBff<CafeFlowRequestAiSalesSummaryOutput>(
      "cafeFlow.requestAiSalesSummary.requestAiSalesSummary",
      params,
      options
    );

    if (response.ok) {
      const data: CafeFlowRequestAiSalesSummaryOutputItem[] =
        response.data ?? [];
      this.requestAiSalesSummaryData = data;
      setState("ui.salesDashboard.data.requestAiSalesSummary", data);
      this.requestAiSalesSummaryState = "success";
      setState("ui.salesDashboard.action.requestAiSalesSummary.status", "success");
    } else {
      this.requestAiSalesSummaryState = "error";
      setState("ui.salesDashboard.action.requestAiSalesSummary.status", "error");
      if (response.error) {
        console.error("[salesDashboard] requestAiSalesSummary error:", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleRequestAiSalesSummaryClick(_e: Event): void {
    this.loadRequestAiSalesSummary();
  }

  // --- Action: requestAiPromoSuggestions (query) ---

  async loadRequestAiPromoSuggestions(): Promise<void> {
    this.requestAiPromoSuggestionsState = "loading";
    setState("ui.salesDashboard.action.requestAiPromoSuggestions.status", "loading");
    this.requestUpdate();

    const options: BffClientOptions = { mode: "silent" };

    const response = await execBff<CafeFlowRequestAiPromoSuggestionsOutput>(
      "cafeFlow.requestAiPromoSuggestions.requestAiPromoSuggestions",
      {},
      options
    );

    if (response.ok) {
      const data: CafeFlowRequestAiPromoSuggestionsOutputItem[] =
        response.data ?? [];
      this.requestAiPromoSuggestionsData = data;
      setState("ui.salesDashboard.data.requestAiPromoSuggestions", data);
      this.requestAiPromoSuggestionsState = "success";
      setState("ui.salesDashboard.action.requestAiPromoSuggestions.status", "success");
    } else {
      this.requestAiPromoSuggestionsState = "error";
      setState("ui.salesDashboard.action.requestAiPromoSuggestions.status", "error");
      if (response.error) {
        console.error("[salesDashboard] requestAiPromoSuggestions error:", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleRequestAiPromoSuggestionsClick(_e: Event): void {
    this.loadRequestAiPromoSuggestions();
  }

  // --- Action: set.requestAiSalesSummarySummaryRequest (stateSetter) ---

  setRequestAiSalesSummarySummaryRequest(value: string): void {
    this.requestAiSalesSummarySummaryRequest = value;
    setState("ui.salesDashboard.input.requestAiSalesSummary.summaryRequest", value);
    this.requestUpdate();
  }

  handleRequestAiSalesSummarySummaryRequestChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    if (!target) return;
    const value: string = target.value ?? "";
    this.setRequestAiSalesSummarySummaryRequest(value);
  }
}
