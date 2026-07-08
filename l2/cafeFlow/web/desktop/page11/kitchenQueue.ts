/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenQueueBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenQueue.js';
import type { CafeFlowViewKitchenBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

@customElement('cafe-flow--web--desktop--page11--kitchen-queue-102051')
export class CafeFlowDesktopPage11KitchenQueuePage extends CafeFlowKitchenQueueBase {
  render() {
    const m = this.msg;
    const items: CafeFlowViewKitchenBoardOutputItem[] = this.viewKitchenBoardData?.items ?? [];

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <div>
            <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
              ${m['kitchenQueue.section.title'] ?? ''}
            </h1>
          </div>

          <!-- Section: Kitchen Queue -->
          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
            <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
              ${m['kitchenQueue.section.title'] ?? ''}
            </h2>

            <!-- Organism: ViewKitchenBoard -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-medium text-slate-600 dark:text-slate-300">
                  ${m['kitchenQueue.viewKitchenBoard.title'] ?? ''}
                </h3>
                <button
                  type="button"
                  class="px-3 py-1.5 text-sm font-medium rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors"
                  @click=${(e: Event) => this.handleViewKitchenBoardClick(e)}
                >
                  ${m['kitchenQueue.action.refreshBoard'] ?? ''}
                </button>
              </div>

              <p class="text-sm text-slate-500 dark:text-slate-400">
                ${m['kitchenQueue.viewKitchenBoard.list.title'] ?? ''}
              </p>

              <!-- Query list table -->
              <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="border-b border-slate-200 dark:border-slate-700 text-left text-slate-500 dark:text-slate-400">
                      <th class="py-2 px-3 font-medium">${m['kitchenQueue.field.orderId'] ?? ''}</th>
                      <th class="py-2 px-3 font-medium">${m['kitchenQueue.field.status'] ?? ''}</th>
                      <th class="py-2 px-3 font-medium">${m['kitchenQueue.field.orderType'] ?? ''}</th>
                      <th class="py-2 px-3 font-medium">${m['kitchenQueue.field.tableNumber'] ?? ''}</th>
                      <th class="py-2 px-3 font-medium">${m['kitchenQueue.field.priority'] ?? ''}</th>
                      <th class="py-2 px-3 font-medium">${m['kitchenQueue.field.priorityReason'] ?? ''}</th>
                      <th class="py-2 px-3 font-medium">${m['kitchenQueue.field.receivedAt'] ?? ''}</th>
                      <th class="py-2 px-3 font-medium">${m['kitchenQueue.field.inPreparationAt'] ?? ''}</th>
                      <th class="py-2 px-3 font-medium">${m['kitchenQueue.field.createdAt'] ?? ''}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items.length === 0
                      ? html`<tr><td colspan="9" class="py-6 text-center text-slate-400 dark:text-slate-500">—</td></tr>`
                      : items.map((item: CafeFlowViewKitchenBoardOutputItem) => html`
                        <tr class="border-b border-slate-100 dark:border-slate-800 ${item.priority ? 'bg-amber-50 dark:bg-amber-950/30' : ''}">
                          <td class="py-2 px-3 text-slate-700 dark:text-slate-200">${item.orderId}</td>
                          <td class="py-2 px-3">
                            <span class="inline-block px-2 py-0.5 text-xs rounded-full ${this._statusBadgeClass(item.status)}">
                              ${item.status}
                            </span>
                          </td>
                          <td class="py-2 px-3 text-slate-700 dark:text-slate-200">${item.orderType}</td>
                          <td class="py-2 px-3 text-slate-700 dark:text-slate-200">${item.tableNumber || '—'}</td>
                          <td class="py-2 px-3 text-slate-700 dark:text-slate-200">${item.priority ? '⚠' : ''}</td>
                          <td class="py-2 px-3 text-slate-700 dark:text-slate-200">${item.priorityReason || '—'}</td>
                          <td class="py-2 px-3 text-slate-700 dark:text-slate-200">${item.receivedAt || '—'}</td>
                          <td class="py-2 px-3 text-slate-700 dark:text-slate-200">${item.inPreparationAt || '—'}</td>
                          <td class="py-2 px-3 text-slate-700 dark:text-slate-200">${item.createdAt || '—'}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${this.viewKitchenBoardData?.total != null
                ? html`<p class="text-xs text-slate-400 dark:text-slate-500">${this.viewKitchenBoardData.total}</p>`
                : null}
            </div>

            <!-- Organism: UpdateOrderStatus -->
            <div class="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-4">
              <h3 class="text-base font-medium text-slate-600 dark:text-slate-300">
                ${m['kitchenQueue.updateOrderStatus.title'] ?? ''}
              </h3>

              <!-- Command form -->
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400">
                  ${m['kitchenQueue.updateOrderStatus.form.title'] ?? ''}
                </h4>
                <div class="flex flex-wrap items-end gap-3">
                  <div class="flex flex-col gap-1">
                    <label class="text-xs font-medium text-slate-500 dark:text-slate-400" for="kq-status-select">
                      ${m['kitchenQueue.field.status'] ?? ''}
                    </label>
                    <select
                      id="kq-status-select"
                      class="px-3 py-1.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      .value=${this.updateOrderStatusStatus}
                      @change=${(e: Event) => this.handleUpdateOrderStatusStatusChange(e)}
                    >
                      <option value="" ?selected=${this.updateOrderStatusStatus === ''}></option>
                      <option value="registered" ?selected=${this.updateOrderStatusStatus === 'registered'}>registered</option>
                      <option value="received" ?selected=${this.updateOrderStatusStatus === 'received'}>received</option>
                      <option value="inPreparation" ?selected=${this.updateOrderStatusStatus === 'inPreparation'}>inPreparation</option>
                      <option value="ready" ?selected=${this.updateOrderStatusStatus === 'ready'}>ready</option>
                      <option value="delivered" ?selected=${this.updateOrderStatusStatus === 'delivered'}>delivered</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    class="px-4 py-1.5 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    ?disabled=${this.updateOrderStatusState === 'loading' || !this.updateOrderStatusStatus}
                    @click=${(e: Event) => this.handleUpdateOrderStatusClick(e)}
                  >
                    ${m['kitchenQueue.action.updateStatus'] ?? ''}
                  </button>
                </div>
              </div>

              <!-- Summary block -->
              <div class="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400">
                  ${m['kitchenQueue.summary.title'] ?? ''}
                </h4>
                <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt class="text-slate-500 dark:text-slate-400">${m['kitchenQueue.field.orderId'] ?? ''}</dt>
                  <dd class="text-slate-700 dark:text-slate-200">${this.LayoutSumOrderId || '—'}</dd>

                  <dt class="text-slate-500 dark:text-slate-400">${m['kitchenQueue.field.status'] ?? ''}</dt>
                  <dd class="text-slate-700 dark:text-slate-200">${this.updateOrderStatusStatus || '—'}</dd>

                  <dt class="text-slate-500 dark:text-slate-400">${m['kitchenQueue.field.orderType'] ?? ''}</dt>
                  <dd class="text-slate-700 dark:text-slate-200">${this.LayoutSumOrderType || '—'}</dd>

                  <dt class="text-slate-500 dark:text-slate-400">${m['kitchenQueue.field.tableNumber'] ?? ''}</dt>
                  <dd class="text-slate-700 dark:text-slate-200">${this.LayoutSumTableNumber || '—'}</dd>

                  <dt class="text-slate-500 dark:text-slate-400">${m['kitchenQueue.field.priority'] ?? ''}</dt>
                  <dd class="text-slate-700 dark:text-slate-200">${this.LayoutSumPriority || '—'}</dd>

                  <dt class="text-slate-500 dark:text-slate-400">${m['kitchenQueue.field.priorityReason'] ?? ''}</dt>
                  <dd class="text-slate-700 dark:text-slate-200">${this.LayoutSumPriorityReason || '—'}</dd>

                  <dt class="text-slate-500 dark:text-slate-400">${m['kitchenQueue.field.receivedAt'] ?? ''}</dt>
                  <dd class="text-slate-700 dark:text-slate-200">${this.LayoutSumReceivedAt || '—'}</dd>

                  <dt class="text-slate-500 dark:text-slate-400">${m['kitchenQueue.field.inPreparationAt'] ?? ''}</dt>
                  <dd class="text-slate-700 dark:text-slate-200">${this.LayoutSumInPreparationAt || '—'}</dd>
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  private _statusBadgeClass(status: string): string {
    switch (status) {
      case 'received':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'inPreparation':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
      case 'ready':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'delivered':
        return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
    }
  }
}
