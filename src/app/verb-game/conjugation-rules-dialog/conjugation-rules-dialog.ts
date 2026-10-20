import { Component, output } from '@angular/core';
import { AutoFocusDirective } from '../../shared/auto-focus.directive';
import { conjugate, toVerb } from '../conjugation';
import { VERB_FORMS } from '../data/verb-forms';

// Example verbs for each column; their forms come from the same engine the game uses
const EXAMPLES = {
  g1: toVerb({ word: '書[か]く', group: 'g1', meaning: 'Viết' }),
  g2: toVerb({ word: '食[た]べる', group: 'g2', meaning: 'Ăn' }),
  suru: toVerb({ word: 'する', group: 'g3', meaning: 'Làm' }),
  kuru: toVerb({ word: '来[く]る', group: 'g3', meaning: 'Đến' }),
};

/** Cheat sheet of every conjugation form, generated from VERB_FORMS. */
@Component({
  selector: 'app-conjugation-rules-dialog',
  imports: [AutoFocusDirective],
  templateUrl: './conjugation-rules-dialog.html',
  host: { '(document:keydown.escape)': 'closed.emit()' },
})
export class ConjugationRulesDialog {
  readonly closed = output();
  protected readonly examples = EXAMPLES;
  protected readonly rows = VERB_FORMS.map((form) => ({
    form,
    g1: conjugate(EXAMPLES.g1, form),
    g2: conjugate(EXAMPLES.g2, form),
    suru: conjugate(EXAMPLES.suru, form),
    kuru: conjugate(EXAMPLES.kuru, form),
  }));
}
