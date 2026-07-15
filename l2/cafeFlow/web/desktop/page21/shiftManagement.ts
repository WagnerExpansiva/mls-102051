/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page21--shift-management-102051')
export class CafeFlowDesktopPage21ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    const openOutput = this.openShiftOutput;
    const report = this.viewShiftClosingReportData;
    const reportLoading = this.viewShiftClosingReportState === 'loading';

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Board -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['section.board.title']}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Open lane -->
              <div
                class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color,#f8fafc)] p-3 space-y-3"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]"
                  >
                    ${this.msg['lane.open.title']}
                  </h3>
                  <button
                    class="px-3 py-1.5 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:opacity-90 disabled:opacity-50"
                    ?disabled=${this.openShiftState === 'loading'}
                    @click=${(e: Event) => this.handleOpenShiftClick(e)}
                  >
                    ${this.openShiftState === 'loading'
                      ? '...'
                      : this.msg['action.openShift.label']}
                  </button>
                </div>
                ${openOutput && openOutput.status === 'open'
                  ? html`
                      <div
                        class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-3 space-y-1 text-sm"
                      >
                        <div class="text-[var(--text-primary-color,#0f172a)]">
                          <span class="font-medium"
                            >${this.msg['field.shiftId.label']}:</span
                          >
                          ${openOutput.shiftId}
                        </div>
                        <div class="text-[var(--text-primary-color,#0f172a)]">
                          <span class="font-medium"
                            >${this.msg['field.status.label']}:</span
                          >
                          ${openOutput.status}
                        </div>
                        <div class="text-[var(--text-primary-color,#0f172a)]">
                          <span class="font-medium"
                            >${this.msg['field.openedAt.label']}:</span
                          >
                          ${openOutput.openedAt}
                        </div>
                        <div class="text-[var(--text-primary-color,#0f172a)]">
                          <span class="font-medium"
                            >${this.msg['field.openedBy.label']}:</span
                          >
                          ${openOutput.openedBy}
                        </div>
                        <button
                          class="mt-2 px-2 py-1 rounded text-xs font-medium border border-[var(--grey-color,#e2e8f0)] text-[var(--text-primary-color,#0f172a)] hover:bg-[var(--bg-secondary-color,#f8fafc)]"
                          @click=${(e: Event) => this.handleCloseShiftClick(e)}
                        >
                          ${this.msg['action.closeShift.label']}
                        </button>
                      </div>
                    `
                  : html`
                      <p
                        class="text-sm text-[var(--text-primary-color,#535353)]"
                      >
                        ${this.msg['lane.open.empty']}
                      </p>
                    `}
              </div>

              <!-- Closed lane -->
              <div
                class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color,#f8fafc)] p-3 space-y-3"
              >
                <h3
                  class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]"
                >
                  ${this.msg['lane.closed.title']}
                </h3>
                ${reportLoading
                  ? html`
                      <div class="space-y-2">
                        <div
                          class="h-4 bg-[var(--grey-color,#e2e8f0)] rounded animate-pulse"
                        ></div>
                        <div
                          class="h-4 bg-[var(--grey-color,#e2e8f0)] rounded animate-pulse w-3/4"
                        ></div>
                      </div>
                    `
                  : report
                    ? html`
                        <div
                          class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-3 space-y-1 text-sm"
                        >
                          <div
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            <span class="font-medium"
                              >${this.msg['field.shiftId.label']}:</span
                            >
                            ${report.shiftId}
                          </div>
                          <div
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            <span class="font-medium"
                              >${this.msg['field.totalApurado.label']}:</span
                            >
                            ${report.totalApurado}
                          </div>
                          <div
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            <span class="font-medium"
                              >${this.msg['field.paidOrderCount.label']}:</span
                            >
                            ${report.paidOrderCount}
                          </div>
                          <div
                            class="text-[var(--text-primary-color,#0f172a)]"
                          >
                            <span class="font-medium"
                              >${this.msg['field.createdAt.label']}:</span
                            >
                            ${report.createdAt}
                          </div>
                          <button
                            class="mt-2 px-2 py-1 rounded text-xs font-medium border border-[var(--grey-color,#e2e8f0)] text-[var(--text-primary-color,#0f172a)] hover:bg-[var(--bg-secondary-color,#f8fafc)]"
                            @click=${(e: Event) =>
                              this.handleViewShiftClosingReportClick(e)}
                          >
                            ${this.msg['action.viewShiftClosingReport.label']}
                          </button>
                        </div>
                      `
                    : html`
                        <p
                          class="text-sm text-[var(--text-primary-color,#535353)]"
                        >
                          ${this.msg['lane.closed.empty']}
                        </p>
                      `}
              </div>
            </div>

            <!-- Query report filter + detail -->
            <div class="space-y-3 pt-2">
              <h3
                class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['intent.query.report.title']}
              </h3>
              <div class="flex gap-2 items-end">
                <div class="flex-1">
                  <label
                    class="block text-xs text-[var(--text-primary-color,#535353)] mb-1"
                    >${this.msg['field.shiftId.label']}</label
                  >
                  <input
                    type="text"
                    class="w-full px-3 py-2 rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)] text-sm"
                    .value=${this.viewShiftClosingReportShiftId}
                    @input=${(e: Event) =>
                      this.handleViewShiftClosingReportShiftIdChange(e)}
                  />
                </div>
                <button
                  class="px-3 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:opacity-90 disabled:opacity-50"
                  ?disabled=${reportLoading}
                  @click=${(e: Event) =>
                    this.handleViewShiftClosingReportClick(e)}
                >
                  ${this.msg['action.viewShiftClosingReport.label']}
                </button>
              </div>
              ${reportLoading
                ? html`
                    <div class="space-y-2">
                      <div
                        class="h-4 bg-[var(--grey-color,#e2e8f0)] rounded animate-pulse"
                      ></div>
                      <div
                        class="h-4 bg-[var(--grey-color,#e2e8f0)] rounded animate-pulse w-2/3"
                      ></div>
                    </div>
                  `
                : report
                  ? html`
                      <div
                        class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color,#f8fafc)] p-3 space-y-1 text-sm"
                      >
                        <div
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          <span class="font-medium"
                            >${this.msg['field.shiftClosingReportId.label']}:</span
                          >
                          ${report.shiftClosingReportId}
                        </div>
                        <div
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          <span class="font-medium"
                            >${this.msg['field.shiftId.label']}:</span
                          >
                          ${report.shiftId}
                        </div>
                        <div
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          <span class="font-medium"
                            >${this.msg['field.totalApurado.label']}:</span
                          >
                          ${report.totalApurado}
                        </div>
                        <div
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          <span class="font-medium"
                            >${this.msg['field.paidOrderCount.label']}:</span
                          >
                          ${report.paidOrderCount}
                        </div>
                        <div
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          <span class="font-medium"
                            >${this.msg['field.createdAt.label']}:</span
                          >
                          ${report.createdAt}
                        </div>
                        <div
                          class="text-[var(--text-primary-color,#0f172a)]"
                        >
                          <span class="font-medium"
                            >${this.msg['field.updatedAt.label']}:</span
                          >
                          ${report.updatedAt}
                        </div>
                      </div>
                    `
                  : html`
                      <p
                        class="text-sm text-[var(--text-primary-color,#535353)]"
                      >
                        ${this.msg['empty.report']}
                      </p>
                    `}
            </div>
          </section>

          <!-- Section: Open Shift Form -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['section.openShift.title']}
            </h2>
            <h3
              class="text-sm font-medium text-[var(--text-primary-color,#535353)]"
            >
              ${this.msg['intent.openShift.title']}
            </h3>
            <div class="space-y-3">
              <div>
                <label
                  class="block text-sm text-[var(--text-primary-color,#0f172a)] mb-1"
                  >${this.msg['field.notes.label']}</label
                >
                <textarea
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)] text-sm"
                  rows="3"
                  .value=${this.openShiftNotes}
                  @input=${(e: Event) => this.handleOpenShiftNotesChange(e)}
                ></textarea>
              </div>
              <button
                class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:opacity-90 disabled:opacity-50"
                ?disabled=${this.openShiftState === 'loading'}
                @click=${(e: Event) => this.handleOpenShiftClick(e)}
              >
                ${this.openShiftState === 'loading'
                  ? '...'
                  : this.msg['action.openShift.label']}
              </button>
            </div>
            ${this.openShiftState === 'success'
              ? html`
                  <div
                    class="rounded p-3 text-sm text-white bg-[var(--success-color,#52C41A)]"
                  >
                    ${this.msg['action.openShift.success']}
                  </div>
                `
              : this.openShiftState === 'error'
                ? html`
                    <div
                      class="rounded p-3 text-sm text-white bg-[var(--error-color,#FF4D4F)]"
                    >
                      ${this.openShiftError ||
                      this.msg['action.openShift.error']}
                    </div>
                  `
                : null}
          </section>

          <!-- Section: Close Shift Form -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['section.closeShift.title']}
            </h2>
            <h3
              class="text-sm font-medium text-[var(--text-primary-color,#535353)]"
            >
              ${this.msg['intent.closeShift.title']}
            </h3>
            <div class="space-y-3">
              <div>
                <label
                  class="block text-sm text-[var(--text-primary-color,#0f172a)] mb-1"
                >
                  ${this.msg['field.totalApurado.label']}
                  <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                </label>
                <input
                  type="number"
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)] text-sm"
                  .value=${this.closeShiftTotalApurado}
                  @input=${(e: Event) =>
                    this.handleCloseShiftTotalApuradoChange(e)}
                />
              </div>
              <div>
                <label
                  class="block text-sm text-[var(--text-primary-color,#0f172a)] mb-1"
                  >${this.msg['field.notes.label']}</label
                >
                <textarea
                  class="w-full px-3 py-2 rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#0f172a)] text-sm"
                  rows="3"
                  .value=${this.closeShiftNotes}
                  @input=${(e: Event) => this.handleCloseShiftNotesChange(e)}
                ></textarea>
              </div>
              <button
                class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:opacity-90 disabled:opacity-50"
                ?disabled=${this.closeShiftState === 'loading'}
                @click=${(e: Event) => this.handleCloseShiftClick(e)}
              >
                ${this.closeShiftState === 'loading'
                  ? '...'
                  : this.msg['action.closeShift.label']}
              </button>
            </div>
            ${this.closeShiftState === 'success'
              ? html`
                  <div
                    class="rounded p-3 text-sm text-white bg-[var(--success-color,#52C41A)]"
                  >
                    ${this.msg['action.closeShift.success']}
                  </div>
                `
              : this.closeShiftState === 'error'
                ? html`
                    <div
                      class="rounded p-3 text-sm text-white bg-[var(--error-color,#FF4D4F)]"
                    >
                      ${this.closeShiftError ||
                      this.msg['action.closeShift.error']}
                    </div>
                  `
                : null}
          </section>

          <!-- Section: Review Summary -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['section.review.title']}
            </h2>
            <h3
              class="text-sm font-medium text-[var(--text-primary-color,#535353)]"
            >
              ${this.msg['intent.report.summary.title']}
            </h3>
            ${reportLoading
              ? html`
                  <div class="space-y-2">
                    <div
                      class="h-4 bg-[var(--grey-color,#e2e8f0)] rounded animate-pulse"
                    ></div>
                    <div
                      class="h-4 bg-[var(--grey-color,#e2e8f0)] rounded animate-pulse w-3/4"
                    ></div>
                  </div>
                `
              : report
                ? html`
                    <div
                      class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color,#f8fafc)] p-4 space-y-2 text-sm"
                    >
                      <div class="text-[var(--text-primary-color,#0f172a)]">
                        <span class="font-medium"
                          >${this.msg['field.shiftClosingReportId.label']}:</span
                        >
                        ${report.shiftClosingReportId}
                      </div>
                      <div class="text-[var(--text-primary-color,#0f172a)]">
                        <span class="font-medium"
                          >${this.msg['field.shiftId.label']}:</span
                        >
                        ${report.shiftId}
                      </div>
                      <div class="text-[var(--text-primary-color,#0f172a)]">
                        <span class="font-medium"
                          >${this.msg['field.totalApurado.label']}:</span
                        >
                        ${report.totalApurado}
                      </div>
                      <div class="text-[var(--text-primary-color,#0f172a)]">
                        <span class="font-medium"
                          >${this.msg['field.paidOrderCount.label']}:</span
                        >
                        ${report.paidOrderCount}
                      </div>
                      <div class="text-[var(--text-primary-color,#0f172a)]">
                        <span class="font-medium"
                          >${this.msg['field.createdAt.label']}:</span
                        >
                        ${report.createdAt}
                      </div>
                      <div class="text-[var(--text-primary-color,#0f172a)]">
                        <span class="font-medium"
                          >${this.msg['field.updatedAt.label']}:</span
                        >
                        ${report.updatedAt}
                      </div>
                    </div>
                  `
                : html`
                    <p
                      class="text-sm text-[var(--text-primary-color,#535353)]"
                    >
                      ${this.msg['empty.report']}
                    </p>
                  `}
          </section>
        </div>
      </div>
    `;
  }
}
