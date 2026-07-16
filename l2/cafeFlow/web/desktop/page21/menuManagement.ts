/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { CafeFlowBrowseMenuItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

@customElement('cafe-flow--web--desktop--page21--menu-management--102051')
export class CafeFlowDesktopPage21MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const items: CafeFlowBrowseMenuItemsOutputItem[] = this.browseMenuItemsData?.items ?? [];
    const isLoading: boolean = this.browseMenuItemsState === 'loading';
    const isSaving: boolean = this.manageMenuItemState === 'loading';
    const currentStatus: string = this.manageMenuItemStatus;
    const showEmpty: boolean = this.manageMenuItemMenuItemId === '' && this.manageMenuItemStatus === '';

    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    };

    const statusLabel = (status: string): string => {
      if (status === 'active') return this.msg['status.active'];
      if (status === 'inactive') return this.msg['status.inactive'];
      return this.msg['status.draft'];
    };

    const statusBadgeClass = (status: string): string => {
      if (status === 'active') return 'bg-[var(--success-color,#52C41A)] text-white';
      if (status === 'inactive') return 'bg-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)]';
      return 'bg-[var(--warning-color,#FAAD14)] text-white';
    };

    // Allowed transitions per rules: draft->active, active->inactive, inactive->active
    // Draft action also available from active/inactive per layout definition
    const transitions: { status: string; labelKey: string }[] = [];
    if (currentStatus === 'draft') {
      transitions.push({ status: 'active', labelKey: 'action.activate.label' });
    } else if (currentStatus === 'active') {
      transitions.push({ status: 'inactive', labelKey: 'action.inactivate.label' });
      transitions.push({ status: 'draft', labelKey: 'action.draft.label' });
    } else if (currentStatus === 'inactive') {
      transitions.push({ status: 'active', labelKey: 'action.activate.label' });
      transitions.push({ status: 'draft', labelKey: 'action.draft.label' });
    }

    const selectItem = (item: CafeFlowBrowseMenuItemsOutputItem): void => {
      this.setManageMenuItemMenuItemId(item.menuItemId);
      this.setManageMenuItemName(item.name);
      this.setManageMenuItemDescription(item.description);
      this.setManageMenuItemMenuCategoryId(item.menuCategoryId);
      this.setManageMenuItemPrice(String(item.price));
      this.setManageMenuItemItemType(item.itemType);
      this.setManageMenuItemStatus(item.status);
    };

    const newItem = (): void => {
      this.setManageMenuItemMenuItemId('');
      this.setManageMenuItemName('');
      this.setManageMenuItemDescription('');
      this.setManageMenuItemMenuCategoryId('');
      this.setManageMenuItemPrice('');
      this.setManageMenuItemItemType('simple');
      this.setManageMenuItemStatus('draft');
    };

    const doTransition = (targetStatus: string): void => {
      this.setManageMenuItemStatus(targetStatus);
      this.handleManageMenuItemClick(new Event('click'));
    };

    return html`
      <div class="min-h-screen bg-[var(--bg-primary-color,#ffffff)] p-4 md:p-6">
        <!-- Page title -->
        <h1 class="text-xl md:text-2xl font-bold text-[var(--text-primary-color,#403f3f)] mb-4">
          ${this.msg['page.title']}
        </h1>

        <!-- Business context badge -->
        ${this.activeCompanyId ? html`
          <div class="mb-4 inline-flex items-center gap-2 rounded-lg bg-[var(--bg-secondary-color,#E6E6E6)] px-3 py-1 text-sm text-[var(--text-primary-color,#403f3f)]">
            <span class="font-medium">${this.activeCompanyId}</span>
          </div>
        ` : ''}

        <!-- Summary stats -->
        <div class="mb-4 flex flex-wrap gap-3">
          <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-4 py-2">
            <span class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['section.menuItems.title']}</span>
            <span class="ml-2 text-lg font-bold text-[var(--text-primary-color,#403f3f)]">${this.browseMenuItemsData?.total ?? 0}</span>
          </div>
        </div>

        <!-- Master-detail layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Left: List with filters -->
          <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4">
            <!-- Filters bar -->
            <div class="mb-3 flex flex-wrap items-end gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-xs text-[var(--text-primary-color-lighter,#535353)]" for="statusFilter">
                  ${this.msg['filter.statusFilter.label']}
                </label>
                <select
                  id="statusFilter"
                  class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                  .value="${this.browseMenuItemsStatusFilter}"
                  @change="${(e: Event) => this.handleBrowseMenuItemsStatusFilterChange(e)}"
                >
                  <option value="">${this.msg['filter.statusFilter.label']}</option>
                  <option value="draft">${this.msg['status.draft']}</option>
                  <option value="active">${this.msg['status.active']}</option>
                  <option value="inactive">${this.msg['status.inactive']}</option>
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs text-[var(--text-primary-color-lighter,#535353)]" for="categoryFilter">
                  ${this.msg['filter.menuCategoryIdFilter.label']}
                </label>
                <input
                  id="categoryFilter"
                  type="text"
                  class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                  .value="${this.browseMenuItemsMenuCategoryIdFilter}"
                  @input="${(e: Event) => this.handleBrowseMenuItemsMenuCategoryIdFilterChange(e)}"
                  placeholder="${this.msg['filter.menuCategoryIdFilter.label']}"
                />
              </div>
              <button
                class="rounded-lg bg-[var(--bg-secondary-color,#E6E6E6)] px-4 py-2 text-sm font-medium text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color-hover,#d9d9d9)]"
                @click="${(e: Event) => this.handleBrowseMenuItemsClick(e)}"
              >
                ${this.msg['action.refresh.label']}
              </button>
              <button
                class="rounded-lg bg-[var(--active-color,#1890FF)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--active-color-hover,#1a99ff)]"
                @click="${() => newItem()}"
              >
                ${this.msg['action.newItem.label']}
              </button>
            </div>

            <!-- List -->
            ${isLoading ? html`
              <div class="space-y-2">
                ${[0, 1, 2, 3].map(() => html`
                  <div class="h-16 rounded-lg bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>
                `)}
              </div>
            ` : items.length === 0 ? html`
              <div class="py-8 text-center text-sm text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['section.menuItems.empty']}
              </div>
            ` : html`
              <div class="space-y-2 max-h-[600px] overflow-y-auto">
                ${items.map((item: CafeFlowBrowseMenuItemsOutputItem) => html`
                  <button
                    class="w-full text-left rounded-lg border p-3 transition-colors ${this.manageMenuItemMenuItemId === item.menuItemId
                      ? 'border-[var(--active-color,#1890FF)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)]'
                      : 'border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]'}"
                    @click="${() => selectItem(item)}"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <div class="min-w-0 flex-1">
                        <div class="truncate font-medium text-[var(--text-primary-color,#403f3f)]">${item.name}</div>
                        <div class="mt-1 flex items-center gap-2 text-xs text-[var(--text-primary-color-lighter,#535353)]">
                          <span>${item.menuCategoryId}</span>
                          <span>&middot;</span>
                          <span>${formatPrice(item.price)}</span>
                          <span>&middot;</span>
                          <span>${item.itemType}</span>
                        </div>
                      </div>
                      <span class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(item.status)}">
                        ${statusLabel(item.status)}
                      </span>
                    </div>
                  </button>
                `)}
              </div>
            `}
          </div>

          <!-- Right: Detail / Edit panel -->
          <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4">
            ${showEmpty ? html`
              <div class="py-8 text-center text-sm text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['section.menuItemEditor.empty']}
              </div>
            ` : html`
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['section.menuItemEditor.title']}
                </h2>
                ${currentStatus ? html`
                  <span class="rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(currentStatus)}">
                    ${statusLabel(currentStatus)}
                  </span>
                ` : ''}
              </div>

              <!-- Feedback region -->
              ${this.manageMenuItemState === 'success' ? html`
                <div class="mb-4 rounded-lg border border-[var(--success-color,#52C41A)] bg-[var(--grey-color-light,#F2F2F2)] px-4 py-2 text-sm text-[var(--success-color-focus,#4ca610)]">
                  ${this.msg['action.manageMenuItem.success']}
                </div>
              ` : ''}
              ${this.manageMenuItemState === 'error' ? html`
                <div class="mb-4 rounded-lg border border-[var(--error-color,#FF4D4F)] bg-[var(--grey-color-light,#F2F2F2)] px-4 py-2 text-sm text-[var(--error-color-focus,#e63e3e)]">
                  ${this.manageMenuItemError || this.msg['action.manageMenuItem.error']}
                </div>
              ` : ''}

              <!-- Form fields -->
              <div class="space-y-3">
                <!-- Name -->
                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld_name">
                    ${this.msg['field.name.label']}
                  </label>
                  <input
                    id="fld_name"
                    type="text"
                    class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemName}"
                    @input="${(e: Event) => this.handleManageMenuItemNameChange(e)}"
                  />
                </div>

                <!-- Description -->
                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld_description">
                    ${this.msg['field.description.label']}
                  </label>
                  <textarea
                    id="fld_description"
                    rows="2"
                    class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemDescription}"
                    @input="${(e: Event) => this.handleManageMenuItemDescriptionChange(e)}"
                  ></textarea>
                </div>

                <!-- Category -->
                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld_category">
                    ${this.msg['field.menuCategoryId.label']}
                  </label>
                  <input
                    id="fld_category"
                    type="text"
                    class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemMenuCategoryId}"
                    @input="${(e: Event) => this.handleManageMenuItemMenuCategoryIdChange(e)}"
                  />
                </div>

                <!-- Price -->
                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld_price">
                    ${this.msg['field.price.label']}
                  </label>
                  <input
                    id="fld_price"
                    type="number"
                    step="0.01"
                    class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemPrice}"
                    @input="${(e: Event) => this.handleManageMenuItemPriceChange(e)}"
                  />
                </div>

                <!-- Item Type -->
                <div class="flex flex-col gap-1">
                  <label class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld_itemType">
                    ${this.msg['field.itemType.label']}
                  </label>
                  <select
                    id="fld_itemType"
                    class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                    .value="${this.manageMenuItemItemType}"
                    @change="${(e: Event) => this.handleManageMenuItemItemTypeChange(e)}"
                  >
                    <option value="simple">simple</option>
                    <option value="variant">variant</option>
                  </select>
                </div>
              </div>

              <!-- Contextual transition actions -->
              ${transitions.length > 0 ? html`
                <div class="mt-4 border-t border-[var(--grey-color,#E6E6E6)] pt-4">
                  <div class="flex flex-wrap gap-2">
                    ${transitions.map((t: { status: string; labelKey: string }) => html`
                      <button
                        class="rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t.status === 'active'
                          ? 'bg-[var(--success-color,#52C41A)] text-white hover:bg-[var(--success-color-hover,#66d93f)]'
                          : t.status === 'inactive'
                          ? 'bg-[var(--error-color,#FF4D4F)] text-white hover:bg-[var(--error-color-hover,#ff6666)]'
                          : 'bg-[var(--warning-color,#FAAD14)] text-white hover:bg-[var(--warning-color-hover,#fbbd34)]'}"
                        ?disabled="${isSaving}"
                        @click="${() => doTransition(t.status)}"
                      >
                        ${isSaving ? '...' : this.msg[t.labelKey]}
                      </button>
                    `)}
                  </div>
                </div>
              ` : ''}

              <!-- Save + Clear buttons -->
              <div class="mt-4 flex gap-2">
                <button
                  class="flex-1 rounded-lg bg-[var(--active-color,#1890FF)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled="${isSaving}"
                  @click="${(e: Event) => this.handleManageMenuItemClick(e)}"
                >
                  ${isSaving ? '...' : this.msg['action.save.label']}
                </button>
                <button
                  class="rounded-lg border border-[var(--grey-color,#E6E6E6)] px-4 py-2 text-sm font-medium text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color,#E6E6E6)]"
                  @click="${() => newItem()}"
                >
                  ${this.msg['action.clear.label']}
                </button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }
}
