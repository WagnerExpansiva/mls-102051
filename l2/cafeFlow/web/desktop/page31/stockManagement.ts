/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';
import type { CafeFlowBrowseStockItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';

@customElement('cafe-flow--web--desktop--page31--stock-management-102051')
export class CafeFlowDesktopPage31StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const items: CafeFlowBrowseStockItemsOutputItem[] = this.browseStockItemsData?.items ?? [];
    const isQueryLoading = this.browseStockItemsState === 'loading';
    const isManageLoading = this.manageStockItemState === 'loading';
    const hasSelectedItem = !!this.manageStockItemStockItemId;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.stockManagement.title']}
          </h1>

          <!-- Section 1: Stock Items List -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.stockItemsList.title']}
            </h2>

            <!-- Filter + Toolbar -->
            <div class="flex items-center gap-3 flex-wrap">
              <input
                type="text"
                .value="${this.browseStockItemsSearchTerm}"
                @input="${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}"
                placeholder="${this.msg['filter.searchTerm.label']}"
                class="flex-1 min-w-[200px] rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
              />
              <button
                @click="${(e: Event) => this.handleBrowseStockItemsClick(e)}"
                ?disabled="${isQueryLoading}"
                class="rounded-md px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ${isQueryLoading ? '...' : this.msg['toolbar.refresh.label']}
              </button>
            </div>

            <!-- Table or states -->
            ${isQueryLoading
              ? html`
                  <div class="space-y-2">
                    ${Array.from({ length: 4 }).map(
                      () => html`
                        <div
                          class="h-10 rounded-md bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"
                        ></div>
                      `,
                    )}
                  </div>
                `
              : items.length === 0
                ? html`
                    <p
                      class="text-sm text-[var(--text-primary-color-disabled,#525151)] py-4 text-center"
                    >
                      ${this.msg['empty.stockItems']}
                    </p>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#E6E6E6)] text-left text-[var(--text-primary-color,#403f3f)]"
                          >
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['field.stockItemId.label']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['field.name.label']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['field.unit.label']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['field.minimumLevel.label']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['field.createdAt.label']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['field.updatedAt.label']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${items.map(
                            (item: CafeFlowBrowseStockItemsOutputItem) => html`
                              <tr
                                class="border-b border-[var(--grey-color-light,#F2F2F2)] text-[var(--text-primary-color,#403f3f)]"
                              >
                                <td class="py-2 px-3">${item.stockItemId}</td>
                                <td class="py-2 px-3">${item.name}</td>
                                <td class="py-2 px-3">${item.unit}</td>
                                <td class="py-2 px-3">${item.minimumLevel}</td>
                                <td class="py-2 px-3">${item.createdAt}</td>
                                <td class="py-2 px-3">${item.updatedAt}</td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}
          </section>

          <!-- Section 2: Stock Item Detail Panel -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.stockItemDetailPanel.title']}
            </h2>

            ${!hasSelectedItem
              ? html`
                  <p
                    class="text-sm text-[var(--text-primary-color-disabled,#525151)] py-4 text-center"
                  >
                    ${this.msg['empty.noItemSelected']}
                  </p>
                `
              : html`
                  <form
                    @submit="${(e: Event) => {
                      e.preventDefault();
                      this.handleManageStockItemClick(e);
                    }}"
                    class="space-y-4"
                  >
                    <input type="hidden" .value="${this.manageStockItemStockItemId}" />
                    <div>
                      <label
                        class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.name.label']}
                      </label>
                      <input
                        type="text"
                        .value="${this.manageStockItemName}"
                        @input="${(e: Event) => this.handleManageStockItemNameChange(e)}"
                        class="w-full rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.unit.label']}
                      </label>
                      <input
                        type="text"
                        .value="${this.manageStockItemUnit}"
                        @input="${(e: Event) => this.handleManageStockItemUnitChange(e)}"
                        class="w-full rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.minimumLevel.label']}
                      </label>
                      <input
                        type="number"
                        .value="${this.manageStockItemMinimumLevel}"
                        @input="${(e: Event) => this.handleManageStockItemMinimumLevelChange(e)}"
                        class="w-full rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                      />
                    </div>
                    <button
                      type="submit"
                      ?disabled="${isManageLoading}"
                      class="rounded-md px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ${isManageLoading ? '...' : this.msg['action.manageStockItem.label']}
                    </button>
                  </form>
                `}

            <!-- Feedback: success -->
            ${this.manageStockItemState === 'success'
              ? html`
                  <div
                    class="flex items-center justify-between rounded-md border border-[var(--success-color,#52C41A)] px-4 py-3"
                    style="background-color: color-mix(in srgb, var(--success-color,#52C41A) 10%, transparent)"
                  >
                    <span class="text-sm text-[var(--success-color,#52C41A)]">
                      ${this.msg['action.manageStockItem.success']}
                    </span>
                    <button
                      @click="${() => {
                        this.manageStockItemState = 'idle';
                      }}"
                      class="text-sm text-[var(--text-primary-color,#403f3f)] hover:text-[var(--text-primary-color-hover,#4b4a4a)] ml-3"
                      aria-label="Dismiss"
                    >
                      ×
                    </button>
                  </div>
                `
              : ''}
            <!-- Feedback: error -->
            ${this.manageStockItemState === 'error'
              ? html`
                  <div
                    class="flex items-center justify-between rounded-md border border-[var(--error-color,#FF4D4F)] px-4 py-3"
                    style="background-color: color-mix(in srgb, var(--error-color,#FF4D4F) 10%, transparent)"
                  >
                    <span class="text-sm text-[var(--error-color,#FF4D4F)]">
                      ${this.manageStockItemError || this.msg['action.manageStockItem.error']}
                    </span>
                    <button
                      @click="${() => {
                        this.manageStockItemState = 'idle';
                      }}"
                      class="text-sm text-[var(--text-primary-color,#403f3f)] hover:text-[var(--text-primary-color-hover,#4b4a4a)] ml-3"
                      aria-label="Dismiss"
                    >
                      ×
                    </button>
                  </div>
                `
              : ''}
          </section>

          <!-- Section 3: Review Summary -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.reviewSummary.title']}
            </h2>
            ${this.manageStockItemState === 'idle'
              ? html`
                  <p class="text-sm text-[var(--text-primary-color-disabled,#525151)] py-2">
                    ${this.msg['empty.noActionsYet']}
                  </p>
                `
              : html`
                  <div class="text-sm text-[var(--text-primary-color,#403f3f)] space-y-1">
                    <p>
                      ${this.msg['intention.summary.title']}:
                      <span
                        class="font-medium ${this.manageStockItemState === 'success'
                          ? 'text-[var(--success-color,#52C41A)]'
                          : this.manageStockItemState === 'error'
                            ? 'text-[var(--error-color,#FF4D4F)]'
                            : 'text-[var(--text-primary-color,#403f3f)]'}"
                      >
                        ${this.manageStockItemState}
                      </span>
                    </p>
                  </div>
                `}
          </section>
        </div>
      </div>
    `;
  }
}
