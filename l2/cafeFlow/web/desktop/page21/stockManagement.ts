/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

@customElement('cafe-flow--web--desktop--page21--stock-management-102051')
export class CafeFlowDesktopPage21StockManagementPage extends CafeFlowStockManagementBase {
  render(): unknown {
    const items = this.browseStockItemsData?.items ?? [];
    const total = this.browseStockItemsData?.total ?? 0;
    const selectedItem = items.length > 0 ? items[0] : null;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <header class="space-y-1">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['stockManagement.section.workspace.title']}
            </h1>
          </header>

          <!-- Section: Queue (queryList) -->
          <section class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['stockManagement.section.queue.title']}
            </h2>

            <div class="space-y-1">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['stockManagement.organism.stockQueue.title']}
              </h3>
              <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['stockManagement.intent.queueList.title']}
              </p>
            </div>

            <!-- Filter + toolbar -->
            <div class="flex flex-wrap items-end gap-3">
              <div class="flex-1 min-w-[200px] space-y-1">
                <label class="block text-sm text-[var(--text-primary-color,#403f3f)]" for="filter-searchTerm">
                  ${this.msg['stockManagement.filter.searchTerm.label']}
                </label>
                <input
                  id="filter-searchTerm"
                  type="text"
                  .value="${this.browseStockItemsSearchTerm}"
                  @input="${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}"
                  class="w-full rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
                />
              </div>
              <button
                type="button"
                ?disabled="${this.browseStockItemsState === 'loading'}"
                @click="${() => this.handleBrowseStockItemsClick()}"
                class="rounded bg-[var(--active-color,#1890ff)] px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
              >
                ${this.msg['stockManagement.action.refreshList']}
              </button>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr class="border-b border-[var(--grey-color,#e6e6e6)] text-left">
                    <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['stockManagement.field.name.label']}</th>
                    <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['stockManagement.field.unit.label']}</th>
                    <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['stockManagement.field.minimumLevel.label']}</th>
                    <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['stockManagement.field.updatedAt.label']}</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.length === 0
                    ? html`<tr><td colspan="4" class="py-6 text-center text-[var(--text-primary-color-lighter,#535353)]">—</td></tr>`
                    : items.map((item) => html`
                      <tr class="border-b border-[var(--grey-color,#e6e6e6)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]">
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.name}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.unit}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.minimumLevel}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color-lighter,#535353)]">${item.updatedAt}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>

            <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
              ${total} ${total === 1 ? 'item' : 'itens'}
            </div>
          </section>

          <!-- Section: Action panel -->
          <section class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['stockManagement.section.actionPanel.title']}
            </h2>

            <!-- Summary organism -->
            <div class="space-y-2">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['stockManagement.organism.selectedStatus.title']}
              </h3>
              <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['stockManagement.intent.queueSummary.title']}
              </p>

              ${selectedItem
                ? html`
                  <dl class="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)] p-3">
                    <div>
                      <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['stockManagement.field.name.label']}</dt>
                      <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${selectedItem.name}</dd>
                    </div>
                    <div>
                      <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['stockManagement.field.unit.label']}</dt>
                      <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${selectedItem.unit}</dd>
                    </div>
                    <div>
                      <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['stockManagement.field.minimumLevel.label']}</dt>
                      <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${selectedItem.minimumLevel}</dd>
                    </div>
                    <div>
                      <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['stockManagement.field.updatedAt.label']}</dt>
                      <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${selectedItem.updatedAt}</dd>
                    </div>
                  </dl>
                `
                : html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-2">—</p>`}
            </div>

            <!-- Edit form organism -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['stockManagement.organism.stockQueueEditor.title']}
              </h3>
              <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['stockManagement.intent.queueEdit.title']}
              </p>

              <form @submit="${(e: Event) => { e.preventDefault(); this.handleManageStockItemClick(); }}" class="space-y-3">
                <!-- Name -->
                <div class="space-y-1">
                  <label class="block text-sm text-[var(--text-primary-color,#403f3f)]" for="field-name">
                    ${this.msg['stockManagement.field.name.label']}
                  </label>
                  <input
                    id="field-name"
                    type="text"
                    .value="${this.manageStockItemName}"
                    @input="${(e: Event) => this.handleManageStockItemNameChange(e)}"
                    class="w-full rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
                  />
                </div>

                <!-- Unit -->
                <div class="space-y-1">
                  <label class="block text-sm text-[var(--text-primary-color,#403f3f)]" for="field-unit">
                    ${this.msg['stockManagement.field.unit.label']}
                  </label>
                  <select
                    id="field-unit"
                    .value="${this.manageStockItemUnit}"
                    @change="${(e: Event) => this.handleManageStockItemUnitChange(e)}"
                    class="w-full rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
                  >
                    <option value="" ?selected="${this.manageStockItemUnit === ''}">—</option>
                    <option value="kg" ?selected="${this.manageStockItemUnit === 'kg'}">kg</option>
                    <option value="liter" ?selected="${this.manageStockItemUnit === 'liter'}">liter</option>
                    <option value="portion" ?selected="${this.manageStockItemUnit === 'portion'}">portion</option>
                    <option value="unit" ?selected="${this.manageStockItemUnit === 'unit'}">unit</option>
                  </select>
                </div>

                <!-- Minimum level -->
                <div class="space-y-1">
                  <label class="block text-sm text-[var(--text-primary-color,#403f3f)]" for="field-minimumLevel">
                    ${this.msg['stockManagement.field.minimumLevel.label']}
                  </label>
                  <input
                    id="field-minimumLevel"
                    type="number"
                    .value="${this.manageStockItemMinimumLevel}"
                    @input="${(e: Event) => this.handleManageStockItemMinimumLevelChange(e)}"
                    class="w-full rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
                  />
                </div>

                <!-- Submit -->
                <div class="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    ?disabled="${this.manageStockItemState === 'loading'}"
                    class="rounded bg-[var(--active-color,#1890ff)] px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  >
                    ${this.msg['stockManagement.action.save']}
                  </button>
                  ${this.manageStockItemState === 'loading'
                    ? html`<span class="text-sm text-[var(--text-primary-color-lighter,#535353)]">…</span>`
                    : null}
                  ${this.manageStockItemState === 'error'
                    ? html`<span class="text-sm text-[var(--error-color,#ff4d4f)]">⚠</span>`
                    : null}
                  ${this.manageStockItemState === 'success'
                    ? html`<span class="text-sm text-[var(--success-color,#52c41a)]">✓</span>`
                    : null}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
