// Shared content interfaces. Content modules in this folder must conform
// to these shapes so scripts/seed.ts can load them into SQLite.

export interface Topic {
  slug: string;
  title: string;
  category:
    | "fundamentals"
    | "components"
    | "analysis"
    | "protection"
    | "renewables";
  description: string;
  order: number;
}

export interface Lesson {
  slug: string;
  topicSlug: string;
  title: string;
  summary: string;
  /** Markdown body */
  content: string;
  order: number;
}

export interface ToolGuide {
  slug: "psse" | "pscad" | "etap";
  name: string;
  tagline: string;
  /** Markdown body */
  content: string;
  order: number;
}

export interface InterviewQuestion {
  id: string;
  category:
    | "fundamentals"
    | "analysis"
    | "protection"
    | "tools"
    | "behavioral";
  tool?: "psse" | "pscad" | "etap" | null;
  question: string;
  /** Markdown body */
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizQuestion {
  id: string;
  topicSlug: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category:
    | "fundamentals"
    | "components"
    | "analysis"
    | "protection"
    | "renewables"
    | "tools";
}
