/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page21--shift-management-102051')
export class CafeFlowDesktopPage21ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    const report = this.viewShiftClosingReportData;
    const reportState = this.viewShiftClosingReportState;
    const hasReport = report !== null && report !== undefined;

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header>
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              ${this.msg['shiftManagement.section.title']}
            </h1>
          </header>

          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    ${this.msg['shiftManagement.viewReport.title']}
                  </h2>
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    ${this.msg['shiftManagement.viewReport.summary.title']}
                  </p>
                </div>
                <button
                  class="px-3 py-2 text-sm font-medium rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 disabled:opacity-50"
                  @click=${this.handleViewShiftClosingReportClick}
                >
                  ${this.msg['shiftManagement.viewReport.action.label']}
                </button>
              </div>

              <div class="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
                ${reportState === 'loading'
                  ? html`<div class="text-sm text-slate-500 dark:text-slate-400">Loading...</div>`
                  : html``}
                <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.shiftId.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.shiftId : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.shiftClosingReportId.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.shiftClosingReportId : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.totalApurado.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.totalApurado : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.paidOrderCount.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.paidOrderCount : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.createdAt.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.createdAt : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.updatedAt.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.updatedAt : '-'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div class="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['shiftManagement.openShift.title']}
              </h2>
              <div class="space-y-3">
                <h3 class="text-sm font-medium text-slate-700 dark:text-slate-300">
                  ${this.msg['shiftManagement.openShift.form.title']}
                </h3>
                <label class="block text-sm text-slate-600 dark:text-slate-300">
                  ${this.msg['shiftManagement.openShift.notes.label']}
                  <textarea
                    class="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-sm text-slate-900 dark:text-slate-100"
                    .value=${this.openShiftNotes}
                    @input=${this.handleOpenShiftNotesChange}
                    rows="3"
                  ></textarea>
                </label>
                <div class="flex items-center gap-2">
                  <button
                    class="px-4 py-2 text-sm font-medium rounded-md bg-emerald-600 text-white disabled:opacity-50"
                    @click=${this.handleOpenShiftClick}
                    ?disabled=${this.openShiftState === 'loading'}
                  >
                    ${this.msg['shiftManagement.openShift.submit.label']}
                  </button>
                  <span class="text-xs text-slate-500 dark:text-slate-400">${this.openShiftState}</span>
                </div>
              </div>
            </div>

            <div class="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['shiftManagement.closeShift.title']}
              </h2>
              <div class="space-y-3">
                <h3 class="text-sm font-medium text-slate-700 dark:text-slate-300">
                  ${this.msg['shiftManagement.closeShift.form.title']}
                </h3>
                <label class="block text-sm text-slate-600 dark:text-slate-300">
                  ${this.msg['shiftManagement.closeShift.totalApurado.label']}
                  <input
                    class="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-sm text-slate-900 dark:text-slate-100"
                    type="number"
                    step="0.01"
                    .value=${this.closeShiftTotalApurado}
                    @input=${this.handleCloseShiftTotalApuradoChange}
                  />
                </label>
                <label class="block text-sm text-slate-600 dark:text-slate-300">
                  ${this.msg['shiftManagement.closeShift.notes.label']}
                  <textarea
                    class="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-sm text-slate-900 dark:text-slate-100"
                    .value=${this.closeShiftNotes}
                    @input=${this.handleCloseShiftNotesChange}
                    rows="3"
                  ></textarea>
                </label>
                <div class="flex items-center gap-2">
                  <button
                    class="px-4 py-2 text-sm font-medium rounded-md bg-rose-600 text-white disabled:opacity-50"
                    @click=${this.handleCloseShiftClick}
                    ?disabled=${this.closeShiftState === 'loading'}
                  >
                    ${this.msg['shiftManagement.closeShift.submit.label']}
                  </button>
                  <span class="text-xs text-slate-500 dark:text-slate-400">${this.closeShiftState}</span>
                </div>
              </div>
            </div>

            <div class="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${this.msg['shiftManagement.viewReport.summary.title']}
              </h2>
              <div class="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
                <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.totalApurado.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.totalApurado : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.paidOrderCount.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.paidOrderCount : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.createdAt.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.createdAt : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      ${this.msg['shiftManagement.viewReport.updatedAt.label']}
                    </dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">
                      ${hasReport ? report.updatedAt : '-'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
