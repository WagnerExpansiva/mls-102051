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

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Discover – Shift closing report -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2
                class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
              >
                ${this.msg['section.discover.title']}
              </h2>
              <button
                type="button"
                class="px-3 py-1.5 rounded text-sm bg-[var(--bg-secondary-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-secondary-color-hover,#d9d9d9)] disabled:opacity-50"
                ?disabled=${reportLoading}
                @click=${(e: Event) => this.handleViewShiftClosingReportClick(e)}
              >
                ${this.msg['action.viewShiftClosingReport.label']}
              </button>
            </div>

            <input type="hidden" .value=${this.viewShiftClosingReportShiftId} />

            ${reportLoading
              ? html`
                  <div class="space-y-2 animate-pulse">
                    <div
                      class="h-4 bg-[var(--grey-color,#e6e6e6)] rounded w-3/4"
                    ></div>
                    <div
                      class="h-4 bg-[var(--grey-color,#e6e6e6)] rounded w-1/2"
                    ></div>
                    <div
                      class="h-4 bg-[var(--grey-color,#e6e6e6)] rounded w-2/3"
                    ></div>
                  </div>
                `
              : reportData
                ? html`
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <dt
                          class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                        >
                          ${this.msg['field.shiftClosingReportId.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#403f3f)]"
                        >
                          ${reportData.shiftClosingReportId}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                        >
                          ${this.msg['field.shiftId.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#403f3f)]"
                        >
                          ${reportData.shiftId}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                        >
                          ${this.msg['field.totalApurado.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#403f3f)]"
                        >
                          R$ ${reportData.totalApurado.toFixed(2)}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                        >
                          ${this.msg['field.paidOrderCount.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#403f3f)]"
                        >
                          ${reportData.paidOrderCount}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                        >
                          ${this.msg['field.createdAt.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#403f3f)]"
                        >
                          ${reportData.createdAt}
                        </dd>
                      </div>
                      <div>
                        <dt
                          class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                        >
                          ${this.msg['field.updatedAt.label']}
                        </dt>
                        <dd
                          class="text-[var(--text-primary-color,#403f3f)]"
                        >
                          ${reportData.updatedAt}
                        </dd>
                      </div>
                    </dl>
                  `
                : html`
                    <p
                      class="text-[var(--text-primary-color-disabled,#525151)] text-sm"
                    >
                      ${this.msg['empty.reports']}
                    </p>
                  `}
          </section>

          <!-- Section: Open shift -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['section.openShift.title']}
            </h2>

            <form class="space-y-3" @submit=${(e: Event) => e.preventDefault()}>
              <div>
                <label
                  class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                  for="open-shift-notes"
                >
                  ${this.msg['field.notes.label']}
                </label>
                <textarea
                  id="open-shift-notes"
                  class="w-full rounded border border-[var(--grey-color-dark,#d3d3d3)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
                  rows="3"
                  .value=${this.openShiftNotes}
                  @input=${(e: Event) => this.handleOpenShiftNotesChange(e)}
                ></textarea>
              </div>

              <button
                type="submit"
                class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                ?disabled=${openLoading}
                @click=${(e: Event) => this.handleOpenShiftClick(e)}
              >
                ${openLoading
                  ? '...'
                  : this.msg['action.openShift.label']}
              </button>
            </form>

            ${this.openShiftState === 'success'
              ? html`
                  <div
                    class="rounded p-3 text-sm text-[var(--success-color-focus,#4ca610)] border border-[var(--success-color,#52c41a)]"
                  >
                    ${this.msg['action.openShift.success']}
                  </div>
                `
              : this.openShiftState === 'error'
                ? html`
                    <div
                      class="rounded p-3 text-sm text-[var(--error-color-focus,#e63e3e)] border border-[var(--error-color,#ff4d4f)]"
                    >
                      ${this.openShiftError || this.msg['action.openShift.error']}
                    </div>
                  `
                : null}
          </section>

          <!-- Section: Close shift -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['section.closeShift.title']}
            </h2>

            <form class="space-y-3" @submit=${(e: Event) => e.preventDefault()}>
              <div>
                <label
                  class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                  for="close-shift-total"
                >
                  ${this.msg['field.totalApurado.label']}
                  <span class="text-[var(--error-color,#ff4d4f)]">*</span>
                </label>
                <input
                  id="close-shift-total"
                  type="number"
                  step="0.01"
                  class="w-full rounded border border-[var(--grey-color-dark,#d3d3d3)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
                  .value=${this.closeShiftTotalApurado}
                  @input=${(e: Event) => this.handleCloseShiftTotalApuradoChange(e)}
                />
              </div>

              <div>
                <label
                  class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                  for="close-shift-notes"
                >
                  ${this.msg['field.notes.label']}
                </label>
                <textarea
                  id="close-shift-notes"
                  class="w-full rounded border border-[var(--grey-color-dark,#d3d3d3)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
                  rows="3"
                  .value=${this.closeShiftNotes}
                  @input=${(e: Event) => this.handleCloseShiftNotesChange(e)}
                ></textarea>
              </div>

              <button
                type="submit"
                class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                ?disabled=${closeLoading}
                @click=${(e: Event) => this.handleCloseShiftClick(e)}
              >
                ${closeLoading
                  ? '...'
                  : this.msg['action.closeShift.label']}
              </button>
            </form>

            ${this.closeShiftState === 'success'
              ? html`
                  <div
                    class="rounded p-3 text-sm text-[var(--success-color-focus,#4ca610)] border border-[var(--success-color,#52c41a)]"
                  >
                    ${this.msg['action.closeShift.success']}
                  </div>
                `
              : this.closeShiftState === 'error'
                ? html`
                    <div
                      class="rounded p-3 text-sm text-[var(--error-color-focus,#e63e3e)] border border-[var(--error-color,#ff4d4f)]"
                    >
                      ${this.closeShiftError || this.msg['action.closeShift.error']}
                    </div>
                  `
                : null}
          </section>

          <!-- Section: Review – Shift summary -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e6e6e6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['section.review.title']}
            </h2>

            ${this.openShiftOutput || this.closeShiftOutput
              ? html`
                  <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    ${this.openShiftOutput
                      ? html`
                          <div>
                            <dt
                              class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                            >
                              ${this.msg['field.shiftId.label']}
                            </dt>
                            <dd
                              class="text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.openShiftOutput.shiftId}
                            </dd>
                          </div>
                          <div>
                            <dt
                              class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                            >
                              ${this.msg['field.status.label']}
                            </dt>
                            <dd
                              class="text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.openShiftOutput.status}
                            </dd>
                          </div>
                          <div>
                            <dt
                              class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                            >
                              ${this.msg['field.openedAt.label']}
                            </dt>
                            <dd
                              class="text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.openShiftOutput.openedAt}
                            </dd>
                          </div>
                          <div>
                            <dt
                              class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                            >
                              ${this.msg['field.openedBy.label']}
                            </dt>
                            <dd
                              class="text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.openShiftOutput.openedBy}
                            </dd>
                          </div>
                        `
                      : null}
                    ${this.closeShiftOutput
                      ? html`
                          <div>
                            <dt
                              class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                            >
                              ${this.msg['field.closedAt.label']}
                            </dt>
                            <dd
                              class="text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.closeShiftOutput.closedAt}
                            </dd>
                          </div>
                          <div>
                            <dt
                              class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                            >
                              ${this.msg['field.closedBy.label']}
                            </dt>
                            <dd
                              class="text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.closeShiftOutput.closedBy}
                            </dd>
                          </div>
                          <div>
                            <dt
                              class="text-sm text-[var(--text-primary-color-disabled,#525151)]"
                            >
                              ${this.msg['field.totalApurado.label']}
                            </dt>
                            <dd
                              class="text-[var(--text-primary-color,#403f3f)]"
                            >
                              R$ ${this.closeShiftOutput.totalApurado.toFixed(2)}
                            </dd>
                          </div>
                        `
                      : null}
                  </dl>
                `
              : html`
                  <p
                    class="text-[var(--text-primary-color-disabled,#525151)] text-sm"
                  >
                    ${this.msg['empty.summary']}
                  </p>
                `}
          </section>
        </div>
      </div>
    `;
  }
}
