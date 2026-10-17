import { Component, inject } from '@angular/core';
import { AutoFocusDirective } from '../shared/auto-focus.directive';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-session-complete-dialog',
  imports: [AutoFocusDirective],
  template: `
    <div class="backdrop">
      <div class="w-180 rounded-lg border-2 border-success bg-panel p-6 text-center">
        <h3 class="mb-1.5 text-[1.375rem] font-bold text-success">🎉 CONGRATULATIONS!</h3>
        <div class="mb-4.5 text-[0.8125rem] text-muted">
          Bạn đã hoàn thành session {{ game.total() }} từ.
        </div>

        <div class="mb-4.5 max-h-75 overflow-y-auto rounded-md border border-line bg-canvas">
          <table class="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th class="sticky top-0 bg-raised px-2 py-1.5 font-normal text-muted">Kanji</th>
                <th class="sticky top-0 bg-raised px-2 py-1.5 font-normal text-muted">Yomikata</th>
                <th class="sticky top-0 bg-raised px-2 py-1.5 font-normal text-muted">Nghĩa</th>
              </tr>
            </thead>
            <tbody>
              @for (w of game.sessionWords(); track $index) {
                <tr class="border-t border-raised align-top">
                  <td class="px-2 py-1.5 text-base font-bold text-enemy">{{ w.kanji }}</td>
                  <td
                    title="Nghe phát âm"
                    (click)="game.speak(w.yomikata); nextBtn.focus()"
                    class="cursor-pointer whitespace-nowrap px-2 py-1.5 text-accent hover:underline"
                  >
                    {{ w.yomikata }}
                  </td>
                  <td class="px-2 py-1.5">{{ w.meaning }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="flex justify-center gap-2.5">
          <button #nextBtn appAutoFocus (click)="game.nextSession()" class="btn-primary">
            Session tiếp theo (Enter)
          </button>
          <button (click)="game.goHome()" class="btn-secondary">Về Home</button>
        </div>
      </div>
    </div>
  `,
})
export class SessionCompleteDialog {
  protected readonly game = inject(GameService);
}
