"use client";

type ProgressBarProps = {
  value: number;
  max: number;
};

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-400">
        <span>Quiz Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-amber-300 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
