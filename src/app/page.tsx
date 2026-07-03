import Link from "next/link";
import { getTopics, getAllLessons, getInterviewQuestions, getTools } from "@/lib/db";
import { CATEGORY_META } from "@/lib/categories";
import DashboardProgress from "@/components/DashboardProgress";

export default function Home() {
  const topics = getTopics();
  const lessons = getAllLessons();
  const interviewQuestions = getInterviewQuestions();
  const tools = getTools();

  const categories = [...new Set(topics.map((t) => t.category))];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Power Engineering Lab
        </h1>
        <p className="mt-3 max-w-2xl text-foreground/70">
          A self-study platform for power systems engineering — theory,
          hands-on tool guides for PSS&reg;E, PSCAD, and ETAP, quizzes, and an
          interview question bank. Everything is stored locally in your
          browser as you progress, so learn at your own pace.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/learn"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Start Learning
          </Link>
          <Link
            href="/interview"
            className="rounded-md border border-[var(--border)] bg-surface px-4 py-2 text-sm font-semibold hover:bg-accent-soft/40"
          >
            Interview Prep
          </Link>
          <Link
            href="/tools"
            className="rounded-md border border-[var(--border)] bg-surface px-4 py-2 text-sm font-semibold hover:bg-accent-soft/40"
          >
            Explore Tools
          </Link>
        </div>
      </section>

      <DashboardProgress totalLessons={lessons.length} />

      <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Topics" value={topics.length} />
        <StatCard label="Lessons" value={lessons.length} />
        <StatCard label="Interview Questions" value={interviewQuestions.length} />
        <StatCard label="Tool Guides" value={tools.length} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Browse by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] ?? { label: cat, description: "" };
            const count = topics.filter((t) => t.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/learn#${cat}`}
                className="rounded-lg border border-[var(--border)] bg-surface p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold">{meta.label}</h3>
                <p className="mt-1 text-sm text-foreground/60">{meta.description}</p>
                <p className="mt-3 text-xs font-medium text-accent">{count} topics</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-surface p-5">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-foreground/60">{label}</p>
    </div>
  );
}
