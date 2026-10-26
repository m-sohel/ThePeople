export interface Article {
  id: string; // e.g. "art-1", "art-21a"
  number: string; // e.g. "1", "21A"
  title: string;
  part: string | null;
  chapter: string | null;
  status: 'active' | 'omitted' | 'repealed';
  fullText: string;
  simpleExplanation: string;
  footnotes: string[];
}

export interface Part {
  id: string; // e.g. "part-i", "part-iva"
  header: string; // e.g. "PART I"
  title: string; // e.g. "THE UNION AND ITS TERRITORY"
  chapters: string[];
  articleIds: string[];
}

export interface Schedule {
  id: string;
  number: number;
  name: string; // e.g. "FIRST SCHEDULE"
  title: string;
  startPage: number;
  endPage: number;
  fullText: string;
  simpleExplanation: string;
}

export interface Appendix {
  id: string;
  number: string;
  title: string;
  description: string;
  startPage: number;
  endPage: number;
  fullText: string;
}

export interface Preamble {
  title: string;
  fullText: string;
  simpleExplanation: string;
  footnotes: string[];
  page: number;
}

export interface ConstitutionData {
  metadata: {
    title: string;
    officialDate: string;
    source: string;
    extractedAt: string;
    stats: {
      totalParts: number;
      totalArticles: number;
      totalSchedules: number;
      totalAppendices: number;
      flaggedItems: number;
    };
  };
  preamble: Preamble;
  parts: Part[];
  articles: Article[];
  schedules: Schedule[];
  appendices: Appendix[];
}

export interface Bookmark {
  id: string;
  articleId: string;
  articleNumber: string;
  title: string;
  part: string | null;
  savedAt: string;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizScore {
  topic: string;
  score: number;
  total: number;
  completedAt: string;
}

export type ThemeMode = 'system' | 'light' | 'dark';
export type FontScale = 'normal' | 'large' | 'extra-large';
export type Language = 'en' | 'hi';

