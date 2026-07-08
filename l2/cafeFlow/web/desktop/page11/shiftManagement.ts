/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page11--shift-management-102051')
export class CafeFlowDesktopPage11ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    const m = this.msg;
    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">
            ${m['shiftManagement.section.title'] ?? ''}
          </h1>

          <!-- Open Shift -->
          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
              ${m['shiftManagement.openShift.title'] ?? ''}
            </h2>
            <form class="space-y-4" @submit=${(e: Event) => e.preventDefault()}>
              <div>
                <label class="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  ${m['shiftManagement.openShift.notes.label'] ?? ''}
                </label>
                <textarea
                  class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  .value=${this.openShiftNotes}
                  @input=${(e: Event) => this.handleOpenShiftNotesChange(e)}
                ></textarea>
              </div>
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  ?disabled=${this.openShiftState === 'loading'}
                  @click=${(e: Event) => this.handleOpenShiftClick(e)}
                >
                  ${this.openShiftState === 'loading' ? '...' : (m['shiftManagement.openShift.submit.label'] ?? '')}
                </button>
                ${this.openShiftState === 'success' ? html`<span class="text-sm text-green-600 dark:text-green-400">✓</span>` : null}
                ${this.openShiftState === 'error' ? html`<span class="text-sm text-red-600 dark:text-red-400">✗</span>` : null}
              </div>
            </form>
          </section>

          <!-- Close Shift -->
          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
              ${m['shiftManagement.closeShift.title'] ?? ''}
            </h2>
            <form class="space-y-4" @submit=${(e: Event) => e.preventDefault()}>
              <div>
                <label class="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  ${m['shiftManagement.closeShift.totalApurado.label'] ?? ''}
                </label>
                <input
                  type="number"
                  step="0.01"
                  class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  .value=${this.closeShiftTotalApurado}
                  @input=${(e: Event) => this.handleCloseShiftTotalApuradoChange(e)}
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  ${m['shiftManagement.closeShift.notes.label'] ?? ''}
                </label>
                <textarea
                  class="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  .value=${this.closeShiftNotes}
                  @input=${(e: Event) => this.handleCloseShiftNotesChange(e)}
                ></textarea>
              </div>
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  ?disabled=${this.closeShiftState === 'loading'}
                  @click=${(e: Event) => this.handleCloseShiftClick(e)}
                >
                  ${this.closeShiftState === 'loading' ? '...' : (m['shiftManagement.closeShift.submit.label'] ?? '')}
                </button>
                ${this.closeShiftState === 'success' ? html`<span class="text-sm text-green-600 dark:text-green-400">✓</span>` : null}
                ${this.closeShiftState === 'error' ? html`<span class="text-sm text-red-600 dark:text-red-400">✗</span>` : null}
              </div>
            </form>
          </section>

          <!-- View Shift Closing Report -->
          <section class="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">
              ${m['shiftManagement.viewReport.title'] ?? ''}
            </h2>

            <!-- Action List -->
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                ?disabled=${this.viewShiftClosingReportState === 'loading'}
                @click=${(e: Event) => this.handleViewShiftClosingReportClick(e)}
              >
                ${this.viewShiftClosingReportState === 'loading' ? '...' : (m['shiftManagement.viewReport.action.label'] ?? '')}
              </button>
            </div>

            <!-- Summary -->
            <div class="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h3 class="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
                ${m['shiftManagement.viewReport.summary.title'] ?? ''}
              </h3>
              ${this.viewShiftClosingReportData ? html`
                <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div class="flex flex-col">
                    <dt class="text-slate-500 dark:text-slate-400">${m['shiftManagement.viewReport.shiftClosingReportId.label'] ?? ''}</dt>
                    <dd class="text-slate-800 dark:text-slate-100">${this.viewShiftClosingReportData.shiftClosingReportId ?? '—'}</dd>
                  </div>
                  <div class="flex flex-col">
                    <dt class="text-slate-500 dark:text-slate-400">${m['shiftManagement.viewReport.shiftId.label'] ?? ''}</dt>
                    <dd class="text-slate-800 dark:text-slate-100">${this.viewShiftClosingReportData.shiftId ?? '—'}</dd>
                  </div>
                  <div class="flex flex-col">
                    <dt class="text-slate-500 dark:text-slate-400">${m['shiftManagement.viewReport.totalApurado.label'] ?? ''}</dt>
                    <dd class="text-slate-800 dark:text-slate-100">
                      ${(this.viewShiftClosingReportData.totalApurado ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </dd>
                  </div>
                  <div class="flex flex-col">
                    <dt class="text-slate-500 dark:text-slate-400">${m['shiftManagement.viewReport.paidOrderCount.label'] ?? ''}</dt>
                    <dd class="text-slate-800 dark:text-slate-100">${this.viewShiftClosingReportData.paidOrderCount ?? 0}</dd>
                  </div>
                  <div class="flex flex-col">
                    <dt class="text-slate-500 dark:text-slate-400">${m['shiftManagement.viewReport.createdAt.label'] ?? ''}</dt>
                    <dd class="text-slate-800 dark:text-slate-100">${this.viewShiftClosingReportData.createdAt ?? '—'}</dd>
                  </div>
                  <div class="flex flex-col">
                    <dt class="text-slate-500 dark:text-slate-400">${m['shiftManagement.viewReport.updatedAt.label'] ?? ''}</dt>
                    <dd class="text-slate-800 dark:text-slate-100">${this.viewShiftClosingReportData.updatedAt ?? '—'}</dd>
                  </div>
                </dl>
              ` : html`
                <p class="text-sm text-slate-400 dark:text-slate-500">—</p>
              `}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
