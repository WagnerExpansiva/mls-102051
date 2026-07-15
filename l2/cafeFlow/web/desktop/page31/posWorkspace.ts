/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page31--pos-workspace-102051')
export class CafeFlowDesktopPage31PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const items: CafeFlowViewOrderBoardOutputItem[] = this.viewOrderBoardData?.items ?? [];

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.posWorkspace.title']}
          </h1>

          <!-- ── Queue Section ─────────────────────────────── -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.queue.title']}
            </h2>

            <!-- Toolbar -->
            <div class="flex justify-end">
              <button
                class="px-4 py-2 rounded-lg border border-[var(--grey-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)] text-sm hover:bg-[var(--bg-secondary-color,#e6e6e6)]"
                @click=${() => this.handleViewOrderBoardClick()}
              >
                ${this.msg['action.refresh.label']}
              </button>
            </div>

            <!-- Queue table / loading / empty -->
            ${this.viewOrderBoardState === 'loading'
              ? html`<div class="py-8 text-center text-sm text-[var(--text-primary-color-disabled,#525151)]">…</div>`
              : items.length === 0
                ? html`<div class="py-8 text-center text-sm text-[var(--text-primary-color-disabled,#525151)]">${this.msg['empty.queue']}</div>`
                : html`
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm border-collapse">
                      <thead>
                        <tr class="border-b border-[var(--grey-color,#e6e6e6)] text-left text-[var(--text-primary-color,#403f3f)]">
                          <th class="py-2 px-2 font-medium">${this.msg['column.orderId']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.status']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.orderType']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.tableNumber']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.priority']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.priorityReason']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.receivedAt']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.inPreparationAt']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.readyAt']}</th>
                          <th class="py-2 px-2 font-medium">${this.msg['column.createdAt']}</th>
                          <th class="py-2 px-2 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        ${items.map((item: CafeFlowViewOrderBoardOutputItem) => {
                          const laneLabel: string =
                            item.status === 'registered' ? this.msg['lane.registered'] :
                            item.status === 'received' ? this.msg['lane.received'] :
                            item.status === 'inPreparation' ? this.msg['lane.inPreparation'] :
                            item.status === 'ready' ? this.msg['lane.ready'] :
                            item.status === 'delivered' ? this.msg['lane.delivered'] :
                            item.status;
                          const statusColor: string =
                            item.status === 'ready' ? 'var(--success-color,#52c41a)' :
                            item.status === 'inPreparation' ? 'var(--warning-color,#faad14)' :
                            item.status === 'delivered' ? 'var(--text-primary-color-disabled,#525151)' :
                            'var(--info-color,#0a6dc9)';
                          return html`
                            <tr
                              class="border-b border-[var(--grey-color,#e6e6e6)] ${item.priority ? 'border-l-4 border-l-[var(--warning-color,#faad14)]' : ''}"
                            >
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.orderId}</td>
                              <td class="py-2 px-2">
                                <span
                                  class="inline-block px-2 py-0.5 rounded text-xs font-medium"
                                  style="color: ${statusColor};"
                                >${laneLabel}</span>
                              </td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.orderType}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.tableNumber || '—'}</td>
                              <td class="py-2 px-2">
                                ${item.priority
                                  ? html`<span class="inline-block px-2 py-0.5 rounded text-xs font-medium text-white" style="background-color: var(--warning-color,#faad14);">${this.msg['column.priority']}</span>`
                                  : html`<span class="text-[var(--text-primary-color-disabled,#525151)]">—</span>`}
                              </td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.priorityReason || '—'}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.receivedAt || '—'}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.inPreparationAt || '—'}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.readyAt || '—'}</td>
                              <td class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]">${item.createdAt || '—'}</td>
                              <td class="py-2 px-2">
                                ${item.status === 'ready'
                                  ? html`<button
                                      class="px-3 py-1 rounded text-xs text-white ${this.deliverOrderOrderId === item.orderId ? 'ring-2 ring-[var(--active-color,#1890ff)]' : ''}"
                                      style="background-color: var(--active-color,#1890ff);"
                                      @click=${() => this.setDeliverOrderOrderId(item.orderId)}
                                    >${this.msg['action.deliverOrder.label']}</button>`
                                  : null}
                              </td>
                            </tr>
                          `;
                        })}
                      </tbody>
                    </table>
                  </div>
                `}

            <!-- Deliver transition panel -->
            <div class="border-t border-[var(--grey-color,#e6e6e6)] pt-4 space-y-3">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['section.queue.deliverTitle']}
              </h3>
              <div class="text-sm text-[var(--text-primary-color,#403f3f)]">
                <span class="font-medium">${this.msg['field.orderId']}:</span>
                <span>${this.deliverOrderOrderId || '—'}</span>
              </div>
              <button
                class="px-4 py-2 rounded-lg text-white text-sm disabled:opacity-50"
                style="background-color: var(--active-color,#1890ff);"
                ?disabled=${!this.deliverOrderOrderId || this.deliverOrderState === 'loading'}
                @click=${() => this.handleDeliverOrderClick()}
              >
                ${this.deliverOrderState === 'loading' ? '…' : this.msg['action.confirmDeliver.label']}
              </button>

              ${this.deliverOrderState === 'success'
                ? html`<div class="text-sm text-[var(--success-color,#52c41a)]">${this.msg['action.deliverOrder.success']}</div>`
                : null}
              ${this.deliverOrderState === 'error'
                ? html`<div class="text-sm text-[var(--error-color,#ff4d4f)]">${this.deliverOrderError || this.msg['action.deliverOrder.error']}</div>`
                : null}
            </div>
          </section>

          <!-- ── Create Order Section ──────────────────────── -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.createOrder.title']}
            </h2>

            <div class="space-y-4">
              <!-- orderType -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['field.orderType']}
                </label>
                <select
                  class="w-full px-3 py-2 rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                  .value=${this.createOrderOrderType}
                  @change=${(e: Event) => this.handleCreateOrderOrderTypeChange(e)}
                >
                  <option value="">—</option>
                  <option value="table">Mesa</option>
                  <option value="takeout">Para viagem</option>
                </select>
              </div>

              <!-- tableNumber (only when orderType is 'table') -->
              ${this.createOrderOrderType === 'table'
                ? html`
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                      ${this.msg['field.tableNumber']}
                    </label>
                    <input
                      type="number"
                      class="w-full px-3 py-2 rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                      .value=${this.createOrderTableNumber}
                      @input=${(e: Event) => this.handleCreateOrderTableNumberChange(e)}
                    />
                  </div>
                `
                : null}

              <!-- orderItems -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['field.orderItems']}
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                  .value=${this.createOrderOrderItems}
                  @input=${(e: Event) => this.handleCreateOrderOrderItemsChange(e)}
                />
              </div>

              <!-- priority toggle -->
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="f-priority"
                  class="rounded border-[var(--grey-color,#e6e6e6)]"
                  .checked=${this.createOrderPriority === 'true'}
                  @change=${(e: Event) => this.handleCreateOrderPriorityChange(e)}
                />
                <label for="f-priority" class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['field.priority']}
                </label>
              </div>

              <!-- priorityReason (only when priority is true) -->
              ${this.createOrderPriority === 'true'
                ? html`
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                      ${this.msg['field.priorityReason']}
                    </label>
                    <input
                      type="text"
                      class="w-full px-3 py-2 rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                      .value=${this.createOrderPriorityReason}
                      @input=${(e: Event) => this.handleCreateOrderPriorityReasonChange(e)}
                    />
                  </div>
                `
                : null}

              <!-- Submit -->
              <button
                class="px-4 py-2 rounded-lg text-white text-sm disabled:opacity-50"
                style="background-color: var(--active-color,#1890ff);"
                ?disabled=${this.createOrderState === 'loading'}
                @click=${() => this.handleCreateOrderClick()}
              >
                ${this.createOrderState === 'loading' ? '…' : this.msg['action.createOrder.label']}
              </button>

              <!-- Feedback -->
              ${this.createOrderState === 'success'
                ? html`<div class="text-sm text-[var(--success-color,#52c41a)]">${this.msg['action.createOrder.success']}</div>`
                : null}
              ${this.createOrderState === 'error'
                ? html`<div class="text-sm text-[var(--error-color,#ff4d4f)]">${this.createOrderError || this.msg['action.createOrder.error']}</div>`
                : null}
            </div>
          </section>

          <!-- ── Review Section ─────────────────────────────── -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.review.title']}
            </h2>

            ${this.createOrderOutput || this.deliverOrderOutput
              ? html`
                <div class="space-y-4">
                  ${this.createOrderOutput
                    ? html`
                      <div class="space-y-2">
                        <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">
                          ${this.msg['intention.createOrder.title']}
                        </h3>
                        <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['column.orderId']}</dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">${this.createOrderOutput.orderId}</dd>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['column.status']}</dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.createOrderOutput.status === 'registered' ? this.msg['lane.registered'] :
                              this.createOrderOutput.status === 'received' ? this.msg['lane.received'] :
                              this.createOrderOutput.status === 'inPreparation' ? this.msg['lane.inPreparation'] :
                              this.createOrderOutput.status === 'ready' ? this.msg['lane.ready'] :
                              this.createOrderOutput.status === 'delivered' ? this.msg['lane.delivered'] :
                              this.createOrderOutput.status}
                          </dd>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['column.orderType']}</dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">${this.createOrderOutput.orderType}</dd>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['column.tableNumber']}</dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">${this.createOrderOutput.tableNumber || '—'}</dd>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['column.createdAt']}</dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">${this.createOrderOutput.createdAt || '—'}</dd>
                        </dl>
                      </div>
                    `
                    : null}

                  ${this.deliverOrderOutput
                    ? html`
                      <div class="space-y-2">
                        <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">
                          ${this.msg['intention.deliverOrder.title']}
                        </h3>
                        <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['column.orderId']}</dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">${this.deliverOrderOutput.orderId}</dd>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['column.status']}</dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.deliverOrderOutput.status === 'registered' ? this.msg['lane.registered'] :
                              this.deliverOrderOutput.status === 'received' ? this.msg['lane.received'] :
                              this.deliverOrderOutput.status === 'inPreparation' ? this.msg['lane.inPreparation'] :
                              this.deliverOrderOutput.status === 'ready' ? this.msg['lane.ready'] :
                              this.deliverOrderOutput.status === 'delivered' ? this.msg['lane.delivered'] :
                              this.deliverOrderOutput.status}
                          </dd>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['column.deliveredAt']}</dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">${this.deliverOrderOutput.deliveredAt || '—'}</dd>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">${this.msg['column.updatedAt']}</dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">${this.deliverOrderOutput.updatedAt || '—'}</dd>
                        </dl>
                      </div>
                    `
                    : null}
                </div>
              `
              : html`<div class="py-4 text-center text-sm text-[var(--text-primary-color-disabled,#525151)]">${this.msg['empty.review']}</div>`}
          </section>
        </div>
      </div>
    `;
  }
}
