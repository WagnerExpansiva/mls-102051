/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowManagerDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/managerDashboard.js';
import type {
  CafeFlowViewDashboardOutputItem,
  CafeFlowRequestAiSalesSummaryOutputItem,
  CafeFlowRequestAiPromoSuggestionsOutputItem,
} from '/_102051_/l2/cafeFlow/web/contracts/managerDashboard.js';

@customElement('cafe-flow--web--desktop--page31--manager-dashboard-102051')
export class CafeFlowDesktopPage31ManagerDashboardPage extends CafeFlowManagerDashboardBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Dashboard do dia -->
          <section class="space-y-4">
            <h2 class="text-xl font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.discover.title']}
            </h2>

            <!-- Organism: Pedidos do dia -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['organism.dashboard.title']}
                </h3>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium border border-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color,#E6E6E6)] disabled:opacity-50"
                  @click=${(e: Event) => this.handleViewDashboardClick(e)}
                  ?disabled=${this.viewDashboardState === 'loading'}
                >
                  ${this.viewDashboardState === 'loading'
                    ? html`<span class="inline-block w-4 h-4 border-2 border-[var(--grey-color-dark,#D3D3D3)] border-t-transparent rounded-full animate-spin"></span>`
                    : this.msg['action.viewDashboard.label']}
                </button>
              </div>

              ${this.viewDashboardState === 'loading'
                ? html`<div class="space-y-2">
                    ${[0, 1, 2].map(() => html`
                      <div class="h-16 rounded-lg bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>
                    `)}
                  </div>`
                : this.viewDashboardData.length === 0
                ? html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)]">${this.msg['organism.dashboard.empty']}</p>`
                : html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${this.viewDashboardData.map((item: CafeFlowViewDashboardOutputItem) => html`
                      <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] p-3 space-y-2">
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-[var(--bg-primary-color,#ffffff)] ${item.status === 'delivered'
                            ? 'bg-[var(--success-color,#52C41A)]'
                            : item.status === 'ready'
                            ? 'bg-[var(--active-color,#1890FF)]'
                            : 'bg-[var(--warning-color,#FAAD14)]'}"
                        >${item.status}</span>
                        <div class="text-sm text-[var(--text-primary-color,#403f3f)] space-y-1">
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.orderType.label']}:</span> ${item.orderType}</div>
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.createdAt.label']}:</span> ${item.createdAt}</div>
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.shiftId.label']}:</span> ${item.shiftId}</div>
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.deliveredAt.label']}:</span> ${item.deliveredAt}</div>
                        </div>
                      </div>
                    `)}
                  </div>`}

              ${this.viewDashboardState === 'success'
                ? html`<div class="flex items-center justify-between rounded-md bg-[var(--success-color,#52C41A)] bg-opacity-10 px-3 py-2">
                    <span class="text-sm text-[var(--success-color,#52C41A)]">${this.msg['action.viewDashboard.success']}</span>
                  </div>`
                : this.viewDashboardState === 'error'
                ? html`<div class="flex items-center justify-between rounded-md bg-[var(--error-color,#FF4D4F)] bg-opacity-10 px-3 py-2">
                    <span class="text-sm text-[var(--error-color,#FF4D4F)]">${this.msg['action.viewDashboard.error']}</span>
                  </div>`
                : null}
            </div>

            <!-- Organism: Resumo de vendas por IA -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['organism.aiSales.title']}
                </h3>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  @click=${(e: Event) => this.handleRequestAiSalesSummaryClick(e)}
                  ?disabled=${this.requestAiSalesSummaryState === 'loading'}
                >
                  ${this.requestAiSalesSummaryState === 'loading'
                    ? html`<span class="inline-block w-4 h-4 border-2 border-[var(--bg-primary-color,#ffffff)] border-t-transparent rounded-full animate-spin"></span>`
                    : this.msg['action.requestAiSalesSummary.label']}
                </button>
              </div>

              ${this.requestAiSalesSummaryState === 'loading'
                ? html`<div class="space-y-2">
                    ${[0, 1, 2].map(() => html`
                      <div class="h-16 rounded-lg bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>
                    `)}
                  </div>`
                : this.requestAiSalesSummaryData.length === 0
                ? html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)]">${this.msg['organism.aiSales.empty']}</p>`
                : html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${this.requestAiSalesSummaryData.map((item: CafeFlowRequestAiSalesSummaryOutputItem) => html`
                      <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] p-3 space-y-2">
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-[var(--bg-primary-color,#ffffff)] ${item.status === 'delivered'
                            ? 'bg-[var(--success-color,#52C41A)]'
                            : item.status === 'ready'
                            ? 'bg-[var(--active-color,#1890FF)]'
                            : 'bg-[var(--warning-color,#FAAD14)]'}"
                        >${item.status}</span>
                        <div class="text-sm text-[var(--text-primary-color,#403f3f)] space-y-1">
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.orderId.label']}:</span> ${item.orderId}</div>
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.orderType.label']}:</span> ${item.orderType}</div>
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.createdAt.label']}:</span> ${item.createdAt}</div>
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.deliveredAt.label']}:</span> ${item.deliveredAt}</div>
                        </div>
                      </div>
                    `)}
                  </div>`}

              ${this.requestAiSalesSummaryState === 'success'
                ? html`<div class="flex items-center justify-between rounded-md bg-[var(--success-color,#52C41A)] bg-opacity-10 px-3 py-2">
                    <span class="text-sm text-[var(--success-color,#52C41A)]">${this.msg['action.requestAiSalesSummary.success']}</span>
                  </div>`
                : this.requestAiSalesSummaryState === 'error'
                ? html`<div class="flex items-center justify-between rounded-md bg-[var(--error-color,#FF4D4F)] bg-opacity-10 px-3 py-2">
                    <span class="text-sm text-[var(--error-color,#FF4D4F)]">${this.msg['action.requestAiSalesSummary.error']}</span>
                  </div>`
                : null}
            </div>

            <!-- Organism: Sugestões de promoção por IA -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['organism.aiPromo.title']}
                </h3>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  @click=${(e: Event) => this.handleRequestAiPromoSuggestionsClick(e)}
                  ?disabled=${this.requestAiPromoSuggestionsState === 'loading'}
                >
                  ${this.requestAiPromoSuggestionsState === 'loading'
                    ? html`<span class="inline-block w-4 h-4 border-2 border-[var(--bg-primary-color,#ffffff)] border-t-transparent rounded-full animate-spin"></span>`
                    : this.msg['action.requestAiPromoSuggestions.label']}
                </button>
              </div>

              ${this.requestAiPromoSuggestionsState === 'loading'
                ? html`<div class="space-y-2">
                    ${[0, 1, 2].map(() => html`
                      <div class="h-16 rounded-lg bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>
                    `)}
                  </div>`
                : this.requestAiPromoSuggestionsData.length === 0
                ? html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)]">${this.msg['organism.aiPromo.empty']}</p>`
                : html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${this.requestAiPromoSuggestionsData.map((item: CafeFlowRequestAiPromoSuggestionsOutputItem) => html`
                      <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] p-3 space-y-2">
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-[var(--bg-primary-color,#ffffff)] ${item.status === 'delivered'
                            ? 'bg-[var(--success-color,#52C41A)]'
                            : item.status === 'ready'
                            ? 'bg-[var(--active-color,#1890FF)]'
                            : 'bg-[var(--warning-color,#FAAD14)]'}"
                        >${item.status}</span>
                        <div class="text-sm text-[var(--text-primary-color,#403f3f)] space-y-1">
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.orderId.label']}:</span> ${item.orderId}</div>
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.orderType.label']}:</span> ${item.orderType}</div>
                          <div><span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.createdAt.label']}:</span> ${item.createdAt}</div>
                        </div>
                      </div>
                    `)}
                  </div>`}

              ${this.requestAiPromoSuggestionsState === 'success'
                ? html`<div class="flex items-center justify-between rounded-md bg-[var(--success-color,#52C41A)] bg-opacity-10 px-3 py-2">
                    <span class="text-sm text-[var(--success-color,#52C41A)]">${this.msg['action.requestAiPromoSuggestions.success']}</span>
                  </div>`
                : this.requestAiPromoSuggestionsState === 'error'
                ? html`<div class="flex items-center justify-between rounded-md bg-[var(--error-color,#FF4D4F)] bg-opacity-10 px-3 py-2">
                    <span class="text-sm text-[var(--error-color,#FF4D4F)]">${this.msg['action.requestAiPromoSuggestions.error']}</span>
                  </div>`
                : null}
            </div>
          </section>

          <!-- Section: Revisão -->
          <section class="space-y-4">
            <h2 class="text-xl font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.review.title']}
            </h2>
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-2">
              <h3 class="text-lg font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['organism.review.title']}
              </h3>
              <p class="text-sm text-[var(--text-primary-color-disabled,#525151)]">
                ${this.msg['organism.review.empty']}
              </p>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
