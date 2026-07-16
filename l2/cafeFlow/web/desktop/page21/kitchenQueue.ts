/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';
import type { CafeFlowViewKitchenBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page21--kitchen-queue-102051')
export class CafeFlowDesktopPage21KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const items: CafeFlowViewKitchenBoardOutputItem[] =
      this.viewKitchenBoardData?.items ?? [];
    const isLoading = this.viewKitchenBoardState === 'loading';
    const isUpdating = this.updateOrderStatusState === 'loading';

    const formatTime = (iso: string): string => {
      if (!iso) return '—';
      try {
        const d = new Date(iso);
        return d.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });
      } catch {
        return iso;
      }
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

    const startPreparation = (item: CafeFlowViewKitchenBoardOutputItem): void => {
      this.setUpdateOrderStatusOrderId(item.orderId);
      this.setUpdateOrderStatusStatus('inPreparation');
      this.handleUpdateOrderStatusClick(new Event('click'));
    };

    const markReady = (item: CafeFlowViewKitchenBoardOutputItem): void => {
      this.setUpdateOrderStatusOrderId(item.orderId);
      this.setUpdateOrderStatusStatus('ready');
      this.handleUpdateOrderStatusClick(new Event('click'));
    };

    const renderCard = (item: CafeFlowViewKitchenBoardOutputItem) => {
      return html`
        <div
          class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 shadow-sm"
        >
          <div class="flex items-center justify-between mb-2">
            <span
              class="text-sm font-bold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['column.orderId.label']} #${item.orderId}
            </span>
            ${item.priority
              ? html`
                  <span
                    class="rounded-full bg-[var(--warning-color,#FAAD14)] px-2 py-0.5 text-xs font-bold text-white"
                  >
                    ${this.msg['column.priority.label']}
                  </span>
                `
              : null}
          </div>

          <div
            class="flex flex-wrap gap-2 mb-2 text-xs text-[var(--text-primary-color,#403f3f)]"
          >
            <span
              class="rounded bg-[var(--bg-secondary-color,#E6E6E6)] px-2 py-0.5"
            >
              ${this.msg['column.orderType.label']}:
              ${item.orderType === 'table'
                ? this.msg['column.tableNumber.label'] + ' ' + (item.tableNumber || '—')
                : 'Takeout'}
            </span>
          </div>

          <div
            class="text-xs text-[var(--text-primary-color,#403f3f)] mb-2 space-y-0.5"
          >
            <div>
              ${this.msg['column.receivedAt.label']}:
              ${formatTime(item.receivedAt)}
            </div>
            ${item.inPreparationAt
              ? html`<div>
                  ${this.msg['column.inPreparationAt.label']}:
                  ${formatTime(item.inPreparationAt)}
                </div>`
              : null}
          </div>

          ${item.priorityReason
            ? html`
                <div
                  class="text-xs text-[var(--text-secondary-color,#1C91CD)] mb-2"
                >
                  ${this.msg['column.priorityReason.label']}:
                  ${item.priorityReason}
                </div>
              `
            : null}

          ${item.status === 'received'
            ? html`
                <button
                  type="button"
                  class="w-full rounded-lg bg-[var(--active-color,#1890FF)] px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
                  ?disabled=${isUpdating}
                  @click=${() => startPreparation(item)}
                >
                  ${isUpdating ? '...' : this.msg['rowAction.startPreparation.label']}
                </button>
              `
            : null}
          ${item.status === 'inPreparation'
            ? html`
                <button
                  type="button"
                  class="w-full rounded-lg bg-[var(--success-color,#52C41A)] px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
                  ?disabled=${isUpdating}
                  @click=${() => markReady(item)}
                >
                  ${isUpdating ? '...' : this.msg['rowAction.markReady.label']}
                </button>
              `
            : null}
        </div>
      `;
    };

    const renderLane = (
      laneTitle: string,
      laneItems: CafeFlowViewKitchenBoardOutputItem[],
      emptyMsg: string,
      accentClass: string
    ) => {
      return html`
        <div class="flex flex-col gap-3 min-w-0">
          <div class="flex items-center justify-between">
            <h3
              class="text-sm font-bold text-[var(--text-primary-color,#403f3f)]"
            >
              ${laneTitle}
            </h3>
            <span
              class="rounded-full bg-[var(--bg-secondary-color,#E6E6E6)] px-2 py-0.5 text-xs font-bold text-[var(--text-primary-color,#403f3f)]"
            >
              ${laneItems.length}
            </span>
          </div>
          <div
            class="border-l-4 ${accentClass} pl-3 flex flex-col gap-3 min-h-24"
          >
            ${isLoading
              ? html`
                  <div
                    class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 animate-pulse"
                  >
                    <div
                      class="h-4 w-24 bg-[var(--grey-color,#E6E6E6)] rounded mb-2"
                    ></div>
                    <div
                      class="h-3 w-16 bg-[var(--grey-color,#E6E6E6)] rounded mb-1"
                    ></div>
                    <div
                      class="h-8 w-full bg-[var(--grey-color,#E6E6E6)] rounded mt-2"
                    ></div>
                  </div>
                `
              : laneItems.length === 0
                ? html`
                    <div
                      class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-60 py-4 text-center"
                    >
                      ${emptyMsg}
                    </div>
                  `
                : laneItems.map(
                    (item: CafeFlowViewKitchenBoardOutputItem) =>
                      renderCard(item)
                  )}
          </div>
        </div>
      `;
    };

    return html`
      <div
        class="min-h-screen bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-4 md:p-6"
      >
        <div class="mx-auto max-w-7xl">
          <!-- Page title and refresh -->
          <div class="flex items-center justify-between mb-4">
            <h1
              class="text-xl font-bold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['page.kitchenQueue.title']}
            </h1>
            <button
              type="button"
              class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-4 py-2 text-sm font-medium text-[var(--text-primary-color,#403f3f)] transition hover:bg-[var(--bg-primary-color-hover,#f2f2f2)] disabled:opacity-50"
              ?disabled=${isLoading}
              @click=${(e: Event) => this.handleViewKitchenBoardClick(e)}
            >
              ${this.msg['toolbar.refresh.label']}
            </button>
          </div>

          <!-- Summary stats -->
          <div class="grid grid-cols-3 gap-3 mb-6">
            <div
              class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-3 text-center"
            >
              <div
                class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]"
              >
                ${receivedItems.length}
              </div>
              <div
                class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
              >
                ${this.msg['lane.received.title']}
              </div>
            </div>
            <div
              class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-3 text-center"
            >
              <div
                class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]"
              >
                ${inPrepItems.length}
              </div>
              <div
                class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
              >
                ${this.msg['lane.inPreparation.title']}
              </div>
            </div>
            <div
              class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-3 text-center"
            >
              <div
                class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]"
              >
                ${readyItems.length}
              </div>
              <div
                class="text-xs text-[var(--text-primary-color,#403f3f)] opacity-70"
              >
                ${this.msg['lane.ready.title']}
              </div>
            </div>
          </div>

          <!-- Feedback region -->
          ${this.updateOrderStatusState === 'success'
            ? html`
                <div
                  class="mb-4 rounded-lg border border-[var(--success-color,#52C41A)] bg-[var(--bg-primary-color,#ffffff)] p-3 text-sm text-[var(--success-color,#52C41A)]"
                >
                  ${this.msg['action.updateOrderStatus.success']}
                </div>
              `
            : null}
          ${this.updateOrderStatusState === 'error'
            ? html`
                <div
                  class="mb-4 rounded-lg border border-[var(--error-color,#FF4D4F)] bg-[var(--bg-primary-color,#ffffff)] p-3 text-sm text-[var(--error-color,#FF4D4F)]"
                >
                  ${this.updateOrderStatusError ||
                  this.msg['action.updateOrderStatus.error']}
                </div>
              `
            : null}

          <!-- Kanban board -->
          ${!isLoading && items.length === 0
            ? html`
                <div
                  class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-8 text-center text-[var(--text-primary-color,#403f3f)] opacity-60"
                >
                  ${this.msg['empty.kitchenQueue']}
                </div>
              `
            : html`
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  ${renderLane(
                    this.msg['lane.received.title'],
                    receivedItems,
                    this.msg['lane.received.empty'],
                    'border-[var(--warning-color,#FAAD14)]'
                  )}
                  ${renderLane(
                    this.msg['lane.inPreparation.title'],
                    inPrepItems,
                    this.msg['lane.inPreparation.empty'],
                    'border-[var(--active-color,#1890FF)]'
                  )}
                  ${renderLane(
                    this.msg['lane.ready.title'],
                    readyItems,
                    this.msg['lane.ready.empty'],
                    'border-[var(--success-color,#52C41A)]'
                  )}
                </div>
              `}
        </div>
      </div>
    `;
  }
}
