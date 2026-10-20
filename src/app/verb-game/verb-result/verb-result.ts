import { Component, inject } from '@angular/core';
import { AutoFocusDirective } from '../../shared/auto-focus.directive';
import { VerbGameService } from '../verb-game.service';

@Component({
  selector: 'app-verb-result',
  imports: [AutoFocusDirective],
  templateUrl: './verb-result.html',
  host: { class: 'flex min-h-0 flex-col' },
})
export class VerbResult {
  protected readonly verb = inject(VerbGameService);
}
