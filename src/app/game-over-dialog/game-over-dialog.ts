import { Component, inject } from '@angular/core';
import { AutoFocusDirective } from '../shared/auto-focus.directive';
import { GameService, MAX_FAILS } from '../shared/game.service';

/** Shown each time a word reaches the floor; the 3rd fail is the real game over. */
@Component({
  selector: 'app-game-over-dialog',
  imports: [AutoFocusDirective],
  templateUrl: './game-over-dialog.html',
})
export class GameOverDialog {
  protected readonly game = inject(GameService);
  protected readonly maxFails = MAX_FAILS;
}
