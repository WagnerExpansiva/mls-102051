/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';
import type { CafeFlowViewKitchenBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page31--kitchen-queue-102051')
export class CafeFlowDesktopPage31KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const items: CafeFlowViewKitchenBoardOutputItem[] = this.viewKitchenBoardData?.items ?? [];
    const isLoading: boolean = this.viewKitchenBoardState === 'loading';
    const isSubmitting: boolean = this.updateOrderStatusState === 'loading';
    const selectedOrderId: string = this.updateOrderStatusOrderId;
    const isEmpty: boolean = items.length === 0;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.kitchenQueue.title']}
          </h1>

          <!-- Section 1: Kitchen Queue Board -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color-lighter,#ffffff)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['section.kitchenQueue.title']}
              </h2>
              <button
                class="px-3 py-1.5 rounded text-sm border border-[var(--grey-color-dark,#d3d3d3)] text-[var(--text-primary-color,#0f172a)] hover:bg-[var(--bg-secondary-color,#f2f2f2)] disabled:opacity-50"
                @click=${(e: Event) => this.handleViewKitchenBoardClick(e)}
                ?disabled=${isLoading}
              >
                ${isLoading ? this.msg['toolbar.refresh.label'] + '…' : this.msg['toolbar.refresh.label']}
              </button>
            </div>

            ${isLoading
              ? html`
                  <div class="space-y-2">
                    ${[1, 2, 3].map((_n: number) => html`
                      <div
                        class="h-16 rounded bg-[var(--grey-color-light,#f2f2f2)] animate-pulse"
                      ></div>
                    `)}
                  </div>
                `
              : isEmpty
                ? html`
                    <p
                      class="text-sm text-[var(--text-primary-color-lighter,#64748b)] py-4"
                    >
                      ${this.msg['section.kitchenBoard.empty']}
                    </p>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color-lighter,#64748b)]"
                          >
                            <th class="py-2 px-2 font-medium">${this.msg['column.orderId.label']}</th>
                            <th class="py-2 px-2 font-medium">${this.msg['column.status.label']}</th>
                            <th class="py-2 px-2 font-medium">${this.msg['column.orderType.label']}</th>
                            <th class="py-2 px-2 font-medium">${this.msg['column.tableNumber.label']}</th>
                            <th class="py-2 px-2 font-medium">${this.msg['column.priority.label']}</th>
                            <th class="py-2 px-2 font-medium">${this.msg['column.priorityReason.label']}</th>
                            <th class="py-2 px-2 font-medium">${this.msg['column.receivedAt.label']}</th>
                            <th class="py-2 px-2 font-medium">${this.msg['column.inPreparationAt.label']}</th>
                            <th class="py-2 px-2 font-medium">${this.msg['column.createdAt.label']}</th>
                            <th class="py-2 px-2 font-medium">${this.msg['action.selectOrder.label']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${items.map((item: CafeFlowViewKitchenBoardOutputItem) => {
                            const isSelected: boolean = selectedOrderId === item.orderId;
                            const statusLabel: string =
                              item.status === 'received'
                                ? this.msg['lane.received.title']
                                : item.status === 'inPreparation'
                                  ? this.msg['lane.inPreparation.title']
                                  : item.status === 'ready'
                                    ? this.msg['lane.ready.title']
                                    : item.status;
                            const statusBg: string =
                              item.status === 'received'
                                ? 'bg-[var(--info-color,#1890ff)] text-white'
                                : item.status === 'inPreparation'
                                  ? 'bg-[var(--warning-color,#FAAD14)] text-white'
                                  : item.status === 'ready'
                                    ? 'bg-[var(--success-color,#52C41A)] text-white'
                                    : 'bg-[var(--grey-color-dark,#d3d3d3)] text-[var(--text-primary-color,#0f172a)]';
                            return html`
                              <tr
                                class="border-b border-[var(--grey-color,#e2e8f0)] ${item.priority
                                  ? 'bg-[var(--warning-color,#FAAD14)]/5'
                                  : ''} ${isSelected
                                  ? 'ring-2 ring-inset ring-[var(--active-color,#1890ff)]'
                                  : ''}"
                              >
                                <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)] font-medium">
                                  ${item.orderId}
                                </td>
                                <td class="py-2 px-2">
                                  <span class="inline-block px-2 py-0.5 rounded text-xs ${statusBg}">
                                    ${statusLabel}
                                  </span>
                                </td>
                                <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)]">
                                  ${item.orderType}
                                </td>
                                <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)]">
                                  ${item.tableNumber || '—'}
                                </td>
                                <td class="py-2 px-2">
                                  ${item.priority
                                    ? html`
                                        <span
                                          class="inline-block px-1.5 py-0.5 rounded text-xs bg-[var(--warning-color,#FAAD14)] text-white"
                                        >
                                          ${this.msg['column.priority.label']}
                                        </span>
                                      `
                                    : '—'}
                                </td>
                                <td class="py-2 px-2 text-[var(--text-primary-color,#0f172a)]">
                                  ${item.priorityReason || '—'}
                                </td>
                                <td class="py-2 px-2 text-[var(--text-primary-color-lighter,#64748b)]">
                                  ${item.receivedAt || '—'}
                                </td>
                                <td class="py-2 px-2 text-[var(--text-primary-color-lighter,#64748b)]">
                                  ${item.inPreparationAt || '—'}
                                </td>
                                <td class="py-2 px-2 text-[var(--text-primary-color-lighter,#64748b)]">
                                  ${item.createdAt || '—'}
                                </td>
                                <td class="py-2 px-2">
                                  <button
                                    class="px-2 py-1 rounded text-xs border ${isSelected
                                      ? 'bg-[var(--active-color,#1890ff)] text-white border-transparent'
                                      : 'border-[var(--grey-color-dark,#d3d3d3)] text-[var(--text-primary-color,#0f172a)] hover:bg-[var(--bg-secondary-color,#f2f2f2)]'}"
                                    @click=${() => this.setUpdateOrderStatusOrderId(item.orderId)}
                                  >
                                    ${this.msg['action.selectOrder.label']}
                                  </button>
                                </td>
                              </tr>
                            `;
                          })}
                        </tbody>
                      </table>
                    </div>
                  `}
          </section>

          <!-- Section 2: Order Status Transition -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color-lighter,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.transitionPanel.title']}
            </h2>

            ${!selectedOrderId
              ? html`
                  <p class="text-sm text-[var(--text-primary-color-lighter,#64748b)] py-4">
                    ${this.msg['section.transitionPanel.empty']}
                  </p>
                `
              : html`
                  <div class="space-y-4">
                    <!-- Selected order context -->
                    <div
                      class="rounded border border-[var(--grey-color,#e2e8f0)] p-3 bg-[var(--bg-secondary-color-lighter,#F9F9F9)]"
                    >
                      <div class="text-xs text-[var(--text-primary-color-lighter,#64748b)] uppercase tracking-wide">
                        ${this.msg['field.orderId.label']}
                      </div>
                      <div class="text-base font-medium text-[var(--text-primary-color,#0f172a)]">
                        ${selectedOrderId}
                      </div>
                    </div>

                    <!-- Status select -->
                    <div class="space-y-1">
                      <label
                        class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                        for="status-select"
                      >
                        ${this.msg['field.status.label']}
                      </label>
                      <select
                        id="status-select"
                        class="w-full px-3 py-2 rounded border border-[var(--grey-color-dark,#d3d3d3)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                        .value=${this.updateOrderStatusStatus}
                        @change=${(e: Event) => this.handleUpdateOrderStatusStatusChange(e)}
                      >
                        <option value="">—</option>
                        <option value="inPreparation">
                          ${this.msg['lane.inPreparation.title']}
                        </option>
                        <option value="ready">
                          ${this.msg['lane.ready.title']}
                        </option>
                      </select>
                    </div>

                    <!-- Submit button -->
                    <button
                      class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                      @click=${(e: Event) => this.handleUpdateOrderStatusClick(e)}
                      ?disabled=${isSubmitting || !this.updateOrderStatusStatus}
                    >
                      ${isSubmitting
                        ? this.msg['action.updateOrderStatus.label'] + '…'
                        : this.msg['action.updateOrderStatus.label']}
                    </button>

                    <!-- Feedback: success -->
                    ${this.updateOrderStatusState === 'success'
                      ? html`
                          <div
                            class="rounded p-3 border border-[var(--success-color,#52C41A)] text-sm text-[var(--success-color,#52C41A)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)]"
                          >
                            ${this.msg['action.updateOrderStatus.success']}
                          </div>
                        `
                      : null}

                    <!-- Feedback: error -->
                    ${this.updateOrderStatusState === 'error'
                      ? html`
                          <div
                            class="rounded p-3 border border-[var(--error-color,#FF4D4F)] text-sm text-[var(--error-color,#FF4D4F)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)]"
                          >
                            ${this.updateOrderStatusError || this.msg['action.updateOrderStatus.error']}
                          </div>
                        `
                      : null}
                  </div>
                `}
          </section>
        </div>
      </div>
    `;
  }
}
