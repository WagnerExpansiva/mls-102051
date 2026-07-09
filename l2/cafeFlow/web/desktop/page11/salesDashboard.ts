/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/salesDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowSalesDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/salesDashboard.js';
import type {
  CafeFlowViewDashboardOutputItem,
  CafeFlowRequestAiSalesSummaryOutputItem,
  CafeFlowRequestAiPromoSuggestionsOutputItem,
} from '/_102051_/l2/cafeFlow/web/contracts/salesDashboard.js';

@customElement('cafe-flow--web--desktop--page11--sales-dashboard-102051')
export class CafeFlowDesktopPage11SalesDashboardPage extends CafeFlowSalesDashboardBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--ds-color-surface,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-xl font-semibold text-[var(--ds-color-text,#0f172a)]">
            ${this.msg['salesDashboard.section.dashboardAi.title']}
          </h1>

          <!-- Organism: ViewDashboard -->
          <section
            class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-surface,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-medium text-[var(--ds-color-text,#0f172a)]">
              ${this.msg['salesDashboard.organism.viewDashboard.title']}
            </h2>

            <!-- Intent: dashboard context (summary) -->
            <div
              class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] p-3 space-y-2"
            >
              <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
                ${this.msg['salesDashboard.intent.dashboard.context.title']}
              </h3>
              <div class="flex items-center gap-3">
                <span
                  class="inline-flex items-center rounded px-2 py-1 text-xs bg-[var(--ds-color-accent,#6366f1)] text-white"
                >
                  ${this.activeCompanyId || '—'}
                </span>
                <span class="text-sm text-[var(--ds-color-text,#0f172a)]">
                  ${this.msg['salesDashboard.field.shiftId.label']}:
                  ${this.viewDashboardData.length > 0 && this.viewDashboardData[0].shiftId
                    ? this.viewDashboardData[0].shiftId
                    : '—'}
                </span>
              </div>
            </div>

            <!-- Intent: dashboard data (queryList) -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
                  ${this.msg['salesDashboard.intent.dashboard.data.title']}
                </h3>
                <button
                  class="rounded px-3 py-1 text-sm bg-[var(--ds-color-primary,#4f46e5)] text-white hover:opacity-90"
                  @click=${(e: Event) => this.handleViewDashboardClick(e)}
                >
                  ${this.msg['salesDashboard.action.viewDashboard.label']}
                </button>
              </div>
              <div class="overflow-x-auto">
                <table
                  class="w-full text-sm border border-[var(--ds-color-border,#e2e8f0)]"
                >
                  <thead class="bg-[var(--ds-color-surface-alt,#f8fafc)]">
                    <tr>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.orderId.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.status.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.orderType.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.createdAt.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.menuItemId.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.quantity.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.stockItemId.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.currentQuantity.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.minimumQuantity.label']}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.viewDashboardData.length === 0
                      ? html`<tr>
                          <td
                            colspan="9"
                            class="px-2 py-3 text-center text-[var(--ds-color-text-muted,#64748b)]"
                          >
                            —
                          </td>
                        </tr>`
                      : this.viewDashboardData.map(
                          (row: CafeFlowViewDashboardOutputItem) => html`
                            <tr
                              class="border-t border-[var(--ds-color-border,#e2e8f0)]"
                            >
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.orderId}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.status}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.orderType}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.createdAt}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.menuItemId}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.quantity}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.stockItemId}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.currentQuantity}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.minimumQuantity ?? '—'}
                              </td>
                            </tr>
                          `,
                        )}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Intent: dashboard low stock (summary) -->
            <div
              class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] p-3 space-y-2"
            >
              <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
                ${this.msg['salesDashboard.intent.dashboard.lowStock.title']}
              </h3>
              ${this.viewDashboardData.filter(
                (r: CafeFlowViewDashboardOutputItem) => r.stockItemId,
              ).length === 0
                ? html`<p
                    class="text-sm text-[var(--ds-color-text-muted,#64748b)]"
                  >
                    —
                  </p>`
                : html`<ul class="space-y-1">
                    ${this.viewDashboardData
                      .filter(
                        (r: CafeFlowViewDashboardOutputItem) => r.stockItemId,
                      )
                      .map(
                        (r: CafeFlowViewDashboardOutputItem) => html`
                          <li
                            class="flex items-center gap-3 text-sm text-[var(--ds-color-text,#0f172a)]"
                          >
                            <span
                              >${this.msg['salesDashboard.field.stockItemId.label']}:
                              ${r.stockItemId}</span
                            >
                            <span
                              >${this.msg['salesDashboard.field.currentQuantity.label']}:
                              ${r.currentQuantity}</span
                            >
                            <span
                              >${this.msg['salesDashboard.field.minimumQuantity.label']}:
                              ${r.minimumQuantity ?? '—'}</span
                            >
                          </li>
                        `,
                      )}
                  </ul>`}
            </div>
          </section>

          <!-- Organism: RequestAiSalesSummary -->
          <section
            class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-surface,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-medium text-[var(--ds-color-text,#0f172a)]">
              ${this.msg['salesDashboard.organism.requestAiSalesSummary.title']}
            </h2>

            <!-- Intent: ai sales request (commandForm) -->
            <div class="space-y-2">
              <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
                ${this.msg['salesDashboard.intent.aiSales.request.title']}
              </h3>
              <div class="flex flex-col gap-2">
                <label class="text-sm text-[var(--ds-color-text,#0f172a)]">
                  ${this.msg['salesDashboard.field.summaryRequest.label']}
                </label>
                <input
                  type="text"
                  class="rounded border border-[var(--ds-color-border,#e2e8f0)] px-3 py-2 text-sm text-[var(--ds-color-text,#0f172a)] bg-[var(--ds-color-surface,#ffffff)]"
                  .value=${this.requestAiSalesSummarySummaryRequest}
                  @input=${(e: Event) =>
                    this.handleRequestAiSalesSummarySummaryRequestChange(e)}
                />
                <button
                  class="self-start rounded px-3 py-1 text-sm bg-[var(--ds-color-primary,#4f46e5)] text-white hover:opacity-90"
                  @click=${(e: Event) => this.handleRequestAiSalesSummaryClick(e)}
                >
                  ${this.msg['salesDashboard.action.requestAiSalesSummary.label']}
                </button>
              </div>
            </div>

            <!-- Intent: ai sales output (queryList) -->
            <div class="space-y-2">
              <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
                ${this.msg['salesDashboard.intent.aiSales.output.title']}
              </h3>
              <div class="overflow-x-auto">
                <table
                  class="w-full text-sm border border-[var(--ds-color-border,#e2e8f0)]"
                >
                  <thead class="bg-[var(--ds-color-surface-alt,#f8fafc)]">
                    <tr>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.orderId.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.status.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.orderType.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.createdAt.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.deliveredAt.label']}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.requestAiSalesSummaryData.length === 0
                      ? html`<tr>
                          <td
                            colspan="5"
                            class="px-2 py-3 text-center text-[var(--ds-color-text-muted,#64748b)]"
                          >
                            —
                          </td>
                        </tr>`
                      : this.requestAiSalesSummaryData.map(
                          (row: CafeFlowRequestAiSalesSummaryOutputItem) => html`
                            <tr
                              class="border-t border-[var(--ds-color-border,#e2e8f0)]"
                            >
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.orderId}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.status}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.orderType}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.createdAt}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.deliveredAt}
                              </td>
                            </tr>
                          `,
                        )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- Organism: RequestAiPromoSuggestions -->
          <section
            class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-surface,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-medium text-[var(--ds-color-text,#0f172a)]">
              ${this.msg['salesDashboard.organism.requestAiPromoSuggestions.title']}
            </h2>

            <!-- Intent: ai promo request (commandForm) -->
            <div class="space-y-2">
              <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
                ${this.msg['salesDashboard.intent.aiPromo.request.title']}
              </h3>
              <button
                class="rounded px-3 py-1 text-sm bg-[var(--ds-color-primary,#4f46e5)] text-white hover:opacity-90"
                @click=${(e: Event) => this.handleRequestAiPromoSuggestionsClick(e)}
              >
                ${this.msg['salesDashboard.action.requestAiPromoSuggestions.label']}
              </button>
            </div>

            <!-- Intent: ai promo output (queryList) -->
            <div class="space-y-2">
              <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
                ${this.msg['salesDashboard.intent.aiPromo.output.title']}
              </h3>
              <div class="overflow-x-auto">
                <table
                  class="w-full text-sm border border-[var(--ds-color-border,#e2e8f0)]"
                >
                  <thead class="bg-[var(--ds-color-surface-alt,#f8fafc)]">
                    <tr>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.orderId.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.status.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.createdAt.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.quantity.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.menuItemId.label']}
                      </th>
                      <th class="px-2 py-1 text-left text-[var(--ds-color-text,#0f172a)]">
                        ${this.msg['salesDashboard.field.menuItemName.label']}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.requestAiPromoSuggestionsData.length === 0
                      ? html`<tr>
                          <td
                            colspan="6"
                            class="px-2 py-3 text-center text-[var(--ds-color-text-muted,#64748b)]"
                          >
                            —
                          </td>
                        </tr>`
                      : this.requestAiPromoSuggestionsData.map(
                          (row: CafeFlowRequestAiPromoSuggestionsOutputItem) => html`
                            <tr
                              class="border-t border-[var(--ds-color-border,#e2e8f0)]"
                            >
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.orderId}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.status}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.createdAt}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.quantity}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.menuItemId}
                              </td>
                              <td class="px-2 py-1 text-[var(--ds-color-text,#0f172a)]">
                                ${row.name}
                              </td>
                            </tr>
                          `,
                        )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
