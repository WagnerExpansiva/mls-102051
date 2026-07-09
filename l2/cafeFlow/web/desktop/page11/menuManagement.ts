/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { CafeFlowBrowseMenuItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

@customElement('cafe-flow--web--desktop--page11--menu-management-102051')
export class CafeFlowDesktopPage11MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const items: CafeFlowBrowseMenuItemsOutputItem[] = this.browseMenuItemsData?.items ?? [];
    const total: number = this.browseMenuItemsData?.total ?? 0;
    const firstItem: CafeFlowBrowseMenuItemsOutputItem | null = items.length > 0 ? items[0] : null;

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">

          <!-- Page header -->
          <h1 class="text-xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['menuManagement.queue.title']}
          </h1>

          <!-- ── Section: Queue (s10) ────────────────────────────── -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e6e6e6)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['menuManagement.queue.list.title']}
            </h2>

            <!-- Intention i10_context: workflowStatus (business context badge) -->
            <div
              class="rounded-lg bg-[var(--bg-secondary-color-lighter,#f9f9f9)] border border-[var(--grey-color,#e6e6e6)] p-3"
            >
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-2">
                ${this.msg['menuManagement.context.title']}
              </h3>
              <div
                class="inline-flex items-center gap-2 rounded-md bg-[var(--bg-secondary-color,#e6e6e6)] px-3 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
              >
                <span class="font-medium">${this.activeCompanyId || '—'}</span>
              </div>
            </div>

            <!-- Intention i20_query: queryList -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.queue.query.title']}
              </h3>

              <!-- Filters + toolbar -->
              <div class="flex flex-wrap items-end gap-3">
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    >${this.msg['menuManagement.filter.status']}</label
                  >
                  <select
                    .value=${this.browseMenuItemsStatusFilter}
                    @change=${(e: Event) => this.handleBrowseMenuItemsStatusFilterChange(e)}
                    class="rounded-md border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#403f3f)]"
                  >
                    <option value="">—</option>
                    <option value="draft">draft</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    >${this.msg['menuManagement.filter.menuCategory']}</label
                  >
                  <input
                    type="text"
                    .value=${this.browseMenuItemsMenuCategoryIdFilter}
                    @change=${(e: Event) => this.handleBrowseMenuItemsMenuCategoryIdFilterChange(e)}
                    class="rounded-md border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#403f3f)]"
                  />
                </div>

                <button
                  @click=${this.handleBrowseMenuItemsClick}
                  ?disabled=${this.browseMenuItemsState === 'loading'}
                  class="rounded-md bg-[var(--active-color,#1890ff)] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                >
                  ${this.msg['menuManagement.action.refresh']}
                </button>
              </div>

              <!-- Table -->
              <div class="overflow-x-auto rounded-md border border-[var(--grey-color,#e6e6e6)]">
                <table class="w-full text-sm">
                  <thead class="bg-[var(--bg-secondary-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)]">
                    <tr>
                      <th class="px-3 py-2 text-left font-medium">${this.msg['menuManagement.menuItem.name']}</th>
                      <th class="px-3 py-2 text-left font-medium">${this.msg['menuManagement.menuItem.menuCategoryId']}</th>
                      <th class="px-3 py-2 text-left font-medium">${this.msg['menuManagement.menuItem.price']}</th>
                      <th class="px-3 py-2 text-left font-medium">${this.msg['menuManagement.menuItem.itemType']}</th>
                      <th class="px-3 py-2 text-left font-medium">${this.msg['menuManagement.menuItem.status']}</th>
                      <th class="px-3 py-2 text-left font-medium"></th>
                    </tr>
                  </thead>
                  <tbody class="bg-[var(--bg-primary-color,#ffffff)]">
                    ${items.length === 0
                      ? html`<tr>
                          <td
                            colspan="6"
                            class="px-3 py-4 text-center text-[var(--text-primary-color,#403f3f)] opacity-60"
                          >
                            —
                          </td>
                        </tr>`
                      : items.map(
                          (item: CafeFlowBrowseMenuItemsOutputItem) => html`
                            <tr class="border-t border-[var(--grey-color,#e6e6e6)]">
                              <td class="px-3 py-2 text-[var(--text-primary-color,#403f3f)]">${item.name}</td>
                              <td class="px-3 py-2 text-[var(--text-primary-color,#403f3f)]">${item.menuCategoryId}</td>
                              <td class="px-3 py-2 text-[var(--text-primary-color,#403f3f)]">${item.price}</td>
                              <td class="px-3 py-2 text-[var(--text-primary-color,#403f3f)]">${item.itemType}</td>
                              <td class="px-3 py-2 text-[var(--text-primary-color,#403f3f)]">${item.status}</td>
                              <td class="px-3 py-2">
                                <button
                                  @click=${() => this.handleManageMenuItemClick()}
                                  class="rounded-md bg-[var(--active-color,#1890ff)] px-3 py-1 text-xs font-medium text-white hover:opacity-90"
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

              <div class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${total} item(s)</div>
            </div>

            <!-- Intention i30_summary: summary -->
            <div
              class="rounded-lg bg-[var(--bg-secondary-color-lighter,#f9f9f9)] border border-[var(--grey-color,#e6e6e6)] p-3 space-y-2"
            >
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.queue.summary.title']}
              </h3>
              ${firstItem
                ? html`
                    <dl class="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                          >${this.msg['menuManagement.menuItem.status']}</dt
                        >
                        <dd class="text-[var(--text-primary-color,#403f3f)]">${firstItem.status}</dd>
                      </div>
                      <div>
                        <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                          >${this.msg['menuManagement.menuItem.activatedAt']}</dt
                        >
                        <dd class="text-[var(--text-primary-color,#403f3f)]">${firstItem.activatedAt || '—'}</dd>
                      </div>
                      <div>
                        <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                          >${this.msg['menuManagement.menuItem.updatedAt']}</dt
                        >
                        <dd class="text-[var(--text-primary-color,#403f3f)]">${firstItem.updatedAt || '—'}</dd>
                      </div>
                    </dl>
                  `
                : html`<p class="text-sm text-[var(--text-primary-color,#403f3f)] opacity-60">—</p>`}
            </div>
          </section>

          <!-- ── Section: Detail (s20) ───────────────────────────── -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e6e6e6)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['menuManagement.detail.title']}
            </h2>

            <!-- Intention i40_status: workflowStatus -->
            <div
              class="rounded-lg bg-[var(--bg-secondary-color-lighter,#f9f9f9)] border border-[var(--grey-color,#e6e6e6)] p-3 space-y-2"
            >
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.detail.status.title']}
              </h3>
              <dl class="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >${this.msg['menuManagement.menuItem.status']}</dt
                  >
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemStatus || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >${this.msg['menuManagement.menuItem.activatedAt']}</dt
                  >
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.LayoutWs20ActivatedAt || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >${this.msg['menuManagement.menuItem.inactivatedAt']}</dt
                  >
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.LayoutWs30InactivatedAt || '—'}</dd>
                </div>
              </dl>
            </div>

            <!-- Intention i50_edit: commandForm -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.detail.edit.title']}
              </h3>

              <div class="grid grid-cols-2 gap-4">
                <!-- name -->
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    >${this.msg['menuManagement.menuItem.name']} *</label
                  >
                  <input
                    type="text"
                    .value=${this.manageMenuItemName}
                    @input=${(e: Event) => this.handleManageMenuItemNameChange(e)}
                    class="rounded-md border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#403f3f)]"
                  />
                </div>

                <!-- menuCategoryId -->
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    >${this.msg['menuManagement.menuItem.menuCategoryId']} *</label
                  >
                  <input
                    type="text"
                    .value=${this.manageMenuItemMenuCategoryId}
                    @input=${(e: Event) => this.handleManageMenuItemMenuCategoryIdChange(e)}
                    class="rounded-md border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#403f3f)]"
                  />
                </div>

                <!-- price -->
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    >${this.msg['menuManagement.menuItem.price']} *</label
                  >
                  <input
                    type="number"
                    step="0.01"
                    .value=${this.manageMenuItemPrice}
                    @input=${(e: Event) => this.handleManageMenuItemPriceChange(e)}
                    class="rounded-md border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#403f3f)]"
                  />
                </div>

                <!-- itemType -->
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    >${this.msg['menuManagement.menuItem.itemType']} *</label
                  >
                  <select
                    .value=${this.manageMenuItemItemType}
                    @change=${(e: Event) => this.handleManageMenuItemItemTypeChange(e)}
                    class="rounded-md border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#403f3f)]"
                  >
                    <option value="">—</option>
                    <option value="simple">simple</option>
                    <option value="variant">variant</option>
                  </select>
                </div>

                <!-- status -->
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    >${this.msg['menuManagement.menuItem.status']} *</label
                  >
                  <select
                    .value=${this.manageMenuItemStatus}
                    @change=${(e: Event) => this.handleManageMenuItemStatusChange(e)}
                    class="rounded-md border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#403f3f)]"
                  >
                    <option value="">—</option>
                    <option value="draft">draft</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>

                <!-- description (full width) -->
                <div class="col-span-2 flex flex-col gap-1">
                  <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                    >${this.msg['menuManagement.menuItem.description']}</label
                  >
                  <textarea
                    .value=${this.manageMenuItemDescription}
                    @input=${(e: Event) => this.handleManageMenuItemDescriptionChange(e)}
                    rows="3"
                    class="rounded-md border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#403f3f)]"
                  ></textarea>
                </div>
              </div>

              <!-- Submit action -->
              <div>
                <button
                  @click=${this.handleManageMenuItemClick}
                  ?disabled=${this.manageMenuItemState === 'loading'}
                  class="rounded-md bg-[var(--active-color,#1890ff)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                >
                  ${this.msg['menuManagement.action.save']}
                </button>
              </div>
            </div>

            <!-- Intention i60_review: summary -->
            <div
              class="rounded-lg bg-[var(--bg-secondary-color-lighter,#f9f9f9)] border border-[var(--grey-color,#e6e6e6)] p-3 space-y-2"
            >
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['menuManagement.detail.review.title']}
              </h3>
              <dl class="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >${this.msg['menuManagement.menuItem.name']}</dt
                  >
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemName || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >${this.msg['menuManagement.menuItem.menuCategoryId']}</dt
                  >
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemMenuCategoryId || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >${this.msg['menuManagement.menuItem.price']}</dt
                  >
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemPrice || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >${this.msg['menuManagement.menuItem.status']}</dt
                  >
                  <dd class="text-[var(--text-primary-color,#403f3f)]">${this.manageMenuItemStatus || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >${this.msg['menuManagement.menuItem.updatedAt']}</dt
                  >
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
