/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowManagerDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/managerDashboard.js';

@customElement('cafeflow--web--desktop--page21--manager-dashboard-102051')
export class CafeFlowDesktopPage21ManagerDashboardPage extends CafeFlowManagerDashboardBase {
  render() {
    const dashData = this.viewDashboardData ?? [];
    const dashLoading = this.viewDashboardState === 'loading';
    const dashError = this.viewDashboardState === 'error';
    const dashSuccess = this.viewDashboardState === 'success';

    const salesData = this.requestAiSalesSummaryData ?? [];
    const salesLoading = this.requestAiSalesSummaryState === 'loading';
    const salesError = this.requestAiSalesSummaryState === 'error';
    const salesSuccess = this.requestAiSalesSummaryState === 'success';

    const promoData = this.requestAiPromoSuggestionsData ?? [];
    const promoLoading = this.requestAiPromoSuggestionsState === 'loading';
    const promoError = this.requestAiPromoSuggestionsState === 'error';
    const promoSuccess = this.requestAiPromoSuggestionsState === 'success';

    /* Summary-first: compute compact stats from dashboard data */
    const statusCounts: Record<string, number> = {};
    const typeCounts: Record<string, number> = {};
    for (const item of dashData) {
      const s: string = item.status ?? 'unknown';
      statusCounts[s] = (statusCounts[s] ?? 0) + 1;
      const t: string = item.orderType ?? 'unknown';
      typeCounts[t] = (typeCounts[t] ?? 0) + 1;
    }

    const fmtDate = (val: string | undefined | null): string => {
      if (!val) return '—';
      const d = new Date(val);
      if (isNaN(d.getTime())) return val;
      return d.toLocaleString();
    };

    const skeletonRows = [0, 1, 2];

    return html`
      <div
        class="min-h-screen p-4 md:p-6 space-y-6 bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
      >
        <h1 class="text-2xl font-bold">${this.msg['page.title']}</h1>

        <!-- ===================== Dashboard Section (summary-first) ===================== -->
        <section class="space-y-4">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <h2 class="text-xl font-semibold">${this.msg['section.dashboard.title']}</h2>
            <button
              class="px-4 py-2 rounded-lg text-white bg-[var(--active-color,#1890FF)] hover:opacity-90 disabled:opacity-50 text-sm font-medium transition-opacity"
              @click=${this.handleViewDashboardClick}
              ?disabled=${dashLoading}
            >
              ${dashLoading ? '…' : this.msg['action.viewDashboard.label']}
            </button>
          </div>

          ${dashSuccess
            ? html`<div
                class="text-sm text-[var(--success-color,#52C41A)]"
              >
                ${this.msg['action.viewDashboard.success']}
              </div>`
            : ''}
          ${dashError
            ? html`<div
                class="text-sm text-[var(--error-color,#FF4D4F)]"
              >
                ${this.msg['action.viewDashboard.error']}
              </div>`
            : ''}

          ${dashLoading
            ? html`
                <div class="space-y-2">
                  ${skeletonRows.map(
                    (_n: number) =>
                      html`<div
                        class="h-12 rounded-lg bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"
                      ></div>`,
                  )}
                </div>
              `
            : dashData.length === 0
              ? html`
                  <div
                    class="p-6 text-center text-sm text-[var(--text-primary-color-disabled,#525151)] rounded-lg border border-[var(--grey-color,#E6E6E6)]"
                  >
                    ${this.msg['organism.dashboard.empty']}
                  </div>
                `
              : html`
                  <!-- Summary stat cards -->
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div
                      class="p-3 rounded-lg bg-[var(--bg-secondary-color,#E6E6E6)]"
                    >
                      <div
                        class="text-xs text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['column.status']}
                      </div>
                      <div class="text-lg font-bold">${dashData.length}</div>
                    </div>
                    ${Object.entries(statusCounts).map(
                      ([status, count]: [string, number]) =>
                        html`<div
                          class="p-3 rounded-lg bg-[var(--bg-secondary-color,#E6E6E6)]"
                        >
                          <div
                            class="text-xs text-[var(--text-primary-color-lighter,#535353)]"
                          >
                            ${status}
                          </div>
                          <div class="text-lg font-bold">${count}</div>
                        </div>`,
                    )}
                    ${Object.entries(typeCounts).map(
                      ([otype, count]: [string, number]) =>
                        html`<div
                          class="p-3 rounded-lg bg-[var(--bg-secondary-color,#E6E6E6)]"
                        >
                          <div
                            class="text-xs text-[var(--text-primary-color-lighter,#535353)]"
                          >
                            ${otype}
                          </div>
                          <div class="text-lg font-bold">${count}</div>
                        </div>`,
                    )}
                  </div>

                  <!-- Orders table -->
                  <div
                    class="overflow-x-auto rounded-lg border border-[var(--grey-color,#E6E6E6)]"
                  >
                    <table class="w-full text-sm">
                      <thead class="bg-[var(--bg-secondary-color,#E6E6E6)]">
                        <tr>
                          <th class="px-3 py-2 text-left font-medium">
                            ${this.msg['column.status']}
                          </th>
                          <th class="px-3 py-2 text-left font-medium">
                            ${this.msg['column.orderType']}
                          </th>
                          <th class="px-3 py-2 text-left font-medium">
                            ${this.msg['column.createdAt']}
                          </th>
                          <th class="px-3 py-2 text-left font-medium">
                            ${this.msg['column.shiftId']}
                          </th>
                          <th class="px-3 py-2 text-left font-medium">
                            ${this.msg['column.deliveredAt']}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        ${dashData.map(
                          (item) =>
                            html`<tr
                              class="border-t border-[var(--grey-color,#E6E6E6)]"
                            >
                              <td class="px-3 py-2">${item.status}</td>
                              <td class="px-3 py-2">${item.orderType}</td>
                              <td class="px-3 py-2">${fmtDate(item.createdAt)}</td>
                              <td class="px-3 py-2">${item.shiftId}</td>
                              <td class="px-3 py-2">
                                ${fmtDate(item.deliveredAt)}
                              </td>
                            </tr>`,
                        )}
                      </tbody>
                    </table>
                  </div>
                `}
        </section>

        <!-- ===================== AI Assistant Section (on-demand panels) ===================== -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">
            ${this.msg['section.aiAssistant.title']}
          </h2>

          <div class="grid md:grid-cols-2 gap-4">
            <!-- ---- AI Sales Summary Panel ---- -->
            <div
              class="space-y-3 p-4 rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)]"
            >
              <div class="flex items-center justify-between flex-wrap gap-2">
                <h3 class="text-lg font-medium">
                  ${this.msg['organism.aiSales.title']}
                </h3>
                <button
                  class="px-3 py-1.5 rounded-lg text-white bg-[var(--active-color,#1890FF)] hover:opacity-90 disabled:opacity-50 text-sm font-medium transition-opacity"
                  @click=${this.handleRequestAiSalesSummaryClick}
                  ?disabled=${salesLoading}
                >
                  ${salesLoading ? '…' : this.msg['action.requestAiSalesSummary.label']}
                </button>
              </div>

              ${salesSuccess
                ? html`<div
                    class="text-xs text-[var(--success-color,#52C41A)]"
                  >
                    ${this.msg['action.requestAiSalesSummary.success']}
                  </div>`
                : ''}
              ${salesError
                ? html`<div
                    class="text-xs text-[var(--error-color,#FF4D4F)]"
                  >
                    ${this.msg['action.requestAiSalesSummary.error']}
                  </div>`
                : ''}

              ${salesLoading
                ? html`
                    <div class="space-y-2">
                      ${[0, 1].map(
                        (_n: number) =>
                          html`<div
                            class="h-8 rounded bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"
                          ></div>`,
                      )}
                    </div>
                  `
                : salesData.length === 0
                  ? html`
                      <div
                        class="p-4 text-center text-sm text-[var(--text-primary-color-disabled,#525151)]"
                      >
                        ${this.msg['organism.aiSalesSummary.empty']}
                      </div>
                    `
                  : html`
                      <div class="overflow-x-auto">
                        <table class="w-full text-xs">
                          <thead class="bg-[var(--bg-secondary-color,#E6E6E6)]">
                            <tr>
                              <th class="px-2 py-1.5 text-left font-medium">
                                ${this.msg['column.orderId']}
                              </th>
                              <th class="px-2 py-1.5 text-left font-medium">
                                ${this.msg['column.status']}
                              </th>
                              <th class="px-2 py-1.5 text-left font-medium">
                                ${this.msg['column.orderType']}
                              </th>
                              <th class="px-2 py-1.5 text-left font-medium">
                                ${this.msg['column.createdAt']}
                              </th>
                              <th class="px-2 py-1.5 text-left font-medium">
                                ${this.msg['column.deliveredAt']}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            ${salesData.map(
                              (item) =>
                                html`<tr
                                  class="border-t border-[var(--grey-color,#E6E6E6)]"
                                >
                                  <td class="px-2 py-1.5">${item.orderId}</td>
                                  <td class="px-2 py-1.5">${item.status}</td>
                                  <td class="px-2 py-1.5">${item.orderType}</td>
                                  <td class="px-2 py-1.5">
                                    ${fmtDate(item.createdAt)}
                                  </td>
                                  <td class="px-2 py-1.5">
                                    ${fmtDate(item.deliveredAt)}
                                  </td>
                                </tr>`,
                            )}
                          </tbody>
                        </table>
                      </div>
                    `}
            </div>

            <!-- ---- AI Promo Suggestions Panel ---- -->
            <div
              class="space-y-3 p-4 rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)]"
            >
              <div class="flex items-center justify-between flex-wrap gap-2">
                <h3 class="text-lg font-medium">
                  ${this.msg['organism.aiPromo.title']}
                </h3>
                <button
                  class="px-3 py-1.5 rounded-lg text-white bg-[var(--active-color,#1890FF)] hover:opacity-90 disabled:opacity-50 text-sm font-medium transition-opacity"
                  @click=${this.handleRequestAiPromoSuggestionsClick}
                  ?disabled=${promoLoading}
                >
                  ${promoLoading ? '…' : this.msg['action.requestAiPromoSuggestions.label']}
                </button>
              </div>

              ${promoSuccess
                ? html`<div
                    class="text-xs text-[var(--success-color,#52C41A)]"
                  >
                    ${this.msg['action.requestAiPromoSuggestions.success']}
                  </div>`
                : ''}
              ${promoError
                ? html`<div
                    class="text-xs text-[var(--error-color,#FF4D4F)]"
                  >
                    ${this.msg['action.requestAiPromoSuggestions.error']}
                  </div>`
                : ''}

              ${promoLoading
                ? html`
                    <div class="space-y-2">
                      ${[0, 1].map(
                        (_n: number) =>
                          html`<div
                            class="h-8 rounded bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"
                          ></div>`,
                      )}
                    </div>
                  `
                : promoData.length === 0
                  ? html`
                      <div
                        class="p-4 text-center text-sm text-[var(--text-primary-color-disabled,#525151)]"
                      >
                        ${this.msg['organism.aiPromoSuggestions.empty']}
                      </div>
                    `
                  : html`
                      <div class="overflow-x-auto">
                        <table class="w-full text-xs">
                          <thead class="bg-[var(--bg-secondary-color,#E6E6E6)]">
                            <tr>
                              <th class="px-2 py-1.5 text-left font-medium">
                                ${this.msg['column.orderId']}
                              </th>
                              <th class="px-2 py-1.5 text-left font-medium">
                                ${this.msg['column.orderType']}
                              </th>
                              <th class="px-2 py-1.5 text-left font-medium">
                                ${this.msg['column.status']}
                              </th>
                              <th class="px-2 py-1.5 text-left font-medium">
                                ${this.msg['column.createdAt']}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            ${promoData.map(
                              (item) =>
                                html`<tr
                                  class="border-t border-[var(--grey-color,#E6E6E6)]"
                                >
                                  <td class="px-2 py-1.5">${item.orderId}</td>
                                  <td class="px-2 py-1.5">${item.orderType}</td>
                                  <td class="px-2 py-1.5">${item.status}</td>
                                  <td class="px-2 py-1.5">
                                    ${fmtDate(item.createdAt)}
                                  </td>
                                </tr>`,
                            )}
                          </tbody>
                        </table>
                      </div>
                    `}
            </div>
          </div>
        </section>
      </div>
    `;
  }
}
