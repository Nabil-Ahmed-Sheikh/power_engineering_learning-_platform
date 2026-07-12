# Power Engineering Lab 

A self-study platform for learning power systems engineering and preparing
for interviews — built with Next.js and SQLite.

## What's inside

- **Learn** — lessons across fundamentals, components, analysis, protection,
  and renewables/smart grid, organized by category.
- **Tools** — in-depth guides to PSS&reg;E, PSCAD, and ETAP: what each is
  for, typical workflows, and what interviewers ask about them.
- **Interview Prep** — a searchable, filterable bank of interview questions
  with model answers.
- **Quizzes** — topic quizzes with instant feedback; scores are saved to
  your browser.
- **Glossary** — searchable reference of power engineering terminology.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- [SQLite](https://sqlite.org) via `better-sqlite3` for all course content
  (topics, lessons, tool guides, interview questions, quizzes, glossary)
- Per-device progress (completed lessons, quiz history) stored in the
  browser's `localStorage` — see "How data is stored" below.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Both `npm run dev` and `npm run build` automatically run the seed step
first (via the `predev`/`prebuild` scripts), so the SQLite database is
always generated fresh from the content source files in `src/content/`.
You can also run it manually with `npm run seed`.

## Tests

```bash
npm test
```

Runs the vitest suite: content integrity checks (unique slugs/ids, valid
cross-references, well-formed quiz questions) and an integration test of
the seed → SQLite → query pipeline.

## How data is stored

All course content — topics, lessons, tool guides, interview questions,
quizzes, glossary — lives in `src/content/*.ts` and is compiled into a
SQLite database (`data/learning.db`) by `scripts/seed.ts`. The app reads
that database at build/render time via `src/lib/db.ts`.

Personal progress (which lessons you've completed, quiz scores) is *not*
written back to SQLite, because Vercel's serverless functions don't have
durable writable disk between requests. Instead it's kept in your browser's
`localStorage`, per device. To edit or add course content, edit the files in
`src/content/` and re-run `npm run seed`.

## Deploying to Vercel

1. Push this repository to GitHub (already done if you're reading this from
   the repo).
2. Go to [vercel.com/new](https://vercel.com/new), click **Add New
   Project**, and import this GitHub repository.
3. Leave the default settings (Framework Preset: Next.js) and click
   **Deploy**. The build step automatically runs `npm run seed` before
   `next build`, so the database is generated during the Vercel build —
   nothing else to configure.
4. Every future push to the connected branch redeploys automatically.
