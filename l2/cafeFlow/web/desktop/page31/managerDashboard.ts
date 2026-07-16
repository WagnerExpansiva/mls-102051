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
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
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
                  class="px-3 py-1.5 rounded text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.viewDashboardState === 'loading'}
                  @click=${(e: Event) => this.handleViewDashboardClick(e)}
                >
                  ${this.viewDashboardState === 'loading' ? '...' : this.msg['action.viewDashboard.label']}
                </button>
              </div>

              ${this.viewDashboardState === 'success'
                ? html`<div data-feedback class="flex items-center justify-between rounded px-3 py-2 text-sm bg-[var(--success-color,#52C41A)] text-[var(--bg-primary-color,#ffffff)]">
                    <span>${this.msg['action.viewDashboard.success']}</span>
                    <button class="ml-2 text-lg leading-none" @click=${(e: Event) => { const el = (e.currentTarget as HTMLElement).closest('[data-feedback]'); if (el) el.style.display = 'none'; }}>&times;</button>
                  </div>`
                : null}
              ${this.viewDashboardState === 'error'
                ? html`<div data-feedback class="flex items-center justify-between rounded px-3 py-2 text-sm bg-[var(--error-color,#FF4D4F)] text-[var(--bg-primary-color,#ffffff)]">
                    <span>${this.msg['action.viewDashboard.error']}</span>
                    <button class="ml-2 text-lg leading-none" @click=${(e: Event) => { const el = (e.currentTarget as HTMLElement).closest('[data-feedback]'); if (el) el.style.display = 'none'; }}>&times;</button>
                  </div>`
                : null}

              ${this.viewDashboardState === 'loading'
                ? html`<div class="space-y-2">
                    ${[0, 1, 2].map(() => html`<div class="h-20 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>`)}
                  </div>`
                : this.viewDashboardData.length > 0
                  ? html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      ${this.viewDashboardData.map((item: CafeFlowViewDashboardOutputItem) => html`
                        <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-3 space-y-2">
                          <div class="flex items-center gap-2">
                            <span class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)]">${item.status}</span>
                            <span class="text-xs text-[var(--text-primary-color-disabled,#525151)]">${item.orderType}</span>
                          </div>
                          <dl class="space-y-1 text-xs text-[var(--text-primary-color,#403f3f)]">
                            <div><dt class="inline font-medium">${this.msg['field.createdAt.label']}:</dt> <dd class="inline">${item.createdAt}</dd></div>
                            <div><dt class="inline font-medium">${this.msg['field.shiftId.label']}:</dt> <dd class="inline">${item.shiftId}</dd></div>
                            <div><dt class="inline font-medium">${this.msg['field.deliveredAt.label']}:</dt> <dd class="inline">${item.deliveredAt}</dd></div>
                          </dl>
                        </div>
                      `)}
                    </div>`
                  : html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)]">${this.msg['organism.dashboard.empty']}</p>`}
            </div>

            <!-- Organism: Resumo de vendas por IA -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['organism.aiSales.title']}
                </h3>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.requestAiSalesSummaryState === 'loading'}
                  @click=${(e: Event) => this.handleRequestAiSalesSummaryClick(e)}
                >
                  ${this.requestAiSalesSummaryState === 'loading' ? '...' : this.msg['action.requestAiSalesSummary.label']}
                </button>
              </div>

              ${this.requestAiSalesSummaryState === 'success'
                ? html`<div data-feedback class="flex items-center justify-between rounded px-3 py-2 text-sm bg-[var(--success-color,#52C41A)] text-[var(--bg-primary-color,#ffffff)]">
                    <span>${this.msg['action.requestAiSalesSummary.success']}</span>
                    <button class="ml-2 text-lg leading-none" @click=${(e: Event) => { const el = (e.currentTarget as HTMLElement).closest('[data-feedback]'); if (el) el.style.display = 'none'; }}>&times;</button>
                  </div>`
                : null}
              ${this.requestAiSalesSummaryState === 'error'
                ? html`<div data-feedback class="flex items-center justify-between rounded px-3 py-2 text-sm bg-[var(--error-color,#FF4D4F)] text-[var(--bg-primary-color,#ffffff)]">
                    <span>${this.msg['action.requestAiSalesSummary.error']}</span>
                    <button class="ml-2 text-lg leading-none" @click=${(e: Event) => { const el = (e.currentTarget as HTMLElement).closest('[data-feedback]'); if (el) el.style.display = 'none'; }}>&times;</button>
                  </div>`
                : null}

              ${this.requestAiSalesSummaryState === 'loading'
                ? html`<div class="space-y-2">
                    ${[0, 1, 2].map(() => html`<div class="h-20 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>`)}
                  </div>`
                : this.requestAiSalesSummaryData.length > 0
                  ? html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      ${this.requestAiSalesSummaryData.map((item: CafeFlowRequestAiSalesSummaryOutputItem) => html`
                        <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-3 space-y-2">
                          <div class="flex items-center gap-2">
                            <span class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)]">${item.status}</span>
                            <span class="text-xs text-[var(--text-primary-color-disabled,#525151)]">${item.orderType}</span>
                          </div>
                          <dl class="space-y-1 text-xs text-[var(--text-primary-color,#403f3f)]">
                            <div><dt class="inline font-medium">${this.msg['field.orderId.label']}:</dt> <dd class="inline">${item.orderId}</dd></div>
                            <div><dt class="inline font-medium">${this.msg['field.createdAt.label']}:</dt> <dd class="inline">${item.createdAt}</dd></div>
                            <div><dt class="inline font-medium">${this.msg['field.deliveredAt.label']}:</dt> <dd class="inline">${item.deliveredAt}</dd></div>
                          </dl>
                        </div>
                      `)}
                    </div>`
                  : html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)]">${this.msg['organism.aiSales.empty']}</p>`}
            </div>

            <!-- Organism: Sugestões de promoção por IA -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['organism.aiPromo.title']}
                </h3>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.requestAiPromoSuggestionsState === 'loading'}
                  @click=${(e: Event) => this.handleRequestAiPromoSuggestionsClick(e)}
                >
                  ${this.requestAiPromoSuggestionsState === 'loading' ? '...' : this.msg['action.requestAiPromoSuggestions.label']}
                </button>
              </div>

              ${this.requestAiPromoSuggestionsState === 'success'
                ? html`<div data-feedback class="flex items-center justify-between rounded px-3 py-2 text-sm bg-[var(--success-color,#52C41A)] text-[var(--bg-primary-color,#ffffff)]">
                    <span>${this.msg['action.requestAiPromoSuggestions.success']}</span>
                    <button class="ml-2 text-lg leading-none" @click=${(e: Event) => { const el = (e.currentTarget as HTMLElement).closest('[data-feedback]'); if (el) el.style.display = 'none'; }}>&times;</button>
                  </div>`
                : null}
              ${this.requestAiPromoSuggestionsState === 'error'
                ? html`<div data-feedback class="flex items-center justify-between rounded px-3 py-2 text-sm bg-[var(--error-color,#FF4D4F)] text-[var(--bg-primary-color,#ffffff)]">
                    <span>${this.msg['action.requestAiPromoSuggestions.error']}</span>
                    <button class="ml-2 text-lg leading-none" @click=${(e: Event) => { const el = (e.currentTarget as HTMLElement).closest('[data-feedback]'); if (el) el.style.display = 'none'; }}>&times;</button>
                  </div>`
                : null}

              ${this.requestAiPromoSuggestionsState === 'loading'
                ? html`<div class="space-y-2">
                    ${[0, 1, 2].map(() => html`<div class="h-20 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>`)}
                  </div>`
                : this.requestAiPromoSuggestionsData.length > 0
                  ? html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      ${this.requestAiPromoSuggestionsData.map((item: CafeFlowRequestAiPromoSuggestionsOutputItem) => html`
                        <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-3 space-y-2">
                          <div class="flex items-center gap-2">
                            <span class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)]">${item.status}</span>
                            <span class="text-xs text-[var(--text-primary-color-disabled,#525151)]">${item.orderType}</span>
                          </div>
                          <dl class="space-y-1 text-xs text-[var(--text-primary-color,#403f3f)]">
                            <div><dt class="inline font-medium">${this.msg['field.orderId.label']}:</dt> <dd class="inline">${item.orderId}</dd></div>
                            <div><dt class="inline font-medium">${this.msg['field.createdAt.label']}:</dt> <dd class="inline">${item.createdAt}</dd></div>
                          </dl>
                        </div>
                      `)}
                    </div>`
                  : html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)]">${this.msg['organism.aiPromo.empty']}</p>`}
            </div>
          </section>

          <!-- Section: Revisão -->
          <section class="space-y-3">
            <h2 class="text-xl font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.review.title']}
            </h2>
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4">
              <h3 class="text-lg font-medium text-[var(--text-primary-color,#403f3f)] mb-2">
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
