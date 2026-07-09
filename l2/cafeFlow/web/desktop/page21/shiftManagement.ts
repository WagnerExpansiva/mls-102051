/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/shiftManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftManagementBase } from '/_102051_/l2/cafeFlow/web/shared/shiftManagement.js';

@customElement('cafe-flow--web--desktop--page21--shift-management-102051')
export class CafeFlowDesktopPage21ShiftManagementPage extends CafeFlowShiftManagementBase {
  render() {
    const data = this.viewShiftClosingReportData;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-xl font-bold text-[var(--text-primary-color,#403f3f)]">
            <!-- TODO: no page-title msg key in shared i18n; using section board title as page heading -->
            ${this.msg['shiftManagement.section.board.title']}
          </h1>

          <!-- Section: Turnos por status (board / queryList) -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['shiftManagement.organism.board.title']}
            </h2>

            <div class="flex justify-end">
              <button
                class="px-4 py-2 rounded text-white bg-[var(--active-color,#1890FF)] hover:opacity-90 disabled:opacity-50 text-sm"
                ?disabled=${this.viewShiftClosingReportState === 'loading'}
                @click=${this.handleViewShiftClosingReportClick}
              >
                ${this.msg['shiftManagement.action.viewShiftClosingReport.label']}
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr
                    class="border-b border-[var(--grey-color,#E6E6E6)] text-left text-[var(--text-primary-color,#403f3f)]"
                  >
                    <th class="py-2 px-3 font-medium">
                      ${this.msg['shiftManagement.field.shiftId.label']}
                    </th>
                    <th class="py-2 px-3 font-medium">
                      ${this.msg['shiftManagement.field.status.label']}
                    </th>
                    <th class="py-2 px-3 font-medium">
                      ${this.msg['shiftManagement.field.openedAt.label']}
                    </th>
                    <th class="py-2 px-3 font-medium">
                      ${this.msg['shiftManagement.field.closedAt.label']}
                    </th>
                    <th class="py-2 px-3 font-medium">
                      ${this.msg['shiftManagement.field.totalApurado.label']}
                    </th>
                    <th class="py-2 px-3"></th>
                  </tr>
                </thead>
                <tbody>
                  ${data
                    ? html`
                        <tr
                          class="border-b border-[var(--grey-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)]"
                        >
                          <td class="py-2 px-3">${data.shiftId ?? ''}</td>
                          <td class="py-2 px-3">${this.LayoutColBoardStatus || ''}</td>
                          <td class="py-2 px-3">${this.LayoutColBoardOpened || ''}</td>
                          <td class="py-2 px-3">${this.LayoutColBoardClosed || ''}</td>
                          <td class="py-2 px-3">${data.totalApurado ?? ''}</td>
                          <td class="py-2 px-3">
                            <button
                              class="text-[var(--link-color,#1890FF)] hover:underline"
                              @click=${this.handleViewShiftClosingReportClick}
                            >
                              ${this.msg['shiftManagement.action.viewShiftClosingReport.label']}
                            </button>
                          </td>
                        </tr>
                      `
                    : html`
                        <tr>
                          <td
                            colspan="6"
                            class="py-4 text-center text-[var(--text-primary-color,#403f3f)] opacity-60"
                          >
                            ${this.msg['shiftManagement.intention.board.title']}
                          </td>
                        </tr>
                      `}
                </tbody>
              </table>
            </div>
          </section>

          <!-- Section: Ações do turno (forms) -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-6"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['shiftManagement.section.actions.title']}
            </h2>

            <!-- Open Shift form -->
            <div class="space-y-3">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['shiftManagement.organism.openShift.title']}
              </h3>

              <div class="space-y-1">
                <label
                  class="block text-sm text-[var(--text-primary-color,#403f3f)]"
                  for="open-shift-notes"
                >
                  ${this.msg['shiftManagement.field.notes.label']}
                </label>
                <textarea
                  id="open-shift-notes"
                  class="w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none"
                  rows="3"
                  .value=${this.openShiftNotes}
                  @input=${this.handleOpenShiftNotesChange}
                ></textarea>
              </div>

              <button
                class="px-4 py-2 rounded text-white bg-[var(--active-color,#1890FF)] hover:opacity-90 disabled:opacity-50 text-sm"
                ?disabled=${this.openShiftState === 'loading'}
                @click=${this.handleOpenShiftClick}
              >
                ${this.msg['shiftManagement.action.openShift.label']}
              </button>
            </div>

            <!-- Close Shift form -->
            <div class="space-y-3">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['shiftManagement.organism.closeShift.title']}
              </h3>

              <div class="space-y-1">
                <label
                  class="block text-sm text-[var(--text-primary-color,#403f3f)]"
                  for="close-shift-total"
                >
                  ${this.msg['shiftManagement.field.totalApurado.label']} *
                </label>
                <input
                  id="close-shift-total"
                  type="number"
                  step="0.01"
                  class="w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none"
                  .value=${this.closeShiftTotalApurado}
                  @input=${this.handleCloseShiftTotalApuradoChange}
                />
              </div>

              <div class="space-y-1">
                <label
                  class="block text-sm text-[var(--text-primary-color,#403f3f)]"
                  for="close-shift-notes"
                >
                  ${this.msg['shiftManagement.field.notes.label']}
                </label>
                <textarea
                  id="close-shift-notes"
                  class="w-full rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none"
                  rows="3"
                  .value=${this.closeShiftNotes}
                  @input=${this.handleCloseShiftNotesChange}
                ></textarea>
              </div>

              <button
                class="px-4 py-2 rounded text-white bg-[var(--active-color,#1890FF)] hover:opacity-90 disabled:opacity-50 text-sm"
                ?disabled=${this.closeShiftState === 'loading'}
                @click=${this.handleCloseShiftClick}
              >
                ${this.msg['shiftManagement.action.closeShift.label']}
              </button>
            </div>
          </section>

          <!-- Section: Resumo do relatório (summary) -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['shiftManagement.organism.summary.title']}
            </h2>

            ${data
              ? html`
                  <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt
                        class="text-[var(--text-primary-color,#403f3f)] opacity-70"
                      >
                        ${this.msg['shiftManagement.field.shiftClosingReportId.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${data.shiftClosingReportId ?? ''}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-[var(--text-primary-color,#403f3f)] opacity-70"
                      >
                        ${this.msg['shiftManagement.field.shiftId.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${data.shiftId ?? ''}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-[var(--text-primary-color,#403f3f)] opacity-70"
                      >
                        ${this.msg['shiftManagement.field.totalApurado.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${data.totalApurado ?? ''}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-[var(--text-primary-color,#403f3f)] opacity-70"
                      >
                        ${this.msg['shiftManagement.field.paidOrderCount.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${data.paidOrderCount ?? ''}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-[var(--text-primary-color,#403f3f)] opacity-70"
                      >
                        ${this.msg['shiftManagement.field.createdAt.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${data.createdAt ?? ''}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-[var(--text-primary-color,#403f3f)] opacity-70"
                      >
                        ${this.msg['shiftManagement.field.updatedAt.label']}
                      </dt>
                      <dd class="text-[var(--text-primary-color,#403f3f)]">
                        ${data.updatedAt ?? ''}
                      </dd>
                    </div>
                  </dl>
                `
              : html`
                  <p
                    class="text-sm text-[var(--text-primary-color,#403f3f)] opacity-60"
                  >
                    ${this.msg['shiftManagement.intention.summary.title']}
                  </p>
                `}
          </section>
        </div>
      </div>
    `;
  }
}
