import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { GameService, MAX_FAILS } from '../shared/game.service';

@Component({
  selector: 'app-game-board',
  template: `
    <h2 class="my-5 text-2xl font-bold">KANJI TYPING</h2>

    <div class="mb-2 flex w-125 items-center justify-between text-sm text-muted">
      <span>
        Tiến độ: <b class="text-accent">{{ game.index() }}</b> /
        <b class="text-accent">{{ game.total() }}</b>
      </span>
      <span>
        Lỗi: <b class="text-danger">{{ game.fails() }}</b> /
        <b class="text-danger">{{ maxFails }}</b>
      </span>
      <button
        (click)="game.goHome()"
        class="cursor-pointer rounded-md border border-line px-2.5 py-1 text-muted hover:border-accent hover:text-fg"
      >
        ⌂ Home
      </button>
    </div>

    <div class="relative h-87.5 w-125 overflow-hidden rounded-lg border-2 border-line bg-panel">
      @if (game.phase() === 'playing' && game.current(); as word) {
        <div
          class="absolute left-30 max-w-90 rounded border border-line bg-raised px-3 py-1 text-2xl font-bold text-enemy"
          [style.top.rem]="game.posY()"
        >
          {{ word[game.mode().question] }}
        </div>
      }
    </div>

    <input
      #answer
      type="text"
      placeholder="Gõ Yomikata rồi ấn Enter..."
      [disabled]="game.phase() !== 'playing'"
      (keydown.enter)="submit($event, answer)"
      class="mt-3.75 w-120 rounded-md border bg-canvas p-2.5 text-center text-lg text-accent outline-none transition-colors"
      [class.border-danger]="wrong()"
      [class.border-line]="!wrong()"
    />
  `,
  host: { class: 'flex flex-col items-center' },
})
export class GameBoard {
  protected readonly game = inject(GameService);
  protected readonly maxFails = MAX_FAILS;
  protected readonly wrong = signal(false);
  private readonly answer = viewChild.required<ElementRef<HTMLInputElement>>('answer');
  private readonly injector = inject(Injector);
  private wrongTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    // Clear and focus the input whenever a word starts falling
    effect(() => {
      if (this.game.phase() !== 'playing') return;
      this.game.index(); // also re-run on each new word
      afterNextRender(
        () => {
          const input = this.answer().nativeElement;
          input.value = '';
          input.focus();
        },
        { injector: this.injector },
      );
    });
  }

  protected submit(event: Event, input: HTMLInputElement): void {
    // Enter that confirms a Japanese IME conversion is not a submit
    if ((event as KeyboardEvent).isComposing) return;

    if (this.game.submit(input.value)) {
      input.value = '';
      return;
    }
    // Restart the red flash so repeated wrong answers each get the full 500ms
    clearTimeout(this.wrongTimer);
    this.wrong.set(true);
    this.wrongTimer = setTimeout(() => this.wrong.set(false), 500);
  }
}
