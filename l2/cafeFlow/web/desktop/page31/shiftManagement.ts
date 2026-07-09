/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page31--shift-management-102051')
export class CafeFlowDesktopPage31ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <div>
            <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
              <!-- TODO: no page-title msg key in shared i18n; using literal -->
              Gestão de turno diário
            </h1>
          </div>

          ${this.renderQueueSection()}
          ${this.renderActionsSection()}
          ${this.renderSummarySection()}
        </div>
      </div>
    `;
  }

  private renderQueueSection() {
    const data = this.viewShiftClosingReportData;
    return html`
      <section
        class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['shiftManagement.section.queue.title']}
          </h2>
          <button
            type="button"
            class="px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
            ?disabled=${this.viewShiftClosingReportState === 'loading'}
            @click=${() => this.handleViewShiftClosingReportClick()}
          >
            ${this.msg['shiftManagement.action.viewShiftClosingReport.label']}
          </button>
        </div>

        <div>
          <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-2">
            ${this.msg['shiftManagement.organism.queue.title']}
          </h3>

          ${data
            ? html`
                <div class="overflow-x-auto">
                  <table class="w-full text-sm border-collapse">
                    <thead>
                      <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${this.msg['shiftManagement.field.shiftId.label']}
                        </th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${this.msg['shiftManagement.field.status.label']}
                        </th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${this.msg['shiftManagement.field.openedAt.label']}
                        </th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${this.msg['shiftManagement.field.closedAt.label']}
                        </th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${this.msg['shiftManagement.field.totalApurado.label']}
                        </th>
                        <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${this.msg['shiftManagement.action.viewShiftClosingReport.label']}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${data.shiftId ?? '—'}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${this.LayoutColQueueStatus || '—'}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${this.LayoutColQueueOpened || '—'}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${this.LayoutColQueueClosed || '—'}</td>
                        <td class="py-2 px-3 text-[var(--text-primary-color,#403f3f)]">${data.totalApurado ?? '—'}</td>
                        <td class="py-2 px-3">
                          <button
                            type="button"
                            class="text-sm text-[var(--link-color,#1890FF)] hover:underline"
                            @click=${() => this.handleViewShiftClosingReportClick()}
                          >
                            ${this.msg['shiftManagement.action.viewShiftClosingReport.label']}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              `
            : html`
                <p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4">
                  ${this.viewShiftClosingReportState === 'loading' ? '…' : '—'}
                </p>
              `}
        </div>
      </section>
    `;
  }

  private renderActionsSection() {
    return html`
      <section
        class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-6"
      >
        <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['shiftManagement.section.actions.title']}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${this.renderOpenShiftForm()}
          ${this.renderCloseShiftForm()}
        </div>
      </section>
    `;
  }

  private renderOpenShiftForm() {
    return html`
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['shiftManagement.organism.openShift.title']}
        </h3>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
            for="open-shift-notes"
          >
            ${this.msg['shiftManagement.field.notes.label']}
          </label>
          <textarea
            id="open-shift-notes"
            class="w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
            rows="3"
            .value=${this.openShiftNotes}
            @input=${(e: Event) => this.handleOpenShiftNotesChange(e)}
          ></textarea>
        </div>

        <button
          type="button"
          class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
          ?disabled=${this.openShiftState === 'loading'}
          @click=${() => this.handleOpenShiftClick()}
        >
          ${this.openShiftState === 'loading' ? '…' : this.msg['shiftManagement.action.openShift.label']}
        </button>
      </div>
    `;
  }

  private renderCloseShiftForm() {
    return html`
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['shiftManagement.organism.closeShift.title']}
        </h3>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
            for="close-shift-total"
          >
            ${this.msg['shiftManagement.field.totalApurado.label']}
            <span class="text-[var(--error-color,#FF4D4F)]">*</span>
          </label>
          <input
            id="close-shift-total"
            type="number"
            step="0.01"
            class="w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
            .value=${this.closeShiftTotalApurado}
            @input=${(e: Event) => this.handleCloseShiftTotalApuradoChange(e)}
          />
        </div>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
            for="close-shift-notes"
          >
            ${this.msg['shiftManagement.field.notes.label']}
          </label>
          <textarea
            id="close-shift-notes"
            class="w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
            rows="3"
            .value=${this.closeShiftNotes}
            @input=${(e: Event) => this.handleCloseShiftNotesChange(e)}
          ></textarea>
        </div>

        <button
          type="button"
          class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
          ?disabled=${this.closeShiftState === 'loading'}
          @click=${() => this.handleCloseShiftClick()}
        >
          ${this.closeShiftState === 'loading' ? '…' : this.msg['shiftManagement.action.closeShift.label']}
        </button>
      </div>
    `;
  }

  private renderSummarySection() {
    const data = this.viewShiftClosingReportData;
    return html`
      <section
        class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
      >
        <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
          ${this.msg['shiftManagement.section.summary.title']}
        </h2>

        <div>
          <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-3">
            ${this.msg['shiftManagement.organism.summary.title']}
          </h3>

          ${data
            ? html`
                <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                      ${this.msg['shiftManagement.field.shiftClosingReportId.label']}
                    </dt>
                    <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${data.shiftClosingReportId ?? '—'}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                      ${this.msg['shiftManagement.field.shiftId.label']}
                    </dt>
                    <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${data.shiftId ?? '—'}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                      ${this.msg['shiftManagement.field.totalApurado.label']}
                    </dt>
                    <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${data.totalApurado ?? '—'}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                      ${this.msg['shiftManagement.field.paidOrderCount.label']}
                    </dt>
                    <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${data.paidOrderCount ?? '—'}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                      ${this.msg['shiftManagement.field.createdAt.label']}
                    </dt>
                    <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${data.createdAt ?? '—'}</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">
                      ${this.msg['shiftManagement.field.updatedAt.label']}
                    </dt>
                    <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${data.updatedAt ?? '—'}</dd>
                  </div>
                </dl>
              `
            : html`
                <p class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4">
                  ${this.viewShiftClosingReportState === 'loading' ? '…' : '—'}
                </p>
              `}
        </div>
      </section>
    `;
  }
}
