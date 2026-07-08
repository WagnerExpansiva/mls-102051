/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CafeFlowBrowseStockItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

@customElement('cafe-flow--web--desktop--page21--stock-management-102051')
export class CafeFlowDesktopPage21StockManagementPage extends CafeFlowStockManagementBase {
render() {
const items: CafeFlowBrowseStockItemsOutputItem[] = this.browseStockItemsData?.items ?? [];
const total: number | undefined = this.browseStockItemsData?.total;
return html`
<div class="min-h-full bg-slate-50 dark:bg-slate-950">
  <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        ${this.msg['stockManagement.section.main.title'] ?? ''}
      </h1>
    </header>

    <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          ${this.msg['stockManagement.organism.browseStockItems.title'] ?? ''}
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ${this.msg['stockManagement.intentions.browseStockItems.queryList.title'] ?? ''}
        </p>
      </div>

      <div class="flex flex-wrap items-end gap-3">
        <label class="flex flex-col text-sm text-slate-700 dark:text-slate-300">
          <span>${this.msg['stockManagement.filters.searchTerm'] ?? ''}</span>
          <input
            class="mt-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
            type="text"
            .value=${this.browseStockItemsSearchTerm}
            @input=${this.handleBrowseStockItemsSearchTermChange}
          />
        </label>
        <button
          class="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700 disabled:opacity-50"
          @click=${this.handleBrowseStockItemsClick}
        >
          ${this.msg['stockManagement.actions.browseStockItems'] ?? ''}
        </button>
        ${typeof total === 'number'
          ? html`<span class="text-sm text-slate-500 dark:text-slate-400">Total: ${total}</span>`
          : html``}
      </div>

      <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
        <table class="min-w-full text-sm">
          <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <tr>
              <th class="text-left px-3 py-2">${this.msg['stockManagement.fields.name'] ?? ''}</th>
              <th class="text-left px-3 py-2">${this.msg['stockManagement.fields.unit'] ?? ''}</th>
              <th class="text-left px-3 py-2">${this.msg['stockManagement.fields.minimumLevel'] ?? ''}</th>
              <th class="text-left px-3 py-2">${this.msg['stockManagement.fields.updatedAt'] ?? ''}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            ${items.length === 0
              ? html`<tr>
                  <td class="px-3 py-3 text-center text-slate-500 dark:text-slate-400" colspan="4">
                    ${this.msg['stockManagement.intentions.browseStockItems.queryList.empty'] ?? ''}
                  </td>
                </tr>`
              : items.map(
                  (item: CafeFlowBrowseStockItemsOutputItem) => html`<tr>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100">${item.name}</td>
                    <td class="px-3 py-2 text-slate-600 dark:text-slate-300">${item.unit}</td>
                    <td class="px-3 py-2 text-slate-600 dark:text-slate-300">${item.minimumLevel}</td>
                    <td class="px-3 py-2 text-slate-600 dark:text-slate-300">${item.updatedAt}</td>
                  </tr>`
                )}
          </tbody>
        </table>
      </div>
    </section>

    <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          ${this.msg['stockManagement.organism.manageStockItem.title'] ?? ''}
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ${this.msg['stockManagement.intentions.manageStockItem.form.title'] ?? ''}
        </p>
      </div>

      <form class="grid gap-4 sm:grid-cols-3" @submit=${(event: Event) => event.preventDefault()}>
        <label class="flex flex-col text-sm text-slate-700 dark:text-slate-300">
          <span>${this.msg['stockManagement.fields.name'] ?? ''}</span>
          <input
            class="mt-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
            type="text"
            .value=${this.manageStockItemName}
            @input=${this.handleManageStockItemNameChange}
          />
        </label>
        <label class="flex flex-col text-sm text-slate-700 dark:text-slate-300">
          <span>${this.msg['stockManagement.fields.unit'] ?? ''}</span>
          <select
            class="mt-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
            .value=${this.manageStockItemUnit}
            @change=${this.handleManageStockItemUnitChange}
          >
            <option value="kg">kg</option>
            <option value="liter">liter</option>
            <option value="portion">portion</option>
            <option value="unit">unit</option>
          </select>
        </label>
        <label class="flex flex-col text-sm text-slate-700 dark:text-slate-300">
          <span>${this.msg['stockManagement.fields.minimumLevel'] ?? ''}</span>
          <input
            class="mt-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
            type="number"
            .value=${this.manageStockItemMinimumLevel}
            @input=${this.handleManageStockItemMinimumLevelChange}
          />
        </label>
      </form>

      <div class="flex">
        <button
          class="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700 disabled:opacity-50"
          @click=${this.handleManageStockItemClick}
        >
          ${this.msg['stockManagement.actions.manageStockItem'] ?? ''}
        </button>
      </div>
    </section>

    <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          ${this.msg['stockManagement.intentions.manageStockItem.summary.title'] ?? ''}
        </h2>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 text-sm">
        <div class="space-y-1">
          <div class="text-slate-500 dark:text-slate-400">${this.msg['stockManagement.fields.name'] ?? ''}</div>
          <div class="text-slate-900 dark:text-slate-100">${this.manageStockItemName}</div>
        </div>
        <div class="space-y-1">
          <div class="text-slate-500 dark:text-slate-400">${this.msg['stockManagement.fields.unit'] ?? ''}</div>
          <div class="text-slate-900 dark:text-slate-100">${this.manageStockItemUnit}</div>
        </div>
        <div class="space-y-1">
          <div class="text-slate-500 dark:text-slate-400">${this.msg['stockManagement.fields.minimumLevel'] ?? ''}</div>
          <div class="text-slate-900 dark:text-slate-100">${this.manageStockItemMinimumLevel}</div>
        </div>
        <div class="space-y-1">
          <div class="text-slate-500 dark:text-slate-400">${this.msg['stockManagement.fields.updatedAt'] ?? ''}</div>
          <div class="text-slate-900 dark:text-slate-100">${this.LayoutSummaryManageStockItemUpdatedAt}</div>
        </div>
      </div>
    </section>
  </div>
</div>
`;
}
}
