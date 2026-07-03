"use client";

import { useState } from "react";
import Link from "next/link";
import { recordQuizAttempt } from "@/lib/progress";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function QuizRunner({
  topicSlug,
  questions,
}: {
  topicSlug: string;
  questions: Question[];
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);

  const current = questions[index];
  const isLast = index === questions.length - 1;

  function choose(optionIdx: number) {
    if (selected !== null) return;
    setSelected(optionIdx);
    if (optionIdx === current.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
      if (!saved) {
        recordQuizAttempt({
          topicSlug,
          score,
          total: questions.length,
          takenAt: new Date().toISOString(),
        });
        setSaved(true);
      }
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setSaved(false);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mt-8 rounded-lg border border-[var(--border)] bg-surface p-8 text-center">
        <p className="text-sm font-medium text-foreground/60">Your score</p>
        <p className="mt-2 text-4xl font-bold text-accent">
          {score}/{questions.length}
        </p>
        <p className="mt-1 text-foreground/60">{pct}%</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={restart}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Retake quiz
          </button>
          <Link
            href="/quiz"
            className="rounded-md border border-[var(--border)] bg-surface px-4 py-2 text-sm font-semibold hover:bg-accent-soft/40"
          >
            All quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between text-sm text-foreground/50">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <span>Score: {score}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-accent-soft">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${(index / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-6 rounded-lg border border-[var(--border)] bg-surface p-6">
        <p className="font-medium">{current.question}</p>
        <div className="mt-4 space-y-2">
          {current.options.map((opt, i) => {
            const isCorrect = i === current.correctIndex;
            const isSelected = i === selected;
            let style = "border-[var(--border)] hover:bg-accent-soft/40";
            if (selected !== null) {
              if (isCorrect) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30";
              else if (isSelected) style = "border-rose-500 bg-rose-50 dark:bg-rose-900/30";
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={selected !== null}
                className={`block w-full rounded-md border px-4 py-2.5 text-left text-sm transition-colors ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-4 rounded-md bg-accent-soft/40 p-3 text-sm">
            <p className="font-medium">
              {selected === current.correctIndex ? "Correct." : "Not quite."}
            </p>
            <p className="mt-1 text-foreground/70">{current.explanation}</p>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            onClick={next}
            disabled={selected === null}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {isLast ? "Finish" : "Next question"}
          </button>
        </div>
      </div>
    </div>
  );
}
