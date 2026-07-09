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
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">

          <!-- Section: Dashboard Overview -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['managerDashboard.section.overview.title']}
            </h2>

            <!-- Organism: ViewDashboard -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['managerDashboard.organism.viewDashboard.title']}
              </h3>

              <!-- Intention: workflowStatus -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs font-medium text-[var(--text-primary-color-darker,#64748b)]">
                    ${this.msg['managerDashboard.intent.dashboardStatus.title']}
                  </h4>
                  <button
                    class="px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                    ?disabled=${this.viewDashboardState === 'loading'}
                    @click=${() => this.handleViewDashboardClick()}
                  >
                    ${this.msg['managerDashboard.action.refreshDashboard']}
                  </button>
                </div>

                ${this.viewDashboardData.length === 0
                  ? html`<p class="text-sm text-[var(--text-primary-color-darker,#64748b)]">
                      ${this.msg['managerDashboard.intent.dashboardStatus.empty']}
                    </p>`
                  : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color-darker,#64748b)]"
                          >
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.status']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.orderType']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.createdAt']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.deliveredAt']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.shiftId']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${this.viewDashboardData.map(
                            (item: CafeFlowViewDashboardOutputItem) => html`
                              <tr
                                class="border-b border-[var(--grey-color,#e2e8f0)] text-[var(--text-primary-color,#0f172a)]"
                              >
                                <td class="py-2 pr-4">${item.status}</td>
                                <td class="py-2 pr-4">${item.orderType}</td>
                                <td class="py-2 pr-4">${item.createdAt}</td>
                                <td class="py-2 pr-4">${item.deliveredAt}</td>
                                <td class="py-2 pr-4">${item.shiftId}</td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}
              </div>
            </div>
          </section>

          <!-- Section: AI Assistant -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['managerDashboard.section.aiAssistant.title']}
            </h2>

            <!-- Organism: AI Sales Summary -->
            <div class="space-y-3 border border-[var(--grey-color,#e2e8f0)] rounded-lg p-4">
              <h3 class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['managerDashboard.organism.aiSalesSummary.title']}
              </h3>

              <!-- Intention: actionList -->
              <div class="space-y-2">
                <h4 class="text-xs font-medium text-[var(--text-primary-color-darker,#64748b)]">
                  ${this.msg['managerDashboard.intent.aiSalesAction.title']}
                </h4>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.requestAiSalesSummaryState === 'loading'}
                  @click=${() => this.handleRequestAiSalesSummaryClick()}
                >
                  ${this.msg['managerDashboard.action.requestAiSalesSummary']}
                </button>
              </div>

              <!-- Intention: queryList -->
              <div class="space-y-2">
                <h4 class="text-xs font-medium text-[var(--text-primary-color-darker,#64748b)]">
                  ${this.msg['managerDashboard.intent.aiSalesResult.title']}
                </h4>
                ${this.requestAiSalesSummaryData.length === 0
                  ? html`<p class="text-sm text-[var(--text-primary-color-darker,#64748b)]">
                      ${this.msg['managerDashboard.intent.aiSalesResult.empty']}
                    </p>`
                  : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color-darker,#64748b)]"
                          >
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.orderId']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.status']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.orderType']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.createdAt']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.deliveredAt']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${this.requestAiSalesSummaryData.map(
                            (item: CafeFlowRequestAiSalesSummaryOutputItem) => html`
                              <tr
                                class="border-b border-[var(--grey-color,#e2e8f0)] text-[var(--text-primary-color,#0f172a)]"
                              >
                                <td class="py-2 pr-4">${item.orderId}</td>
                                <td class="py-2 pr-4">${item.status}</td>
                                <td class="py-2 pr-4">${item.orderType}</td>
                                <td class="py-2 pr-4">${item.createdAt}</td>
                                <td class="py-2 pr-4">${item.deliveredAt}</td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}
              </div>
            </div>

            <!-- Organism: AI Promo Suggestions -->
            <div class="space-y-3 border border-[var(--grey-color,#e2e8f0)] rounded-lg p-4">
              <h3 class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['managerDashboard.organism.aiPromoSuggestions.title']}
              </h3>

              <!-- Intention: actionList -->
              <div class="space-y-2">
                <h4 class="text-xs font-medium text-[var(--text-primary-color-darker,#64748b)]">
                  ${this.msg['managerDashboard.intent.aiPromoAction.title']}
                </h4>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.requestAiPromoSuggestionsState === 'loading'}
                  @click=${() => this.handleRequestAiPromoSuggestionsClick()}
                >
                  ${this.msg['managerDashboard.action.requestAiPromoSuggestions']}
                </button>
              </div>

              <!-- Intention: queryList -->
              <div class="space-y-2">
                <h4 class="text-xs font-medium text-[var(--text-primary-color-darker,#64748b)]">
                  ${this.msg['managerDashboard.intent.aiPromoResult.title']}
                </h4>
                ${this.requestAiPromoSuggestionsData.length === 0
                  ? html`<p class="text-sm text-[var(--text-primary-color-darker,#64748b)]">
                      ${this.msg['managerDashboard.intent.aiPromoResult.empty']}
                    </p>`
                  : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color-darker,#64748b)]"
                          >
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.orderId']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.orderType']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.status']}
                            </th>
                            <th class="py-2 pr-4 font-medium">
                              ${this.msg['managerDashboard.field.createdAt']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${this.requestAiPromoSuggestionsData.map(
                            (item: CafeFlowRequestAiPromoSuggestionsOutputItem) => html`
                              <tr
                                class="border-b border-[var(--grey-color,#e2e8f0)] text-[var(--text-primary-color,#0f172a)]"
                              >
                                <td class="py-2 pr-4">${item.orderId}</td>
                                <td class="py-2 pr-4">${item.orderType}</td>
                                <td class="py-2 pr-4">${item.status}</td>
                                <td class="py-2 pr-4">${item.createdAt}</td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}
              </div>
            </div>
          </section>

        </div>
      </div>
    `;
  }
}
