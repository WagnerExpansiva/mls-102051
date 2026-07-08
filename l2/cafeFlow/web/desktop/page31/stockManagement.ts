/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CafeFlowBrowseStockItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

@customElement('cafe-flow--web--desktop--page31--stock-management-102051')
export class CafeFlowDesktopPage31StockManagementPage extends CafeFlowStockManagementBase {
render() {
const items: CafeFlowBrowseStockItemsOutputItem[] = this.browseStockItemsData?.items ?? [];
return html`
<div class="min-h-full bg-slate-50 dark:bg-slate-950">
  <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
    <header class="space-y-1">
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        ${this.msg['stockManagement.section.main.title'] ?? ''}
      </h1>
    </header>

    <section class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          ${this.msg['stockManagement.organism.browseStockItems.title'] ?? ''}
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ${this.msg['stockManagement.intentions.browseStockItems.queryList.title'] ?? ''}
        </p>
      </div>

      <div class="flex flex-col md:flex-row md:items-end gap-3">
        <label class="flex-1 text-sm text-slate-700 dark:text-slate-300">
          <span class="block mb-1">${this.msg['stockManagement.filters.searchTerm'] ?? ''}</span>
          <input
            class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
            type="text"
            .value=${this.browseStockItemsSearchTerm}
            @input=${this.handleBrowseStockItemsSearchTermChange}
          />
        </label>
        <button
          class="inline-flex items-center justify-center rounded-md bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white disabled:opacity-60"
          @click=${this.handleBrowseStockItemsClick}
          ?disabled=${this.browseStockItemsState === 'loading'}
        >
          ${this.msg['stockManagement.actions.browseStockItems'] ?? ''}
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left border border-slate-200 dark:border-slate-800">
          <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <tr>
              <th class="px-3 py-2 font-medium">${this.msg['stockManagement.fields.name'] ?? ''}</th>
              <th class="px-3 py-2 font-medium">${this.msg['stockManagement.fields.unit'] ?? ''}</th>
              <th class="px-3 py-2 font-medium">${this.msg['stockManagement.fields.minimumLevel'] ?? ''}</th>
              <th class="px-3 py-2 font-medium">${this.msg['stockManagement.fields.updatedAt'] ?? ''}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            ${items.length === 0
              ? html`<tr>
                  <td class="px-3 py-4 text-center text-slate-500 dark:text-slate-400" colspan="4">
                    ${this.msg['stockManagement.intentions.browseStockItems.queryList.empty'] ?? ''}
                  </td>
                </tr>`
              : items.map((item: CafeFlowBrowseStockItemsOutputItem) => html`
                  <tr class="text-slate-700 dark:text-slate-200">
                    <td class="px-3 py-2">${item.name}</td>
                    <td class="px-3 py-2">${item.unit}</td>
                    <td class="px-3 py-2">${item.minimumLevel}</td>
                    <td class="px-3 py-2">${item.updatedAt}</td>
                  </tr>
                `)}
          </tbody>
        </table>
      </div>
    </section>

    <section class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          ${this.msg['stockManagement.organism.manageStockItem.title'] ?? ''}
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ${this.msg['stockManagement.intentions.manageStockItem.form.title'] ?? ''}
        </p>
      </div>

      <form
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
        @submit=${(e: Event) => {
          e.preventDefault();
          void this.handleManageStockItemClick();
        }}
      >
        <label class="text-sm text-slate-700 dark:text-slate-300">
          <span class="block mb-1">${this.msg['stockManagement.fields.name'] ?? ''}</span>
          <input
            class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
            type="text"
            .value=${this.manageStockItemName}
            @input=${this.handleManageStockItemNameChange}
            required
          />
        </label>
        <label class="text-sm text-slate-700 dark:text-slate-300">
          <span class="block mb-1">${this.msg['stockManagement.fields.unit'] ?? ''}</span>
          <select
            class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
            .value=${this.manageStockItemUnit}
            @change=${this.handleManageStockItemUnitChange}
            required
          >
            <option value="">--</option>
            <option value="kg">kg</option>
            <option value="liter">liter</option>
            <option value="portion">portion</option>
            <option value="unit">unit</option>
          </select>
        </label>
        <label class="text-sm text-slate-700 dark:text-slate-300">
          <span class="block mb-1">${this.msg['stockManagement.fields.minimumLevel'] ?? ''}</span>
          <input
            class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
            type="number"
            .value=${this.manageStockItemMinimumLevel}
            @input=${this.handleManageStockItemMinimumLevelChange}
            required
          />
        </label>
        <div class="md:col-span-3">
          <button
            class="inline-flex items-center justify-center rounded-md bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-500 disabled:opacity-60"
            type="submit"
            ?disabled=${this.manageStockItemState === 'loading'}
          >
            ${this.msg['stockManagement.actions.manageStockItem'] ?? ''}
          </button>
        </div>
      </form>
    </section>

    <section class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          ${this.msg['stockManagement.intentions.manageStockItem.summary.title'] ?? ''}
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="rounded-md border border-slate-200 dark:border-slate-800 p-3">
          <div class="text-slate-500 dark:text-slate-400">${this.msg['stockManagement.fields.name'] ?? ''}</div>
          <div class="text-slate-900 dark:text-slate-100 font-medium">${this.manageStockItemName || '-'}</div>
        </div>
        <div class="rounded-md border border-slate-200 dark:border-slate-800 p-3">
          <div class="text-slate-500 dark:text-slate-400">${this.msg['stockManagement.fields.unit'] ?? ''}</div>
          <div class="text-slate-900 dark:text-slate-100 font-medium">${this.manageStockItemUnit || '-'}</div>
        </div>
        <div class="rounded-md border border-slate-200 dark:border-slate-800 p-3">
          <div class="text-slate-500 dark:text-slate-400">${this.msg['stockManagement.fields.minimumLevel'] ?? ''}</div>
          <div class="text-slate-900 dark:text-slate-100 font-medium">${this.manageStockItemMinimumLevel || '-'}</div>
        </div>
        <div class="rounded-md border border-slate-200 dark:border-slate-800 p-3">
          <div class="text-slate-500 dark:text-slate-400">${this.msg['stockManagement.fields.updatedAt'] ?? ''}</div>
          <div class="text-slate-900 dark:text-slate-100 font-medium">${this.LayoutSummaryManageStockItemUpdatedAt || '-'}</div>
        </div>
      </div>
    </section>
  </div>
</div>
`;
}
}
