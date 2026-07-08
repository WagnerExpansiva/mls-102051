/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CafeFlowViewKitchenBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page31--kitchen-queue-102051')
export class CafeFlowDesktopPage31KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const boardItems: CafeFlowViewKitchenBoardOutputItem[] = this.viewKitchenBoardData?.items ?? [];
    const sectionTitle = this.msg['kitchenQueue.section.title'] ?? '';
    const listTitle = this.msg['kitchenQueue.viewKitchenBoard.list.title'] ?? '';
    const formTitle = this.msg['kitchenQueue.updateOrderStatus.form.title'] ?? '';
    const summaryTitle = this.msg['kitchenQueue.summary.title'] ?? '';
    const refreshLabel = this.msg['kitchenQueue.action.refreshBoard'] ?? '';
    const updateLabel = this.msg['kitchenQueue.action.updateStatus'] ?? '';

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">${sectionTitle}</h1>
          </header>

          <section class="space-y-4">
            <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">${listTitle}</h2>
                <button
                  class="inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
                  type="button"
                  @click=${this.handleViewKitchenBoardClick}
                  ?disabled=${this.viewKitchenBoardState === 'loading'}
                >
                  ${refreshLabel}
                </button>
              </div>

              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead class="text-left text-slate-500 dark:text-slate-400">
                    <tr>
                      <th class="py-2 pr-4">${this.msg['kitchenQueue.field.orderId'] ?? ''}</th>
                      <th class="py-2 pr-4">${this.msg['kitchenQueue.field.status'] ?? ''}</th>
                      <th class="py-2 pr-4">${this.msg['kitchenQueue.field.orderType'] ?? ''}</th>
                      <th class="py-2 pr-4">${this.msg['kitchenQueue.field.tableNumber'] ?? ''}</th>
                      <th class="py-2 pr-4">${this.msg['kitchenQueue.field.priority'] ?? ''}</th>
                      <th class="py-2 pr-4">${this.msg['kitchenQueue.field.receivedAt'] ?? ''}</th>
                      <th class="py-2 pr-4"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                    ${boardItems.length === 0
                      ? html`<tr>
                          <td class="py-3 text-slate-500 dark:text-slate-400" colspan="7">—</td>
                        </tr>`
                      : boardItems.map((item: CafeFlowViewKitchenBoardOutputItem) => html`
                          <tr class="text-slate-700 dark:text-slate-200">
                            <td class="py-2 pr-4">${item.orderId}</td>
                            <td class="py-2 pr-4">${item.status}</td>
                            <td class="py-2 pr-4">${item.orderType}</td>
                            <td class="py-2 pr-4">${item.tableNumber}</td>
                            <td class="py-2 pr-4">${item.priority ? '✓' : '—'}</td>
                            <td class="py-2 pr-4">${item.receivedAt}</td>
                            <td class="py-2 pr-4">
                              <button
                                class="inline-flex items-center justify-center rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                type="button"
                                @click=${this.handleUpdateOrderStatusClick}
                                ?disabled=${this.updateOrderStatusState === 'loading'}
                              >
                                ${updateLabel}
                              </button>
                            </td>
                          </tr>
                        `)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="grid gap-4 lg:grid-cols-2">
              <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
                <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">${formTitle}</h3>
                <form class="space-y-3" @submit=${this.handleUpdateOrderStatusClick}>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    ${this.msg['kitchenQueue.field.status'] ?? ''}
                    <select
                      class="mt-1 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      .value=${this.updateOrderStatusStatus}
                      @change=${this.handleUpdateOrderStatusStatusChange}
                    >
                      ${(['registered', 'received', 'inPreparation', 'ready', 'delivered'] as const).map(
                        (status: CafeFlowViewKitchenBoardOutputItem['status']) => html`
                          <option value=${status}>${status}</option>
                        `
                      )}
                    </select>
                  </label>
                  <button
                    class="inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
                    type="submit"
                    ?disabled=${this.updateOrderStatusState === 'loading'}
                  >
                    ${updateLabel}
                  </button>
                </form>
              </div>

              <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
                <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">${summaryTitle}</h3>
                <dl class="grid grid-cols-1 gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <div class="flex justify-between">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.orderId'] ?? ''}</dt>
                    <dd>${this.LayoutSumOrderId ?? ''}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.status'] ?? ''}</dt>
                    <dd>${this.updateOrderStatusStatus ?? ''}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.orderType'] ?? ''}</dt>
                    <dd>${this.LayoutSumOrderType ?? ''}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.tableNumber'] ?? ''}</dt>
                    <dd>${this.LayoutSumTableNumber ?? ''}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.priority'] ?? ''}</dt>
                    <dd>${this.LayoutSumPriority ?? ''}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.receivedAt'] ?? ''}</dt>
                    <dd>${this.LayoutSumReceivedAt ?? ''}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.inPreparationAt'] ?? ''}</dt>
                    <dd>${this.LayoutSumInPreparationAt ?? ''}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
