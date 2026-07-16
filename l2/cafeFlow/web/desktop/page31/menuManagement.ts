/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { CafeFlowBrowseMenuItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

@customElement('cafe-flow--web--desktop--page31--menu-management-102051')
export class CafeFlowDesktopPage31MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const items: CafeFlowBrowseMenuItemsOutputItem[] = this.browseMenuItemsData?.items ?? [];
    const isQueryLoading = this.browseMenuItemsState === 'loading';
    const isSubmitting = this.manageMenuItemState === 'loading';
    const output = this.manageMenuItemOutput;
    const showSuccess = this.manageMenuItemState === 'success';
    const showError = this.manageMenuItemState === 'error';

    const statusLabel = (status: string): string => {
      if (status === 'draft') return this.msg['status.draft'];
      if (status === 'active') return this.msg['status.active'];
      if (status === 'inactive') return this.msg['status.inactive'];
      return status;
    };

    const statusColor = (status: string): string => {
      if (status === 'draft') return 'var(--warning-color,#FAAD14)';
      if (status === 'active') return 'var(--success-color,#52C41A)';
      if (status === 'inactive') return 'var(--grey-color-darker,#C0C0C0)';
      return 'var(--grey-color,#E6E6E6)';
    };

    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDateTime = (value: string): string => {
      if (!value) return '—';
      try {
        return new Date(value).toLocaleString('pt-BR');
      } catch {
        return value;
      }
    };

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['page.title']}
            </h1>
            ${this.activeCompanyId ? html`
              <span class="inline-flex items-center rounded-md px-3 py-1 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] border border-[var(--grey-color,#E6E6E6)]">
                ${this.activeCompanyId}
              </span>
            ` : ''}
          </div>

          <!-- Section: Discover - queryList -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['sec.discover.title']}
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['organism.menuItemsList.title']}
            </h3>

            <!-- Filters -->
            <div class="flex flex-wrap items-end gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-xs text-[var(--text-primary-color,#403f3f)]" for="flt_status">
                  ${this.msg['filter.statusFilter']}
                </label>
                <select id="flt_status"
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-1.5 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.browseMenuItemsStatusFilter}
                  @change=${(e: Event) => this.handleBrowseMenuItemsStatusFilterChange(e)}>
                  <option value="">—</option>
                  <option value="draft" ?selected=${this.browseMenuItemsStatusFilter === 'draft'}>
                    ${this.msg['status.draft']}
                  </option>
                  <option value="active" ?selected=${this.browseMenuItemsStatusFilter === 'active'}>
                    ${this.msg['status.active']}
                  </option>
                  <option value="inactive" ?selected=${this.browseMenuItemsStatusFilter === 'inactive'}>
                    ${this.msg['status.inactive']}
                  </option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-xs text-[var(--text-primary-color,#403f3f)]" for="flt_category">
                  ${this.msg['filter.menuCategoryIdFilter']}
                </label>
                <input id="flt_category" type="text"
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-1.5 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.browseMenuItemsMenuCategoryIdFilter}
                  @input=${(e: Event) => this.handleBrowseMenuItemsMenuCategoryIdFilterChange(e)} />
              </div>

              <button
                class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-1.5 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]"
                @click=${(e: Event) => this.handleBrowseMenuItemsClick(e)}>
                ${this.msg['action.refresh']}
              </button>
            </div>

            <!-- Card list -->
            ${isQueryLoading ? html`
              <div class="space-y-2">
                ${[1, 2, 3].map(() => html`
                  <div class="h-20 rounded-md bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>
                `)}
              </div>
            ` : items.length === 0 ? html`
              <p class="text-sm text-[var(--text-primary-color-disabled,#525151)] py-4">
                ${this.msg['empty.menuItems']}
              </p>
            ` : html`
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                ${items.map((item: CafeFlowBrowseMenuItemsOutputItem) => html`
                  <div
                    class="rounded-md border border-[var(--grey-color,#E6E6E6)] p-3 space-y-2 cursor-pointer hover:border-[var(--active-color,#1890FF)] bg-[var(--bg-primary-color,#ffffff)]"
                    @click=${() => this.setManageMenuItemMenuItemId(item.menuItemId)}>
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-sm text-[var(--text-primary-color,#403f3f)]">
                        ${item.name}
                      </span>
                      <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
                        style="background:${statusColor(item.status)};">
                        ${statusLabel(item.status)}
                      </span>
                    </div>
                    <div class="text-xs text-[var(--text-primary-color-disabled,#525151)]">
                      ${item.description || ''}
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-[var(--text-primary-color,#403f3f)]">
                        ${formatCurrency(item.price)}
                      </span>
                      <span class="text-[var(--text-primary-color-disabled,#525151)]">
                        ${item.itemType} · ${item.menuCategoryId}
                      </span>
                    </div>
                  </div>
                `)}
              </div>
            `}
          </section>

          <!-- Section: Execute - commandForm -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['sec.execute.title']}
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['organism.manageItemForm.title']}
            </h3>

            <form class="space-y-3" @submit=${(e: Event) => { e.preventDefault(); this.handleManageMenuItemClick(e); }}>
              <input type="hidden" .value=${this.manageMenuItemMenuItemId} />

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]" for="fld_name">
                  ${this.msg['field.name']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <input id="fld_name" type="text" required
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemName}
                  @input=${(e: Event) => this.handleManageMenuItemNameChange(e)} />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]" for="fld_description">
                  ${this.msg['field.description']}
                </label>
                <textarea id="fld_description" rows="2"
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemDescription}
                  @input=${(e: Event) => this.handleManageMenuItemDescriptionChange(e)}></textarea>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]" for="fld_menuCategoryId">
                  ${this.msg['field.menuCategoryId']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <input id="fld_menuCategoryId" type="text" required
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemMenuCategoryId}
                  @input=${(e: Event) => this.handleManageMenuItemMenuCategoryIdChange(e)} />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]" for="fld_price">
                  ${this.msg['field.price']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <input id="fld_price" type="number" step="0.01" required
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemPrice}
                  @input=${(e: Event) => this.handleManageMenuItemPriceChange(e)} />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]" for="fld_itemType">
                  ${this.msg['field.itemType']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <select id="fld_itemType" required
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemItemType}
                  @change=${(e: Event) => this.handleManageMenuItemItemTypeChange(e)}>
                  <option value="">—</option>
                  <option value="simple" ?selected=${this.manageMenuItemItemType === 'simple'}>simple</option>
                  <option value="variant" ?selected=${this.manageMenuItemItemType === 'variant'}>variant</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]" for="fld_status">
                  ${this.msg['field.status']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <select id="fld_status" required
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemStatus}
                  @change=${(e: Event) => this.handleManageMenuItemStatusChange(e)}>
                  <option value="">—</option>
                  <option value="draft" ?selected=${this.manageMenuItemStatus === 'draft'}>
                    ${this.msg['status.draft']}
                  </option>
                  <option value="active" ?selected=${this.manageMenuItemStatus === 'active'}>
                    ${this.msg['status.active']}
                  </option>
                  <option value="inactive" ?selected=${this.manageMenuItemStatus === 'inactive'}>
                    ${this.msg['status.inactive']}
                  </option>
                </select>
              </div>

              <div class="flex items-center gap-3">
                <button type="submit"
                  class="rounded-md px-4 py-2 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${isSubmitting}>
                  ${isSubmitting ? '...' : this.msg['action.manageMenuItem.submit']}
                </button>
              </div>
            </form>

            <!-- Feedback -->
            ${showSuccess ? html`
              <div class="rounded-md p-3 text-sm bg-[var(--success-color,#52C41A)] text-white">
                ${this.msg['action.manageMenuItem.success']}
              </div>
            ` : ''}
            ${showError ? html`
              <div class="rounded-md p-3 text-sm bg-[var(--error-color,#FF4D4F)] text-white">
                ${this.manageMenuItemError || this.msg['action.manageMenuItem.error']}
              </div>
            ` : ''}
          </section>

          <!-- Section: Review - summary -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['sec.review.title']}
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['organism.actionFeedback.title']}
            </h3>

            ${output ? html`
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.name']}</span>
                  <p class="text-[var(--text-primary-color,#403f3f)] font-medium">${output.name}</p>
                </div>
                <div>
                  <span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.status']}</span>
                  <p>
                    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
                      style="background:${statusColor(output.status)};">
                      ${statusLabel(output.status)}
                    </span>
                  </p>
                </div>
                <div>
                  <span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.price']}</span>
                  <p class="text-[var(--text-primary-color,#403f3f)] font-medium">${formatCurrency(output.price)}</p>
                </div>
                <div>
                  <span class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.updatedAt']}</span>
                  <p class="text-[var(--text-primary-color,#403f3f)] font-medium">${formatDateTime(output.updatedAt)}</p>
                </div>
              </div>
            ` : html`
              <p class="text-sm text-[var(--text-primary-color-disabled,#525151)] py-2">
                ${this.msg['section.review.empty']}
              </p>
            `}
          </section>
        </div>
      </div>
    `;
  }
}
