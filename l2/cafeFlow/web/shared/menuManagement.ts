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
  CafeFlowManageMenuItemOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

/// **collab_i18n_start**
const message_pt = {
  "menuManagement.queue.title": "Fila de itens do cardápio",
  "menuManagement.queue.list.title": "Itens do cardápio",
  "menuManagement.queue.query.title": "Lista de itens",
  "menuManagement.queue.summary.title": "Resumo do item selecionado",
  "menuManagement.detail.title": "Detalhes do item",
  "menuManagement.detail.form.title": "Atualizar item do cardápio",
  "menuManagement.detail.status.title": "Status atual",
  "menuManagement.detail.edit.title": "Editar item",
  "menuManagement.detail.review.title": "Revisão das alterações",
  "menuManagement.context.title": "Empresa ativa",
  "menuManagement.menuItem.name": "Nome",
  "menuManagement.menuItem.description": "Descrição",
  "menuManagement.menuItem.menuCategoryId": "Categoria",
  "menuManagement.menuItem.price": "Preço",
  "menuManagement.menuItem.itemType": "Tipo",
  "menuManagement.menuItem.status": "Status",
  "menuManagement.menuItem.activatedAt": "Ativado em",
  "menuManagement.menuItem.inactivatedAt": "Inativado em",
  "menuManagement.menuItem.updatedAt": "Atualizado em",
  "menuManagement.filter.status": "Status",
  "menuManagement.filter.menuCategory": "Categoria",
  "menuManagement.action.refresh": "Atualizar lista",
  "menuManagement.action.manage": "Gerenciar item",
  "menuManagement.action.save": "Salvar alterações",
  "menuManagement.board.title": "Pipeline de status",
  "menuManagement.board.lanes.title": "Itens por status",
  "menuManagement.board.query.title": "Cartões do cardápio",
  "menuManagement.board.summary.title": "Resumo do cartão",
  "menuManagement.cards.title": "Cartões de itens do cardápio",
  "menuManagement.cards.list.title": "Itens do cardápio",
  "menuManagement.cards.query.title": "Cartões do cardápio",
  "menuManagement.cards.summary.title": "Resumo do cartão"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowMenuManagementBase extends CollabLitElement {

  @property({ type: String }) status: string = "";

  @property({ type: String }) browseMenuItemsState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) browseMenuItemsStatusFilter: string = "";

  @property({ type: String }) browseMenuItemsMenuCategoryIdFilter: string = "";

  @property({ type: Object }) browseMenuItemsData: CafeFlowBrowseMenuItemsOutput = { items: [], total: 0 };

  @property({ type: String }) manageMenuItemState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) manageMenuItemName: string = "";

  @property({ type: String }) manageMenuItemDescription: string = "";

  @property({ type: String }) manageMenuItemMenuCategoryId: string = "";

  @property({ type: String }) manageMenuItemPrice: string = "";

  @property({ type: String }) manageMenuItemItemType: string = "";

  @property({ type: String }) manageMenuItemStatus: string = "";

  @property({ type: String }) activeCompanyId: string = "";

  @property({ type: Object }) OutputManageMenuItem: CafeFlowManageMenuItemOutput | null = null;

  @property({ type: String }) LayoutWs20ActivatedAt: string = "";

  @property({ type: String }) LayoutWs30InactivatedAt: string = "";

  @property({ type: String }) LayoutR50UpdatedAt: string = "";

  private subscribedKeys: string[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  // ── State setters ──────────────────────────────────────────────

  setBrowseMenuItemsStatusFilter(value: string): void {
    this.browseMenuItemsStatusFilter = value;
    setState("ui.menuManagement.input.browseMenuItems.statusFilter", value);
    this.requestUpdate();
  }

  handleBrowseMenuItemsStatusFilterChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setBrowseMenuItemsStatusFilter(target.value ?? "");
  }

  setBrowseMenuItemsMenuCategoryIdFilter(value: string): void {
    this.browseMenuItemsMenuCategoryIdFilter = value;
    setState("ui.menuManagement.input.browseMenuItems.menuCategoryIdFilter", value);
    this.requestUpdate();
  }

  handleBrowseMenuItemsMenuCategoryIdFilterChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setBrowseMenuItemsMenuCategoryIdFilter(target.value ?? "");
  }

  setManageMenuItemName(value: string): void {
    this.manageMenuItemName = value;
    setState("ui.menuManagement.input.manageMenuItem.name", value);
    this.requestUpdate();
  }

  handleManageMenuItemNameChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setManageMenuItemName(target.value ?? "");
  }

  setManageMenuItemDescription(value: string): void {
    this.manageMenuItemDescription = value;
    setState("ui.menuManagement.input.manageMenuItem.description", value);
    this.requestUpdate();
  }

  handleManageMenuItemDescriptionChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setManageMenuItemDescription(target.value ?? "");
  }

  setManageMenuItemMenuCategoryId(value: string): void {
    this.manageMenuItemMenuCategoryId = value;
    setState("ui.menuManagement.input.manageMenuItem.menuCategoryId", value);
    this.requestUpdate();
  }

  handleManageMenuItemMenuCategoryIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setManageMenuItemMenuCategoryId(target.value ?? "");
  }

  setManageMenuItemPrice(value: string): void {
    this.manageMenuItemPrice = value;
    setState("ui.menuManagement.input.manageMenuItem.price", value);
    this.requestUpdate();
  }

  handleManageMenuItemPriceChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setManageMenuItemPrice(target.value ?? "");
  }

  setManageMenuItemItemType(value: string): void {
    this.manageMenuItemItemType = value;
    setState("ui.menuManagement.input.manageMenuItem.itemType", value);
    this.requestUpdate();
  }

  handleManageMenuItemItemTypeChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setManageMenuItemItemType(target.value ?? "");
  }

  setManageMenuItemStatus(value: string): void {
    this.manageMenuItemStatus = value;
    setState("ui.menuManagement.input.manageMenuItem.status", value);
    this.requestUpdate();
  }

  handleManageMenuItemStatusChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setManageMenuItemStatus(target.value ?? "");
  }

  // ── Query: browseMenuItems ─────────────────────────────────────

  async loadBrowseMenuItems(): Promise<void> {
    this.browseMenuItemsState = "loading";
    setState("ui.menuManagement.action.browseMenuItems.status", "loading");

    const params: CafeFlowBrowseMenuItemsInput = {
      statusFilter: this.browseMenuItemsStatusFilter
        ? (this.browseMenuItemsStatusFilter as "draft" | "active" | "inactive")
        : undefined,
      menuCategoryIdFilter: this.browseMenuItemsMenuCategoryIdFilter || undefined,
    };

    const options: BffClientOptions = { mode: "silent" };
    const response = await execBff<CafeFlowBrowseMenuItemsOutput>(
      "cafeFlow.menuItemLifecycle.browseMenuItems",
      params,
      options,
    );

    if (response.ok) {
      const data: CafeFlowBrowseMenuItemsOutput = response.data ?? { items: [], total: 0 };
      this.browseMenuItemsData = data;
      setState("ui.menuManagement.data.browseMenuItems", data);
      this.browseMenuItemsState = "success";
      setState("ui.menuManagement.action.browseMenuItems.status", "success");
    } else {
      this.browseMenuItemsState = "error";
      setState("ui.menuManagement.action.browseMenuItems.status", "error");
      console.error("[menuManagement] browseMenuItems failed:", response.error);
    }
  }

  handleBrowseMenuItemsClick(): void {
    this.loadBrowseMenuItems();
  }

  // ── Command: manageMenuItem ────────────────────────────────────

  async manageMenuItem(): Promise<void> {
    this.manageMenuItemState = "loading";
    setState("ui.menuManagement.action.manageMenuItem.status", "loading");

    const params: CafeFlowManageMenuItemInput = {
      name: this.manageMenuItemName,
      description: this.manageMenuItemDescription || undefined,
      menuCategoryId: this.manageMenuItemMenuCategoryId,
      price: Number(this.manageMenuItemPrice) || 0,
      itemType: this.manageMenuItemItemType as "simple" | "variant",
      status: this.manageMenuItemStatus as "draft" | "active" | "inactive",
    };

    const options: BffClientOptions = { mode: "blocking" };
    const response = await execBff<CafeFlowManageMenuItemOutput>(
      "cafeFlow.menuItemLifecycle.manageMenuItem",
      params,
      options,
    );

    if (response.ok) {
      const data: CafeFlowManageMenuItemOutput | null = response.data ?? null;
      this.OutputManageMenuItem = data;
      setState("ui.menuManagement.output.manageMenuItem", data);

      // Refresh browseMenuItems after successful command
      try {
        await this.loadBrowseMenuItems();
        this.manageMenuItemState = "success";
        setState("ui.menuManagement.action.manageMenuItem.status", "success");
      } catch {
        this.manageMenuItemState = "error";
        setState("ui.menuManagement.action.manageMenuItem.status", "error");
        console.error("[menuManagement] refresh after manageMenuItem failed");
      }
    } else {
      this.manageMenuItemState = "error";
      setState("ui.menuManagement.action.manageMenuItem.status", "error");
      console.error("[menuManagement] manageMenuItem failed:", response.error);
    }
  }

  handleManageMenuItemClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.manageMenuItem();
    }, { mode: "blocking" });
  }

  // ── Lifecycle ──────────────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize from shared state where useful
    const sharedActiveCompanyId = getState("ui.menuManagement.businessContext.activeCompanyId") as string | undefined;
    if (sharedActiveCompanyId) {
      this.activeCompanyId = sharedActiveCompanyId;
    } else {
      setState("ui.menuManagement.businessContext.activeCompanyId", this.activeCompanyId);
    }

    // Subscribe to business context
    const ctxKey = "ui.menuManagement.businessContext.activeCompanyId";
    subscribe(ctxKey, this);
    this.subscribedKeys.push(ctxKey);

    // Run initial loads
    this.loadBrowseMenuItems();
  }

  disconnectedCallback(): void {
    for (const key of this.subscribedKeys) {
      unsubscribe(key, this);
    }
    this.subscribedKeys = [];
    super.disconnectedCallback();
  }
}
