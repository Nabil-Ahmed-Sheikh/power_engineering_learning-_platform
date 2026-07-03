import Database from "better-sqlite3";
import path from "node:path";

export interface TopicRow {
  slug: string;
  title: string;
  category: string;
  description: string;
  order: number;
}

export interface LessonRow {
  slug: string;
  topic_slug: string;
  title: string;
  summary: string;
  content: string;
  order: number;
}

export interface ToolRow {
  slug: string;
  name: string;
  tagline: string;
  content: string;
  order: number;
}

export interface InterviewQuestionRow {
  id: string;
  category: string;
  tool: string | null;
  question: string;
  answer: string;
  difficulty: string;
}

export interface QuizQuestionRow {
  id: string;
  topic_slug: string;
  question: string;
  options: string; // JSON-encoded string[]
  correct_index: number;
  explanation: string;
}

export interface GlossaryRow {
  term: string;
  definition: string;
  category: string;
}

let db: Database.Database | null = null;

/** Opens (and caches) a read-only connection to the seeded SQLite database. */
export function getDb(): Database.Database {
  if (db) return db;
  const dbPath = path.join(process.cwd(), "data", "learning.db");
  db = new Database(dbPath, { readonly: true, fileMustExist: true });
  return db;
}

export function getTopics(): TopicRow[] {
  return getDb()
    .prepare(`SELECT * FROM topics ORDER BY category, "order"`)
    .all() as TopicRow[];
}

export function getTopic(slug: string): TopicRow | undefined {
  return getDb().prepare(`SELECT * FROM topics WHERE slug = ?`).get(slug) as
    | TopicRow
    | undefined;
}

export function getLessonsForTopic(topicSlug: string): LessonRow[] {
  return getDb()
    .prepare(`SELECT * FROM lessons WHERE topic_slug = ? ORDER BY "order"`)
    .all(topicSlug) as LessonRow[];
}

export function getLesson(slug: string): LessonRow | undefined {
  return getDb().prepare(`SELECT * FROM lessons WHERE slug = ?`).get(slug) as
    | LessonRow
    | undefined;
}

export function getAllLessons(): LessonRow[] {
  return getDb().prepare(`SELECT * FROM lessons ORDER BY "order"`).all() as LessonRow[];
}

export function getTools(): ToolRow[] {
  return getDb().prepare(`SELECT * FROM tools ORDER BY "order"`).all() as ToolRow[];
}

export function getTool(slug: string): ToolRow | undefined {
  return getDb().prepare(`SELECT * FROM tools WHERE slug = ?`).get(slug) as
    | ToolRow
    | undefined;
}

export function getInterviewQuestions(): InterviewQuestionRow[] {
  return getDb()
    .prepare(`SELECT * FROM interview_questions ORDER BY category, difficulty`)
    .all() as InterviewQuestionRow[];
}

export function getQuizQuestionsForTopic(topicSlug: string): QuizQuestionRow[] {
  return getDb()
    .prepare(`SELECT * FROM quiz_questions WHERE topic_slug = ?`)
    .all(topicSlug) as QuizQuestionRow[];
}

export function getGlossary(): GlossaryRow[] {
  return getDb().prepare(`SELECT * FROM glossary ORDER BY term`).all() as GlossaryRow[];
}
