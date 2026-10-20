const VOWELS = 'aiueo';

// Consonant + vowel rows: 'k' + 'a' → か, ...
const ROWS: Record<string, string> = {
  '': 'あいうえお',
  k: 'かきくけこ',
  s: 'さしすせそ',
  t: 'たちつてと',
  n: 'なにぬねの',
  h: 'はひふへほ',
  m: 'まみむめも',
  r: 'らりるれろ',
  g: 'がぎぐげご',
  z: 'ざじずぜぞ',
  d: 'だぢづでど',
  b: 'ばびぶべぼ',
  p: 'ぱぴぷぺぽ',
};

// Contracted sounds: 'ky' + 'a' → きゃ, ...
const YOON: Record<string, string> = {
  ky: 'き',
  gy: 'ぎ',
  sh: 'し',
  sy: 'し',
  j: 'じ',
  jy: 'じ',
  zy: 'じ',
  ch: 'ち',
  cy: 'ち',
  ty: 'ち',
  ny: 'に',
  hy: 'ひ',
  by: 'び',
  py: 'ぴ',
  my: 'み',
  ry: 'り',
};

const SYLLABLES: Record<string, string> = {
  shi: 'し',
  chi: 'ち',
  tsu: 'つ',
  fu: 'ふ',
  ji: 'じ',
  ya: 'や',
  yu: 'ゆ',
  yo: 'よ',
  wa: 'わ',
  wo: 'を',
  xtsu: 'っ',
  xtu: 'っ',
  ltu: 'っ',
  '-': 'ー',
};
for (const [consonant, kana] of Object.entries(ROWS)) {
  [...kana].forEach((k, i) => (SYLLABLES[consonant + VOWELS[i]] ??= k));
}
for (const [prefix, kana] of Object.entries(YOON)) {
  SYLLABLES[prefix + 'a'] ??= kana + 'ゃ';
  SYLLABLES[prefix + 'u'] ??= kana + 'ゅ';
  SYLLABLES[prefix + 'o'] ??= kana + 'ょ';
}

const MAX_LEN = Math.max(...Object.keys(SYLLABLES).map((k) => k.length));
const isVowelOrY = (c: string | undefined) => c !== undefined && (VOWELS + 'y').includes(c);

/** Converts romaji to hiragana; non-romaji characters pass through unchanged. */
export function romajiToHiragana(input: string): string {
  const s = input.toLowerCase();
  let out = '';
  let i = 0;
  while (i < s.length) {
    const c = s[i];

    // Double consonant → small っ ("itte", "matcha")
    if (/[bcdfghjkmpqrstvwz]/.test(c) && (s[i + 1] === c || s.startsWith('tch', i))) {
      out += 'っ';
      i++;
      continue;
    }

    // ん: "n" before a consonant / end, "nn" not followed by a vowel, or "n'"
    if (c === 'n' && !isVowelOrY(s[i + 1])) {
      const skip = s[i + 1] === "'" || (s[i + 1] === 'n' && !isVowelOrY(s[i + 2])) ? 2 : 1;
      out += 'ん';
      i += skip;
      continue;
    }

    let len = Math.min(MAX_LEN, s.length - i);
    while (len > 0 && !SYLLABLES[s.slice(i, i + len)]) len--;
    if (len > 0) {
      out += SYLLABLES[s.slice(i, i + len)];
      i += len;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

/** Normalizes a typed answer to hiragana: trims spaces, converts romaji and katakana. */
export function toHiragana(input: string): string {
  const kana = romajiToHiragana(input.replace(/\s+/g, ''));
  // Katakana block is exactly 0x60 above hiragana
  return kana.replace(/[ァ-ヶ]/g, (k) => String.fromCharCode(k.charCodeAt(0) - 0x60));
}
