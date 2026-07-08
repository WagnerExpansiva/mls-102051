/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page31/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page31--shift-management-102051')
export class CafeFlowDesktopPage11ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    const msg = this.msg as Record<string, string>;
    const t = (key: string): string => msg[key] ?? '';
    const report = this.viewShiftClosingReportData;
    const reportFields: Array<{ label: string; value: string }> = [
      {
        label: t('shiftManagement.report.field.shiftId'),
        value: report?.shiftId ?? '—',
      },
      {
        label: t('shiftManagement.report.field.totalApurado'),
        value: report ? String(report.totalApurado) : '—',
      },
      {
        label: t('shiftManagement.report.field.paidOrderCount'),
        value: report ? String(report.paidOrderCount) : '—',
      },
      {
        label: t('shiftManagement.report.field.updatedAt'),
        value: report?.updatedAt ?? '—',
      },
    ];

    const summaryFields: Array<{ label: string; value: string }> = [
      {
        label: t('shiftManagement.summary.field.status'),
        value: '—',
      },
      {
        label: t('shiftManagement.summary.field.openedAt'),
        value: '—',
      },
      {
        label: t('shiftManagement.summary.field.closedAt'),
        value: '—',
      },
      {
        label: t('shiftManagement.summary.field.totalApurado'),
        value: report ? String(report.totalApurado) : '—',
      },
    ];

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-2">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              ${t('shiftManagement.section.title')}
            </h1>
          </header>

          <section class="rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
            <div class="px-4 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ${t('shiftManagement.section.main.title') || t('shiftManagement.section.title')}
              </h2>
            </div>
            <div class="p-4 space-y-6">
              <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-4">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                      ${t('shiftManagement.queue.title')}
                    </h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                      ${t('shiftManagement.queue.list.title')}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      class="px-3 py-2 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-sm font-medium"
                      @click=${this.handleViewShiftClosingReportClick}
                    >
                      ${t('shiftManagement.report.action.refresh')}
                    </button>
                    <button
                      class="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium"
                      ?disabled=${!report}
                      @click=${this.handleViewShiftClosingReportClick}
                    >
                      ${t('shiftManagement.report.action.view')}
                    </button>
                  </div>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                  ${reportFields.map(
                    (field) => html`
                      <div class="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                        <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          ${field.label}
                        </div>
                        <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                          ${field.value}
                        </div>
                      </div>
                    `,
                  )}
                </div>
              </div>

              <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-4">
                <div>
                  <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                    ${t('shiftManagement.openShift.title')}
                  </h3>
                  <p class="text-sm text-slate-600 dark:text-slate-400">
                    ${t('shiftManagement.openShift.form.title')}
                  </p>
                </div>

                <div class="space-y-3">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    ${t('shiftManagement.openShift.field.notes')}
                  </label>
                  <textarea
                    class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                    rows="3"
                    .value=${this.openShiftNotes}
                    @input=${this.handleOpenShiftNotesChange}
                  ></textarea>
                </div>

                <div class="flex justify-end">
                  <button
                    class="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-sm font-medium"
                    @click=${this.handleOpenShiftClick}
                  >
                    ${t('shiftManagement.openShift.action.submit')}
                  </button>
                </div>
              </div>

              <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-4">
                <div>
                  <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                    ${t('shiftManagement.closeShift.title')}
                  </h3>
                  <p class="text-sm text-slate-600 dark:text-slate-400">
                    ${t('shiftManagement.closeShift.form.title')}
                  </p>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      ${t('shiftManagement.closeShift.field.totalApurado')}
                    </label>
                    <input
                      class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      type="number"
                      step="0.01"
                      .value=${this.closeShiftTotalApurado}
                      @input=${this.handleCloseShiftTotalApuradoChange}
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      ${t('shiftManagement.closeShift.field.notes')}
                    </label>
                    <textarea
                      class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      rows="3"
                      .value=${this.closeShiftNotes}
                      @input=${this.handleCloseShiftNotesChange}
                    ></textarea>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button
                    class="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-sm font-medium"
                    @click=${this.handleCloseShiftClick}
                  >
                    ${t('shiftManagement.closeShift.action.submit')}
                  </button>
                </div>
              </div>

              <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-4">
                <div>
                  <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                    ${t('shiftManagement.summary.title')}
                  </h3>
                  <p class="text-sm text-slate-600 dark:text-slate-400">
                    ${t('shiftManagement.summary.section.title')}
                  </p>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                  ${summaryFields.map(
                    (field) => html`
                      <div class="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
                        <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          ${field.label}
                        </div>
                        <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
                          ${field.value}
                        </div>
                      </div>
                    `,
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
