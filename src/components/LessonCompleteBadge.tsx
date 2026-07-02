"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getCompletedLessons, subscribeToProgress } from "@/lib/progress";

export default function LessonCompleteBadge({ lessonSlugs }: { lessonSlugs: string[] }) {
  const getSnapshot = useCallback(() => {
    const completed = getCompletedLessons();
    return lessonSlugs.filter((s) => completed.has(s)).length;
  }, [lessonSlugs]);

  const done = useSyncExternalStore(subscribeToProgress, getSnapshot, () => 0);

  if (lessonSlugs.length === 0) return null;

  const allDone = done === lessonSlugs.length;

  return (
    <span
      className={`rounded-full px-2 py-0.5 font-medium ${
        allDone
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
          : done > 0
            ? "bg-accent-soft text-accent"
            : "text-foreground/40"
      }`}
    >
      {allDone ? "Done" : done > 0 ? `${done}/${lessonSlugs.length}` : "Not started"}
    </span>
  );
}
