/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page31--pos-workspace-102051')
export class CafeFlowDesktopPage31PosWorkspacePage extends CafeFlowPosWorkspaceBase {
render() {
const boardItems: CafeFlowViewOrderBoardOutputItem[] = this.viewOrderBoardData.items ?? [];
const boardLoading: boolean = this.viewOrderBoardState === 'loading';
const createLoading: boolean = this.createOrderState === 'loading';
const deliverLoading: boolean = this.deliverOrderState === 'loading';
const createSuccess: boolean = this.createOrderState === 'success';
const createError: boolean = this.createOrderState === 'error';
const deliverSuccess: boolean = this.deliverOrderState === 'success';
const deliverError: boolean = this.deliverOrderState === 'error';
const priorityChecked: boolean = this.createOrderPriority === 'true';
const showCreateFeedback: boolean = createSuccess || createError;
const showDeliverFeedback: boolean = deliverSuccess || deliverError;
const createFeedbackText: string = createSuccess
? this.msg['action.createOrder.success']
: this.createOrderError || this.msg['action.createOrder.error'];
const deliverFeedbackText: string = deliverSuccess
? this.msg['action.deliverOrder.success']
: this.deliverOrderError || this.msg['action.deliverOrder.error'];
const showReviewEmpty: boolean =
!this.createOrderOutput && !this.deliverOrderOutput && !showCreateFeedback && !showDeliverFeedback;

return html`
<div class="min-h-full bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]">
  <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
    <header>
      <h1 class="text-2xl font-semibold">${this.msg['page.posWorkspace.title']}</h1>
    </header>

    <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
      <h2 class="text-xl font-semibold">${this.msg['queueSection.title']}</h2>

      <div class="space-y-3">
        <h3 class="text-lg font-semibold">${this.msg['orderBoard.title']}</h3>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h4 class="text-base font-semibold">${this.msg['section.queue.title']}</h4>
          <button
            class="inline-flex items-center rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary-color,#1c91cd)]"
            @click=${this.handleViewOrderBoardClick}
            ?disabled=${boardLoading}
            aria-busy=${boardLoading}
          >
            ${this.msg['action.refresh.label']}
          </button>
        </div>

        ${boardLoading
? html`<div class="rounded-md border border-dashed border-[var(--grey-color,#e2e8f0)] p-4 text-sm">
              <!-- TODO: i18n for loading state -->
              Loading...
            </div>`
: html`
              ${boardItems.length === 0
? html`<p class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.msg['empty.queue']}</p>`
: html`
                      <div class="overflow-x-auto">
                        <table class="min-w-full border-collapse text-sm">
                          <thead>
                            <tr class="border-b border-[var(--grey-color,#e2e8f0)]">
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.orderId']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.status']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.orderType']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.tableNumber']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.priority']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.priorityReason']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.receivedAt']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.inPreparationAt']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.readyAt']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['column.createdAt']}</th>
                              <th class="px-3 py-2 text-left font-semibold">${this.msg['action.deliverOrder.label']}</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${boardItems.map((item: CafeFlowViewOrderBoardOutputItem, index: number) => {
const canDeliver: boolean = item.status === 'ready';
const rowClasses =
index % 2 === 0
? 'border-b border-[var(--grey-color,#e2e8f0)]'
: 'border-b border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)]';
return html`
                                <tr class=${rowClasses}>
                                  <td class="px-3 py-2">${item.orderId}</td>
                                  <td class="px-3 py-2">${item.status}</td>
                                  <td class="px-3 py-2">${item.orderType}</td>
                                  <td class="px-3 py-2">${item.tableNumber}</td>
                                  <td class="px-3 py-2">${String(item.priority)}</td>
                                  <td class="px-3 py-2">${item.priorityReason}</td>
                                  <td class="px-3 py-2">${item.receivedAt}</td>
                                  <td class="px-3 py-2">${item.inPreparationAt}</td>
                                  <td class="px-3 py-2">${item.readyAt}</td>
                                  <td class="px-3 py-2">${item.createdAt}</td>
                                  <td class="px-3 py-2">
                                    <button
                                      class="inline-flex items-center rounded-md border border-[var(--grey-color,#e2e8f0)] px-2 py-1 text-xs font-semibold"
                                      @click=${(event: MouseEvent) => {
if (!canDeliver) {
return;
}
event.preventDefault();
this.setDeliverOrderOrderId(item.orderId);
this.handleDeliverOrderClick();
}}
                                      ?disabled=${!canDeliver || deliverLoading}
                                    >
                                      ${this.msg['action.deliverOrder.label']}
                                    </button>
                                  </td>
                                </tr>
                              `;
})}
                          </tbody>
                        </table>
                      </div>
                    `}
            `}
      </div>

      <div class="space-y-3">
        <h4 class="text-base font-semibold">${this.msg['section.queue.deliverTitle']}</h4>
        ${this.deliverOrderOrderId
? html`
              <div class="rounded-md border border-[var(--grey-color,#e2e8f0)] p-3 space-y-3">
                <div class="text-sm">
                  <span class="font-semibold">${this.msg['field.orderId']}</span>
                  <span class="ml-2">${this.deliverOrderOrderId}</span>
                </div>
                <button
                  class="inline-flex items-center justify-center rounded-md bg-[var(--active-color,#1890ff)] px-4 py-2 text-sm font-semibold text-[var(--text-primary-color-lighter,#ffffff)]"
                  @click=${this.handleDeliverOrderClick}
                  ?disabled=${deliverLoading}
                  aria-busy=${deliverLoading}
                >
                  ${this.msg['action.confirmDeliver.label']}
                </button>
              </div>
            `
: html`<p class="text-sm">${this.msg['empty.deliverOrder']}</p>`}
      </div>
    </section>

    <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
      <h2 class="text-xl font-semibold">${this.msg['createOrderSection.title']}</h2>
      <div class="space-y-3">
        <h3 class="text-lg font-semibold">${this.msg['createOrderForm.title']}</h3>
        <h4 class="text-base font-semibold">${this.msg['section.createOrder.title']}</h4>
        <form class="space-y-3">
          <label class="block text-sm font-medium">
            ${this.msg['field.orderType']}
            <select
              class="mt-1 block w-full rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2"
              .value=${this.createOrderOrderType}
              @change=${this.handleCreateOrderOrderTypeChange}
            >
              <!-- TODO: i18n for order type options -->
              <option value="">--</option>
              <option value="table">table</option>
              <option value="takeout">takeout</option>
            </select>
          </label>

          ${this.createOrderOrderType === 'table'
? html`
                <label class="block text-sm font-medium">
                  ${this.msg['field.tableNumber']}
                  <input
                    class="mt-1 block w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2"
                    type="number"
                    .value=${this.createOrderTableNumber}
                    @input=${this.handleCreateOrderTableNumberChange}
                  />
                </label>
              `
: null}

          <label class="block text-sm font-medium">
            ${this.msg['field.orderItems']}
            <textarea
              class="mt-1 block w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2"
              .value=${this.createOrderOrderItems}
              @input=${this.handleCreateOrderOrderItemsChange}
              rows="3"
            ></textarea>
          </label>

          <label class="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              .checked=${priorityChecked}
              @change=${this.handleCreateOrderPriorityChange}
            />
            ${this.msg['field.priority']}
          </label>

          ${priorityChecked
? html`
                <label class="block text-sm font-medium">
                  ${this.msg['field.priorityReason']}
                  <input
                    class="mt-1 block w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2"
                    type="text"
                    .value=${this.createOrderPriorityReason}
                    @input=${this.handleCreateOrderPriorityReasonChange}
                  />
                </label>
              `
: null}

          <button
            class="inline-flex items-center justify-center rounded-md bg-[var(--active-color,#1890ff)] px-4 py-2 text-sm font-semibold text-[var(--text-primary-color-lighter,#ffffff)]"
            type="button"
            @click=${this.handleCreateOrderClick}
            ?disabled=${createLoading}
            aria-busy=${createLoading}
          >
            ${this.msg['action.createOrder.label']}
          </button>
        </form>
      </div>
    </section>

    <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
      <h2 class="text-xl font-semibold">${this.msg['reviewSection.title']}</h2>
      <div class="space-y-3">
        <h3 class="text-lg font-semibold">${this.msg['actionSummary.title']}</h3>
        <h4 class="text-base font-semibold">${this.msg['section.review.title']}</h4>

        ${showCreateFeedback
? html`
              <details class="rounded-md border border-[var(--grey-color,#e2e8f0)] p-3">
                <!-- TODO: i18n for dismiss summary -->
                <summary class="cursor-pointer text-sm font-semibold">Fechar</summary>
                <p class="mt-2 text-sm">${createFeedbackText}</p>
              </details>
            `
: null}

        ${showDeliverFeedback
? html`
              <details class="rounded-md border border-[var(--grey-color,#e2e8f0)] p-3">
                <!-- TODO: i18n for dismiss summary -->
                <summary class="cursor-pointer text-sm font-semibold">Fechar</summary>
                <p class="mt-2 text-sm">${deliverFeedbackText}</p>
              </details>
            `
: null}

        ${this.createOrderOutput
? html`
              <div class="rounded-md border border-[var(--grey-color,#e2e8f0)] p-3 space-y-2">
                <div class="text-sm font-semibold">${this.msg['intention.createOrder.title']}</div>
                <div class="grid gap-2 text-sm">
                  <div><span class="font-semibold">${this.msg['column.orderId']}:</span> ${this.createOrderOutput.orderId}</div>
                  <div><span class="font-semibold">${this.msg['column.status']}:</span> ${this.createOrderOutput.status}</div>
                  <div><span class="font-semibold">${this.msg['column.orderType']}:</span> ${this.createOrderOutput.orderType}</div>
                  <div><span class="font-semibold">${this.msg['column.tableNumber']}:</span> ${this.createOrderOutput.tableNumber}</div>
                  <div><span class="font-semibold">${this.msg['column.createdAt']}:</span> ${this.createOrderOutput.createdAt}</div>
                </div>
              </div>
            `
: null}

        ${this.deliverOrderOutput
? html`
              <div class="rounded-md border border-[var(--grey-color,#e2e8f0)] p-3 space-y-2">
                <div class="text-sm font-semibold">${this.msg['intention.deliverOrder.title']}</div>
                <div class="grid gap-2 text-sm">
                  <div><span class="font-semibold">${this.msg['column.orderId']}:</span> ${this.deliverOrderOutput.orderId}</div>
                  <div><span class="font-semibold">${this.msg['column.status']}:</span> ${this.deliverOrderOutput.status}</div>
                  <div><span class="font-semibold">${this.msg['column.deliveredAt']}:</span> ${this.deliverOrderOutput.deliveredAt}</div>
                  <div><span class="font-semibold">${this.msg['column.updatedAt']}:</span> ${this.deliverOrderOutput.updatedAt}</div>
                </div>
              </div>
            `
: null}

        ${showReviewEmpty
? html`<p class="text-sm">${this.msg['empty.review']}</p>`
: null}
      </div>
    </section>
  </div>
</div>
`;
}
}
