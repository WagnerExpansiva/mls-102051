/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--pos-workspace-102051')
export class CafeFlowDesktopPage11PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  private _createOrderDismissed = false;
  private _deliverOrderDismissed = false;

  render() {
    const items: CafeFlowViewOrderBoardOutputItem[] = this.viewOrderBoardData?.items ?? [];
    const boardLoading = this.viewOrderBoardState === 'loading';
    const boardTotal = this.viewOrderBoardData?.total ?? 0;

    const statusColorMap: Record<string, string> = {
      registered: 'var(--info-color, #0a6dc9)',
      received: 'var(--info-color, #0a6dc9)',
      inPreparation: 'var(--warning-color, #FAAD14)',
      ready: 'var(--success-color, #52C41A)',
      delivered: 'var(--grey-color-darker, #C0C0C0)',
    };

    const statusLabelMap: Record<string, string> = {
      registered: this.msg['lane.registered'],
      received: this.msg['lane.received'],
      inPreparation: this.msg['lane.inPreparation'],
      ready: this.msg['lane.ready'],
      delivered: this.msg['lane.delivered'],
    };

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">

          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.posWorkspace.title']}
          </h1>

          <!-- ── Section: Order Board ─────────────────────────────── -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['section.orderBoard.title']}
              </h2>
              <button
                class="px-3 py-1.5 rounded text-sm border border-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color,#E6E6E6)] disabled:opacity-50"
                @click=${() => this.handleViewOrderBoardClick()}
                ?disabled=${boardLoading}
              >
                ${this.msg['action.viewOrderBoard.label']}
              </button>
            </div>

            <h3 class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['organism.orderBoardCards.title']}
              ${boardTotal > 0 ? html`<span class="ml-2 text-xs">(${boardTotal})</span>` : null}
            </h3>

            ${boardLoading
              ? html`<div class="space-y-3">
                  ${[1, 2, 3].map(
                    () => html`
                      <div
                        class="h-20 rounded-lg bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"
                      ></div>
                    `,
                  )}
                </div>`
              : items.length === 0
                ? html`<p
                      class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-8 text-center"
                    >
                      ${this.msg['empty.orderBoard']}
                    </p>`
                : html`<div class="space-y-3">
                    ${items.map((item: CafeFlowViewOrderBoardOutputItem) => {
                      const statusColor: string =
                        statusColorMap[item.status] ?? 'var(--grey-color,#E6E6E6)';
                      const statusLabel: string =
                        statusLabelMap[item.status] ?? item.status;
                      return html`
                        <div
                          class="rounded-lg border border-[var(--grey-color,#E6E6E6)] p-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
                        >
                          <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div>
                              <span class="text-[var(--text-primary-color-lighter,#535353)] text-xs"
                                >${this.msg['column.orderId']}</span
                              >
                              <p class="font-medium text-[var(--text-primary-color,#403f3f)]">
                                ${item.orderId}
                              </p>
                            </div>
                            <div>
                              <span class="text-[var(--text-primary-color-lighter,#535353)] text-xs"
                                >${this.msg['column.status']}</span
                              >
                              <p>
                                <span
                                  class="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                                  style="background-color: ${statusColor}"
                                >
                                  ${statusLabel}
                                </span>
                              </p>
                            </div>
                            <div>
                              <span class="text-[var(--text-primary-color-lighter,#535353)] text-xs"
                                >${this.msg['column.orderType']}</span
                              >
                              <p class="font-medium text-[var(--text-primary-color,#403f3f)]">
                                ${item.orderType}
                              </p>
                            </div>
                            <div>
                              <span class="text-[var(--text-primary-color-lighter,#535353)] text-xs"
                                >${this.msg['column.tableNumber']}</span
                              >
                              <p class="font-medium text-[var(--text-primary-color,#403f3f)]">
                                ${item.tableNumber || '—'}
                              </p>
                            </div>
                          </div>
                          <div class="flex items-center gap-3">
                            ${item.priority
                              ? html`<span
                                  class="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                                  style="background-color: var(--warning-color,#FAAD14)"
                                >
                                  ${this.msg['column.priority']}
                                </span>`
                              : null}
                            ${item.status === 'ready'
                              ? html`<button
                                  class="px-3 py-1.5 rounded text-sm text-white disabled:opacity-50"
                                  style="background-color: var(--active-color,#1890FF)"
                                  @click=${() => this.setDeliverOrderOrderId(item.orderId)}
                                >
                                  ${this.msg['action.selectForDelivery']}
                                </button>`
                              : null}
                          </div>
                        </div>
                      `;
                    })}
                  </div>`}
          </section>

          <!-- ── Section: Create Order ────────────────────────────── -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.createOrder.title']}
            </h2>

            <form
              class="space-y-4"
              @submit=${(e: Event) => {
                e.preventDefault();
                this._createOrderDismissed = false;
                this.handleCreateOrderClick();
              }}
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label
                    class="text-sm text-[var(--text-primary-color,#403f3f)]"
                    for="fld_orderType"
                  >
                    ${this.msg['field.orderType']} *
                  </label>
                  <select
                    id="fld_orderType"
                    class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value=${this.createOrderOrderType}
                    @change=${(e: Event) => this.handleCreateOrderOrderTypeChange(e)}
                  >
                    <option value="">—</option>
                    <option value="table">table</option>
                    <option value="takeout">takeout</option>
                  </select>
                </div>

                <div class="space-y-1">
                  <label
                    class="text-sm text-[var(--text-primary-color,#403f3f)]"
                    for="fld_tableNumber"
                  >
                    ${this.msg['field.tableNumber']}
                  </label>
                  <input
                    id="fld_tableNumber"
                    type="number"
                    class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value=${this.createOrderTableNumber}
                    @input=${(e: Event) => this.handleCreateOrderTableNumberChange(e)}
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label
                  class="text-sm text-[var(--text-primary-color,#403f3f)]"
                  for="fld_orderItems"
                >
                  ${this.msg['field.orderItems']} *
                </label>
                <textarea
                  id="fld_orderItems"
                  rows="3"
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderOrderItems}
                  @input=${(e: Event) => this.handleCreateOrderOrderItemsChange(e)}
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label
                    class="text-sm text-[var(--text-primary-color,#403f3f)] flex items-center gap-2"
                    for="fld_priority"
                  >
                    <input
                      id="fld_priority"
                      type="checkbox"
                      .checked=${this.createOrderPriority === 'true'}
                      @change=${(e: Event) => this.handleCreateOrderPriorityChange(e)}
                    />
                    ${this.msg['field.priority']}
                  </label>
                </div>

                <div class="space-y-1">
                  <label
                    class="text-sm text-[var(--text-primary-color,#403f3f)]"
                    for="fld_priorityReason"
                  >
                    ${this.msg['field.priorityReason']}
                  </label>
                  <input
                    id="fld_priorityReason"
                    type="text"
                    class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                    .value=${this.createOrderPriorityReason}
                    @input=${(e: Event) => this.handleCreateOrderPriorityReasonChange(e)}
                  />
                </div>
              </div>

              <div class="flex items-center gap-3">
                <button
                  type="submit"
                  class="px-4 py-2 rounded text-sm font-medium text-white disabled:opacity-50"
                  style="background-color: var(--active-color,#1890FF)"
                  ?disabled=${this.createOrderState === 'loading'}
                >
                  ${this.createOrderState === 'loading'
                    ? html`<span class="inline-block animate-pulse">${this.msg['action.createOrder.submit']}</span>`
                    : this.msg['action.createOrder.submit']}
                </button>
              </div>
            </form>

            ${this.createOrderState === 'success' && !this._createOrderDismissed
              ? html`<div
                  class="rounded p-3 text-sm flex items-center justify-between"
                  style="background-color: var(--success-color,#52C41A); color: #fff;"
                >
                  <span>${this.msg['action.createOrder.success']}</span>
                  <button
                    class="text-white opacity-75 hover:opacity-100 text-sm"
                    @click=${() => {
                      this._createOrderDismissed = true;
                      this.requestUpdate();
                    }}
                  >
                    ✕
                  </button>
                </div>`
              : null}
            ${this.createOrderState === 'error' && !this._createOrderDismissed
              ? html`<div
                  class="rounded p-3 text-sm flex items-center justify-between"
                  style="background-color: var(--error-color,#FF4D4F); color: #fff;"
                >
                  <span>${this.createOrderError || this.msg['action.createOrder.error']}</span>
                  <button
                    class="text-white opacity-75 hover:opacity-100 text-sm"
                    @click=${() => {
                      this._createOrderDismissed = true;
                      this.requestUpdate();
                    }}
                  >
                    ✕
                  </button>
                </div>`
              : null}
          </section>

          <!-- ── Section: Deliver Order ───────────────────────────── -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.deliverOrder.title']}
            </h2>

            <h3 class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['organism.deliverOrderSheet.title']}
            </h3>

            ${!this.deliverOrderOrderId
              ? html`<p
                  class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4 text-center"
                >
                  ${this.msg['empty.deliverOrder']}
                </p>`
              : html`<form
                  class="space-y-4"
                  @submit=${(e: Event) => {
                    e.preventDefault();
                    this._deliverOrderDismissed = false;
                    this.handleDeliverOrderClick();
                  }}
                >
                  <div class="space-y-1">
                    <label
                      class="text-sm text-[var(--text-primary-color,#403f3f)]"
                      for="fld_deliverOrderId"
                    >
                      ${this.msg['field.orderId']} *
                    </label>
                    <input
                      id="fld_deliverOrderId"
                      type="text"
                      readonly
                      class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color,#403f3f)]"
                      .value=${this.deliverOrderOrderId}
                      @input=${(e: Event) => this.handleDeliverOrderOrderIdChange(e)}
                    />
                  </div>

                  <div class="flex items-center gap-3">
                    <button
                      type="submit"
                      class="px-4 py-2 rounded text-sm font-medium text-white disabled:opacity-50"
                      style="background-color: var(--active-color,#1890FF)"
                      ?disabled=${this.deliverOrderState === 'loading'}
                    >
                      ${this.deliverOrderState === 'loading'
                        ? html`<span class="inline-block animate-pulse">${this.msg['action.deliverOrder.submit']}</span>`
                        : this.msg['action.deliverOrder.submit']}
                    </button>
                  </div>
                </form>`}

            ${this.deliverOrderState === 'success' && !this._deliverOrderDismissed
              ? html`<div
                  class="rounded p-3 text-sm flex items-center justify-between"
                  style="background-color: var(--success-color,#52C41A); color: #fff;"
                >
                  <span>${this.msg['action.deliverOrder.success']}</span>
                  <button
                    class="text-white opacity-75 hover:opacity-100 text-sm"
                    @click=${() => {
                      this._deliverOrderDismissed = true;
                      this.requestUpdate();
                    }}
                  >
                    ✕
                  </button>
                </div>`
              : null}
            ${this.deliverOrderState === 'error' && !this._deliverOrderDismissed
              ? html`<div
                  class="rounded p-3 text-sm flex items-center justify-between"
                  style="background-color: var(--error-color,#FF4D4F); color: #fff;"
                >
                  <span>${this.deliverOrderError || this.msg['action.deliverOrder.error']}</span>
                  <button
                    class="text-white opacity-75 hover:opacity-100 text-sm"
                    @click=${() => {
                      this._deliverOrderDismissed = true;
                      this.requestUpdate();
                    }}
                  >
                    ✕
                  </button>
                </div>`
              : null}
          </section>

        </div>
      </div>
    `;
  }
}
