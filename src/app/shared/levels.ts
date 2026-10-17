import { Lesson, LEVEL_N5_DATA, N5_DATA_DROPDOWN, Vocab } from './vocab';

export const ALL = 'All';

export interface DropdownLesson {
  lessionId: number | string;
  parts: { partId: number | string }[];
}

export interface Level {
  id: string;
  lessons: Lesson[];
  dropdown: DropdownLesson[];
}

/** Add new levels (N4, N3, ...) here. */
export const LEVELS: Level[] = [{ id: 'N5', lessons: LEVEL_N5_DATA, dropdown: N5_DATA_DROPDOWN }];

/** Vocabulary matching the level / lesson / part selection ('All' = no filter). */
export function getVocabPool(levelId: string, lessonId: string, partId: string): Vocab[] {
  const level = LEVELS.find((l) => l.id === levelId);
  if (!level) return [];
  return level.lessons
    .filter((lesson) => lessonId === ALL || String(lesson.lessonId) === lessonId)
    .flatMap((lesson) => lesson.parts)
    .filter((part) => partId === ALL || String(part.partId) === partId)
    .flatMap((part) => part.vocabList);
}
