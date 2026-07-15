/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';
import type { CafeFlowViewKitchenBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page11--kitchen-queue-102051')
export class CafeFlowDesktopPage11KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render(): TemplateResult {
    const allItems: CafeFlowViewKitchenBoardOutputItem[] = this.viewKitchenBoardData?.items ?? [];
    const isLoading: boolean = this.viewKitchenBoardState === 'loading';
    const isSubmitting: boolean = this.updateOrderStatusState === 'loading';

    const sortByPriorityAndTime = (
      a: CafeFlowViewKitchenBoardOutputItem,
      b: CafeFlowViewKitchenBoardOutputItem
    ): number => {
      const pa: number = a.priority ? 1 : 0;
      const pb: number = b.priority ? 1 : 0;
      if (pb !== pa) return pb - pa;
      return (a.receivedAt || '').localeCompare(b.receivedAt || '');
    };

    const receivedItems: CafeFlowViewKitchenBoardOutputItem[] = allItems
      .filter((i: CafeFlowViewKitchenBoardOutputItem) => i.status === 'received')
      .sort(sortByPriorityAndTime);
    const inPrepItems: CafeFlowViewKitchenBoardOutputItem[] = allItems
      .filter((i: CafeFlowViewKitchenBoardOutputItem) => i.status === 'inPreparation')
      .sort(sortByPriorityAndTime);
    const readyItems: CafeFlowViewKitchenBoardOutputItem[] = allItems
      .filter((i: CafeFlowViewKitchenBoardOutputItem) => i.status === 'ready')
      .sort(sortByPriorityAndTime);

    const selectedOrder: CafeFlowViewKitchenBoardOutputItem | undefined =
      allItems.find((i: CafeFlowViewKitchenBoardOutputItem) => i.orderId === this.updateOrderStatusOrderId);
    const currentStatus: string = selectedOrder?.status ?? '';

    const allowedNextStatuses: string[] = [];
    if (currentStatus === 'received') allowedNextStatuses.push('inPreparation');
    if (currentStatus === 'inPreparation') allowedNextStatuses.push('ready');

    const renderOrderCard = (item: CafeFlowViewKitchenBoardOutputItem): TemplateResult => {
      const isSelected: boolean = item.orderId === this.updateOrderStatusOrderId;
      return html`
        <div
          class="rounded-lg border p-3 space-y-2 cursor-pointer transition-colors ${
            isSelected
              ? 'border-[var(--active-color,#1890FF)] bg-[var(--bg-primary-color-hover,#f2f2f2)]'
              : 'border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] hover:border-[var(--grey-color-dark,#D3D3D3)]'
          }"
          @click=${() => this.setUpdateOrderStatusOrderId(item.orderId)}
        >
          <div class="flex items-center justify-between">
            <span class="font-medium text-sm text-[var(--text-primary-color,#403f3f)]">${item.orderId}</span>
            ${item.priority
              ? html`<span
                  class="text-xs px-1.5 py-0.5 rounded font-medium text-white"
                  style="background: var(--warning-color,#FAAD14)"
                >${this.msg['field.priority.label']}</span>`
              : null}
          </div>
          <div class="text-xs text-[var(--text-primary-color-lighter,#535353)] space-y-0.5">
            <div>
              ${this.msg['field.orderType.label']}: ${item.orderType}
              ${item.orderType === 'table' && item.tableNumber
                ? html` — ${this.msg['field.tableNumber.label']} ${item.tableNumber}`
                : null}
            </div>
            <div>${this.msg['field.receivedAt.label']}: ${item.receivedAt || '—'}</div>
            ${item.inPreparationAt
              ? html`<div>${this.msg['field.inPreparationAt.label']}: ${item.inPreparationAt}</div>`
              : null}
            ${item.priorityReason
              ? html`<div>${this.msg['field.priorityReason.label']}: ${item.priorityReason}</div>`
              : null}
          </div>
          <button
            class="w-full mt-1 px-2 py-1 rounded text-xs font-medium border border-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]"
            @click=${(e: Event) => { e.stopPropagation(); this.setUpdateOrderStatusOrderId(item.orderId); }}
          >
            ${this.msg['action.select']}
          </button>
        </div>
      `;
    };

    const renderLane = (
      title: string,
      items: CafeFlowViewKitchenBoardOutputItem[],
      colorVar: string
    ): TemplateResult => {
      return html`
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" style="background: ${colorVar}"></span>
            <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">${title}</h3>
            <span class="text-xs text-[var(--text-primary-color-lighter,#535353)]">(${items.length})</span>
          </div>
          <div class="space-y-2 min-h-[4rem]">
            ${items.length === 0
              ? html`<div
                  class="text-xs text-[var(--text-primary-color-lighter,#535353)] py-4 text-center border border-dashed border-[var(--grey-color,#E6E6E6)] rounded"
                >—</div>`
              : items.map(renderOrderCard)}
          </div>
        </div>
      `;
    };

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Kitchen Board -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['sec.kitchen.board.title']}
              </h2>
              <button
                class="px-3 py-1.5 rounded text-sm border border-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)] disabled:opacity-50"
                @click=${(e: Event) => this.handleViewKitchenBoardClick(e)}
                ?disabled=${isLoading}
              >
                ${this.msg['action.refresh']}
              </button>
            </div>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['org.kitchen.board.title']}
            </p>

            ${isLoading
              ? html`<div class="space-y-2">
                  ${[1, 2, 3].map(
                    () =>
                      html`<div
                        class="h-20 rounded bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"
                      ></div>`
                  )}
                </div>`
              : allItems.length === 0
                ? html`<p
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-8 text-center"
                  >
                    ${this.msg['empty.kitchenBoard']}
                  </p>`
                : html`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${renderLane(
                      this.msg['status.received.label'],
                      receivedItems,
                      'var(--warning-color,#FAAD14)'
                    )}
                    ${renderLane(
                      this.msg['status.inPreparation.label'],
                      inPrepItems,
                      'var(--active-color,#1890FF)'
                    )}
                    ${renderLane(
                      this.msg['status.ready.label'],
                      readyItems,
                      'var(--success-color,#52C41A)'
                    )}
                  </div>`}
          </section>

          <!-- Section: Transition -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['sec.transition.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['org.transition.panel.title']}
            </p>

            ${this.updateOrderStatusState === 'success'
              ? html`<div
                  class="rounded p-3 text-sm text-white"
                  style="background: var(--success-color,#52C41A)"
                >
                  ${this.msg['action.updateOrderStatus.success']}
                </div>`
              : null}
            ${this.updateOrderStatusState === 'error'
              ? html`<div
                  class="rounded p-3 text-sm text-white"
                  style="background: var(--error-color,#FF4D4F)"
                >
                  ${this.updateOrderStatusError || this.msg['action.updateOrderStatus.error']}
                </div>`
              : null}

            ${!this.updateOrderStatusOrderId
              ? html`<p
                  class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4 text-center"
                >
                  ${this.msg['empty.transitionPanel']}
                </p>`
              : html`<form
                  class="space-y-4"
                  @submit=${(e: Event) => {
                    e.preventDefault();
                    this.handleUpdateOrderStatusClick(e);
                  }}
                >
                  <div class="space-y-1">
                    <label
                      class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                    >
                      ${this.msg['field.orderId.label']}
                    </label>
                    <input
                      type="text"
                      .value=${this.updateOrderStatusOrderId}
                      readonly
                      class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color,#403f3f)] text-sm"
                    />
                  </div>
                  <div class="space-y-1">
                    <label
                      class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                    >
                      ${this.msg['field.status.label']}
                    </label>
                    <select
                      .value=${this.updateOrderStatusStatus}
                      @change=${(e: Event) => this.handleUpdateOrderStatusStatusChange(e)}
                      class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                    >
                      <option value="">—</option>
                      ${allowedNextStatuses.map(
                        (s: string) => html`
                          <option value=${s} ?selected=${this.updateOrderStatusStatus === s}>
                            ${s === 'inPreparation'
                              ? this.msg['status.inPreparation.label']
                              : this.msg['status.ready.label']}
                          </option>
                        `
                      )}
                    </select>
                  </div>
                  <button
                    type="submit"
                    class="px-4 py-2 rounded text-sm font-medium text-white disabled:opacity-50"
                    style="background: var(--active-color,#1890FF)"
                    ?disabled=${isSubmitting ||
                    !this.updateOrderStatusStatus ||
                    allowedNextStatuses.length === 0}
                  >
                    ${isSubmitting
                      ? '...'
                      : this.msg['action.updateOrderStatus.submit']}
                  </button>
                </form>`}
          </section>
        </div>
      </div>
    `;
  }
}
