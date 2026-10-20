export type VerbGroup = 'g1' | 'g2' | 'g3';

export const VERB_GROUPS: { id: VerbGroup; label: string; short: string }[] = [
  { id: 'g1', label: 'G1 (五段 · Godan)', short: 'G1 · Godan' },
  { id: 'g2', label: 'G2 (一段 · Ichidan)', short: 'G2 · Ichidan' },
  { id: 'g3', label: 'G3 (変格 · Bất quy tắc)', short: 'G3 · Bất quy tắc' },
];

/** Vowel row a Godan verb's last kana moves to (書く → か/き/く/け/こ). */
export type Vowel = 'a' | 'i' | 'u' | 'e' | 'o';

interface VerbFormSpec {
  id: string;
  name: string;
  short: string; // compact label for chips
  jp: string;
  /** Godan: move the last kana to `row` and add `suffix`, or apply the て/た sound change. */
  godan: { row: Vowel; suffix: string } | { soundChange: 'て' | 'た' };
  /** Ichidan: replaces the final る */
  ichidan: string;
  /** Irregular: replaces the final する / くる (in kana) */
  suru: string;
  kuru: string;
  /** Rule text for the cheat sheet */
  rule: { g1: string; g2: string };
}

const TE_RULE = (te: string, de: string) =>
  `く→い${te} · ぐ→い${de}\nう・つ・る→っ${te}\nむ・ぬ・ぶ→ん${de}\nす→し${te}`;

/**
 * Conjugation forms, in display order.
 * To add a form: add one entry here — the game, setup screen and cheat sheet pick it up.
 */
export const VERB_FORMS = [
  {
    id: 'masu',
    name: 'Thể Masu',
    short: 'Masu',
    jp: '丁寧形',
    godan: { row: 'i', suffix: 'ます' },
    ichidan: 'ます',
    suru: 'します',
    kuru: 'きます',
    rule: { g1: 'U → I + ます', g2: 'Bỏ る + ます' },
  },
  {
    id: 'nai',
    name: 'Thể Phủ định (Nai)',
    short: 'Nai',
    jp: 'ない形',
    godan: { row: 'a', suffix: 'ない' },
    ichidan: 'ない',
    suru: 'しない',
    kuru: 'こない',
    rule: { g1: 'U → A + ない (う → わ)', g2: 'Bỏ る + ない' },
  },
  {
    id: 'te',
    name: 'Thể Te',
    short: 'Te',
    jp: 'て形',
    godan: { soundChange: 'て' },
    ichidan: 'て',
    suru: 'して',
    kuru: 'きて',
    rule: { g1: TE_RULE('て', 'で'), g2: 'Bỏ る + て' },
  },
  {
    id: 'ta',
    name: 'Thể Quá khứ (Ta)',
    short: 'Ta',
    jp: 'た形',
    godan: { soundChange: 'た' },
    ichidan: 'た',
    suru: 'した',
    kuru: 'きた',
    rule: { g1: TE_RULE('た', 'だ'), g2: 'Bỏ る + た' },
  },
  {
    id: 'potential',
    name: 'Thể Khả năng',
    short: 'Khả năng',
    jp: '可能形',
    godan: { row: 'e', suffix: 'る' },
    ichidan: 'られる',
    suru: 'できる',
    kuru: 'こられる',
    rule: { g1: 'U → E + る', g2: 'Bỏ る + られる' },
  },
  {
    id: 'volitional',
    name: 'Thể Ý định',
    short: 'Ý định',
    jp: '意向形',
    godan: { row: 'o', suffix: 'う' },
    ichidan: 'よう',
    suru: 'しよう',
    kuru: 'こよう',
    rule: { g1: 'U → O + う', g2: 'Bỏ る + よう' },
  },
  {
    id: 'conditional',
    name: 'Thể Điều kiện (Ba)',
    short: 'Điều kiện',
    jp: '条件形',
    godan: { row: 'e', suffix: 'ば' },
    ichidan: 'れば',
    suru: 'すれば',
    kuru: 'くれば',
    rule: { g1: 'U → E + ば', g2: 'Bỏ る + れば' },
  },
  {
    id: 'passive',
    name: 'Thể Bị động',
    short: 'Bị động',
    jp: '受身形',
    godan: { row: 'a', suffix: 'れる' },
    ichidan: 'られる',
    suru: 'される',
    kuru: 'こられる',
    rule: { g1: 'U → A + れる (う → わ)', g2: 'Bỏ る + られる' },
  },
  {
    id: 'causative',
    name: 'Thể Sai khiến',
    short: 'Sai khiến',
    jp: '使役形',
    godan: { row: 'a', suffix: 'せる' },
    ichidan: 'させる',
    suru: 'させる',
    kuru: 'こさせる',
    rule: { g1: 'U → A + せる (う → わ)', g2: 'Bỏ る + させる' },
  },
] as const satisfies readonly VerbFormSpec[];

export type VerbForm = (typeof VERB_FORMS)[number];
export type FormId = VerbForm['id'];
