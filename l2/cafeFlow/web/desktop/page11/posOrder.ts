/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posOrder.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosOrderBase } from '/_102051_/l2/cafeFlow/web/shared/posOrder.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posOrder.js';

@customElement('cafe-flow--web--desktop--page11--pos-order-102051')
export class CafeFlowDesktopPage11PosOrderPage extends CafeFlowPosOrderBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--ds-color-surface,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-xl font-semibold text-[var(--ds-color-text,#0f172a)]">
            ${this.msg['posOrder.section.main.title']}
          </h1>

          ${this.renderCreateOrderOrganism()}
          ${this.renderViewOrderBoardOrganism()}
          ${this.renderDeliverOrderOrganism()}
        </div>
      </div>
    `;
  }

  // ── Create Order ───────────────────────────────────────────────

  private renderCreateOrderOrganism() {
    return html`
      <section class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-surface,#ffffff)] p-4 space-y-4">
        <h2 class="text-lg font-medium text-[var(--ds-color-text,#0f172a)]">
          ${this.msg['posOrder.organism.createOrder.title']}
        </h2>

        ${this.renderCreateOrderForm()}
        ${this.renderCreateOrderSummary()}
      </section>
    `;
  }

  private renderCreateOrderForm() {
    return html`
      <div class="space-y-4">
        <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
          ${this.msg['posOrder.intent.createOrder.form.title']}
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label class="block">
            <span class="block text-sm text-[var(--ds-color-text,#0f172a)] mb-1">
              ${this.msg['posOrder.field.orderType.label']} *
            </span>
            <select
              class="w-full rounded border border-[var(--ds-color-border,#e2e8f0)] px-3 py-2 text-[var(--ds-color-text,#0f172a)] bg-[var(--ds-color-surface,#ffffff)]"
              .value="${this.createOrderOrderType}"
              @change="${(e: Event) => this.handleCreateOrderOrderTypeChange(e)}"
            >
              <option value="" ?selected="${this.createOrderOrderType === ''}"></option>
              <option value="table" ?selected="${this.createOrderOrderType === 'table'}">table</option>
              <option value="takeout" ?selected="${this.createOrderOrderType === 'takeout'}">takeout</option>
            </select>
          </label>

          <label class="block">
            <span class="block text-sm text-[var(--ds-color-text,#0f172a)] mb-1">
              ${this.msg['posOrder.field.tableNumber.label']}
            </span>
            <input
              type="text"
              class="w-full rounded border border-[var(--ds-color-border,#e2e8f0)] px-3 py-2 text-[var(--ds-color-text,#0f172a)] bg-[var(--ds-color-surface,#ffffff)]"
              .value="${this.createOrderTableNumber}"
              @input="${(e: Event) => this.handleCreateOrderTableNumberChange(e)}"
            />
          </label>

          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              class="rounded border-[var(--ds-color-border,#e2e8f0)]"
              .checked="${this.createOrderPriority === 'true'}"
              @change="${(e: Event) => {
                const target = e.target as HTMLInputElement;
                this.handleCreateOrderPriorityChange(
                  new CustomEvent('change', { detail: target.checked }) as unknown as Event,
                );
                this.setCreateOrderPriority(target.checked ? 'true' : 'false');
              }}"
            />
            <span class="text-sm text-[var(--ds-color-text,#0f172a)]">
              ${this.msg['posOrder.field.priority.label']}
            </span>
          </label>

          <label class="block sm:col-span-2">
            <span class="block text-sm text-[var(--ds-color-text,#0f172a)] mb-1">
              ${this.msg['posOrder.field.priorityReason.label']}
            </span>
            <textarea
              class="w-full rounded border border-[var(--ds-color-border,#e2e8f0)] px-3 py-2 text-[var(--ds-color-text,#0f172a)] bg-[var(--ds-color-surface,#ffffff)]"
              rows="2"
              .value="${this.createOrderPriorityReason}"
              @input="${(e: Event) => this.handleCreateOrderPriorityReasonChange(e)}"
            ></textarea>
          </label>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="rounded px-4 py-2 text-sm font-medium text-white bg-[var(--ds-color-primary,#2563eb)] disabled:opacity-50"
            ?disabled="${this.createOrderState === 'loading' || !this.createOrderOrderType}"
            @click="${(e: Event) => this.handleCreateOrderClick(e)}"
          >
            ${this.msg['posOrder.intent.createOrder.form.title']}
          </button>
          ${this.createOrderState === 'loading' ? html`<span class="text-sm text-[var(--ds-color-text,#0f172a)]">…</span>` : null}
          ${this.createOrderState === 'error' ? html`<span class="text-sm text-red-600">error</span>` : null}
        </div>
      </div>
    `;
  }

  private renderCreateOrderSummary() {
    return html`
      <div class="space-y-2 border-t border-[var(--ds-color-border,#e2e8f0)] pt-4">
        <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
          ${this.msg['posOrder.intent.createOrder.summary.title']}
        </h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.orderId.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.LayoutFieldCreateOrderOrderId || '—'}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.status.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.LayoutFieldCreateOrderStatus || '—'}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.orderType.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.createOrderOrderType || '—'}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.tableNumber.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.createOrderTableNumber || '—'}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.createdAt.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.LayoutFieldCreateOrderCreatedAt || '—'}</dd>
          </div>
        </dl>
      </div>
    `;
  }

  // ── View Order Board ───────────────────────────────────────────

  private renderViewOrderBoardOrganism() {
    const items: CafeFlowViewOrderBoardOutputItem[] = this.viewOrderBoardData?.items ?? [];

    return html`
      <section class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-surface,#ffffff)] p-4 space-y-4">
        <h2 class="text-lg font-medium text-[var(--ds-color-text,#0f172a)]">
          ${this.msg['posOrder.organism.viewOrderBoard.title']}
        </h2>

        <div class="flex flex-wrap items-end gap-3">
          <label class="block">
            <span class="block text-sm text-[var(--ds-color-text,#0f172a)] mb-1">
              ${this.msg['posOrder.filter.statusFilter.label']}
            </span>
            <select
              class="rounded border border-[var(--ds-color-border,#e2e8f0)] px-3 py-2 text-[var(--ds-color-text,#0f172a)] bg-[var(--ds-color-surface,#ffffff)]"
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
            class="rounded px-4 py-2 text-sm font-medium text-white bg-[var(--ds-color-primary,#2563eb)] disabled:opacity-50"
            ?disabled="${this.viewOrderBoardState === 'loading'}"
            @click="${(e: Event) => this.handleViewOrderBoardClick(e)}"
          >
            ${this.msg['posOrder.action.viewOrderBoard.label']}
          </button>
          ${this.viewOrderBoardState === 'loading' ? html`<span class="text-sm text-[var(--ds-color-text,#0f172a)]">…</span>` : null}
        </div>

        <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
          ${this.msg['posOrder.intent.viewOrderBoard.list.title']}
        </h3>

        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="border-b border-[var(--ds-color-border,#e2e8f0)] text-left">
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.orderId.label']}</th>
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.status.label']}</th>
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.orderType.label']}</th>
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.tableNumber.label']}</th>
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.priority.label']}</th>
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.priorityReason.label']}</th>
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.receivedAt.label']}</th>
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.inPreparationAt.label']}</th>
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.readyAt.label']}</th>
                <th class="py-2 px-2 text-[var(--ds-color-text,#0f172a)] font-medium">${this.msg['posOrder.field.createdAt.label']}</th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0
                ? html`<tr><td colspan="10" class="py-4 text-center text-[var(--ds-color-text,#0f172a)] opacity-50">—</td></tr>`
                : items.map((item: CafeFlowViewOrderBoardOutputItem) => html`
                  <tr class="border-b border-[var(--ds-color-border,#e2e8f0)]">
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.orderId}</td>
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.status}</td>
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.orderType}</td>
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.tableNumber || '—'}</td>
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.priority ? '✓' : '—'}</td>
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.priorityReason || '—'}</td>
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.receivedAt || '—'}</td>
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.inPreparationAt || '—'}</td>
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.readyAt || '—'}</td>
                    <td class="py-2 px-2 text-[var(--ds-color-text,#0f172a)]">${item.createdAt || '—'}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>

        ${this.viewOrderBoardData?.total !== undefined
          ? html`<p class="text-xs text-[var(--ds-color-text,#0f172a)] opacity-60">${this.viewOrderBoardData.total}</p>`
          : null}
      </section>
    `;
  }

  // ── Deliver Order ──────────────────────────────────────────────

  private renderDeliverOrderOrganism() {
    return html`
      <section class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-surface,#ffffff)] p-4 space-y-4">
        <h2 class="text-lg font-medium text-[var(--ds-color-text,#0f172a)]">
          ${this.msg['posOrder.organism.deliverOrder.title']}
        </h2>

        ${this.renderDeliverOrderConfirm()}
        ${this.renderDeliverOrderSummary()}
      </section>
    `;
  }

  private renderDeliverOrderConfirm() {
    return html`
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
          ${this.msg['posOrder.intent.deliverOrder.confirm.title']}
        </h3>
        <button
          type="button"
          class="rounded px-4 py-2 text-sm font-medium text-white bg-[var(--ds-color-primary,#2563eb)] disabled:opacity-50"
          ?disabled="${this.deliverOrderState === 'loading'}"
          @click="${(e: Event) => this.handleDeliverOrderClick(e)}"
        >
          ${this.msg['posOrder.intent.deliverOrder.confirm.title']}
        </button>
        ${this.deliverOrderState === 'loading' ? html`<span class="text-sm text-[var(--ds-color-text,#0f172a)]">…</span>` : null}
        ${this.deliverOrderState === 'error' ? html`<span class="text-sm text-red-600">error</span>` : null}
      </div>
    `;
  }

  private renderDeliverOrderSummary() {
    return html`
      <div class="space-y-2 border-t border-[var(--ds-color-border,#e2e8f0)] pt-4">
        <h3 class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
          ${this.msg['posOrder.intent.deliverOrder.summary.title']}
        </h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.orderId.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.LayoutFieldDeliverOrderOrderId || '—'}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.status.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.LayoutFieldDeliverOrderStatus || '—'}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.deliveredAt.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.LayoutFieldDeliverOrderDeliveredAt || '—'}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.orderType.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.LayoutFieldDeliverOrderOrderType || '—'}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-[var(--ds-color-text,#0f172a)] opacity-70">${this.msg['posOrder.field.tableNumber.label']}</dt>
            <dd class="text-[var(--ds-color-text,#0f172a)]">${this.LayoutFieldDeliverOrderTableNumber || '—'}</dd>
          </div>
        </dl>
      </div>
    `;
  }
}
