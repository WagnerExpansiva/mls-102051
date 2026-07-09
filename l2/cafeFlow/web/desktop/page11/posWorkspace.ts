/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--pos-workspace-102051')
export class CafeFlowDesktopPage11PosWorkspacePage extends CafeFlowPosWorkspaceBase {

  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">

          <!-- Page header -->
          <header class="space-y-1">
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['posWorkspace.section.orderBoard.title']}
            </h1>
          </header>

          ${this.renderOrderBoardSection()}
          ${this.renderCreateOrderSection()}
          ${this.renderReviewSummarySection()}
          ${this.renderDeliverOrderSection()}

        </div>
      </div>
    `;
  }

  // ── Section: Order Board (queryList) ───────────────────────────
  private renderOrderBoardSection() {
    const items = this.viewOrderBoardData?.items ?? [];
    const loading = this.viewOrderBoardState === 'loading';

    return html`
      <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['posWorkspace.section.orderBoard.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['posWorkspace.organism.orderBoard.title']}
            </p>
          </div>
          <button
            type="button"
            class="px-4 py-2 rounded-md text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
            ?disabled=${loading}
            @click=${(e: Event) => this.handleViewOrderBoardClick(e)}
          >
            ${this.msg['posWorkspace.action.refreshBoard']}
          </button>
        </div>

        <div>
          <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-2">
            ${this.msg['posWorkspace.intent.orderBoardCards.title']}
          </h3>

          ${items.length === 0
            ? html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4 text-center">
                ${loading ? '...' : '—'}
              </p>`
            : html`
              <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="border-b border-[var(--grey-color,#E6E6E6)] text-left">
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.orderId']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.status']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.orderType']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.tableNumber']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.priority']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.readyAt']}</th>
                      <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.createdAt']}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items.map((item) => html`
                      <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.orderId}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.status}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.orderType}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.tableNumber || '—'}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.priority ? '✓' : '—'}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.readyAt || '—'}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${item.createdAt}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
              ${this.viewOrderBoardData?.total != null
                ? html`<p class="text-xs text-[var(--text-primary-color-lighter,#535353)] mt-2">
                    ${this.viewOrderBoardData.total}
                  </p>`
                : null}
            `}
        </div>
      </section>
    `;
  }

  // ── Section: Create Order (commandForm) ────────────────────────
  private renderCreateOrderSection() {
    const loading = this.createOrderState === 'loading';

    return html`
      <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['posWorkspace.section.createOrder.title']}
          </h2>
          <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
            ${this.msg['posWorkspace.organism.createOrder.title']}
          </p>
        </div>

        <div>
          <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-3">
            ${this.msg['posWorkspace.intent.createOrder.details']}
          </h3>

          <div class="space-y-4">
            <!-- orderType: select -->
            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['posWorkspace.field.orderType']}
                <span class="text-[var(--error-color,#FF4D4F)]">*</span>
              </label>
              <select
                class="w-full px-3 py-2 rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                .value=${this.createOrderOrderType}
                @change=${(e: Event) => this.handleCreateOrderOrderTypeChange(e)}
              >
                <option value="">—</option>
                <option value="table" ?selected=${this.createOrderOrderType === 'table'}>table</option>
                <option value="takeout" ?selected=${this.createOrderOrderType === 'takeout'}>takeout</option>
              </select>
            </div>

            <!-- tableNumber: text -->
            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['posWorkspace.field.tableNumber']}
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                .value=${this.createOrderTableNumber}
                @input=${(e: Event) => this.handleCreateOrderTableNumberChange(e)}
              />
            </div>

            <!-- orderItems: repeatable (rendered as textarea for string) -->
            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['posWorkspace.field.orderItems']}
                <span class="text-[var(--error-color,#FF4D4F)]">*</span>
              </label>
              <textarea
                rows="3"
                class="w-full px-3 py-2 rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                .value=${this.createOrderOrderItems}
                @input=${(e: Event) => this.handleCreateOrderOrderItemsChange(e)}
              ></textarea>
            </div>

            <!-- priority: checkbox -->
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="pos-priority"
                class="rounded border-[var(--grey-color,#E6E6E6)]"
                .checked=${this.createOrderPriority === 'true'}
                @change=${(e: Event) => this.handleCreateOrderPriorityChange(e)}
              />
              <label for="pos-priority" class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['posWorkspace.field.priority']}
              </label>
            </div>

            <!-- priorityReason: text -->
            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['posWorkspace.field.priorityReason']}
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                .value=${this.createOrderPriorityReason}
                @input=${(e: Event) => this.handleCreateOrderPriorityReasonChange(e)}
              />
            </div>

            <!-- Submit action -->
            <div class="pt-2">
              <button
                type="button"
                class="px-4 py-2 rounded-md text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                ?disabled=${loading}
                @click=${(e: Event) => this.handleCreateOrderClick(e)}
              >
                ${this.msg['posWorkspace.action.createOrder']}
              </button>
              ${this.createOrderState === 'error'
                ? html`<span class="ml-3 text-sm text-[var(--error-color,#FF4D4F)]">⚠</span>`
                : null}
              ${this.createOrderState === 'success'
                ? html`<span class="ml-3 text-sm text-[var(--success-color,#52C41A)]">✓</span>`
                : null}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ── Section: Review Summary (summary) ──────────────────────────
  private renderReviewSummarySection() {
    const out = this.OutputCreateOrder;

    return html`
      <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['posWorkspace.section.review.title']}
          </h2>
          <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
            ${this.msg['posWorkspace.organism.review.title']}
          </p>
        </div>

        <div>
          <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-3">
            ${this.msg['posWorkspace.intent.reviewSummary.title']}
          </h3>

          ${out
            ? html`
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-1">
                  <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.orderId']}</dt>
                  <dd class="text-[var(--text-primary-color-lighter,#535353)]">${out.orderId}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-1">
                  <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.status']}</dt>
                  <dd class="text-[var(--text-primary-color-lighter,#535353)]">${out.status}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-1">
                  <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.orderType']}</dt>
                  <dd class="text-[var(--text-primary-color-lighter,#535353)]">${out.orderType}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-1">
                  <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.tableNumber']}</dt>
                  <dd class="text-[var(--text-primary-color-lighter,#535353)]">${out.tableNumber || '—'}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-1">
                  <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.priority']}</dt>
                  <dd class="text-[var(--text-primary-color-lighter,#535353)]">${this.createOrderPriority === 'true' ? '✓' : '—'}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-1">
                  <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.priorityReason']}</dt>
                  <dd class="text-[var(--text-primary-color-lighter,#535353)]">${this.createOrderPriorityReason || '—'}</dd>
                </div>
                <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-1">
                  <dt class="font-medium text-[var(--text-primary-color,#403f3f)]">${this.msg['posWorkspace.field.createdAt']}</dt>
                  <dd class="text-[var(--text-primary-color-lighter,#535353)]">${out.createdAt}</dd>
                </div>
              </dl>
            `
            : html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-2">—</p>`}
        </div>
      </section>
    `;
  }

  // ── Section: Deliver Order (commandForm) ───────────────────────
  private renderDeliverOrderSection() {
    const loading = this.deliverOrderState === 'loading';

    return html`
      <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['posWorkspace.section.deliver.title']}
          </h2>
          <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
            ${this.msg['posWorkspace.organism.deliver.title']}
          </p>
        </div>

        <div>
          <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-3">
            ${this.msg['posWorkspace.intent.deliverOrder.title']}
          </h3>

          <div class="space-y-4">
            <!-- orderId: read-only display (LayoutFld130) -->
            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['posWorkspace.field.orderId']}
              </label>
              <input
                type="text"
                readonly
                class="w-full px-3 py-2 rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color-lighter,#535353)]"
                .value=${this.LayoutFld130}
              />
            </div>

            <!-- status: read-only display (LayoutFld140) -->
            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['posWorkspace.field.status']}
              </label>
              <input
                type="text"
                readonly
                class="w-full px-3 py-2 rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color-lighter,#535353)]"
                .value=${this.LayoutFld140}
              />
            </div>

            <!-- readyAt: read-only display (LayoutFld150) -->
            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['posWorkspace.field.readyAt']}
              </label>
              <input
                type="text"
                readonly
                class="w-full px-3 py-2 rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] text-[var(--text-primary-color-lighter,#535353)]"
                .value=${this.LayoutFld150}
              />
            </div>

            <!-- Submit action -->
            <div class="pt-2">
              <button
                type="button"
                class="px-4 py-2 rounded-md text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                ?disabled=${loading}
                @click=${(e: Event) => this.handleDeliverOrderClick(e)}
              >
                ${this.msg['posWorkspace.action.deliverOrder']}
              </button>
              ${this.deliverOrderState === 'error'
                ? html`<span class="ml-3 text-sm text-[var(--error-color,#FF4D4F)]">⚠</span>`
                : null}
              ${this.deliverOrderState === 'success'
                ? html`<span class="ml-3 text-sm text-[var(--success-color,#52C41A)]">✓</span>`
                : null}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
