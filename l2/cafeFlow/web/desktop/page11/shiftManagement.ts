/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page11--shift-management-102051')
export class CafeFlowDesktopPage11ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    const reportData = this.viewShiftClosingReportData;
    const reportLoading = this.viewShiftClosingReportState === 'loading';
    const openLoading = this.openShiftState === 'loading';
    const closeLoading = this.closeShiftState === 'loading';
    const hasSummary = this.openShiftOutput !== null || this.closeShiftOutput !== null;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.shiftManagement.title']}
          </h1>

          <!-- Section: Discover – Shift Closing Report -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['sec.discover.title']}
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['org.shift.report.title']}
            </h3>

            ${reportLoading
              ? html`<div class="space-y-2 animate-pulse">
                  <div class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded w-3/4"></div>
                  <div class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded w-1/2"></div>
                  <div class="h-4 bg-[var(--grey-color,#E6E6E6)] rounded w-2/3"></div>
                </div>`
              : reportData
                ? html`<dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                        ${this.msg['field.shiftId.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">${reportData.shiftId}</dd>
                    </div>
                    <div>
                      <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                        ${this.msg['field.totalApurado.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${reportData.totalApurado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </dd>
                    </div>
                    <div>
                      <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                        ${this.msg['field.paidOrderCount.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">${reportData.paidOrderCount}</dd>
                    </div>
                    <div>
                      <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                        ${this.msg['field.createdAt.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">${reportData.createdAt}</dd>
                    </div>
                    <div>
                      <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                        ${this.msg['field.updatedAt.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">${reportData.updatedAt}</dd>
                    </div>
                  </dl>`
                : html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)]">
                    <!-- TODO: key 'empty.shiftReport' not in shared i18n -->
                    Nenhum relatório de fechamento disponível. Abra e feche um turno para gerar o relatório.
                  </p>`}

            <div>
              <button
                type="button"
                class="px-4 py-2 rounded text-sm font-medium bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] disabled:opacity-50"
                ?disabled=${reportLoading}
                @click=${this.handleViewShiftClosingReportClick}
              >
                ${this.msg['action.viewShiftClosingReport.label']}
              </button>
            </div>
          </section>

          <!-- Section: Execute – Open Shift -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              <!-- TODO: key 'sec.execute.openShift.title' not in shared i18n -->
              Abrir turno
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['org.open.shift.title']}
            </h3>

            <div class="space-y-3">
              <div class="space-y-1">
                <label
                  class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                  for="open-shift-notes"
                >
                  ${this.msg['field.notes.label']}
                </label>
                <textarea
                  id="open-shift-notes"
                  class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  rows="3"
                  .value=${this.openShiftNotes}
                  @input=${this.handleOpenShiftNotesChange}
                ></textarea>
              </div>

              <button
                type="button"
                class="px-4 py-2 rounded text-sm font-medium bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] disabled:opacity-50"
                ?disabled=${openLoading}
                @click=${this.handleOpenShiftClick}
              >
                ${openLoading ? '...' : this.msg['action.openShift.label']}
              </button>
            </div>

            ${this.openShiftState === 'success'
              ? html`<div
                  class="rounded p-3 text-sm bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--success-color,#52C41A)]"
                >
                  ${this.msg['action.openShift.success']}
                </div>`
              : null}
            ${this.openShiftState === 'error'
              ? html`<div
                  class="rounded p-3 text-sm bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--error-color,#FF4D4F)]"
                >
                  ${this.openShiftError || this.msg['action.openShift.error']}
                </div>`
              : null}
          </section>

          <!-- Section: Execute – Close Shift -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              <!-- TODO: key 'sec.execute.closeShift.title' not in shared i18n -->
              Fechar turno
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['org.close.shift.title']}
            </h3>

            <div class="space-y-3">
              <div class="space-y-1">
                <label
                  class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                  for="close-shift-total"
                >
                  ${this.msg['field.totalApurado.label']} *
                </label>
                <input
                  id="close-shift-total"
                  type="number"
                  step="0.01"
                  class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value=${this.closeShiftTotalApurado}
                  @input=${this.handleCloseShiftTotalApuradoChange}
                />
              </div>

              <div class="space-y-1">
                <label
                  class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                  for="close-shift-notes"
                >
                  ${this.msg['field.notes.label']}
                </label>
                <textarea
                  id="close-shift-notes"
                  class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  rows="3"
                  .value=${this.closeShiftNotes}
                  @input=${this.handleCloseShiftNotesChange}
                ></textarea>
              </div>

              <button
                type="button"
                class="px-4 py-2 rounded text-sm font-medium bg-[var(--active-color,#1890FF)] text-[var(--bg-primary-color,#ffffff)] disabled:opacity-50"
                ?disabled=${closeLoading}
                @click=${this.handleCloseShiftClick}
              >
                ${closeLoading ? '...' : this.msg['action.closeShift.label']}
              </button>
            </div>

            ${this.closeShiftState === 'success'
              ? html`<div
                  class="rounded p-3 text-sm bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--success-color,#52C41A)]"
                >
                  ${this.msg['action.closeShift.success']}
                </div>`
              : null}
            ${this.closeShiftState === 'error'
              ? html`<div
                  class="rounded p-3 text-sm bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--error-color,#FF4D4F)]"
                >
                  ${this.closeShiftError || this.msg['action.closeShift.error']}
                </div>`
              : null}
          </section>

          <!-- Section: Review – Shift Summary -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['sec.review.title']}
            </h2>
            <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['org.shift.summary.title']}
            </h3>

            ${hasSummary
              ? html`<dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  ${this.openShiftOutput
                    ? html`
                        <div>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                            ${this.msg['field.shiftId.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.openShiftOutput.shiftId}
                          </dd>
                        </div>
                        <div>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                            ${this.msg['field.status.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.closeShiftOutput
                              ? this.closeShiftOutput.status
                              : this.openShiftOutput.status}
                          </dd>
                        </div>
                        <div>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                            ${this.msg['field.openedAt.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.openShiftOutput.openedAt}
                          </dd>
                        </div>
                        <div>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                            ${this.msg['field.openedBy.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.openShiftOutput.openedBy}
                          </dd>
                        </div>
                      `
                    : null}
                  ${this.closeShiftOutput
                    ? html`
                        <div>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                            ${this.msg['field.closedAt.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.closeShiftOutput.closedAt}
                          </dd>
                        </div>
                        <div>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                            ${this.msg['field.closedBy.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.closeShiftOutput.closedBy}
                          </dd>
                        </div>
                        <div>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                            ${this.msg['field.totalApurado.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.closeShiftOutput.totalApurado.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </dd>
                        </div>
                        <div>
                          <dt class="text-[var(--text-primary-color-disabled,#525151)]">
                            ${this.msg['field.notes.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#403f3f)]">
                            ${this.closeShiftOutput.notes}
                          </dd>
                        </div>
                      `
                    : null}
                </dl>`
              : html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)]">
                  ${this.msg['empty.summary']}
                </p>`}
          </section>
        </div>
      </div>
    `;
  }
}
