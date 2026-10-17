import { computed, inject, Injectable, signal } from '@angular/core';
import { ALL, getVocabPool, LEVELS } from './levels';
import { SpeechService } from './speech.service';
import { Vocab } from './vocab';
import { parseVocabList } from './vocab-import';

export type Phase = 'home' | 'playing' | 'over' | 'complete';

export const SESSION_SIZES = [5, 10, 20] as const;

export interface SessionMode {
  id: string;
  label: string;
  question: keyof Vocab; // field shown on the falling word
  answer: keyof Vocab; // field the player must type
}

export const SESSION_MODES: SessionMode[] = [
  { id: 'kanji', label: 'Kanji → Yomikana', question: 'kanji', answer: 'yomikata' },
  { id: 'meaning', label: 'Meaning → Yomikana', question: 'meaning', answer: 'yomikata' },
];

// Positions are in rem so the fall scales with the UI (see html font-size in styles.css)
const TICK_MS = 30;
const SPEED = 0.05; // rem per tick
const FLOOR_Y = 18.75; // rem — the word "hits the floor" past this top offset
export const MAX_FAILS = 3;

function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly speech = inject(SpeechService);
  private timer: ReturnType<typeof setInterval> | undefined;

  readonly phase = signal<Phase>('home');
  readonly sessionSize = signal(10);
  readonly mode = signal(SESSION_MODES[0]);

  // Home filters (values are strings to match <select> values)
  readonly level = signal(LEVELS[0].id);
  readonly lesson = signal(ALL);
  readonly part = signal(ALL);
  readonly pool = computed(() => getVocabPool(this.level(), this.lesson(), this.part()));

  // Import mode: words come from the user's pasted Vocab[] instead of the dropdowns
  readonly importMode = signal(false);
  readonly importText = signal('');
  readonly importError = signal('');

  readonly sessionWords = signal<Vocab[]>([]); // unique random words for this session
  readonly index = signal(0); // index of the current word
  readonly posY = signal(0);
  readonly fails = signal(0); // words that reached the floor this session

  readonly current = computed<Vocab | undefined>(() => this.sessionWords()[this.index()]);
  readonly total = computed(() => this.sessionWords().length);
  readonly livesLeft = computed(() => Math.max(0, MAX_FAILS - this.fails()));
  readonly outOfLives = computed(() => this.livesLeft() === 0);

  startSession(size: number): void {
    this.sessionSize.set(size);
    const pool = this.importMode() ? this.importedWords() : this.pool();
    if (pool.length === 0) return;
    this.beginSession(shuffle(pool).slice(0, size));
  }

  setImportText(text: string): void {
    this.importText.set(text);
    this.importError.set('');
  }

  /** Parsed import words, or [] with importError set when the format is wrong. */
  private importedWords(): Vocab[] {
    const result = parseVocabList(this.importText());
    this.importError.set(result.ok ? '' : result.error);
    return result.ok ? result.words : [];
  }

  selectMode(id: string): void {
    const mode = SESSION_MODES.find((m) => m.id === id);
    if (mode) this.mode.set(mode);
  }

  selectLevel(id: string): void {
    this.level.set(id);
    this.lesson.set(ALL);
    this.part.set(ALL);
  }

  selectLesson(id: string): void {
    this.lesson.set(id);
    this.part.set(ALL);
  }

  nextSession(): void {
    this.startSession(this.sessionSize());
  }

  /**
   * After a game over: retry the same word, or — once MAX_FAILS is reached —
   * restart the session from the first word with the same words reshuffled.
   */
  retry(): void {
    if (this.outOfLives()) {
      this.beginSession(shuffle(this.sessionWords()));
      return;
    }
    this.speech.cancel();
    this.spawn();
  }

  goHome(): void {
    this.stop();
    this.speech.cancel();
    this.phase.set('home');
  }

  /** Returns true when the answer was correct. */
  submit(value: string): boolean {
    const expected = this.current()?.[this.mode().answer];
    if (this.phase() !== 'playing' || !expected) return false;
    if (value.trim().toLowerCase() !== expected.trim().toLowerCase()) return false;

    this.index.update((i) => i + 1);
    if (this.index() >= this.total()) {
      this.stop();
      this.phase.set('complete');
    } else {
      this.spawn(); // Tiêu diệt thành công, tạo từ mới
    }
    return true;
  }

  speak(text: string): void {
    this.speech.speak(text);
  }

  private beginSession(words: Vocab[]): void {
    this.sessionWords.set(words);
    this.index.set(0);
    this.fails.set(0);
    this.speech.cancel();
    this.spawn();
  }

  private spawn(): void {
    this.stop();
    this.posY.set(0);
    this.phase.set('playing');
    this.timer = setInterval(() => this.tick(), TICK_MS);
  }

  private tick(): void {
    this.posY.update((y) => y + SPEED);
    if (this.posY() <= FLOOR_Y) return;
    this.stop();
    this.fails.update((f) => f + 1);
    this.phase.set('over');
    const word = this.current();
    if (word) this.speech.speak(word.yomikata);
  }

  private stop(): void {
    clearInterval(this.timer);
    this.timer = undefined;
  }
}
