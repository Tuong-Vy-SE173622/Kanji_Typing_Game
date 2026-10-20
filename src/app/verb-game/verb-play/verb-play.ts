import { Component, computed, inject } from '@angular/core';
import { AutoFocusDirective } from '../../shared/auto-focus.directive';
import { VERB_GROUPS } from '../data/verb-forms';
import { RubyText } from '../ruby-text/ruby-text';
import { Question, VerbGameService } from '../verb-game.service';

@Component({
  selector: 'app-verb-play',
  imports: [AutoFocusDirective, RubyText],
  templateUrl: './verb-play.html',
  // Wide screens and landscape phones: verb card on the left, answers and feedback on the right
  host: {
    class: 'split:grid split:grid-cols-2 split:content-center split:gap-x-3 lg:gap-x-5',
    '(document:keydown)': 'pickWithKey($event)',
  },
})
export class VerbPlay {
  protected readonly verb = inject(VerbGameService);

  /** Feedback panel: always after a wrong answer; after a correct one only in practice mode. */
  protected readonly showFeedback = computed(() => {
    const result = this.verb.result();
    return !!result && (!result.correct || this.verb.playMode() === 'practice');
  });

  protected groupName(q: Question): string {
    return VERB_GROUPS.find((g) => g.id === q.verb.group)?.short ?? '';
  }

  /** The rule behind the answer: the form's rule for Godan/Ichidan, the verb's note otherwise. */
  protected rule(q: Question): string | undefined {
    return q.verb.note ?? (q.verb.group === 'g3' ? undefined : q.form.rule[q.verb.group]);
  }

  /** Multiple-choice option state once answered: correct / wrong pick / the rest dimmed. */
  protected optionClass(option: string, q: Question): string {
    const result = this.verb.result();
    if (!result) return '';
    if (option === q.answer) return 'correct';
    return option === result.given ? 'wrong' : 'dimmed';
  }

  protected submitText(event: Event, input: HTMLInputElement): void {
    // Enter that confirms a Japanese IME conversion is not a submit
    if ((event as KeyboardEvent).isComposing) return;
    this.verb.submit(input.value);
  }

  /** Keys 1–4 pick a multiple-choice option. */
  protected pickWithKey(event: KeyboardEvent): void {
    const q = this.verb.question();
    if (!q || this.verb.answerType() !== 'choice' || this.verb.result()) return;
    const option = q.options[Number(event.key) - 1];
    if (option) this.verb.submit(option);
  }
}
