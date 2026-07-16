/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowManagerDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/managerDashboard.js';

@customElement('cafe-flow--web--desktop--page11--manager-dashboard-102051')
export class CafeFlowDesktopPage11ManagerDashboardPage extends CafeFlowManagerDashboardBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--grey-color-lighter,#F9FAFB)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Dashboard Overview -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-xl font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['section.dashboard.title']}
            </h2>

            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-medium text-[var(--text-primary-color,#403f3f)]"
              >
                ${this.msg['organism.dashboardMetrics.title']}
              </h3>
              <button
                class="px-4 py-2 rounded-lg bg-[var(--active-color,#1890FF)] text-white text-sm font-medium disabled:opacity-50"
                ?disabled=${this.viewDashboardState === 'loading'}
                @click=${this.handleViewDashboardClick}
              >
                ${this.viewDashboardState === 'loading'
                  ? '...'
                  : this.msg['action.viewDashboard.label']}
              </button>
            </div>

            ${this.viewDashboardState === 'loading'
              ? html`
                  <div class="space-y-2">
                    <div
                      class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded animate-pulse"
                    ></div>
                    <div
                      class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded animate-pulse"
                    ></div>
                    <div
                      class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded animate-pulse"
                    ></div>
                  </div>
                `
              : this.viewDashboardData.length === 0
                ? html`
                    <p
                      class="text-sm text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      ${this.msg['organism.dashboardOrdersList.empty']}
                    </p>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#E6E6E6)]"
                          >
                            <th
                              class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['column.status']}
                            </th>
                            <th
                              class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['column.orderType']}
                            </th>
                            <th
                              class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['column.createdAt']}
                            </th>
                            <th
                              class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['column.shiftId']}
                            </th>
                            <th
                              class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['column.deliveredAt']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${this.viewDashboardData.map(
                            (item) => html`
                              <tr
                                class="border-b border-[var(--grey-color,#E6E6E6)]"
                              >
                                <td
                                  class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.status}
                                </td>
                                <td
                                  class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.orderType}
                                </td>
                                <td
                                  class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.createdAt}
                                </td>
                                <td
                                  class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.shiftId}
                                </td>
                                <td
                                  class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.deliveredAt}
                                </td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}

            ${this.viewDashboardState === 'success'
              ? html`
                  <details
                    open
                    class="rounded-lg border border-[var(--success-color,#52C41A)] p-3"
                  >
                    <summary
                      class="text-sm text-[var(--success-color,#52C41A)] cursor-pointer"
                    >
                      ${this.msg['action.viewDashboard.success']}
                    </summary>
                  </details>
                `
              : null}
            ${this.viewDashboardState === 'error'
              ? html`
                  <details
                    open
                    class="rounded-lg border border-[var(--error-color,#FF4D4F)] p-3"
                  >
                    <summary
                      class="text-sm text-[var(--error-color,#FF4D4F)] cursor-pointer"
                    >
                      ${this.msg['action.viewDashboard.error']}
                    </summary>
                  </details>
                `
              : null}
          </section>

          <!-- Section: AI Assistant (Sales Summary + Promo Suggestions) -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-6"
          >
            <h2
              class="text-xl font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['section.aiAssistant.title']}
            </h2>

            <!-- AI Sales Summary -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['organism.aiSalesSummary.title']}
                </h3>
                <button
                  class="px-4 py-2 rounded-lg bg-[var(--active-color,#1890FF)] text-white text-sm font-medium disabled:opacity-50"
                  ?disabled=${this.requestAiSalesSummaryState === 'loading'}
                  @click=${this.handleRequestAiSalesSummaryClick}
                >
                  ${this.requestAiSalesSummaryState === 'loading'
                    ? '...'
                    : this.msg['action.requestAiSalesSummary.label']}
                </button>
              </div>

              ${this.requestAiSalesSummaryState === 'loading'
                ? html`
                    <div class="space-y-2">
                      <div
                        class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded animate-pulse"
                      ></div>
                      <div
                        class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded animate-pulse"
                      ></div>
                    </div>
                  `
                : this.requestAiSalesSummaryData.length === 0
                  ? html`
                      <p
                        class="text-sm text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['organism.aiSalesSummary.empty']}
                      </p>
                    `
                  : html`
                      <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                          <thead>
                            <tr
                              class="border-b border-[var(--grey-color,#E6E6E6)]"
                            >
                              <th
                                class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${this.msg['column.orderId']}
                              </th>
                              <th
                                class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${this.msg['column.status']}
                              </th>
                              <th
                                class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${this.msg['column.orderType']}
                              </th>
                              <th
                                class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${this.msg['column.createdAt']}
                              </th>
                              <th
                                class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${this.msg['column.deliveredAt']}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            ${this.requestAiSalesSummaryData.map(
                              (item) => html`
                                <tr
                                  class="border-b border-[var(--grey-color,#E6E6E6)]"
                                >
                                  <td
                                    class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                  >
                                    ${item.orderId}
                                  </td>
                                  <td
                                    class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                  >
                                    ${item.status}
                                  </td>
                                  <td
                                    class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                  >
                                    ${item.orderType}
                                  </td>
                                  <td
                                    class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                  >
                                    ${item.createdAt}
                                  </td>
                                  <td
                                    class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                  >
                                    ${item.deliveredAt}
                                  </td>
                                </tr>
                              `,
                            )}
                          </tbody>
                        </table>
                      </div>
                    `}

              ${this.requestAiSalesSummaryState === 'success'
                ? html`
                    <details
                      open
                      class="rounded-lg border border-[var(--success-color,#52C41A)] p-3"
                    >
                      <summary
                        class="text-sm text-[var(--success-color,#52C41A)] cursor-pointer"
                      >
                        ${this.msg['action.requestAiSalesSummary.success']}
                      </summary>
                    </details>
                  `
                : null}
              ${this.requestAiSalesSummaryState === 'error'
                ? html`
                    <details
                      open
                      class="rounded-lg border border-[var(--error-color,#FF4D4F)] p-3"
                    >
                      <summary
                        class="text-sm text-[var(--error-color,#FF4D4F)] cursor-pointer"
                      >
                        ${this.msg['action.requestAiSalesSummary.error']}
                      </summary>
                    </details>
                  `
                : null}
            </div>

            <!-- AI Promo Suggestions -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['organism.aiPromoSuggestions.title']}
                </h3>
                <button
                  class="px-4 py-2 rounded-lg bg-[var(--active-color,#1890FF)] text-white text-sm font-medium disabled:opacity-50"
                  ?disabled=${this.requestAiPromoSuggestionsState === 'loading'}
                  @click=${this.handleRequestAiPromoSuggestionsClick}
                >
                  ${this.requestAiPromoSuggestionsState === 'loading'
                    ? '...'
                    : this.msg['action.requestAiPromoSuggestions.label']}
                </button>
              </div>

              ${this.requestAiPromoSuggestionsState === 'loading'
                ? html`
                    <div class="space-y-2">
                      <div
                        class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded animate-pulse"
                      ></div>
                      <div
                        class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded animate-pulse"
                      ></div>
                    </div>
                  `
                : this.requestAiPromoSuggestionsData.length === 0
                  ? html`
                      <p
                        class="text-sm text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['organism.aiPromoSuggestions.empty']}
                      </p>
                    `
                  : html`
                      <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                          <thead>
                            <tr
                              class="border-b border-[var(--grey-color,#E6E6E6)]"
                            >
                              <th
                                class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${this.msg['column.orderId']}
                              </th>
                              <th
                                class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${this.msg['column.orderType']}
                              </th>
                              <th
                                class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${this.msg['column.status']}
                              </th>
                              <th
                                class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${this.msg['column.createdAt']}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            ${this.requestAiPromoSuggestionsData.map(
                              (item) => html`
                                <tr
                                  class="border-b border-[var(--grey-color,#E6E6E6)]"
                                >
                                  <td
                                    class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                  >
                                    ${item.orderId}
                                  </td>
                                  <td
                                    class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                  >
                                    ${item.orderType}
                                  </td>
                                  <td
                                    class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                  >
                                    ${item.status}
                                  </td>
                                  <td
                                    class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]"
                                  >
                                    ${item.createdAt}
                                  </td>
                                </tr>
                              `,
                            )}
                          </tbody>
                        </table>
                      </div>
                    `}

              ${this.requestAiPromoSuggestionsState === 'success'
                ? html`
                    <details
                      open
                      class="rounded-lg border border-[var(--success-color,#52C41A)] p-3"
                    >
                      <summary
                        class="text-sm text-[var(--success-color,#52C41A)] cursor-pointer"
                      >
                        ${this.msg['action.requestAiPromoSuggestions.success']}
                      </summary>
                    </details>
                  `
                : null}
              ${this.requestAiPromoSuggestionsState === 'error'
                ? html`
                    <details
                      open
                      class="rounded-lg border border-[var(--error-color,#FF4D4F)] p-3"
                    >
                      <summary
                        class="text-sm text-[var(--error-color,#FF4D4F)] cursor-pointer"
                      >
                        ${this.msg['action.requestAiPromoSuggestions.error']}
                      </summary>
                    </details>
                  `
                : null}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
