import { Component, inject } from '@angular/core';
import { GameBoard } from './game-board/game-board';
import { GameOverDialog } from './game-over-dialog/game-over-dialog';
import { Home } from './home/home';
import { HomeVocabularyTypingGame } from './home-vocabulary-typing-game/home-vocabulary-typing-game';
import { SessionCompleteDialog } from './session-complete-dialog/session-complete-dialog';
import { GameService } from './shared/game.service';

@Component({
  selector: 'app-root',
  imports: [Home, HomeVocabularyTypingGame, GameBoard, GameOverDialog, SessionCompleteDialog],
  templateUrl: './app.html',
  host: { class: 'flex min-h-dvh flex-col items-center justify-center p-4' },
})
export class App {
  protected readonly game = inject(GameService);
}
