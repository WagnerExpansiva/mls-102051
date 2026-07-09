/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { CafeFlowBrowseMenuItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

@customElement('cafe-flow--web--desktop--page21--menu-management-102051')
export class CafeFlowDesktopPage21MenuManagementPage extends CafeFlowMenuManagementBase {
  render(): TemplateResult {
    const items: CafeFlowBrowseMenuItemsOutputItem[] = this.browseMenuItemsData?.items ?? [];

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">

          <!-- Page header -->
          <header class="space-y-1">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['menuManagement.board.title']}
            </h1>
          </header>

          <!-- Section: Board -->
          <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['menuManagement.board.lanes.title']}
            </h2>

            <!-- i10_context: workflowStatus / business context -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color,#E6E6E6)] p-3">
              <p class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">
                ${this.msg['menuManagement.context.title']}
              </p>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center rounded px-2 py-1 text-xs font-medium bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] border border-[var(--grey-color,#E6E6E6)]">
                  ${this.activeCompanyId || '—'}
                </span>
              </div>
            </div>

            <!-- i20_query: queryList -->
            <div class="space-y-3">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.board.query.title']}
              </h3>

              <!-- Filters -->
              <div class="flex flex-wrap items-end gap-3">
                <label class="flex flex-col gap-1">
                  <span class="text-xs text-[var(--text-primary-color,#403f3f)]">${this.msg['menuManagement.filter.status']}</span>
                  <select
                    class="rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-2 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.browseMenuItemsStatusFilter}"
                    @change="${(e: Event) => this.handleBrowseMenuItemsStatusFilterChange(e)}"
                  >
                    <option value="">—</option>
                    <option value="draft" ?selected="${this.browseMenuItemsStatusFilter === 'draft'}">draft</option>
                    <option value="active" ?selected="${this.browseMenuItemsStatusFilter === 'active'}">active</option>
                    <option value="inactive" ?selected="${this.browseMenuItemsStatusFilter === 'inactive'}">inactive</option>
                  </select>
                </label>

                <label class="flex flex-col gap-1">
                  <span class="text-xs text-[var(--text-primary-color,#403f3f)]">${this.msg['menuManagement.filter.menuCategory']}</span>
                  <input
                    type="text"
                    class="rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-2 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.browseMenuItemsMenuCategoryIdFilter}"
                    @change="${(e: Event) => this.handleBrowseMenuItemsMenuCategoryIdFilterChange(e)}"
                  />
                </label>

                <button
                  class="rounded px-3 py-1 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)]"
                  @click="${() => this.handleBrowseMenuItemsClick()}"
                >
                  ${this.msg['menuManagement.action.refresh']}
                </button>
              </div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="border-b border-[var(--grey-color,#E6E6E6)] text-left">
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['menuManagement.menuItem.name']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['menuManagement.menuItem.menuCategoryId']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['menuManagement.menuItem.price']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['menuManagement.menuItem.status']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items.length === 0
                      ? html`<tr><td colspan="5" class="py-4 px-3 text-center text-[var(--text-primary-color,#403f3f)] opacity-60">—</td></tr>`
                      : items.map((item: CafeFlowBrowseMenuItemsOutputItem) => html`
                        <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                          <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.name}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.menuCategoryId}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.price}</td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.status}</td>
                          <td class="py-2 px-3">
                            <button
                              class="rounded px-2 py-1 text-xs font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)]"
                              @click="${() => this.handleManageMenuItemClick()}"
                            >
                              ${this.msg['menuManagement.action.manage']}
                            </button>
                          </td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${this.browseMenuItemsState === 'loading' ? html`<p class="text-sm text-[var(--text-primary-color,#403f3f)] opacity-60">…</p>` : null}
              ${this.browseMenuItemsState === 'error' ? html`<p class="text-sm text-[var(--error-color,#FF4D4F)]">error</p>` : null}
            </div>

            <!-- i30_summary: summary -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color,#E6E6E6)] p-3 space-y-2">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.board.summary.title']}
              </h3>
              <dl class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.status']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${items.length > 0 ? items[0].status : '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.itemType']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${items.length > 0 ? items[0].itemType : '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.updatedAt']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${items.length > 0 ? items[0].updatedAt : '—'}</dd>
                </div>
              </dl>
            </div>
          </section>

          <!-- Section: Detail -->
          <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['menuManagement.detail.title']}
            </h2>

            <!-- i40_status: workflowStatus -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color,#E6E6E6)] p-3 space-y-2">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.detail.status.title']}
              </h3>
              <dl class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.status']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemStatus || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.activatedAt']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.LayoutWs20ActivatedAt || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.inactivatedAt']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.LayoutWs30InactivatedAt || '—'}</dd>
                </div>
              </dl>
            </div>

            <!-- i50_edit: commandForm -->
            <div class="space-y-3">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.detail.edit.title']}
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- name -->
                <label class="flex flex-col gap-1">
                  <span class="text-xs font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['menuManagement.menuItem.name']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </span>
                  <input
                    type="text"
                    class="rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-2 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemName}"
                    @input="${(e: Event) => this.handleManageMenuItemNameChange(e)}"
                  />
                </label>

                <!-- description -->
                <label class="flex flex-col gap-1 sm:col-span-2">
                  <span class="text-xs font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['menuManagement.menuItem.description']}
                  </span>
                  <textarea
                    class="rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-2 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
                    rows="3"
                    .value="${this.manageMenuItemDescription}"
                    @input="${(e: Event) => this.handleManageMenuItemDescriptionChange(e)}"
                  ></textarea>
                </label>

                <!-- menuCategoryId -->
                <label class="flex flex-col gap-1">
                  <span class="text-xs font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['menuManagement.menuItem.menuCategoryId']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </span>
                  <input
                    type="text"
                    class="rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-2 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemMenuCategoryId}"
                    @input="${(e: Event) => this.handleManageMenuItemMenuCategoryIdChange(e)}"
                  />
                </label>

                <!-- price -->
                <label class="flex flex-col gap-1">
                  <span class="text-xs font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['menuManagement.menuItem.price']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    class="rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-2 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemPrice}"
                    @input="${(e: Event) => this.handleManageMenuItemPriceChange(e)}"
                  />
                </label>

                <!-- itemType -->
                <label class="flex flex-col gap-1">
                  <span class="text-xs font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['menuManagement.menuItem.itemType']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </span>
                  <select
                    class="rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-2 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemItemType}"
                    @change="${(e: Event) => this.handleManageMenuItemItemTypeChange(e)}"
                  >
                    <option value="">—</option>
                    <option value="simple" ?selected="${this.manageMenuItemItemType === 'simple'}">simple</option>
                    <option value="variant" ?selected="${this.manageMenuItemItemType === 'variant'}">variant</option>
                  </select>
                </label>

                <!-- status -->
                <label class="flex flex-col gap-1">
                  <span class="text-xs font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['menuManagement.menuItem.status']}
                    <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                  </span>
                  <select
                    class="rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-2 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemStatus}"
                    @change="${(e: Event) => this.handleManageMenuItemStatusChange(e)}"
                  >
                    <option value="">—</option>
                    <option value="draft" ?selected="${this.manageMenuItemStatus === 'draft'}">draft</option>
                    <option value="active" ?selected="${this.manageMenuItemStatus === 'active'}">active</option>
                    <option value="inactive" ?selected="${this.manageMenuItemStatus === 'inactive'}">inactive</option>
                  </select>
                </label>
              </div>

              <div class="flex items-center gap-3">
                <button
                  class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled="${this.manageMenuItemState === 'loading'}"
                  @click="${() => this.handleManageMenuItemClick()}"
                >
                  ${this.msg['menuManagement.action.save']}
                </button>
                ${this.manageMenuItemState === 'loading' ? html`<span class="text-sm text-[var(--text-primary-color,#403f3f)] opacity-60">…</span>` : null}
                ${this.manageMenuItemState === 'error' ? html`<span class="text-sm text-[var(--error-color,#FF4D4F)]">error</span>` : null}
                ${this.manageMenuItemState === 'success' ? html`<span class="text-sm text-[var(--success-color,#52C41A)]">✓</span>` : null}
              </div>
            </div>

            <!-- i60_review: summary -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color,#E6E6E6)] p-3 space-y-2">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.detail.review.title']}
              </h3>
              <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.name']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemName || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.menuCategoryId']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemMenuCategoryId || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.price']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemPrice || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.status']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemStatus || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${this.msg['menuManagement.menuItem.updatedAt']}</dt>
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.LayoutR50UpdatedAt || '—'}</dd>
                </div>
              </dl>
            </div>
          </section>

        </div>
      </div>
    `;
  }
}
