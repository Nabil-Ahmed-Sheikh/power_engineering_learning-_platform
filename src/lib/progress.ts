"use client";

/**
 * Personal progress tracking, stored in the browser's localStorage.
 *
 * The SQLite database (data/learning.db) ships as read-only course content
 * bundled into the app; Vercel's serverless functions can't durably persist
 * writes back to it between invocations. Progress is per-device, per-browser.
 */

const LESSONS_KEY = "pel:completed-lessons";
const QUIZ_KEY = "pel:quiz-history";

export interface QuizAttempt {
  topicSlug: string;
  score: number;
  total: number;
  takenAt: string; // ISO timestamp
}

function readSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function writeSet(key: string, set: Set<string>) {
  window.localStorage.setItem(key, JSON.stringify([...set]));
}

export function getCompletedLessons(): Set<string> {
  return readSet(LESSONS_KEY);
}

export function toggleLessonComplete(slug: string): Set<string> {
  const set = readSet(LESSONS_KEY);
  if (set.has(slug)) set.delete(slug);
  else set.add(slug);
  writeSet(LESSONS_KEY, set);
  window.dispatchEvent(new Event("pel:progress-updated"));
  return set;
}

export function isLessonComplete(slug: string): boolean {
  return readSet(LESSONS_KEY).has(slug);
}

export function getQuizHistory(): QuizAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(QUIZ_KEY);
    return raw ? (JSON.parse(raw) as QuizAttempt[]) : [];
  } catch {
    return [];
  }
}

export function recordQuizAttempt(attempt: QuizAttempt) {
  const history = getQuizHistory();
  history.unshift(attempt);
  window.localStorage.setItem(QUIZ_KEY, JSON.stringify(history.slice(0, 100)));
  window.dispatchEvent(new Event("pel:progress-updated"));
}

export function bestQuizScore(topicSlug: string): QuizAttempt | undefined {
  return getQuizHistory()
    .filter((a) => a.topicSlug === topicSlug)
    .sort((a, b) => b.score / b.total - a.score / a.total)[0];
}

/** For use with useSyncExternalStore, so localStorage-backed reads stay hydration-safe. */
export function subscribeToProgress(callback: () => void): () => void {
  window.addEventListener("pel:progress-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("pel:progress-updated", callback);
    window.removeEventListener("storage", callback);
  };
}
