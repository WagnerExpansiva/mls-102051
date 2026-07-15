/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowViewKitchenBoardOutput,
  CafeFlowViewKitchenBoardOutputItem,
  CafeFlowUpdateOrderStatusInput,
  CafeFlowUpdateOrderStatusOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

/// **collab_i18n_start**
const message_pt = {
  "page.title": "Fila da Cozinha — Preparo de Pedidos",
  "section.kitchenBoard.title": "Fila da Cozinha",
  "section.orderTransition.title": "Atualizar Status do Pedido",
  "intention.boardList.title": "Pedidos na Cozinha",
  "intention.transitionForm.title": "Transicao de Status",
  "empty.kitchenBoard": "Nenhum pedido na fila no momento",
  "empty.transitionPanel": "Selecione um pedido na fila para atualizar o status",
  "field.orderId": "Pedido selecionado",
  "field.status": "Próximo status",
  "field.orderType": "Tipo",
  "field.tableNumber": "Mesa",
  "field.priority": "Prioridade",
  "field.priorityReason": "Motivo da Prioridade",
  "field.receivedAt": "Recebido as",
  "field.inPreparationAt": "Em preparo desde",
  "field.createdAt": "Criado em",
  "action.selectOrder": "Selecionar",
  "action.updateOrderStatus.submit": "Atualizar Status",
  "action.updateOrderStatus.success": "Status do pedido atualizado com sucesso",
  "action.updateOrderStatus.error": "Erro ao atualizar status do pedido",
  "sec.kitchen.board.title": "Sec kitchen board",
  "org.kitchen.board.title": "Exibir fila de pedidos da cozinha ordenados por prioridade e ordem de chegada, permitindo seleção para transição de status",
  "sec.transition.title": "Sec transition",
  "org.transition.panel.title": "Atualizar status do pedido selecionado para o proximo estado do ciclo de vida",
  "section.discover.title": "Fila da Cozinha",
  "section.discover.empty": "Nenhum pedido na fila no momento",
  "section.execute.title": "Atualizar Status do Pedido",
  "section.review.title": "Resumo",
  "field.orderId.label": "Pedido",
  "field.status.label": "Status",
  "field.orderType.label": "Tipo",
  "field.tableNumber.label": "Mesa",
  "field.priority.label": "Prioridade",
  "field.priorityReason.label": "Motivo da Prioridade",
  "field.receivedAt.label": "Recebido às",
  "field.inPreparationAt.label": "Em preparo desde",
  "field.createdAt.label": "Criado em",
  "filter.status.label": "Filtrar por status",
  "action.viewKitchenBoard.label": "Atualizar fila",
  "action.updateOrderStatus.label": "Confirmar",
  "action.selectOrder.label": "Selecionar pedido",
  "status.received.label": "Recebido",
  "status.inPreparation.label": "Em preparo",
  "status.ready.label": "Pronto",
  "status.delivered.label": "Entregue",
  "status.registered.label": "Registrado",
  "sec.discover.title": "Sec discover",
  "sec.execute.title": "Sec execute",
  "org.update.status.title": "Permitir ao cozinheiro atualizar o status do pedido selecionado, marcando como em preparo ou pronto",
  "sec.review.title": "Sec review",
  "org.review.title": "Exibir feedback da última ação e resumo do estado atual da fila",
  "section.queue.title": "Fila de Pedidos",
  "section.queue.empty": "Nenhum pedido na fila no momento",
  "section.transition.title": "Atualizar Status do Pedido",
  "section.transition.empty": "Selecione um pedido da fila para atualizar o status",
  "column.orderId": "Pedido",
  "column.status": "Status",
  "column.orderType": "Tipo",
  "column.tableNumber": "Mesa",
  "column.priority": "Prioridade",
  "column.priorityReason": "Motivo da Prioridade",
  "column.receivedAt": "Recebido às",
  "column.inPreparationAt": "Em preparo desde",
  "column.createdAt": "Criado em",
  "action.select": "Selecionar",
  "action.refresh": "Atualizar fila",
  "action.updateOrderStatus": "Confirmar alteração",
  "sec.kitchen.queue.title": "Sec kitchen queue",
  "sec.order.transition.title": "Sec order transition",
  "org.status.transition.title": "Atualizar status do pedido selecionado na fila, apresentando a próxima transição válida do ciclo de vida"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowKitchenQueueBase extends CollabLitElement {
  @property({ type: String }) status: string = '';
  @property({ type: String }) viewKitchenBoardState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: Object }) viewKitchenBoardData: CafeFlowViewKitchenBoardOutput = { items: [], total: 0 };
  @property({ type: String }) updateOrderStatusState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: String }) updateOrderStatusOrderId: string = '';
  @property({ type: String }) updateOrderStatusStatus: string = '';
  @property({ type: Object }) updateOrderStatusOutput: CafeFlowUpdateOrderStatusOutput | null = null;
  @property({ type: String }) updateOrderStatusError: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();

    const savedStatus = getState('ui.kitchenQueue.status');
    if (typeof savedStatus === 'string') {
      this.status = savedStatus;
    }
    const savedViewStatus = getState('ui.kitchenQueue.action.viewKitchenBoard.status');
    if (typeof savedViewStatus === 'string') {
      this.viewKitchenBoardState = savedViewStatus as 'idle' | 'loading' | 'success' | 'error';
    }
    const savedViewData = getState('ui.kitchenQueue.data.viewKitchenBoard');
    if (savedViewData && typeof savedViewData === 'object') {
      this.viewKitchenBoardData = savedViewData as CafeFlowViewKitchenBoardOutput;
    }
    const savedUpdateStatus = getState('ui.kitchenQueue.action.updateOrderStatus.status');
    if (typeof savedUpdateStatus === 'string') {
      this.updateOrderStatusState = savedUpdateStatus as 'idle' | 'loading' | 'success' | 'error';
    }
    const savedOrderId = getState('ui.kitchenQueue.input.updateOrderStatus.orderId');
    if (typeof savedOrderId === 'string') {
      this.updateOrderStatusOrderId = savedOrderId;
    }
    const savedOrderStatusInput = getState('ui.kitchenQueue.input.updateOrderStatus.status');
    if (typeof savedOrderStatusInput === 'string') {
      this.updateOrderStatusStatus = savedOrderStatusInput;
    }
    const savedOutput = getState('ui.kitchenQueue.output.updateOrderStatus');
    if (savedOutput !== undefined && savedOutput !== null) {
      this.updateOrderStatusOutput = savedOutput as CafeFlowUpdateOrderStatusOutput;
    }
    const savedError = getState('ui.kitchenQueue.action.updateOrderStatus.error');
    if (typeof savedError === 'string') {
      this.updateOrderStatusError = savedError;
    }

    subscribe(
      [
        'ui.kitchenQueue.status',
        'ui.kitchenQueue.action.viewKitchenBoard.status',
        'ui.kitchenQueue.data.viewKitchenBoard',
        'ui.kitchenQueue.action.updateOrderStatus.status',
        'ui.kitchenQueue.input.updateOrderStatus.orderId',
        'ui.kitchenQueue.input.updateOrderStatus.status',
        'ui.kitchenQueue.output.updateOrderStatus',
        'ui.kitchenQueue.action.updateOrderStatus.error',
      ],
      this
    );

    this.loadViewKitchenBoard();
  }

  disconnectedCallback(): void {
    unsubscribe(
      [
        'ui.kitchenQueue.status',
        'ui.kitchenQueue.action.viewKitchenBoard.status',
        'ui.kitchenQueue.data.viewKitchenBoard',
        'ui.kitchenQueue.action.updateOrderStatus.status',
        'ui.kitchenQueue.input.updateOrderStatus.orderId',
        'ui.kitchenQueue.input.updateOrderStatus.status',
        'ui.kitchenQueue.output.updateOrderStatus',
        'ui.kitchenQueue.action.updateOrderStatus.error',
      ],
      this
    );
    super.disconnectedCallback();
  }

  // --- Query: viewKitchenBoard ---
  async loadViewKitchenBoard(): Promise<void> {
    this.viewKitchenBoardState = 'loading';
    setState('ui.kitchenQueue.action.viewKitchenBoard.status', 'loading');
    this.requestUpdate();

    const options: BffClientOptions = { mode: 'silent' };

    const response = await execBff<CafeFlowViewKitchenBoardOutput>(
      'cafeFlow.orderLifecycle.viewKitchenBoard',
      {},
      options
    );

    if (response.ok) {
      const data: CafeFlowViewKitchenBoardOutput =
        response.data ?? { items: [], total: 0 };
      this.viewKitchenBoardData = data;
      setState('ui.kitchenQueue.data.viewKitchenBoard', data);
      this.viewKitchenBoardState = 'success';
      setState('ui.kitchenQueue.action.viewKitchenBoard.status', 'success');
    } else {
      this.viewKitchenBoardData = { items: [], total: 0 };
      setState('ui.kitchenQueue.data.viewKitchenBoard', { items: [], total: 0 });
      this.viewKitchenBoardState = 'error';
      setState('ui.kitchenQueue.action.viewKitchenBoard.status', 'error');
      if (response.error) {
        console.error('[viewKitchenBoard]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleViewKitchenBoardClick(_e: Event): void {
    this.loadViewKitchenBoard();
  }

  // --- Command: updateOrderStatus ---
  async updateOrderStatus(): Promise<void> {
    const orderId = this.updateOrderStatusOrderId;
    const statusValue = this.updateOrderStatusStatus;

    if (!orderId || !statusValue) {
      this.updateOrderStatusState = 'idle';
      setState('ui.kitchenQueue.action.updateOrderStatus.status', 'idle');
      this.requestUpdate();
      return;
    }

    this.updateOrderStatusState = 'loading';
    setState('ui.kitchenQueue.action.updateOrderStatus.status', 'loading');
    this.requestUpdate();

    const params: CafeFlowUpdateOrderStatusInput = {
      orderId,
      status: statusValue as 'registered' | 'received' | 'inPreparation' | 'ready' | 'delivered',
    };

    const options: BffClientOptions = { mode: 'blocking' };

    const response = await execBff<CafeFlowUpdateOrderStatusOutput>(
      'cafeFlow.orderLifecycle.updateOrderStatus',
      params,
      options
    );

    if (response.ok) {
      const data: CafeFlowUpdateOrderStatusOutput = response.data ?? {};
      this.updateOrderStatusOutput = data;
      setState('ui.kitchenQueue.output.updateOrderStatus', data);

      // Refresh query actions
      await this.loadViewKitchenBoard();

      // Clear input state keys
      this.updateOrderStatusOrderId = '';
      setState('ui.kitchenQueue.input.updateOrderStatus.orderId', '');
      this.updateOrderStatusStatus = '';
      setState('ui.kitchenQueue.input.updateOrderStatus.status', '');

      // Clear error
      this.updateOrderStatusError = '';
      setState('ui.kitchenQueue.action.updateOrderStatus.error', '');

      this.updateOrderStatusState = 'success';
      setState('ui.kitchenQueue.action.updateOrderStatus.status', 'success');
    } else {
      const errorMsg = response.error?.message ?? this.msg['action.updateOrderStatus.error'];
      this.updateOrderStatusError = errorMsg;
      setState('ui.kitchenQueue.action.updateOrderStatus.error', errorMsg);
      this.updateOrderStatusState = 'error';
      setState('ui.kitchenQueue.action.updateOrderStatus.status', 'error');
      if (response.error) {
        console.error('[updateOrderStatus]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleUpdateOrderStatusClick(_e: Event): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.updateOrderStatus();
    }, { mode: 'blocking' });
  }

  // --- StateSetter: setUpdateOrderStatusOrderId ---
  setUpdateOrderStatusOrderId(value: string): void {
    this.updateOrderStatusOrderId = value;
    setState('ui.kitchenQueue.input.updateOrderStatus.orderId', value);
    this.requestUpdate();
  }

  handleUpdateOrderStatusOrderIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    if (!target) return;
    const value: string = target.value ?? '';
    this.setUpdateOrderStatusOrderId(value);
  }

  // --- StateSetter: setUpdateOrderStatusStatus ---
  setUpdateOrderStatusStatus(value: string): void {
    this.updateOrderStatusStatus = value;
    setState('ui.kitchenQueue.input.updateOrderStatus.status', value);
    this.requestUpdate();
  }

  handleUpdateOrderStatusStatusChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    if (!target) return;
    const value: string = target.value ?? '';
    this.setUpdateOrderStatusStatus(value);
  }
}
