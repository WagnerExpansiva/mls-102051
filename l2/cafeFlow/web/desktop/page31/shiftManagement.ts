/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page31--shift-management-102051')
export class CafeFlowDesktopPage31ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Discover – Shift Closing Report -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['sec.discover.title']}
            </h2>

            <div class="space-y-3">
              <h3
                class="text-base font-medium text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['organism.report.title']}
              </h3>

              <!-- Filter: shiftId (route param) + refresh -->
              <div class="flex flex-wrap items-end gap-2">
                <label class="flex flex-col gap-1 text-sm">
                  <span
                    class="text-[var(--text-primary-color,#0f172a)]"
                    >${this.msg['field.shiftId.label']}</span
                  >
                  <input
                    type="text"
                    .value="${this.viewShiftClosingReportShiftId}"
                    @input="${(e: Event) =>
                      this.handleViewShiftClosingReportShiftIdChange(e)}"
                    class="rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                  />
                </label>
                <button
                  type="button"
                  @click="${(e: Event) =>
                    this.handleViewShiftClosingReportClick(e)}"
                  ?disabled="${this.viewShiftClosingReportState === 'loading'}"
                  class="rounded border border-[var(--grey-color,#e2e8f0)] px-4 py-2 text-sm font-medium text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-secondary-color,#f8fafc)] hover:bg-[var(--bg-secondary-color-hover,#f1f5f9)] disabled:opacity-50"
                >
                  ${this.viewShiftClosingReportState === 'loading'
                    ? '...'
                    : this.msg['action.viewShiftClosingReport.label']}
                </button>
              </div>

              ${this.viewShiftClosingReportState === 'loading'
                ? html`
                    <div class="space-y-2 animate-pulse">
                      <div
                        class="h-4 bg-[var(--grey-color,#e2e8f0)] rounded w-3/4"
                      ></div>
                      <div
                        class="h-4 bg-[var(--grey-color,#e2e8f0)] rounded w-1/2"
                      ></div>
                      <div
                        class="h-4 bg-[var(--grey-color,#e2e8f0)] rounded w-2/3"
                      ></div>
                    </div>
                  `
                : this.viewShiftClosingReportData
                  ? html`
                      <dl
                        class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"
                      >
                        <div class="flex flex-col gap-1">
                          <dt
                            class="text-[var(--text-primary-color-lighter,#64748b)]"
                          >
                            ${this.msg['field.shiftClosingReportId.label']}
                          </dt>
                          <dd
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.viewShiftClosingReportData
                              .shiftClosingReportId}
                          </dd>
                        </div>
                        <div class="flex flex-col gap-1">
                          <dt
                            class="text-[var(--text-primary-color-lighter,#64748b)]"
                          >
                            ${this.msg['field.shiftId.label']}
                          </dt>
                          <dd
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.viewShiftClosingReportData.shiftId}
                          </dd>
                        </div>
                        <div class="flex flex-col gap-1">
                          <dt
                            class="text-[var(--text-primary-color-lighter,#64748b)]"
                          >
                            ${this.msg['field.totalApurado.label']}
                          </dt>
                          <dd
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.viewShiftClosingReportData.totalApurado.toLocaleString(
                              'pt-BR',
                              { style: 'currency', currency: 'BRL' }
                            )}
                          </dd>
                        </div>
                        <div class="flex flex-col gap-1">
                          <dt
                            class="text-[var(--text-primary-color-lighter,#64748b)]"
                          >
                            ${this.msg['field.paidOrderCount.label']}
                          </dt>
                          <dd
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.viewShiftClosingReportData.paidOrderCount}
                          </dd>
                        </div>
                        <div class="flex flex-col gap-1">
                          <dt
                            class="text-[var(--text-primary-color-lighter,#64748b)]"
                          >
                            ${this.msg['field.createdAt.label']}
                          </dt>
                          <dd
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.viewShiftClosingReportData.createdAt}
                          </dd>
                        </div>
                        <div class="flex flex-col gap-1">
                          <dt
                            class="text-[var(--text-primary-color-lighter,#64748b)]"
                          >
                            ${this.msg['field.updatedAt.label']}
                          </dt>
                          <dd
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.viewShiftClosingReportData.updatedAt}
                          </dd>
                        </div>
                      </dl>
                    `
                  : html`
                      <p
                        class="text-sm text-[var(--text-primary-color-lighter,#64748b)]"
                      >
                        ${this.msg['empty.report']}
                      </p>
                    `}
            </div>
          </section>

          <!-- Section: Execute – Shift Lifecycle Actions -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['sec.execute.title']}
            </h2>

            <!-- Open Shift Form -->
            <div class="space-y-3">
              <h3
                class="text-base font-medium text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['organism.openShift.title']}
              </h3>
              <form
                @submit="${(e: Event) => this.handleOpenShiftClick(e)}"
                class="space-y-3"
              >
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-primary-color,#0f172a)]"
                    >${this.msg['field.notes.label']}</span
                  >
                  <textarea
                    .value="${this.openShiftNotes}"
                    @input="${(e: Event) =>
                      this.handleOpenShiftNotesChange(e)}"
                    rows="3"
                    class="rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                  ></textarea>
                </label>
                <button
                  type="submit"
                  ?disabled="${this.openShiftState === 'loading'}"
                  class="rounded px-4 py-2 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                >
                  ${this.openShiftState === 'loading'
                    ? '...'
                    : this.msg['action.openShift.label']}
                </button>
              </form>
              ${this.openShiftState === 'success'
                ? html`
                    <p
                      class="text-sm text-[var(--success-color,#52C41A)]"
                    >
                      ${this.msg['action.openShift.success']}
                    </p>
                  `
                : ''}
              ${this.openShiftState === 'error'
                ? html`
                    <p
                      class="text-sm text-[var(--error-color,#FF4D4F)]"
                    >
                      ${this.openShiftError ||
                      this.msg['action.openShift.error']}
                    </p>
                  `
                : ''}
            </div>

            <!-- Close Shift Form -->
            <div class="space-y-3">
              <h3
                class="text-base font-medium text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['organism.closeShift.title']}
              </h3>
              <form
                @submit="${(e: Event) => this.handleCloseShiftClick(e)}"
                class="space-y-3"
              >
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-primary-color,#0f172a)]"
                    >${this.msg['field.totalApurado.label']} *</span
                  >
                  <input
                    type="number"
                    step="0.01"
                    .value="${this.closeShiftTotalApurado}"
                    @input="${(e: Event) =>
                      this.handleCloseShiftTotalApuradoChange(e)}"
                    class="rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-primary-color,#0f172a)]"
                    >${this.msg['field.notes.label']}</span
                  >
                  <textarea
                    .value="${this.closeShiftNotes}"
                    @input="${(e: Event) =>
                      this.handleCloseShiftNotesChange(e)}"
                    rows="3"
                    class="rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                  ></textarea>
                </label>
                <button
                  type="submit"
                  ?disabled="${this.closeShiftState === 'loading'}"
                  class="rounded px-4 py-2 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                >
                  ${this.closeShiftState === 'loading'
                    ? '...'
                    : this.msg['action.closeShift.label']}
                </button>
              </form>
              ${this.closeShiftState === 'success'
                ? html`
                    <p
                      class="text-sm text-[var(--success-color,#52C41A)]"
                    >
                      ${this.msg['action.closeShift.success']}
                    </p>
                  `
                : ''}
              ${this.closeShiftState === 'error'
                ? html`
                    <p
                      class="text-sm text-[var(--error-color,#FF4D4F)]"
                    >
                      ${this.closeShiftError ||
                      this.msg['action.closeShift.error']}
                    </p>
                  `
                : ''}
            </div>
          </section>

          <!-- Section: Review – Summary -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['sec.review.title']}
            </h2>

            <!-- Summary: Open Shift -->
            <div class="space-y-3">
              <h3
                class="text-base font-medium text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['organism.summary.title']}
              </h3>
              ${this.openShiftOutput
                ? html`
                    <dl
                      class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"
                    >
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['field.shiftId.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${this.openShiftOutput.shiftId}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['field.status.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${this.openShiftOutput.status}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['field.openedAt.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${this.openShiftOutput.openedAt}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['field.openedBy.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${this.openShiftOutput.openedBy}
                        </dd>
                      </div>
                    </dl>
                  `
                : html`
                    <p
                      class="text-sm text-[var(--text-primary-color-lighter,#64748b)]"
                    >
                      ${this.msg['empty.summary']}
                    </p>
                  `}
            </div>

            <!-- Summary: Close Shift (title skipped – same msg as above) -->
            <div class="space-y-3">
              ${this.closeShiftOutput
                ? html`
                    <dl
                      class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"
                    >
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['field.status.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${this.closeShiftOutput.status}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['field.closedAt.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${this.closeShiftOutput.closedAt}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['field.closedBy.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${this.closeShiftOutput.closedBy}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['field.totalApurado.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${this.closeShiftOutput.totalApurado.toLocaleString(
                            'pt-BR',
                            { style: 'currency', currency: 'BRL' }
                          )}
                        </dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt
                          class="text-[var(--text-primary-color-lighter,#64748b)]"
                        >
                          ${this.msg['field.notes.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${this.closeShiftOutput.notes}
                        </dd>
                      </div>
                    </dl>
                  `
                : html`
                    <p
                      class="text-sm text-[var(--text-primary-color-lighter,#64748b)]"
                    >
                      ${this.msg['empty.summary']}
                    </p>
                  `}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
