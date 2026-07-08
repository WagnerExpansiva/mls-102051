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
    const dashboardRows = this.viewDashboardData ?? [];
    const aiSalesRows = this.requestAiSalesSummaryData ?? [];
    const aiPromoRows = this.requestAiPromoSuggestionsData ?? [];

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header>
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              ${this.msg['managerDashboard.section.dashboard.title']}
            </h1>
          </header>

          <section class="space-y-6">
            <div class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ${''}
                </h2>
              </div>
              <div class="px-4 py-4 space-y-4">
                <div class="flex flex-wrap gap-3">
                  <button
                    class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-700"
                    @click=${this.handleViewDashboardClick}
                  >
                    ${this.msg['managerDashboard.action.viewDashboard']}
                  </button>
                </div>

                <div class="space-y-2">
                  <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    ${''}
                  </h3>
                  ${dashboardRows.length > 0
                    ? html`
                        <div class="overflow-x-auto">
                          <table class="min-w-full text-sm text-slate-700 dark:text-slate-200">
                            <thead class="bg-slate-100 dark:bg-slate-800">
                              <tr>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.status']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.orderType']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.createdAt']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.deliveredAt']}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              ${dashboardRows.map(
                                (item: CafeFlowViewDashboardOutputItem, index: number) => html`
                                  <tr
                                    class="border-b border-slate-200 dark:border-slate-800"
                                    data-row-index=${index}
                                  >
                                    <td class="px-3 py-2">${item.status}</td>
                                    <td class="px-3 py-2">${item.orderType}</td>
                                    <td class="px-3 py-2">${item.createdAt}</td>
                                    <td class="px-3 py-2">${item.deliveredAt}</td>
                                  </tr>
                                `,
                              )}
                            </tbody>
                          </table>
                        </div>
                      `
                    : html`
                        <p class="text-sm text-slate-500 dark:text-slate-400">${''}</p>
                      `}
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ${''}
                </h2>
              </div>
              <div class="px-4 py-4 space-y-4">
                <div class="flex flex-wrap gap-3">
                  <button
                    class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-700"
                    @click=${this.handleRequestAiSalesSummaryClick}
                  >
                    ${this.msg['managerDashboard.action.requestAiSalesSummary']}
                  </button>
                </div>

                <div class="space-y-2">
                  <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    ${''}
                  </h3>
                  ${aiSalesRows.length > 0
                    ? html`
                        <div class="overflow-x-auto">
                          <table class="min-w-full text-sm text-slate-700 dark:text-slate-200">
                            <thead class="bg-slate-100 dark:bg-slate-800">
                              <tr>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.orderId']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.status']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.orderType']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.createdAt']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.deliveredAt']}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              ${aiSalesRows.map(
                                (item: CafeFlowRequestAiSalesSummaryOutputItem, index: number) => html`
                                  <tr
                                    class="border-b border-slate-200 dark:border-slate-800"
                                    data-row-index=${index}
                                  >
                                    <td class="px-3 py-2">${item.orderId}</td>
                                    <td class="px-3 py-2">${item.status}</td>
                                    <td class="px-3 py-2">${item.orderType}</td>
                                    <td class="px-3 py-2">${item.createdAt}</td>
                                    <td class="px-3 py-2">${item.deliveredAt}</td>
                                  </tr>
                                `,
                              )}
                            </tbody>
                          </table>
                        </div>
                      `
                    : html`
                        <p class="text-sm text-slate-500 dark:text-slate-400">${''}</p>
                      `}
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ${''}
                </h2>
              </div>
              <div class="px-4 py-4 space-y-4">
                <div class="flex flex-wrap gap-3">
                  <button
                    class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-700"
                    @click=${this.handleRequestAiPromoSuggestionsClick}
                  >
                    ${this.msg['managerDashboard.action.requestAiPromoSuggestions']}
                  </button>
                </div>

                <div class="space-y-2">
                  <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    ${''}
                  </h3>
                  ${aiPromoRows.length > 0
                    ? html`
                        <div class="overflow-x-auto">
                          <table class="min-w-full text-sm text-slate-700 dark:text-slate-200">
                            <thead class="bg-slate-100 dark:bg-slate-800">
                              <tr>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.orderId']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.orderType']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.status']}
                                </th>
                                <th class="px-3 py-2 text-left font-semibold">
                                  ${this.msg['managerDashboard.field.createdAt']}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              ${aiPromoRows.map(
                                (item: CafeFlowRequestAiPromoSuggestionsOutputItem, index: number) => html`
                                  <tr
                                    class="border-b border-slate-200 dark:border-slate-800"
                                    data-row-index=${index}
                                  >
                                    <td class="px-3 py-2">${item.orderId}</td>
                                    <td class="px-3 py-2">${item.orderType}</td>
                                    <td class="px-3 py-2">${item.status}</td>
                                    <td class="px-3 py-2">${item.createdAt}</td>
                                  </tr>
                                `,
                              )}
                            </tbody>
                          </table>
                        </div>
                      `
                    : html`
                        <p class="text-sm text-slate-500 dark:text-slate-400">${''}</p>
                      `}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
