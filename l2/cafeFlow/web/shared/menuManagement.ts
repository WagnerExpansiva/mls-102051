/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowBrowseMenuItemsInput,
  CafeFlowBrowseMenuItemsOutput,
  CafeFlowManageMenuItemInput,
} from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

/// **collab_i18n_start**
const message_pt = {
  "menuManagement.section.main.title": "Gestão de cardápio",
  "menuManagement.organism.browseMenuItems.title": "Itens do cardápio",
  "menuManagement.organism.manageMenuItem.title": "Detalhes do item do cardápio",
  "menuManagement.intention.context.title": "Empresa ativa",
  "menuManagement.intention.browseMenuItems.list.title": "Lista de itens do cardápio",
  "menuManagement.intention.manageMenuItem.form.title": "Editar item do cardápio",
  "menuManagement.intention.manageMenuItem.status.title": "Status do item do cardápio",
  "menuManagement.field.name.label": "Nome",
  "menuManagement.field.description.label": "Descrição",
  "menuManagement.field.menuCategoryId.label": "Categoria",
  "menuManagement.field.price.label": "Preço",
  "menuManagement.field.itemType.label": "Tipo",
  "menuManagement.field.status.label": "Status",
  "menuManagement.field.updatedAt.label": "Atualizado em",
  "menuManagement.field.activatedAt.label": "Ativado em",
  "menuManagement.field.inactivatedAt.label": "Inativado em",
  "menuManagement.filter.statusFilter.label": "Status",
  "menuManagement.filter.menuCategoryIdFilter.label": "Categoria",
  "menuManagement.action.browseMenuItems.label": "Buscar itens",
  "menuManagement.action.manageMenuItem.label": "Salvar item"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowMenuManagementBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) browseMenuItemsState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) browseMenuItemsStatusFilter: string = '';

  @property({ type: String }) browseMenuItemsMenuCategoryIdFilter: string = '';

  @property({ type: Object }) browseMenuItemsData: CafeFlowBrowseMenuItemsOutput = { items: [], total: 0 };

  @property({ type: String }) manageMenuItemState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) manageMenuItemName: string = '';

  @property({ type: String }) manageMenuItemDescription: string = '';

  @property({ type: String }) manageMenuItemMenuCategoryId: string = '';

  @property({ type: String }) manageMenuItemPrice: string = '';

  @property({ type: String }) manageMenuItemItemType: string = '';

  @property({ type: String }) manageMenuItemStatus: string = '';

  @property({ type: String }) activeCompanyId: string = '';

  @property({ type: String }) LayoutFieldManageMenuItemActivatedAt: string = '';

  @property({ type: String }) LayoutFieldManageMenuItemInactivatedAt: string = '';

  @property({ type: String }) LayoutFieldManageMenuItemUpdatedAt: string = '';

  private subscribedKeys: string[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.activeCompanyId = (getState('ui.menuManagement.businessContext.activeCompanyId') as string) || '';
    this.subscribedKeys = ['ui.menuManagement.businessContext.activeCompanyId'];
    subscribe(this.subscribedKeys, this);
    this.loadBrowseMenuItems();
  }

  disconnectedCallback(): void {
    if (this.subscribedKeys.length > 0) {
      unsubscribe(this.subscribedKeys, this);
    }
    super.disconnectedCallback();
  }

  handleIcaStateChange(key: string, value: unknown): void {
    if (key === 'ui.menuManagement.businessContext.activeCompanyId') {
      this.activeCompanyId = (value as string) || '';
      this.requestUpdate();
    }
  }

  // ---- Query: browseMenuItems ----

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
      const data: CafeFlowBrowseMenuItemsOutput = response.data ?? { items: [], total: 0 };
      this.browseMenuItemsData = data;
      setState('ui.menuManagement.data.browseMenuItems', data);
      this.browseMenuItemsState = 'success';
      setState('ui.menuManagement.action.browseMenuItems.status', 'success');
    } else {
      this.browseMenuItemsState = 'error';
      setState('ui.menuManagement.action.browseMenuItems.status', 'error');
      console.error('[menuManagement] browseMenuItems failed:', response.error);
    }
  }

  handleBrowseMenuItemsClick(_e: Event): void {
    this.loadBrowseMenuItems();
  }

  // ---- Command: manageMenuItem ----

  async manageMenuItem(): Promise<void> {
    this.manageMenuItemState = 'loading';
    setState('ui.menuManagement.action.manageMenuItem.status', 'loading');

    const params: CafeFlowManageMenuItemInput = {
      name: this.manageMenuItemName,
      menuCategoryId: this.manageMenuItemMenuCategoryId,
      price: Number(this.manageMenuItemPrice) || 0,
      itemType: this.manageMenuItemItemType as "simple" | "variant",
      status: this.manageMenuItemStatus as "draft" | "active" | "inactive",
    };
    if (this.manageMenuItemDescription) {
      params.description = this.manageMenuItemDescription;
    }

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff(
      'cafeFlow.menuItemLifecycle.manageMenuItem',
      params,
      options,
    );

    if (response.ok) {
      // Refresh browseMenuItems after successful command
      try {
        await this.loadBrowseMenuItems();
        this.manageMenuItemState = 'success';
        setState('ui.menuManagement.action.manageMenuItem.status', 'success');
      } catch {
        this.manageMenuItemState = 'error';
        setState('ui.menuManagement.action.manageMenuItem.status', 'error');
        console.error('[menuManagement] refresh after manageMenuItem failed');
      }
    } else {
      this.manageMenuItemState = 'error';
      setState('ui.menuManagement.action.manageMenuItem.status', 'error');
      console.error('[menuManagement] manageMenuItem failed:', response.error);
    }
  }

  handleManageMenuItemClick(_e: Event): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.manageMenuItem();
    }, { mode: 'blocking' });
  }

  // ---- State setters: browseMenuItems filters ----

  setBrowseMenuItemsStatusFilter(value: string): void {
    this.browseMenuItemsStatusFilter = value;
    setState('ui.menuManagement.input.browseMenuItems.statusFilter', value);
    this.requestUpdate();
  }

  handleBrowseMenuItemsStatusFilterChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setBrowseMenuItemsStatusFilter(target.value);
  }

  setBrowseMenuItemsMenuCategoryIdFilter(value: string): void {
    this.browseMenuItemsMenuCategoryIdFilter = value;
    setState('ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter', value);
    this.requestUpdate();
  }

  handleBrowseMenuItemsMenuCategoryIdFilterChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setBrowseMenuItemsMenuCategoryIdFilter(target.value);
  }

  // ---- State setters: manageMenuItem form fields ----

  setManageMenuItemName(value: string): void {
    this.manageMenuItemName = value;
    setState('ui.menuManagement.input.manageMenuItem.name', value);
    this.requestUpdate();
  }

  handleManageMenuItemNameChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setManageMenuItemName(target.value);
  }

  setManageMenuItemDescription(value: string): void {
    this.manageMenuItemDescription = value;
    setState('ui.menuManagement.input.manageMenuItem.description', value);
    this.requestUpdate();
  }

  handleManageMenuItemDescriptionChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setManageMenuItemDescription(target.value);
  }

  setManageMenuItemMenuCategoryId(value: string): void {
    this.manageMenuItemMenuCategoryId = value;
    setState('ui.menuManagement.input.manageMenuItem.menuCategoryId', value);
    this.requestUpdate();
  }

  handleManageMenuItemMenuCategoryIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setManageMenuItemMenuCategoryId(target.value);
  }

  setManageMenuItemPrice(value: string): void {
    this.manageMenuItemPrice = value;
    setState('ui.menuManagement.input.manageMenuItem.price', value);
    this.requestUpdate();
  }

  handleManageMenuItemPriceChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setManageMenuItemPrice(target.value);
  }

  setManageMenuItemItemType(value: string): void {
    this.manageMenuItemItemType = value;
    setState('ui.menuManagement.input.manageMenuItem.itemType', value);
    this.requestUpdate();
  }

  handleManageMenuItemItemTypeChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setManageMenuItemItemType(target.value);
  }

  setManageMenuItemStatus(value: string): void {
    this.manageMenuItemStatus = value;
    setState('ui.menuManagement.input.manageMenuItem.status', value);
    this.requestUpdate();
  }

  handleManageMenuItemStatusChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setManageMenuItemStatus(target.value);
  }
}
