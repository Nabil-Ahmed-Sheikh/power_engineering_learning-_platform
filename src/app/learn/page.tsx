import Link from "next/link";
import { getTopics, getAllLessons } from "@/lib/db";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/categories";
import LessonCompleteBadge from "@/components/LessonCompleteBadge";

export const metadata = { title: "Learn — Power Engineering Lab" };

export default function LearnPage() {
  const topics = getTopics();
  const lessons = getAllLessons();
  const lessonSlugsByTopic = new Map<string, string[]>();
  for (const l of lessons) {
    const arr = lessonSlugsByTopic.get(l.topic_slug) ?? [];
    arr.push(l.slug);
    lessonSlugsByTopic.set(l.topic_slug, arr);
  }

  const categories = CATEGORY_ORDER.filter((c) => topics.some((t) => t.category === c));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
      <p className="mt-2 max-w-2xl text-foreground/70">
        Core power systems theory, organized the way it's actually used on the
        job — from AC fundamentals through protection and renewable
        integration.
      </p>

      <div className="mt-8 space-y-10">
        {categories.map((cat) => {
          const meta = CATEGORY_META[cat] ?? { label: cat, description: "" };
          const catTopics = topics.filter((t) => t.category === cat);
          return (
            <section key={cat} id={cat} className="scroll-mt-24">
              <h2 className="text-xl font-semibold">{meta.label}</h2>
              <p className="mt-1 text-sm text-foreground/60">{meta.description}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catTopics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/learn/${topic.slug}`}
                    className="rounded-lg border border-[var(--border)] bg-surface p-5 transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-semibold">{topic.title}</h3>
                    <p className="mt-1 text-sm text-foreground/60">{topic.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-accent">
                        {(lessonSlugsByTopic.get(topic.slug) ?? []).length} lesson
                        {(lessonSlugsByTopic.get(topic.slug) ?? []).length === 1 ? "" : "s"}
                      </span>
                      <LessonCompleteBadge
                        lessonSlugs={lessonSlugsByTopic.get(topic.slug) ?? []}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
