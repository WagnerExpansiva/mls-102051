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
  CafeFlowDeliverOrderInput,
  CafeFlowDeliverOrderOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

/// **collab_i18n_start**
const message_pt = {
  "section.orderBoard.title": "Painel de Pedidos",
  "section.createOrder.title": "Novo Pedido",
  "section.deliverOrder.title": "Entregar Pedido",
  "organism.orderBoardCards.title": "Pedidos do Turno",
  "organism.createOrderForm.title": "Lançar Pedido",
  "organism.deliverOrderSheet.title": "Confirmar Entrega",
  "intention.orderBoard.list.title": "Fila de Pedidos",
  "intention.createOrder.form.title": "Dados do Pedido",
  "intention.deliverOrder.form.title": "Entrega ao Cliente",
  "column.orderId": "Pedido",
  "column.status": "Status",
  "column.orderType": "Tipo",
  "column.tableNumber": "Mesa",
  "column.priority": "Prioridade",
  "column.createdAt": "Criado em",
  "filter.status": "Filtrar por status",
  "filter.orderType": "Filtrar por tipo",
  "field.orderType": "Tipo de Pedido",
  "field.tableNumber": "Número da Mesa",
  "field.orderItems": "Itens do Pedido",
  "field.priority": "Pedido Prioritário",
  "field.priorityReason": "Motivo da Prioridade",
  "field.orderId": "Pedido Selecionado",
  "action.viewOrderBoard.label": "Atualizar Painel",
  "action.selectForDelivery": "Selecionar para Entrega",
  "action.createOrder.submit": "Confirmar Pedido",
  "action.deliverOrder.submit": "Confirmar Entrega",
  "action.createOrder.success": "Pedido lançado com sucesso e enviado à cozinha.",
  "action.createOrder.error": "Erro ao lançar pedido. Verifique os dados e tente novamente.",
  "action.deliverOrder.success": "Pedido entregue ao cliente com sucesso.",
  "action.deliverOrder.error": "Não foi possível entregar o pedido. Verifique se o status atual é 'pronto'.",
  "empty.orderBoard": "Nenhum pedido no painel. Lance um novo pedido para começar.",
  "empty.deliverOrder": "Selecione um pedido pronto no painel para entregar.",
  "page.posWorkspace.title": "POS — Lançamento e acompanhamento de pedidos",
  "section.board.title": "Painel de Pedidos",
  "section.review.title": "Resumo das Ações",
  "intention.board.title": "Painel de Pedidos",
  "intention.createOrder.title": "Lançar Novo Pedido",
  "intention.deliverOrder.title": "Entregar Pedido Selecionado",
  "intention.review.title": "Resumo das Ações",
  "field.orderType.label": "Tipo de Pedido",
  "field.tableNumber.label": "Número da Mesa",
  "field.orderItems.label": "Itens do Pedido",
  "field.priority.label": "Prioridade",
  "field.priorityReason.label": "Justificativa de Prioridade",
  "field.orderId.label": "Pedido",
  "field.status.label": "Status",
  "field.receivedAt.label": "Recebido em",
  "field.inPreparationAt.label": "Em Preparo desde",
  "field.readyAt.label": "Pronto desde",
  "field.createdAt.label": "Criado em",
  "action.createOrder.label": "Lançar Pedido",
  "action.deliverOrder.label": "Entregar",
  "action.selectOrder.label": "Selecionar",
  "empty.board": "Nenhum pedido encontrado no turno atual.",
  "empty.createOrder": "Preencha os dados do pedido para lançá-lo.",
  "empty.review": "Nenhuma ação realizada ainda.",
  "lane.registered": "Registrado",
  "lane.received": "Recebido",
  "lane.inPreparation": "Em Preparo",
  "lane.ready": "Pronto",
  "lane.delivered": "Entregue",
  "sec.board.title": "Sec board",
  "org.orderKanbanBoard.title": "Visualizar pedidos agrupados por status em colunas kanban, identificar gargalos e selecionar pedidos para entrega",
  "sec.createOrder.title": "Sec create Order",
  "org.createOrderForm.title": "Formulário para lançar novo pedido no POS com tipo, mesa, itens e prioridade opcional",
  "sec.deliverOrder.title": "Sec deliver Order",
  "org.deliverOrderPanel.title": "Entregar pedido selecionado ao cliente, confirmando a entrega de um pedido com status pronto",
  "sec.review.title": "Sec review",
  "org.reviewSummary.title": "Revisar o contexto e o resultado das ações principais da página: pedidos criados e entregas realizadas",
  "section.queue.title": "Painel de Pedidos",
  "section.queue.deliverTitle": "Entregar Pedido",
  "column.priorityReason": "Motivo",
  "column.receivedAt": "Recebido",
  "column.inPreparationAt": "Em Preparo",
  "column.readyAt": "Pronto",
  "column.deliveredAt": "Entregue em",
  "column.updatedAt": "Atualizado em",
  "action.refresh.label": "Atualizar Painel",
  "action.confirmDeliver.label": "Confirmar Entrega",
  "empty.queue": "Nenhum pedido no painel. Lance um novo pedido para começar.",
  "queueSection.title": "Queue Section",
  "orderBoard.title": "Painel ao vivo dos pedidos do turno atual, ordenados por chegada, com status, prioridade e ação contextual de entrega para pedidos prontos",
  "createOrderSection.title": "Create Order Section",
  "createOrderForm.title": "Formulário de lançamento de pedido: tipo, mesa, itens, prioridade opcional e confirmação para envio à cozinha",
  "reviewSection.title": "Review Section",
  "actionSummary.title": "Resumo do último pedido criado e da última entrega realizada, com feedback textual dismissible de sucesso ou erro"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowPosWorkspaceBase extends CollabLitElement {
  @property() status: string = '';

  @property() createOrderState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property() createOrderOrderType: string = '';
  @property() createOrderTableNumber: string = '';
  @property() createOrderOrderItems: string = '';
  @property() createOrderPriority: string = '';
  @property() createOrderPriorityReason: string = '';
  @property() createOrderOutput: CafeFlowCreateOrderOutput | null = null;
  @property() createOrderError: string = '';

  @property() viewOrderBoardState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property() viewOrderBoardData: CafeFlowViewOrderBoardOutput = { items: [], total: 0 };

  @property() deliverOrderState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property() deliverOrderOrderId: string = '';
  @property() deliverOrderOutput: CafeFlowDeliverOrderOutput | null = null;
  @property() deliverOrderError: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  /* ── Lifecycle ─────────────────────────────────────────────── */

  connectedCallback(): void {
    super.connectedCallback();

    const savedStatus = getState('ui.posWorkspace.status');
    if (typeof savedStatus === 'string') {
      this.status = savedStatus;
    }

    const savedCreateOrderState = getState('ui.posWorkspace.action.createOrder.status');
    if (typeof savedCreateOrderState === 'string') {
      this.createOrderState = savedCreateOrderState as 'idle' | 'loading' | 'success' | 'error';
    }

    const savedViewOrderBoardState = getState('ui.posWorkspace.action.viewOrderBoard.status');
    if (typeof savedViewOrderBoardState === 'string') {
      this.viewOrderBoardState = savedViewOrderBoardState as 'idle' | 'loading' | 'success' | 'error';
    }

    const savedDeliverOrderState = getState('ui.posWorkspace.action.deliverOrder.status');
    if (typeof savedDeliverOrderState === 'string') {
      this.deliverOrderState = savedDeliverOrderState as 'idle' | 'loading' | 'success' | 'error';
    }

    this.loadViewOrderBoard();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  /* ── Query: viewOrderBoard ─────────────────────────────────── */

  async loadViewOrderBoard(): Promise<void> {
    this.viewOrderBoardState = 'loading';
    setState('ui.posWorkspace.action.viewOrderBoard.status', 'loading');
    this.requestUpdate();

    const params: Record<string, unknown> = {};
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowViewOrderBoardOutput>(
      'cafeFlow.orderLifecycle.viewOrderBoard',
      params,
      options,
    );

    if (response.ok) {
      if (response.data) {
        this.viewOrderBoardData = response.data;
        setState('ui.posWorkspace.data.viewOrderBoard', response.data);
      } else {
        this.viewOrderBoardData = { items: [], total: 0 };
        setState('ui.posWorkspace.data.viewOrderBoard', { items: [], total: 0 });
      }
      this.viewOrderBoardState = 'success';
      setState('ui.posWorkspace.action.viewOrderBoard.status', 'success');
    } else {
      this.viewOrderBoardState = 'error';
      setState('ui.posWorkspace.action.viewOrderBoard.status', 'error');
    }
    this.requestUpdate();
  }

  handleViewOrderBoardClick(): void {
    this.loadViewOrderBoard();
  }

  /* ── Command: createOrder ──────────────────────────────────── */

  async createOrder(signal?: AbortSignal): Promise<void> {
    this.createOrderState = 'loading';
    setState('ui.posWorkspace.action.createOrder.status', 'loading');
    this.requestUpdate();

    const params: CafeFlowCreateOrderInput = {
      orderType: this.createOrderOrderType as 'table' | 'takeout',
      orderItems: this.createOrderOrderItems,
    };

    if (this.createOrderTableNumber) {
      params.tableNumber = this.createOrderTableNumber;
    }
    if (this.createOrderPriority === 'true') {
      params.priority = true;
    }
    if (this.createOrderPriorityReason) {
      params.priorityReason = this.createOrderPriorityReason;
    }

    const options: BffClientOptions = { mode: 'blocking', signal };
    const response = await execBff<CafeFlowCreateOrderOutput>(
      'cafeFlow.orderLifecycle.createOrder',
      params,
      options,
    );

    if (response.ok && response.data) {
      this.createOrderOutput = response.data;
      setState('ui.posWorkspace.output.createOrder', response.data);

      // Refresh viewOrderBoard before declaring success
      await this.loadViewOrderBoard();
      if (this.viewOrderBoardState === 'error') {
        this.createOrderError = this.msg['action.createOrder.error'];
        setState('ui.posWorkspace.action.createOrder.error', this.createOrderError);
        this.createOrderState = 'error';
        setState('ui.posWorkspace.action.createOrder.status', 'error');
        this.requestUpdate();
        return;
      }

      // Clear form inputs
      this.createOrderOrderType = '';
      setState('ui.posWorkspace.input.createOrder.orderType', '');
      this.createOrderTableNumber = '';
      setState('ui.posWorkspace.input.createOrder.tableNumber', '');
      this.createOrderOrderItems = '';
      setState('ui.posWorkspace.input.createOrder.orderItems', '');
      this.createOrderPriority = '';
      setState('ui.posWorkspace.input.createOrder.priority', '');
      this.createOrderPriorityReason = '';
      setState('ui.posWorkspace.input.createOrder.priorityReason', '');

      this.createOrderError = '';
      setState('ui.posWorkspace.action.createOrder.error', '');

      this.createOrderState = 'success';
      setState('ui.posWorkspace.action.createOrder.status', 'success');
    } else {
      const errorMsg = response.error?.message ?? this.msg['action.createOrder.error'];
      this.createOrderError = errorMsg;
      setState('ui.posWorkspace.action.createOrder.error', errorMsg);
      this.createOrderState = 'error';
      setState('ui.posWorkspace.action.createOrder.status', 'error');
    }
    this.requestUpdate();
  }

  handleCreateOrderClick(): void {
    runBlockingUiAction(async (signal: AbortSignal) => {
      await this.createOrder(signal);
    }).catch(() => {
      // Blocking UI error already displayed; action status set by createOrder
    });
  }

  /* ── Command: deliverOrder ─────────────────────────────────── */

  async deliverOrder(signal?: AbortSignal): Promise<void> {
    if (!this.deliverOrderOrderId) {
      this.deliverOrderState = 'idle';
      setState('ui.posWorkspace.action.deliverOrder.status', 'idle');
      this.requestUpdate();
      return;
    }

    this.deliverOrderState = 'loading';
    setState('ui.posWorkspace.action.deliverOrder.status', 'loading');
    this.requestUpdate();

    const params: CafeFlowDeliverOrderInput = {
      orderId: this.deliverOrderOrderId,
    };

    const options: BffClientOptions = { mode: 'blocking', signal };
    const response = await execBff<CafeFlowDeliverOrderOutput>(
      'cafeFlow.orderLifecycle.deliverOrder',
      params,
      options,
    );

    if (response.ok && response.data) {
      this.deliverOrderOutput = response.data;
      setState('ui.posWorkspace.output.deliverOrder', response.data);

      // Refresh viewOrderBoard before declaring success
      await this.loadViewOrderBoard();
      if (this.viewOrderBoardState === 'error') {
        this.deliverOrderError = this.msg['action.deliverOrder.error'];
        setState('ui.posWorkspace.action.deliverOrder.error', this.deliverOrderError);
        this.deliverOrderState = 'error';
        setState('ui.posWorkspace.action.deliverOrder.status', 'error');
        this.requestUpdate();
        return;
      }

      // Clear selection input
      this.deliverOrderOrderId = '';
      setState('ui.posWorkspace.input.deliverOrder.orderId', '');

      this.deliverOrderError = '';
      setState('ui.posWorkspace.action.deliverOrder.error', '');

      this.deliverOrderState = 'success';
      setState('ui.posWorkspace.action.deliverOrder.status', 'success');
    } else {
      const errorMsg = response.error?.message ?? this.msg['action.deliverOrder.error'];
      this.deliverOrderError = errorMsg;
      setState('ui.posWorkspace.action.deliverOrder.error', errorMsg);
      this.deliverOrderState = 'error';
      setState('ui.posWorkspace.action.deliverOrder.status', 'error');
    }
    this.requestUpdate();
  }

  handleDeliverOrderClick(): void {
    runBlockingUiAction(async (signal: AbortSignal) => {
      await this.deliverOrder(signal);
    }).catch(() => {
      // Blocking UI error already displayed; action status set by deliverOrder
    });
  }

  /* ── State setters: createOrder form inputs ────────────────── */

  setCreateOrderOrderType(value: string): void {
    this.createOrderOrderType = value;
    setState('ui.posWorkspace.input.createOrder.orderType', value);
    this.requestUpdate();
  }

  handleCreateOrderOrderTypeChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderOrderType(target.value);
  }

  setCreateOrderTableNumber(value: string): void {
    this.createOrderTableNumber = value;
    setState('ui.posWorkspace.input.createOrder.tableNumber', value);
    this.requestUpdate();
  }

  handleCreateOrderTableNumberChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderTableNumber(target.value);
  }

  setCreateOrderOrderItems(value: string): void {
    this.createOrderOrderItems = value;
    setState('ui.posWorkspace.input.createOrder.orderItems', value);
    this.requestUpdate();
  }

  handleCreateOrderOrderItemsChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderOrderItems(target.value);
  }

  setCreateOrderPriority(value: string): void {
    this.createOrderPriority = value;
    setState('ui.posWorkspace.input.createOrder.priority', value);
    this.requestUpdate();
  }

  handleCreateOrderPriorityChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderPriority(target.checked ? 'true' : 'false');
  }

  setCreateOrderPriorityReason(value: string): void {
    this.createOrderPriorityReason = value;
    setState('ui.posWorkspace.input.createOrder.priorityReason', value);
    this.requestUpdate();
  }

  handleCreateOrderPriorityReasonChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateOrderPriorityReason(target.value);
  }

  /* ── State setters: deliverOrder selection ─────────────────── */

  setDeliverOrderOrderId(value: string): void {
    this.deliverOrderOrderId = value;
    setState('ui.posWorkspace.input.deliverOrder.orderId', value);
    this.requestUpdate();
  }

  handleDeliverOrderOrderIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setDeliverOrderOrderId(target.value);
  }
}
