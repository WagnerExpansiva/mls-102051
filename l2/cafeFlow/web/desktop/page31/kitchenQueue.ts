/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page31--kitchen-queue-102051')
export class CafeFlowDesktopPage31KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const items = this.viewKitchenBoardData?.items ?? [];
    const total = this.viewKitchenBoardData?.total ?? 0;

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <header class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.section.board.title']}
            </h1>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890ff)] hover:opacity-90 transition"
              @click=${(e: Event) => this.handleViewKitchenBoardClick(e)}
            >
              ${this.msg['kitchenQueue.intent.queue.list.title']}
            </button>
          </header>

          <!-- Section: Work Queue (queryList) -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e6e6e6)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.section.queue.title']}
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['kitchenQueue.organism.queue.title']}
            </h3>

            ${this.viewKitchenBoardState === 'loading'
              ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">${this.msg['kitchenQueue.intent.queue.list.title']}…</p>`
              : items.length === 0
                ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">—</p>`
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm border-collapse">
                        <thead>
                          <tr class="border-b border-[var(--grey-color,#e6e6e6)]">
                            <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.orderId']}</th>
                            <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.status']}</th>
                            <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.orderType']}</th>
                            <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.tableNumber']}</th>
                            <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.priority']}</th>
                            <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.priorityReason']}</th>
                            <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.receivedAt']}</th>
                            <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.inPreparationAt']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${items.map((item) => html`
                            <tr class="border-b border-[var(--grey-color,#e6e6e6)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)] transition">
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.orderId}</td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.status}</td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.orderType}</td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.tableNumber || '—'}</td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.priority ? '✓' : '—'}</td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.priorityReason || '—'}</td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.receivedAt || '—'}</td>
                              <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.inPreparationAt || '—'}</td>
                            </tr>
                          `)}
                        </tbody>
                      </table>
                    </div>
                    <p class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${total}</p>
                  `}
          </section>

          <!-- Section: Transition Panel (commandForm) -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e6e6e6)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.section.transition.title']}
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['kitchenQueue.organism.update.title']}
            </h3>

            <div class="space-y-3">
              <label class="block">
                <span class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.status']}</span>
                <select
                  class="mt-1 block w-full rounded-md border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
                  .value=${this.updateOrderStatusStatus}
                  @change=${(e: Event) => this.handleUpdateOrderStatusStatusChange(e)}
                >
                  <option value="" ?selected=${this.updateOrderStatusStatus}>—</option>
                  <option value="inPreparation" ?selected=${this.updateOrderStatusStatus === 'inPreparation'}>inPreparation</option>
                  <option value="ready" ?selected=${this.updateOrderStatusStatus === 'ready'}>ready</option>
                </select>
              </label>

              <div class="flex gap-3">
                <button
                  class="px-4 py-2 rounded-lg text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890ff)] hover:opacity-90 transition disabled:opacity-50"
                  ?disabled=${this.updateOrderStatusState === 'loading'}
                  @click=${(e: Event) => { this.setUpdateOrderStatusStatus('inPreparation'); this.handleUpdateOrderStatusClick(e); }}
                >
                  ${this.msg['kitchenQueue.action.markInPreparation']}
                </button>
                <button
                  class="px-4 py-2 rounded-lg text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890ff)] hover:opacity-90 transition disabled:opacity-50"
                  ?disabled=${this.updateOrderStatusState === 'loading'}
                  @click=${(e: Event) => { this.setUpdateOrderStatusStatus('ready'); this.handleUpdateOrderStatusClick(e); }}
                >
                  ${this.msg['kitchenQueue.action.markReady']}
                </button>
              </div>

              ${this.updateOrderStatusState === 'error'
                ? html`<p class="text-sm text-[var(--error-color,#ff4d4f)]">⚠</p>`
                : null}
            </div>
          </section>

          <!-- Section: Queue Summary -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e6e6e6)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.section.summary.title']}
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['kitchenQueue.organism.summary.title']}
            </h3>

            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div class="flex justify-between border-b border-[var(--grey-color,#e6e6e6)] pb-2">
                <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">${this.msg['kitchenQueue.field.orderId']}</dt>
                <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color,#e6e6e6)] pb-2">
                <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">${this.msg['kitchenQueue.field.status']}</dt>
                <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color,#e6e6e6)] pb-2">
                <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">${this.msg['kitchenQueue.field.orderType']}</dt>
                <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color,#e6e6e6)] pb-2">
                <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">${this.msg['kitchenQueue.field.tableNumber']}</dt>
                <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color,#e6e6e6)] pb-2">
                <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">${this.msg['kitchenQueue.field.priority']}</dt>
                <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color,#e6e6e6)] pb-2">
                <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">${this.msg['kitchenQueue.field.priorityReason']}</dt>
                <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color,#e6e6e6)] pb-2">
                <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">${this.msg['kitchenQueue.field.receivedAt']}</dt>
                <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color,#e6e6e6)] pb-2">
                <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">${this.msg['kitchenQueue.field.inPreparationAt']}</dt>
                <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">—</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    `;
  }
}
