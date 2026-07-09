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
    const dashboardRows: CafeFlowViewDashboardOutputItem[] = this.viewDashboardData;
    const salesRows: CafeFlowRequestAiSalesSummaryOutputItem[] = this.requestAiSalesSummaryData;
    const promoRows: CafeFlowRequestAiPromoSuggestionsOutputItem[] = this.requestAiPromoSuggestionsData;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">

          <!-- Section: Dashboard Overview -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color-lighter,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['managerDashboard.section.overview.title']}
            </h2>

            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['managerDashboard.organism.viewDashboard.title']}
              </h3>

              <div class="flex items-center justify-between">
                <span class="text-sm text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['managerDashboard.intent.dashboardStatus.title']}
                </span>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.viewDashboardState === 'loading'}
                  @click=${() => this.handleViewDashboardClick()}
                >
                  ${this.msg['managerDashboard.action.refreshDashboard']}
                </button>
              </div>

              ${this.viewDashboardState === 'loading'
                ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-2">…</p>`
                : dashboardRows.length === 0
                  ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4">
                      ${this.msg['managerDashboard.intent.dashboardStatus.empty']}
                    </p>`
                  : html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      ${dashboardRows.map(
                        (row: CafeFlowViewDashboardOutputItem) => html`
                          <div
                            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)] p-3 space-y-1"
                          >
                            <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['managerDashboard.field.status']}
                            </div>
                            <div class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                              ${row.status}
                            </div>
                            <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['managerDashboard.field.orderType']}
                            </div>
                            <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                              ${row.orderType}
                            </div>
                            <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['managerDashboard.field.createdAt']}
                            </div>
                            <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                              ${row.createdAt}
                            </div>
                            <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['managerDashboard.field.deliveredAt']}
                            </div>
                            <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                              ${row.deliveredAt}
                            </div>
                            <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['managerDashboard.field.shiftId']}
                            </div>
                            <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                              ${row.shiftId}
                            </div>
                          </div>
                        `,
                      )}
                    </div>`}
            </div>
          </section>

          <!-- Section: AI Assistant -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color-lighter,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['managerDashboard.section.aiAssistant.title']}
            </h2>

            <!-- Organism: AI Sales Summary -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['managerDashboard.organism.aiSalesSummary.title']}
              </h3>

              <!-- Action: request AI sales summary -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['managerDashboard.intent.aiSalesAction.title']}
                </span>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.requestAiSalesSummaryState === 'loading'}
                  @click=${() => this.handleRequestAiSalesSummaryClick()}
                >
                  ${this.msg['managerDashboard.action.requestAiSalesSummary']}
                </button>
              </div>

              <!-- Result cards -->
              <div class="space-y-1">
                <span class="text-sm text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['managerDashboard.intent.aiSalesResult.title']}
                </span>
                ${this.requestAiSalesSummaryState === 'loading'
                  ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-2">…</p>`
                  : salesRows.length === 0
                    ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4">
                        ${this.msg['managerDashboard.intent.aiSalesResult.empty']}
                      </p>`
                    : html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${salesRows.map(
                          (row: CafeFlowRequestAiSalesSummaryOutputItem) => html`
                            <div
                              class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)] p-3 space-y-1"
                            >
                              <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                                ${this.msg['managerDashboard.field.orderId']}
                              </div>
                              <div class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                                ${row.orderId}
                              </div>
                              <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                                ${this.msg['managerDashboard.field.status']}
                              </div>
                              <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                                ${row.status}
                              </div>
                              <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                                ${this.msg['managerDashboard.field.orderType']}
                              </div>
                              <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                                ${row.orderType}
                              </div>
                              <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                                ${this.msg['managerDashboard.field.createdAt']}
                              </div>
                              <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                                ${row.createdAt}
                              </div>
                              <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                                ${this.msg['managerDashboard.field.deliveredAt']}
                              </div>
                              <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                                ${row.deliveredAt}
                              </div>
                            </div>
                          `,
                        )}
                      </div>`}
              </div>
            </div>

            <!-- Organism: AI Promo Suggestions -->
            <div class="space-y-3 border-t border-[var(--grey-color,#e6e6e6)] pt-4">
              <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['managerDashboard.organism.aiPromoSuggestions.title']}
              </h3>

              <!-- Action: request AI promo suggestions -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['managerDashboard.intent.aiPromoAction.title']}
                </span>
                <button
                  class="px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.requestAiPromoSuggestionsState === 'loading'}
                  @click=${() => this.handleRequestAiPromoSuggestionsClick()}
                >
                  ${this.msg['managerDashboard.action.requestAiPromoSuggestions']}
                </button>
              </div>

              <!-- Result cards -->
              <div class="space-y-1">
                <span class="text-sm text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['managerDashboard.intent.aiPromoResult.title']}
                </span>
                ${this.requestAiPromoSuggestionsState === 'loading'
                  ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-2">…</p>`
                  : promoRows.length === 0
                    ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4">
                        ${this.msg['managerDashboard.intent.aiPromoResult.empty']}
                      </p>`
                    : html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${promoRows.map(
                          (row: CafeFlowRequestAiPromoSuggestionsOutputItem) => html`
                            <div
                              class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)] p-3 space-y-1"
                            >
                              <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                                ${this.msg['managerDashboard.field.orderId']}
                              </div>
                              <div class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                                ${row.orderId}
                              </div>
                              <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                                ${this.msg['managerDashboard.field.orderType']}
                              </div>
                              <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                                ${row.orderType}
                              </div>
                              <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                                ${this.msg['managerDashboard.field.status']}
                              </div>
                              <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                                ${row.status}
                              </div>
                              <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                                ${this.msg['managerDashboard.field.createdAt']}
                              </div>
                              <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                                ${row.createdAt}
                              </div>
                            </div>
                          `,
                        )}
                      </div>`}
              </div>
            </div>
          </section>

        </div>
      </div>
    `;
  }
}
