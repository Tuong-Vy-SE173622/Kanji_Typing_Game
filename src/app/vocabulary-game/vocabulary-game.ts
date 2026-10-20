import { Component, DestroyRef, inject } from '@angular/core';
import { GameBoard } from '../game-board/game-board';
import { GameOverDialog } from '../game-over-dialog/game-over-dialog';
import { HomeVocabularyTypingGame } from '../home-vocabulary-typing-game/home-vocabulary-typing-game';
import { SessionCompleteDialog } from '../session-complete-dialog/session-complete-dialog';
import { GameService } from '../shared/game.service';

/** "Game Từ Vựng" route: setup screen, falling-word board and its dialogs. */
@Component({
  selector: 'app-vocabulary-game',
  imports: [HomeVocabularyTypingGame, GameBoard, GameOverDialog, SessionCompleteDialog],
  templateUrl: './vocabulary-game.html',
  host: { class: 'flex w-full flex-col items-center' },
})
export class VocabularyGame {
  protected readonly game = inject(GameService);

  constructor() {
    // Leaving the route stops a running game and resets to the setup screen
    inject(DestroyRef).onDestroy(() => this.game.goHome());
  }
}
