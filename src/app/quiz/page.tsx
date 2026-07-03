import Link from "next/link";
import { getTopics, getDb } from "@/lib/db";

export const metadata = { title: "Quizzes — Power Engineering Lab" };

export default function QuizIndexPage() {
  const topics = getTopics();
  const counts = getDb()
    .prepare(`SELECT topic_slug, COUNT(*) as n FROM quiz_questions GROUP BY topic_slug`)
    .all() as { topic_slug: string; n: number }[];
  const countMap = new Map(counts.map((c) => [c.topic_slug, c.n]));
  const quizTopics = topics.filter((t) => (countMap.get(t.slug) ?? 0) > 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
      <p className="mt-2 max-w-2xl text-foreground/70">
        Test yourself topic by topic. Scores are saved to your device so you
        can track improvement over time.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/quiz/${topic.slug}`}
            className="rounded-lg border border-[var(--border)] bg-surface p-5 transition-shadow hover:shadow-md"
          >
            <h3 className="font-semibold">{topic.title}</h3>
            <p className="mt-2 text-xs font-medium text-accent">
              {countMap.get(topic.slug)} questions
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
