"use client";

type Option = {
  value: string;
  label: string;
  description: string;
  tags: string[];
};

type QuizQuestionCardProps = {
  question: {
    id: string;
    prompt: string;
    options: Option[];
  };
  selected: Option | null;
  onSelect: (option: Option) => void;
};

export default function QuizQuestionCard({
  question,
  selected,
  onSelect,
}: QuizQuestionCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/50">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Style prompt</p>
        <h3 className="mt-1 text-2xl font-semibold">{question.prompt}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {question.options.map((option) => {
          const active = selected?.value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option)}
              className={`rounded-2xl border px-5 py-4 text-left transition ${
                active
                  ? "border-amber-300 bg-amber-300/20 text-white"
                  : "border-white/10 hover:border-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-400">
                <span>{option.value}</span>
                {active && <span>Selected</span>}
              </div>
              <p className="mt-3 text-base font-semibold">{option.label}</p>
              <p className="mt-2 text-sm text-slate-300">{option.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
