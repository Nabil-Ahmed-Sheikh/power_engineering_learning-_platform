"use client";

import { useMemo, useState } from "react";
import type { GlossaryRow } from "@/lib/db";
import { CATEGORY_META } from "@/lib/categories";

export default function GlossaryBrowser({ terms }: { terms: GlossaryRow[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => [...new Set(terms.map((t) => t.category))], [terms]);

  const filtered = terms.filter((t) => {
    if (category !== "all" && t.category !== category) return false;
    if (
      query &&
      !t.term.toLowerCase().includes(query.toLowerCase()) &&
      !t.definition.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search terms…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xs rounded-md border border-[var(--border)] bg-surface px-3 py-2 text-sm outline-none focus:border-accent sm:w-64"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-[var(--border)] bg-surface px-3 py-2 text-sm"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_META[c]?.label ?? c}
            </option>
          ))}
        </select>
      </div>

      <dl className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] bg-surface">
        {filtered.map((t) => (
          <div key={t.term} className="p-4">
            <dt className="font-semibold">{t.term}</dt>
            <dd className="mt-1 text-sm text-foreground/70">{t.definition}</dd>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-foreground/50">
            No terms match your search.
          </p>
        )}
      </dl>
    </div>
  );
}
