/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page21--pos-workspace-102051')
export class CafeFlowDesktopPage21PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const boardItems: CafeFlowViewOrderBoardOutputItem[] = this.viewOrderBoardData.items ?? [];

    const laneConfig: ReadonlyArray<{
      status: CafeFlowViewOrderBoardOutputItem['status'];
      key: 'lane.registered' | 'lane.received' | 'lane.inPreparation' | 'lane.ready' | 'lane.delivered';
    }> = [
      { status: 'registered', key: 'lane.registered' },
      { status: 'received', key: 'lane.received' },
      { status: 'inPreparation', key: 'lane.inPreparation' },
      { status: 'ready', key: 'lane.ready' },
      { status: 'delivered', key: 'lane.delivered' },
    ];

    // TODO: no i18n key for orderType enum labels — using literal Portuguese strings
    const orderTypeLabels: Record<string, string> = { table: 'Mesa', takeout: 'Para viagem' };

    const renderOrderCard = (item: CafeFlowViewOrderBoardOutputItem) => {
      const isReady: boolean = item.status === 'ready';
      const isSelected: boolean = this.deliverOrderOrderId === item.orderId;
      return html`
        <div
          class="rounded border p-2 space-y-1 cursor-pointer transition ${isReady
            ? 'border-[var(--success-color,#52C41A)] bg-[var(--bg-primary-color,#ffffff)]'
            : 'border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)]'} ${isSelected
            ? 'ring-2 ring-[var(--active-color,#1890FF)]'
            : ''}"
          @click=${() => this.setDeliverOrderOrderId(item.orderId)}
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">${item.orderId}</span>
            ${item.priority
              ? html`<span class="text-xs px-1.5 py-0.5 rounded bg-[var(--warning-color,#FAAD14)] text-white font-medium">${this.msg['field.priority.label']}</span>`
              : null}
          </div>
          <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
            ${this.msg['field.orderType.label']}: ${item.orderType}
          </div>
          ${item.tableNumber
            ? html`<div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                ${this.msg['field.tableNumber.label']}: ${item.tableNumber}
              </div>`
            : null}
          <div class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
            ${this.msg['field.createdAt.label']}: ${item.createdAt}
          </div>
          ${isReady
            ? html`<button
                type="button"
                class="w-full mt-1 px-2 py-1 rounded text-xs font-medium bg-[var(--active-color,#1890FF)] text-white hover:opacity-80"
                @click=${(e: Event) => { e.stopPropagation(); this.setDeliverOrderOrderId(item.orderId); }}
              >
                ${this.msg['action.selectOrder.label']}
              </button>`
            : null}
        </div>
      `;
    };

    const renderCreateOrderFeedback = () => {
      if (this.createOrderState === 'success') {
        return html`
          <div class="rounded p-3 text-sm bg-[var(--success-color,#52C41A)] text-white">
            ${this.msg['action.createOrder.success']}
          </div>
        `;
      }
      if (this.createOrderState === 'error') {
        return html`
          <div class="rounded p-3 text-sm bg-[var(--error-color,#FF4D4F)] text-white">
            ${this.createOrderError || this.msg['action.createOrder.error']}
          </div>
        `;
      }
      return null;
    };

    const renderDeliverOrderFeedback = () => {
      if (this.deliverOrderState === 'success') {
        return html`
          <div class="rounded p-3 text-sm bg-[var(--success-color,#52C41A)] text-white">
            ${this.msg['action.deliverOrder.success']}
          </div>
        `;
      }
      if (this.deliverOrderState === 'error') {
        return html`
          <div class="rounded p-3 text-sm bg-[var(--error-color,#FF4D4F)] text-white">
            ${this.deliverOrderError || this.msg['action.deliverOrder.error']}
          </div>
        `;
      }
      return null;
    };

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.posWorkspace.title']}
          </h1>

          <!-- ═══ Board Section ═══ -->
          <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['intention.board.title']}
              </h2>
              <button
                type="button"
                class="px-3 py-1.5 rounded text-sm bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] hover:opacity-80"
                @click=${() => this.handleViewOrderBoardClick()}
              >
                ${this.msg['action.viewOrderBoard.label']}
              </button>
            </div>

            ${this.viewOrderBoardState === 'loading'
              ? html`<div class="space-y-2">
                  ${[1, 2, 3].map(() => html`<div class="h-20 rounded bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"></div>`)}
                </div>`
              : boardItems.length === 0
                ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4">${this.msg['empty.board']}</p>`
                : html`<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    ${laneConfig.map((lane) => {
                      const laneItems: CafeFlowViewOrderBoardOutputItem[] = boardItems.filter(
                        (item: CafeFlowViewOrderBoardOutputItem) => item.status === lane.status,
                      );
                      return html`
                        <div class="rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-2 space-y-2 min-h-[6rem]">
                          <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-[var(--text-primary-color,#403f3f)] uppercase tracking-wide">${this.msg[lane.key]}</span>
                            <span class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${laneItems.length}</span>
                          </div>
                          ${laneItems.length === 0
                            ? html`<p class="text-xs text-[var(--text-primary-color-lighter,#535353)] py-2">—</p>`
                            : laneItems.map(renderOrderCard)}
                        </div>
                      `;
                    })}
                  </div>`}
          </section>

          <!-- ═══ Create Order Section ═══ -->
          <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['intention.createOrder.title']}
            </h2>

            <form class="space-y-4" @submit=${(e: Event) => e.preventDefault()}>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld-orderType">
                  ${this.msg['field.orderType.label']}
                </label>
                <select
                  id="fld-orderType"
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderOrderType}
                  @change=${(e: Event) => this.handleCreateOrderOrderTypeChange(e)}
                >
                  <option value="" ?selected=${this.createOrderOrderType === ''}></option>
                  <option value="table" ?selected=${this.createOrderOrderType === 'table'}>${orderTypeLabels['table']}</option>
                  <option value="takeout" ?selected=${this.createOrderOrderType === 'takeout'}>${orderTypeLabels['takeout']}</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld-tableNumber">
                  ${this.msg['field.tableNumber.label']}
                </label>
                <input
                  id="fld-tableNumber"
                  type="number"
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderTableNumber}
                  @input=${(e: Event) => this.handleCreateOrderTableNumberChange(e)}
                />
              </div>

              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld-orderItems">
                  ${this.msg['field.orderItems.label']}
                </label>
                <textarea
                  id="fld-orderItems"
                  rows="3"
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderOrderItems}
                  @input=${(e: Event) => this.handleCreateOrderOrderItemsChange(e)}
                ></textarea>
              </div>

              <div class="space-y-1">
                <label class="flex items-center gap-2 text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  <input
                    type="checkbox"
                    class="rounded border-[var(--grey-color,#E6E6E6)]"
                    .checked=${this.createOrderPriority === 'true'}
                    @change=${(e: Event) => this.handleCreateOrderPriorityChange(e)}
                  />
                  ${this.msg['field.priority.label']}
                </label>
              </div>

              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]" for="fld-priorityReason">
                  ${this.msg['field.priorityReason.label']}
                </label>
                <input
                  id="fld-priorityReason"
                  type="text"
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderPriorityReason}
                  @input=${(e: Event) => this.handleCreateOrderPriorityReasonChange(e)}
                />
              </div>

              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="px-4 py-2 rounded text-sm font-medium bg-[var(--active-color,#1890FF)] text-white hover:opacity-80 disabled:opacity-50"
                  ?disabled=${this.createOrderState === 'loading'}
                  @click=${() => this.handleCreateOrderClick()}
                >
                  ${this.createOrderState === 'loading' ? '...' : this.msg['action.createOrder.label']}
                </button>
              </div>
            </form>

            ${renderCreateOrderFeedback()}
          </section>

          <!-- ═══ Deliver Order Section ═══ -->
          <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['intention.deliverOrder.title']}
            </h2>

            <div class="space-y-3">
              <div class="space-y-1">
                <span class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['field.orderId.label']}
                </span>
                <div class="px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-sm text-[var(--text-primary-color,#403f3f)]">
                  ${this.deliverOrderOrderId || this.msg['empty.deliverOrder']}
                </div>
              </div>

              <button
                type="button"
                class="px-4 py-2 rounded text-sm font-medium bg-[var(--active-color,#1890FF)] text-white hover:opacity-80 disabled:opacity-50"
                ?disabled=${this.deliverOrderState === 'loading' || !this.deliverOrderOrderId}
                @click=${() => this.handleDeliverOrderClick()}
              >
                ${this.deliverOrderState === 'loading' ? '...' : this.msg['action.deliverOrder.label']}
              </button>
            </div>

            ${renderDeliverOrderFeedback()}
          </section>

          <!-- ═══ Review Section ═══ -->
          <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['intention.review.title']}
            </h2>

            ${this.createOrderOutput === null && this.deliverOrderOutput === null
              ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-2">${this.msg['empty.review']}</p>`
              : html`<div class="space-y-3">
                  ${this.createOrderOutput !== null
                    ? html`<div class="rounded border border-[var(--grey-color,#E6E6E6)] p-3 space-y-1">
                        <div class="text-xs font-semibold text-[var(--text-primary-color-lighter,#535353)] uppercase">${this.msg['intention.createOrder.title']}</div>
                        <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                          <span class="font-medium">${this.msg['field.orderId.label']}:</span> ${this.createOrderOutput.orderId}
                        </div>
                        <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                          <span class="font-medium">${this.msg['field.status.label']}:</span> ${this.createOrderOutput.status}
                        </div>
                        <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                          <span class="font-medium">${this.msg['field.orderType.label']}:</span> ${this.createOrderOutput.orderType}
                        </div>
                        ${this.createOrderOutput.tableNumber
                          ? html`<div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                              <span class="font-medium">${this.msg['field.tableNumber.label']}:</span> ${this.createOrderOutput.tableNumber}
                            </div>`
                          : null}
                        <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                          <span class="font-medium">${this.msg['field.createdAt.label']}:</span> ${this.createOrderOutput.createdAt}
                        </div>
                      </div>`
                    : null}
                  ${this.deliverOrderOutput !== null
                    ? html`<div class="rounded border border-[var(--grey-color,#E6E6E6)] p-3 space-y-1">
                        <div class="text-xs font-semibold text-[var(--text-primary-color-lighter,#535353)] uppercase">${this.msg['intention.deliverOrder.title']}</div>
                        <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                          <span class="font-medium">${this.msg['field.orderId.label']}:</span> ${this.deliverOrderOutput.orderId}
                        </div>
                        <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                          <span class="font-medium">${this.msg['field.status.label']}:</span> ${this.deliverOrderOutput.status}
                        </div>
                      </div>`
                    : null}
                </div>`}
          </section>
        </div>
      </div>
    `;
  }
}
