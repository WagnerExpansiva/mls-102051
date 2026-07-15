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
  "page.stockManagement.title": "Gestão de estoque e alertas",
  "section.stockItems.title": "Itens de estoque",
  "section.stockItems.description": "Consultar itens de estoque e alertas de estoque baixo",
  "section.manageStockItem.title": "Gerenciar item",
  "section.manageStockItem.description": "Gerenciar dados do item selecionado",
  "column.stockItemId.label": "ID",
  "column.name.label": "Nome",
  "column.unit.label": "Unidade",
  "column.minimumLevel.label": "Limite mínimo",
  "column.createdAt.label": "Criado em",
  "column.updatedAt.label": "Atualizado em",
  "field.stockItemId.label": "ID do item",
  "field.name.label": "Nome",
  "field.unit.label": "Unidade",
  "field.minimumLevel.label": "Limite mínimo",
  "filter.searchTerm.label": "Buscar por nome",
  "action.browseStockItems.label": "Consultar",
  "action.select.label": "Editar",
  "action.manageStockItem.label": "Salvar alterações",
  "action.manageStockItem.success": "Item de estoque atualizado com sucesso",
  "action.manageStockItem.error": "Erro ao atualizar item de estoque",
  "empty.browseStockItems": "Nenhum item de estoque encontrado",
  "empty.manageStockItem": "Selecione um item de estoque na lista para editar",
  "sec.stock.items.title": "Sec stock items",
  "org.stock.items.table.title": "Listar itens de estoque com nome, unidade e limite mínimo, destacando alertas de estoque baixo",
  "sec.manage.stock.item.title": "Sec manage stock item",
  "org.stock.item.form.title": "Editar os dados de um item de estoque selecionado: nome, unidade de medida e limite mínimo",
  "section.stockQueue.title": "Itens de estoque",
  "section.review.title": "Resumo",
  "field.createdAt.label": "Criado em",
  "field.updatedAt.label": "Atualizado em",
  "field.searchTerm.label": "Buscar por nome",
  "action.selectItem.label": "Selecionar",
  "action.refresh.label": "Atualizar",
  "empty.stockQueue": "Nenhum item de estoque encontrado",
  "org.stockQueueTable.title": "Exibir fila de itens de estoque com alertas de estoque baixo, permitir busca por nome e seleção para edição",
  "org.manageStockItemForm.title": "Editar dados do item de estoque selecionado (nome, unidade, limite mínimo) e confirmar atualização",
  "org.reviewSummary.title": "Revisar o contexto e o resultado das ações principais da página",
  "page.title": "Gestão de estoque e alertas",
  "section.stockItemsList.title": "Itens de estoque",
  "section.stockItemDetailPanel.title": "Detalhes do item",
  "section.reviewSummary.title": "Resumo",
  "organism.stockItemsBrowser.title": "Consulta de estoque",
  "organism.stockItemManager.title": "Gerenciar item de estoque",
  "organism.actionSummary.title": "Resumo das ações",
  "intention.queryStockItems.title": "Lista de itens de estoque",
  "intention.manageStockItem.title": "Editar item de estoque",
  "intention.summary.title": "Resultado da operação",
  "toolbar.refresh.label": "Atualizar",
  "rowAction.selectItem.label": "Selecionar item",
  "empty.stockItems": "Nenhum item de estoque encontrado",
  "empty.noItemSelected": "Selecione um item de estoque na lista para editar",
  "empty.noActionsYet": "Nenhuma ação executada ainda",
  "org.stockItemsBrowser.title": "Listar e buscar itens de estoque com alertas de estoque baixo, usando lista como fallback acessível (sem dados espaciais disponíveis)",
  "org.stockItemManager.title": "Editar detalhes do item de estoque selecionado no painel lateral",
  "org.actionSummary.title": "Revisar o contexto e o resultado das ações principais da página"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowStockManagementBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) browseStockItemsState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) browseStockItemsSearchTerm: string = '';

  @property({ type: Object }) browseStockItemsData: CafeFlowBrowseStockItemsOutput = { items: [], total: 0 };

  @property({ type: String }) manageStockItemState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) manageStockItemStockItemId: string = '';

  @property({ type: String }) manageStockItemName: string = '';

  @property({ type: String }) manageStockItemUnit: string = '';

  @property({ type: String }) manageStockItemMinimumLevel: string = '';

  @property({ type: Object }) manageStockItemOutput: CafeFlowManageStockItemOutput | null = null;

  @property({ type: String }) manageStockItemError: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  // ---- Route param parsing ----

  private parseRouteParams(): { stockItemId?: string } {
    const pattern = '/cafeFlow/stockManagement/:stockItemId?';
    const path = window.location.pathname;
    const segments = path.split('/').filter((s: string) => s.length > 0);
    // Expected: ['cafeFlow', 'stockManagement', <stockItemId?>]
    const result: { stockItemId?: string } = {};
    if (segments.length >= 3 && segments[0] === 'cafeFlow' && segments[1] === 'stockManagement') {
      const raw = decodeURIComponent(segments[2]);
      if (raw) {
        result.stockItemId = raw;
      }
    }
    return result;
  }

  // ---- Query action: browseStockItems ----

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
      const data = response.data ?? { items: [], total: 0 };
      this.browseStockItemsData = data;
      setState('ui.stockManagement.data.browseStockItems', data);
      this.browseStockItemsState = 'success';
      setState('ui.stockManagement.action.browseStockItems.status', 'success');
    } else {
      this.browseStockItemsData = { items: [], total: 0 };
      setState('ui.stockManagement.data.browseStockItems', { items: [], total: 0 });
      this.browseStockItemsState = 'error';
      setState('ui.stockManagement.action.browseStockItems.status', 'error');
      if (response.error) {
        console.error('[browseStockItems]', response.error.message);
      }
    }
  }

  handleBrowseStockItemsClick(_event: Event): void {
    this.loadBrowseStockItems();
  }

  // ---- Command action: manageStockItem ----

  async manageStockItem(): Promise<void> {
    // Parse route params before calling
    const routeParams = this.parseRouteParams();
    if (routeParams.stockItemId) {
      this.manageStockItemStockItemId = routeParams.stockItemId;
      setState('ui.stockManagement.input.manageStockItem.stockItemId', routeParams.stockItemId);
    }

    // If required route param is absent, do not call execBff
    if (!this.manageStockItemStockItemId) {
      this.manageStockItemState = 'idle';
      setState('ui.stockManagement.action.manageStockItem.status', 'idle');
      return;
    }

    this.manageStockItemState = 'loading';
    setState('ui.stockManagement.action.manageStockItem.status', 'loading');

    const params: CafeFlowManageStockItemInput = {
      stockItemId: this.manageStockItemStockItemId,
      name: this.manageStockItemName,
      unit: this.manageStockItemUnit as "kg" | "liter" | "portion" | "unit",
      minimumLevel: Number(this.manageStockItemMinimumLevel),
    };

    const options: BffClientOptions = { mode: 'blocking' };

    await runBlockingUiAction(async (signal: AbortSignal) => {
      const response = await execBff<CafeFlowManageStockItemOutput>(
        'cafeFlow.manageStockItem.manageStockItem',
        params,
        { ...options, signal },
      );

      if (response.ok) {
        const data = response.data ?? null;
        this.manageStockItemOutput = data;
        setState('ui.stockManagement.output.manageStockItem', data);

        // Refresh: call browseStockItems query
        await this.loadBrowseStockItems();

        if (this.browseStockItemsState === 'error') {
          this.manageStockItemState = 'error';
          setState('ui.stockManagement.action.manageStockItem.status', 'error');
          return;
        }

        // Clear input fields
        this.manageStockItemName = '';
        setState('ui.stockManagement.input.manageStockItem.name', '');
        this.manageStockItemUnit = '';
        setState('ui.stockManagement.input.manageStockItem.unit', '');
        this.manageStockItemMinimumLevel = '';
        setState('ui.stockManagement.input.manageStockItem.minimumLevel', '');

        this.manageStockItemError = '';
        setState('ui.stockManagement.action.manageStockItem.error', '');

        this.manageStockItemState = 'success';
        setState('ui.stockManagement.action.manageStockItem.status', 'success');
      } else {
        const errorMsg = response.error?.message ?? this.msg['action.manageStockItem.error'];
        this.manageStockItemError = errorMsg;
        setState('ui.stockManagement.action.manageStockItem.error', errorMsg);
        this.manageStockItemState = 'error';
        setState('ui.stockManagement.action.manageStockItem.status', 'error');
      }
    }, { mode: 'blocking' });
  }

  handleManageStockItemClick(_event: Event): void {
    this.manageStockItem();
  }

  // ---- State setters ----

  setBrowseStockItemsSearchTerm(value: string): void {
    this.browseStockItemsSearchTerm = value;
    setState('ui.stockManagement.input.browseStockItems.searchTerm', value);
    this.requestUpdate();
  }

  handleBrowseStockItemsSearchTermChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.setBrowseStockItemsSearchTerm(target.value);
  }

  setManageStockItemStockItemId(value: string): void {
    this.manageStockItemStockItemId = value;
    setState('ui.stockManagement.input.manageStockItem.stockItemId', value);
    this.requestUpdate();
  }

  handleManageStockItemStockItemIdChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.setManageStockItemStockItemId(target.value);
  }

  setManageStockItemName(value: string): void {
    this.manageStockItemName = value;
    setState('ui.stockManagement.input.manageStockItem.name', value);
    this.requestUpdate();
  }

  handleManageStockItemNameChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.setManageStockItemName(target.value);
  }

  setManageStockItemUnit(value: string): void {
    this.manageStockItemUnit = value;
    setState('ui.stockManagement.input.manageStockItem.unit', value);
    this.requestUpdate();
  }

  handleManageStockItemUnitChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.setManageStockItemUnit(target.value);
  }

  setManageStockItemMinimumLevel(value: string): void {
    this.manageStockItemMinimumLevel = value;
    setState('ui.stockManagement.input.manageStockItem.minimumLevel', value);
    this.requestUpdate();
  }

  handleManageStockItemMinimumLevelChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.setManageStockItemMinimumLevel(target.value);
  }

  // ---- Lifecycle ----

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize state from global state where useful
    const savedSearchTerm = getState('ui.stockManagement.input.browseStockItems.searchTerm');
    if (typeof savedSearchTerm === 'string') {
      this.browseStockItemsSearchTerm = savedSearchTerm;
    }

    const savedStockItemId = getState('ui.stockManagement.input.manageStockItem.stockItemId');
    if (typeof savedStockItemId === 'string') {
      this.manageStockItemStockItemId = savedStockItemId;
    }

    // Parse route params for initial context
    const routeParams = this.parseRouteParams();
    if (routeParams.stockItemId) {
      this.manageStockItemStockItemId = routeParams.stockItemId;
      setState('ui.stockManagement.input.manageStockItem.stockItemId', routeParams.stockItemId);
    }

    // Subscribe to shared states
    subscribe(
      [
        'ui.stockManagement.input.browseStockItems.searchTerm',
        'ui.stockManagement.input.manageStockItem.stockItemId',
      ],
      this,
    );

    // Run initial loads
    this.loadBrowseStockItems();
  }

  disconnectedCallback(): void {
    unsubscribe(
      [
        'ui.stockManagement.input.browseStockItems.searchTerm',
        'ui.stockManagement.input.manageStockItem.stockItemId',
      ],
      this,
    );
    super.disconnectedCallback();
  }
}
