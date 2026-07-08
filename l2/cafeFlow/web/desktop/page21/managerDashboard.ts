/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowManagerDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/managerDashboard.js';

@customElement('cafe-flow--web--desktop--page21--manager-dashboard-102051')
export class CafeFlowDesktopPage21ManagerDashboardPage extends CafeFlowManagerDashboardBase {
  render() {
    const viewDashboardRows = this.viewDashboardData;
    const aiSalesRows = this.requestAiSalesSummaryData;
    const aiPromoRows = this.requestAiPromoSuggestionsData;
    const summaryItem = aiSalesRows[0];
    const summaryStatus = summaryItem?.status ?? '';
    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header>
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              ${this.msg['managerDashboard.section.dashboard.title']}
            </h1>
          </header>

          <section class="space-y-6">
            <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ${''}
                </h2>
                <button
                  class="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-500 disabled:opacity-50"
                  @click=${this.handleViewDashboardClick}
                >
                  ${this.msg['managerDashboard.action.viewDashboard']}
                </button>
              </div>

              <div class="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                  <thead class="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.status']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.orderType']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.createdAt']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.deliveredAt']}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    ${viewDashboardRows.length > 0
                      ? viewDashboardRows.map(
                          (item: (typeof this.viewDashboardData)[number], index: number) => html`
                            <tr>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.status}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.orderType}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.createdAt}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.deliveredAt}</td>
                            </tr>
                          `,
                        )
                      : html`
                          <tr>
                            <td class="px-3 py-3 text-sm text-slate-500 dark:text-slate-400" colspan="4">
                              ${''}
                            </td>
                          </tr>
                        `}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ${''}
                </h2>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-3">
                  <div class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    ${this.msg['managerDashboard.field.shiftId']}
                  </div>
                  <div class="text-sm text-slate-900 dark:text-slate-100">${''}</div>
                </div>
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-3">
                  <div class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    ${this.msg['managerDashboard.field.status']}
                  </div>
                  <div class="text-sm text-slate-900 dark:text-slate-100">${summaryStatus}</div>
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <button
                  class="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-500 disabled:opacity-50"
                  @click=${this.handleRequestAiSalesSummaryClick}
                >
                  ${this.msg['managerDashboard.action.requestAiSalesSummary']}
                </button>
                <button
                  class="px-3 py-2 rounded-md bg-amber-600 text-white text-sm hover:bg-amber-500 disabled:opacity-50"
                  @click=${this.handleRequestAiPromoSuggestionsClick}
                >
                  ${this.msg['managerDashboard.action.requestAiPromoSuggestions']}
                </button>
              </div>

              <div class="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                  <thead class="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.orderId']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.status']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.orderType']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.createdAt']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.deliveredAt']}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    ${aiSalesRows.length > 0
                      ? aiSalesRows.map(
                          (item: (typeof this.requestAiSalesSummaryData)[number], index: number) => html`
                            <tr>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.orderId}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.status}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.orderType}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.createdAt}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.deliveredAt}</td>
                            </tr>
                          `,
                        )
                      : html`
                          <tr>
                            <td class="px-3 py-3 text-sm text-slate-500 dark:text-slate-400" colspan="5">
                              ${''}
                            </td>
                          </tr>
                        `}
                  </tbody>
                </table>
              </div>

              <div class="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                  <thead class="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.orderId']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.orderType']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.status']}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200">
                        ${this.msg['managerDashboard.field.createdAt']}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    ${aiPromoRows.length > 0
                      ? aiPromoRows.map(
                          (item: (typeof this.requestAiPromoSuggestionsData)[number], index: number) => html`
                            <tr>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.orderId}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.orderType}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.status}</td>
                              <td class="px-3 py-2 text-sm text-slate-800 dark:text-slate-100">${item.createdAt}</td>
                            </tr>
                          `,
                        )
                      : html`
                          <tr>
                            <td class="px-3 py-3 text-sm text-slate-500 dark:text-slate-400" colspan="4">
                              ${''}
                            </td>
                          </tr>
                        `}
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
