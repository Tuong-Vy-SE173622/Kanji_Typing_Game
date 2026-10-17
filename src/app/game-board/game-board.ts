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
  templateUrl: './game-board.html',
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
