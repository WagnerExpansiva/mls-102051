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
    const manageSuccess = this.manageStockItemState === 'success';
    const manageError = this.manageStockItemState === 'error';

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.stockManagement.title']}
          </h1>

          <!-- Section: Stock Items List -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.stockItems.title']}
            </h2>

            <!-- Filter + Refresh toolbar -->
            <div class="flex flex-wrap items-end gap-3">
              <div class="flex-1 min-w-[200px]">
                <label class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1">
                  ${this.msg['filter.searchTerm.label']}
                </label>
                <input
                  type="text"
                  .value="${this.browseStockItemsSearchTerm}"
                  @input="${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}"
                  class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                />
              </div>
              <button
                type="button"
                @click="${(e: Event) => this.handleBrowseStockItemsClick(e)}"
                ?disabled="${isBrowseLoading}"
                class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] disabled:opacity-50"
              >
                ${isBrowseLoading
                  ? this.msg['action.browseStockItems.label'] + '…'
                  : this.msg['action.browseStockItems.label']}
              </button>
            </div>

            <!-- Table / loading / empty -->
            ${isBrowseLoading
              ? html`<div class="space-y-2">
                  ${[1, 2, 3, 4, 5].map(
                    () =>
                      html`<div
                        class="h-10 rounded bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"
                      ></div>`,
                  )}
                </div>`
              : items.length === 0
                ? html`<p
                      class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4 text-center"
                    >
                      ${this.msg['empty.browseStockItems']}
                    </p>`
                : html`<div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead>
                        <tr
                          class="border-b border-[var(--grey-color,#E6E6E6)] text-left text-[var(--text-primary-color-lighter,#535353)]"
                        >
                          <th class="py-2 px-3 font-medium">
                            ${this.msg['column.name.label']}
                          </th>
                          <th class="py-2 px-3 font-medium">
                            ${this.msg['column.unit.label']}
                          </th>
                          <th class="py-2 px-3 font-medium">
                            ${this.msg['column.minimumLevel.label']}
                          </th>
                          <th class="py-2 px-3 font-medium">
                            ${this.msg['column.updatedAt.label']}
                          </th>
                          <th class="py-2 px-3 font-medium">
                            ${this.msg['column.createdAt.label']}
                          </th>
                          <th class="py-2 px-3 font-medium">
                            ${this.msg['column.stockItemId.label']}
                          </th>
                          <th class="py-2 px-3 font-medium">
                            ${this.msg['action.select.label']}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        ${items.map(
                          (item: CafeFlowBrowseStockItemsOutputItem) => html`
                            <tr
                              class="border-b border-[var(--grey-color-light,#F2F2F2)] text-[var(--text-primary-color,#403f3f)]"
                            >
                              <td class="py-2 px-3">${item.name}</td>
                              <td class="py-2 px-3">${item.unit}</td>
                              <td class="py-2 px-3">${item.minimumLevel}</td>
                              <td class="py-2 px-3">${item.updatedAt}</td>
                              <td class="py-2 px-3">${item.createdAt}</td>
                              <td
                                class="py-2 px-3 text-xs text-[var(--text-primary-color-lighter,#535353)]"
                              >
                                ${item.stockItemId}
                              </td>
                              <td class="py-2 px-3">
                                <a
                                  href="/cafeFlow/stockManagement/${item.stockItemId}"
                                  class="text-[var(--link-color,#1890FF)] hover:underline text-sm"
                                >
                                  ${this.msg['action.select.label']}
                                </a>
                              </td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>`}
          </section>

          <!-- Section: Manage Stock Item -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.manageStockItem.title']}
            </h2>

            ${!this.manageStockItemStockItemId
              ? html`<p
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4 text-center"
                  >
                    ${this.msg['empty.manageStockItem']}
                  </p>`
              : html`<form
                    @submit="${(e: Event) => {
                      e.preventDefault();
                      this.handleManageStockItemClick(e);
                    }}"
                    class="space-y-4"
                  >
                    <input type="hidden" .value="${this.manageStockItemStockItemId}" />

                    <div>
                      <label
                        class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.name.label']}
                      </label>
                      <input
                        type="text"
                        .value="${this.manageStockItemName}"
                        @input="${(e: Event) => this.handleManageStockItemNameChange(e)}"
                        class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                      />
                    </div>

                    <div>
                      <label
                        class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.unit.label']}
                      </label>
                      <select
                        .value="${this.manageStockItemUnit}"
                        @change="${(e: Event) => this.handleManageStockItemUnitChange(e)}"
                        class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
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
                        class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.minimumLevel.label']}
                      </label>
                      <input
                        type="number"
                        .value="${this.manageStockItemMinimumLevel}"
                        @input="${(e: Event) =>
                          this.handleManageStockItemMinimumLevelChange(e)}"
                        class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                      />
                    </div>

                    <div class="flex items-center gap-3">
                      <button
                        type="submit"
                        ?disabled="${isManageLoading}"
                        class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] disabled:opacity-50"
                      >
                        ${isManageLoading
                          ? this.msg['action.manageStockItem.label'] + '…'
                          : this.msg['action.manageStockItem.label']}
                      </button>
                    </div>
                  </form>`}

            <!-- Feedback: success -->
            ${manageSuccess
              ? html`<div
                  class="rounded border px-4 py-3 text-sm flex items-center justify-between"
                  style="border-color: var(--success-color,#52C41A); background: var(--grey-color-lighter,#F9FAFB);"
                >
                  <span class="text-[var(--text-primary-color,#403f3f)]"
                    >${this.msg['action.manageStockItem.success']}</span
                  >
                  <button
                    type="button"
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] hover:text-[var(--text-primary-color,#403f3f)]"
                    @click="${() => { this.manageStockItemState = 'idle'; }}"
                  >
                    OK
                  </button>
                </div>`
              : null}

            <!-- Feedback: error -->
            ${manageError
              ? html`<div
                  class="rounded border px-4 py-3 text-sm flex items-center justify-between"
                  style="border-color: var(--error-color,#FF4D4F); background: var(--grey-color-lighter,#F9FAFB);"
                >
                  <span class="text-[var(--text-primary-color,#403f3f)]"
                    >${this.manageStockItemError ||
                    this.msg['action.manageStockItem.error']}</span
                  >
                  <button
                    type="button"
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] hover:text-[var(--text-primary-color,#403f3f)]"
                    @click="${() => { this.manageStockItemState = 'idle'; }}"
                  >
                    OK
                  </button>
                </div>`
              : null}
          </section>
        </div>
      </div>
    `;
  }
}
