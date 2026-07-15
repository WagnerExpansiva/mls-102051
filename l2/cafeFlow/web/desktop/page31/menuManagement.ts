/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';

@customElement('cafe-flow--web--desktop--page31--menu-management-102051')
export class CafeFlowDesktopPage31MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const items = this.browseMenuItemsData?.items ?? [];
    const isLoadingList = this.browseMenuItemsState === 'loading';
    const isSubmitting = this.manageMenuItemState === 'loading';
    const showSuccess = this.manageMenuItemState === 'success';
    const showError = this.manageMenuItemState === 'error';
    const output = this.manageMenuItemOutput;

    const statusLabel = (s: string): string => {
      if (s === 'draft') return this.msg['status.draft'];
      if (s === 'active') return this.msg['status.active'];
      if (s === 'inactive') return this.msg['status.inactive'];
      return s;
    };

    const statusBadgeClass = (s: string): string => {
      if (s === 'draft') return 'bg-[var(--warning-color,#FAAD14)] text-[var(--bg-primary-color,#ffffff)]';
      if (s === 'active') return 'bg-[var(--success-color,#52C41A)] text-[var(--bg-primary-color,#ffffff)]';
      if (s === 'inactive') return 'bg-[var(--grey-color-darker,#C0C0C0)] text-[var(--bg-primary-color,#ffffff)]';
      return 'bg-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)]';
    };

    const formatPrice = (p: number): string => {
      return `R$ ${p.toFixed(2)}`;
    };

    const formatDate = (d: string): string => {
      if (!d) return '—';
      try {
        return new Date(d).toLocaleString('pt-BR');
      } catch {
        return d;
      }
    };

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <div class="flex items-center justify-between flex-wrap gap-2">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['page.menuManagement.title']}
            </h1>
            ${this.activeCompanyId
              ? html`<span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[var(--bg-secondary-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.activeCompanyId}
                </span>`
              : null}
          </div>

          <!-- Section 1: Discover – Menu Items Card List -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['organism.menuItemsList.title']}
              </h2>
              <button
                class="px-3 py-1.5 text-sm rounded border border-[var(--grey-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color,#e6e6e6)]"
                @click=${(e: Event) => this.handleBrowseMenuItemsClick(e)}
              >
                ${this.msg['action.refresh']}
              </button>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                  >${this.msg['filter.statusFilter']}</label
                >
                <select
                  class="px-2 py-1.5 text-sm rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.browseMenuItemsStatusFilter}
                  @change=${(e: Event) => this.handleBrowseMenuItemsStatusFilterChange(e)}
                >
                  <option value="">—</option>
                  <option value="draft">${this.msg['status.draft']}</option>
                  <option value="active">${this.msg['status.active']}</option>
                  <option value="inactive">${this.msg['status.inactive']}</option>
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs text-[var(--text-primary-color,#403f3f)]"
                  >${this.msg['filter.menuCategoryIdFilter']}</label
                >
                <input
                  type="text"
                  class="px-2 py-1.5 text-sm rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.browseMenuItemsMenuCategoryIdFilter}
                  @input=${(e: Event) => this.handleBrowseMenuItemsMenuCategoryIdFilterChange(e)}
                />
              </div>
            </div>

            <!-- Card list / loading / empty -->
            ${isLoadingList
              ? html`<div class="space-y-3">
                  ${[1, 2, 3].map(
                    () => html`
                      <div
                        class="h-24 rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-secondary-color,#e6e6e6)] animate-pulse"
                      ></div>
                    `,
                  )}
                </div>`
              : items.length === 0
                ? html`<p class="text-sm text-[var(--text-primary-color,#403f3f)] py-4">
                    ${this.msg['empty.menuItems']}
                  </p>`
                : html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${items.map(
                      (item) => html`
                        <div
                          class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-3 space-y-2"
                        >
                          <div class="flex items-start justify-between gap-2">
                            <span
                              class="font-medium text-sm text-[var(--text-primary-color,#403f3f)]"
                              >${item.name}</span
                            >
                            <span
                              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs ${statusBadgeClass(
                                item.status,
                              )}"
                            >
                              ${statusLabel(item.status)}
                            </span>
                          </div>
                          ${item.description
                            ? html`<p
                                class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                              >
                                ${item.description}
                              </p>`
                            : null}
                          <div
                            class="flex items-center gap-3 text-xs text-[var(--text-primary-color,#403f3f)]"
                          >
                            <span>${this.msg['field.price']}: ${formatPrice(item.price)}</span>
                            <span>${this.msg['field.itemType']}: ${item.itemType}</span>
                          </div>
                          <div
                            class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                          >
                            ${this.msg['field.menuCategoryId']}: ${item.menuCategoryId}
                          </div>
                          <button
                            class="w-full mt-1 px-3 py-1.5 text-xs rounded border border-[var(--grey-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color,#e6e6e6)]"
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
                            ${this.msg['action.selectItem']}
                          </button>
                        </div>
                      `,
                    )}
                  </div>`}
          </section>

          <!-- Section 2: Execute – Manage Item Form -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['organism.manageItemForm.title']}
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- menuItemId is hidden -->
              <input type="hidden" .value=${this.manageMenuItemMenuItemId} />

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  >${this.msg['field.name']} *</label
                >
                <input
                  type="text"
                  class="px-3 py-2 text-sm rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemName}
                  @input=${(e: Event) => this.handleManageMenuItemNameChange(e)}
                />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  >${this.msg['field.menuCategoryId']} *</label
                >
                <input
                  type="text"
                  class="px-3 py-2 text-sm rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemMenuCategoryId}
                  @input=${(e: Event) => this.handleManageMenuItemMenuCategoryIdChange(e)}
                />
              </div>

              <div class="flex flex-col gap-1 sm:col-span-2">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  >${this.msg['field.description']}</label
                >
                <textarea
                  class="px-3 py-2 text-sm rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  rows="2"
                  .value=${this.manageMenuItemDescription}
                  @input=${(e: Event) => this.handleManageMenuItemDescriptionChange(e)}
                ></textarea>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  >${this.msg['field.price']} *</label
                >
                <input
                  type="number"
                  step="0.01"
                  class="px-3 py-2 text-sm rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemPrice}
                  @input=${(e: Event) => this.handleManageMenuItemPriceChange(e)}
                />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  >${this.msg['field.itemType']} *</label
                >
                <select
                  class="px-3 py-2 text-sm rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemItemType}
                  @change=${(e: Event) => this.handleManageMenuItemItemTypeChange(e)}
                >
                  <option value="">—</option>
                  <!-- TODO: no i18n key for itemType enum values -->
                  <option value="simple">simple</option>
                  <option value="variant">variant</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  >${this.msg['field.status']} *</label
                >
                <select
                  class="px-3 py-2 text-sm rounded border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.manageMenuItemStatus}
                  @change=${(e: Event) => this.handleManageMenuItemStatusChange(e)}
                >
                  <option value="">—</option>
                  <option value="draft">${this.msg['status.draft']}</option>
                  <option value="active">${this.msg['status.active']}</option>
                  <option value="inactive">${this.msg['status.inactive']}</option>
                </select>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button
                class="px-4 py-2 text-sm font-medium rounded bg-[var(--active-color,#1890ff)] text-[var(--bg-primary-color,#ffffff)] hover:opacity-90 disabled:opacity-50"
                ?disabled=${isSubmitting}
                @click=${(e: Event) => this.handleManageMenuItemClick(e)}
              >
                ${this.msg['action.manageMenuItem.submit']}
              </button>
              ${isSubmitting
                ? html`<span class="text-sm text-[var(--text-primary-color,#403f3f)]">…</span>`
                : null}
            </div>

            <!-- Feedback region -->
            ${showSuccess || showError
              ? html`<div
                  class="flex items-start justify-between gap-3 rounded-lg p-3 border bg-[var(--bg-secondary-color,#e6e6e6)] ${showSuccess
                    ? 'border-[var(--success-color,#52C41A)]'
                    : 'border-[var(--error-color,#FF4D4F)]'}"
                >
                  <p
                    class="text-sm ${showSuccess
                      ? 'text-[var(--success-color,#52C41A)]'
                      : 'text-[var(--error-color,#FF4D4F)]'}"
                  >
                    ${showSuccess
                      ? this.msg['action.manageMenuItem.success']
                      : this.manageMenuItemError || this.msg['action.manageMenuItem.error']}
                  </p>
                  <button
                    class="text-sm text-[var(--text-primary-color,#403f3f)] hover:opacity-70"
                    @click=${() => {
                      this.manageMenuItemState = 'idle';
                    }}
                  >
                    ✕
                  </button>
                </div>`
              : null}
          </section>

          <!-- Section 3: Review – Summary -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['organism.actionFeedback.title']}
            </h2>
            ${output
              ? html`<dl class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div class="flex flex-col gap-1">
                    <dt
                      class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >
                      ${this.msg['field.name']}
                    </dt>
                    <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">
                      ${output.name}
                    </dd>
                  </div>
                  <div class="flex flex-col gap-1">
                    <dt
                      class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >
                      ${this.msg['field.status']}
                    </dt>
                    <dd class="text-sm">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs ${statusBadgeClass(
                          output.status,
                        )}"
                      >
                        ${statusLabel(output.status)}
                      </span>
                    </dd>
                  </div>
                  <div class="flex flex-col gap-1">
                    <dt
                      class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >
                      ${this.msg['field.price']}
                    </dt>
                    <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">
                      ${formatPrice(output.price)}
                    </dd>
                  </div>
                  <div class="flex flex-col gap-1">
                    <dt
                      class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
                    >
                      ${this.msg['field.updatedAt']}
                    </dt>
                    <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">
                      ${formatDate(output.updatedAt)}
                    </dd>
                  </div>
                </dl>`
              : html`<p
                  class="text-sm text-[var(--text-primary-color,#403f3f)] opacity-60 py-2"
                >
                  ${this.msg['section.review.empty']}
                </p>`}
          </section>
        </div>
      </div>
    `;
  }
}
