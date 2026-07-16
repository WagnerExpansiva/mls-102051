/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page21--shift-management-102051')
export class CafeFlowDesktopPage21ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    const formatCurrency = (value: number): string =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const isShiftClosed: boolean =
      this.closeShiftOutput !== null && this.closeShiftOutput.status === 'closed';
    const isShiftOpen: boolean =
      !isShiftClosed &&
      this.openShiftOutput !== null &&
      this.openShiftOutput.status === 'open';
    const showOpenForm: boolean = !isShiftOpen;

    const openOutput = this.openShiftOutput;
    const closeOutput = this.closeShiftOutput;
    const report = this.viewShiftClosingReportData;
    const reportLoading = this.viewShiftClosingReportState === 'loading';

    const openLoading = this.openShiftState === 'loading';
    const closeLoading = this.closeShiftState === 'loading';

    return html`
      <div
        class="min-h-screen p-4 md:p-6 max-w-5xl mx-auto
               bg-[var(--bg-primary-color,#ffffff)]
               text-[var(--text-primary-color,#403f3f)]"
      >
        <h1
          class="text-2xl font-bold mb-6
                 text-[var(--text-primary-color,#403f3f)]"
        >
          ${this.msg['page.shiftManagement.title']}
        </h1>

        <!-- Section: Shift Lifecycle -->
        <section class="mb-8">
          <h2
            class="text-lg font-semibold mb-4
                   text-[var(--text-primary-color,#403f3f)]"
          >
            ${this.msg['section.shiftLifecycle.title']}
          </h2>

          <div class="grid md:grid-cols-2 gap-4">
            <!-- Summary card (summary-first) -->
            <div
              class="rounded-lg p-4 border
                     bg-[var(--bg-secondary-color,#E6E6E6)]
                     border-[var(--grey-color,#E6E6E6)]"
            >
              <h3
                class="text-xs font-semibold mb-3 uppercase tracking-wide
                       text-[var(--text-primary-color,#403f3f)]"
              >
                ${this.msg['intention.shiftSummary.title']}
              </h3>

              ${isShiftOpen && openOutput ? html`
                <div class="space-y-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                           bg-[var(--success-color,#52C41A)] text-[#ffffff]"
                  >
                    ${this.msg['field.status.label']}: ${openOutput.status}
                  </span>
                  <dl class="text-sm space-y-1">
                    <div>
                      <dt
                        class="inline font-medium
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.msg['field.shiftId.label']}:
                      </dt>
                      <dd
                        class="inline ml-1
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${openOutput.shiftId}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="inline font-medium
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.msg['field.openedAt.label']}:
                      </dt>
                      <dd
                        class="inline ml-1
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${openOutput.openedAt}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="inline font-medium
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.msg['field.openedBy.label']}:
                      </dt>
                      <dd
                        class="inline ml-1
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${openOutput.openedBy}
                      </dd>
                    </div>
                  </dl>
                </div>
              ` : isShiftClosed && closeOutput ? html`
                <div class="space-y-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                           bg-[var(--grey-color-darker,#C0C0C0)] text-[#ffffff]"
                  >
                    ${this.msg['field.status.label']}: ${closeOutput.status}
                  </span>
                  <dl class="text-sm space-y-1">
                    <div>
                      <dt
                        class="inline font-medium
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.msg['field.closedAt.label']}:
                      </dt>
                      <dd
                        class="inline ml-1
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${closeOutput.closedAt}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="inline font-medium
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.msg['field.closedBy.label']}:
                      </dt>
                      <dd
                        class="inline ml-1
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${closeOutput.closedBy}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="inline font-medium
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${this.msg['field.totalApurado.label']}:
                      </dt>
                      <dd
                        class="inline ml-1
                               text-[var(--text-primary-color,#403f3f)]"
                      >
                        ${formatCurrency(closeOutput.totalApurado)}
                      </dd>
                    </div>
                    ${closeOutput.notes ? html`
                      <div>
                        <dt
                          class="inline font-medium
                                 text-[var(--text-primary-color,#403f3f)]"
                        >
                          ${this.msg['field.notes.label']}:
                        </dt>
                        <dd
                          class="inline ml-1
                                 text-[var(--text-primary-color,#403f3f)]"
                        >
                          ${closeOutput.notes}
                        </dd>
                      </div>
                    ` : null}
                  </dl>
                </div>
              ` : html`
                <p
                  class="text-sm
                         text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['intention.shiftSummary.empty']}
                </p>
              `}
            </div>

            <!-- Contextual transition action panel -->
            <div
              class="rounded-lg p-4 border
                     bg-[var(--bg-primary-color,#ffffff)]
                     border-[var(--grey-color,#E6E6E6)]"
            >
              ${showOpenForm ? html`
                <h3
                  class="text-xs font-semibold mb-3 uppercase tracking-wide
                         text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['intention.openShiftForm.title']}
                </h3>
                <div class="space-y-3">
                  <div>
                    <label
                      class="block text-sm font-medium mb-1
                             text-[var(--text-primary-color,#403f3f)]"
                    >
                      ${this.msg['field.notes.label']}
                    </label>
                    <textarea
                      class="w-full rounded-lg p-2 text-sm border
                             bg-[var(--bg-primary-color,#ffffff)]
                             border-[var(--grey-color,#E6E6E6)]
                             text-[var(--text-primary-color,#403f3f)]"
                      rows="3"
                      .value="${this.openShiftNotes}"
                      @input="${this.handleOpenShiftNotesChange}"
                      ?disabled="${openLoading}"
                    ></textarea>
                  </div>
                  <button
                    class="w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors
                           bg-[var(--active-color,#1890FF)] text-[#ffffff]
                           disabled:opacity-50"
                    @click="${this.handleOpenShiftClick}"
                    ?disabled="${openLoading}"
                  >
                    ${openLoading ? '...' : this.msg['action.openShift.label']}
                  </button>
                </div>

                ${this.openShiftState === 'success' ? html`
                  <div
                    class="mt-3 p-2 rounded-lg text-sm
                           bg-[var(--success-color,#52C41A)] text-[#ffffff]"
                  >
                    ${this.msg['action.openShift.success']}
                  </div>
                ` : null}
                ${this.openShiftState === 'error' ? html`
                  <div
                    class="mt-3 p-2 rounded-lg text-sm
                           bg-[var(--error-color,#FF4D4F)] text-[#ffffff]"
                  >
                    ${this.openShiftError || this.msg['action.openShift.error']}
                  </div>
                ` : null}
              ` : html`
                <h3
                  class="text-xs font-semibold mb-3 uppercase tracking-wide
                         text-[var(--text-primary-color,#403f3f)]"
                >
                  ${this.msg['intention.closeShiftForm.title']}
                </h3>
                <div class="space-y-3">
                  <div>
                    <label
                      class="block text-sm font-medium mb-1
                             text-[var(--text-primary-color,#403f3f)]"
                    >
                      ${this.msg['field.totalApurado.label']} *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      class="w-full rounded-lg p-2 text-sm border
                             bg-[var(--bg-primary-color,#ffffff)]
                             border-[var(--grey-color,#E6E6E6)]
                             text-[var(--text-primary-color,#403f3f)]"
                      .value="${this.closeShiftTotalApurado}"
                      @input="${this.handleCloseShiftTotalApuradoChange}"
                      ?disabled="${closeLoading}"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium mb-1
                             text-[var(--text-primary-color,#403f3f)]"
                    >
                      ${this.msg['field.notes.label']}
                    </label>
                    <textarea
                      class="w-full rounded-lg p-2 text-sm border
                             bg-[var(--bg-primary-color,#ffffff)]
                             border-[var(--grey-color,#E6E6E6)]
                             text-[var(--text-primary-color,#403f3f)]"
                      rows="3"
                      .value="${this.closeShiftNotes}"
                      @input="${this.handleCloseShiftNotesChange}"
                      ?disabled="${closeLoading}"
                    ></textarea>
                  </div>
                  <button
                    class="w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors
                           bg-[var(--active-color,#1890FF)] text-[#ffffff]
                           disabled:opacity-50"
                    @click="${this.handleCloseShiftClick}"
                    ?disabled="${closeLoading}"
                  >
                    ${closeLoading ? '...' : this.msg['action.closeShift.label']}
                  </button>
                </div>

                ${this.closeShiftState === 'success' ? html`
                  <div
                    class="mt-3 p-2 rounded-lg text-sm
                           bg-[var(--success-color,#52C41A)] text-[#ffffff]"
                  >
                    ${this.msg['action.closeShift.success']}
                  </div>
                ` : null}
                ${this.closeShiftState === 'error' ? html`
                  <div
                    class="mt-3 p-2 rounded-lg text-sm
                           bg-[var(--error-color,#FF4D4F)] text-[#ffffff]"
                  >
                    ${this.closeShiftError || this.msg['action.closeShift.error']}
                  </div>
                ` : null}
              `}
            </div>
          </div>
        </section>

        <!-- Section: Closing Report -->
        <section>
          <h2
            class="text-lg font-semibold mb-4
                   text-[var(--text-primary-color,#403f3f)]"
          >
            ${this.msg['section.closingReport.title']}
          </h2>

          <div
            class="rounded-lg p-4 border
                   bg-[var(--bg-secondary-color,#E6E6E6)]
                   border-[var(--grey-color,#E6E6E6)]"
          >
            <h3
              class="text-xs font-semibold mb-3 uppercase tracking-wide
                     text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['intention.reportDisplay.title']}
            </h3>

            ${reportLoading ? html`
              <div class="space-y-2 animate-pulse">
                <div
                  class="h-4 rounded
                         bg-[var(--grey-color,#E6E6E6)]"
                ></div>
                <div
                  class="h-4 rounded w-3/4
                         bg-[var(--grey-color,#E6E6E6)]"
                ></div>
                <div
                  class="h-4 rounded w-1/2
                         bg-[var(--grey-color,#E6E6E6)]"
                ></div>
              </div>
            ` : report ? html`
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <dt
                    class="text-xs font-medium uppercase tracking-wide mb-1
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.msg['field.totalApurado.label']}
                  </dt>
                  <dd
                    class="text-xl font-bold
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${formatCurrency(report.totalApurado)}
                  </dd>
                </div>
                <div>
                  <dt
                    class="text-xs font-medium uppercase tracking-wide mb-1
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.msg['field.paidOrderCount.label']}
                  </dt>
                  <dd
                    class="text-xl font-bold
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${report.paidOrderCount}
                  </dd>
                </div>
                <div>
                  <dt
                    class="text-xs font-medium uppercase tracking-wide mb-1
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.msg['field.shiftId.label']}
                  </dt>
                  <dd
                    class="text-sm
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${report.shiftId}
                  </dd>
                </div>
                <div>
                  <dt
                    class="text-xs font-medium uppercase tracking-wide mb-1
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.msg['field.shiftClosingReportId.label']}
                  </dt>
                  <dd
                    class="text-sm
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${report.shiftClosingReportId}
                  </dd>
                </div>
                <div>
                  <dt
                    class="text-xs font-medium uppercase tracking-wide mb-1
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.msg['field.createdAt.label']}
                  </dt>
                  <dd
                    class="text-sm
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${report.createdAt}
                  </dd>
                </div>
                <div>
                  <dt
                    class="text-xs font-medium uppercase tracking-wide mb-1
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.msg['field.updatedAt.label']}
                  </dt>
                  <dd
                    class="text-sm
                           text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${report.updatedAt}
                  </dd>
                </div>
              </div>
            ` : html`
              <p
                class="text-sm
                       text-[var(--text-primary-color,#403f3f)]"
              >
                ${this.msg['intention.reportDisplay.empty']}
              </p>
            `}
          </div>
        </section>
      </div>
    `;
  }
}
