/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CafeFlowViewKitchenBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page21--kitchen-queue-102051')
export class CafeFlowDesktopPage21KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const rows: CafeFlowViewKitchenBoardOutputItem[] = this.viewKitchenBoardData?.items ?? [];
    const total: number = this.viewKitchenBoardData?.total ?? 0;
    const summaryItem: CafeFlowViewKitchenBoardOutputItem | undefined = rows[0];

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              ${this.msg['kitchenQueue.section.title'] ?? ''}
            </h1>
          </header>

          <section class="space-y-4">
            <div class="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div class="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <div>
                  <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    ${this.msg['kitchenQueue.viewKitchenBoard.title'] ?? ''}
                  </h2>
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    ${this.msg['kitchenQueue.viewKitchenBoard.list.title'] ?? ''}
                  </p>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                  @click=${this.handleViewKitchenBoardClick}
                >
                  ${this.msg['kitchenQueue.action.refreshBoard'] ?? ''}
                </button>
              </div>
              <div class="p-4">
                <div class="mb-2 text-xs text-slate-500 dark:text-slate-400">
                  ${total > 0 ? html`<span>Total: ${total}</span>` : html`<span></span>`}
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
                    <thead class="bg-slate-100 dark:bg-slate-800">
                      <tr>
                        <th class="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-200">
                          ${this.msg['kitchenQueue.field.orderId'] ?? ''}
                        </th>
                        <th class="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-200">
                          ${this.msg['kitchenQueue.field.status'] ?? ''}
                        </th>
                        <th class="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-200">
                          ${this.msg['kitchenQueue.field.orderType'] ?? ''}
                        </th>
                        <th class="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-200">
                          ${this.msg['kitchenQueue.field.tableNumber'] ?? ''}
                        </th>
                        <th class="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-200">
                          ${this.msg['kitchenQueue.field.priority'] ?? ''}
                        </th>
                        <th class="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-200">
                          ${this.msg['kitchenQueue.field.receivedAt'] ?? ''}
                        </th>
                        <th class="px-3 py-2"></th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                      ${rows.length > 0
                        ? rows.map(
                            (item: CafeFlowViewKitchenBoardOutputItem, index: number) => html`
                              <tr class=${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}>
                                <td class="px-3 py-2 text-slate-900 dark:text-slate-100">${item.orderId}</td>
                                <td class="px-3 py-2 text-slate-700 dark:text-slate-200">${item.status}</td>
                                <td class="px-3 py-2 text-slate-700 dark:text-slate-200">${item.orderType}</td>
                                <td class="px-3 py-2 text-slate-700 dark:text-slate-200">${item.tableNumber}</td>
                                <td class="px-3 py-2 text-slate-700 dark:text-slate-200">${String(item.priority)}</td>
                                <td class="px-3 py-2 text-slate-700 dark:text-slate-200">${item.receivedAt}</td>
                                <td class="px-3 py-2 text-right">
                                  <button
                                    type="button"
                                    class="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
                                    @click=${this.handleUpdateOrderStatusClick}
                                    ?disabled=${this.updateOrderStatusState === 'loading'}
                                  >
                                    ${this.msg['kitchenQueue.action.updateStatus'] ?? ''}
                                  </button>
                                </td>
                              </tr>
                            `
                          )
                        : html`
                            <tr>
                              <td class="px-3 py-6 text-center text-slate-500 dark:text-slate-400" colspan="7">
                                ${this.msg['kitchenQueue.viewKitchenBoard.list.title'] ?? ''}
                              </td>
                            </tr>
                          `}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div class="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ${this.msg['kitchenQueue.updateOrderStatus.title'] ?? ''}
                </h2>
                <p class="text-sm text-slate-500 dark:text-slate-400">
                  ${this.msg['kitchenQueue.updateOrderStatus.form.title'] ?? ''}
                </p>
              </div>
              <form class="space-y-4 p-4" @submit=${this.handleUpdateOrderStatusClick}>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  ${this.msg['kitchenQueue.field.status'] ?? ''}
                  <select
                    class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    .value=${this.updateOrderStatusStatus}
                    @change=${this.handleUpdateOrderStatusStatusChange}
                  >
                    <option value=""></option>
                    <option value="registered">registered</option>
                    <option value="received">received</option>
                    <option value="inPreparation">inPreparation</option>
                    <option value="ready">ready</option>
                    <option value="delivered">delivered</option>
                  </select>
                </label>
                <div>
                  <button
                    type="submit"
                    class="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
                    ?disabled=${this.updateOrderStatusState === 'loading'}
                  >
                    ${this.msg['kitchenQueue.action.updateStatus'] ?? ''}
                  </button>
                </div>
              </form>
            </div>

            <div class="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div class="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ${this.msg['kitchenQueue.summary.title'] ?? ''}
                </h2>
              </div>
              <div class="grid gap-4 p-4 md:grid-cols-2">
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.orderId'] ?? ''}</div>
                  <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${summaryItem?.orderId ?? this.LayoutSumOrderId}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.status'] ?? ''}</div>
                  <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${summaryItem?.status ?? this.updateOrderStatusStatus}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.orderType'] ?? ''}</div>
                  <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${summaryItem?.orderType ?? this.LayoutSumOrderType}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.tableNumber'] ?? ''}</div>
                  <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${summaryItem?.tableNumber ?? this.LayoutSumTableNumber}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.priority'] ?? ''}</div>
                  <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${summaryItem ? String(summaryItem.priority) : this.LayoutSumPriority}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.receivedAt'] ?? ''}</div>
                  <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${summaryItem?.receivedAt ?? this.LayoutSumReceivedAt}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">${this.msg['kitchenQueue.field.inPreparationAt'] ?? ''}</div>
                  <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${summaryItem?.inPreparationAt ?? this.LayoutSumInPreparationAt}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
