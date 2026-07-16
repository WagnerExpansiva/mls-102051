/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { CafeFlowBrowseMenuItemsOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

@customElement('cafe-flow--web--desktop--page11--menu-management-102051')
export class CafeFlowDesktopPage11MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const items: CafeFlowBrowseMenuItemsOutputItem[] = this.browseMenuItemsData?.items ?? [];
    const isBrowseLoading = this.browseMenuItemsState === 'loading';
    const isManageLoading = this.manageMenuItemState === 'loading';
    const isManageSuccess = this.manageMenuItemState === 'success';
    const isManageError = this.manageMenuItemState === 'error';
    const hasSelection = !!this.manageMenuItemMenuItemId;

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['page.title']}
            </h1>
            ${this.activeCompanyId ? html`
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--bg-secondary-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)] text-sm font-medium"
              >
                ${this.activeCompanyId}
              </span>
            ` : ''}
          </div>

          <!-- Section 1: Discover (queue) -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e2e8f0)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['sec.discover.title']}
            </h2>

            <!-- Filters -->
            <div class="flex flex-wrap items-end gap-3">
              <label class="flex flex-col gap-1">
                <span class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  ><!-- TODO: field.statusFilter.label missing in shared -->Filtrar por status</span
                >
                <select
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.browseMenuItemsStatusFilter}"
                  @change="${this.handleBrowseMenuItemsStatusFilterChange}"
                >
                  <option value="">Todos</option>
                  <option value="draft">Rascunho</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </label>

              <label class="flex flex-col gap-1">
                <span class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  ><!-- TODO: field.menuCategoryIdFilter.label missing in shared -->Filtrar por
                  categoria</span
                >
                <input
                  type="text"
                  class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value="${this.browseMenuItemsMenuCategoryIdFilter}"
                  @input="${this.handleBrowseMenuItemsMenuCategoryIdFilterChange}"
                />
              </label>

              <button
                class="px-4 py-2 rounded-md bg-[var(--bg-secondary-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)] font-medium hover:bg-[var(--bg-secondary-color-hover,#d9d9d9)]"
                @click="${this.handleBrowseMenuItemsClick}"
              >
                ${this.msg['action.refresh.label']}
              </button>
            </div>

            <!-- Table / Loading / Empty -->
            ${isBrowseLoading
              ? html`
                  <div class="py-8 text-center text-[var(--text-primary-color,#403f3f)]">
                    ${this.msg['action.refresh.label']}…
                  </div>
                `
              : items.length === 0
                ? html`
                    <div class="py-8 text-center text-[var(--text-primary-color,#403f3f)]">
                      <!-- TODO: empty.queue missing in shared -->Nenhum item do cardápio
                      encontrado.
                    </div>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color,#403f3f)]"
                          >
                            <th class="py-2 px-3 font-medium">${this.msg['field.name.label']}</th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['field.description.label']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['field.menuCategoryId.label']}
                            </th>
                            <th class="py-2 px-3 font-medium text-right">
                              ${this.msg['field.price.label']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['field.itemType.label']}
                            </th>
                            <th class="py-2 px-3 font-medium">${this.msg['field.status.label']}</th>
                            <th class="py-2 px-3 font-medium">
                              <!-- TODO: field.activatedAt.label missing in shared -->Ativado em
                            </th>
                            <th class="py-2 px-3 font-medium">
                              <!-- TODO: field.updatedAt.label missing in shared -->Atualizado em
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${items.map(
                            (item: CafeFlowBrowseMenuItemsOutputItem) => html`
                              <tr
                                class="border-b border-[var(--grey-color,#e2e8f0)] cursor-pointer hover:bg-[var(--bg-primary-color-hover,#f2f2f2)] ${this
                                  .manageMenuItemMenuItemId === item.menuItemId
                                  ? 'bg-[var(--bg-secondary-color-lighter,#f9f9f9)]'
                                  : ''}"
                                @click="${() => {
                                  this.setManageMenuItemMenuItemId(item.menuItemId);
                                  this.setManageMenuItemName(item.name);
                                  this.setManageMenuItemDescription(item.description);
                                  this.setManageMenuItemMenuCategoryId(item.menuCategoryId);
                                  this.setManageMenuItemPrice(String(item.price));
                                  this.setManageMenuItemItemType(item.itemType);
                                  this.setManageMenuItemStatus(item.status);
                                }}"
                              >
                                <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">
                                  ${item.name}
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.description}
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.menuCategoryId}
                                </td>
                                <td
                                  class="py-2 px-3 text-right text-[var(--text-primary-color,#0f172a)]"
                                >
                                  ${item.price.toFixed(2)}
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.itemType}
                                </td>
                                <td class="py-2 px-3">
                                  <span
                                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${item
                                      .status === 'active'
                                      ? 'bg-[var(--success-color,#52C41A)]'
                                      : item.status === 'inactive'
                                        ? 'bg-[var(--error-color,#FF4D4F)]'
                                        : 'bg-[var(--warning-color,#FAAD14)]'}"
                                  >
                                    ${item.status === 'draft'
                                      ? 'Rascunho'
                                      : item.status === 'active'
                                        ? 'Ativo'
                                        : 'Inativo'}
                                  </span>
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.activatedAt || '—'}
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">
                                  ${item.updatedAt || '—'}
                                </td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                    ${this.browseMenuItemsData?.total != null
                      ? html`
                          <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                            ${this.browseMenuItemsData.total} itens
                          </div>
                        `
                      : ''}
                  `}
          </section>

          <!-- Section 2: Execute (form) -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e2e8f0)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['sec.execute.title']}
            </h2>

            ${!hasSelection
              ? html`
                  <div class="py-6 text-center text-[var(--text-primary-color,#403f3f)]">
                    <!-- TODO: empty.form missing in shared -->Selecione um item da lista para
                    editar.
                  </div>
                `
              : html`
                  <div class="space-y-4">
                    <input type="hidden" .value="${this.manageMenuItemMenuItemId}" />

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label class="flex flex-col gap-1">
                        <span class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >${this.msg['field.name.label']} *</span
                        >
                        <input
                          type="text"
                          class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                          .value="${this.manageMenuItemName}"
                          @input="${this.handleManageMenuItemNameChange}"
                        />
                      </label>

                      <label class="flex flex-col gap-1">
                        <span class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >${this.msg['field.menuCategoryId.label']} *</span
                        >
                        <input
                          type="text"
                          class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                          .value="${this.manageMenuItemMenuCategoryId}"
                          @input="${this.handleManageMenuItemMenuCategoryIdChange}"
                        />
                      </label>

                      <label class="flex flex-col gap-1">
                        <span class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >${this.msg['field.price.label']} *</span
                        >
                        <input
                          type="number"
                          step="0.01"
                          class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                          .value="${this.manageMenuItemPrice}"
                          @input="${this.handleManageMenuItemPriceChange}"
                        />
                      </label>

                      <label class="flex flex-col gap-1">
                        <span class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >${this.msg['field.itemType.label']} *</span
                        >
                        <select
                          class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                          .value="${this.manageMenuItemItemType}"
                          @change="${this.handleManageMenuItemItemTypeChange}"
                        >
                          <option value="">—</option>
                          <option value="simple">Simple</option>
                          <option value="variant">Variant</option>
                        </select>
                      </label>

                      <label class="flex flex-col gap-1">
                        <span class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >${this.msg['field.status.label']} *</span
                        >
                        <select
                          class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                          .value="${this.manageMenuItemStatus}"
                          @change="${this.handleManageMenuItemStatusChange}"
                        >
                          <option value="">—</option>
                          <option value="draft">Rascunho</option>
                          <option value="active">Ativo</option>
                          <option value="inactive">Inativo</option>
                        </select>
                      </label>
                    </div>

                    <label class="flex flex-col gap-1">
                      <span class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                        >${this.msg['field.description.label']}</span
                      >
                      <textarea
                        rows="3"
                        class="px-3 py-2 rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                        .value="${this.manageMenuItemDescription}"
                        @input="${this.handleManageMenuItemDescriptionChange}"
                      ></textarea>
                    </label>

                    <div class="flex justify-end">
                      <button
                        type="button"
                        class="px-6 py-2 rounded-md bg-[var(--active-color,#1890FF)] text-white font-medium hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                        ?disabled="${isManageLoading}"
                        @click="${this.handleManageMenuItemClick}"
                      >
                        ${isManageLoading
                          ? html`<span>${this.msg['action.manageMenuItem.label']}…</span>`
                          : this.msg['action.manageMenuItem.label']}
                      </button>
                    </div>
                  </div>
                `}
          </section>

          <!-- Section 3: Review (summary) -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e2e8f0)] p-4 space-y-3"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['sec.review.title']}
            </h2>

            ${isManageSuccess
              ? html`
                  <div
                    class="rounded-md p-3 border border-[var(--success-color,#52C41A)] text-[var(--text-primary-color,#0f172a)]"
                  >
                    <p>${this.msg['action.manageMenuItem.success']}</p>
                  </div>
                `
              : isManageError
                ? html`
                    <div
                      class="rounded-md p-3 border border-[var(--error-color,#FF4D4F)] text-[var(--text-primary-color,#0f172a)]"
                    >
                      <p>
                        ${this.manageMenuItemError || this.msg['action.manageMenuItem.error']}
                      </p>
                    </div>
                  `
                : html`
                    <div class="py-4 text-center text-[var(--text-primary-color,#403f3f)]">
                      <!-- TODO: empty.summary missing in shared -->Nenhuma operação realizada
                      ainda.
                    </div>
                  `}
          </section>
        </div>
      </div>
    `;
  }
}
