import { Component, inject } from '@angular/core';
import { AutoFocusDirective } from '../../shared/auto-focus.directive';
import { TIME_LIMIT_S, VerbGameService } from '../verb-game.service';
import { VERB_FORMS, VERB_GROUPS } from '../data/verb-forms';

@Component({
  selector: 'app-verb-setup',
  imports: [AutoFocusDirective],
  templateUrl: './verb-setup.html',
  // Wide screens and landscape phones: options on the right, title / mode / start on the left
  host: {
    class: 'split:grid split:grid-cols-[2fr_3fr] split:content-center split:gap-x-4 lg:gap-x-6',
  },
})
export class VerbSetup {
  protected readonly verb = inject(VerbGameService);
  protected readonly groups = VERB_GROUPS;
  protected readonly forms = VERB_FORMS;
  protected readonly timeLimit = TIME_LIMIT_S;
}
