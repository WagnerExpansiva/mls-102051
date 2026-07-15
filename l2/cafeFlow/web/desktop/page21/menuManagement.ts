/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { CafeFlowBrowseMenuItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

@customElement('cafe-flow--web--desktop--page21--menu-management-102051')
export class CafeFlowDesktopPage21MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const items: CafeFlowBrowseMenuItemsOutputItem[] = this.browseMenuItemsData?.items ?? [];
    const isLoading = this.browseMenuItemsState === 'loading';
    const draftItems = items.filter((i: CafeFlowBrowseMenuItemsOutputItem) => i.status === 'draft');
    const activeItems = items.filter((i: CafeFlowBrowseMenuItemsOutputItem) => i.status === 'active');
    const inactiveItems = items.filter((i: CafeFlowBrowseMenuItemsOutputItem) => i.status === 'inactive');
    const hasItems = items.length > 0;
    const isManaging = this.manageMenuItemState === 'loading';
    const isSelected = this.manageMenuItemMenuItemId !== '';
    const total = this.browseMenuItemsData?.total ?? 0;

    const renderLane = (
      laneTitle: string,
      laneItems: CafeFlowBrowseMenuItemsOutputItem[],
    ) => html`
      <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] p-3 space-y-2 min-h-[200px]">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">${laneTitle}</h3>
          <span class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70">${laneItems.length}</span>
        </div>
        ${laneItems.length === 0
          ? html`<p class="text-xs text-[var(--text-primary-color,#403f3f)] py-4 text-center opacity-50">—</p>`
          : laneItems.map(
              (item: CafeFlowBrowseMenuItemsOutputItem) => html`
                <div
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-3 cursor-pointer hover:border-[var(--active-color,#1890FF)] transition-colors"
                  @click=${() => {
                    this.setManageMenuItemMenuItemId(item.menuItemId);
                    this.setManageMenuItemName(item.name);
                    this.setManageMenuItemDescription(item.description);
                    this.setManageMenuItemMenuCategoryId(item.menuCategoryId);
                    this.setManageMenuItemPrice(String(item.price));
                    this.setManageMenuItemItemType(item.itemType);
                    this.setManageMenuItemStatus(item.status);
                  }}
                >
                  <div class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${item.name}
                  </div>
                  <div class="text-xs text-[var(--text-primary-color,#403f3f)] mt-1">
                    ${this.msg['column.price.label']}: R$ ${item.price.toFixed(2)}
                  </div>
                  <div class="text-xs text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['column.itemType.label']}: ${item.itemType}
                  </div>
                  <div class="text-xs text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['column.menuCategoryId.label']}: ${item.menuCategoryId}
                  </div>
                </div>
              `,
            )}
      </div>
    `;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['page.menuManagement.title']}
            </h1>
            ${this.activeCompanyId
              ? html`
                  <span
                    class="inline-flex items-center rounded-md bg-[var(--bg-secondary-color,#E6E6E6)] px-3 py-1 text-sm text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.activeCompanyId}
                  </span>
                `
              : ''}
          </div>

          <!-- Section: Board -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['sec.board.title']}
              </h2>
              <span class="text-sm text-[var(--text-primary-color,#403f3f)] opacity-70">
                ${total} ${this.msg['intention.browse.title']}
              </span>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap gap-3 items-end">
              <div class="flex flex-col gap-1">
                <label
                  class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  for="filter-status"
                >
                  ${this.msg['filter.statusFilter.label']}
                </label>
                <select
                  id="filter-status"
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.browseMenuItemsStatusFilter}
                  @change=${this.handleBrowseMenuItemsStatusFilterChange}
                >
                  <option value="">—</option>
                  <option value="draft">${this.msg['status.draft']}</option>
                  <option value="active">${this.msg['status.active']}</option>
                  <option value="inactive">${this.msg['status.inactive']}</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label
                  class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  for="filter-category"
                >
                  ${this.msg['filter.menuCategoryIdFilter.label']}
                </label>
                <input
                  type="text"
                  id="filter-category"
                  class="rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.browseMenuItemsMenuCategoryIdFilter}
                  @input=${this.handleBrowseMenuItemsMenuCategoryIdFilterChange}
                  placeholder=${this.msg['filter.menuCategoryIdFilter.label']}
                />
              </div>

              <button
                type="button"
                class="rounded-md bg-[var(--active-color,#1890FF)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                ?disabled=${isLoading}
                @click=${this.handleBrowseMenuItemsClick}
              >
                ${isLoading ? '...' : this.msg['action.browseMenuItems.label']}
              </button>
            </div>

            <!-- Kanban board -->
            ${isLoading
              ? html`
                  <div class="grid grid-cols-3 gap-4">
                    ${[0, 1, 2].map(
                      () => html`
                        <div
                          class="rounded-lg border border-[var(--grey-color,#E6E6E6)] p-3 space-y-2 min-h-[200px]"
                        >
                          <div class="h-4 w-24 rounded bg-[var(--grey-color,#E6E6E6)]"></div>
                          <div class="h-16 rounded bg-[var(--grey-color,#E6E6E6)] opacity-50"></div>
                          <div class="h-16 rounded bg-[var(--grey-color,#E6E6E6)] opacity-50"></div>
                        </div>
                      `,
                    )}
                  </div>
                `
              : !hasItems
                ? html`
                    <p
                      class="text-sm text-[var(--text-primary-color,#403f3f)] py-8 text-center opacity-70"
                    >
                      ${this.msg['empty.board']}
                    </p>
                  `
                : html`
                    <div class="grid grid-cols-3 gap-4">
                      ${renderLane(this.msg['lane.draft.title'], draftItems)}
                      ${renderLane(this.msg['lane.active.title'], activeItems)}
                      ${renderLane(this.msg['lane.inactive.title'], inactiveItems)}
                    </div>
                  `}
          </section>

          <!-- Section: Detail -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['sec.detail.title']}
            </h2>

            ${!isSelected
              ? html`
                  <p
                    class="text-sm text-[var(--text-primary-color,#403f3f)] py-8 text-center opacity-70"
                  >
                    ${this.msg['empty.detail']}
                  </p>
                `
              : html`
                  <form
                    class="space-y-4"
                    @submit=${(e: Event) => {
                      e.preventDefault();
                      this.handleManageMenuItemClick(e);
                    }}
                  >
                    <input type="hidden" .value=${this.manageMenuItemMenuItemId} />

                    <div class="grid grid-cols-2 gap-4">
                      <div class="flex flex-col gap-1">
                        <label
                          class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          for="fld-name"
                        >
                          ${this.msg['field.name.label']}
                        </label>
                        <input
                          type="text"
                          id="fld-name"
                          class="rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                          .value=${this.manageMenuItemName}
                          @input=${this.handleManageMenuItemNameChange}
                        />
                      </div>

                      <div class="flex flex-col gap-1">
                        <label
                          class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          for="fld-price"
                        >
                          ${this.msg['field.price.label']}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          id="fld-price"
                          class="rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                          .value=${this.manageMenuItemPrice}
                          @input=${this.handleManageMenuItemPriceChange}
                        />
                      </div>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label
                        class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                        for="fld-description"
                      >
                        ${this.msg['field.description.label']}
                      </label>
                      <textarea
                        id="fld-description"
                        rows="3"
                        class="rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                        .value=${this.manageMenuItemDescription}
                        @input=${this.handleManageMenuItemDescriptionChange}
                      ></textarea>
                    </div>

                    <div class="grid grid-cols-3 gap-4">
                      <div class="flex flex-col gap-1">
                        <label
                          class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          for="fld-category"
                        >
                          ${this.msg['field.menuCategoryId.label']}
                        </label>
                        <input
                          type="text"
                          id="fld-category"
                          class="rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                          .value=${this.manageMenuItemMenuCategoryId}
                          @input=${this.handleManageMenuItemMenuCategoryIdChange}
                        />
                      </div>

                      <div class="flex flex-col gap-1">
                        <label
                          class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          for="fld-item-type"
                        >
                          ${this.msg['field.itemType.label']}
                        </label>
                        <select
                          id="fld-item-type"
                          class="rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                          .value=${this.manageMenuItemItemType}
                          @change=${this.handleManageMenuItemItemTypeChange}
                        >
                          <option value="">—</option>
                          <option value="simple">simple</option>
                          <option value="variant">variant</option>
                        </select>
                      </div>

                      <div class="flex flex-col gap-1">
                        <label
                          class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          for="fld-status"
                        >
                          ${this.msg['field.status.label']}
                        </label>
                        <select
                          id="fld-status"
                          class="rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                          .value=${this.manageMenuItemStatus}
                          @change=${this.handleManageMenuItemStatusChange}
                        >
                          <option value="">—</option>
                          <option value="draft">${this.msg['status.draft']}</option>
                          <option value="active">${this.msg['status.active']}</option>
                          <option value="inactive">${this.msg['status.inactive']}</option>
                        </select>
                      </div>
                    </div>

                    <!-- Feedback -->
                    ${this.manageMenuItemState === 'success'
                      ? html`
                          <div
                            class="rounded-md border border-[var(--success-color,#52C41A)] px-4 py-3 text-sm text-[var(--text-primary-color,#403f3f)]"
                          >
                            ${this.msg['action.manageMenuItem.success']}
                          </div>
                        `
                      : ''}
                    ${this.manageMenuItemState === 'error'
                      ? html`
                          <div
                            class="rounded-md border border-[var(--error-color,#FF4D4F)] px-4 py-3 text-sm text-[var(--text-primary-color,#403f3f)]"
                          >
                            ${this.manageMenuItemError || this.msg['action.manageMenuItem.error']}
                          </div>
                        `
                      : ''}

                    <!-- Submit -->
                    <div class="flex justify-end">
                      <button
                        type="submit"
                        class="rounded-md bg-[var(--active-color,#1890FF)] px-6 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                        ?disabled=${isManaging}
                      >
                        ${isManaging ? '...' : this.msg['action.manageMenuItem.label']}
                      </button>
                    </div>
                  </form>
                `}
          </section>
        </div>
      </div>
    `;
  }
}
