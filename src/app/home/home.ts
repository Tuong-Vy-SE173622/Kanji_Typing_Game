import { Component, inject } from '@angular/core';
import { AutoFocusDirective } from '../shared/auto-focus.directive';
import { GameService } from '../shared/game.service';

/** Game picker shown on start: Vocabulary game or Verb conjugation game. */
@Component({
  selector: 'app-home',
  imports: [AutoFocusDirective],
  templateUrl: './home.html',
})
export class Home {
  protected readonly game = inject(GameService);
}
