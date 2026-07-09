/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowBrowseStockItemsInput,
  CafeFlowBrowseStockItemsOutput,
  CafeFlowBrowseStockItemsOutputItem,
  CafeFlowManageStockItemInput,
  CafeFlowManageStockItemOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';

/// **collab_i18n_start**
const message_pt = {
  "stockManagement.section.workspace.title": "Gestão de estoque e alertas",
  "stockManagement.organism.stockList.title": "Itens de estoque",
  "stockManagement.intent.stockList.title": "Lista de itens e alertas",
  "stockManagement.filter.searchTerm.label": "Buscar por nome",
  "stockManagement.field.name.label": "Ingrediente",
  "stockManagement.field.unit.label": "Unidade",
  "stockManagement.field.minimumLevel.label": "Limite mínimo",
  "stockManagement.field.updatedAt.label": "Atualizado em",
  "stockManagement.action.refreshList": "Atualizar lista",
  "stockManagement.organism.stockItemEditor.title": "Editar item",
  "stockManagement.intent.stockEdit.title": "Atualizar item de estoque",
  "stockManagement.action.save": "Salvar alterações",
  "stockManagement.organism.stockSummary.title": "Resumo do item",
  "stockManagement.intent.stockSummary.title": "Resumo e alerta",
  "stockManagement.section.queue.title": "Fila de itens",
  "stockManagement.organism.stockQueue.title": "Itens com alerta",
  "stockManagement.intent.queueList.title": "Fila de estoque",
  "stockManagement.section.actionPanel.title": "Painel do item",
  "stockManagement.organism.selectedStatus.title": "Detalhes do item",
  "stockManagement.intent.queueSummary.title": "Resumo do item selecionado",
  "stockManagement.organism.stockQueueEditor.title": "Editar item selecionado",
  "stockManagement.intent.queueEdit.title": "Atualizar item",
  "stockManagement.section.visual.title": "Visão visual do estoque",
  "stockManagement.organism.visualBoard.title": "Painel visual de itens",
  "stockManagement.intent.visualBoard.title": "Mapa de alertas",
  "stockManagement.organism.fallbackList.title": "Lista de itens",
  "stockManagement.intent.fallbackList.title": "Lista acessível",
  "stockManagement.section.detailPanel.title": "Detalhes do item",
  "stockManagement.organism.visualSummary.title": "Resumo do item",
  "stockManagement.intent.visualSummary.title": "Detalhes selecionados",
  "stockManagement.organism.visualEditor.title": "Editar item",
  "stockManagement.intent.visualEdit.title": "Atualizar item selecionado"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowStockManagementBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) browseStockItemsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String }) browseStockItemsSearchTerm: string = '';

  @property({ type: Object }) browseStockItemsData: CafeFlowBrowseStockItemsOutput = { items: [], total: 0 };

  @property({ type: String }) manageStockItemState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String }) manageStockItemName: string = '';

  @property({ type: String }) manageStockItemUnit: string = '';

  @property({ type: String }) manageStockItemMinimumLevel: string = '';

  @property({ type: Object }) OutputManageStockItem: CafeFlowManageStockItemOutput | null = null;

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  /* ---- State setters ---- */

  setBrowseStockItemsSearchTerm(value: string): void {
    this.browseStockItemsSearchTerm = value;
    setState('ui.stockManagement.input.browseStockItems.searchTerm', value);
    this.requestUpdate();
  }

  handleBrowseStockItemsSearchTermChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setBrowseStockItemsSearchTerm(target.value);
  }

  setManageStockItemName(value: string): void {
    this.manageStockItemName = value;
    setState('ui.stockManagement.input.manageStockItem.name', value);
    this.requestUpdate();
  }

  handleManageStockItemNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setManageStockItemName(target.value);
  }

  setManageStockItemUnit(value: string): void {
    this.manageStockItemUnit = value;
    setState('ui.stockManagement.input.manageStockItem.unit', value);
    this.requestUpdate();
  }

  handleManageStockItemUnitChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setManageStockItemUnit(target.value);
  }

  setManageStockItemMinimumLevel(value: string): void {
    this.manageStockItemMinimumLevel = value;
    setState('ui.stockManagement.input.manageStockItem.minimumLevel', value);
    this.requestUpdate();
  }

  handleManageStockItemMinimumLevelChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setManageStockItemMinimumLevel(target.value);
  }

  /* ---- Query actions ---- */

  async loadBrowseStockItems(): Promise<void> {
    this.browseStockItemsState = 'loading';
    setState('ui.stockManagement.action.browseStockItems.status', 'loading');

    const params: CafeFlowBrowseStockItemsInput = {
      searchTerm: this.browseStockItemsSearchTerm || undefined,
    };

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowBrowseStockItemsOutput>(
      'cafeFlow.browseStockItems.browseStockItems',
      params,
      options,
    );

    if (response.ok) {
      const data: CafeFlowBrowseStockItemsOutput = response.data ?? { items: [], total: 0 };
      this.browseStockItemsData = data;
      setState('ui.stockManagement.data.browseStockItems', data);
      this.browseStockItemsState = 'success';
      setState('ui.stockManagement.action.browseStockItems.status', 'success');
    } else {
      this.browseStockItemsState = 'error';
      setState('ui.stockManagement.action.browseStockItems.status', 'error');
      if (response.error) {
        console.error('[stockManagement] loadBrowseStockItems error:', response.error.message);
      }
    }
  }

  handleBrowseStockItemsClick(): void {
    void this.loadBrowseStockItems();
  }

  /* ---- Command actions ---- */

  async manageStockItem(): Promise<void> {
    this.manageStockItemState = 'loading';
    setState('ui.stockManagement.action.manageStockItem.status', 'loading');

    const parsedMinimumLevel = Number(this.manageStockItemMinimumLevel);
    const params: CafeFlowManageStockItemInput = {
      name: this.manageStockItemName,
      unit: this.manageStockItemUnit as 'kg' | 'liter' | 'portion' | 'unit',
      minimumLevel: isNaN(parsedMinimumLevel) ? 0 : parsedMinimumLevel,
    };

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CafeFlowManageStockItemOutput>(
      'cafeFlow.manageStockItem.manageStockItem',
      params,
      options,
    );

    if (response.ok) {
      const data: CafeFlowManageStockItemOutput | null = response.data ?? null;
      this.OutputManageStockItem = data;
      setState('ui.stockManagement.output.manageStockItem', data);

      // Refresh browseStockItems after successful command
      try {
        await this.loadBrowseStockItems();
        if (this.browseStockItemsState === 'error') {
          this.manageStockItemState = 'error';
          setState('ui.stockManagement.action.manageStockItem.status', 'error');
          return;
        }
      } catch {
        this.manageStockItemState = 'error';
        setState('ui.stockManagement.action.manageStockItem.status', 'error');
        return;
      }

      this.manageStockItemState = 'success';
      setState('ui.stockManagement.action.manageStockItem.status', 'success');
    } else {
      this.manageStockItemState = 'error';
      setState('ui.stockManagement.action.manageStockItem.status', 'error');
      if (response.error) {
        console.error('[stockManagement] manageStockItem error:', response.error.message);
      }
    }
  }

  handleManageStockItemClick(): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.manageStockItem();
    }, { mode: 'blocking' });
  }

  /* ---- Lifecycle ---- */

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize from shared state where useful
    const sharedSearchTerm = getState('ui.stockManagement.input.browseStockItems.searchTerm') as string | undefined;
    if (sharedSearchTerm !== undefined) {
      this.browseStockItemsSearchTerm = sharedSearchTerm;
    }

    const sharedName = getState('ui.stockManagement.input.manageStockItem.name') as string | undefined;
    if (sharedName !== undefined) {
      this.manageStockItemName = sharedName;
    }

    const sharedUnit = getState('ui.stockManagement.input.manageStockItem.unit') as string | undefined;
    if (sharedUnit !== undefined) {
      this.manageStockItemUnit = sharedUnit;
    }

    const sharedMinLevel = getState('ui.stockManagement.input.manageStockItem.minimumLevel') as string | undefined;
    if (sharedMinLevel !== undefined) {
      this.manageStockItemMinimumLevel = sharedMinLevel;
    }

    // Subscribe to shared states
    subscribe(
      [
        'ui.stockManagement.input.browseStockItems.searchTerm',
        'ui.stockManagement.input.manageStockItem.name',
        'ui.stockManagement.input.manageStockItem.unit',
        'ui.stockManagement.input.manageStockItem.minimumLevel',
      ],
      this,
    );

    // Run initial loads
    void this.loadBrowseStockItems();
  }

  disconnectedCallback(): void {
    unsubscribe(
      [
        'ui.stockManagement.input.browseStockItems.searchTerm',
        'ui.stockManagement.input.manageStockItem.name',
        'ui.stockManagement.input.manageStockItem.unit',
        'ui.stockManagement.input.manageStockItem.minimumLevel',
      ],
      this,
    );
    super.disconnectedCallback();
  }
}
