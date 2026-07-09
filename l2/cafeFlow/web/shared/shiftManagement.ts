/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  CafeFlowOpenShiftInput,
  CafeFlowOpenShiftOutput,
  CafeFlowCloseShiftInput,
  CafeFlowCloseShiftOutput,
  CafeFlowViewShiftClosingReportOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/shiftManagement.js';

/// **collab_i18n_start**
const message_pt = {
  "shiftManagement.section.openShift.title": "Abertura do turno",
  "shiftManagement.section.closeShift.title": "Fechamento do turno",
  "shiftManagement.section.reports.title": "Relatórios de fechamento",
  "shiftManagement.section.summary.title": "Resumo do fechamento",
  "shiftManagement.organism.openShift.title": "Abrir turno diário",
  "shiftManagement.organism.closeShift.title": "Fechar turno diário",
  "shiftManagement.organism.reports.title": "Relatórios de fechamento",
  "shiftManagement.organism.summary.title": "Resumo do relatório",
  "shiftManagement.intention.openShift.title": "Abrir turno",
  "shiftManagement.intention.closeShift.title": "Fechar turno",
  "shiftManagement.intention.reports.title": "Relatórios de fechamento",
  "shiftManagement.intention.summary.title": "Resumo do fechamento",
  "shiftManagement.field.notes.label": "Observações",
  "shiftManagement.field.totalApurado.label": "Total apurado",
  "shiftManagement.field.shiftId.label": "Turno",
  "shiftManagement.field.paidOrderCount.label": "Pedidos pagos",
  "shiftManagement.field.createdAt.label": "Criado em",
  "shiftManagement.field.updatedAt.label": "Atualizado em",
  "shiftManagement.field.shiftClosingReportId.label": "Relatório",
  "shiftManagement.action.openShift.label": "Abrir turno",
  "shiftManagement.action.closeShift.label": "Fechar turno",
  "shiftManagement.action.viewShiftClosingReport.label": "Ver relatório",
  "shiftManagement.section.board.title": "Turnos por status",
  "shiftManagement.section.actions.title": "Ações rápidas",
  "shiftManagement.organism.board.title": "Quadro de turnos",
  "shiftManagement.intention.board.title": "Turnos por status",
  "shiftManagement.field.status.label": "Status",
  "shiftManagement.field.openedAt.label": "Abertura",
  "shiftManagement.field.closedAt.label": "Fechamento",
  "shiftManagement.section.queue.title": "Fila de turnos",
  "shiftManagement.organism.queue.title": "Fila de turnos",
  "shiftManagement.intention.queue.title": "Turnos na fila"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

type ActionStatus = "idle" | "loading" | "success" | "error";

export class CafeFlowShiftManagementBase extends CollabLitElement {
  @property({ type: String }) status: string = "";

  @property({ type: String }) openShiftState: ActionStatus = "idle";
  @property({ type: String }) openShiftNotes: string = "";

  @property({ type: String }) closeShiftState: ActionStatus = "idle";
  @property({ type: String }) closeShiftTotalApurado: string = "";
  @property({ type: String }) closeShiftNotes: string = "";

  @property({ type: String }) viewShiftClosingReportState: ActionStatus = "idle";
  @property({ type: Object }) viewShiftClosingReportData: CafeFlowViewShiftClosingReportOutput | null = null;

  @property({ type: Object }) OutputOpenShift: CafeFlowOpenShiftOutput | null = null;
  @property({ type: Object }) OutputCloseShift: CafeFlowCloseShiftOutput | null = null;

  @property({ type: String }) LayoutColBoardStatus: string = "";
  @property({ type: String }) LayoutColBoardOpened: string = "";
  @property({ type: String }) LayoutColBoardClosed: string = "";
  @property({ type: String }) LayoutColQueueStatus: string = "";
  @property({ type: String }) LayoutColQueueOpened: string = "";
  @property({ type: String }) LayoutColQueueClosed: string = "";

  private subscribedKeys: string[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.status = (getState("ui.shiftManagement.status") as string) ?? "";
    this.openShiftState = (getState("ui.shiftManagement.action.openShift.status") as ActionStatus) ?? "idle";
    this.openShiftNotes = (getState("ui.shiftManagement.input.openShift.notes") as string) ?? "";
    this.closeShiftState = (getState("ui.shiftManagement.action.closeShift.status") as ActionStatus) ?? "idle";
    this.closeShiftTotalApurado = (getState("ui.shiftManagement.input.closeShift.totalApurado") as string) ?? "";
    this.closeShiftNotes = (getState("ui.shiftManagement.input.closeShift.notes") as string) ?? "";
    this.viewShiftClosingReportState = (getState("ui.shiftManagement.action.viewShiftClosingReport.status") as ActionStatus) ?? "idle";
    this.viewShiftClosingReportData = (getState("ui.shiftManagement.data.viewShiftClosingReport") as CafeFlowViewShiftClosingReportOutput | null) ?? null;
    this.OutputOpenShift = (getState("ui.shiftManagement.output.openShift") as CafeFlowOpenShiftOutput | null) ?? null;
    this.OutputCloseShift = (getState("ui.shiftManagement.output.closeShift") as CafeFlowCloseShiftOutput | null) ?? null;
    this.LayoutColBoardStatus = (getState("ui.shiftManagement.layout.col-board-status") as string) ?? "";
    this.LayoutColBoardOpened = (getState("ui.shiftManagement.layout.col-board-opened") as string) ?? "";
    this.LayoutColBoardClosed = (getState("ui.shiftManagement.layout.col-board-closed") as string) ?? "";
    this.LayoutColQueueStatus = (getState("ui.shiftManagement.layout.col-queue-status") as string) ?? "";
    this.LayoutColQueueOpened = (getState("ui.shiftManagement.layout.col-queue-opened") as string) ?? "";
    this.LayoutColQueueClosed = (getState("ui.shiftManagement.layout.col-queue-closed") as string) ?? "";

    const sharedKeys = [
      "ui.shiftManagement.status",
      "ui.shiftManagement.action.openShift.status",
      "ui.shiftManagement.input.openShift.notes",
      "ui.shiftManagement.action.closeShift.status",
      "ui.shiftManagement.input.closeShift.totalApurado",
      "ui.shiftManagement.input.closeShift.notes",
      "ui.shiftManagement.action.viewShiftClosingReport.status",
      "ui.shiftManagement.data.viewShiftClosingReport",
      "ui.shiftManagement.output.openShift",
      "ui.shiftManagement.output.closeShift",
    ];
    subscribe(sharedKeys, this);
    this.subscribedKeys = sharedKeys;

    this.loadViewShiftClosingReport();
  }

  disconnectedCallback(): void {
    if (this.subscribedKeys.length > 0) {
      unsubscribe(this.subscribedKeys, this);
      this.subscribedKeys = [];
    }
    super.disconnectedCallback();
  }

  // --- State setters ---

  setOpenShiftNotes(value: string): void {
    this.openShiftNotes = value;
    setState("ui.shiftManagement.input.openShift.notes", value);
    this.requestUpdate();
  }

  handleOpenShiftNotesChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setOpenShiftNotes(target.value ?? "");
  }

  setCloseShiftTotalApurado(value: string): void {
    this.closeShiftTotalApurado = value;
    setState("ui.shiftManagement.input.closeShift.totalApurado", value);
    this.requestUpdate();
  }

  handleCloseShiftTotalApuradoChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setCloseShiftTotalApurado(target.value ?? "");
  }

  setCloseShiftNotes(value: string): void {
    this.closeShiftNotes = value;
    setState("ui.shiftManagement.input.closeShift.notes", value);
    this.requestUpdate();
  }

  handleCloseShiftNotesChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setCloseShiftNotes(target.value ?? "");
  }

  // --- Query action: viewShiftClosingReport ---

  async loadViewShiftClosingReport(): Promise<void> {
    this.viewShiftClosingReportState = "loading";
    setState("ui.shiftManagement.action.viewShiftClosingReport.status", "loading");

    const options: BffClientOptions = { mode: "silent" };
    const response = await execBff<CafeFlowViewShiftClosingReportOutput>(
      "cafeFlow.shiftLifecycle.viewShiftClosingReport",
      {},
      options
    );

    if (response.ok) {
      const data = response.data ?? null;
      this.viewShiftClosingReportData = data;
      setState("ui.shiftManagement.data.viewShiftClosingReport", data);
      this.viewShiftClosingReportState = "success";
      setState("ui.shiftManagement.action.viewShiftClosingReport.status", "success");
    } else {
      this.viewShiftClosingReportData = null;
      setState("ui.shiftManagement.data.viewShiftClosingReport", null);
      this.viewShiftClosingReportState = "error";
      setState("ui.shiftManagement.action.viewShiftClosingReport.status", "error");
      console.error("[shiftManagement] viewShiftClosingReport error:", response.error);
    }
    this.requestUpdate();
  }

  handleViewShiftClosingReportClick(): void {
    this.loadViewShiftClosingReport();
  }

  // --- Command action: openShift ---

  async openShift(): Promise<void> {
    this.openShiftState = "loading";
    setState("ui.shiftManagement.action.openShift.status", "loading");

    const params: CafeFlowOpenShiftInput = {
      notes: this.openShiftNotes || undefined,
    };

    const response = await execBff<CafeFlowOpenShiftOutput>(
      "cafeFlow.shiftLifecycle.openShift",
      params,
      { mode: "blocking" }
    );

    if (response.ok) {
      const data = response.data ?? null;
      this.OutputOpenShift = data;
      setState("ui.shiftManagement.output.openShift", data);

      // Refresh: viewShiftClosingReport
      try {
        await this.loadViewShiftClosingReport();
        if (this.viewShiftClosingReportState === "error") {
          this.openShiftState = "error";
          setState("ui.shiftManagement.action.openShift.status", "error");
        } else {
          this.openShiftState = "success";
          setState("ui.shiftManagement.action.openShift.status", "success");
        }
      } catch {
        this.openShiftState = "error";
        setState("ui.shiftManagement.action.openShift.status", "error");
      }
    } else {
      this.openShiftState = "error";
      setState("ui.shiftManagement.action.openShift.status", "error");
      console.error("[shiftManagement] openShift error:", response.error);
    }
    this.requestUpdate();
  }

  handleOpenShiftClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.openShift();
    }, { mode: "blocking" });
  }

  // --- Command action: closeShift ---

  async closeShift(): Promise<void> {
    this.closeShiftState = "loading";
    setState("ui.shiftManagement.action.closeShift.status", "loading");

    const totalApuradoNum = parseFloat(this.closeShiftTotalApurado);
    const params: CafeFlowCloseShiftInput = {
      totalApurado: isNaN(totalApuradoNum) ? 0 : totalApuradoNum,
      notes: this.closeShiftNotes || undefined,
    };

    const response = await execBff<CafeFlowCloseShiftOutput>(
      "cafeFlow.shiftLifecycle.closeShift",
      params,
      { mode: "blocking" }
    );

    if (response.ok) {
      const data = response.data ?? null;
      this.OutputCloseShift = data;
      setState("ui.shiftManagement.output.closeShift", data);

      // Refresh: viewShiftClosingReport
      try {
        await this.loadViewShiftClosingReport();
        if (this.viewShiftClosingReportState === "error") {
          this.closeShiftState = "error";
          setState("ui.shiftManagement.action.closeShift.status", "error");
        } else {
          this.closeShiftState = "success";
          setState("ui.shiftManagement.action.closeShift.status", "success");
        }
      } catch {
        this.closeShiftState = "error";
        setState("ui.shiftManagement.action.closeShift.status", "error");
      }
    } else {
      this.closeShiftState = "error";
      setState("ui.shiftManagement.action.closeShift.status", "error");
      console.error("[shiftManagement] closeShift error:", response.error);
    }
    this.requestUpdate();
  }

  handleCloseShiftClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.closeShift();
    }, { mode: "blocking" });
  }
}
