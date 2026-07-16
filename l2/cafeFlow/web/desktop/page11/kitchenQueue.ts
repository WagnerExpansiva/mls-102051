/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';
import type { CafeFlowViewKitchenBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page11--kitchen-queue-102051')
export class CafeFlowDesktopPage11KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const items: CafeFlowViewKitchenBoardOutputItem[] = this.viewKitchenBoardData?.items ?? [];
    const boardLoading = this.viewKitchenBoardState === 'loading';
    const boardEmpty = items.length === 0;

    const renderCard = (item: CafeFlowViewKitchenBoardOutputItem): unknown => {
      const isSelected = this.updateOrderStatusOrderId === item.orderId;
      return html`
        <div
          class="rounded-lg border p-3 space-y-2 cursor-pointer transition-colors ${isSelected
            ? 'border-[var(--active-color,#1890FF)] ring-1 ring-[var(--active-color,#1890FF)]'
            : 'border-[var(--grey-color,#E6E6E6)]'}"
          @click=${() => this.setUpdateOrderStatusOrderId(item.orderId)}
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-[var(--text-primary-color,#403f3f)]">${item.orderId}</span>
            ${item.priority
              ? html`<span class="px-2 py-0.5 rounded text-xs font-medium text-white bg-[var(--warning-color,#FAAD14)]">${this.msg['column.priority.label']}</span>`
              : null}
          </div>
          <div class="text-sm text-[var(--text-primary-color,#403f3f)] space-y-0.5">
            <div><span class="opacity-60">${this.msg['column.orderType.label']}:</span> ${item.orderType}</div>
            ${item.tableNumber
              ? html`<div><span class="opacity-60">${this.msg['column.tableNumber.label']}:</span> ${item.tableNumber}</div>`
              : null}
            ${item.priorityReason
              ? html`<div><span class="opacity-60">${this.msg['column.priorityReason.label']}:</span> ${item.priorityReason}</div>`
              : null}
            <div><span class="opacity-60">${this.msg['column.receivedAt.label']}:</span> ${item.receivedAt}</div>
            ${item.inPreparationAt
              ? html`<div><span class="opacity-60">${this.msg['column.inPreparationAt.label']}:</span> ${item.inPreparationAt}</div>`
              : null}
          </div>
          ${item.status === 'received'
            ? html`<button
                class="w-full px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:opacity-90"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.setUpdateOrderStatusOrderId(item.orderId);
                  this.setUpdateOrderStatusStatus('inPreparation');
                  this.handleUpdateOrderStatusClick(e);
                }}
              >${this.msg['transition.startPreparation.label']}</button>`
            : null}
          ${item.status === 'inPreparation'
            ? html`<button
                class="w-full px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--success-color,#52C41A)] hover:opacity-90"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.setUpdateOrderStatusOrderId(item.orderId);
                  this.setUpdateOrderStatusStatus('ready');
                  this.handleUpdateOrderStatusClick(e);
                }}
              >${this.msg['transition.markReady.label']}</button>`
            : null}
        </div>
      `;
    };

    const renderLane = (
      title: string,
      emptyMsg: string,
      laneItems: CafeFlowViewKitchenBoardOutputItem[]
    ): unknown => {
      return html`
        <div class="space-y-3">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-[var(--text-primary-color,#403f3f)]">
            ${title}
          </h3>
          ${laneItems.length === 0
            ? html`<div class="py-4 text-center text-sm text-[var(--text-primary-color,#403f3f)] opacity-60">${emptyMsg}</div>`
            : html`<div class="space-y-2">${laneItems.map(renderCard)}</div>`}
        </div>
      `;
    };

    const receivedItems = items.filter(
      (i: CafeFlowViewKitchenBoardOutputItem) => i.status === 'received'
    );
    const inPrepItems = items.filter(
      (i: CafeFlowViewKitchenBoardOutputItem) => i.status === 'inPreparation'
    );
    const readyItems = items.filter(
      (i: CafeFlowViewKitchenBoardOutputItem) => i.status === 'ready'
    );

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.kitchenQueue.title']}
          </h1>

          <!-- Kitchen Board Section -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['section.kitchenBoard.title']}
              </h2>
              <button
                class="px-3 py-1.5 rounded text-sm font-medium border border-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color,#E6E6E6)] disabled:opacity-50"
                @click=${(e: Event) => this.handleViewKitchenBoardClick(e)}
                ?disabled=${boardLoading}
              >
                ${boardLoading ? '...' : this.msg['action.viewKitchenBoard.label']}
              </button>
            </div>

            ${boardLoading
              ? html`<div class="py-8 text-center text-[var(--text-primary-color,#403f3f)]">Carregando...</div>`
              : boardEmpty
                ? html`<div class="py-8 text-center text-[var(--text-primary-color,#403f3f)]">${this.msg['section.kitchenBoard.empty']}</div>`
                : html`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${renderLane(
                      this.msg['lane.received.title'],
                      this.msg['lane.received.empty'],
                      receivedItems
                    )}
                    ${renderLane(
                      this.msg['lane.inPreparation.title'],
                      this.msg['lane.inPreparation.empty'],
                      inPrepItems
                    )}
                    ${renderLane(
                      this.msg['lane.ready.title'],
                      this.msg['lane.ready.empty'],
                      readyItems
                    )}
                  </div>`}
          </section>

          <!-- Transition Panel Section -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.transitionPanel.title']}
            </h2>

            ${!this.updateOrderStatusOrderId
              ? html`<div class="py-6 text-center text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['section.transitionPanel.empty']}
                </div>`
              : html`
                <div class="space-y-4">
                  <div>
                    <label
                      class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                    >
                      ${this.msg['field.orderId.label']}
                    </label>
                    <input
                      type="text"
                      .value=${this.updateOrderStatusOrderId}
                      readonly
                      class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)]"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                    >
                      ${this.msg['field.status.label']}
                    </label>
                    <select
                      .value=${this.updateOrderStatusStatus}
                      @change=${(e: Event) => this.handleUpdateOrderStatusStatusChange(e)}
                      class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    >
                      <option value="">--</option>
                      <option value="inPreparation" ?selected=${this.updateOrderStatusStatus === 'inPreparation'}>
                        ${this.msg['lane.inPreparation.title']}
                      </option>
                      <option value="ready" ?selected=${this.updateOrderStatusStatus === 'ready'}>
                        ${this.msg['lane.ready.title']}
                      </option>
                    </select>
                  </div>

                  ${this.updateOrderStatusState === 'success'
                    ? html`<div
                        class="flex items-center justify-between rounded px-3 py-2 text-sm text-white bg-[var(--success-color,#52C41A)]"
                      >
                        <span>${this.msg['action.updateOrderStatus.success']}</span>
                        <button
                          class="ml-2 font-bold"
                          @click=${() => { this.updateOrderStatusState = 'idle'; }}
                        >×</button>
                      </div>`
                    : null}
                  ${this.updateOrderStatusState === 'error'
                    ? html`<div
                        class="flex items-center justify-between rounded px-3 py-2 text-sm text-white bg-[var(--error-color,#FF4D4F)]"
                      >
                        <span>${this.updateOrderStatusError || this.msg['action.updateOrderStatus.error']}</span>
                        <button
                          class="ml-2 font-bold"
                          @click=${() => { this.updateOrderStatusState = 'idle'; this.updateOrderStatusError = ''; }}
                        >×</button>
                      </div>`
                    : null}

                  <button
                    class="px-4 py-2 rounded font-medium text-white bg-[var(--active-color,#1890FF)] hover:opacity-90 disabled:opacity-50"
                    @click=${(e: Event) => this.handleUpdateOrderStatusClick(e)}
                    ?disabled=${this.updateOrderStatusState === 'loading' || !this.updateOrderStatusStatus}
                  >
                    ${this.updateOrderStatusState === 'loading'
                      ? '...'
                      : this.msg['action.updateOrderStatus.label']}
                  </button>
                </div>
              `}
          </section>
        </div>
      </div>
    `;
  }
}
