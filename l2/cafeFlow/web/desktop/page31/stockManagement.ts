/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';
import type { CafeFlowBrowseStockItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';

@customElement('cafe-flow--web--desktop--page31--stock-management-102051')
export class CafeFlowDesktopPage31StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const items: CafeFlowBrowseStockItemsOutputItem[] = this.browseStockItemsData?.items ?? [];
    const isLoading: boolean = this.browseStockItemsState === 'loading';
    const isManageLoading: boolean = this.manageStockItemState === 'loading';
    const isManageSuccess: boolean = this.manageStockItemState === 'success';
    const isManageError: boolean = this.manageStockItemState === 'error';
    const hasSelectedItem: boolean = this.manageStockItemStockItemId !== '';

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section 1: Stock Items List -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.stockItems.title']}
            </h2>

            <!-- Filter + Refresh toolbar -->
            <div class="flex items-center gap-3 flex-wrap">
              <input
                type="text"
                .value=${this.browseStockItemsSearchTerm}
                @input=${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}
                placeholder=${this.msg['filter.searchTerm.label']}
                class="flex-1 min-w-[200px] rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-2 focus:ring-[var(--active-color,#1890ff)]"
              />
              <button
                @click=${(e: Event) => this.handleBrowseStockItemsClick(e)}
                ?disabled=${isLoading}
                class="rounded-md bg-[var(--active-color,#1890ff)] px-4 py-2 text-white font-medium hover:opacity-90 disabled:opacity-50"
              >
                ${isLoading ? '...' : this.msg['action.refresh.label']}
              </button>
            </div>

            <!-- Stock items table -->
            ${isLoading
              ? html`<div class="py-8 text-center text-[var(--text-primary-color,#0f172a)] opacity-50">Carregando...</div>`
              : items.length === 0
                ? html`<div class="py-8 text-center text-[var(--text-primary-color,#0f172a)] opacity-60">${this.msg['section.stockItems.empty']}</div>`
                : html`
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead>
                        <tr class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color,#0f172a)]">
                          <th class="py-2 px-3 font-medium">${this.msg['column.stockItemId.label']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['column.name.label']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['column.unit.label']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['column.minimumLevel.label']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['column.createdAt.label']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['column.updatedAt.label']}</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${items.map((item: CafeFlowBrowseStockItemsOutputItem) => html`
                          <tr class="border-b border-[var(--grey-color,#e2e8f0)] text-[var(--text-primary-color,#0f172a)]">
                            <td class="py-2 px-3">${item.stockItemId}</td>
                            <td class="py-2 px-3">${item.name}</td>
                            <td class="py-2 px-3">${item.unit}</td>
                            <td class="py-2 px-3">${item.minimumLevel}</td>
                            <td class="py-2 px-3">${item.createdAt}</td>
                            <td class="py-2 px-3">${item.updatedAt}</td>
                          </tr>
                        `)}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>

          <!-- Section 2: Stock Item Detail Panel -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.editItem.title']}
            </h2>

            ${!hasSelectedItem
              ? html`<div class="py-6 text-center text-[var(--text-primary-color,#0f172a)] opacity-60">${this.msg['section.editItem.empty']}</div>`
              : html`
                <form class="space-y-4" @submit=${(e: Event) => { e.preventDefault(); this.handleManageStockItemClick(e); }}>
                  <input type="hidden" .value=${this.manageStockItemStockItemId} />
                  <div>
                    <label class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1">${this.msg['field.name.label']}</label>
                    <input
                      type="text"
                      .value=${this.manageStockItemName}
                      @input=${(e: Event) => this.handleManageStockItemNameChange(e)}
                      class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-2 focus:ring-[var(--active-color,#1890ff)]"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1">${this.msg['field.unit.label']}</label>
                    <input
                      type="text"
                      .value=${this.manageStockItemUnit}
                      @input=${(e: Event) => this.handleManageStockItemUnitChange(e)}
                      class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-2 focus:ring-[var(--active-color,#1890ff)]"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1">${this.msg['field.minimumLevel.label']}</label>
                    <input
                      type="number"
                      .value=${this.manageStockItemMinimumLevel}
                      @input=${(e: Event) => this.handleManageStockItemMinimumLevelChange(e)}
                      class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-2 focus:ring-[var(--active-color,#1890ff)]"
                    />
                  </div>
                  <button
                    type="submit"
                    ?disabled=${isManageLoading}
                    class="rounded-md bg-[var(--active-color,#1890ff)] px-4 py-2 text-white font-medium hover:opacity-90 disabled:opacity-50"
                  >
                    ${isManageLoading ? '...' : this.msg['action.manageStockItem.label']}
                  </button>
                </form>
              `}

            <!-- Command feedback -->
            ${isManageSuccess
              ? html`<div class="rounded-md border-l-4 border-[var(--success-color,#52C41A)] bg-[var(--bg-secondary-color,#E6E6E6)] px-4 py-3 text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['action.manageStockItem.success']}
                </div>`
              : ''}
            ${isManageError
              ? html`<div class="rounded-md border-l-4 border-[var(--error-color,#FF4D4F)] bg-[var(--bg-secondary-color,#E6E6E6)] px-4 py-3 text-[var(--text-primary-color,#0f172a)]">
                  ${this.manageStockItemError || this.msg['action.manageStockItem.error']}
                </div>`
              : ''}
          </section>

          <!-- Section 3: Review Summary -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-2">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              <!-- TODO: no 'section.reviewSummary.title' key in shared i18n -->
              Resumo
            </h2>
            <p class="text-sm text-[var(--text-primary-color,#0f172a)] opacity-70">
              ${isManageSuccess
                ? this.msg['action.manageStockItem.success']
                : isManageError
                  ? (this.manageStockItemError || this.msg['action.manageStockItem.error'])
                  : 'Nenhuma ação executada ainda'}
            </p>
          </section>
        </div>
      </div>
    `;
  }
}
