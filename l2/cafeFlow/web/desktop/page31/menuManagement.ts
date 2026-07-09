/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { CafeFlowBrowseMenuItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

@customElement('cafe-flow--web--desktop--page31--menu-management-102051')
export class CafeFlowDesktopPage31MenuManagementPage extends CafeFlowMenuManagementBase {

  render() {
    const items: CafeFlowBrowseMenuItemsOutputItem[] = this.browseMenuItemsData?.items ?? [];
    const total: number = this.browseMenuItemsData?.total ?? 0;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">

          <!-- Page header -->
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['menuManagement.cards.title']}
          </h1>

          <!-- ── Section s10_cards ─────────────────────────────── -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['menuManagement.cards.list.title']}
            </h2>

            <!-- Organism o10_cards -->

            <!-- Intention i10_context – workflowStatus / business context badge -->
            <div
              class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-3"
            >
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-2">
                ${this.msg['menuManagement.context.title']}
              </h3>
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center rounded px-2 py-1 text-xs font-medium bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.activeCompanyId || '—'}
                </span>
              </div>
            </div>

            <!-- Intention i20_query – queryList -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.cards.query.title']}
              </h3>

              <!-- Filters + toolbar -->
              <div class="flex flex-wrap items-end gap-3">
                <div class="flex flex-col gap-1">
                  <label
                    class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    for="filter-status"
                  >
                    ${this.msg['menuManagement.filter.status']}
                  </label>
                  <select
                    id="filter-status"
                    class="rounded border border-[var(--grey-color,#E6E6E6)] px-2 py-1 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.browseMenuItemsStatusFilter}"
                    @change="${(e: Event) => this.handleBrowseMenuItemsStatusFilterChange(e)}"
                  >
                    <option value="">—</option>
                    <option value="draft">draft</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>

                <div class="flex flex-col gap-1">
                  <label
                    class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    for="filter-category"
                  >
                    ${this.msg['menuManagement.filter.menuCategory']}
                  </label>
                  <input
                    id="filter-category"
                    type="text"
                    class="rounded border border-[var(--grey-color,#E6E6E6)] px-2 py-1 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.browseMenuItemsMenuCategoryIdFilter}"
                    @input="${(e: Event) => this.handleBrowseMenuItemsMenuCategoryIdFilterChange(e)}"
                  />
                </div>

                <button
                  type="button"
                  class="rounded px-3 py-1 text-sm font-medium bg-[var(--active-color,#1890FF)] text-white hover:opacity-90"
                  @click="${() => this.handleBrowseMenuItemsClick()}"
                >
                  ${this.msg['menuManagement.action.refresh']}
                </button>
              </div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                        ${this.msg['menuManagement.menuItem.name']}
                      </th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                        ${this.msg['menuManagement.menuItem.menuCategoryId']}
                      </th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                        ${this.msg['menuManagement.menuItem.price']}
                      </th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                        ${this.msg['menuManagement.menuItem.status']}
                      </th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items.length === 0
                      ? html`<tr>
                          <td
                            colspan="5"
                            class="py-4 text-center text-[var(--text-primary-color-lighter,#535353)]"
                          >
                            —
                          </td>
                        </tr>`
                      : items.map(
                          (item: CafeFlowBrowseMenuItemsOutputItem) => html`
                            <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                ${item.name}
                              </td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                ${item.menuCategoryId}
                              </td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                ${item.price}
                              </td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                ${item.status}
                              </td>
                              <td class="py-2 px-3">
                                <button
                                  type="button"
                                  class="rounded px-2 py-1 text-xs font-medium bg-[var(--active-color,#1890FF)] text-white hover:opacity-90"
                                  @click="${() => this.handleManageMenuItemClick()}"
                                >
                                  ${this.msg['menuManagement.action.manage']}
                                </button>
                              </td>
                            </tr>
                          `,
                        )}
                  </tbody>
                </table>
              </div>

              ${total > 0
                ? html`<p class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                    ${total}
                  </p>`
                : ''}
            </div>

            <!-- Intention i30_summary – summary -->
            <div
              class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-3"
            >
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-2">
                ${this.msg['menuManagement.cards.summary.title']}
              </h3>
              ${items.length > 0
                ? html`
                    <dl class="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                          ${this.msg['menuManagement.menuItem.status']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#403f3f)]">
                          ${items[0]!.status}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                          ${this.msg['menuManagement.menuItem.itemType']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#403f3f)]">
                          ${items[0]!.itemType}
                        </dd>
                      </div>
                      <div>
                        <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                          ${this.msg['menuManagement.menuItem.updatedAt']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#403f3f)]">
                          ${items[0]!.updatedAt}
                        </dd>
                      </div>
                    </dl>
                  `
                : html`<p class="text-xs text-[var(--text-primary-color-lighter,#535353)]">—</p>`}
            </div>
          </section>

          <!-- ── Section s20_detail ────────────────────────────── -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['menuManagement.detail.title']}
            </h2>

            <!-- Organism o20_manage -->

            <!-- Intention i40_status – workflowStatus -->
            <div
              class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-3"
            >
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-2">
                ${this.msg['menuManagement.detail.status.title']}
              </h3>
              <dl class="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                    ${this.msg['menuManagement.menuItem.status']}
                  </dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">
                    ${this.manageMenuItemStatus || '—'}
                  </dd>
                </div>
                <div>
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                    ${this.msg['menuManagement.menuItem.activatedAt']}
                  </dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">
                    ${this.LayoutWs20ActivatedAt || '—'}
                  </dd>
                </div>
                <div>
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                    ${this.msg['menuManagement.menuItem.inactivatedAt']}
                  </dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">
                    ${this.LayoutWs30InactivatedAt || '—'}
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Intention i50_edit – commandForm -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.detail.edit.title']}
              </h3>

              <form
                @submit="${(e: Event) => {
                  e.preventDefault();
                  this.handleManageMenuItemClick();
                }}"
                class="space-y-3"
              >
                <!-- name -->
                <div class="flex flex-col gap-1">
                  <label
                    class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    for="f-name"
                  >
                    ${this.msg['menuManagement.menuItem.name']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    required
                    class="rounded border border-[var(--grey-color,#E6E6E6)] px-2 py-1 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemName}"
                    @input="${(e: Event) => this.handleManageMenuItemNameChange(e)}"
                  />
                </div>

                <!-- description -->
                <div class="flex flex-col gap-1">
                  <label
                    class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    for="f-desc"
                  >
                    ${this.msg['menuManagement.menuItem.description']}
                  </label>
                  <textarea
                    id="f-desc"
                    rows="3"
                    class="rounded border border-[var(--grey-color,#E6E6E6)] px-2 py-1 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemDescription}"
                    @input="${(e: Event) => this.handleManageMenuItemDescriptionChange(e)}"
                  ></textarea>
                </div>

                <!-- menuCategoryId -->
                <div class="flex flex-col gap-1">
                  <label
                    class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    for="f-cat"
                  >
                    ${this.msg['menuManagement.menuItem.menuCategoryId']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </label>
                  <input
                    id="f-cat"
                    type="text"
                    required
                    class="rounded border border-[var(--grey-color,#E6E6E6)] px-2 py-1 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemMenuCategoryId}"
                    @input="${(e: Event) => this.handleManageMenuItemMenuCategoryIdChange(e)}"
                  />
                </div>

                <!-- price -->
                <div class="flex flex-col gap-1">
                  <label
                    class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    for="f-price"
                  >
                    ${this.msg['menuManagement.menuItem.price']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </label>
                  <input
                    id="f-price"
                    type="number"
                    step="0.01"
                    required
                    class="rounded border border-[var(--grey-color,#E6E6E6)] px-2 py-1 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemPrice}"
                    @input="${(e: Event) => this.handleManageMenuItemPriceChange(e)}"
                  />
                </div>

                <!-- itemType -->
                <div class="flex flex-col gap-1">
                  <label
                    class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    for="f-type"
                  >
                    ${this.msg['menuManagement.menuItem.itemType']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </label>
                  <select
                    id="f-type"
                    required
                    class="rounded border border-[var(--grey-color,#E6E6E6)] px-2 py-1 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemItemType}"
                    @change="${(e: Event) => this.handleManageMenuItemItemTypeChange(e)}"
                  >
                    <option value="">—</option>
                    <option value="simple">simple</option>
                    <option value="variant">variant</option>
                  </select>
                </div>

                <!-- status -->
                <div class="flex flex-col gap-1">
                  <label
                    class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    for="f-status"
                  >
                    ${this.msg['menuManagement.menuItem.status']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </label>
                  <select
                    id="f-status"
                    required
                    class="rounded border border-[var(--grey-color,#E6E6E6)] px-2 py-1 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemStatus}"
                    @change="${(e: Event) => this.handleManageMenuItemStatusChange(e)}"
                  >
                    <option value="">—</option>
                    <option value="draft">draft</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>

                <!-- Submit -->
                <div>
                  <button
                    type="submit"
                    class="rounded px-4 py-2 text-sm font-medium bg-[var(--active-color,#1890FF)] text-white hover:opacity-90"
                    ?disabled="${this.manageMenuItemState === 'loading'}"
                  >
                    ${this.msg['menuManagement.action.save']}
                  </button>
                </div>
              </form>
            </div>

            <!-- Intention i60_review – summary -->
            <div
              class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-3"
            >
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-2">
                ${this.msg['menuManagement.detail.review.title']}
              </h3>
              <dl class="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                <div>
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                    ${this.msg['menuManagement.menuItem.name']}
                  </dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">
                    ${this.manageMenuItemName || '—'}
                  </dd>
                </div>
                <div>
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                    ${this.msg['menuManagement.menuItem.menuCategoryId']}
                  </dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">
                    ${this.manageMenuItemMenuCategoryId || '—'}
                  </dd>
                </div>
                <div>
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                    ${this.msg['menuManagement.menuItem.price']}
                  </dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">
                    ${this.manageMenuItemPrice || '—'}
                  </dd>
                </div>
                <div>
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                    ${this.msg['menuManagement.menuItem.status']}
                  </dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">
                    ${this.manageMenuItemStatus || '—'}
                  </dd>
                </div>
                <div>
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                    ${this.msg['menuManagement.menuItem.updatedAt']}
                  </dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">
                    ${this.LayoutR50UpdatedAt || '—'}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

        </div>
      </div>
    `;
  }
}
