/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { CafeFlowBrowseMenuItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

@customElement('cafe-flow--web--desktop--page11--menu-management-102051')
export class CafeFlowDesktopPage11MenuManagementPage extends CafeFlowMenuManagementBase {
  render(): TemplateResult {
    const statusLabel = (s: string): string => {
      if (s === 'draft') return this.msg['status.draft'];
      if (s === 'active') return this.msg['status.active'];
      if (s === 'inactive') return this.msg['status.inactive'];
      return s;
    };

    const selectItem = (item: CafeFlowBrowseMenuItemsOutputItem): void => {
      this.setManageMenuItemMenuItemId(item.menuItemId);
      this.setManageMenuItemName(item.name);
      this.setManageMenuItemDescription(item.description);
      this.setManageMenuItemMenuCategoryId(item.menuCategoryId);
      this.setManageMenuItemPrice(String(item.price));
      this.setManageMenuItemItemType(item.itemType);
      this.setManageMenuItemStatus(item.status);
    };

    const items: CafeFlowBrowseMenuItemsOutputItem[] = this.browseMenuItemsData?.items ?? [];
    const isQueueLoading = this.browseMenuItemsState === 'loading';
    const isManageLoading = this.manageMenuItemState === 'loading';
    const output = this.manageMenuItemOutput;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          ${this.activeCompanyId ? html`
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--bg-secondary-color,#f1f5f9)] text-[var(--text-primary-color,#0f172a)] text-sm">
              <span class="font-medium">${this.activeCompanyId}</span>
            </div>
          ` : ''}

          <!-- Section: Queue -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.queue.title']}
            </h2>

            <!-- Filters -->
            <div class="flex flex-wrap gap-3 items-end">
              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#0f172a)]" for="filter-status">
                  ${this.msg['filter.statusFilter.label']}
                </label>
                <select
                  id="filter-status"
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.browseMenuItemsStatusFilter}"
                  @change="${(e: Event) => this.handleBrowseMenuItemsStatusFilterChange(e)}"
                >
                  <option value="">—</option>
                  <option value="draft" ?selected="${this.browseMenuItemsStatusFilter === 'draft'}">
                    ${this.msg['status.draft']}
                  </option>
                  <option value="active" ?selected="${this.browseMenuItemsStatusFilter === 'active'}">
                    ${this.msg['status.active']}
                  </option>
                  <option value="inactive" ?selected="${this.browseMenuItemsStatusFilter === 'inactive'}">
                    ${this.msg['status.inactive']}
                  </option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#0f172a)]" for="filter-category">
                  ${this.msg['filter.menuCategoryIdFilter.label']}
                </label>
                <input
                  type="text"
                  id="filter-category"
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.browseMenuItemsMenuCategoryIdFilter}"
                  @input="${(e: Event) => this.handleBrowseMenuItemsMenuCategoryIdFilterChange(e)}"
                />
              </div>

              <button
                type="button"
                class="px-4 py-2 rounded-md bg-[var(--active-color,#1890FF)] text-white font-medium hover:opacity-90 disabled:opacity-50"
                ?disabled="${isQueueLoading}"
                @click="${(e: Event) => this.handleBrowseMenuItemsClick(e)}"
              >
                ${isQueueLoading ? '…' : this.msg['action.refresh.label']}
              </button>
            </div>

            <!-- Table -->
            ${isQueueLoading ? html`
              <div class="space-y-2">
                ${[1, 2, 3].map(() => html`
                  <div class="h-10 rounded-md bg-[var(--grey-color-light,#f2f2f2)] animate-pulse"></div>
                `)}
              </div>
            ` : items.length === 0 ? html`
              <p class="text-sm text-[var(--text-primary-color,#0f172a)] py-4">
                ${this.msg['section.queue.empty']}
              </p>
            ` : html`
              <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color,#0f172a)]">
                      <th class="py-2 px-3 font-medium">${this.msg['column.name.label']}</th>
                      <th class="py-2 px-3 font-medium">${this.msg['column.menuCategoryId.label']}</th>
                      <th class="py-2 px-3 font-medium">${this.msg['column.price.label']}</th>
                      <th class="py-2 px-3 font-medium">${this.msg['column.itemType.label']}</th>
                      <th class="py-2 px-3 font-medium">${this.msg['column.status.label']}</th>
                      <th class="py-2 px-3 font-medium">${this.msg['column.activatedAt.label']}</th>
                      <th class="py-2 px-3 font-medium">${this.msg['column.updatedAt.label']}</th>
                      <th class="py-2 px-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items.map((item: CafeFlowBrowseMenuItemsOutputItem) => html`
                      <tr
                        class="border-b border-[var(--grey-color,#e2e8f0)] hover:bg-[var(--bg-secondary-color,#f8fafc)] cursor-pointer text-[var(--text-primary-color,#0f172a)]"
                        @click="${() => selectItem(item)}"
                      >
                        <td class="py-2 px-3">${item.name}</td>
                        <td class="py-2 px-3">${item.menuCategoryId}</td>
                        <td class="py-2 px-3">${item.price.toFixed(2)}</td>
                        <td class="py-2 px-3">${item.itemType}</td>
                        <td class="py-2 px-3">
                          <span
                            class="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                            style="background-color: ${item.status === 'active' ? 'var(--success-color,#52C41A)' : item.status === 'draft' ? 'var(--warning-color,#FAAD14)' : 'var(--grey-color-darker,#C0C0C0)'}"
                          >
                            ${statusLabel(item.status)}
                          </span>
                        </td>
                        <td class="py-2 px-3">${item.activatedAt || '—'}</td>
                        <td class="py-2 px-3">${item.updatedAt || '—'}</td>
                        <td class="py-2 px-3">
                          <button
                            type="button"
                            class="text-[var(--link-color,#1890FF)] hover:underline text-sm"
                            @click="${(e: Event) => { e.stopPropagation(); selectItem(item); }}"
                          >
                            ${this.msg['action.selectItem.label']}
                          </button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            `}
          </section>

          <!-- Section: Manage -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.manage.title']}
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="hidden" .value="${this.manageMenuItemMenuItemId}" />

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#0f172a)]" for="field-name">
                  ${this.msg['field.name.label']}
                </label>
                <input
                  type="text"
                  id="field-name"
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.manageMenuItemName}"
                  @input="${(e: Event) => this.handleManageMenuItemNameChange(e)}"
                />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#0f172a)]" for="field-menuCategoryId">
                  ${this.msg['field.menuCategoryId.label']}
                </label>
                <input
                  type="text"
                  id="field-menuCategoryId"
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.manageMenuItemMenuCategoryId}"
                  @input="${(e: Event) => this.handleManageMenuItemMenuCategoryIdChange(e)}"
                />
              </div>

              <div class="flex flex-col gap-1 sm:col-span-2">
                <label class="text-sm text-[var(--text-primary-color,#0f172a)]" for="field-description">
                  ${this.msg['field.description.label']}
                </label>
                <textarea
                  id="field-description"
                  rows="3"
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.manageMenuItemDescription}"
                  @input="${(e: Event) => this.handleManageMenuItemDescriptionChange(e)}"
                ></textarea>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#0f172a)]" for="field-price">
                  ${this.msg['field.price.label']}
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="field-price"
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.manageMenuItemPrice}"
                  @input="${(e: Event) => this.handleManageMenuItemPriceChange(e)}"
                />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#0f172a)]" for="field-itemType">
                  ${this.msg['field.itemType.label']}
                </label>
                <select
                  id="field-itemType"
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.manageMenuItemItemType}"
                  @change="${(e: Event) => this.handleManageMenuItemItemTypeChange(e)}"
                >
                  <option value="">—</option>
                  <option value="simple" ?selected="${this.manageMenuItemItemType === 'simple'}">simple</option>
                  <option value="variant" ?selected="${this.manageMenuItemItemType === 'variant'}">variant</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#0f172a)]" for="field-status">
                  ${this.msg['field.status.label']}
                </label>
                <select
                  id="field-status"
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.manageMenuItemStatus}"
                  @change="${(e: Event) => this.handleManageMenuItemStatusChange(e)}"
                >
                  <option value="">—</option>
                  <option value="draft" ?selected="${this.manageMenuItemStatus === 'draft'}">
                    ${this.msg['status.draft']}
                  </option>
                  <option value="active" ?selected="${this.manageMenuItemStatus === 'active'}">
                    ${this.msg['status.active']}
                  </option>
                  <option value="inactive" ?selected="${this.manageMenuItemStatus === 'inactive'}">
                    ${this.msg['status.inactive']}
                  </option>
                </select>
              </div>
            </div>

            <!-- Feedback -->
            ${this.manageMenuItemState === 'success' ? html`
              <div
                class="rounded-md p-3 border text-sm text-[var(--text-primary-color,#0f172a)]"
                style="border-color: var(--success-color,#52C41A);"
              >
                <p>${this.msg['action.manageMenuItem.success']}</p>
              </div>
            ` : ''}
            ${this.manageMenuItemState === 'error' ? html`
              <div
                class="rounded-md p-3 border text-sm text-[var(--text-primary-color,#0f172a)]"
                style="border-color: var(--error-color,#FF4D4F);"
              >
                <p>${this.manageMenuItemError || this.msg['action.manageMenuItem.error']}</p>
              </div>
            ` : ''}

            <!-- Submit -->
            <div class="flex justify-end">
              <button
                type="button"
                class="px-6 py-2 rounded-md bg-[var(--active-color,#1890FF)] text-white font-medium hover:opacity-90 disabled:opacity-50"
                ?disabled="${isManageLoading}"
                @click="${(e: Event) => this.handleManageMenuItemClick(e)}"
              >
                ${isManageLoading ? '…' : this.msg['action.manageMenuItem.submit']}
              </button>
            </div>
          </section>

          <!-- Section: Review -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.review.title']}
            </h2>

            ${output ? html`
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div class="flex flex-col gap-0.5">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.menuItemId.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${output.menuItemId}</dd>
                </div>
                <div class="flex flex-col gap-0.5">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.name.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${output.name}</dd>
                </div>
                <div class="flex flex-col gap-0.5 sm:col-span-2">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.description.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${output.description || '—'}</dd>
                </div>
                <div class="flex flex-col gap-0.5">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.menuCategoryId.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${output.menuCategoryId}</dd>
                </div>
                <div class="flex flex-col gap-0.5">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.price.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${output.price.toFixed(2)}</dd>
                </div>
                <div class="flex flex-col gap-0.5">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.itemType.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${output.itemType}</dd>
                </div>
                <div class="flex flex-col gap-0.5">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.status.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${statusLabel(output.status)}</dd>
                </div>
                <div class="flex flex-col gap-0.5">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.activatedAt.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${output.activatedAt || '—'}</dd>
                </div>
                <div class="flex flex-col gap-0.5">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.inactivatedAt.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${output.inactivatedAt || '—'}</dd>
                </div>
                <div class="flex flex-col gap-0.5">
                  <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.updatedAt.label']}</dt>
                  <dd class="text-[var(--text-primary-color,#0f172a)]">${output.updatedAt || '—'}</dd>
                </div>
              </dl>
            ` : html`
              <p class="text-sm text-[var(--text-primary-color,#0f172a)] py-4">
                ${this.msg['section.review.empty']}
              </p>
            `}
          </section>
        </div>
      </div>
    `;
  }
}
