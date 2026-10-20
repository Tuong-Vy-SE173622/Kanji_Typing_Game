import { computed, inject, Injectable, signal } from '@angular/core';
import { pickRandom, shuffle } from '../shared/random';
import { toHiragana } from '../shared/romaji';
import { SoundEffectsService } from '../shared/sound-effects.service';
import { SpeechService } from '../shared/speech.service';
import { conjugate, distractors, toVerb, Verb } from './conjugation';
import { FormId, VERB_FORMS, VERB_GROUPS, VerbForm, VerbGroup } from './data/verb-forms';
import { VERBS } from './data/verbs';

export type VerbScreen = 'setup' | 'playing' | 'result';
export type PlayMode = 'practice' | 'time';
export type AnswerType = 'choice' | 'text';

export const TIME_LIMIT_S = 60;
const TIME_BONUS_S = 2; // added per correct answer in time mode
const BASE_POINTS = 100;
const STREAK_STEP = 3; // multiplier grows every 3 correct answers in a row...
const MAX_MULTIPLIER = 4; // ...up to x4
const AUTO_NEXT_MS = 400; // time mode: pause on a correct answer before the next question

const ALL_VERBS: Verb[] = VERBS.map(toVerb);

export interface Question {
  verb: Verb;
  form: VerbForm;
  answer: string;
  options: string[]; // shuffled answer + distractors (multiple choice)
}

export interface AnswerResult {
  given: string;
  correct: boolean;
}

export interface Mistake {
  question: Question;
  given: string;
}

@Injectable({ providedIn: 'root' })
export class VerbGameService {
  private readonly sound = inject(SoundEffectsService);
  private readonly speech = inject(SpeechService);
  private clock: ReturnType<typeof setInterval> | undefined;
  private autoNext: ReturnType<typeof setTimeout> | undefined;

  readonly screen = signal<VerbScreen>('setup');

  // Settings
  readonly playMode = signal<PlayMode>('time');
  readonly answerType = signal<AnswerType>('choice');
  readonly groups = signal<ReadonlySet<VerbGroup>>(new Set(VERB_GROUPS.map((g) => g.id)));
  readonly forms = signal<ReadonlySet<FormId>>(new Set(VERB_FORMS.map((f) => f.id)));

  // Current run
  readonly score = signal(0);
  readonly streak = signal(0);
  readonly maxStreak = signal(0);
  readonly timeLeft = signal(TIME_LIMIT_S);
  readonly answered = signal(0);
  readonly correctCount = signal(0);
  readonly mistakes = signal<Mistake[]>([]);
  readonly question = signal<Question | null>(null);
  readonly result = signal<AnswerResult | null>(null); // null while waiting for an answer
  readonly timeUp = signal(false);

  readonly questionNo = computed(() => this.answered() + (this.result() ? 0 : 1));
  readonly multiplier = computed(() =>
    Math.min(Math.floor(this.streak() / STREAK_STEP) + 1, MAX_MULTIPLIER),
  );
  readonly accuracy = computed(() =>
    this.answered() ? Math.round((this.correctCount() / this.answered()) * 100) : 0,
  );

  toggleGroup(id: VerbGroup): void {
    this.groups.update((set) => toggle(set, id));
  }

  toggleForm(id: FormId): void {
    this.forms.update((set) => toggle(set, id));
  }

  selectAllForms(): void {
    this.forms.set(new Set(VERB_FORMS.map((f) => f.id)));
  }

  start(): void {
    this.stop();
    this.score.set(0);
    this.streak.set(0);
    this.maxStreak.set(0);
    this.answered.set(0);
    this.correctCount.set(0);
    this.mistakes.set([]);
    this.timeUp.set(false);
    this.timeLeft.set(TIME_LIMIT_S);
    if (this.playMode() === 'time') this.clock = setInterval(() => this.tick(), 1000);
    this.screen.set('playing');
    this.next();
  }

  next(): void {
    clearTimeout(this.autoNext);
    this.result.set(null);
    this.question.set(this.makeQuestion());
  }

  /** Checks an answer (multiple-choice option, or typed hiragana / romaji / katakana). */
  submit(input: string): void {
    const q = this.question();
    const given = toHiragana(input);
    if (!q || this.result() || !given) return;

    const correct = given === q.answer;
    this.result.set({ given, correct });
    this.answered.update((n) => n + 1);

    if (correct) {
      this.sound.play('correct');
      this.correctCount.update((n) => n + 1);
      this.streak.update((n) => n + 1);
      this.maxStreak.update((n) => Math.max(n, this.streak()));
      this.score.update((s) => s + BASE_POINTS * this.multiplier());
      if (this.playMode() === 'time') {
        this.timeLeft.update((t) => t + TIME_BONUS_S);
        this.autoNext = setTimeout(() => this.next(), AUTO_NEXT_MS);
      }
    } else {
      this.sound.play('wrong');
      this.streak.set(0);
      this.mistakes.update((list) => [...list, { question: q, given }]);
    }
  }

  speak(text: string): void {
    this.speech.speak(text);
  }

  end(): void {
    this.stop();
    this.screen.set('result');
  }

  backToSetup(): void {
    this.stop();
    this.screen.set('setup');
  }

  stop(): void {
    clearInterval(this.clock);
    clearTimeout(this.autoNext);
    this.clock = this.autoNext = undefined;
    this.speech.cancel();
  }

  private tick(): void {
    this.timeLeft.update((t) => t - 1);
    if (this.timeLeft() > 0) return;
    this.sound.play('timeUp');
    this.timeUp.set(true);
    this.end();
  }

  private makeQuestion(): Question {
    const verbs = ALL_VERBS.filter((v) => this.groups().has(v.group));
    const forms = VERB_FORMS.filter((f) => this.forms().has(f.id));
    const prev = this.question();

    // Avoid asking the exact same thing twice in a row
    let verb: Verb, form: VerbForm;
    do {
      verb = pickRandom(verbs);
      form = pickRandom(forms);
    } while (verbs.length * forms.length > 1 && prev?.verb === verb && prev.form === form);

    const answer = conjugate(verb, form);
    return { verb, form, answer, options: shuffle([answer, ...distractors(verb, form)]) };
  }
}

/** Adds or removes an item, but never empties the selection. */
function toggle<T>(set: ReadonlySet<T>, item: T): ReadonlySet<T> {
  const next = new Set(set);
  if (!next.delete(item)) next.add(item);
  return next.size ? next : set;
}
