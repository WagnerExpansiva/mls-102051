/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page11--shift-management-102051')
export class CafeFlowDesktopPage11ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['shiftManagement.section.openShift.title']}
          </h1>

          ${this.renderOpenShiftSection()}
          ${this.renderCloseShiftSection()}
          ${this.renderReportCardsSection()}
          ${this.renderReportSummarySection()}
        </div>
      </div>
    `;
  }

  private renderOpenShiftSection() {
    return html`
      <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-6 space-y-4">
        <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['shiftManagement.section.openShift.title']}
        </h2>
        <div class="space-y-3">
          <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
            ${this.msg['shiftManagement.organism.openShift.title']}
          </p>
          <div>
            <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">
              ${this.msg['shiftManagement.field.notes.label']}
            </label>
            <textarea
              class="w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
              rows="3"
              .value="${this.openShiftNotes}"
              @input="${(e: Event) => this.handleOpenShiftNotesChange(e)}"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              class="rounded px-4 py-2 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
              ?disabled="${this.openShiftState === 'loading'}"
              @click="${() => this.handleOpenShiftClick()}"
            >
              ${this.openShiftState === 'loading' ? '...' : this.msg['shiftManagement.action.openShift.label']}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  private renderCloseShiftSection() {
    return html`
      <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-6 space-y-4">
        <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['shiftManagement.section.closeShift.title']}
        </h2>
        <div class="space-y-3">
          <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
            ${this.msg['shiftManagement.organism.closeShift.title']}
          </p>
          <div>
            <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">
              ${this.msg['shiftManagement.field.totalApurado.label']}
              <span class="text-[var(--error-color,#FF4D4F)]">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              class="w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
              .value="${this.closeShiftTotalApurado}"
              @input="${(e: Event) => this.handleCloseShiftTotalApuradoChange(e)}"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">
              ${this.msg['shiftManagement.field.notes.label']}
            </label>
            <textarea
              class="w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
              rows="3"
              .value="${this.closeShiftNotes}"
              @input="${(e: Event) => this.handleCloseShiftNotesChange(e)}"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              class="rounded px-4 py-2 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
              ?disabled="${this.closeShiftState === 'loading'}"
              @click="${() => this.handleCloseShiftClick()}"
            >
              ${this.closeShiftState === 'loading' ? '...' : this.msg['shiftManagement.action.closeShift.label']}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  private renderReportCardsSection() {
    const data = this.viewShiftClosingReportData;
    return html`
      <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['shiftManagement.section.reports.title']}
          </h2>
          <button
            class="rounded px-3 py-1.5 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
            ?disabled="${this.viewShiftClosingReportState === 'loading'}"
            @click="${() => this.handleViewShiftClosingReportClick()}"
          >
            ${this.viewShiftClosingReportState === 'loading' ? '...' : this.msg['shiftManagement.action.viewShiftClosingReport.label']}
          </button>
        </div>
        <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
          ${this.msg['shiftManagement.organism.reports.title']}
        </p>
        ${data
          ? html`
              <div class="rounded border border-[var(--grey-color,#E6E6E6)] p-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.shiftId.label']}</span>
                  <span class="text-[var(--text-primary-color,#403f3f)] font-medium">${data.shiftId}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.totalApurado.label']}</span>
                  <span class="text-[var(--text-primary-color,#403f3f)] font-medium">${data.totalApurado.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.paidOrderCount.label']}</span>
                  <span class="text-[var(--text-primary-color,#403f3f)] font-medium">${data.paidOrderCount}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.createdAt.label']}</span>
                  <span class="text-[var(--text-primary-color,#403f3f)] font-medium">${data.createdAt}</span>
                </div>
                <div class="flex justify-end pt-2">
                  <button
                    class="rounded px-3 py-1.5 text-sm font-medium text-[var(--active-color,#1890FF)] border border-[var(--active-color,#1890FF)] hover:bg-[var(--bg-secondary-color-lighter,#F9F9F9)]"
                    @click="${() => this.handleViewShiftClosingReportClick()}"
                  >
                    ${this.msg['shiftManagement.action.viewShiftClosingReport.label']}
                  </button>
                </div>
              </div>
            `
          : html`
              <div class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4 text-center">
                ${this.msg['shiftManagement.intention.reports.title']}
              </div>
            `}
      </section>
    `;
  }

  private renderReportSummarySection() {
    const data = this.viewShiftClosingReportData;
    return html`
      <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] p-6 space-y-4">
        <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['shiftManagement.section.summary.title']}
        </h2>
        <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
          ${this.msg['shiftManagement.organism.summary.title']}
        </p>
        ${data
          ? html`
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.shiftClosingReportId.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#403f3f)] font-medium">${data.shiftClosingReportId}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.shiftId.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#403f3f)] font-medium">${data.shiftId}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.totalApurado.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#403f3f)] font-medium">${data.totalApurado.toFixed(2)}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.paidOrderCount.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#403f3f)] font-medium">${data.paidOrderCount}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.createdAt.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#403f3f)] font-medium">${data.createdAt}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['shiftManagement.field.updatedAt.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#403f3f)] font-medium">${data.updatedAt}</dd>
                </div>
              </dl>
            `
          : html`
              <div class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4 text-center">
                ${this.msg['shiftManagement.intention.summary.title']}
              </div>
            `}
      </section>
    `;
  }
}
