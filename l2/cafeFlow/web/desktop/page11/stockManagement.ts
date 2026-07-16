/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';
import type { CafeFlowBrowseStockItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';

@customElement('cafe-flow--web--desktop--page11--stock-management-102051')
export class CafeFlowDesktopPage11StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const items: CafeFlowBrowseStockItemsOutputItem[] = this.browseStockItemsData?.items ?? [];
    const isBrowseLoading = this.browseStockItemsState === 'loading';
    const isManageLoading = this.manageStockItemState === 'loading';
    const isManageSuccess = this.manageStockItemState === 'success';
    const isManageError = this.manageStockItemState === 'error';
    const hasSelectedItem = this.manageStockItemStockItemId !== '';

    return html`
      <div class="min-h-full bg-[var(--grey-color-lighter,#F9FAFB)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Browse Section -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.browse.title']}
            </h2>

            <div class="flex items-center gap-3">
              <input
                type="text"
                class="flex-1 rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                placeholder="${this.msg['field.searchTerm.label']}"
                .value="${this.browseStockItemsSearchTerm}"
                @input="${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}"
              />
              <button
                class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] disabled:opacity-50"
                ?disabled="${isBrowseLoading}"
                @click="${(e: Event) => this.handleBrowseStockItemsClick(e)}"
              >
                ${isBrowseLoading ? this.msg['action.refresh.label'] + '…' : this.msg['action.refresh.label']}
              </button>
            </div>

            ${isBrowseLoading
              ? html`
                  <div
                    class="py-8 text-center text-sm text-[var(--text-primary-color-disabled,#525151)]"
                  >
                    ${this.msg['action.refresh.label']}…
                  </div>
                `
              : items.length === 0
                ? html`
                    <div
                      class="py-8 text-center text-sm text-[var(--text-primary-color-disabled,#525151)]"
                    >
                      ${this.msg['section.browse.empty']}
                    </div>
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
                              ${this.msg['field.updatedAt.label']}
                            </th>
                            <th class="py-2 px-3"></th>
                          </tr>
                        </thead>
                        <tbody>
                          ${items.map(
                            (item: CafeFlowBrowseStockItemsOutputItem) => html`
                              <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.stockItemId}
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.name}
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.unit}
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.minimumLevel}
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.updatedAt}
                                </td>
                                <td class="py-2 px-3">
                                  <button
                                    class="rounded px-3 py-1 text-xs font-medium border border-[var(--active-color,#1890FF)] text-[var(--active-color,#1890FF)] hover:bg-[var(--active-color,#1890FF)] hover:text-[var(--bg-primary-color,#ffffff)]"
                                    @click="${() => this.setManageStockItemStockItemId(item.stockItemId)}"
                                  >
                                    ${this.msg['action.selectItem.label']}
                                  </button>
                                </td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}
          </section>

          <!-- Manage Section -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.manage.title']}
            </h2>

            ${!hasSelectedItem
              ? html`
                  <div
                    class="py-6 text-center text-sm text-[var(--text-primary-color-disabled,#525151)]"
                  >
                    ${this.msg['section.manage.empty']}
                  </div>
                `
              : html`
                  <form
                    class="space-y-4"
                    @submit="${(e: Event) => {
                      e.preventDefault();
                      this.handleManageStockItemClick(e);
                    }}"
                  >
                    <div>
                      <label
                        class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.name.label']}
                      </label>
                      <input
                        type="text"
                        class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                        .value="${this.manageStockItemName}"
                        @input="${(e: Event) => this.handleManageStockItemNameChange(e)}"
                      />
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.unit.label']}
                      </label>
                      <select
                        class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                        .value="${this.manageStockItemUnit}"
                        @change="${(e: Event) => this.handleManageStockItemUnitChange(e)}"
                      >
                        <option value="">--</option>
                        <option value="kg">kg</option>
                        <option value="liter">liter</option>
                        <option value="portion">portion</option>
                        <option value="unit">unit</option>
                      </select>
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.minimumLevel.label']}
                      </label>
                      <input
                        type="number"
                        class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                        .value="${this.manageStockItemMinimumLevel}"
                        @input="${(e: Event) => this.handleManageStockItemMinimumLevelChange(e)}"
                      />
                    </div>

                    <button
                      type="submit"
                      class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] disabled:opacity-50"
                      ?disabled="${isManageLoading}"
                    >
                      ${isManageLoading
                        ? this.msg['action.submit.label'] + '…'
                        : this.msg['action.submit.label']}
                    </button>
                  </form>

                  ${isManageSuccess
                    ? html`
                        <div
                          class="rounded border border-[var(--success-color,#52C41A)] bg-[var(--grey-color-light,#F2F2F2)] px-4 py-3 text-sm text-[var(--success-color,#52C41A)] flex items-center justify-between"
                        >
                          <span>${this.msg['action.manageStockItem.success']}</span>
                          <button
                            class="ml-2 text-[var(--text-primary-color-disabled,#525151)] hover:text-[var(--text-primary-color,#403f3f)]"
                            @click="${() => { this.manageStockItemState = 'idle'; }}"
                          >
                            ×
                          </button>
                        </div>
                      `
                    : ''}
                  ${isManageError
                    ? html`
                        <div
                          class="rounded border border-[var(--error-color,#FF4D4F)] bg-[var(--grey-color-light,#F2F2F2)] px-4 py-3 text-sm text-[var(--error-color,#FF4D4F)] flex items-center justify-between"
                        >
                          <span>
                            ${this.manageStockItemError ||
                              this.msg['action.manageStockItem.error']}
                          </span>
                          <button
                            class="ml-2 text-[var(--text-primary-color-disabled,#525151)] hover:text-[var(--text-primary-color,#403f3f)]"
                            @click="${() => { this.manageStockItemState = 'idle'; }}"
                          >
                            ×
                          </button>
                        </div>
                      `
                    : ''}
                `}
          </section>
        </div>
      </div>
    `;
  }
}
