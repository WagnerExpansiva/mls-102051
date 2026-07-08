/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';

@customElement('cafe-flow--web--desktop--page31--menu-management-102051')
export class CafeFlowDesktopPage11MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const browseItems = this.browseMenuItemsData?.items ?? [];
    const browseTotal = this.browseMenuItemsData?.total ?? 0;
    const isBrowseLoading = this.browseMenuItemsState === 'loading';
    const isManageLoading = this.manageMenuItemState === 'loading';

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              ${this.msg['menuManagement.section.main.title']}
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              ${browseTotal > 0 ? `${browseTotal}` : ''}
            </p>
          </header>

          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['menuManagement.organism.browseMenuItems.title']}
              </h2>
              <button
                class="px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-medium disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
                ?disabled=${isBrowseLoading}
                @click=${this.handleBrowseMenuItemsClick}
              >
                ${this.msg['menuManagement.action.browseMenuItems.label']}
              </button>
            </div>

            <div class="rounded-md border border-slate-200 dark:border-slate-800 p-3 flex items-center justify-between">
              <div>
                <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  ${this.msg['menuManagement.intention.context.title']}
                </div>
                <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                  ${this.activeCompanyId || ''}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label class="text-sm text-slate-600 dark:text-slate-300">
                ${this.msg['menuManagement.filter.statusFilter.label']}
                <select
                  class="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
                  .value=${this.browseMenuItemsStatusFilter}
                  @change=${this.handleBrowseMenuItemsStatusFilterChange}
                >
                  <option value=""></option>
                  <option value="draft">draft</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </label>
              <label class="text-sm text-slate-600 dark:text-slate-300">
                ${this.msg['menuManagement.filter.menuCategoryIdFilter.label']}
                <select
                  class="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
                  .value=${this.browseMenuItemsMenuCategoryIdFilter}
                  @change=${this.handleBrowseMenuItemsMenuCategoryIdFilterChange}
                >
                  <option value=""></option>
                </select>
              </label>
            </div>

            <div class="space-y-2">
              <div class="text-sm font-semibold text-slate-700 dark:text-slate-200">
                ${this.msg['menuManagement.intention.browseMenuItems.list.title']}
              </div>
              <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-md">
                <table class="min-w-full text-sm">
                  <thead class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200">
                    <tr>
                      <th class="px-3 py-2 text-left font-medium">
                        ${this.msg['menuManagement.field.name.label']}
                      </th>
                      <th class="px-3 py-2 text-left font-medium">
                        ${this.msg['menuManagement.field.menuCategoryId.label']}
                      </th>
                      <th class="px-3 py-2 text-left font-medium">
                        ${this.msg['menuManagement.field.price.label']}
                      </th>
                      <th class="px-3 py-2 text-left font-medium">
                        ${this.msg['menuManagement.field.status.label']}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                    ${browseItems.length > 0
                      ? browseItems.map(
                          (item: (typeof browseItems)[number]) => html`
                            <tr class="text-slate-700 dark:text-slate-200">
                              <td class="px-3 py-2">${item.name}</td>
                              <td class="px-3 py-2">${item.menuCategoryId}</td>
                              <td class="px-3 py-2">
                                ${Number.isFinite(item.price) ? item.price.toFixed(2) : ''}
                              </td>
                              <td class="px-3 py-2">${item.status}</td>
                            </tr>
                          `,
                        )
                      : html`
                          <tr>
                            <td class="px-3 py-6 text-center text-slate-500" colspan="4">
                              
                            </td>
                          </tr>
                        `}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
              ${this.msg['menuManagement.organism.manageMenuItem.title']}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="text-sm text-slate-600 dark:text-slate-300">
                ${this.msg['menuManagement.field.name.label']}
                <input
                  class="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
                  type="text"
                  .value=${this.manageMenuItemName}
                  @input=${this.handleManageMenuItemNameChange}
                />
              </label>
              <label class="text-sm text-slate-600 dark:text-slate-300">
                ${this.msg['menuManagement.field.menuCategoryId.label']}
                <select
                  class="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
                  .value=${this.manageMenuItemMenuCategoryId}
                  @change=${this.handleManageMenuItemMenuCategoryIdChange}
                >
                  <option value=""></option>
                </select>
              </label>
              <label class="text-sm text-slate-600 dark:text-slate-300 md:col-span-2">
                ${this.msg['menuManagement.field.description.label']}
                <textarea
                  class="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
                  rows="3"
                  .value=${this.manageMenuItemDescription}
                  @input=${this.handleManageMenuItemDescriptionChange}
                ></textarea>
              </label>
              <label class="text-sm text-slate-600 dark:text-slate-300">
                ${this.msg['menuManagement.field.price.label']}
                <input
                  class="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
                  type="number"
                  .value=${this.manageMenuItemPrice}
                  @input=${this.handleManageMenuItemPriceChange}
                />
              </label>
              <label class="text-sm text-slate-600 dark:text-slate-300">
                ${this.msg['menuManagement.field.itemType.label']}
                <select
                  class="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
                  .value=${this.manageMenuItemItemType}
                  @change=${this.handleManageMenuItemItemTypeChange}
                >
                  <option value=""></option>
                  <option value="simple">simple</option>
                  <option value="variant">variant</option>
                </select>
              </label>
              <label class="text-sm text-slate-600 dark:text-slate-300">
                ${this.msg['menuManagement.field.status.label']}
                <select
                  class="mt-1 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
                  .value=${this.manageMenuItemStatus}
                  @change=${this.handleManageMenuItemStatusChange}
                >
                  <option value=""></option>
                  <option value="draft">draft</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </label>
            </div>

            <div class="flex justify-end">
              <button
                class="px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-medium disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
                type="button"
                ?disabled=${isManageLoading}
                @click=${this.handleManageMenuItemClick}
              >
                ${this.msg['menuManagement.action.manageMenuItem.label']}
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="rounded-md border border-slate-200 dark:border-slate-800 p-3 space-y-2">
                <div class="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  ${this.msg['menuManagement.intention.manageMenuItem.status.title']}
                </div>
                <div class="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
                  <span>${this.msg['menuManagement.field.status.label']}</span>
                  <span class="text-slate-900 dark:text-slate-100">${this.manageMenuItemStatus}</span>
                </div>
                <div class="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
                  <span>${this.msg['menuManagement.field.activatedAt.label']}</span>
                  <span class="text-slate-900 dark:text-slate-100">${this.LayoutFieldManageMenuItemActivatedAt}</span>
                </div>
                <div class="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
                  <span>${this.msg['menuManagement.field.inactivatedAt.label']}</span>
                  <span class="text-slate-900 dark:text-slate-100">${this.LayoutFieldManageMenuItemInactivatedAt}</span>
                </div>
              </div>

              <div class="rounded-md border border-slate-200 dark:border-slate-800 p-3 space-y-2">
                <div class="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  ${this.msg['menuManagement.intention.manageMenuItem.form.title']}
                </div>
                <div class="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
                  <span>${this.msg['menuManagement.field.updatedAt.label']}</span>
                  <span class="text-slate-900 dark:text-slate-100">${this.LayoutFieldManageMenuItemUpdatedAt}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
