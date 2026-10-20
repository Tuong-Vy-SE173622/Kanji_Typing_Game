import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SoundEffectsService } from '../shared/sound-effects.service';
import { ConjugationRulesDialog } from './conjugation-rules-dialog/conjugation-rules-dialog';
import { VerbGameService } from './verb-game.service';
import { VerbPlay } from './verb-play/verb-play';
import { VerbResult } from './verb-result/verb-result';
import { VerbSetup } from './verb-setup/verb-setup';

/** "Game Chia động từ": top bar + setup / play / result screens. */
@Component({
  selector: 'app-verb-game',
  imports: [RouterLink, VerbSetup, VerbPlay, VerbResult, ConjugationRulesDialog],
  templateUrl: './verb-game.html',
  // Exactly one screen tall (minus the app's padding); screens fit inside, long lists scroll internally
  host: { class: 'flex h-[calc(100dvh-2rem)] w-full max-w-180 flex-col lg:max-w-270' },
})
export class VerbGame {
  protected readonly verb = inject(VerbGameService);
  protected readonly sound = inject(SoundEffectsService);
  protected readonly showRules = signal(false);

  constructor() {
    // Leaving the route stops the timer and resets to the setup screen
    inject(DestroyRef).onDestroy(() => this.verb.backToSetup());
  }
}
