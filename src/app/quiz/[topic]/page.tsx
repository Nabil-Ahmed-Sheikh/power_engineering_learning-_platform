import { notFound } from "next/navigation";
import { getTopic, getTopics, getQuizQuestionsForTopic } from "@/lib/db";
import QuizRunner from "@/components/QuizRunner";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTopics().map((t) => ({ topic: t.slug }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = getTopic(topicSlug);
  const rows = getQuizQuestionsForTopic(topicSlug);
  if (!topic || rows.length === 0) notFound();

  const questions = rows.map((r) => ({
    id: r.id,
    question: r.question,
    options: JSON.parse(r.options) as string[],
    correctIndex: r.correct_index,
    explanation: r.explanation,
  }));

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{topic.title} Quiz</h1>
      <p className="mt-2 text-foreground/70">{questions.length} questions</p>

      <QuizRunner topicSlug={topic.slug} questions={questions} />
    </main>
  );
}
