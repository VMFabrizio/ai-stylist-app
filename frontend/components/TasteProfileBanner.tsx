"use client";

type TasteProfileBannerProps = {
  summary: string;
  tags?: string[];
};

export default function TasteProfileBanner({ summary, tags = [] }: TasteProfileBannerProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/40">
      <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Taste Snapshot</p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">{summary}</h2>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 px-4 py-1 text-[0.65rem] uppercase tracking-[0.3em]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
