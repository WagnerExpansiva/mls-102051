/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';

@customElement('cafe-flow--web--desktop--page21--menu-management-102051')
export class CafeFlowDesktopPage21MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const msg = this.msg as Record<string, string>;
    const getMsg = (key: string): string => msg[key] ?? '';
    const items = this.browseMenuItemsData?.items ?? [];

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="flex flex-wrap items-center justify-between gap-4">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              ${getMsg('menuManagement.section.main.title')}
            </h1>
            <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              ${this.activeCompanyId
                ? html`
                    <span class="inline-flex items-center rounded-md bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      ${this.activeCompanyId}
                    </span>
                  `
                : html``}
            </div>
          </header>

          <section class="space-y-4">
            <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ${getMsg('section.board')}
                </h2>
                <button
                  class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
                  type="button"
                  @click=${this.handleBrowseMenuItemsClick}
                >
                  ${getMsg('action.browseMenuItems')}
                </button>
              </div>

              <div class="mt-4 grid gap-4 lg:grid-cols-[1.1fr_2fr]">
                <div class="space-y-4">
                  <div class="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
                    <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      ${getMsg('intent.context.badge.title')}
                    </h3>
                    <div class="mt-2">
                      ${this.activeCompanyId
                        ? html`
                            <span class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                              ${this.activeCompanyId}
                            </span>
                          `
                        : html``}
                    </div>
                  </div>

                  <div class="rounded-md border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                    <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      ${getMsg('intent.board.filters.title')}
                    </h3>
                    <div class="mt-3 space-y-3">
                      <label class="block text-xs font-medium text-slate-600 dark:text-slate-300">
                        ${getMsg('field.statusFilter')}
                        <select
                          class="mt-1 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          @change=${this.handleBrowseMenuItemsStatusFilterChange}
                          .value=${this.browseMenuItemsStatusFilter}
                        >
                          <option value=""></option>
                          <option value="draft">draft</option>
                          <option value="active">active</option>
                          <option value="inactive">inactive</option>
                        </select>
                      </label>
                      <label class="block text-xs font-medium text-slate-600 dark:text-slate-300">
                        ${getMsg('field.menuCategoryIdFilter')}
                        <select
                          class="mt-1 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          @change=${this.handleBrowseMenuItemsMenuCategoryIdFilterChange}
                          .value=${this.browseMenuItemsMenuCategoryIdFilter}
                        >
                          <option value=""></option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="rounded-md border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                  <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    ${getMsg('intent.board.title')}
                  </h3>
                  <div class="mt-3 overflow-x-auto">
                    <table class="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
                      <thead class="bg-slate-50 dark:bg-slate-950">
                        <tr>
                          <th class="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                            ${getMsg('column.name')}
                          </th>
                          <th class="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                            ${getMsg('column.menuCategoryId')}
                          </th>
                          <th class="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                            ${getMsg('column.price')}
                          </th>
                          <th class="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                            ${getMsg('column.itemType')}
                          </th>
                          <th class="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                            ${getMsg('column.status')}
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                        ${items.length > 0
                          ? items.map((item) => html`
                              <tr>
                                <td class="px-3 py-2 text-slate-900 dark:text-slate-100">${item.name}</td>
                                <td class="px-3 py-2 text-slate-600 dark:text-slate-300">
                                  ${item.menuCategoryId}
                                </td>
                                <td class="px-3 py-2 text-slate-600 dark:text-slate-300">
                                  ${item.price.toFixed(2)}
                                </td>
                                <td class="px-3 py-2 text-slate-600 dark:text-slate-300">${item.itemType}</td>
                                <td class="px-3 py-2 text-slate-600 dark:text-slate-300">${item.status}</td>
                              </tr>
                            `)
                          : html`
                              <tr>
                                <td class="px-3 py-4 text-center text-slate-500 dark:text-slate-400" colspan="5">
                                  ${getMsg('empty.board')}
                                </td>
                              </tr>
                            `}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="space-y-4">
            <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${getMsg('section.details')}
              </h2>

              <div class="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
                <div class="space-y-4">
                  <div class="rounded-md border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                    <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      ${getMsg('intent.manage.form.title')}
                    </h3>
                    <div class="mt-3 grid gap-3">
                      <label class="block text-xs font-medium text-slate-600 dark:text-slate-300">
                        ${getMsg('field.name')}
                        <input
                          class="mt-1 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          type="text"
                          .value=${this.manageMenuItemName}
                          @input=${this.handleManageMenuItemNameChange}
                        />
                      </label>
                      <label class="block text-xs font-medium text-slate-600 dark:text-slate-300">
                        ${getMsg('field.description')}
                        <textarea
                          class="mt-1 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          rows="3"
                          .value=${this.manageMenuItemDescription}
                          @input=${this.handleManageMenuItemDescriptionChange}
                        ></textarea>
                      </label>
                      <label class="block text-xs font-medium text-slate-600 dark:text-slate-300">
                        ${getMsg('field.menuCategoryId')}
                        <select
                          class="mt-1 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          .value=${this.manageMenuItemMenuCategoryId}
                          @change=${this.handleManageMenuItemMenuCategoryIdChange}
                        >
                          <option value=""></option>
                        </select>
                      </label>
                      <label class="block text-xs font-medium text-slate-600 dark:text-slate-300">
                        ${getMsg('field.price')}
                        <input
                          class="mt-1 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          type="number"
                          step="0.01"
                          .value=${this.manageMenuItemPrice}
                          @input=${this.handleManageMenuItemPriceChange}
                        />
                      </label>
                      <label class="block text-xs font-medium text-slate-600 dark:text-slate-300">
                        ${getMsg('field.itemType')}
                        <select
                          class="mt-1 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          .value=${this.manageMenuItemItemType}
                          @change=${this.handleManageMenuItemItemTypeChange}
                        >
                          <option value=""></option>
                          <option value="simple">simple</option>
                          <option value="variant">variant</option>
                        </select>
                      </label>
                      <label class="block text-xs font-medium text-slate-600 dark:text-slate-300">
                        ${getMsg('field.status')}
                        <select
                          class="mt-1 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
                    <div class="mt-4 flex justify-end">
                      <button
                        class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
                        type="button"
                        @click=${this.handleManageMenuItemClick}
                      >
                        ${getMsg('action.manageMenuItem')}
                      </button>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
                    <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      ${getMsg('intent.manage.status.title')}
                    </h3>
                    <dl class="mt-3 space-y-2 text-sm">
                      <div class="flex items-center justify-between">
                        <dt class="text-slate-600 dark:text-slate-300">${getMsg('field.status')}</dt>
                        <dd class="text-slate-900 dark:text-slate-100">${this.manageMenuItemStatus}</dd>
                      </div>
                      <div class="flex items-center justify-between">
                        <dt class="text-slate-600 dark:text-slate-300">${getMsg('field.activatedAt')}</dt>
                        <dd class="text-slate-900 dark:text-slate-100">
                          ${this.LayoutFieldManageMenuItemActivatedAt}
                        </dd>
                      </div>
                      <div class="flex items-center justify-between">
                        <dt class="text-slate-600 dark:text-slate-300">${getMsg('field.inactivatedAt')}</dt>
                        <dd class="text-slate-900 dark:text-slate-100">
                          ${this.LayoutFieldManageMenuItemInactivatedAt}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div class="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
                    <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      ${getMsg('intent.manage.summary.title')}
                    </h3>
                    <dl class="mt-3 space-y-2 text-sm">
                      <div class="flex items-center justify-between">
                        <dt class="text-slate-600 dark:text-slate-300">${getMsg('field.updatedAt')}</dt>
                        <dd class="text-slate-900 dark:text-slate-100">
                          ${this.LayoutFieldManageMenuItemUpdatedAt}
                        </dd>
                      </div>
                      <div class="flex items-center justify-between">
                        <dt class="text-slate-600 dark:text-slate-300">${getMsg('field.createdAt')}</dt>
                        <dd class="text-slate-900 dark:text-slate-100"></dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
