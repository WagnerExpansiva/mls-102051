/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--pos-workspace-102051')
export class CafeFlowDesktopPage11PosWorkspacePage extends CafeFlowPosWorkspaceBase {

  render(): TemplateResult {
    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
            ${this.msg['posWorkspace.section.main.title'] ?? ''}
          </h1>

          ${this.renderCreateOrderOrganism()}
          ${this.renderViewOrderBoardOrganism()}
          ${this.renderDeliverOrderOrganism()}
        </div>
      </div>
    `;
  }

  // ── CreateOrder organism ──────────────────────────────────────────

  private renderCreateOrderOrganism(): TemplateResult {
    return html`
      <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
          ${this.msg['posWorkspace.organism.createOrder.title'] ?? ''}
        </h2>

        <!-- Command Form -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${this.msg['posWorkspace.createOrder.form.title'] ?? ''}
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- orderType: select -->
            <label class="block">
              <span class="block text-sm text-slate-600 dark:text-slate-300 mb-1">
                ${this.msg['posWorkspace.createOrder.orderType.label'] ?? ''}
              </span>
              <select
                class="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                .value="${this.createOrderOrderType}"
                @change="${this.handleCreateOrderOrderTypeChange}"
              >
                <option value="" ?selected="${this.createOrderOrderType === ''}"></option>
                <option value="table" ?selected="${this.createOrderOrderType === 'table'}">table</option>
                <option value="takeout" ?selected="${this.createOrderOrderType === 'takeout'}">takeout</option>
              </select>
            </label>

            <!-- tableNumber: text -->
            <label class="block">
              <span class="block text-sm text-slate-600 dark:text-slate-300 mb-1">
                ${this.msg['posWorkspace.createOrder.tableNumber.label'] ?? ''}
              </span>
              <input
                type="text"
                class="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                .value="${this.createOrderTableNumber}"
                @input="${this.handleCreateOrderTableNumberChange}"
              />
            </label>

            <!-- orderItems: list (textarea) -->
            <label class="block sm:col-span-2">
              <span class="block text-sm text-slate-600 dark:text-slate-300 mb-1">
                ${this.msg['posWorkspace.createOrder.orderItems.label'] ?? ''}
              </span>
              <textarea
                rows="3"
                class="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                .value="${this.createOrderOrderItems}"
                @input="${this.handleCreateOrderOrderItemsChange}"
              ></textarea>
            </label>

            <!-- priority: checkbox -->
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                class="rounded border-slate-300 dark:border-slate-700"
                .checked="${this.createOrderPriority === 'true'}"
                @change="${this.handleCreateOrderPriorityChange}"
              />
              <span class="text-sm text-slate-600 dark:text-slate-300">
                ${this.msg['posWorkspace.createOrder.priority.label'] ?? ''}
              </span>
            </label>

            <!-- priorityReason: text -->
            <label class="block">
              <span class="block text-sm text-slate-600 dark:text-slate-300 mb-1">
                ${this.msg['posWorkspace.createOrder.priorityReason.label'] ?? ''}
              </span>
              <input
                type="text"
                class="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-100"
                .value="${this.createOrderPriorityReason}"
                @input="${this.handleCreateOrderPriorityReasonChange}"
              />
            </label>
          </div>
        </div>

        <!-- Summary -->
        <div class="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
          <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
            ${this.msg['posWorkspace.createOrder.review.title'] ?? ''}
          </h3>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${this.msg['posWorkspace.createOrder.orderType.label'] ?? ''}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.createOrderOrderType || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${this.msg['posWorkspace.createOrder.tableNumber.label'] ?? ''}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.createOrderTableNumber || '—'}</dd>
            </div>
            <div class="flex justify-between sm:col-span-2">
              <dt class="text-slate-500 dark:text-slate-400">${this.msg['posWorkspace.createOrder.orderItems.label'] ?? ''}</dt>
              <dd class="text-slate-800 dark:text-slate-100 truncate">${this.createOrderOrderItems || '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${this.msg['posWorkspace.createOrder.priority.label'] ?? ''}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.createOrderPriority === 'true' ? '✓' : '—'}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-500 dark:text-slate-400">${this.msg['posWorkspace.createOrder.priorityReason.label'] ?? ''}</dt>
              <dd class="text-slate-800 dark:text-slate-100">${this.createOrderPriorityReason || '—'}</dd>
            </div>
          </dl>

          <div class="flex justify-end pt-2">
            <button
              type="button"
              class="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium disabled:opacity-50"
              ?disabled="${this.createOrderState === 'loading'}"
              @click="${this.handleCreateOrderClick}"
            >
              ${this.createOrderState === 'loading' ? '…' : (this.msg['posWorkspace.createOrder.submit.label'] ?? '')}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  // ── ViewOrderBoard organism ───────────────────────────────────────

  private renderViewOrderBoardOrganism(): TemplateResult {
    const items: CafeFlowViewOrderBoardOutputItem[] =
      this.viewOrderBoardData?.items ?? [];

    return html`
      <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
            ${this.msg['posWorkspace.organism.viewOrderBoard.title'] ?? ''}
          </h2>
          <button
            type="button"
            class="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
            ?disabled="${this.viewOrderBoardState === 'loading'}"
            @click="${this.handleViewOrderBoardClick}"
          >
            ${this.viewOrderBoardState === 'loading' ? '…' : (this.msg['posWorkspace.viewOrderBoard.refresh.label'] ?? '')}
          </button>
        </div>

        <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
          ${this.msg['posWorkspace.viewOrderBoard.list.title'] ?? ''}
        </h3>

        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700 text-left text-slate-500 dark:text-slate-400">
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.orderId.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.status.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.orderType.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.tableNumber.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.priority.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.priorityReason.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.receivedAt.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.inPreparationAt.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.readyAt.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium">${this.msg['posWorkspace.viewOrderBoard.createdAt.label'] ?? ''}</th>
                <th class="py-2 px-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0
                ? html`<tr><td colspan="11" class="py-4 text-center text-slate-400 dark:text-slate-500">—</td></tr>`
                : items.map((item: CafeFlowViewOrderBoardOutputItem) => html`
                  <tr class="border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200">
                    <td class="py-2 px-2">${item.orderId ?? '—'}</td>
                    <td class="py-2 px-2">${item.status ?? '—'}</td>
                    <td class="py-2 px-2">${item.orderType ?? '—'}</td>
                    <td class="py-2 px-2">${item.tableNumber ?? '—'}</td>
                    <td class="py-2 px-2">${item.priority ? '✓' : '—'}</td>
                    <td class="py-2 px-2">${item.priorityReason ?? '—'}</td>
                    <td class="py-2 px-2">${item.receivedAt ?? '—'}</td>
                    <td class="py-2 px-2">${item.inPreparationAt ?? '—'}</td>
                    <td class="py-2 px-2">${item.readyAt ?? '—'}</td>
                    <td class="py-2 px-2">${item.createdAt ?? '—'}</td>
                    <td class="py-2 px-2">
                      <button
                        type="button"
                        class="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium disabled:opacity-50"
                        ?disabled="${this.deliverOrderState === 'loading' || item.status !== 'ready'}"
                        @click="${this.handleDeliverOrderClick}"
                      >
                        ${this.msg['posWorkspace.viewOrderBoard.deliver.label'] ?? ''}
                      </button>
                    </td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>

        ${this.viewOrderBoardData && typeof this.viewOrderBoardData.total === 'number'
          ? html`<p class="text-xs text-slate-400 dark:text-slate-500">Total: ${this.viewOrderBoardData.total}</p>`
          : html``}
      </section>
    `;
  }

  // ── DeliverOrder organism ─────────────────────────────────────────

  private renderDeliverOrderOrganism(): TemplateResult {
    return html`
      <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
          ${this.msg['posWorkspace.organism.deliverOrder.title'] ?? ''}
        </h2>

        <h3 class="text-sm font-medium text-slate-600 dark:text-slate-300">
          ${this.msg['posWorkspace.deliverOrder.confirm.title'] ?? ''}
        </h3>

        <div class="flex justify-end pt-2">
          <button
            type="button"
            class="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium disabled:opacity-50"
            ?disabled="${this.deliverOrderState === 'loading'}"
            @click="${this.handleDeliverOrderClick}"
          >
            ${this.deliverOrderState === 'loading' ? '…' : (this.msg['posWorkspace.deliverOrder.submit.label'] ?? '')}
          </button>
        </div>
      </section>
    `;
  }
}
