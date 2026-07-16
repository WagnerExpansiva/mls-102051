/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';
import type { CafeFlowBrowseStockItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';

@customElement('cafe-flow--web--desktop--page21--stock-management-102051')
export class CafeFlowDesktopPage21StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const items: CafeFlowBrowseStockItemsOutputItem[] = this.browseStockItemsData?.items ?? [];
    const isQueryLoading = this.browseStockItemsState === 'loading';
    const isManageLoading = this.manageStockItemState === 'loading';
    const isManageSuccess = this.manageStockItemState === 'success';
    const isManageError = this.manageStockItemState === 'error';
    const hasSelection = this.manageStockItemStockItemId !== '';

    const selectItem = (item: CafeFlowBrowseStockItemsOutputItem): void => {
      this.setManageStockItemStockItemId(item.stockItemId);
      this.setManageStockItemName(item.name);
      this.setManageStockItemUnit(item.unit);
      this.setManageStockItemMinimumLevel(String(item.minimumLevel));
    };

    return html`
      <div class="min-h-screen bg-[var(--bg-primary-color,#ffffff)] p-4 md:p-6">
        <h1 class="text-xl font-bold text-[var(--text-primary-color,#403f3f)] mb-4">
          ${this.msg['page.title']}
        </h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Master: Stock items list -->
          <div class="lg:col-span-2">
            <div class="bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['section.stockItems.title']}
                </h2>
                <button
                  type="button"
                  class="px-3 py-1.5 text-sm rounded bg-[var(--active-color,#1890FF)] text-white hover:opacity-90 disabled:opacity-50"
                  ?disabled=${isQueryLoading}
                  @click=${(e: Event) => this.handleBrowseStockItemsClick(e)}
                >
                  ${isQueryLoading ? '...' : this.msg['action.browseStockItems.label']}
                </button>
              </div>

              <!-- Search filter -->
              <div class="mb-3">
                <input
                  type="search"
                  class="w-full px-3 py-2 text-sm border border-[var(--grey-color,#E6E6E6)] rounded bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:border-[var(--active-color,#1890FF)]"
                  placeholder=${this.msg['filter.searchTerm.label']}
                  .value=${this.browseStockItemsSearchTerm}
                  @input=${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}
                />
              </div>

              <!-- Loading skeleton -->
              ${isQueryLoading ? html`
                <div class="space-y-2">
                  ${[1, 2, 3, 4, 5].map((_n: number) => html`
                    <div class="h-12 bg-[var(--grey-color-light,#F2F2F2)] rounded animate-pulse"></div>
                  `)}
                </div>
              ` : items.length === 0 ? html`
                <div class="py-8 text-center text-sm text-[var(--text-primary-color-lighter,#535353)]">
                  ${this.msg['section.stockItems.empty']}
                </div>
              ` : html`
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                        <th class="text-left py-2 px-2 text-[var(--text-primary-color,#403f3f)] font-semibold">${this.msg['column.name.label']}</th>
                        <th class="text-left py-2 px-2 text-[var(--text-primary-color,#403f3f)] font-semibold">${this.msg['column.unit.label']}</th>
                        <th class="text-left py-2 px-2 text-[var(--text-primary-color,#403f3f)] font-semibold">${this.msg['column.minimumLevel.label']}</th>
                        <th class="text-left py-2 px-2 text-[var(--text-primary-color,#403f3f)] font-semibold">${this.msg['column.updatedAt.label']}</th>
                        <th class="text-right py-2 px-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${items.map((item: CafeFlowBrowseStockItemsOutputItem) => {
                        const isSelected = this.manageStockItemStockItemId === item.stockItemId;
                        return html`
                          <tr
                            class="border-b border-[var(--grey-color,#E6E6E6)] cursor-pointer ${isSelected ? 'bg-[var(--bg-secondary-color-lighter,#F9F9F9)]' : 'hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]'}"
                            @click=${() => selectItem(item)}
                          >
                            <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.name}</td>
                            <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.unit}</td>
                            <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.minimumLevel}</td>
                            <td class="py-2 px-2 text-[var(--text-primary-color-lighter,#535353)] text-xs">${item.updatedAt}</td>
                            <td class="py-2 px-2 text-right">
                              <button
                                type="button"
                                class="px-2 py-1 text-xs rounded border border-[var(--active-color,#1890FF)] text-[var(--active-color,#1890FF)] hover:bg-[var(--active-color,#1890FF)] hover:text-white transition-colors"
                                @click=${(e: Event) => { e.stopPropagation(); selectItem(item); }}
                              >
                                ${this.msg['action.selectItem.label']}
                              </button>
                            </td>
                          </tr>
                        `;
                      })}
                    </tbody>
                  </table>
                </div>
              `}
            </div>
          </div>

          <!-- Detail: Edit panel -->
          <div class="lg:col-span-1">
            <div class="bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] rounded-lg p-4 sticky top-4">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)] mb-3">
                ${this.msg['section.editItem.title']}
              </h2>

              ${!hasSelection ? html`
                <div class="py-8 text-center text-sm text-[var(--text-primary-color-lighter,#535353)]">
                  ${this.msg['section.editItem.empty']}
                </div>
              ` : html`
                <form @submit=${(e: Event) => { e.preventDefault(); this.handleManageStockItemClick(e); }}>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">
                        ${this.msg['field.name.label']}
                      </label>
                      <input
                        type="text"
                        class="w-full px-3 py-2 text-sm border border-[var(--grey-color,#E6E6E6)] rounded bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:border-[var(--active-color,#1890FF)]"
                        .value=${this.manageStockItemName}
                        @input=${(e: Event) => this.handleManageStockItemNameChange(e)}
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">
                        ${this.msg['field.unit.label']}
                      </label>
                      <input
                        type="text"
                        class="w-full px-3 py-2 text-sm border border-[var(--grey-color,#E6E6E6)] rounded bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:border-[var(--active-color,#1890FF)]"
                        .value=${this.manageStockItemUnit}
                        @input=${(e: Event) => this.handleManageStockItemUnitChange(e)}
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">
                        ${this.msg['field.minimumLevel.label']}
                      </label>
                      <input
                        type="number"
                        class="w-full px-3 py-2 text-sm border border-[var(--grey-color,#E6E6E6)] rounded bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:border-[var(--active-color,#1890FF)]"
                        .value=${this.manageStockItemMinimumLevel}
                        @input=${(e: Event) => this.handleManageStockItemMinimumLevelChange(e)}
                      />
                    </div>

                    <button
                      type="submit"
                      class="w-full px-4 py-2 text-sm font-medium rounded bg-[var(--active-color,#1890FF)] text-white hover:opacity-90 disabled:opacity-50"
                      ?disabled=${isManageLoading}
                    >
                      ${isManageLoading ? '...' : this.msg['action.manageStockItem.label']}
                    </button>
                  </div>
                </form>

                <!-- Feedback -->
                ${isManageSuccess ? html`
                  <div class="mt-3 p-3 rounded bg-[var(--grey-color-light,#F2F2F2)] text-sm text-[var(--success-color,#52C41A)] border border-[var(--success-color,#52C41A)]">
                    ${this.msg['action.manageStockItem.success']}
                  </div>
                ` : ''}
                ${isManageError ? html`
                  <div class="mt-3 p-3 rounded bg-[var(--grey-color-light,#F2F2F2)] text-sm text-[var(--error-color,#FF4D4F)] border border-[var(--error-color,#FF4D4F)]">
                    ${this.manageStockItemError || this.msg['action.manageStockItem.error']}
                  </div>
                ` : ''}
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
