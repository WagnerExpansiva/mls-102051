/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--pos-workspace-102051')
export class CafeFlowDesktopPage11PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const boardItems = this.viewOrderBoardData?.items ?? [];
    const boardLoading = this.viewOrderBoardState === 'loading';
    const createLoading = this.createOrderState === 'loading';
    const deliverLoading = this.deliverOrderState === 'loading';

    const statusLabel = (s: string): string => {
      if (s === 'registered') return this.msg['lane.registered'];
      if (s === 'received') return this.msg['lane.received'];
      if (s === 'inPreparation') return this.msg['lane.inPreparation'];
      if (s === 'ready') return this.msg['lane.ready'];
      if (s === 'delivered') return this.msg['lane.delivered'];
      return s;
    };

    const statusBadgeClass = (s: string): string => {
      if (s === 'ready') return 'bg-[var(--success-color,#52C41A)] text-white';
      if (s === 'inPreparation') return 'bg-[var(--warning-color,#FAAD14)] text-white';
      if (s === 'delivered') return 'bg-[var(--grey-color-dark,#D3D3D3)] text-[var(--text-primary-color,#403f3f)]';
      if (s === 'received') return 'bg-[var(--info-color,#0a6dc9)] text-white';
      return 'bg-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)]';
    };

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.posWorkspace.title']}
          </h1>

          <!-- ═══ Section: Order Board ═══ -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3"
          >
            <div class="flex items-center justify-between">
              <h2
                class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['section.orderBoard.title']}
              </h2>
              <button
                class="px-3 py-1.5 rounded text-sm font-medium bg-[var(--active-color,#1890FF)] text-white disabled:opacity-50"
                ?disabled=${boardLoading}
                @click=${this.handleViewOrderBoardClick}
              >
                ${this.msg['action.viewOrderBoard.label']}
              </button>
            </div>

            <h3
              class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]"
            >
              ${this.msg['organism.orderBoardCards.title']}
            </h3>

            ${boardLoading
              ? html`<div class="space-y-2">
                  ${[1, 2, 3].map(
                    () =>
                      html`<div
                        class="h-20 rounded bg-[var(--grey-color-light,#F2F2F2)] animate-pulse"
                      ></div>`,
                  )}
                </div>`
              : boardItems.length === 0
                ? html`<p
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4"
                  >
                    ${this.msg['empty.orderBoard']}
                  </p>`
                : html`<div class="space-y-2">
                    ${boardItems.map(
                      (item) => html`
                        <div
                          class="rounded border border-[var(--grey-color,#e2e8f0)] p-3 bg-[var(--bg-secondary-color-lighter,#F9F9F9)] space-y-2"
                        >
                          <div class="flex items-center justify-between">
                            <div>
                              <span
                                class="text-xs text-[var(--text-primary-color-lighter,#535353)]"
                                >${this.msg['field.orderId']}</span
                              >
                              <span
                                class="ml-2 font-semibold text-[var(--text-primary-color,#0f172a)]"
                                >${item.orderId}</span
                              >
                            </div>
                            <span
                              class="inline-block px-2 py-0.5 rounded text-xs font-medium ${statusBadgeClass(
                                item.status,
                              )}"
                            >
                              ${statusLabel(item.status)}
                            </span>
                          </div>
                          <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                            <div>
                              <span
                                class="text-xs text-[var(--text-primary-color-lighter,#535353)]"
                                >${this.msg['field.orderType']}:</span
                              >
                              <span
                                class="text-[var(--text-primary-color,#0f172a)]"
                                >${item.orderType}</span
                              >
                            </div>
                            <div>
                              <span
                                class="text-xs text-[var(--text-primary-color-lighter,#535353)]"
                                >${this.msg['field.tableNumber']}:</span
                              >
                              <span
                                class="text-[var(--text-primary-color,#0f172a)]"
                                >${item.tableNumber || '—'}</span
                              >
                            </div>
                            ${item.priority
                              ? html`<div>
                                  <span
                                    class="text-xs font-medium text-[var(--warning-color,#FAAD14)]"
                                    >★ ${this.msg['field.priority']}</span
                                  >
                                  ${item.priorityReason
                                    ? html`<span
                                        class="ml-1 text-xs text-[var(--text-primary-color-lighter,#535353)]"
                                        >(${item.priorityReason})</span
                                      >`
                                    : ''}
                                </div>`
                              : ''}
                            <!-- TODO: field.readyAt absent from shared -->
                            <div>
                              <span
                                class="text-xs text-[var(--text-primary-color-lighter,#535353)]"
                                >Pronto em:</span
                              >
                              <span
                                class="text-[var(--text-primary-color,#0f172a)]"
                                >${item.readyAt || '—'}</span
                              >
                            </div>
                            <!-- TODO: field.createdAt absent from shared -->
                            <div>
                              <span
                                class="text-xs text-[var(--text-primary-color-lighter,#535353)]"
                                >Criado em:</span
                              >
                              <span
                                class="text-[var(--text-primary-color,#0f172a)]"
                                >${item.createdAt || '—'}</span
                              >
                            </div>
                          </div>
                          ${item.status === 'ready'
                            ? html`<button
                                class="px-3 py-1.5 rounded text-sm font-medium bg-[var(--success-color,#52C41A)] text-white disabled:opacity-50"
                                ?disabled=${deliverLoading}
                                @click=${() => {
                                  this.setDeliverOrderOrderId(item.orderId);
                                  this.handleDeliverOrderClick();
                                }}
                              >
                                ${this.msg['action.deliverOrder.label']}
                              </button>`
                            : ''}
                        </div>
                      `,
                    )}
                  </div>`}
          </section>

          <!-- ═══ Section: Create Order ═══ -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['section.createOrder.title']}
            </h2>
            <h3
              class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]"
            >
              ${this.msg['organism.createOrderForm.title']}
            </h3>

            <div class="space-y-3">
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                  for="fld-order-type"
                >
                  ${this.msg['field.orderType']}
                  <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <select
                  id="fld-order-type"
                  class="mt-1 block w-full rounded border border-[var(--grey-color-dark,#D3D3D3)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value=${this.createOrderOrderType}
                  @change=${this.handleCreateOrderOrderTypeChange}
                >
                  <option value="">—</option>
                  <option value="table">table</option>
                  <option value="takeout">takeout</option>
                </select>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                  for="fld-table-number"
                >
                  ${this.msg['field.tableNumber']}
                </label>
                <input
                  id="fld-table-number"
                  type="text"
                  class="mt-1 block w-full rounded border border-[var(--grey-color-dark,#D3D3D3)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value=${this.createOrderTableNumber}
                  @input=${this.handleCreateOrderTableNumberChange}
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                  for="fld-order-items"
                >
                  ${this.msg['field.orderItems']}
                  <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <input
                  id="fld-order-items"
                  type="text"
                  class="mt-1 block w-full rounded border border-[var(--grey-color-dark,#D3D3D3)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value=${this.createOrderOrderItems}
                  @input=${this.handleCreateOrderOrderItemsChange}
                />
              </div>

              <div class="flex items-center gap-2">
                <input
                  id="fld-priority"
                  type="checkbox"
                  class="rounded border-[var(--grey-color-dark,#D3D3D3)]"
                  .checked=${this.createOrderPriority === 'true'}
                  @change=${this.handleCreateOrderPriorityChange}
                />
                <label
                  class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                  for="fld-priority"
                >
                  ${this.msg['field.priority']}
                </label>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                  for="fld-priority-reason"
                >
                  ${this.msg['field.priorityReason']}
                </label>
                <input
                  id="fld-priority-reason"
                  type="text"
                  class="mt-1 block w-full rounded border border-[var(--grey-color-dark,#D3D3D3)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value=${this.createOrderPriorityReason}
                  @input=${this.handleCreateOrderPriorityReasonChange}
                />
              </div>

              <button
                type="button"
                class="px-4 py-2 rounded text-sm font-medium bg-[var(--active-color,#1890FF)] text-white disabled:opacity-50"
                ?disabled=${createLoading}
                @click=${this.handleCreateOrderClick}
              >
                ${this.msg['action.createOrder.label']}
              </button>
            </div>

            ${this.createOrderState === 'success'
              ? html`<div
                  class="rounded p-3 text-sm bg-[var(--success-color,#52C41A)] text-white"
                >
                  ${this.msg['action.createOrder.success']}
                </div>`
              : ''}
            ${this.createOrderState === 'error'
              ? html`<div
                  class="rounded p-3 text-sm bg-[var(--error-color,#FF4D4F)] text-white"
                >
                  ${this.createOrderError || this.msg['action.createOrder.error']}
                </div>`
              : ''}
          </section>

          <!-- ═══ Section: Deliver Order ═══ -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-3"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['section.deliverOrder.title']}
            </h2>
            <h3
              class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]"
            >
              ${this.msg['organism.deliverOrderForm.title']}
            </h3>

            <div class="space-y-3">
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                  for="fld-deliver-order-id"
                >
                  ${this.msg['field.orderId']}
                  <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <input
                  id="fld-deliver-order-id"
                  type="text"
                  class="mt-1 block w-full rounded border border-[var(--grey-color-dark,#D3D3D3)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)]"
                  .value=${this.deliverOrderOrderId}
                  @input=${this.handleDeliverOrderOrderIdChange}
                />
              </div>

              <button
                type="button"
                class="px-4 py-2 rounded text-sm font-medium bg-[var(--active-color,#1890FF)] text-white disabled:opacity-50"
                ?disabled=${deliverLoading || !this.deliverOrderOrderId}
                @click=${this.handleDeliverOrderClick}
              >
                ${this.msg['action.deliverOrder.label']}
              </button>
            </div>

            ${this.deliverOrderState === 'success'
              ? html`<div
                  class="rounded p-3 text-sm bg-[var(--success-color,#52C41A)] text-white"
                >
                  ${this.msg['action.deliverOrder.success']}
                </div>`
              : ''}
            ${this.deliverOrderState === 'error'
              ? html`<div
                  class="rounded p-3 text-sm bg-[var(--error-color,#FF4D4F)] text-white"
                >
                  ${this.deliverOrderError || this.msg['action.deliverOrder.error']}
                </div>`
              : ''}
          </section>

          <!-- ═══ Section: Review ═══ -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['section.review.title']}
            </h2>

            <!-- Review: Create Order -->
            <div class="space-y-2">
              <!-- TODO: organism.reviewCreate.title absent from shared -->
              <h3
                class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]"
              >
                Último pedido lançado
              </h3>
              ${this.createOrderOutput
                ? html`<dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <dt
                      class="text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      ${this.msg['field.orderId']}
                    </dt>
                    <dd
                      class="font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.createOrderOutput.orderId}
                    </dd>
                    <!-- TODO: field.status absent from shared -->
                    <dt
                      class="text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      Status
                    </dt>
                    <dd
                      class="font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${statusLabel(this.createOrderOutput.status)}
                    </dd>
                    <dt
                      class="text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      ${this.msg['field.orderType']}
                    </dt>
                    <dd
                      class="font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.createOrderOutput.orderType}
                    </dd>
                    <dt
                      class="text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      ${this.msg['field.tableNumber']}
                    </dt>
                    <dd
                      class="font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.createOrderOutput.tableNumber || '—'}
                    </dd>
                    <!-- TODO: field.createdAt absent from shared -->
                    <dt
                      class="text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      Criado em
                    </dt>
                    <dd
                      class="font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.createOrderOutput.createdAt || '—'}
                    </dd>
                  </dl>`
                : html`<p
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)]"
                  >
                    ${this.msg['empty.review']}
                  </p>`}
            </div>

            <!-- Review: Deliver Order -->
            <div class="space-y-2">
              <!-- TODO: organism.reviewDeliver.title absent from shared -->
              <h3
                class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]"
              >
                Última entrega confirmada
              </h3>
              ${this.deliverOrderOutput
                ? html`<dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <dt
                      class="text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      ${this.msg['field.orderId']}
                    </dt>
                    <dd
                      class="font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.deliverOrderOutput.orderId}
                    </dd>
                    <!-- TODO: field.status absent from shared -->
                    <dt
                      class="text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      Status
                    </dt>
                    <dd
                      class="font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${statusLabel(this.deliverOrderOutput.status)}
                    </dd>
                    <!-- TODO: field.deliveredAt absent from shared -->
                    <dt
                      class="text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      Entregue em
                    </dt>
                    <dd
                      class="font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.deliverOrderOutput.deliveredAt || '—'}
                    </dd>
                    <!-- TODO: field.updatedAt absent from shared -->
                    <dt
                      class="text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      Atualizado em
                    </dt>
                    <dd
                      class="font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.deliverOrderOutput.updatedAt || '—'}
                    </dd>
                  </dl>`
                : html`<p
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)]"
                  >
                    ${this.msg['empty.review']}
                  </p>`}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
