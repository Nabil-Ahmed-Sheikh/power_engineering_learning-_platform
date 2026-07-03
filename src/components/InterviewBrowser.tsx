"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Markdown from "@/components/Markdown";
import type { InterviewQuestionRow, ToolRow } from "@/lib/db";

const CATEGORY_LABELS: Record<string, string> = {
  fundamentals: "Fundamentals",
  analysis: "Analysis",
  protection: "Protection",
  tools: "Tools",
  behavioral: "Behavioral",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  hard: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
};

export default function InterviewBrowser({
  questions,
  tools,
}: {
  questions: InterviewQuestionRow[];
  tools: ToolRow[];
}) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>("all");
  const [tool, setTool] = useState<string>(searchParams.get("tool") ?? "all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(questions.map((q) => q.category))],
    [questions]
  );

  const filtered = questions.filter((q) => {
    if (category !== "all" && q.category !== category) return false;
    if (tool !== "all" && q.tool !== tool) return false;
    if (query && !q.question.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search questions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xs rounded-md border border-[var(--border)] bg-surface px-3 py-2 text-sm outline-none focus:border-accent sm:w-64"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-[var(--border)] bg-surface px-3 py-2 text-sm"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c] ?? c}
            </option>
          ))}
        </select>
        {category === "tools" || tool !== "all" ? (
          <select
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-surface px-3 py-2 text-sm"
          >
            <option value="all">All tools</option>
            {tools.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      <p className="mb-4 text-sm text-foreground/50">{filtered.length} questions</p>

      <div className="space-y-3">
        {filtered.map((q) => {
          const isOpen = openId === q.id;
          return (
            <div
              key={q.id}
              className="rounded-lg border border-[var(--border)] bg-surface p-4"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : q.id)}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <div>
                  <div className="mb-1 flex flex-wrap gap-2 text-[11px] font-medium">
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">
                      {CATEGORY_LABELS[q.category] ?? q.category}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 ${DIFFICULTY_COLORS[q.difficulty] ?? ""}`}
                    >
                      {q.difficulty}
                    </span>
                    {q.tool && (
                      <span className="rounded-full bg-foreground/5 px-2 py-0.5 text-foreground/60">
                        {q.tool.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <p className="font-medium">{q.question}</p>
                </div>
                <span className="shrink-0 text-foreground/40">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="mt-4 border-t border-[var(--border)] pt-4">
                  <Markdown content={q.answer} />
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-foreground/50">
            No questions match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
