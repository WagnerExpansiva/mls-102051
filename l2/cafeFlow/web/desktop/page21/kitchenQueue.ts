/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';
import type { CafeFlowViewKitchenBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page21--kitchen-queue-102051')
export class CafeFlowDesktopPage21KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const items: CafeFlowViewKitchenBoardOutputItem[] = this.viewKitchenBoardData.items ?? [];
    const isLoadingBoard: boolean = this.viewKitchenBoardState === 'loading';
    const isSubmitting: boolean = this.updateOrderStatusState === 'loading';
    const showSuccess: boolean = this.updateOrderStatusState === 'success';
    const showError: boolean = this.updateOrderStatusState === 'error';
    const selectedOrderId: string = this.updateOrderStatusOrderId;

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Kitchen Board (queryList) -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['section.discover.title']}
              </h2>
              <button
                class="px-3 py-1.5 rounded text-sm border border-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color,#E6E6E6)] disabled:opacity-50"
                @click="${this.handleViewKitchenBoardClick}"
                ?disabled="${isLoadingBoard}"
              >
                ${this.msg['action.viewKitchenBoard.label']}
              </button>
            </div>

            ${isLoadingBoard
              ? html`<div class="space-y-3">
                  ${[0, 1, 2].map(
                    (_i: number) => html`
                      <div
                        class="h-24 rounded-lg bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"
                      ></div>
                    `
                  )}
                </div>`
              : items.length === 0
                ? html`<p
                    class="text-[var(--text-primary-color-disabled,#525151)] text-center py-8"
                  >
                    ${this.msg['section.discover.empty']}
                  </p>`
                : html`<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${items.map((item: CafeFlowViewKitchenBoardOutputItem) => {
                      const isSelected: boolean = selectedOrderId === item.orderId;
                      const statusLabel: string =
                        item.status === 'received'
                          ? this.msg['status.received.label']
                          : item.status === 'inPreparation'
                            ? this.msg['status.inPreparation.label']
                            : item.status === 'ready'
                              ? this.msg['status.ready.label']
                              : item.status === 'delivered'
                                ? this.msg['status.delivered.label']
                                : item.status === 'registered'
                                  ? this.msg['status.registered.label']
                                  : item.status;
                      const statusColor: string =
                        item.status === 'received'
                          ? 'var(--warning-color,#FAAD14)'
                          : item.status === 'inPreparation'
                            ? 'var(--active-color,#1890FF)'
                            : item.status === 'ready'
                              ? 'var(--success-color,#52C41A)'
                              : 'var(--grey-color-dark,#D3D3D3)';
                      return html`
                        <div
                          class="rounded-lg border p-4 cursor-pointer transition-colors ${isSelected
                            ? 'border-[var(--active-color,#1890FF)] ring-2 ring-[var(--active-color,#1890FF)]'
                            : 'border-[var(--grey-color,#E6E6E6)] hover:border-[var(--grey-color-dark,#D3D3D3)]'}"
                          @click="${() => this.setUpdateOrderStatusOrderId(item.orderId)}"
                        >
                          <div class="flex items-start justify-between mb-2">
                            <span
                              class="font-semibold text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['field.orderId.label']}: ${item.orderId}
                            </span>
                            <span
                              class="px-2 py-0.5 rounded text-xs font-medium text-white"
                              style="background-color: ${statusColor};"
                            >
                              ${statusLabel}
                            </span>
                          </div>

                          ${item.priority
                            ? html`<div
                                class="mb-2 px-2 py-1 rounded text-xs font-medium text-white"
                                style="background-color: var(--warning-color,#FAAD14);"
                              >
                                ${this.msg['field.priority.label']}${item.priorityReason
                                  ? ': ' + item.priorityReason
                                  : ''}
                              </div>`
                            : null}

                          <div
                            class="text-sm text-[var(--text-primary-color-lighter,#535353)] space-y-1"
                          >
                            <div>
                              <span class="font-medium"
                                >${this.msg['field.orderType.label']}:</span
                              >
                              ${item.orderType}
                            </div>
                            ${item.tableNumber
                              ? html`<div>
                                  <span class="font-medium"
                                    >${this.msg['field.tableNumber.label']}:</span
                                  >
                                  ${item.tableNumber}
                                </div>`
                              : null}
                            <div>
                              <span class="font-medium"
                                >${this.msg['field.receivedAt.label']}:</span
                              >
                              ${item.receivedAt}
                            </div>
                            ${item.inPreparationAt
                              ? html`<div>
                                  <span class="font-medium"
                                    >${this.msg['field.inPreparationAt.label']}:</span
                                  >
                                  ${item.inPreparationAt}
                                </div>`
                              : null}
                          </div>
                        </div>
                      `;
                    })}
                  </div>`}
          </section>

          <!-- Section: Update Status (commandForm) -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.execute.title']}
            </h2>

            ${!selectedOrderId
              ? html`<p
                  class="text-[var(--text-primary-color-disabled,#525151)] text-center py-4"
                >
                  ${this.msg['section.transition.empty']}
                </p>`
              : html`<form class="space-y-4" @submit="${(e: Event) => e.preventDefault()}">
                  <div>
                    <label
                      class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                    >
                      ${this.msg['field.orderId.label']}
                    </label>
                    <input
                      type="text"
                      .value="${selectedOrderId}"
                      readonly
                      class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color,#403f3f)]"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                    >
                      ${this.msg['field.status.label']}
                    </label>
                    <select
                      @change="${this.handleUpdateOrderStatusStatusChange}"
                      class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    >
                      <option value="" ?selected="${this.updateOrderStatusStatus === ''}">--</option>
                      <option
                        value="inPreparation"
                        ?selected="${this.updateOrderStatusStatus === 'inPreparation'}"
                      >
                        ${this.msg['status.inPreparation.label']}
                      </option>
                      <option
                        value="ready"
                        ?selected="${this.updateOrderStatusStatus === 'ready'}"
                      >
                        ${this.msg['status.ready.label']}
                      </option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    class="px-4 py-2 rounded bg-[var(--active-color,#1890FF)] text-white font-medium disabled:opacity-50"
                    @click="${this.handleUpdateOrderStatusClick}"
                    ?disabled="${isSubmitting || !this.updateOrderStatusStatus}"
                  >
                    ${isSubmitting
                      ? this.msg['action.updateOrderStatus.label'] + '...'
                      : this.msg['action.updateOrderStatus.label']}
                  </button>
                </form>`}
          </section>

          <!-- Section: Review / Feedback (summary) -->
          ${showSuccess || showError
            ? html`<section
                class="rounded-lg border p-4 bg-[var(--bg-primary-color,#ffffff)] ${showSuccess
                  ? 'border-[var(--success-color,#52C41A)]'
                  : 'border-[var(--error-color,#FF4D4F)]'}"
              >
                <div class="flex items-start justify-between gap-3">
                  <p
                    class="${showSuccess
                      ? 'text-[var(--success-color,#52C41A)]'
                      : 'text-[var(--error-color,#FF4D4F)]'}"
                  >
                    ${showSuccess
                      ? this.msg['action.updateOrderStatus.success']
                      : this.updateOrderStatusError ||
                        this.msg['action.updateOrderStatus.error']}
                  </p>
                </div>
              </section>`
            : null}
        </div>
      </div>
    `;
  }
}
