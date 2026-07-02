import Link from "next/link";
import { notFound } from "next/navigation";
import { getTool, getTools } from "@/lib/db";
import Markdown from "@/components/Markdown";

export function generateStaticParams() {
  return getTools().map((t) => ({ tool: t.slug }));
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool: toolSlug } = await params;
  const tool = getTool(toolSlug);
  if (!tool) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-sm text-foreground/50">
        <Link href="/tools" className="hover:text-accent">
          Tools
        </Link>{" "}
        / <span>{tool.name}</span>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
      <p className="mt-2 text-foreground/70">{tool.tagline}</p>

      <div className="mt-8">
        <Markdown content={tool.content} />
      </div>

      <div className="mt-10 rounded-lg border border-[var(--border)] bg-accent-soft/40 p-5">
        <p className="text-sm">
          Want questions specific to this tool?{" "}
          <Link
            href={`/interview?tool=${tool.slug}`}
            className="font-semibold text-accent hover:underline"
          >
            See {tool.name} interview questions →
          </Link>
        </p>
      </div>
    </main>
  );
}
