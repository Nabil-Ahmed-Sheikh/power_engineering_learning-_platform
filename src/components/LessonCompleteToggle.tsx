"use client";

import { useEffect, useState } from "react";
import { isLessonComplete, toggleLessonComplete } from "@/lib/progress";

export default function LessonCompleteToggle({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(isLessonComplete(slug));
  }, [slug]);

  return (
    <button
      onClick={() => setDone(toggleLessonComplete(slug).has(slug))}
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
