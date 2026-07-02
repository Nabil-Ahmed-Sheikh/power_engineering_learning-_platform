/**
 * Builds data/learning.db from the content modules in src/content/*.
 * Run with: npm run seed
 */
import Database from "better-sqlite3";
import { mkdirSync, existsSync, unlinkSync } from "node:fs";
import path from "node:path";

import { topics } from "../src/content/topics";
import { lessons } from "../src/content/lessons";
import { tools } from "../src/content/tools";
import { interviewQuestions } from "../src/content/interview";
import { quizQuestions } from "../src/content/quiz";
import { glossary } from "../src/content/glossary";

const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "learning.db");

if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
if (existsSync(dbPath)) unlinkSync(dbPath);

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE topics (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    "order" INTEGER NOT NULL
  );

  CREATE TABLE lessons (
    slug TEXT PRIMARY KEY,
    topic_slug TEXT NOT NULL REFERENCES topics(slug),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    "order" INTEGER NOT NULL
  );

  CREATE TABLE tools (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    content TEXT NOT NULL,
    "order" INTEGER NOT NULL
  );

  CREATE TABLE interview_questions (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    tool TEXT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    difficulty TEXT NOT NULL
  );

  CREATE TABLE quiz_questions (
    id TEXT PRIMARY KEY,
    topic_slug TEXT NOT NULL REFERENCES topics(slug),
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    correct_index INTEGER NOT NULL,
    explanation TEXT NOT NULL
  );

  CREATE TABLE glossary (
    term TEXT PRIMARY KEY,
    definition TEXT NOT NULL,
    category TEXT NOT NULL
  );

  CREATE INDEX idx_lessons_topic ON lessons(topic_slug);
  CREATE INDEX idx_quiz_topic ON quiz_questions(topic_slug);
  CREATE INDEX idx_interview_category ON interview_questions(category);
`);

const insertTopic = db.prepare(
  `INSERT INTO topics (slug, title, category, description, "order") VALUES (@slug, @title, @category, @description, @order)`
);
const insertLesson = db.prepare(
  `INSERT INTO lessons (slug, topic_slug, title, summary, content, "order") VALUES (@slug, @topicSlug, @title, @summary, @content, @order)`
);
const insertTool = db.prepare(
  `INSERT INTO tools (slug, name, tagline, content, "order") VALUES (@slug, @name, @tagline, @content, @order)`
);
const insertInterview = db.prepare(
  `INSERT INTO interview_questions (id, category, tool, question, answer, difficulty) VALUES (@id, @category, @tool, @question, @answer, @difficulty)`
);
const insertQuiz = db.prepare(
  `INSERT INTO quiz_questions (id, topic_slug, question, options, correct_index, explanation) VALUES (@id, @topicSlug, @question, @options, @correctIndex, @explanation)`
);
const insertGlossary = db.prepare(
  `INSERT INTO glossary (term, definition, category) VALUES (@term, @definition, @category)`
);

const topicSlugs = new Set(topics.map((t) => t.slug));

const insertAll = db.transaction(() => {
  for (const t of topics) insertTopic.run(t);

  for (const l of lessons) {
    if (!topicSlugs.has(l.topicSlug)) {
      throw new Error(`Lesson "${l.slug}" references unknown topic "${l.topicSlug}"`);
    }
    insertLesson.run(l);
  }

  for (const tool of tools) insertTool.run(tool);

  for (const q of interviewQuestions) {
    insertInterview.run({ ...q, tool: q.tool ?? null });
  }

  for (const q of quizQuestions) {
    if (!topicSlugs.has(q.topicSlug)) {
      throw new Error(`Quiz question "${q.id}" references unknown topic "${q.topicSlug}"`);
    }
    insertQuiz.run({ ...q, options: JSON.stringify(q.options) });
  }

  for (const g of glossary) insertGlossary.run(g);
});

insertAll();

console.log(
  `Seeded ${dbPath}\n` +
    `  topics: ${topics.length}\n` +
    `  lessons: ${lessons.length}\n` +
    `  tools: ${tools.length}\n` +
    `  interview questions: ${interviewQuestions.length}\n` +
    `  quiz questions: ${quizQuestions.length}\n` +
    `  glossary terms: ${glossary.length}`
);

db.close();
