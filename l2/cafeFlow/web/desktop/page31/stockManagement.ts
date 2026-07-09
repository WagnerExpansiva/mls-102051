/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

@customElement('cafe-flow--web--desktop--page31--stock-management-102051')
export class CafeFlowDesktopPage31StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const items = this.browseStockItemsData?.items ?? [];
    const total = this.browseStockItemsData?.total ?? 0;

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f8fafc)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <header class="space-y-1">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['stockManagement.section.workspace.title']}
            </h1>
          </header>

          <!-- Section: Visual board -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e2e8f0)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['stockManagement.section.visual.title']}
            </h2>

            <!-- Organism: Visual board -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#475569)]">
                ${this.msg['stockManagement.organism.visualBoard.title']}
              </h3>

              <!-- Filter + refresh toolbar -->
              <div class="flex flex-wrap items-end gap-3">
                <div class="flex-1 min-w-[200px]">
                  <label class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1">
                    ${this.msg['stockManagement.filter.searchTerm.label']}
                  </label>
                  <input
                    type="text"
                    .value="${this.browseStockItemsSearchTerm}"
                    @input="${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}"
                    class="w-full rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#2563eb)]"
                    placeholder="${this.msg['stockManagement.filter.searchTerm.label']}"
                  />
                </div>
                <button
                  type="button"
                  @click="${() => this.handleBrowseStockItemsClick()}"
                  ?disabled="${this.browseStockItemsState === 'loading'}"
                  class="rounded bg-[var(--active-color,#2563eb)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--active-color-hover,#1d4ed8)] disabled:opacity-50"
                >
                  ${this.msg['stockManagement.action.refreshList']}
                </button>
              </div>

              <!-- Visual board cards -->
              ${items.length === 0
                ? html`<p class="text-sm text-[var(--text-primary-color,#94a3b8)] py-4 text-center">
                    ${this.msg['stockManagement.intent.visualBoard.title']}
                  </p>`
                : html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${items.map((item) => {
                      const isLow = item.minimumLevel <= 0; /* TODO: compare with StockLevel when available */
                      return html`
                        <div
                          class="rounded-lg border p-3 space-y-2 ${isLow
                            ? 'border-[var(--warning-color,#f59e0b)] bg-[var(--warning-color,#f59e0b)]/5'
                            : 'border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)]'}"
                        >
                          <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
                              ${this.msg['stockManagement.field.name.label']}: ${item.name}
                            </span>
                            ${isLow
                              ? html`<span class="text-xs font-medium text-[var(--warning-color,#b45309)] bg-[var(--warning-color,#fef3c7)]/30 px-2 py-0.5 rounded">⚠</span>`
                              : ''}
                          </div>
                          <div class="text-xs text-[var(--text-primary-color,#64748b)] space-y-0.5">
                            <div>${this.msg['stockManagement.field.unit.label']}: ${item.unit}</div>
                            <div>${this.msg['stockManagement.field.minimumLevel.label']}: ${item.minimumLevel}</div>
                            <div>${this.msg['stockManagement.field.updatedAt.label']}: ${item.updatedAt}</div>
                          </div>
                        </div>
                      `;
                    })}
                  </div>`}
            </div>

            <!-- Organism: Fallback list -->
            <div class="space-y-3 border-t border-[var(--grey-color,#e2e8f0)] pt-4">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#475569)]">
                ${this.msg['stockManagement.organism.fallbackList.title']}
              </h3>
              ${items.length === 0
                ? html`<p class="text-sm text-[var(--text-primary-color,#94a3b8)] py-2 text-center">
                    ${this.msg['stockManagement.intent.fallbackList.title']}
                  </p>`
                : html`<div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead>
                        <tr class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-xs text-[var(--text-primary-color,#64748b)]">
                          <th class="py-2 px-3 font-medium">${this.msg['stockManagement.field.name.label']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['stockManagement.field.unit.label']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['stockManagement.field.minimumLevel.label']}</th>
                          <th class="py-2 px-3 font-medium">${this.msg['stockManagement.field.updatedAt.label']}</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${items.map((item) => html`
                          <tr class="border-b border-[var(--grey-color,#e2e8f0)] text-[var(--text-primary-color,#0f172a)]">
                            <td class="py-2 px-3">${item.name}</td>
                            <td class="py-2 px-3">${item.unit}</td>
                            <td class="py-2 px-3">${item.minimumLevel}</td>
                            <td class="py-2 px-3">${item.updatedAt}</td>
                          </tr>
                        `)}
                      </tbody>
                    </table>
                  </div>`}
              <p class="text-xs text-[var(--text-primary-color,#94a3b8)]">${total} ${this.msg['stockManagement.intent.fallbackList.title']}</p>
            </div>
          </section>

          <!-- Section: Detail panel -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e2e8f0)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['stockManagement.section.detailPanel.title']}
            </h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <!-- Organism: Visual summary -->
              <div class="space-y-3">
                <h3 class="text-sm font-medium text-[var(--text-primary-color,#475569)]">
                  ${this.msg['stockManagement.organism.visualSummary.title']}
                </h3>
                ${items.length > 0
                  ? html`<dl class="space-y-2 text-sm">
                      <div class="flex justify-between border-b border-[var(--grey-color,#e2e8f0)] pb-1">
                        <dt class="text-[var(--text-primary-color,#64748b)]">${this.msg['stockManagement.field.name.label']}</dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)] font-medium">${items[0].name}</dd>
                      </div>
                      <div class="flex justify-between border-b border-[var(--grey-color,#e2e8f0)] pb-1">
                        <dt class="text-[var(--text-primary-color,#64748b)]">${this.msg['stockManagement.field.unit.label']}</dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)] font-medium">${items[0].unit}</dd>
                      </div>
                      <div class="flex justify-between border-b border-[var(--grey-color,#e2e8f0)] pb-1">
                        <dt class="text-[var(--text-primary-color,#64748b)]">${this.msg['stockManagement.field.minimumLevel.label']}</dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)] font-medium">${items[0].minimumLevel}</dd>
                      </div>
                      <div class="flex justify-between border-b border-[var(--grey-color,#e2e8f0)] pb-1">
                        <dt class="text-[var(--text-primary-color,#64748b)]">${this.msg['stockManagement.field.updatedAt.label']}</dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)] font-medium">${items[0].updatedAt}</dd>
                      </div>
                    </dl>`
                  : html`<p class="text-sm text-[var(--text-primary-color,#94a3b8)] py-2">
                      ${this.msg['stockManagement.intent.visualSummary.title']}
                    </p>`}
              </div>

              <!-- Organism: Visual editor (commandForm) -->
              <div class="space-y-3">
                <h3 class="text-sm font-medium text-[var(--text-primary-color,#475569)]">
                  ${this.msg['stockManagement.organism.visualEditor.title']}
                </h3>
                <form class="space-y-3" @submit="${(e: Event) => { e.preventDefault(); this.handleManageStockItemClick(); }}">
                  <div>
                    <label class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1">
                      ${this.msg['stockManagement.field.name.label']}
                    </label>
                    <input
                      type="text"
                      .value="${this.manageStockItemName}"
                      @input="${(e: Event) => this.handleManageStockItemNameChange(e)}"
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#2563eb)]"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1">
                      ${this.msg['stockManagement.field.unit.label']}
                    </label>
                    <select
                      .value="${this.manageStockItemUnit}"
                      @change="${(e: Event) => this.handleManageStockItemUnitChange(e)}"
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#2563eb)]"
                    >
                      <option value="">—</option>
                      <option value="kg" ?selected="${this.manageStockItemUnit === 'kg'}">kg</option>
                      <option value="liter" ?selected="${this.manageStockItemUnit === 'liter'}">liter</option>
                      <option value="portion" ?selected="${this.manageStockItemUnit === 'portion'}">portion</option>
                      <option value="unit" ?selected="${this.manageStockItemUnit === 'unit'}">unit</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1">
                      ${this.msg['stockManagement.field.minimumLevel.label']}
                    </label>
                    <input
                      type="number"
                      .value="${this.manageStockItemMinimumLevel}"
                      @input="${(e: Event) => this.handleManageStockItemMinimumLevelChange(e)}"
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#2563eb)]"
                    />
                  </div>
                  <button
                    type="submit"
                    ?disabled="${this.manageStockItemState === 'loading'}"
                    class="rounded bg-[var(--active-color,#2563eb)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--active-color-hover,#1d4ed8)] disabled:opacity-50"
                  >
                    ${this.msg['stockManagement.action.save']}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
