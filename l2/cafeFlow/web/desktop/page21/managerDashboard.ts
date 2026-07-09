/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/managerDashboard.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowManagerDashboardBase } from '/_102051_/l2/cafeFlow/web/shared/managerDashboard.js';
import type {
  CafeFlowViewDashboardOutputItem,
  CafeFlowRequestAiSalesSummaryOutputItem,
  CafeFlowRequestAiPromoSuggestionsOutputItem,
} from '/_102051_/l2/cafeFlow/web/contracts/managerDashboard.js';

@customElement('cafe-flow--web--desktop--page21--manager-dashboard-102051')
export class CafeFlowDesktopPage21ManagerDashboardPage extends CafeFlowManagerDashboardBase {
  render(): TemplateResult {
    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          ${this.renderDashboardSection()}
          ${this.renderAiAssistantSection()}
        </div>
      </div>
    `;
  }

  /* ---- Section: Dashboard overview ---- */
  private renderDashboardSection(): TemplateResult {
    return html`
      <section class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
        <h2 class="text-lg font-bold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['managerDashboard.section.overview.title']}
        </h2>

        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['managerDashboard.organism.viewDashboard.title']}
          </h3>

          <div class="flex items-center justify-between">
            <span class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['managerDashboard.intent.dashboardStatus.title']}
            </span>
            <button
              type="button"
              class="px-3 py-1.5 rounded text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
              ?disabled=${this.viewDashboardState === 'loading'}
              @click=${(): void => this.handleViewDashboardClick()}
            >
              ${this.viewDashboardState === 'loading'
                ? '…'
                : this.msg['managerDashboard.action.refreshDashboard']}
            </button>
          </div>

          ${this.viewDashboardData.length > 0
            ? this.renderDashboardTable()
            : html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic">
                ${this.msg['managerDashboard.intent.dashboardStatus.empty']}
              </p>`}
        </div>
      </section>
    `;
  }

  private renderDashboardTable(): TemplateResult {
    return html`
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="border-b border-[var(--grey-color,#e6e6e6)] text-left">
              <th class="py-2 px-3 font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['managerDashboard.field.status']}
              </th>
              <th class="py-2 px-3 font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['managerDashboard.field.orderType']}
              </th>
              <th class="py-2 px-3 font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['managerDashboard.field.createdAt']}
              </th>
              <th class="py-2 px-3 font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['managerDashboard.field.deliveredAt']}
              </th>
              <th class="py-2 px-3 font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['managerDashboard.field.shiftId']}
              </th>
            </tr>
          </thead>
          <tbody>
            ${this.viewDashboardData.map(
              (item: CafeFlowViewDashboardOutputItem) => html`
                <tr class="border-b border-[var(--grey-color-light,#f2f2f2)]">
                  <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.status}</td>
                  <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.orderType}</td>
                  <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.createdAt}</td>
                  <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.deliveredAt}</td>
                  <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.shiftId}</td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  /* ---- Section: AI Assistant ---- */
  private renderAiAssistantSection(): TemplateResult {
    return html`
      <section class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-6">
        <h2 class="text-lg font-bold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['managerDashboard.section.aiAssistant.title']}
        </h2>

        ${this.renderAiSalesSummaryOrganism()}
        ${this.renderAiPromoSuggestionsOrganism()}
      </section>
    `;
  }

  /* ---- Organism: AI Sales Summary ---- */
  private renderAiSalesSummaryOrganism(): TemplateResult {
    return html`
      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['managerDashboard.organism.aiSalesSummary.title']}
        </h3>

        <!-- Action panel -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
            ${this.msg['managerDashboard.intent.aiSalesAction.title']}
          </span>
          <button
            type="button"
            class="px-3 py-1.5 rounded text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
            ?disabled=${this.requestAiSalesSummaryState === 'loading'}
            @click=${(): void => this.handleRequestAiSalesSummaryClick()}
          >
            ${this.requestAiSalesSummaryState === 'loading'
              ? '…'
              : this.msg['managerDashboard.action.requestAiSalesSummary']}
          </button>
        </div>

        <!-- Summary result -->
        <div class="space-y-2">
          <span class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['managerDashboard.intent.aiSalesResult.title']}
          </span>
          ${this.requestAiSalesSummaryData.length > 0
            ? this.renderAiSalesSummaryList()
            : html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic">
                ${this.msg['managerDashboard.intent.aiSalesResult.empty']}
              </p>`}
        </div>
      </div>
    `;
  }

  private renderAiSalesSummaryList(): TemplateResult {
    return html`
      <div class="space-y-2">
        ${this.requestAiSalesSummaryData.map(
          (item: CafeFlowRequestAiSalesSummaryOutputItem) => html`
            <div class="rounded border border-[var(--grey-color-light,#f2f2f2)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)] p-3 space-y-1">
              <div class="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <div>
                  <span class="font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['managerDashboard.field.orderId']}:
                  </span>
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${item.orderId}</span>
                </div>
                <div>
                  <span class="font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['managerDashboard.field.status']}:
                  </span>
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${item.status}</span>
                </div>
                <div>
                  <span class="font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['managerDashboard.field.orderType']}:
                  </span>
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${item.orderType}</span>
                </div>
                <div>
                  <span class="font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['managerDashboard.field.createdAt']}:
                  </span>
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${item.createdAt}</span>
                </div>
                <div>
                  <span class="font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['managerDashboard.field.deliveredAt']}:
                  </span>
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${item.deliveredAt}</span>
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }

  /* ---- Organism: AI Promo Suggestions ---- */
  private renderAiPromoSuggestionsOrganism(): TemplateResult {
    return html`
      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['managerDashboard.organism.aiPromoSuggestions.title']}
        </h3>

        <!-- Action panel -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
            ${this.msg['managerDashboard.intent.aiPromoAction.title']}
          </span>
          <button
            type="button"
            class="px-3 py-1.5 rounded text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
            ?disabled=${this.requestAiPromoSuggestionsState === 'loading'}
            @click=${(): void => this.handleRequestAiPromoSuggestionsClick()}
          >
            ${this.requestAiPromoSuggestionsState === 'loading'
              ? '…'
              : this.msg['managerDashboard.action.requestAiPromoSuggestions']}
          </button>
        </div>

        <!-- Summary result -->
        <div class="space-y-2">
          <span class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['managerDashboard.intent.aiPromoResult.title']}
          </span>
          ${this.requestAiPromoSuggestionsData.length > 0
            ? this.renderAiPromoSuggestionsList()
            : html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic">
                ${this.msg['managerDashboard.intent.aiPromoResult.empty']}
              </p>`}
        </div>
      </div>
    `;
  }

  private renderAiPromoSuggestionsList(): TemplateResult {
    return html`
      <div class="space-y-2">
        ${this.requestAiPromoSuggestionsData.map(
          (item: CafeFlowRequestAiPromoSuggestionsOutputItem) => html`
            <div class="rounded border border-[var(--grey-color-light,#f2f2f2)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)] p-3 space-y-1">
              <div class="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <div>
                  <span class="font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['managerDashboard.field.orderId']}:
                  </span>
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${item.orderId}</span>
                </div>
                <div>
                  <span class="font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['managerDashboard.field.orderType']}:
                  </span>
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${item.orderType}</span>
                </div>
                <div>
                  <span class="font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['managerDashboard.field.status']}:
                  </span>
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${item.status}</span>
                </div>
                <div>
                  <span class="font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['managerDashboard.field.createdAt']}:
                  </span>
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${item.createdAt}</span>
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }
}
