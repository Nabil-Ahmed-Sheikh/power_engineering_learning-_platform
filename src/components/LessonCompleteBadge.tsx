"use client";

import { useEffect, useState } from "react";
import { getCompletedLessons } from "@/lib/progress";

export default function LessonCompleteBadge({ lessonSlugs }: { lessonSlugs: string[] }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const completed = getCompletedLessons();
      setDone(lessonSlugs.filter((s) => completed.has(s)).length);
    };
    refresh();
    window.addEventListener("pel:progress-updated", refresh);
    return () => window.removeEventListener("pel:progress-updated", refresh);
  }, [lessonSlugs]);

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
