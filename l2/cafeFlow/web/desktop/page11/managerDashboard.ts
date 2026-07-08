/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowManagerDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/managerDashboard.js';

@customElement('cafe-flow--web--desktop--page11--manager-dashboard-102051')
export class CafeFlowDesktopPage11ManagerDashboardPage extends CafeFlowManagerDashboardBase {
  render(): TemplateResult {
    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
            ${this.msg['managerDashboard.section.dashboard.title'] ?? ''}
          </h1>

          ${this.renderViewDashboard()}
          ${this.renderRequestAiSalesSummary()}
          ${this.renderRequestAiPromoSuggestions()}
        </div>
      </div>
    `;
  }

  private renderViewDashboard(): TemplateResult {
    const rows = this.viewDashboardData ?? [];
    const loading = this.viewDashboardState === 'loading';

    return html`
      <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
            ${this.msg['managerDashboard.organism.viewDashboard.title'] ?? ''}
          </h2>
          <button
            class="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            ?disabled=${loading}
            @click=${(e: Event) => this.handleViewDashboardClick(e)}
          >
            ${this.msg['managerDashboard.action.viewDashboard'] ?? ''}
          </button>
        </div>

        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">
          ${this.msg['managerDashboard.intention.viewDashboard.list.title'] ?? ''}
        </h3>

        ${rows.length === 0
          ? html`<p class="text-sm text-slate-400 dark:text-slate-500 py-4 text-center">
              ${loading ? '...' : '—'}
            </p>`
          : html`
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.status'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.orderType'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.createdAt'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.shiftId'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.deliveredAt'] ?? ''}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  ${rows.map((item) => html`
                    <tr class="text-slate-700 dark:text-slate-300">
                      <td class="px-3 py-2">${item.status}</td>
                      <td class="px-3 py-2">${item.orderType}</td>
                      <td class="px-3 py-2">${item.createdAt}</td>
                      <td class="px-3 py-2">${item.shiftId}</td>
                      <td class="px-3 py-2">${item.deliveredAt}</td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `}
      </section>
    `;
  }

  private renderRequestAiSalesSummary(): TemplateResult {
    const rows = this.requestAiSalesSummaryData ?? [];
    const loading = this.requestAiSalesSummaryState === 'loading';

    return html`
      <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
            ${this.msg['managerDashboard.organism.requestAiSalesSummary.title'] ?? ''}
          </h2>
          <button
            class="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            ?disabled=${loading}
            @click=${(e: Event) => this.handleRequestAiSalesSummaryClick(e)}
          >
            ${this.msg['managerDashboard.action.requestAiSalesSummary'] ?? ''}
          </button>
        </div>

        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">
          ${this.msg['managerDashboard.intention.requestAiSalesSummary.list.title'] ?? ''}
        </h3>

        ${rows.length === 0
          ? html`<p class="text-sm text-slate-400 dark:text-slate-500 py-4 text-center">
              ${loading ? '...' : '—'}
            </p>`
          : html`
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.orderId'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.status'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.orderType'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.createdAt'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.deliveredAt'] ?? ''}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  ${rows.map((item) => html`
                    <tr class="text-slate-700 dark:text-slate-300">
                      <td class="px-3 py-2">${item.orderId}</td>
                      <td class="px-3 py-2">${item.status}</td>
                      <td class="px-3 py-2">${item.orderType}</td>
                      <td class="px-3 py-2">${item.createdAt}</td>
                      <td class="px-3 py-2">${item.deliveredAt}</td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `}
      </section>
    `;
  }

  private renderRequestAiPromoSuggestions(): TemplateResult {
    const rows = this.requestAiPromoSuggestionsData ?? [];
    const loading = this.requestAiPromoSuggestionsState === 'loading';

    return html`
      <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
            ${this.msg['managerDashboard.organism.requestAiPromoSuggestions.title'] ?? ''}
          </h2>
          <button
            class="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            ?disabled=${loading}
            @click=${(e: Event) => this.handleRequestAiPromoSuggestionsClick(e)}
          >
            ${this.msg['managerDashboard.action.requestAiPromoSuggestions'] ?? ''}
          </button>
        </div>

        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">
          ${this.msg['managerDashboard.intention.requestAiPromoSuggestions.list.title'] ?? ''}
        </h3>

        ${rows.length === 0
          ? html`<p class="text-sm text-slate-400 dark:text-slate-500 py-4 text-center">
              ${loading ? '...' : '—'}
            </p>`
          : html`
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.orderId'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.orderType'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.status'] ?? ''}</th>
                    <th class="px-3 py-2">${this.msg['managerDashboard.field.createdAt'] ?? ''}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  ${rows.map((item) => html`
                    <tr class="text-slate-700 dark:text-slate-300">
                      <td class="px-3 py-2">${item.orderId}</td>
                      <td class="px-3 py-2">${item.orderType}</td>
                      <td class="px-3 py-2">${item.status}</td>
                      <td class="px-3 py-2">${item.createdAt}</td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `}
      </section>
    `;
  }
}
