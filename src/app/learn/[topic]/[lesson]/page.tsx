import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, getAllLessons, getTopic, getLessonsForTopic } from "@/lib/db";
import Markdown from "@/components/Markdown";
import LessonCompleteToggle from "@/components/LessonCompleteToggle";

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ topic: l.topic_slug, lesson: l.slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ topic: string; lesson: string }>;
}) {
  const { topic: topicSlug, lesson: lessonSlug } = await params;
  const lesson = getLesson(lessonSlug);
  const topic = getTopic(topicSlug);
  if (!lesson || !topic || lesson.topic_slug !== topic.slug) notFound();

  const siblings = getLessonsForTopic(topicSlug);
  const idx = siblings.findIndex((l) => l.slug === lessonSlug);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-sm text-foreground/50">
        <Link href="/learn" className="hover:text-accent">
          Learn
        </Link>{" "}
        /{" "}
        <Link href={`/learn/${topic.slug}`} className="hover:text-accent">
          {topic.title}
        </Link>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
      <p className="mt-2 text-foreground/70">{lesson.summary}</p>

      <div className="mt-4">
        <LessonCompleteToggle slug={lesson.slug} />
      </div>

      <div className="mt-8">
        <Markdown content={lesson.content} />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-[var(--border)] pt-6 text-sm">
        {prev ? (
          <Link
            href={`/learn/${topic.slug}/${prev.slug}`}
            className="font-medium text-accent hover:underline"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/learn/${topic.slug}/${next.slug}`}
            className="font-medium text-accent hover:underline"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
