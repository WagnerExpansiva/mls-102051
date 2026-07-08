/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';

@customElement('cafe-flow--web--desktop--page11--menu-management-102051')
export class CafeFlowDesktopPage11MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
            ${this.msg['menuManagement.section.main.title']}
          </h1>

          <!-- Section: Gestão de cardápio -->
          <section class="space-y-6">
            <!-- Organism: BrowseMenuItems -->
            <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4">
              <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
                ${this.msg['menuManagement.organism.browseMenuItems.title']}
              </h2>

              <!-- Intention: context summary (businessContext badge) -->
              <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-2M9 7h6m-6 4h6m-6 4h6"/></svg>
                  ${this.msg['menuManagement.intention.context.title']}: ${this.activeCompanyId || '—'}
                </span>
              </div>

              <!-- Intention: queryList -->
              <div class="space-y-3">
                <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
                  ${this.msg['menuManagement.intention.browseMenuItems.list.title']}
                </h3>

                <!-- Filters -->
                <div class="flex flex-wrap gap-3">
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-slate-500 dark:text-slate-400">
                      ${this.msg['menuManagement.filter.statusFilter.label']}
                    </label>
                    <select
                      class="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      .value="${this.browseMenuItemsStatusFilter}"
                      @change="${(e: Event) => this.handleBrowseMenuItemsStatusFilterChange(e)}"
                    >
                      <option value="">—</option>
                      <option value="draft" ?selected="${this.browseMenuItemsStatusFilter === 'draft'}">draft</option>
                      <option value="active" ?selected="${this.browseMenuItemsStatusFilter === 'active'}">active</option>
                      <option value="inactive" ?selected="${this.browseMenuItemsStatusFilter === 'inactive'}">inactive</option>
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-slate-500 dark:text-slate-400">
                      ${this.msg['menuManagement.filter.menuCategoryIdFilter.label']}
                    </label>
                    <input
                      type="text"
                      class="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      .value="${this.browseMenuItemsMenuCategoryIdFilter}"
                      @input="${(e: Event) => this.handleBrowseMenuItemsMenuCategoryIdFilterChange(e)}"
                    />
                  </div>
                  <div class="flex items-end">
                    <button
                      class="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                      ?disabled="${this.browseMenuItemsState === 'loading'}"
                      @click="${(e: Event) => this.handleBrowseMenuItemsClick(e)}"
                    >
                      ${this.browseMenuItemsState === 'loading' ? '…' : this.msg['menuManagement.action.browseMenuItems.label']}
                    </button>
                  </div>
                </div>

                <!-- Table -->
                <div class="overflow-x-auto">
                  <table class="w-full text-sm border-collapse">
                    <thead>
                      <tr class="border-b border-slate-200 dark:border-slate-700 text-left text-slate-500 dark:text-slate-400">
                        <th class="py-2 px-2 font-medium">${this.msg['menuManagement.field.name.label']}</th>
                        <th class="py-2 px-2 font-medium">${this.msg['menuManagement.field.menuCategoryId.label']}</th>
                        <th class="py-2 px-2 font-medium text-right">${this.msg['menuManagement.field.price.label']}</th>
                        <th class="py-2 px-2 font-medium">${this.msg['menuManagement.field.itemType.label']}</th>
                        <th class="py-2 px-2 font-medium">${this.msg['menuManagement.field.status.label']}</th>
                        <th class="py-2 px-2 font-medium">${this.msg['menuManagement.field.updatedAt.label']}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${(this.browseMenuItemsData?.items ?? []).map((item) => html`
                        <tr class="border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200">
                          <td class="py-2 px-2">${item.name}</td>
                          <td class="py-2 px-2">${item.menuCategoryId}</td>
                          <td class="py-2 px-2 text-right">
                            ${typeof item.price === 'number' ? item.price.toFixed(2) : ''}
                          </td>
                          <td class="py-2 px-2">${item.itemType}</td>
                          <td class="py-2 px-2">
                            <span class="inline-block px-2 py-0.5 rounded text-xs font-medium ${
                              item.status === 'active'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : item.status === 'inactive'
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                            }">${item.status}</span>
                          </td>
                          <td class="py-2 px-2 text-slate-500 dark:text-slate-400">${item.updatedAt ?? ''}</td>
                        </tr>
                      `)}
                      ${(this.browseMenuItemsData?.items ?? []).length === 0
                        ? html`<tr><td colspan="6" class="py-4 text-center text-slate-400 dark:text-slate-500">—</td></tr>`
                        : null}
                    </tbody>
                  </table>
                </div>

                ${this.browseMenuItemsData && typeof this.browseMenuItemsData.total === 'number'
                  ? html`<div class="text-xs text-slate-400 dark:text-slate-500">
                      Total: ${this.browseMenuItemsData.total}
                    </div>`
                  : null}
              </div>
            </div>

            <!-- Organism: ManageMenuItem -->
            <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4">
              <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
                ${this.msg['menuManagement.organism.manageMenuItem.title']}
              </h2>

              <!-- Intention: commandForm -->
              <div class="space-y-3">
                <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
                  ${this.msg['menuManagement.intention.manageMenuItem.form.title']}
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- name -->
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-slate-500 dark:text-slate-400">
                      ${this.msg['menuManagement.field.name.label']} <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      class="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      .value="${this.manageMenuItemName}"
                      @input="${(e: Event) => this.handleManageMenuItemNameChange(e)}"
                    />
                  </div>

                  <!-- menuCategoryId -->
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-slate-500 dark:text-slate-400">
                      ${this.msg['menuManagement.field.menuCategoryId.label']} <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      class="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      .value="${this.manageMenuItemMenuCategoryId}"
                      @input="${(e: Event) => this.handleManageMenuItemMenuCategoryIdChange(e)}"
                    />
                  </div>

                  <!-- price -->
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-slate-500 dark:text-slate-400">
                      ${this.msg['menuManagement.field.price.label']} <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      class="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      .value="${this.manageMenuItemPrice}"
                      @input="${(e: Event) => this.handleManageMenuItemPriceChange(e)}"
                    />
                  </div>

                  <!-- itemType -->
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-slate-500 dark:text-slate-400">
                      ${this.msg['menuManagement.field.itemType.label']} <span class="text-red-500">*</span>
                    </label>
                    <select
                      class="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      .value="${this.manageMenuItemItemType}"
                      @change="${(e: Event) => this.handleManageMenuItemItemTypeChange(e)}"
                    >
                      <option value="">—</option>
                      <option value="simple" ?selected="${this.manageMenuItemItemType === 'simple'}">simple</option>
                      <option value="variant" ?selected="${this.manageMenuItemItemType === 'variant'}">variant</option>
                    </select>
                  </div>

                  <!-- status -->
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-slate-500 dark:text-slate-400">
                      ${this.msg['menuManagement.field.status.label']} <span class="text-red-500">*</span>
                    </label>
                    <select
                      class="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      .value="${this.manageMenuItemStatus}"
                      @change="${(e: Event) => this.handleManageMenuItemStatusChange(e)}"
                    >
                      <option value="">—</option>
                      <option value="draft" ?selected="${this.manageMenuItemStatus === 'draft'}">draft</option>
                      <option value="active" ?selected="${this.manageMenuItemStatus === 'active'}">active</option>
                      <option value="inactive" ?selected="${this.manageMenuItemStatus === 'inactive'}">inactive</option>
                    </select>
                  </div>

                  <!-- description (full width) -->
                  <div class="flex flex-col gap-1 sm:col-span-2">
                    <label class="text-xs text-slate-500 dark:text-slate-400">
                      ${this.msg['menuManagement.field.description.label']}
                    </label>
                    <textarea
                      rows="2"
                      class="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      .value="${this.manageMenuItemDescription}"
                      @input="${(e: Event) => this.handleManageMenuItemDescriptionChange(e)}"
                    ></textarea>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button
                    class="px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                    ?disabled="${this.manageMenuItemState === 'loading'}"
                    @click="${(e: Event) => this.handleManageMenuItemClick(e)}"
                  >
                    ${this.manageMenuItemState === 'loading' ? '…' : this.msg['menuManagement.action.manageMenuItem.label']}
                  </button>
                </div>
              </div>

              <!-- Intention: workflowStatus -->
              <div class="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
                <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
                  ${this.msg['menuManagement.intention.manageMenuItem.status.title']}
                </h3>
                <dl class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div class="flex justify-between gap-2">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['menuManagement.field.status.label']}</dt>
                    <dd class="text-slate-700 dark:text-slate-200">${this.manageMenuItemStatus || '—'}</dd>
                  </div>
                  <div class="flex justify-between gap-2">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['menuManagement.field.activatedAt.label']}</dt>
                    <dd class="text-slate-700 dark:text-slate-200">${this.LayoutFieldManageMenuItemActivatedAt || '—'}</dd>
                  </div>
                  <div class="flex justify-between gap-2">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['menuManagement.field.inactivatedAt.label']}</dt>
                    <dd class="text-slate-700 dark:text-slate-200">${this.LayoutFieldManageMenuItemInactivatedAt || '—'}</dd>
                  </div>
                  <div class="flex justify-between gap-2">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['menuManagement.field.updatedAt.label']}</dt>
                    <dd class="text-slate-700 dark:text-slate-200">${this.LayoutFieldManageMenuItemUpdatedAt || '—'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
