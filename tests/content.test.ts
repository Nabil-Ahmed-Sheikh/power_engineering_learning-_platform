import { describe, expect, it } from "vitest";

import { topics } from "../src/content/topics";
import { lessons } from "../src/content/lessons";
import { tools } from "../src/content/tools";
import { interviewQuestions } from "../src/content/interview";
import { quizQuestions } from "../src/content/quiz";
import { glossary } from "../src/content/glossary";

const topicSlugs = new Set(topics.map((t) => t.slug));

function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) dupes.add(v);
    seen.add(v);
  }
  return [...dupes];
}

describe("topics", () => {
  it("has unique slugs", () => {
    expect(findDuplicates(topics.map((t) => t.slug))).toEqual([]);
  });

  it("only uses known categories", () => {
    const allowed = ["fundamentals", "components", "analysis", "protection", "renewables"];
    for (const t of topics) {
      expect(allowed, `topic ${t.slug}`).toContain(t.category);
    }
  });
});

describe("lessons", () => {
  it("has unique slugs", () => {
    expect(findDuplicates(lessons.map((l) => l.slug))).toEqual([]);
  });

  it("every lesson references an existing topic", () => {
    for (const l of lessons) {
      expect(topicSlugs.has(l.topicSlug), `lesson ${l.slug} → ${l.topicSlug}`).toBe(true);
    }
  });

  it("every topic has at least one lesson", () => {
    const covered = new Set(lessons.map((l) => l.topicSlug));
    for (const t of topics) {
      expect(covered.has(t.slug), `topic ${t.slug} has no lesson`).toBe(true);
    }
  });

  it("lesson content is substantial markdown", () => {
    for (const l of lessons) {
      expect(l.content.length, `lesson ${l.slug} is too short`).toBeGreaterThan(1500);
      expect(l.content, `lesson ${l.slug} has no headings`).toMatch(/^## /m);
    }
  });
});

describe("tools", () => {
  it("covers exactly psse, pscad, and etap", () => {
    expect(tools.map((t) => t.slug).sort()).toEqual(["etap", "pscad", "psse"]);
  });

  it("each guide is substantial", () => {
    for (const t of tools) {
      expect(t.content.length, `tool ${t.slug} guide is too short`).toBeGreaterThan(3000);
    }
  });
});

describe("interview questions", () => {
  it("has unique ids", () => {
    expect(findDuplicates(interviewQuestions.map((q) => q.id))).toEqual([]);
  });

  it("tool field is only set for tools-category questions and is valid", () => {
    const toolSlugs = new Set(tools.map((t) => t.slug));
    for (const q of interviewQuestions) {
      if (q.category === "tools") {
        expect(q.tool && toolSlugs.has(q.tool), `question ${q.id}`).toBe(true);
      } else {
        expect(q.tool ?? null, `question ${q.id} should not set tool`).toBeNull();
      }
    }
  });

  it("difficulties are valid", () => {
    for (const q of interviewQuestions) {
      expect(["easy", "medium", "hard"], `question ${q.id}`).toContain(q.difficulty);
    }
  });
});

describe("quiz questions", () => {
  it("has unique ids", () => {
    expect(findDuplicates(quizQuestions.map((q) => q.id))).toEqual([]);
  });

  it("every question references an existing topic", () => {
    for (const q of quizQuestions) {
      expect(topicSlugs.has(q.topicSlug), `quiz ${q.id} → ${q.topicSlug}`).toBe(true);
    }
  });

  it("every question has exactly 4 options and a valid correctIndex", () => {
    for (const q of quizQuestions) {
      expect(q.options, `quiz ${q.id}`).toHaveLength(4);
      expect(q.correctIndex, `quiz ${q.id}`).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex, `quiz ${q.id}`).toBeLessThanOrEqual(3);
      expect(q.explanation.length, `quiz ${q.id} missing explanation`).toBeGreaterThan(0);
    }
  });

  it("every topic has at least one quiz question", () => {
    const covered = new Set(quizQuestions.map((q) => q.topicSlug));
    for (const t of topics) {
      expect(covered.has(t.slug), `topic ${t.slug} has no quiz questions`).toBe(true);
    }
  });
});

describe("glossary", () => {
  it("has unique terms", () => {
    expect(findDuplicates(glossary.map((g) => g.term))).toEqual([]);
  });

  it("every term has a definition and valid category", () => {
    const allowed = [
      "fundamentals",
      "components",
      "analysis",
      "protection",
      "renewables",
      "tools",
    ];
    for (const g of glossary) {
      expect(g.definition.length, `term ${g.term}`).toBeGreaterThan(20);
      expect(allowed, `term ${g.term}`).toContain(g.category);
    }
  });
});
