/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowCreateOrderInput,
  CafeFlowCreateOrderOutput,
  CafeFlowViewOrderBoardOutput,
  CafeFlowViewOrderBoardOutputItem,
  CafeFlowDeliverOrderOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

/// **collab_i18n_start**
const message_pt = {
  "posWorkspace.section.orderBoard.title": "Painel de pedidos",
  "posWorkspace.organism.orderBoard.title": "Pedidos do turno",
  "posWorkspace.intent.orderBoardCards.title": "Fila de pedidos",
  "posWorkspace.action.refreshBoard": "Atualizar painel",
  "posWorkspace.section.createOrder.title": "Lançar pedido",
  "posWorkspace.organism.createOrder.title": "Novo pedido",
  "posWorkspace.intent.createOrder.details": "Detalhes do pedido",
  "posWorkspace.action.createOrder": "Confirmar pedido",
  "posWorkspace.section.review.title": "Revisão do pedido",
  "posWorkspace.organism.review.title": "Resumo e alertas",
  "posWorkspace.intent.reviewSummary.title": "Resumo do lançamento",
  "posWorkspace.section.deliver.title": "Entrega do pedido",
  "posWorkspace.organism.deliver.title": "Confirmar entrega",
  "posWorkspace.intent.deliverOrder.title": "Entregar pedido",
  "posWorkspace.action.deliverOrder": "Marcar como entregue",
  "posWorkspace.field.orderId": "Pedido",
  "posWorkspace.field.status": "Status",
  "posWorkspace.field.orderType": "Tipo do pedido",
  "posWorkspace.field.tableNumber": "Mesa",
  "posWorkspace.field.priority": "Prioridade",
  "posWorkspace.field.priorityReason": "Justificativa da prioridade",
  "posWorkspace.field.readyAt": "Pronto em",
  "posWorkspace.field.createdAt": "Criado em",
  "posWorkspace.field.orderItems": "Itens do pedido",
  "posWorkspace.section.pipeline.title": "Pipeline de pedidos",
  "posWorkspace.organism.kanban.title": "Pedidos por status",
  "posWorkspace.intent.kanban.title": "Pedidos em fluxo",
  "posWorkspace.section.queue.title": "Fila de pedidos",
  "posWorkspace.organism.queue.title": "Pedidos em andamento",
  "posWorkspace.intent.queue.title": "Fila do turno"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowPosWorkspaceBase extends CollabLitElement {

  @property({ type: String }) status: string = '';

  @property({ type: String }) createOrderState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) createOrderOrderType: string = '';
  @property({ type: String }) createOrderTableNumber: string = '';
  @property({ type: String }) createOrderOrderItems: string = '';
  @property({ type: String }) createOrderPriority: string = '';
  @property({ type: String }) createOrderPriorityReason: string = '';

  @property({ type: String }) viewOrderBoardState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: Object }) viewOrderBoardData: { items: CafeFlowViewOrderBoardOutputItem[]; total: number } = { items: [], total: 0 };

  @property({ type: String }) deliverOrderState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: Object }) OutputCreateOrder: CafeFlowCreateOrderOutput | null = null;
  @property({ type: Object }) OutputDeliverOrder: CafeFlowDeliverOrderOutput | null = null;

  @property({ type: String }) LayoutFld130: string = '';
  @property({ type: String }) LayoutFld140: string = '';
  @property({ type: String }) LayoutFld150: string = '';
  @property({ type: String }) LayoutFld60: string = '';
  @property({ type: String }) LayoutFld70: string = '';
  @property({ type: String }) LayoutFld80: string = '';

  private subscribedKeys: string[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  // ── State setters ──────────────────────────────────────────────

  setCreateOrderOrderType(value: string): void {
    this.createOrderOrderType = value;
    setState('ui.posWorkspace.input.createOrder.orderType', value);
    this.requestUpdate();
  }

  handleCreateOrderOrderTypeChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateOrderOrderType(target.value);
  }

  setCreateOrderTableNumber(value: string): void {
    this.createOrderTableNumber = value;
    setState('ui.posWorkspace.input.createOrder.tableNumber', value);
    this.requestUpdate();
  }

  handleCreateOrderTableNumberChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateOrderTableNumber(target.value);
  }

  setCreateOrderOrderItems(value: string): void {
    this.createOrderOrderItems = value;
    setState('ui.posWorkspace.input.createOrder.orderItems', value);
    this.requestUpdate();
  }

  handleCreateOrderOrderItemsChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    this.setCreateOrderOrderItems(target.value);
  }

  setCreateOrderPriority(value: string): void {
    this.createOrderPriority = value;
    setState('ui.posWorkspace.input.createOrder.priority', value);
    this.requestUpdate();
  }

  handleCreateOrderPriorityChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.type === 'checkbox') {
      this.setCreateOrderPriority(target.checked ? 'true' : 'false');
    } else {
      this.setCreateOrderPriority(target.value);
    }
  }

  setCreateOrderPriorityReason(value: string): void {
    this.createOrderPriorityReason = value;
    setState('ui.posWorkspace.input.createOrder.priorityReason', value);
    this.requestUpdate();
  }

  handleCreateOrderPriorityReasonChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    this.setCreateOrderPriorityReason(target.value);
  }

  // ── Query: viewOrderBoard ──────────────────────────────────────

  async loadViewOrderBoard(): Promise<void> {
    this.viewOrderBoardState = 'loading';
    setState('ui.posWorkspace.action.viewOrderBoard.status', 'loading');
    this.requestUpdate();

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowViewOrderBoardOutput>(
      'cafeFlow.orderLifecycle.viewOrderBoard',
      {},
      options
    );

    if (response.ok) {
      const data = response.data;
      if (data) {
        this.viewOrderBoardData = { items: data.items, total: data.total };
      } else {
        this.viewOrderBoardData = { items: [], total: 0 };
      }
      setState('ui.posWorkspace.data.viewOrderBoard', this.viewOrderBoardData);
      this.viewOrderBoardState = 'success';
      setState('ui.posWorkspace.action.viewOrderBoard.status', 'success');
    } else {
      this.viewOrderBoardState = 'error';
      setState('ui.posWorkspace.action.viewOrderBoard.status', 'error');
      if (response.error) {
        console.error('[posWorkspace] viewOrderBoard error:', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleViewOrderBoardClick(e: Event): void {
    e.preventDefault();
    this.loadViewOrderBoard();
  }

  // ── Command: createOrder ───────────────────────────────────────

  async createOrder(): Promise<void> {
    this.createOrderState = 'loading';
    setState('ui.posWorkspace.action.createOrder.status', 'loading');
    this.requestUpdate();

    const params: CafeFlowCreateOrderInput = {
      orderType: this.createOrderOrderType as "table" | "takeout",
      orderItems: this.createOrderOrderItems,
    };

    if (this.createOrderTableNumber) {
      params.tableNumber = this.createOrderTableNumber;
    }

    const priorityValue = this.createOrderPriority;
    if (priorityValue === 'true' || priorityValue === 'false') {
      params.priority = priorityValue === 'true';
    }

    if (this.createOrderPriorityReason) {
      params.priorityReason = this.createOrderPriorityReason;
    }

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CafeFlowCreateOrderOutput>(
      'cafeFlow.orderLifecycle.createOrder',
      params,
      options
    );

    if (response.ok) {
      this.OutputCreateOrder = response.data ?? null;
      setState('ui.posWorkspace.output.createOrder', this.OutputCreateOrder);

      // Refresh viewOrderBoard after successful command
      await this.loadViewOrderBoard();

      if (this.viewOrderBoardState === 'error') {
        this.createOrderState = 'error';
        setState('ui.posWorkspace.action.createOrder.status', 'error');
      } else {
        this.createOrderState = 'success';
        setState('ui.posWorkspace.action.createOrder.status', 'success');
      }
    } else {
      this.createOrderState = 'error';
      setState('ui.posWorkspace.action.createOrder.status', 'error');
      if (response.error) {
        console.error('[posWorkspace] createOrder error:', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleCreateOrderClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async () => {
      await this.createOrder();
    }, { mode: 'blocking', busyLabel: this.msg['posWorkspace.action.createOrder'] });
  }

  // ── Command: deliverOrder ──────────────────────────────────────

  async deliverOrder(): Promise<void> {
    this.deliverOrderState = 'loading';
    setState('ui.posWorkspace.action.deliverOrder.status', 'loading');
    this.requestUpdate();

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CafeFlowDeliverOrderOutput>(
      'cafeFlow.orderLifecycle.deliverOrder',
      {},
      options
    );

    if (response.ok) {
      this.OutputDeliverOrder = response.data ?? null;
      setState('ui.posWorkspace.output.deliverOrder', this.OutputDeliverOrder);

      // Refresh viewOrderBoard after successful command
      await this.loadViewOrderBoard();

      if (this.viewOrderBoardState === 'error') {
        this.deliverOrderState = 'error';
        setState('ui.posWorkspace.action.deliverOrder.status', 'error');
      } else {
        this.deliverOrderState = 'success';
        setState('ui.posWorkspace.action.deliverOrder.status', 'success');
      }
    } else {
      this.deliverOrderState = 'error';
      setState('ui.posWorkspace.action.deliverOrder.status', 'error');
      if (response.error) {
        console.error('[posWorkspace] deliverOrder error:', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleDeliverOrderClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async () => {
      await this.deliverOrder();
    }, { mode: 'blocking', busyLabel: this.msg['posWorkspace.action.deliverOrder'] });
  }

  // ── Lifecycle ──────────────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize state from global store, falling back to defaults
    const savedStatus = getState('ui.posWorkspace.status');
    this.status = savedStatus !== undefined ? savedStatus : '';

    const savedCreateOrderState = getState('ui.posWorkspace.action.createOrder.status');
    this.createOrderState = savedCreateOrderState !== undefined ? savedCreateOrderState : 'idle';

    const savedViewOrderBoardState = getState('ui.posWorkspace.action.viewOrderBoard.status');
    this.viewOrderBoardState = savedViewOrderBoardState !== undefined ? savedViewOrderBoardState : 'idle';

    const savedViewOrderBoardData = getState('ui.posWorkspace.data.viewOrderBoard');
    this.viewOrderBoardData = savedViewOrderBoardData !== undefined
      ? savedViewOrderBoardData as { items: CafeFlowViewOrderBoardOutputItem[]; total: number }
      : { items: [], total: 0 };

    const savedDeliverOrderState = getState('ui.posWorkspace.action.deliverOrder.status');
    this.deliverOrderState = savedDeliverOrderState !== undefined ? savedDeliverOrderState : 'idle';

    // Subscribe to shared states
    const keys = [
      'ui.posWorkspace.status',
      'ui.posWorkspace.action.createOrder.status',
      'ui.posWorkspace.action.viewOrderBoard.status',
      'ui.posWorkspace.data.viewOrderBoard',
      'ui.posWorkspace.action.deliverOrder.status',
    ];
    this.subscribedKeys = keys;
    subscribe(keys, this);

    // Run initial loads
    this.loadViewOrderBoard();
  }

  disconnectedCallback(): void {
    if (this.subscribedKeys.length > 0) {
      unsubscribe(this.subscribedKeys, this);
      this.subscribedKeys = [];
    }
    super.disconnectedCallback();
  }
}
