/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page31--pos-workspace-102051')
export class CafeFlowDesktopPage31PosWorkspacePage extends CafeFlowPosWorkspaceBase {

  render() {
    return html`
      <div class="min-h-full bg-[var(--ds-color-bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">

          <!-- Page header -->
          <header class="space-y-1">
            <h1 class="text-xl font-bold text-[var(--ds-color-text-primary-color,#0f172a)]">
              ${this.msg['posWorkspace.section.queue.title']}
            </h1>
          </header>

          <!-- Section 10: Order Queue -->
          <section class="rounded-lg border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-primary-color,#ffffff)] p-4 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--ds-color-text-primary-color,#0f172a)]">
                ${this.msg['posWorkspace.organism.queue.title']}
              </h2>
              <button
                type="button"
                class="px-3 py-1.5 rounded text-sm font-medium text-[var(--ds-color-bg-primary-color,#ffffff)] bg-[var(--ds-color-active-color,#1890FF)] hover:bg-[var(--ds-color-active-color-hover,#1a99ff)] disabled:opacity-50"
                ?disabled=${this.viewOrderBoardState === 'loading'}
                @click=${(e: Event) => this.handleViewOrderBoardClick(e)}
              >
                ${this.msg['posWorkspace.action.refreshBoard']}
              </button>
            </div>

            <p class="text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]">
              ${this.msg['posWorkspace.intent.queue.title']}
            </p>

            ${this.viewOrderBoardState === 'loading' ? html`
              <p class="text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]">…</p>
            ` : this.viewOrderBoardState === 'error' ? html`
              <p class="text-sm text-[var(--ds-color-error-color,#FF4D4F)]">Error</p>
            ` : (this.viewOrderBoardData.items.length === 0) ? html`
              <p class="text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]">—</p>
            ` : html`
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-[var(--ds-color-grey-color,#e2e8f0)] text-left text-[var(--ds-color-text-primary-color-lighter,#535353)]">
                      <th class="py-2 pr-4 font-medium">${this.msg['posWorkspace.field.orderId']}</th>
                      <th class="py-2 pr-4 font-medium">${this.msg['posWorkspace.field.status']}</th>
                      <th class="py-2 pr-4 font-medium">${this.msg['posWorkspace.field.orderType']}</th>
                      <th class="py-2 pr-4 font-medium">${this.msg['posWorkspace.field.tableNumber']}</th>
                      <th class="py-2 pr-4 font-medium">${this.msg['posWorkspace.field.priority']}</th>
                      <th class="py-2 pr-4 font-medium">${this.msg['posWorkspace.field.readyAt']}</th>
                      <th class="py-2 pr-4 font-medium">${this.msg['posWorkspace.field.createdAt']}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.viewOrderBoardData.items.map((item) => html`
                      <tr class="border-b border-[var(--ds-color-grey-color-light,#F2F2F2)] text-[var(--ds-color-text-primary-color,#0f172a)]">
                        <td class="py-2 pr-4">${item.orderId}</td>
                        <td class="py-2 pr-4">${item.status}</td>
                        <td class="py-2 pr-4">${item.orderType}</td>
                        <td class="py-2 pr-4">${item.tableNumber || '—'}</td>
                        <td class="py-2 pr-4">${item.priority ? '⚠' : '—'}</td>
                        <td class="py-2 pr-4">${item.readyAt || '—'}</td>
                        <td class="py-2 pr-4">${item.createdAt}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
              ${this.viewOrderBoardData.total !== undefined ? html`
                <p class="text-xs text-[var(--ds-color-text-primary-color-lighter,#535353)]">
                  ${this.viewOrderBoardData.total}
                </p>
              ` : ''}
            `}
          </section>

          <!-- Section 20: Create Order -->
          <section class="rounded-lg border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--ds-color-text-primary-color,#0f172a)]">
              ${this.msg['posWorkspace.organism.createOrder.title']}
            </h2>
            <p class="text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]">
              ${this.msg['posWorkspace.intent.createOrder.details']}
            </p>

            <form class="space-y-4" @submit=${(e: Event) => e.preventDefault()}>
              <!-- orderType: select -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">
                  ${this.msg['posWorkspace.field.orderType']}
                </label>
                <select
                  class="w-full rounded border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--ds-color-text-primary-color,#0f172a)]"
                  .value=${this.createOrderOrderType}
                  @change=${(e: Event) => this.handleCreateOrderOrderTypeChange(e)}
                >
                  <option value="" ?selected=${this.createOrderOrderType === ''}></option>
                  <option value="table" ?selected=${this.createOrderOrderType === 'table'}>table</option>
                  <option value="takeout" ?selected=${this.createOrderOrderType === 'takeout'}>takeout</option>
                </select>
              </div>

              <!-- tableNumber: text -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">
                  ${this.msg['posWorkspace.field.tableNumber']}
                </label>
                <input
                  type="text"
                  class="w-full rounded border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--ds-color-text-primary-color,#0f172a)]"
                  .value=${this.createOrderTableNumber}
                  @input=${(e: Event) => this.handleCreateOrderTableNumberChange(e)}
                />
              </div>

              <!-- orderItems: textarea (repeatable as text) -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">
                  ${this.msg['posWorkspace.field.orderItems']}
                </label>
                <textarea
                  rows="3"
                  class="w-full rounded border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--ds-color-text-primary-color,#0f172a)]"
                  .value=${this.createOrderOrderItems}
                  @input=${(e: Event) => this.handleCreateOrderOrderItemsChange(e)}
                ></textarea>
              </div>

              <!-- priority: checkbox -->
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pos-priority"
                  class="rounded border-[var(--ds-color-grey-color,#e2e8f0)]"
                  .checked=${this.createOrderPriority === 'true'}
                  @change=${(e: Event) => this.handleCreateOrderPriorityChange(e)}
                />
                <label for="pos-priority" class="text-sm font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">
                  ${this.msg['posWorkspace.field.priority']}
                </label>
              </div>

              <!-- priorityReason: text -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">
                  ${this.msg['posWorkspace.field.priorityReason']}
                </label>
                <input
                  type="text"
                  class="w-full rounded border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--ds-color-text-primary-color,#0f172a)]"
                  .value=${this.createOrderPriorityReason}
                  @input=${(e: Event) => this.handleCreateOrderPriorityReasonChange(e)}
                />
              </div>

              <!-- Submit -->
              <div class="flex items-center gap-3">
                <button
                  type="submit"
                  class="px-4 py-2 rounded text-sm font-medium text-[var(--ds-color-bg-primary-color,#ffffff)] bg-[var(--ds-color-active-color,#1890FF)] hover:bg-[var(--ds-color-active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.createOrderState === 'loading'}
                  @click=${(e: Event) => this.handleCreateOrderClick(e)}
                >
                  ${this.msg['posWorkspace.action.createOrder']}
                </button>
                ${this.createOrderState === 'loading' ? html`<span class="text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]">…</span>` : ''}
                ${this.createOrderState === 'error' ? html`<span class="text-sm text-[var(--ds-color-error-color,#FF4D4F)]">Error</span>` : ''}
                ${this.createOrderState === 'success' ? html`<span class="text-sm text-[var(--ds-color-success-color,#52C41A)]">✓</span>` : ''}
              </div>
            </form>
          </section>

          <!-- Section 30: Deliver Order -->
          <section class="rounded-lg border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--ds-color-text-primary-color,#0f172a)]">
              ${this.msg['posWorkspace.organism.deliver.title']}
            </h2>
            <p class="text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]">
              ${this.msg['posWorkspace.intent.deliverOrder.title']}
            </p>

            <form class="space-y-4" @submit=${(e: Event) => e.preventDefault()}>
              <!-- orderId: read-only layout state -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">
                  ${this.msg['posWorkspace.field.orderId']}
                </label>
                <input
                  type="text"
                  readonly
                  class="w-full rounded border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-secondary-color-lighter,#F9F9F9)] px-3 py-2 text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]"
                  .value=${this.LayoutFld60}
                />
              </div>

              <!-- status: read-only layout state -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">
                  ${this.msg['posWorkspace.field.status']}
                </label>
                <input
                  type="text"
                  readonly
                  class="w-full rounded border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-secondary-color-lighter,#F9F9F9)] px-3 py-2 text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]"
                  .value=${this.LayoutFld70}
                />
              </div>

              <!-- readyAt: read-only layout state -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">
                  ${this.msg['posWorkspace.field.readyAt']}
                </label>
                <input
                  type="text"
                  readonly
                  class="w-full rounded border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-secondary-color-lighter,#F9F9F9)] px-3 py-2 text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]"
                  .value=${this.LayoutFld80}
                />
              </div>

              <!-- Submit -->
              <div class="flex items-center gap-3">
                <button
                  type="submit"
                  class="px-4 py-2 rounded text-sm font-medium text-[var(--ds-color-bg-primary-color,#ffffff)] bg-[var(--ds-color-active-color,#1890FF)] hover:bg-[var(--ds-color-active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled=${this.deliverOrderState === 'loading'}
                  @click=${(e: Event) => this.handleDeliverOrderClick(e)}
                >
                  ${this.msg['posWorkspace.action.deliverOrder']}
                </button>
                ${this.deliverOrderState === 'loading' ? html`<span class="text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]">…</span>` : ''}
                ${this.deliverOrderState === 'error' ? html`<span class="text-sm text-[var(--ds-color-error-color,#FF4D4F)]">Error</span>` : ''}
                ${this.deliverOrderState === 'success' ? html`<span class="text-sm text-[var(--ds-color-success-color,#52C41A)]">✓</span>` : ''}
              </div>
            </form>
          </section>

          <!-- Section 40: Review Summary -->
          <section class="rounded-lg border border-[var(--ds-color-grey-color,#e2e8f0)] bg-[var(--ds-color-bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--ds-color-text-primary-color,#0f172a)]">
              ${this.msg['posWorkspace.organism.review.title']}
            </h2>
            <p class="text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]">
              ${this.msg['posWorkspace.intent.reviewSummary.title']}
            </p>

            ${this.OutputCreateOrder ? html`
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div class="flex justify-between border-b border-[var(--ds-color-grey-color-light,#F2F2F2)] py-1">
                  <dt class="font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">${this.msg['posWorkspace.field.orderId']}</dt>
                  <dd class="text-[var(--ds-color-text-primary-color-lighter,#535353)]">${this.OutputCreateOrder.orderId}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--ds-color-grey-color-light,#F2F2F2)] py-1">
                  <dt class="font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">${this.msg['posWorkspace.field.status']}</dt>
                  <dd class="text-[var(--ds-color-text-primary-color-lighter,#535353)]">${this.OutputCreateOrder.status}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--ds-color-grey-color-light,#F2F2F2)] py-1">
                  <dt class="font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">${this.msg['posWorkspace.field.orderType']}</dt>
                  <dd class="text-[var(--ds-color-text-primary-color-lighter,#535353)]">${this.OutputCreateOrder.orderType}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--ds-color-grey-color-light,#F2F2F2)] py-1">
                  <dt class="font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">${this.msg['posWorkspace.field.tableNumber']}</dt>
                  <dd class="text-[var(--ds-color-text-primary-color-lighter,#535353)]">${this.OutputCreateOrder.tableNumber || '—'}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--ds-color-grey-color-light,#F2F2F2)] py-1">
                  <dt class="font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">${this.msg['posWorkspace.field.priority']}</dt>
                  <dd class="text-[var(--ds-color-text-primary-color-lighter,#535353)]">${this.createOrderPriority === 'true' ? '⚠' : '—'}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--ds-color-grey-color-light,#F2F2F2)] py-1">
                  <dt class="font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">${this.msg['posWorkspace.field.priorityReason']}</dt>
                  <dd class="text-[var(--ds-color-text-primary-color-lighter,#535353)]">${this.createOrderPriorityReason || '—'}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--ds-color-grey-color-light,#F2F2F2)] py-1">
                  <dt class="font-medium text-[var(--ds-color-text-primary-color,#0f172a)]">${this.msg['posWorkspace.field.createdAt']}</dt>
                  <dd class="text-[var(--ds-color-text-primary-color-lighter,#535353)]">${this.OutputCreateOrder.createdAt}</dd>
                </div>
              </dl>
            ` : html`
              <p class="text-sm text-[var(--ds-color-text-primary-color-lighter,#535353)]">—</p>
            `}
          </section>

        </div>
      </div>
    `;
  }
}
