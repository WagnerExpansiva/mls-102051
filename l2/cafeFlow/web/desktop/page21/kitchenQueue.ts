/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page21--kitchen-queue-102051')
export class CafeFlowDesktopPage21KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render(): unknown {
    const items = this.viewKitchenBoardData?.items ?? [];

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Header -->
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.section.cards.title']}
            </h1>
            <button
              class="px-3 py-1.5 rounded-lg text-sm font-medium border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)] transition-colors"
              @click=${(e: Event) => this.handleViewKitchenBoardClick(e)}
            >
              ${this.msg['kitchenQueue.intent.cards.list.title']}
            </button>
          </div>

          <!-- Section: Queue Cards (queryList) -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-3">
            <h2 class="text-base font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.organism.cards.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['kitchenQueue.intent.cards.list.title']}
            </p>

            ${this.viewKitchenBoardState === 'loading'
              ? html`<div class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4">…</div>`
              : items.length === 0
                ? html`<div class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4">—</div>`
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm border-collapse">
                        <thead>
                          <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                            <th class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.orderId']}</th>
                            <th class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.status']}</th>
                            <th class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.orderType']}</th>
                            <th class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.tableNumber']}</th>
                            <th class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.priority']}</th>
                            <th class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.receivedAt']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${items.map((item) => html`
                            <tr class="border-b border-[var(--grey-color-light,#F2F2F2)]">
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.orderId}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.status}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.orderType}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.tableNumber ?? '—'}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.priority ? '★' : ''}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.receivedAt ?? '—'}</td>
                            </tr>
                          `)}
                        </tbody>
                      </table>
                    </div>
                  `}
          </section>

          <!-- Section: Card Actions (commandForm) -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-3">
            <h2 class="text-base font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.organism.actions.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['kitchenQueue.intent.card.update.title']}
            </p>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld-card-status">
                ${this.msg['kitchenQueue.field.status']}
              </label>
              <select
                id="fld-card-status"
                class="w-full max-w-xs px-3 py-2 rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                .value=${this.updateOrderStatusStatus}
                @change=${(e: Event) => this.handleUpdateOrderStatusStatusChange(e)}
              >
                <option value="" ?selected=${this.updateOrderStatusStatus}>—</option>
                <option value="registered" ?selected=${this.updateOrderStatusStatus === 'registered'}>registered</option>
                <option value="received" ?selected=${this.updateOrderStatusStatus === 'received'}>received</option>
                <option value="inPreparation" ?selected=${this.updateOrderStatusStatus === 'inPreparation'}>inPreparation</option>
                <option value="ready" ?selected=${this.updateOrderStatusStatus === 'ready'}>ready</option>
                <option value="delivered" ?selected=${this.updateOrderStatusStatus === 'delivered'}>delivered</option>
              </select>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                class="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--active-color-hover,#1a99ff)] transition-colors disabled:opacity-50"
                ?disabled=${this.updateOrderStatusState === 'loading' || !this.updateOrderStatusStatus}
                @click=${(e: Event) => {
                  this.setUpdateOrderStatusStatus('inPreparation' as CafeFlowUpdateOrderStatusInput['status']);
                  this.handleUpdateOrderStatusClick(e);
                }}
              >
                ${this.msg['kitchenQueue.action.markInPreparation']}
              </button>
              <button
                class="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--active-color-hover,#1a99ff)] transition-colors disabled:opacity-50"
                ?disabled=${this.updateOrderStatusState === 'loading' || !this.updateOrderStatusStatus}
                @click=${(e: Event) => {
                  this.setUpdateOrderStatusStatus('ready' as CafeFlowUpdateOrderStatusInput['status']);
                  this.handleUpdateOrderStatusClick(e);
                }}
              >
                ${this.msg['kitchenQueue.action.markReady']}
              </button>
            </div>
          </section>

          <!-- Section: Card Summary (summary) -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-3">
            <h2 class="text-base font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['kitchenQueue.organism.summary.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['kitchenQueue.intent.summary.title']}
            </p>

            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div class="flex justify-between border-b border-[var(--grey-color-light,#F2F2F2)] py-1">
                <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.orderId']}</dt>
                <dd class="text-[var(--text-primary-color-lighter,#535353)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color-light,#F2F2F2)] py-1">
                <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.status']}</dt>
                <dd class="text-[var(--text-primary-color-lighter,#535353)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color-light,#F2F2F2)] py-1">
                <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.orderType']}</dt>
                <dd class="text-[var(--text-primary-color-lighter,#535353)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color-light,#F2F2F2)] py-1">
                <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.tableNumber']}</dt>
                <dd class="text-[var(--text-primary-color-lighter,#535353)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color-light,#F2F2F2)] py-1">
                <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.priority']}</dt>
                <dd class="text-[var(--text-primary-color-lighter,#535353)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color-light,#F2F2F2)] py-1">
                <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.priorityReason']}</dt>
                <dd class="text-[var(--text-primary-color-lighter,#535353)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color-light,#F2F2F2)] py-1">
                <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.receivedAt']}</dt>
                <dd class="text-[var(--text-primary-color-lighter,#535353)]">—</dd>
              </div>
              <div class="flex justify-between border-b border-[var(--grey-color-light,#F2F2F2)] py-1">
                <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['kitchenQueue.field.inPreparationAt']}</dt>
                <dd class="text-[var(--text-primary-color-lighter,#535353)]">—</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    `;
  }
}

import type { CafeFlowUpdateOrderStatusInput } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';
