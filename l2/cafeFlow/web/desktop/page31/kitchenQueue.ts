/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page31--kitchen-queue-102051')
export class CafeFlowDesktopPage31KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const items = this.viewKitchenBoardData?.items ?? [];
    const isLoadingBoard = this.viewKitchenBoardState === 'loading';
    const isSubmitting = this.updateOrderStatusState === 'loading';
    const isSuccess = this.updateOrderStatusState === 'success';
    const isError = this.updateOrderStatusState === 'error';
    const hasSelectedOrder = this.updateOrderStatusOrderId !== '';

    const sortedItems = [...items].sort((a, b) => {
      if (a.priority !== b.priority) return a.priority ? -1 : 1;
      return (a.receivedAt || '').localeCompare(b.receivedAt || '');
    });

    const renderStatusBadge = (status: string) => {
      if (status === 'received') {
        return html`<span class="inline-block px-2 py-0.5 rounded text-xs font-medium text-white" style="background-color: var(--warning-color,#FAAD14)">${this.msg['status.received.label']}</span>`;
      }
      if (status === 'inPreparation') {
        return html`<span class="inline-block px-2 py-0.5 rounded text-xs font-medium text-white" style="background-color: var(--active-color,#1890FF)">${this.msg['status.inPreparation.label']}</span>`;
      }
      if (status === 'ready') {
        return html`<span class="inline-block px-2 py-0.5 rounded text-xs font-medium text-white" style="background-color: var(--success-color,#52C41A)">${this.msg['status.ready.label']}</span>`;
      }
      if (status === 'delivered') {
        return html`<span class="inline-block px-2 py-0.5 rounded text-xs font-medium text-white" style="background-color: var(--text-secondary-color,#1C91CD)">${this.msg['status.delivered.label']}</span>`;
      }
      if (status === 'registered') {
        return html`<span class="inline-block px-2 py-0.5 rounded text-xs font-medium text-[var(--text-primary-color,#0f172a)]" style="background-color: var(--grey-color,#E6E6E6)">${this.msg['status.registered.label']}</span>`;
      }
      return html`<span class="inline-block px-2 py-0.5 rounded text-xs text-[var(--text-primary-color,#0f172a)]">${status}</span>`;
    };

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Kitchen Queue -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['sec.kitchen.queue.title']}
              </h2>
              <button
                class="px-3 py-1.5 rounded text-sm border border-[var(--grey-color,#e2e8f0)] text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--bg-secondary-color,#f5f5f5)] disabled:opacity-50"
                @click=${(e: Event) => this.handleViewKitchenBoardClick(e)}
                ?disabled=${isLoadingBoard}
              >
                ${this.msg['action.refresh']}
              </button>
            </div>

            ${isLoadingBoard
              ? html`<div class="space-y-2">
                  ${[1, 2, 3].map(() =>
                    html`<div class="h-12 rounded bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>`
                  )}
                </div>`
              : sortedItems.length === 0
                ? html`<p class="text-sm text-[var(--text-primary-color-disabled,#696969)] py-4">
                    ${this.msg['section.queue.empty']}
                  </p>`
                : html`<div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead>
                        <tr class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color,#0f172a)]">
                          <th class="py-2 px-2 font-medium">${this.msg['column.orderId']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.status']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.orderType']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.tableNumber']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.priority']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.priorityReason']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.receivedAt']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.inPreparationAt']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.createdAt']}</th>
                          <th class="py-2 px-2 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        ${sortedItems.map((item) => {
                          const isSelected = this.updateOrderStatusOrderId === item.orderId;
                          return html`
                            <tr
                              class="border-b border-[var(--grey-color-light,#F2F2F2)] cursor-pointer ${isSelected ? 'bg-[var(--bg-secondary-color-light,#F2F2F2)]' : ''}"
                              style=${item.priority ? 'border-left: 4px solid var(--warning-color,#FAAD14)' : ''}
                              @click=${() => this.setUpdateOrderStatusOrderId(item.orderId)}
                            >
                              <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)] font-medium">${item.orderId}</td>
                              <td class="py-2 px-2">${renderStatusBadge(item.status)}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)]">${item.orderType}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)]">${item.tableNumber || '—'}</td>
                              <td class="py-2 px-2">
                                ${item.priority
                                  ? html`<span class="inline-block px-2 py-0.5 rounded text-xs font-medium text-white" style="background-color: var(--warning-color,#FAAD14)">${this.msg['column.priority']}</span>`
                                  : '—'}
                              </td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)]">${item.priorityReason || '—'}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)]">${item.receivedAt || '—'}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)]">${item.inPreparationAt || '—'}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)]">${item.createdAt || '—'}</td>
                              <td class="py-2 px-2">
                                <button
                                  class="px-2 py-1 rounded text-xs border border-[var(--grey-color,#e2e8f0)] text-[var(--text-primary-color,#0f172a)] hover:bg-[var(--bg-secondary-color,#f5f5f5)]"
                                  @click=${(e: Event) => { e.stopPropagation(); this.setUpdateOrderStatusOrderId(item.orderId); }}
                                >
                                  ${this.msg['action.select']}
                                </button>
                              </td>
                            </tr>
                          `;
                        })}
                      </tbody>
                    </table>
                  </div>`}
          </section>

          <!-- Section: Order Transition -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['sec.order.transition.title']}
            </h2>

            ${!hasSelectedOrder
              ? html`<p class="text-sm text-[var(--text-primary-color-disabled,#696969)] py-4">
                  ${this.msg['section.transition.empty']}
                </p>`
              : html`<form class="space-y-4" @submit=${(e: Event) => { e.preventDefault(); this.handleUpdateOrderStatusClick(e); }}>
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                      ${this.msg['field.orderId']}
                    </label>
                    <input
                      type="text"
                      class="w-full px-3 py-2 rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color,#0f172a)]"
                      .value=${this.updateOrderStatusOrderId}
                      readonly
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                      ${this.msg['field.status']}
                    </label>
                    <select
                      class="w-full px-3 py-2 rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                      .value=${this.updateOrderStatusStatus}
                      @change=${(e: Event) => this.handleUpdateOrderStatusStatusChange(e)}
                    >
                      <option value="">—</option>
                      <option value="inPreparation" ?selected=${this.updateOrderStatusStatus === 'inPreparation'}>
                        ${this.msg['status.inPreparation.label']}
                      </option>
                      <option value="ready" ?selected=${this.updateOrderStatusStatus === 'ready'}>
                        ${this.msg['status.ready.label']}
                      </option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                    ?disabled=${isSubmitting || !this.updateOrderStatusStatus}
                  >
                    ${isSubmitting ? '...' : ''} ${this.msg['action.updateOrderStatus']}
                  </button>
                </form>`}

            ${isSuccess
              ? html`<div
                  class="rounded p-3 text-sm border text-[var(--text-primary-color,#0f172a)]"
                  style="border-color: var(--success-color,#52C41A); background-color: var(--grey-color-lighter,#F9FAFB)"
                >
                  ${this.msg['action.updateOrderStatus.success']}
                </div>`
              : null}
            ${isError
              ? html`<div
                  class="rounded p-3 text-sm border text-[var(--text-primary-color,#0f172a)]"
                  style="border-color: var(--error-color,#FF4D4F); background-color: var(--grey-color-lighter,#F9FAFB)"
                >
                  ${this.updateOrderStatusError || this.msg['action.updateOrderStatus.error']}
                </div>`
              : null}
          </section>
        </div>
      </div>
    `;
  }
}
