/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page21--pos-workspace-102051')
export class CafeFlowDesktopPage11PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const boardItems: CafeFlowViewOrderBoardOutputItem[] =
      this.viewOrderBoardData?.items ?? [];
    const totalItems: number = this.viewOrderBoardData?.total ?? 0;
    const readyOrder: CafeFlowViewOrderBoardOutputItem | undefined = boardItems.find(
      (item: CafeFlowViewOrderBoardOutputItem) => item.status === 'ready'
    );

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              ${this.msg['posWorkspace.section.main.title']}
            </h1>
          </header>

          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 space-y-4">
            <div class="space-y-2">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['posWorkspace.organism.viewOrderBoard.title']}
              </h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                ${this.msg['posWorkspace.viewOrderBoard.list.title']}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-500 dark:text-slate-400">
                ${totalItems} ${this.msg['posWorkspace.viewOrderBoard.list.title']}
              </span>
              <button
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                @click=${this.handleViewOrderBoardClick}
              >
                ${this.msg['posWorkspace.viewOrderBoard.refresh.label']}
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="text-left text-slate-500 dark:text-slate-400">
                  <tr>
                    <th class="py-2 pr-4">${this.msg['posWorkspace.viewOrderBoard.orderId.label']}</th>
                    <th class="py-2 pr-4">${this.msg['posWorkspace.viewOrderBoard.status.label']}</th>
                    <th class="py-2 pr-4">${this.msg['posWorkspace.viewOrderBoard.orderType.label']}</th>
                    <th class="py-2 pr-4">${this.msg['posWorkspace.viewOrderBoard.tableNumber.label']}</th>
                    <th class="py-2 pr-4">${this.msg['posWorkspace.viewOrderBoard.priority.label']}</th>
                    <th class="py-2 pr-4">${this.msg['posWorkspace.viewOrderBoard.readyAt.label']}</th>
                  </tr>
                </thead>
                <tbody class="text-slate-900 dark:text-slate-100">
                  ${boardItems.map(
                    (item: CafeFlowViewOrderBoardOutputItem) => html`
                      <tr class="border-t border-slate-200 dark:border-slate-800">
                        <td class="py-2 pr-4">${item.orderId}</td>
                        <td class="py-2 pr-4">${item.status}</td>
                        <td class="py-2 pr-4">${item.orderType}</td>
                        <td class="py-2 pr-4">${item.tableNumber}</td>
                        <td class="py-2 pr-4">${item.priority ? 'true' : 'false'}</td>
                        <td class="py-2 pr-4">${item.readyAt}</td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 space-y-6">
            <div class="space-y-2">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['posWorkspace.organism.createOrder.title']}
              </h2>
            </div>

            <div class="space-y-4">
              <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['posWorkspace.createOrder.form.title']}
              </h3>
              <div class="grid gap-4 md:grid-cols-2">
                <label class="space-y-1">
                  <span class="text-sm text-slate-600 dark:text-slate-300">
                    ${this.msg['posWorkspace.createOrder.orderType.label']}
                  </span>
                  <select
                    class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                    .value=${this.createOrderOrderType}
                    @change=${this.handleCreateOrderOrderTypeChange}
                  >
                    <option value=""></option>
                    <option value="table">table</option>
                    <option value="takeout">takeout</option>
                  </select>
                </label>
                <label class="space-y-1">
                  <span class="text-sm text-slate-600 dark:text-slate-300">
                    ${this.msg['posWorkspace.createOrder.tableNumber.label']}
                  </span>
                  <input
                    class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                    type="text"
                    .value=${this.createOrderTableNumber}
                    @input=${this.handleCreateOrderTableNumberChange}
                  />
                </label>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['posWorkspace.createOrder.form.title']}
              </h3>
              <label class="space-y-1">
                <span class="text-sm text-slate-600 dark:text-slate-300">
                  ${this.msg['posWorkspace.createOrder.orderItems.label']}
                </span>
                <textarea
                  class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                  rows="4"
                  .value=${this.createOrderOrderItems}
                  @input=${this.handleCreateOrderOrderItemsChange}
                ></textarea>
              </label>
            </div>

            <div class="space-y-4">
              <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['posWorkspace.createOrder.form.title']}
              </h3>
              <div class="grid gap-4 md:grid-cols-2">
                <label class="space-y-1">
                  <span class="text-sm text-slate-600 dark:text-slate-300">
                    ${this.msg['posWorkspace.createOrder.priority.label']}
                  </span>
                  <select
                    class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                    .value=${this.createOrderPriority}
                    @change=${this.handleCreateOrderPriorityChange}
                  >
                    <option value=""></option>
                    <option value="true">true</option>
                  </select>
                </label>
                <label class="space-y-1">
                  <span class="text-sm text-slate-600 dark:text-slate-300">
                    ${this.msg['posWorkspace.createOrder.priorityReason.label']}
                  </span>
                  <input
                    class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                    type="text"
                    .value=${this.createOrderPriorityReason}
                    @input=${this.handleCreateOrderPriorityReasonChange}
                  />
                </label>
              </div>
            </div>

            <div class="space-y-3 rounded-md border border-slate-200 dark:border-slate-800 p-4">
              <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['posWorkspace.createOrder.review.title']}
              </h3>
              <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                <li>
                  ${this.msg['posWorkspace.createOrder.orderType.label']}: ${this.createOrderOrderType}
                </li>
                <li>
                  ${this.msg['posWorkspace.createOrder.tableNumber.label']}: ${this.createOrderTableNumber}
                </li>
                <li>
                  ${this.msg['posWorkspace.createOrder.orderItems.label']}: ${this.createOrderOrderItems}
                </li>
                <li>
                  ${this.msg['posWorkspace.createOrder.priority.label']}: ${this.createOrderPriority}
                </li>
                <li>
                  ${this.msg['posWorkspace.createOrder.priorityReason.label']}: ${this.createOrderPriorityReason}
                </li>
              </ul>
            </div>

            <div class="flex justify-end">
              <button
                class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-emerald-600 text-white"
                @click=${this.handleCreateOrderClick}
              >
                ${this.msg['posWorkspace.createOrder.submit.label']}
              </button>
            </div>
          </section>

          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 space-y-6">
            <div class="space-y-2">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['posWorkspace.organism.deliverOrder.title']}
              </h2>
            </div>

            <div class="space-y-3 rounded-md border border-slate-200 dark:border-slate-800 p-4">
              <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['posWorkspace.deliverOrder.confirm.title']}
              </h3>
              <div class="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                <div>${this.msg['posWorkspace.viewOrderBoard.orderId.label']}: ${readyOrder?.orderId ?? ''}</div>
                <div>${this.msg['posWorkspace.viewOrderBoard.status.label']}: ${readyOrder?.status ?? ''}</div>
                <div>${this.msg['posWorkspace.viewOrderBoard.orderType.label']}: ${readyOrder?.orderType ?? ''}</div>
                <div>${this.msg['posWorkspace.viewOrderBoard.tableNumber.label']}: ${readyOrder?.tableNumber ?? ''}</div>
                <div>${this.msg['posWorkspace.viewOrderBoard.readyAt.label']}: ${readyOrder?.readyAt ?? ''}</div>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white"
                @click=${this.handleDeliverOrderClick}
              >
                ${this.msg['posWorkspace.deliverOrder.submit.label']}
              </button>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
