/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/posOrder.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';  
import type {
  CafeFlowCreateOrderInput,
  CafeFlowCreateOrderOutput,
  CafeFlowViewOrderBoardInput,
  CafeFlowViewOrderBoardOutput,
  CafeFlowDeliverOrderInput,
  CafeFlowDeliverOrderOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/posOrder.js';

/// **collab_i18n_start**
const message_pt = {
  "posOrder.section.main.title": "POS — Lançamento e entrega de pedidos",
  "posOrder.organism.createOrder.title": "Lançar pedido",
  "posOrder.intent.createOrder.form.title": "Novo pedido",
  "posOrder.intent.createOrder.summary.title": "Resumo do pedido criado",
  "posOrder.organism.viewOrderBoard.title": "Painel de pedidos",
  "posOrder.intent.viewOrderBoard.list.title": "Pedidos do turno atual",
  "posOrder.organism.deliverOrder.title": "Entregar pedido",
  "posOrder.intent.deliverOrder.confirm.title": "Confirmar entrega",
  "posOrder.intent.deliverOrder.summary.title": "Resumo da entrega",
  "posOrder.field.orderType.label": "Tipo do pedido",
  "posOrder.field.tableNumber.label": "Número da mesa",
  "posOrder.field.priority.label": "Prioridade",
  "posOrder.field.priorityReason.label": "Motivo da prioridade",
  "posOrder.field.orderId.label": "Número do pedido",
  "posOrder.field.status.label": "Status",
  "posOrder.field.createdAt.label": "Criado em",
  "posOrder.field.receivedAt.label": "Recebido em",
  "posOrder.field.inPreparationAt.label": "Em preparo desde",
  "posOrder.field.readyAt.label": "Pronto em",
  "posOrder.field.deliveredAt.label": "Entregue em",
  "posOrder.filter.statusFilter.label": "Filtrar por status",
  "posOrder.action.viewOrderBoard.label": "Atualizar painel"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowPosOrderBase extends CollabLitElement {
  @property({ type: String }) status: string = "";

  @property({ type: String }) createOrderState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) createOrderOrderType: string = "";
  @property({ type: String }) createOrderTableNumber: string = "";
  @property({ type: String }) createOrderPriority: string = "";
  @property({ type: String }) createOrderPriorityReason: string = "";

  @property({ type: String }) viewOrderBoardState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) viewOrderBoardStatusFilter: string = "";
  @property({ type: Object }) viewOrderBoardData: CafeFlowViewOrderBoardOutput = { items: [], total: 0 };

  @property({ type: String }) deliverOrderState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) activeCompanyId: string = "";

  @property({ type: String }) LayoutFieldCreateOrderOrderId: string = "";
  @property({ type: String }) LayoutFieldCreateOrderStatus: string = "";
  @property({ type: String }) LayoutFieldCreateOrderCreatedAt: string = "";
  @property({ type: String }) LayoutFieldDeliverOrderOrderId: string = "";
  @property({ type: String }) LayoutFieldDeliverOrderStatus: string = "";
  @property({ type: String }) LayoutFieldDeliverOrderDeliveredAt: string = "";
  @property({ type: String }) LayoutFieldDeliverOrderOrderType: string = "";
  @property({ type: String }) LayoutFieldDeliverOrderTableNumber: string = "";

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();

    const savedCompanyId = getState("ui.posOrder.businessContext.activeCompanyId") as string | undefined;
    if (savedCompanyId) {
      this.activeCompanyId = savedCompanyId;
    }

    subscribe("ui.posOrder.businessContext.activeCompanyId", this);

    this.loadViewOrderBoard();
  }

  disconnectedCallback(): void {
    unsubscribe("ui.posOrder.businessContext.activeCompanyId", this);
    super.disconnectedCallback();
  }

  // --- State setters ---

  setCreateOrderOrderType(value: string): void {
    this.createOrderOrderType = value;
    setState("ui.posOrder.input.createOrder.orderType", value);
    this.requestUpdate();
  }

  handleCreateOrderOrderTypeChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateOrderOrderType(target.value);
  }

  setCreateOrderTableNumber(value: string): void {
    this.createOrderTableNumber = value;
    setState("ui.posOrder.input.createOrder.tableNumber", value);
    this.requestUpdate();
  }

  handleCreateOrderTableNumberChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderTableNumber(target.value);
  }

  setCreateOrderPriority(value: string): void {
    this.createOrderPriority = value;
    setState("ui.posOrder.input.createOrder.priority", value);
    this.requestUpdate();
  }

  handleCreateOrderPriorityChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox"
      ? (target.checked ? "true" : "false")
      : target.value;
    this.setCreateOrderPriority(value);
  }

  setCreateOrderPriorityReason(value: string): void {
    this.createOrderPriorityReason = value;
    setState("ui.posOrder.input.createOrder.priorityReason", value);
    this.requestUpdate();
  }

  handleCreateOrderPriorityReasonChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setCreateOrderPriorityReason(target.value);
  }

  setViewOrderBoardStatusFilter(value: string): void {
    this.viewOrderBoardStatusFilter = value;
    setState("ui.posOrder.input.viewOrderBoard.statusFilter", value);
    this.requestUpdate();
  }

  handleViewOrderBoardStatusFilterChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setViewOrderBoardStatusFilter(target.value);
  }

  // --- Query action: viewOrderBoard ---

  async loadViewOrderBoard(): Promise<boolean> {
    this.viewOrderBoardState = "loading";
    setState("ui.posOrder.action.viewOrderBoard.status", "loading");
    this.requestUpdate();

    const params: CafeFlowViewOrderBoardInput = {
      statusFilter: (this.viewOrderBoardStatusFilter || undefined) as CafeFlowViewOrderBoardInput["statusFilter"],
    };

    const response = await execBff<CafeFlowViewOrderBoardOutput>(
      "cafeFlow.orderLifecycle.viewOrderBoard",
      params,
      { mode: "silent" }
    );

    if (!response.ok) {
      this.viewOrderBoardState = "error";
      setState("ui.posOrder.action.viewOrderBoard.status", "error");
      this.requestUpdate();
      return false;
    }

    const data: CafeFlowViewOrderBoardOutput = response.data ?? { items: [], total: 0 };
    this.viewOrderBoardData = data;
    setState("ui.posOrder.data.viewOrderBoard", data);
    this.viewOrderBoardState = "success";
    setState("ui.posOrder.action.viewOrderBoard.status", "success");
    this.requestUpdate();
    return true;
  }

  handleViewOrderBoardClick(): void {
    this.loadViewOrderBoard();
  }

  // --- Command action: createOrder ---

  async createOrder(signal?: AbortSignal): Promise<void> {
    this.createOrderState = "loading";
    setState("ui.posOrder.action.createOrder.status", "loading");
    this.requestUpdate();

    const params: CafeFlowCreateOrderInput = {
      orderType: this.createOrderOrderType as "table" | "takeout",
      tableNumber: this.createOrderTableNumber || undefined,
      priority: this.createOrderPriority === "true" ? true : undefined,
      priorityReason: this.createOrderPriorityReason || undefined, 
    };

    const options: BffClientOptions = { mode: "blocking" };
    if (signal) {
      options.signal = signal;
    }

    const response = await execBff<CafeFlowCreateOrderOutput>(
      "cafeFlow.orderLifecycle.createOrder",
      params,
      options
    );

    if (!response.ok) {
      this.createOrderState = "error";
      setState("ui.posOrder.action.createOrder.status", "error");
      this.requestUpdate();
      return;
    }

    // Refresh: viewOrderBoard
    const refreshOk = await this.loadViewOrderBoard();
    if (refreshOk) {
      this.createOrderState = "success";
      setState("ui.posOrder.action.createOrder.status", "success");
    } else {
      this.createOrderState = "error";
      setState("ui.posOrder.action.createOrder.status", "error");
    }
    this.requestUpdate();
  }

  handleCreateOrderClick(): void {
    runBlockingUiAction(async (signal: AbortSignal) => {
      await this.createOrder(signal);
    }, { mode: "blocking" });
  }

  // --- Command action: deliverOrder ---

  async deliverOrder(orderId?: string, signal?: AbortSignal): Promise<void> {
    this.deliverOrderState = "loading";
    setState("ui.posOrder.action.deliverOrder.status", "loading");
    this.requestUpdate();

    const params: CafeFlowDeliverOrderInput = orderId ? { orderId } : {};

    const options: BffClientOptions = { mode: "blocking" };
    if (signal) {
      options.signal = signal;
    }

    const response = await execBff<CafeFlowDeliverOrderOutput>(
      "cafeFlow.orderLifecycle.deliverOrder",
      params,
      options
    );

    if (!response.ok) {
      this.deliverOrderState = "error";
      setState("ui.posOrder.action.deliverOrder.status", "error");
      this.requestUpdate();
      return;
    }

    // Refresh: viewOrderBoard
    const refreshOk = await this.loadViewOrderBoard();
    if (refreshOk) {
      this.deliverOrderState = "success";
      setState("ui.posOrder.action.deliverOrder.status", "success");
    } else {
      this.deliverOrderState = "error";
      setState("ui.posOrder.action.deliverOrder.status", "error");
    }
    this.requestUpdate();
  }

  handleDeliverOrderClick(orderId?: string): void {
    runBlockingUiAction(async (signal: AbortSignal) => {
      await this.deliverOrder(orderId, signal);
    }, { mode: "blocking" });
  }
}
