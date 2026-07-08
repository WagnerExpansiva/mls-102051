/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowBrowseStockItemsInput,
  CafeFlowBrowseStockItemsOutput,
  CafeFlowManageStockItemInput,
  CafeFlowManageStockItemOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';

/// **collab_i18n_start**
const message_pt = {
  "stockManagement.section.main.title": "Gestão de estoque e alertas",
  "stockManagement.organism.browseStockItems.title": "Consultar itens de estoque e alertas",
  "stockManagement.intentions.browseStockItems.queryList.title": "Itens de estoque",
  "stockManagement.intentions.browseStockItems.queryList.empty": "Nenhum item de estoque encontrado",
  "stockManagement.filters.searchTerm": "Buscar por nome",
  "stockManagement.fields.name": "Nome",
  "stockManagement.fields.unit": "Unidade",
  "stockManagement.fields.minimumLevel": "Limite mínimo",
  "stockManagement.fields.updatedAt": "Atualizado em",
  "stockManagement.fields.createdAt": "Criado em",
  "stockManagement.actions.browseStockItems": "Buscar",
  "stockManagement.organism.manageStockItem.title": "Gerenciar item de estoque",
  "stockManagement.intentions.manageStockItem.form.title": "Editar item de estoque",
  "stockManagement.actions.manageStockItem": "Salvar alterações",
  "stockManagement.intentions.manageStockItem.summary.title": "Resumo da atualização"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowStockManagementBase extends CollabLitElement {

  @property({ type: String })
  status: string = '';

  @property({ type: String })
  browseStockItemsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String })
  browseStockItemsSearchTerm: string = '';

  @property({ type: Object })
  browseStockItemsData: CafeFlowBrowseStockItemsOutput = { items: [], total: 0 };

  @property({ type: String })
  manageStockItemState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String })
  manageStockItemName: string = '';

  @property({ type: String })
  manageStockItemUnit: string = '';

  @property({ type: String })
  manageStockItemMinimumLevel: string = '';

  @property({ type: String })
  LayoutSummaryManageStockItemUpdatedAt: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  // ── Query: browseStockItems ──

  async loadBrowseStockItems(): Promise<boolean> {
    this.browseStockItemsState = 'loading';
    setState('ui.stockManagement.action.browseStockItems.status', 'loading');

    const params: CafeFlowBrowseStockItemsInput = {
      searchTerm: this.browseStockItemsSearchTerm || undefined,
    };

    const response = await execBff<CafeFlowBrowseStockItemsOutput>(
      'cafeFlow.browseStockItems.browseStockItems',
      params,
      { mode: 'silent' }
    );

    if (!response.ok) {
      this.browseStockItemsState = 'error';
      setState('ui.stockManagement.action.browseStockItems.status', 'error');
      return false;
    }

    const data: CafeFlowBrowseStockItemsOutput = response.data ?? { items: [], total: 0 };
    this.browseStockItemsData = data;
    setState('ui.stockManagement.data.browseStockItems', data);
    this.browseStockItemsState = 'success';
    setState('ui.stockManagement.action.browseStockItems.status', 'success');
    return true;
  }

  async handleBrowseStockItemsClick(): Promise<void> {
    await this.loadBrowseStockItems();
  }

  // ── Command: manageStockItem ──

  async manageStockItem(signal?: AbortSignal): Promise<void> {
    this.manageStockItemState = 'loading';
    setState('ui.stockManagement.action.manageStockItem.status', 'loading');

    const params: CafeFlowManageStockItemInput = {
      name: this.manageStockItemName,
      unit: this.manageStockItemUnit as 'kg' | 'liter' | 'portion' | 'unit',
      minimumLevel: Number(this.manageStockItemMinimumLevel),
    };

    const options: BffClientOptions = { mode: 'blocking' };
    if (signal) {
      options.signal = signal;
    }

    const response = await execBff<CafeFlowManageStockItemOutput>(
      'cafeFlow.manageStockItem.manageStockItem',
      params,
      options
    );

    if (!response.ok) {
      this.manageStockItemState = 'error';
      setState('ui.stockManagement.action.manageStockItem.status', 'error');
      return;
    }

    // Refresh browseStockItems after successful command
    const refreshOk = await this.loadBrowseStockItems();

    if (!refreshOk) {
      this.manageStockItemState = 'error';
      setState('ui.stockManagement.action.manageStockItem.status', 'error');
    } else {
      this.manageStockItemState = 'success';
      setState('ui.stockManagement.action.manageStockItem.status', 'success');
    }
  }

  async handleManageStockItemClick(): Promise<void> {
    await runBlockingUiAction(async (signal: AbortSignal) => {
      await this.manageStockItem(signal);
    }, { mode: 'blocking' });
  }

  // ── State setters ──

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

  // ── Lifecycle ──

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

    const sharedMinimumLevel = getState('ui.stockManagement.input.manageStockItem.minimumLevel') as string | undefined;
    if (sharedMinimumLevel !== undefined) {
      this.manageStockItemMinimumLevel = sharedMinimumLevel;
    }

    // Run initial loads
    this.loadBrowseStockItems();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }
}
