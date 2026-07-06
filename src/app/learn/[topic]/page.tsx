import Link from "next/link";
import { notFound } from "next/navigation";
import { getTopic, getTopics, getLessonsForTopic } from "@/lib/db";
import { CATEGORY_META } from "@/lib/categories";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTopics().map((t) => ({ topic: t.slug }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = getTopic(topicSlug);
  if (!topic) notFound();

  const lessons = getLessonsForTopic(topicSlug);
  const meta = CATEGORY_META[topic.category] ?? { label: topic.category };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-sm text-foreground/50">
        <Link href="/learn" className="hover:text-accent">
          Learn
        </Link>{" "}
        / <span>{meta.label}</span>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight">{topic.title}</h1>
      <p className="mt-2 max-w-2xl text-foreground/70">{topic.description}</p>

      <div className="mt-8 space-y-3">
        {lessons.map((lesson, i) => (
          <Link
            key={lesson.slug}
            href={`/learn/${topic.slug}/${lesson.slug}`}
            className="flex items-center gap-4 rounded-lg border border-[var(--border)] bg-surface p-4 transition-shadow hover:shadow-md"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-sm text-foreground/60">{lesson.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
