/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';
import type { CafeFlowViewKitchenBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page11--kitchen-queue-102051')
export class CafeFlowDesktopPage11KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const items: CafeFlowViewKitchenBoardOutputItem[] = this.viewKitchenBoardData?.items ?? [];
    const total: number = this.viewKitchenBoardData?.total ?? 0;
    const isLoadingBoard: boolean = this.viewKitchenBoardState === 'loading';
    const isBoardError: boolean = this.viewKitchenBoardState === 'error';
    const isUpdating: boolean = this.updateOrderStatusState === 'loading';
    const isUpdateError: boolean = this.updateOrderStatusState === 'error';

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['kitchenQueue.section.board.title']}
          </h1>

          <!-- Section: Queue Board -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['kitchenQueue.organism.board.title']}
              </h2>
              <button
                class="px-3 py-1.5 rounded text-sm text-[var(--text-primary-color,#403f3f)] border border-[var(--grey-color,#E6E6E6)] hover:bg-[var(--bg-secondary-color,#E6E6E6)]"
                @click=${(e: Event) => this.handleViewKitchenBoardClick(e)}
              >
                ${this.msg['kitchenQueue.intent.board.list.title']}
              </button>
            </div>

            ${isLoadingBoard
              ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">Loading…</p>`
              : ''}
            ${isBoardError
              ? html`<p class="text-sm text-[var(--error-color,#FF4D4F)]">Error loading orders.</p>`
              : ''}
            ${!isLoadingBoard && items.length === 0
              ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">No orders.</p>`
              : ''}

            ${items.length > 0
              ? html`
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead>
                        <tr
                          class="border-b border-[var(--grey-color,#E6E6E6)] text-left text-[var(--text-primary-color-lighter,#535353)]"
                        >
                          <th class="py-2 px-2">${this.msg['kitchenQueue.field.orderId']}</th>
                          <th class="py-2 px-2">${this.msg['kitchenQueue.field.status']}</th>
                          <th class="py-2 px-2">${this.msg['kitchenQueue.field.orderType']}</th>
                          <th class="py-2 px-2">${this.msg['kitchenQueue.field.tableNumber']}</th>
                          <th class="py-2 px-2">${this.msg['kitchenQueue.field.priority']}</th>
                          <th class="py-2 px-2">${this.msg['kitchenQueue.field.receivedAt']}</th>
                          <th class="py-2 px-2">${this.msg['kitchenQueue.field.inPreparationAt']}</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${items.map(
                          (item: CafeFlowViewKitchenBoardOutputItem) => html`
                            <tr
                              class="border-b border-[var(--grey-color,#E6E6E6)]"
                              style=${item.priority
                                ? 'background-color: var(--warning-color,#FAAD14); opacity: 0.08;'
                                : ''}
                            >
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">
                                ${item.orderId}
                              </td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">
                                ${item.status}
                              </td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">
                                ${item.orderType}
                              </td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">
                                ${item.tableNumber || '—'}
                              </td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">
                                ${item.priority ? '⚠' : ''}
                              </td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">
                                ${item.receivedAt || '—'}
                              </td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">
                                ${item.inPreparationAt || '—'}
                              </td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                    ${total} ${this.msg['kitchenQueue.intent.board.list.title']}
                  </p>
                `
              : ''}
          </section>

          <!-- Section: Transition -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.organism.update.title']}
            </h2>

            <div class="space-y-3">
              <label class="block">
                <span class="text-sm text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['kitchenQueue.field.status']}
                </span>
                <select
                  class="mt-1 block w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.updateOrderStatusStatus}
                  @change=${(e: Event) => this.handleUpdateOrderStatusStatusChange(e)}
                >
                  <option value="" ?selected=${this.updateOrderStatusStatus === 'inPreparation'}>—</option>
                  <option
                    value="inPreparation"
                    ?selected=${this.updateOrderStatusStatus === 'inPreparation'}
                  >
                    inPreparation
                  </option>
                  <option value="ready" ?selected=${this.updateOrderStatusStatus === 'ready'}>
                    ready
                  </option>
                </select>
              </label>

              <div class="flex gap-3">
                <button
                  class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${isUpdating}
                  @click=${() => {
                    this.setUpdateOrderStatusStatus('inPreparation');
                    this.handleUpdateOrderStatusClick(new Event('click'));
                  }}
                >
                  ${this.msg['kitchenQueue.action.markInPreparation']}
                </button>
                <button
                  class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${isUpdating}
                  @click=${() => {
                    this.setUpdateOrderStatusStatus('ready');
                    this.handleUpdateOrderStatusClick(new Event('click'));
                  }}
                >
                  ${this.msg['kitchenQueue.action.markReady']}
                </button>
              </div>

              ${isUpdateError
                ? html`<p class="text-sm text-[var(--error-color,#FF4D4F)]">
                    Error updating status.
                  </p>`
                : ''}
            </div>
          </section>

          <!-- Section: Summary -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.organism.summary.title']}
            </h2>
            <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['kitchenQueue.field.orderId']}
              </dt>
              <dd class="text-[var(--text-primary-color,#403f3f)]">—</dd>

              <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['kitchenQueue.field.status']}
              </dt>
              <dd class="text-[var(--text-primary-color,#403f3f)]">—</dd>

              <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['kitchenQueue.field.orderType']}
              </dt>
              <dd class="text-[var(--text-primary-color,#403f3f)]">—</dd>

              <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['kitchenQueue.field.tableNumber']}
              </dt>
              <dd class="text-[var(--text-primary-color,#403f3f)]">—</dd>

              <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['kitchenQueue.field.priority']}
              </dt>
              <dd class="text-[var(--text-primary-color,#403f3f)]">—</dd>

              <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['kitchenQueue.field.priorityReason']}
              </dt>
              <dd class="text-[var(--text-primary-color,#403f3f)]">—</dd>

              <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['kitchenQueue.field.receivedAt']}
              </dt>
              <dd class="text-[var(--text-primary-color,#403f3f)]">—</dd>

              <dt class="text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['kitchenQueue.field.inPreparationAt']}
              </dt>
              <dd class="text-[var(--text-primary-color,#403f3f)]">—</dd>
            </dl>
          </section>
        </div>
      </div>
    `;
  }
}
