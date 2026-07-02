"use client";

import { useSyncExternalStore } from "react";
import { isLessonComplete, subscribeToProgress, toggleLessonComplete } from "@/lib/progress";

export default function LessonCompleteToggle({ slug }: { slug: string }) {
  const done = useSyncExternalStore(
    subscribeToProgress,
    () => isLessonComplete(slug),
    () => false
  );

  return (
    <button
      onClick={() => toggleLessonComplete(slug)}
      className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
        done
          ? "bg-emerald-600 text-white hover:bg-emerald-700"
          : "border border-[var(--border)] bg-surface hover:bg-accent-soft/40"
      }`}
    >
      {done ? "✓ Completed" : "Mark as complete"}
    </button>
  );
}
