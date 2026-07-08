/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/salesDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowSalesDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/salesDashboard.js';

@customElement('cafe-flow--web--desktop--page11--sales-dashboard-102051')
export class CafeFlowDesktopPage11SalesDashboardPage extends CafeFlowSalesDashboardBase {
  render(): unknown {
    const m = this.msg;

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
              ${m['salesDashboard.section.dashboardAi.title']}
            </h1>
            <span class="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-950 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
              ${this.activeCompanyId || '—'}
            </span>
          </div>

          <!-- Section: Dashboard e assistente IA -->
          <section class="space-y-6">
            ${this.renderViewDashboardOrganism(m)}
            ${this.renderAiSalesSummaryOrganism(m)}
            ${this.renderAiPromoSuggestionsOrganism(m)}
          </section>
        </div>
      </div>
    `;
  }

  private renderViewDashboardOrganism(m: Record<string, string>): unknown {
    const rows = this.viewDashboardData ?? [];
    const lowStockRows = rows.filter(
      (r: { currentQuantity?: number; minimumQuantity?: string }) => {
        const current = typeof r.currentQuantity === 'number' ? r.currentQuantity : 0;
        const min = r.minimumQuantity ? parseFloat(r.minimumQuantity) : NaN;
        return !isNaN(min) && current < min;
      }
    );

    return html`
      <div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-5">
        <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
          ${m['salesDashboard.organism.viewDashboard.title']}
        </h2>

        <!-- Intention: dashboard context (summary) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['salesDashboard.intent.dashboard.context.title']}
          </h3>
          <div class="flex flex-wrap gap-4 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <span class="text-slate-400 dark:text-slate-500">${m['salesDashboard.field.shiftId.label']}:</span>
              <span class="ml-1 font-medium">${this.activeCompanyId || '—'}</span>
            </div>
          </div>
        </div>

        <!-- Intention: dashboard data (queryList) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
              ${m['salesDashboard.intent.dashboard.data.title']}
            </h3>
            <button
              type="button"
              class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
              ?disabled=${this.viewDashboardState === 'loading'}
              @click=${(e: Event) => this.handleViewDashboardClick(e)}
            >
              ${this.viewDashboardState === 'loading' ? '…' : m['salesDashboard.action.viewDashboard.label']}
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm text-left text-slate-700 dark:text-slate-300">
              <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th class="px-3 py-2">${m['salesDashboard.field.orderId.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.status.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.orderType.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.createdAt.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.menuItemId.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.quantity.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.stockItemId.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.currentQuantity.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.minimumQuantity.label']}</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length === 0
                  ? html`<tr><td class="px-3 py-4 text-center text-slate-400 dark:text-slate-500" colspan="9">—</td></tr>`
                  : rows.map((r: {
                      orderId: string;
                      status: string;
                      orderType: string;
                      createdAt: string;
                      menuItemId: string;
                      quantity: number;
                      stockItemId: string;
                      currentQuantity: number;
                      minimumQuantity?: string;
                    }) => html`
                    <tr class="border-b border-slate-100 dark:border-slate-800">
                      <td class="px-3 py-2">${r.orderId}</td>
                      <td class="px-3 py-2">${r.status}</td>
                      <td class="px-3 py-2">${r.orderType}</td>
                      <td class="px-3 py-2">${r.createdAt}</td>
                      <td class="px-3 py-2">${r.menuItemId}</td>
                      <td class="px-3 py-2">${r.quantity}</td>
                      <td class="px-3 py-2">${r.stockItemId}</td>
                      <td class="px-3 py-2">${r.currentQuantity}</td>
                      <td class="px-3 py-2">${r.minimumQuantity ?? '—'}</td>
                    </tr>
                  `)}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Intention: dashboard low stock (summary) -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['salesDashboard.intent.dashboard.lowStock.title']}
          </h3>
          ${lowStockRows.length === 0
            ? html`<p class="text-sm text-slate-400 dark:text-slate-500">—</p>`
            : html`<ul class="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                ${lowStockRows.map((r: {
                  stockItemId: string;
                  currentQuantity: number;
                  minimumQuantity?: string;
                }) => html`
                  <li class="flex gap-4 rounded-md bg-amber-50 dark:bg-amber-950/40 px-3 py-2">
                    <span><span class="text-slate-400 dark:text-slate-500">${m['salesDashboard.field.stockItemId.label']}:</span> ${r.stockItemId}</span>
                    <span><span class="text-slate-400 dark:text-slate-500">${m['salesDashboard.field.currentQuantity.label']}:</span> ${r.currentQuantity}</span>
                    <span><span class="text-slate-400 dark:text-slate-500">${m['salesDashboard.field.minimumQuantity.label']}:</span> ${r.minimumQuantity ?? '—'}</span>
                  </li>
                `)}
              </ul>`}
        </div>
      </div>
    `;
  }

  private renderAiSalesSummaryOrganism(m: Record<string, string>): unknown {
    const rows = this.requestAiSalesSummaryData ?? [];

    return html`
      <div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-5">
        <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
          ${m['salesDashboard.organism.requestAiSalesSummary.title']}
        </h2>

        <!-- Intention: ai sales request (commandForm) -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['salesDashboard.intent.aiSales.request.title']}
          </h3>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div class="flex-1">
              <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1" for="ai-sales-summary-request">
                ${m['salesDashboard.field.summaryRequest.label']}
              </label>
              <input
                id="ai-sales-summary-request"
                type="text"
                class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                .value=${this.requestAiSalesSummarySummaryRequest}
                @input=${(e: Event) => this.handleRequestAiSalesSummarySummaryRequestChange(e)}
              />
            </div>
            <button
              type="button"
              class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
              ?disabled=${this.requestAiSalesSummaryState === 'loading'}
              @click=${(e: Event) => this.handleRequestAiSalesSummaryClick(e)}
            >
              ${this.requestAiSalesSummaryState === 'loading' ? '…' : m['salesDashboard.action.requestAiSalesSummary.label']}
            </button>
          </div>
        </div>

        <!-- Intention: ai sales output (queryList) -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['salesDashboard.intent.aiSales.output.title']}
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm text-left text-slate-700 dark:text-slate-300">
              <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th class="px-3 py-2">${m['salesDashboard.field.orderId.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.status.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.orderType.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.createdAt.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.deliveredAt.label']}</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length === 0
                  ? html`<tr><td class="px-3 py-4 text-center text-slate-400 dark:text-slate-500" colspan="5">—</td></tr>`
                  : rows.map((r: {
                      orderId: string;
                      status: string;
                      orderType: string;
                      createdAt: string;
                      deliveredAt: string;
                    }) => html`
                    <tr class="border-b border-slate-100 dark:border-slate-800">
                      <td class="px-3 py-2">${r.orderId}</td>
                      <td class="px-3 py-2">${r.status}</td>
                      <td class="px-3 py-2">${r.orderType}</td>
                      <td class="px-3 py-2">${r.createdAt}</td>
                      <td class="px-3 py-2">${r.deliveredAt}</td>
                    </tr>
                  `)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  private renderAiPromoSuggestionsOrganism(m: Record<string, string>): unknown {
    const rows = this.requestAiPromoSuggestionsData ?? [];

    return html`
      <div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-5">
        <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
          ${m['salesDashboard.organism.requestAiPromoSuggestions.title']}
        </h2>

        <!-- Intention: ai promo request (commandForm) -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['salesDashboard.intent.aiPromo.request.title']}
          </h3>
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            ?disabled=${this.requestAiPromoSuggestionsState === 'loading'}
            @click=${(e: Event) => this.handleRequestAiPromoSuggestionsClick(e)}
          >
            ${this.requestAiPromoSuggestionsState === 'loading' ? '…' : m['salesDashboard.action.requestAiPromoSuggestions.label']}
          </button>
        </div>

        <!-- Intention: ai promo output (queryList) -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['salesDashboard.intent.aiPromo.output.title']}
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm text-left text-slate-700 dark:text-slate-300">
              <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th class="px-3 py-2">${m['salesDashboard.field.orderId.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.status.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.createdAt.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.quantity.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.menuItemId.label']}</th>
                  <th class="px-3 py-2">${m['salesDashboard.field.menuItemName.label']}</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length === 0
                  ? html`<tr><td class="px-3 py-4 text-center text-slate-400 dark:text-slate-500" colspan="6">—</td></tr>`
                  : rows.map((r: {
                      orderId: string;
                      status: string;
                      createdAt: string;
                      quantity: number;
                      menuItemId: string;
                      name: string;
                    }) => html`
                    <tr class="border-b border-slate-100 dark:border-slate-800">
                      <td class="px-3 py-2">${r.orderId}</td>
                      <td class="px-3 py-2">${r.status}</td>
                      <td class="px-3 py-2">${r.createdAt}</td>
                      <td class="px-3 py-2">${r.quantity}</td>
                      <td class="px-3 py-2">${r.menuItemId}</td>
                      <td class="px-3 py-2">${r.name}</td>
                    </tr>
                  `)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}
