import { Vocab } from './vocab';

export type ImportResult = { ok: true; words: Vocab[] } | { ok: false; error: string };

export const IMPORT_PLACEHOLDER = `[
  { kanji: '父', yomikata: 'ちち', meaning: 'bố của mình' },
  { kanji: '母', yomikata: 'はは', meaning: 'mẹ của mình' }
]`;

const FIELDS: (keyof Vocab)[] = ['kanji', 'yomikata', 'meaning'];

/**
 * Parses a Vocab[] typed by the user. Accepts strict JSON or the object-literal
 * style used in vocab.ts (unquoted keys, single quotes, trailing commas).
 * Duplicate words are removed so a session never repeats a word.
 */
export function parseVocabList(text: string): ImportResult {
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (!text.trim()) return { ok: false, error: 'Vui lòng nhập danh sách từ vựng.' };
  if (start === -1 || end < start) {
    return { ok: false, error: 'Dữ liệu phải là một mảng: [ { kanji, yomikata, meaning }, ... ]' };
  }

  let data: unknown;
  try {
    data = JSON.parse(toJson(text.slice(start, end + 1)));
  } catch {
    return {
      ok: false,
      error: 'Sai định dạng — kiểm tra lại dấu ngoặc { } [ ], dấu phẩy và dấu nháy.',
    };
  }

  if (!Array.isArray(data) || data.length === 0) {
    return { ok: false, error: 'Mảng từ vựng đang rỗng.' };
  }

  const words: Vocab[] = [];
  const seen = new Set<string>();
  for (const [i, item] of data.entries()) {
    if (typeof item !== 'object' || item === null) {
      return {
        ok: false,
        error: `Từ thứ ${i + 1}: phải là một object { kanji, yomikata, meaning }.`,
      };
    }
    const record = item as Record<string, unknown>;
    const missing = FIELDS.find((f) => typeof record[f] !== 'string' || !record[f].trim());
    if (missing) {
      return { ok: false, error: `Từ thứ ${i + 1}: thiếu hoặc sai trường "${missing}".` };
    }
    const word: Vocab = {
      kanji: (record['kanji'] as string).trim(),
      yomikata: (record['yomikata'] as string).trim(),
      meaning: (record['meaning'] as string).trim(),
    };
    const key = `${word.kanji}|${word.yomikata}`;
    if (!seen.has(key)) {
      seen.add(key);
      words.push(word);
    }
  }
  return { ok: true, words };
}

/** Converts a JS object/array literal to JSON text (no eval). */
function toJson(src: string): string {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const c = src[i];

    // Strings: '...' or "..." → JSON string
    if (c === "'" || c === '"') {
      let value = '';
      i++;
      while (i < src.length && src[i] !== c) {
        if (src[i] === '\\' && i + 1 < src.length) {
          const next = src[i + 1];
          value += next === 'n' ? '\n' : next === 't' ? '\t' : next;
          i += 2;
        } else {
          value += src[i++];
        }
      }
      if (i >= src.length) throw new Error('Unterminated string');
      out += JSON.stringify(value);
      i++;
      continue;
    }

    // Line comments
    if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }

    // Identifiers: quote them when used as an object key
    if (/[A-Za-z_$]/.test(c)) {
      let ident = '';
      while (i < src.length && /[\w$]/.test(src[i])) ident += src[i++];
      const rest = src.slice(i).trimStart();
      out += rest.startsWith(':') ? JSON.stringify(ident) : ident;
      continue;
    }

    // Trailing commas before ] or }
    if (c === ',' && /^\s*[\]}]/.test(src.slice(i + 1))) {
      i++;
      continue;
    }

    out += c;
    i++;
  }
  return out;
}
