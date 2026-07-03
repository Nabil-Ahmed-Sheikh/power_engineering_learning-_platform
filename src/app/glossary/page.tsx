import { getGlossary } from "@/lib/db";
import GlossaryBrowser from "@/components/GlossaryBrowser";

export const metadata = { title: "Glossary — Power Engineering Lab" };

export default function GlossaryPage() {
  const terms = getGlossary();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Glossary</h1>
      <p className="mt-2 max-w-2xl text-foreground/70">
        {terms.length} terms spanning fundamentals, equipment, analysis,
        protection, renewables, and the PSS/E, PSCAD, and ETAP toolchains.
      </p>

      <GlossaryBrowser terms={terms} />
    </main>
  );
}
