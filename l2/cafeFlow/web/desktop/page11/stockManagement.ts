/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

@customElement('cafe-flow--web--desktop--page11--stock-management-102051')
export class CafeFlowDesktopPage11StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const m = this.msg;
    const items = this.browseStockItemsData?.items ?? [];
    const browseLoading = this.browseStockItemsState === 'loading';
    const manageLoading = this.manageStockItemState === 'loading';

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <header class="space-y-1">
            <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
              ${m['stockManagement.section.main.title'] ?? ''}
            </h1>
          </header>

          <!-- Section: Gestão de estoque e alertas -->
          <section class="space-y-6">
            <!-- Organism: BrowseStockItems -->
            <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  ${m['stockManagement.organism.browseStockItems.title'] ?? ''}
                </h2>
              </div>

              <div class="p-5 space-y-4">
                <!-- Intention: queryList -->
                <div class="space-y-3">
                  <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
                    ${m['stockManagement.intentions.browseStockItems.queryList.title'] ?? ''}
                  </h3>

                  <!-- Filters + toolbar -->
                  <div class="flex flex-wrap items-end gap-3">
                    <div class="flex-1 min-w-[200px]">
                      <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        ${m['stockManagement.filters.searchTerm'] ?? ''}
                      </label>
                      <input
                        type="text"
                        .value="${this.browseStockItemsSearchTerm}"
                        @input="${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}"
                        class="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="${m['stockManagement.filters.searchTerm'] ?? ''}"
                      />
                    </div>
                    <button
                      type="button"
                      ?disabled="${browseLoading}"
                      @click="${() => this.handleBrowseStockItemsClick()}"
                      class="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ${browseLoading ? '...' : (m['stockManagement.actions.browseStockItems'] ?? '')}
                    </button>
                  </div>

                  <!-- Table -->
                  <div class="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-800">
                    <table class="w-full text-sm">
                      <thead class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        <tr>
                          <th class="px-4 py-2 text-left font-medium">${m['stockManagement.fields.name'] ?? ''}</th>
                          <th class="px-4 py-2 text-left font-medium">${m['stockManagement.fields.unit'] ?? ''}</th>
                          <th class="px-4 py-2 text-left font-medium">${m['stockManagement.fields.minimumLevel'] ?? ''}</th>
                          <th class="px-4 py-2 text-left font-medium">${m['stockManagement.fields.updatedAt'] ?? ''}</th>
                          <th class="px-4 py-2 text-left font-medium">${m['stockManagement.fields.createdAt'] ?? ''}</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                        ${items.length === 0
                          ? html`<tr>
                              <td colspan="5" class="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                                ${m['stockManagement.intentions.browseStockItems.queryList.empty'] ?? ''}
                              </td>
                            </tr>`
                          : items.map((item) => {
                              const isLowStock = false; // Low stock alert would require StockLevel data not available in this query output
                              return html`<tr class="${isLowStock ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-white dark:bg-slate-900'}">
                                <td class="px-4 py-2 text-slate-700 dark:text-slate-200">${item.name}</td>
                                <td class="px-4 py-2 text-slate-700 dark:text-slate-200">${item.unit}</td>
                                <td class="px-4 py-2 text-slate-700 dark:text-slate-200">${item.minimumLevel}</td>
                                <td class="px-4 py-2 text-slate-500 dark:text-slate-400">${item.updatedAt}</td>
                                <td class="px-4 py-2 text-slate-500 dark:text-slate-400">${item.createdAt}</td>
                              </tr>`;
                            })}
                      </tbody>
                    </table>
                  </div>

                  ${this.browseStockItemsData?.total !== undefined
                    ? html`<p class="text-xs text-slate-400 dark:text-slate-500">
                        ${this.browseStockItemsData.total} ${this.browseStockItemsData.total === 1 ? 'item' : 'itens'}
                      </p>`
                    : null}
                </div>
              </div>
            </div>

            <!-- Organism: ManageStockItem -->
            <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  ${m['stockManagement.organism.manageStockItem.title'] ?? ''}
                </h2>
              </div>

              <div class="p-5 space-y-6">
                <!-- Intention: commandForm -->
                <div class="space-y-4">
                  <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
                    ${m['stockManagement.intentions.manageStockItem.form.title'] ?? ''}
                  </h3>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <!-- Field: name -->
                    <div>
                      <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        ${m['stockManagement.fields.name'] ?? ''}<span class="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        .value="${this.manageStockItemName}"
                        @input="${(e: Event) => this.handleManageStockItemNameChange(e)}"
                        class="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <!-- Field: unit -->
                    <div>
                      <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        ${m['stockManagement.fields.unit'] ?? ''}<span class="text-red-500">*</span>
                      </label>
                      <select
                        .value="${this.manageStockItemUnit}"
                        @change="${(e: Event) => this.handleManageStockItemUnitChange(e)}"
                        class="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" ?selected="${this.manageStockItemUnit === ''}">--</option>
                        <option value="kg" ?selected="${this.manageStockItemUnit === 'kg'}">kg</option>
                        <option value="liter" ?selected="${this.manageStockItemUnit === 'liter'}">liter</option>
                        <option value="portion" ?selected="${this.manageStockItemUnit === 'portion'}">portion</option>
                        <option value="unit" ?selected="${this.manageStockItemUnit === 'unit'}">unit</option>
                      </select>
                    </div>

                    <!-- Field: minimumLevel -->
                    <div>
                      <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        ${m['stockManagement.fields.minimumLevel'] ?? ''}<span class="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        .value="${this.manageStockItemMinimumLevel}"
                        @input="${(e: Event) => this.handleManageStockItemMinimumLevelChange(e)}"
                        class="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <!-- Action: submit -->
                  <div class="flex justify-end">
                    <button
                      type="button"
                      ?disabled="${manageLoading}"
                      @click="${() => this.handleManageStockItemClick()}"
                      class="px-5 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ${manageLoading ? '...' : (m['stockManagement.actions.manageStockItem'] ?? '')}
                    </button>
                  </div>
                </div>

                <!-- Intention: summary -->
                <div class="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-4">
                  <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
                    ${m['stockManagement.intentions.manageStockItem.summary.title'] ?? ''}
                  </h3>

                  <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="flex justify-between px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800/50">
                      <dt class="text-xs text-slate-500 dark:text-slate-400">${m['stockManagement.fields.name'] ?? ''}</dt>
                      <dd class="text-sm text-slate-700 dark:text-slate-200">${this.manageStockItemName || '—'}</dd>
                    </div>
                    <div class="flex justify-between px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800/50">
                      <dt class="text-xs text-slate-500 dark:text-slate-400">${m['stockManagement.fields.unit'] ?? ''}</dt>
                      <dd class="text-sm text-slate-700 dark:text-slate-200">${this.manageStockItemUnit || '—'}</dd>
                    </div>
                    <div class="flex justify-between px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800/50">
                      <dt class="text-xs text-slate-500 dark:text-slate-400">${m['stockManagement.fields.minimumLevel'] ?? ''}</dt>
                      <dd class="text-sm text-slate-700 dark:text-slate-200">${this.manageStockItemMinimumLevel || '—'}</dd>
                    </div>
                    <div class="flex justify-between px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800/50">
                      <dt class="text-xs text-slate-500 dark:text-slate-400">${m['stockManagement.fields.updatedAt'] ?? ''}</dt>
                      <dd class="text-sm text-slate-700 dark:text-slate-200">${this.LayoutSummaryManageStockItemUpdatedAt || '—'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
