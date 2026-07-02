"use client";

import { useEffect, useState } from "react";
import { getCompletedLessons, getQuizHistory } from "@/lib/progress";

export default function DashboardProgress({ totalLessons }: { totalLessons: number }) {
  const [completed, setCompleted] = useState(0);
  const [quizzesTaken, setQuizzesTaken] = useState(0);
  const [avgScore, setAvgScore] = useState<number | null>(null);

  useEffect(() => {
    const refresh = () => {
      setCompleted(getCompletedLessons().size);
      const history = getQuizHistory();
      setQuizzesTaken(history.length);
      if (history.length > 0) {
        const pct =
          history.reduce((sum, a) => sum + a.score / a.total, 0) / history.length;
        setAvgScore(Math.round(pct * 100));
      }
    };
    refresh();
    window.addEventListener("pel:progress-updated", refresh);
    return () => window.removeEventListener("pel:progress-updated", refresh);
  }, []);

  const pct = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

  return (
    <section className="mb-10 rounded-lg border border-[var(--border)] bg-surface p-5">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold">Your progress</span>
        <span className="text-foreground/60">
          {completed}/{totalLessons} lessons complete
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-accent-soft">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {quizzesTaken > 0 && (
        <p className="mt-3 text-xs text-foreground/60">
          {quizzesTaken} quiz attempt{quizzesTaken === 1 ? "" : "s"} · average score{" "}
          {avgScore}%
        </p>
      )}
      <p className="mt-2 text-[11px] text-foreground/40">
        Progress is saved in this browser only.
      </p>
    </section>
  );
}
