/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';
import type { CafeFlowBrowseStockItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';

@customElement('cafe-flow--web--desktop--page21--stock-management-102051')
export class CafeFlowDesktopPage21StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const items: CafeFlowBrowseStockItemsOutputItem[] = this.browseStockItemsData?.items ?? [];
    const isBrowseLoading = this.browseStockItemsState === 'loading';
    const isManageLoading = this.manageStockItemState === 'loading';
    const isManageSuccess = this.manageStockItemState === 'success';
    const isManageError = this.manageStockItemState === 'error';
    const hasSelectedItem = this.manageStockItemStockItemId !== '';
    const output = this.manageStockItemOutput;

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.stockManagement.title']}
          </h1>

          <!-- Section: Stock Queue -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['section.stockQueue.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['org.stockQueueTable.title']}
            </p>

            <!-- Filter + toolbar -->
            <div class="flex items-center gap-3 flex-wrap">
              <input
                type="text"
                .value=${this.browseStockItemsSearchTerm}
                @input=${(e: Event) => this.handleBrowseStockItemsSearchTermChange(e)}
                placeholder=${this.msg['field.searchTerm.label']}
                class="flex-1 min-w-[200px] rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
              />
              <button
                @click=${(e: Event) => this.handleBrowseStockItemsClick(e)}
                ?disabled=${isBrowseLoading}
                class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)] disabled:opacity-50"
              >
                ${isBrowseLoading ? '...' : this.msg['action.refresh.label']}
              </button>
            </div>

            <!-- Table or empty / loading -->
            ${isBrowseLoading
              ? html`<div
                  class="py-8 text-center text-sm text-[var(--text-primary-color-lighter,#535353)]"
                >
                  Carregando...
                </div>`
              : items.length === 0
                ? html`<div
                    class="py-8 text-center text-sm text-[var(--text-primary-color-lighter,#535353)]"
                  >
                    ${this.msg['empty.stockQueue']}
                  </div>`
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#E6E6E6)] text-left text-[var(--text-primary-color-lighter,#535353)]"
                          >
                            <th class="py-2 px-2 font-medium">
                              ${this.msg['field.stockItemId.label']}
                            </th>
                            <th class="py-2 px-2 font-medium">
                              ${this.msg['field.name.label']}
                            </th>
                            <th class="py-2 px-2 font-medium">
                              ${this.msg['field.unit.label']}
                            </th>
                            <th class="py-2 px-2 font-medium">
                              ${this.msg['field.minimumLevel.label']}
                            </th>
                            <th class="py-2 px-2 font-medium">
                              ${this.msg['field.createdAt.label']}
                            </th>
                            <th class="py-2 px-2 font-medium">
                              ${this.msg['field.updatedAt.label']}
                            </th>
                            <th class="py-2 px-2 font-medium"></th>
                          </tr>
                        </thead>
                        <tbody>
                          ${items.map(
                            (item: CafeFlowBrowseStockItemsOutputItem) => html`
                              <tr
                                class="border-b border-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)]"
                              >
                                <td class="py-2 px-2">${item.stockItemId}</td>
                                <td class="py-2 px-2">${item.name}</td>
                                <td class="py-2 px-2">${item.unit}</td>
                                <td class="py-2 px-2">${item.minimumLevel}</td>
                                <td class="py-2 px-2">${item.createdAt}</td>
                                <td class="py-2 px-2">${item.updatedAt}</td>
                                <td class="py-2 px-2">
                                  <button
                                    @click=${() => {
                                      this.setManageStockItemStockItemId(
                                        item.stockItemId,
                                      );
                                      this.setManageStockItemName(item.name);
                                      this.setManageStockItemUnit(item.unit);
                                      this.setManageStockItemMinimumLevel(
                                        String(item.minimumLevel),
                                      );
                                    }}
                                    class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-2 py-1 text-xs text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]"
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

          <!-- Section: Manage Stock Item -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['section.manageStockItem.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['org.manageStockItemForm.title']}
            </p>

            ${!hasSelectedItem
              ? html`<div
                  class="py-4 text-center text-sm text-[var(--text-primary-color-lighter,#535353)]"
                >
                  ${this.msg['empty.noItemSelected']}
                </div>`
              : html`
                  <form
                    @submit=${(e: Event) => {
                      e.preventDefault();
                      this.handleManageStockItemClick(e);
                    }}
                    class="space-y-4"
                  >
                    <input
                      type="hidden"
                      .value=${this.manageStockItemStockItemId}
                    />
                    <div>
                      <label
                        class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.name.label']}
                      </label>
                      <input
                        type="text"
                        .value=${this.manageStockItemName}
                        @input=${(e: Event) =>
                          this.handleManageStockItemNameChange(e)}
                        class="w-full rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                      >
                        ${this.msg['field.unit.label']}
                      </label>
                      <select
                        @change=${(e: Event) =>
                          this.handleManageStockItemUnitChange(e)}
                        class="w-full rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                      >
                        <option
                          value="kg"
                          ?selected=${this.manageStockItemUnit === 'kg'}
                        >
                          kg
                        </option>
                        <option
                          value="liter"
                          ?selected=${this.manageStockItemUnit === 'liter'}
                        >
                          liter
                        </option>
                        <option
                          value="portion"
                          ?selected=${this.manageStockItemUnit === 'portion'}
                        >
                          portion
                        </option>
                        <option
                          value="unit"
                          ?selected=${this.manageStockItemUnit === 'unit'}
                        >
                          unit
                        </option>
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
                        .value=${this.manageStockItemMinimumLevel}
                        @input=${(e: Event) =>
                          this.handleManageStockItemMinimumLevelChange(e)}
                        class="w-full rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                      />
                    </div>
                    <button
                      type="submit"
                      ?disabled=${isManageLoading}
                      class="rounded-md px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                    >
                      ${isManageLoading
                        ? '...'
                        : this.msg['action.manageStockItem.label']}
                    </button>
                  </form>
                `}

            <!-- Feedback region -->
            ${isManageSuccess
              ? html`<div
                  class="rounded-md p-3 text-sm text-[var(--bg-primary-color,#ffffff)] bg-[var(--success-color,#52C41A)]"
                >
                  ${this.msg['action.manageStockItem.success']}
                </div>`
              : isManageError
                ? html`<div
                    class="rounded-md p-3 text-sm text-[var(--bg-primary-color,#ffffff)] bg-[var(--error-color,#FF4D4F)]"
                  >
                    ${this.manageStockItemError ||
                    this.msg['action.manageStockItem.error']}
                  </div>`
                : null}
          </section>

          <!-- Section: Review -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['section.review.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['org.reviewSummary.title']}
            </p>

            ${output
              ? html`
                  <dl class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <dt
                        class="text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['field.stockItemId.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${output.stockItemId}
                      </dd>
                    </div>
                    <div class="flex justify-between">
                      <dt
                        class="text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['field.name.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${output.name}
                      </dd>
                    </div>
                    <div class="flex justify-between">
                      <dt
                        class="text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['field.unit.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${output.unit}
                      </dd>
                    </div>
                    <div class="flex justify-between">
                      <dt
                        class="text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['field.minimumLevel.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${output.minimumLevel}
                      </dd>
                    </div>
                    <div class="flex justify-between">
                      <dt
                        class="text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['field.updatedAt.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${output.updatedAt}
                      </dd>
                    </div>
                  </dl>
                `
              : html`<div
                  class="py-4 text-center text-sm text-[var(--text-primary-color-lighter,#535353)]"
                >
                  ${this.msg['empty.noActionsYet']}
                </div>`}
          </section>
        </div>
      </div>
    `;
  }
}
