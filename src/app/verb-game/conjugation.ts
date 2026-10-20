import { shuffle } from '../shared/random';
import { VERB_FORMS, VerbForm, VerbGroup } from './data/verb-forms';
import { VerbEntry } from './data/verbs';

export interface RubySegment {
  text: string;
  furigana?: string;
}

/** A verb entry with its parsed spellings. */
export interface Verb extends VerbEntry {
  kanji: string; // 食べる
  reading: string; // たべる
  ruby: RubySegment[]; // [{食, た}, {べる}]
}

// Kana each Godan ending moves through, in a-i-u-e-o order
const GODAN_ROWS: Record<string, string> = {
  う: 'わいうえお',
  く: 'かきくけこ',
  ぐ: 'がぎぐげご',
  す: 'さしすせそ',
  つ: 'たちつてと',
  ぬ: 'なにぬねの',
  ぶ: 'ばびぶべぼ',
  む: 'まみむめも',
  る: 'らりるれろ',
};
const VOWEL_INDEX = { a: 0, i: 1, u: 2, e: 3, o: 4 };

// て-form sound changes of Godan verbs (た-form swaps て→た, で→だ)
const TE_ENDINGS: Record<string, string> = {
  く: 'いて',
  ぐ: 'いで',
  う: 'って',
  つ: 'って',
  る: 'って',
  む: 'んで',
  ぬ: 'んで',
  ぶ: 'んで',
  す: 'して',
};

const KANJI_RUN = /[㐀-鿿々]+$/;

/** Parses '勉[べん]強[きょう]する' into ruby segments. */
export function parseFurigana(markup: string): RubySegment[] {
  const segments: RubySegment[] = [];
  for (const [, text, furigana] of markup.matchAll(/([^[]*)(?:\[([^\]]*)\])?/g)) {
    if (!text) continue;
    if (!furigana) {
      segments.push({ text });
      continue;
    }
    // The reading belongs to the kanji right before the brackets
    const kanji = text.match(KANJI_RUN)?.[0] ?? text;
    if (kanji !== text) segments.push({ text: text.slice(0, -kanji.length) });
    segments.push({ text: kanji, furigana });
  }
  return segments;
}

export function toVerb(entry: VerbEntry): Verb {
  const ruby = parseFurigana(entry.word);
  return {
    ...entry,
    ruby,
    kanji: ruby.map((s) => s.text).join(''),
    reading: ruby.map((s) => s.furigana ?? s.text).join(''),
  };
}

/** Conjugates a verb (as `group`, default its own) into hiragana. */
export function conjugate(verb: Verb, form: VerbForm, group: VerbGroup = verb.group): string {
  const exception = group === verb.group ? verb.exceptions?.[form.id] : undefined;
  if (exception) return exception;

  const r = verb.reading;
  const stem = r.slice(0, -1);
  const last = r.slice(-1);

  if (group === 'g3') {
    if (r.endsWith('する')) return r.slice(0, -2) + form.suru;
    if (r.endsWith('くる')) return r.slice(0, -2) + form.kuru;
    throw new Error(`Irregular verb must end in する or くる: ${verb.word}`);
  }

  if (group === 'g2') {
    if (last !== 'る') throw new Error(`Ichidan verb must end in る: ${verb.word}`);
    return stem + form.ichidan;
  }

  const row = GODAN_ROWS[last];
  if (!row) throw new Error(`Not a Godan ending: ${verb.word}`);
  if ('soundChange' in form.godan) {
    const te = TE_ENDINGS[last];
    return (
      stem + (form.godan.soundChange === 'た' ? te.replace('て', 'た').replace('で', 'だ') : te)
    );
  }
  return stem + row[VOWEL_INDEX[form.godan.row]] + form.godan.suffix;
}

/**
 * Three wrong answers that look plausible: the verb conjugated with the other
 * group's rules (the classic Godan/Ichidan mix-up), then its other forms.
 */
export function distractors(verb: Verb, form: VerbForm, count = 3): string[] {
  const correct = conjugate(verb, form);
  const wrongGroup: VerbGroup | undefined =
    verb.group === 'g1' && verb.reading.endsWith('る')
      ? 'g2'
      : verb.group === 'g2'
        ? 'g1'
        : undefined;

  const candidates = [
    ...(wrongGroup ? [conjugate(verb, form, wrongGroup)] : []),
    ...shuffle(VERB_FORMS.filter((f) => f.id !== form.id).map((f) => conjugate(verb, f))),
  ];
  return [...new Set(candidates.filter((c) => c !== correct))].slice(0, count);
}
