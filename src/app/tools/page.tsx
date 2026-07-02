import Link from "next/link";
import { getTools } from "@/lib/db";

export const metadata = { title: "Tools — Power Engineering Lab" };

export default function ToolsPage() {
  const tools = getTools();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Industry Tools</h1>
      <p className="mt-2 max-w-2xl text-foreground/70">
        The three simulation packages every power systems engineer
        encounters sooner or later. Learn what each is for, how workflows
        differ, and what interviewers tend to probe.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="rounded-lg border border-[var(--border)] bg-surface p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{tool.name}</h2>
            <p className="mt-2 text-sm text-foreground/60">{tool.tagline}</p>
            <span className="mt-4 inline-block text-sm font-medium text-accent">
              Read guide →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
