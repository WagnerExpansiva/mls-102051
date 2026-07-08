/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posOrder.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosOrderBase } from '/_102051_/l2/cafeFlow/web/shared/posOrder.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posOrder.js';

@customElement('cafe-flow--web--desktop--page11--pos-order-102051')
export class CafeFlowDesktopPage11PosOrderPage extends CafeFlowPosOrderBase {
  render() {
    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
            ${this.msg['posOrder.section.main.title']}
          </h1>

          ${this.renderCreateOrderOrganism()}
          ${this.renderViewOrderBoardOrganism()}
          ${this.renderDeliverOrderOrganism()}
        </div>
      </div>
    `;
  }

  private renderCreateOrderOrganism() {
    const m = this.msg;
    return html`
      <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
          ${m['posOrder.organism.createOrder.title']}
        </h2>

        <!-- commandForm: Novo pedido -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['posOrder.intent.createOrder.form.title']}
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- orderType: select -->
            <label class="block">
              <span class="text-sm text-slate-600 dark:text-slate-300">${m['posOrder.field.orderType.label']} *</span>
              <select
                class="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100"
                .value="${this.createOrderOrderType}"
                @change="${(e: Event) => this.handleCreateOrderOrderTypeChange(e)}"
              >
                <option value="" ?selected="${this.createOrderOrderType === ''}"></option>
                <option value="table" ?selected="${this.createOrderOrderType === 'table'}">table</option>
                <option value="takeout" ?selected="${this.createOrderOrderType === 'takeout'}">takeout</option>
              </select>
            </label>

            <!-- tableNumber: text -->
            <label class="block">
              <span class="text-sm text-slate-600 dark:text-slate-300">${m['posOrder.field.tableNumber.label']}</span>
              <input
                type="text"
                class="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100"
                .value="${this.createOrderTableNumber}"
                @input="${(e: Event) => this.handleCreateOrderTableNumberChange(e)}"
              />
            </label>

            <!-- priority: checkbox -->
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                class="rounded border-slate-300 dark:border-slate-700"
                .checked="${this.createOrderPriority === 'true'}"
                @change="${(e: Event) => this.handleCreateOrderPriorityChange(e)}"
              />
              <span class="text-sm text-slate-600 dark:text-slate-300">${m['posOrder.field.priority.label']}</span>
            </label>

            <!-- priorityReason: textarea -->
            <label class="block sm:col-span-2">
              <span class="text-sm text-slate-600 dark:text-slate-300">${m['posOrder.field.priorityReason.label']}</span>
              <textarea
                class="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100"
                rows="2"
                .value="${this.createOrderPriorityReason}"
                @input="${(e: Event) => this.handleCreateOrderPriorityReasonChange(e)}"
              ></textarea>
            </label>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              ?disabled="${this.createOrderState === 'loading'}"
              @click="${() => this.handleCreateOrderClick()}"
            >
              ${m['posOrder.intent.createOrder.form.title']}
            </button>
            ${this.createOrderState === 'loading' ? html`<span class="text-sm text-slate-500">…</span>` : null}
            ${this.createOrderState === 'error' ? html`<span class="text-sm text-red-600">error</span>` : null}
            ${this.createOrderState === 'success' ? html`<span class="text-sm text-green-600">ok</span>` : null}
          </div>
        </div>

        <!-- summary: Resumo do pedido criado -->
        <div class="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['posOrder.intent.createOrder.summary.title']}
          </h3>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.orderId.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.LayoutFieldCreateOrderOrderId || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.status.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.LayoutFieldCreateOrderStatus || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.orderType.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.createOrderOrderType || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.tableNumber.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.createOrderTableNumber || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.createdAt.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.LayoutFieldCreateOrderCreatedAt || '—'}</dd>
            </div>
          </dl>
        </div>
      </section>
    `;
  }

  private renderViewOrderBoardOrganism() {
    const m = this.msg;
    const rows: CafeFlowViewOrderBoardOutputItem[] = this.viewOrderBoardData?.items ?? [];
    const columns: { key: string; label: string; format?: string }[] = [
      { key: 'orderId', label: m['posOrder.field.orderId.label'] },
      { key: 'status', label: m['posOrder.field.status.label'] },
      { key: 'orderType', label: m['posOrder.field.orderType.label'] },
      { key: 'tableNumber', label: m['posOrder.field.tableNumber.label'] },
      { key: 'priority', label: m['posOrder.field.priority.label'] },
      { key: 'priorityReason', label: m['posOrder.field.priorityReason.label'] },
      { key: 'receivedAt', label: m['posOrder.field.receivedAt.label'], format: 'datetime' },
      { key: 'inPreparationAt', label: m['posOrder.field.inPreparationAt.label'], format: 'datetime' },
      { key: 'readyAt', label: m['posOrder.field.readyAt.label'], format: 'datetime' },
      { key: 'createdAt', label: m['posOrder.field.createdAt.label'], format: 'datetime' },
    ];

    return html`
      <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
          ${m['posOrder.organism.viewOrderBoard.title']}
        </h2>

        <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
          ${m['posOrder.intent.viewOrderBoard.list.title']}
        </h3>

        <!-- toolbar + filter -->
        <div class="flex flex-wrap items-center gap-3">
          <label class="flex items-center gap-2">
            <span class="text-sm text-slate-600 dark:text-slate-300">${m['posOrder.filter.statusFilter.label']}</span>
            <select
              class="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm text-slate-800 dark:text-slate-100"
              .value="${this.viewOrderBoardStatusFilter}"
              @change="${(e: Event) => this.handleViewOrderBoardStatusFilterChange(e)}"
            >
              <option value="" ?selected="${this.viewOrderBoardStatusFilter === ''}"></option>
              <option value="registered" ?selected="${this.viewOrderBoardStatusFilter === 'registered'}">registered</option>
              <option value="received" ?selected="${this.viewOrderBoardStatusFilter === 'received'}">received</option>
              <option value="inPreparation" ?selected="${this.viewOrderBoardStatusFilter === 'inPreparation'}">inPreparation</option>
              <option value="ready" ?selected="${this.viewOrderBoardStatusFilter === 'ready'}">ready</option>
              <option value="delivered" ?selected="${this.viewOrderBoardStatusFilter === 'delivered'}">delivered</option>
            </select>
          </label>

          <button
            type="button"
            class="px-3 py-1.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50"
            ?disabled="${this.viewOrderBoardState === 'loading'}"
            @click="${() => this.handleViewOrderBoardClick()}"
          >
            ${m['posOrder.action.viewOrderBoard.label']}
          </button>
          ${this.viewOrderBoardState === 'loading' ? html`<span class="text-sm text-slate-500">…</span>` : null}
        </div>

        <!-- table -->
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm border-collapse">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700">
                ${columns.map((col: { key: string; label: string }) => html`
                  <th class="text-left px-3 py-2 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">${col.label}</th>
                `)}
                <th class="text-left px-3 py-2 font-medium text-slate-600 dark:text-slate-300"></th>
              </tr>
            </thead>
            <tbody>
              ${rows.length === 0
                ? html`<tr><td class="px-3 py-4 text-slate-400 dark:text-slate-500" colspan="${columns.length + 1}">—</td></tr>`
                : rows.map((row: CafeFlowViewOrderBoardOutputItem) => html`
                  <tr class="border-b border-slate-100 dark:border-slate-800">
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.orderId || '—'}</td>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.status || '—'}</td>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.orderType || '—'}</td>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.tableNumber || '—'}</td>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.priority ? '✓' : '—'}</td>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.priorityReason || '—'}</td>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.receivedAt || '—'}</td>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.inPreparationAt || '—'}</td>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.readyAt || '—'}</td>
                    <td class="px-3 py-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">${row.createdAt || '—'}</td>
                    <td class="px-3 py-2 whitespace-nowrap">
                      ${row.status === 'ready'
                        ? html`<button
                            type="button"
                            class="px-2 py-1 rounded bg-green-600 text-white text-xs font-medium hover:bg-green-700 disabled:opacity-50"
                            ?disabled="${this.deliverOrderState === 'loading'}"
                            @click="${() => this.handleDeliverOrderClick(row.orderId)}"
                          >${this.msg['posOrder.intent.deliverOrder.confirm.title']}</button>`
                        : null}
                    </td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>

        ${this.viewOrderBoardData?.total != null
          ? html`<p class="text-xs text-slate-400 dark:text-slate-500">${this.viewOrderBoardData.total}</p>`
          : null}
      </section>
    `;
  }

  private renderDeliverOrderOrganism() {
    const m = this.msg;
    return html`
      <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
          ${m['posOrder.organism.deliverOrder.title']}
        </h2>

        <!-- commandForm: Confirmar entrega -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['posOrder.intent.deliverOrder.confirm.title']}
          </h3>
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50"
              ?disabled="${this.deliverOrderState === 'loading'}"
              @click="${() => this.handleDeliverOrderClick()}"
            >
              ${m['posOrder.intent.deliverOrder.confirm.title']}
            </button>
            ${this.deliverOrderState === 'loading' ? html`<span class="text-sm text-slate-500">…</span>` : null}
            ${this.deliverOrderState === 'error' ? html`<span class="text-sm text-red-600">error</span>` : null}
            ${this.deliverOrderState === 'success' ? html`<span class="text-sm text-green-600">ok</span>` : null}
          </div>
        </div>

        <!-- summary: Resumo da entrega -->
        <div class="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${m['posOrder.intent.deliverOrder.summary.title']}
          </h3>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.orderId.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.LayoutFieldDeliverOrderOrderId || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.status.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.LayoutFieldDeliverOrderStatus || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.deliveredAt.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.LayoutFieldDeliverOrderDeliveredAt || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.orderType.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.LayoutFieldDeliverOrderOrderType || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${m['posOrder.field.tableNumber.label']}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.LayoutFieldDeliverOrderTableNumber || '—'}</dd>
            </div>
          </dl>
        </div>
      </section>
    `;
  }
}
