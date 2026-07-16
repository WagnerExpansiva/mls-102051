/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { CafeFlowViewOrderBoardOutputItem } from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page21--pos-workspace-102051')
export class CafeFlowDesktopPage21PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const items: CafeFlowViewOrderBoardOutputItem[] = this.viewOrderBoardData.items;
    const isBoardLoading: boolean = this.viewOrderBoardState === 'loading';
    const isCreateLoading: boolean = this.createOrderState === 'loading';
    const isDeliverLoading: boolean = this.deliverOrderState === 'loading';

    const laneKeys: string[] = ['registered', 'received', 'inPreparation', 'ready', 'delivered'];
    // TODO: lane.* keys not available in shared i18n; using literal labels
    const laneLabels: Record<string, string> = {
      registered: 'Registrado',
      received: 'Recebido',
      inPreparation: 'Em Preparo',
      ready: 'Pronto',
      delivered: 'Entregue',
    };

    const itemsByLane = laneKeys.map((lane: string) => ({
      lane,
      label: laneLabels[lane] ?? lane,
      cards: items.filter((item: CafeFlowViewOrderBoardOutputItem) => item.status === lane),
    }));

    return html`
      <div class="min-h-screen p-4 space-y-6">
        <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['page.posWorkspace.title']}
        </h1>

        <!-- Order Board: card-board with lanes -->
        <section class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.board.title']}
            </h2>
            <button
              class="px-4 py-2 rounded-lg bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] text-sm font-medium hover:bg-[var(--bg-secondary-color-hover,#d9d9d9)]"
              @click=${() => this.handleViewOrderBoardClick()}
            >
              ${this.msg['action.refresh.label']}
            </button>
          </div>

          ${this.deliverOrderState === 'success' ? html`
            <div class="p-3 rounded-lg bg-[var(--success-color,#52C41A)] text-white text-sm">
              ${this.msg['action.deliverOrder.success']}
            </div>
          ` : ''}
          ${this.deliverOrderState === 'error' ? html`
            <div class="p-3 rounded-lg bg-[var(--error-color,#FF4D4F)] text-white text-sm">
              ${this.deliverOrderError || this.msg['action.deliverOrder.error']}
            </div>
          ` : ''}

          ${isBoardLoading ? html`
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              ${laneKeys.map(() => html`
                <div class="animate-pulse rounded-lg bg-[var(--grey-color-light,#F2F2F2)] h-48"></div>
              `)}
            </div>
          ` : items.length === 0 ? html`
            <div class="p-8 text-center text-[var(--text-primary-color-disabled,#525151)] rounded-lg bg-[var(--bg-secondary-color,#E6E6E6)]">
              ${this.msg['empty.orderBoard']}
            </div>
          ` : html`
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              ${itemsByLane.map((laneData: { lane: string; label: string; cards: CafeFlowViewOrderBoardOutputItem[] }) => html`
                <div class="rounded-lg bg-[var(--bg-secondary-color,#E6E6E6)] p-3 space-y-2 min-h-32">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">${laneData.label}</span>
                    <span class="text-xs text-[var(--text-primary-color-disabled,#525151)]">${laneData.cards.length}</span>
                  </div>
                  ${laneData.cards.map((item: CafeFlowViewOrderBoardOutputItem) => html`
                    <div class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] p-3 space-y-2 border border-[var(--grey-color,#E6E6E6)]">
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-bold text-[var(--text-primary-color,#403f3f)]">#${item.orderId}</span>
                        ${item.priority ? html`
                          <span class="text-xs px-2 py-0.5 rounded bg-[var(--warning-color,#FAAD14)] text-white">★</span>
                        ` : ''}
                      </div>
                      <div class="text-xs text-[var(--text-primary-color-disabled,#525151)] space-y-0.5">
                        <div>${this.msg['column.orderType']}: ${item.orderType === 'table' ? 'Mesa' : 'Takeout'}</div>
                        ${item.tableNumber ? html`<div>${this.msg['column.tableNumber']}: ${item.tableNumber}</div>` : ''}
                        ${item.priorityReason ? html`<div>${this.msg['column.priorityReason']}: ${item.priorityReason}</div>` : ''}
                      </div>
                      ${item.status === 'ready' ? html`
                        <button
                          class="w-full py-2 px-3 rounded-lg bg-[var(--success-color,#52C41A)] text-white text-sm font-medium hover:bg-[var(--success-color-hover,#66d93f)] disabled:opacity-50"
                          ?disabled=${isDeliverLoading}
                          @click=${() => { this.setDeliverOrderOrderId(item.orderId); this.handleDeliverOrderClick(); }}
                        >
                          ${isDeliverLoading ? '...' : this.msg['action.deliverOrder.label']}
                        </button>
                      ` : ''}
                    </div>
                  `)}
                </div>
              `)}
            </div>
          `}
        </section>

        <!-- Create Order Form -->
        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['section.createOrder.title']}
          </h2>

          ${this.createOrderState === 'success' ? html`
            <div class="p-3 rounded-lg bg-[var(--success-color,#52C41A)] text-white text-sm">
              ${this.msg['action.createOrder.success']}
            </div>
          ` : ''}
          ${this.createOrderState === 'error' ? html`
            <div class="p-3 rounded-lg bg-[var(--error-color,#FF4D4F)] text-white text-sm">
              ${this.createOrderError || this.msg['action.createOrder.error']}
            </div>
          ` : ''}

          <div class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4 border border-[var(--grey-color,#E6E6E6)]">
            <div class="space-y-1">
              <label class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['field.orderType.label']}
              </label>
              <select
                class="w-full px-3 py-2 rounded-lg border border-[var(--grey-color-dark,#D3D3D3)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                .value=${this.createOrderOrderType}
                @change=${(e: Event) => this.handleCreateOrderOrderTypeChange(e)}
              >
                <option value="">--</option>
                <option value="table">Mesa</option>
                <option value="takeout">Takeout</option>
              </select>
            </div>

            ${this.createOrderOrderType === 'table' ? html`
              <div class="space-y-1">
                <label class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['field.tableNumber.label']}
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded-lg border border-[var(--grey-color-dark,#D3D3D3)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderTableNumber}
                  @input=${(e: Event) => this.handleCreateOrderTableNumberChange(e)}
                />
              </div>
            ` : ''}

            <div class="space-y-1">
              <label class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['field.orderItems.label']}
              </label>
              <textarea
                class="w-full px-3 py-2 rounded-lg border border-[var(--grey-color-dark,#D3D3D3)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                .value=${this.createOrderOrderItems}
                @input=${(e: Event) => this.handleCreateOrderOrderItemsChange(e)}
                rows="3"
              ></textarea>
            </div>

            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="priority-checkbox"
                class="w-5 h-5"
                .checked=${this.createOrderPriority === 'true'}
                @change=${(e: Event) => this.handleCreateOrderPriorityChange(e)}
              />
              <label for="priority-checkbox" class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['field.priority.label']}
              </label>
            </div>

            ${this.createOrderPriority === 'true' ? html`
              <div class="space-y-1">
                <label class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['field.priorityReason.label']}
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded-lg border border-[var(--grey-color-dark,#D3D3D3)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                  .value=${this.createOrderPriorityReason}
                  @input=${(e: Event) => this.handleCreateOrderPriorityReasonChange(e)}
                />
              </div>
            ` : ''}

            <button
              class="w-full py-3 px-4 rounded-lg bg-[var(--active-color,#1890FF)] text-white text-base font-bold hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
              ?disabled=${isCreateLoading}
              @click=${() => this.handleCreateOrderClick()}
            >
              ${isCreateLoading ? '...' : this.msg['action.createOrder.label']}
            </button>
          </div>
        </section>
      </div>
    `;
  }
}
