import { Component, inject } from '@angular/core';
import { AutoFocusDirective } from '../shared/auto-focus.directive';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-session-complete-dialog',
  imports: [AutoFocusDirective],
  templateUrl: './session-complete-dialog.html',
})
export class SessionCompleteDialog {
  protected readonly game = inject(GameService);
}
