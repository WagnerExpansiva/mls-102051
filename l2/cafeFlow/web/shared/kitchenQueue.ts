/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowViewKitchenBoardOutput,
  CafeFlowUpdateOrderStatusInput,
} from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

/// **collab_i18n_start**
const message_pt = {
  "kitchenQueue.section.title": "Fila da cozinha — Preparo de pedidos",
  "kitchenQueue.viewKitchenBoard.title": "Fila da cozinha",
  "kitchenQueue.viewKitchenBoard.list.title": "Pedidos na fila da cozinha",
  "kitchenQueue.updateOrderStatus.title": "Atualizar status do pedido",
  "kitchenQueue.updateOrderStatus.form.title": "Atualizar status",
  "kitchenQueue.summary.title": "Resumo do pedido",
  "kitchenQueue.field.orderId": "Pedido",
  "kitchenQueue.field.status": "Status",
  "kitchenQueue.field.orderType": "Tipo",
  "kitchenQueue.field.tableNumber": "Mesa",
  "kitchenQueue.field.priority": "Prioridade",
  "kitchenQueue.field.priorityReason": "Motivo da prioridade",
  "kitchenQueue.field.receivedAt": "Recebido em",
  "kitchenQueue.field.inPreparationAt": "Em preparo em",
  "kitchenQueue.field.createdAt": "Criado em",
  "kitchenQueue.action.refreshBoard": "Atualizar fila",
  "kitchenQueue.action.updateStatus": "Atualizar status"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowKitchenQueueBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) viewKitchenBoardState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: Object }) viewKitchenBoardData: CafeFlowViewKitchenBoardOutput = { items: [], total: 0 };

  @property({ type: String }) updateOrderStatusState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) updateOrderStatusStatus: "registered" | "received" | "inPreparation" | "ready" | "delivered" | "" = "";

  @property({ type: String }) LayoutSumOrderId: string = '';
  @property({ type: String }) LayoutSumOrderType: string = '';
  @property({ type: String }) LayoutSumTableNumber: string = '';
  @property({ type: String }) LayoutSumPriority: string = '';
  @property({ type: String }) LayoutSumPriorityReason: string = '';
  @property({ type: String }) LayoutSumReceivedAt: string = '';
  @property({ type: String }) LayoutSumInPreparationAt: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  // ── State setter: set.updateOrderStatusStatus ──

  setUpdateOrderStatusStatus(value: "registered" | "received" | "inPreparation" | "ready" | "delivered" | ""): void {
    this.updateOrderStatusStatus = value;
    setState("ui.kitchenQueue.input.updateOrderStatus.status", value);
    this.requestUpdate();
  }

  handleUpdateOrderStatusStatusChange(e: Event): void {
    const target = e.target as HTMLSelectElement | HTMLInputElement;
    const value = target.value as "registered" | "received" | "inPreparation" | "ready" | "delivered" | "";
    this.setUpdateOrderStatusStatus(value);
  }

  // ── Query action: viewKitchenBoard ──

  async loadViewKitchenBoard(): Promise<void> {
    this.viewKitchenBoardState = "loading";
    setState("ui.kitchenQueue.action.viewKitchenBoard.status", "loading");
    this.requestUpdate();

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowViewKitchenBoardOutput>(
      "cafeFlow.orderLifecycle.viewKitchenBoard",
      {},
      options
    );

    if (response.ok) {
      const data = response.data ?? { items: [], total: 0 };
      this.viewKitchenBoardData = data;
      setState("ui.kitchenQueue.data.viewKitchenBoard", data);
      this.viewKitchenBoardState = "success";
      setState("ui.kitchenQueue.action.viewKitchenBoard.status", "success");
    } else {
      this.viewKitchenBoardState = "error";
      setState("ui.kitchenQueue.action.viewKitchenBoard.status", "error");
      if (response.error) {
        console.error("[kitchenQueue] loadViewKitchenBoard error:", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleViewKitchenBoardClick(_e: Event): void {
    this.loadViewKitchenBoard();
  }

  // ── Command action: updateOrderStatus ──

  async updateOrderStatus(): Promise<void> {
    this.updateOrderStatusState = "loading";
    setState("ui.kitchenQueue.action.updateOrderStatus.status", "loading");
    this.requestUpdate();

    const params: CafeFlowUpdateOrderStatusInput = {
      status: this.updateOrderStatusStatus as "registered" | "received" | "inPreparation" | "ready" | "delivered",
    };

    const response = await execBff(
      "cafeFlow.orderLifecycle.updateOrderStatus",
      params,
      { mode: 'blocking' }
    );

    if (response.ok) {
      // Refresh query actions
      let refreshFailed = false;
      try {
        await this.loadViewKitchenBoard();
      } catch (err) {
        refreshFailed = true;
        console.error("[kitchenQueue] refresh after updateOrderStatus failed:", err);
      }

      if (refreshFailed) {
        this.updateOrderStatusState = "error";
        setState("ui.kitchenQueue.action.updateOrderStatus.status", "error");
      } else {
        this.updateOrderStatusState = "success";
        setState("ui.kitchenQueue.action.updateOrderStatus.status", "success");
      }
    } else {
      this.updateOrderStatusState = "error";
      setState("ui.kitchenQueue.action.updateOrderStatus.status", "error");
      if (response.error) {
        console.error("[kitchenQueue] updateOrderStatus error:", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleUpdateOrderStatusClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.updateOrderStatus();
    }, { mode: 'blocking' });
  }

  // ── Lifecycle ──

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize state from global store, falling back to defaults
    const savedStatus = getState("ui.kitchenQueue.status");
    this.status = savedStatus ?? '';

    const savedViewBoardState = getState("ui.kitchenQueue.action.viewKitchenBoard.status");
    this.viewKitchenBoardState = savedViewBoardState ?? "idle";

    const savedViewBoardData = getState("ui.kitchenQueue.data.viewKitchenBoard");
    this.viewKitchenBoardData = savedViewBoardData ?? { items: [], total: 0 };

    const savedUpdateState = getState("ui.kitchenQueue.action.updateOrderStatus.status");
    this.updateOrderStatusState = savedUpdateState ?? "idle";

    const savedUpdateStatusInput = getState("ui.kitchenQueue.input.updateOrderStatus.status");
    this.updateOrderStatusStatus = savedUpdateStatusInput ?? "";

    // Subscribe to shared states
    subscribe(
      [
        "ui.kitchenQueue.status",
        "ui.kitchenQueue.action.viewKitchenBoard.status",
        "ui.kitchenQueue.data.viewKitchenBoard",
        "ui.kitchenQueue.action.updateOrderStatus.status",
        "ui.kitchenQueue.input.updateOrderStatus.status",
      ],
      this
    );

    // Run initial loads
    this.loadViewKitchenBoard();
  }

  disconnectedCallback(): void {
    unsubscribe(
      [
        "ui.kitchenQueue.status",
        "ui.kitchenQueue.action.viewKitchenBoard.status",
        "ui.kitchenQueue.data.viewKitchenBoard",
        "ui.kitchenQueue.action.updateOrderStatus.status",
        "ui.kitchenQueue.input.updateOrderStatus.status",
      ],
      this
    );
    super.disconnectedCallback();
  }
}
