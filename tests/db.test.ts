/**
 * Integration test of the seed → SQLite → query pipeline.
 * `npm test` runs the seed script first, so data/learning.db exists here.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

import {
  getAllLessons,
  getGlossary,
  getInterviewQuestions,
  getLesson,
  getLessonsForTopic,
  getQuizQuestionsForTopic,
  getTool,
  getTools,
  getTopic,
  getTopics,
} from "../src/lib/db";

import { topics } from "../src/content/topics";
import { lessons } from "../src/content/lessons";
import { tools } from "../src/content/tools";
import { interviewQuestions } from "../src/content/interview";
import { quizQuestions } from "../src/content/quiz";
import { glossary } from "../src/content/glossary";

beforeAll(() => {
  const dbPath = path.join(process.cwd(), "data", "learning.db");
  if (!existsSync(dbPath)) {
    throw new Error(`${dbPath} missing — run \`npm run seed\` (or \`npm test\`, which seeds first).`);
  }
});

describe("seeded database", () => {
  it("row counts match the content modules", () => {
    expect(getTopics()).toHaveLength(topics.length);
    expect(getAllLessons()).toHaveLength(lessons.length);
    expect(getTools()).toHaveLength(tools.length);
    expect(getInterviewQuestions()).toHaveLength(interviewQuestions.length);
    expect(getGlossary()).toHaveLength(glossary.length);
  });

  it("looks up a topic and its lessons", () => {
    const first = topics[0];
    const topic = getTopic(first.slug);
    expect(topic?.title).toBe(first.title);
    expect(topic?.category).toBe(first.category);

    const topicLessons = getLessonsForTopic(first.slug);
    const expected = lessons.filter((l) => l.topicSlug === first.slug);
    expect(topicLessons).toHaveLength(expected.length);
  });

  it("looks up a lesson with full content", () => {
    const first = lessons[0];
    const lesson = getLesson(first.slug);
    expect(lesson?.title).toBe(first.title);
    expect(lesson?.content).toBe(first.content);
    expect(lesson?.topic_slug).toBe(first.topicSlug);
  });

  it("returns undefined for unknown slugs", () => {
    expect(getTopic("no-such-topic")).toBeUndefined();
    expect(getLesson("no-such-lesson")).toBeUndefined();
    expect(getTool("no-such-tool")).toBeUndefined();
  });

  it("retrieves each tool guide", () => {
    for (const t of tools) {
      const row = getTool(t.slug);
      expect(row?.name).toBe(t.name);
      expect(row?.content).toBe(t.content);
    }
  });

  it("quiz options round-trip through JSON with valid correct_index", () => {
    let checked = 0;
    for (const topic of topics) {
      for (const row of getQuizQuestionsForTopic(topic.slug)) {
        const options = JSON.parse(row.options);
        expect(Array.isArray(options)).toBe(true);
        expect(options).toHaveLength(4);
        expect(row.correct_index).toBeGreaterThanOrEqual(0);
        expect(row.correct_index).toBeLessThanOrEqual(3);
        checked++;
      }
    }
    expect(checked).toBe(quizQuestions.length);
  });

  it("interview questions preserve the tool field", () => {
    const rows = getInterviewQuestions();
    const byId = new Map(rows.map((r) => [r.id, r]));
    for (const q of interviewQuestions) {
      const row = byId.get(q.id);
      expect(row).toBeDefined();
      expect(row?.tool ?? null).toBe(q.tool ?? null);
    }
  });
});
