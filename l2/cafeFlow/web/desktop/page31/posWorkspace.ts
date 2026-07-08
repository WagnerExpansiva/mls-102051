/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page31--pos-workspace-102051')
export class CafeFlowDesktopPage31PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const msg = this.msg as Record<string, string>;
    const getMsg = (key: string): string => msg[key] ?? '';
    const boardItems = this.viewOrderBoardData.items ?? [];
    const totalItems = this.viewOrderBoardData.total ?? 0;
    const readyItems = boardItems.filter((item) => item.status === 'ready');

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              ${getMsg('posWorkspace.section.main.title')}
            </h1>
          </header>

          <section class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
            <div class="space-y-1">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${getMsg('posWorkspace.section.queue.title')}
              </h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                ${getMsg('posWorkspace.intent.queue.query.title')}
              </p>
            </div>

            <div class="rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div class="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800">
                <span class="text-sm text-slate-600 dark:text-slate-300">
                  ${getMsg('posWorkspace.organism.queueBoard.title')}
                </span>
                <button
                  class="px-3 py-1.5 text-sm font-medium rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  @click=${this.handleViewOrderBoardClick}
                >
                  ${getMsg('posWorkspace.action.refreshBoard')}
                </button>
              </div>
              <div class="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}
              </div>
              <table class="min-w-full text-sm">
                <thead class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <th class="px-3 py-2 text-left font-medium">${getMsg('posWorkspace.field.orderId')}</th>
                    <th class="px-3 py-2 text-left font-medium">${getMsg('posWorkspace.field.status')}</th>
                    <th class="px-3 py-2 text-left font-medium">${getMsg('posWorkspace.field.orderType')}</th>
                    <th class="px-3 py-2 text-left font-medium">${getMsg('posWorkspace.field.tableNumber')}</th>
                    <th class="px-3 py-2 text-left font-medium">${getMsg('posWorkspace.field.priority')}</th>
                    <th class="px-3 py-2 text-left font-medium">${getMsg('posWorkspace.field.readyAt')}</th>
                    <th class="px-3 py-2 text-left font-medium">${getMsg('posWorkspace.field.createdAt')}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  ${boardItems.map(
                    (item) => html`
                      <tr class="text-slate-700 dark:text-slate-200">
                        <td class="px-3 py-2">${item.orderId}</td>
                        <td class="px-3 py-2">${item.status}</td>
                        <td class="px-3 py-2">${item.orderType}</td>
                        <td class="px-3 py-2">${item.tableNumber}</td>
                        <td class="px-3 py-2">${item.priority ? '✔' : '—'}</td>
                        <td class="px-3 py-2">${item.readyAt}</td>
                        <td class="px-3 py-2">${item.createdAt}</td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-6">
            <div class="space-y-1">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${getMsg('posWorkspace.section.createOrder.title')}
              </h2>
            </div>

            <div class="space-y-4">
              <div class="space-y-3">
                <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                  ${getMsg('posWorkspace.intent.createOrder.type.title')}
                </h3>
                <div class="grid gap-3 md:grid-cols-2">
                  <label class="text-sm text-slate-600 dark:text-slate-300">
                    ${getMsg('posWorkspace.field.orderType')}
                    <select
                      class="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
                      .value=${this.createOrderOrderType}
                      @change=${this.handleCreateOrderOrderTypeChange}
                    >
                      <option value=""></option>
                      <option value="table">table</option>
                      <option value="takeout">takeout</option>
                    </select>
                  </label>
                  <label class="text-sm text-slate-600 dark:text-slate-300">
                    ${getMsg('posWorkspace.field.tableNumber')}
                    <input
                      class="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
                      type="text"
                      .value=${this.createOrderTableNumber}
                      @input=${this.handleCreateOrderTableNumberChange}
                    />
                  </label>
                </div>
              </div>

              <div class="space-y-3">
                <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                  ${getMsg('posWorkspace.intent.createOrder.items.title')}
                </h3>
                <label class="text-sm text-slate-600 dark:text-slate-300">
                  ${getMsg('posWorkspace.field.orderItems')}
                  <textarea
                    class="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
                    rows="3"
                    .value=${this.createOrderOrderItems}
                    @input=${this.handleCreateOrderOrderItemsChange}
                  ></textarea>
                </label>
              </div>

              <div class="space-y-3">
                <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                  ${getMsg('posWorkspace.intent.createOrder.priority.title')}
                </h3>
                <div class="grid gap-3 md:grid-cols-2">
                  <label class="text-sm text-slate-600 dark:text-slate-300">
                    ${getMsg('posWorkspace.field.priority')}
                    <select
                      class="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
                      .value=${this.createOrderPriority}
                      @change=${this.handleCreateOrderPriorityChange}
                    >
                      <option value=""></option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  </label>
                  <label class="text-sm text-slate-600 dark:text-slate-300">
                    ${getMsg('posWorkspace.field.priorityReason')}
                    <input
                      class="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
                      type="text"
                      .value=${this.createOrderPriorityReason}
                      @input=${this.handleCreateOrderPriorityReasonChange}
                    />
                  </label>
                </div>
              </div>

              <div class="space-y-3 rounded-md border border-slate-200 dark:border-slate-800 p-3">
                <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                  ${getMsg('posWorkspace.intent.createOrder.summary.title')}
                </h3>
                <dl class="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <div class="flex justify-between">
                    <dt>${getMsg('posWorkspace.field.orderType')}</dt>
                    <dd class="text-slate-900 dark:text-slate-100">${this.createOrderOrderType}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt>${getMsg('posWorkspace.field.tableNumber')}</dt>
                    <dd class="text-slate-900 dark:text-slate-100">${this.createOrderTableNumber}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt>${getMsg('posWorkspace.field.orderItems')}</dt>
                    <dd class="text-slate-900 dark:text-slate-100">${this.createOrderOrderItems}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt>${getMsg('posWorkspace.field.priority')}</dt>
                    <dd class="text-slate-900 dark:text-slate-100">${this.createOrderPriority}</dd>
                  </div>
                </dl>
              </div>

              <div class="flex justify-end">
                <button
                  class="px-4 py-2 text-sm font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                  @click=${this.handleCreateOrderClick}
                >
                  ${getMsg('posWorkspace.action.createOrder')}
                </button>
              </div>
            </div>
          </section>

          <section class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
            <div class="space-y-1">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${getMsg('posWorkspace.section.deliverOrder.title')}
              </h2>
            </div>
            <div class="rounded-md border border-slate-200 dark:border-slate-800 p-3 space-y-2">
              <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                ${getMsg('posWorkspace.intent.deliverOrder.summary.title')}
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-300">
                ${readyItems.length > 0
                  ? `${readyItems.length} ${readyItems.length === 1 ? 'pedido pronto' : 'pedidos prontos'}`
                  : ''}
              </p>
              ${readyItems.length > 0
                ? html`
                    <ul class="text-sm text-slate-600 dark:text-slate-300 list-disc pl-4">
                      ${readyItems.map(
                        (item) => html`<li>${item.orderId}</li>`
                      )}
                    </ul>
                  `
                : null}
            </div>
            <div class="flex justify-end">
              <button
                class="px-4 py-2 text-sm font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                @click=${this.handleDeliverOrderClick}
                ?disabled=${readyItems.length === 0}
              >
                ${getMsg('posWorkspace.action.deliverOrder')}
              </button>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
