import { Component, computed, inject } from '@angular/core';
import { AutoFocusDirective } from '../shared/auto-focus.directive';
import { GameService, SESSION_MODES, SESSION_SIZES } from '../shared/game.service';
import { ALL, LEVELS } from '../shared/levels';
import { IMPORT_PLACEHOLDER } from '../shared/vocab-import';

@Component({
  selector: 'app-home-vocabulary-typing-game',
  imports: [AutoFocusDirective],
  templateUrl: './home-vocabulary-typing-game.html',
})
export class HomeVocabularyTypingGame {
  protected readonly game = inject(GameService);
  protected readonly sizes = SESSION_SIZES;
  protected readonly modes = SESSION_MODES;
  protected readonly levels = LEVELS;
  protected readonly all = ALL;
  protected readonly placeholder = IMPORT_PLACEHOLDER;

  protected readonly lessons = computed(
    () => LEVELS.find((l) => l.id === this.game.level())?.dropdown ?? [],
  );

  // Parts belong to the selected lesson; 'All' lessons → only 'All' part
  protected readonly parts = computed(() => {
    const lesson = this.lessons().find((l) => String(l.lessionId) === this.game.lesson());
    return lesson?.parts ?? [{ partId: ALL }];
  });

  protected value(event: Event): string {
    return (event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
  }

  protected checked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }
}
