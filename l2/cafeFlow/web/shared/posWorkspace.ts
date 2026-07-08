/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowCreateOrderInput,
  CafeFlowCreateOrderOutput,
  CafeFlowViewOrderBoardOutput,
  CafeFlowDeliverOrderOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

/// **collab_i18n_start**
const message_pt = {
  "posWorkspace.section.main.title": "POS — Lançamento e acompanhamento de pedidos",
  "posWorkspace.organism.createOrder.title": "Lançar pedido no POS",
  "posWorkspace.createOrder.form.title": "Command Form",
  "posWorkspace.createOrder.orderType.label": "Order Type",
  "posWorkspace.createOrder.tableNumber.label": "Table Number",
  "posWorkspace.createOrder.orderItems.label": "Order Items",
  "posWorkspace.createOrder.priority.label": "Priority",
  "posWorkspace.createOrder.priorityReason.label": "Priority Reason",
  "posWorkspace.createOrder.review.title": "Summary",
  "posWorkspace.createOrder.submit.label": "Create Order",
  "posWorkspace.organism.viewOrderBoard.title": "Visualizar painel de pedidos",
  "posWorkspace.viewOrderBoard.list.title": "Query List",
  "posWorkspace.viewOrderBoard.orderId.label": "Order Id",
  "posWorkspace.viewOrderBoard.status.label": "Status",
  "posWorkspace.viewOrderBoard.orderType.label": "Order Type",
  "posWorkspace.viewOrderBoard.tableNumber.label": "Table Number",
  "posWorkspace.viewOrderBoard.priority.label": "Priority",
  "posWorkspace.viewOrderBoard.priorityReason.label": "Priority Reason",
  "posWorkspace.viewOrderBoard.receivedAt.label": "Received At",
  "posWorkspace.viewOrderBoard.inPreparationAt.label": "In Preparation At",
  "posWorkspace.viewOrderBoard.readyAt.label": "Ready At",
  "posWorkspace.viewOrderBoard.createdAt.label": "Created At",
  "posWorkspace.viewOrderBoard.refresh.label": "View Order Board",
  "posWorkspace.viewOrderBoard.deliver.label": "Deliver Order",
  "posWorkspace.organism.deliverOrder.title": "Entregar pedido ao cliente",
  "posWorkspace.deliverOrder.confirm.title": "Command Form",
  "posWorkspace.deliverOrder.submit.label": "Deliver Order"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowPosWorkspaceBase extends CollabLitElement {

  // ── State properties ──────────────────────────────────────────────

  @property({ type: String }) status: string = "";

  @property({ type: String })
  createOrderState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) createOrderOrderType: string = "";
  @property({ type: String }) createOrderTableNumber: string = "";
  @property({ type: String }) createOrderOrderItems: string = "";
  @property({ type: String }) createOrderPriority: string = "";
  @property({ type: String }) createOrderPriorityReason: string = "";

  @property({ type: String })
  viewOrderBoardState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: Object })
  viewOrderBoardData: CafeFlowViewOrderBoardOutput = { items: [], total: 0 };

  @property({ type: String })
  deliverOrderState: "idle" | "loading" | "success" | "error" = "idle";

  // ── i18n getter ───────────────────────────────────────────────────

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  // ── State setters ─────────────────────────────────────────────────

  setCreateOrderOrderType(value: string): void {
    this.createOrderOrderType = value;
    setState("ui.posWorkspace.input.createOrder.orderType", value);
    this.requestUpdate();
  }

  handleCreateOrderOrderTypeChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderOrderType(target.value);
  }

  setCreateOrderTableNumber(value: string): void {
    this.createOrderTableNumber = value;
    setState("ui.posWorkspace.input.createOrder.tableNumber", value);
    this.requestUpdate();
  }

  handleCreateOrderTableNumberChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderTableNumber(target.value);
  }

  setCreateOrderOrderItems(value: string): void {
    this.createOrderOrderItems = value;
    setState("ui.posWorkspace.input.createOrder.orderItems", value);
    this.requestUpdate();
  }

  handleCreateOrderOrderItemsChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderOrderItems(target.value);
  }

  setCreateOrderPriority(value: string): void {
    this.createOrderPriority = value;
    setState("ui.posWorkspace.input.createOrder.priority", value);
    this.requestUpdate();
  }

  handleCreateOrderPriorityChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderPriority(target.value);
  }

  setCreateOrderPriorityReason(value: string): void {
    this.createOrderPriorityReason = value;
    setState("ui.posWorkspace.input.createOrder.priorityReason", value);
    this.requestUpdate();
  }

  handleCreateOrderPriorityReasonChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderPriorityReason(target.value);
  }

  // ── Query: viewOrderBoard ─────────────────────────────────────────

  async loadViewOrderBoard(): Promise<void> {
    this.viewOrderBoardState = "loading";
    setState("ui.posWorkspace.action.viewOrderBoard.status", "loading");

    const options: BffClientOptions = { mode: "silent" };

    const response = await execBff<CafeFlowViewOrderBoardOutput>(
      "cafeFlow.orderLifecycle.viewOrderBoard",
      {},
      options
    );

    if (!response.ok) {
      this.viewOrderBoardState = "error";
      setState("ui.posWorkspace.action.viewOrderBoard.status", "error");
      return;
    }

    const data: CafeFlowViewOrderBoardOutput =
      response.data ?? { items: [], total: 0 };
    this.viewOrderBoardData = data;
    setState("ui.posWorkspace.data.viewOrderBoard", data);
    this.viewOrderBoardState = "success";
    setState("ui.posWorkspace.action.viewOrderBoard.status", "success");
  }

  handleViewOrderBoardClick(e: Event): void {
    e.preventDefault();
    this.loadViewOrderBoard();
  }

  // ── Command: createOrder ──────────────────────────────────────────

  async createOrder(): Promise<void> {
    this.createOrderState = "loading";
    setState("ui.posWorkspace.action.createOrder.status", "loading");

    const params: CafeFlowCreateOrderInput = {
      orderType: this.createOrderOrderType as "table" | "takeout",
      orderItems: this.createOrderOrderItems,
      tableNumber: this.createOrderTableNumber || undefined,
      priority:
        this.createOrderPriority === ""
          ? undefined
          : this.createOrderPriority === "true",
      priorityReason: this.createOrderPriorityReason || undefined,
    };

    const options: BffClientOptions = { mode: "blocking" };

    const response = await execBff<CafeFlowCreateOrderOutput>(
      "cafeFlow.orderLifecycle.createOrder",
      params,
      options
    );

    if (!response.ok) {
      this.createOrderState = "error";
      setState("ui.posWorkspace.action.createOrder.status", "error");
      return;
    }

    // Refresh viewOrderBoard after successful command
    await this.loadViewOrderBoard();

    if (this.viewOrderBoardState === "error") {
      this.createOrderState = "error";
      setState("ui.posWorkspace.action.createOrder.status", "error");
      return;
    }

    this.createOrderState = "success";
    setState("ui.posWorkspace.action.createOrder.status", "success");
  }

  handleCreateOrderClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async () => {
      await this.createOrder();
    }, { mode: "blocking" });
  }

  // ── Command: deliverOrder ─────────────────────────────────────────

  async deliverOrder(): Promise<void> {
    this.deliverOrderState = "loading";
    setState("ui.posWorkspace.action.deliverOrder.status", "loading");

    // TODO: deliverOrder requires an orderId input that is not declared in Definition.states[]
    const options: BffClientOptions = { mode: "blocking" };

    const response = await execBff<CafeFlowDeliverOrderOutput>(
      "cafeFlow.orderLifecycle.deliverOrder",
      {},
      options
    );

    if (!response.ok) {
      this.deliverOrderState = "error";
      setState("ui.posWorkspace.action.deliverOrder.status", "error");
      return;
    }

    // Refresh viewOrderBoard after successful command
    await this.loadViewOrderBoard();

    if (this.viewOrderBoardState === "error") {
      this.deliverOrderState = "error";
      setState("ui.posWorkspace.action.deliverOrder.status", "error");
      return;
    }

    this.deliverOrderState = "success";
    setState("ui.posWorkspace.action.deliverOrder.status", "success");
  }

  handleDeliverOrderClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async () => {
      await this.deliverOrder();
    }, { mode: "blocking" });
  }

  // ── Lifecycle ─────────────────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize state from global store where useful
    const savedStatus = getState("ui.posWorkspace.status");
    if (savedStatus !== undefined) {
      this.status = savedStatus as string;
    }

    // Run initial loads
    this.loadViewOrderBoard();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }
}
