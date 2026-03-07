"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizQuestionCard from "../../components/QuizQuestionCard";
import ProgressBar from "../../components/ProgressBar";
import LoadingSpinner from "../../components/LoadingSpinner";
import { quizQuestions } from "../../data/quizQuestions";
import { submitQuiz } from "../../services/api";
import { useQuizResult } from "../../context/QuizContext";

export default function QuizPage() {
  const router = useRouter();
  const { setResult } = useQuizResult();
  const [answers, setAnswers] = useState<Record<string, typeof quizQuestions[0]["options"][0] | null>>(
    {}
  );
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const totalQuestions = quizQuestions.length;
  const answered = Object.values(answers).filter(Boolean).length;
  const progress = Math.round((answered / totalQuestions) * 100);

  const handleSelect = (questionId: string, option: typeof quizQuestions[0]["options"][0]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    if (answered < totalQuestions) {
      setError("Please answer every question.");
      return;
    }
    setError(null);
    setStatus("loading");
    const responses = quizQuestions.map((question) => ({
      image_id: question.id,
      liked: true,
      tags: answers[question.id]?.tags ?? [],
    }));

    try {
      const payload = {
        user_id: "demo-user",
        responses,
      };
      const result = await submitQuiz(payload);
      setResult(result);
      setStatus("idle");
      router.push("/results");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Style quiz</p>
          <h1 className="text-4xl font-semibold text-white">Share your style preferences</h1>
          <p className="text-slate-300">
            Swipe through a few thoughtful prompts. We turn your answers into a taste snapshot.
          </p>
        </div>
        <ProgressBar value={answered} max={totalQuestions} />
        <div className="space-y-8">
          {quizQuestions.map((question) => (
            <QuizQuestionCard
              key={question.id}
              question={question}
              selected={answers[question.id]}
              onSelect={(option) => handleSelect(question.id, option)}
            />
          ))}
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <div className="sticky bottom-0 left-0 right-0 mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950/80 px-6 py-6 shadow-2xl shadow-black/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center justify-center rounded-full bg-amber-300/90 px-8 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-slate-950 transition hover:bg-amber-300"
            >
              {status === "loading" ? <LoadingSpinner /> : "Generate Taste Profile"}
            </button>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Answered {answered}/{totalQuestions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
