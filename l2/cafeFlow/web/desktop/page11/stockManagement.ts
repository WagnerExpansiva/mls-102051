/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

@customElement('cafe-flow--web--desktop--page11--stock-management-102051')
export class CafeFlowDesktopPage11StockManagementPage extends CafeFlowStockManagementBase {
  render(): unknown {
    const items = this.browseStockItemsData?.items ?? [];
    const total = this.browseStockItemsData?.total ?? 0;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <header class="space-y-1">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['stockManagement.section.workspace.title']}
            </h1>
          </header>

          <!-- Section: workspace -->
          <section class="space-y-6">
            <!-- Organism: StockList (queryList) -->
            <div class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] shadow-sm">
              <div class="px-5 py-4 border-b border-[var(--grey-color,#e2e8f0)]">
                <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['stockManagement.organism.stockList.title']}
                </h2>
                <p class="text-sm text-[var(--text-primary-color-lighter,#64748b)] mt-1">
                  ${this.msg['stockManagement.intent.stockList.title']}
                </p>
              </div>

              <!-- Toolbar / filters -->
              <div class="px-5 py-4 flex flex-wrap items-end gap-4 border-b border-[var(--grey-color,#e2e8f0)]">
                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >${this.msg['stockManagement.filter.searchTerm.label']}</label
                  >
                  <input
                    type="text"
                    .value="${this.browseStockItemsSearchTerm}"
                    @input="${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}"
                    class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--active-color,#1890ff)]"
                    placeholder="${this.msg['stockManagement.filter.searchTerm.label']}"
                  />
                </div>
                <button
                  type="button"
                  @click="${() => this.handleBrowseStockItemsClick()}"
                  ?disabled="${this.browseStockItemsState === 'loading'}"
                  class="px-4 py-2 rounded-md bg-[var(--active-color,#1890ff)] text-white font-medium hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ${this.browseStockItemsState === 'loading'
                    ? '…'
                    : this.msg['stockManagement.action.refreshList']}
                </button>
              </div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-[var(--grey-color,#e2e8f0)] text-left">
                      <th class="px-5 py-3 font-semibold text-[var(--text-primary-color,#0f172a)]">
                        ${this.msg['stockManagement.field.name.label']}
                      </th>
                      <th class="px-5 py-3 font-semibold text-[var(--text-primary-color,#0f172a)]">
                        ${this.msg['stockManagement.field.unit.label']}
                      </th>
                      <th class="px-5 py-3 font-semibold text-[var(--text-primary-color,#0f172a)]">
                        ${this.msg['stockManagement.field.minimumLevel.label']}
                      </th>
                      <th class="px-5 py-3 font-semibold text-[var(--text-primary-color,#0f172a)]">
                        ${this.msg['stockManagement.field.updatedAt.label']}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items.length === 0
                      ? html`
                          <tr>
                            <td
                              colspan="4"
                              class="px-5 py-8 text-center text-[var(--text-primary-color-lighter,#64748b)]"
                            >
                              ${this.msg['stockManagement.intent.stockList.title']}
                            </td>
                          </tr>
                        `
                      : items.map(
                          (item) => html`
                            <tr
                              class="border-b border-[var(--grey-color,#e2e8f0)] last:border-0 hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]"
                            >
                              <td class="px-5 py-3 text-[var(--text-primary-color,#0f172a)]">
                                ${item.name}
                              </td>
                              <td class="px-5 py-3 text-[var(--text-primary-color,#0f172a)]">
                                ${item.unit}
                              </td>
                              <td class="px-5 py-3 text-[var(--text-primary-color,#0f172a)]">
                                ${item.minimumLevel}
                              </td>
                              <td class="px-5 py-3 text-[var(--text-primary-color-lighter,#64748b)]">
                                ${item.updatedAt}
                              </td>
                            </tr>
                          `,
                        )}
                  </tbody>
                </table>
              </div>

              ${total > 0
                ? html`
                    <div
                      class="px-5 py-3 text-sm text-[var(--text-primary-color-lighter,#64748b)] border-t border-[var(--grey-color,#e2e8f0)]"
                    >
                      ${total}
                    </div>
                  `
                : null}
            </div>

            <!-- Organism: StockItemEditor (commandForm) -->
            <div
              class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] shadow-sm"
            >
              <div class="px-5 py-4 border-b border-[var(--grey-color,#e2e8f0)]">
                <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['stockManagement.organism.stockItemEditor.title']}
                </h2>
                <p class="text-sm text-[var(--text-primary-color-lighter,#64748b)] mt-1">
                  ${this.msg['stockManagement.intent.stockEdit.title']}
                </p>
              </div>

              <form
                class="px-5 py-4 space-y-4"
                @submit="${(e: Event) => {
                  e.preventDefault();
                  this.handleManageStockItemClick();
                }}"
              >
                <!-- name -->
                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >${this.msg['stockManagement.field.name.label']}</label
                  >
                  <input
                    type="text"
                    .value="${this.manageStockItemName}"
                    @input="${(e: Event) => this.handleManageStockItemNameChange(e)}"
                    class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--active-color,#1890ff)]"
                  />
                </div>

                <!-- unit -->
                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >${this.msg['stockManagement.field.unit.label']}</label
                  >
                  <select
                    .value="${this.manageStockItemUnit}"
                    @change="${(e: Event) => this.handleManageStockItemUnitChange(e)}"
                    class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--active-color,#1890ff)]"
                  >
                    <option value="" ?selected="${this.manageStockItemUnit === ''}"></option>
                    <option value="kg" ?selected="${this.manageStockItemUnit === 'kg'}">kg</option>
                    <option value="liter" ?selected="${this.manageStockItemUnit === 'liter'}">
                      liter
                    </option>
                    <option value="portion" ?selected="${this.manageStockItemUnit === 'portion'}">
                      portion
                    </option>
                    <option value="unit" ?selected="${this.manageStockItemUnit === 'unit'}">
                      unit
                    </option>
                  </select>
                </div>

                <!-- minimumLevel -->
                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >${this.msg['stockManagement.field.minimumLevel.label']}</label
                  >
                  <input
                    type="number"
                    .value="${this.manageStockItemMinimumLevel}"
                    @input="${(e: Event) => this.handleManageStockItemMinimumLevelChange(e)}"
                    class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--active-color,#1890ff)]"
                  />
                </div>

                <!-- Submit -->
                <div class="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    ?disabled="${this.manageStockItemState === 'loading'}"
                    class="px-4 py-2 rounded-md bg-[var(--active-color,#1890ff)] text-white font-medium hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ${this.manageStockItemState === 'loading'
                      ? '…'
                      : this.msg['stockManagement.action.save']}
                  </button>
                  ${this.manageStockItemState === 'error'
                    ? html`<span class="text-sm text-[var(--error-color,#FF4D4F)]">⚠</span>`
                    : null}
                  ${this.manageStockItemState === 'success'
                    ? html`<span class="text-sm text-[var(--success-color,#52C41A)]">✓</span>`
                    : null}
                </div>
              </form>
            </div>

            <!-- Organism: StockSummary (summary) -->
            <div
              class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] shadow-sm"
            >
              <div class="px-5 py-4 border-b border-[var(--grey-color,#e2e8f0)]">
                <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['stockManagement.organism.stockSummary.title']}
                </h2>
                <p class="text-sm text-[var(--text-primary-color-lighter,#64748b)] mt-1">
                  ${this.msg['stockManagement.intent.stockSummary.title']}
                </p>
              </div>

              ${items.length > 0
                ? html`
                    <dl class="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-sm font-medium text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['stockManagement.field.name.label']}
                        </dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">
                          ${items[0].name}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-sm font-medium text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['stockManagement.field.unit.label']}
                        </dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">
                          ${items[0].unit}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-sm font-medium text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['stockManagement.field.minimumLevel.label']}
                        </dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">
                          ${items[0].minimumLevel}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-sm font-medium text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['stockManagement.field.updatedAt.label']}
                        </dt>
                        <dd class="text-sm text-[var(--text-primary-color-lighter,#64748b)]">
                          ${items[0].updatedAt}
                        </dd>
                      </div>
                    </dl>
                  `
                : html`
                    <div
                      class="px-5 py-8 text-center text-sm text-[var(--text-primary-color-lighter,#64748b)]"
                    >
                      ${this.msg['stockManagement.intent.stockSummary.title']}
                    </div>
                  `}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
