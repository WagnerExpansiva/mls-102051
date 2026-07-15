/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowManagerDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/managerDashboard.js';
import type {
  CafeFlowViewDashboardOutputItem,
  CafeFlowRequestAiSalesSummaryOutputItem,
  CafeFlowRequestAiPromoSuggestionsOutputItem,
} from '/_102051_/l2/cafeFlow/web/contracts/managerDashboard.js';

@customElement('cafe-flow--web--desktop--page21--manager-dashboard-102051')
export class CafeFlowDesktopPage21ManagerDashboardPage extends CafeFlowManagerDashboardBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Dashboard List -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['sec.dashboard.list.title']}
              </h2>
              <button
                class="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50 disabled:cursor-not-allowed"
                ?disabled=${this.viewDashboardState === 'loading'}
                @click=${(e: Event) => this.handleViewDashboardClick(e)}
              >
                ${this.viewDashboardState === 'loading' ? this.msg['action.viewDashboard.label'] + '…' : this.msg['action.viewDashboard.label']}
              </button>
            </div>

            <h3 class="text-base font-medium text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['organism.dashboardOrdersList.title']}
            </h3>

            ${this.viewDashboardState === 'loading'
              ? html`
                  <div class="space-y-2">
                    ${[0, 1, 2].map((_i: number) => html`
                      <div class="h-10 rounded bg-[var(--grey-color-light,#f2f2f2)] animate-pulse"></div>
                    `)}
                  </div>
                `
              : this.viewDashboardData.length === 0
              ? html`
                  <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
                    ${this.msg['organism.dashboardOrdersList.empty']}
                  </p>
                `
              : html`
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead>
                        <tr
                          class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color-lighter,#535353)]"
                        >
                          <th class="py-2 px-3 font-medium">${this.msg['column.status']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['column.orderType']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['column.createdAt']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['column.shiftId']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['column.deliveredAt']}</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.viewDashboardData.map(
                          (row: CafeFlowViewDashboardOutputItem) => html`
                            <tr
                              class="border-b border-[var(--grey-color-light,#f2f2f2)] text-[var(--text-primary-color,#0f172a)]"
                            >
                              <td class="py-2 px-3">${row.status}</td>
                              <td class="py-2 px-3">${row.orderType}</td>
                              <td class="py-2 px-3">${row.createdAt}</td>
                              <td class="py-2 px-3">${row.shiftId}</td>
                              <td class="py-2 px-3">${row.deliveredAt}</td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                `}

            ${this.viewDashboardState === 'success'
              ? html`
                  <div
                    class="rounded-md border border-[var(--success-color,#52c41a)] px-3 py-2 text-sm text-[var(--success-color,#52c41a)]"
                  >
                    ${this.msg['action.viewDashboard.success']}
                  </div>
                `
              : ''}
            ${this.viewDashboardState === 'error'
              ? html`
                  <div
                    class="rounded-md border border-[var(--error-color,#ff4d4f)] px-3 py-2 text-sm text-[var(--error-color,#ff4d4f)]"
                  >
                    ${this.msg['action.viewDashboard.error']}
                  </div>
                `
              : ''}
          </section>

          <!-- Section: AI Assistant -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['sec.ai.assistant.title']}
            </h2>

            <!-- AI Sales Summary -->
            <div class="space-y-3">
              <div class="flex items-center justify-between flex-wrap gap-2">
                <h3 class="text-base font-medium text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['organism.aiSalesSummary.title']}
                </h3>
                <button
                  class="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50 disabled:cursor-not-allowed"
                  ?disabled=${this.requestAiSalesSummaryState === 'loading'}
                  @click=${(e: Event) => this.handleRequestAiSalesSummaryClick(e)}
                >
                  ${this.requestAiSalesSummaryState === 'loading'
                    ? this.msg['action.requestAiSalesSummary.label'] + '…'
                    : this.msg['action.requestAiSalesSummary.label']}
                </button>
              </div>

              ${this.requestAiSalesSummaryState === 'loading'
                ? html`
                    <div class="space-y-2">
                      ${[0, 1, 2].map((_i: number) => html`
                        <div class="h-10 rounded bg-[var(--grey-color-light,#f2f2f2)] animate-pulse"></div>
                      `)}
                    </div>
                  `
                : this.requestAiSalesSummaryData.length === 0
                ? html`
                    <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
                      ${this.msg['organism.aiSalesSummary.empty']}
                    </p>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color-lighter,#535353)]"
                          >
                            <th class="py-2 px-3 font-medium">${this.msg['column.orderId']}</th>
                            <th class="py-2 px-3 font-medium">${this.msg['column.status']}</th>
                            <th class="py-2 px-3 font-medium">${this.msg['column.orderType']}</th>
                            <th class="py-2 px-3 font-medium">${this.msg['column.createdAt']}</th>
                            <th class="py-2 px-3 font-medium">${this.msg['column.deliveredAt']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${this.requestAiSalesSummaryData.map(
                            (row: CafeFlowRequestAiSalesSummaryOutputItem) => html`
                              <tr
                                class="border-b border-[var(--grey-color-light,#f2f2f2)] text-[var(--text-primary-color,#0f172a)]"
                              >
                                <td class="py-2 px-3">${row.orderId}</td>
                                <td class="py-2 px-3">${row.status}</td>
                                <td class="py-2 px-3">${row.orderType}</td>
                                <td class="py-2 px-3">${row.createdAt}</td>
                                <td class="py-2 px-3">${row.deliveredAt}</td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}

              ${this.requestAiSalesSummaryState === 'success'
                ? html`
                    <div
                      class="rounded-md border border-[var(--success-color,#52c41a)] px-3 py-2 text-sm text-[var(--success-color,#52c41a)]"
                    >
                      ${this.msg['action.requestAiSalesSummary.success']}
                    </div>
                  `
                : ''}
              ${this.requestAiSalesSummaryState === 'error'
                ? html`
                    <div
                      class="rounded-md border border-[var(--error-color,#ff4d4f)] px-3 py-2 text-sm text-[var(--error-color,#ff4d4f)]"
                    >
                      ${this.msg['action.requestAiSalesSummary.error']}
                    </div>
                  `
                : ''}
            </div>

            <!-- AI Promo Suggestions -->
            <div class="space-y-3">
              <div class="flex items-center justify-between flex-wrap gap-2">
                <h3 class="text-base font-medium text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['organism.aiPromoSuggestions.title']}
                </h3>
                <button
                  class="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50 disabled:cursor-not-allowed"
                  ?disabled=${this.requestAiPromoSuggestionsState === 'loading'}
                  @click=${(e: Event) => this.handleRequestAiPromoSuggestionsClick(e)}
                >
                  ${this.requestAiPromoSuggestionsState === 'loading'
                    ? this.msg['action.requestAiPromoSuggestions.label'] + '…'
                    : this.msg['action.requestAiPromoSuggestions.label']}
                </button>
              </div>

              ${this.requestAiPromoSuggestionsState === 'loading'
                ? html`
                    <div class="space-y-2">
                      ${[0, 1, 2].map((_i: number) => html`
                        <div class="h-10 rounded bg-[var(--grey-color-light,#f2f2f2)] animate-pulse"></div>
                      `)}
                    </div>
                  `
                : this.requestAiPromoSuggestionsData.length === 0
                ? html`
                    <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
                      ${this.msg['organism.aiPromoSuggestions.empty']}
                    </p>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color-lighter,#535353)]"
                          >
                            <th class="py-2 px-3 font-medium">${this.msg['column.orderId']}</th>
                            <th class="py-2 px-3 font-medium">${this.msg['column.orderType']}</th>
                            <th class="py-2 px-3 font-medium">${this.msg['column.status']}</th>
                            <th class="py-2 px-3 font-medium">${this.msg['column.createdAt']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${this.requestAiPromoSuggestionsData.map(
                            (row: CafeFlowRequestAiPromoSuggestionsOutputItem) => html`
                              <tr
                                class="border-b border-[var(--grey-color-light,#f2f2f2)] text-[var(--text-primary-color,#0f172a)]"
                              >
                                <td class="py-2 px-3">${row.orderId}</td>
                                <td class="py-2 px-3">${row.orderType}</td>
                                <td class="py-2 px-3">${row.status}</td>
                                <td class="py-2 px-3">${row.createdAt}</td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}

              ${this.requestAiPromoSuggestionsState === 'success'
                ? html`
                    <div
                      class="rounded-md border border-[var(--success-color,#52c41a)] px-3 py-2 text-sm text-[var(--success-color,#52c41a)]"
                    >
                      ${this.msg['action.requestAiPromoSuggestions.success']}
                    </div>
                  `
                : ''}
              ${this.requestAiPromoSuggestionsState === 'error'
                ? html`
                    <div
                      class="rounded-md border border-[var(--error-color,#ff4d4f)] px-3 py-2 text-sm text-[var(--error-color,#ff4d4f)]"
                    >
                      ${this.msg['action.requestAiPromoSuggestions.error']}
                    </div>
                  `
                : ''}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
