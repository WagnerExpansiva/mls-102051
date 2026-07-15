/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowBrowseMenuItemsInput,
  CafeFlowBrowseMenuItemsOutput,
  CafeFlowBrowseMenuItemsOutputItem,
  CafeFlowManageMenuItemInput,
  CafeFlowManageMenuItemOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

/// **collab_i18n_start**
const message_pt = {
  "page.title": "Gestão de cardápio",
  "section.queue.title": "Fila de itens do cardápio",
  "section.queue.empty": "Nenhum item encontrado. Ajuste os filtros ou crie um novo item.",
  "section.manage.title": "Gerenciar item do cardápio",
  "section.review.title": "Resultado",
  "section.review.empty": "Nenhuma alteração realizada ainda.",
  "filter.statusFilter.label": "Filtrar por status",
  "filter.menuCategoryIdFilter.label": "Filtrar por categoria",
  "column.menuItemId.label": "ID",
  "column.name.label": "Nome",
  "column.description.label": "Descrição",
  "column.menuCategoryId.label": "Categoria",
  "column.price.label": "Preço",
  "column.itemType.label": "Tipo",
  "column.status.label": "Status",
  "column.activatedAt.label": "Ativado em",
  "column.inactivatedAt.label": "Inativado em",
  "column.createdAt.label": "Criado em",
  "column.updatedAt.label": "Atualizado em",
  "field.menuItemId.label": "ID do item",
  "field.name.label": "Nome",
  "field.description.label": "Descrição",
  "field.menuCategoryId.label": "Categoria",
  "field.price.label": "Preço de venda",
  "field.itemType.label": "Tipo do item",
  "field.status.label": "Status do item",
  "action.refresh.label": "Atualizar",
  "action.selectItem.label": "Selecionar",
  "action.manageMenuItem.label": "Salvar item",
  "action.manageMenuItem.submit": "Salvar item",
  "action.manageMenuItem.success": "Item do cardápio salvo com sucesso.",
  "action.manageMenuItem.error": "Erro ao salvar item do cardápio. Verifique os dados e tente novamente.",
  "org.menu.item.queue.title": "Listar itens do cardápio da empresa ativa com filtros por status e categoria, permitindo seleção para gerenciamento",
  "org.manage.item.form.title": "Formulário de gerenciamento do item do cardápio selecionado, permitindo editar dados e definir status do ciclo de vida",
  "org.review.summary.title": "Exibir o resultado da última operação de gerenciamento de item do cardápio",
  "page.menuManagement.title": "Gestão de cardápio",
  "section.board.title": "Quadro de itens",
  "section.detail.title": "Gerenciar item",
  "organism.kanbanBoard.title": "Itens do cardápio por status",
  "organism.manageForm.title": "Editar item do cardápio",
  "intention.browse.title": "Itens do cardápio",
  "intention.manage.title": "Dados do item",
  "action.browseMenuItems.label": "Atualizar quadro",
  "action.selectCard.label": "Selecionar item",
  "empty.board": "Nenhum item encontrado para os filtros selecionados.",
  "empty.detail": "Selecione um item no quadro para gerenciar seus dados.",
  "lane.draft.title": "Rascunho",
  "lane.active.title": "Ativo",
  "lane.inactive.title": "Inativo",
  "sec.board.title": "Sec board",
  "org.kanban.board.title": "Exibir itens do cardápio agrupados por status (rascunho, ativo, inativo) em colunas kanban, permitindo filtragem e seleção para gerenciamento",
  "sec.detail.title": "Sec detail",
  "org.manage.form.title": "Editar e gerenciar o item do cardápio selecionado, permitindo alterar dados e transicionar status entre rascunho, ativo e inativo",
  "section.discover.title": "Itens do cardápio",
  "section.execute.title": "Gerenciar item",
  "organism.menuItemsList.title": "Itens do cardápio",
  "organism.manageItemForm.title": "Gerenciar item do cardápio",
  "organism.actionFeedback.title": "Resumo da última ação",
  "field.menuItemId": "ID do item",
  "field.name": "Nome",
  "field.description": "Descrição",
  "field.menuCategoryId": "Categoria",
  "field.price": "Preço",
  "field.itemType": "Tipo",
  "field.status": "Status",
  "field.activatedAt": "Ativado em",
  "field.inactivatedAt": "Inativado em",
  "field.updatedAt": "Atualizado em",
  "filter.statusFilter": "Filtrar por status",
  "filter.menuCategoryIdFilter": "Filtrar por categoria",
  "action.refresh": "Atualizar",
  "action.newItem": "Novo item",
  "action.selectItem": "Editar",
  "empty.menuItems": "Nenhum item do cardápio encontrado. Use o botão Novo item para criar o primeiro.",
  "status.draft": "Rascunho",
  "status.active": "Ativo",
  "status.inactive": "Inativo",
  "sec.discover.title": "Sec discover",
  "org.menuItemsCardList.title": "Listar itens do cardápio em cards com filtros compactos e ação de seleção para edição",
  "sec.execute.title": "Sec execute",
  "org.manageItemForm.title": "Formulário em bottom sheet para criar ou editar um item do cardápio com nome, categoria, preço, tipo e status",
  "sec.review.title": "Sec review",
  "org.actionFeedback.title": "Exibir feedback textual da última ação de gerenciamento e resumo do resultado"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowMenuManagementBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) browseMenuItemsState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) browseMenuItemsStatusFilter: string = '';
  @property({ type: String }) browseMenuItemsMenuCategoryIdFilter: string = '';
  @property({ type: Object }) browseMenuItemsData: { items: CafeFlowBrowseMenuItemsOutputItem[]; total: number } = { items: [], total: 0 };

  @property({ type: String }) manageMenuItemState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) manageMenuItemMenuItemId: string = '';
  @property({ type: String }) manageMenuItemName: string = '';
  @property({ type: String }) manageMenuItemDescription: string = '';
  @property({ type: String }) manageMenuItemMenuCategoryId: string = '';
  @property({ type: String }) manageMenuItemPrice: string = '';
  @property({ type: String }) manageMenuItemItemType: string = '';
  @property({ type: String }) manageMenuItemStatus: string = '';
  @property({ type: Object }) manageMenuItemOutput: CafeFlowManageMenuItemOutput | null = null;
  @property({ type: String }) manageMenuItemError: string = '';

  @property({ type: String }) activeCompanyId: string = '';

  private subscribedKeys: string[] = [
    'ui.menuManagement.businessContext.activeCompanyId',
  ];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();
    const ctxCompanyId = getState('ui.menuManagement.businessContext.activeCompanyId') as string | undefined;
    if (ctxCompanyId) {
      this.activeCompanyId = ctxCompanyId;
    }
    for (const key of this.subscribedKeys) {
      subscribe(key, this);
    }
    void this.loadBrowseMenuItems();
  }

  disconnectedCallback(): void {
    for (const key of this.subscribedKeys) {
      unsubscribe(key, this);
    }
    super.disconnectedCallback();
  }

  handleIcaStateChange(key: string, value: unknown): void {
    if (key === 'ui.menuManagement.businessContext.activeCompanyId') {
      this.activeCompanyId = (value as string) ?? '';
    }
  }

  // --- Query: browseMenuItems ---

  async loadBrowseMenuItems(): Promise<void> {
    this.browseMenuItemsState = 'loading';
    setState('ui.menuManagement.action.browseMenuItems.status', 'loading');

    const params: CafeFlowBrowseMenuItemsInput = {};
    if (this.browseMenuItemsStatusFilter) {
      params.statusFilter = this.browseMenuItemsStatusFilter as "draft" | "active" | "inactive";
    }
    if (this.browseMenuItemsMenuCategoryIdFilter) {
      params.menuCategoryIdFilter = this.browseMenuItemsMenuCategoryIdFilter;
    }

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<CafeFlowBrowseMenuItemsOutput>(
      'cafeFlow.menuItemLifecycle.browseMenuItems',
      params,
      options,
    );

    if (response.ok) {
      const data = response.data;
      if (data) {
        this.browseMenuItemsData = { items: data.items, total: data.total };
      } else {
        this.browseMenuItemsData = { items: [], total: 0 };
      }
      setState('ui.menuManagement.data.browseMenuItems', this.browseMenuItemsData);
      this.browseMenuItemsState = 'success';
      setState('ui.menuManagement.action.browseMenuItems.status', 'success');
    } else {
      this.browseMenuItemsData = { items: [], total: 0 };
      setState('ui.menuManagement.data.browseMenuItems', this.browseMenuItemsData);
      this.browseMenuItemsState = 'error';
      setState('ui.menuManagement.action.browseMenuItems.status', 'error');
      if (response.error) {
        console.error('[browseMenuItems]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleBrowseMenuItemsClick(_e: Event): void {
    void this.loadBrowseMenuItems();
  }

  // --- Command: manageMenuItem ---

  async manageMenuItem(): Promise<void> {
    this.manageMenuItemState = 'loading';
    setState('ui.menuManagement.action.manageMenuItem.status', 'loading');
    this.manageMenuItemError = '';
    setState('ui.menuManagement.action.manageMenuItem.error', '');

    const priceNum = parseFloat(this.manageMenuItemPrice);
    const params: CafeFlowManageMenuItemInput = {
      menuItemId: this.manageMenuItemMenuItemId,
      name: this.manageMenuItemName,
      description: this.manageMenuItemDescription,
      menuCategoryId: this.manageMenuItemMenuCategoryId,
      price: isNaN(priceNum) ? 0 : priceNum,
      itemType: this.manageMenuItemItemType as "simple" | "variant",
      status: this.manageMenuItemStatus as "draft" | "active" | "inactive",
    };

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CafeFlowManageMenuItemOutput>(
      'cafeFlow.menuItemLifecycle.manageMenuItem',
      params,
      options,
    );

    if (response.ok) {
      const data = response.data;
      this.manageMenuItemOutput = data ?? null;
      setState('ui.menuManagement.output.manageMenuItem', this.manageMenuItemOutput);

      // Refresh browseMenuItems before declaring success
      let refreshFailed = false;
      try {
        await this.loadBrowseMenuItems();
        if (this.browseMenuItemsState === 'error') {
          refreshFailed = true;
        }
      } catch {
        refreshFailed = true;
      }

      if (refreshFailed) {
        this.manageMenuItemState = 'error';
        setState('ui.menuManagement.action.manageMenuItem.status', 'error');
        this.manageMenuItemError = this.msg['action.manageMenuItem.error'];
        setState('ui.menuManagement.action.manageMenuItem.error', this.manageMenuItemError);
      } else {
        // Clear input fields
        this.manageMenuItemMenuItemId = '';
        this.manageMenuItemName = '';
        this.manageMenuItemDescription = '';
        this.manageMenuItemMenuCategoryId = '';
        this.manageMenuItemPrice = '';
        this.manageMenuItemItemType = '';
        this.manageMenuItemStatus = '';
        setState('ui.menuManagement.input.manageMenuItem.menuItemId', '');
        setState('ui.menuManagement.input.manageMenuItem.name', '');
        setState('ui.menuManagement.input.manageMenuItem.description', '');
        setState('ui.menuManagement.input.manageMenuItem.menuCategoryId', '');
        setState('ui.menuManagement.input.manageMenuItem.price', '');
        setState('ui.menuManagement.input.manageMenuItem.itemType', '');
        setState('ui.menuManagement.input.manageMenuItem.status', '');

        this.manageMenuItemState = 'success';
        setState('ui.menuManagement.action.manageMenuItem.status', 'success');
      }
    } else {
      const errorMsg = response.error?.message ?? this.msg['action.manageMenuItem.error'];
      this.manageMenuItemError = errorMsg;
      setState('ui.menuManagement.action.manageMenuItem.error', errorMsg);
      this.manageMenuItemState = 'error';
      setState('ui.menuManagement.action.manageMenuItem.status', 'error');
    }
    this.requestUpdate();
  }

  handleManageMenuItemClick(_e: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.manageMenuItem();
    }, { mode: 'blocking' });
  }

  // --- State setters: browseMenuItems filters ---

  setBrowseMenuItemsStatusFilter(value: string): void {
    this.browseMenuItemsStatusFilter = value;
    setState('ui.menuManagement.input.browseMenuItems.statusFilter', value);
    this.requestUpdate();
  }

  handleBrowseMenuItemsStatusFilterChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.setBrowseMenuItemsStatusFilter(target.value);
  }

  setBrowseMenuItemsMenuCategoryIdFilter(value: string): void {
    this.browseMenuItemsMenuCategoryIdFilter = value;
    setState('ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter', value);
    this.requestUpdate();
  }

  handleBrowseMenuItemsMenuCategoryIdFilterChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.setBrowseMenuItemsMenuCategoryIdFilter(target.value);
  }

  // --- State setters: manageMenuItem inputs ---

  setManageMenuItemMenuItemId(value: string): void {
    this.manageMenuItemMenuItemId = value;
    setState('ui.menuManagement.input.manageMenuItem.menuItemId', value);
    this.requestUpdate();
  }

  handleManageMenuItemMenuItemIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.setManageMenuItemMenuItemId(target.value);
  }

  setManageMenuItemName(value: string): void {
    this.manageMenuItemName = value;
    setState('ui.menuManagement.input.manageMenuItem.name', value);
    this.requestUpdate();
  }

  handleManageMenuItemNameChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.setManageMenuItemName(target.value);
  }

  setManageMenuItemDescription(value: string): void {
    this.manageMenuItemDescription = value;
    setState('ui.menuManagement.input.manageMenuItem.description', value);
    this.requestUpdate();
  }

  handleManageMenuItemDescriptionChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.setManageMenuItemDescription(target.value);
  }

  setManageMenuItemMenuCategoryId(value: string): void {
    this.manageMenuItemMenuCategoryId = value;
    setState('ui.menuManagement.input.manageMenuItem.menuCategoryId', value);
    this.requestUpdate();
  }

  handleManageMenuItemMenuCategoryIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.setManageMenuItemMenuCategoryId(target.value);
  }

  setManageMenuItemPrice(value: string): void {
    this.manageMenuItemPrice = value;
    setState('ui.menuManagement.input.manageMenuItem.price', value);
    this.requestUpdate();
  }

  handleManageMenuItemPriceChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.setManageMenuItemPrice(target.value);
  }

  setManageMenuItemItemType(value: string): void {
    this.manageMenuItemItemType = value;
    setState('ui.menuManagement.input.manageMenuItem.itemType', value);
    this.requestUpdate();
  }

  handleManageMenuItemItemTypeChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.setManageMenuItemItemType(target.value);
  }

  setManageMenuItemStatus(value: string): void {
    this.manageMenuItemStatus = value;
    setState('ui.menuManagement.input.manageMenuItem.status', value);
    this.requestUpdate();
  }

  handleManageMenuItemStatusChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.setManageMenuItemStatus(target.value);
  }
}
