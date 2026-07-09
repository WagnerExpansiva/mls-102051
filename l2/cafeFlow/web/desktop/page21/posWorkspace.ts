/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page21--pos-workspace-102051')
export class CafeFlowDesktopPage21PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const boardItems: CafeFlowViewOrderBoardOutputItem[] = this.viewOrderBoardData?.items ?? [];
    const boardTotal: number = this.viewOrderBoardData?.total ?? 0;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['posWorkspace.section.pipeline.title']}
          </h1>

          <!-- Section 10: Order Pipeline (Board / workflowStatus) -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2
                class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
              >
                ${this.msg['posWorkspace.organism.kanban.title']}
              </h2>
              <button
                class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                @click=${(e: Event) => this.handleViewOrderBoardClick(e)}
                ?disabled=${this.viewOrderBoardState === 'loading'}
              >
                ${this.msg['posWorkspace.action.refreshBoard']}
              </button>
            </div>

            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['posWorkspace.intent.kanban.title']}
            </p>

            ${this.viewOrderBoardState === 'loading'
              ? html`
                  <div
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4"
                  >
                    …
                  </div>
                `
              : boardItems.length === 0
                ? html`
                    <div
                      class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4"
                    >
                      —
                    </div>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr
                            class="border-b border-[var(--grey-color,#E6E6E6)] text-left text-[var(--text-primary-color-lighter,#535353)]"
                          >
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['posWorkspace.field.orderId']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['posWorkspace.field.status']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['posWorkspace.field.orderType']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['posWorkspace.field.tableNumber']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['posWorkspace.field.priority']}
                            </th>
                            <th class="py-2 px-3 font-medium">
                              ${this.msg['posWorkspace.field.readyAt']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${boardItems.map(
                            (item: CafeFlowViewOrderBoardOutputItem) => html`
                              <tr
                                class="border-b border-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)]"
                              >
                                <td class="py-2 px-3">${item.orderId}</td>
                                <td class="py-2 px-3">${item.status}</td>
                                <td class="py-2 px-3">${item.orderType}</td>
                                <td class="py-2 px-3">
                                  ${item.tableNumber || '—'}
                                </td>
                                <td class="py-2 px-3">
                                  ${item.priority ? '⚠' : '—'}
                                </td>
                                <td class="py-2 px-3">
                                  ${item.readyAt || '—'}
                                </td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="text-xs text-[var(--text-primary-color-lighter,#535353)]"
                    >
                      ${boardTotal}
                    </div>
                  `}
          </section>

          <!-- Section 20: Create Order (Form / commandForm) -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['posWorkspace.organism.createOrder.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['posWorkspace.intent.createOrder.details']}
            </p>

            <div class="space-y-4">
              <!-- orderType: select -->
              <div class="space-y-1">
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['posWorkspace.field.orderType']}
                  <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <select
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderOrderType}
                  @change=${(e: Event) => this.handleCreateOrderOrderTypeChange(e)}
                >
                  <option value="">—</option>
                  <option value="table" ?selected=${this.createOrderOrderType === 'table'}>
                    table
                  </option>
                  <option value="takeout" ?selected=${this.createOrderOrderType === 'takeout'}>
                    takeout
                  </option>
                </select>
              </div>

              <!-- tableNumber: text -->
              <div class="space-y-1">
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['posWorkspace.field.tableNumber']}
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderTableNumber}
                  @input=${(e: Event) => this.handleCreateOrderTableNumberChange(e)}
                />
              </div>

              <!-- orderItems: repeatable (rendered as textarea) -->
              <div class="space-y-1">
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['posWorkspace.field.orderItems']}
                  <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <textarea
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  rows="3"
                  .value=${this.createOrderOrderItems}
                  @input=${(e: Event) => this.handleCreateOrderOrderItemsChange(e)}
                ></textarea>
              </div>

              <!-- priority: checkbox -->
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pos-priority"
                  class="rounded border-[var(--grey-color,#E6E6E6)]"
                  .checked=${this.createOrderPriority === 'true'}
                  @change=${(e: Event) => this.handleCreateOrderPriorityChange(e)}
                />
                <label
                  for="pos-priority"
                  class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['posWorkspace.field.priority']}
                </label>
              </div>

              <!-- priorityReason: text -->
              <div class="space-y-1">
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['posWorkspace.field.priorityReason']}
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderPriorityReason}
                  @input=${(e: Event) => this.handleCreateOrderPriorityReasonChange(e)}
                />
              </div>

              <!-- Submit action -->
              <div class="flex items-center gap-3">
                <button
                  class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  @click=${(e: Event) => this.handleCreateOrderClick(e)}
                  ?disabled=${this.createOrderState === 'loading'}
                >
                  ${this.msg['posWorkspace.action.createOrder']}
                </button>
                ${this.createOrderState === 'loading'
                  ? html`<span class="text-sm text-[var(--text-primary-color-lighter,#535353)]">…</span>`
                  : null}
                ${this.createOrderState === 'success'
                  ? html`<span class="text-sm text-[var(--success-color,#52C41A)]">✓</span>`
                  : null}
                ${this.createOrderState === 'error'
                  ? html`<span class="text-sm text-[var(--error-color,#FF4D4F)]">✗</span>`
                  : null}
              </div>
            </div>
          </section>

          <!-- Section 30: Deliver Order (Form / commandForm) -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['posWorkspace.organism.deliver.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['posWorkspace.intent.deliverOrder.title']}
            </p>

            <div class="space-y-4">
              <!-- orderId: read-only (layout state, no setter handler) -->
              <div class="space-y-1">
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['posWorkspace.field.orderId']}
                </label>
                <input
                  type="text"
                  readonly
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color-lighter,#535353)]"
                  .value=${this.LayoutFld60}
                />
              </div>

              <!-- status: read-only (layout state, no setter handler) -->
              <div class="space-y-1">
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['posWorkspace.field.status']}
                </label>
                <input
                  type="text"
                  readonly
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color-lighter,#535353)]"
                  .value=${this.LayoutFld70}
                />
              </div>

              <!-- readyAt: read-only (layout state, no setter handler) -->
              <div class="space-y-1">
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['posWorkspace.field.readyAt']}
                </label>
                <input
                  type="text"
                  readonly
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color-lighter,#535353)]"
                  .value=${this.LayoutFld80}
                />
              </div>

              <!-- Submit action -->
              <div class="flex items-center gap-3">
                <button
                  class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  @click=${(e: Event) => this.handleDeliverOrderClick(e)}
                  ?disabled=${this.deliverOrderState === 'loading'}
                >
                  ${this.msg['posWorkspace.action.deliverOrder']}
                </button>
                ${this.deliverOrderState === 'loading'
                  ? html`<span class="text-sm text-[var(--text-primary-color-lighter,#535353)]">…</span>`
                  : null}
                ${this.deliverOrderState === 'success'
                  ? html`<span class="text-sm text-[var(--success-color,#52C41A)]">✓</span>`
                  : null}
                ${this.deliverOrderState === 'error'
                  ? html`<span class="text-sm text-[var(--error-color,#FF4D4F)]">✗</span>`
                  : null}
              </div>
            </div>
          </section>

          <!-- Section 40: Review Summary (summary) -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['posWorkspace.organism.review.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['posWorkspace.intent.reviewSummary.title']}
            </p>

            ${this.OutputCreateOrder
              ? html`
                  <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['posWorkspace.field.orderId']}
                      </dt>
                      <dd
                        class="text-sm text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.OutputCreateOrder.orderId}
                      </dd>
                    </div>
                    <div class="space-y-1">
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['posWorkspace.field.status']}
                      </dt>
                      <dd
                        class="text-sm text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.OutputCreateOrder.status}
                      </dd>
                    </div>
                    <div class="space-y-1">
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['posWorkspace.field.orderType']}
                      </dt>
                      <dd
                        class="text-sm text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.OutputCreateOrder.orderType}
                      </dd>
                    </div>
                    <div class="space-y-1">
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['posWorkspace.field.tableNumber']}
                      </dt>
                      <dd
                        class="text-sm text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.OutputCreateOrder.tableNumber || '—'}
                      </dd>
                    </div>
                    <div class="space-y-1">
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['posWorkspace.field.priority']}
                      </dt>
                      <dd
                        class="text-sm text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.createOrderPriority === 'true' ? '⚠' : '—'}
                      </dd>
                    </div>
                    <div class="space-y-1">
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['posWorkspace.field.priorityReason']}
                      </dt>
                      <dd
                        class="text-sm text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.createOrderPriorityReason || '—'}
                      </dd>
                    </div>
                    <div class="space-y-1">
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color-lighter,#535353)]"
                      >
                        ${this.msg['posWorkspace.field.createdAt']}
                      </dt>
                      <dd
                        class="text-sm text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.OutputCreateOrder.createdAt}
                      </dd>
                    </div>
                  </dl>
                `
              : html`
                  <div
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-2"
                  >
                    —
                  </div>
                `}
          </section>
        </div>
      </div>
    `;
  }
}
