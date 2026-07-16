/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page31--shift-management-102051')
export class CafeFlowDesktopPage31ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold">${this.msg['page.shiftManagement.title']}</h1>

          <!-- Section: Discover – Relatório de fechamento -->
          <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold">${this.msg['sec.discover.title']}</h2>
            <h3 class="text-base font-medium text-[var(--text-primary-color-lighter,#535353)]">${this.msg['organism.report.title']}</h3>

            <!-- Filter + toolbar -->
            <div class="flex flex-wrap items-end gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.shiftId.label']}</label>
                <input
                  type="text"
                  .value="${this.viewShiftClosingReportShiftId}"
                  @input="${this.handleViewShiftClosingReportShiftIdChange}"
                  class="rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                />
              </div>
              <button
                @click="${this.handleViewShiftClosingReportClick}"
                ?disabled="${this.viewShiftClosingReportState === 'loading'}"
                class="rounded border border-[var(--grey-color-dark,#D3D3D3)] px-4 py-2 text-sm bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color-hover,#d9d9d9)] disabled:opacity-50"
              >
                ${this.viewShiftClosingReportState === 'loading' ? '...' : this.msg['action.viewShiftClosingReport.label']}
              </button>
            </div>

            <!-- Report detail (outputShape: object) -->
            ${this.viewShiftClosingReportState === 'loading' ? html`
              <div class="animate-pulse space-y-2">
                <div class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded w-3/4"></div>
                <div class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded w-1/2"></div>
                <div class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded w-2/3"></div>
              </div>
            ` : this.viewShiftClosingReportData ? html`
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.shiftClosingReportId.label']}</dt>
                  <dd class="font-medium">${this.viewShiftClosingReportData.shiftClosingReportId}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.shiftId.label']}</dt>
                  <dd class="font-medium">${this.viewShiftClosingReportData.shiftId}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.totalApurado.label']}</dt>
                  <dd class="font-medium">${this.viewShiftClosingReportData.totalApurado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.paidOrderCount.label']}</dt>
                  <dd class="font-medium">${this.viewShiftClosingReportData.paidOrderCount}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.createdAt.label']}</dt>
                  <dd class="font-medium">${this.viewShiftClosingReportData.createdAt}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.updatedAt.label']}</dt>
                  <dd class="font-medium">${this.viewShiftClosingReportData.updatedAt}</dd>
                </div>
              </dl>
            ` : html`
              <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]"><!-- TODO: empty.report key missing from shared i18n -->Nenhum relatório de fechamento disponível</p>
            `}
          </section>

          <!-- Section: Execute – Ações do turno -->
          <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold">${this.msg['sec.execute.title']}</h2>

            <!-- Open Shift form -->
            <div class="space-y-3">
              <h3 class="text-base font-medium">${this.msg['organism.openShift.title']}</h3>
              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.notes.label']}</label>
                <textarea
                  .value="${this.openShiftNotes}"
                  @input="${this.handleOpenShiftNotesChange}"
                  rows="3"
                  class="rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                ></textarea>
              </div>
              <button
                @click="${this.handleOpenShiftClick}"
                ?disabled="${this.openShiftState === 'loading'}"
                class="rounded px-4 py-2 text-sm font-medium bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
              >
                ${this.openShiftState === 'loading' ? '...' : this.msg['action.openShift.label']}
              </button>
              ${this.openShiftState === 'success' ? html`
                <div class="rounded border border-[var(--success-color,#52C41A)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['action.openShift.success']}
                </div>
              ` : ''}
              ${this.openShiftState === 'error' ? html`
                <div class="rounded border border-[var(--error-color,#FF4D4F)] px-3 py-2 text-sm text-[var(--error-color,#FF4D4F)]">
                  ${this.openShiftError || this.msg['action.openShift.error']}
                </div>
              ` : ''}
              ${this.openShiftOutput === null && this.openShiftState === 'idle' ? html`
                <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">${this.msg['empty.openShift']}</p>
              ` : ''}
            </div>

            <!-- Close Shift form -->
            <div class="space-y-3 border-t border-[var(--grey-color,#E6E6E6)] pt-3">
              <h3 class="text-base font-medium">${this.msg['organism.closeShift.title']}</h3>
              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.totalApurado.label']}</label>
                <input
                  type="number"
                  .value="${this.closeShiftTotalApurado}"
                  @input="${this.handleCloseShiftTotalApuradoChange}"
                  class="rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-sm text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.notes.label']}</label>
                <textarea
                  .value="${this.closeShiftNotes}"
                  @input="${this.handleCloseShiftNotesChange}"
                  rows="3"
                  class="rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)]"
                ></textarea>
              </div>
              <button
                @click="${this.handleCloseShiftClick}"
                ?disabled="${this.closeShiftState === 'loading'}"
                class="rounded px-4 py-2 text-sm font-medium bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
              >
                ${this.closeShiftState === 'loading' ? '...' : this.msg['action.closeShift.label']}
              </button>
              ${this.closeShiftState === 'success' ? html`
                <div class="rounded border border-[var(--success-color,#52C41A)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['action.closeShift.success']}
                </div>
              ` : ''}
              ${this.closeShiftState === 'error' ? html`
                <div class="rounded border border-[var(--error-color,#FF4D4F)] px-3 py-2 text-sm text-[var(--error-color,#FF4D4F)]">
                  ${this.closeShiftError || this.msg['action.closeShift.error']}
                </div>
              ` : ''}
              ${this.closeShiftOutput === null && this.closeShiftState === 'idle' ? html`
                <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">${this.msg['empty.closeShift']}</p>
              ` : ''}
            </div>
          </section>

          <!-- Section: Review – Resumo do turno -->
          <section class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold">${this.msg['sec.review.title']}</h2>
            <h3 class="text-base font-medium">${this.msg['organism.summary.title']}</h3>

            ${this.openShiftOutput ? html`
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.shiftId.label']}</dt>
                  <dd class="font-medium">${this.openShiftOutput.shiftId}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.status.label']}</dt>
                  <dd class="font-medium">${this.openShiftOutput.status}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.openedAt.label']}</dt>
                  <dd class="font-medium">${this.openShiftOutput.openedAt}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.openedBy.label']}</dt>
                  <dd class="font-medium">${this.openShiftOutput.openedBy}</dd>
                </div>
              </dl>
            ` : html`
              <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">${this.msg['empty.summary']}</p>
            `}

            ${this.closeShiftOutput ? html`
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-t border-[var(--grey-color,#E6E6E6)] pt-3">
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.status.label']}</dt>
                  <dd class="font-medium">${this.closeShiftOutput.status}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.closedAt.label']}</dt>
                  <dd class="font-medium">${this.closeShiftOutput.closedAt}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.closedBy.label']}</dt>
                  <dd class="font-medium">${this.closeShiftOutput.closedBy}</dd>
                </div>
                <div class="flex flex-col gap-1">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.totalApurado.label']}</dt>
                  <dd class="font-medium">${this.closeShiftOutput.totalApurado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</dd>
                </div>
                <div class="flex flex-col gap-1 sm:col-span-2">
                  <dt class="text-[var(--text-primary-color-lighter,#535353)]">${this.msg['field.notes.label']}</dt>
                  <dd class="font-medium">${this.closeShiftOutput.notes}</dd>
                </div>
              </dl>
            ` : ''}
          </section>
        </div>
      </div>
    `;
  }
}
