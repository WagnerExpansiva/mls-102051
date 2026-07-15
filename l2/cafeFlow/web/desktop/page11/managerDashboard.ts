/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowManagerDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/managerDashboard.js';
import type {
  CafeFlowViewDashboardOutputItem,
  CafeFlowRequestAiSalesSummaryOutputItem,
  CafeFlowRequestAiPromoSuggestionsOutputItem,
} from '/_102051_/l2/cafeFlow/web/contracts/managerDashboard.js';

@customElement('cafe-flow--web--desktop--page11--manager-dashboard-102051')
export class CafeFlowDesktopPage11ManagerDashboardPage extends CafeFlowManagerDashboardBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Dashboard -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['sec.dashboard.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color,#535353)]">
              ${this.msg['org.dashboard.metrics.title']}
            </p>

            <!-- Toolbar -->
            <div class="flex items-center gap-3">
              <button
                class="px-4 py-2 rounded-md bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] text-sm font-medium disabled:opacity-50"
                ?disabled=${this.viewDashboardState === 'loading'}
                @click=${(e: Event) => this.handleViewDashboardClick(e)}
              >
                ${this.viewDashboardState === 'loading' ? '...' : this.msg['action.viewDashboard.label']}
              </button>
            </div>

            <!-- Feedback -->
            ${this.viewDashboardState === 'success' ? html`
              <div class="text-sm text-[var(--success-color,#52C41A)]">
                ${this.msg['action.viewDashboard.success']}
              </div>
            ` : null}
            ${this.viewDashboardState === 'error' ? html`
              <div class="text-sm text-[var(--error-color,#FF4D4F)]">
                ${this.msg['action.viewDashboard.error']}
              </div>
            ` : null}

            <!-- Table / loading / empty -->
            ${this.viewDashboardState === 'loading' ? html`
              <!-- TODO: no loading msg key in shared i18n -->
              <div class="text-sm text-[var(--text-primary-color,#535353)] py-4">Carregando…</div>
            ` : this.viewDashboardData.length === 0 ? html`
              <div class="text-sm text-[var(--text-primary-color,#535353)] py-4">
                ${this.msg['empty.viewDashboard']}
              </div>
            ` : html`
              <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="border-b border-[var(--grey-color,#e2e8f0)]">
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.status']}</th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.orderType']}</th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.createdAt']}</th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.shiftId']}</th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.deliveredAt']}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.viewDashboardData.map((item: CafeFlowViewDashboardOutputItem) => html`
                      <tr class="border-b border-[var(--grey-color,#e2e8f0)]">
                        <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.status}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.orderType}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.createdAt}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.shiftId}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.deliveredAt}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            `}
          </section>

          <!-- Section: AI Assistant -->
          <section class="space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['sec.ai.assistant.title']}
            </h2>

            <!-- AI Sales Summary Card -->
            <div class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
              <h3 class="text-base font-semibold text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['organism.aiSalesSummary.title']}
              </h3>
              <p class="text-sm text-[var(--text-primary-color,#535353)]">
                ${this.msg['org.ai.sales.summary.title']}
              </p>

              <div class="flex items-center gap-3">
                <button
                  class="px-4 py-2 rounded-md bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] text-sm font-medium disabled:opacity-50"
                  ?disabled=${this.requestAiSalesSummaryState === 'loading'}
                  @click=${(e: Event) => this.handleRequestAiSalesSummaryClick(e)}
                >
                  ${this.requestAiSalesSummaryState === 'loading' ? '...' : this.msg['action.requestAiSalesSummary.label']}
                </button>
              </div>

              ${this.requestAiSalesSummaryState === 'success' ? html`
                <div class="text-sm text-[var(--success-color,#52C41A)]">
                  ${this.msg['action.requestAiSalesSummary.success']}
                </div>
              ` : null}
              ${this.requestAiSalesSummaryState === 'error' ? html`
                <div class="text-sm text-[var(--error-color,#FF4D4F)]">
                  ${this.msg['action.requestAiSalesSummary.error']}
                </div>
              ` : null}

              ${this.requestAiSalesSummaryState === 'loading' ? html`
                <!-- TODO: no loading msg key in shared i18n -->
                <div class="text-sm text-[var(--text-primary-color,#535353)] py-4">Carregando…</div>
              ` : this.requestAiSalesSummaryData.length === 0 ? html`
                <div class="text-sm text-[var(--text-primary-color,#535353)] py-4">
                  ${this.msg['empty.requestAiSalesSummary']}
                </div>
              ` : html`
                <div class="overflow-x-auto">
                  <table class="w-full text-sm border-collapse">
                    <thead>
                      <tr class="border-b border-[var(--grey-color,#e2e8f0)]">
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.orderId']}</th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.status']}</th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.orderType']}</th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.createdAt']}</th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.deliveredAt']}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${this.requestAiSalesSummaryData.map((item: CafeFlowRequestAiSalesSummaryOutputItem) => html`
                        <tr class="border-b border-[var(--grey-color,#e2e8f0)]">
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.orderId}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.status}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.orderType}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.createdAt}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.deliveredAt}</td>
                        </tr>
                      `)}
                    </tbody>
                  </table>
                </div>
              `}
            </div>

            <!-- AI Promo Suggestions Card -->
            <div class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
              <h3 class="text-base font-semibold text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['organism.aiPromoSuggestions.title']}
              </h3>
              <p class="text-sm text-[var(--text-primary-color,#535353)]">
                ${this.msg['org.ai.promo.suggestions.title']}
              </p>

              <div class="flex items-center gap-3">
                <button
                  class="px-4 py-2 rounded-md bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] text-sm font-medium disabled:opacity-50"
                  ?disabled=${this.requestAiPromoSuggestionsState === 'loading'}
                  @click=${(e: Event) => this.handleRequestAiPromoSuggestionsClick(e)}
                >
                  ${this.requestAiPromoSuggestionsState === 'loading' ? '...' : this.msg['action.requestAiPromoSuggestions.label']}
                </button>
              </div>

              ${this.requestAiPromoSuggestionsState === 'success' ? html`
                <div class="text-sm text-[var(--success-color,#52C41A)]">
                  ${this.msg['action.requestAiPromoSuggestions.success']}
                </div>
              ` : null}
              ${this.requestAiPromoSuggestionsState === 'error' ? html`
                <div class="text-sm text-[var(--error-color,#FF4D4F)]">
                  ${this.msg['action.requestAiPromoSuggestions.error']}
                </div>
              ` : null}

              ${this.requestAiPromoSuggestionsState === 'loading' ? html`
                <!-- TODO: no loading msg key in shared i18n -->
                <div class="text-sm text-[var(--text-primary-color,#535353)] py-4">Carregando…</div>
              ` : this.requestAiPromoSuggestionsData.length === 0 ? html`
                <div class="text-sm text-[var(--text-primary-color,#535353)] py-4">
                  ${this.msg['empty.requestAiPromoSuggestions']}
                </div>
              ` : html`
                <div class="overflow-x-auto">
                  <table class="w-full text-sm border-collapse">
                    <thead>
                      <tr class="border-b border-[var(--grey-color,#e2e8f0)]">
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.orderId']}</th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.orderType']}</th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.status']}</th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.createdAt']}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${this.requestAiPromoSuggestionsData.map((item: CafeFlowRequestAiPromoSuggestionsOutputItem) => html`
                        <tr class="border-b border-[var(--grey-color,#e2e8f0)]">
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.orderId}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.orderType}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.status}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.createdAt}</td>
                        </tr>
                      `)}
                    </tbody>
                  </table>
                </div>
              `}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
