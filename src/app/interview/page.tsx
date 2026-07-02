import { Suspense } from "react";
import { getInterviewQuestions, getTools } from "@/lib/db";
import InterviewBrowser from "@/components/InterviewBrowser";

export const metadata = { title: "Interview Prep — Power Engineering Lab" };

export default function InterviewPage() {
  const questions = getInterviewQuestions();
  const tools = getTools();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Interview Prep</h1>
      <p className="mt-2 max-w-2xl text-foreground/70">
        {questions.length} questions covering fundamentals, analysis,
        protection, tools, and behavioral scenarios. Click a question to
        reveal a strong answer.
      </p>

      <Suspense fallback={null}>
        <InterviewBrowser questions={questions} tools={tools} />
      </Suspense>
    </main>
  );
}
