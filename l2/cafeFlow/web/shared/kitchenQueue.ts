/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenQueue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowViewKitchenBoardOutput,
  CafeFlowUpdateOrderStatusInput,
  CafeFlowUpdateOrderStatusOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/kitchenQueue.js';

/// **collab_i18n_start**
const message_pt = {
  "kitchenQueue.section.board.title": "Fila da cozinha",
  "kitchenQueue.organism.board.title": "Painel da cozinha",
  "kitchenQueue.intent.board.list.title": "Pedidos por status",
  "kitchenQueue.section.transition.title": "Transição de status",
  "kitchenQueue.organism.update.title": "Atualizar status do pedido",
  "kitchenQueue.intent.update.title": "Avançar status do pedido",
  "kitchenQueue.section.summary.title": "Resumo do pedido",
  "kitchenQueue.organism.summary.title": "Resumo do pedido selecionado",
  "kitchenQueue.intent.summary.title": "Detalhes do pedido",
  "kitchenQueue.field.orderId": "Pedido",
  "kitchenQueue.field.status": "Status",
  "kitchenQueue.field.orderType": "Tipo",
  "kitchenQueue.field.tableNumber": "Mesa",
  "kitchenQueue.field.priority": "Prioridade",
  "kitchenQueue.field.priorityReason": "Motivo da prioridade",
  "kitchenQueue.field.receivedAt": "Recebido em",
  "kitchenQueue.field.inPreparationAt": "Em preparo desde",
  "kitchenQueue.action.markInPreparation": "Iniciar preparo",
  "kitchenQueue.action.markReady": "Marcar como pronto",
  "kitchenQueue.section.cards.title": "Fila em cartões",
  "kitchenQueue.organism.cards.title": "Pedidos da cozinha",
  "kitchenQueue.intent.cards.list.title": "Pedidos do turno",
  "kitchenQueue.section.actions.title": "Ações do pedido",
  "kitchenQueue.organism.actions.title": "Atualizar status",
  "kitchenQueue.intent.card.update.title": "Avançar status",
  "kitchenQueue.section.queue.title": "Fila de trabalho",
  "kitchenQueue.organism.queue.title": "Pedidos em fila",
  "kitchenQueue.intent.queue.list.title": "Fila atual"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowKitchenQueueBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) viewKitchenBoardState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: Object }) viewKitchenBoardData: CafeFlowViewKitchenBoardOutput = { items: [], total: 0 };

  @property({ type: String }) updateOrderStatusState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String }) updateOrderStatusStatus: CafeFlowUpdateOrderStatusInput['status'] = '' as CafeFlowUpdateOrderStatusInput['status'];

  @property({ type: Object }) OutputUpdateOrderStatus: CafeFlowUpdateOrderStatusOutput | null = null;

  private subscribedKeys: string[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();

    const existingStatus = getState('ui.kitchenQueue.status');
    if (existingStatus !== undefined) {
      this.status = existingStatus as string;
    }

    const existingViewStatus = getState('ui.kitchenQueue.action.viewKitchenBoard.status');
    if (existingViewStatus !== undefined) {
      this.viewKitchenBoardState = existingViewStatus as 'idle' | 'loading' | 'success' | 'error';
    }

    const existingViewData = getState('ui.kitchenQueue.data.viewKitchenBoard');
    if (existingViewData !== undefined) {
      this.viewKitchenBoardData = existingViewData as CafeFlowViewKitchenBoardOutput;
    }

    const existingUpdateStatus = getState('ui.kitchenQueue.action.updateOrderStatus.status');
    if (existingUpdateStatus !== undefined) {
      this.updateOrderStatusState = existingUpdateStatus as 'idle' | 'loading' | 'success' | 'error';
    }

    const existingUpdateInputStatus = getState('ui.kitchenQueue.input.updateOrderStatus.status');
    if (existingUpdateInputStatus !== undefined) {
      this.updateOrderStatusStatus = existingUpdateInputStatus as CafeFlowUpdateOrderStatusInput['status'];
    }

    const existingOutput = getState('ui.kitchenQueue.output.updateOrderStatus');
    if (existingOutput !== undefined) {
      this.OutputUpdateOrderStatus = existingOutput as CafeFlowUpdateOrderStatusOutput | null;
    }

    const keys = [
      'ui.kitchenQueue.status',
      'ui.kitchenQueue.action.viewKitchenBoard.status',
      'ui.kitchenQueue.data.viewKitchenBoard',
      'ui.kitchenQueue.action.updateOrderStatus.status',
      'ui.kitchenQueue.input.updateOrderStatus.status',
      'ui.kitchenQueue.output.updateOrderStatus',
    ];
    this.subscribedKeys = keys;
    subscribe(keys, this);

    this.loadViewKitchenBoard();
  }

  disconnectedCallback(): void {
    if (this.subscribedKeys.length > 0) {
      unsubscribe(this.subscribedKeys, this);
      this.subscribedKeys = [];
    }
    super.disconnectedCallback();
  }

  // --- Action: viewKitchenBoard (query) ---

  async loadViewKitchenBoard(): Promise<void> {
    this.viewKitchenBoardState = 'loading';
    setState('ui.kitchenQueue.action.viewKitchenBoard.status', 'loading');

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowViewKitchenBoardOutput>(
      'cafeFlow.orderLifecycle.viewKitchenBoard',
      {},
      options,
    );

    if (response.ok) {
      const data = response.data ?? { items: [], total: 0 };
      this.viewKitchenBoardData = data;
      setState('ui.kitchenQueue.data.viewKitchenBoard', data);
      this.viewKitchenBoardState = 'success';
      setState('ui.kitchenQueue.action.viewKitchenBoard.status', 'success');
    } else {
      this.viewKitchenBoardState = 'error';
      setState('ui.kitchenQueue.action.viewKitchenBoard.status', 'error');
      if (response.error) {
        console.error('[kitchenQueue] loadViewKitchenBoard error:', response.error.message);
      }
    }
  }

  handleViewKitchenBoardClick(_e: Event): void {
    this.loadViewKitchenBoard();
  }

  // --- Action: updateOrderStatus (command) ---

  async updateOrderStatus(): Promise<void> {
    this.updateOrderStatusState = 'loading';
    setState('ui.kitchenQueue.action.updateOrderStatus.status', 'loading');

    const params: CafeFlowUpdateOrderStatusInput = {
      status: this.updateOrderStatusStatus,
    };

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CafeFlowUpdateOrderStatusOutput>(
      'cafeFlow.orderLifecycle.updateOrderStatus',
      params,
      options,
    );

    if (response.ok) {
      const data = response.data ?? null;
      this.OutputUpdateOrderStatus = data;
      setState('ui.kitchenQueue.output.updateOrderStatus', data);

      // Refresh: call viewKitchenBoard query
      let refreshFailed = false;
      try {
        await this.loadViewKitchenBoard();
        if (this.viewKitchenBoardState === 'error') {
          refreshFailed = true;
        }
      } catch {
        refreshFailed = true;
      }

      if (refreshFailed) {
        this.updateOrderStatusState = 'error';
        setState('ui.kitchenQueue.action.updateOrderStatus.status', 'error');
      } else {
        this.updateOrderStatusState = 'success';
        setState('ui.kitchenQueue.action.updateOrderStatus.status', 'success');
      }
    } else {
      this.updateOrderStatusState = 'error';
      setState('ui.kitchenQueue.action.updateOrderStatus.status', 'error');
      if (response.error) {
        console.error('[kitchenQueue] updateOrderStatus error:', response.error.message);
      }
    }
  }

  handleUpdateOrderStatusClick(_e: Event): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.updateOrderStatus();
    }, { mode: 'blocking' });
  }

  // --- Action: set.updateOrderStatusStatus (stateSetter) ---

  setUpdateOrderStatusStatus(value: CafeFlowUpdateOrderStatusInput['status']): void {
    this.updateOrderStatusStatus = value;
    setState('ui.kitchenQueue.input.updateOrderStatus.status', value);
    this.requestUpdate();
  }

  handleUpdateOrderStatusStatusChange(e: Event): void {
    const target = e.target as HTMLSelectElement | HTMLInputElement;
    const value = target.value as CafeFlowUpdateOrderStatusInput['status'];
    this.setUpdateOrderStatusStatus(value);
  }
}
